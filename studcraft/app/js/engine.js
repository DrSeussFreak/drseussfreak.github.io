//region block: polyfills
if (typeof Math.imul === 'undefined') {
  Math.imul = function imul(a, b) {
    return (a & 4.29490176E9) * (b & 65535) + (a & 65535) * (b | 0) | 0;
  };
}
if (typeof ArrayBuffer.isView === 'undefined') {
  ArrayBuffer.isView = function (a) {
    return a != null && a.__proto__ != null && a.__proto__.__proto__ === Int8Array.prototype.__proto__;
  };
}
if (typeof Array.prototype.fill === 'undefined') {
  // Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
  Object.defineProperty(Array.prototype, 'fill', {value: function (value) {
    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this); // Steps 3-5.
    var len = O.length >>> 0; // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0; // Step 8.
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0; // Step 11.
    var finalValue = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.
    while (k < finalValue) {
      O[k] = value;
      k++;
    }
    ; // Step 13.
    return O;
  }});
}
[Int8Array, Int16Array, Uint16Array, Int32Array, Float32Array, Float64Array].forEach(function (TypedArray) {
  if (typeof TypedArray.prototype.fill === 'undefined') {
    Object.defineProperty(TypedArray.prototype, 'fill', {value: Array.prototype.fill});
  }
});
if (typeof Math.clz32 === 'undefined') {
  Math.clz32 = function (log, LN2) {
    return function (x) {
      var asUint = x >>> 0;
      if (asUint === 0) {
        return 32;
      }
      return 31 - (log(asUint) / LN2 | 0) | 0; // the "| 0" acts like math.floor
    };
  }(Math.log, Math.LN2);
}
if (typeof String.prototype.startsWith === 'undefined') {
  Object.defineProperty(String.prototype, 'startsWith', {value: function (searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  }});
}
//endregion
//region block: imports
var imul_0 = Math.imul;
var isView = ArrayBuffer.isView;
var clz32 = Math.clz32;
//endregion
//region block: pre-declaration
initMetadataForInterface(CharSequence, 'CharSequence');
initMetadataForInterface(Comparable, 'Comparable');
initMetadataForClass(Number_0, 'Number');
initMetadataForClass(asSequence$$inlined$Sequence$1);
initMetadataForClass(Char, 'Char', VOID, VOID, [Comparable]);
initMetadataForInterface(Collection, 'Collection');
initMetadataForInterface(KtSet, 'Set', VOID, VOID, [Collection]);
initMetadataForInterface(KtList, 'List', VOID, VOID, [Collection]);
initMetadataForInterface(Entry, 'Entry');
initMetadataForInterface(KtMap, 'Map');
initMetadataForCompanion(Companion);
initMetadataForClass(Enum, 'Enum', VOID, VOID, [Comparable]);
initMetadataForCompanion(Companion_0);
initMetadataForClass(Long, 'Long', VOID, Number_0, [Comparable]);
initMetadataForInterface(FunctionAdapter, 'FunctionAdapter');
initMetadataForObject(Digit, 'Digit');
initMetadataForInterface(Comparator, 'Comparator');
initMetadataForObject(Unit, 'Unit');
initMetadataForClass(AbstractCollection, 'AbstractCollection', VOID, VOID, [Collection]);
initMetadataForClass(AbstractMutableCollection, 'AbstractMutableCollection', VOID, AbstractCollection, [Collection]);
initMetadataForClass(IteratorImpl, 'IteratorImpl');
initMetadataForClass(AbstractMutableList, 'AbstractMutableList', VOID, AbstractMutableCollection, [KtList, Collection]);
initMetadataForClass(AbstractMap, 'AbstractMap', VOID, VOID, [KtMap]);
initMetadataForClass(AbstractMutableMap, 'AbstractMutableMap', VOID, AbstractMap, [KtMap]);
initMetadataForClass(AbstractMutableSet, 'AbstractMutableSet', VOID, AbstractMutableCollection, [KtSet, Collection]);
initMetadataForCompanion(Companion_1);
initMetadataForInterface(RandomAccess, 'RandomAccess');
initMetadataForClass(ArrayList, 'ArrayList', ArrayList_init_$Create$, AbstractMutableList, [KtList, Collection, RandomAccess]);
initMetadataForClass(HashMap, 'HashMap', HashMap_init_$Create$, AbstractMutableMap, [KtMap]);
initMetadataForClass(HashMapEntrySetBase, 'HashMapEntrySetBase', VOID, AbstractMutableSet, [KtSet, Collection]);
initMetadataForClass(HashMapEntrySet, 'HashMapEntrySet', VOID, HashMapEntrySetBase);
initMetadataForClass(HashSet, 'HashSet', HashSet_init_$Create$, AbstractMutableSet, [KtSet, Collection]);
initMetadataForCompanion(Companion_2);
initMetadataForClass(Itr, 'Itr');
initMetadataForClass(KeysItr, 'KeysItr', VOID, Itr);
initMetadataForClass(EntriesItr, 'EntriesItr', VOID, Itr);
initMetadataForClass(EntryRef, 'EntryRef', VOID, VOID, [Entry]);
function containsAllEntries(m) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.all' call
    var tmp;
    if (isInterface(m, Collection)) {
      tmp = m.j();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = true;
      break $l$block_0;
    }
    var _iterator__ex2g4s = m.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var entry = element;
      var tmp_0;
      if (!(entry == null) ? isInterface(entry, Entry) : false) {
        tmp_0 = this.r4(entry);
      } else {
        tmp_0 = false;
      }
      if (!tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
}
initMetadataForInterface(InternalMap, 'InternalMap');
initMetadataForClass(InternalHashMap, 'InternalHashMap', InternalHashMap_init_$Create$, VOID, [InternalMap]);
initMetadataForClass(LinkedHashMap, 'LinkedHashMap', LinkedHashMap_init_$Create$, HashMap, [KtMap]);
initMetadataForObject(EmptyHolder, 'EmptyHolder');
initMetadataForClass(LinkedHashSet, 'LinkedHashSet', LinkedHashSet_init_$Create$, HashSet, [KtSet, Collection]);
initMetadataForInterface(Continuation, 'Continuation');
initMetadataForClass(InterceptedCoroutine, 'InterceptedCoroutine', VOID, VOID, [Continuation]);
initMetadataForClass(CoroutineImpl, 'CoroutineImpl', VOID, InterceptedCoroutine, [Continuation]);
initMetadataForObject(CompletedContinuation, 'CompletedContinuation', VOID, VOID, [Continuation]);
initMetadataForClass(createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1, VOID, VOID, CoroutineImpl);
initMetadataForClass(Exception, 'Exception', Exception_init_$Create$, Error);
initMetadataForClass(RuntimeException, 'RuntimeException', RuntimeException_init_$Create$, Exception);
initMetadataForClass(UnsupportedOperationException, 'UnsupportedOperationException', UnsupportedOperationException_init_$Create$, RuntimeException);
initMetadataForClass(IllegalArgumentException, 'IllegalArgumentException', IllegalArgumentException_init_$Create$, RuntimeException);
initMetadataForClass(NoSuchElementException, 'NoSuchElementException', NoSuchElementException_init_$Create$, RuntimeException);
initMetadataForClass(IndexOutOfBoundsException, 'IndexOutOfBoundsException', IndexOutOfBoundsException_init_$Create$, RuntimeException);
initMetadataForClass(IllegalStateException, 'IllegalStateException', IllegalStateException_init_$Create$, RuntimeException);
initMetadataForClass(ConcurrentModificationException, 'ConcurrentModificationException', ConcurrentModificationException_init_$Create$, RuntimeException);
initMetadataForClass(ArithmeticException, 'ArithmeticException', ArithmeticException_init_$Create$, RuntimeException);
initMetadataForClass(NumberFormatException, 'NumberFormatException', NumberFormatException_init_$Create$, IllegalArgumentException);
initMetadataForClass(Error_0, 'Error', Error_init_$Create$, Error);
initMetadataForClass(NoWhenBranchMatchedException, 'NoWhenBranchMatchedException', NoWhenBranchMatchedException_init_$Create$, RuntimeException);
initMetadataForClass(NullPointerException, 'NullPointerException', NullPointerException_init_$Create$, RuntimeException);
initMetadataForClass(ClassCastException, 'ClassCastException', ClassCastException_init_$Create$, RuntimeException);
initMetadataForClass(KClassImpl, 'KClassImpl');
initMetadataForClass(PrimitiveKClassImpl, 'PrimitiveKClassImpl', VOID, KClassImpl);
initMetadataForObject(NothingKClassImpl, 'NothingKClassImpl', VOID, KClassImpl);
initMetadataForClass(StringBuilder, 'StringBuilder', StringBuilder_init_$Create$_0, VOID, [CharSequence]);
initMetadataForCompanion(Companion_3);
initMetadataForClass(Regex, 'Regex');
initMetadataForClass(RegexOption, 'RegexOption', VOID, Enum);
initMetadataForClass(MatchGroup, 'MatchGroup');
initMetadataForInterface(MatchNamedGroupCollection, 'MatchNamedGroupCollection', VOID, VOID, [Collection]);
initMetadataForClass(findNext$1$groups$1, VOID, VOID, AbstractCollection, [MatchNamedGroupCollection]);
initMetadataForClass(AbstractList, 'AbstractList', VOID, AbstractCollection, [KtList]);
initMetadataForClass(findNext$1$groupValues$1, VOID, VOID, AbstractList);
initMetadataForClass(findNext$1);
initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(AbstractIterator, 'AbstractIterator');
initMetadataForClass(IteratorImpl_0, 'IteratorImpl');
initMetadataForCompanion(Companion_4);
initMetadataForCompanion(Companion_5);
initMetadataForCompanion(Companion_6);
initMetadataForObject(EmptyIterator, 'EmptyIterator');
initMetadataForObject(EmptyList, 'EmptyList', VOID, VOID, [KtList, RandomAccess]);
initMetadataForInterface(MapWithDefault, 'MapWithDefault', VOID, VOID, [KtMap]);
initMetadataForObject(EmptyMap, 'EmptyMap', VOID, VOID, [KtMap]);
initMetadataForClass(IntIterator, 'IntIterator');
initMetadataForClass(SequenceScope, 'SequenceScope', VOID, VOID, VOID, [1]);
initMetadataForClass(SequenceBuilderIterator, 'SequenceBuilderIterator', SequenceBuilderIterator, SequenceScope, [Continuation], [1]);
initMetadataForClass(TransformingSequence$iterator$1);
initMetadataForClass(TransformingSequence, 'TransformingSequence');
initMetadataForObject(EmptySet, 'EmptySet', VOID, VOID, [KtSet]);
initMetadataForClass(RingBuffer$iterator$1, VOID, VOID, AbstractIterator);
initMetadataForClass(RingBuffer, 'RingBuffer', VOID, AbstractList, [RandomAccess]);
initMetadataForLambda(windowedIterator$slambda, CoroutineImpl, VOID, [1]);
initMetadataForObject(Key, 'Key');
function releaseInterceptedContinuation(continuation) {
}
initMetadataForInterface(ContinuationInterceptor, 'ContinuationInterceptor');
initMetadataForObject(EmptyCoroutineContext, 'EmptyCoroutineContext');
initMetadataForClass(CoroutineSingletons, 'CoroutineSingletons', VOID, Enum);
initMetadataForClass(EnumEntriesList, 'EnumEntriesList', VOID, AbstractList, [KtList, RandomAccess]);
initMetadataForCompanion(Companion_7);
initMetadataForClass(IntProgression, 'IntProgression');
initMetadataForClass(IntRange, 'IntRange', VOID, IntProgression);
initMetadataForClass(IntProgressionIterator, 'IntProgressionIterator', VOID, IntIterator);
initMetadataForCompanion(Companion_8);
initMetadataForCompanion(Companion_9);
initMetadataForClass(Failure, 'Failure');
initMetadataForClass(NotImplementedError, 'NotImplementedError', NotImplementedError, Error_0);
initMetadataForClass(Pair, 'Pair');
initMetadataForClass(Triple, 'Triple');
initMetadataForClass(BrickMarketplace, 'BrickMarketplace', VOID, Enum);
initMetadataForClass(MarketplaceQuote, 'MarketplaceQuote');
initMetadataForClass(CostSuggestionActionType, 'CostSuggestionActionType', VOID, Enum);
initMetadataForClass(CostSavingSuggestion, 'CostSavingSuggestion');
initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(MarketplaceCartBuilder, 'MarketplaceCartBuilder');
initMetadataForClass(sam$kotlin_Comparator$0_1, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_2, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_3, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_4, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_5, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(MosaicConverterEngine, 'MosaicConverterEngine');
initMetadataForClass(MarketplaceCsvFormat, 'MarketplaceCsvFormat', VOID, Enum);
initMetadataForObject(MosaicExporter, 'MosaicExporter');
initMetadataForClass(sam$kotlin_Comparator$0_6, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_7, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(GeminiModelFailover, 'GeminiModelFailover', VOID, VOID, VOID, [2]);
initMetadataForObject(ImageRequestParser, 'ImageRequestParser');
initMetadataForClass(AvailabilityTier, 'AvailabilityTier', VOID, Enum);
initMetadataForClass(BrickColor, 'BrickColor');
initMetadataForClass(PalettePreset, 'PalettePreset', VOID, Enum);
initMetadataForClass(BrickPartType, 'BrickPartType', VOID, Enum);
initMetadataForClass(BuildStyle, 'BuildStyle', VOID, Enum);
initMetadataForClass(BackingSystem, 'BackingSystem', VOID, Enum);
initMetadataForClass(RarityPreference, 'RarityPreference', VOID, Enum);
initMetadataForObject(BrickCatalog, 'BrickCatalog');
initMetadataForCompanion(Companion_10);
initMetadataForClass(SizePreset, 'SizePreset');
initMetadataForClass(MosaicConfig, 'MosaicConfig', MosaicConfig);
initMetadataForClass(PlacedPiece, 'PlacedPiece');
initMetadataForClass(TechnicPinConnection, 'TechnicPinConnection');
initMetadataForClass(ValidationSeverity, 'ValidationSeverity', VOID, Enum);
initMetadataForClass(ValidationCategory, 'ValidationCategory', VOID, Enum);
initMetadataForClass(ValidationIssue, 'ValidationIssue');
initMetadataForClass(ValidationReport, 'ValidationReport');
initMetadataForClass(PartBomLine, 'PartBomLine');
initMetadataForClass(StepFocusRegion, 'StepFocusRegion');
initMetadataForClass(BuildStep, 'BuildStep');
initMetadataForClass(PricingSummary, 'PricingSummary');
initMetadataForClass(MosaicResult, 'MosaicResult');
initMetadataForClass(PickABrickRegion, 'PickABrickRegion', VOID, Enum);
initMetadataForClass(Bitmap, 'Bitmap');
initMetadataForObject(Color, 'Color');
initMetadataForClass(WebConfig, 'WebConfig');
initMetadataForObject(WebBridge, 'WebBridge');
initMetadataForCompanion(Companion_11);
initMetadataForClass(Json, 'Json');
//endregion
function CharSequence() {
}
function Comparable() {
}
function Number_0() {
}
function indexOf(_this__u8e3s4, element) {
  if (element == null) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (_this__u8e3s4[index] == null) {
          return index;
        }
      }
       while (inductionVariable <= last);
  } else {
    var inductionVariable_0 = 0;
    var last_0 = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        if (equals(element, _this__u8e3s4[index_0])) {
          return index_0;
        }
      }
       while (inductionVariable_0 <= last_0);
  }
  return -1;
}
function get_lastIndex(_this__u8e3s4) {
  return _this__u8e3s4.length - 1 | 0;
}
function joinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo(_this__u8e3s4, StringBuilder_init_$Create$_0(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function joinTo(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.e(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  $l$loop: while (inductionVariable < last) {
    var element = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    count = count + 1 | 0;
    if (count > 1) {
      buffer.e(separator);
    }
    if (limit < 0 || count <= limit) {
      appendElement(buffer, element, transform);
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.e(truncated);
  }
  buffer.e(postfix);
  return buffer;
}
function joinToString_0(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo_0(_this__u8e3s4, StringBuilder_init_$Create$_0(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function toList(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.length) {
    case 0:
      tmp = emptyList();
      break;
    case 1:
      tmp = listOf(_this__u8e3s4[0]);
      break;
    default:
      // Inline function 'kotlin.collections.copyOf' call

      // Inline function 'kotlin.collections.copyOf' call

      // Inline function 'kotlin.js.asDynamic' call

      var tmp$ret$0 = _this__u8e3s4.slice();
      tmp = asList(tmp$ret$0);
      break;
  }
  return tmp;
}
function toSet(_this__u8e3s4) {
  switch (_this__u8e3s4.length) {
    case 0:
      return emptySet();
    case 1:
      return setOf(_this__u8e3s4[0]);
    default:
      return toCollection(_this__u8e3s4, LinkedHashSet_init_$Create$_1(mapCapacity(_this__u8e3s4.length)));
  }
}
function joinTo_0(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.e(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  $l$loop: while (inductionVariable < last) {
    var element = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    count = count + 1 | 0;
    if (count > 1) {
      buffer.e(separator);
    }
    if (limit < 0 || count <= limit) {
      if (!(transform == null))
        buffer.e(transform(element));
      else
        buffer.e(element.toString());
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.e(truncated);
  }
  buffer.e(postfix);
  return buffer;
}
function toCollection(_this__u8e3s4, destination) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  while (inductionVariable < last) {
    var item = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    destination.f(item);
  }
  return destination;
}
function single(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.length) {
    case 0:
      throw NoSuchElementException_init_$Create$_0('Array is empty.');
    case 1:
      tmp = _this__u8e3s4[0];
      break;
    default:
      throw IllegalArgumentException_init_$Create$_0('Array has more than one element.');
  }
  return tmp;
}
function getOrNull(_this__u8e3s4, index) {
  return (0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false) ? _this__u8e3s4[index] : null;
}
function joinToString_1(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo_1(_this__u8e3s4, StringBuilder_init_$Create$_0(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function joinTo_1(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.e(prefix);
  var count = 0;
  var _iterator__ex2g4s = _this__u8e3s4.g();
  $l$loop: while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    count = count + 1 | 0;
    if (count > 1) {
      buffer.e(separator);
    }
    if (limit < 0 || count <= limit) {
      appendElement(buffer, element, transform);
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.e(truncated);
  }
  buffer.e(postfix);
  return buffer;
}
function first(_this__u8e3s4) {
  if (_this__u8e3s4.j())
    throw NoSuchElementException_init_$Create$_0('List is empty.');
  return _this__u8e3s4.k(0);
}
function toSet_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection)) {
    var tmp;
    switch (_this__u8e3s4.l()) {
      case 0:
        tmp = emptySet();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList)) {
          tmp_0 = _this__u8e3s4.k(0);
        } else {
          tmp_0 = _this__u8e3s4.g().i();
        }

        tmp = setOf(tmp_0);
        break;
      default:
        tmp = toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$_1(mapCapacity(_this__u8e3s4.l())));
        break;
    }
    return tmp;
  }
  return optimizeReadOnlySet(toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$()));
}
function take(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested element count ' + n + ' is less than zero.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  if (n === 0)
    return emptyList();
  if (isInterface(_this__u8e3s4, Collection)) {
    if (n >= _this__u8e3s4.l())
      return toList_0(_this__u8e3s4);
    if (n === 1)
      return listOf(first_0(_this__u8e3s4));
  }
  var count = 0;
  var list = ArrayList_init_$Create$_0(n);
  var _iterator__ex2g4s = _this__u8e3s4.g();
  $l$loop: while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    list.f(item);
    count = count + 1 | 0;
    if (count === n)
      break $l$loop;
  }
  return optimizeReadOnlyList(list);
}
function sortedWith(_this__u8e3s4, comparator) {
  if (isInterface(_this__u8e3s4, Collection)) {
    if (_this__u8e3s4.l() <= 1)
      return toList_0(_this__u8e3s4);
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp = copyToArray(_this__u8e3s4);
    // Inline function 'kotlin.apply' call
    var this_0 = isArray(tmp) ? tmp : THROW_CCE();
    sortWith(this_0, comparator);
    return asList(this_0);
  }
  // Inline function 'kotlin.apply' call
  var this_1 = toMutableList(_this__u8e3s4);
  sortWith_0(this_1, comparator);
  return this_1;
}
function chunked(_this__u8e3s4, size) {
  return windowed(_this__u8e3s4, size, size, true);
}
function distinct(_this__u8e3s4) {
  return toList_0(toMutableSet(_this__u8e3s4));
}
function plus(_this__u8e3s4, elements) {
  if (isInterface(elements, Collection)) {
    var result = ArrayList_init_$Create$_0(_this__u8e3s4.l() + elements.l() | 0);
    result.p(_this__u8e3s4);
    result.p(elements);
    return result;
  } else {
    var result_0 = ArrayList_init_$Create$_1(_this__u8e3s4);
    addAll(result_0, elements);
    return result_0;
  }
}
function toCollection_0(_this__u8e3s4, destination) {
  var _iterator__ex2g4s = _this__u8e3s4.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    destination.f(item);
  }
  return destination;
}
function toList_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection)) {
    var tmp;
    switch (_this__u8e3s4.l()) {
      case 0:
        tmp = emptyList();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList)) {
          tmp_0 = _this__u8e3s4.k(0);
        } else {
          tmp_0 = _this__u8e3s4.g().i();
        }

        tmp = listOf(tmp_0);
        break;
      default:
        tmp = toMutableList_0(_this__u8e3s4);
        break;
    }
    return tmp;
  }
  return optimizeReadOnlyList(toMutableList(_this__u8e3s4));
}
function first_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList))
    return first(_this__u8e3s4);
  else {
    var iterator = _this__u8e3s4.g();
    if (!iterator.h())
      throw NoSuchElementException_init_$Create$_0('Collection is empty.');
    return iterator.i();
  }
}
function toMutableList(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection))
    return toMutableList_0(_this__u8e3s4);
  return toCollection_0(_this__u8e3s4, ArrayList_init_$Create$());
}
function windowed(_this__u8e3s4, size, step, partialWindows) {
  step = step === VOID ? 1 : step;
  partialWindows = partialWindows === VOID ? false : partialWindows;
  checkWindowSizeStep(size, step);
  var tmp;
  if (isInterface(_this__u8e3s4, RandomAccess)) {
    tmp = isInterface(_this__u8e3s4, KtList);
  } else {
    tmp = false;
  }
  if (tmp) {
    var thisSize = _this__u8e3s4.l();
    var resultCapacity = (thisSize / step | 0) + ((thisSize % step | 0) === 0 ? 0 : 1) | 0;
    var result = ArrayList_init_$Create$_0(resultCapacity);
    var index = 0;
    $l$loop: while (0 <= index ? index < thisSize : false) {
      var windowSize = coerceAtMost(size, thisSize - index | 0);
      if (windowSize < size && !partialWindows)
        break $l$loop;
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var list = ArrayList_init_$Create$_0(windowSize);
      // Inline function 'kotlin.repeat' call
      var inductionVariable = 0;
      if (inductionVariable < windowSize)
        do {
          var index_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp$ret$4 = _this__u8e3s4.k(index_0 + index | 0);
          list.f(tmp$ret$4);
        }
         while (inductionVariable < windowSize);
      result.f(list);
      index = index + step | 0;
    }
    return result;
  }
  var result_0 = ArrayList_init_$Create$();
  // Inline function 'kotlin.collections.forEach' call
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s = windowedIterator(_this__u8e3s4.g(), size, step, partialWindows, false);
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    result_0.f(element);
  }
  return result_0;
}
function toMutableSet(_this__u8e3s4) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection)) {
    tmp = LinkedHashSet_init_$Create$_0(_this__u8e3s4);
  } else {
    tmp = toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$());
  }
  return tmp;
}
function toMutableList_0(_this__u8e3s4) {
  return ArrayList_init_$Create$_1(_this__u8e3s4);
}
function asSequence(_this__u8e3s4) {
  // Inline function 'kotlin.sequences.Sequence' call
  return new asSequence$$inlined$Sequence$1(_this__u8e3s4);
}
function asSequence$$inlined$Sequence$1($this_asSequence) {
  this.q_1 = $this_asSequence;
}
protoOf(asSequence$$inlined$Sequence$1).g = function () {
  return this.q_1.g();
};
function downTo(_this__u8e3s4, to) {
  return Companion_instance_8.r(_this__u8e3s4, to, -1);
}
function coerceAtMost(_this__u8e3s4, maximumValue) {
  return _this__u8e3s4 > maximumValue ? maximumValue : _this__u8e3s4;
}
function coerceAtLeast(_this__u8e3s4, minimumValue) {
  return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
}
function coerceAtLeast_0(_this__u8e3s4, minimumValue) {
  return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
}
function coerceIn(_this__u8e3s4, minimumValue, maximumValue) {
  if (minimumValue > maximumValue)
    throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
  if (_this__u8e3s4 < minimumValue)
    return minimumValue;
  if (_this__u8e3s4 > maximumValue)
    return maximumValue;
  return _this__u8e3s4;
}
function coerceIn_0(_this__u8e3s4, minimumValue, maximumValue) {
  if (minimumValue > maximumValue)
    throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
  if (_this__u8e3s4 < minimumValue)
    return minimumValue;
  if (_this__u8e3s4 > maximumValue)
    return maximumValue;
  return _this__u8e3s4;
}
function coerceIn_1(_this__u8e3s4, minimumValue, maximumValue) {
  if (minimumValue > maximumValue)
    throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
  if (_this__u8e3s4 < minimumValue)
    return minimumValue;
  if (_this__u8e3s4 > maximumValue)
    return maximumValue;
  return _this__u8e3s4;
}
function map(_this__u8e3s4, transform) {
  return new TransformingSequence(_this__u8e3s4, transform);
}
function _Char___init__impl__6a9atx(value) {
  return value;
}
function _get_value__a43j40($this) {
  return $this;
}
function _Char___init__impl__6a9atx_0(code) {
  // Inline function 'kotlin.UShort.toInt' call
  var tmp$ret$0 = _UShort___get_data__impl__g0245(code) & 65535;
  return _Char___init__impl__6a9atx(tmp$ret$0);
}
function Char__compareTo_impl_ypi4mb($this, other) {
  return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
}
function Char__plus_impl_qi7pgj($this, other) {
  return numberToChar(_get_value__a43j40($this) + other | 0);
}
function Char__minus_impl_a2frrh($this, other) {
  return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
}
function Char__toInt_impl_vasixd($this) {
  return _get_value__a43j40($this);
}
function toString($this) {
  // Inline function 'kotlin.js.unsafeCast' call
  return String.fromCharCode(_get_value__a43j40($this));
}
function Char() {
}
function Collection() {
}
function KtSet() {
}
function KtList() {
}
function Entry() {
}
function KtMap() {
}
function Companion() {
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
function Enum(name, ordinal) {
  this.z_1 = name;
  this.a1_1 = ordinal;
}
protoOf(Enum).b1 = function (other) {
  return compareTo(this.a1_1, other.a1_1);
};
protoOf(Enum).d = function (other) {
  return this.b1(other instanceof Enum ? other : THROW_CCE());
};
protoOf(Enum).equals = function (other) {
  return this === other;
};
protoOf(Enum).hashCode = function () {
  return identityHashCode(this);
};
protoOf(Enum).toString = function () {
  return this.z_1;
};
function toString_0(_this__u8e3s4) {
  var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : toString_1(_this__u8e3s4);
  return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
}
function Companion_0() {
  Companion_instance_0 = this;
  this.c1_1 = new Long(0, -2147483648);
  this.d1_1 = new Long(-1, 2147483647);
  this.e1_1 = 8;
  this.f1_1 = 64;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 == null)
    new Companion_0();
  return Companion_instance_0;
}
function Long(low, high) {
  Companion_getInstance_0();
  Number_0.call(this);
  this.g1_1 = low;
  this.h1_1 = high;
}
protoOf(Long).i1 = function (other) {
  return compare(this, other);
};
protoOf(Long).d = function (other) {
  return this.i1(other instanceof Long ? other : THROW_CCE());
};
protoOf(Long).toString = function () {
  return toStringImpl(this, 10);
};
protoOf(Long).equals = function (other) {
  var tmp;
  if (other instanceof Long) {
    tmp = equalsLong(this, other);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(Long).hashCode = function () {
  return hashCode(this);
};
protoOf(Long).valueOf = function () {
  return toNumber(this);
};
function abs(_this__u8e3s4) {
  var tmp;
  // Inline function 'kotlin.js.internal.isNegative' call
  if (_this__u8e3s4 < 0) {
    // Inline function 'kotlin.js.internal.unaryMinus' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = -_this__u8e3s4;
  } else {
    tmp = _this__u8e3s4;
  }
  return tmp;
}
function FunctionAdapter() {
}
function booleanArray(size) {
  var tmp0 = 'BooleanArray';
  // Inline function 'withType' call
  var array = fillArrayVal(Array(size), false);
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function fillArrayVal(array, initValue) {
  var inductionVariable = 0;
  var last = array.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      array[i] = initValue;
    }
     while (!(i === last));
  return array;
}
function charArrayOf(arr) {
  var tmp0 = 'CharArray';
  // Inline function 'withType' call
  var array = new Uint16Array(arr);
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function get_buf() {
  _init_properties_bitUtils_kt__nfcg4k();
  return buf;
}
var buf;
function get_bufFloat64() {
  _init_properties_bitUtils_kt__nfcg4k();
  return bufFloat64;
}
var bufFloat64;
var bufFloat32;
function get_bufInt32() {
  _init_properties_bitUtils_kt__nfcg4k();
  return bufInt32;
}
var bufInt32;
function get_lowIndex() {
  _init_properties_bitUtils_kt__nfcg4k();
  return lowIndex;
}
var lowIndex;
function get_highIndex() {
  _init_properties_bitUtils_kt__nfcg4k();
  return highIndex;
}
var highIndex;
function doubleToRawBits(value) {
  _init_properties_bitUtils_kt__nfcg4k();
  get_bufFloat64()[0] = value;
  return new Long(get_bufInt32()[get_lowIndex()], get_bufInt32()[get_highIndex()]);
}
function getNumberHashCode(obj) {
  _init_properties_bitUtils_kt__nfcg4k();
  // Inline function 'kotlin.js.jsBitwiseOr' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  if ((obj | 0) === obj) {
    return numberToInt(obj);
  }
  get_bufFloat64()[0] = obj;
  return imul_0(get_bufInt32()[get_highIndex()], 31) + get_bufInt32()[get_lowIndex()] | 0;
}
var properties_initialized_bitUtils_kt_i2bo3e;
function _init_properties_bitUtils_kt__nfcg4k() {
  if (!properties_initialized_bitUtils_kt_i2bo3e) {
    properties_initialized_bitUtils_kt_i2bo3e = true;
    buf = new ArrayBuffer(8);
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bufFloat64 = new Float64Array(get_buf());
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bufFloat32 = new Float32Array(get_buf());
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bufInt32 = new Int32Array(get_buf());
    // Inline function 'kotlin.run' call
    get_bufFloat64()[0] = -1.0;
    lowIndex = !(get_bufInt32()[0] === 0) ? 1 : 0;
    highIndex = 1 - get_lowIndex() | 0;
  }
}
function get_ZERO() {
  _init_properties_boxedLong_kt__v24qrw();
  return ZERO;
}
var ZERO;
function get_ONE() {
  _init_properties_boxedLong_kt__v24qrw();
  return ONE;
}
var ONE;
function get_NEG_ONE() {
  _init_properties_boxedLong_kt__v24qrw();
  return NEG_ONE;
}
var NEG_ONE;
function get_MAX_VALUE() {
  _init_properties_boxedLong_kt__v24qrw();
  return MAX_VALUE;
}
var MAX_VALUE;
function get_MIN_VALUE() {
  _init_properties_boxedLong_kt__v24qrw();
  return MIN_VALUE;
}
var MIN_VALUE;
function get_TWO_PWR_24_() {
  _init_properties_boxedLong_kt__v24qrw();
  return TWO_PWR_24_;
}
var TWO_PWR_24_;
var longArrayClass;
function compare(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  if (equalsLong(_this__u8e3s4, other)) {
    return 0;
  }
  var thisNeg = isNegative(_this__u8e3s4);
  var otherNeg = isNegative(other);
  return thisNeg && !otherNeg ? -1 : !thisNeg && otherNeg ? 1 : isNegative(subtract(_this__u8e3s4, other)) ? -1 : 1;
}
function convertToInt(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.g1_1;
}
function toNumber(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.h1_1 * 4.294967296E9 + getLowBitsUnsigned(_this__u8e3s4);
}
function toStringImpl(_this__u8e3s4, radix) {
  _init_properties_boxedLong_kt__v24qrw();
  if (isZero(_this__u8e3s4)) {
    return '0';
  }
  if (isNegative(_this__u8e3s4)) {
    if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
      var radixLong = fromInt(radix);
      var div = divide(_this__u8e3s4, radixLong);
      var rem = convertToInt(subtract(multiply(div, radixLong), _this__u8e3s4));
      var tmp = toStringImpl(div, radix);
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      return tmp + rem.toString(radix);
    } else {
      return '-' + toStringImpl(negate(_this__u8e3s4), radix);
    }
  }
  var digitsPerTime = radix === 2 ? 31 : radix <= 10 ? 9 : radix <= 21 ? 7 : radix <= 35 ? 6 : 5;
  var radixToPower = fromNumber(Math.pow(radix, digitsPerTime));
  var rem_0 = _this__u8e3s4;
  var result = '';
  while (true) {
    var remDiv = divide(rem_0, radixToPower);
    var intval = convertToInt(subtract(rem_0, multiply(remDiv, radixToPower)));
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var digits = intval.toString(radix);
    rem_0 = remDiv;
    if (isZero(rem_0)) {
      return digits + result;
    } else {
      while (digits.length < digitsPerTime) {
        digits = '0' + digits;
      }
      result = digits + result;
    }
  }
}
function equalsLong(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.h1_1 === other.h1_1 && _this__u8e3s4.g1_1 === other.g1_1;
}
function hashCode(l) {
  _init_properties_boxedLong_kt__v24qrw();
  return l.g1_1 ^ l.h1_1;
}
function fromInt(value) {
  _init_properties_boxedLong_kt__v24qrw();
  return new Long(value, value < 0 ? -1 : 0);
}
function isNegative(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.h1_1 < 0;
}
function subtract(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return add(_this__u8e3s4, negate(other));
}
function getLowBitsUnsigned(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.g1_1 >= 0 ? _this__u8e3s4.g1_1 : 4.294967296E9 + _this__u8e3s4.g1_1;
}
function isZero(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.h1_1 === 0 && _this__u8e3s4.g1_1 === 0;
}
function multiply(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  if (isZero(_this__u8e3s4)) {
    return get_ZERO();
  } else if (isZero(other)) {
    return get_ZERO();
  }
  if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
    return isOdd(other) ? get_MIN_VALUE() : get_ZERO();
  } else if (equalsLong(other, get_MIN_VALUE())) {
    return isOdd(_this__u8e3s4) ? get_MIN_VALUE() : get_ZERO();
  }
  if (isNegative(_this__u8e3s4)) {
    var tmp;
    if (isNegative(other)) {
      tmp = multiply(negate(_this__u8e3s4), negate(other));
    } else {
      tmp = negate(multiply(negate(_this__u8e3s4), other));
    }
    return tmp;
  } else if (isNegative(other)) {
    return negate(multiply(_this__u8e3s4, negate(other)));
  }
  if (lessThan(_this__u8e3s4, get_TWO_PWR_24_()) && lessThan(other, get_TWO_PWR_24_())) {
    return fromNumber(toNumber(_this__u8e3s4) * toNumber(other));
  }
  var a48 = _this__u8e3s4.h1_1 >>> 16 | 0;
  var a32 = _this__u8e3s4.h1_1 & 65535;
  var a16 = _this__u8e3s4.g1_1 >>> 16 | 0;
  var a00 = _this__u8e3s4.g1_1 & 65535;
  var b48 = other.h1_1 >>> 16 | 0;
  var b32 = other.h1_1 & 65535;
  var b16 = other.g1_1 >>> 16 | 0;
  var b00 = other.g1_1 & 65535;
  var c48 = 0;
  var c32 = 0;
  var c16 = 0;
  var c00 = 0;
  c00 = c00 + imul_0(a00, b00) | 0;
  c16 = c16 + (c00 >>> 16 | 0) | 0;
  c00 = c00 & 65535;
  c16 = c16 + imul_0(a16, b00) | 0;
  c32 = c32 + (c16 >>> 16 | 0) | 0;
  c16 = c16 & 65535;
  c16 = c16 + imul_0(a00, b16) | 0;
  c32 = c32 + (c16 >>> 16 | 0) | 0;
  c16 = c16 & 65535;
  c32 = c32 + imul_0(a32, b00) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c32 = c32 + imul_0(a16, b16) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c32 = c32 + imul_0(a00, b32) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c48 = c48 + (((imul_0(a48, b00) + imul_0(a32, b16) | 0) + imul_0(a16, b32) | 0) + imul_0(a00, b48) | 0) | 0;
  c48 = c48 & 65535;
  return new Long(c16 << 16 | c00, c48 << 16 | c32);
}
function negate(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return add(invert(_this__u8e3s4), new Long(1, 0));
}
function fromNumber(value) {
  _init_properties_boxedLong_kt__v24qrw();
  if (isNaN_0(value)) {
    return get_ZERO();
  } else if (value <= -9.223372036854776E18) {
    return get_MIN_VALUE();
  } else if (value + 1 >= 9.223372036854776E18) {
    return get_MAX_VALUE();
  } else if (value < 0) {
    return negate(fromNumber(-value));
  } else {
    var twoPwr32 = 4.294967296E9;
    // Inline function 'kotlin.js.jsBitwiseOr' call
    var tmp = value % twoPwr32 | 0;
    // Inline function 'kotlin.js.jsBitwiseOr' call
    var tmp$ret$1 = value / twoPwr32 | 0;
    return new Long(tmp, tmp$ret$1);
  }
}
function add(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  var a48 = _this__u8e3s4.h1_1 >>> 16 | 0;
  var a32 = _this__u8e3s4.h1_1 & 65535;
  var a16 = _this__u8e3s4.g1_1 >>> 16 | 0;
  var a00 = _this__u8e3s4.g1_1 & 65535;
  var b48 = other.h1_1 >>> 16 | 0;
  var b32 = other.h1_1 & 65535;
  var b16 = other.g1_1 >>> 16 | 0;
  var b00 = other.g1_1 & 65535;
  var c48 = 0;
  var c32 = 0;
  var c16 = 0;
  var c00 = 0;
  c00 = c00 + (a00 + b00 | 0) | 0;
  c16 = c16 + (c00 >>> 16 | 0) | 0;
  c00 = c00 & 65535;
  c16 = c16 + (a16 + b16 | 0) | 0;
  c32 = c32 + (c16 >>> 16 | 0) | 0;
  c16 = c16 & 65535;
  c32 = c32 + (a32 + b32 | 0) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c48 = c48 + (a48 + b48 | 0) | 0;
  c48 = c48 & 65535;
  return new Long(c16 << 16 | c00, c48 << 16 | c32);
}
function isOdd(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return (_this__u8e3s4.g1_1 & 1) === 1;
}
function lessThan(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return compare(_this__u8e3s4, other) < 0;
}
function invert(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return new Long(~_this__u8e3s4.g1_1, ~_this__u8e3s4.h1_1);
}
function divide(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  if (isZero(other)) {
    throw Exception_init_$Create$_0('division by zero');
  } else if (isZero(_this__u8e3s4)) {
    return get_ZERO();
  }
  if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
    if (equalsLong(other, get_ONE()) || equalsLong(other, get_NEG_ONE())) {
      return get_MIN_VALUE();
    } else if (equalsLong(other, get_MIN_VALUE())) {
      return get_ONE();
    } else {
      var halfThis = shiftRight(_this__u8e3s4, 1);
      var approx = shiftLeft(divide(halfThis, other), 1);
      if (equalsLong(approx, get_ZERO())) {
        return isNegative(other) ? get_ONE() : get_NEG_ONE();
      } else {
        var rem = subtract(_this__u8e3s4, multiply(other, approx));
        return add(approx, divide(rem, other));
      }
    }
  } else if (equalsLong(other, get_MIN_VALUE())) {
    return get_ZERO();
  }
  if (isNegative(_this__u8e3s4)) {
    var tmp;
    if (isNegative(other)) {
      tmp = divide(negate(_this__u8e3s4), negate(other));
    } else {
      tmp = negate(divide(negate(_this__u8e3s4), other));
    }
    return tmp;
  } else if (isNegative(other)) {
    return negate(divide(_this__u8e3s4, negate(other)));
  }
  var res = get_ZERO();
  var rem_0 = _this__u8e3s4;
  while (greaterThanOrEqual(rem_0, other)) {
    var approxDouble = toNumber(rem_0) / toNumber(other);
    var approx2 = Math.max(1.0, Math.floor(approxDouble));
    var log2 = Math.ceil(Math.log(approx2) / Math.LN2);
    var delta = log2 <= 48 ? 1.0 : Math.pow(2.0, log2 - 48);
    var approxRes = fromNumber(approx2);
    var approxRem = multiply(approxRes, other);
    while (isNegative(approxRem) || greaterThan(approxRem, rem_0)) {
      approx2 = approx2 - delta;
      approxRes = fromNumber(approx2);
      approxRem = multiply(approxRes, other);
    }
    if (isZero(approxRes)) {
      approxRes = get_ONE();
    }
    res = add(res, approxRes);
    rem_0 = subtract(rem_0, approxRem);
  }
  return res;
}
function shiftRight(_this__u8e3s4, numBits) {
  _init_properties_boxedLong_kt__v24qrw();
  var numBits_0 = numBits & 63;
  if (numBits_0 === 0) {
    return _this__u8e3s4;
  } else {
    if (numBits_0 < 32) {
      return new Long(_this__u8e3s4.g1_1 >>> numBits_0 | 0 | _this__u8e3s4.h1_1 << (32 - numBits_0 | 0), _this__u8e3s4.h1_1 >> numBits_0);
    } else {
      return new Long(_this__u8e3s4.h1_1 >> (numBits_0 - 32 | 0), _this__u8e3s4.h1_1 >= 0 ? 0 : -1);
    }
  }
}
function shiftLeft(_this__u8e3s4, numBits) {
  _init_properties_boxedLong_kt__v24qrw();
  var numBits_0 = numBits & 63;
  if (numBits_0 === 0) {
    return _this__u8e3s4;
  } else {
    if (numBits_0 < 32) {
      return new Long(_this__u8e3s4.g1_1 << numBits_0, _this__u8e3s4.h1_1 << numBits_0 | (_this__u8e3s4.g1_1 >>> (32 - numBits_0 | 0) | 0));
    } else {
      return new Long(0, _this__u8e3s4.g1_1 << (numBits_0 - 32 | 0));
    }
  }
}
function greaterThan(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return compare(_this__u8e3s4, other) > 0;
}
function greaterThanOrEqual(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return compare(_this__u8e3s4, other) >= 0;
}
function modulo(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return subtract(_this__u8e3s4, multiply(divide(_this__u8e3s4, other), other));
}
function bitwiseAnd(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return new Long(_this__u8e3s4.g1_1 & other.g1_1, _this__u8e3s4.h1_1 & other.h1_1);
}
function numberToLong(a) {
  _init_properties_boxedLong_kt__v24qrw();
  var tmp;
  if (a instanceof Long) {
    tmp = a;
  } else {
    tmp = fromNumber(a);
  }
  return tmp;
}
function isLongArray(a) {
  _init_properties_boxedLong_kt__v24qrw();
  return isJsArray(a) && a.$type$ === 'LongArray';
}
function longArrayClass$lambda(it) {
  _init_properties_boxedLong_kt__v24qrw();
  return !(it == null) ? isLongArray(it) : false;
}
var properties_initialized_boxedLong_kt_lfwt2;
function _init_properties_boxedLong_kt__v24qrw() {
  if (!properties_initialized_boxedLong_kt_lfwt2) {
    properties_initialized_boxedLong_kt_lfwt2 = true;
    ZERO = fromInt(0);
    ONE = fromInt(1);
    NEG_ONE = fromInt(-1);
    MAX_VALUE = new Long(-1, 2147483647);
    MIN_VALUE = new Long(0, -2147483648);
    TWO_PWR_24_ = fromInt(16777216);
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp = Array;
    longArrayClass = new PrimitiveKClassImpl(tmp, 'LongArray', longArrayClass$lambda);
  }
}
function charSequenceGet(a, index) {
  var tmp;
  if (isString(a)) {
    tmp = charCodeAt(a, index);
  } else {
    tmp = a.b(index);
  }
  return tmp;
}
function isString(a) {
  return typeof a === 'string';
}
function charCodeAt(_this__u8e3s4, index) {
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.charCodeAt(index);
}
function charSequenceLength(a) {
  var tmp;
  if (isString(a)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = a.length;
  } else {
    tmp = a.a();
  }
  return tmp;
}
function charSequenceSubSequence(a, startIndex, endIndex) {
  var tmp;
  if (isString(a)) {
    tmp = substring(a, startIndex, endIndex);
  } else {
    tmp = a.c(startIndex, endIndex);
  }
  return tmp;
}
function arrayToString(array) {
  return joinToString(array, ', ', '[', ']', VOID, VOID, arrayToString$lambda);
}
function contentEqualsInternal(_this__u8e3s4, other) {
  // Inline function 'kotlin.js.asDynamic' call
  var a = _this__u8e3s4;
  // Inline function 'kotlin.js.asDynamic' call
  var b = other;
  if (a === b)
    return true;
  if (a == null || b == null || !isArrayish(b) || a.length != b.length)
    return false;
  var inductionVariable = 0;
  var last = a.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
     while (inductionVariable < last);
  return true;
}
function contentHashCodeInternal(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  var a = _this__u8e3s4;
  if (a == null)
    return 0;
  var result = 1;
  var inductionVariable = 0;
  var last = a.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      result = imul_0(result, 31) + hashCode_0(a[i]) | 0;
    }
     while (inductionVariable < last);
  return result;
}
function arrayToString$lambda(it) {
  return toString_1(it);
}
function compareTo(a, b) {
  var tmp;
  switch (typeof a) {
    case 'number':
      var tmp_0;
      if (typeof b === 'number') {
        tmp_0 = doubleCompareTo(a, b);
      } else {
        if (b instanceof Long) {
          tmp_0 = doubleCompareTo(a, toNumber(b));
        } else {
          tmp_0 = primitiveCompareTo(a, b);
        }
      }

      tmp = tmp_0;
      break;
    case 'string':
    case 'boolean':
    case 'bigint':
      tmp = primitiveCompareTo(a, b);
      break;
    default:
      tmp = compareToDoNotIntrinsicify(a, b);
      break;
  }
  return tmp;
}
function doubleCompareTo(a, b) {
  var tmp;
  if (a < b) {
    tmp = -1;
  } else if (a > b) {
    tmp = 1;
  } else if (a === b) {
    var tmp_0;
    if (a !== 0) {
      tmp_0 = 0;
    } else {
      // Inline function 'kotlin.js.asDynamic' call
      var ia = 1 / a;
      var tmp_1;
      // Inline function 'kotlin.js.asDynamic' call
      if (ia === 1 / b) {
        tmp_1 = 0;
      } else {
        if (ia < 0) {
          tmp_1 = -1;
        } else {
          tmp_1 = 1;
        }
      }
      tmp_0 = tmp_1;
    }
    tmp = tmp_0;
  } else if (a !== a) {
    tmp = b !== b ? 0 : 1;
  } else {
    tmp = -1;
  }
  return tmp;
}
function primitiveCompareTo(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function compareToDoNotIntrinsicify(a, b) {
  return a.d(b);
}
function identityHashCode(obj) {
  return getObjectHashCode(obj);
}
function objectCreate(proto) {
  proto = proto === VOID ? null : proto;
  return Object.create(proto);
}
function defineProp(obj, name, getter, setter, enumerable) {
  return Object.defineProperty(obj, name, {configurable: true, get: getter, set: setter, enumerable: enumerable});
}
function getObjectHashCode(obj) {
  // Inline function 'kotlin.js.jsIn' call
  if (!('kotlinHashCodeValue$' in obj)) {
    var hash = calculateRandomHash();
    var descriptor = new Object();
    descriptor.value = hash;
    descriptor.enumerable = false;
    Object.defineProperty(obj, 'kotlinHashCodeValue$', descriptor);
  }
  // Inline function 'kotlin.js.unsafeCast' call
  return obj['kotlinHashCodeValue$'];
}
function calculateRandomHash() {
  // Inline function 'kotlin.js.jsBitwiseOr' call
  return Math.random() * 4.294967296E9 | 0;
}
function toString_1(o) {
  var tmp;
  if (o == null) {
    tmp = 'null';
  } else if (isArrayish(o)) {
    tmp = '[...]';
  } else if (!(typeof o.toString === 'function')) {
    tmp = anyToString(o);
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = o.toString();
  }
  return tmp;
}
function anyToString(o) {
  return Object.prototype.toString.call(o);
}
function equals(obj1, obj2) {
  if (obj1 == null) {
    return obj2 == null;
  }
  if (obj2 == null) {
    return false;
  }
  if (typeof obj1 === 'object' && typeof obj1.equals === 'function') {
    return obj1.equals(obj2);
  }
  if (obj1 !== obj1) {
    return obj2 !== obj2;
  }
  if (typeof obj1 === 'number' && typeof obj2 === 'number') {
    var tmp;
    if (obj1 === obj2) {
      var tmp_0;
      if (obj1 !== 0) {
        tmp_0 = true;
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp_1 = 1 / obj1;
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = tmp_1 === 1 / obj2;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  }
  if (isCallableReference(obj1) && isCallableReference(obj2)) {
    if (obj1 === obj2)
      return true;
    if (obj1.$id != obj2.$id)
      return false;
    if (obj1.$flags != obj2.$flags)
      return false;
    if (obj1.$arity != obj2.$arity)
      return false;
    if (obj1.$bound == null && obj2.$bound == null)
      return true;
    if (obj1.$bound === obj2.$bound)
      return true;
    if (!isJsArray(obj1.$bound) || !isJsArray(obj2.$bound))
      return false;
    // Inline function 'kotlin.js.unsafeCast' call
    var bound1 = obj1.$bound;
    // Inline function 'kotlin.js.unsafeCast' call
    var bound2 = obj2.$bound;
    return contentEqualsInternal(bound1, bound2);
  }
  return obj1 === obj2;
}
function hashCode_0(obj) {
  if (obj == null)
    return 0;
  var typeOf = typeof obj;
  var tmp;
  switch (typeOf) {
    case 'object':
      tmp = 'function' === typeof obj.hashCode ? obj.hashCode() : getObjectHashCode(obj);
      break;
    case 'function':
      tmp = isCallableReference(obj) ? getCallableReferenceHashCode(obj) : getObjectHashCode(obj);
      break;
    case 'number':
      tmp = getNumberHashCode(obj);
      break;
    case 'boolean':
      // Inline function 'kotlin.js.unsafeCast' call

      tmp = getBooleanHashCode(obj);
      break;
    case 'string':
      tmp = getStringHashCode(String(obj));
      break;
    case 'bigint':
      // Inline function 'kotlin.js.unsafeCast' call

      tmp = getBigIntHashCode(obj);
      break;
    case 'symbol':
      tmp = getSymbolHashCode(obj);
      break;
    default:
      tmp = function () {
        throw new Error('Unexpected typeof `' + typeOf + '`');
      }();
      break;
  }
  return tmp;
}
function getCallableReferenceHashCode(obj) {
  // Inline function 'kotlin.js.unsafeCast' call
  var hash = obj.$flags;
  hash = imul_0(31, hash) + hashCode_0(obj.$id) | 0;
  var tmp = imul_0(31, hash);
  var tmp0_elvis_lhs = obj.$arity;
  // Inline function 'kotlin.js.unsafeCast' call
  hash = tmp + (tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs) | 0;
  var bound = obj.$bound;
  if (bound != null && isJsArray(bound)) {
    // Inline function 'kotlin.js.unsafeCast' call
    var boundArray = bound;
    hash = imul_0(31, hash) + contentHashCodeInternal(boundArray) | 0;
  }
  return hash;
}
function getBooleanHashCode(value) {
  return value ? 1231 : 1237;
}
function getStringHashCode(str) {
  var hash = 0;
  var length = str.length;
  var inductionVariable = 0;
  var last = length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      var code = str.charCodeAt(i);
      hash = imul_0(hash, 31) + code | 0;
    }
     while (!(i === last));
  return hash;
}
function getBigIntHashCode(value) {
  var shiftNumber = BigInt(32);
  var mask = BigInt(4.294967295E9);
  var bigNumber = abs(value);
  var hashCode = 0;
  var tmp;
  // Inline function 'kotlin.js.internal.isNegative' call
  if (value < 0) {
    tmp = -1;
  } else {
    tmp = 1;
  }
  var signum = tmp;
  $l$loop: while (true) {
    // Inline function 'kotlin.js.internal.isZero' call
    if (!!(bigNumber == 0)) {
      break $l$loop;
    }
    // Inline function 'kotlin.js.internal.and' call
    // Inline function 'kotlin.js.jsBitwiseAnd' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.internal.toNumber' call
    var self_0 = bigNumber & mask;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var chunk = Number(self_0);
    hashCode = imul_0(31, hashCode) + chunk | 0;
    // Inline function 'kotlin.js.internal.shr' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bigNumber = bigNumber >> shiftNumber;
  }
  return imul_0(hashCode, signum);
}
function getSymbolHashCode(value) {
  var hashCodeMap = symbolIsSharable(value) ? getSymbolMap() : getSymbolWeakMap();
  var cachedHashCode = hashCodeMap.get(value);
  if (cachedHashCode !== VOID)
    return cachedHashCode;
  var hash = calculateRandomHash();
  hashCodeMap.set(value, hash);
  return hash;
}
function symbolIsSharable(symbol) {
  return Symbol.keyFor(symbol) != VOID;
}
function getSymbolMap() {
  if (symbolMap === VOID) {
    symbolMap = new Map();
  }
  return symbolMap;
}
function getSymbolWeakMap() {
  if (symbolWeakMap === VOID) {
    symbolWeakMap = new WeakMap();
  }
  return symbolWeakMap;
}
var symbolMap;
var symbolWeakMap;
function unboxIntrinsic(x) {
  // Inline function 'kotlin.error' call
  var message = 'Should be lowered';
  throw IllegalStateException_init_$Create$_0(toString_1(message));
}
function captureStack(instance, constructorFunction) {
  if (Error.captureStackTrace != null) {
    Error.captureStackTrace(instance, constructorFunction);
  } else {
    // Inline function 'kotlin.js.asDynamic' call
    instance.stack = (new Error()).stack;
  }
}
function protoOf(constructor) {
  return constructor.prototype;
}
function defineMessage(message, cause) {
  var tmp;
  if (isUndefined(message)) {
    var tmp_0;
    if (isUndefined(cause)) {
      tmp_0 = message;
    } else {
      var tmp1_elvis_lhs = cause == null ? null : cause.toString();
      tmp_0 = tmp1_elvis_lhs == null ? VOID : tmp1_elvis_lhs;
    }
    tmp = tmp_0;
  } else {
    tmp = message == null ? VOID : message;
  }
  return tmp;
}
function isUndefined(value) {
  return value === VOID;
}
function extendThrowable(this_, message, cause) {
  defineFieldOnInstance(this_, 'message', defineMessage(message, cause));
  defineFieldOnInstance(this_, 'cause', cause);
  defineFieldOnInstance(this_, 'name', Object.getPrototypeOf(this_).constructor.name);
}
function defineFieldOnInstance(this_, name, value) {
  Object.defineProperty(this_, name, {configurable: true, writable: true, value: value});
}
function noWhenBranchMatchedException() {
  throw NoWhenBranchMatchedException_init_$Create$();
}
function THROW_NPE() {
  throw NullPointerException_init_$Create$();
}
function THROW_CCE() {
  throw ClassCastException_init_$Create$();
}
function ensureNotNull(v) {
  var tmp;
  if (v == null) {
    THROW_NPE();
  } else {
    tmp = v;
  }
  return tmp;
}
function jsGenerateInterfaceSymbol() {
  return generateInterfaceSymbolById();
}
function createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
  var undef = VOID;
  return {kind: kind, simpleName: name, associatedObjectKey: associatedObjectKey, associatedObjects: associatedObjects, suspendArity: suspendArity, $kClass$: undef, defaultConstructor: defaultConstructor};
}
function initMetadataForClass(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  var kind = 'class';
  initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
}
function initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  if (!(parent == null)) {
    ctor.prototype = Object.create(parent.prototype);
    ctor.prototype.constructor = ctor;
  }
  var metadata = createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity);
  ctor.$metadata$ = metadata;
  var prototype = ctor.prototype;
  if (!(interfaces == null)) {
    var inductionVariable = 0;
    var last = interfaces.length;
    while (inductionVariable < last) {
      var i = interfaces[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      Object.assign(prototype, i.prototype);
      prototype[i.Symbol] = true;
    }
  }
  if (kind === 'interface') {
    ctor.Symbol = generateInterfaceSymbolById();
  }
}
function generateInterfaceSymbolById() {
  return '#__interface_' + generateInterfaceId();
}
function generateInterfaceId() {
  if (globalInterfaceId === VOID) {
    globalInterfaceId = 0;
  }
  // Inline function 'kotlin.js.unsafeCast' call
  globalInterfaceId = globalInterfaceId + 1 | 0;
  return globalInterfaceId;
}
var globalInterfaceId;
function initMetadataForObject(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  var kind = 'object';
  initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
}
function initMetadataForInterface(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  var kind = 'interface';
  initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
}
function initMetadataForLambda(ctor, parent, interfaces, suspendArity) {
  initMetadataForClass(ctor, 'Lambda', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function initMetadataForCoroutine(ctor, parent, interfaces, suspendArity) {
  initMetadataForClass(ctor, 'Coroutine', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function initMetadataForFunctionReference(ctor, parent, interfaces, suspendArity) {
  initMetadataForClass(ctor, 'FunctionReference', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function initMetadataForCompanion(ctor, parent, interfaces, suspendArity) {
  initMetadataForObject(ctor, 'Companion', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function numberToInt(a) {
  var tmp;
  if (a instanceof Long) {
    tmp = convertToInt(a);
  } else {
    tmp = doubleToInt(a);
  }
  return tmp;
}
function doubleToInt(a) {
  var tmp;
  if (a > 2147483647) {
    tmp = 2147483647;
  } else if (a < -2147483648) {
    tmp = -2147483648;
  } else {
    // Inline function 'kotlin.js.jsBitwiseOr' call
    tmp = a | 0;
  }
  return tmp;
}
function toShort(a) {
  // Inline function 'kotlin.js.unsafeCast' call
  return a << 16 >> 16;
}
function numberToChar(a) {
  // Inline function 'kotlin.toUShort' call
  var this_0 = numberToInt(a);
  var tmp$ret$0 = _UShort___init__impl__jigrne(toShort(this_0));
  return _Char___init__impl__6a9atx_0(tmp$ret$0);
}
function numberRangeToNumber(start, endInclusive) {
  return new IntRange(start, endInclusive);
}
var propertyRefClassMetadataCache;
function metadataObject() {
  _init_properties_reflectRuntime_kt__5r4uu3();
  return createMetadata('class', VOID, VOID, VOID, VOID, VOID);
}
function constructCallableReference(callable, arity, flags, signatureId, name, bounds) {
  _init_properties_reflectRuntime_kt__5r4uu3();
  callable.callableName = name;
  callable.$flags = flags;
  callable.$arity = arity;
  callable.$id = signatureId;
  callable.$bound = bounds;
  return callable;
}
var properties_initialized_reflectRuntime_kt_inkhwd;
function _init_properties_reflectRuntime_kt__5r4uu3() {
  if (!properties_initialized_reflectRuntime_kt_inkhwd) {
    properties_initialized_reflectRuntime_kt_inkhwd = true;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = [metadataObject(), metadataObject()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = [metadataObject(), metadataObject()];
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    propertyRefClassMetadataCache = [tmp, tmp_0, [metadataObject(), metadataObject()]];
  }
}
function isArrayish(o) {
  return isJsArray(o) || isView(o);
}
function isJsArray(obj) {
  // Inline function 'kotlin.js.unsafeCast' call
  return Array.isArray(obj);
}
function isCallableReference(value) {
  return typeof value === 'function' && value.$flags != null && value.$arity != null;
}
function isInterface(obj, iface) {
  return obj[iface.Symbol] === true;
}
function isArray(obj) {
  var tmp;
  if (isJsArray(obj)) {
    // Inline function 'kotlin.js.asDynamic' call
    tmp = !obj.$type$;
  } else {
    tmp = false;
  }
  return tmp;
}
function isNumber(a) {
  var tmp;
  if (typeof a === 'number') {
    tmp = true;
  } else {
    tmp = a instanceof Long;
  }
  return tmp;
}
function isComparable(value) {
  var type = typeof value;
  return type === 'string' || type === 'boolean' || isNumber(value) || isInterface(value, Comparable);
}
function isCharSequence(value) {
  return typeof value === 'string' || isInterface(value, CharSequence);
}
function get_VOID() {
  _init_properties_void_kt__3zg9as();
  return VOID;
}
var VOID;
var properties_initialized_void_kt_e4ret2;
function _init_properties_void_kt__3zg9as() {
  if (!properties_initialized_void_kt_e4ret2) {
    properties_initialized_void_kt_e4ret2 = true;
    VOID = void 0;
  }
}
function copyOf(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var size = _this__u8e3s4.length;
  var tmp;
  if (newSize < 16 || size < 16) {
    tmp = fillFrom(_this__u8e3s4, new Int32Array(newSize));
  } else if (newSize > size) {
    // Inline function 'kotlin.also' call
    var this_0 = new Int32Array(newSize);
    // Inline function 'kotlin.js.asDynamic' call
    this_0.set(_this__u8e3s4);
    tmp = this_0;
  } else {
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.slice(0, newSize);
  }
  return tmp;
}
function copyOf_0(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  return arrayCopyResize(_this__u8e3s4, newSize, null);
}
function asList(_this__u8e3s4) {
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return new ArrayList(_this__u8e3s4);
}
function sortWith(_this__u8e3s4, comparator) {
  if (_this__u8e3s4.length > 1) {
    sortArrayWith(_this__u8e3s4, comparator);
  }
}
function fill(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
  Companion_instance_4.l1(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(element, fromIndex, toIndex);
}
function digitToIntImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  var index = binarySearchRange(Digit_getInstance().m1_1, ch);
  var diff = ch - Digit_getInstance().m1_1[index] | 0;
  return diff < 10 ? diff : -1;
}
function binarySearchRange(array, needle) {
  var bottom = 0;
  var top = array.length - 1 | 0;
  var middle = -1;
  var value = 0;
  while (bottom <= top) {
    middle = (bottom + top | 0) / 2 | 0;
    value = array[middle];
    if (needle > value)
      bottom = middle + 1 | 0;
    else if (needle === value)
      return middle;
    else
      top = middle - 1 | 0;
  }
  return middle - (needle < value ? 1 : 0) | 0;
}
function Digit() {
  Digit_instance = this;
  var tmp = this;
  // Inline function 'kotlin.intArrayOf' call
  tmp.m1_1 = new Int32Array([48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296]);
}
var Digit_instance;
function Digit_getInstance() {
  if (Digit_instance == null)
    new Digit();
  return Digit_instance;
}
function isWhitespaceImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  return (9 <= ch ? ch <= 13 : false) || (28 <= ch ? ch <= 32 : false) || ch === 160 || (ch > 4096 && (ch === 5760 || (8192 <= ch ? ch <= 8202 : false) || ch === 8232 || ch === 8233 || ch === 8239 || ch === 8287 || ch === 12288));
}
function Comparator() {
}
function isNaN_0(_this__u8e3s4) {
  return !(_this__u8e3s4 === _this__u8e3s4);
}
function takeHighestOneBit(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4 === 0) {
    tmp = 0;
  } else {
    // Inline function 'kotlin.countLeadingZeroBits' call
    tmp = 1 << (31 - clz32(_this__u8e3s4) | 0);
  }
  return tmp;
}
function isInfinite(_this__u8e3s4) {
  return _this__u8e3s4 === Infinity || _this__u8e3s4 === -Infinity;
}
function toRawBits(_this__u8e3s4) {
  return doubleToRawBits(_this__u8e3s4);
}
function isFinite(_this__u8e3s4) {
  return !isInfinite(_this__u8e3s4) && !isNaN_0(_this__u8e3s4);
}
function Unit() {
}
protoOf(Unit).toString = function () {
  return 'kotlin.Unit';
};
var Unit_instance;
function Unit_getInstance() {
  return Unit_instance;
}
function copyToArray(collection) {
  var tmp;
  // Inline function 'kotlin.js.asDynamic' call
  if (collection.toArray !== undefined) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = collection.toArray();
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = collectionToArray(collection);
  }
  return tmp;
}
function checkIndexOverflow(index) {
  if (index < 0) {
    throwIndexOverflow();
  }
  return index;
}
function arrayCopy(source, destination, destinationOffset, startIndex, endIndex) {
  Companion_instance_4.l1(startIndex, endIndex, source.length);
  var rangeSize = endIndex - startIndex | 0;
  Companion_instance_4.l1(destinationOffset, destinationOffset + rangeSize | 0, destination.length);
  if (isView(destination) && isView(source)) {
    // Inline function 'kotlin.js.asDynamic' call
    var subrange = source.subarray(startIndex, endIndex);
    // Inline function 'kotlin.js.asDynamic' call
    destination.set(subrange, destinationOffset);
  } else {
    if (!(source === destination) || destinationOffset <= startIndex) {
      var inductionVariable = 0;
      if (inductionVariable < rangeSize)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          destination[destinationOffset + index | 0] = source[startIndex + index | 0];
        }
         while (inductionVariable < rangeSize);
    } else {
      var inductionVariable_0 = rangeSize - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          destination[destinationOffset + index_0 | 0] = source[startIndex + index_0 | 0];
        }
         while (0 <= inductionVariable_0);
    }
  }
}
function terminateCollectionToArray(collectionSize, array) {
  return array;
}
function collectionToArray(collection) {
  return collectionToArrayCommonImpl(collection);
}
function listOf(element) {
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$0 = [element];
  return new ArrayList(tmp$ret$0);
}
function checkCountOverflow(count) {
  if (count < 0) {
    throwCountOverflow();
  }
  return count;
}
function setOf(element) {
  return hashSetOf([element]);
}
function mapCapacity(expectedSize) {
  return expectedSize;
}
function sortWith_0(_this__u8e3s4, comparator) {
  collectionsSort(_this__u8e3s4, comparator);
}
function mapOf(pair) {
  return hashMapOf([pair]);
}
function collectionsSort(list, comparator) {
  if (list.l() <= 1)
    return Unit_instance;
  var array = copyToArray(list);
  sortArrayWith(array, comparator);
  var inductionVariable = 0;
  var last = array.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      list.n1(i, array[i]);
    }
     while (inductionVariable < last);
}
function AbstractMutableCollection() {
  AbstractCollection.call(this);
}
protoOf(AbstractMutableCollection).p = function (elements) {
  this.o1();
  var modified = false;
  var _iterator__ex2g4s = elements.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (this.f(element))
      modified = true;
  }
  return modified;
};
protoOf(AbstractMutableCollection).toJSON = function () {
  return this.toArray();
};
protoOf(AbstractMutableCollection).o1 = function () {
};
function IteratorImpl($outer) {
  this.r1_1 = $outer;
  this.p1_1 = 0;
  this.q1_1 = -1;
}
protoOf(IteratorImpl).h = function () {
  return this.p1_1 < this.r1_1.l();
};
protoOf(IteratorImpl).i = function () {
  if (!this.h())
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.p1_1;
  this.p1_1 = _unary__edvuaz + 1 | 0;
  tmp.q1_1 = _unary__edvuaz;
  return this.r1_1.k(this.q1_1);
};
function AbstractMutableList() {
  AbstractMutableCollection.call(this);
  this.s1_1 = 0;
}
protoOf(AbstractMutableList).f = function (element) {
  this.o1();
  this.t1(this.l(), element);
  return true;
};
protoOf(AbstractMutableList).g = function () {
  return new IteratorImpl(this);
};
protoOf(AbstractMutableList).s = function (element) {
  return this.u1(element) >= 0;
};
protoOf(AbstractMutableList).u1 = function (element) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.indexOfFirst' call
    var index = 0;
    var _iterator__ex2g4s = this.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      if (equals(item, element)) {
        tmp$ret$0 = index;
        break $l$block;
      }
      index = index + 1 | 0;
    }
    tmp$ret$0 = -1;
  }
  return tmp$ret$0;
};
protoOf(AbstractMutableList).equals = function (other) {
  if (other === this)
    return true;
  if (!(!(other == null) ? isInterface(other, KtList) : false))
    return false;
  return Companion_instance_4.v1(this, other);
};
protoOf(AbstractMutableList).hashCode = function () {
  return Companion_instance_4.w1(this);
};
function AbstractMutableMap() {
  AbstractMap.call(this);
  this.z1_1 = null;
  this.a2_1 = null;
}
function AbstractMutableSet() {
  AbstractMutableCollection.call(this);
}
protoOf(AbstractMutableSet).equals = function (other) {
  if (other === this)
    return true;
  if (!(!(other == null) ? isInterface(other, KtSet) : false))
    return false;
  return Companion_instance_6.f2(this, other);
};
protoOf(AbstractMutableSet).hashCode = function () {
  return Companion_instance_6.g2(this);
};
function arrayOfUninitializedElements(capacity) {
  // Inline function 'kotlin.require' call
  if (!(capacity >= 0)) {
    var message = 'capacity must be non-negative.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.arrayOfNulls' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return Array(capacity);
}
function resetRange(_this__u8e3s4, fromIndex, toIndex) {
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(null, fromIndex, toIndex);
}
function copyOfUninitializedElements(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return copyOf_0(_this__u8e3s4, newSize);
}
function Companion_1() {
  Companion_instance_1 = this;
  var tmp = this;
  // Inline function 'kotlin.also' call
  var this_0 = ArrayList_init_$Create$_0(0);
  this_0.o_1 = true;
  tmp.h2_1 = this_0;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 == null)
    new Companion_1();
  return Companion_instance_1;
}
function ArrayList_init_$Init$($this) {
  // Inline function 'kotlin.emptyArray' call
  var tmp$ret$0 = [];
  ArrayList.call($this, tmp$ret$0);
  return $this;
}
function ArrayList_init_$Create$() {
  return ArrayList_init_$Init$(objectCreate(protoOf(ArrayList)));
}
function ArrayList_init_$Init$_0(initialCapacity, $this) {
  // Inline function 'kotlin.emptyArray' call
  var tmp$ret$0 = [];
  ArrayList.call($this, tmp$ret$0);
  // Inline function 'kotlin.require' call
  if (!(initialCapacity >= 0)) {
    var message = 'Negative initial capacity: ' + initialCapacity;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  return $this;
}
function ArrayList_init_$Create$_0(initialCapacity) {
  return ArrayList_init_$Init$_0(initialCapacity, objectCreate(protoOf(ArrayList)));
}
function ArrayList_init_$Init$_1(elements, $this) {
  // Inline function 'kotlin.collections.toTypedArray' call
  var tmp$ret$0 = copyToArray(elements);
  ArrayList.call($this, tmp$ret$0);
  return $this;
}
function ArrayList_init_$Create$_1(elements) {
  return ArrayList_init_$Init$_1(elements, objectCreate(protoOf(ArrayList)));
}
function increaseLength($this, amount) {
  var previous = $this.l();
  // Inline function 'kotlin.js.asDynamic' call
  $this.n_1.length = $this.l() + amount | 0;
  return previous;
}
function rangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance_4.i2(index, $this.l());
  return index;
}
function insertionRangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance_4.j2(index, $this.l());
  return index;
}
function ArrayList(array) {
  Companion_getInstance_1();
  AbstractMutableList.call(this);
  this.n_1 = array;
  this.o_1 = false;
}
protoOf(ArrayList).k2 = function () {
  this.o1();
  this.o_1 = true;
  return this.l() > 0 ? this : Companion_getInstance_1().h2_1;
};
protoOf(ArrayList).l = function () {
  return this.n_1.length;
};
protoOf(ArrayList).k = function (index) {
  return this.n_1[rangeCheck(this, index)];
};
protoOf(ArrayList).n1 = function (index, element) {
  this.o1();
  rangeCheck(this, index);
  // Inline function 'kotlin.apply' call
  var this_0 = this.n_1[index];
  this.n_1[index] = element;
  return this_0;
};
protoOf(ArrayList).f = function (element) {
  this.o1();
  // Inline function 'kotlin.js.asDynamic' call
  this.n_1.push(element);
  this.s1_1 = this.s1_1 + 1 | 0;
  return true;
};
protoOf(ArrayList).t1 = function (index, element) {
  this.o1();
  // Inline function 'kotlin.js.asDynamic' call
  this.n_1.splice(insertionRangeCheck(this, index), 0, element);
  this.s1_1 = this.s1_1 + 1 | 0;
};
protoOf(ArrayList).p = function (elements) {
  this.o1();
  if (elements.j())
    return false;
  var offset = increaseLength(this, elements.l());
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = elements.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var index_0 = checkIndexOverflow(_unary__edvuaz);
    this.n_1[offset + index_0 | 0] = item;
  }
  this.s1_1 = this.s1_1 + 1 | 0;
  return true;
};
protoOf(ArrayList).l2 = function () {
  this.o1();
  var tmp = this;
  // Inline function 'kotlin.emptyArray' call
  tmp.n_1 = [];
  this.s1_1 = this.s1_1 + 1 | 0;
};
protoOf(ArrayList).u1 = function (element) {
  return indexOf(this.n_1, element);
};
protoOf(ArrayList).toString = function () {
  return arrayToString(this.n_1);
};
protoOf(ArrayList).m2 = function () {
  return [].slice.call(this.n_1);
};
protoOf(ArrayList).toArray = function () {
  return this.m2();
};
protoOf(ArrayList).o1 = function () {
  if (this.o_1)
    throw UnsupportedOperationException_init_$Create$();
};
var _stableSortingIsSupported;
function sortArrayWith(array, comparator) {
  if (getStableSortingIsSupported()) {
    var comparison = sortArrayWith$lambda(comparator);
    // Inline function 'kotlin.js.asDynamic' call
    array.sort(comparison);
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    mergeSort(array, 0, get_lastIndex(array), comparator);
  }
}
function getStableSortingIsSupported() {
  var tmp0_safe_receiver = _stableSortingIsSupported;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  _stableSortingIsSupported = false;
  // Inline function 'kotlin.js.unsafeCast' call
  var array = [];
  var inductionVariable = 0;
  if (inductionVariable < 600)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      array.push(index);
    }
     while (inductionVariable < 600);
  var comparison = getStableSortingIsSupported$lambda;
  // Inline function 'kotlin.js.asDynamic' call
  array.sort(comparison);
  var inductionVariable_0 = 1;
  var last = array.length;
  if (inductionVariable_0 < last)
    do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      var a = array[index_0 - 1 | 0];
      var b = array[index_0];
      if ((a & 3) === (b & 3) && a >= b)
        return false;
    }
     while (inductionVariable_0 < last);
  _stableSortingIsSupported = true;
  return true;
}
function mergeSort(array, start, endInclusive, comparator) {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = array.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var buffer = Array(size);
  var result = mergeSort_0(array, buffer, start, endInclusive, comparator);
  if (!(result === array)) {
    var inductionVariable = start;
    if (inductionVariable <= endInclusive)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        array[i] = result[i];
      }
       while (!(i === endInclusive));
  }
}
function mergeSort_0(array, buffer, start, end, comparator) {
  if (start === end) {
    return array;
  }
  var median = (start + end | 0) / 2 | 0;
  var left = mergeSort_0(array, buffer, start, median, comparator);
  var right = mergeSort_0(array, buffer, median + 1 | 0, end, comparator);
  var target = left === buffer ? array : buffer;
  var leftIndex = start;
  var rightIndex = median + 1 | 0;
  var inductionVariable = start;
  if (inductionVariable <= end)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (leftIndex <= median && rightIndex <= end) {
        var leftValue = left[leftIndex];
        var rightValue = right[rightIndex];
        if (comparator.compare(leftValue, rightValue) <= 0) {
          target[i] = leftValue;
          leftIndex = leftIndex + 1 | 0;
        } else {
          target[i] = rightValue;
          rightIndex = rightIndex + 1 | 0;
        }
      } else if (leftIndex <= median) {
        target[i] = left[leftIndex];
        leftIndex = leftIndex + 1 | 0;
      } else {
        target[i] = right[rightIndex];
        rightIndex = rightIndex + 1 | 0;
      }
    }
     while (!(i === end));
  return target;
}
function sortArrayWith$lambda($comparator) {
  return function (a, b) {
    return $comparator.compare(a, b);
  };
}
function getStableSortingIsSupported$lambda(a, b) {
  return (a & 3) - (b & 3) | 0;
}
function HashMap_init_$Init$(internalMap, $this) {
  AbstractMutableMap.call($this);
  HashMap.call($this);
  $this.r2_1 = internalMap;
  return $this;
}
function HashMap_init_$Init$_0($this) {
  HashMap_init_$Init$(InternalHashMap_init_$Create$(), $this);
  return $this;
}
function HashMap_init_$Create$() {
  return HashMap_init_$Init$_0(objectCreate(protoOf(HashMap)));
}
function HashMap_init_$Init$_1(initialCapacity, loadFactor, $this) {
  HashMap_init_$Init$(InternalHashMap_init_$Create$_1(initialCapacity, loadFactor), $this);
  return $this;
}
function HashMap_init_$Init$_2(initialCapacity, $this) {
  HashMap_init_$Init$_1(initialCapacity, 1.0, $this);
  return $this;
}
function HashMap_init_$Create$_0(initialCapacity) {
  return HashMap_init_$Init$_2(initialCapacity, objectCreate(protoOf(HashMap)));
}
protoOf(HashMap).w = function (key) {
  return this.r2_1.t2(key);
};
protoOf(HashMap).y = function () {
  var tmp0_elvis_lhs = this.s2_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = new HashMapEntrySet(this.r2_1);
    this.s2_1 = this_0;
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
};
protoOf(HashMap).x = function (key) {
  return this.r2_1.x(key);
};
protoOf(HashMap).b2 = function (key, value) {
  return this.r2_1.b2(key, value);
};
protoOf(HashMap).l = function () {
  return this.r2_1.l();
};
function HashMap() {
  this.s2_1 = null;
}
function HashMapEntrySet(backing) {
  HashMapEntrySetBase.call(this, backing);
}
protoOf(HashMapEntrySet).g = function () {
  return this.v2_1.w2();
};
function HashMapEntrySetBase(backing) {
  AbstractMutableSet.call(this);
  this.v2_1 = backing;
}
protoOf(HashMapEntrySetBase).l = function () {
  return this.v2_1.l();
};
protoOf(HashMapEntrySetBase).j = function () {
  return this.v2_1.l() === 0;
};
protoOf(HashMapEntrySetBase).x2 = function (element) {
  return this.v2_1.z2(element);
};
protoOf(HashMapEntrySetBase).s = function (element) {
  if (!(!(element == null) ? isInterface(element, Entry) : false))
    return false;
  return this.x2((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
};
protoOf(HashMapEntrySetBase).y2 = function (element) {
  throw UnsupportedOperationException_init_$Create$();
};
protoOf(HashMapEntrySetBase).f = function (element) {
  return this.y2((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
};
protoOf(HashMapEntrySetBase).p = function (elements) {
  throw UnsupportedOperationException_init_$Create$();
};
protoOf(HashMapEntrySetBase).t = function (elements) {
  return this.v2_1.a3(elements);
};
protoOf(HashMapEntrySetBase).o1 = function () {
  return this.v2_1.b3();
};
function HashSet_init_$Init$(map, $this) {
  AbstractMutableSet.call($this);
  HashSet.call($this);
  $this.c3_1 = map;
  return $this;
}
function HashSet_init_$Init$_0($this) {
  HashSet_init_$Init$(InternalHashMap_init_$Create$(), $this);
  return $this;
}
function HashSet_init_$Create$() {
  return HashSet_init_$Init$_0(objectCreate(protoOf(HashSet)));
}
function HashSet_init_$Init$_1(elements, $this) {
  HashSet_init_$Init$(InternalHashMap_init_$Create$_0(elements.l()), $this);
  var _iterator__ex2g4s = elements.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    $this.c3_1.b2(element, true);
  }
  return $this;
}
function HashSet_init_$Init$_2(initialCapacity, loadFactor, $this) {
  HashSet_init_$Init$(InternalHashMap_init_$Create$_1(initialCapacity, loadFactor), $this);
  return $this;
}
function HashSet_init_$Init$_3(initialCapacity, $this) {
  HashSet_init_$Init$_2(initialCapacity, 1.0, $this);
  return $this;
}
function HashSet_init_$Create$_0(initialCapacity) {
  return HashSet_init_$Init$_3(initialCapacity, objectCreate(protoOf(HashSet)));
}
protoOf(HashSet).f = function (element) {
  return this.c3_1.b2(element, true) == null;
};
protoOf(HashSet).s = function (element) {
  return this.c3_1.t2(element);
};
protoOf(HashSet).j = function () {
  return this.c3_1.l() === 0;
};
protoOf(HashSet).g = function () {
  return this.c3_1.d3();
};
protoOf(HashSet).l = function () {
  return this.c3_1.l();
};
function HashSet() {
}
function computeHashSize($this, capacity) {
  return takeHighestOneBit(imul_0(coerceAtLeast(capacity, 1), 3));
}
function computeShift($this, hashSize) {
  // Inline function 'kotlin.countLeadingZeroBits' call
  return clz32(hashSize) + 1 | 0;
}
function checkForComodification($this) {
  if (!($this.o3_1.l3_1 === $this.q3_1))
    throw ConcurrentModificationException_init_$Create$_0('The backing map has been modified after this entry was obtained.');
}
function InternalHashMap_init_$Init$($this) {
  InternalHashMap_init_$Init$_0(8, $this);
  return $this;
}
function InternalHashMap_init_$Create$() {
  return InternalHashMap_init_$Init$(objectCreate(protoOf(InternalHashMap)));
}
function InternalHashMap_init_$Init$_0(initialCapacity, $this) {
  InternalHashMap.call($this, arrayOfUninitializedElements(initialCapacity), null, new Int32Array(initialCapacity), new Int32Array(computeHashSize(Companion_instance_2, initialCapacity)), 2, 0);
  return $this;
}
function InternalHashMap_init_$Create$_0(initialCapacity) {
  return InternalHashMap_init_$Init$_0(initialCapacity, objectCreate(protoOf(InternalHashMap)));
}
function InternalHashMap_init_$Init$_1(initialCapacity, loadFactor, $this) {
  InternalHashMap_init_$Init$_0(initialCapacity, $this);
  // Inline function 'kotlin.require' call
  if (!(loadFactor > 0)) {
    var message = 'Non-positive load factor: ' + loadFactor;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  return $this;
}
function InternalHashMap_init_$Create$_1(initialCapacity, loadFactor) {
  return InternalHashMap_init_$Init$_1(initialCapacity, loadFactor, objectCreate(protoOf(InternalHashMap)));
}
function _get_capacity__a9k9f3($this) {
  return $this.e3_1.length;
}
function _get_hashSize__tftcho($this) {
  return $this.h3_1.length;
}
function registerModification($this) {
  $this.l3_1 = $this.l3_1 + 1 | 0;
}
function ensureExtraCapacity($this, n) {
  if (shouldCompact($this, n)) {
    compact($this, true);
  } else {
    ensureCapacity($this, $this.j3_1 + n | 0);
  }
}
function shouldCompact($this, extraCapacity) {
  var spareCapacity = _get_capacity__a9k9f3($this) - $this.j3_1 | 0;
  var gaps = $this.j3_1 - $this.l() | 0;
  return spareCapacity < extraCapacity && (gaps + spareCapacity | 0) >= extraCapacity && gaps >= (_get_capacity__a9k9f3($this) / 4 | 0);
}
function ensureCapacity($this, minCapacity) {
  if (minCapacity < 0)
    throw RuntimeException_init_$Create$_0('too many elements');
  if (minCapacity > _get_capacity__a9k9f3($this)) {
    var newSize = Companion_instance_4.r3(_get_capacity__a9k9f3($this), minCapacity);
    $this.e3_1 = copyOfUninitializedElements($this.e3_1, newSize);
    var tmp = $this;
    var tmp0_safe_receiver = $this.f3_1;
    tmp.f3_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
    $this.g3_1 = copyOf($this.g3_1, newSize);
    var newHashSize = computeHashSize(Companion_instance_2, newSize);
    if (newHashSize > _get_hashSize__tftcho($this)) {
      rehash($this, newHashSize);
    }
  }
}
function allocateValuesArray($this) {
  var curValuesArray = $this.f3_1;
  if (!(curValuesArray == null))
    return curValuesArray;
  var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
  $this.f3_1 = newValuesArray;
  return newValuesArray;
}
function hash($this, key) {
  return key == null ? 0 : imul_0(hashCode_0(key), -1640531527) >>> $this.k3_1 | 0;
}
function compact($this, updateHashArray) {
  var i = 0;
  var j = 0;
  var valuesArray = $this.f3_1;
  while (i < $this.j3_1) {
    var hash = $this.g3_1[i];
    if (hash >= 0) {
      $this.e3_1[j] = $this.e3_1[i];
      if (!(valuesArray == null)) {
        valuesArray[j] = valuesArray[i];
      }
      if (updateHashArray) {
        $this.g3_1[j] = hash;
        $this.h3_1[hash] = j + 1 | 0;
      }
      j = j + 1 | 0;
    }
    i = i + 1 | 0;
  }
  resetRange($this.e3_1, j, $this.j3_1);
  if (valuesArray == null)
    null;
  else {
    resetRange(valuesArray, j, $this.j3_1);
  }
  $this.j3_1 = j;
}
function rehash($this, newHashSize) {
  registerModification($this);
  if ($this.j3_1 > $this.m3_1) {
    compact($this, false);
  }
  $this.h3_1 = new Int32Array(newHashSize);
  $this.k3_1 = computeShift(Companion_instance_2, newHashSize);
  var i = 0;
  while (i < $this.j3_1) {
    var _unary__edvuaz = i;
    i = _unary__edvuaz + 1 | 0;
    if (!putRehash($this, _unary__edvuaz)) {
      throw IllegalStateException_init_$Create$_0('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
    }
  }
}
function putRehash($this, i) {
  var hash_0 = hash($this, $this.e3_1[i]);
  var probesLeft = $this.i3_1;
  while (true) {
    var index = $this.h3_1[hash_0];
    if (index === 0) {
      $this.h3_1[hash_0] = i + 1 | 0;
      $this.g3_1[i] = hash_0;
      return true;
    }
    probesLeft = probesLeft - 1 | 0;
    if (probesLeft < 0)
      return false;
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
  }
}
function findKey($this, key) {
  var hash_0 = hash($this, key);
  var probesLeft = $this.i3_1;
  while (true) {
    var index = $this.h3_1[hash_0];
    if (index === 0)
      return -1;
    if (equals($this.e3_1[index - 1 | 0], key))
      return index - 1 | 0;
    probesLeft = probesLeft - 1 | 0;
    if (probesLeft < 0)
      return -1;
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
  }
}
function addKey($this, key) {
  $this.b3();
  retry: while (true) {
    var hash_0 = hash($this, key);
    var tentativeMaxProbeDistance = coerceAtMost(imul_0($this.i3_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
    var probeDistance = 0;
    while (true) {
      var index = $this.h3_1[hash_0];
      if (index === 0) {
        if ($this.j3_1 >= _get_capacity__a9k9f3($this)) {
          ensureExtraCapacity($this, 1);
          continue retry;
        }
        var _unary__edvuaz = $this.j3_1;
        $this.j3_1 = _unary__edvuaz + 1 | 0;
        var putIndex = _unary__edvuaz;
        $this.e3_1[putIndex] = key;
        $this.g3_1[putIndex] = hash_0;
        $this.h3_1[hash_0] = putIndex + 1 | 0;
        $this.m3_1 = $this.m3_1 + 1 | 0;
        registerModification($this);
        if (probeDistance > $this.i3_1)
          $this.i3_1 = probeDistance;
        return putIndex;
      }
      if (equals($this.e3_1[index - 1 | 0], key)) {
        return -index | 0;
      }
      probeDistance = probeDistance + 1 | 0;
      if (probeDistance > tentativeMaxProbeDistance) {
        rehash($this, imul_0(_get_hashSize__tftcho($this), 2));
        continue retry;
      }
      var _unary__edvuaz_0 = hash_0;
      hash_0 = _unary__edvuaz_0 - 1 | 0;
      if (_unary__edvuaz_0 === 0)
        hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    }
  }
}
function contentEquals($this, other) {
  return $this.m3_1 === other.l() && $this.a3(other.y());
}
function Companion_2() {
  this.s3_1 = -1640531527;
  this.t3_1 = 8;
  this.u3_1 = 2;
  this.v3_1 = -1;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  return Companion_instance_2;
}
function Itr(map) {
  this.w3_1 = map;
  this.x3_1 = 0;
  this.y3_1 = -1;
  this.z3_1 = this.w3_1.l3_1;
  this.a4();
}
protoOf(Itr).a4 = function () {
  while (this.x3_1 < this.w3_1.j3_1 && this.w3_1.g3_1[this.x3_1] < 0) {
    this.x3_1 = this.x3_1 + 1 | 0;
  }
};
protoOf(Itr).h = function () {
  return this.x3_1 < this.w3_1.j3_1;
};
protoOf(Itr).b4 = function () {
  if (!(this.w3_1.l3_1 === this.z3_1))
    throw ConcurrentModificationException_init_$Create$();
};
function KeysItr(map) {
  Itr.call(this, map);
}
protoOf(KeysItr).i = function () {
  this.b4();
  if (this.x3_1 >= this.w3_1.j3_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.x3_1;
  this.x3_1 = _unary__edvuaz + 1 | 0;
  tmp.y3_1 = _unary__edvuaz;
  var result = this.w3_1.e3_1[this.y3_1];
  this.a4();
  return result;
};
function EntriesItr(map) {
  Itr.call(this, map);
}
protoOf(EntriesItr).i = function () {
  this.b4();
  if (this.x3_1 >= this.w3_1.j3_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.x3_1;
  this.x3_1 = _unary__edvuaz + 1 | 0;
  tmp.y3_1 = _unary__edvuaz;
  var result = new EntryRef(this.w3_1, this.y3_1);
  this.a4();
  return result;
};
protoOf(EntriesItr).k4 = function () {
  if (this.x3_1 >= this.w3_1.j3_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.x3_1;
  this.x3_1 = _unary__edvuaz + 1 | 0;
  tmp.y3_1 = _unary__edvuaz;
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver = this.w3_1.e3_1[this.y3_1];
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
  var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver_0 = ensureNotNull(this.w3_1.f3_1)[this.y3_1];
  var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
  var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
  this.a4();
  return result;
};
protoOf(EntriesItr).l4 = function (sb) {
  if (this.x3_1 >= this.w3_1.j3_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.x3_1;
  this.x3_1 = _unary__edvuaz + 1 | 0;
  tmp.y3_1 = _unary__edvuaz;
  var key = this.w3_1.e3_1[this.y3_1];
  if (equals(key, this.w3_1))
    sb.o4('(this Map)');
  else
    sb.n4(key);
  sb.p4(_Char___init__impl__6a9atx(61));
  var value = ensureNotNull(this.w3_1.f3_1)[this.y3_1];
  if (equals(value, this.w3_1))
    sb.o4('(this Map)');
  else
    sb.n4(value);
  this.a4();
};
function EntryRef(map, index) {
  this.o3_1 = map;
  this.p3_1 = index;
  this.q3_1 = this.o3_1.l3_1;
}
protoOf(EntryRef).u = function () {
  checkForComodification(this);
  return this.o3_1.e3_1[this.p3_1];
};
protoOf(EntryRef).v = function () {
  checkForComodification(this);
  return ensureNotNull(this.o3_1.f3_1)[this.p3_1];
};
protoOf(EntryRef).equals = function (other) {
  var tmp;
  var tmp_0;
  if (!(other == null) ? isInterface(other, Entry) : false) {
    tmp_0 = equals(other.u(), this.u());
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = equals(other.v(), this.v());
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(EntryRef).hashCode = function () {
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver = this.u();
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
  var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver_0 = this.v();
  var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
  return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
};
protoOf(EntryRef).toString = function () {
  return toString_0(this.u()) + '=' + toString_0(this.v());
};
function InternalHashMap(keysArray, valuesArray, presenceArray, hashArray, maxProbeDistance, length) {
  this.e3_1 = keysArray;
  this.f3_1 = valuesArray;
  this.g3_1 = presenceArray;
  this.h3_1 = hashArray;
  this.i3_1 = maxProbeDistance;
  this.j3_1 = length;
  this.k3_1 = computeShift(Companion_instance_2, _get_hashSize__tftcho(this));
  this.l3_1 = 0;
  this.m3_1 = 0;
  this.n3_1 = false;
}
protoOf(InternalHashMap).l = function () {
  return this.m3_1;
};
protoOf(InternalHashMap).q4 = function () {
  this.b3();
  this.n3_1 = true;
};
protoOf(InternalHashMap).x = function (key) {
  var index = findKey(this, key);
  if (index < 0)
    return null;
  return ensureNotNull(this.f3_1)[index];
};
protoOf(InternalHashMap).t2 = function (key) {
  return findKey(this, key) >= 0;
};
protoOf(InternalHashMap).b2 = function (key, value) {
  var index = addKey(this, key);
  var valuesArray = allocateValuesArray(this);
  if (index < 0) {
    var oldValue = valuesArray[(-index | 0) - 1 | 0];
    valuesArray[(-index | 0) - 1 | 0] = value;
    return oldValue;
  } else {
    valuesArray[index] = value;
    return null;
  }
};
protoOf(InternalHashMap).equals = function (other) {
  var tmp;
  if (other === this) {
    tmp = true;
  } else {
    var tmp_0;
    if (!(other == null) ? isInterface(other, KtMap) : false) {
      tmp_0 = contentEquals(this, other);
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  }
  return tmp;
};
protoOf(InternalHashMap).hashCode = function () {
  var result = 0;
  var it = this.w2();
  while (it.h()) {
    result = result + it.k4() | 0;
  }
  return result;
};
protoOf(InternalHashMap).toString = function () {
  var sb = StringBuilder_init_$Create$(2 + imul_0(this.m3_1, 3) | 0);
  sb.o4('{');
  var i = 0;
  var it = this.w2();
  while (it.h()) {
    if (i > 0) {
      sb.o4(', ');
    }
    it.l4(sb);
    i = i + 1 | 0;
  }
  sb.o4('}');
  return sb.toString();
};
protoOf(InternalHashMap).b3 = function () {
  if (this.n3_1)
    throw UnsupportedOperationException_init_$Create$();
};
protoOf(InternalHashMap).z2 = function (entry) {
  var index = findKey(this, entry.u());
  if (index < 0)
    return false;
  return equals(ensureNotNull(this.f3_1)[index], entry.v());
};
protoOf(InternalHashMap).r4 = function (entry) {
  return this.z2(isInterface(entry, Entry) ? entry : THROW_CCE());
};
protoOf(InternalHashMap).d3 = function () {
  return new KeysItr(this);
};
protoOf(InternalHashMap).w2 = function () {
  return new EntriesItr(this);
};
function InternalMap() {
}
function LinkedHashMap_init_$Init$($this) {
  HashMap_init_$Init$_0($this);
  LinkedHashMap.call($this);
  return $this;
}
function LinkedHashMap_init_$Create$() {
  return LinkedHashMap_init_$Init$(objectCreate(protoOf(LinkedHashMap)));
}
function LinkedHashMap_init_$Init$_0(initialCapacity, $this) {
  HashMap_init_$Init$_2(initialCapacity, $this);
  LinkedHashMap.call($this);
  return $this;
}
function LinkedHashMap_init_$Create$_0(initialCapacity) {
  return LinkedHashMap_init_$Init$_0(initialCapacity, objectCreate(protoOf(LinkedHashMap)));
}
function LinkedHashMap() {
}
function LinkedHashSet_init_$Init$($this) {
  HashSet_init_$Init$_0($this);
  LinkedHashSet.call($this);
  return $this;
}
function LinkedHashSet_init_$Create$() {
  return LinkedHashSet_init_$Init$(objectCreate(protoOf(LinkedHashSet)));
}
function LinkedHashSet_init_$Init$_0(elements, $this) {
  HashSet_init_$Init$_1(elements, $this);
  LinkedHashSet.call($this);
  return $this;
}
function LinkedHashSet_init_$Create$_0(elements) {
  return LinkedHashSet_init_$Init$_0(elements, objectCreate(protoOf(LinkedHashSet)));
}
function LinkedHashSet_init_$Init$_1(initialCapacity, loadFactor, $this) {
  HashSet_init_$Init$_2(initialCapacity, loadFactor, $this);
  LinkedHashSet.call($this);
  return $this;
}
function LinkedHashSet_init_$Init$_2(initialCapacity, $this) {
  LinkedHashSet_init_$Init$_1(initialCapacity, 1.0, $this);
  return $this;
}
function LinkedHashSet_init_$Create$_1(initialCapacity) {
  return LinkedHashSet_init_$Init$_2(initialCapacity, objectCreate(protoOf(LinkedHashSet)));
}
function LinkedHashSet_init_$Init$_3(internalMap, $this) {
  HashSet_init_$Init$(internalMap, $this);
  LinkedHashSet.call($this);
  return $this;
}
function LinkedHashSet_init_$Create$_2(internalMap) {
  return LinkedHashSet_init_$Init$_3(internalMap, objectCreate(protoOf(LinkedHashSet)));
}
function EmptyHolder() {
  EmptyHolder_instance = this;
  var tmp = this;
  // Inline function 'kotlin.also' call
  var this_0 = InternalHashMap_init_$Create$_0(0);
  this_0.q4();
  tmp.s4_1 = LinkedHashSet_init_$Create$_2(this_0);
}
var EmptyHolder_instance;
function EmptyHolder_getInstance() {
  if (EmptyHolder_instance == null)
    new EmptyHolder();
  return EmptyHolder_instance;
}
protoOf(LinkedHashSet).k2 = function () {
  this.c3_1.q4();
  return this.l() > 0 ? this : EmptyHolder_getInstance().s4_1;
};
protoOf(LinkedHashSet).o1 = function () {
  return this.c3_1.b3();
};
function LinkedHashSet() {
}
function RandomAccess() {
}
function CoroutineImpl(resultContinuation) {
  InterceptedCoroutine.call(this);
  this.v4_1 = resultContinuation;
  this.w4_1 = 0;
  this.x4_1 = 0;
  this.y4_1 = null;
  this.z4_1 = null;
  this.a5_1 = null;
  var tmp = this;
  var tmp0_safe_receiver = this.v4_1;
  tmp.b5_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c5();
}
protoOf(CoroutineImpl).c5 = function () {
  return ensureNotNull(this.b5_1);
};
protoOf(CoroutineImpl).d5 = function (result) {
  var current = this;
  // Inline function 'kotlin.Result.getOrNull' call
  var currentResult = _Result___get_isFailure__impl__jpiriv(result) ? null : _Result___get_value__impl__bjfvqg(result);
  var currentException = Result__exceptionOrNull_impl_p6xea9(result);
  while (true) {
    // Inline function 'kotlin.with' call
    var $this$with = current;
    if (currentException == null) {
      $this$with.y4_1 = currentResult;
    } else {
      $this$with.w4_1 = $this$with.x4_1;
      $this$with.z4_1 = currentException;
    }
    try {
      var outcome = $this$with.e5();
      if (outcome === get_COROUTINE_SUSPENDED())
        return Unit_instance;
      currentResult = outcome;
      currentException = null;
    } catch ($p) {
      var exception = $p;
      currentResult = null;
      // Inline function 'kotlin.js.unsafeCast' call
      currentException = exception;
    }
    $this$with.g5();
    var completion = ensureNotNull($this$with.v4_1);
    if (completion instanceof CoroutineImpl) {
      current = completion;
    } else {
      if (!(currentException == null)) {
        // Inline function 'kotlin.coroutines.resumeWithException' call
        // Inline function 'kotlin.Companion.failure' call
        var exception_0 = currentException;
        var tmp$ret$5 = _Result___init__impl__xyqfz8(createFailure(exception_0));
        completion.h5(tmp$ret$5);
      } else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var value = currentResult;
        var tmp$ret$7 = _Result___init__impl__xyqfz8(value);
        completion.h5(tmp$ret$7);
      }
      return Unit_instance;
    }
  }
};
protoOf(CoroutineImpl).h5 = function (result) {
  return this.d5(result);
};
function CompletedContinuation() {
}
protoOf(CompletedContinuation).c5 = function () {
  // Inline function 'kotlin.error' call
  var message = 'This continuation is already complete';
  throw IllegalStateException_init_$Create$_0(toString_1(message));
};
protoOf(CompletedContinuation).d5 = function (result) {
  // Inline function 'kotlin.error' call
  var message = 'This continuation is already complete';
  throw IllegalStateException_init_$Create$_0(toString_1(message));
};
protoOf(CompletedContinuation).h5 = function (result) {
  return this.d5(result);
};
protoOf(CompletedContinuation).toString = function () {
  return 'This continuation is already complete';
};
var CompletedContinuation_instance;
function CompletedContinuation_getInstance() {
  return CompletedContinuation_instance;
}
function InterceptedCoroutine() {
  this.f5_1 = null;
}
protoOf(InterceptedCoroutine).g5 = function () {
  var intercepted = this.f5_1;
  if (!(intercepted == null) && !(intercepted === this)) {
    ensureNotNull(this.c5().i5(Key_instance)).j5(intercepted);
  }
  this.f5_1 = CompletedContinuation_instance;
};
function createCoroutineUnintercepted(_this__u8e3s4, receiver, completion) {
  // Inline function 'kotlin.coroutines.intrinsics.createCoroutineFromSuspendFunction' call
  return new createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1(completion, _this__u8e3s4, receiver, completion);
}
function invokeSuspendSuperTypeWithReceiver(_this__u8e3s4, receiver, completion) {
  throw new NotImplementedError('It is intrinsic method');
}
function createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1($completion, $this_createCoroutineUnintercepted, $receiver, $completion$1) {
  this.s5_1 = $this_createCoroutineUnintercepted;
  this.t5_1 = $receiver;
  this.u5_1 = $completion$1;
  CoroutineImpl.call(this, isInterface($completion, Continuation) ? $completion : THROW_CCE());
}
protoOf(createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1).e5 = function () {
  if (this.z4_1 != null)
    throw this.z4_1;
  // Inline function 'kotlin.js.asDynamic' call
  var a = this.s5_1;
  return typeof a === 'function' ? a(this.t5_1, this.u5_1) : this.s5_1.v5(this.t5_1, this.u5_1);
};
function UnsupportedOperationException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  UnsupportedOperationException.call($this);
  return $this;
}
function UnsupportedOperationException_init_$Create$() {
  var tmp = UnsupportedOperationException_init_$Init$(objectCreate(protoOf(UnsupportedOperationException)));
  captureStack(tmp, UnsupportedOperationException_init_$Create$);
  return tmp;
}
function UnsupportedOperationException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  UnsupportedOperationException.call($this);
  return $this;
}
function UnsupportedOperationException_init_$Create$_0(message) {
  var tmp = UnsupportedOperationException_init_$Init$_0(message, objectCreate(protoOf(UnsupportedOperationException)));
  captureStack(tmp, UnsupportedOperationException_init_$Create$_0);
  return tmp;
}
function UnsupportedOperationException() {
  captureStack(this, UnsupportedOperationException);
}
function IllegalArgumentException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  IllegalArgumentException.call($this);
  return $this;
}
function IllegalArgumentException_init_$Create$() {
  var tmp = IllegalArgumentException_init_$Init$(objectCreate(protoOf(IllegalArgumentException)));
  captureStack(tmp, IllegalArgumentException_init_$Create$);
  return tmp;
}
function IllegalArgumentException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  IllegalArgumentException.call($this);
  return $this;
}
function IllegalArgumentException_init_$Create$_0(message) {
  var tmp = IllegalArgumentException_init_$Init$_0(message, objectCreate(protoOf(IllegalArgumentException)));
  captureStack(tmp, IllegalArgumentException_init_$Create$_0);
  return tmp;
}
function IllegalArgumentException() {
  captureStack(this, IllegalArgumentException);
}
function RuntimeException_init_$Init$($this) {
  Exception_init_$Init$($this);
  RuntimeException.call($this);
  return $this;
}
function RuntimeException_init_$Create$() {
  var tmp = RuntimeException_init_$Init$(objectCreate(protoOf(RuntimeException)));
  captureStack(tmp, RuntimeException_init_$Create$);
  return tmp;
}
function RuntimeException_init_$Init$_0(message, $this) {
  Exception_init_$Init$_0(message, $this);
  RuntimeException.call($this);
  return $this;
}
function RuntimeException_init_$Create$_0(message) {
  var tmp = RuntimeException_init_$Init$_0(message, objectCreate(protoOf(RuntimeException)));
  captureStack(tmp, RuntimeException_init_$Create$_0);
  return tmp;
}
function RuntimeException() {
  captureStack(this, RuntimeException);
}
function Exception_init_$Init$($this) {
  extendThrowable($this);
  Exception.call($this);
  return $this;
}
function Exception_init_$Create$() {
  var tmp = Exception_init_$Init$(objectCreate(protoOf(Exception)));
  captureStack(tmp, Exception_init_$Create$);
  return tmp;
}
function Exception_init_$Init$_0(message, $this) {
  extendThrowable($this, message);
  Exception.call($this);
  return $this;
}
function Exception_init_$Create$_0(message) {
  var tmp = Exception_init_$Init$_0(message, objectCreate(protoOf(Exception)));
  captureStack(tmp, Exception_init_$Create$_0);
  return tmp;
}
function Exception() {
  captureStack(this, Exception);
}
function NoSuchElementException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  NoSuchElementException.call($this);
  return $this;
}
function NoSuchElementException_init_$Create$() {
  var tmp = NoSuchElementException_init_$Init$(objectCreate(protoOf(NoSuchElementException)));
  captureStack(tmp, NoSuchElementException_init_$Create$);
  return tmp;
}
function NoSuchElementException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  NoSuchElementException.call($this);
  return $this;
}
function NoSuchElementException_init_$Create$_0(message) {
  var tmp = NoSuchElementException_init_$Init$_0(message, objectCreate(protoOf(NoSuchElementException)));
  captureStack(tmp, NoSuchElementException_init_$Create$_0);
  return tmp;
}
function NoSuchElementException() {
  captureStack(this, NoSuchElementException);
}
function IndexOutOfBoundsException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  IndexOutOfBoundsException.call($this);
  return $this;
}
function IndexOutOfBoundsException_init_$Create$() {
  var tmp = IndexOutOfBoundsException_init_$Init$(objectCreate(protoOf(IndexOutOfBoundsException)));
  captureStack(tmp, IndexOutOfBoundsException_init_$Create$);
  return tmp;
}
function IndexOutOfBoundsException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  IndexOutOfBoundsException.call($this);
  return $this;
}
function IndexOutOfBoundsException_init_$Create$_0(message) {
  var tmp = IndexOutOfBoundsException_init_$Init$_0(message, objectCreate(protoOf(IndexOutOfBoundsException)));
  captureStack(tmp, IndexOutOfBoundsException_init_$Create$_0);
  return tmp;
}
function IndexOutOfBoundsException() {
  captureStack(this, IndexOutOfBoundsException);
}
function IllegalStateException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  IllegalStateException.call($this);
  return $this;
}
function IllegalStateException_init_$Create$() {
  var tmp = IllegalStateException_init_$Init$(objectCreate(protoOf(IllegalStateException)));
  captureStack(tmp, IllegalStateException_init_$Create$);
  return tmp;
}
function IllegalStateException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  IllegalStateException.call($this);
  return $this;
}
function IllegalStateException_init_$Create$_0(message) {
  var tmp = IllegalStateException_init_$Init$_0(message, objectCreate(protoOf(IllegalStateException)));
  captureStack(tmp, IllegalStateException_init_$Create$_0);
  return tmp;
}
function IllegalStateException() {
  captureStack(this, IllegalStateException);
}
function ConcurrentModificationException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  ConcurrentModificationException.call($this);
  return $this;
}
function ConcurrentModificationException_init_$Create$() {
  var tmp = ConcurrentModificationException_init_$Init$(objectCreate(protoOf(ConcurrentModificationException)));
  captureStack(tmp, ConcurrentModificationException_init_$Create$);
  return tmp;
}
function ConcurrentModificationException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  ConcurrentModificationException.call($this);
  return $this;
}
function ConcurrentModificationException_init_$Create$_0(message) {
  var tmp = ConcurrentModificationException_init_$Init$_0(message, objectCreate(protoOf(ConcurrentModificationException)));
  captureStack(tmp, ConcurrentModificationException_init_$Create$_0);
  return tmp;
}
function ConcurrentModificationException() {
  captureStack(this, ConcurrentModificationException);
}
function ArithmeticException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  ArithmeticException.call($this);
  return $this;
}
function ArithmeticException_init_$Create$() {
  var tmp = ArithmeticException_init_$Init$(objectCreate(protoOf(ArithmeticException)));
  captureStack(tmp, ArithmeticException_init_$Create$);
  return tmp;
}
function ArithmeticException_init_$Init$_0(message, $this) {
  RuntimeException_init_$Init$_0(message, $this);
  ArithmeticException.call($this);
  return $this;
}
function ArithmeticException_init_$Create$_0(message) {
  var tmp = ArithmeticException_init_$Init$_0(message, objectCreate(protoOf(ArithmeticException)));
  captureStack(tmp, ArithmeticException_init_$Create$_0);
  return tmp;
}
function ArithmeticException() {
  captureStack(this, ArithmeticException);
}
function NumberFormatException_init_$Init$($this) {
  IllegalArgumentException_init_$Init$($this);
  NumberFormatException.call($this);
  return $this;
}
function NumberFormatException_init_$Create$() {
  var tmp = NumberFormatException_init_$Init$(objectCreate(protoOf(NumberFormatException)));
  captureStack(tmp, NumberFormatException_init_$Create$);
  return tmp;
}
function NumberFormatException_init_$Init$_0(message, $this) {
  IllegalArgumentException_init_$Init$_0(message, $this);
  NumberFormatException.call($this);
  return $this;
}
function NumberFormatException_init_$Create$_0(message) {
  var tmp = NumberFormatException_init_$Init$_0(message, objectCreate(protoOf(NumberFormatException)));
  captureStack(tmp, NumberFormatException_init_$Create$_0);
  return tmp;
}
function NumberFormatException() {
  captureStack(this, NumberFormatException);
}
function Error_init_$Init$($this) {
  extendThrowable($this);
  Error_0.call($this);
  return $this;
}
function Error_init_$Create$() {
  var tmp = Error_init_$Init$(objectCreate(protoOf(Error_0)));
  captureStack(tmp, Error_init_$Create$);
  return tmp;
}
function Error_init_$Init$_0(message, $this) {
  extendThrowable($this, message);
  Error_0.call($this);
  return $this;
}
function Error_0() {
  captureStack(this, Error_0);
}
function NoWhenBranchMatchedException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  NoWhenBranchMatchedException.call($this);
  return $this;
}
function NoWhenBranchMatchedException_init_$Create$() {
  var tmp = NoWhenBranchMatchedException_init_$Init$(objectCreate(protoOf(NoWhenBranchMatchedException)));
  captureStack(tmp, NoWhenBranchMatchedException_init_$Create$);
  return tmp;
}
function NoWhenBranchMatchedException() {
  captureStack(this, NoWhenBranchMatchedException);
}
function NullPointerException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  NullPointerException.call($this);
  return $this;
}
function NullPointerException_init_$Create$() {
  var tmp = NullPointerException_init_$Init$(objectCreate(protoOf(NullPointerException)));
  captureStack(tmp, NullPointerException_init_$Create$);
  return tmp;
}
function NullPointerException() {
  captureStack(this, NullPointerException);
}
function ClassCastException_init_$Init$($this) {
  RuntimeException_init_$Init$($this);
  ClassCastException.call($this);
  return $this;
}
function ClassCastException_init_$Create$() {
  var tmp = ClassCastException_init_$Init$(objectCreate(protoOf(ClassCastException)));
  captureStack(tmp, ClassCastException_init_$Create$);
  return tmp;
}
function ClassCastException() {
  captureStack(this, ClassCastException);
}
function fillFrom(src, dst) {
  var srcLen = src.length;
  var dstLen = dst.length;
  var index = 0;
  // Inline function 'kotlin.js.unsafeCast' call
  var arr = dst;
  while (index < srcLen && index < dstLen) {
    var tmp = index;
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    arr[tmp] = src[_unary__edvuaz];
  }
  return dst;
}
function arrayCopyResize(source, newSize, defaultValue) {
  // Inline function 'kotlin.js.unsafeCast' call
  var result = source.slice(0, newSize);
  // Inline function 'kotlin.copyArrayType' call
  if (source.$type$ !== undefined) {
    result.$type$ = source.$type$;
  }
  var index = source.length;
  if (newSize > index) {
    // Inline function 'kotlin.js.asDynamic' call
    result.length = newSize;
    while (index < newSize) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      result[_unary__edvuaz] = defaultValue;
    }
  }
  return result;
}
function roundToInt(_this__u8e3s4) {
  var tmp;
  if (isNaN_0(_this__u8e3s4)) {
    throw IllegalArgumentException_init_$Create$_0('Cannot round NaN value.');
  } else if (_this__u8e3s4 > 2147483647) {
    tmp = 2147483647;
  } else if (_this__u8e3s4 < -2147483648) {
    tmp = -2147483648;
  } else {
    tmp = numberToInt(Math.round(_this__u8e3s4));
  }
  return tmp;
}
function roundToLong(_this__u8e3s4) {
  var tmp;
  if (isNaN_0(_this__u8e3s4)) {
    throw IllegalArgumentException_init_$Create$_0('Cannot round NaN value.');
  } else if (_this__u8e3s4 > toNumber(new Long(-1, 2147483647))) {
    tmp = new Long(-1, 2147483647);
  } else if (_this__u8e3s4 < toNumber(new Long(0, -2147483648))) {
    tmp = new Long(0, -2147483648);
  } else {
    tmp = numberToLong(Math.round(_this__u8e3s4));
  }
  return tmp;
}
function PrimitiveKClassImpl(jClass, simpleName, isInstanceFunction) {
  KClassImpl.call(this);
  this.y5_1 = jClass;
  this.z5_1 = simpleName;
  this.a6_1 = isInstanceFunction;
}
protoOf(PrimitiveKClassImpl).b6 = function () {
  return this.y5_1;
};
protoOf(PrimitiveKClassImpl).c6 = function () {
  return this.z5_1;
};
function KClassImpl() {
}
protoOf(KClassImpl).equals = function (other) {
  var tmp;
  if (other instanceof NothingKClassImpl) {
    tmp = false;
  } else {
    if (other instanceof KClassImpl) {
      tmp = (equals(this.b6(), other.b6()) && this.c6() == other.c6());
    } else {
      tmp = false;
    }
  }
  return tmp;
};
protoOf(KClassImpl).hashCode = function () {
  var tmp0_safe_receiver = this.c6();
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
  return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
};
protoOf(KClassImpl).toString = function () {
  return 'class ' + this.c6();
};
function NothingKClassImpl() {
}
function reset(_this__u8e3s4) {
  _this__u8e3s4.lastIndex = 0;
}
function StringBuilder_init_$Init$(capacity, $this) {
  StringBuilder_init_$Init$_0($this);
  return $this;
}
function StringBuilder_init_$Create$(capacity) {
  return StringBuilder_init_$Init$(capacity, objectCreate(protoOf(StringBuilder)));
}
function StringBuilder_init_$Init$_0($this) {
  StringBuilder.call($this, '');
  return $this;
}
function StringBuilder_init_$Create$_0() {
  return StringBuilder_init_$Init$_0(objectCreate(protoOf(StringBuilder)));
}
function StringBuilder(content) {
  this.m4_1 = content;
}
protoOf(StringBuilder).a = function () {
  // Inline function 'kotlin.js.asDynamic' call
  return this.m4_1.length;
};
protoOf(StringBuilder).b = function (index) {
  // Inline function 'kotlin.text.getOrElse' call
  var this_0 = this.m4_1;
  var tmp;
  if (0 <= index ? index <= (charSequenceLength(this_0) - 1 | 0) : false) {
    tmp = charSequenceGet(this_0, index);
  } else {
    throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', length: ' + this.a() + '}');
  }
  return tmp;
};
protoOf(StringBuilder).c = function (startIndex, endIndex) {
  return substring(this.m4_1, startIndex, endIndex);
};
protoOf(StringBuilder).p4 = function (value) {
  this.m4_1 = this.m4_1 + toString(value);
  return this;
};
protoOf(StringBuilder).e = function (value) {
  this.m4_1 = this.m4_1 + toString_0(value);
  return this;
};
protoOf(StringBuilder).d6 = function (value, startIndex, endIndex) {
  return this.e6(value == null ? 'null' : value, startIndex, endIndex);
};
protoOf(StringBuilder).n4 = function (value) {
  this.m4_1 = this.m4_1 + toString_0(value);
  return this;
};
protoOf(StringBuilder).f6 = function (value) {
  this.m4_1 = this.m4_1 + value;
  return this;
};
protoOf(StringBuilder).g6 = function (value) {
  return this.o4(value.toString());
};
protoOf(StringBuilder).o4 = function (value) {
  var tmp = this;
  var tmp_0 = this.m4_1;
  tmp.m4_1 = tmp_0 + (value == null ? 'null' : value);
  return this;
};
protoOf(StringBuilder).toString = function () {
  return this.m4_1;
};
protoOf(StringBuilder).e6 = function (value, startIndex, endIndex) {
  var stringCsq = toString_1(value);
  Companion_instance_4.h6(startIndex, endIndex, stringCsq.length);
  this.m4_1 = this.m4_1 + substring(stringCsq, startIndex, endIndex);
  return this;
};
function uppercaseChar(_this__u8e3s4) {
  // Inline function 'kotlin.text.uppercase' call
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  var uppercase = toString(_this__u8e3s4).toUpperCase();
  return uppercase.length > 1 ? _this__u8e3s4 : charCodeAt(uppercase, 0);
}
function isWhitespace(_this__u8e3s4) {
  return isWhitespaceImpl(_this__u8e3s4);
}
function toString_2(_this__u8e3s4, radix) {
  return toStringImpl(_this__u8e3s4, checkRadix(radix));
}
function checkRadix(radix) {
  if (!(2 <= radix ? radix <= 36 : false)) {
    throw IllegalArgumentException_init_$Create$_0('radix ' + radix + ' was not in valid range 2..36');
  }
  return radix;
}
function toDoubleOrNull(_this__u8e3s4) {
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.takeIf' call
  var this_0 = +_this__u8e3s4;
  var tmp;
  if (!(isNaN_0(this_0) && !isNaN_1(_this__u8e3s4) || (this_0 === 0.0 && isBlank(_this__u8e3s4)))) {
    tmp = this_0;
  } else {
    tmp = null;
  }
  return tmp;
}
function toLong(_this__u8e3s4) {
  var tmp0_elvis_lhs = toLongOrNull(_this__u8e3s4);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function toString_3(_this__u8e3s4, radix) {
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.toString(checkRadix(radix));
}
function toInt(_this__u8e3s4) {
  var tmp0_elvis_lhs = toIntOrNull(_this__u8e3s4);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function isNaN_1(_this__u8e3s4) {
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  switch (_this__u8e3s4.toLowerCase()) {
    case 'nan':
    case '+nan':
    case '-nan':
      return true;
    default:
      return false;
  }
}
function digitOf(char, radix) {
  // Inline function 'kotlin.let' call
  var it = Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(48)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(57)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(48)) : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(90)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(97)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(122)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(97)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(128)) < 0 ? -1 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65313)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65338)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65313)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65345)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65370)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65345)) + 10 | 0 : digitToIntImpl(char);
  return it >= radix ? -1 : it;
}
function Regex_init_$Init$(pattern, option, $this) {
  Regex.call($this, pattern, setOf(option));
  return $this;
}
function Regex_init_$Create$(pattern, option) {
  return Regex_init_$Init$(pattern, option, objectCreate(protoOf(Regex)));
}
function Regex_init_$Init$_0(pattern, $this) {
  Regex.call($this, pattern, emptySet());
  return $this;
}
function Regex_init_$Create$_0(pattern) {
  return Regex_init_$Init$_0(pattern, objectCreate(protoOf(Regex)));
}
function Companion_3() {
  Companion_instance_3 = this;
  this.i6_1 = new RegExp('[\\\\^$*+?.()|[\\]{}]', 'g');
  this.j6_1 = new RegExp('[\\\\$]', 'g');
  this.k6_1 = new RegExp('\\$', 'g');
}
protoOf(Companion_3).l6 = function (literal) {
  // Inline function 'kotlin.text.nativeReplace' call
  var pattern = this.i6_1;
  // Inline function 'kotlin.js.asDynamic' call
  return literal.replace(pattern, '\\$&');
};
protoOf(Companion_3).m6 = function (literal) {
  // Inline function 'kotlin.text.nativeReplace' call
  var pattern = this.k6_1;
  // Inline function 'kotlin.js.asDynamic' call
  return literal.replace(pattern, '$$$$');
};
var Companion_instance_3;
function Companion_getInstance_3() {
  if (Companion_instance_3 == null)
    new Companion_3();
  return Companion_instance_3;
}
function Regex$replace$lambda($replacement) {
  return function (it) {
    return substituteGroupRefs(it, $replacement);
  };
}
function Regex(pattern, options) {
  Companion_getInstance_3();
  this.n6_1 = pattern;
  this.o6_1 = toSet_0(options);
  this.p6_1 = new RegExp(pattern, toFlags(options, 'gu'));
  this.q6_1 = null;
  this.r6_1 = null;
}
protoOf(Regex).s6 = function (input) {
  reset(this.p6_1);
  return this.p6_1.test(toString_1(input));
};
protoOf(Regex).t6 = function (input, startIndex) {
  if (startIndex < 0 || startIndex > charSequenceLength(input)) {
    throw IndexOutOfBoundsException_init_$Create$_0('Start index out of bounds: ' + startIndex + ', input length: ' + charSequenceLength(input));
  }
  return findNext(this.p6_1, toString_1(input), startIndex, this.p6_1);
};
protoOf(Regex).u6 = function (input, startIndex, $super) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  return $super === VOID ? this.t6(input, startIndex) : $super.t6.call(this, input, startIndex);
};
protoOf(Regex).v6 = function (input, replacement) {
  if (!contains(replacement, _Char___init__impl__6a9atx(92)) && !contains(replacement, _Char___init__impl__6a9atx(36))) {
    var tmp0 = toString_1(input);
    // Inline function 'kotlin.text.nativeReplace' call
    var pattern = this.p6_1;
    // Inline function 'kotlin.js.asDynamic' call
    return tmp0.replace(pattern, replacement);
  }
  return this.w6(input, Regex$replace$lambda(replacement));
};
protoOf(Regex).w6 = function (input, transform) {
  var match = this.u6(input);
  if (match == null)
    return toString_1(input);
  var lastStart = 0;
  var length = charSequenceLength(input);
  var sb = StringBuilder_init_$Create$(length);
  do {
    var foundMatch = ensureNotNull(match);
    sb.d6(input, lastStart, foundMatch.x6().b7());
    sb.e(transform(foundMatch));
    lastStart = foundMatch.x6().c7() + 1 | 0;
    match = foundMatch.i();
  }
   while (lastStart < length && !(match == null));
  if (lastStart < length) {
    sb.d6(input, lastStart, length);
  }
  return sb.toString();
};
protoOf(Regex).toString = function () {
  return this.p6_1.toString();
};
var static_init_called;
function static_init() {
  if (static_init_called)
    return Unit_instance;
  static_init_called = true;
  RegexOption_IGNORE_CASE_instance = new RegexOption('IGNORE_CASE', 0, 'i');
  RegexOption_MULTILINE_instance = new RegexOption('MULTILINE', 1, 'm');
}
var RegexOption_IGNORE_CASE_instance;
var RegexOption_MULTILINE_instance;
function RegexOption(name, ordinal, value) {
  Enum.call(this, name, ordinal);
  this.f7_1 = value;
}
function MatchGroup(value) {
  this.g7_1 = value;
}
protoOf(MatchGroup).toString = function () {
  return 'MatchGroup(value=' + this.g7_1 + ')';
};
protoOf(MatchGroup).hashCode = function () {
  return getStringHashCode(this.g7_1);
};
protoOf(MatchGroup).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MatchGroup))
    return false;
  if (!(this.g7_1 === other.g7_1))
    return false;
  return true;
};
function toFlags(_this__u8e3s4, prepend) {
  return joinToString_1(_this__u8e3s4, '', prepend, VOID, VOID, VOID, toFlags$lambda);
}
function findNext(_this__u8e3s4, input, from, nextPattern) {
  _this__u8e3s4.lastIndex = from;
  var match = _this__u8e3s4.exec(input);
  if (match == null)
    return null;
  var range = numberRangeToNumber(match.index, _this__u8e3s4.lastIndex - 1 | 0);
  return new findNext$1(range, match, nextPattern, input);
}
function substituteGroupRefs(match, replacement) {
  var index = 0;
  var result = StringBuilder_init_$Create$_0();
  while (index < replacement.length) {
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var char = charCodeAt(replacement, _unary__edvuaz);
    if (char === _Char___init__impl__6a9atx(92)) {
      if (index === replacement.length)
        throw IllegalArgumentException_init_$Create$_0('The Char to be escaped is missing');
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      result.p4(charCodeAt(replacement, _unary__edvuaz_0));
    } else if (char === _Char___init__impl__6a9atx(36)) {
      if (index === replacement.length)
        throw IllegalArgumentException_init_$Create$_0('Capturing group index is missing');
      if (charCodeAt(replacement, index) === _Char___init__impl__6a9atx(123)) {
        index = index + 1 | 0;
        var endIndex = readGroupName(replacement, index);
        if (index === endIndex)
          throw IllegalArgumentException_init_$Create$_0('Named capturing group reference should have a non-empty name');
        if (endIndex === replacement.length || !(charCodeAt(replacement, endIndex) === _Char___init__impl__6a9atx(125)))
          throw IllegalArgumentException_init_$Create$_0("Named capturing group reference is missing trailing '}'");
        var groupName = substring(replacement, index, endIndex);
        var tmp0_safe_receiver = get(match.h7(), groupName);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g7_1;
        result.o4(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
        index = endIndex + 1 | 0;
      } else {
        var containsArg = charCodeAt(replacement, index);
        if (!(_Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false))
          throw IllegalArgumentException_init_$Create$_0('Invalid capturing group reference');
        var groups = match.h7();
        var endIndex_0 = readGroupIndex(replacement, index, groups.l());
        var groupIndex = toInt(substring(replacement, index, endIndex_0));
        if (groupIndex >= groups.l())
          throw IndexOutOfBoundsException_init_$Create$_0('Group with index ' + groupIndex + ' does not exist');
        var tmp2_safe_receiver = groups.k(groupIndex);
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.g7_1;
        result.o4(tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs);
        index = endIndex_0;
      }
    } else {
      result.p4(char);
    }
  }
  return result.toString();
}
function readGroupName(_this__u8e3s4, startIndex) {
  var index = startIndex;
  $l$loop: while (index < _this__u8e3s4.length) {
    if (charCodeAt(_this__u8e3s4, index) === _Char___init__impl__6a9atx(125)) {
      break $l$loop;
    } else {
      index = index + 1 | 0;
    }
  }
  return index;
}
function get(_this__u8e3s4, name) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, MatchNamedGroupCollection) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw UnsupportedOperationException_init_$Create$_0('Retrieving groups by name is not supported on this platform.');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var namedGroups = tmp;
  return namedGroups.i7(name);
}
function readGroupIndex(_this__u8e3s4, startIndex, groupCount) {
  var index = startIndex + 1 | 0;
  var groupIndex = Char__minus_impl_a2frrh(charCodeAt(_this__u8e3s4, startIndex), _Char___init__impl__6a9atx(48));
  $l$loop_0: while (true) {
    var tmp;
    if (index < _this__u8e3s4.length) {
      var containsArg = charCodeAt(_this__u8e3s4, index);
      tmp = _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
    } else {
      tmp = false;
    }
    if (!tmp) {
      break $l$loop_0;
    }
    var newGroupIndex = imul_0(groupIndex, 10) + Char__minus_impl_a2frrh(charCodeAt(_this__u8e3s4, index), _Char___init__impl__6a9atx(48)) | 0;
    if (0 <= newGroupIndex ? newGroupIndex < groupCount : false) {
      groupIndex = newGroupIndex;
      index = index + 1 | 0;
    } else {
      break $l$loop_0;
    }
  }
  return index;
}
function toFlags$lambda(it) {
  return it.f7_1;
}
function findNext$o$groups$o$iterator$lambda(this$0) {
  return function (it) {
    return this$0.k(it);
  };
}
function hasOwnPrototypeProperty($this, o, name) {
  // Inline function 'kotlin.js.unsafeCast' call
  return Object.prototype.hasOwnProperty.call(o, name);
}
function advanceToNextCharacter($this, index) {
  if (index < get_lastIndex_0($this.r7_1)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var code1 = $this.r7_1.charCodeAt(index);
    if (55296 <= code1 ? code1 <= 56319 : false) {
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      var code2 = $this.r7_1.charCodeAt(index + 1 | 0);
      if (56320 <= code2 ? code2 <= 57343 : false) {
        return index + 2 | 0;
      }
    }
  }
  return index + 1 | 0;
}
function findNext$1$groups$1($match, this$0) {
  this.j7_1 = $match;
  this.k7_1 = this$0;
  AbstractCollection.call(this);
}
protoOf(findNext$1$groups$1).l = function () {
  return this.j7_1.length;
};
protoOf(findNext$1$groups$1).g = function () {
  var tmp = asSequence(get_indices(this));
  return map(tmp, findNext$o$groups$o$iterator$lambda(this)).g();
};
protoOf(findNext$1$groups$1).k = function (index) {
  // Inline function 'kotlin.js.get' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_safe_receiver = this.j7_1[index];
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = new MatchGroup(tmp0_safe_receiver);
  }
  return tmp;
};
protoOf(findNext$1$groups$1).i7 = function (name) {
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_elvis_lhs = this.j7_1.groups;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalArgumentException_init_$Create$_0('Capturing group with name {' + name + '} does not exist. No named capturing group was defined in Regex');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var groups = tmp;
  if (!hasOwnPrototypeProperty(this.k7_1, groups, name))
    throw IllegalArgumentException_init_$Create$_0('Capturing group with name {' + name + '} does not exist');
  var value = groups[name];
  var tmp_0;
  if (value == undefined) {
    tmp_0 = null;
  } else {
    tmp_0 = new MatchGroup((!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
  }
  return tmp_0;
};
function findNext$1$groupValues$1($match) {
  this.s7_1 = $match;
  AbstractList.call(this);
}
protoOf(findNext$1$groupValues$1).l = function () {
  return this.s7_1.length;
};
protoOf(findNext$1$groupValues$1).k = function (index) {
  // Inline function 'kotlin.js.get' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_elvis_lhs = this.s7_1[index];
  return tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
};
function findNext$1($range, $match, $nextPattern, $input) {
  this.o7_1 = $range;
  this.p7_1 = $match;
  this.q7_1 = $nextPattern;
  this.r7_1 = $input;
  this.l7_1 = $range;
  var tmp = this;
  tmp.m7_1 = new findNext$1$groups$1($match, this);
  this.n7_1 = null;
}
protoOf(findNext$1).x6 = function () {
  return this.l7_1;
};
protoOf(findNext$1).v = function () {
  // Inline function 'kotlin.js.get' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$0 = this.p7_1[0];
  return ensureNotNull(tmp$ret$0);
};
protoOf(findNext$1).h7 = function () {
  return this.m7_1;
};
protoOf(findNext$1).t7 = function () {
  if (this.n7_1 == null) {
    var tmp = this;
    tmp.n7_1 = new findNext$1$groupValues$1(this.p7_1);
  }
  return ensureNotNull(this.n7_1);
};
protoOf(findNext$1).i = function () {
  return findNext(this.q7_1, this.r7_1, this.o7_1.j() ? advanceToNextCharacter(this, this.o7_1.b7()) : this.o7_1.c7() + 1 | 0, this.q7_1);
};
function RegexOption_IGNORE_CASE_getInstance() {
  static_init();
  return RegexOption_IGNORE_CASE_instance;
}
var STRING_CASE_INSENSITIVE_ORDER;
function substring(_this__u8e3s4, startIndex, endIndex) {
  _init_properties_stringJs_kt__bg7zye();
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.substring(startIndex, endIndex);
}
function compareTo_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  _init_properties_stringJs_kt__bg7zye();
  if (ignoreCase) {
    var n1 = _this__u8e3s4.length;
    var n2 = other.length;
    // Inline function 'kotlin.comparisons.minOf' call
    var min = Math.min(n1, n2);
    if (min === 0)
      return n1 - n2 | 0;
    var inductionVariable = 0;
    if (inductionVariable < min)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var thisChar = charCodeAt(_this__u8e3s4, index);
        var otherChar = charCodeAt(other, index);
        if (!(thisChar === otherChar)) {
          thisChar = uppercaseChar(thisChar);
          otherChar = uppercaseChar(otherChar);
          if (!(thisChar === otherChar)) {
            // Inline function 'kotlin.text.lowercaseChar' call
            // Inline function 'kotlin.text.lowercase' call
            var this_0 = thisChar;
            // Inline function 'kotlin.js.asDynamic' call
            // Inline function 'kotlin.js.unsafeCast' call
            var tmp$ret$2 = toString(this_0).toLowerCase();
            thisChar = charCodeAt(tmp$ret$2, 0);
            // Inline function 'kotlin.text.lowercaseChar' call
            // Inline function 'kotlin.text.lowercase' call
            var this_1 = otherChar;
            // Inline function 'kotlin.js.asDynamic' call
            // Inline function 'kotlin.js.unsafeCast' call
            var tmp$ret$6 = toString(this_1).toLowerCase();
            otherChar = charCodeAt(tmp$ret$6, 0);
            if (!(thisChar === otherChar)) {
              return Char__compareTo_impl_ypi4mb(thisChar, otherChar);
            }
          }
        }
      }
       while (inductionVariable < min);
    return n1 - n2 | 0;
  } else {
    return compareTo(_this__u8e3s4, other);
  }
}
function sam$kotlin_Comparator$0(function_0) {
  this.u7_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0).v7 = function (a, b) {
  return this.u7_1(a, b);
};
protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0).j1 = function () {
  return this.u7_1;
};
protoOf(sam$kotlin_Comparator$0).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0).hashCode = function () {
  return hashCode_0(this.j1());
};
function STRING_CASE_INSENSITIVE_ORDER$lambda(a, b) {
  _init_properties_stringJs_kt__bg7zye();
  return compareTo_0(a, b, true);
}
var properties_initialized_stringJs_kt_nta8o4;
function _init_properties_stringJs_kt__bg7zye() {
  if (!properties_initialized_stringJs_kt_nta8o4) {
    properties_initialized_stringJs_kt_nta8o4 = true;
    var tmp = STRING_CASE_INSENSITIVE_ORDER$lambda;
    STRING_CASE_INSENSITIVE_ORDER = new sam$kotlin_Comparator$0(tmp);
  }
}
function replace(_this__u8e3s4, oldValue, newValue, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp2 = new RegExp(Companion_getInstance_3().l6(oldValue), ignoreCase ? 'gui' : 'gu');
  // Inline function 'kotlin.text.nativeReplace' call
  var replacement = Companion_getInstance_3().m6(newValue);
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.replace(tmp2, replacement);
}
function startsWith(_this__u8e3s4, prefix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (!ignoreCase) {
    // Inline function 'kotlin.text.nativeStartsWith' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.startsWith(prefix, 0);
  } else
    return regionMatches(_this__u8e3s4, 0, prefix, 0, prefix.length, ignoreCase);
}
function regionMatches(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase);
}
function AbstractCollection$toString$lambda(this$0) {
  return function (it) {
    return it === this$0 ? '(this Collection)' : toString_0(it);
  };
}
function AbstractCollection() {
}
protoOf(AbstractCollection).s = function (element) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.any' call
    var tmp;
    if (isInterface(this, Collection)) {
      tmp = this.j();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var _iterator__ex2g4s = this.g();
    while (_iterator__ex2g4s.h()) {
      var element_0 = _iterator__ex2g4s.i();
      if (equals(element_0, element)) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
    }
    tmp$ret$0 = false;
  }
  return tmp$ret$0;
};
protoOf(AbstractCollection).t = function (elements) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.all' call
    var tmp;
    if (isInterface(elements, Collection)) {
      tmp = elements.j();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = true;
      break $l$block_0;
    }
    var _iterator__ex2g4s = elements.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (!this.s(element)) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(AbstractCollection).j = function () {
  return this.l() === 0;
};
protoOf(AbstractCollection).toString = function () {
  return joinToString_1(this, ', ', '[', ']', VOID, VOID, AbstractCollection$toString$lambda(this));
};
protoOf(AbstractCollection).toArray = function () {
  return collectionToArray(this);
};
function tryToComputeNext($this) {
  $this.w7_1 = 3;
  $this.y7();
  return $this.w7_1 === 1;
}
function AbstractIterator() {
  this.w7_1 = 0;
  this.x7_1 = null;
}
protoOf(AbstractIterator).h = function () {
  var tmp;
  switch (this.w7_1) {
    case 2:
      tmp = false;
      break;
    case 1:
      tmp = true;
      break;
    case 0:
      tmp = tryToComputeNext(this);
      break;
    default:
      throw IllegalArgumentException_init_$Create$_0('hasNext called when the iterator is in the FAILED state.');
  }
  return tmp;
};
protoOf(AbstractIterator).i = function () {
  if (this.w7_1 === 1) {
    this.w7_1 = 0;
    return this.x7_1;
  }
  if (this.w7_1 === 2 || !tryToComputeNext(this)) {
    throw NoSuchElementException_init_$Create$();
  }
  this.w7_1 = 0;
  return this.x7_1;
};
protoOf(AbstractIterator).z7 = function (value) {
  this.x7_1 = value;
  this.w7_1 = 1;
};
protoOf(AbstractIterator).a8 = function () {
  this.w7_1 = 2;
};
function IteratorImpl_0($outer) {
  this.c8_1 = $outer;
  this.b8_1 = 0;
}
protoOf(IteratorImpl_0).h = function () {
  return this.b8_1 < this.c8_1.l();
};
protoOf(IteratorImpl_0).i = function () {
  if (!this.h())
    throw NoSuchElementException_init_$Create$();
  var _unary__edvuaz = this.b8_1;
  this.b8_1 = _unary__edvuaz + 1 | 0;
  return this.c8_1.k(_unary__edvuaz);
};
function Companion_4() {
  this.k1_1 = 2147483639;
}
protoOf(Companion_4).i2 = function (index, size) {
  if (index < 0 || index >= size) {
    throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
  }
};
protoOf(Companion_4).j2 = function (index, size) {
  if (index < 0 || index > size) {
    throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
  }
};
protoOf(Companion_4).l1 = function (fromIndex, toIndex, size) {
  if (fromIndex < 0 || toIndex > size) {
    throw IndexOutOfBoundsException_init_$Create$_0('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex + ', size: ' + size);
  }
  if (fromIndex > toIndex) {
    throw IllegalArgumentException_init_$Create$_0('fromIndex: ' + fromIndex + ' > toIndex: ' + toIndex);
  }
};
protoOf(Companion_4).h6 = function (startIndex, endIndex, size) {
  if (startIndex < 0 || endIndex > size) {
    throw IndexOutOfBoundsException_init_$Create$_0('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
  }
  if (startIndex > endIndex) {
    throw IllegalArgumentException_init_$Create$_0('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
  }
};
protoOf(Companion_4).r3 = function (oldCapacity, minCapacity) {
  var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
  if ((newCapacity - minCapacity | 0) < 0)
    newCapacity = minCapacity;
  if ((newCapacity - 2147483639 | 0) > 0)
    newCapacity = minCapacity > 2147483639 ? 2147483647 : 2147483639;
  return newCapacity;
};
protoOf(Companion_4).w1 = function (c) {
  var hashCode = 1;
  var _iterator__ex2g4s = c.g();
  while (_iterator__ex2g4s.h()) {
    var e = _iterator__ex2g4s.i();
    var tmp = imul_0(31, hashCode);
    var tmp1_elvis_lhs = e == null ? null : hashCode_0(e);
    hashCode = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
  }
  return hashCode;
};
protoOf(Companion_4).v1 = function (c, other) {
  if (!(c.l() === other.l()))
    return false;
  var otherIterator = other.g();
  var _iterator__ex2g4s = c.g();
  while (_iterator__ex2g4s.h()) {
    var elem = _iterator__ex2g4s.i();
    var elemOther = otherIterator.i();
    if (!equals(elem, elemOther)) {
      return false;
    }
  }
  return true;
};
var Companion_instance_4;
function Companion_getInstance_4() {
  return Companion_instance_4;
}
function AbstractList() {
  AbstractCollection.call(this);
}
protoOf(AbstractList).g = function () {
  return new IteratorImpl_0(this);
};
protoOf(AbstractList).equals = function (other) {
  if (other === this)
    return true;
  if (!(!(other == null) ? isInterface(other, KtList) : false))
    return false;
  return Companion_instance_4.v1(this, other);
};
protoOf(AbstractList).hashCode = function () {
  return Companion_instance_4.w1(this);
};
function toString_4($this, entry) {
  return toString_5($this, entry.u()) + '=' + toString_5($this, entry.v());
}
function toString_5($this, o) {
  return o === $this ? '(this Map)' : toString_0(o);
}
function implFindEntry($this, key) {
  var tmp0 = $this.y();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (equals(element.u(), key)) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    tmp$ret$0 = null;
  }
  return tmp$ret$0;
}
function Companion_5() {
}
var Companion_instance_5;
function Companion_getInstance_5() {
  return Companion_instance_5;
}
function AbstractMap$toString$lambda(this$0) {
  return function (it) {
    return toString_4(this$0, it);
  };
}
function AbstractMap() {
  this.c2_1 = null;
  this.d2_1 = null;
}
protoOf(AbstractMap).w = function (key) {
  return !(implFindEntry(this, key) == null);
};
protoOf(AbstractMap).e2 = function (entry) {
  if (!(!(entry == null) ? isInterface(entry, Entry) : false))
    return false;
  var key = entry.u();
  var value = entry.v();
  // Inline function 'kotlin.collections.get' call
  var ourValue = (isInterface(this, KtMap) ? this : THROW_CCE()).x(key);
  if (!equals(value, ourValue)) {
    return false;
  }
  var tmp;
  if (ourValue == null) {
    // Inline function 'kotlin.collections.containsKey' call
    tmp = !(isInterface(this, KtMap) ? this : THROW_CCE()).w(key);
  } else {
    tmp = false;
  }
  if (tmp) {
    return false;
  }
  return true;
};
protoOf(AbstractMap).equals = function (other) {
  if (other === this)
    return true;
  if (!(!(other == null) ? isInterface(other, KtMap) : false))
    return false;
  if (!(this.l() === other.l()))
    return false;
  var tmp0 = other.y();
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.all' call
    var tmp;
    if (isInterface(tmp0, Collection)) {
      tmp = tmp0.j();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = true;
      break $l$block_0;
    }
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (!this.e2(element)) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(AbstractMap).x = function (key) {
  var tmp0_safe_receiver = implFindEntry(this, key);
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v();
};
protoOf(AbstractMap).hashCode = function () {
  return hashCode_0(this.y());
};
protoOf(AbstractMap).j = function () {
  return this.l() === 0;
};
protoOf(AbstractMap).l = function () {
  return this.y().l();
};
protoOf(AbstractMap).toString = function () {
  var tmp = this.y();
  return joinToString_1(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
};
function Companion_6() {
}
protoOf(Companion_6).g2 = function (c) {
  var hashCode = 0;
  var _iterator__ex2g4s = c.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp = hashCode;
    var tmp1_elvis_lhs = element == null ? null : hashCode_0(element);
    hashCode = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
  }
  return hashCode;
};
protoOf(Companion_6).f2 = function (c, other) {
  if (!(c.l() === other.l()))
    return false;
  return c.t(other);
};
var Companion_instance_6;
function Companion_getInstance_6() {
  return Companion_instance_6;
}
function throwIndexOverflow() {
  throw ArithmeticException_init_$Create$_0('Index overflow has happened.');
}
function collectionToArrayCommonImpl(collection) {
  if (collection.j()) {
    // Inline function 'kotlin.emptyArray' call
    return [];
  }
  // Inline function 'kotlin.arrayOfNulls' call
  var size = collection.l();
  var destination = Array(size);
  var iterator = collection.g();
  var index = 0;
  while (iterator.h()) {
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    destination[_unary__edvuaz] = iterator.i();
  }
  return destination;
}
function listOf_0(elements) {
  return elements.length > 0 ? asList(elements) : emptyList();
}
function emptyList() {
  return EmptyList_getInstance();
}
function EmptyIterator() {
}
protoOf(EmptyIterator).h = function () {
  return false;
};
protoOf(EmptyIterator).i = function () {
  throw NoSuchElementException_init_$Create$();
};
var EmptyIterator_instance;
function EmptyIterator_getInstance() {
  return EmptyIterator_instance;
}
function optimizeReadOnlyList(_this__u8e3s4) {
  switch (_this__u8e3s4.l()) {
    case 0:
      return emptyList();
    case 1:
      return listOf(_this__u8e3s4.k(0));
    default:
      return _this__u8e3s4;
  }
}
function EmptyList() {
  EmptyList_instance = this;
  this.d8_1 = new Long(-1478467534, -1720727600);
}
protoOf(EmptyList).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, KtList) : false) {
    tmp = other.j();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(EmptyList).hashCode = function () {
  return 1;
};
protoOf(EmptyList).toString = function () {
  return '[]';
};
protoOf(EmptyList).l = function () {
  return 0;
};
protoOf(EmptyList).j = function () {
  return true;
};
protoOf(EmptyList).k = function (index) {
  throw IndexOutOfBoundsException_init_$Create$_0("Empty list doesn't contain element at index " + index + '.');
};
protoOf(EmptyList).g = function () {
  return EmptyIterator_instance;
};
var EmptyList_instance;
function EmptyList_getInstance() {
  if (EmptyList_instance == null)
    new EmptyList();
  return EmptyList_instance;
}
function get_indices(_this__u8e3s4) {
  return numberRangeToNumber(0, _this__u8e3s4.l() - 1 | 0);
}
function throwCountOverflow() {
  throw ArithmeticException_init_$Create$_0('Count overflow has happened.');
}
function collectionSizeOrDefault(_this__u8e3s4, default_0) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection)) {
    tmp = _this__u8e3s4.l();
  } else {
    tmp = default_0;
  }
  return tmp;
}
function getOrImplicitDefault(_this__u8e3s4, key) {
  if (isInterface(_this__u8e3s4, MapWithDefault))
    return _this__u8e3s4.e8(key);
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.getOrElseIfMissing' call
    var value = _this__u8e3s4.x(key);
    if (value == null && !_this__u8e3s4.w(key)) {
      throw NoSuchElementException_init_$Create$_0('Key ' + toString_0(key) + ' is missing in the map.');
    } else {
      tmp$ret$0 = value;
      break $l$block_0;
    }
  }
  return tmp$ret$0;
}
function MapWithDefault() {
}
function toMap(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection)) {
    var tmp;
    switch (_this__u8e3s4.l()) {
      case 0:
        tmp = emptyMap();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList)) {
          tmp_0 = _this__u8e3s4.k(0);
        } else {
          tmp_0 = _this__u8e3s4.g().i();
        }

        tmp = mapOf(tmp_0);
        break;
      default:
        tmp = toMap_0(_this__u8e3s4, LinkedHashMap_init_$Create$_0(mapCapacity(_this__u8e3s4.l())));
        break;
    }
    return tmp;
  }
  return optimizeReadOnlyMap(toMap_0(_this__u8e3s4, LinkedHashMap_init_$Create$()));
}
function mapOf_0(pairs) {
  return pairs.length > 0 ? toMap_1(pairs, LinkedHashMap_init_$Create$_0(mapCapacity(pairs.length))) : emptyMap();
}
function getValue(_this__u8e3s4, key) {
  return getOrImplicitDefault(_this__u8e3s4, key);
}
function emptyMap() {
  var tmp = EmptyMap_getInstance();
  return isInterface(tmp, KtMap) ? tmp : THROW_CCE();
}
function toMap_0(_this__u8e3s4, destination) {
  // Inline function 'kotlin.apply' call
  putAll(destination, _this__u8e3s4);
  return destination;
}
function optimizeReadOnlyMap(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.l()) {
    case 0:
      tmp = emptyMap();
      break;
    case 1:
      // Inline function 'kotlin.collections.toSingletonMapOrSelf' call

      tmp = _this__u8e3s4;
      break;
    default:
      tmp = _this__u8e3s4;
      break;
  }
  return tmp;
}
function toMap_1(_this__u8e3s4, destination) {
  // Inline function 'kotlin.apply' call
  putAll_0(destination, _this__u8e3s4);
  return destination;
}
function EmptyMap() {
  EmptyMap_instance = this;
  this.f8_1 = new Long(-888910638, 1920087921);
}
protoOf(EmptyMap).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, KtMap) : false) {
    tmp = other.j();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(EmptyMap).hashCode = function () {
  return 0;
};
protoOf(EmptyMap).toString = function () {
  return '{}';
};
protoOf(EmptyMap).l = function () {
  return 0;
};
protoOf(EmptyMap).j = function () {
  return true;
};
protoOf(EmptyMap).g8 = function (key) {
  return false;
};
protoOf(EmptyMap).w = function (key) {
  if (!true)
    return false;
  return this.g8(key);
};
protoOf(EmptyMap).h8 = function (key) {
  return null;
};
protoOf(EmptyMap).x = function (key) {
  if (!true)
    return null;
  return this.h8(key);
};
protoOf(EmptyMap).y = function () {
  return EmptySet_getInstance();
};
var EmptyMap_instance;
function EmptyMap_getInstance() {
  if (EmptyMap_instance == null)
    new EmptyMap();
  return EmptyMap_instance;
}
function putAll(_this__u8e3s4, pairs) {
  var _iterator__ex2g4s = pairs.g();
  while (_iterator__ex2g4s.h()) {
    var _destruct__k2r9zo = _iterator__ex2g4s.i();
    var key = _destruct__k2r9zo.k8();
    var value = _destruct__k2r9zo.l8();
    _this__u8e3s4.b2(key, value);
  }
}
function putAll_0(_this__u8e3s4, pairs) {
  var inductionVariable = 0;
  var last = pairs.length;
  while (inductionVariable < last) {
    var _destruct__k2r9zo = pairs[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var key = _destruct__k2r9zo.k8();
    var value = _destruct__k2r9zo.l8();
    _this__u8e3s4.b2(key, value);
  }
}
function hashMapOf(pairs) {
  // Inline function 'kotlin.apply' call
  var this_0 = HashMap_init_$Create$_0(mapCapacity(pairs.length));
  putAll_0(this_0, pairs);
  return this_0;
}
function addAll(_this__u8e3s4, elements) {
  if (isInterface(elements, Collection))
    return _this__u8e3s4.p(elements);
  else {
    var result = false;
    var _iterator__ex2g4s = elements.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      if (_this__u8e3s4.f(item))
        result = true;
    }
    return result;
  }
}
function IntIterator() {
}
protoOf(IntIterator).i = function () {
  return this.m8();
};
function SequenceScope() {
}
function iterator(block) {
  var iterator = new SequenceBuilderIterator();
  iterator.r8_1 = createCoroutineUnintercepted(block, iterator, iterator);
  return iterator;
}
function nextNotReady($this) {
  if (!$this.h())
    throw NoSuchElementException_init_$Create$();
  else
    return $this.i();
}
function exceptionalState($this) {
  switch ($this.o8_1) {
    case 4:
      return NoSuchElementException_init_$Create$();
    case 5:
      return IllegalStateException_init_$Create$_0('Iterator has failed.');
    default:
      return IllegalStateException_init_$Create$_0('Unexpected state of the iterator: ' + $this.o8_1);
  }
}
function SequenceBuilderIterator() {
  SequenceScope.call(this);
  this.o8_1 = 0;
  this.p8_1 = null;
  this.q8_1 = null;
  this.r8_1 = null;
}
protoOf(SequenceBuilderIterator).h = function () {
  while (true) {
    switch (this.o8_1) {
      case 0:
        break;
      case 1:
        if (ensureNotNull(this.q8_1).h()) {
          this.o8_1 = 2;
          return true;
        } else {
          this.q8_1 = null;
        }

        break;
      case 4:
        return false;
      case 3:
      case 2:
        return true;
      default:
        throw exceptionalState(this);
    }
    this.o8_1 = 5;
    var step = ensureNotNull(this.r8_1);
    this.r8_1 = null;
    // Inline function 'kotlin.coroutines.resume' call
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$1 = _Result___init__impl__xyqfz8(Unit_instance);
    step.h5(tmp$ret$1);
  }
};
protoOf(SequenceBuilderIterator).i = function () {
  switch (this.o8_1) {
    case 0:
    case 1:
      return nextNotReady(this);
    case 2:
      this.o8_1 = 1;
      return ensureNotNull(this.q8_1).i();
    case 3:
      this.o8_1 = 0;
      var result = this.p8_1;
      this.p8_1 = null;
      return result;
    default:
      throw exceptionalState(this);
  }
};
protoOf(SequenceBuilderIterator).n8 = function (value, $completion) {
  this.p8_1 = value;
  this.o8_1 = 3;
  this.r8_1 = $completion;
  return get_COROUTINE_SUSPENDED();
};
protoOf(SequenceBuilderIterator).s8 = function (result) {
  // Inline function 'kotlin.getOrThrow' call
  throwOnFailure(result);
  _Result___get_value__impl__bjfvqg(result);
  this.o8_1 = 4;
};
protoOf(SequenceBuilderIterator).h5 = function (result) {
  return this.s8(result);
};
protoOf(SequenceBuilderIterator).c5 = function () {
  return EmptyCoroutineContext_getInstance();
};
function TransformingSequence$iterator$1(this$0) {
  this.u8_1 = this$0;
  this.t8_1 = this$0.v8_1.g();
}
protoOf(TransformingSequence$iterator$1).i = function () {
  return this.u8_1.w8_1(this.t8_1.i());
};
protoOf(TransformingSequence$iterator$1).h = function () {
  return this.t8_1.h();
};
function TransformingSequence(sequence, transformer) {
  this.v8_1 = sequence;
  this.w8_1 = transformer;
}
protoOf(TransformingSequence).g = function () {
  return new TransformingSequence$iterator$1(this);
};
function emptySet() {
  return EmptySet_getInstance();
}
function setOf_0(elements) {
  return toSet(elements);
}
function EmptySet() {
  EmptySet_instance = this;
  this.x8_1 = new Long(1993859828, 793161749);
}
protoOf(EmptySet).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, KtSet) : false) {
    tmp = other.j();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(EmptySet).hashCode = function () {
  return 0;
};
protoOf(EmptySet).toString = function () {
  return '[]';
};
protoOf(EmptySet).l = function () {
  return 0;
};
protoOf(EmptySet).j = function () {
  return true;
};
protoOf(EmptySet).y8 = function (element) {
  return false;
};
protoOf(EmptySet).s = function (element) {
  if (!false)
    return false;
  var tmp;
  if (false) {
    tmp = element;
  } else {
    tmp = THROW_CCE();
  }
  return this.y8(tmp);
};
protoOf(EmptySet).z8 = function (elements) {
  return elements.j();
};
protoOf(EmptySet).t = function (elements) {
  return this.z8(elements);
};
protoOf(EmptySet).g = function () {
  return EmptyIterator_instance;
};
var EmptySet_instance;
function EmptySet_getInstance() {
  if (EmptySet_instance == null)
    new EmptySet();
  return EmptySet_instance;
}
function optimizeReadOnlySet(_this__u8e3s4) {
  switch (_this__u8e3s4.l()) {
    case 0:
      return emptySet();
    case 1:
      return setOf(_this__u8e3s4.g().i());
    default:
      return _this__u8e3s4;
  }
}
function hashSetOf(elements) {
  return toCollection(elements, HashSet_init_$Create$_0(mapCapacity(elements.length)));
}
function checkWindowSizeStep(size, step) {
  // Inline function 'kotlin.require' call
  if (!(size > 0 && step > 0)) {
    var message = !(size === step) ? 'Both size ' + size + ' and step ' + step + ' must be greater than zero.' : 'size ' + size + ' must be greater than zero.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
}
function windowedIterator(iterator_0, size, step, partialWindows, reuseBuffer) {
  if (!iterator_0.h())
    return EmptyIterator_instance;
  return iterator(windowedIterator$slambda_0(size, step, iterator_0, reuseBuffer, partialWindows, null));
}
function RingBuffer_init_$Init$(capacity, $this) {
  // Inline function 'kotlin.arrayOfNulls' call
  var tmp$ret$0 = Array(capacity);
  RingBuffer.call($this, tmp$ret$0, 0);
  return $this;
}
function RingBuffer_init_$Create$(capacity) {
  return RingBuffer_init_$Init$(capacity, objectCreate(protoOf(RingBuffer)));
}
function RingBuffer$iterator$1(this$0) {
  this.e9_1 = this$0;
  AbstractIterator.call(this);
  this.c9_1 = this$0.i9_1;
  this.d9_1 = this$0.h9_1;
}
protoOf(RingBuffer$iterator$1).y7 = function () {
  if (this.c9_1 === 0) {
    this.a8();
  } else {
    this.z7(this.e9_1.f9_1[this.d9_1]);
    var tmp = this;
    var tmp0 = this.e9_1;
    // Inline function 'kotlin.collections.RingBuffer.forward' call
    tmp.d9_1 = (this.d9_1 + 1 | 0) % tmp0.g9_1 | 0;
    this.c9_1 = this.c9_1 - 1 | 0;
  }
};
function RingBuffer(buffer, filledSize) {
  AbstractList.call(this);
  this.f9_1 = buffer;
  // Inline function 'kotlin.require' call
  if (!(filledSize >= 0)) {
    var message = 'ring buffer filled size should not be negative but it is ' + filledSize;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.require' call
  if (!(filledSize <= this.f9_1.length)) {
    var message_0 = 'ring buffer filled size: ' + filledSize + ' cannot be larger than the buffer size: ' + this.f9_1.length;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
  }
  this.g9_1 = this.f9_1.length;
  this.h9_1 = 0;
  this.i9_1 = filledSize;
}
protoOf(RingBuffer).l = function () {
  return this.i9_1;
};
protoOf(RingBuffer).k = function (index) {
  Companion_instance_4.i2(index, this.i9_1);
  // Inline function 'kotlin.collections.RingBuffer.forward' call
  var tmp$ret$0 = (this.h9_1 + index | 0) % this.g9_1 | 0;
  return this.f9_1[tmp$ret$0];
};
protoOf(RingBuffer).j9 = function () {
  return this.i9_1 === this.g9_1;
};
protoOf(RingBuffer).g = function () {
  return new RingBuffer$iterator$1(this);
};
protoOf(RingBuffer).k9 = function (array) {
  var tmp;
  if (array.length < this.i9_1) {
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.i9_1;
    tmp = copyOf_0(array, newSize);
  } else {
    tmp = isArray(array) ? array : THROW_CCE();
  }
  var result = tmp;
  var size = this.i9_1;
  var widx = 0;
  var idx = this.h9_1;
  while (widx < size && idx < this.g9_1) {
    result[widx] = this.f9_1[idx];
    widx = widx + 1 | 0;
    idx = idx + 1 | 0;
  }
  idx = 0;
  while (widx < size) {
    result[widx] = this.f9_1[idx];
    widx = widx + 1 | 0;
    idx = idx + 1 | 0;
  }
  var tmp_0 = terminateCollectionToArray(size, result);
  return isArray(tmp_0) ? tmp_0 : THROW_CCE();
};
protoOf(RingBuffer).m2 = function () {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = this.i9_1;
  var tmp$ret$0 = Array(size);
  return this.k9(tmp$ret$0);
};
protoOf(RingBuffer).toArray = function () {
  return this.m2();
};
protoOf(RingBuffer).l9 = function (maxCapacity) {
  var newCapacity = coerceAtMost((this.g9_1 + (this.g9_1 >> 1) | 0) + 1 | 0, maxCapacity);
  var tmp;
  if (this.h9_1 === 0) {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.f9_1;
    tmp = copyOf_0(this_0, newCapacity);
  } else {
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$1 = Array(newCapacity);
    tmp = this.k9(tmp$ret$1);
  }
  var newBuffer = tmp;
  return new RingBuffer(newBuffer, this.i9_1);
};
protoOf(RingBuffer).m9 = function (element) {
  if (this.j9()) {
    throw IllegalStateException_init_$Create$_0('ring buffer is full');
  }
  // Inline function 'kotlin.collections.RingBuffer.forward' call
  var tmp$ret$0 = (this.h9_1 + this.i9_1 | 0) % this.g9_1 | 0;
  this.f9_1[tmp$ret$0] = element;
  this.i9_1 = this.i9_1 + 1 | 0;
};
protoOf(RingBuffer).n9 = function (n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = "n shouldn't be negative but it is " + n;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.require' call
  if (!(n <= this.i9_1)) {
    var message_0 = "n shouldn't be greater than the buffer size: n = " + n + ', size = ' + this.i9_1;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
  }
  if (n > 0) {
    var start = this.h9_1;
    // Inline function 'kotlin.collections.RingBuffer.forward' call
    var end = (start + n | 0) % this.g9_1 | 0;
    if (start > end) {
      fill(this.f9_1, null, start, this.g9_1);
      fill(this.f9_1, null, 0, end);
    } else {
      fill(this.f9_1, null, start, end);
    }
    this.h9_1 = end;
    this.i9_1 = this.i9_1 - n | 0;
  }
};
function windowedIterator$slambda($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
  this.w9_1 = $size;
  this.x9_1 = $step;
  this.y9_1 = $iterator;
  this.z9_1 = $reuseBuffer;
  this.aa_1 = $partialWindows;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(windowedIterator$slambda).ja = function ($this$iterator, $completion) {
  var tmp = this.ka($this$iterator, $completion);
  tmp.y4_1 = Unit_instance;
  tmp.z4_1 = null;
  return tmp.e5();
};
protoOf(windowedIterator$slambda).v5 = function (p1, $completion) {
  return this.ja(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
};
protoOf(windowedIterator$slambda).e5 = function () {
  var suspendResult = this.y4_1;
  $sm: do
    try {
      var tmp = this.w4_1;
      switch (tmp) {
        case 0:
          this.x4_1 = 21;
          var bufferInitialCapacity = coerceAtMost(this.w9_1, 1024);
          this.ea_1 = this.x9_1 - this.w9_1 | 0;
          if (this.ea_1 >= 0) {
            this.ca_1 = ArrayList_init_$Create$_0(bufferInitialCapacity);
            this.da_1 = 0;
            var tmp_0 = this;
            tmp_0.ga_1 = this.y9_1;
            this.w4_1 = 12;
            continue $sm;
          } else {
            this.ha_1 = RingBuffer_init_$Create$(bufferInitialCapacity);
            var tmp_1 = this;
            tmp_1.ia_1 = this.y9_1;
            this.w4_1 = 1;
            continue $sm;
          }

        case 1:
          if (!this.ia_1.h()) {
            this.w4_1 = 5;
            continue $sm;
          }

          var e = this.ia_1.i();
          this.ha_1.m9(e);
          if (this.ha_1.j9()) {
            if (this.ha_1.i9_1 < this.w9_1) {
              this.ha_1 = this.ha_1.l9(this.w9_1);
              this.w4_1 = 1;
              continue $sm;
            } else {
              this.w4_1 = 2;
              continue $sm;
            }
          } else {
            this.w4_1 = 4;
            continue $sm;
          }

        case 2:
          this.w4_1 = 3;
          suspendResult = this.ba_1.n8(this.z9_1 ? this.ha_1 : ArrayList_init_$Create$_1(this.ha_1), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 3:
          this.ha_1.n9(this.x9_1);
          this.w4_1 = 4;
          continue $sm;
        case 4:
          this.w4_1 = 1;
          continue $sm;
        case 5:
          if (this.aa_1) {
            this.w4_1 = 6;
            continue $sm;
          } else {
            this.w4_1 = 11;
            continue $sm;
          }

        case 6:
          if (!(this.ha_1.i9_1 > this.x9_1)) {
            this.w4_1 = 8;
            continue $sm;
          }

          this.w4_1 = 7;
          suspendResult = this.ba_1.n8(this.z9_1 ? this.ha_1 : ArrayList_init_$Create$_1(this.ha_1), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 7:
          this.ha_1.n9(this.x9_1);
          this.w4_1 = 6;
          continue $sm;
        case 8:
          if (!this.ha_1.j()) {
            this.w4_1 = 9;
            suspendResult = this.ba_1.n8(this.ha_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.w4_1 = 10;
            continue $sm;
          }

        case 9:
          this.w4_1 = 10;
          continue $sm;
        case 10:
          this.w4_1 = 11;
          continue $sm;
        case 11:
          this.w4_1 = 20;
          continue $sm;
        case 12:
          if (!this.ga_1.h()) {
            this.w4_1 = 16;
            continue $sm;
          }

          this.fa_1 = this.ga_1.i();
          if (this.da_1 > 0) {
            this.da_1 = this.da_1 - 1 | 0;
            this.w4_1 = 12;
            continue $sm;
          } else {
            this.w4_1 = 13;
            continue $sm;
          }

        case 13:
          this.ca_1.f(this.fa_1);
          if (this.ca_1.l() === this.w9_1) {
            this.w4_1 = 14;
            suspendResult = this.ba_1.n8(this.ca_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.w4_1 = 15;
            continue $sm;
          }

        case 14:
          if (this.z9_1) {
            this.ca_1.l2();
          } else
            this.ca_1 = ArrayList_init_$Create$_0(this.w9_1);
          this.da_1 = this.ea_1;
          this.w4_1 = 15;
          continue $sm;
        case 15:
          this.w4_1 = 12;
          continue $sm;
        case 16:
          if (!this.ca_1.j()) {
            if (this.aa_1 || this.ca_1.l() === this.w9_1) {
              this.w4_1 = 17;
              suspendResult = this.ba_1.n8(this.ca_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.w4_1 = 18;
              continue $sm;
            }
          } else {
            this.w4_1 = 19;
            continue $sm;
          }

        case 17:
          this.w4_1 = 18;
          continue $sm;
        case 18:
          this.w4_1 = 19;
          continue $sm;
        case 19:
          this.w4_1 = 20;
          continue $sm;
        case 20:
          return Unit_instance;
        case 21:
          throw this.z4_1;
      }
    } catch ($p) {
      var e_0 = $p;
      if (this.x4_1 === 21) {
        throw e_0;
      } else {
        this.w4_1 = this.x4_1;
        this.z4_1 = e_0;
      }
    }
   while (true);
};
protoOf(windowedIterator$slambda).ka = function ($this$iterator, completion) {
  var i = new windowedIterator$slambda(this.w9_1, this.x9_1, this.y9_1, this.z9_1, this.aa_1, completion);
  i.ba_1 = $this$iterator;
  return i;
};
function windowedIterator$slambda_0($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
  var i = new windowedIterator$slambda($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation);
  return constructCallableReference(function ($this$iterator, $completion) {
    return i.ja($this$iterator, $completion);
  }, 1);
}
function compareValues(a, b) {
  if (a == null)
    return b == null ? 0 : -1;
  if (b == null)
    return 1;
  return compareTo((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
}
function Continuation() {
}
function Key() {
}
var Key_instance;
function Key_getInstance() {
  return Key_instance;
}
function ContinuationInterceptor() {
}
function EmptyCoroutineContext() {
  EmptyCoroutineContext_instance = this;
  this.la_1 = new Long(0, 0);
}
protoOf(EmptyCoroutineContext).i5 = function (key) {
  return null;
};
protoOf(EmptyCoroutineContext).hashCode = function () {
  return 0;
};
protoOf(EmptyCoroutineContext).toString = function () {
  return 'EmptyCoroutineContext';
};
var EmptyCoroutineContext_instance;
function EmptyCoroutineContext_getInstance() {
  if (EmptyCoroutineContext_instance == null)
    new EmptyCoroutineContext();
  return EmptyCoroutineContext_instance;
}
function get_COROUTINE_SUSPENDED() {
  return CoroutineSingletons_COROUTINE_SUSPENDED_getInstance();
}
var static_init_called_0;
function static_init_0() {
  if (static_init_called_0)
    return Unit_instance;
  static_init_called_0 = true;
  CoroutineSingletons_COROUTINE_SUSPENDED_instance = new CoroutineSingletons('COROUTINE_SUSPENDED', 0);
  CoroutineSingletons_UNDECIDED_instance = new CoroutineSingletons('UNDECIDED', 1);
  CoroutineSingletons_RESUMED_instance = new CoroutineSingletons('RESUMED', 2);
}
var CoroutineSingletons_COROUTINE_SUSPENDED_instance;
var CoroutineSingletons_UNDECIDED_instance;
var CoroutineSingletons_RESUMED_instance;
function CoroutineSingletons(name, ordinal) {
  Enum.call(this, name, ordinal);
}
function CoroutineSingletons_COROUTINE_SUSPENDED_getInstance() {
  static_init_0();
  return CoroutineSingletons_COROUTINE_SUSPENDED_instance;
}
function EnumEntriesList(entries) {
  AbstractList.call(this);
  this.ma_1 = entries;
}
protoOf(EnumEntriesList).l = function () {
  return this.ma_1.length;
};
protoOf(EnumEntriesList).k = function (index) {
  Companion_instance_4.i2(index, this.ma_1.length);
  return this.ma_1[index];
};
protoOf(EnumEntriesList).na = function (element) {
  if (element === null)
    return false;
  var target = getOrNull(this.ma_1, element.a1_1);
  return target === element;
};
protoOf(EnumEntriesList).s = function (element) {
  if (!(element instanceof Enum))
    return false;
  return this.na(element instanceof Enum ? element : THROW_CCE());
};
function enumEntries(entries) {
  return new EnumEntriesList(entries);
}
function getProgressionLastElement(start, end, step) {
  var tmp;
  if (step > 0) {
    tmp = start >= end ? end : end - differenceModulo(end, start, step) | 0;
  } else if (step < 0) {
    tmp = start <= end ? end : end + differenceModulo(start, end, -step | 0) | 0;
  } else {
    throw IllegalArgumentException_init_$Create$_0('Step is zero.');
  }
  return tmp;
}
function differenceModulo(a, b, c) {
  return mod(mod(a, c) - mod(b, c) | 0, c);
}
function mod(a, b) {
  var mod = a % b | 0;
  return mod >= 0 ? mod : mod + b | 0;
}
function Companion_7() {
  Companion_instance_7 = this;
  this.oa_1 = new IntRange(1, 0);
}
var Companion_instance_7;
function Companion_getInstance_7() {
  if (Companion_instance_7 == null) {
    Companion_instance_8;
    new Companion_7();
  }
  return Companion_instance_7;
}
function IntRange(start, endInclusive) {
  Companion_getInstance_7();
  IntProgression.call(this, start, endInclusive, 1);
}
protoOf(IntRange).b7 = function () {
  return this.pa_1;
};
protoOf(IntRange).c7 = function () {
  return this.qa_1;
};
protoOf(IntRange).j = function () {
  return this.pa_1 > this.qa_1;
};
protoOf(IntRange).equals = function (other) {
  var tmp;
  if (other instanceof IntRange) {
    tmp = this.j() && other.j() || (this.pa_1 === other.pa_1 && this.qa_1 === other.qa_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(IntRange).hashCode = function () {
  return this.j() ? -1 : imul_0(31, this.pa_1) + this.qa_1 | 0;
};
protoOf(IntRange).toString = function () {
  return '' + this.pa_1 + '..' + this.qa_1;
};
function IntProgressionIterator(first, last, step) {
  IntIterator.call(this);
  this.sa_1 = step;
  this.ta_1 = last;
  this.ua_1 = this.sa_1 > 0 ? first <= last : first >= last;
  this.va_1 = this.ua_1 ? first : this.ta_1;
}
protoOf(IntProgressionIterator).h = function () {
  return this.ua_1;
};
protoOf(IntProgressionIterator).m8 = function () {
  var value = this.va_1;
  if (value === this.ta_1) {
    if (!this.ua_1)
      throw NoSuchElementException_init_$Create$();
    this.ua_1 = false;
  } else {
    this.va_1 = this.va_1 + this.sa_1 | 0;
  }
  return value;
};
function Companion_8() {
}
protoOf(Companion_8).r = function (rangeStart, rangeEnd, step) {
  return new IntProgression(rangeStart, rangeEnd, step);
};
var Companion_instance_8;
function Companion_getInstance_8() {
  return Companion_instance_8;
}
function IntProgression(start, endInclusive, step) {
  if (step === 0)
    throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
  if (step === -2147483648)
    throw IllegalArgumentException_init_$Create$_0('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
  this.pa_1 = start;
  this.qa_1 = getProgressionLastElement(start, endInclusive, step);
  this.ra_1 = step;
}
protoOf(IntProgression).g = function () {
  return new IntProgressionIterator(this.pa_1, this.qa_1, this.ra_1);
};
protoOf(IntProgression).j = function () {
  return this.ra_1 > 0 ? this.pa_1 > this.qa_1 : this.pa_1 < this.qa_1;
};
protoOf(IntProgression).equals = function (other) {
  var tmp;
  if (other instanceof IntProgression) {
    tmp = this.j() && other.j() || (this.pa_1 === other.pa_1 && this.qa_1 === other.qa_1 && this.ra_1 === other.ra_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(IntProgression).hashCode = function () {
  return this.j() ? -1 : imul_0(31, imul_0(31, this.pa_1) + this.qa_1 | 0) + this.ra_1 | 0;
};
protoOf(IntProgression).toString = function () {
  return this.ra_1 > 0 ? '' + this.pa_1 + '..' + this.qa_1 + ' step ' + this.ra_1 : '' + this.pa_1 + ' downTo ' + this.qa_1 + ' step ' + (-this.ra_1 | 0);
};
function appendElement(_this__u8e3s4, element, transform) {
  if (!(transform == null))
    _this__u8e3s4.e(transform(element));
  else {
    if (element == null ? true : isCharSequence(element))
      _this__u8e3s4.e(element);
    else {
      if (element instanceof Char)
        _this__u8e3s4.p4(element.wa_1);
      else {
        _this__u8e3s4.e(toString_1(element));
      }
    }
  }
}
function equals_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (_this__u8e3s4 === other)
    return true;
  if (!ignoreCase)
    return false;
  var thisUpper = uppercaseChar(_this__u8e3s4);
  var otherUpper = uppercaseChar(other);
  var tmp;
  if (thisUpper === otherUpper) {
    tmp = true;
  } else {
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$1 = toString(thisUpper).toLowerCase();
    var tmp_0 = charCodeAt(tmp$ret$1, 0);
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$5 = toString(otherUpper).toLowerCase();
    tmp = tmp_0 === charCodeAt(tmp$ret$5, 0);
  }
  return tmp;
}
function toLongOrNull(_this__u8e3s4) {
  return toLongOrNull_0(_this__u8e3s4, 10);
}
function numberFormatError(input) {
  throw NumberFormatException_init_$Create$_0("Invalid number format: '" + input + "'");
}
function toIntOrNull(_this__u8e3s4) {
  return toIntOrNull_0(_this__u8e3s4, 10);
}
function toLongOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var start;
  var isNegative;
  var limit;
  var firstChar = charCodeAt(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1)
      return null;
    start = 1;
    if (firstChar === _Char___init__impl__6a9atx(45)) {
      isNegative = true;
      limit = new Long(0, -2147483648);
    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
      isNegative = false;
      limit = new Long(1, -2147483648);
    } else
      return null;
  } else {
    start = 0;
    isNegative = false;
    limit = new Long(1, -2147483648);
  }
  // Inline function 'kotlin.Long.div' call
  var this_0 = new Long(1, -2147483648);
  var limitForMaxRadix = divide(this_0, fromInt(36));
  var limitBeforeMul = limitForMaxRadix;
  var result = new Long(0, 0);
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      if (compare(result, limitBeforeMul) < 0) {
        if (equalsLong(limitBeforeMul, limitForMaxRadix)) {
          // Inline function 'kotlin.Long.div' call
          var this_1 = limit;
          limitBeforeMul = divide(this_1, fromInt(radix));
          if (compare(result, limitBeforeMul) < 0) {
            return null;
          }
        } else {
          return null;
        }
      }
      // Inline function 'kotlin.Long.times' call
      var this_2 = result;
      result = multiply(this_2, fromInt(radix));
      var tmp = result;
      // Inline function 'kotlin.Long.plus' call
      var this_3 = limit;
      var tmp$ret$3 = add(this_3, fromInt(digit));
      if (compare(tmp, tmp$ret$3) < 0)
        return null;
      // Inline function 'kotlin.Long.minus' call
      var this_4 = result;
      result = subtract(this_4, fromInt(digit));
    }
     while (inductionVariable < length);
  return isNegative ? result : negate(result);
}
function toIntOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var start;
  var isNegative;
  var limit;
  var firstChar = charCodeAt(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1)
      return null;
    start = 1;
    if (firstChar === _Char___init__impl__6a9atx(45)) {
      isNegative = true;
      limit = -2147483648;
    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
      isNegative = false;
      limit = -2147483647;
    } else
      return null;
  } else {
    start = 0;
    isNegative = false;
    limit = -2147483647;
  }
  var limitForMaxRadix = -59652323;
  var limitBeforeMul = limitForMaxRadix;
  var result = 0;
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      if (result < limitBeforeMul) {
        if (limitBeforeMul === limitForMaxRadix) {
          limitBeforeMul = limit / radix | 0;
          if (result < limitBeforeMul) {
            return null;
          }
        } else {
          return null;
        }
      }
      result = imul_0(result, radix);
      if (result < (limit + digit | 0))
        return null;
      result = result - digit | 0;
    }
     while (inductionVariable < length);
  return isNegative ? result : -result | 0;
}
function contains(_this__u8e3s4, char, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return indexOf_0(_this__u8e3s4, char, VOID, ignoreCase) >= 0;
}
function contains_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (typeof other === 'string') {
    tmp = indexOf_1(_this__u8e3s4, other, VOID, ignoreCase) >= 0;
  } else {
    tmp = indexOf_2(_this__u8e3s4, other, 0, charSequenceLength(_this__u8e3s4), ignoreCase) >= 0;
  }
  return tmp;
}
function padStart(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  return toString_1(padStart_0(isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE(), length, padChar));
}
function substringBefore(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = indexOf_0(_this__u8e3s4, delimiter);
  return index === -1 ? missingDelimiterValue : substring(_this__u8e3s4, 0, index);
}
function padEnd(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  return toString_1(padEnd_0(isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE(), length, padChar));
}
function substringAfter(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = indexOf_0(_this__u8e3s4, delimiter);
  return index === -1 ? missingDelimiterValue : substring(_this__u8e3s4, index + 1 | 0, _this__u8e3s4.length);
}
function indexOf_0(_this__u8e3s4, char, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$0 = charArrayOf([char]);
    tmp = indexOfAny(_this__u8e3s4, tmp$ret$0, startIndex, ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.text.nativeIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(str, startIndex);
  }
  return tmp;
}
function indexOf_1(_this__u8e3s4, string, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    tmp = indexOf_2(_this__u8e3s4, string, startIndex, charSequenceLength(_this__u8e3s4), ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(string, startIndex);
  }
  return tmp;
}
function indexOf_2(_this__u8e3s4, other, startIndex, endIndex, ignoreCase, last) {
  last = last === VOID ? false : last;
  var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), coerceAtMost(endIndex, charSequenceLength(_this__u8e3s4))) : downTo(coerceAtMost(startIndex, get_lastIndex_0(_this__u8e3s4)), coerceAtLeast(endIndex, 0));
  var tmp;
  if (typeof _this__u8e3s4 === 'string') {
    tmp = typeof other === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var inductionVariable = indices.pa_1;
    var last_0 = indices.qa_1;
    var step = indices.ra_1;
    if (step > 0 && inductionVariable <= last_0 || (step < 0 && last_0 <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step | 0;
        if (regionMatches(other, 0, _this__u8e3s4, index, other.length, ignoreCase))
          return index;
      }
       while (!(index === last_0));
  } else {
    var inductionVariable_0 = indices.pa_1;
    var last_1 = indices.qa_1;
    var step_0 = indices.ra_1;
    if (step_0 > 0 && inductionVariable_0 <= last_1 || (step_0 < 0 && last_1 <= inductionVariable_0))
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + step_0 | 0;
        if (regionMatchesImpl(other, 0, _this__u8e3s4, index_0, charSequenceLength(other), ignoreCase))
          return index_0;
      }
       while (!(index_0 === last_1));
  }
  return -1;
}
function trim(_this__u8e3s4) {
  // Inline function 'kotlin.text.trim' call
  var startIndex = 0;
  var endIndex = charSequenceLength(_this__u8e3s4) - 1 | 0;
  var startFound = false;
  $l$loop: while (startIndex <= endIndex) {
    var index = !startFound ? startIndex : endIndex;
    var p0 = charSequenceGet(_this__u8e3s4, index);
    var match = isWhitespace(p0);
    if (!startFound) {
      if (!match)
        startFound = true;
      else
        startIndex = startIndex + 1 | 0;
    } else {
      if (!match)
        break $l$loop;
      else
        endIndex = endIndex - 1 | 0;
    }
  }
  return charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex + 1 | 0);
}
function padStart_0(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  if (length < 0)
    throw IllegalArgumentException_init_$Create$_0('Desired length ' + length + ' is less than zero.');
  if (length <= charSequenceLength(_this__u8e3s4))
    return charSequenceSubSequence(_this__u8e3s4, 0, charSequenceLength(_this__u8e3s4));
  var sb = StringBuilder_init_$Create$(length);
  var inductionVariable = 1;
  var last = length - charSequenceLength(_this__u8e3s4) | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      sb.p4(padChar);
    }
     while (!(i === last));
  sb.e(_this__u8e3s4);
  return sb;
}
function padEnd_0(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  if (length < 0)
    throw IllegalArgumentException_init_$Create$_0('Desired length ' + length + ' is less than zero.');
  if (length <= charSequenceLength(_this__u8e3s4))
    return charSequenceSubSequence(_this__u8e3s4, 0, charSequenceLength(_this__u8e3s4));
  var sb = StringBuilder_init_$Create$(length);
  sb.e(_this__u8e3s4);
  var inductionVariable = 1;
  var last = length - charSequenceLength(_this__u8e3s4) | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      sb.p4(padChar);
    }
     while (!(i === last));
  return sb;
}
function indexOfAny(_this__u8e3s4, chars, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (!ignoreCase && chars.length === 1) {
    tmp = typeof _this__u8e3s4 === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var char = single(chars);
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.text.nativeIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.indexOf(str, startIndex);
  }
  var inductionVariable = coerceAtLeast(startIndex, 0);
  var last = get_lastIndex_0(_this__u8e3s4);
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var charAtIndex = charSequenceGet(_this__u8e3s4, index);
      var tmp$ret$3;
      $l$block: {
        // Inline function 'kotlin.collections.any' call
        var inductionVariable_0 = 0;
        var last_0 = chars.length;
        while (inductionVariable_0 < last_0) {
          var element = chars[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          if (equals_0(element, charAtIndex, ignoreCase)) {
            tmp$ret$3 = true;
            break $l$block;
          }
        }
        tmp$ret$3 = false;
      }
      if (tmp$ret$3)
        return index;
    }
     while (!(index === last));
  return -1;
}
function get_lastIndex_0(_this__u8e3s4) {
  return charSequenceLength(_this__u8e3s4) - 1 | 0;
}
function regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
  if (otherOffset < 0 || thisOffset < 0 || thisOffset > (charSequenceLength(_this__u8e3s4) - length | 0) || otherOffset > (charSequenceLength(other) - length | 0)) {
    return false;
  }
  var inductionVariable = 0;
  if (inductionVariable < length)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!equals_0(charSequenceGet(_this__u8e3s4, thisOffset + index | 0), charSequenceGet(other, otherOffset + index | 0), ignoreCase))
        return false;
    }
     while (inductionVariable < length);
  return true;
}
function isBlank(_this__u8e3s4) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.text.all' call
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
      var element = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (!isWhitespace(element)) {
        tmp$ret$0 = false;
        break $l$block;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
}
function MatchNamedGroupCollection() {
}
function _Result___init__impl__xyqfz8(value) {
  return value;
}
function _Result___get_value__impl__bjfvqg($this) {
  return $this;
}
function _Result___get_isFailure__impl__jpiriv($this) {
  var tmp = _Result___get_value__impl__bjfvqg($this);
  return tmp instanceof Failure;
}
function Result__exceptionOrNull_impl_p6xea9($this) {
  var tmp;
  if (_Result___get_value__impl__bjfvqg($this) instanceof Failure) {
    tmp = _Result___get_value__impl__bjfvqg($this).xa_1;
  } else {
    tmp = null;
  }
  return tmp;
}
function Companion_9() {
}
var Companion_instance_9;
function Companion_getInstance_9() {
  return Companion_instance_9;
}
function Failure(exception) {
  this.xa_1 = exception;
}
protoOf(Failure).equals = function (other) {
  var tmp;
  if (other instanceof Failure) {
    tmp = equals(this.xa_1, other.xa_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(Failure).hashCode = function () {
  return hashCode_0(this.xa_1);
};
protoOf(Failure).toString = function () {
  return 'Failure(' + this.xa_1.toString() + ')';
};
function throwOnFailure(_this__u8e3s4) {
  var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
  if (tmp instanceof Failure)
    throw _Result___get_value__impl__bjfvqg(_this__u8e3s4).xa_1;
}
function createFailure(exception) {
  return new Failure(exception);
}
function NotImplementedError(message) {
  message = message === VOID ? 'An operation is not implemented.' : message;
  Error_init_$Init$_0(message, this);
  captureStack(this, NotImplementedError);
}
function Pair(first, second) {
  this.i8_1 = first;
  this.j8_1 = second;
}
protoOf(Pair).toString = function () {
  return '(' + toString_0(this.i8_1) + ', ' + toString_0(this.j8_1) + ')';
};
protoOf(Pair).k8 = function () {
  return this.i8_1;
};
protoOf(Pair).l8 = function () {
  return this.j8_1;
};
protoOf(Pair).hashCode = function () {
  var result = this.i8_1 == null ? 0 : hashCode_0(this.i8_1);
  result = imul_0(result, 31) + (this.j8_1 == null ? 0 : hashCode_0(this.j8_1)) | 0;
  return result;
};
protoOf(Pair).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Pair))
    return false;
  if (!equals(this.i8_1, other.i8_1))
    return false;
  if (!equals(this.j8_1, other.j8_1))
    return false;
  return true;
};
function to(_this__u8e3s4, that) {
  return new Pair(_this__u8e3s4, that);
}
function Triple(first, second, third) {
  this.ya_1 = first;
  this.za_1 = second;
  this.ab_1 = third;
}
protoOf(Triple).toString = function () {
  return '(' + toString_0(this.ya_1) + ', ' + toString_0(this.za_1) + ', ' + toString_0(this.ab_1) + ')';
};
protoOf(Triple).k8 = function () {
  return this.ya_1;
};
protoOf(Triple).l8 = function () {
  return this.za_1;
};
protoOf(Triple).bb = function () {
  return this.ab_1;
};
protoOf(Triple).hashCode = function () {
  var result = this.ya_1 == null ? 0 : hashCode_0(this.ya_1);
  result = imul_0(result, 31) + (this.za_1 == null ? 0 : hashCode_0(this.za_1)) | 0;
  result = imul_0(result, 31) + (this.ab_1 == null ? 0 : hashCode_0(this.ab_1)) | 0;
  return result;
};
protoOf(Triple).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Triple))
    return false;
  if (!equals(this.ya_1, other.ya_1))
    return false;
  if (!equals(this.za_1, other.za_1))
    return false;
  if (!equals(this.ab_1, other.ab_1))
    return false;
  return true;
};
function _UShort___init__impl__jigrne(data) {
  return data;
}
function _UShort___get_data__impl__g0245($this) {
  return $this;
}
var static_init_called_1;
function static_init_1() {
  if (static_init_called_1)
    return Unit_instance;
  static_init_called_1 = true;
  BrickMarketplace_LEGO_PICK_A_BRICK_instance = new BrickMarketplace('LEGO_PICK_A_BRICK', 0, 'LEGO Pick a Brick', 'Official New', 'csv', 'text/csv', "Copies Pick a Brick CSV & opens LEGO Pick a Brick. Use 'Upload List' or match Design IDs to add all parts to your LEGO bag.");
  BrickMarketplace_BRICKLINK_instance = new BrickMarketplace('BRICKLINK', 1, 'BrickLink Easy Buy', 'Best Official Price', 'xml', 'application/xml', "Copies BrickLink XML to clipboard & opens Upload Wanted List. Paste XML \u2192 Proceed \u2192 click 'Buy All' to auto-create store carts.");
  BrickMarketplace_BRICKOWL_instance = new BrickMarketplace('BRICKOWL', 2, 'BrickOwl Wishlist', 'Fast Multi-Store', 'xml', 'application/xml', 'Copies BrickLink/BrickOwl XML & opens BrickOwl Import (or creates a live Wishlist directly when your BrickOwl API key is set).');
  BrickMarketplace_REBRICKABLE_instance = new BrickMarketplace('REBRICKABLE', 3, 'Rebrickable Multi-Buy', 'Price Optimizer', 'csv', 'text/csv', "Copies Rebrickable CSV & opens Custom Part Lists. Import the list and click 'Buy Parts' to compare all marketplaces at once.");
  BrickMarketplace_WEBRICK_instance = new BrickMarketplace('WEBRICK', 4, 'Webrick Bulk Cart', 'Lowest Budget', 'csv', 'text/csv', 'Copies Webrick CSV & opens Webrick Upload Tool. Upload or paste your list to fill a single compatible-brick cart automatically.');
}
var BrickMarketplace_LEGO_PICK_A_BRICK_instance;
var BrickMarketplace_BRICKLINK_instance;
var BrickMarketplace_BRICKOWL_instance;
var BrickMarketplace_REBRICKABLE_instance;
var BrickMarketplace_WEBRICK_instance;
function values() {
  static_init_1();
  return [BrickMarketplace_LEGO_PICK_A_BRICK_getInstance(), BrickMarketplace_BRICKLINK_getInstance(), BrickMarketplace_BRICKOWL_getInstance(), BrickMarketplace_REBRICKABLE_getInstance(), BrickMarketplace_WEBRICK_getInstance()];
}
function get_entries() {
  static_init_1();
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var $ENTRIES;
function BrickMarketplace(name, ordinal, title, badge, fileExtension, mimeType, cartHowTo) {
  Enum.call(this, name, ordinal);
  this.eb_1 = title;
  this.fb_1 = badge;
  this.gb_1 = fileExtension;
  this.hb_1 = mimeType;
  this.ib_1 = cartHowTo;
}
function MarketplaceQuote(marketplace, estimatedTotalUsd, lotCount, pieceCount, savingsVsPabUsd, uploadUrl) {
  this.jb_1 = marketplace;
  this.kb_1 = estimatedTotalUsd;
  this.lb_1 = lotCount;
  this.mb_1 = pieceCount;
  this.nb_1 = savingsVsPabUsd;
  this.ob_1 = uploadUrl;
}
protoOf(MarketplaceQuote).toString = function () {
  return 'MarketplaceQuote(marketplace=' + this.jb_1.toString() + ', estimatedTotalUsd=' + this.kb_1 + ', lotCount=' + this.lb_1 + ', pieceCount=' + this.mb_1 + ', savingsVsPabUsd=' + this.nb_1 + ', uploadUrl=' + this.ob_1 + ')';
};
protoOf(MarketplaceQuote).hashCode = function () {
  var result = this.jb_1.hashCode();
  result = imul_0(result, 31) + getNumberHashCode(this.kb_1) | 0;
  result = imul_0(result, 31) + this.lb_1 | 0;
  result = imul_0(result, 31) + this.mb_1 | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.nb_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.ob_1) | 0;
  return result;
};
protoOf(MarketplaceQuote).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MarketplaceQuote))
    return false;
  if (!this.jb_1.equals(other.jb_1))
    return false;
  if (!equals(this.kb_1, other.kb_1))
    return false;
  if (!(this.lb_1 === other.lb_1))
    return false;
  if (!(this.mb_1 === other.mb_1))
    return false;
  if (!equals(this.nb_1, other.nb_1))
    return false;
  if (!(this.ob_1 === other.ob_1))
    return false;
  return true;
};
var static_init_called_2;
function static_init_2() {
  if (static_init_called_2)
    return Unit_instance;
  static_init_called_2 = true;
  CostSuggestionActionType_SWAP_RARE_COLORS_instance = new CostSuggestionActionType('SWAP_RARE_COLORS', 0);
  CostSuggestionActionType_SWITCH_MULTI_PLATE_instance = new CostSuggestionActionType('SWITCH_MULTI_PLATE', 1);
  CostSuggestionActionType_COMMON_RARITY_ONLY_instance = new CostSuggestionActionType('COMMON_RARITY_ONLY', 2);
  CostSuggestionActionType_USE_BASEPLATES_instance = new CostSuggestionActionType('USE_BASEPLATES', 3);
  CostSuggestionActionType_CONSOLIDATE_LOTS_instance = new CostSuggestionActionType('CONSOLIDATE_LOTS', 4);
  CostSuggestionActionType_STEP_DOWN_SIZE_instance = new CostSuggestionActionType('STEP_DOWN_SIZE', 5);
}
var CostSuggestionActionType_SWAP_RARE_COLORS_instance;
var CostSuggestionActionType_SWITCH_MULTI_PLATE_instance;
var CostSuggestionActionType_COMMON_RARITY_ONLY_instance;
var CostSuggestionActionType_USE_BASEPLATES_instance;
var CostSuggestionActionType_CONSOLIDATE_LOTS_instance;
var CostSuggestionActionType_STEP_DOWN_SIZE_instance;
function CostSuggestionActionType(name, ordinal) {
  Enum.call(this, name, ordinal);
}
function CostSavingSuggestion(id, actionType, title, explanation, estimatedSavingsUsd, actionLabel, targetWidth, targetHeight) {
  targetWidth = targetWidth === VOID ? null : targetWidth;
  targetHeight = targetHeight === VOID ? null : targetHeight;
  this.pb_1 = id;
  this.qb_1 = actionType;
  this.rb_1 = title;
  this.sb_1 = explanation;
  this.tb_1 = estimatedSavingsUsd;
  this.ub_1 = actionLabel;
  this.vb_1 = targetWidth;
  this.wb_1 = targetHeight;
}
protoOf(CostSavingSuggestion).toString = function () {
  return 'CostSavingSuggestion(id=' + this.pb_1 + ', actionType=' + this.qb_1.toString() + ', title=' + this.rb_1 + ', explanation=' + this.sb_1 + ', estimatedSavingsUsd=' + this.tb_1 + ', actionLabel=' + this.ub_1 + ', targetWidth=' + this.vb_1 + ', targetHeight=' + this.wb_1 + ')';
};
protoOf(CostSavingSuggestion).hashCode = function () {
  var result = getStringHashCode(this.pb_1);
  result = imul_0(result, 31) + this.qb_1.hashCode() | 0;
  result = imul_0(result, 31) + getStringHashCode(this.rb_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.sb_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.tb_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.ub_1) | 0;
  result = imul_0(result, 31) + (this.vb_1 == null ? 0 : this.vb_1) | 0;
  result = imul_0(result, 31) + (this.wb_1 == null ? 0 : this.wb_1) | 0;
  return result;
};
protoOf(CostSavingSuggestion).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof CostSavingSuggestion))
    return false;
  if (!(this.pb_1 === other.pb_1))
    return false;
  if (!this.qb_1.equals(other.qb_1))
    return false;
  if (!(this.rb_1 === other.rb_1))
    return false;
  if (!(this.sb_1 === other.sb_1))
    return false;
  if (!equals(this.tb_1, other.tb_1))
    return false;
  if (!(this.ub_1 === other.ub_1))
    return false;
  if (!(this.vb_1 == other.vb_1))
    return false;
  if (!(this.wb_1 == other.wb_1))
    return false;
  return true;
};
function buildBrickLinkXml($this, lines) {
  var sb = StringBuilder_init_$Create$_0();
  // Inline function 'kotlin.text.appendLine' call
  var value = '<INVENTORY>';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value).p4(_Char___init__impl__6a9atx(10));
  var _iterator__ex2g4s = lines.g();
  while (_iterator__ex2g4s.h()) {
    var line = _iterator__ex2g4s.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = '  <ITEM>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_0).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_1 = '    <ITEMTYPE>P<\/ITEMTYPE>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_1).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_2 = '    <ITEMID>' + line.kc_1.zb_1 + '<\/ITEMID>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_2).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_3 = '    <COLOR>' + line.lc_1.wc_1 + '<\/COLOR>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_3).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_4 = '    <MINQTY>' + line.mc_1 + '<\/MINQTY>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_4).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_5 = '    <CONDITION>N<\/CONDITION>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_5).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_6 = '  <\/ITEM>';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_6).p4(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.text.appendLine' call
  var value_7 = '<\/INVENTORY>';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_7).p4(_Char___init__impl__6a9atx(10));
  return sb.toString();
}
function buildWebrickCsv($this, lines) {
  var sb = StringBuilder_init_$Create$_0();
  // Inline function 'kotlin.text.appendLine' call
  var value = 'Part,Color,Quantity';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value).p4(_Char___init__impl__6a9atx(10));
  var _iterator__ex2g4s = lines.g();
  while (_iterator__ex2g4s.h()) {
    var line = _iterator__ex2g4s.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = line.kc_1.zb_1 + ',' + line.lc_1.wc_1 + ',' + line.mc_1;
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_0).p4(_Char___init__impl__6a9atx(10));
  }
  return sb.toString();
}
function sam$kotlin_Comparator$0_0(function_0) {
  this.md_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_0).v7 = function (a, b) {
  return this.md_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_0).j1 = function () {
  return this.md_1;
};
protoOf(sam$kotlin_Comparator$0_0).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_0).hashCode = function () {
  return hashCode_0(this.j1());
};
function MarketplaceCartBuilder$generateCostSavingSuggestions$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.tb_1;
  var tmp$ret$2 = a.tb_1;
  return compareValues(tmp, tmp$ret$2);
}
function MarketplaceCartBuilder() {
}
protoOf(MarketplaceCartBuilder).nd = function (marketplace, region) {
  var tmp;
  switch (marketplace.a1_1) {
    case 0:
      tmp = 'https://www.lego.com/' + region.qd_1 + '/pick-and-build/pick-a-brick';
      break;
    case 1:
      tmp = 'https://www.bricklink.com/v2/wanted/upload.page';
      break;
    case 2:
      tmp = 'https://www.brickowl.com/wishlist/import';
      break;
    case 3:
      tmp = 'https://rebrickable.com/users/partlists/';
      break;
    case 4:
      tmp = 'https://www.webrick.com/toolkit';
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
};
protoOf(MarketplaceCartBuilder).sd = function (result, region, excludeOwnedKeys) {
  var lines = MosaicExporter_getInstance().ud(result, excludeOwnedKeys);
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s = lines.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp = sum;
    sum = tmp + element.mc_1 | 0;
  }
  var pieces = sum;
  var lots = lines.l();
  // Inline function 'kotlin.collections.sumOf' call
  var sum_0 = 0;
  var _iterator__ex2g4s_0 = lines.g();
  while (_iterator__ex2g4s_0.h()) {
    var element_0 = _iterator__ex2g4s_0.i();
    var tmp_0 = sum_0;
    sum_0 = tmp_0 + element_0.rc_1;
  }
  var pabTotal = sum_0;
  // Inline function 'kotlin.collections.sumOf' call
  var sum_1 = 0;
  var _iterator__ex2g4s_1 = lines.g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    var tmp_1 = sum_1;
    sum_1 = tmp_1 + element_1.sc_1;
  }
  var blTotal = sum_1;
  var brickOwlTotal = blTotal * 1.04;
  // Inline function 'kotlin.comparisons.minOf' call
  var rebrickableMixedBest = Math.min(pabTotal, blTotal) * 0.97;
  var webrickTotal = pabTotal * 0.48;
  return listOf_0([new MarketplaceQuote(BrickMarketplace_LEGO_PICK_A_BRICK_getInstance(), pabTotal, lots, pieces, 0.0, this.nd(BrickMarketplace_LEGO_PICK_A_BRICK_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_BRICKLINK_getInstance(), blTotal, lots, pieces, coerceAtLeast_0(pabTotal - blTotal, 0.0), this.nd(BrickMarketplace_BRICKLINK_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_BRICKOWL_getInstance(), brickOwlTotal, lots, pieces, coerceAtLeast_0(pabTotal - brickOwlTotal, 0.0), this.nd(BrickMarketplace_BRICKOWL_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_REBRICKABLE_getInstance(), rebrickableMixedBest, lots, pieces, coerceAtLeast_0(pabTotal - rebrickableMixedBest, 0.0), this.nd(BrickMarketplace_REBRICKABLE_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_WEBRICK_getInstance(), webrickTotal, lots, pieces, coerceAtLeast_0(pabTotal - webrickTotal, 0.0), this.nd(BrickMarketplace_WEBRICK_getInstance(), region))]);
};
protoOf(MarketplaceCartBuilder).vd = function (result, region, excludeOwnedKeys, $super) {
  excludeOwnedKeys = excludeOwnedKeys === VOID ? emptySet() : excludeOwnedKeys;
  return $super === VOID ? this.sd(result, region, excludeOwnedKeys) : $super.sd.call(this, result, region, excludeOwnedKeys);
};
protoOf(MarketplaceCartBuilder).wd = function (result, marketplace, excludeOwnedKeys) {
  var lines = MosaicExporter_getInstance().ud(result, excludeOwnedKeys);
  var tmp;
  switch (marketplace.a1_1) {
    case 1:
    case 2:
      tmp = buildBrickLinkXml(this, lines);
      break;
    case 0:
      tmp = MosaicExporter_getInstance().xd(result, MarketplaceCsvFormat_PICK_A_BRICK_getInstance(), excludeOwnedKeys);
      break;
    case 3:
      tmp = MosaicExporter_getInstance().xd(result, MarketplaceCsvFormat_REBRICKABLE_getInstance(), excludeOwnedKeys);
      break;
    case 4:
      tmp = buildWebrickCsv(this, lines);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
};
protoOf(MarketplaceCartBuilder).yd = function (result, marketplace, excludeOwnedKeys, $super) {
  excludeOwnedKeys = excludeOwnedKeys === VOID ? emptySet() : excludeOwnedKeys;
  return $super === VOID ? this.wd(result, marketplace, excludeOwnedKeys) : $super.wd.call(this, result, marketplace, excludeOwnedKeys);
};
protoOf(MarketplaceCartBuilder).zd = function (result, marketplace) {
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var slug = marketplace.z_1.toLowerCase();
  return 'studcraft_' + result.be_1 + 'x' + result.ce_1 + '_' + slug + '_cart.' + marketplace.gb_1;
};
protoOf(MarketplaceCartBuilder).me = function (result) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var suggestions = ArrayList_init_$Create$();
  var cfg = result.ae_1;
  var pricing = result.ke_1;
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s = result.je_1.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp = sum;
    sum = tmp + element.vc_1;
  }
  var rareSwapSavings = sum;
  var tmp0 = result.je_1;
  var tmp$ret$3;
  $l$block: {
    // Inline function 'kotlin.collections.count' call
    var tmp_0;
    if (isInterface(tmp0, Collection)) {
      tmp_0 = tmp0.j();
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp$ret$3 = 0;
      break $l$block;
    }
    var count = 0;
    var _iterator__ex2g4s_0 = tmp0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      if (!element_0.kc_1.hc_1 && (element_0.nc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()) || !element_0.oc_1)) {
        count = count + 1 | 0;
        checkCountOverflow(count);
      }
    }
    tmp$ret$3 = count;
  }
  var rareLineCount = tmp$ret$3;
  if (rareLineCount > 0 && rareSwapSavings > 0.25) {
    suggestions.f(new CostSavingSuggestion('swap_rare', CostSuggestionActionType_SWAP_RARE_COLORS_getInstance(), 'Replace ' + rareLineCount + ' Rare / Retired Color Lot' + (rareLineCount > 1 ? 's' : ''), 'Swaps collector/discontinued colors for the closest active Pick a Brick shades to avoid secondary-market spikes.', rareSwapSavings, 'Auto-Swap Rare'));
  }
  if (!cfg.qe_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance()) && cfg.re_1.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance())) {
    // Inline function 'kotlin.math.ceil' call
    var x = result.be_1 / 16.0;
    var tmp$ret$5 = Math.ceil(x);
    var frameCols = numberToInt(tmp$ret$5);
    // Inline function 'kotlin.math.ceil' call
    var x_0 = result.ce_1 / 16.0;
    var tmp$ret$6 = Math.ceil(x_0);
    var frameRows = numberToInt(tmp$ret$6);
    var currentFrameCost = imul_0(frameCols, frameRows) * BrickPartType_TECHNIC_FRAME_16X16_getInstance().ic_1 + result.ge_1.l() * BrickPartType_TECHNIC_PIN_getInstance().ic_1;
    // Inline function 'kotlin.math.ceil' call
    var x_1 = result.be_1 / 32.0;
    var tmp$ret$7 = Math.ceil(x_1);
    var baseCols = numberToInt(tmp$ret$7);
    // Inline function 'kotlin.math.ceil' call
    var x_2 = result.ce_1 / 32.0;
    var tmp$ret$8 = Math.ceil(x_2);
    var baseRows = numberToInt(tmp$ret$8);
    var baseplateCost = imul_0(baseCols, baseRows) * BrickPartType_BASEPLATE_32X32_getInstance().ic_1;
    var diff = currentFrameCost - baseplateCost;
    if (diff > 1.5) {
      suggestions.f(new CostSavingSuggestion('use_baseplates', CostSuggestionActionType_USE_BASEPLATES_getInstance(), 'Use 32\xD732 Baseplates Instead of 16\xD716 Frames', 'Uses ' + imul_0(baseCols, baseRows) + ' thin 3811 baseplate(s) instead of ' + imul_0(frameCols, frameRows) + ' Technic frames + pins \u2014 ideal if framing behind glass.', diff, 'Use Baseplates'));
    }
  }
  if (cfg.qe_1.equals(BuildStyle_ROUND_TILES_ART_getInstance()) || cfg.qe_1.equals(BuildStyle_ROUND_PLATES_STUDS_getInstance())) {
    var estSavings = pricing.ef_1 * 0.22;
    if (estSavings > 1.5) {
      suggestions.f(new CostSavingSuggestion('multi_plate', CostSuggestionActionType_SWITCH_MULTI_PLATE_getInstance(), 'Merge Studs with Smart Multi-Plate Mode', 'Combines solid color regions into 1\xD72, 2\xD72, 1\xD74, and 2\xD74 plates to cut total piece count and lower Pick a Brick & BrickLink lot costs.', estSavings, 'Use Multi-Plate'));
    }
  }
  if (!cfg.xe_1.equals(RarityPreference_COMMON_ONLY_getInstance()) && (pricing.mf_1 + pricing.nf_1 | 0) >= 12) {
    var estSavings_0 = coerceAtLeast_0(pricing.gf_1 + pricing.ef_1 * 0.08, 1.0);
    suggestions.f(new CostSavingSuggestion('common_only', CostSuggestionActionType_COMMON_RARITY_ONLY_getInstance(), 'Restrict Palette to Common Stocked Colors', 'Eliminates uncommon/rare color price multipliers and makes it easy to order every brick from 1\u20132 stores.', estSavings_0, 'Common Only'));
  }
  var tmp0_0 = result.je_1;
  var tmp$ret$9;
  $l$block_0: {
    // Inline function 'kotlin.collections.count' call
    var tmp_1;
    if (isInterface(tmp0_0, Collection)) {
      tmp_1 = tmp0_0.j();
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp$ret$9 = 0;
      break $l$block_0;
    }
    var count_0 = 0;
    var _iterator__ex2g4s_1 = tmp0_0.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      if (!element_1.kc_1.hc_1 && element_1.mc_1 <= 8) {
        count_0 = count_0 + 1 | 0;
        checkCountOverflow(count_0);
      }
    }
    tmp$ret$9 = count_0;
  }
  var smallLots = tmp$ret$9;
  if (cfg.ve_1 < 14.0 && smallLots >= 4) {
    var estShippingSavings = coerceIn(smallLots * 0.75, 2.5, 14.0);
    suggestions.f(new CostSavingSuggestion('consolidate_lots', CostSuggestionActionType_CONSOLIDATE_LOTS_getInstance(), 'Merge ' + smallLots + ' Tiny Color Lots (Save Shipping)', 'Raises \u0394E tolerance to 14 to fold rare 1\u20138 piece accent dots into neighboring colors, reducing BrickLink store splits and Pick a Brick service fees.', estShippingSavings, 'Consolidate Lots'));
  }
  var stepDownTarget = result.be_1 >= 80 && result.ce_1 >= 80 ? to(64, 64) : result.be_1 >= 64 && result.ce_1 >= 64 ? to(48, 48) : result.be_1 >= 48 && result.ce_1 >= 48 ? to(32, 32) : result.be_1 >= 32 && result.ce_1 >= 32 ? to(24, 24) : null;
  if (!(stepDownTarget == null)) {
    var tw = stepDownTarget.k8();
    var th = stepDownTarget.l8();
    var areaRatio = imul_0(tw, th) / imul_0(result.be_1, result.ce_1);
    var estSavings_1 = pricing.cf_1 * (1.0 - areaRatio);
    if (estSavings_1 > 5.0) {
      suggestions.f(new CostSavingSuggestion('step_down', CostSuggestionActionType_STEP_DOWN_SIZE_getInstance(), 'Resize Grid from ' + result.be_1 + '\xD7' + result.ce_1 + ' to ' + tw + '\xD7' + th, 'Cuts total stud count by ' + numberToInt((1.0 - areaRatio) * 100) + '% while keeping your artwork crisp and readable.', estSavings_1, 'Resize ' + tw + '\xD7' + th, tw, th));
    }
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp_2 = MarketplaceCartBuilder$generateCostSavingSuggestions$lambda;
  var tmp$ret$12 = new sam$kotlin_Comparator$0_0(tmp_2);
  return sortedWith(suggestions, tmp$ret$12);
};
var MarketplaceCartBuilder_instance;
function MarketplaceCartBuilder_getInstance() {
  return MarketplaceCartBuilder_instance;
}
function BrickMarketplace_LEGO_PICK_A_BRICK_getInstance() {
  static_init_1();
  return BrickMarketplace_LEGO_PICK_A_BRICK_instance;
}
function BrickMarketplace_BRICKLINK_getInstance() {
  static_init_1();
  return BrickMarketplace_BRICKLINK_instance;
}
function BrickMarketplace_BRICKOWL_getInstance() {
  static_init_1();
  return BrickMarketplace_BRICKOWL_instance;
}
function BrickMarketplace_REBRICKABLE_getInstance() {
  static_init_1();
  return BrickMarketplace_REBRICKABLE_instance;
}
function BrickMarketplace_WEBRICK_getInstance() {
  static_init_1();
  return BrickMarketplace_WEBRICK_instance;
}
function CostSuggestionActionType_SWAP_RARE_COLORS_getInstance() {
  static_init_2();
  return CostSuggestionActionType_SWAP_RARE_COLORS_instance;
}
function CostSuggestionActionType_SWITCH_MULTI_PLATE_getInstance() {
  static_init_2();
  return CostSuggestionActionType_SWITCH_MULTI_PLATE_instance;
}
function CostSuggestionActionType_COMMON_RARITY_ONLY_getInstance() {
  static_init_2();
  return CostSuggestionActionType_COMMON_RARITY_ONLY_instance;
}
function CostSuggestionActionType_USE_BASEPLATES_getInstance() {
  static_init_2();
  return CostSuggestionActionType_USE_BASEPLATES_instance;
}
function CostSuggestionActionType_CONSOLIDATE_LOTS_getInstance() {
  static_init_2();
  return CostSuggestionActionType_CONSOLIDATE_LOTS_instance;
}
function CostSuggestionActionType_STEP_DOWN_SIZE_getInstance() {
  static_init_2();
  return CostSuggestionActionType_STEP_DOWN_SIZE_instance;
}
function resolveCandidatePalette($this, config) {
  var basePreset = BrickCatalog_getInstance().tf(config.se_1);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = basePreset.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (!config.te_1.s(element.wc_1)) {
      destination.f(element);
    }
  }
  var filtered = destination;
  if (config.xe_1.equals(RarityPreference_COMMON_ONLY_getInstance())) {
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = filtered;
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_0 = tmp0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      if (element_0.zc_1.equals(AvailabilityTier_COMMON_getInstance())) {
        destination_0.f(element_0);
      }
    }
    filtered = destination_0;
  }
  if (config.ye_1) {
    var part = config.qe_1.zf_1;
    // Inline function 'kotlin.collections.filter' call
    var tmp0_0 = filtered;
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_1 = tmp0_0.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      if (BrickCatalog_getInstance().ag(part, element_1.wc_1)) {
        destination_1.f(element_1);
      }
    }
    var legalOnly = destination_1;
    if (legalOnly.l() >= 2) {
      filtered = legalOnly;
    }
  }
  return filtered.l() >= 2 ? filtered : listOf_0([BrickCatalog_getInstance().of_1.k(0), BrickCatalog_getInstance().of_1.k(1)]);
}
function sampleAndPreprocess($this, bitmap, targetW, targetH, config) {
  var srcW = bitmap.bg_1;
  var srcH = bitmap.cg_1;
  var tmp;
  if (config.qe_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
    tmp = targetW * 5.0 / (targetH * 6.0);
  } else {
    tmp = targetW / targetH;
  }
  var physicalAspect = tmp;
  var srcAspect = srcW / srcH;
  var cropW;
  var cropH;
  var cropX;
  var cropY;
  if (srcAspect > physicalAspect) {
    cropH = srcH;
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = srcH * physicalAspect;
    var tmp$ret$0 = roundToInt(this_0);
    cropW = coerceIn_0(tmp$ret$0, 1, srcW);
    cropX = (srcW - cropW | 0) / 2 | 0;
    cropY = 0;
  } else {
    cropW = srcW;
    // Inline function 'kotlin.math.roundToInt' call
    var this_1 = srcW / physicalAspect;
    var tmp$ret$1 = roundToInt(this_1);
    cropH = coerceIn_0(tmp$ret$1, 1, srcH);
    cropX = 0;
    cropY = (srcH - cropH | 0) / 2 | 0;
  }
  var pixels = new Int32Array(imul_0(cropW, cropH));
  bitmap.eg(pixels, 0, cropW, cropX, cropY, cropW, cropH);
  var out = new Float32Array(imul_0(imul_0(targetW, targetH), 3));
  var cellW = cropW / targetW;
  var cellH = cropH / targetH;
  var brightnessOffset = config.ze_1 * 255.0;
  var contrast = config.af_1;
  var saturation = config.bf_1;
  var inductionVariable = 0;
  if (inductionVariable < targetH)
    do {
      var ty = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var y0 = coerceIn_0(numberToInt(ty * cellH), 0, cropH - 1 | 0);
      var tmp0 = y0 + 1 | 0;
      // Inline function 'kotlin.math.max' call
      var b = numberToInt((ty + 1 | 0) * cellH);
      var tmp$ret$2 = Math.max(tmp0, b);
      var y1 = coerceAtMost(tmp$ret$2, cropH);
      var inductionVariable_0 = 0;
      if (inductionVariable_0 < targetW)
        do {
          var tx = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var x0 = coerceIn_0(numberToInt(tx * cellW), 0, cropW - 1 | 0);
          var tmp0_0 = x0 + 1 | 0;
          // Inline function 'kotlin.math.max' call
          var b_0 = numberToInt((tx + 1 | 0) * cellW);
          var tmp$ret$3 = Math.max(tmp0_0, b_0);
          var x1 = coerceAtMost(tmp$ret$3, cropW);
          var rSum = new Long(0, 0);
          var gSum = new Long(0, 0);
          var bSum = new Long(0, 0);
          var count = 0;
          // Inline function 'kotlin.math.max' call
          var b_1 = (y1 - y0 | 0) / 6 | 0;
          var stepY = Math.max(1, b_1);
          // Inline function 'kotlin.math.max' call
          var b_2 = (x1 - x0 | 0) / 6 | 0;
          var stepX = Math.max(1, b_2);
          var py = y0;
          while (py < y1) {
            var rowOff = imul_0(py, cropW);
            var px = x0;
            while (px < x1) {
              var pxColor = pixels[rowOff + px | 0];
              var tmp0_1 = rSum;
              // Inline function 'kotlin.Long.plus' call
              var other = Color_instance.fg(pxColor);
              rSum = add(tmp0_1, fromInt(other));
              var tmp0_2 = gSum;
              // Inline function 'kotlin.Long.plus' call
              var other_0 = Color_instance.gg(pxColor);
              gSum = add(tmp0_2, fromInt(other_0));
              var tmp0_3 = bSum;
              // Inline function 'kotlin.Long.plus' call
              var other_1 = Color_instance.hg(pxColor);
              bSum = add(tmp0_3, fromInt(other_1));
              count = count + 1 | 0;
              px = px + stepX | 0;
            }
            py = py + stepY | 0;
          }
          var tmp_0 = toNumber(rSum);
          // Inline function 'kotlin.math.max' call
          var b_3 = count;
          var r = tmp_0 / Math.max(1, b_3);
          var tmp_1 = toNumber(gSum);
          // Inline function 'kotlin.math.max' call
          var b_4 = count;
          var g = tmp_1 / Math.max(1, b_4);
          var tmp_2 = toNumber(bSum);
          // Inline function 'kotlin.math.max' call
          var b_5 = count;
          var b_6 = tmp_2 / Math.max(1, b_5);
          r = (r - 128.0) * contrast + 128.0 + brightnessOffset;
          g = (g - 128.0) * contrast + 128.0 + brightnessOffset;
          b_6 = (b_6 - 128.0) * contrast + 128.0 + brightnessOffset;
          var luma = 0.299 * r + 0.587 * g + 0.114 * b_6;
          r = coerceIn_1(luma + (r - luma) * saturation, 0.0, 255.0);
          g = coerceIn_1(luma + (g - luma) * saturation, 0.0, 255.0);
          b_6 = coerceIn_1(luma + (b_6 - luma) * saturation, 0.0, 255.0);
          var idx = imul_0(imul_0(ty, targetW) + tx | 0, 3);
          out[idx] = r;
          out[idx + 1 | 0] = g;
          out[idx + 2 | 0] = b_6;
        }
         while (inductionVariable_0 < targetW);
    }
     while (inductionVariable < targetH);
  return out;
}
function matchColorsToGrid($this, rgb, width, height, palette, config) {
  // Inline function 'kotlin.collections.copyOf' call
  // Inline function 'kotlin.js.asDynamic' call
  var work = rgb.slice();
  var result = new Int32Array(imul_0(width, height));
  var ditherStrength = config.we_1 ? 0.58 : 0.0;
  var inductionVariable = 0;
  if (inductionVariable < height)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var inductionVariable_0 = 0;
      if (inductionVariable_0 < width)
        do {
          var x = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var cellIdx = imul_0(y, width) + x | 0;
          var idx = imul_0(cellIdx, 3);
          // Inline function 'kotlin.math.roundToInt' call
          var this_0 = work[idx];
          var tmp$ret$2 = roundToInt(this_0);
          var r = coerceIn_0(tmp$ret$2, 0, 255);
          // Inline function 'kotlin.math.roundToInt' call
          var this_1 = work[idx + 1 | 0];
          var tmp$ret$3 = roundToInt(this_1);
          var g = coerceIn_0(tmp$ret$3, 0, 255);
          // Inline function 'kotlin.math.roundToInt' call
          var this_2 = work[idx + 2 | 0];
          var tmp$ret$4 = roundToInt(this_2);
          var b = coerceIn_0(tmp$ret$4, 0, 255);
          var lab = rgbToLab(r, g, b);
          var bestColor = findBestPaletteColor($this, lab[0], lab[1], lab[2], palette, config.xe_1);
          result[cellIdx] = bestColor.wc_1;
          if (ditherStrength > 0.0) {
            var errR = (r - bestColor.gd_1 | 0) * ditherStrength;
            var errG = (g - bestColor.hd_1 | 0) * ditherStrength;
            var errB = (b - bestColor.id_1 | 0) * ditherStrength;
            matchColorsToGrid$addError(width, height, work, errR, errG, errB, x + 1 | 0, y, 7.0 / 16.0);
            matchColorsToGrid$addError(width, height, work, errR, errG, errB, x - 1 | 0, y + 1 | 0, 3.0 / 16.0);
            matchColorsToGrid$addError(width, height, work, errR, errG, errB, x, y + 1 | 0, 5.0 / 16.0);
            matchColorsToGrid$addError(width, height, work, errR, errG, errB, x + 1 | 0, y + 1 | 0, 1.0 / 16.0);
          }
        }
         while (inductionVariable_0 < width);
    }
     while (inductionVariable < height);
  return result;
}
function findBestPaletteColor($this, labL, labA, labB, palette, rarityPreference) {
  var best = palette.k(0);
  var bestScore = 3.4028235E38;
  var _iterator__ex2g4s = palette.g();
  while (_iterator__ex2g4s.h()) {
    var candidate = _iterator__ex2g4s.i();
    var de = BrickCatalog_getInstance().ig(labL, labA, labB, candidate);
    var tmp;
    switch (rarityPreference.a1_1) {
      case 0:
        tmp = 0.0;
        break;
      case 1:
        var tmp_0;
        switch (candidate.zc_1.a1_1) {
          case 0:
            tmp_0 = 0.0;
            break;
          case 1:
            tmp_0 = 4.8;
            break;
          case 2:
            tmp_0 = 14.5;
            break;
          default:
            noWhenBranchMatchedException();
            break;
        }

        tmp = tmp_0;
        break;
      case 2:
        tmp = 0.0;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    var rarityPenalty = tmp;
    var score = de + rarityPenalty;
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return best;
}
function applyColorToleranceConsolidation($this, grid, width, height, tolerance, forcedSwaps) {
  // Inline function 'kotlin.collections.copyOf' call
  // Inline function 'kotlin.js.asDynamic' call
  var out = grid.slice();
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!forcedSwaps.j()) {
    var inductionVariable = 0;
    var last = out.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp0_safe_receiver = forcedSwaps.x(out[i]);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          out[i] = tmp0_safe_receiver;
        }
      }
       while (inductionVariable <= last);
  }
  if (tolerance <= 1.5)
    return out;
  // Inline function 'kotlin.collections.mutableMapOf' call
  var counts = LinkedHashMap_init_$Create$();
  var inductionVariable_0 = 0;
  var last_0 = out.length;
  while (inductionVariable_0 < last_0) {
    var cid = out[inductionVariable_0];
    inductionVariable_0 = inductionVariable_0 + 1 | 0;
    var tmp1_elvis_lhs = counts.x(cid);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + 1 | 0;
    counts.b2(cid, value);
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  var this_0 = counts.y();
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp = MosaicConverterEngine$applyColorToleranceConsolidation$lambda;
  var tmp$ret$8 = new sam$kotlin_Comparator$0_2(tmp);
  // Inline function 'kotlin.collections.map' call
  var this_1 = sortedWith(this_0, tmp$ret$8);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
  var _iterator__ex2g4s = this_1.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var tmp$ret$11 = item.u();
    destination.f(tmp$ret$11);
  }
  var sortedByDominance = destination;
  // Inline function 'kotlin.collections.mutableListOf' call
  var keptColors = ArrayList_init_$Create$();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var remap = LinkedHashMap_init_$Create$();
  var _iterator__ex2g4s_0 = sortedByDominance.g();
  $l$loop: while (_iterator__ex2g4s_0.h()) {
    var cid_0 = _iterator__ex2g4s_0.i();
    var tmp2_elvis_lhs = BrickCatalog_getInstance().pf_1.x(cid_0);
    var tmp_0;
    if (tmp2_elvis_lhs == null) {
      continue $l$loop;
    } else {
      tmp_0 = tmp2_elvis_lhs;
    }
    var brickColor = tmp_0;
    var tmp$ret$14;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s_1 = keptColors.g();
      while (_iterator__ex2g4s_1.h()) {
        var element = _iterator__ex2g4s_1.i();
        if (BrickCatalog_getInstance().jg(brickColor, element) <= tolerance) {
          tmp$ret$14 = element;
          break $l$block;
        }
      }
      tmp$ret$14 = null;
    }
    var closeDominant = tmp$ret$14;
    if (!(closeDominant == null)) {
      // Inline function 'kotlin.collections.set' call
      var value_0 = closeDominant.wc_1;
      remap.b2(cid_0, value_0);
    } else {
      keptColors.f(brickColor);
      // Inline function 'kotlin.collections.set' call
      remap.b2(cid_0, cid_0);
    }
  }
  var inductionVariable_1 = 0;
  var last_1 = out.length - 1 | 0;
  if (inductionVariable_1 <= last_1)
    do {
      var i_0 = inductionVariable_1;
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      var tmp3_safe_receiver = remap.x(out[i_0]);
      if (tmp3_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        out[i_0] = tmp3_safe_receiver;
      }
    }
     while (inductionVariable_1 <= last_1);
  return out;
}
function buildStructuralBacking($this, width, height, backingSystem) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var backingPieces = ArrayList_init_$Create$();
  // Inline function 'kotlin.collections.mutableListOf' call
  var pins = ArrayList_init_$Create$();
  var nextId = 1;
  switch (backingSystem.a1_1) {
    case 0:
      // Inline function 'kotlin.math.ceil' call

      var x = width / 16.0;
      var tmp$ret$2 = Math.ceil(x);
      var cols = coerceAtLeast(numberToInt(tmp$ret$2), 1);
      // Inline function 'kotlin.math.ceil' call

      var x_0 = height / 16.0;
      var tmp$ret$3 = Math.ceil(x_0);
      var rows = coerceAtLeast(numberToInt(tmp$ret$3), 1);
      var black = BrickCatalog_getInstance().qf_1;
      var framePart = BrickPartType_TECHNIC_FRAME_16X16_getInstance();
      var inductionVariable = 0;
      if (inductionVariable < rows)
        do {
          var mr = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < cols)
            do {
              var mc = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var x_1 = imul_0(mc, 16);
              var y = imul_0(mr, 16);
              // Inline function 'kotlin.math.min' call
              var b = width - x_1 | 0;
              var w = Math.min(16, b);
              // Inline function 'kotlin.math.min' call
              var b_0 = height - y | 0;
              var h = Math.min(16, b_0);
              var _unary__edvuaz = nextId;
              nextId = _unary__edvuaz + 1 | 0;
              backingPieces.f(new PlacedPiece(_unary__edvuaz, framePart, black, x_1, y, w, h, 0, mc, mr, AvailabilityTier_COMMON_getInstance(), true, framePart.ic_1, framePart.jc_1));
            }
             while (inductionVariable_0 < cols);
        }
         while (inductionVariable < rows);
      var inductionVariable_1 = 0;
      if (inductionVariable_1 < rows)
        do {
          var mr_0 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var inductionVariable_2 = 0;
          if (inductionVariable_2 < cols)
            do {
              var mc_0 = inductionVariable_2;
              inductionVariable_2 = inductionVariable_2 + 1 | 0;
              if ((mc_0 + 1 | 0) < cols) {
                var seamX = (mc_0 + 1 | 0) * 16.0;
                var yBase = imul_0(mr_0, 16);
                // Inline function 'kotlin.math.min' call
                var b_1 = height - yBase | 0;
                var segH = Math.min(16, b_1);
                if (segH >= 6) {
                  // Inline function 'kotlin.math.min' call
                  var b_2 = segH * 0.25;
                  var tmp$ret$7 = Math.min(4.0, b_2);
                  pins.f(new TechnicPinConnection(seamX, yBase + tmp$ret$7, false));
                  // Inline function 'kotlin.math.min' call
                  var b_3 = segH * 0.75;
                  var tmp$ret$8 = Math.min(12.0, b_3);
                  pins.f(new TechnicPinConnection(seamX, yBase + tmp$ret$8, false));
                } else {
                  pins.f(new TechnicPinConnection(seamX, yBase + segH * 0.5, false));
                }
              }
              if ((mr_0 + 1 | 0) < rows) {
                var seamY = (mr_0 + 1 | 0) * 16.0;
                var xBase = imul_0(mc_0, 16);
                // Inline function 'kotlin.math.min' call
                var b_4 = width - xBase | 0;
                var segW = Math.min(16, b_4);
                if (segW >= 6) {
                  // Inline function 'kotlin.math.min' call
                  var b_5 = segW * 0.25;
                  var tmp$ret$10 = Math.min(4.0, b_5);
                  pins.f(new TechnicPinConnection(xBase + tmp$ret$10, seamY, true));
                  // Inline function 'kotlin.math.min' call
                  var b_6 = segW * 0.75;
                  var tmp$ret$11 = Math.min(12.0, b_6);
                  pins.f(new TechnicPinConnection(xBase + tmp$ret$11, seamY, true));
                } else {
                  pins.f(new TechnicPinConnection(xBase + segW * 0.5, seamY, true));
                }
              }
            }
             while (inductionVariable_2 < cols);
        }
         while (inductionVariable_1 < rows);
      break;
    case 1:
      // Inline function 'kotlin.math.ceil' call

      var x_2 = width / 32.0;
      var tmp$ret$12 = Math.ceil(x_2);
      var cols_0 = coerceAtLeast(numberToInt(tmp$ret$12), 1);
      // Inline function 'kotlin.math.ceil' call

      var x_3 = height / 32.0;
      var tmp$ret$13 = Math.ceil(x_3);
      var rows_0 = coerceAtLeast(numberToInt(tmp$ret$13), 1);
      var black_0 = BrickCatalog_getInstance().qf_1;
      var basePart = BrickPartType_BASEPLATE_32X32_getInstance();
      var inductionVariable_3 = 0;
      if (inductionVariable_3 < rows_0)
        do {
          var mr_1 = inductionVariable_3;
          inductionVariable_3 = inductionVariable_3 + 1 | 0;
          var inductionVariable_4 = 0;
          if (inductionVariable_4 < cols_0)
            do {
              var mc_1 = inductionVariable_4;
              inductionVariable_4 = inductionVariable_4 + 1 | 0;
              var x_4 = imul_0(mc_1, 32);
              var y_0 = imul_0(mr_1, 32);
              var _unary__edvuaz_0 = nextId;
              nextId = _unary__edvuaz_0 + 1 | 0;
              // Inline function 'kotlin.math.min' call
              var b_7 = width - x_4 | 0;
              var tmp = Math.min(32, b_7);
              // Inline function 'kotlin.math.min' call
              var b_8 = height - y_0 | 0;
              var tmp$ret$15 = Math.min(32, b_8);
              backingPieces.f(new PlacedPiece(_unary__edvuaz_0, basePart, black_0, x_4, y_0, tmp, tmp$ret$15, 0, mc_1, mr_1, AvailabilityTier_COMMON_getInstance(), true, basePart.ic_1, basePart.jc_1));
            }
             while (inductionVariable_4 < cols_0);
        }
         while (inductionVariable_3 < rows_0);
      break;
    case 2:
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return to(backingPieces, pins);
}
function packSurfacePieces($this, grid, width, height, config, startId) {
  var nextId = startId;
  // Inline function 'kotlin.collections.mutableListOf' call
  var pieces = ArrayList_init_$Create$();
  switch (config.qe_1.a1_1) {
    case 0:
    case 1:
      var desiredPart = config.qe_1.zf_1;
      var inductionVariable = 0;
      if (inductionVariable < height)
        do {
          var y = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var inductionVariable_0 = 0;
          if (inductionVariable_0 < width)
            do {
              var x = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var colorId = grid[imul_0(y, width) + x | 0];
              var tmp1_elvis_lhs = BrickCatalog_getInstance().pf_1.x(colorId);
              var color = tmp1_elvis_lhs == null ? BrickCatalog_getInstance().qf_1 : tmp1_elvis_lhs;
              var legal = BrickCatalog_getInstance().ag(desiredPart, color.wc_1);
              var tmp;
              if (!legal && config.ye_1 && BrickCatalog_getInstance().ag(BrickPartType_ROUND_PLATE_1X1_getInstance(), color.wc_1)) {
                tmp = BrickPartType_ROUND_PLATE_1X1_getInstance();
              } else {
                tmp = desiredPart;
              }
              var actualPart = tmp;
              var isActualLegal = BrickCatalog_getInstance().ag(actualPart, color.wc_1);
              var _unary__edvuaz = nextId;
              nextId = _unary__edvuaz + 1 | 0;
              pieces.f(new PlacedPiece(_unary__edvuaz, actualPart, color, x, y, 1, 1, 1, x / 16 | 0, y / 16 | 0, BrickCatalog_getInstance().kg(actualPart, color), isActualLegal, BrickCatalog_getInstance().lg(actualPart, color), BrickCatalog_getInstance().mg(actualPart, color)));
            }
             while (inductionVariable_0 < width);
        }
         while (inductionVariable < height);
      break;
    case 2:
      var used = booleanArray(imul_0(width, height));
      var respectModuleSeams = config.ye_1 && config.re_1.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance());
      var candidates = listOf_0([new Triple(BrickPartType_PLATE_2X4_getInstance(), 4, 2), new Triple(BrickPartType_PLATE_2X4_getInstance(), 2, 4), new Triple(BrickPartType_PLATE_1X4_getInstance(), 4, 1), new Triple(BrickPartType_PLATE_1X4_getInstance(), 1, 4), new Triple(BrickPartType_PLATE_2X2_getInstance(), 2, 2), new Triple(BrickPartType_PLATE_1X2_getInstance(), 2, 1), new Triple(BrickPartType_PLATE_1X2_getInstance(), 1, 2), new Triple(BrickPartType_PLATE_1X1_getInstance(), 1, 1)]);
      var inductionVariable_1 = 0;
      if (inductionVariable_1 < height)
        do {
          var y_0 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var inductionVariable_2 = 0;
          if (inductionVariable_2 < width)
            $l$loop: do {
              var x_0 = inductionVariable_2;
              inductionVariable_2 = inductionVariable_2 + 1 | 0;
              if (used[imul_0(y_0, width) + x_0 | 0])
                continue $l$loop;
              var colorId_0 = grid[imul_0(y_0, width) + x_0 | 0];
              var tmp2_elvis_lhs = BrickCatalog_getInstance().pf_1.x(colorId_0);
              var color_0 = tmp2_elvis_lhs == null ? BrickCatalog_getInstance().qf_1 : tmp2_elvis_lhs;
              var placed = false;
              var _iterator__ex2g4s = candidates.g();
              $l$loop_3: while (_iterator__ex2g4s.h()) {
                var _destruct__k2r9zo = _iterator__ex2g4s.i();
                var part = _destruct__k2r9zo.k8();
                var pw = _destruct__k2r9zo.l8();
                var ph = _destruct__k2r9zo.bb();
                if ((x_0 + pw | 0) > width || (y_0 + ph | 0) > height)
                  continue $l$loop_3;
                if (respectModuleSeams) {
                  var startCol = x_0 / 16 | 0;
                  var endCol = ((x_0 + pw | 0) - 1 | 0) / 16 | 0;
                  var startRow = y_0 / 16 | 0;
                  var endRow = ((y_0 + ph | 0) - 1 | 0) / 16 | 0;
                  if (!(startCol === endCol) || !(startRow === endRow))
                    continue $l$loop_3;
                }
                if (imul_0(pw, ph) > 1 && config.ye_1 && !BrickCatalog_getInstance().ag(part, color_0.wc_1)) {
                  continue $l$loop_3;
                }
                var match = true;
                var inductionVariable_3 = 0;
                if (inductionVariable_3 < ph)
                  outer: do {
                    var dy = inductionVariable_3;
                    inductionVariable_3 = inductionVariable_3 + 1 | 0;
                    var inductionVariable_4 = 0;
                    if (inductionVariable_4 < pw)
                      do {
                        var dx = inductionVariable_4;
                        inductionVariable_4 = inductionVariable_4 + 1 | 0;
                        var idx = imul_0(y_0 + dy | 0, width) + (x_0 + dx | 0) | 0;
                        if (used[idx] || !(grid[idx] === colorId_0)) {
                          match = false;
                          break outer;
                        }
                      }
                       while (inductionVariable_4 < pw);
                  }
                   while (inductionVariable_3 < ph);
                if (match) {
                  var inductionVariable_5 = 0;
                  if (inductionVariable_5 < ph)
                    do {
                      var dy_0 = inductionVariable_5;
                      inductionVariable_5 = inductionVariable_5 + 1 | 0;
                      var inductionVariable_6 = 0;
                      if (inductionVariable_6 < pw)
                        do {
                          var dx_0 = inductionVariable_6;
                          inductionVariable_6 = inductionVariable_6 + 1 | 0;
                          used[imul_0(y_0 + dy_0 | 0, width) + (x_0 + dx_0 | 0) | 0] = true;
                        }
                         while (inductionVariable_6 < pw);
                    }
                     while (inductionVariable_5 < ph);
                  var legal_0 = BrickCatalog_getInstance().ag(part, color_0.wc_1);
                  var _unary__edvuaz_0 = nextId;
                  nextId = _unary__edvuaz_0 + 1 | 0;
                  pieces.f(new PlacedPiece(_unary__edvuaz_0, part, color_0, x_0, y_0, pw, ph, 1, x_0 / 16 | 0, y_0 / 16 | 0, BrickCatalog_getInstance().kg(part, color_0), legal_0, BrickCatalog_getInstance().lg(part, color_0), BrickCatalog_getInstance().mg(part, color_0)));
                  placed = true;
                  break $l$loop_3;
                }
              }
              if (!placed) {
                used[imul_0(y_0, width) + x_0 | 0] = true;
                var part_0 = BrickPartType_PLATE_1X1_getInstance();
                var _unary__edvuaz_1 = nextId;
                nextId = _unary__edvuaz_1 + 1 | 0;
                pieces.f(new PlacedPiece(_unary__edvuaz_1, part_0, color_0, x_0, y_0, 1, 1, 1, x_0 / 16 | 0, y_0 / 16 | 0, BrickCatalog_getInstance().kg(part_0, color_0), BrickCatalog_getInstance().ag(part_0, color_0.wc_1), BrickCatalog_getInstance().lg(part_0, color_0), BrickCatalog_getInstance().mg(part_0, color_0)));
              }
            }
             while (inductionVariable_2 < width);
        }
         while (inductionVariable_1 < height);
      break;
    case 3:
      var prevRowSeams = emptySet();
      var inductionVariable_7 = height - 1 | 0;
      if (0 <= inductionVariable_7)
        do {
          var y_1 = inductionVariable_7;
          inductionVariable_7 = inductionVariable_7 + -1 | 0;
          // Inline function 'kotlin.collections.mutableSetOf' call
          var currentSeams = LinkedHashSet_init_$Create$();
          var x_1 = 0;
          while (x_1 < width) {
            var colorId_1 = grid[imul_0(y_1, width) + x_1 | 0];
            var tmp3_elvis_lhs = BrickCatalog_getInstance().pf_1.x(colorId_1);
            var color_1 = tmp3_elvis_lhs == null ? BrickCatalog_getInstance().qf_1 : tmp3_elvis_lhs;
            var maxRun = 1;
            while (maxRun < 4 && (x_1 + maxRun | 0) < width && grid[(imul_0(y_1, width) + x_1 | 0) + maxRun | 0] === colorId_1) {
              maxRun = maxRun + 1 | 0;
            }
            // Inline function 'kotlin.collections.filter' call
            var tmp0 = downTo(maxRun, 1);
            // Inline function 'kotlin.collections.filterTo' call
            var destination = ArrayList_init_$Create$();
            var inductionVariable_8 = tmp0.pa_1;
            var last = tmp0.qa_1;
            var step = tmp0.ra_1;
            if (step > 0 && inductionVariable_8 <= last || (step < 0 && last <= inductionVariable_8))
              do {
                var element = inductionVariable_8;
                inductionVariable_8 = inductionVariable_8 + step | 0;
                var len = element;
                var part_1 = brickPartForLength(MosaicConverterEngine_instance, len);
                if (len === 1 || !config.ye_1 || BrickCatalog_getInstance().ag(part_1, color_1.wc_1)) {
                  destination.f(element);
                }
              }
               while (!(element === last));
            var candidateLengths = destination;
            var tmp_0;
            if (config.ye_1 && y_1 < (height - 1 | 0)) {
              var tmp$ret$5;
              $l$block: {
                // Inline function 'kotlin.collections.firstOrNull' call
                var _iterator__ex2g4s_0 = candidateLengths.g();
                while (_iterator__ex2g4s_0.h()) {
                  var element_0 = _iterator__ex2g4s_0.i();
                  var endX = x_1 + element_0 | 0;
                  if (endX === width || !prevRowSeams.s(endX)) {
                    tmp$ret$5 = element_0;
                    break $l$block;
                  }
                }
                tmp$ret$5 = null;
              }
              var tmp4_elvis_lhs = tmp$ret$5;
              tmp_0 = tmp4_elvis_lhs == null ? first(candidateLengths) : tmp4_elvis_lhs;
            } else {
              tmp_0 = first(candidateLengths);
            }
            var chosenLen = tmp_0;
            var part_2 = brickPartForLength($this, chosenLen);
            var _unary__edvuaz_2 = nextId;
            nextId = _unary__edvuaz_2 + 1 | 0;
            pieces.f(new PlacedPiece(_unary__edvuaz_2, part_2, color_1, x_1, y_1, chosenLen, 1, 1, x_1 / 16 | 0, y_1 / 16 | 0, BrickCatalog_getInstance().kg(part_2, color_1), BrickCatalog_getInstance().ag(part_2, color_1.wc_1), BrickCatalog_getInstance().lg(part_2, color_1), BrickCatalog_getInstance().mg(part_2, color_1)));
            x_1 = x_1 + chosenLen | 0;
            if (x_1 < width) {
              currentSeams.f(x_1);
            }
          }
          prevRowSeams = currentSeams;
        }
         while (0 <= inductionVariable_7);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return pieces;
}
function brickPartForLength($this, len) {
  switch (len) {
    case 4:
      return BrickPartType_BRICK_1X4_getInstance();
    case 3:
      return BrickPartType_BRICK_1X3_getInstance();
    case 2:
      return BrickPartType_BRICK_1X2_getInstance();
    default:
      return BrickPartType_BRICK_1X1_getInstance();
  }
}
function buildBomAndPricing($this, surfacePieces, backingPieces, technicPins, width, height, colorNumberMap, config) {
  // Inline function 'kotlin.collections.mutableMapOf' call
  var grouped = LinkedHashMap_init_$Create$();
  var _iterator__ex2g4s = surfacePieces.g();
  while (_iterator__ex2g4s.h()) {
    var p = _iterator__ex2g4s.i();
    var key = to(p.og_1, p.pg_1);
    var tmp0_elvis_lhs = grouped.x(key);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
    grouped.b2(key, value);
  }
  var _iterator__ex2g4s_0 = backingPieces.g();
  while (_iterator__ex2g4s_0.h()) {
    var b = _iterator__ex2g4s_0.i();
    var key_0 = to(b.og_1, b.pg_1);
    var tmp1_elvis_lhs = grouped.x(key_0);
    // Inline function 'kotlin.collections.set' call
    var value_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + 1 | 0;
    grouped.b2(key_0, value_0);
  }
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!technicPins.j()) {
    var key_1 = to(BrickPartType_TECHNIC_PIN_getInstance(), BrickCatalog_getInstance().qf_1);
    var tmp2_elvis_lhs = grouped.x(key_1);
    // Inline function 'kotlin.collections.set' call
    var value_1 = (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) + technicPins.l() | 0;
    grouped.b2(key_1, value_1);
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = grouped.y();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s_1 = this_0.g();
  while (_iterator__ex2g4s_1.h()) {
    var item = _iterator__ex2g4s_1.i();
    // Inline function 'kotlin.collections.component1' call
    var key_2 = item.u();
    // Inline function 'kotlin.collections.component2' call
    var qty = item.v();
    var part = key_2.k8();
    var color = key_2.l8();
    var pabUnit = BrickCatalog_getInstance().lg(part, color);
    var blUnit = BrickCatalog_getInstance().mg(part, color);
    var rarity = BrickCatalog_getInstance().kg(part, color);
    var legal = BrickCatalog_getInstance().ag(part, color.wc_1);
    var tmp;
    if (!part.hc_1 && (!rarity.equals(AvailabilityTier_COMMON_getInstance()) || !legal)) {
      tmp = BrickCatalog_getInstance().bh(color, part);
    } else {
      tmp = null;
    }
    var altColor = tmp;
    var tmp_0;
    if (altColor == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = BrickCatalog_getInstance().lg(part, altColor);
    }
    var tmp1_elvis_lhs_0 = tmp_0;
    var altUnit = tmp1_elvis_lhs_0 == null ? pabUnit : tmp1_elvis_lhs_0;
    // Inline function 'kotlin.math.max' call
    var b_0 = (pabUnit - altUnit) * qty;
    var savings = Math.max(0.0, b_0);
    var tmp_1 = pabUnit * qty;
    var tmp_2 = blUnit * qty;
    var tmp_3;
    if (part.hc_1) {
      tmp_3 = 0;
    } else {
      var tmp2_elvis_lhs_0 = colorNumberMap.x(color.wc_1);
      tmp_3 = tmp2_elvis_lhs_0 == null ? 0 : tmp2_elvis_lhs_0;
    }
    var tmp$ret$7 = new PartBomLine(part, color, qty, rarity, legal, pabUnit, blUnit, tmp_1, tmp_2, tmp_3, altColor, savings);
    destination.f(tmp$ret$7);
  }
  var tmp_4 = destination;
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_5 = MosaicConverterEngine$buildBomAndPricing$lambda;
  // Inline function 'kotlin.comparisons.thenByDescending' call
  var this_1 = new sam$kotlin_Comparator$0_3(tmp_5);
  var tmp_6 = MosaicConverterEngine$buildBomAndPricing$lambda_0(this_1);
  var tmp$ret$14 = new sam$kotlin_Comparator$0_3(tmp_6);
  var bomLines = sortedWith(tmp_4, tmp$ret$14);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_2 = bomLines.g();
  while (_iterator__ex2g4s_2.h()) {
    var element = _iterator__ex2g4s_2.i();
    if (!element.kc_1.hc_1) {
      destination_0.f(element);
    }
  }
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s_3 = destination_0.g();
  while (_iterator__ex2g4s_3.h()) {
    var element_0 = _iterator__ex2g4s_3.i();
    var tmp_7 = sum;
    sum = tmp_7 + element_0.rc_1;
  }
  var surfacePab = sum;
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_1 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_4 = bomLines.g();
  while (_iterator__ex2g4s_4.h()) {
    var element_1 = _iterator__ex2g4s_4.i();
    if (element_1.kc_1.hc_1) {
      destination_1.f(element_1);
    }
  }
  // Inline function 'kotlin.collections.sumOf' call
  var sum_0 = 0;
  var _iterator__ex2g4s_5 = destination_1.g();
  while (_iterator__ex2g4s_5.h()) {
    var element_2 = _iterator__ex2g4s_5.i();
    var tmp_8 = sum_0;
    sum_0 = tmp_8 + element_2.rc_1;
  }
  var structuralPab = sum_0;
  var totalPab = surfacePab + structuralPab;
  // Inline function 'kotlin.collections.sumOf' call
  var sum_1 = 0;
  var _iterator__ex2g4s_6 = bomLines.g();
  while (_iterator__ex2g4s_6.h()) {
    var element_3 = _iterator__ex2g4s_6.i();
    var tmp_9 = sum_1;
    sum_1 = tmp_9 + element_3.sc_1;
  }
  var totalBl = sum_1;
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_2 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_7 = bomLines.g();
  while (_iterator__ex2g4s_7.h()) {
    var element_4 = _iterator__ex2g4s_7.i();
    if (!element_4.kc_1.hc_1 && element_4.nc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
      destination_2.f(element_4);
    }
  }
  // Inline function 'kotlin.collections.sumOf' call
  var sum_2 = 0;
  var _iterator__ex2g4s_8 = destination_2.g();
  while (_iterator__ex2g4s_8.h()) {
    var element_5 = _iterator__ex2g4s_8.i();
    var tmp_10 = sum_2;
    sum_2 = tmp_10 + element_5.vc_1;
  }
  var rarePremium = sum_2;
  var tmp_11;
  if (config.qe_1.equals(BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance())) {
    // Inline function 'kotlin.collections.sumOf' call
    var sum_3 = 0;
    var _iterator__ex2g4s_9 = surfacePieces.g();
    while (_iterator__ex2g4s_9.h()) {
      var element_6 = _iterator__ex2g4s_9.i();
      var tmp_12 = sum_3;
      var studCount = imul_0(element_6.sg_1, element_6.tg_1);
      sum_3 = tmp_12 + BrickCatalog_getInstance().lg(BrickPartType_PLATE_1X1_getInstance(), element_6.pg_1) * studCount;
    }
    var singleStudEquivalent = sum_3;
    // Inline function 'kotlin.math.max' call
    var b_1 = singleStudEquivalent - surfacePab;
    tmp_11 = Math.max(0.0, b_1);
  } else {
    tmp_11 = 0.0;
  }
  var multiPlateSavings = tmp_11;
  // Inline function 'kotlin.math.max' call
  var b_2 = surfacePieces.l();
  var totalSurfaceQty = Math.max(1, b_2);
  var tmp$ret$36;
  $l$block: {
    // Inline function 'kotlin.collections.count' call
    var tmp_13;
    if (isInterface(surfacePieces, Collection)) {
      tmp_13 = surfacePieces.j();
    } else {
      tmp_13 = false;
    }
    if (tmp_13) {
      tmp$ret$36 = 0;
      break $l$block;
    }
    var count = 0;
    var _iterator__ex2g4s_10 = surfacePieces.g();
    while (_iterator__ex2g4s_10.h()) {
      var element_7 = _iterator__ex2g4s_10.i();
      if (element_7.xg_1.equals(AvailabilityTier_COMMON_getInstance())) {
        count = count + 1 | 0;
        checkCountOverflow(count);
      }
    }
    tmp$ret$36 = count;
  }
  var commonCount = tmp$ret$36;
  var tmp$ret$38;
  $l$block_0: {
    // Inline function 'kotlin.collections.count' call
    var tmp_14;
    if (isInterface(surfacePieces, Collection)) {
      tmp_14 = surfacePieces.j();
    } else {
      tmp_14 = false;
    }
    if (tmp_14) {
      tmp$ret$38 = 0;
      break $l$block_0;
    }
    var count_0 = 0;
    var _iterator__ex2g4s_11 = surfacePieces.g();
    while (_iterator__ex2g4s_11.h()) {
      var element_8 = _iterator__ex2g4s_11.i();
      if (element_8.xg_1.equals(AvailabilityTier_UNCOMMON_getInstance())) {
        count_0 = count_0 + 1 | 0;
        checkCountOverflow(count_0);
      }
    }
    tmp$ret$38 = count_0;
  }
  var uncommonCount = tmp$ret$38;
  var tmp$ret$40;
  $l$block_1: {
    // Inline function 'kotlin.collections.count' call
    var tmp_15;
    if (isInterface(surfacePieces, Collection)) {
      tmp_15 = surfacePieces.j();
    } else {
      tmp_15 = false;
    }
    if (tmp_15) {
      tmp$ret$40 = 0;
      break $l$block_1;
    }
    var count_1 = 0;
    var _iterator__ex2g4s_12 = surfacePieces.g();
    while (_iterator__ex2g4s_12.h()) {
      var element_9 = _iterator__ex2g4s_12.i();
      if (element_9.xg_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
        count_1 = count_1 + 1 | 0;
        checkCountOverflow(count_1);
      }
    }
    tmp$ret$40 = count_1;
  }
  var rareCount = tmp$ret$40;
  var commonPct = roundToInt(commonCount * 100.0 / totalSurfaceQty);
  var rarePct = roundToInt(rareCount * 100.0 / totalSurfaceQty);
  var uncommonPct = coerceAtLeast((100 - commonPct | 0) - rarePct | 0, 0);
  // Inline function 'kotlin.math.max' call
  var b_3 = imul_0(width, height);
  var tmp$ret$42 = Math.max(1, b_3);
  var pricing = new PricingSummary(totalPab, totalBl, surfacePab, structuralPab, rarePremium, multiPlateSavings, totalPab / tmp$ret$42, (surfacePieces.l() + backingPieces.l() | 0) + technicPins.l() | 0, bomLines.l(), commonPct, uncommonPct, rarePct);
  return to(bomLines, pricing);
}
function validateMosaic($this, width, height, surfacePieces, backingPieces, technicPins, bomLines, effectiveBacking, config) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var checks = ArrayList_init_$Create$();
  // Inline function 'kotlin.math.ceil' call
  var x = width / 16.0;
  var tmp$ret$1 = Math.ceil(x);
  var moduleCols = coerceAtLeast(numberToInt(tmp$ret$1), 1);
  // Inline function 'kotlin.math.ceil' call
  var x_0 = height / 16.0;
  var tmp$ret$2 = Math.ceil(x_0);
  var moduleRows = coerceAtLeast(numberToInt(tmp$ret$2), 1);
  var coveredGrid = booleanArray(imul_0(width, height));
  var overlapCount = 0;
  var _iterator__ex2g4s = surfacePieces.g();
  while (_iterator__ex2g4s.h()) {
    var p = _iterator__ex2g4s.i();
    var inductionVariable = 0;
    var last = p.tg_1;
    if (inductionVariable < last)
      do {
        var dy = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        var last_0 = p.sg_1;
        if (inductionVariable_0 < last_0)
          do {
            var dx = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var idx = imul_0(p.rg_1 + dy | 0, width) + (p.qg_1 + dx | 0) | 0;
            if (0 <= idx ? idx <= (coveredGrid.length - 1 | 0) : false) {
              if (coveredGrid[idx]) {
                overlapCount = overlapCount + 1 | 0;
              }
              coveredGrid[idx] = true;
            }
          }
           while (inductionVariable_0 < last_0);
      }
       while (inductionVariable < last);
  }
  // Inline function 'kotlin.collections.count' call
  var count = 0;
  var inductionVariable_1 = 0;
  var last_1 = coveredGrid.length;
  while (inductionVariable_1 < last_1) {
    var element = coveredGrid[inductionVariable_1];
    inductionVariable_1 = inductionVariable_1 + 1 | 0;
    if (!element) {
      count = count + 1 | 0;
    }
  }
  var missingSupport = count;
  var tmp = missingSupport === 0 ? ValidationSeverity_PASS_getInstance() : ValidationSeverity_ERROR_getInstance();
  var tmp_0 = ValidationCategory_FOUNDATION_getInstance();
  var tmp_1 = missingSupport === 0 ? '100% Stud Foundation Verified' : '' + missingSupport + ' Unanchored Studs';
  var tmp_2;
  switch (effectiveBacking.a1_1) {
    case 0:
      tmp_2 = 'All ' + imul_0(width, height) + ' studs seat directly onto ' + backingPieces.l() + ' \xD7 65803 (16\xD716) Technic frames with zero floating parts.';
      break;
    case 1:
      tmp_2 = 'All ' + imul_0(width, height) + ' studs seat cleanly onto ' + backingPieces.l() + ' \xD7 3811 (32\xD732) baseplates.';
      break;
    case 2:
      tmp_2 = 'All ' + height + ' vertical brick courses rest on full bottom-up stud support.';
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  checks.f(new ValidationIssue('foundation_check', tmp, tmp_0, tmp_1, tmp_2, missingSupport));
  var tmp_3;
  if (effectiveBacking.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance())) {
    tmp_3 = imul_0(moduleCols - 1 | 0, moduleRows) + imul_0(moduleRows - 1 | 0, moduleCols) | 0;
  } else {
    tmp_3 = 0;
  }
  var expectedSeamEdges = tmp_3;
  if (effectiveBacking.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance())) {
    var tmp_4;
    if (expectedSeamEdges === 0) {
      tmp_4 = 'Single 16\xD716 panel \u2014 no inter-frame Technic pins required.';
    } else {
      tmp_4 = '' + technicPins.l() + ' \xD7 Part 2780 Technic pins aligned legally to pinhole spacing (studs +4 & +12) across ' + expectedSeamEdges + ' panel seams.';
    }
    var pinMsg = tmp_4;
    checks.f(new ValidationIssue('technic_pin_check', ValidationSeverity_PASS_getInstance(), ValidationCategory_TECHNIC_JOINTS_getInstance(), expectedSeamEdges === 0 ? 'Single Frame Module' : 'Legal Technic Pin Matrix (' + technicPins.l() + '\xD7 2780)', pinMsg, technicPins.l()));
  }
  var weakSeamColumns = 0;
  if (config.qe_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
    var tmp_5 = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_6 = Array(height);
    while (tmp_5 < height) {
      // Inline function 'kotlin.collections.mutableSetOf' call
      tmp_6[tmp_5] = LinkedHashSet_init_$Create$();
      tmp_5 = tmp_5 + 1 | 0;
    }
    var rowSeams = tmp_6;
    var _iterator__ex2g4s_0 = surfacePieces.g();
    while (_iterator__ex2g4s_0.h()) {
      var p_0 = _iterator__ex2g4s_0.i();
      var endX = p_0.qg_1 + p_0.sg_1 | 0;
      if (endX < width) {
        rowSeams[p_0.rg_1].f(endX);
      }
    }
    var inductionVariable_2 = 1;
    if (inductionVariable_2 < width)
      do {
        var col = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        var streak = 0;
        var maxStreak = 0;
        var inductionVariable_3 = 0;
        if (inductionVariable_3 < height)
          do {
            var r = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            if (rowSeams[r].s(col)) {
              streak = streak + 1 | 0;
              if (streak > maxStreak)
                maxStreak = streak;
            } else {
              streak = 0;
            }
          }
           while (inductionVariable_3 < height);
        if (maxStreak >= 4) {
          weakSeamColumns = weakSeamColumns + 1 | 0;
        }
      }
       while (inductionVariable_2 < width);
    var tmp_7 = weakSeamColumns === 0 ? ValidationSeverity_PASS_getInstance() : ValidationSeverity_WARNING_getInstance();
    var tmp_8 = ValidationCategory_SEAM_STAGGER_getInstance();
    var tmp_9 = weakSeamColumns === 0 ? 'Running-Bond Interlock Verified' : '' + weakSeamColumns + ' Vertical Shear Seams';
    var tmp_10;
    if (weakSeamColumns === 0) {
      tmp_10 = 'Brick courses stagger seams cleanly across all ' + height + ' rows with no weak vertical fault lines.';
    } else {
      tmp_10 = '' + weakSeamColumns + ' color boundaries create vertical seams 4+ rows tall. Enable Legal Enforcement or increase Color Tolerance to bridge seams.';
    }
    checks.f(new ValidationIssue('seam_stagger_check', tmp_7, tmp_8, tmp_9, tmp_10, weakSeamColumns, weakSeamColumns > 0 && !config.ye_1, 'Enforce Seam Stagger'));
  } else if (config.qe_1.equals(BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance()) && effectiveBacking.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance())) {
    var tmp$ret$8;
    $l$block: {
      // Inline function 'kotlin.collections.count' call
      var tmp_11;
      if (isInterface(surfacePieces, Collection)) {
        tmp_11 = surfacePieces.j();
      } else {
        tmp_11 = false;
      }
      if (tmp_11) {
        tmp$ret$8 = 0;
        break $l$block;
      }
      var count_0 = 0;
      var _iterator__ex2g4s_1 = surfacePieces.g();
      while (_iterator__ex2g4s_1.h()) {
        var element_0 = _iterator__ex2g4s_1.i();
        if (!((element_0.qg_1 / 16 | 0) === (((element_0.qg_1 + element_0.sg_1 | 0) - 1 | 0) / 16 | 0)) || !((element_0.rg_1 / 16 | 0) === (((element_0.rg_1 + element_0.tg_1 | 0) - 1 | 0) / 16 | 0))) {
          count_0 = count_0 + 1 | 0;
          checkCountOverflow(count_0);
        }
      }
      tmp$ret$8 = count_0;
    }
    var straddlingPlates = tmp$ret$8;
    weakSeamColumns = straddlingPlates;
    var tmp_12 = straddlingPlates === 0 ? ValidationSeverity_PASS_getInstance() : ValidationSeverity_WARNING_getInstance();
    var tmp_13 = ValidationCategory_SEAM_STAGGER_getInstance();
    var tmp_14 = straddlingPlates === 0 ? 'Modular Panel Seams Respected' : '' + straddlingPlates + ' Plates Cross Frame Seams';
    var tmp_15;
    if (straddlingPlates === 0) {
      tmp_15 = 'Merged plates stay cleanly inside 16\xD716 Technic frame panels for easy modular assembly and wall mounting.';
    } else {
      tmp_15 = '' + straddlingPlates + ' plates bridge across 16\xD716 frame boundaries, preventing modular panel disassembly.';
    }
    checks.f(new ValidationIssue('module_seam_check', tmp_12, tmp_13, tmp_14, tmp_15, straddlingPlates, straddlingPlates > 0, 'Split at Frame Seams'));
  }
  checks.f(new ValidationIssue('collision_check', overlapCount === 0 ? ValidationSeverity_PASS_getInstance() : ValidationSeverity_ERROR_getInstance(), ValidationCategory_COLLISION_TOLERANCE_getInstance(), overlapCount === 0 ? 'Zero Collisions & Legal Stud Pitch' : '' + overlapCount + ' Overlapping Elements', 'All parts obey strict 8.0mm stud pitch and 3.2mm plate / 9.6mm brick geometry with zero illegal plate-between-stud stress.', overlapCount));
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s_2 = surfacePieces.g();
  while (_iterator__ex2g4s_2.h()) {
    var element_1 = _iterator__ex2g4s_2.i();
    if (!element_1.yg_1) {
      destination.f(element_1);
    }
  }
  var illegalPieces = destination;
  var tmp_16 = illegalPieces.j() ? ValidationSeverity_PASS_getInstance() : ValidationSeverity_ERROR_getInstance();
  var tmp_17 = ValidationCategory_COLOR_LEGALITY_getInstance();
  var tmp_18;
  if (illegalPieces.j()) {
    tmp_18 = '100% Real Official Mold \xD7 Color Combos';
  } else {
    tmp_18 = '' + illegalPieces.l() + ' Unproduced Mold \xD7 Color Parts';
  }
  var tmp_19 = tmp_18;
  var tmp_20;
  if (illegalPieces.j()) {
    tmp_20 = 'Every placed element ID & color combination exists in official production records.';
  } else {
    tmp_20 = 'Some selected colors were never produced in ' + config.qe_1.zf_1.ac_1 + '. Auto-fix substitutes legal production molds or colors.';
  }
  var tmp_21 = tmp_20;
  var tmp_22 = illegalPieces.l();
  // Inline function 'kotlin.collections.isNotEmpty' call
  var tmp$ret$13 = !illegalPieces.j();
  checks.f(new ValidationIssue('color_mold_legality', tmp_16, tmp_17, tmp_19, tmp_21, tmp_22, tmp$ret$13, 'Fix Illegal Parts'));
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_3 = bomLines.g();
  while (_iterator__ex2g4s_3.h()) {
    var element_2 = _iterator__ex2g4s_3.i();
    if (!element_2.kc_1.hc_1 && element_2.nc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
      destination_0.f(element_2);
    }
  }
  var rareLines = destination_0;
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s_4 = rareLines.g();
  while (_iterator__ex2g4s_4.h()) {
    var element_3 = _iterator__ex2g4s_4.i();
    var tmp_23 = sum;
    sum = tmp_23 + element_3.mc_1 | 0;
  }
  var totalRareCount = sum;
  if (rareLines.j()) {
    checks.f(new ValidationIssue('rarity_ok', ValidationSeverity_PASS_getInstance(), ValidationCategory_RARITY_COST_getInstance(), 'High Availability \xB7 No Rare/Retired Parts', '100% of elements use active Common or Uncommon official colors readily available on Pick a Brick & BrickLink.', 0));
  } else {
    var _iterator__ex2g4s_5 = take(rareLines, 3).g();
    while (_iterator__ex2g4s_5.h()) {
      var line = _iterator__ex2g4s_5.i();
      var alt = line.uc_1;
      var tmp_24 = 'rare_' + line.lc_1.wc_1;
      var tmp_25 = ValidationSeverity_WARNING_getInstance();
      var tmp_26 = ValidationCategory_RARITY_COST_getInstance();
      var tmp_27 = line.lc_1.xc_1 + ' (' + line.mc_1 + '\xD7 ' + line.kc_1.zb_1 + ') is Rare/Retired';
      var tmp_28;
      if (!(alt == null)) {
        tmp_28 = 'Est. $' + fmt2(line.rc_1) + ' (' + fmt2(line.pc_1) + '/ea). Swap to Common ' + alt.xc_1 + ' to save ~$' + fmt2(line.vc_1) + '.';
      } else {
        tmp_28 = 'High secondary-market scarcity increases build cost.';
      }
      var tmp_29 = tmp_28;
      var tmp_30 = !(alt == null);
      var tmp_31;
      if (alt == null) {
        tmp_31 = null;
      } else {
        // Inline function 'kotlin.let' call
        tmp_31 = 'Swap \u2192 ' + alt.xc_1;
      }
      var tmp_32 = tmp_31;
      checks.f(new ValidationIssue(tmp_24, tmp_25, tmp_26, tmp_27, tmp_29, line.mc_1, tmp_30, tmp_32, line.lc_1.wc_1, alt == null ? null : alt.wc_1, line.vc_1));
    }
  }
  var tmp$ret$21;
  $l$block_0: {
    // Inline function 'kotlin.collections.count' call
    var tmp_33;
    if (isInterface(checks, Collection)) {
      tmp_33 = checks.j();
    } else {
      tmp_33 = false;
    }
    if (tmp_33) {
      tmp$ret$21 = 0;
      break $l$block_0;
    }
    var count_1 = 0;
    var _iterator__ex2g4s_6 = checks.g();
    while (_iterator__ex2g4s_6.h()) {
      var element_4 = _iterator__ex2g4s_6.i();
      if (element_4.dh_1.equals(ValidationSeverity_ERROR_getInstance())) {
        count_1 = count_1 + 1 | 0;
        checkCountOverflow(count_1);
      }
    }
    tmp$ret$21 = count_1;
  }
  var errorCount = tmp$ret$21;
  var tmp$ret$23;
  $l$block_1: {
    // Inline function 'kotlin.collections.count' call
    var tmp_34;
    if (isInterface(checks, Collection)) {
      tmp_34 = checks.j();
    } else {
      tmp_34 = false;
    }
    if (tmp_34) {
      tmp$ret$23 = 0;
      break $l$block_1;
    }
    var count_2 = 0;
    var _iterator__ex2g4s_7 = checks.g();
    while (_iterator__ex2g4s_7.h()) {
      var element_5 = _iterator__ex2g4s_7.i();
      if (element_5.dh_1.equals(ValidationSeverity_WARNING_getInstance())) {
        count_2 = count_2 + 1 | 0;
        checkCountOverflow(count_2);
      }
    }
    tmp$ret$23 = count_2;
  }
  var warnCount = tmp$ret$23;
  var score = coerceIn_0((100 - imul_0(errorCount, 25) | 0) - imul_0(warnCount, 8) | 0, 20, 100);
  return new ValidationReport(errorCount === 0 && weakSeamColumns === 0, score, checks, totalRareCount, illegalPieces.l(), weakSeamColumns, technicPins.l(), moduleCols, moduleRows);
}
function generateBuildSteps($this, width, height, surfacePieces, backingPieces, technicPins, colorNumberMap, config) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var steps = ArrayList_init_$Create$();
  var stepNum = 1;
  // Inline function 'kotlin.collections.mutableSetOf' call
  var completedIds = LinkedHashSet_init_$Create$();
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!backingPieces.j()) {
    var stepBom = summarizePiecesForStep($this, backingPieces, technicPins, colorNumberMap);
    var _unary__edvuaz = stepNum;
    stepNum = _unary__edvuaz + 1 | 0;
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!technicPins.j()) {
      tmp = 'Connect ' + backingPieces.l() + ' frames using ' + technicPins.l() + '\xD7 2780 Technic pins at marked joints';
    } else {
      tmp = 'Align ' + backingPieces.l() + ' foundation plate' + (backingPieces.l() > 1 ? 's' : '') + ' on a flat workspace';
    }
    steps.f(new BuildStep(_unary__edvuaz, 'Assemble Structural Backing', tmp, 'Foundation', true, backingPieces, technicPins, stepBom, emptySet(), new StepFocusRegion(0, 0, width, height)));
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s = backingPieces.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      completedIds.f(element.ng_1);
    }
  }
  if (config.qe_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
    var rowsPerStep = height <= 24 ? 2 : 4;
    var yEnd = height - 1 | 0;
    while (yEnd >= 0) {
      // Inline function 'kotlin.math.max' call
      var b = (yEnd - rowsPerStep | 0) + 1 | 0;
      var yStart = Math.max(0, b);
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s_0 = surfacePieces.g();
      while (_iterator__ex2g4s_0.h()) {
        var element_0 = _iterator__ex2g4s_0.i();
        var containsArg = element_0.rg_1;
        if (yStart <= containsArg ? containsArg <= yEnd : false) {
          destination.f(element_0);
        }
      }
      var coursePieces = destination;
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!coursePieces.j()) {
        var bottomRowNum = height - yEnd | 0;
        var topRowNum = height - yStart | 0;
        var _unary__edvuaz_0 = stepNum;
        stepNum = _unary__edvuaz_0 + 1 | 0;
        steps.f(new BuildStep(_unary__edvuaz_0, 'Brick Courses ' + bottomRowNum + '\u2013' + topRowNum, 'Press firmly to interlock running-bond seams across row ' + bottomRowNum + ' to ' + topRowNum, 'Rows ' + bottomRowNum + '\u2013' + topRowNum, false, coursePieces, emptyList(), summarizePiecesForStep($this, coursePieces, emptyList(), colorNumberMap), toSet_0(completedIds), new StepFocusRegion(0, yStart, width, (yEnd - yStart | 0) + 1 | 0)));
        // Inline function 'kotlin.collections.forEach' call
        var _iterator__ex2g4s_1 = coursePieces.g();
        while (_iterator__ex2g4s_1.h()) {
          var element_1 = _iterator__ex2g4s_1.i();
          completedIds.f(element_1.ng_1);
        }
      }
      yEnd = yStart - 1 | 0;
    }
  } else {
    // Inline function 'kotlin.math.ceil' call
    var x = width / 16.0;
    var tmp$ret$13 = Math.ceil(x);
    var moduleCols = coerceAtLeast(numberToInt(tmp$ret$13), 1);
    // Inline function 'kotlin.math.ceil' call
    var x_0 = height / 16.0;
    var tmp$ret$14 = Math.ceil(x_0);
    var moduleRows = coerceAtLeast(numberToInt(tmp$ret$14), 1);
    var inductionVariable = 0;
    if (inductionVariable < moduleRows)
      do {
        var mr = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var rowLetter = toString(Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(65), mr));
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < moduleCols)
          $l$loop: do {
            var mc = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var panelName = 'Panel ' + rowLetter + (mc + 1 | 0);
            var panelX = imul_0(mc, 16);
            var panelY = imul_0(mr, 16);
            // Inline function 'kotlin.math.min' call
            var b_0 = width - panelX | 0;
            var panelW = Math.min(16, b_0);
            // Inline function 'kotlin.math.min' call
            var b_1 = height - panelY | 0;
            var panelH = Math.min(16, b_1);
            // Inline function 'kotlin.collections.filter' call
            // Inline function 'kotlin.collections.filterTo' call
            var destination_0 = ArrayList_init_$Create$();
            var _iterator__ex2g4s_2 = surfacePieces.g();
            while (_iterator__ex2g4s_2.h()) {
              var element_2 = _iterator__ex2g4s_2.i();
              if (element_2.wg_1 === mr && element_2.vg_1 === mc) {
                destination_0.f(element_2);
              }
            }
            var panelPieces = destination_0;
            if (panelPieces.j())
              continue $l$loop;
            // Inline function 'kotlin.collections.groupBy' call
            // Inline function 'kotlin.collections.groupByTo' call
            var destination_1 = LinkedHashMap_init_$Create$();
            var _iterator__ex2g4s_3 = panelPieces.g();
            while (_iterator__ex2g4s_3.h()) {
              var element_3 = _iterator__ex2g4s_3.i();
              var key = element_3.pg_1.wc_1;
              // Inline function 'kotlin.collections.getOrPut' call
              var value = destination_1.x(key);
              var tmp_0;
              if (value == null) {
                var answer = ArrayList_init_$Create$();
                destination_1.b2(key, answer);
                tmp_0 = answer;
              } else {
                tmp_0 = value;
              }
              var list = tmp_0;
              list.f(element_3);
            }
            // Inline function 'kotlin.collections.sortedBy' call
            var this_0 = destination_1.y();
            // Inline function 'kotlin.comparisons.compareBy' call
            var tmp_1 = MosaicConverterEngine$generateBuildSteps$lambda(colorNumberMap);
            var tmp$ret$26 = new sam$kotlin_Comparator$0_4(tmp_1);
            var colorGroups = sortedWith(this_0, tmp$ret$26);
            var batchSize = colorGroups.l() > 8 ? 3 : 2;
            var batches = chunked(colorGroups, batchSize);
            // Inline function 'kotlin.collections.forEachIndexed' call
            var index = 0;
            var _iterator__ex2g4s_4 = batches.g();
            while (_iterator__ex2g4s_4.h()) {
              var item = _iterator__ex2g4s_4.i();
              var _unary__edvuaz_1 = index;
              index = _unary__edvuaz_1 + 1 | 0;
              var batchIdx = checkIndexOverflow(_unary__edvuaz_1);
              // Inline function 'kotlin.collections.flatMap' call
              // Inline function 'kotlin.collections.flatMapTo' call
              var destination_2 = ArrayList_init_$Create$();
              var _iterator__ex2g4s_5 = item.g();
              while (_iterator__ex2g4s_5.h()) {
                var element_4 = _iterator__ex2g4s_5.i();
                var list_0 = element_4.v();
                addAll(destination_2, list_0);
              }
              var stepPieces = destination_2;
              // Inline function 'kotlin.collections.mapNotNull' call
              // Inline function 'kotlin.collections.mapNotNullTo' call
              var destination_3 = ArrayList_init_$Create$();
              // Inline function 'kotlin.collections.forEach' call
              var _iterator__ex2g4s_6 = item.g();
              while (_iterator__ex2g4s_6.h()) {
                var element_5 = _iterator__ex2g4s_6.i();
                var tmp0_safe_receiver = BrickCatalog_getInstance().pf_1.x(element_5.u());
                var tmp0_safe_receiver_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.xc_1;
                if (tmp0_safe_receiver_0 == null)
                  null;
                else {
                  // Inline function 'kotlin.let' call
                  destination_3.f(tmp0_safe_receiver_0);
                }
              }
              var colorNames = joinToString_1(destination_3, ' + ');
              var _unary__edvuaz_2 = stepNum;
              stepNum = _unary__edvuaz_2 + 1 | 0;
              steps.f(new BuildStep(_unary__edvuaz_2, panelName + ' \xB7 Pass ' + (batchIdx + 1 | 0) + '/' + batches.l(), 'Place ' + stepPieces.l() + ' elements: ' + colorNames, panelName, false, stepPieces, emptyList(), summarizePiecesForStep(MosaicConverterEngine_instance, stepPieces, emptyList(), colorNumberMap), toSet_0(completedIds), new StepFocusRegion(panelX, panelY, panelW, panelH)));
              // Inline function 'kotlin.collections.forEach' call
              var _iterator__ex2g4s_7 = stepPieces.g();
              while (_iterator__ex2g4s_7.h()) {
                var element_6 = _iterator__ex2g4s_7.i();
                completedIds.f(element_6.ng_1);
              }
            }
          }
           while (inductionVariable_0 < moduleCols);
      }
       while (inductionVariable < moduleRows);
  }
  return steps;
}
function summarizePiecesForStep($this, pieces, pins, colorNumberMap) {
  // Inline function 'kotlin.collections.mutableMapOf' call
  var grouped = LinkedHashMap_init_$Create$();
  var _iterator__ex2g4s = pieces.g();
  while (_iterator__ex2g4s.h()) {
    var p = _iterator__ex2g4s.i();
    var k = to(p.og_1, p.pg_1);
    var tmp0_elvis_lhs = grouped.x(k);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
    grouped.b2(k, value);
  }
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!pins.j()) {
    var k_0 = to(BrickPartType_TECHNIC_PIN_getInstance(), BrickCatalog_getInstance().qf_1);
    var tmp1_elvis_lhs = grouped.x(k_0);
    // Inline function 'kotlin.collections.set' call
    var value_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + pins.l() | 0;
    grouped.b2(k_0, value_0);
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = grouped.y();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s_0 = this_0.g();
  while (_iterator__ex2g4s_0.h()) {
    var item = _iterator__ex2g4s_0.i();
    // Inline function 'kotlin.collections.component1' call
    var key = item.u();
    // Inline function 'kotlin.collections.component2' call
    var qty = item.v();
    var part = key.k8();
    var color = key.l8();
    var pabUnit = BrickCatalog_getInstance().lg(part, color);
    var blUnit = BrickCatalog_getInstance().mg(part, color);
    var tmp = BrickCatalog_getInstance().kg(part, color);
    var tmp_0 = BrickCatalog_getInstance().ag(part, color.wc_1);
    var tmp_1 = pabUnit * qty;
    var tmp_2 = blUnit * qty;
    var tmp_3;
    if (part.hc_1) {
      tmp_3 = 0;
    } else {
      var tmp0_elvis_lhs_0 = colorNumberMap.x(color.wc_1);
      tmp_3 = tmp0_elvis_lhs_0 == null ? 0 : tmp0_elvis_lhs_0;
    }
    var tmp$ret$6 = new PartBomLine(part, color, qty, tmp, tmp_0, pabUnit, blUnit, tmp_1, tmp_2, tmp_3);
    destination.f(tmp$ret$6);
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp_4 = MosaicConverterEngine$summarizePiecesForStep$lambda;
  var tmp$ret$10 = new sam$kotlin_Comparator$0_5(tmp_4);
  return sortedWith(destination, tmp$ret$10);
}
function sam$kotlin_Comparator$0_1(function_0) {
  this.nh_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_1).v7 = function (a, b) {
  return this.nh_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_1).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_1).j1 = function () {
  return this.nh_1;
};
protoOf(sam$kotlin_Comparator$0_1).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_1).hashCode = function () {
  return hashCode_0(this.j1());
};
function sam$kotlin_Comparator$0_2(function_0) {
  this.oh_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_2).v7 = function (a, b) {
  return this.oh_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_2).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_2).j1 = function () {
  return this.oh_1;
};
protoOf(sam$kotlin_Comparator$0_2).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_2).hashCode = function () {
  return hashCode_0(this.j1());
};
function sam$kotlin_Comparator$0_3(function_0) {
  this.ph_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_3).v7 = function (a, b) {
  return this.ph_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_3).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_3).j1 = function () {
  return this.ph_1;
};
protoOf(sam$kotlin_Comparator$0_3).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_3).hashCode = function () {
  return hashCode_0(this.j1());
};
function sam$kotlin_Comparator$0_4(function_0) {
  this.qh_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_4).v7 = function (a, b) {
  return this.qh_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_4).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_4).j1 = function () {
  return this.qh_1;
};
protoOf(sam$kotlin_Comparator$0_4).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_4).hashCode = function () {
  return hashCode_0(this.j1());
};
function sam$kotlin_Comparator$0_5(function_0) {
  this.rh_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_5).v7 = function (a, b) {
  return this.rh_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_5).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_5).j1 = function () {
  return this.rh_1;
};
protoOf(sam$kotlin_Comparator$0_5).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_5).hashCode = function () {
  return hashCode_0(this.j1());
};
function MosaicConverterEngine$rebuildFromStudGrid$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.v();
  var tmp$ret$2 = a.v();
  return compareValues(tmp, tmp$ret$2);
}
function matchColorsToGrid$addError($width, $height, work, errR, errG, errB, nx, ny, weight) {
  if ((0 <= nx ? nx < $width : false) && (0 <= ny ? ny < $height : false)) {
    var nIdx = imul_0(imul_0(ny, $width) + nx | 0, 3);
    work[nIdx] = coerceIn_1(work[nIdx] + errR * weight, 0.0, 255.0);
    work[nIdx + 1 | 0] = coerceIn_1(work[nIdx + 1 | 0] + errG * weight, 0.0, 255.0);
    work[nIdx + 2 | 0] = coerceIn_1(work[nIdx + 2 | 0] + errB * weight, 0.0, 255.0);
  }
}
function MosaicConverterEngine$applyColorToleranceConsolidation$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.v();
  var tmp$ret$2 = a.v();
  return compareValues(tmp, tmp$ret$2);
}
function MosaicConverterEngine$buildBomAndPricing$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.kc_1.hc_1;
  var tmp$ret$2 = b.kc_1.hc_1;
  return compareValues(tmp, tmp$ret$2);
}
function MosaicConverterEngine$buildBomAndPricing$lambda_0($this) {
  return function (a, b) {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = b.rc_1;
      var tmp$ret$2 = a.rc_1;
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function MosaicConverterEngine$generateBuildSteps$lambda($colorNumberMap) {
  return function (a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp0_elvis_lhs = $colorNumberMap.x(a.u());
    var tmp = tmp0_elvis_lhs == null ? 99 : tmp0_elvis_lhs;
    var tmp0_elvis_lhs_0 = $colorNumberMap.x(b.u());
    var tmp$ret$2 = tmp0_elvis_lhs_0 == null ? 99 : tmp0_elvis_lhs_0;
    return compareValues(tmp, tmp$ret$2);
  };
}
function MosaicConverterEngine$summarizePiecesForStep$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.mc_1;
  var tmp$ret$2 = a.mc_1;
  return compareValues(tmp, tmp$ret$2);
}
function MosaicConverterEngine() {
}
protoOf(MosaicConverterEngine).sh = function (sourceBitmap, config) {
  var width = coerceIn_0(config.ne_1, 16, 96);
  var height = coerceIn_0(config.oe_1, 16, 96);
  var candidatePalette = resolveCandidatePalette(this, config);
  var sampledRgb = sampleAndPreprocess(this, sourceBitmap, width, height, config);
  var rawColorGrid = matchColorsToGrid(this, sampledRgb, width, height, candidatePalette, config);
  var consolidatedGrid = applyColorToleranceConsolidation(this, rawColorGrid, width, height, config.ve_1, config.ue_1);
  return this.uh(consolidatedGrid, config.th(width, height));
};
protoOf(MosaicConverterEngine).uh = function (studColorIds, config) {
  var width = coerceIn_0(config.ne_1, 16, 96);
  var height = coerceIn_0(config.oe_1, 16, 96);
  var expectedSize = imul_0(width, height);
  var tmp;
  if (studColorIds.length === expectedSize) {
    // Inline function 'kotlin.collections.copyOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = studColorIds.slice();
  } else {
    var tmp_0 = 0;
    var tmp_1 = new Int32Array(expectedSize);
    while (tmp_0 < expectedSize) {
      var tmp_2 = tmp_0;
      // Inline function 'kotlin.collections.getOrElse' call
      var tmp_3;
      if (0 <= tmp_2 ? tmp_2 <= (studColorIds.length - 1 | 0) : false) {
        tmp_3 = studColorIds[tmp_2];
      } else {
        tmp_3 = first(BrickCatalog_getInstance().of_1).wc_1;
      }
      tmp_1[tmp_2] = tmp_3;
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp = tmp_1;
  }
  var safeGrid = tmp;
  // Inline function 'kotlin.collections.mutableMapOf' call
  var colorFrequencies = LinkedHashMap_init_$Create$();
  var inductionVariable = 0;
  var last = safeGrid.length;
  while (inductionVariable < last) {
    var cid = safeGrid[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var tmp0_elvis_lhs = colorFrequencies.x(cid);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
    colorFrequencies.b2(cid, value);
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  var this_0 = colorFrequencies.y();
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp_4 = MosaicConverterEngine$rebuildFromStudGrid$lambda;
  var tmp$ret$8 = new sam$kotlin_Comparator$0_1(tmp_4);
  // Inline function 'kotlin.collections.mapIndexed' call
  var this_1 = sortedWith(this_0, tmp$ret$8);
  // Inline function 'kotlin.collections.mapIndexedTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
  var index = 0;
  var _iterator__ex2g4s = this_1.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var index_0 = checkIndexOverflow(_unary__edvuaz);
    var tmp$ret$11 = to(item.u(), index_0 + 1 | 0);
    destination.f(tmp$ret$11);
  }
  var colorNumberMap = toMap(destination);
  var tmp_5;
  if (config.qe_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
    tmp_5 = BackingSystem_SELF_SUPPORTING_WALL_getInstance();
  } else {
    tmp_5 = config.re_1;
  }
  var effectiveBacking = tmp_5;
  var _destruct__k2r9zo = buildStructuralBacking(this, width, height, effectiveBacking);
  var backingPieces = _destruct__k2r9zo.k8();
  var technicPins = _destruct__k2r9zo.l8();
  var surfacePieces = packSurfacePieces(this, safeGrid, width, height, config, backingPieces.l() + 1 | 0);
  var _destruct__k2r9zo_0 = buildBomAndPricing(this, surfacePieces, backingPieces, technicPins, width, height, colorNumberMap, config);
  var bomLines = _destruct__k2r9zo_0.k8();
  var pricing = _destruct__k2r9zo_0.l8();
  var validationReport = validateMosaic(this, width, height, surfacePieces, backingPieces, technicPins, bomLines, effectiveBacking, config);
  var buildSteps = generateBuildSteps(this, width, height, surfacePieces, backingPieces, technicPins, colorNumberMap, config);
  return new MosaicResult(config.th(width, height, VOID, VOID, effectiveBacking), width, height, safeGrid, surfacePieces, backingPieces, technicPins, validationReport, buildSteps, bomLines, pricing, colorNumberMap);
};
var MosaicConverterEngine_instance;
function MosaicConverterEngine_getInstance() {
  return MosaicConverterEngine_instance;
}
var static_init_called_3;
function static_init_3() {
  if (static_init_called_3)
    return Unit_instance;
  static_init_called_3 = true;
  MarketplaceCsvFormat_REBRICKABLE_instance = new MarketplaceCsvFormat('REBRICKABLE', 0, 'Rebrickable', 'Direct import for Rebrickable Custom Lists & Multi-Buy', 'rebrickable', 'Part, Color (RB ID), Quantity, Is Spare');
  MarketplaceCsvFormat_BRICKLINK_BRICKOWL_instance = new MarketplaceCsvFormat('BRICKLINK_BRICKOWL', 1, 'BrickLink / BrickOwl', 'Detailed catalog CSV with BrickLink color IDs & market pricing', 'bricklink_brickowl', 'Item Type, Part #, Color ID, Color Name, Qty, Condition, Price');
  MarketplaceCsvFormat_PICK_A_BRICK_instance = new MarketplaceCsvFormat('PICK_A_BRICK', 2, 'Pick a Brick (PAB)', 'Design IDs, color names, availability & Pick a Brick estimates', 'pick_a_brick', 'Design ID, Part Name, Color Name, Qty, Availability, Unit USD');
}
var MarketplaceCsvFormat_REBRICKABLE_instance;
var MarketplaceCsvFormat_BRICKLINK_BRICKOWL_instance;
var MarketplaceCsvFormat_PICK_A_BRICK_instance;
function values_0() {
  static_init_3();
  return [MarketplaceCsvFormat_REBRICKABLE_getInstance(), MarketplaceCsvFormat_BRICKLINK_BRICKOWL_getInstance(), MarketplaceCsvFormat_PICK_A_BRICK_getInstance()];
}
function get_entries_0() {
  static_init_3();
  if ($ENTRIES_0 == null)
    $ENTRIES_0 = enumEntries(values_0());
  return $ENTRIES_0;
}
var $ENTRIES_0;
function MarketplaceCsvFormat(name, ordinal, title, subtitle, fileSlug, columnsHint) {
  Enum.call(this, name, ordinal);
  this.xh_1 = title;
  this.yh_1 = subtitle;
  this.zh_1 = fileSlug;
  this.ai_1 = columnsHint;
}
function csvEscape($this, value) {
  var tmp;
  if (contains(value, _Char___init__impl__6a9atx(44)) || contains(value, _Char___init__impl__6a9atx(34)) || contains(value, _Char___init__impl__6a9atx(10)) || contains(value, _Char___init__impl__6a9atx(13))) {
    tmp = '"' + replace(value, '"', '""') + '"';
  } else {
    tmp = value;
  }
  return tmp;
}
function MosaicExporter() {
  MosaicExporter_instance = this;
  this.td_1 = mapOf_0([to(1, 15), to(11, 0), to(86, 71), to(85, 72), to(5, 4), to(3, 14), to(7, 1), to(6, 2), to(4, 25), to(2, 19), to(88, 70), to(34, 27), to(156, 322), to(63, 272), to(59, 320), to(69, 28), to(80, 288), to(110, 191), to(150, 84), to(120, 308), to(42, 73), to(71, 26), to(104, 29), to(89, 85), to(39, 3), to(220, 1050), to(153, 321), to(105, 212), to(103, 226), to(48, 378), to(55, 379), to(155, 326), to(154, 31), to(157, 30), to(152, 323), to(28, 92), to(90, 78), to(36, 10), to(115, 297), to(95, 179), to(68, 484), to(47, 5), to(54, 373), to(72, 313), to(25, 12), to(73, 112), to(21, 334), to(99, 151)]);
}
protoOf(MosaicExporter).bi = function (brickLinkColorId) {
  var tmp0_elvis_lhs = this.td_1.x(brickLinkColorId);
  return tmp0_elvis_lhs == null ? brickLinkColorId : tmp0_elvis_lhs;
};
protoOf(MosaicExporter).ci = function (result, format) {
  return 'studcraft_' + result.be_1 + 'x' + result.ce_1 + '_' + format.zh_1 + '.csv';
};
protoOf(MosaicExporter).ud = function (result, excludeOwnedKeys) {
  if (excludeOwnedKeys.j())
    return result.je_1;
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = result.je_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (!excludeOwnedKeys.s(element.di())) {
      destination.f(element);
    }
  }
  return destination;
};
protoOf(MosaicExporter).xd = function (result, format, excludeOwnedKeys) {
  var lines = this.ud(result, excludeOwnedKeys);
  var sb = StringBuilder_init_$Create$_0();
  switch (format.a1_1) {
    case 0:
      // Inline function 'kotlin.text.appendLine' call

      var value = 'Part,Color,Quantity,Is Spare';
      // Inline function 'kotlin.text.appendLine' call

      sb.o4(value).p4(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s = lines.g();
      while (_iterator__ex2g4s.h()) {
        var line = _iterator__ex2g4s.i();
        var rbColorId = this.bi(line.lc_1.wc_1);
        // Inline function 'kotlin.text.appendLine' call
        var value_0 = joinToString_1(listOf_0([csvEscape(this, line.kc_1.zb_1), rbColorId.toString(), line.mc_1.toString(), 'False']), ',');
        // Inline function 'kotlin.text.appendLine' call
        sb.o4(value_0).p4(_Char___init__impl__6a9atx(10));
      }

      break;
    case 1:
      // Inline function 'kotlin.text.appendLine' call

      var value_1 = 'Item Type,Part Number,Part Name,BrickLink Color ID,Color Name,Quantity,Condition,Availability,Est BL Unit USD,Est BL Total USD';
      // Inline function 'kotlin.text.appendLine' call

      sb.o4(value_1).p4(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s_0 = lines.g();
      while (_iterator__ex2g4s_0.h()) {
        var line_0 = _iterator__ex2g4s_0.i();
        // Inline function 'kotlin.text.appendLine' call
        var value_2 = joinToString_1(listOf_0(['P', csvEscape(this, line_0.kc_1.zb_1), csvEscape(this, line_0.kc_1.ac_1), line_0.lc_1.wc_1.toString(), csvEscape(this, line_0.lc_1.xc_1), line_0.mc_1.toString(), 'New', csvEscape(this, line_0.nc_1.hi_1), fmt2(line_0.qc_1), fmt2(line_0.sc_1)]), ',');
        // Inline function 'kotlin.text.appendLine' call
        sb.o4(value_2).p4(_Char___init__impl__6a9atx(10));
      }

      break;
    case 2:
      // Inline function 'kotlin.text.appendLine' call

      var value_3 = 'Design ID,Part Name,Color ID,Color Name,Quantity,Availability,Est PAB Unit USD,Est PAB Total USD';
      // Inline function 'kotlin.text.appendLine' call

      sb.o4(value_3).p4(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s_1 = lines.g();
      while (_iterator__ex2g4s_1.h()) {
        var line_1 = _iterator__ex2g4s_1.i();
        // Inline function 'kotlin.text.appendLine' call
        var value_4 = joinToString_1(listOf_0([csvEscape(this, line_1.kc_1.zb_1), csvEscape(this, line_1.kc_1.ac_1), line_1.lc_1.wc_1.toString(), csvEscape(this, line_1.lc_1.xc_1), line_1.mc_1.toString(), csvEscape(this, line_1.nc_1.gi_1), fmt2(line_1.pc_1), fmt2(line_1.rc_1)]), ',');
        // Inline function 'kotlin.text.appendLine' call
        sb.o4(value_4).p4(_Char___init__impl__6a9atx(10));
      }

      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return sb.toString();
};
protoOf(MosaicExporter).ii = function (result, format, excludeOwnedKeys, $super) {
  excludeOwnedKeys = excludeOwnedKeys === VOID ? emptySet() : excludeOwnedKeys;
  return $super === VOID ? this.xd(result, format, excludeOwnedKeys) : $super.xd.call(this, result, format, excludeOwnedKeys);
};
protoOf(MosaicExporter).ji = function (result) {
  var sb = StringBuilder_init_$Create$_0();
  // Inline function 'kotlin.text.appendLine' call
  var value = 'StudCraft Brick Mosaic Build Spec';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_0 = 'Dimensions: ' + result.be_1 + ' x ' + result.ce_1 + ' studs';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_0).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_1 = 'Style: ' + result.ae_1.qe_1.wf_1;
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_1).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_2 = 'Backing: ' + result.ae_1.re_1.mi_1;
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_2).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_3 = 'Engineering Legality: ' + (result.he_1.pi_1 ? '100% LEGAL' : 'Needs Review') + ' (' + result.he_1.qi_1 + '/100)';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_3).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_4 = 'Total Pieces: ' + result.ke_1.jf_1 + ' (' + result.ke_1.kf_1 + ' unique lots)';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_4).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_5 = 'Estimated Cost (Pick a Brick New): $' + fmt2(result.ke_1.cf_1);
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_5).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_6 = 'Estimated Cost (BrickLink Market): $' + fmt2(result.ke_1.df_1);
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_6).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  sb.p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_7 = 'PARTS LIST (Part # | Color | Qty | Est. PAB)';
  // Inline function 'kotlin.text.appendLine' call
  sb.o4(value_7).p4(_Char___init__impl__6a9atx(10));
  var _iterator__ex2g4s = result.je_1.g();
  while (_iterator__ex2g4s.h()) {
    var line = _iterator__ex2g4s.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_8 = '- ' + line.kc_1.zb_1 + ' (' + line.kc_1.bc_1 + ') | ' + line.lc_1.xc_1 + ' | x' + line.mc_1 + ' | $' + fmt2(line.rc_1) + ' [' + line.nc_1.hi_1 + ']';
    // Inline function 'kotlin.text.appendLine' call
    sb.o4(value_8).p4(_Char___init__impl__6a9atx(10));
  }
  return sb.toString();
};
var MosaicExporter_instance;
function MosaicExporter_getInstance() {
  if (MosaicExporter_instance == null)
    new MosaicExporter();
  return MosaicExporter_instance;
}
function MarketplaceCsvFormat_REBRICKABLE_getInstance() {
  static_init_3();
  return MarketplaceCsvFormat_REBRICKABLE_instance;
}
function MarketplaceCsvFormat_BRICKLINK_BRICKOWL_getInstance() {
  static_init_3();
  return MarketplaceCsvFormat_BRICKLINK_BRICKOWL_instance;
}
function MarketplaceCsvFormat_PICK_A_BRICK_getInstance() {
  static_init_3();
  return MarketplaceCsvFormat_PICK_A_BRICK_instance;
}
function version($this, id) {
  var tmp0_safe_receiver = Regex_init_$Create$_0('(\\d+(?:\\.\\d+)?)').u6(id);
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v();
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : toDoubleOrNull(tmp1_safe_receiver);
  return tmp2_elvis_lhs == null ? 0.0 : tmp2_elvis_lhs;
}
function sam$kotlin_Comparator$0_6(function_0) {
  this.yi_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_6).v7 = function (a, b) {
  return this.yi_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_6).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_6).j1 = function () {
  return this.yi_1;
};
protoOf(sam$kotlin_Comparator$0_6).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_6).hashCode = function () {
  return hashCode_0(this.j1());
};
function sam$kotlin_Comparator$0_7(function_0) {
  this.zi_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_7).v7 = function (a, b) {
  return this.zi_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_7).compare = function (a, b) {
  return this.v7(a, b);
};
protoOf(sam$kotlin_Comparator$0_7).j1 = function () {
  return this.zi_1;
};
protoOf(sam$kotlin_Comparator$0_7).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.j1(), other.j1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_7).hashCode = function () {
  return hashCode_0(this.j1());
};
function GeminiModelFailover$orderTextModels$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = contains_0(a, 'flash') && !contains_0(a, 'lite') ? 0 : contains_0(a, 'flash') ? 1 : 2;
  var tmp$ret$2 = contains_0(b, 'flash') && !contains_0(b, 'lite') ? 0 : contains_0(b, 'flash') ? 1 : 2;
  return compareValues(tmp, tmp$ret$2);
}
function GeminiModelFailover$orderTextModels$lambda_0($this) {
  return function (a, b) {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = contains_0(a, 'preview') || contains_0(a, 'exp') ? 1 : 0;
      var tmp$ret$2 = contains_0(b, 'preview') || contains_0(b, 'exp') ? 1 : 0;
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function GeminiModelFailover$orderTextModels$lambda_1($this) {
  return function (a, b) {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = version(GeminiModelFailover_getInstance(), b);
      var tmp$ret$2 = version(GeminiModelFailover_getInstance(), a);
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function GeminiModelFailover$orderImageModels$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = contains_0(a, 'preview') ? 1 : 0;
  var tmp$ret$2 = contains_0(b, 'preview') ? 1 : 0;
  return compareValues(tmp, tmp$ret$2);
}
function GeminiModelFailover$orderImageModels$lambda_0($this) {
  return function (a, b) {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = version(GeminiModelFailover_getInstance(), b);
      var tmp$ret$2 = version(GeminiModelFailover_getInstance(), a);
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function GeminiModelFailover$orderImageModels$lambda_1($this) {
  return function (a, b) {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = contains_0(a, 'flash') ? 0 : 1;
      var tmp$ret$2 = contains_0(b, 'flash') ? 0 : 1;
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function GeminiModelFailover() {
  GeminiModelFailover_instance = this;
  this.aj_1 = listOf_0(['image', 'tts', 'live', 'audio', 'embedding', 'robotics', 'computer', 'native', 'aqa', 'veo']);
}
protoOf(GeminiModelFailover).bj = function (ids, preferred) {
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = distinct(ids);
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp;
    if (!(element === preferred) && startsWith(element, 'gemini')) {
      var tmp0_0 = GeminiModelFailover_getInstance().aj_1;
      var tmp$ret$3;
      $l$block_0: {
        // Inline function 'kotlin.collections.none' call
        var tmp_0;
        if (isInterface(tmp0_0, Collection)) {
          tmp_0 = tmp0_0.j();
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$3 = true;
          break $l$block_0;
        }
        var _iterator__ex2g4s_0 = tmp0_0.g();
        while (_iterator__ex2g4s_0.h()) {
          var element_0 = _iterator__ex2g4s_0.i();
          if (contains_0(element, element_0)) {
            tmp$ret$3 = false;
            break $l$block_0;
          }
        }
        tmp$ret$3 = true;
      }
      tmp = tmp$ret$3;
    } else {
      tmp = false;
    }
    if (tmp) {
      destination.f(element);
    }
  }
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_1 = destination.g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    if (contains_0(element_1, 'flash') || contains_0(element_1, 'pro')) {
      destination_0.f(element_1);
    }
  }
  var tmp_1 = destination_0;
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_2 = GeminiModelFailover$orderTextModels$lambda;
  // Inline function 'kotlin.comparisons.thenBy' call
  var this_0 = new sam$kotlin_Comparator$0_6(tmp_2);
  var tmp_3 = GeminiModelFailover$orderTextModels$lambda_0(this_0);
  // Inline function 'kotlin.comparisons.thenByDescending' call
  var this_1 = new sam$kotlin_Comparator$0_6(tmp_3);
  var tmp_4 = GeminiModelFailover$orderTextModels$lambda_1(this_1);
  var tmp$ret$10 = new sam$kotlin_Comparator$0_6(tmp_4);
  var others = sortedWith(tmp_1, tmp$ret$10);
  return take(plus(listOf(preferred), others), 4);
};
protoOf(GeminiModelFailover).cj = function (ids) {
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = distinct(ids);
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (startsWith(element, 'gemini') && contains_0(element, 'image')) {
      destination.f(element);
    }
  }
  var tmp = destination;
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_0 = GeminiModelFailover$orderImageModels$lambda;
  // Inline function 'kotlin.comparisons.thenByDescending' call
  var this_0 = new sam$kotlin_Comparator$0_7(tmp_0);
  var tmp_1 = GeminiModelFailover$orderImageModels$lambda_0(this_0);
  // Inline function 'kotlin.comparisons.thenBy' call
  var this_1 = new sam$kotlin_Comparator$0_7(tmp_1);
  var tmp_2 = GeminiModelFailover$orderImageModels$lambda_1(this_1);
  var tmp$ret$5 = new sam$kotlin_Comparator$0_7(tmp_2);
  return take(sortedWith(tmp, tmp$ret$5), 3);
};
protoOf(GeminiModelFailover).dj = function (code, body) {
  var tmp;
  switch (code) {
    case 404:
    case 408:
    case 429:
    case 500:
    case 502:
    case 503:
    case 504:
      tmp = true;
      break;
    case 400:
      // Inline function 'kotlin.text.lowercase' call

      // Inline function 'kotlin.js.asDynamic' call

      var tmp$ret$0 = body.toLowerCase();
      tmp = !contains_0(tmp$ret$0, 'api key');
      break;
    default:
      tmp = false;
      break;
  }
  return tmp;
};
var GeminiModelFailover_instance;
function GeminiModelFailover_getInstance() {
  if (GeminiModelFailover_instance == null)
    new GeminiModelFailover();
  return GeminiModelFailover_instance;
}
function ImageRequestParser() {
  ImageRequestParser_instance = this;
  this.ej_1 = 'image|picture|pic|photo|mosaic|artwork|illustration|portrait|drawing|painting|logo';
  this.fj_1 = Regex_init_$Create$('^(how|what|why|which|where|when|who|is|are|do|does|did|should|can i|could i)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.gj_1 = Regex_init_$Create$('^(please\\s+)?(draw|paint|sketch|illustrate|imagine)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.hj_1 = Regex_init_$Create$('\\b(create|make|generate|design|render)\\b(?:\\s+\\w+){0,2}?\\s+(?:a|an|new|some)\\s+(?:[\\w-]+\\s+){0,3}?(image|picture|pic|photo|mosaic|artwork|illustration|portrait|drawing|painting|logo)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.ij_1 = Regex_init_$Create$('^(?:please\\s+)?(?:create|make|generate|design|render)(?:\\s+(?:me|us))?\\s+(?:a|an|some)\\s+(.+)$', RegexOption_IGNORE_CASE_getInstance());
  this.jj_1 = Regex_init_$Create$('\\b(list|plan|guide|cart|csv|note|notes|summary|budget|table|backup|copy|export|report|schedule|comparison|estimate|order|wishlist)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.kj_1 = Regex_init_$Create$('\\b(create|generate)\\s+(image|picture|pic|photo|mosaic|artwork|illustration|portrait|drawing|painting|logo)s?\\b', RegexOption_IGNORE_CASE_getInstance());
}
protoOf(ImageRequestParser).lj = function (text) {
  // Inline function 'kotlin.text.trim' call
  var clean = toString_1(trim(isCharSequence(text) ? text : THROW_CCE()));
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(clean) === 0)
    return false;
  var canYouAsk = startsWith(clean, 'can you', true) || startsWith(clean, 'could you', true);
  if (!canYouAsk && this.fj_1.s6(clean))
    return false;
  // Inline function 'kotlin.text.replace' call
  var request = Regex_init_$Create$('^(can|could) you\\s+', RegexOption_IGNORE_CASE_getInstance()).v6(clean, '');
  var tmp0_safe_receiver = this.ij_1.u6(request);
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.t7();
  var directThing = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.k(1);
  return this.gj_1.s6(request) || (!(directThing == null) && !this.jj_1.s6(directThing)) || this.hj_1.s6(request) || this.kj_1.s6(request);
};
var ImageRequestParser_instance;
function ImageRequestParser_getInstance() {
  if (ImageRequestParser_instance == null)
    new ImageRequestParser();
  return ImageRequestParser_instance;
}
var static_init_called_4;
function static_init_4() {
  if (static_init_called_4)
    return Unit_instance;
  static_init_called_4 = true;
  AvailabilityTier_COMMON_instance = new AvailabilityTier('COMMON', 0, 'Common \xB7 Pick a Brick', 'Common');
  AvailabilityTier_UNCOMMON_instance = new AvailabilityTier('UNCOMMON', 1, 'Uncommon \xB7 Standard', 'Uncommon');
  AvailabilityTier_RARE_RETIRED_instance = new AvailabilityTier('RARE_RETIRED', 2, 'Rare / Retired', 'Rare');
}
var AvailabilityTier_COMMON_instance;
var AvailabilityTier_UNCOMMON_instance;
var AvailabilityTier_RARE_RETIRED_instance;
function AvailabilityTier(name, ordinal, label, shortLabel) {
  Enum.call(this, name, ordinal);
  this.gi_1 = label;
  this.hi_1 = shortLabel;
}
function BrickColor(id, officialName, hex, tier, priceMultiplier, inArtMosaicSets, inClassic1978, inMonochrome, inEarthBotanical, inPopArt) {
  this.wc_1 = id;
  this.xc_1 = officialName;
  this.yc_1 = hex;
  this.zc_1 = tier;
  this.ad_1 = priceMultiplier;
  this.bd_1 = inArtMosaicSets;
  this.cd_1 = inClassic1978;
  this.dd_1 = inMonochrome;
  this.ed_1 = inEarthBotanical;
  this.fd_1 = inPopArt;
  this.gd_1 = convertToInt(bitwiseAnd(shiftRight(this.yc_1, 16), new Long(255, 0)));
  this.hd_1 = convertToInt(bitwiseAnd(shiftRight(this.yc_1, 8), new Long(255, 0)));
  this.id_1 = convertToInt(bitwiseAnd(this.yc_1, new Long(255, 0)));
  var lab = rgbToLab(this.gd_1, this.hd_1, this.id_1);
  this.jd_1 = lab[0];
  this.kd_1 = lab[1];
  this.ld_1 = lab[2];
}
protoOf(BrickColor).toString = function () {
  return 'BrickColor(id=' + this.wc_1 + ', officialName=' + this.xc_1 + ', hex=' + this.yc_1.toString() + ', tier=' + this.zc_1.toString() + ', priceMultiplier=' + this.ad_1 + ', inArtMosaicSets=' + this.bd_1 + ', inClassic1978=' + this.cd_1 + ', inMonochrome=' + this.dd_1 + ', inEarthBotanical=' + this.ed_1 + ', inPopArt=' + this.fd_1 + ')';
};
protoOf(BrickColor).hashCode = function () {
  var result = this.wc_1;
  result = imul_0(result, 31) + getStringHashCode(this.xc_1) | 0;
  result = imul_0(result, 31) + this.yc_1.hashCode() | 0;
  result = imul_0(result, 31) + this.zc_1.hashCode() | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ad_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.bd_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.cd_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.dd_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.ed_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.fd_1) | 0;
  return result;
};
protoOf(BrickColor).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof BrickColor))
    return false;
  if (!(this.wc_1 === other.wc_1))
    return false;
  if (!(this.xc_1 === other.xc_1))
    return false;
  if (!equalsLong(this.yc_1, other.yc_1))
    return false;
  if (!this.zc_1.equals(other.zc_1))
    return false;
  if (!equals(this.ad_1, other.ad_1))
    return false;
  if (!(this.bd_1 === other.bd_1))
    return false;
  if (!(this.cd_1 === other.cd_1))
    return false;
  if (!(this.dd_1 === other.dd_1))
    return false;
  if (!(this.ed_1 === other.ed_1))
    return false;
  if (!(this.fd_1 === other.fd_1))
    return false;
  return true;
};
var static_init_called_5;
function static_init_5() {
  if (static_init_called_5)
    return Unit_instance;
  static_init_called_5 = true;
  PalettePreset_OFFICIAL_ACTIVE_instance = new PalettePreset('OFFICIAL_ACTIVE', 0, 'Official Active', 'All current production brick colors');
  PalettePreset_ART_MOSAIC_DOTS_instance = new PalettePreset('ART_MOSAIC_DOTS', 1, 'Art Mosaic Chart', 'Official 1x1 art mosaic palette');
  PalettePreset_PICK_A_BRICK_COMMON_instance = new PalettePreset('PICK_A_BRICK_COMMON', 2, 'Pick a Brick Common', 'Lowest cost, widely stocked colors');
  PalettePreset_FULL_ARCHIVE_WITH_RARE_instance = new PalettePreset('FULL_ARCHIVE_WITH_RARE', 3, 'Full Archive + Rare', 'Includes retired collector hues');
  PalettePreset_CLASSIC_RETRO_instance = new PalettePreset('CLASSIC_RETRO', 4, 'Classic Retro', 'Iconic bold primary brick colors');
  PalettePreset_MONOCHROME_STUDIO_instance = new PalettePreset('MONOCHROME_STUDIO', 5, 'Monochrome Studio', 'High-contrast grayscale & silver');
  PalettePreset_EARTH_BOTANICAL_instance = new PalettePreset('EARTH_BOTANICAL', 6, 'Earth & Botanical', 'Warm naturals, olive, sand & coral');
  PalettePreset_POP_ART_VIBRANT_instance = new PalettePreset('POP_ART_VIBRANT', 7, 'Pop Art Vibrant', 'Punchy graphic poster hues');
}
var PalettePreset_OFFICIAL_ACTIVE_instance;
var PalettePreset_ART_MOSAIC_DOTS_instance;
var PalettePreset_PICK_A_BRICK_COMMON_instance;
var PalettePreset_FULL_ARCHIVE_WITH_RARE_instance;
var PalettePreset_CLASSIC_RETRO_instance;
var PalettePreset_MONOCHROME_STUDIO_instance;
var PalettePreset_EARTH_BOTANICAL_instance;
var PalettePreset_POP_ART_VIBRANT_instance;
function values_1() {
  static_init_5();
  return [PalettePreset_OFFICIAL_ACTIVE_getInstance(), PalettePreset_ART_MOSAIC_DOTS_getInstance(), PalettePreset_PICK_A_BRICK_COMMON_getInstance(), PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance(), PalettePreset_CLASSIC_RETRO_getInstance(), PalettePreset_MONOCHROME_STUDIO_getInstance(), PalettePreset_EARTH_BOTANICAL_getInstance(), PalettePreset_POP_ART_VIBRANT_getInstance()];
}
function get_entries_1() {
  static_init_5();
  if ($ENTRIES_1 == null)
    $ENTRIES_1 = enumEntries(values_1());
  return $ENTRIES_1;
}
var $ENTRIES_1;
function PalettePreset(name, ordinal, title, subtitle) {
  Enum.call(this, name, ordinal);
  this.oj_1 = title;
  this.pj_1 = subtitle;
}
var static_init_called_6;
function static_init_6() {
  if (static_init_called_6)
    return Unit_instance;
  static_init_called_6 = true;
  BrickPartType_ROUND_TILE_1X1_instance = new BrickPartType('ROUND_TILE_1X1', 0, '98138', 'Tile, Round 1x1', '1x1 Rd Tile', 1, 1, 1, false, true, false, 0.05, 0.03);
  BrickPartType_ROUND_PLATE_1X1_instance = new BrickPartType('ROUND_PLATE_1X1', 1, '4073', 'Plate, Round 1x1', '1x1 Rd Plate', 1, 1, 1, true, true, false, 0.05, 0.03);
  BrickPartType_PLATE_1X1_instance = new BrickPartType('PLATE_1X1', 2, '3024', 'Plate 1x1', '1x1 Plate', 1, 1, 1, true, false, false, 0.06, 0.04);
  BrickPartType_TILE_1X1_instance = new BrickPartType('TILE_1X1', 3, '3070b', 'Tile 1x1', '1x1 Tile', 1, 1, 1, false, false, false, 0.07, 0.05);
  BrickPartType_PLATE_1X2_instance = new BrickPartType('PLATE_1X2', 4, '3023', 'Plate 1x2', '1x2 Plate', 2, 1, 1, true, false, false, 0.07, 0.05);
  BrickPartType_PLATE_2X2_instance = new BrickPartType('PLATE_2X2', 5, '3022', 'Plate 2x2', '2x2 Plate', 2, 2, 1, true, false, false, 0.09, 0.06);
  BrickPartType_PLATE_1X4_instance = new BrickPartType('PLATE_1X4', 6, '3710', 'Plate 1x4', '1x4 Plate', 4, 1, 1, true, false, false, 0.11, 0.07);
  BrickPartType_PLATE_2X4_instance = new BrickPartType('PLATE_2X4', 7, '3020', 'Plate 2x4', '2x4 Plate', 4, 2, 1, true, false, false, 0.17, 0.11);
  BrickPartType_BRICK_1X1_instance = new BrickPartType('BRICK_1X1', 8, '3005', 'Brick 1x1', '1x1 Brick', 1, 1, 3, true, false, false, 0.08, 0.05);
  BrickPartType_BRICK_1X2_instance = new BrickPartType('BRICK_1X2', 9, '3004', 'Brick 1x2', '1x2 Brick', 2, 1, 3, true, false, false, 0.11, 0.07);
  BrickPartType_BRICK_1X3_instance = new BrickPartType('BRICK_1X3', 10, '3622', 'Brick 1x3', '1x3 Brick', 3, 1, 3, true, false, false, 0.14, 0.09);
  BrickPartType_BRICK_1X4_instance = new BrickPartType('BRICK_1X4', 11, '3010', 'Brick 1x4', '1x4 Brick', 4, 1, 3, true, false, false, 0.17, 0.11);
  BrickPartType_TECHNIC_FRAME_16X16_instance = new BrickPartType('TECHNIC_FRAME_16X16', 12, '65803', 'Technic Mosaic Frame 16x16', '16x16 Frame', 16, 16, 4, true, false, true, 3.85, 3.25);
  BrickPartType_BASEPLATE_32X32_instance = new BrickPartType('BASEPLATE_32X32', 13, '3811', 'Baseplate 32x32', '32x32 Base', 32, 32, 1, true, false, true, 7.99, 6.45);
  BrickPartType_TECHNIC_PIN_instance = new BrickPartType('TECHNIC_PIN', 14, '2780', 'Technic Pin w/ Friction', 'Technic Pin', 1, 1, 1, false, true, true, 0.04, 0.02);
}
var BrickPartType_ROUND_TILE_1X1_instance;
var BrickPartType_ROUND_PLATE_1X1_instance;
var BrickPartType_PLATE_1X1_instance;
var BrickPartType_TILE_1X1_instance;
var BrickPartType_PLATE_1X2_instance;
var BrickPartType_PLATE_2X2_instance;
var BrickPartType_PLATE_1X4_instance;
var BrickPartType_PLATE_2X4_instance;
var BrickPartType_BRICK_1X1_instance;
var BrickPartType_BRICK_1X2_instance;
var BrickPartType_BRICK_1X3_instance;
var BrickPartType_BRICK_1X4_instance;
var BrickPartType_TECHNIC_FRAME_16X16_instance;
var BrickPartType_BASEPLATE_32X32_instance;
var BrickPartType_TECHNIC_PIN_instance;
function BrickPartType(name, ordinal, partNumber, displayName, shortName, widthStuds, heightStuds, heightInPlates, hasStuds, isRound, isStructural, basePabUsd, baseBlUsd) {
  Enum.call(this, name, ordinal);
  this.zb_1 = partNumber;
  this.ac_1 = displayName;
  this.bc_1 = shortName;
  this.cc_1 = widthStuds;
  this.dc_1 = heightStuds;
  this.ec_1 = heightInPlates;
  this.fc_1 = hasStuds;
  this.gc_1 = isRound;
  this.hc_1 = isStructural;
  this.ic_1 = basePabUsd;
  this.jc_1 = baseBlUsd;
}
var static_init_called_7;
function static_init_7() {
  if (static_init_called_7)
    return Unit_instance;
  static_init_called_7 = true;
  BuildStyle_ROUND_TILES_ART_instance = new BuildStyle('ROUND_TILES_ART', 0, '1x1 Round Tiles', 'Round Tiles', 'Smooth official Art mosaic finish using 98138 round tiles', BrickPartType_ROUND_TILE_1X1_getInstance());
  BuildStyle_ROUND_PLATES_STUDS_instance = new BuildStyle('ROUND_PLATES_STUDS', 1, '1x1 Round Plates', 'Round Studs', 'Classic studded texture using 4073 round plates', BrickPartType_ROUND_PLATE_1X1_getInstance());
  BuildStyle_OPTIMIZED_MULTI_PLATE_instance = new BuildStyle('OPTIMIZED_MULTI_PLATE', 2, 'Smart Multi-Plate', 'Multi-Plate', 'Merges 1x2, 2x2, 1x4 & 2x4 plates to lower cost and add stiffness', BrickPartType_PLATE_1X1_getInstance());
  BuildStyle_STACKED_BRICK_WALL_instance = new BuildStyle('STACKED_BRICK_WALL', 3, 'Stacked Brick Wall', 'Brick Wall', 'Side-view interlocked 1x1\u20131x4 bricks with running-bond seams', BrickPartType_BRICK_1X1_getInstance());
}
var BuildStyle_ROUND_TILES_ART_instance;
var BuildStyle_ROUND_PLATES_STUDS_instance;
var BuildStyle_OPTIMIZED_MULTI_PLATE_instance;
var BuildStyle_STACKED_BRICK_WALL_instance;
function values_2() {
  static_init_7();
  return [BuildStyle_ROUND_TILES_ART_getInstance(), BuildStyle_ROUND_PLATES_STUDS_getInstance(), BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance(), BuildStyle_STACKED_BRICK_WALL_getInstance()];
}
function get_entries_2() {
  static_init_7();
  if ($ENTRIES_2 == null)
    $ENTRIES_2 = enumEntries(values_2());
  return $ENTRIES_2;
}
var $ENTRIES_2;
function BuildStyle(name, ordinal, title, shortTitle, description, primaryPart) {
  Enum.call(this, name, ordinal);
  this.wf_1 = title;
  this.xf_1 = shortTitle;
  this.yf_1 = description;
  this.zf_1 = primaryPart;
}
var static_init_called_8;
function static_init_8() {
  if (static_init_called_8)
    return Unit_instance;
  static_init_called_8 = true;
  BackingSystem_TECHNIC_FRAMES_16X16_instance = new BackingSystem('TECHNIC_FRAMES_16X16', 0, '16x16 Technic Frames', '16x16 Frames', 'Modular 65803 frames joined legally with 2780 Technic pins');
  BackingSystem_BASEPLATES_32X32_instance = new BackingSystem('BASEPLATES_32X32', 1, '32x32 Baseplates', 'Baseplates', 'Classic thin 3811 baseplates for flat framing');
  BackingSystem_SELF_SUPPORTING_WALL_instance = new BackingSystem('SELF_SUPPORTING_WALL', 2, 'Interlocked Wall', 'Brick Wall', 'Self-supporting vertical running-bond brick courses');
}
var BackingSystem_TECHNIC_FRAMES_16X16_instance;
var BackingSystem_BASEPLATES_32X32_instance;
var BackingSystem_SELF_SUPPORTING_WALL_instance;
function values_3() {
  static_init_8();
  return [BackingSystem_TECHNIC_FRAMES_16X16_getInstance(), BackingSystem_BASEPLATES_32X32_getInstance(), BackingSystem_SELF_SUPPORTING_WALL_getInstance()];
}
function get_entries_3() {
  static_init_8();
  if ($ENTRIES_3 == null)
    $ENTRIES_3 = enumEntries(values_3());
  return $ENTRIES_3;
}
var $ENTRIES_3;
function BackingSystem(name, ordinal, title, shortTitle, description) {
  Enum.call(this, name, ordinal);
  this.mi_1 = title;
  this.ni_1 = shortTitle;
  this.oi_1 = description;
}
var static_init_called_9;
function static_init_9() {
  if (static_init_called_9)
    return Unit_instance;
  static_init_called_9 = true;
  RarityPreference_COMMON_ONLY_instance = new RarityPreference('COMMON_ONLY', 0, 'Common Only', 'Common', 'Only active Pick a Brick colors \u2014 lowest price & easiest sourcing');
  RarityPreference_PREFER_COMMON_instance = new RarityPreference('PREFER_COMMON', 1, 'Balanced', 'Balanced', 'Prioritizes common parts; uses uncommon hues only when needed');
  RarityPreference_ALLOW_RARE_instance = new RarityPreference('ALLOW_RARE', 2, 'Exact + Collector', 'All Colors', 'Allows rare & retired colors for max accuracy; flags price spikes');
}
var RarityPreference_COMMON_ONLY_instance;
var RarityPreference_PREFER_COMMON_instance;
var RarityPreference_ALLOW_RARE_instance;
function values_4() {
  static_init_9();
  return [RarityPreference_COMMON_ONLY_getInstance(), RarityPreference_PREFER_COMMON_getInstance(), RarityPreference_ALLOW_RARE_getInstance()];
}
function get_entries_4() {
  static_init_9();
  if ($ENTRIES_4 == null)
    $ENTRIES_4 = enumEntries(values_4());
  return $ENTRIES_4;
}
var $ENTRIES_4;
function RarityPreference(name, ordinal, title, shortLabel, description) {
  Enum.call(this, name, ordinal);
  this.sj_1 = title;
  this.tj_1 = shortLabel;
  this.uj_1 = description;
}
function BrickCatalog() {
  BrickCatalog_instance = this;
  this.of_1 = listOf_0([new BrickColor(1, 'White', new Long(-723724, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, true, true, true), new BrickColor(11, 'Black', new Long(-14996940, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, true, true, true), new BrickColor(86, 'Light Bluish Gray', new Long(-6249047, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, true, false, false), new BrickColor(85, 'Dark Bluish Gray', new Long(-9671064, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, true, true, false, false), new BrickColor(5, 'Bright Red', new Long(-3597815, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, false, false, true), new BrickColor(3, 'Bright Yellow', new Long(-864969, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, false, false, true), new BrickColor(7, 'Bright Blue', new Long(-16755265, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, false, false, true), new BrickColor(6, 'Bright Green', new Long(-14452671, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, true, false, true, false), new BrickColor(4, 'Bright Orange', new Long(-95720, 0), AvailabilityTier_COMMON_getInstance(), 1.1, true, false, false, false, true), new BrickColor(2, 'Tan', new Long(-1782370, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, false, false, true, false), new BrickColor(88, 'Reddish Brown', new Long(-10999278, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, false, false, true, false), new BrickColor(34, 'Lime', new Long(-4462325, 0), AvailabilityTier_COMMON_getInstance(), 1.1, true, false, false, true, true), new BrickColor(156, 'Medium Azure', new Long(-13193537, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, false, true), new BrickColor(63, 'Dark Blue', new Long(-16108445, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, false, true), new BrickColor(59, 'Dark Red', new Long(-9302513, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(69, 'Dark Tan', new Long(-6976909, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(80, 'Dark Green', new Long(-15186382, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(110, 'Bright Light Orange', new Long(-476355, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, true), new BrickColor(150, 'Medium Nougat', new Long(-3379158, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(120, 'Dark Brown', new Long(-13295360, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(42, 'Medium Blue', new Long(-10841125, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, false, true), new BrickColor(71, 'Magenta', new Long(-7194248, 0), AvailabilityTier_COMMON_getInstance(), 1.2, true, false, false, false, true), new BrickColor(104, 'Bright Pink', new Long(-1790520, 0), AvailabilityTier_COMMON_getInstance(), 1.2, true, false, false, false, true), new BrickColor(89, 'Dark Purple', new Long(-12634479, 0), AvailabilityTier_COMMON_getInstance(), 1.2, true, false, false, false, true), new BrickColor(39, 'Dark Turquoise', new Long(-16740453, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, true, true), new BrickColor(220, 'Coral', new Long(-38513, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.8, true, false, false, true, true), new BrickColor(153, 'Dark Azure', new Long(-16282679, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.6, true, false, false, false, true), new BrickColor(105, 'Bright Light Blue', new Long(-6306839, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.65, true, false, false, false, true), new BrickColor(103, 'Bright Light Yellow', new Long(-4038, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.65, true, false, false, false, true), new BrickColor(48, 'Sand Green', new Long(-6243156, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.85, true, false, false, true, false), new BrickColor(55, 'Sand Blue', new Long(-10455903, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.85, true, false, false, true, false), new BrickColor(155, 'Olive Green', new Long(-6579622, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.8, true, false, false, true, false), new BrickColor(154, 'Lavender', new Long(-1976851, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, false, true), new BrickColor(157, 'Medium Lavender', new Long(-5474118, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, false, true), new BrickColor(152, 'Light Aqua', new Long(-5389376, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.8, true, false, false, true, false), new BrickColor(28, 'Nougat', new Long(-3108504, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.85, true, false, false, true, false), new BrickColor(90, 'Light Nougat', new Long(-600141, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.9, true, false, false, true, false), new BrickColor(36, 'Bright Yellowish Green', new Long(-11821238, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.6, true, false, false, true, false), new BrickColor(115, 'Pearl Gold', new Long(-5603538, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.95, true, false, false, true, false), new BrickColor(95, 'Flat Silver', new Long(-7764088, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.7, false, false, true, false, false), new BrickColor(68, 'Dark Orange', new Long(-5679872, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, true, false), new BrickColor(47, 'Dark Pink', new Long(-3641184, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, false, true), new BrickColor(54, 'Sand Purple', new Long(-8102268, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 9.5, false, false, false, false, false), new BrickColor(72, 'Maersk Blue', new Long(-13266237, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 11.2, false, false, false, false, false), new BrickColor(25, 'Salmon', new Long(-888738, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 8.4, false, false, false, false, false), new BrickColor(73, 'Medium Violet', new Long(-7106076, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 7.8, false, false, false, false, false), new BrickColor(21, 'Chrome Gold', new Long(-4479683, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 16.5, false, false, false, false, false), new BrickColor(99, 'Very Light Bluish Gray', new Long(-1645600, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 6.2, false, false, true, false, false)]);
  var tmp = this;
  // Inline function 'kotlin.collections.associateBy' call
  var this_0 = this.of_1;
  var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
  // Inline function 'kotlin.collections.associateByTo' call
  var destination = LinkedHashMap_init_$Create$_0(capacity);
  var _iterator__ex2g4s = this_0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp$ret$2 = element.wc_1;
    destination.b2(tmp$ret$2, element);
  }
  tmp.pf_1 = destination;
  this.qf_1 = getValue(this.pf_1, 11);
  this.rf_1 = getValue(this.pf_1, 85);
  var tmp_0 = this;
  // Inline function 'kotlin.collections.buildSet' call
  // Inline function 'kotlin.collections.buildSetInternal' call
  // Inline function 'kotlin.apply' call
  var this_1 = LinkedHashSet_init_$Create$();
  var retiredRareIds = listOf_0([54, 72, 25, 73, 21, 99]);
  var _iterator__ex2g4s_0 = retiredRareIds.g();
  while (_iterator__ex2g4s_0.h()) {
    var cid = _iterator__ex2g4s_0.i();
    this_1.f(to(BrickPartType_ROUND_TILE_1X1_getInstance(), cid));
    this_1.f(to(BrickPartType_PLATE_2X4_getInstance(), cid));
    this_1.f(to(BrickPartType_PLATE_1X4_getInstance(), cid));
    this_1.f(to(BrickPartType_BRICK_1X3_getInstance(), cid));
    this_1.f(to(BrickPartType_BRICK_1X4_getInstance(), cid));
  }
  this_1.f(to(BrickPartType_TILE_1X1_getInstance(), 21));
  this_1.f(to(BrickPartType_PLATE_1X2_getInstance(), 21));
  this_1.f(to(BrickPartType_PLATE_2X2_getInstance(), 21));
  this_1.f(to(BrickPartType_BRICK_1X1_getInstance(), 21));
  this_1.f(to(BrickPartType_BRICK_1X2_getInstance(), 21));
  this_1.f(to(BrickPartType_PLATE_2X4_getInstance(), 220));
  this_1.f(to(BrickPartType_BRICK_1X3_getInstance(), 220));
  this_1.f(to(BrickPartType_PLATE_2X4_getInstance(), 154));
  this_1.f(to(BrickPartType_BRICK_1X3_getInstance(), 154));
  this_1.f(to(BrickPartType_PLATE_2X4_getInstance(), 152));
  this_1.f(to(BrickPartType_PLATE_2X4_getInstance(), 95));
  this_1.f(to(BrickPartType_BRICK_1X4_getInstance(), 95));
  this_1.f(to(BrickPartType_BRICK_1X3_getInstance(), 115));
  this_1.f(to(BrickPartType_PLATE_2X4_getInstance(), 90));
  tmp_0.sf_1 = this_1.k2();
}
protoOf(BrickCatalog).ag = function (part, colorId) {
  if (part.equals(BrickPartType_TECHNIC_FRAME_16X16_getInstance()))
    return colorId === 11;
  if (part.equals(BrickPartType_TECHNIC_PIN_getInstance()))
    return colorId === 11;
  if (part.equals(BrickPartType_BASEPLATE_32X32_getInstance()))
    return setOf_0([11, 86, 1, 6, 7, 2]).s(colorId);
  return !this.sf_1.s(to(part, colorId));
};
protoOf(BrickCatalog).tf = function (preset) {
  var tmp;
  switch (preset.a1_1) {
    case 0:
      // Inline function 'kotlin.collections.filter' call

      var tmp0 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (!element.zc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
          destination.f(element);
        }
      }

      tmp = destination;
      break;
    case 1:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_0 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_0 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_0 = tmp0_0.g();
      while (_iterator__ex2g4s_0.h()) {
        var element_0 = _iterator__ex2g4s_0.i();
        if (element_0.bd_1) {
          destination_0.f(element_0);
        }
      }

      tmp = destination_0;
      break;
    case 2:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_1 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_1 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_1 = tmp0_1.g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
        if (element_1.zc_1.equals(AvailabilityTier_COMMON_getInstance())) {
          destination_1.f(element_1);
        }
      }

      tmp = destination_1;
      break;
    case 3:
      tmp = this.of_1;
      break;
    case 4:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_2 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_2 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_2 = tmp0_2.g();
      while (_iterator__ex2g4s_2.h()) {
        var element_2 = _iterator__ex2g4s_2.i();
        if (element_2.cd_1) {
          destination_2.f(element_2);
        }
      }

      tmp = destination_2;
      break;
    case 5:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_3 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_3 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_3 = tmp0_3.g();
      while (_iterator__ex2g4s_3.h()) {
        var element_3 = _iterator__ex2g4s_3.i();
        if (element_3.dd_1 && !element_3.zc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
          destination_3.f(element_3);
        }
      }

      tmp = destination_3;
      break;
    case 6:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_4 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_4 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_4 = tmp0_4.g();
      while (_iterator__ex2g4s_4.h()) {
        var element_4 = _iterator__ex2g4s_4.i();
        if (element_4.ed_1) {
          destination_4.f(element_4);
        }
      }

      tmp = destination_4;
      break;
    case 7:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_5 = this.of_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_5 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_5 = tmp0_5.g();
      while (_iterator__ex2g4s_5.h()) {
        var element_5 = _iterator__ex2g4s_5.i();
        if (element_5.fd_1) {
          destination_5.f(element_5);
        }
      }

      tmp = destination_5;
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
};
protoOf(BrickCatalog).kg = function (part, color) {
  if (part.hc_1)
    return AvailabilityTier_COMMON_getInstance();
  if (!this.ag(part, color.wc_1))
    return AvailabilityTier_RARE_RETIRED_getInstance();
  if (color.zc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()))
    return AvailabilityTier_RARE_RETIRED_getInstance();
  if (color.zc_1.equals(AvailabilityTier_UNCOMMON_getInstance()) && imul_0(part.cc_1, part.dc_1) >= 4) {
    return AvailabilityTier_RARE_RETIRED_getInstance();
  }
  return color.zc_1;
};
protoOf(BrickCatalog).lg = function (part, color) {
  if (part.hc_1)
    return part.ic_1;
  var sizeFactor = color.zc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()) && imul_0(part.cc_1, part.dc_1) >= 2 ? 1.35 : 1.0;
  return coerceAtLeast_0(part.ic_1 * color.ad_1 * sizeFactor, 0.04);
};
protoOf(BrickCatalog).mg = function (part, color) {
  if (part.hc_1)
    return part.jc_1;
  var sizeFactor = color.zc_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()) && imul_0(part.cc_1, part.dc_1) >= 2 ? 1.45 : 1.0;
  return coerceAtLeast_0(part.jc_1 * color.ad_1 * sizeFactor, 0.02);
};
protoOf(BrickCatalog).bh = function (targetColor, part) {
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = this.of_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (!(element.wc_1 === targetColor.wc_1) && element.zc_1.equals(AvailabilityTier_COMMON_getInstance()) && BrickCatalog_getInstance().ag(part, element.wc_1)) {
      destination.f(element);
    }
  }
  var candidates = destination;
  var tmp$ret$3;
  $l$block_0: {
    // Inline function 'kotlin.collections.minByOrNull' call
    var iterator = candidates.g();
    if (!iterator.h()) {
      tmp$ret$3 = null;
      break $l$block_0;
    }
    var minElem = iterator.i();
    if (!iterator.h()) {
      tmp$ret$3 = minElem;
      break $l$block_0;
    }
    var it = minElem;
    var minValue = BrickCatalog_getInstance().jg(targetColor, it);
    do {
      var e = iterator.i();
      var v = BrickCatalog_getInstance().jg(targetColor, e);
      if (compareTo(minValue, v) > 0) {
        minElem = e;
        minValue = v;
      }
    }
     while (iterator.h());
    tmp$ret$3 = minElem;
  }
  var tmp0_elvis_lhs = tmp$ret$3;
  return tmp0_elvis_lhs == null ? this.qf_1 : tmp0_elvis_lhs;
};
protoOf(BrickCatalog).jg = function (c1, c2) {
  var dl = c1.jd_1 - c2.jd_1;
  var da = c1.kd_1 - c2.kd_1;
  var db = c1.ld_1 - c2.ld_1;
  // Inline function 'kotlin.math.sqrt' call
  var x = dl * dl + da * da + db * db;
  return Math.sqrt(x);
};
protoOf(BrickCatalog).ig = function (l1, a1, b1, color) {
  var dl = l1 - color.jd_1;
  var da = a1 - color.kd_1;
  var db = b1 - color.ld_1;
  // Inline function 'kotlin.math.sqrt' call
  var x = dl * dl + da * da + db * db;
  return Math.sqrt(x);
};
var BrickCatalog_instance;
function BrickCatalog_getInstance() {
  if (BrickCatalog_instance == null)
    new BrickCatalog();
  return BrickCatalog_instance;
}
function rgbToLab(r, g, b) {
  var sr = r / 255.0;
  var sg = g / 255.0;
  var sb = b / 255.0;
  var tmp;
  if (sr > 0.04045) {
    // Inline function 'kotlin.math.pow' call
    var this_0 = (sr + 0.055) / 1.055;
    tmp = Math.pow(this_0, 2.4);
  } else {
    tmp = sr / 12.92;
  }
  sr = tmp;
  var tmp_0;
  if (sg > 0.04045) {
    // Inline function 'kotlin.math.pow' call
    var this_1 = (sg + 0.055) / 1.055;
    tmp_0 = Math.pow(this_1, 2.4);
  } else {
    tmp_0 = sg / 12.92;
  }
  sg = tmp_0;
  var tmp_1;
  if (sb > 0.04045) {
    // Inline function 'kotlin.math.pow' call
    var this_2 = (sb + 0.055) / 1.055;
    tmp_1 = Math.pow(this_2, 2.4);
  } else {
    tmp_1 = sb / 12.92;
  }
  sb = tmp_1;
  var x = (sr * 0.4124564 + sg * 0.3575761 + sb * 0.1804375) / 0.95047;
  var y = (sr * 0.2126729 + sg * 0.7151522 + sb * 0.072175) / 1.0;
  var z = (sr * 0.0193339 + sg * 0.119192 + sb * 0.9503041) / 1.08883;
  var fx = rgbToLab$f(x);
  var fy = rgbToLab$f(y);
  var fz = rgbToLab$f(z);
  var l = 116.0 * fy - 16.0;
  var a = 500.0 * (fx - fy);
  var bb = 200.0 * (fy - fz);
  // Inline function 'kotlin.floatArrayOf' call
  return new Float32Array([l, a, bb]);
}
function rgbToLab$f(t) {
  var tmp;
  if (t > 0.008856) {
    // Inline function 'kotlin.math.cbrt' call
    tmp = Math.cbrt(t);
  } else {
    tmp = 7.787 * t + 16.0 / 116.0;
  }
  return tmp;
}
function AvailabilityTier_COMMON_getInstance() {
  static_init_4();
  return AvailabilityTier_COMMON_instance;
}
function AvailabilityTier_UNCOMMON_getInstance() {
  static_init_4();
  return AvailabilityTier_UNCOMMON_instance;
}
function AvailabilityTier_RARE_RETIRED_getInstance() {
  static_init_4();
  return AvailabilityTier_RARE_RETIRED_instance;
}
function PalettePreset_OFFICIAL_ACTIVE_getInstance() {
  static_init_5();
  return PalettePreset_OFFICIAL_ACTIVE_instance;
}
function PalettePreset_ART_MOSAIC_DOTS_getInstance() {
  static_init_5();
  return PalettePreset_ART_MOSAIC_DOTS_instance;
}
function PalettePreset_PICK_A_BRICK_COMMON_getInstance() {
  static_init_5();
  return PalettePreset_PICK_A_BRICK_COMMON_instance;
}
function PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance() {
  static_init_5();
  return PalettePreset_FULL_ARCHIVE_WITH_RARE_instance;
}
function PalettePreset_CLASSIC_RETRO_getInstance() {
  static_init_5();
  return PalettePreset_CLASSIC_RETRO_instance;
}
function PalettePreset_MONOCHROME_STUDIO_getInstance() {
  static_init_5();
  return PalettePreset_MONOCHROME_STUDIO_instance;
}
function PalettePreset_EARTH_BOTANICAL_getInstance() {
  static_init_5();
  return PalettePreset_EARTH_BOTANICAL_instance;
}
function PalettePreset_POP_ART_VIBRANT_getInstance() {
  static_init_5();
  return PalettePreset_POP_ART_VIBRANT_instance;
}
function BrickPartType_ROUND_TILE_1X1_getInstance() {
  static_init_6();
  return BrickPartType_ROUND_TILE_1X1_instance;
}
function BrickPartType_ROUND_PLATE_1X1_getInstance() {
  static_init_6();
  return BrickPartType_ROUND_PLATE_1X1_instance;
}
function BrickPartType_PLATE_1X1_getInstance() {
  static_init_6();
  return BrickPartType_PLATE_1X1_instance;
}
function BrickPartType_TILE_1X1_getInstance() {
  static_init_6();
  return BrickPartType_TILE_1X1_instance;
}
function BrickPartType_PLATE_1X2_getInstance() {
  static_init_6();
  return BrickPartType_PLATE_1X2_instance;
}
function BrickPartType_PLATE_2X2_getInstance() {
  static_init_6();
  return BrickPartType_PLATE_2X2_instance;
}
function BrickPartType_PLATE_1X4_getInstance() {
  static_init_6();
  return BrickPartType_PLATE_1X4_instance;
}
function BrickPartType_PLATE_2X4_getInstance() {
  static_init_6();
  return BrickPartType_PLATE_2X4_instance;
}
function BrickPartType_BRICK_1X1_getInstance() {
  static_init_6();
  return BrickPartType_BRICK_1X1_instance;
}
function BrickPartType_BRICK_1X2_getInstance() {
  static_init_6();
  return BrickPartType_BRICK_1X2_instance;
}
function BrickPartType_BRICK_1X3_getInstance() {
  static_init_6();
  return BrickPartType_BRICK_1X3_instance;
}
function BrickPartType_BRICK_1X4_getInstance() {
  static_init_6();
  return BrickPartType_BRICK_1X4_instance;
}
function BrickPartType_TECHNIC_FRAME_16X16_getInstance() {
  static_init_6();
  return BrickPartType_TECHNIC_FRAME_16X16_instance;
}
function BrickPartType_BASEPLATE_32X32_getInstance() {
  static_init_6();
  return BrickPartType_BASEPLATE_32X32_instance;
}
function BrickPartType_TECHNIC_PIN_getInstance() {
  static_init_6();
  return BrickPartType_TECHNIC_PIN_instance;
}
function BuildStyle_ROUND_TILES_ART_getInstance() {
  static_init_7();
  return BuildStyle_ROUND_TILES_ART_instance;
}
function BuildStyle_ROUND_PLATES_STUDS_getInstance() {
  static_init_7();
  return BuildStyle_ROUND_PLATES_STUDS_instance;
}
function BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance() {
  static_init_7();
  return BuildStyle_OPTIMIZED_MULTI_PLATE_instance;
}
function BuildStyle_STACKED_BRICK_WALL_getInstance() {
  static_init_7();
  return BuildStyle_STACKED_BRICK_WALL_instance;
}
function BackingSystem_TECHNIC_FRAMES_16X16_getInstance() {
  static_init_8();
  return BackingSystem_TECHNIC_FRAMES_16X16_instance;
}
function BackingSystem_BASEPLATES_32X32_getInstance() {
  static_init_8();
  return BackingSystem_BASEPLATES_32X32_instance;
}
function BackingSystem_SELF_SUPPORTING_WALL_getInstance() {
  static_init_8();
  return BackingSystem_SELF_SUPPORTING_WALL_instance;
}
function RarityPreference_COMMON_ONLY_getInstance() {
  static_init_9();
  return RarityPreference_COMMON_ONLY_instance;
}
function RarityPreference_PREFER_COMMON_getInstance() {
  static_init_9();
  return RarityPreference_PREFER_COMMON_instance;
}
function RarityPreference_ALLOW_RARE_getInstance() {
  static_init_9();
  return RarityPreference_ALLOW_RARE_instance;
}
function Companion_10() {
  Companion_instance_10 = this;
  this.vj_1 = listOf_0([new SizePreset('16\xD716', 16, 16, 'Mini'), new SizePreset('24\xD724', 24, 24, 'Compact'), new SizePreset('32\xD732', 32, 32, 'Standard'), new SizePreset('48\xD748', 48, 48, 'Art Wall'), new SizePreset('32\xD748', 32, 48, 'Portrait'), new SizePreset('48\xD732', 48, 32, 'Wide'), new SizePreset('64\xD764', 64, 64, 'Gallery')]);
}
var Companion_instance_10;
function Companion_getInstance_10() {
  if (Companion_instance_10 == null)
    new Companion_10();
  return Companion_instance_10;
}
function SizePreset(label, widthStuds, heightStuds, tag) {
  Companion_getInstance_10();
  this.wj_1 = label;
  this.xj_1 = widthStuds;
  this.yj_1 = heightStuds;
  this.zj_1 = tag;
}
protoOf(SizePreset).toString = function () {
  return 'SizePreset(label=' + this.wj_1 + ', widthStuds=' + this.xj_1 + ', heightStuds=' + this.yj_1 + ', tag=' + this.zj_1 + ')';
};
protoOf(SizePreset).hashCode = function () {
  var result = getStringHashCode(this.wj_1);
  result = imul_0(result, 31) + this.xj_1 | 0;
  result = imul_0(result, 31) + this.yj_1 | 0;
  result = imul_0(result, 31) + getStringHashCode(this.zj_1) | 0;
  return result;
};
protoOf(SizePreset).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof SizePreset))
    return false;
  if (!(this.wj_1 === other.wj_1))
    return false;
  if (!(this.xj_1 === other.xj_1))
    return false;
  if (!(this.yj_1 === other.yj_1))
    return false;
  if (!(this.zj_1 === other.zj_1))
    return false;
  return true;
};
function MosaicConfig(widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation) {
  widthStuds = widthStuds === VOID ? 32 : widthStuds;
  heightStuds = heightStuds === VOID ? 32 : heightStuds;
  lockAspectRatio = lockAspectRatio === VOID ? true : lockAspectRatio;
  buildStyle = buildStyle === VOID ? BuildStyle_ROUND_TILES_ART_getInstance() : buildStyle;
  backingSystem = backingSystem === VOID ? BackingSystem_TECHNIC_FRAMES_16X16_getInstance() : backingSystem;
  palettePreset = palettePreset === VOID ? PalettePreset_OFFICIAL_ACTIVE_getInstance() : palettePreset;
  disabledColorIds = disabledColorIds === VOID ? emptySet() : disabledColorIds;
  forcedColorSwaps = forcedColorSwaps === VOID ? emptyMap() : forcedColorSwaps;
  colorTolerance = colorTolerance === VOID ? 8.0 : colorTolerance;
  ditheringEnabled = ditheringEnabled === VOID ? true : ditheringEnabled;
  rarityPreference = rarityPreference === VOID ? RarityPreference_PREFER_COMMON_getInstance() : rarityPreference;
  enforceLegalConnections = enforceLegalConnections === VOID ? true : enforceLegalConnections;
  brightness = brightness === VOID ? 0.0 : brightness;
  contrast = contrast === VOID ? 1.08 : contrast;
  saturation = saturation === VOID ? 1.12 : saturation;
  this.ne_1 = widthStuds;
  this.oe_1 = heightStuds;
  this.pe_1 = lockAspectRatio;
  this.qe_1 = buildStyle;
  this.re_1 = backingSystem;
  this.se_1 = palettePreset;
  this.te_1 = disabledColorIds;
  this.ue_1 = forcedColorSwaps;
  this.ve_1 = colorTolerance;
  this.we_1 = ditheringEnabled;
  this.xe_1 = rarityPreference;
  this.ye_1 = enforceLegalConnections;
  this.ze_1 = brightness;
  this.af_1 = contrast;
  this.bf_1 = saturation;
}
protoOf(MosaicConfig).ak = function (widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation) {
  return new MosaicConfig(widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation);
};
protoOf(MosaicConfig).th = function (widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation, $super) {
  widthStuds = widthStuds === VOID ? this.ne_1 : widthStuds;
  heightStuds = heightStuds === VOID ? this.oe_1 : heightStuds;
  lockAspectRatio = lockAspectRatio === VOID ? this.pe_1 : lockAspectRatio;
  buildStyle = buildStyle === VOID ? this.qe_1 : buildStyle;
  backingSystem = backingSystem === VOID ? this.re_1 : backingSystem;
  palettePreset = palettePreset === VOID ? this.se_1 : palettePreset;
  disabledColorIds = disabledColorIds === VOID ? this.te_1 : disabledColorIds;
  forcedColorSwaps = forcedColorSwaps === VOID ? this.ue_1 : forcedColorSwaps;
  colorTolerance = colorTolerance === VOID ? this.ve_1 : colorTolerance;
  ditheringEnabled = ditheringEnabled === VOID ? this.we_1 : ditheringEnabled;
  rarityPreference = rarityPreference === VOID ? this.xe_1 : rarityPreference;
  enforceLegalConnections = enforceLegalConnections === VOID ? this.ye_1 : enforceLegalConnections;
  brightness = brightness === VOID ? this.ze_1 : brightness;
  contrast = contrast === VOID ? this.af_1 : contrast;
  saturation = saturation === VOID ? this.bf_1 : saturation;
  return $super === VOID ? this.ak(widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation) : $super.ak.call(this, widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation);
};
protoOf(MosaicConfig).toString = function () {
  return 'MosaicConfig(widthStuds=' + this.ne_1 + ', heightStuds=' + this.oe_1 + ', lockAspectRatio=' + this.pe_1 + ', buildStyle=' + this.qe_1.toString() + ', backingSystem=' + this.re_1.toString() + ', palettePreset=' + this.se_1.toString() + ', disabledColorIds=' + toString_1(this.te_1) + ', forcedColorSwaps=' + toString_1(this.ue_1) + ', colorTolerance=' + this.ve_1 + ', ditheringEnabled=' + this.we_1 + ', rarityPreference=' + this.xe_1.toString() + ', enforceLegalConnections=' + this.ye_1 + ', brightness=' + this.ze_1 + ', contrast=' + this.af_1 + ', saturation=' + this.bf_1 + ')';
};
protoOf(MosaicConfig).hashCode = function () {
  var result = this.ne_1;
  result = imul_0(result, 31) + this.oe_1 | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.pe_1) | 0;
  result = imul_0(result, 31) + this.qe_1.hashCode() | 0;
  result = imul_0(result, 31) + this.re_1.hashCode() | 0;
  result = imul_0(result, 31) + this.se_1.hashCode() | 0;
  result = imul_0(result, 31) + hashCode_0(this.te_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.ue_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ve_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.we_1) | 0;
  result = imul_0(result, 31) + this.xe_1.hashCode() | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.ye_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ze_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.af_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.bf_1) | 0;
  return result;
};
protoOf(MosaicConfig).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MosaicConfig))
    return false;
  if (!(this.ne_1 === other.ne_1))
    return false;
  if (!(this.oe_1 === other.oe_1))
    return false;
  if (!(this.pe_1 === other.pe_1))
    return false;
  if (!this.qe_1.equals(other.qe_1))
    return false;
  if (!this.re_1.equals(other.re_1))
    return false;
  if (!this.se_1.equals(other.se_1))
    return false;
  if (!equals(this.te_1, other.te_1))
    return false;
  if (!equals(this.ue_1, other.ue_1))
    return false;
  if (!equals(this.ve_1, other.ve_1))
    return false;
  if (!(this.we_1 === other.we_1))
    return false;
  if (!this.xe_1.equals(other.xe_1))
    return false;
  if (!(this.ye_1 === other.ye_1))
    return false;
  if (!equals(this.ze_1, other.ze_1))
    return false;
  if (!equals(this.af_1, other.af_1))
    return false;
  if (!equals(this.bf_1, other.bf_1))
    return false;
  return true;
};
function PlacedPiece(id, part, color, x, y, width, height, layer, moduleCol, moduleRow, rarityTier, isColorLegal, pabUnitPrice, blUnitPrice) {
  this.ng_1 = id;
  this.og_1 = part;
  this.pg_1 = color;
  this.qg_1 = x;
  this.rg_1 = y;
  this.sg_1 = width;
  this.tg_1 = height;
  this.ug_1 = layer;
  this.vg_1 = moduleCol;
  this.wg_1 = moduleRow;
  this.xg_1 = rarityTier;
  this.yg_1 = isColorLegal;
  this.zg_1 = pabUnitPrice;
  this.ah_1 = blUnitPrice;
}
protoOf(PlacedPiece).toString = function () {
  return 'PlacedPiece(id=' + this.ng_1 + ', part=' + this.og_1.toString() + ', color=' + this.pg_1.toString() + ', x=' + this.qg_1 + ', y=' + this.rg_1 + ', width=' + this.sg_1 + ', height=' + this.tg_1 + ', layer=' + this.ug_1 + ', moduleCol=' + this.vg_1 + ', moduleRow=' + this.wg_1 + ', rarityTier=' + this.xg_1.toString() + ', isColorLegal=' + this.yg_1 + ', pabUnitPrice=' + this.zg_1 + ', blUnitPrice=' + this.ah_1 + ')';
};
protoOf(PlacedPiece).hashCode = function () {
  var result = this.ng_1;
  result = imul_0(result, 31) + this.og_1.hashCode() | 0;
  result = imul_0(result, 31) + this.pg_1.hashCode() | 0;
  result = imul_0(result, 31) + this.qg_1 | 0;
  result = imul_0(result, 31) + this.rg_1 | 0;
  result = imul_0(result, 31) + this.sg_1 | 0;
  result = imul_0(result, 31) + this.tg_1 | 0;
  result = imul_0(result, 31) + this.ug_1 | 0;
  result = imul_0(result, 31) + this.vg_1 | 0;
  result = imul_0(result, 31) + this.wg_1 | 0;
  result = imul_0(result, 31) + this.xg_1.hashCode() | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.yg_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.zg_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ah_1) | 0;
  return result;
};
protoOf(PlacedPiece).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof PlacedPiece))
    return false;
  if (!(this.ng_1 === other.ng_1))
    return false;
  if (!this.og_1.equals(other.og_1))
    return false;
  if (!this.pg_1.equals(other.pg_1))
    return false;
  if (!(this.qg_1 === other.qg_1))
    return false;
  if (!(this.rg_1 === other.rg_1))
    return false;
  if (!(this.sg_1 === other.sg_1))
    return false;
  if (!(this.tg_1 === other.tg_1))
    return false;
  if (!(this.ug_1 === other.ug_1))
    return false;
  if (!(this.vg_1 === other.vg_1))
    return false;
  if (!(this.wg_1 === other.wg_1))
    return false;
  if (!this.xg_1.equals(other.xg_1))
    return false;
  if (!(this.yg_1 === other.yg_1))
    return false;
  if (!equals(this.zg_1, other.zg_1))
    return false;
  if (!equals(this.ah_1, other.ah_1))
    return false;
  return true;
};
function TechnicPinConnection(xStud, yStud, isHorizontalSeam, part) {
  part = part === VOID ? BrickPartType_TECHNIC_PIN_getInstance() : part;
  this.bk_1 = xStud;
  this.ck_1 = yStud;
  this.dk_1 = isHorizontalSeam;
  this.ek_1 = part;
}
protoOf(TechnicPinConnection).toString = function () {
  return 'TechnicPinConnection(xStud=' + this.bk_1 + ', yStud=' + this.ck_1 + ', isHorizontalSeam=' + this.dk_1 + ', part=' + this.ek_1.toString() + ')';
};
protoOf(TechnicPinConnection).hashCode = function () {
  var result = getNumberHashCode(this.bk_1);
  result = imul_0(result, 31) + getNumberHashCode(this.ck_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.dk_1) | 0;
  result = imul_0(result, 31) + this.ek_1.hashCode() | 0;
  return result;
};
protoOf(TechnicPinConnection).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof TechnicPinConnection))
    return false;
  if (!equals(this.bk_1, other.bk_1))
    return false;
  if (!equals(this.ck_1, other.ck_1))
    return false;
  if (!(this.dk_1 === other.dk_1))
    return false;
  if (!this.ek_1.equals(other.ek_1))
    return false;
  return true;
};
var static_init_called_10;
function static_init_10() {
  if (static_init_called_10)
    return Unit_instance;
  static_init_called_10 = true;
  ValidationSeverity_PASS_instance = new ValidationSeverity('PASS', 0);
  ValidationSeverity_WARNING_instance = new ValidationSeverity('WARNING', 1);
  ValidationSeverity_ERROR_instance = new ValidationSeverity('ERROR', 2);
}
var ValidationSeverity_PASS_instance;
var ValidationSeverity_WARNING_instance;
var ValidationSeverity_ERROR_instance;
function ValidationSeverity(name, ordinal) {
  Enum.call(this, name, ordinal);
}
var static_init_called_11;
function static_init_11() {
  if (static_init_called_11)
    return Unit_instance;
  static_init_called_11 = true;
  ValidationCategory_FOUNDATION_instance = new ValidationCategory('FOUNDATION', 0, 'Foundation & Support');
  ValidationCategory_TECHNIC_JOINTS_instance = new ValidationCategory('TECHNIC_JOINTS', 1, 'Technic Pin Joints');
  ValidationCategory_SEAM_STAGGER_instance = new ValidationCategory('SEAM_STAGGER', 2, 'Seam Interlocking');
  ValidationCategory_COLLISION_TOLERANCE_instance = new ValidationCategory('COLLISION_TOLERANCE', 3, 'Geometry & Stress');
  ValidationCategory_COLOR_LEGALITY_instance = new ValidationCategory('COLOR_LEGALITY', 4, 'Official Mold & Color');
  ValidationCategory_RARITY_COST_instance = new ValidationCategory('RARITY_COST', 5, 'Rarity & Cost Impact');
}
var ValidationCategory_FOUNDATION_instance;
var ValidationCategory_TECHNIC_JOINTS_instance;
var ValidationCategory_SEAM_STAGGER_instance;
var ValidationCategory_COLLISION_TOLERANCE_instance;
var ValidationCategory_COLOR_LEGALITY_instance;
var ValidationCategory_RARITY_COST_instance;
function ValidationCategory(name, ordinal, label) {
  Enum.call(this, name, ordinal);
  this.hk_1 = label;
}
function ValidationIssue(id, severity, category, title, detail, affectedCount, canAutoFix, suggestedFixLabel, sourceColorId, suggestedColorId, estimatedSavingsUsd) {
  affectedCount = affectedCount === VOID ? 0 : affectedCount;
  canAutoFix = canAutoFix === VOID ? false : canAutoFix;
  suggestedFixLabel = suggestedFixLabel === VOID ? null : suggestedFixLabel;
  sourceColorId = sourceColorId === VOID ? null : sourceColorId;
  suggestedColorId = suggestedColorId === VOID ? null : suggestedColorId;
  estimatedSavingsUsd = estimatedSavingsUsd === VOID ? 0.0 : estimatedSavingsUsd;
  this.ch_1 = id;
  this.dh_1 = severity;
  this.eh_1 = category;
  this.fh_1 = title;
  this.gh_1 = detail;
  this.hh_1 = affectedCount;
  this.ih_1 = canAutoFix;
  this.jh_1 = suggestedFixLabel;
  this.kh_1 = sourceColorId;
  this.lh_1 = suggestedColorId;
  this.mh_1 = estimatedSavingsUsd;
}
protoOf(ValidationIssue).toString = function () {
  return 'ValidationIssue(id=' + this.ch_1 + ', severity=' + this.dh_1.toString() + ', category=' + this.eh_1.toString() + ', title=' + this.fh_1 + ', detail=' + this.gh_1 + ', affectedCount=' + this.hh_1 + ', canAutoFix=' + this.ih_1 + ', suggestedFixLabel=' + this.jh_1 + ', sourceColorId=' + this.kh_1 + ', suggestedColorId=' + this.lh_1 + ', estimatedSavingsUsd=' + this.mh_1 + ')';
};
protoOf(ValidationIssue).hashCode = function () {
  var result = getStringHashCode(this.ch_1);
  result = imul_0(result, 31) + this.dh_1.hashCode() | 0;
  result = imul_0(result, 31) + this.eh_1.hashCode() | 0;
  result = imul_0(result, 31) + getStringHashCode(this.fh_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.gh_1) | 0;
  result = imul_0(result, 31) + this.hh_1 | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.ih_1) | 0;
  result = imul_0(result, 31) + (this.jh_1 == null ? 0 : getStringHashCode(this.jh_1)) | 0;
  result = imul_0(result, 31) + (this.kh_1 == null ? 0 : this.kh_1) | 0;
  result = imul_0(result, 31) + (this.lh_1 == null ? 0 : this.lh_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.mh_1) | 0;
  return result;
};
protoOf(ValidationIssue).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ValidationIssue))
    return false;
  if (!(this.ch_1 === other.ch_1))
    return false;
  if (!this.dh_1.equals(other.dh_1))
    return false;
  if (!this.eh_1.equals(other.eh_1))
    return false;
  if (!(this.fh_1 === other.fh_1))
    return false;
  if (!(this.gh_1 === other.gh_1))
    return false;
  if (!(this.hh_1 === other.hh_1))
    return false;
  if (!(this.ih_1 === other.ih_1))
    return false;
  if (!(this.jh_1 == other.jh_1))
    return false;
  if (!(this.kh_1 == other.kh_1))
    return false;
  if (!(this.lh_1 == other.lh_1))
    return false;
  if (!equals(this.mh_1, other.mh_1))
    return false;
  return true;
};
function ValidationReport(isFullyLegal, scorePercent, checks, rarePieceCount, illegalPieceCount, weakSeamCount, technicPinCount, moduleCols, moduleRows) {
  this.pi_1 = isFullyLegal;
  this.qi_1 = scorePercent;
  this.ri_1 = checks;
  this.si_1 = rarePieceCount;
  this.ti_1 = illegalPieceCount;
  this.ui_1 = weakSeamCount;
  this.vi_1 = technicPinCount;
  this.wi_1 = moduleCols;
  this.xi_1 = moduleRows;
}
protoOf(ValidationReport).toString = function () {
  return 'ValidationReport(isFullyLegal=' + this.pi_1 + ', scorePercent=' + this.qi_1 + ', checks=' + toString_1(this.ri_1) + ', rarePieceCount=' + this.si_1 + ', illegalPieceCount=' + this.ti_1 + ', weakSeamCount=' + this.ui_1 + ', technicPinCount=' + this.vi_1 + ', moduleCols=' + this.wi_1 + ', moduleRows=' + this.xi_1 + ')';
};
protoOf(ValidationReport).hashCode = function () {
  var result = getBooleanHashCode(this.pi_1);
  result = imul_0(result, 31) + this.qi_1 | 0;
  result = imul_0(result, 31) + hashCode_0(this.ri_1) | 0;
  result = imul_0(result, 31) + this.si_1 | 0;
  result = imul_0(result, 31) + this.ti_1 | 0;
  result = imul_0(result, 31) + this.ui_1 | 0;
  result = imul_0(result, 31) + this.vi_1 | 0;
  result = imul_0(result, 31) + this.wi_1 | 0;
  result = imul_0(result, 31) + this.xi_1 | 0;
  return result;
};
protoOf(ValidationReport).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ValidationReport))
    return false;
  if (!(this.pi_1 === other.pi_1))
    return false;
  if (!(this.qi_1 === other.qi_1))
    return false;
  if (!equals(this.ri_1, other.ri_1))
    return false;
  if (!(this.si_1 === other.si_1))
    return false;
  if (!(this.ti_1 === other.ti_1))
    return false;
  if (!(this.ui_1 === other.ui_1))
    return false;
  if (!(this.vi_1 === other.vi_1))
    return false;
  if (!(this.wi_1 === other.wi_1))
    return false;
  if (!(this.xi_1 === other.xi_1))
    return false;
  return true;
};
function PartBomLine(part, color, quantity, rarityTier, isColorLegal, pabUnitPrice, blUnitPrice, pabLineTotal, blLineTotal, colorCodeNumber, alternativeColor, potentialSavingsUsd) {
  alternativeColor = alternativeColor === VOID ? null : alternativeColor;
  potentialSavingsUsd = potentialSavingsUsd === VOID ? 0.0 : potentialSavingsUsd;
  this.kc_1 = part;
  this.lc_1 = color;
  this.mc_1 = quantity;
  this.nc_1 = rarityTier;
  this.oc_1 = isColorLegal;
  this.pc_1 = pabUnitPrice;
  this.qc_1 = blUnitPrice;
  this.rc_1 = pabLineTotal;
  this.sc_1 = blLineTotal;
  this.tc_1 = colorCodeNumber;
  this.uc_1 = alternativeColor;
  this.vc_1 = potentialSavingsUsd;
}
protoOf(PartBomLine).di = function () {
  return this.kc_1.zb_1 + '_' + this.lc_1.wc_1;
};
protoOf(PartBomLine).toString = function () {
  return 'PartBomLine(part=' + this.kc_1.toString() + ', color=' + this.lc_1.toString() + ', quantity=' + this.mc_1 + ', rarityTier=' + this.nc_1.toString() + ', isColorLegal=' + this.oc_1 + ', pabUnitPrice=' + this.pc_1 + ', blUnitPrice=' + this.qc_1 + ', pabLineTotal=' + this.rc_1 + ', blLineTotal=' + this.sc_1 + ', colorCodeNumber=' + this.tc_1 + ', alternativeColor=' + toString_0(this.uc_1) + ', potentialSavingsUsd=' + this.vc_1 + ')';
};
protoOf(PartBomLine).hashCode = function () {
  var result = this.kc_1.hashCode();
  result = imul_0(result, 31) + this.lc_1.hashCode() | 0;
  result = imul_0(result, 31) + this.mc_1 | 0;
  result = imul_0(result, 31) + this.nc_1.hashCode() | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.oc_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.pc_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.qc_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.rc_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.sc_1) | 0;
  result = imul_0(result, 31) + this.tc_1 | 0;
  result = imul_0(result, 31) + (this.uc_1 == null ? 0 : this.uc_1.hashCode()) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.vc_1) | 0;
  return result;
};
protoOf(PartBomLine).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof PartBomLine))
    return false;
  if (!this.kc_1.equals(other.kc_1))
    return false;
  if (!this.lc_1.equals(other.lc_1))
    return false;
  if (!(this.mc_1 === other.mc_1))
    return false;
  if (!this.nc_1.equals(other.nc_1))
    return false;
  if (!(this.oc_1 === other.oc_1))
    return false;
  if (!equals(this.pc_1, other.pc_1))
    return false;
  if (!equals(this.qc_1, other.qc_1))
    return false;
  if (!equals(this.rc_1, other.rc_1))
    return false;
  if (!equals(this.sc_1, other.sc_1))
    return false;
  if (!(this.tc_1 === other.tc_1))
    return false;
  if (!equals(this.uc_1, other.uc_1))
    return false;
  if (!equals(this.vc_1, other.vc_1))
    return false;
  return true;
};
function StepFocusRegion(startX, startY, width, height) {
  this.ik_1 = startX;
  this.jk_1 = startY;
  this.kk_1 = width;
  this.lk_1 = height;
}
protoOf(StepFocusRegion).toString = function () {
  return 'StepFocusRegion(startX=' + this.ik_1 + ', startY=' + this.jk_1 + ', width=' + this.kk_1 + ', height=' + this.lk_1 + ')';
};
protoOf(StepFocusRegion).hashCode = function () {
  var result = this.ik_1;
  result = imul_0(result, 31) + this.jk_1 | 0;
  result = imul_0(result, 31) + this.kk_1 | 0;
  result = imul_0(result, 31) + this.lk_1 | 0;
  return result;
};
protoOf(StepFocusRegion).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof StepFocusRegion))
    return false;
  if (!(this.ik_1 === other.ik_1))
    return false;
  if (!(this.jk_1 === other.jk_1))
    return false;
  if (!(this.kk_1 === other.kk_1))
    return false;
  if (!(this.lk_1 === other.lk_1))
    return false;
  return true;
};
function BuildStep(stepNumber, title, subtitle, panelTag, isStructuralStep, newPieces, newPins, stepParts, previousPieceIds, focusRegion) {
  this.mk_1 = stepNumber;
  this.nk_1 = title;
  this.ok_1 = subtitle;
  this.pk_1 = panelTag;
  this.qk_1 = isStructuralStep;
  this.rk_1 = newPieces;
  this.sk_1 = newPins;
  this.tk_1 = stepParts;
  this.uk_1 = previousPieceIds;
  this.vk_1 = focusRegion;
}
protoOf(BuildStep).toString = function () {
  return 'BuildStep(stepNumber=' + this.mk_1 + ', title=' + this.nk_1 + ', subtitle=' + this.ok_1 + ', panelTag=' + this.pk_1 + ', isStructuralStep=' + this.qk_1 + ', newPieces=' + toString_1(this.rk_1) + ', newPins=' + toString_1(this.sk_1) + ', stepParts=' + toString_1(this.tk_1) + ', previousPieceIds=' + toString_1(this.uk_1) + ', focusRegion=' + this.vk_1.toString() + ')';
};
protoOf(BuildStep).hashCode = function () {
  var result = this.mk_1;
  result = imul_0(result, 31) + getStringHashCode(this.nk_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.ok_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.pk_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.qk_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.rk_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.sk_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.tk_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.uk_1) | 0;
  result = imul_0(result, 31) + this.vk_1.hashCode() | 0;
  return result;
};
protoOf(BuildStep).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof BuildStep))
    return false;
  if (!(this.mk_1 === other.mk_1))
    return false;
  if (!(this.nk_1 === other.nk_1))
    return false;
  if (!(this.ok_1 === other.ok_1))
    return false;
  if (!(this.pk_1 === other.pk_1))
    return false;
  if (!(this.qk_1 === other.qk_1))
    return false;
  if (!equals(this.rk_1, other.rk_1))
    return false;
  if (!equals(this.sk_1, other.sk_1))
    return false;
  if (!equals(this.tk_1, other.tk_1))
    return false;
  if (!equals(this.uk_1, other.uk_1))
    return false;
  if (!this.vk_1.equals(other.vk_1))
    return false;
  return true;
};
function PricingSummary(pabTotalUsd, blTotalUsd, surfaceElementsPabUsd, structuralBackingPabUsd, rarePremiumPabUsd, multiPlateSavingsUsd, costPerStudPabUsd, totalPieces, uniqueLots, commonPercent, uncommonPercent, rarePercent) {
  this.cf_1 = pabTotalUsd;
  this.df_1 = blTotalUsd;
  this.ef_1 = surfaceElementsPabUsd;
  this.ff_1 = structuralBackingPabUsd;
  this.gf_1 = rarePremiumPabUsd;
  this.hf_1 = multiPlateSavingsUsd;
  this.if_1 = costPerStudPabUsd;
  this.jf_1 = totalPieces;
  this.kf_1 = uniqueLots;
  this.lf_1 = commonPercent;
  this.mf_1 = uncommonPercent;
  this.nf_1 = rarePercent;
}
protoOf(PricingSummary).toString = function () {
  return 'PricingSummary(pabTotalUsd=' + this.cf_1 + ', blTotalUsd=' + this.df_1 + ', surfaceElementsPabUsd=' + this.ef_1 + ', structuralBackingPabUsd=' + this.ff_1 + ', rarePremiumPabUsd=' + this.gf_1 + ', multiPlateSavingsUsd=' + this.hf_1 + ', costPerStudPabUsd=' + this.if_1 + ', totalPieces=' + this.jf_1 + ', uniqueLots=' + this.kf_1 + ', commonPercent=' + this.lf_1 + ', uncommonPercent=' + this.mf_1 + ', rarePercent=' + this.nf_1 + ')';
};
protoOf(PricingSummary).hashCode = function () {
  var result = getNumberHashCode(this.cf_1);
  result = imul_0(result, 31) + getNumberHashCode(this.df_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ef_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ff_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.gf_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.hf_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.if_1) | 0;
  result = imul_0(result, 31) + this.jf_1 | 0;
  result = imul_0(result, 31) + this.kf_1 | 0;
  result = imul_0(result, 31) + this.lf_1 | 0;
  result = imul_0(result, 31) + this.mf_1 | 0;
  result = imul_0(result, 31) + this.nf_1 | 0;
  return result;
};
protoOf(PricingSummary).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof PricingSummary))
    return false;
  if (!equals(this.cf_1, other.cf_1))
    return false;
  if (!equals(this.df_1, other.df_1))
    return false;
  if (!equals(this.ef_1, other.ef_1))
    return false;
  if (!equals(this.ff_1, other.ff_1))
    return false;
  if (!equals(this.gf_1, other.gf_1))
    return false;
  if (!equals(this.hf_1, other.hf_1))
    return false;
  if (!equals(this.if_1, other.if_1))
    return false;
  if (!(this.jf_1 === other.jf_1))
    return false;
  if (!(this.kf_1 === other.kf_1))
    return false;
  if (!(this.lf_1 === other.lf_1))
    return false;
  if (!(this.mf_1 === other.mf_1))
    return false;
  if (!(this.nf_1 === other.nf_1))
    return false;
  return true;
};
function MosaicResult(config, widthStuds, heightStuds, studColorIds, pieces, backingPieces, technicPins, validationReport, buildSteps, bomLines, pricing, colorNumberMap) {
  this.ae_1 = config;
  this.be_1 = widthStuds;
  this.ce_1 = heightStuds;
  this.de_1 = studColorIds;
  this.ee_1 = pieces;
  this.fe_1 = backingPieces;
  this.ge_1 = technicPins;
  this.he_1 = validationReport;
  this.ie_1 = buildSteps;
  this.je_1 = bomLines;
  this.ke_1 = pricing;
  this.le_1 = colorNumberMap;
}
protoOf(MosaicResult).toString = function () {
  return 'MosaicResult(config=' + this.ae_1.toString() + ', widthStuds=' + this.be_1 + ', heightStuds=' + this.ce_1 + ', studColorIds=' + toString_1(this.de_1) + ', pieces=' + toString_1(this.ee_1) + ', backingPieces=' + toString_1(this.fe_1) + ', technicPins=' + toString_1(this.ge_1) + ', validationReport=' + this.he_1.toString() + ', buildSteps=' + toString_1(this.ie_1) + ', bomLines=' + toString_1(this.je_1) + ', pricing=' + this.ke_1.toString() + ', colorNumberMap=' + toString_1(this.le_1) + ')';
};
protoOf(MosaicResult).hashCode = function () {
  var result = this.ae_1.hashCode();
  result = imul_0(result, 31) + this.be_1 | 0;
  result = imul_0(result, 31) + this.ce_1 | 0;
  result = imul_0(result, 31) + hashCode_0(this.de_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.ee_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.fe_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.ge_1) | 0;
  result = imul_0(result, 31) + this.he_1.hashCode() | 0;
  result = imul_0(result, 31) + hashCode_0(this.ie_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.je_1) | 0;
  result = imul_0(result, 31) + this.ke_1.hashCode() | 0;
  result = imul_0(result, 31) + hashCode_0(this.le_1) | 0;
  return result;
};
protoOf(MosaicResult).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MosaicResult))
    return false;
  if (!this.ae_1.equals(other.ae_1))
    return false;
  if (!(this.be_1 === other.be_1))
    return false;
  if (!(this.ce_1 === other.ce_1))
    return false;
  if (!equals(this.de_1, other.de_1))
    return false;
  if (!equals(this.ee_1, other.ee_1))
    return false;
  if (!equals(this.fe_1, other.fe_1))
    return false;
  if (!equals(this.ge_1, other.ge_1))
    return false;
  if (!this.he_1.equals(other.he_1))
    return false;
  if (!equals(this.ie_1, other.ie_1))
    return false;
  if (!equals(this.je_1, other.je_1))
    return false;
  if (!this.ke_1.equals(other.ke_1))
    return false;
  if (!equals(this.le_1, other.le_1))
    return false;
  return true;
};
function ValidationSeverity_PASS_getInstance() {
  static_init_10();
  return ValidationSeverity_PASS_instance;
}
function ValidationSeverity_WARNING_getInstance() {
  static_init_10();
  return ValidationSeverity_WARNING_instance;
}
function ValidationSeverity_ERROR_getInstance() {
  static_init_10();
  return ValidationSeverity_ERROR_instance;
}
function ValidationCategory_FOUNDATION_getInstance() {
  static_init_11();
  return ValidationCategory_FOUNDATION_instance;
}
function ValidationCategory_TECHNIC_JOINTS_getInstance() {
  static_init_11();
  return ValidationCategory_TECHNIC_JOINTS_instance;
}
function ValidationCategory_SEAM_STAGGER_getInstance() {
  static_init_11();
  return ValidationCategory_SEAM_STAGGER_instance;
}
function ValidationCategory_COLLISION_TOLERANCE_getInstance() {
  static_init_11();
  return ValidationCategory_COLLISION_TOLERANCE_instance;
}
function ValidationCategory_COLOR_LEGALITY_getInstance() {
  static_init_11();
  return ValidationCategory_COLOR_LEGALITY_instance;
}
function ValidationCategory_RARITY_COST_getInstance() {
  static_init_11();
  return ValidationCategory_RARITY_COST_instance;
}
var static_init_called_12;
function static_init_12() {
  if (static_init_called_12)
    return Unit_instance;
  static_init_called_12 = true;
  PickABrickRegion_US_instance = new PickABrickRegion('US', 0, 'en-us', 'United States (en-us)');
  PickABrickRegion_UK_instance = new PickABrickRegion('UK', 1, 'en-gb', 'United Kingdom (en-gb)');
  PickABrickRegion_DE_instance = new PickABrickRegion('DE', 2, 'de-de', 'Germany (de-de)');
  PickABrickRegion_FR_instance = new PickABrickRegion('FR', 3, 'fr-fr', 'France (fr-fr)');
  PickABrickRegion_DK_instance = new PickABrickRegion('DK', 4, 'da-dk', 'Denmark (da-dk)');
  PickABrickRegion_CA_instance = new PickABrickRegion('CA', 5, 'en-ca', 'Canada (en-ca)');
  PickABrickRegion_AU_instance = new PickABrickRegion('AU', 6, 'en-au', 'Australia (en-au)');
  PickABrickRegion_JP_instance = new PickABrickRegion('JP', 7, 'ja-jp', 'Japan (ja-jp)');
}
var PickABrickRegion_US_instance;
var PickABrickRegion_UK_instance;
var PickABrickRegion_DE_instance;
var PickABrickRegion_FR_instance;
var PickABrickRegion_DK_instance;
var PickABrickRegion_CA_instance;
var PickABrickRegion_AU_instance;
var PickABrickRegion_JP_instance;
function PickABrickRegion(name, ordinal, localeCode, label) {
  Enum.call(this, name, ordinal);
  this.qd_1 = localeCode;
  this.rd_1 = label;
}
function PickABrickRegion_US_getInstance() {
  static_init_12();
  return PickABrickRegion_US_instance;
}
function mosaicImagePrompt(request) {
  return 'Create one square image for a brick mosaic: a clear main subject, bold shapes, strong contrast, ' + ('and a simple background. Do not include any text or watermark. Request: ' + request);
}
function Bitmap(width, height, argb) {
  this.bg_1 = width;
  this.cg_1 = height;
  this.dg_1 = argb;
}
protoOf(Bitmap).eg = function (pixels, offset, stride, x, y, width, height) {
  var inductionVariable = 0;
  if (inductionVariable < height)
    do {
      var row = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var from = imul_0(y + row | 0, this.bg_1) + x | 0;
      var tmp0 = this.dg_1;
      var tmp4 = offset + imul_0(row, stride) | 0;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = from + width | 0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, pixels, tmp4, from, endIndex);
    }
     while (inductionVariable < height);
};
function Color() {
}
protoOf(Color).fg = function (color) {
  return color >> 16 & 255;
};
protoOf(Color).gg = function (color) {
  return color >> 8 & 255;
};
protoOf(Color).hg = function (color) {
  return color & 255;
};
var Color_instance;
function Color_getInstance() {
  return Color_instance;
}
function fmt2(value) {
  if (isNaN_0(value) || isInfinite(value))
    return value.toString();
  var negative = value < 0;
  // Inline function 'kotlin.math.abs' call
  var magnitude = Math.abs(value);
  var tmp;
  if (magnitude < 0.001) {
    tmp = '0.00';
  } else if (magnitude >= 1.0E7) {
    // Inline function 'kotlin.let' call
    var it = roundToLong(magnitude * 100);
    // Inline function 'kotlin.Long.div' call
    var tmp_0 = divide(it, fromInt(100)).toString();
    // Inline function 'kotlin.Long.rem' call
    var tmp$ret$4 = modulo(it, fromInt(100));
    tmp = tmp_0 + '.' + padStart(tmp$ret$4.toString(), 2, _Char___init__impl__6a9atx(48));
  } else {
    var text = magnitude.toString();
    var whole = toLong(substringBefore(text, _Char___init__impl__6a9atx(46)));
    var decimals = padEnd(substringAfter(text, _Char___init__impl__6a9atx(46), ''), 3, _Char___init__impl__6a9atx(48));
    // Inline function 'kotlin.Long.times' call
    var tmp$ret$5 = multiply(whole, fromInt(100));
    var tmp0 = add(tmp$ret$5, toLong(substring(decimals, 0, 2)));
    // Inline function 'kotlin.Long.plus' call
    var other = Char__compareTo_impl_ypi4mb(charCodeAt(decimals, 2), _Char___init__impl__6a9atx(53)) >= 0 ? 1 : 0;
    var cents = add(tmp0, fromInt(other));
    // Inline function 'kotlin.Long.div' call
    var tmp_1 = divide(cents, fromInt(100)).toString();
    // Inline function 'kotlin.Long.rem' call
    var tmp$ret$8 = modulo(cents, fromInt(100));
    tmp = tmp_1 + '.' + padStart(tmp$ret$8.toString(), 2, _Char___init__impl__6a9atx(48));
  }
  var body = tmp;
  return negative && !(body === '0.00') ? '-' + body : body;
}
function WebConfig(width, height, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation) {
  this.wk_1 = width;
  this.xk_1 = height;
  this.yk_1 = style;
  this.zk_1 = backing;
  this.al_1 = palette;
  this.bl_1 = rarity;
  this.cl_1 = tolerance;
  this.dl_1 = dither;
  this.el_1 = legal;
  this.fl_1 = brightness;
  this.gl_1 = contrast;
  this.hl_1 = saturation;
}
protoOf(WebConfig).il = function () {
  var tmp0_widthStuds = coerceIn_0(this.wk_1, 16, 96);
  var tmp1_heightStuds = coerceIn_0(this.xk_1, 16, 96);
  var tmp0 = get_entries_2();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.z_1 === this.yk_1) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp2_buildStyle = tmp$ret$0;
  var tmp0_0 = get_entries_3();
  var tmp$ret$2;
  $l$block_0: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s_0 = tmp0_0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      if (element_0.z_1 === this.zk_1) {
        tmp$ret$2 = element_0;
        break $l$block_0;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp3_backingSystem = tmp$ret$2;
  var tmp0_1 = get_entries_1();
  var tmp$ret$4;
  $l$block_1: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s_1 = tmp0_1.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      if (element_1.z_1 === this.al_1) {
        tmp$ret$4 = element_1;
        break $l$block_1;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp4_palettePreset = tmp$ret$4;
  var tmp0_2 = get_entries_4();
  var tmp$ret$6;
  $l$block_2: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s_2 = tmp0_2.g();
    while (_iterator__ex2g4s_2.h()) {
      var element_2 = _iterator__ex2g4s_2.i();
      if (element_2.z_1 === this.bl_1) {
        tmp$ret$6 = element_2;
        break $l$block_2;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp5_rarityPreference = tmp$ret$6;
  var tmp6_colorTolerance = coerceIn(this.cl_1, 0.0, 32.0);
  var tmp7_ditheringEnabled = this.dl_1;
  var tmp8_enforceLegalConnections = this.el_1;
  var tmp9_brightness = coerceIn(this.fl_1, -0.35, 0.35);
  var tmp10_contrast = coerceIn(this.gl_1, 0.7, 1.5);
  var tmp11_saturation = coerceIn(this.hl_1, 0.5, 1.6);
  return new MosaicConfig(tmp0_widthStuds, tmp1_heightStuds, VOID, tmp2_buildStyle, tmp3_backingSystem, tmp4_palettePreset, VOID, VOID, tmp6_colorTolerance, tmp7_ditheringEnabled, tmp5_rarityPreference, tmp8_enforceLegalConnections, tmp9_brightness, tmp10_contrast, tmp11_saturation);
};
function current($this) {
  var tmp0 = $this.jl_1;
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.checkNotNull' call
    if (tmp0 == null) {
      var message = 'No mosaic yet';
      throw IllegalStateException_init_$Create$_0(toString_1(message));
    } else {
      tmp$ret$0 = tmp0;
      break $l$block;
    }
  }
  return tmp$ret$0;
}
function WebBridge$catalogJson$lambda($this$obj) {
  var tmp = BrickCatalog_getInstance().of_1;
  $this$obj.ml('colors', tmp, WebBridge$catalogJson$lambda$lambda);
  var tmp_0 = get_entries_2();
  $this$obj.ml('styles', tmp_0, WebBridge$catalogJson$lambda$lambda_0);
  var tmp_1 = get_entries_3();
  $this$obj.ml('backings', tmp_1, WebBridge$catalogJson$lambda$lambda_1);
  var tmp_2 = get_entries_1();
  $this$obj.ml('palettes', tmp_2, WebBridge$catalogJson$lambda$lambda_2);
  var tmp_3 = get_entries_4();
  $this$obj.ml('rarities', tmp_3, WebBridge$catalogJson$lambda$lambda_3);
  var tmp_4 = Companion_getInstance_10().vj_1;
  $this$obj.ml('sizes', tmp_4, WebBridge$catalogJson$lambda$lambda_4);
  var tmp_5 = get_entries_0();
  $this$obj.ml('csvFormats', tmp_5, WebBridge$catalogJson$lambda$lambda_5);
  var tmp_6 = get_entries();
  $this$obj.ml('marketplaces', tmp_6, WebBridge$catalogJson$lambda$lambda_6);
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda($this$arr, c) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda(c));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda($c) {
  return function ($this$obj) {
    $this$obj.ol('id', $c.wc_1);
    $this$obj.pl('name', $c.xc_1);
    $this$obj.ol('r', $c.gd_1);
    $this$obj.ol('g', $c.hd_1);
    $this$obj.ol('b', $c.id_1);
    $this$obj.pl('tier', $c.zc_1.z_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_0($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_0(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_0($s) {
  return function ($this$obj) {
    $this$obj.pl('id', $s.z_1);
    $this$obj.pl('title', $s.wf_1);
    $this$obj.pl('description', $s.yf_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_1($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_1(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_1($s) {
  return function ($this$obj) {
    $this$obj.pl('id', $s.z_1);
    $this$obj.pl('title', $s.mi_1);
    $this$obj.pl('description', $s.oi_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_2($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_2(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_2($s) {
  return function ($this$obj) {
    $this$obj.pl('id', $s.z_1);
    $this$obj.pl('title', $s.oj_1);
    $this$obj.pl('description', $s.pj_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_3($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_3(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_3($s) {
  return function ($this$obj) {
    $this$obj.pl('id', $s.z_1);
    $this$obj.pl('title', $s.sj_1);
    $this$obj.pl('description', $s.uj_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_4($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_4(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_4($s) {
  return function ($this$obj) {
    $this$obj.pl('label', $s.wj_1);
    $this$obj.ol('w', $s.xj_1);
    $this$obj.ol('h', $s.yj_1);
    $this$obj.pl('tag', $s.zj_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_5($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_5(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_5($s) {
  return function ($this$obj) {
    $this$obj.pl('id', $s.z_1);
    $this$obj.pl('title', $s.xh_1);
    $this$obj.pl('description', $s.yh_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_6($this$arr, s) {
  $this$arr.nl(WebBridge$catalogJson$lambda$lambda$lambda_6(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_6($s) {
  return function ($this$obj) {
    $this$obj.pl('id', $s.z_1);
    $this$obj.pl('title', $s.eb_1);
    $this$obj.pl('badge', $s.fb_1);
    $this$obj.pl('howTo', $s.ib_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda($this$arr, p) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda(p));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda($p) {
  return function ($this$obj) {
    $this$obj.ql('x', $p.bk_1);
    $this$obj.ql('y', $p.ck_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_0($this$arr, l) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda_0(l));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda_0($l) {
  return function ($this$obj) {
    $this$obj.pl('part', $l.kc_1.zb_1);
    $this$obj.pl('partName', $l.kc_1.ac_1);
    $this$obj.ol('colorId', $l.lc_1.wc_1);
    $this$obj.pl('colorName', $l.lc_1.xc_1);
    $this$obj.ol('qty', $l.mc_1);
    $this$obj.pl('rarity', $l.nc_1.hi_1);
    $this$obj.rl('legal', $l.oc_1);
    $this$obj.rl('structural', $l.kc_1.hc_1);
    $this$obj.ql('pabUnit', $l.pc_1);
    $this$obj.ql('blUnit', $l.qc_1);
    $this$obj.ql('pabTotal', $l.rc_1);
    $this$obj.ql('blTotal', $l.sc_1);
    $this$obj.ol('code', $l.tc_1);
    var tmp0_safe_receiver = $l.uc_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      $this$obj.pl('alt', tmp0_safe_receiver.xc_1);
    }
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_1($r) {
  return function ($this$obj) {
    var p = $r.ke_1;
    $this$obj.ql('pab', p.cf_1);
    $this$obj.ql('bl', p.df_1);
    $this$obj.ql('surface', p.ef_1);
    $this$obj.ql('backing', p.ff_1);
    $this$obj.ql('rare', p.gf_1);
    $this$obj.ql('multiSave', p.hf_1);
    $this$obj.ql('perStud', p.if_1);
    $this$obj.ol('pieces', p.jf_1);
    $this$obj.ol('lots', p.kf_1);
    $this$obj.ol('common', p.lf_1);
    $this$obj.ol('uncommon', p.mf_1);
    $this$obj.ol('rarePct', p.nf_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda$lambda_1($this$arr, c) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda$lambda(c));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda$lambda($c) {
  return function ($this$obj) {
    $this$obj.pl('severity', $c.dh_1.z_1);
    $this$obj.pl('category', $c.eh_1.hk_1);
    $this$obj.pl('title', $c.fh_1);
    $this$obj.pl('detail', $c.gh_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_2($r) {
  return function ($this$obj) {
    var v = $r.he_1;
    $this$obj.rl('legal', v.pi_1);
    $this$obj.ol('score', v.qi_1);
    $this$obj.ml('checks', v.ri_1, WebBridge$resultJson$lambda$lambda$lambda_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_3($this$arr, s) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda_2(s));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda$lambda_0($this$arr, l) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda$lambda$lambda(l));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda$lambda$lambda($l) {
  return function ($this$obj) {
    $this$obj.pl('part', $l.kc_1.bc_1);
    $this$obj.ol('colorId', $l.lc_1.wc_1);
    $this$obj.pl('colorName', $l.lc_1.xc_1);
    $this$obj.ol('qty', $l.mc_1);
    $this$obj.ol('code', $l.tc_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda$lambda_2($s) {
  return function ($this$obj) {
    $this$obj.ol('n', $s.mk_1);
    $this$obj.pl('title', $s.nk_1);
    $this$obj.pl('subtitle', $s.ok_1);
    $this$obj.pl('tag', $s.pk_1);
    $this$obj.rl('structural', $s.qk_1);
    // Inline function 'kotlin.collections.map' call
    var this_0 = $s.rk_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$2 = item.ng_1;
      destination.f(tmp$ret$2);
    }
    $this$obj.sl('ids', destination);
    $this$obj.ol('pinCount', $s.sk_1.l());
    $this$obj.sl('focus', listOf_0([$s.vk_1.ik_1, $s.vk_1.jk_1, $s.vk_1.kk_1, $s.vk_1.lk_1]));
    $this$obj.ml('parts', $s.tk_1, WebBridge$resultJson$lambda$lambda$lambda$lambda_0);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_4($this$arr, q) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda_3(q));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda_3($q) {
  return function ($this$obj) {
    $this$obj.pl('id', $q.jb_1.z_1);
    $this$obj.pl('title', $q.jb_1.eb_1);
    $this$obj.pl('badge', $q.jb_1.fb_1);
    $this$obj.ql('total', $q.kb_1);
    $this$obj.ql('save', $q.nb_1);
    $this$obj.pl('url', $q.ob_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_5($this$arr, s) {
  $this$arr.nl(WebBridge$resultJson$lambda$lambda$lambda_4(s));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda_4($s) {
  return function ($this$obj) {
    $this$obj.pl('title', $s.rb_1);
    $this$obj.pl('detail', $s.sb_1);
    $this$obj.ql('save', $s.tb_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda($r, $quotes, $suggestions) {
  return function ($this$obj) {
    $this$obj.ol('width', $r.be_1);
    $this$obj.ol('height', $r.ce_1);
    // Inline function 'kotlin.collections.asList' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = $r.de_1;
    var tmp$ret$0 = asList(tmp$ret$1);
    $this$obj.sl('grid', tmp$ret$0);
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0 = plus($r.fe_1, $r.ee_1);
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var list = listOf_0([element.ng_1, element.qg_1, element.rg_1, element.sg_1, element.tg_1, element.pg_1.wc_1, element.ug_1, element.og_1.gc_1 ? 1 : 0, element.og_1.fc_1 ? 1 : 0]);
      addAll(destination, list);
    }
    $this$obj.sl('pieces', destination);
    $this$obj.ml('pins', $r.ge_1, WebBridge$resultJson$lambda$lambda);
    $this$obj.ml('bom', $r.je_1, WebBridge$resultJson$lambda$lambda_0);
    $this$obj.tl('pricing');
    $this$obj.nl(WebBridge$resultJson$lambda$lambda_1($r));
    $this$obj.tl('validation');
    $this$obj.nl(WebBridge$resultJson$lambda$lambda_2($r));
    $this$obj.ml('steps', $r.ie_1, WebBridge$resultJson$lambda$lambda_3);
    $this$obj.ml('quotes', $quotes, WebBridge$resultJson$lambda$lambda_4);
    $this$obj.ml('suggestions', $suggestions, WebBridge$resultJson$lambda$lambda_5);
    return Unit_instance;
  };
}
function canonical$d(v) {
  return toString_2(toRawBits(v), 16);
}
function canonical$piece(p) {
  return '' + p.ng_1 + ',' + p.og_1.z_1 + ',' + p.pg_1.wc_1 + ',' + p.qg_1 + ',' + p.rg_1 + ',' + p.sg_1 + ',' + p.tg_1 + ',' + p.ug_1 + ',' + p.vg_1 + ',' + p.wg_1 + ',' + p.xg_1.z_1 + ',' + p.yg_1 + ',' + canonical$d(p.zg_1) + ',' + canonical$d(p.ah_1);
}
function canonical$line(l) {
  var tmp = canonical$d(l.pc_1);
  var tmp_0 = canonical$d(l.qc_1);
  var tmp_1 = canonical$d(l.rc_1);
  var tmp_2 = canonical$d(l.sc_1);
  var tmp0_safe_receiver = l.uc_1;
  return l.kc_1.z_1 + ',' + l.lc_1.wc_1 + ',' + l.mc_1 + ',' + l.nc_1.z_1 + ',' + l.oc_1 + ',' + tmp + ',' + tmp_0 + ',' + tmp_1 + ',' + tmp_2 + ',' + l.tc_1 + ',' + (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.wc_1) + ',' + canonical$d(l.vc_1);
}
function parityConfigs$c(w, h, style, backing, palette, rarity, tol, dither, legal, br, con, sat) {
  w = w === VOID ? 32 : w;
  h = h === VOID ? 32 : h;
  style = style === VOID ? BuildStyle_ROUND_TILES_ART_getInstance() : style;
  backing = backing === VOID ? BackingSystem_TECHNIC_FRAMES_16X16_getInstance() : backing;
  palette = palette === VOID ? PalettePreset_OFFICIAL_ACTIVE_getInstance() : palette;
  rarity = rarity === VOID ? RarityPreference_PREFER_COMMON_getInstance() : rarity;
  tol = tol === VOID ? 8.0 : tol;
  dither = dither === VOID ? true : dither;
  legal = legal === VOID ? true : legal;
  br = br === VOID ? 0.0 : br;
  con = con === VOID ? 1.08 : con;
  sat = sat === VOID ? 1.12 : sat;
  return new WebConfig(w, h, style.z_1, backing.z_1, palette.z_1, rarity.z_1, tol, dither, legal, br, con, sat);
}
function WebBridge() {
  this.jl_1 = null;
}
protoOf(WebBridge).ul = function (argb, width, height, config) {
  // Inline function 'kotlin.require' call
  if (!((1 <= width ? width <= 4096 : false) && (1 <= height ? height <= 4096 : false) && argb.length === imul_0(width, height))) {
    var message = 'Invalid image buffer';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.also' call
  var this_0 = MosaicConverterEngine_instance.sh(new Bitmap(width, height, argb), config.il());
  WebBridge_instance.jl_1 = this_0;
  return this_0;
};
protoOf(WebBridge).vl = function (format) {
  var tmp = MosaicExporter_getInstance();
  var tmp_0 = current(this);
  var tmp0 = get_entries_0();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.z_1 === format) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.ii(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).wl = function (format) {
  var tmp = MosaicExporter_getInstance();
  var tmp_0 = current(this);
  var tmp0 = get_entries_0();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.z_1 === format) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.ci(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).xl = function (marketplace) {
  var tmp = MarketplaceCartBuilder_instance;
  var tmp_0 = current(this);
  var tmp0 = get_entries();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.z_1 === marketplace) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.yd(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).yl = function (marketplace) {
  var tmp = MarketplaceCartBuilder_instance;
  var tmp_0 = current(this);
  var tmp0 = get_entries();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.z_1 === marketplace) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.zd(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).zl = function () {
  return MosaicExporter_getInstance().ji(current(this));
};
protoOf(WebBridge).am = function () {
  var tmp = Companion_instance_11;
  return tmp.bm(WebBridge$catalogJson$lambda);
};
protoOf(WebBridge).cm = function (r) {
  var quotes = MarketplaceCartBuilder_instance.vd(r, PickABrickRegion_US_getInstance());
  var suggestions = MarketplaceCartBuilder_instance.me(r);
  var tmp = Companion_instance_11;
  return tmp.bm(WebBridge$resultJson$lambda(r, quotes, suggestions));
};
protoOf(WebBridge).dm = function (r) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$_0();
  var tmp0 = this_0.o4('grid ');
  // Inline function 'kotlin.text.appendLine' call
  var value = joinToString_0(r.de_1, ',');
  // Inline function 'kotlin.text.appendLine' call
  tmp0.o4(value).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = r.fe_1.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp0_0 = this_0.o4('B ');
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = canonical$piece(element);
    // Inline function 'kotlin.text.appendLine' call
    tmp0_0.o4(value_0).p4(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = r.ee_1.g();
  while (_iterator__ex2g4s_0.h()) {
    var element_0 = _iterator__ex2g4s_0.i();
    var tmp0_1 = this_0.o4('P ');
    // Inline function 'kotlin.text.appendLine' call
    var value_1 = canonical$piece(element_0);
    // Inline function 'kotlin.text.appendLine' call
    tmp0_1.o4(value_1).p4(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_1 = r.ge_1.g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    this_0.o4('T ' + canonical$d(element_1.bk_1) + ',' + canonical$d(element_1.ck_1) + ',' + element_1.dk_1 + '\n');
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_2 = r.je_1.g();
  while (_iterator__ex2g4s_2.h()) {
    var element_2 = _iterator__ex2g4s_2.i();
    var tmp0_2 = this_0.o4('L ');
    // Inline function 'kotlin.text.appendLine' call
    var value_2 = canonical$line(element_2);
    // Inline function 'kotlin.text.appendLine' call
    tmp0_2.o4(value_2).p4(_Char___init__impl__6a9atx(10));
  }
  var p = r.ke_1;
  // Inline function 'kotlin.text.appendLine' call
  var value_3 = 'price ' + canonical$d(p.cf_1) + ',' + canonical$d(p.df_1) + ',' + canonical$d(p.ef_1) + ',' + canonical$d(p.ff_1) + ',' + canonical$d(p.gf_1) + ',' + canonical$d(p.hf_1) + ',' + canonical$d(p.if_1) + ',' + p.jf_1 + ',' + p.kf_1 + ',' + p.lf_1 + ',' + p.mf_1 + ',' + p.nf_1;
  // Inline function 'kotlin.text.appendLine' call
  this_0.o4(value_3).p4(_Char___init__impl__6a9atx(10));
  var v = r.he_1;
  // Inline function 'kotlin.text.appendLine' call
  var value_4 = 'valid ' + v.pi_1 + ',' + v.qi_1 + ',' + v.si_1 + ',' + v.ti_1 + ',' + v.ui_1 + ',' + v.vi_1 + ',' + v.wi_1 + ',' + v.xi_1;
  // Inline function 'kotlin.text.appendLine' call
  this_0.o4(value_4).p4(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_3 = v.ri_1.g();
  while (_iterator__ex2g4s_3.h()) {
    var element_3 = _iterator__ex2g4s_3.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_5 = 'C ' + element_3.ch_1 + '|' + element_3.dh_1.toString() + '|' + element_3.fh_1 + '|' + element_3.gh_1 + '|' + element_3.hh_1 + '|' + element_3.ih_1 + '|' + element_3.jh_1 + '|' + element_3.lh_1;
    // Inline function 'kotlin.text.appendLine' call
    this_0.o4(value_5).p4(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_4 = r.ie_1.g();
  while (_iterator__ex2g4s_4.h()) {
    var element_4 = _iterator__ex2g4s_4.i();
    // Inline function 'kotlin.collections.map' call
    var this_1 = element_4.rk_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_5 = this_1.g();
    while (_iterator__ex2g4s_5.h()) {
      var item = _iterator__ex2g4s_5.i();
      var tmp$ret$31 = item.ng_1;
      destination.f(tmp$ret$31);
    }
    // Inline function 'kotlin.text.appendLine' call
    var value_6 = 'S ' + element_4.mk_1 + '|' + element_4.nk_1 + '|' + element_4.ok_1 + '|' + element_4.pk_1 + '|' + element_4.qk_1 + '|' + toString_1(destination) + '|' + element_4.sk_1.l() + '|' + element_4.uk_1.l() + '|' + element_4.vk_1.toString();
    // Inline function 'kotlin.text.appendLine' call
    this_0.o4(value_6).p4(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_6 = element_4.tk_1.g();
    while (_iterator__ex2g4s_6.h()) {
      var element_5 = _iterator__ex2g4s_6.i();
      var tmp0_3 = this_0.o4('SP ');
      // Inline function 'kotlin.text.appendLine' call
      var value_7 = canonical$line(element_5);
      // Inline function 'kotlin.text.appendLine' call
      tmp0_3.o4(value_7).p4(_Char___init__impl__6a9atx(10));
    }
  }
  // Inline function 'kotlin.collections.forEach' call
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s_7 = r.le_1.y().g();
  while (_iterator__ex2g4s_7.h()) {
    var element_6 = _iterator__ex2g4s_7.i();
    // Inline function 'kotlin.collections.component1' call
    var k = element_6.u();
    // Inline function 'kotlin.collections.component2' call
    var n = element_6.v();
    // Inline function 'kotlin.text.appendLine' call
    var value_8 = 'N ' + k + '=' + n;
    // Inline function 'kotlin.text.appendLine' call
    this_0.o4(value_8).p4(_Char___init__impl__6a9atx(10));
  }
  return this_0.toString();
};
protoOf(WebBridge).em = function () {
  // Inline function 'kotlin.collections.buildList' call
  // Inline function 'kotlin.collections.buildListInternal' call
  // Inline function 'kotlin.apply' call
  var this_0 = ArrayList_init_$Create$();
  this_0.f(to('default', parityConfigs$c()));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = get_entries_2().g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = get_entries_3().g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      this_0.f(to('style-' + element.z_1 + '-' + element_0.z_1, parityConfigs$c(48, 32, element, element_0)));
    }
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_1 = get_entries_1().g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    this_0.f(to('palette-' + element_1.z_1, parityConfigs$c(VOID, VOID, VOID, VOID, element_1, RarityPreference_ALLOW_RARE_getInstance())));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_2 = get_entries_4().g();
  while (_iterator__ex2g4s_2.h()) {
    var element_2 = _iterator__ex2g4s_2.i();
    this_0.f(to('rarity-' + element_2.z_1, parityConfigs$c(VOID, VOID, VOID, VOID, PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance(), element_2)));
  }
  this_0.f(to('no-dither', parityConfigs$c(VOID, VOID, VOID, VOID, VOID, VOID, VOID, false)));
  var tmp0_style = BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance();
  var tmp1_palette = PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance();
  var tmp2_rarity = RarityPreference_ALLOW_RARE_getInstance();
  this_0.f(to('not-legal', parityConfigs$c(VOID, VOID, tmp0_style, VOID, tmp1_palette, tmp2_rarity, VOID, VOID, false)));
  var tmp3_style = BuildStyle_STACKED_BRICK_WALL_getInstance();
  var tmp4_palette = PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance();
  var tmp5_rarity = RarityPreference_ALLOW_RARE_getInstance();
  this_0.f(to('wall-not-legal', parityConfigs$c(VOID, VOID, tmp3_style, VOID, tmp4_palette, tmp5_rarity, VOID, VOID, false)));
  this_0.f(to('tol0', parityConfigs$c(VOID, VOID, VOID, VOID, VOID, VOID, 0.0)));
  this_0.f(to('tol20', parityConfigs$c(VOID, VOID, VOID, VOID, VOID, VOID, 20.0)));
  this_0.f(to('tone', parityConfigs$c(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, 0.12, 1.31, 0.77)));
  this_0.f(to('small', parityConfigs$c(16, 16)));
  this_0.f(to('portrait', parityConfigs$c(32, 48)));
  this_0.f(to('max', parityConfigs$c(96, 96, BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance())));
  return this_0.k2();
};
var WebBridge_instance;
function WebBridge_getInstance() {
  return WebBridge_instance;
}
function comma($this) {
  if (!$this.ll_1) {
    $this.kl_1.p4(_Char___init__impl__6a9atx(44));
  }
  $this.ll_1 = false;
}
function quote($this, s) {
  $this.kl_1.p4(_Char___init__impl__6a9atx(34));
  var inductionVariable = 0;
  var last = s.length;
  while (inductionVariable < last) {
    var ch = charCodeAt(s, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    if (ch === _Char___init__impl__6a9atx(34))
      $this.kl_1.o4('\\"');
    else {
      if (ch === _Char___init__impl__6a9atx(92))
        $this.kl_1.o4('\\\\');
      else {
        var tmp;
        var tmp_0;
        // Inline function 'kotlin.code' call
        if (Char__toInt_impl_vasixd(ch) < 32) {
          tmp_0 = true;
        } else {
          tmp_0 = ch === _Char___init__impl__6a9atx(8232);
        }
        if (tmp_0) {
          tmp = true;
        } else {
          tmp = ch === _Char___init__impl__6a9atx(8233);
        }
        if (tmp) {
          var tmp_1 = $this.kl_1.o4('\\u');
          // Inline function 'kotlin.code' call
          var tmp$ret$1 = Char__toInt_impl_vasixd(ch);
          tmp_1.o4(padStart(toString_3(tmp$ret$1, 16), 4, _Char___init__impl__6a9atx(48)));
        } else {
          $this.kl_1.p4(ch);
        }
      }
    }
  }
  $this.kl_1.p4(_Char___init__impl__6a9atx(34));
}
function Companion_11() {
}
protoOf(Companion_11).bm = function (block) {
  // Inline function 'kotlin.also' call
  var this_0 = StringBuilder_init_$Create$_0();
  (new Json(this_0)).nl(block);
  return this_0.toString();
};
var Companion_instance_11;
function Companion_getInstance_11() {
  return Companion_instance_11;
}
function Json(out) {
  this.kl_1 = out;
  this.ll_1 = true;
}
protoOf(Json).tl = function (name) {
  comma(this);
  quote(this, name);
  this.kl_1.p4(_Char___init__impl__6a9atx(58));
  this.ll_1 = true;
};
protoOf(Json).pl = function (k, v) {
  this.tl(k);
  quote(this, v);
  this.ll_1 = false;
};
protoOf(Json).ol = function (k, v) {
  this.tl(k);
  this.kl_1.g6(v);
  this.ll_1 = false;
};
protoOf(Json).ql = function (k, v) {
  this.tl(k);
  this.kl_1.o4(isFinite(v) ? v.toString() : '0');
  this.ll_1 = false;
};
protoOf(Json).rl = function (k, v) {
  this.tl(k);
  this.kl_1.f6(v);
  this.ll_1 = false;
};
protoOf(Json).sl = function (k, v) {
  this.tl(k);
  this.kl_1.p4(_Char___init__impl__6a9atx(91));
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = v.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    if (checkIndexOverflow(_unary__edvuaz) > 0) {
      this.kl_1.p4(_Char___init__impl__6a9atx(44));
    }
    this.kl_1.g6(item);
  }
  this.kl_1.p4(_Char___init__impl__6a9atx(93));
  this.ll_1 = false;
};
protoOf(Json).nl = function (block) {
  this.kl_1.p4(_Char___init__impl__6a9atx(123));
  this.ll_1 = true;
  block(this);
  this.kl_1.p4(_Char___init__impl__6a9atx(125));
  this.ll_1 = false;
};
protoOf(Json).ml = function (k, items, item) {
  this.tl(k);
  this.kl_1.p4(_Char___init__impl__6a9atx(91));
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = items.g();
  while (_iterator__ex2g4s.h()) {
    var item_0 = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    if (checkIndexOverflow(_unary__edvuaz) > 0) {
      this.kl_1.p4(_Char___init__impl__6a9atx(44));
    }
    this.ll_1 = true;
    item(this, item_0);
  }
  this.kl_1.p4(_Char___init__impl__6a9atx(93));
  this.ll_1 = false;
};
function catalogJson() {
  return WebBridge_instance.am();
}
function convertMosaic(argb, width, height, gridW, gridH, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation) {
  return WebBridge_instance.cm(WebBridge_instance.ul(argb, width, height, new WebConfig(gridW, gridH, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation)));
}
function exportCsv(format) {
  return WebBridge_instance.vl(format);
}
function exportCsvName(format) {
  return WebBridge_instance.wl(format);
}
function exportCart(marketplace) {
  return WebBridge_instance.xl(marketplace);
}
function exportCartName(marketplace) {
  return WebBridge_instance.yl(marketplace);
}
function exportSummary() {
  return WebBridge_instance.zl();
}
function parityRun(argb, width, height) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = WebBridge_instance.em();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var name = item.k8();
    var cfg = item.l8();
    var tmp$ret$2 = name + '\n' + WebBridge_instance.dm(WebBridge_instance.ul(argb, width, height, cfg));
    destination.f(tmp$ret$2);
  }
  // Inline function 'kotlin.collections.toTypedArray' call
  return copyToArray(destination);
}
function isImageRequest(text) {
  return ImageRequestParser_getInstance().lj(text);
}
function orderTextModels(ids, preferred) {
  // Inline function 'kotlin.collections.toTypedArray' call
  var this_0 = GeminiModelFailover_getInstance().bj(toList(ids), preferred);
  return copyToArray(this_0);
}
function orderImageModels(ids) {
  // Inline function 'kotlin.collections.toTypedArray' call
  var this_0 = GeminiModelFailover_getInstance().cj(toList(ids));
  return copyToArray(this_0);
}
function canTryNextModel(code, body) {
  return GeminiModelFailover_getInstance().dj(code, body);
}
function drawingInstructions() {
  return 'You illustrate subjects for brick mosaics by writing drawing commands. Return ONLY one raw JSON object, with no markdown, in this form: {"background":"#RRGGBB","shapes":[...]}. The canvas is 512 by 512 with 0,0 at the top left. Shapes are painted in order, back to front. Allowed shapes: {"type":"rect","x":0,"y":0,"w":10,"h":10,"r":0,"fill":"#RRGGBB"}, {"type":"ellipse","cx":0,"cy":0,"rx":10,"ry":10,"fill":"#RRGGBB"}, {"type":"polygon","points":[[0,0],[10,0],[10,10]],"fill":"#RRGGBB"}, and {"type":"line","x1":0,"y1":0,"x2":10,"y2":10,"width":4,"color":"#RRGGBB"}. Use 40 to 150 shapes. Make one large, centered, instantly recognizable subject with bold flat colors, strong contrast, simple highlights and shadows, and a plain background. Do not draw text.';
}
function imagePrompt(request) {
  return mosaicImagePrompt(request);
}
function defaultModel(provider) {
  switch (provider) {
    case 'gemini':
      return 'gemini-3.8-flash';
    case 'claude':
      return 'claude-sonnet-5-5';
    default:
      return 'gpt-6.2-sol';
  }
}
//region block: post-declaration
protoOf(InternalHashMap).a3 = containsAllEntries;
//endregion
//region block: init
Companion_instance = new Companion();
Unit_instance = new Unit();
_stableSortingIsSupported = null;
Companion_instance_2 = new Companion_2();
CompletedContinuation_instance = new CompletedContinuation();
Companion_instance_4 = new Companion_4();
Companion_instance_5 = new Companion_5();
Companion_instance_6 = new Companion_6();
EmptyIterator_instance = new EmptyIterator();
Key_instance = new Key();
Companion_instance_8 = new Companion_8();
Companion_instance_9 = new Companion_9();
MarketplaceCartBuilder_instance = new MarketplaceCartBuilder();
MosaicConverterEngine_instance = new MosaicConverterEngine();
Color_instance = new Color();
WebBridge_instance = new WebBridge();
Companion_instance_11 = new Companion_11();
//endregion
//region block: exports
export {
  catalogJson as catalogJson,
  convertMosaic as convertMosaic,
  exportCsv as exportCsv,
  exportCsvName as exportCsvName,
  exportCart as exportCart,
  exportCartName as exportCartName,
  exportSummary as exportSummary,
  parityRun as parityRun,
  isImageRequest as isImageRequest,
  orderTextModels as orderTextModels,
  orderImageModels as orderImageModels,
  canTryNextModel as canTryNextModel,
  drawingInstructions as drawingInstructions,
  imagePrompt as imagePrompt,
  defaultModel as defaultModel,
};
//endregion

