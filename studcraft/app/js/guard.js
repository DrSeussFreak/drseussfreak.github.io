// GitHub Pages cannot send frame-ancestors, so the page stays hidden unless it is the top window.
(function () {
  var isTop = false;
  try { isTop = window.top === window.self; } catch (e) { isTop = false; }
  if (isTop) {
    document.documentElement.classList.add('unframed');
    return;
  }
  document.addEventListener('DOMContentLoaded', function () {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    var note = document.createElement('p');
    note.className = 'framed-note';
    note.textContent = 'For your security, StudCraft cannot run inside another page.';
    document.body.appendChild(note);
    document.documentElement.classList.add('framed');
  });
})();
