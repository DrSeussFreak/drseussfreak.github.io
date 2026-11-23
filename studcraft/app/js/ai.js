// Direct browser clients for Gemini, Claude, and OpenAI, with the same routing as the Android and Mac apps.
import { LIMITS, UserError, decodeBase64Image, redact } from './security.js';
import { parseDrawing } from './drawing.js';

export const PROVIDERS = Object.freeze({
  gemini: { id: 'gemini', title: 'Gemini', origin: 'https://generativelanguage.googleapis.com' },
  claude: { id: 'claude', title: 'Claude', origin: 'https://api.anthropic.com' },
  openai: { id: 'openai', title: 'OpenAI', origin: 'https://api.openai.com' },
});
export const PROVIDER_IDS = Object.freeze(Object.keys(PROVIDERS));

const IMAGE_TIMEOUT = 150_000;
const TEXT_TIMEOUT = 90_000;

class ApiError extends Error {
  constructor(message, code = 0, body = '') { super(message); this.code = code; this.body = body; }
}

/** Reads a response without letting an oversized body exhaust memory. */
async function readCapped(response) {
  if (!response.body) return response.text();
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > LIMITS.maxAiResponseBytes) {
      await reader.cancel();
      throw new ApiError('The AI response was too large.');
    }
    chunks.push(value);
  }
  const all = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) { all.set(c, at); at += c.length; }
  return new TextDecoder().decode(all);
}

function parseJson(text) {
  try {
    const value = JSON.parse(text);
    return value !== null && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

const errorDetail = (body) => {
  const message = parseJson(body)?.error?.message;
  return typeof message === 'string' ? message.slice(0, 200) : '';
};

/**
 * Builds the single place a key leaves the app. The URL is always the provider's own origin,
 * redirects are refused, and no cookies or referrer are sent.
 */
export function createTransport({ fetchImpl, keys }) {
  return async function call(providerId, path, { method = 'GET', body, headers = {}, timeout = TEXT_TIMEOUT } = {}) {
    const provider = PROVIDERS[providerId];
    if (!provider || !path.startsWith('/') || path.startsWith('//')) throw new ApiError('Invalid request.');
    const url = new URL(path, provider.origin);
    if (url.origin !== provider.origin) throw new ApiError('Invalid request.');
    const key = keys.get(providerId);
    if (!key) throw new ApiError(`${provider.title} key is missing.`);
    const auth = providerId === 'gemini' ? { 'x-goog-api-key': key }
      : providerId === 'claude' ? { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }
        : { Authorization: `Bearer ${key}` };
    let response;
    try {
      response = await fetchImpl(url.href, {
        method,
        headers: { ...headers, ...auth, ...(body ? { 'Content-Type': 'application/json' } : {}) },
        body: body ? JSON.stringify(body) : undefined,
        mode: 'cors', credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer', cache: 'no-store',
        signal: AbortSignal.timeout(timeout),
      });
    } catch (e) {
      if (e?.name === 'TimeoutError' || e?.name === 'AbortError') throw new ApiError(`${provider.title} took too long. Try again in a minute.`);
      throw new ApiError(`Your browser couldn't reach ${provider.title}. You may be offline, or it may be blocking browser requests.`);
    }
    let text;
    try {
      text = await readCapped(response);
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(`${provider.title} stopped responding.`);
    }
    return { ok: response.ok, code: response.status, text };
  };
}

function imageError(title, code, body) {
  const detail = errorDetail(body);
  if (code === 429) return `Your ${title} key has no image quota left. Image creation may need billing on that account.`;
  if (code === 503) return `${title} is busy right now. Try again in a minute.`;
  return detail ? `${title} HTTP ${code}: ${detail}` : `${title} couldn't create the image (HTTP ${code}).`;
}

/** Provider calls. `helpers` are the compiled Kotlin model-ordering and prompt functions. */
export function createClients({ call, helpers }) {
  const modelCache = new Map();

  async function geminiModels(key) {
    if (modelCache.get('key') === key) return modelCache.get('ids');
    const res = await call('gemini', '/v1beta/models?pageSize=200', { timeout: 8000 });
    if (!res.ok) throw new ApiError(imageError('Gemini', res.code, res.text), res.code);
    const list = parseJson(res.text).models;
    const ids = (Array.isArray(list) ? list : [])
      .filter((m) => Array.isArray(m?.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent') && typeof m.name === 'string')
      .map((m) => m.name.replace(/^models\//, ''))
      .filter((id) => /^[a-zA-Z0-9._-]{1,80}$/.test(id));
    modelCache.set('key', key);
    modelCache.set('ids', ids);
    return ids;
  }

  async function firstWorking(models, attempt) {
    const failures = [];
    for (const model of models) {
      const r = await attempt(model);
      if (r.value !== undefined) return r.value;
      if (!r.tryNext) throw new ApiError(r.error ?? 'Gemini request failed.');
      failures.push({ model, ...r });
    }
    if (failures.length && failures.every((f) => f.code === 429)) {
      throw new ApiError('Your Gemini key has reached its limit on every available model. Check usage or billing in Google AI Studio.');
    }
    if (failures.length > 1) {
      const labels = failures.map((f) => `${f.model}: ${f.code === 429 ? 'limit reached' : f.code === 404 ? 'not available' : f.code >= 500 ? 'busy' : f.code ? `HTTP ${f.code}` : 'timed out'}`);
      throw new ApiError(`Your Gemini key couldn't finish this. ${labels.join('; ')}.`);
    }
    throw new ApiError(failures[0]?.error ?? 'Gemini is busy right now. Try again in a minute.');
  }

  const geminiPath = (model) => `/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  async function askGemini(settings, system, prompt) {
    let ids = [];
    try { ids = await geminiModels(settings.keys.get('gemini')); } catch (e) { if (e.code === 400 || e.code === 401 || e.code === 403) throw e; }
    const models = Array.from(helpers.orderTextModels(ids, helpers.defaultModel('gemini')));
    const body = {
      system_instruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };
    return firstWorking(models, async (model) => {
      let res;
      try {
        res = await call('gemini', geminiPath(model), { method: 'POST', body, timeout: 40_000 });
      } catch (e) {
        return { error: e.message, tryNext: true };
      }
      if (res.ok) {
        const parts = parseJson(res.text)?.candidates?.[0]?.content?.parts;
        const text = (Array.isArray(parts) ? parts : []).filter((p) => p?.thought !== true && typeof p?.text === 'string').map((p) => p.text).join('').trim();
        return text ? { value: text } : { error: 'Gemini returned an empty response.', tryNext: true, code: res.code };
      }
      const detail = errorDetail(res.text);
      return {
        error: res.code === 503 ? 'Gemini is busy right now. Try again in a minute.' : detail ? `Gemini HTTP ${res.code}: ${detail}` : `Gemini rejected request (HTTP ${res.code}).`,
        tryNext: helpers.canTryNextModel(res.code, res.text), code: res.code,
      };
    });
  }

  async function askClaude(settings, system, prompt, maxTokens = 4096, timeout = TEXT_TIMEOUT) {
    const model = settings.claudeModel.trim() || helpers.defaultModel('claude');
    const useFallback = !model.includes('haiku');
    const body = { model, max_tokens: maxTokens, output_config: { effort: 'low' }, system, messages: [{ role: 'user', content: prompt }] };
    if (useFallback) body.fallbacks = 'default';
    const res = await call('claude', '/v1/messages', { method: 'POST', body, timeout, headers: useFallback ? { 'anthropic-beta': 'server-side-fallback-2026-07-01' } : {} });
    if (!res.ok) {
      const detail = errorDetail(res.text);
      throw new ApiError(detail ? `Claude HTTP ${res.code}: ${detail}` : `Claude rejected request (HTTP ${res.code}).`, res.code);
    }
    const json = parseJson(res.text);
    const text = (Array.isArray(json.content) ? json.content : []).filter((b) => b?.type === 'text' && typeof b.text === 'string').map((b) => b.text).join('').trim();
    if (text) return text;
    throw new ApiError(json.stop_reason === 'refusal' ? 'Claude declined this request.' : json.stop_reason === 'max_tokens' ? 'Claude ran out of response room. Please try again.' : 'Claude returned an empty response.');
  }

  async function askOpenAi(settings, system, prompt) {
    const body = {
      model: settings.openAiModel.trim() || helpers.defaultModel('openai'),
      max_completion_tokens: 1200,
      messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
    };
    const res = await call('openai', '/v1/chat/completions', { method: 'POST', body });
    if (!res.ok) {
      const detail = errorDetail(res.text);
      throw new ApiError(detail ? `OpenAI HTTP ${res.code}: ${detail}` : `OpenAI rejected request (HTTP ${res.code}).`, res.code);
    }
    const content = parseJson(res.text)?.choices?.[0]?.message?.content;
    const text = typeof content === 'string' ? content.trim() : '';
    if (!text) throw new ApiError('OpenAI returned an empty response.');
    return text;
  }

  async function imageGemini(settings, prompt) {
    const models = Array.from(helpers.orderImageModels(await geminiModels(settings.keys.get('gemini'))));
    if (models.length === 0) throw new ApiError("Your Gemini key doesn't have an image model available.");
    const body = {
      contents: [{ role: 'user', parts: [{ text: helpers.imagePrompt(prompt) }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    };
    return firstWorking(models, async (model) => {
      let res;
      try {
        res = await call('gemini', geminiPath(model), { method: 'POST', body, timeout: 70_000 });
      } catch (e) {
        return { error: e.message, tryNext: true };
      }
      if (!res.ok) return { error: imageError('Gemini', res.code, res.text), tryNext: helpers.canTryNextModel(res.code, res.text), code: res.code };
      const parts = parseJson(res.text)?.candidates?.[0]?.content?.parts;
      const part = (Array.isArray(parts) ? parts : []).map((p) => p?.inlineData ?? p?.inline_data).find((d) => typeof d?.data === 'string' && d.data);
      if (!part) return { error: "Gemini didn't return an image. Try wording it differently.", tryNext: true, code: res.code };
      try {
        return { value: decodeBase64Image(part.data).bytes };
      } catch (e) {
        return { error: e.message, tryNext: true, code: res.code };
      }
    });
  }

  async function imageOpenAi(_settings, prompt) {
    const list = await call('openai', '/v1/models', { timeout: 15_000 });
    if (!list.ok) throw new ApiError(imageError('OpenAI', list.code, list.text), list.code);
    const data = parseJson(list.text).data;
    const version = (id) => Number((/(\d+(?:\.\d+)?)/.exec(id.replace(/^gpt-image-/, '')) ?? [])[1] ?? 0);
    const ids = (Array.isArray(data) ? data : []).map((m) => m?.id)
      .filter((id) => typeof id === 'string' && /^gpt-image[a-zA-Z0-9._-]{0,60}$/.test(id) && !/-\d{4}-\d{2}-\d{2}$/.test(id));
    if (ids.length === 0) throw new ApiError("Your OpenAI key doesn't have an image model available.");
    const score = (id) => version(id) * 10 + (id.includes('flare') ? 1 : 0);
    const model = ids.reduce((best, id) => (score(id) > score(best) ? id : best));
    const body = { model, prompt: helpers.imagePrompt(prompt), size: '1024x1024', quality: 'medium', n: 1 };
    let res = await call('openai', '/v1/images/generations', { method: 'POST', body, timeout: IMAGE_TIMEOUT });
    for (const wait of [1500, 4000]) {
      if (res.code !== 503) break;
      await new Promise((resolve) => setTimeout(resolve, wait));
      res = await call('openai', '/v1/images/generations', { method: 'POST', body, timeout: IMAGE_TIMEOUT });
    }
    if (!res.ok) throw new ApiError(imageError('OpenAI', res.code, res.text), res.code);
    const encoded = parseJson(res.text)?.data?.[0]?.b64_json;
    if (typeof encoded !== 'string' || !encoded) throw new ApiError("OpenAI didn't return an image. Try wording it differently.");
    return decodeBase64Image(encoded).bytes;
  }

  async function imageClaude(settings, prompt, renderScene) {
    const text = await askClaude(settings, helpers.drawingInstructions(), `Draw this for a brick mosaic: ${prompt}`, 12_000, IMAGE_TIMEOUT);
    return renderScene(parseDrawing(text));
  }

  return {
    ask(provider, settings, system, prompt) {
      if (provider === 'gemini') return askGemini(settings, system, prompt);
      if (provider === 'claude') return askClaude(settings, system, prompt);
      return askOpenAi(settings, system, prompt);
    },
    createImage(provider, settings, prompt, renderScene) {
      if (provider === 'gemini') return imageGemini(settings, prompt);
      if (provider === 'claude') return imageClaude(settings, prompt, renderScene);
      return imageOpenAi(settings, prompt);
    },
    forgetModels() { modelCache.clear(); },
  };
}

let nextId = 1;

/** Fans out to enabled AIs, falls back to other saved keys, and hides errors when another AI answered. */
export function createCoordinator({ clients, verifyImage, renderScene, onChange }) {
  let turns = [];
  let busy = false;
  const emit = () => onChange({ turns: turns.slice(), busy });

  const update = (id, change) => { turns = turns.map((t) => (t.id === id ? { ...t, ...change } : t)); emit(); };

  const safeError = (provider, error, settings) => {
    const known = error instanceof UserError || error instanceof ApiError;
    return redact(known ? error.message : `${PROVIDERS[provider].title} request failed.`, settings.keys.values()).slice(0, 320);
  };

  const finish = (userId) => {
    const start = turns.findIndex((t) => t.id === userId);
    if (start >= 0) {
      const replies = turns.slice(start + 1);
      if (replies.some((t) => !t.isError && !t.isPending)) turns = [...turns.slice(0, start + 1), ...replies.filter((t) => !t.isError)];
    }
    busy = false;
    emit();
  };

  const addReplies = (providers, text) => {
    const replies = providers.map((provider) => ({ id: nextId++, provider, text, isPending: true, isError: false, isUser: false }));
    turns = [...turns, ...replies];
    emit();
    return replies;
  };

  const start = (text) => {
    const user = { id: nextId++, isUser: true, text };
    turns = [...turns, user];
    busy = true;
    emit();
    return user;
  };

  async function askRound(providers, settings, system, prompt) {
    const replies = addReplies(providers, '');
    const results = await Promise.all(replies.map(async (reply) => {
      try {
        const text = await clients.ask(reply.provider, settings, system, prompt);
        update(reply.id, { text, isPending: false });
        return true;
      } catch (e) {
        update(reply.id, { text: safeError(reply.provider, e, settings), isPending: false, isError: true });
        return false;
      }
    }));
    return results.some(Boolean);
  }

  async function imageRound(providers, settings, prompt) {
    if (providers.length === 0) return false;
    const replies = providers.map((provider) => ({ id: nextId++, provider, text: provider === 'claude' ? 'Drawing image…' : 'Creating image…', isPending: true, isError: false, isUser: false }));
    turns = [...turns, ...replies];
    emit();
    const results = await Promise.all(replies.map(async (reply) => {
      try {
        const bytes = await clients.createImage(reply.provider, settings, prompt, renderScene);
        const image = await verifyImage(bytes);
        update(reply.id, { text: "Here's your image.", isPending: false, image });
        return true;
      } catch (e) {
        update(reply.id, { text: safeError(reply.provider, e, settings), isPending: false, isError: true });
        return false;
      }
    }));
    return results.some(Boolean);
  }

  return {
    get busy() { return busy; },
    get turns() { return turns; },
    async ask(prompt, settings, contextPrompt) {
      const text = prompt.trim().slice(0, LIMITS.maxPromptChars);
      if (!text || busy) return 'ignored';
      const providers = settings.active();
      if (providers.length === 0) return 'Turn on an AI and add its API key above.';
      const system = 'You are the StudCraft Brick Mosaic Master Builder assistant. Answer concisely in natural spoken-friendly language (2-4 clear sentences, no markdown bullets).\n\n' + contextPrompt;
      const user = start(text);
      const answered = await askRound(providers, settings, system, text);
      const backups = settings.withKeys().filter((p) => !providers.includes(p));
      if (!answered && backups.length) await askRound(backups, settings, system, text);
      finish(user.id);
      return null;
    },
    async createImages(prompt, settings) {
      const text = prompt.trim().slice(0, LIMITS.maxPromptChars);
      if (!text || busy) return 'ignored';
      const saved = settings.withKeys();
      const creators = settings.active();
      const backups = saved.filter((p) => !creators.includes(p));
      if (creators.length === 0 && backups.length === 0) return 'To create images, add a Gemini, Claude, or OpenAI key above.';
      const user = start(text);
      const made = await imageRound(creators, settings, text);
      if (!made && backups.length) await imageRound(backups, settings, text);
      finish(user.id);
      return null;
    },
    clear() { if (!busy) { turns = []; emit(); } },
  };
}
