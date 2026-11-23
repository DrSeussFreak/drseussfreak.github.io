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
initMetadataForCompanion(Companion);
initMetadataForClass(Char, 'Char', VOID, VOID, [Comparable]);
initMetadataForInterface(Collection, 'Collection');
initMetadataForInterface(KtSet, 'Set', VOID, VOID, [Collection]);
initMetadataForInterface(KtList, 'List', VOID, VOID, [Collection]);
initMetadataForInterface(Entry, 'Entry');
initMetadataForInterface(KtMap, 'Map');
initMetadataForCompanion(Companion_0);
initMetadataForClass(Enum, 'Enum', VOID, VOID, [Comparable]);
initMetadataForCompanion(Companion_1);
initMetadataForClass(Long, 'Long', VOID, Number_0, [Comparable]);
initMetadataForInterface(FunctionAdapter, 'FunctionAdapter');
initMetadataForObject(Digit, 'Digit');
initMetadataForObject(Letter, 'Letter');
initMetadataForInterface(Comparator, 'Comparator');
initMetadataForObject(Unit, 'Unit');
initMetadataForClass(AbstractCollection, 'AbstractCollection', VOID, VOID, [Collection]);
initMetadataForClass(AbstractMutableCollection, 'AbstractMutableCollection', VOID, AbstractCollection, [Collection]);
initMetadataForClass(IteratorImpl, 'IteratorImpl');
initMetadataForClass(AbstractMutableList, 'AbstractMutableList', VOID, AbstractMutableCollection, [KtList, Collection]);
initMetadataForClass(AbstractMap, 'AbstractMap', VOID, VOID, [KtMap]);
initMetadataForClass(AbstractMutableMap, 'AbstractMutableMap', VOID, AbstractMap, [KtMap]);
initMetadataForClass(AbstractMutableSet, 'AbstractMutableSet', VOID, AbstractMutableCollection, [KtSet, Collection]);
initMetadataForCompanion(Companion_2);
initMetadataForInterface(RandomAccess, 'RandomAccess');
initMetadataForClass(ArrayList, 'ArrayList', ArrayList_init_$Create$, AbstractMutableList, [KtList, Collection, RandomAccess]);
initMetadataForClass(HashMap, 'HashMap', HashMap_init_$Create$, AbstractMutableMap, [KtMap]);
initMetadataForClass(HashMapValues, 'HashMapValues', VOID, AbstractMutableCollection, [Collection]);
initMetadataForClass(HashMapEntrySetBase, 'HashMapEntrySetBase', VOID, AbstractMutableSet, [KtSet, Collection]);
initMetadataForClass(HashMapEntrySet, 'HashMapEntrySet', VOID, HashMapEntrySetBase);
initMetadataForClass(HashMapValuesDefault$iterator$1);
initMetadataForClass(HashMapValuesDefault, 'HashMapValuesDefault', VOID, AbstractMutableCollection);
initMetadataForClass(HashSet, 'HashSet', HashSet_init_$Create$, AbstractMutableSet, [KtSet, Collection]);
initMetadataForCompanion(Companion_3);
initMetadataForClass(Itr, 'Itr');
initMetadataForClass(KeysItr, 'KeysItr', VOID, Itr);
initMetadataForClass(ValuesItr, 'ValuesItr', VOID, Itr);
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
        tmp_0 = this.u5(entry);
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
initMetadataForClass(CharacterCodingException, 'CharacterCodingException', CharacterCodingException_init_$Create$, Exception);
initMetadataForClass(StringBuilder, 'StringBuilder', StringBuilder_init_$Create$_0, VOID, [CharSequence]);
initMetadataForCompanion(Companion_4);
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
initMetadataForCompanion(Companion_5);
initMetadataForClass(AbstractMap$values$1$iterator$1);
initMetadataForCompanion(Companion_6);
initMetadataForClass(AbstractMap$values$1, VOID, VOID, AbstractCollection);
initMetadataForCompanion(Companion_7);
initMetadataForCompanion(Companion_8);
initMetadataForClass(ArrayDeque, 'ArrayDeque', ArrayDeque_init_$Create$, AbstractMutableList);
initMetadataForObject(EmptyIterator, 'EmptyIterator');
initMetadataForObject(EmptyList, 'EmptyList', VOID, VOID, [KtList, RandomAccess]);
initMetadataForClass(IndexedValue, 'IndexedValue');
initMetadataForClass(IndexingIterable, 'IndexingIterable');
initMetadataForClass(IndexingIterator, 'IndexingIterator');
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
initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(Key, 'Key');
function releaseInterceptedContinuation(continuation) {
}
initMetadataForInterface(ContinuationInterceptor, 'ContinuationInterceptor');
initMetadataForObject(EmptyCoroutineContext, 'EmptyCoroutineContext');
initMetadataForClass(CoroutineSingletons, 'CoroutineSingletons', VOID, Enum);
initMetadataForClass(EnumEntriesList, 'EnumEntriesList', VOID, AbstractList, [KtList, RandomAccess]);
initMetadataForCompanion(Companion_9);
initMetadataForClass(IntProgression, 'IntProgression');
initMetadataForClass(IntRange, 'IntRange', VOID, IntProgression);
initMetadataForClass(IntProgressionIterator, 'IntProgressionIterator', VOID, IntIterator);
initMetadataForCompanion(Companion_10);
initMetadataForCompanion(Companion_11);
initMetadataForClass(Failure, 'Failure');
initMetadataForClass(NotImplementedError, 'NotImplementedError', NotImplementedError, Error_0);
initMetadataForClass(Pair, 'Pair');
initMetadataForClass(Triple, 'Triple');
initMetadataForClass(BrickMarketplace, 'BrickMarketplace', VOID, Enum);
initMetadataForClass(MarketplaceQuote, 'MarketplaceQuote');
initMetadataForClass(CostSuggestionActionType, 'CostSuggestionActionType', VOID, Enum);
initMetadataForClass(CostSavingSuggestion, 'CostSavingSuggestion');
initMetadataForClass(sam$kotlin_Comparator$0_1, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(MarketplaceCartBuilder, 'MarketplaceCartBuilder');
initMetadataForClass(sam$kotlin_Comparator$0_2, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_3, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_4, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_5, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_6, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(MosaicConverterEngine, 'MosaicConverterEngine');
initMetadataForClass(MarketplaceCsvFormat, 'MarketplaceCsvFormat', VOID, Enum);
initMetadataForObject(MosaicExporter, 'MosaicExporter');
initMetadataForClass(sam$kotlin_Comparator$0_7, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_8, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
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
initMetadataForCompanion(Companion_12);
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
initMetadataForClass(ByteSink, 'ByteSink', ByteSink);
initMetadataForObject(Checksums, 'Checksums');
initMetadataForClass(Bits, 'Bits');
initMetadataForObject(Deflate, 'Deflate');
initMetadataForObject(ZipArchive, 'ZipArchive');
initMetadataForObject(PngEncoder, 'PngEncoder');
initMetadataForClass(PdfPageWriter, 'PdfPageWriter');
initMetadataForObject(PdfFont, 'PdfFont');
initMetadataForClass(PageBuilder, 'PageBuilder');
initMetadataForClass(StepGroup, 'StepGroup');
initMetadataForClass(sam$kotlin_Comparator$0_9, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(InstructionPdf, 'InstructionPdf');
initMetadataForObject(MosaicRasterSize, 'MosaicRasterSize');
initMetadataForObject(BrickColorIds, 'BrickColorIds');
initMetadataForObject(BrickColorQuery, 'BrickColorQuery');
initMetadataForClass(MirrorMode, 'MirrorMode', VOID, Enum);
initMetadataForClass(MosaicEditSession, 'MosaicEditSession');
initMetadataForClass(PixelImage, 'PixelImage');
initMetadataForObject(ImageTweaks, 'ImageTweaks');
initMetadataForClass(IndexedImage, 'IndexedImage');
initMetadataForClass(Painter, 'Painter');
initMetadataForClass(sam$kotlin_Comparator$0_10, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(MosaicRaster, 'MosaicRaster');
initMetadataForClass(ProExportKind, 'ProExportKind', VOID, Enum);
initMetadataForObject(ExportText, 'ExportText');
initMetadataForObject(LDrawModel, 'LDrawModel');
initMetadataForObject(StudioPackage, 'StudioPackage');
initMetadataForObject(ProExports, 'ProExports');
initMetadataForClass(PickABrickRegion, 'PickABrickRegion', VOID, Enum);
initMetadataForClass(Bitmap, 'Bitmap');
initMetadataForObject(Color, 'Color');
initMetadataForClass(WebConfig, 'WebConfig');
initMetadataForObject(WebBridge, 'WebBridge');
initMetadataForCompanion(Companion_13);
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
function get_indices(_this__u8e3s4) {
  return new IntRange(0, get_lastIndex_0(_this__u8e3s4));
}
function get_lastIndex_0(_this__u8e3s4) {
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
function contains(_this__u8e3s4, element) {
  return indexOf_0(_this__u8e3s4, element) >= 0;
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
function indexOf_0(_this__u8e3s4, element) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (element === _this__u8e3s4[index]) {
        return index;
      }
    }
     while (inductionVariable <= last);
  return -1;
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
function last(_this__u8e3s4) {
  if (_this__u8e3s4.j())
    throw NoSuchElementException_init_$Create$_0('List is empty.');
  return _this__u8e3s4.k(get_lastIndex_1(_this__u8e3s4));
}
function toIntArray(_this__u8e3s4) {
  var result = new Int32Array(_this__u8e3s4.l());
  var index = 0;
  var _iterator__ex2g4s = _this__u8e3s4.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    result[_unary__edvuaz] = element;
  }
  return result;
}
function withIndex(_this__u8e3s4) {
  return new IndexingIterable(withIndex$lambda(_this__u8e3s4));
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
function withIndex$lambda($this_withIndex) {
  return function () {
    return $this_withIndex.g();
  };
}
function asSequence$$inlined$Sequence$1($this_asSequence) {
  this.q_1 = $this_asSequence;
}
protoOf(asSequence$$inlined$Sequence$1).g = function () {
  return this.q_1.g();
};
function downTo(_this__u8e3s4, to) {
  return Companion_instance_10.r(_this__u8e3s4, to, -1);
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
function dropLast(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested character count ' + n + ' is less than zero.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  return take_0(_this__u8e3s4, coerceAtLeast(_this__u8e3s4.length - n | 0, 0));
}
function take_0(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested character count ' + n + ' is less than zero.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  return substring(_this__u8e3s4, 0, coerceAtMost(n, _this__u8e3s4.length));
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
function Char__compareTo_impl_ypi4mb_0($this, other) {
  return Char__compareTo_impl_ypi4mb($this.s_1, other instanceof Char ? other.s_1 : THROW_CCE());
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
function Char__equals_impl_x6719k($this, other) {
  if (!(other instanceof Char))
    return false;
  return _get_value__a43j40($this) === _get_value__a43j40(other.s_1);
}
function Char__hashCode_impl_otmys($this) {
  return _get_value__a43j40($this);
}
function Companion() {
  Companion_instance = this;
  this.t_1 = _Char___init__impl__6a9atx(0);
  this.u_1 = _Char___init__impl__6a9atx(65535);
  this.v_1 = _Char___init__impl__6a9atx(55296);
  this.w_1 = _Char___init__impl__6a9atx(56319);
  this.x_1 = _Char___init__impl__6a9atx(56320);
  this.y_1 = _Char___init__impl__6a9atx(57343);
  this.z_1 = _Char___init__impl__6a9atx(55296);
  this.a1_1 = _Char___init__impl__6a9atx(57343);
  this.b1_1 = 2;
  this.c1_1 = 16;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance == null)
    new Companion();
  return Companion_instance;
}
function Char(value) {
  Companion_getInstance();
  this.s_1 = value;
}
protoOf(Char).d1 = function (other) {
  return Char__compareTo_impl_ypi4mb(this.s_1, other);
};
protoOf(Char).d = function (other) {
  return Char__compareTo_impl_ypi4mb_0(this, other);
};
protoOf(Char).toString = function () {
  return toString(this.s_1);
};
protoOf(Char).equals = function (other) {
  return Char__equals_impl_x6719k(this.s_1, other);
};
protoOf(Char).hashCode = function () {
  return Char__hashCode_impl_otmys(this.s_1);
};
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
function Companion_0() {
}
var Companion_instance_0;
function Companion_getInstance_0() {
  return Companion_instance_0;
}
function Enum(name, ordinal) {
  this.n1_1 = name;
  this.o1_1 = ordinal;
}
protoOf(Enum).p1 = function (other) {
  return compareTo(this.o1_1, other.o1_1);
};
protoOf(Enum).d = function (other) {
  return this.p1(other instanceof Enum ? other : THROW_CCE());
};
protoOf(Enum).equals = function (other) {
  return this === other;
};
protoOf(Enum).hashCode = function () {
  return identityHashCode(this);
};
protoOf(Enum).toString = function () {
  return this.n1_1;
};
function toString_0(_this__u8e3s4) {
  var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : toString_1(_this__u8e3s4);
  return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
}
function Companion_1() {
  Companion_instance_1 = this;
  this.q1_1 = new Long(0, -2147483648);
  this.r1_1 = new Long(-1, 2147483647);
  this.s1_1 = 8;
  this.t1_1 = 64;
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 == null)
    new Companion_1();
  return Companion_instance_1;
}
function Long(low, high) {
  Companion_getInstance_1();
  Number_0.call(this);
  this.u1_1 = low;
  this.v1_1 = high;
}
protoOf(Long).w1 = function (other) {
  return compare(this, other);
};
protoOf(Long).d = function (other) {
  return this.w1(other instanceof Long ? other : THROW_CCE());
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
  return _this__u8e3s4.u1_1;
}
function toNumber(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.v1_1 * 4.294967296E9 + getLowBitsUnsigned(_this__u8e3s4);
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
  return _this__u8e3s4.v1_1 === other.v1_1 && _this__u8e3s4.u1_1 === other.u1_1;
}
function hashCode(l) {
  _init_properties_boxedLong_kt__v24qrw();
  return l.u1_1 ^ l.v1_1;
}
function fromInt(value) {
  _init_properties_boxedLong_kt__v24qrw();
  return new Long(value, value < 0 ? -1 : 0);
}
function isNegative(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.v1_1 < 0;
}
function subtract(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return add(_this__u8e3s4, negate(other));
}
function getLowBitsUnsigned(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.u1_1 >= 0 ? _this__u8e3s4.u1_1 : 4.294967296E9 + _this__u8e3s4.u1_1;
}
function isZero(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return _this__u8e3s4.v1_1 === 0 && _this__u8e3s4.u1_1 === 0;
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
  var a48 = _this__u8e3s4.v1_1 >>> 16 | 0;
  var a32 = _this__u8e3s4.v1_1 & 65535;
  var a16 = _this__u8e3s4.u1_1 >>> 16 | 0;
  var a00 = _this__u8e3s4.u1_1 & 65535;
  var b48 = other.v1_1 >>> 16 | 0;
  var b32 = other.v1_1 & 65535;
  var b16 = other.u1_1 >>> 16 | 0;
  var b00 = other.u1_1 & 65535;
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
  var a48 = _this__u8e3s4.v1_1 >>> 16 | 0;
  var a32 = _this__u8e3s4.v1_1 & 65535;
  var a16 = _this__u8e3s4.u1_1 >>> 16 | 0;
  var a00 = _this__u8e3s4.u1_1 & 65535;
  var b48 = other.v1_1 >>> 16 | 0;
  var b32 = other.v1_1 & 65535;
  var b16 = other.u1_1 >>> 16 | 0;
  var b00 = other.u1_1 & 65535;
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
  return (_this__u8e3s4.u1_1 & 1) === 1;
}
function lessThan(_this__u8e3s4, other) {
  _init_properties_boxedLong_kt__v24qrw();
  return compare(_this__u8e3s4, other) < 0;
}
function invert(_this__u8e3s4) {
  _init_properties_boxedLong_kt__v24qrw();
  return new Long(~_this__u8e3s4.u1_1, ~_this__u8e3s4.v1_1);
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
      return new Long(_this__u8e3s4.u1_1 >>> numBits_0 | 0 | _this__u8e3s4.v1_1 << (32 - numBits_0 | 0), _this__u8e3s4.v1_1 >> numBits_0);
    } else {
      return new Long(_this__u8e3s4.v1_1 >> (numBits_0 - 32 | 0), _this__u8e3s4.v1_1 >= 0 ? 0 : -1);
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
      return new Long(_this__u8e3s4.u1_1 << numBits_0, _this__u8e3s4.v1_1 << numBits_0 | (_this__u8e3s4.u1_1 >>> (32 - numBits_0 | 0) | 0));
    } else {
      return new Long(0, _this__u8e3s4.u1_1 << (numBits_0 - 32 | 0));
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
  return new Long(_this__u8e3s4.u1_1 & other.u1_1, _this__u8e3s4.v1_1 & other.v1_1);
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
function boxIntrinsic(x) {
  // Inline function 'kotlin.error' call
  var message = 'Should be lowered';
  throw IllegalStateException_init_$Create$_0(toString_1(message));
}
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
function primitiveArrayConcat(args) {
  var size_local = 0;
  var inductionVariable = 0;
  var last = args.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp = size_local;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      size_local = tmp + args[i].length | 0;
    }
     while (!(i === last));
  var a = args[0];
  // Inline function 'kotlin.js.unsafeCast' call
  var result = new a.constructor(size_local);
  // Inline function 'kotlin.js.asDynamic' call
  if (a.$type$ != null) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'withType' call
    result.$type$ = a.$type$;
  }
  size_local = 0;
  var inductionVariable_0 = 0;
  var last_0 = args.length - 1 | 0;
  if (inductionVariable_0 <= last_0)
    do {
      var i_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var arr = args[i_0];
      var inductionVariable_1 = 0;
      var last_1 = arr.length - 1 | 0;
      if (inductionVariable_1 <= last_1)
        do {
          var j = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var _unary__edvuaz = size_local;
          size_local = _unary__edvuaz + 1 | 0;
          result[_unary__edvuaz] = arr[j];
        }
         while (!(j === last_1));
    }
     while (!(i_0 === last_0));
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return result;
}
function toByte(a) {
  // Inline function 'kotlin.js.unsafeCast' call
  return a << 24 >> 24;
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
function copyOf_1(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var size = _this__u8e3s4.length;
  var tmp;
  if (newSize < 16 || size < 16) {
    tmp = fillFrom(_this__u8e3s4, new Int8Array(newSize));
  } else if (newSize > size) {
    // Inline function 'kotlin.also' call
    var this_0 = new Int8Array(newSize);
    // Inline function 'kotlin.js.asDynamic' call
    this_0.set(_this__u8e3s4);
    tmp = this_0;
  } else {
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.slice(0, newSize);
  }
  return tmp;
}
function contentEquals(_this__u8e3s4, other) {
  return contentEqualsInternal(_this__u8e3s4, other);
}
function fill(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
  Companion_instance_5.z1(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(element, fromIndex, toIndex);
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
function fill_0(_this__u8e3s4, element, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
  Companion_instance_5.z1(fromIndex, toIndex, _this__u8e3s4.length);
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(element, fromIndex, toIndex);
}
function decodeVarLenBase64(base64, fromBase64, resultLength) {
  var result = new Int32Array(resultLength);
  var index = 0;
  var int = 0;
  var shift = 0;
  var inductionVariable = 0;
  var last = base64.length;
  while (inductionVariable < last) {
    var char = charCodeAt(base64, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    // Inline function 'kotlin.code' call
    var sixBit = fromBase64[Char__toInt_impl_vasixd(char)];
    int = int | (sixBit & 31) << shift;
    if (sixBit < 32) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      result[_unary__edvuaz] = int;
      int = 0;
      shift = 0;
    } else {
      shift = shift + 5 | 0;
    }
  }
  return result;
}
function isDigitImpl(_this__u8e3s4) {
  return digitToIntImpl(_this__u8e3s4) >= 0;
}
function digitToIntImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  var index = binarySearchRange(Digit_getInstance().a2_1, ch);
  var diff = ch - Digit_getInstance().a2_1[index] | 0;
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
  tmp.a2_1 = new Int32Array([48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296]);
}
var Digit_instance;
function Digit_getInstance() {
  if (Digit_instance == null)
    new Digit();
  return Digit_instance;
}
function isLetterImpl(_this__u8e3s4) {
  return !(getLetterType(_this__u8e3s4) === 0);
}
function getLetterType(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  var index = binarySearchRange(Letter_getInstance().b2_1, ch);
  var rangeStart = Letter_getInstance().b2_1[index];
  var rangeEnd = (rangeStart + Letter_getInstance().c2_1[index] | 0) - 1 | 0;
  var code = Letter_getInstance().d2_1[index];
  if (ch > rangeEnd) {
    return 0;
  }
  var lastTwoBits = code & 3;
  if (lastTwoBits === 0) {
    var shift = 2;
    var threshold = rangeStart;
    var inductionVariable = 0;
    if (inductionVariable <= 1)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        threshold = threshold + (code >> shift & 127) | 0;
        if (threshold > ch) {
          return 3;
        }
        shift = shift + 7 | 0;
        threshold = threshold + (code >> shift & 127) | 0;
        if (threshold > ch) {
          return 0;
        }
        shift = shift + 7 | 0;
      }
       while (inductionVariable <= 1);
    return 3;
  }
  if (code <= 7) {
    return lastTwoBits;
  }
  var distance = ch - rangeStart | 0;
  var shift_0 = code <= 31 ? distance % 2 | 0 : distance;
  return code >> imul_0(2, shift_0) & 3;
}
function Letter() {
  Letter_instance = this;
  var toBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var fromBase64 = new Int32Array(128);
  var inductionVariable = 0;
  var last = charSequenceLength(toBase64) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charCodeAt(toBase64, i);
      fromBase64[Char__toInt_impl_vasixd(this_0)] = i;
    }
     while (inductionVariable <= last);
  var rangeStartDiff = 'hCgBpCQGYHZH5BRpBPPPPPPRMP5BPPlCPP6BkEPPPPcPXPzBvBrB3BOiDoBHwD+E3DauCnFmBmB2D6E1BlBTiBmBlBP5BhBiBrBvBjBqBnBPRtBiCmCtBlB0BmB5BiB7BmBgEmChBZgCoEoGVpBSfRhBPqKQ2BwBYoFgB4CJuTiEvBuCuDrF5DgEgFlJ1DgFmBQtBsBRGsB+BPiBlD1EIjDPRPPPQPPPPPGQSQS/DxENVNU+B9zCwBwBPPCkDPNnBPqDYY1R8B7FkFgTgwGgwUwmBgKwBuBScmEP/BPPPPPPrBP8B7F1B/ErBqC6B7BiBmBfQsBUwCw/KwqIwLwETPcPjQgJxFgBlBsD';
  var diff = decodeVarLenBase64(rangeStartDiff, fromBase64, 222);
  var start = new Int32Array(diff.length);
  var inductionVariable_0 = 0;
  var last_0 = diff.length - 1 | 0;
  if (inductionVariable_0 <= last_0)
    do {
      var i_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      if (i_0 === 0) {
        start[i_0] = diff[i_0];
      } else {
        start[i_0] = start[i_0 - 1 | 0] + diff[i_0] | 0;
      }
    }
     while (inductionVariable_0 <= last_0);
  this.b2_1 = start;
  var rangeLength = 'aaMBXHYH5BRpBPPPPPPRMP5BPPlCPPzBDOOPPcPXPzBvBjB3BOhDmBBpB7DoDYxB+EiBP1DoExBkBQhBekBPmBgBhBctBiBMWOOXhCsBpBkBUV3Ba4BkB0DlCgBXgBtD4FSdBfPhBPpKP0BvBXjEQ2CGsT8DhBtCqDpFvD1D3E0IrD2EkBJrBDOBsB+BPiBlB1EIjDPPPPPPPPPPPGPPMNLsBNPNPKCvBvBPPCkDPBmBPhDXXgD4B6FzEgDguG9vUtkB9JcuBSckEP/BPPPPPPBPf4FrBjEhBpC3B5BKaWPrBOwCk/KsCuLqDHPbPxPsFtEaaqDL';
  this.c2_1 = decodeVarLenBase64(rangeLength, fromBase64, 222);
  var rangeCategory = 'GFjgggUHGGFFZZZmzpz5qB6s6020B60ptltB6smt2sB60mz22B1+vv+8BZZ5s2850BW5q1ymtB506smzBF3q1q1qB1q1q1+Bgii4wDTm74g3KiggxqM60q1q1Bq1o1q1BF1qlrqrBZ2q5wprBGFZWWZGHFsjiooLowgmOowjkwCkgoiIk7ligGogiioBkwkiYkzj2oNoi+sbkwj04DghhkQ8wgiYkgoioDsgnkwC4gikQ//v+85BkwvoIsgoyI4yguI0whiwEowri4CoghsJowgqYowgm4DkwgsY/nwnzPowhmYkg6wI8yggZswikwHgxgmIoxgqYkwgk4DkxgmIkgoioBsgssoBgzgyI8g9gL8g9kI0wgwJoxgkoC0wgioFkw/wI0w53iF4gioYowjmgBHGq1qkgwBF1q1q8qBHwghuIwghyKk0goQkwgoQk3goQHGFHkyg0pBgxj6IoinkxDswno7Ikwhz9Bo0gioB8z48Rwli0xN0mpjoX8w78pDwltoqKHFGGwwgsIHFH3q1q16BFHWFZ1q10q1B2qlwq1B1q10q1B2q1yq1B6q1gq1Biq1qhxBir1qp1Bqt1q1qB1g1q1+B//3q16B///q1qBH/qlqq9Bholqq9B1i00a1q10qD1op1HkwmigEigiy6Cptogq1Bixo1kDq7/j00B2qgoBWGFm1lz50B6s5q1+BGWhggzhwBFFhgk4//Bo2jigE8wguI8wguI8wgugUog1qoB4qjmIwwi2KgkYHHH4lBgiFWkgIWoghssMmz5smrBZ3q1y50B5sm7gzBtz1smzB5smz50BqzqtmzB5sgzqzBF2/9//5BowgoIwmnkzPkwgk4C8ys65BkgoqI0wgy6FghquZo2giY0ghiIsgh24B4ghsQ8QF/v1q1OFs0O8iCHHF1qggz/B8wg6Iznv+//B08QgohsjK0QGFk7hsQ4gB';
  this.d2_1 = decodeVarLenBase64(rangeCategory, fromBase64, 222);
}
var Letter_instance;
function Letter_getInstance() {
  if (Letter_instance == null)
    new Letter();
  return Letter_instance;
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
  Companion_instance_5.z1(startIndex, endIndex, source.length);
  var rangeSize = endIndex - startIndex | 0;
  Companion_instance_5.z1(destinationOffset, destinationOffset + rangeSize | 0, destination.length);
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
function arrayOfNulls(reference, size) {
  // Inline function 'kotlin.arrayOfNulls' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return Array(size);
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
      list.e2(i, array[i]);
    }
     while (inductionVariable < last);
}
function AbstractMutableCollection() {
  AbstractCollection.call(this);
}
protoOf(AbstractMutableCollection).p = function (elements) {
  this.f2();
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
protoOf(AbstractMutableCollection).f2 = function () {
};
function IteratorImpl($outer) {
  this.i2_1 = $outer;
  this.g2_1 = 0;
  this.h2_1 = -1;
}
protoOf(IteratorImpl).h = function () {
  return this.g2_1 < this.i2_1.l();
};
protoOf(IteratorImpl).i = function () {
  if (!this.h())
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.g2_1;
  this.g2_1 = _unary__edvuaz + 1 | 0;
  tmp.h2_1 = _unary__edvuaz;
  return this.i2_1.k(this.h2_1);
};
function AbstractMutableList() {
  AbstractMutableCollection.call(this);
  this.j2_1 = 0;
}
protoOf(AbstractMutableList).f = function (element) {
  this.f2();
  this.k2(this.l(), element);
  return true;
};
protoOf(AbstractMutableList).g = function () {
  return new IteratorImpl(this);
};
protoOf(AbstractMutableList).e1 = function (element) {
  return this.l2(element) >= 0;
};
protoOf(AbstractMutableList).l2 = function (element) {
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
  return Companion_instance_5.m2(this, other);
};
protoOf(AbstractMutableList).hashCode = function () {
  return Companion_instance_5.n2(this);
};
function AbstractMutableMap() {
  AbstractMap.call(this);
  this.q2_1 = null;
  this.r2_1 = null;
}
protoOf(AbstractMutableMap).s2 = function () {
  return new HashMapValuesDefault(this);
};
protoOf(AbstractMutableMap).l1 = function () {
  var tmp0_elvis_lhs = this.r2_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = this.s2();
    this.r2_1 = this_0;
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
};
protoOf(AbstractMutableMap).f2 = function () {
};
function AbstractMutableSet() {
  AbstractMutableCollection.call(this);
}
protoOf(AbstractMutableSet).equals = function (other) {
  if (other === this)
    return true;
  if (!(!(other == null) ? isInterface(other, KtSet) : false))
    return false;
  return Companion_instance_7.x2(this, other);
};
protoOf(AbstractMutableSet).hashCode = function () {
  return Companion_instance_7.y2(this);
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
function Companion_2() {
  Companion_instance_2 = this;
  var tmp = this;
  // Inline function 'kotlin.also' call
  var this_0 = ArrayList_init_$Create$_0(0);
  this_0.o_1 = true;
  tmp.z2_1 = this_0;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  if (Companion_instance_2 == null)
    new Companion_2();
  return Companion_instance_2;
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
  Companion_instance_5.a3(index, $this.l());
  return index;
}
function insertionRangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance_5.b3(index, $this.l());
  return index;
}
function ArrayList(array) {
  Companion_getInstance_2();
  AbstractMutableList.call(this);
  this.n_1 = array;
  this.o_1 = false;
}
protoOf(ArrayList).c3 = function () {
  this.f2();
  this.o_1 = true;
  return this.l() > 0 ? this : Companion_getInstance_2().z2_1;
};
protoOf(ArrayList).l = function () {
  return this.n_1.length;
};
protoOf(ArrayList).k = function (index) {
  return this.n_1[rangeCheck(this, index)];
};
protoOf(ArrayList).e2 = function (index, element) {
  this.f2();
  rangeCheck(this, index);
  // Inline function 'kotlin.apply' call
  var this_0 = this.n_1[index];
  this.n_1[index] = element;
  return this_0;
};
protoOf(ArrayList).f = function (element) {
  this.f2();
  // Inline function 'kotlin.js.asDynamic' call
  this.n_1.push(element);
  this.j2_1 = this.j2_1 + 1 | 0;
  return true;
};
protoOf(ArrayList).k2 = function (index, element) {
  this.f2();
  // Inline function 'kotlin.js.asDynamic' call
  this.n_1.splice(insertionRangeCheck(this, index), 0, element);
  this.j2_1 = this.j2_1 + 1 | 0;
};
protoOf(ArrayList).p = function (elements) {
  this.f2();
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
  this.j2_1 = this.j2_1 + 1 | 0;
  return true;
};
protoOf(ArrayList).d3 = function () {
  this.f2();
  var tmp = this;
  // Inline function 'kotlin.emptyArray' call
  tmp.n_1 = [];
  this.j2_1 = this.j2_1 + 1 | 0;
};
protoOf(ArrayList).l2 = function (element) {
  return indexOf(this.n_1, element);
};
protoOf(ArrayList).toString = function () {
  return arrayToString(this.n_1);
};
protoOf(ArrayList).e3 = function () {
  return [].slice.call(this.n_1);
};
protoOf(ArrayList).toArray = function () {
  return this.e3();
};
protoOf(ArrayList).f2 = function () {
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
  $this.j3_1 = internalMap;
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
protoOf(HashMap).i1 = function (key) {
  return this.j3_1.l3(key);
};
protoOf(HashMap).j1 = function (value) {
  return this.j3_1.j1(value);
};
protoOf(HashMap).s2 = function () {
  return new HashMapValues(this.j3_1);
};
protoOf(HashMap).m1 = function () {
  var tmp0_elvis_lhs = this.k3_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = new HashMapEntrySet(this.j3_1);
    this.k3_1 = this_0;
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
};
protoOf(HashMap).k1 = function (key) {
  return this.j3_1.k1(key);
};
protoOf(HashMap).t2 = function (key, value) {
  return this.j3_1.t2(key, value);
};
protoOf(HashMap).l = function () {
  return this.j3_1.l();
};
function HashMap() {
  this.k3_1 = null;
}
function HashMapValues(backing) {
  AbstractMutableCollection.call(this);
  this.m3_1 = backing;
}
protoOf(HashMapValues).l = function () {
  return this.m3_1.l();
};
protoOf(HashMapValues).j = function () {
  return this.m3_1.l() === 0;
};
protoOf(HashMapValues).n3 = function (element) {
  return this.m3_1.j1(element);
};
protoOf(HashMapValues).e1 = function (element) {
  if (!true)
    return false;
  return this.n3(element);
};
protoOf(HashMapValues).o3 = function (element) {
  throw UnsupportedOperationException_init_$Create$();
};
protoOf(HashMapValues).f = function (element) {
  return this.o3(element);
};
protoOf(HashMapValues).p3 = function (elements) {
  throw UnsupportedOperationException_init_$Create$();
};
protoOf(HashMapValues).p = function (elements) {
  return this.p3(elements);
};
protoOf(HashMapValues).g = function () {
  return this.m3_1.q3();
};
protoOf(HashMapValues).f2 = function () {
  return this.m3_1.r3();
};
function HashMapEntrySet(backing) {
  HashMapEntrySetBase.call(this, backing);
}
protoOf(HashMapEntrySet).g = function () {
  return this.t3_1.u3();
};
function HashMapEntrySetBase(backing) {
  AbstractMutableSet.call(this);
  this.t3_1 = backing;
}
protoOf(HashMapEntrySetBase).l = function () {
  return this.t3_1.l();
};
protoOf(HashMapEntrySetBase).j = function () {
  return this.t3_1.l() === 0;
};
protoOf(HashMapEntrySetBase).v3 = function (element) {
  return this.t3_1.x3(element);
};
protoOf(HashMapEntrySetBase).e1 = function (element) {
  if (!(!(element == null) ? isInterface(element, Entry) : false))
    return false;
  return this.v3((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
};
protoOf(HashMapEntrySetBase).w3 = function (element) {
  throw UnsupportedOperationException_init_$Create$();
};
protoOf(HashMapEntrySetBase).f = function (element) {
  return this.w3((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
};
protoOf(HashMapEntrySetBase).p = function (elements) {
  throw UnsupportedOperationException_init_$Create$();
};
protoOf(HashMapEntrySetBase).f1 = function (elements) {
  return this.t3_1.y3(elements);
};
protoOf(HashMapEntrySetBase).f2 = function () {
  return this.t3_1.r3();
};
function HashMapValuesDefault$iterator$1($entryIterator) {
  this.z3_1 = $entryIterator;
}
protoOf(HashMapValuesDefault$iterator$1).h = function () {
  return this.z3_1.h();
};
protoOf(HashMapValuesDefault$iterator$1).i = function () {
  return this.z3_1.i().h1();
};
function HashMapValuesDefault(backingMap) {
  AbstractMutableCollection.call(this);
  this.a4_1 = backingMap;
}
protoOf(HashMapValuesDefault).o3 = function (element) {
  throw UnsupportedOperationException_init_$Create$_0('Add is not supported on values');
};
protoOf(HashMapValuesDefault).f = function (element) {
  return this.o3(element);
};
protoOf(HashMapValuesDefault).n3 = function (element) {
  return this.a4_1.j1(element);
};
protoOf(HashMapValuesDefault).e1 = function (element) {
  if (!true)
    return false;
  return this.n3(element);
};
protoOf(HashMapValuesDefault).g = function () {
  var entryIterator = this.a4_1.m1().g();
  return new HashMapValuesDefault$iterator$1(entryIterator);
};
protoOf(HashMapValuesDefault).l = function () {
  return this.a4_1.l();
};
protoOf(HashMapValuesDefault).f2 = function () {
  return this.a4_1.f2();
};
function HashSet_init_$Init$(map, $this) {
  AbstractMutableSet.call($this);
  HashSet.call($this);
  $this.b4_1 = map;
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
    $this.b4_1.t2(element, true);
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
  return this.b4_1.t2(element, true) == null;
};
protoOf(HashSet).e1 = function (element) {
  return this.b4_1.l3(element);
};
protoOf(HashSet).j = function () {
  return this.b4_1.l() === 0;
};
protoOf(HashSet).g = function () {
  return this.b4_1.c4();
};
protoOf(HashSet).l = function () {
  return this.b4_1.l();
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
  if (!($this.n4_1.k4_1 === $this.p4_1))
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
  InternalHashMap.call($this, arrayOfUninitializedElements(initialCapacity), null, new Int32Array(initialCapacity), new Int32Array(computeHashSize(Companion_instance_3, initialCapacity)), 2, 0);
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
  return $this.d4_1.length;
}
function _get_hashSize__tftcho($this) {
  return $this.g4_1.length;
}
function registerModification($this) {
  $this.k4_1 = $this.k4_1 + 1 | 0;
}
function ensureExtraCapacity($this, n) {
  if (shouldCompact($this, n)) {
    compact($this, true);
  } else {
    ensureCapacity($this, $this.i4_1 + n | 0);
  }
}
function shouldCompact($this, extraCapacity) {
  var spareCapacity = _get_capacity__a9k9f3($this) - $this.i4_1 | 0;
  var gaps = $this.i4_1 - $this.l() | 0;
  return spareCapacity < extraCapacity && (gaps + spareCapacity | 0) >= extraCapacity && gaps >= (_get_capacity__a9k9f3($this) / 4 | 0);
}
function ensureCapacity($this, minCapacity) {
  if (minCapacity < 0)
    throw RuntimeException_init_$Create$_0('too many elements');
  if (minCapacity > _get_capacity__a9k9f3($this)) {
    var newSize = Companion_instance_5.q4(_get_capacity__a9k9f3($this), minCapacity);
    $this.d4_1 = copyOfUninitializedElements($this.d4_1, newSize);
    var tmp = $this;
    var tmp0_safe_receiver = $this.e4_1;
    tmp.e4_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
    $this.f4_1 = copyOf($this.f4_1, newSize);
    var newHashSize = computeHashSize(Companion_instance_3, newSize);
    if (newHashSize > _get_hashSize__tftcho($this)) {
      rehash($this, newHashSize);
    }
  }
}
function allocateValuesArray($this) {
  var curValuesArray = $this.e4_1;
  if (!(curValuesArray == null))
    return curValuesArray;
  var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
  $this.e4_1 = newValuesArray;
  return newValuesArray;
}
function hash($this, key) {
  return key == null ? 0 : imul_0(hashCode_0(key), -1640531527) >>> $this.j4_1 | 0;
}
function compact($this, updateHashArray) {
  var i = 0;
  var j = 0;
  var valuesArray = $this.e4_1;
  while (i < $this.i4_1) {
    var hash = $this.f4_1[i];
    if (hash >= 0) {
      $this.d4_1[j] = $this.d4_1[i];
      if (!(valuesArray == null)) {
        valuesArray[j] = valuesArray[i];
      }
      if (updateHashArray) {
        $this.f4_1[j] = hash;
        $this.g4_1[hash] = j + 1 | 0;
      }
      j = j + 1 | 0;
    }
    i = i + 1 | 0;
  }
  resetRange($this.d4_1, j, $this.i4_1);
  if (valuesArray == null)
    null;
  else {
    resetRange(valuesArray, j, $this.i4_1);
  }
  $this.i4_1 = j;
}
function rehash($this, newHashSize) {
  registerModification($this);
  if ($this.i4_1 > $this.l4_1) {
    compact($this, false);
  }
  $this.g4_1 = new Int32Array(newHashSize);
  $this.j4_1 = computeShift(Companion_instance_3, newHashSize);
  var i = 0;
  while (i < $this.i4_1) {
    var _unary__edvuaz = i;
    i = _unary__edvuaz + 1 | 0;
    if (!putRehash($this, _unary__edvuaz)) {
      throw IllegalStateException_init_$Create$_0('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
    }
  }
}
function putRehash($this, i) {
  var hash_0 = hash($this, $this.d4_1[i]);
  var probesLeft = $this.h4_1;
  while (true) {
    var index = $this.g4_1[hash_0];
    if (index === 0) {
      $this.g4_1[hash_0] = i + 1 | 0;
      $this.f4_1[i] = hash_0;
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
  var probesLeft = $this.h4_1;
  while (true) {
    var index = $this.g4_1[hash_0];
    if (index === 0)
      return -1;
    if (equals($this.d4_1[index - 1 | 0], key))
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
function findValue($this, value) {
  var i = $this.i4_1;
  $l$loop: while (true) {
    i = i - 1 | 0;
    if (!(i >= 0)) {
      break $l$loop;
    }
    if ($this.f4_1[i] >= 0 && equals(ensureNotNull($this.e4_1)[i], value))
      return i;
  }
  return -1;
}
function addKey($this, key) {
  $this.r3();
  retry: while (true) {
    var hash_0 = hash($this, key);
    var tentativeMaxProbeDistance = coerceAtMost(imul_0($this.h4_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
    var probeDistance = 0;
    while (true) {
      var index = $this.g4_1[hash_0];
      if (index === 0) {
        if ($this.i4_1 >= _get_capacity__a9k9f3($this)) {
          ensureExtraCapacity($this, 1);
          continue retry;
        }
        var _unary__edvuaz = $this.i4_1;
        $this.i4_1 = _unary__edvuaz + 1 | 0;
        var putIndex = _unary__edvuaz;
        $this.d4_1[putIndex] = key;
        $this.f4_1[putIndex] = hash_0;
        $this.g4_1[hash_0] = putIndex + 1 | 0;
        $this.l4_1 = $this.l4_1 + 1 | 0;
        registerModification($this);
        if (probeDistance > $this.h4_1)
          $this.h4_1 = probeDistance;
        return putIndex;
      }
      if (equals($this.d4_1[index - 1 | 0], key)) {
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
function contentEquals_0($this, other) {
  return $this.l4_1 === other.l() && $this.y3(other.m1());
}
function Companion_3() {
  this.r4_1 = -1640531527;
  this.s4_1 = 8;
  this.t4_1 = 2;
  this.u4_1 = -1;
}
var Companion_instance_3;
function Companion_getInstance_3() {
  return Companion_instance_3;
}
function Itr(map) {
  this.v4_1 = map;
  this.w4_1 = 0;
  this.x4_1 = -1;
  this.y4_1 = this.v4_1.k4_1;
  this.z4();
}
protoOf(Itr).z4 = function () {
  while (this.w4_1 < this.v4_1.i4_1 && this.v4_1.f4_1[this.w4_1] < 0) {
    this.w4_1 = this.w4_1 + 1 | 0;
  }
};
protoOf(Itr).h = function () {
  return this.w4_1 < this.v4_1.i4_1;
};
protoOf(Itr).a5 = function () {
  if (!(this.v4_1.k4_1 === this.y4_1))
    throw ConcurrentModificationException_init_$Create$();
};
function KeysItr(map) {
  Itr.call(this, map);
}
protoOf(KeysItr).i = function () {
  this.a5();
  if (this.w4_1 >= this.v4_1.i4_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.w4_1;
  this.w4_1 = _unary__edvuaz + 1 | 0;
  tmp.x4_1 = _unary__edvuaz;
  var result = this.v4_1.d4_1[this.x4_1];
  this.z4();
  return result;
};
function ValuesItr(map) {
  Itr.call(this, map);
}
protoOf(ValuesItr).i = function () {
  this.a5();
  if (this.w4_1 >= this.v4_1.i4_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.w4_1;
  this.w4_1 = _unary__edvuaz + 1 | 0;
  tmp.x4_1 = _unary__edvuaz;
  var result = ensureNotNull(this.v4_1.e4_1)[this.x4_1];
  this.z4();
  return result;
};
function EntriesItr(map) {
  Itr.call(this, map);
}
protoOf(EntriesItr).i = function () {
  this.a5();
  if (this.w4_1 >= this.v4_1.i4_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.w4_1;
  this.w4_1 = _unary__edvuaz + 1 | 0;
  tmp.x4_1 = _unary__edvuaz;
  var result = new EntryRef(this.v4_1, this.x4_1);
  this.z4();
  return result;
};
protoOf(EntriesItr).n5 = function () {
  if (this.w4_1 >= this.v4_1.i4_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.w4_1;
  this.w4_1 = _unary__edvuaz + 1 | 0;
  tmp.x4_1 = _unary__edvuaz;
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver = this.v4_1.d4_1[this.x4_1];
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
  var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver_0 = ensureNotNull(this.v4_1.e4_1)[this.x4_1];
  var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
  var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
  this.z4();
  return result;
};
protoOf(EntriesItr).o5 = function (sb) {
  if (this.w4_1 >= this.v4_1.i4_1)
    throw NoSuchElementException_init_$Create$();
  var tmp = this;
  var _unary__edvuaz = this.w4_1;
  this.w4_1 = _unary__edvuaz + 1 | 0;
  tmp.x4_1 = _unary__edvuaz;
  var key = this.v4_1.d4_1[this.x4_1];
  if (equals(key, this.v4_1))
    sb.r5('(this Map)');
  else
    sb.q5(key);
  sb.s5(_Char___init__impl__6a9atx(61));
  var value = ensureNotNull(this.v4_1.e4_1)[this.x4_1];
  if (equals(value, this.v4_1))
    sb.r5('(this Map)');
  else
    sb.q5(value);
  this.z4();
};
function EntryRef(map, index) {
  this.n4_1 = map;
  this.o4_1 = index;
  this.p4_1 = this.n4_1.k4_1;
}
protoOf(EntryRef).g1 = function () {
  checkForComodification(this);
  return this.n4_1.d4_1[this.o4_1];
};
protoOf(EntryRef).h1 = function () {
  checkForComodification(this);
  return ensureNotNull(this.n4_1.e4_1)[this.o4_1];
};
protoOf(EntryRef).equals = function (other) {
  var tmp;
  var tmp_0;
  if (!(other == null) ? isInterface(other, Entry) : false) {
    tmp_0 = equals(other.g1(), this.g1());
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = equals(other.h1(), this.h1());
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(EntryRef).hashCode = function () {
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver = this.g1();
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
  var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  // Inline function 'kotlin.hashCode' call
  var tmp0_safe_receiver_0 = this.h1();
  var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
  return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
};
protoOf(EntryRef).toString = function () {
  return toString_0(this.g1()) + '=' + toString_0(this.h1());
};
function InternalHashMap(keysArray, valuesArray, presenceArray, hashArray, maxProbeDistance, length) {
  this.d4_1 = keysArray;
  this.e4_1 = valuesArray;
  this.f4_1 = presenceArray;
  this.g4_1 = hashArray;
  this.h4_1 = maxProbeDistance;
  this.i4_1 = length;
  this.j4_1 = computeShift(Companion_instance_3, _get_hashSize__tftcho(this));
  this.k4_1 = 0;
  this.l4_1 = 0;
  this.m4_1 = false;
}
protoOf(InternalHashMap).l = function () {
  return this.l4_1;
};
protoOf(InternalHashMap).t5 = function () {
  this.r3();
  this.m4_1 = true;
};
protoOf(InternalHashMap).j1 = function (value) {
  return findValue(this, value) >= 0;
};
protoOf(InternalHashMap).k1 = function (key) {
  var index = findKey(this, key);
  if (index < 0)
    return null;
  return ensureNotNull(this.e4_1)[index];
};
protoOf(InternalHashMap).l3 = function (key) {
  return findKey(this, key) >= 0;
};
protoOf(InternalHashMap).t2 = function (key, value) {
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
      tmp_0 = contentEquals_0(this, other);
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  }
  return tmp;
};
protoOf(InternalHashMap).hashCode = function () {
  var result = 0;
  var it = this.u3();
  while (it.h()) {
    result = result + it.n5() | 0;
  }
  return result;
};
protoOf(InternalHashMap).toString = function () {
  var sb = StringBuilder_init_$Create$(2 + imul_0(this.l4_1, 3) | 0);
  sb.r5('{');
  var i = 0;
  var it = this.u3();
  while (it.h()) {
    if (i > 0) {
      sb.r5(', ');
    }
    it.o5(sb);
    i = i + 1 | 0;
  }
  sb.r5('}');
  return sb.toString();
};
protoOf(InternalHashMap).r3 = function () {
  if (this.m4_1)
    throw UnsupportedOperationException_init_$Create$();
};
protoOf(InternalHashMap).x3 = function (entry) {
  var index = findKey(this, entry.g1());
  if (index < 0)
    return false;
  return equals(ensureNotNull(this.e4_1)[index], entry.h1());
};
protoOf(InternalHashMap).u5 = function (entry) {
  return this.x3(isInterface(entry, Entry) ? entry : THROW_CCE());
};
protoOf(InternalHashMap).c4 = function () {
  return new KeysItr(this);
};
protoOf(InternalHashMap).q3 = function () {
  return new ValuesItr(this);
};
protoOf(InternalHashMap).u3 = function () {
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
protoOf(LinkedHashMap).f2 = function () {
  return this.j3_1.r3();
};
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
  this_0.t5();
  tmp.b6_1 = LinkedHashSet_init_$Create$_2(this_0);
}
var EmptyHolder_instance;
function EmptyHolder_getInstance() {
  if (EmptyHolder_instance == null)
    new EmptyHolder();
  return EmptyHolder_instance;
}
protoOf(LinkedHashSet).c3 = function () {
  this.b4_1.t5();
  return this.l() > 0 ? this : EmptyHolder_getInstance().b6_1;
};
protoOf(LinkedHashSet).f2 = function () {
  return this.b4_1.r3();
};
function LinkedHashSet() {
}
function RandomAccess() {
}
function CoroutineImpl(resultContinuation) {
  InterceptedCoroutine.call(this);
  this.e6_1 = resultContinuation;
  this.f6_1 = 0;
  this.g6_1 = 0;
  this.h6_1 = null;
  this.i6_1 = null;
  this.j6_1 = null;
  var tmp = this;
  var tmp0_safe_receiver = this.e6_1;
  tmp.k6_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.l6();
}
protoOf(CoroutineImpl).l6 = function () {
  return ensureNotNull(this.k6_1);
};
protoOf(CoroutineImpl).m6 = function (result) {
  var current = this;
  // Inline function 'kotlin.Result.getOrNull' call
  var currentResult = _Result___get_isFailure__impl__jpiriv(result) ? null : _Result___get_value__impl__bjfvqg(result);
  var currentException = Result__exceptionOrNull_impl_p6xea9(result);
  while (true) {
    // Inline function 'kotlin.with' call
    var $this$with = current;
    if (currentException == null) {
      $this$with.h6_1 = currentResult;
    } else {
      $this$with.f6_1 = $this$with.g6_1;
      $this$with.i6_1 = currentException;
    }
    try {
      var outcome = $this$with.n6();
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
    $this$with.p6();
    var completion = ensureNotNull($this$with.e6_1);
    if (completion instanceof CoroutineImpl) {
      current = completion;
    } else {
      if (!(currentException == null)) {
        // Inline function 'kotlin.coroutines.resumeWithException' call
        // Inline function 'kotlin.Companion.failure' call
        var exception_0 = currentException;
        var tmp$ret$5 = _Result___init__impl__xyqfz8(createFailure(exception_0));
        completion.q6(tmp$ret$5);
      } else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var value = currentResult;
        var tmp$ret$7 = _Result___init__impl__xyqfz8(value);
        completion.q6(tmp$ret$7);
      }
      return Unit_instance;
    }
  }
};
protoOf(CoroutineImpl).q6 = function (result) {
  return this.m6(result);
};
function CompletedContinuation() {
}
protoOf(CompletedContinuation).l6 = function () {
  // Inline function 'kotlin.error' call
  var message = 'This continuation is already complete';
  throw IllegalStateException_init_$Create$_0(toString_1(message));
};
protoOf(CompletedContinuation).m6 = function (result) {
  // Inline function 'kotlin.error' call
  var message = 'This continuation is already complete';
  throw IllegalStateException_init_$Create$_0(toString_1(message));
};
protoOf(CompletedContinuation).q6 = function (result) {
  return this.m6(result);
};
protoOf(CompletedContinuation).toString = function () {
  return 'This continuation is already complete';
};
var CompletedContinuation_instance;
function CompletedContinuation_getInstance() {
  return CompletedContinuation_instance;
}
function InterceptedCoroutine() {
  this.o6_1 = null;
}
protoOf(InterceptedCoroutine).p6 = function () {
  var intercepted = this.o6_1;
  if (!(intercepted == null) && !(intercepted === this)) {
    ensureNotNull(this.l6().r6(Key_instance)).s6(intercepted);
  }
  this.o6_1 = CompletedContinuation_instance;
};
function createCoroutineUnintercepted(_this__u8e3s4, receiver, completion) {
  // Inline function 'kotlin.coroutines.intrinsics.createCoroutineFromSuspendFunction' call
  return new createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1(completion, _this__u8e3s4, receiver, completion);
}
function invokeSuspendSuperTypeWithReceiver(_this__u8e3s4, receiver, completion) {
  throw new NotImplementedError('It is intrinsic method');
}
function createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1($completion, $this_createCoroutineUnintercepted, $receiver, $completion$1) {
  this.b7_1 = $this_createCoroutineUnintercepted;
  this.c7_1 = $receiver;
  this.d7_1 = $completion$1;
  CoroutineImpl.call(this, isInterface($completion, Continuation) ? $completion : THROW_CCE());
}
protoOf(createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1).n6 = function () {
  if (this.i6_1 != null)
    throw this.i6_1;
  // Inline function 'kotlin.js.asDynamic' call
  var a = this.b7_1;
  return typeof a === 'function' ? a(this.c7_1, this.d7_1) : this.b7_1.e7(this.c7_1, this.d7_1);
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
function abs_0(n) {
  return n < 0 ? -n | 0 : n;
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
  this.h7_1 = jClass;
  this.i7_1 = simpleName;
  this.j7_1 = isInstanceFunction;
}
protoOf(PrimitiveKClassImpl).k7 = function () {
  return this.h7_1;
};
protoOf(PrimitiveKClassImpl).l7 = function () {
  return this.i7_1;
};
function KClassImpl() {
}
protoOf(KClassImpl).equals = function (other) {
  var tmp;
  if (other instanceof NothingKClassImpl) {
    tmp = false;
  } else {
    if (other instanceof KClassImpl) {
      tmp = (equals(this.k7(), other.k7()) && this.l7() == other.l7());
    } else {
      tmp = false;
    }
  }
  return tmp;
};
protoOf(KClassImpl).hashCode = function () {
  var tmp0_safe_receiver = this.l7();
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
  return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
};
protoOf(KClassImpl).toString = function () {
  return 'class ' + this.l7();
};
function NothingKClassImpl() {
}
function reset(_this__u8e3s4) {
  _this__u8e3s4.lastIndex = 0;
}
function CharacterCodingException_init_$Init$($this) {
  CharacterCodingException.call($this, null);
  return $this;
}
function CharacterCodingException_init_$Create$() {
  var tmp = CharacterCodingException_init_$Init$(objectCreate(protoOf(CharacterCodingException)));
  captureStack(tmp, CharacterCodingException_init_$Create$);
  return tmp;
}
function CharacterCodingException(message) {
  Exception_init_$Init$_0(message, this);
  captureStack(this, CharacterCodingException);
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
  this.p5_1 = content;
}
protoOf(StringBuilder).a = function () {
  // Inline function 'kotlin.js.asDynamic' call
  return this.p5_1.length;
};
protoOf(StringBuilder).b = function (index) {
  // Inline function 'kotlin.text.getOrElse' call
  var this_0 = this.p5_1;
  var tmp;
  if (0 <= index ? index <= (charSequenceLength(this_0) - 1 | 0) : false) {
    tmp = charSequenceGet(this_0, index);
  } else {
    throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', length: ' + this.a() + '}');
  }
  return tmp;
};
protoOf(StringBuilder).c = function (startIndex, endIndex) {
  return substring(this.p5_1, startIndex, endIndex);
};
protoOf(StringBuilder).s5 = function (value) {
  this.p5_1 = this.p5_1 + toString(value);
  return this;
};
protoOf(StringBuilder).e = function (value) {
  this.p5_1 = this.p5_1 + toString_0(value);
  return this;
};
protoOf(StringBuilder).m7 = function (value, startIndex, endIndex) {
  return this.n7(value == null ? 'null' : value, startIndex, endIndex);
};
protoOf(StringBuilder).q5 = function (value) {
  this.p5_1 = this.p5_1 + toString_0(value);
  return this;
};
protoOf(StringBuilder).o7 = function (value) {
  this.p5_1 = this.p5_1 + value;
  return this;
};
protoOf(StringBuilder).p7 = function (value) {
  return this.r5(value.toString());
};
protoOf(StringBuilder).r5 = function (value) {
  var tmp = this;
  var tmp_0 = this.p5_1;
  tmp.p5_1 = tmp_0 + (value == null ? 'null' : value);
  return this;
};
protoOf(StringBuilder).toString = function () {
  return this.p5_1;
};
protoOf(StringBuilder).n7 = function (value, startIndex, endIndex) {
  var stringCsq = toString_1(value);
  Companion_instance_5.q7(startIndex, endIndex, stringCsq.length);
  this.p5_1 = this.p5_1 + substring(stringCsq, startIndex, endIndex);
  return this;
};
function uppercaseChar(_this__u8e3s4) {
  // Inline function 'kotlin.text.uppercase' call
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  var uppercase = toString(_this__u8e3s4).toUpperCase();
  return uppercase.length > 1 ? _this__u8e3s4 : charCodeAt(uppercase, 0);
}
function isLetterOrDigit(_this__u8e3s4) {
  if ((_Char___init__impl__6a9atx(97) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(122) : false) || (_Char___init__impl__6a9atx(65) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(90) : false) || (_Char___init__impl__6a9atx(48) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(57) : false)) {
    return true;
  }
  if (Char__compareTo_impl_ypi4mb(_this__u8e3s4, _Char___init__impl__6a9atx(128)) < 0) {
    return false;
  }
  return isDigitImpl(_this__u8e3s4) || isLetterImpl(_this__u8e3s4);
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
function toString_3(_this__u8e3s4, radix) {
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.toString(checkRadix(radix));
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
function toInt(_this__u8e3s4) {
  var tmp0_elvis_lhs = toIntOrNull_0(_this__u8e3s4);
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
function Companion_4() {
  Companion_instance_4 = this;
  this.r7_1 = new RegExp('[\\\\^$*+?.()|[\\]{}]', 'g');
  this.s7_1 = new RegExp('[\\\\$]', 'g');
  this.t7_1 = new RegExp('\\$', 'g');
}
protoOf(Companion_4).u7 = function (literal) {
  // Inline function 'kotlin.text.nativeReplace' call
  var pattern = this.r7_1;
  // Inline function 'kotlin.js.asDynamic' call
  return literal.replace(pattern, '\\$&');
};
protoOf(Companion_4).v7 = function (literal) {
  // Inline function 'kotlin.text.nativeReplace' call
  var pattern = this.t7_1;
  // Inline function 'kotlin.js.asDynamic' call
  return literal.replace(pattern, '$$$$');
};
var Companion_instance_4;
function Companion_getInstance_4() {
  if (Companion_instance_4 == null)
    new Companion_4();
  return Companion_instance_4;
}
function Regex$replace$lambda($replacement) {
  return function (it) {
    return substituteGroupRefs(it, $replacement);
  };
}
function Regex(pattern, options) {
  Companion_getInstance_4();
  this.w7_1 = pattern;
  this.x7_1 = toSet_0(options);
  this.y7_1 = new RegExp(pattern, toFlags(options, 'gu'));
  this.z7_1 = null;
  this.a8_1 = null;
}
protoOf(Regex).b8 = function (input) {
  reset(this.y7_1);
  return this.y7_1.test(toString_1(input));
};
protoOf(Regex).c8 = function (input, startIndex) {
  if (startIndex < 0 || startIndex > charSequenceLength(input)) {
    throw IndexOutOfBoundsException_init_$Create$_0('Start index out of bounds: ' + startIndex + ', input length: ' + charSequenceLength(input));
  }
  return findNext(this.y7_1, toString_1(input), startIndex, this.y7_1);
};
protoOf(Regex).d8 = function (input, startIndex, $super) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  return $super === VOID ? this.c8(input, startIndex) : $super.c8.call(this, input, startIndex);
};
protoOf(Regex).e8 = function (input, replacement) {
  if (!contains_0(replacement, _Char___init__impl__6a9atx(92)) && !contains_0(replacement, _Char___init__impl__6a9atx(36))) {
    var tmp0 = toString_1(input);
    // Inline function 'kotlin.text.nativeReplace' call
    var pattern = this.y7_1;
    // Inline function 'kotlin.js.asDynamic' call
    return tmp0.replace(pattern, replacement);
  }
  return this.f8(input, Regex$replace$lambda(replacement));
};
protoOf(Regex).f8 = function (input, transform) {
  var match = this.d8(input);
  if (match == null)
    return toString_1(input);
  var lastStart = 0;
  var length = charSequenceLength(input);
  var sb = StringBuilder_init_$Create$(length);
  do {
    var foundMatch = ensureNotNull(match);
    sb.m7(input, lastStart, foundMatch.g8().k8());
    sb.e(transform(foundMatch));
    lastStart = foundMatch.g8().l8() + 1 | 0;
    match = foundMatch.i();
  }
   while (lastStart < length && !(match == null));
  if (lastStart < length) {
    sb.m7(input, lastStart, length);
  }
  return sb.toString();
};
protoOf(Regex).toString = function () {
  return this.y7_1.toString();
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
  this.o8_1 = value;
}
function MatchGroup(value) {
  this.p8_1 = value;
}
protoOf(MatchGroup).toString = function () {
  return 'MatchGroup(value=' + this.p8_1 + ')';
};
protoOf(MatchGroup).hashCode = function () {
  return getStringHashCode(this.p8_1);
};
protoOf(MatchGroup).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MatchGroup))
    return false;
  if (!(this.p8_1 === other.p8_1))
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
      result.s5(charCodeAt(replacement, _unary__edvuaz_0));
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
        var tmp0_safe_receiver = get(match.q8(), groupName);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p8_1;
        result.r5(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
        index = endIndex + 1 | 0;
      } else {
        var containsArg = charCodeAt(replacement, index);
        if (!(_Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false))
          throw IllegalArgumentException_init_$Create$_0('Invalid capturing group reference');
        var groups = match.q8();
        var endIndex_0 = readGroupIndex(replacement, index, groups.l());
        var groupIndex = toInt(substring(replacement, index, endIndex_0));
        if (groupIndex >= groups.l())
          throw IndexOutOfBoundsException_init_$Create$_0('Group with index ' + groupIndex + ' does not exist');
        var tmp2_safe_receiver = groups.k(groupIndex);
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.p8_1;
        result.r5(tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs);
        index = endIndex_0;
      }
    } else {
      result.s5(char);
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
  return namedGroups.r8(name);
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
  return it.o8_1;
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
  if (index < get_lastIndex_2($this.a9_1)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var code1 = $this.a9_1.charCodeAt(index);
    if (55296 <= code1 ? code1 <= 56319 : false) {
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      var code2 = $this.a9_1.charCodeAt(index + 1 | 0);
      if (56320 <= code2 ? code2 <= 57343 : false) {
        return index + 2 | 0;
      }
    }
  }
  return index + 1 | 0;
}
function findNext$1$groups$1($match, this$0) {
  this.s8_1 = $match;
  this.t8_1 = this$0;
  AbstractCollection.call(this);
}
protoOf(findNext$1$groups$1).l = function () {
  return this.s8_1.length;
};
protoOf(findNext$1$groups$1).g = function () {
  var tmp = asSequence(get_indices_0(this));
  return map(tmp, findNext$o$groups$o$iterator$lambda(this)).g();
};
protoOf(findNext$1$groups$1).k = function (index) {
  // Inline function 'kotlin.js.get' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_safe_receiver = this.s8_1[index];
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = new MatchGroup(tmp0_safe_receiver);
  }
  return tmp;
};
protoOf(findNext$1$groups$1).r8 = function (name) {
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_elvis_lhs = this.s8_1.groups;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalArgumentException_init_$Create$_0('Capturing group with name {' + name + '} does not exist. No named capturing group was defined in Regex');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var groups = tmp;
  if (!hasOwnPrototypeProperty(this.t8_1, groups, name))
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
  this.b9_1 = $match;
  AbstractList.call(this);
}
protoOf(findNext$1$groupValues$1).l = function () {
  return this.b9_1.length;
};
protoOf(findNext$1$groupValues$1).k = function (index) {
  // Inline function 'kotlin.js.get' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0_elvis_lhs = this.b9_1[index];
  return tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
};
function findNext$1($range, $match, $nextPattern, $input) {
  this.x8_1 = $range;
  this.y8_1 = $match;
  this.z8_1 = $nextPattern;
  this.a9_1 = $input;
  this.u8_1 = $range;
  var tmp = this;
  tmp.v8_1 = new findNext$1$groups$1($match, this);
  this.w8_1 = null;
}
protoOf(findNext$1).g8 = function () {
  return this.u8_1;
};
protoOf(findNext$1).h1 = function () {
  // Inline function 'kotlin.js.get' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$0 = this.y8_1[0];
  return ensureNotNull(tmp$ret$0);
};
protoOf(findNext$1).q8 = function () {
  return this.v8_1;
};
protoOf(findNext$1).c9 = function () {
  if (this.w8_1 == null) {
    var tmp = this;
    tmp.w8_1 = new findNext$1$groupValues$1(this.y8_1);
  }
  return ensureNotNull(this.w8_1);
};
protoOf(findNext$1).i = function () {
  return findNext(this.z8_1, this.a9_1, this.x8_1.j() ? advanceToNextCharacter(this, this.x8_1.k8()) : this.x8_1.l8() + 1 | 0, this.z8_1);
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
function encodeToByteArray(_this__u8e3s4) {
  _init_properties_stringJs_kt__bg7zye();
  return encodeUtf8(_this__u8e3s4, 0, _this__u8e3s4.length, false);
}
function sam$kotlin_Comparator$0(function_0) {
  this.d9_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0).e9 = function (a, b) {
  return this.d9_1(a, b);
};
protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0).x1 = function () {
  return this.d9_1;
};
protoOf(sam$kotlin_Comparator$0).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
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
  var tmp2 = new RegExp(Companion_getInstance_4().u7(oldValue), ignoreCase ? 'gui' : 'gu');
  // Inline function 'kotlin.text.nativeReplace' call
  var replacement = Companion_getInstance_4().v7(newValue);
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
function get_REPLACEMENT_BYTE_SEQUENCE() {
  _init_properties_utf8Encoding_kt__9thjs4();
  return REPLACEMENT_BYTE_SEQUENCE;
}
var REPLACEMENT_BYTE_SEQUENCE;
function encodeUtf8(string, startIndex, endIndex, throwOnMalformed) {
  _init_properties_utf8Encoding_kt__9thjs4();
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(startIndex >= 0 && endIndex <= string.length && startIndex <= endIndex)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var bytes = new Int8Array(imul_0(endIndex - startIndex | 0, 3));
  var byteIndex = 0;
  var charIndex = startIndex;
  while (charIndex < endIndex) {
    var _unary__edvuaz = charIndex;
    charIndex = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var this_0 = charCodeAt(string, _unary__edvuaz);
    var code = Char__toInt_impl_vasixd(this_0);
    if (code < 128) {
      var _unary__edvuaz_0 = byteIndex;
      byteIndex = _unary__edvuaz_0 + 1 | 0;
      bytes[_unary__edvuaz_0] = toByte(code);
    } else if (code < 2048) {
      var _unary__edvuaz_1 = byteIndex;
      byteIndex = _unary__edvuaz_1 + 1 | 0;
      bytes[_unary__edvuaz_1] = toByte(code >> 6 | 192);
      var _unary__edvuaz_2 = byteIndex;
      byteIndex = _unary__edvuaz_2 + 1 | 0;
      bytes[_unary__edvuaz_2] = toByte(code & 63 | 128);
    } else if (code < 55296 || code >= 57344) {
      var _unary__edvuaz_3 = byteIndex;
      byteIndex = _unary__edvuaz_3 + 1 | 0;
      bytes[_unary__edvuaz_3] = toByte(code >> 12 | 224);
      var _unary__edvuaz_4 = byteIndex;
      byteIndex = _unary__edvuaz_4 + 1 | 0;
      bytes[_unary__edvuaz_4] = toByte(code >> 6 & 63 | 128);
      var _unary__edvuaz_5 = byteIndex;
      byteIndex = _unary__edvuaz_5 + 1 | 0;
      bytes[_unary__edvuaz_5] = toByte(code & 63 | 128);
    } else {
      var codePoint = codePointFromSurrogate(string, code, charIndex, endIndex, throwOnMalformed);
      if (codePoint <= 0) {
        var _unary__edvuaz_6 = byteIndex;
        byteIndex = _unary__edvuaz_6 + 1 | 0;
        bytes[_unary__edvuaz_6] = get_REPLACEMENT_BYTE_SEQUENCE()[0];
        var _unary__edvuaz_7 = byteIndex;
        byteIndex = _unary__edvuaz_7 + 1 | 0;
        bytes[_unary__edvuaz_7] = get_REPLACEMENT_BYTE_SEQUENCE()[1];
        var _unary__edvuaz_8 = byteIndex;
        byteIndex = _unary__edvuaz_8 + 1 | 0;
        bytes[_unary__edvuaz_8] = get_REPLACEMENT_BYTE_SEQUENCE()[2];
      } else {
        var _unary__edvuaz_9 = byteIndex;
        byteIndex = _unary__edvuaz_9 + 1 | 0;
        bytes[_unary__edvuaz_9] = toByte(codePoint >> 18 | 240);
        var _unary__edvuaz_10 = byteIndex;
        byteIndex = _unary__edvuaz_10 + 1 | 0;
        bytes[_unary__edvuaz_10] = toByte(codePoint >> 12 & 63 | 128);
        var _unary__edvuaz_11 = byteIndex;
        byteIndex = _unary__edvuaz_11 + 1 | 0;
        bytes[_unary__edvuaz_11] = toByte(codePoint >> 6 & 63 | 128);
        var _unary__edvuaz_12 = byteIndex;
        byteIndex = _unary__edvuaz_12 + 1 | 0;
        bytes[_unary__edvuaz_12] = toByte(codePoint & 63 | 128);
        charIndex = charIndex + 1 | 0;
      }
    }
  }
  return bytes.length === byteIndex ? bytes : copyOf_1(bytes, byteIndex);
}
function codePointFromSurrogate(string, high, index, endIndex, throwOnMalformed) {
  _init_properties_utf8Encoding_kt__9thjs4();
  if (!(55296 <= high ? high <= 56319 : false) || index >= endIndex) {
    return malformed(0, index, throwOnMalformed);
  }
  // Inline function 'kotlin.code' call
  var this_0 = charCodeAt(string, index);
  var low = Char__toInt_impl_vasixd(this_0);
  if (!(56320 <= low ? low <= 57343 : false)) {
    return malformed(0, index, throwOnMalformed);
  }
  return 65536 + ((high & 1023) << 10) | 0 | low & 1023;
}
function malformed(size, index, throwOnMalformed) {
  _init_properties_utf8Encoding_kt__9thjs4();
  if (throwOnMalformed)
    throw new CharacterCodingException('Malformed sequence starting at ' + (index - 1 | 0));
  return -size | 0;
}
var properties_initialized_utf8Encoding_kt_eee1vq;
function _init_properties_utf8Encoding_kt__9thjs4() {
  if (!properties_initialized_utf8Encoding_kt_eee1vq) {
    properties_initialized_utf8Encoding_kt_eee1vq = true;
    // Inline function 'kotlin.byteArrayOf' call
    REPLACEMENT_BYTE_SEQUENCE = new Int8Array([-17, -65, -67]);
  }
}
function AbstractCollection$toString$lambda(this$0) {
  return function (it) {
    return it === this$0 ? '(this Collection)' : toString_0(it);
  };
}
function AbstractCollection() {
}
protoOf(AbstractCollection).e1 = function (element) {
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
protoOf(AbstractCollection).f1 = function (elements) {
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
      if (!this.e1(element)) {
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
  $this.f9_1 = 3;
  $this.h9();
  return $this.f9_1 === 1;
}
function AbstractIterator() {
  this.f9_1 = 0;
  this.g9_1 = null;
}
protoOf(AbstractIterator).h = function () {
  var tmp;
  switch (this.f9_1) {
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
  if (this.f9_1 === 1) {
    this.f9_1 = 0;
    return this.g9_1;
  }
  if (this.f9_1 === 2 || !tryToComputeNext(this)) {
    throw NoSuchElementException_init_$Create$();
  }
  this.f9_1 = 0;
  return this.g9_1;
};
protoOf(AbstractIterator).i9 = function (value) {
  this.g9_1 = value;
  this.f9_1 = 1;
};
protoOf(AbstractIterator).j9 = function () {
  this.f9_1 = 2;
};
function IteratorImpl_0($outer) {
  this.l9_1 = $outer;
  this.k9_1 = 0;
}
protoOf(IteratorImpl_0).h = function () {
  return this.k9_1 < this.l9_1.l();
};
protoOf(IteratorImpl_0).i = function () {
  if (!this.h())
    throw NoSuchElementException_init_$Create$();
  var _unary__edvuaz = this.k9_1;
  this.k9_1 = _unary__edvuaz + 1 | 0;
  return this.l9_1.k(_unary__edvuaz);
};
function Companion_5() {
  this.y1_1 = 2147483639;
}
protoOf(Companion_5).a3 = function (index, size) {
  if (index < 0 || index >= size) {
    throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
  }
};
protoOf(Companion_5).b3 = function (index, size) {
  if (index < 0 || index > size) {
    throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
  }
};
protoOf(Companion_5).z1 = function (fromIndex, toIndex, size) {
  if (fromIndex < 0 || toIndex > size) {
    throw IndexOutOfBoundsException_init_$Create$_0('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex + ', size: ' + size);
  }
  if (fromIndex > toIndex) {
    throw IllegalArgumentException_init_$Create$_0('fromIndex: ' + fromIndex + ' > toIndex: ' + toIndex);
  }
};
protoOf(Companion_5).q7 = function (startIndex, endIndex, size) {
  if (startIndex < 0 || endIndex > size) {
    throw IndexOutOfBoundsException_init_$Create$_0('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
  }
  if (startIndex > endIndex) {
    throw IllegalArgumentException_init_$Create$_0('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
  }
};
protoOf(Companion_5).q4 = function (oldCapacity, minCapacity) {
  var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
  if ((newCapacity - minCapacity | 0) < 0)
    newCapacity = minCapacity;
  if ((newCapacity - 2147483639 | 0) > 0)
    newCapacity = minCapacity > 2147483639 ? 2147483647 : 2147483639;
  return newCapacity;
};
protoOf(Companion_5).n2 = function (c) {
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
protoOf(Companion_5).m2 = function (c, other) {
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
var Companion_instance_5;
function Companion_getInstance_5() {
  return Companion_instance_5;
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
  return Companion_instance_5.m2(this, other);
};
protoOf(AbstractList).hashCode = function () {
  return Companion_instance_5.n2(this);
};
function AbstractMap$values$1$iterator$1($entryIterator) {
  this.m9_1 = $entryIterator;
}
protoOf(AbstractMap$values$1$iterator$1).h = function () {
  return this.m9_1.h();
};
protoOf(AbstractMap$values$1$iterator$1).i = function () {
  return this.m9_1.i().h1();
};
function toString_4($this, entry) {
  return toString_5($this, entry.g1()) + '=' + toString_5($this, entry.h1());
}
function toString_5($this, o) {
  return o === $this ? '(this Map)' : toString_0(o);
}
function implFindEntry($this, key) {
  var tmp0 = $this.m1();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (equals(element.g1(), key)) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    tmp$ret$0 = null;
  }
  return tmp$ret$0;
}
function Companion_6() {
}
var Companion_instance_6;
function Companion_getInstance_6() {
  return Companion_instance_6;
}
function AbstractMap$toString$lambda(this$0) {
  return function (it) {
    return toString_4(this$0, it);
  };
}
function AbstractMap$values$1(this$0) {
  this.n9_1 = this$0;
  AbstractCollection.call(this);
}
protoOf(AbstractMap$values$1).n3 = function (element) {
  return this.n9_1.j1(element);
};
protoOf(AbstractMap$values$1).e1 = function (element) {
  if (!true)
    return false;
  return this.n3(element);
};
protoOf(AbstractMap$values$1).g = function () {
  var entryIterator = this.n9_1.m1().g();
  return new AbstractMap$values$1$iterator$1(entryIterator);
};
protoOf(AbstractMap$values$1).l = function () {
  return this.n9_1.l();
};
function AbstractMap() {
  this.u2_1 = null;
  this.v2_1 = null;
}
protoOf(AbstractMap).i1 = function (key) {
  return !(implFindEntry(this, key) == null);
};
protoOf(AbstractMap).j1 = function (value) {
  var tmp0 = this.m1();
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.any' call
    var tmp;
    if (isInterface(tmp0, Collection)) {
      tmp = tmp0.j();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (equals(element.h1(), value)) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
    }
    tmp$ret$0 = false;
  }
  return tmp$ret$0;
};
protoOf(AbstractMap).w2 = function (entry) {
  if (!(!(entry == null) ? isInterface(entry, Entry) : false))
    return false;
  var key = entry.g1();
  var value = entry.h1();
  // Inline function 'kotlin.collections.get' call
  var ourValue = (isInterface(this, KtMap) ? this : THROW_CCE()).k1(key);
  if (!equals(value, ourValue)) {
    return false;
  }
  var tmp;
  if (ourValue == null) {
    // Inline function 'kotlin.collections.containsKey' call
    tmp = !(isInterface(this, KtMap) ? this : THROW_CCE()).i1(key);
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
  var tmp0 = other.m1();
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
      if (!this.w2(element)) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(AbstractMap).k1 = function (key) {
  var tmp0_safe_receiver = implFindEntry(this, key);
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h1();
};
protoOf(AbstractMap).hashCode = function () {
  return hashCode_0(this.m1());
};
protoOf(AbstractMap).j = function () {
  return this.l() === 0;
};
protoOf(AbstractMap).l = function () {
  return this.m1().l();
};
protoOf(AbstractMap).toString = function () {
  var tmp = this.m1();
  return joinToString_1(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
};
protoOf(AbstractMap).l1 = function () {
  if (this.v2_1 == null) {
    var tmp = this;
    tmp.v2_1 = new AbstractMap$values$1(this);
  }
  return ensureNotNull(this.v2_1);
};
function Companion_7() {
}
protoOf(Companion_7).y2 = function (c) {
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
protoOf(Companion_7).x2 = function (c, other) {
  if (!(c.l() === other.l()))
    return false;
  return c.f1(other);
};
var Companion_instance_7;
function Companion_getInstance_7() {
  return Companion_instance_7;
}
function ArrayDeque_init_$Init$($this) {
  AbstractMutableList.call($this);
  ArrayDeque.call($this);
  $this.q9_1 = Companion_getInstance_8().s9_1;
  return $this;
}
function ArrayDeque_init_$Create$() {
  return ArrayDeque_init_$Init$(objectCreate(protoOf(ArrayDeque)));
}
function ensureCapacity_0($this, minCapacity) {
  if (minCapacity < 0)
    throw IllegalStateException_init_$Create$_0('Deque is too big.');
  if (minCapacity <= $this.q9_1.length)
    return Unit_instance;
  if ($this.q9_1 === Companion_getInstance_8().s9_1) {
    var tmp = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = coerceAtLeast(minCapacity, 10);
    tmp.q9_1 = Array(size);
    return Unit_instance;
  }
  var newCapacity = Companion_instance_5.q4($this.q9_1.length, minCapacity);
  copyElements($this, newCapacity);
}
function copyElements($this, newCapacity) {
  // Inline function 'kotlin.arrayOfNulls' call
  var newElements = Array(newCapacity);
  var tmp0 = $this.q9_1;
  var tmp6 = $this.p9_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = $this.q9_1.length;
  arrayCopy(tmp0, newElements, 0, tmp6, endIndex);
  var tmp0_0 = $this.q9_1;
  var tmp4 = $this.q9_1.length - $this.p9_1 | 0;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex_0 = $this.p9_1;
  arrayCopy(tmp0_0, newElements, tmp4, 0, endIndex_0);
  $this.p9_1 = 0;
  $this.q9_1 = newElements;
}
function positiveMod($this, index) {
  return index >= $this.q9_1.length ? index - $this.q9_1.length | 0 : index;
}
function incremented($this, index) {
  return index === get_lastIndex($this.q9_1) ? 0 : index + 1 | 0;
}
function decremented($this, index) {
  return index === 0 ? get_lastIndex($this.q9_1) : index - 1 | 0;
}
function copyCollectionElements($this, internalIndex, elements) {
  var iterator = elements.g();
  var inductionVariable = internalIndex;
  var last = $this.q9_1.length;
  if (inductionVariable < last)
    $l$loop: do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!iterator.h())
        break $l$loop;
      $this.q9_1[index] = iterator.i();
    }
     while (inductionVariable < last);
  var inductionVariable_0 = 0;
  var last_0 = $this.p9_1;
  if (inductionVariable_0 < last_0)
    $l$loop_0: do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      if (!iterator.h())
        break $l$loop_0;
      $this.q9_1[index_0] = iterator.i();
    }
     while (inductionVariable_0 < last_0);
  $this.r9_1 = $this.r9_1 + elements.l() | 0;
}
function nullifyNonEmpty($this, internalFromIndex, internalToIndex) {
  if (internalFromIndex < internalToIndex) {
    fill_0($this.q9_1, null, internalFromIndex, internalToIndex);
  } else {
    fill_0($this.q9_1, null, internalFromIndex, $this.q9_1.length);
    fill_0($this.q9_1, null, 0, internalToIndex);
  }
}
function registerModification_0($this) {
  $this.j2_1 = $this.j2_1 + 1 | 0;
}
function Companion_8() {
  Companion_instance_8 = this;
  var tmp = this;
  // Inline function 'kotlin.emptyArray' call
  tmp.s9_1 = [];
  this.t9_1 = 10;
}
var Companion_instance_8;
function Companion_getInstance_8() {
  if (Companion_instance_8 == null)
    new Companion_8();
  return Companion_instance_8;
}
protoOf(ArrayDeque).l = function () {
  return this.r9_1;
};
protoOf(ArrayDeque).j = function () {
  return this.r9_1 === 0;
};
protoOf(ArrayDeque).u9 = function (element) {
  registerModification_0(this);
  ensureCapacity_0(this, this.r9_1 + 1 | 0);
  this.p9_1 = decremented(this, this.p9_1);
  this.q9_1[this.p9_1] = element;
  this.r9_1 = this.r9_1 + 1 | 0;
};
protoOf(ArrayDeque).v9 = function (element) {
  registerModification_0(this);
  ensureCapacity_0(this, this.r9_1 + 1 | 0);
  var tmp = this.q9_1;
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index = this.r9_1;
  tmp[positiveMod(this, this.p9_1 + index | 0)] = element;
  this.r9_1 = this.r9_1 + 1 | 0;
};
protoOf(ArrayDeque).w9 = function () {
  if (this.j())
    throw NoSuchElementException_init_$Create$_0('ArrayDeque is empty.');
  registerModification_0(this);
  // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
  var internalIndex = this.p9_1;
  var element = this.q9_1[internalIndex];
  this.q9_1[this.p9_1] = null;
  this.p9_1 = incremented(this, this.p9_1);
  this.r9_1 = this.r9_1 - 1 | 0;
  return element;
};
protoOf(ArrayDeque).x9 = function () {
  if (this.j())
    throw NoSuchElementException_init_$Create$_0('ArrayDeque is empty.');
  registerModification_0(this);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index = get_lastIndex_1(this);
  var internalLastIndex = positiveMod(this, this.p9_1 + index | 0);
  // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
  var element = this.q9_1[internalLastIndex];
  this.q9_1[internalLastIndex] = null;
  this.r9_1 = this.r9_1 - 1 | 0;
  return element;
};
protoOf(ArrayDeque).y9 = function () {
  return this.j() ? null : this.x9();
};
protoOf(ArrayDeque).f = function (element) {
  this.v9(element);
  return true;
};
protoOf(ArrayDeque).k2 = function (index, element) {
  Companion_instance_5.b3(index, this.r9_1);
  if (index === this.r9_1) {
    this.v9(element);
    return Unit_instance;
  } else if (index === 0) {
    this.u9(element);
    return Unit_instance;
  }
  registerModification_0(this);
  ensureCapacity_0(this, this.r9_1 + 1 | 0);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var internalIndex = positiveMod(this, this.p9_1 + index | 0);
  if (index < (this.r9_1 + 1 | 0) >> 1) {
    var decrementedInternalIndex = decremented(this, internalIndex);
    var decrementedHead = decremented(this, this.p9_1);
    if (decrementedInternalIndex >= this.p9_1) {
      this.q9_1[decrementedHead] = this.q9_1[this.p9_1];
      var tmp0 = this.q9_1;
      var tmp2 = this.q9_1;
      var tmp4 = this.p9_1;
      var tmp6 = this.p9_1 + 1 | 0;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = decrementedInternalIndex + 1 | 0;
      arrayCopy(tmp0, tmp2, tmp4, tmp6, endIndex);
    } else {
      var tmp0_0 = this.q9_1;
      var tmp2_0 = this.q9_1;
      var tmp4_0 = this.p9_1 - 1 | 0;
      var tmp6_0 = this.p9_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex_0 = this.q9_1.length;
      arrayCopy(tmp0_0, tmp2_0, tmp4_0, tmp6_0, endIndex_0);
      this.q9_1[this.q9_1.length - 1 | 0] = this.q9_1[0];
      var tmp0_1 = this.q9_1;
      var tmp2_1 = this.q9_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex_1 = decrementedInternalIndex + 1 | 0;
      arrayCopy(tmp0_1, tmp2_1, 0, 1, endIndex_1);
    }
    this.q9_1[decrementedInternalIndex] = element;
    this.p9_1 = decrementedHead;
  } else {
    // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
    var index_0 = this.r9_1;
    var tail = positiveMod(this, this.p9_1 + index_0 | 0);
    if (internalIndex < tail) {
      var tmp0_2 = this.q9_1;
      var tmp2_2 = this.q9_1;
      // Inline function 'kotlin.collections.copyInto' call
      var destinationOffset = internalIndex + 1 | 0;
      arrayCopy(tmp0_2, tmp2_2, destinationOffset, internalIndex, tail);
    } else {
      var tmp0_3 = this.q9_1;
      // Inline function 'kotlin.collections.copyInto' call
      var destination = this.q9_1;
      arrayCopy(tmp0_3, destination, 1, 0, tail);
      this.q9_1[0] = this.q9_1[this.q9_1.length - 1 | 0];
      var tmp0_4 = this.q9_1;
      var tmp2_3 = this.q9_1;
      var tmp4_1 = internalIndex + 1 | 0;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex_2 = this.q9_1.length - 1 | 0;
      arrayCopy(tmp0_4, tmp2_3, tmp4_1, internalIndex, endIndex_2);
    }
    this.q9_1[internalIndex] = element;
  }
  this.r9_1 = this.r9_1 + 1 | 0;
};
protoOf(ArrayDeque).p = function (elements) {
  if (elements.j())
    return false;
  registerModification_0(this);
  ensureCapacity_0(this, this.r9_1 + elements.l() | 0);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index = this.r9_1;
  var tmp$ret$0 = positiveMod(this, this.p9_1 + index | 0);
  copyCollectionElements(this, tmp$ret$0, elements);
  return true;
};
protoOf(ArrayDeque).k = function (index) {
  Companion_instance_5.a3(index, this.r9_1);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
  var internalIndex = positiveMod(this, this.p9_1 + index | 0);
  return this.q9_1[internalIndex];
};
protoOf(ArrayDeque).e2 = function (index, element) {
  Companion_instance_5.a3(index, this.r9_1);
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var internalIndex = positiveMod(this, this.p9_1 + index | 0);
  // Inline function 'kotlin.collections.ArrayDeque.internalGet' call
  var oldElement = this.q9_1[internalIndex];
  this.q9_1[internalIndex] = element;
  return oldElement;
};
protoOf(ArrayDeque).e1 = function (element) {
  return !(this.l2(element) === -1);
};
protoOf(ArrayDeque).l2 = function (element) {
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index = this.r9_1;
  var tail = positiveMod(this, this.p9_1 + index | 0);
  if (this.p9_1 < tail) {
    var inductionVariable = this.p9_1;
    if (inductionVariable < tail)
      do {
        var index_0 = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (equals(element, this.q9_1[index_0]))
          return index_0 - this.p9_1 | 0;
      }
       while (inductionVariable < tail);
  } else {
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.j()) {
      tmp = this.p9_1 >= tail;
    } else {
      tmp = false;
    }
    if (tmp) {
      var inductionVariable_0 = this.p9_1;
      var last = this.q9_1.length;
      if (inductionVariable_0 < last)
        do {
          var index_1 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          if (equals(element, this.q9_1[index_1]))
            return index_1 - this.p9_1 | 0;
        }
         while (inductionVariable_0 < last);
      var inductionVariable_1 = 0;
      if (inductionVariable_1 < tail)
        do {
          var index_2 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          if (equals(element, this.q9_1[index_2]))
            return (index_2 + this.q9_1.length | 0) - this.p9_1 | 0;
        }
         while (inductionVariable_1 < tail);
    }
  }
  return -1;
};
protoOf(ArrayDeque).d3 = function () {
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!this.j()) {
    registerModification_0(this);
    // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
    var index = this.r9_1;
    var tail = positiveMod(this, this.p9_1 + index | 0);
    nullifyNonEmpty(this, this.p9_1, tail);
  }
  this.p9_1 = 0;
  this.r9_1 = 0;
};
protoOf(ArrayDeque).z9 = function (array) {
  var tmp = array.length >= this.r9_1 ? array : arrayOfNulls(array, this.r9_1);
  var dest = isArray(tmp) ? tmp : THROW_CCE();
  // Inline function 'kotlin.collections.ArrayDeque.internalIndex' call
  var index = this.r9_1;
  var tail = positiveMod(this, this.p9_1 + index | 0);
  if (this.p9_1 < tail) {
    var tmp0 = this.q9_1;
    // Inline function 'kotlin.collections.copyInto' call
    var startIndex = this.p9_1;
    arrayCopy(tmp0, dest, 0, startIndex, tail);
  } else {
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!this.j()) {
      var tmp0_0 = this.q9_1;
      var tmp6 = this.p9_1;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = this.q9_1.length;
      arrayCopy(tmp0_0, dest, 0, tmp6, endIndex);
      var tmp0_1 = this.q9_1;
      // Inline function 'kotlin.collections.copyInto' call
      var destinationOffset = this.q9_1.length - this.p9_1 | 0;
      arrayCopy(tmp0_1, dest, destinationOffset, 0, tail);
    }
  }
  var tmp_0 = terminateCollectionToArray(this.r9_1, dest);
  return isArray(tmp_0) ? tmp_0 : THROW_CCE();
};
protoOf(ArrayDeque).e3 = function () {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = this.r9_1;
  var tmp$ret$0 = Array(size);
  return this.z9(tmp$ret$0);
};
protoOf(ArrayDeque).toArray = function () {
  return this.e3();
};
function ArrayDeque() {
  Companion_getInstance_8();
  this.p9_1 = 0;
  this.r9_1 = 0;
}
function get_lastIndex_1(_this__u8e3s4) {
  return _this__u8e3s4.l() - 1 | 0;
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
function get_indices_0(_this__u8e3s4) {
  return numberRangeToNumber(0, _this__u8e3s4.l() - 1 | 0);
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
  this.aa_1 = new Long(-1478467534, -1720727600);
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
function throwCountOverflow() {
  throw ArithmeticException_init_$Create$_0('Count overflow has happened.');
}
function IndexedValue(index, value) {
  this.ba_1 = index;
  this.ca_1 = value;
}
protoOf(IndexedValue).da = function () {
  return this.ba_1;
};
protoOf(IndexedValue).ea = function () {
  return this.ca_1;
};
protoOf(IndexedValue).toString = function () {
  return 'IndexedValue(index=' + this.ba_1 + ', value=' + toString_0(this.ca_1) + ')';
};
protoOf(IndexedValue).hashCode = function () {
  var result = this.ba_1;
  result = imul_0(result, 31) + (this.ca_1 == null ? 0 : hashCode_0(this.ca_1)) | 0;
  return result;
};
protoOf(IndexedValue).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof IndexedValue))
    return false;
  if (!(this.ba_1 === other.ba_1))
    return false;
  if (!equals(this.ca_1, other.ca_1))
    return false;
  return true;
};
function collectionSizeOrDefault(_this__u8e3s4, default_0) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection)) {
    tmp = _this__u8e3s4.l();
  } else {
    tmp = default_0;
  }
  return tmp;
}
function IndexingIterable(iteratorFactory) {
  this.fa_1 = iteratorFactory;
}
protoOf(IndexingIterable).g = function () {
  return new IndexingIterator(this.fa_1());
};
function IndexingIterator(iterator) {
  this.ga_1 = iterator;
  this.ha_1 = 0;
}
protoOf(IndexingIterator).h = function () {
  return this.ga_1.h();
};
protoOf(IndexingIterator).i = function () {
  var _unary__edvuaz = this.ha_1;
  this.ha_1 = _unary__edvuaz + 1 | 0;
  return new IndexedValue(checkIndexOverflow(_unary__edvuaz), this.ga_1.i());
};
function getOrImplicitDefault(_this__u8e3s4, key) {
  if (isInterface(_this__u8e3s4, MapWithDefault))
    return _this__u8e3s4.ia(key);
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.getOrElseIfMissing' call
    var value = _this__u8e3s4.k1(key);
    if (value == null && !_this__u8e3s4.i1(key)) {
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
  this.ja_1 = new Long(-888910638, 1920087921);
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
protoOf(EmptyMap).ka = function (key) {
  return false;
};
protoOf(EmptyMap).i1 = function (key) {
  if (!true)
    return false;
  return this.ka(key);
};
protoOf(EmptyMap).la = function (key) {
  return null;
};
protoOf(EmptyMap).k1 = function (key) {
  if (!true)
    return null;
  return this.la(key);
};
protoOf(EmptyMap).m1 = function () {
  return EmptySet_getInstance();
};
protoOf(EmptyMap).l1 = function () {
  return EmptyList_getInstance();
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
    var key = _destruct__k2r9zo.da();
    var value = _destruct__k2r9zo.ea();
    _this__u8e3s4.t2(key, value);
  }
}
function putAll_0(_this__u8e3s4, pairs) {
  var inductionVariable = 0;
  var last = pairs.length;
  while (inductionVariable < last) {
    var _destruct__k2r9zo = pairs[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var key = _destruct__k2r9zo.da();
    var value = _destruct__k2r9zo.ea();
    _this__u8e3s4.t2(key, value);
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
  return this.oa();
};
function SequenceScope() {
}
function iterator(block) {
  var iterator = new SequenceBuilderIterator();
  iterator.ta_1 = createCoroutineUnintercepted(block, iterator, iterator);
  return iterator;
}
function nextNotReady($this) {
  if (!$this.h())
    throw NoSuchElementException_init_$Create$();
  else
    return $this.i();
}
function exceptionalState($this) {
  switch ($this.qa_1) {
    case 4:
      return NoSuchElementException_init_$Create$();
    case 5:
      return IllegalStateException_init_$Create$_0('Iterator has failed.');
    default:
      return IllegalStateException_init_$Create$_0('Unexpected state of the iterator: ' + $this.qa_1);
  }
}
function SequenceBuilderIterator() {
  SequenceScope.call(this);
  this.qa_1 = 0;
  this.ra_1 = null;
  this.sa_1 = null;
  this.ta_1 = null;
}
protoOf(SequenceBuilderIterator).h = function () {
  while (true) {
    switch (this.qa_1) {
      case 0:
        break;
      case 1:
        if (ensureNotNull(this.sa_1).h()) {
          this.qa_1 = 2;
          return true;
        } else {
          this.sa_1 = null;
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
    this.qa_1 = 5;
    var step = ensureNotNull(this.ta_1);
    this.ta_1 = null;
    // Inline function 'kotlin.coroutines.resume' call
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$1 = _Result___init__impl__xyqfz8(Unit_instance);
    step.q6(tmp$ret$1);
  }
};
protoOf(SequenceBuilderIterator).i = function () {
  switch (this.qa_1) {
    case 0:
    case 1:
      return nextNotReady(this);
    case 2:
      this.qa_1 = 1;
      return ensureNotNull(this.sa_1).i();
    case 3:
      this.qa_1 = 0;
      var result = this.ra_1;
      this.ra_1 = null;
      return result;
    default:
      throw exceptionalState(this);
  }
};
protoOf(SequenceBuilderIterator).pa = function (value, $completion) {
  this.ra_1 = value;
  this.qa_1 = 3;
  this.ta_1 = $completion;
  return get_COROUTINE_SUSPENDED();
};
protoOf(SequenceBuilderIterator).ua = function (result) {
  // Inline function 'kotlin.getOrThrow' call
  throwOnFailure(result);
  _Result___get_value__impl__bjfvqg(result);
  this.qa_1 = 4;
};
protoOf(SequenceBuilderIterator).q6 = function (result) {
  return this.ua(result);
};
protoOf(SequenceBuilderIterator).l6 = function () {
  return EmptyCoroutineContext_getInstance();
};
function TransformingSequence$iterator$1(this$0) {
  this.wa_1 = this$0;
  this.va_1 = this$0.xa_1.g();
}
protoOf(TransformingSequence$iterator$1).i = function () {
  return this.wa_1.ya_1(this.va_1.i());
};
protoOf(TransformingSequence$iterator$1).h = function () {
  return this.va_1.h();
};
function TransformingSequence(sequence, transformer) {
  this.xa_1 = sequence;
  this.ya_1 = transformer;
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
  this.za_1 = new Long(1993859828, 793161749);
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
protoOf(EmptySet).ab = function (element) {
  return false;
};
protoOf(EmptySet).e1 = function (element) {
  if (!false)
    return false;
  var tmp;
  if (false) {
    tmp = element;
  } else {
    tmp = THROW_CCE();
  }
  return this.ab(tmp);
};
protoOf(EmptySet).bb = function (elements) {
  return elements.j();
};
protoOf(EmptySet).f1 = function (elements) {
  return this.bb(elements);
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
  this.gb_1 = this$0;
  AbstractIterator.call(this);
  this.eb_1 = this$0.kb_1;
  this.fb_1 = this$0.jb_1;
}
protoOf(RingBuffer$iterator$1).h9 = function () {
  if (this.eb_1 === 0) {
    this.j9();
  } else {
    this.i9(this.gb_1.hb_1[this.fb_1]);
    var tmp = this;
    var tmp0 = this.gb_1;
    // Inline function 'kotlin.collections.RingBuffer.forward' call
    tmp.fb_1 = (this.fb_1 + 1 | 0) % tmp0.ib_1 | 0;
    this.eb_1 = this.eb_1 - 1 | 0;
  }
};
function RingBuffer(buffer, filledSize) {
  AbstractList.call(this);
  this.hb_1 = buffer;
  // Inline function 'kotlin.require' call
  if (!(filledSize >= 0)) {
    var message = 'ring buffer filled size should not be negative but it is ' + filledSize;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.require' call
  if (!(filledSize <= this.hb_1.length)) {
    var message_0 = 'ring buffer filled size: ' + filledSize + ' cannot be larger than the buffer size: ' + this.hb_1.length;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
  }
  this.ib_1 = this.hb_1.length;
  this.jb_1 = 0;
  this.kb_1 = filledSize;
}
protoOf(RingBuffer).l = function () {
  return this.kb_1;
};
protoOf(RingBuffer).k = function (index) {
  Companion_instance_5.a3(index, this.kb_1);
  // Inline function 'kotlin.collections.RingBuffer.forward' call
  var tmp$ret$0 = (this.jb_1 + index | 0) % this.ib_1 | 0;
  return this.hb_1[tmp$ret$0];
};
protoOf(RingBuffer).lb = function () {
  return this.kb_1 === this.ib_1;
};
protoOf(RingBuffer).g = function () {
  return new RingBuffer$iterator$1(this);
};
protoOf(RingBuffer).z9 = function (array) {
  var tmp;
  if (array.length < this.kb_1) {
    // Inline function 'kotlin.collections.copyOf' call
    var newSize = this.kb_1;
    tmp = copyOf_0(array, newSize);
  } else {
    tmp = isArray(array) ? array : THROW_CCE();
  }
  var result = tmp;
  var size = this.kb_1;
  var widx = 0;
  var idx = this.jb_1;
  while (widx < size && idx < this.ib_1) {
    result[widx] = this.hb_1[idx];
    widx = widx + 1 | 0;
    idx = idx + 1 | 0;
  }
  idx = 0;
  while (widx < size) {
    result[widx] = this.hb_1[idx];
    widx = widx + 1 | 0;
    idx = idx + 1 | 0;
  }
  var tmp_0 = terminateCollectionToArray(size, result);
  return isArray(tmp_0) ? tmp_0 : THROW_CCE();
};
protoOf(RingBuffer).e3 = function () {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = this.kb_1;
  var tmp$ret$0 = Array(size);
  return this.z9(tmp$ret$0);
};
protoOf(RingBuffer).toArray = function () {
  return this.e3();
};
protoOf(RingBuffer).mb = function (maxCapacity) {
  var newCapacity = coerceAtMost((this.ib_1 + (this.ib_1 >> 1) | 0) + 1 | 0, maxCapacity);
  var tmp;
  if (this.jb_1 === 0) {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.hb_1;
    tmp = copyOf_0(this_0, newCapacity);
  } else {
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$1 = Array(newCapacity);
    tmp = this.z9(tmp$ret$1);
  }
  var newBuffer = tmp;
  return new RingBuffer(newBuffer, this.kb_1);
};
protoOf(RingBuffer).nb = function (element) {
  if (this.lb()) {
    throw IllegalStateException_init_$Create$_0('ring buffer is full');
  }
  // Inline function 'kotlin.collections.RingBuffer.forward' call
  var tmp$ret$0 = (this.jb_1 + this.kb_1 | 0) % this.ib_1 | 0;
  this.hb_1[tmp$ret$0] = element;
  this.kb_1 = this.kb_1 + 1 | 0;
};
protoOf(RingBuffer).ob = function (n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = "n shouldn't be negative but it is " + n;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.require' call
  if (!(n <= this.kb_1)) {
    var message_0 = "n shouldn't be greater than the buffer size: n = " + n + ', size = ' + this.kb_1;
    throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
  }
  if (n > 0) {
    var start = this.jb_1;
    // Inline function 'kotlin.collections.RingBuffer.forward' call
    var end = (start + n | 0) % this.ib_1 | 0;
    if (start > end) {
      fill_0(this.hb_1, null, start, this.ib_1);
      fill_0(this.hb_1, null, 0, end);
    } else {
      fill_0(this.hb_1, null, start, end);
    }
    this.jb_1 = end;
    this.kb_1 = this.kb_1 - n | 0;
  }
};
function windowedIterator$slambda($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
  this.xb_1 = $size;
  this.yb_1 = $step;
  this.zb_1 = $iterator;
  this.ac_1 = $reuseBuffer;
  this.bc_1 = $partialWindows;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(windowedIterator$slambda).kc = function ($this$iterator, $completion) {
  var tmp = this.lc($this$iterator, $completion);
  tmp.h6_1 = Unit_instance;
  tmp.i6_1 = null;
  return tmp.n6();
};
protoOf(windowedIterator$slambda).e7 = function (p1, $completion) {
  return this.kc(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
};
protoOf(windowedIterator$slambda).n6 = function () {
  var suspendResult = this.h6_1;
  $sm: do
    try {
      var tmp = this.f6_1;
      switch (tmp) {
        case 0:
          this.g6_1 = 21;
          var bufferInitialCapacity = coerceAtMost(this.xb_1, 1024);
          this.fc_1 = this.yb_1 - this.xb_1 | 0;
          if (this.fc_1 >= 0) {
            this.dc_1 = ArrayList_init_$Create$_0(bufferInitialCapacity);
            this.ec_1 = 0;
            var tmp_0 = this;
            tmp_0.hc_1 = this.zb_1;
            this.f6_1 = 12;
            continue $sm;
          } else {
            this.ic_1 = RingBuffer_init_$Create$(bufferInitialCapacity);
            var tmp_1 = this;
            tmp_1.jc_1 = this.zb_1;
            this.f6_1 = 1;
            continue $sm;
          }

        case 1:
          if (!this.jc_1.h()) {
            this.f6_1 = 5;
            continue $sm;
          }

          var e = this.jc_1.i();
          this.ic_1.nb(e);
          if (this.ic_1.lb()) {
            if (this.ic_1.kb_1 < this.xb_1) {
              this.ic_1 = this.ic_1.mb(this.xb_1);
              this.f6_1 = 1;
              continue $sm;
            } else {
              this.f6_1 = 2;
              continue $sm;
            }
          } else {
            this.f6_1 = 4;
            continue $sm;
          }

        case 2:
          this.f6_1 = 3;
          suspendResult = this.cc_1.pa(this.ac_1 ? this.ic_1 : ArrayList_init_$Create$_1(this.ic_1), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 3:
          this.ic_1.ob(this.yb_1);
          this.f6_1 = 4;
          continue $sm;
        case 4:
          this.f6_1 = 1;
          continue $sm;
        case 5:
          if (this.bc_1) {
            this.f6_1 = 6;
            continue $sm;
          } else {
            this.f6_1 = 11;
            continue $sm;
          }

        case 6:
          if (!(this.ic_1.kb_1 > this.yb_1)) {
            this.f6_1 = 8;
            continue $sm;
          }

          this.f6_1 = 7;
          suspendResult = this.cc_1.pa(this.ac_1 ? this.ic_1 : ArrayList_init_$Create$_1(this.ic_1), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 7:
          this.ic_1.ob(this.yb_1);
          this.f6_1 = 6;
          continue $sm;
        case 8:
          if (!this.ic_1.j()) {
            this.f6_1 = 9;
            suspendResult = this.cc_1.pa(this.ic_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.f6_1 = 10;
            continue $sm;
          }

        case 9:
          this.f6_1 = 10;
          continue $sm;
        case 10:
          this.f6_1 = 11;
          continue $sm;
        case 11:
          this.f6_1 = 20;
          continue $sm;
        case 12:
          if (!this.hc_1.h()) {
            this.f6_1 = 16;
            continue $sm;
          }

          this.gc_1 = this.hc_1.i();
          if (this.ec_1 > 0) {
            this.ec_1 = this.ec_1 - 1 | 0;
            this.f6_1 = 12;
            continue $sm;
          } else {
            this.f6_1 = 13;
            continue $sm;
          }

        case 13:
          this.dc_1.f(this.gc_1);
          if (this.dc_1.l() === this.xb_1) {
            this.f6_1 = 14;
            suspendResult = this.cc_1.pa(this.dc_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.f6_1 = 15;
            continue $sm;
          }

        case 14:
          if (this.ac_1) {
            this.dc_1.d3();
          } else
            this.dc_1 = ArrayList_init_$Create$_0(this.xb_1);
          this.ec_1 = this.fc_1;
          this.f6_1 = 15;
          continue $sm;
        case 15:
          this.f6_1 = 12;
          continue $sm;
        case 16:
          if (!this.dc_1.j()) {
            if (this.bc_1 || this.dc_1.l() === this.xb_1) {
              this.f6_1 = 17;
              suspendResult = this.cc_1.pa(this.dc_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.f6_1 = 18;
              continue $sm;
            }
          } else {
            this.f6_1 = 19;
            continue $sm;
          }

        case 17:
          this.f6_1 = 18;
          continue $sm;
        case 18:
          this.f6_1 = 19;
          continue $sm;
        case 19:
          this.f6_1 = 20;
          continue $sm;
        case 20:
          return Unit_instance;
        case 21:
          throw this.i6_1;
      }
    } catch ($p) {
      var e_0 = $p;
      if (this.g6_1 === 21) {
        throw e_0;
      } else {
        this.f6_1 = this.g6_1;
        this.i6_1 = e_0;
      }
    }
   while (true);
};
protoOf(windowedIterator$slambda).lc = function ($this$iterator, completion) {
  var i = new windowedIterator$slambda(this.xb_1, this.yb_1, this.zb_1, this.ac_1, this.bc_1, completion);
  i.cc_1 = $this$iterator;
  return i;
};
function windowedIterator$slambda_0($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
  var i = new windowedIterator$slambda($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation);
  return constructCallableReference(function ($this$iterator, $completion) {
    return i.kc($this$iterator, $completion);
  }, 1);
}
function compareBy(selectors) {
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(selectors.length > 0)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var tmp = compareBy$lambda(selectors);
  return new sam$kotlin_Comparator$0_0(tmp);
}
function compareValues(a, b) {
  if (a == null)
    return b == null ? 0 : -1;
  if (b == null)
    return 1;
  return compareTo((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
}
function compareValuesByImpl(a, b, selectors) {
  var inductionVariable = 0;
  var last = selectors.length;
  while (inductionVariable < last) {
    var fn = selectors[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var v1 = fn(a);
    var v2 = fn(b);
    var diff = compareValues(v1, v2);
    if (!(diff === 0))
      return diff;
  }
  return 0;
}
function sam$kotlin_Comparator$0_0(function_0) {
  this.mc_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_0).e9 = function (a, b) {
  return this.mc_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_0).x1 = function () {
  return this.mc_1;
};
protoOf(sam$kotlin_Comparator$0_0).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function compareBy$lambda($selectors) {
  return function (a, b) {
    return compareValuesByImpl(a, b, $selectors);
  };
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
  this.nc_1 = new Long(0, 0);
}
protoOf(EmptyCoroutineContext).r6 = function (key) {
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
  this.oc_1 = entries;
}
protoOf(EnumEntriesList).l = function () {
  return this.oc_1.length;
};
protoOf(EnumEntriesList).k = function (index) {
  Companion_instance_5.a3(index, this.oc_1.length);
  return this.oc_1[index];
};
protoOf(EnumEntriesList).pc = function (element) {
  if (element === null)
    return false;
  var target = getOrNull(this.oc_1, element.o1_1);
  return target === element;
};
protoOf(EnumEntriesList).e1 = function (element) {
  if (!(element instanceof Enum))
    return false;
  return this.pc(element instanceof Enum ? element : THROW_CCE());
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
function Companion_9() {
  Companion_instance_9 = this;
  this.qc_1 = new IntRange(1, 0);
}
var Companion_instance_9;
function Companion_getInstance_9() {
  if (Companion_instance_9 == null) {
    Companion_instance_10;
    new Companion_9();
  }
  return Companion_instance_9;
}
function IntRange(start, endInclusive) {
  Companion_getInstance_9();
  IntProgression.call(this, start, endInclusive, 1);
}
protoOf(IntRange).k8 = function () {
  return this.rc_1;
};
protoOf(IntRange).l8 = function () {
  return this.sc_1;
};
protoOf(IntRange).j = function () {
  return this.rc_1 > this.sc_1;
};
protoOf(IntRange).equals = function (other) {
  var tmp;
  if (other instanceof IntRange) {
    tmp = this.j() && other.j() || (this.rc_1 === other.rc_1 && this.sc_1 === other.sc_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(IntRange).hashCode = function () {
  return this.j() ? -1 : imul_0(31, this.rc_1) + this.sc_1 | 0;
};
protoOf(IntRange).toString = function () {
  return '' + this.rc_1 + '..' + this.sc_1;
};
function IntProgressionIterator(first, last, step) {
  IntIterator.call(this);
  this.uc_1 = step;
  this.vc_1 = last;
  this.wc_1 = this.uc_1 > 0 ? first <= last : first >= last;
  this.xc_1 = this.wc_1 ? first : this.vc_1;
}
protoOf(IntProgressionIterator).h = function () {
  return this.wc_1;
};
protoOf(IntProgressionIterator).oa = function () {
  var value = this.xc_1;
  if (value === this.vc_1) {
    if (!this.wc_1)
      throw NoSuchElementException_init_$Create$();
    this.wc_1 = false;
  } else {
    this.xc_1 = this.xc_1 + this.uc_1 | 0;
  }
  return value;
};
function Companion_10() {
}
protoOf(Companion_10).r = function (rangeStart, rangeEnd, step) {
  return new IntProgression(rangeStart, rangeEnd, step);
};
var Companion_instance_10;
function Companion_getInstance_10() {
  return Companion_instance_10;
}
function IntProgression(start, endInclusive, step) {
  if (step === 0)
    throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
  if (step === -2147483648)
    throw IllegalArgumentException_init_$Create$_0('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
  this.rc_1 = start;
  this.sc_1 = getProgressionLastElement(start, endInclusive, step);
  this.tc_1 = step;
}
protoOf(IntProgression).g = function () {
  return new IntProgressionIterator(this.rc_1, this.sc_1, this.tc_1);
};
protoOf(IntProgression).j = function () {
  return this.tc_1 > 0 ? this.rc_1 > this.sc_1 : this.rc_1 < this.sc_1;
};
protoOf(IntProgression).equals = function (other) {
  var tmp;
  if (other instanceof IntProgression) {
    tmp = this.j() && other.j() || (this.rc_1 === other.rc_1 && this.sc_1 === other.sc_1 && this.tc_1 === other.tc_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(IntProgression).hashCode = function () {
  return this.j() ? -1 : imul_0(31, imul_0(31, this.rc_1) + this.sc_1 | 0) + this.tc_1 | 0;
};
protoOf(IntProgression).toString = function () {
  return this.tc_1 > 0 ? '' + this.rc_1 + '..' + this.sc_1 + ' step ' + this.tc_1 : '' + this.rc_1 + ' downTo ' + this.sc_1 + ' step ' + (-this.tc_1 | 0);
};
function appendElement(_this__u8e3s4, element, transform) {
  if (!(transform == null))
    _this__u8e3s4.e(transform(element));
  else {
    if (element == null ? true : isCharSequence(element))
      _this__u8e3s4.e(element);
    else {
      if (element instanceof Char)
        _this__u8e3s4.s5(element.s_1);
      else {
        _this__u8e3s4.e(toString_1(element));
      }
    }
  }
}
function isSurrogate(_this__u8e3s4) {
  return _Char___init__impl__6a9atx(55296) <= _this__u8e3s4 ? _this__u8e3s4 <= _Char___init__impl__6a9atx(57343) : false;
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
function toIntOrNull(_this__u8e3s4, radix) {
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
function numberFormatError(input) {
  throw NumberFormatException_init_$Create$_0("Invalid number format: '" + input + "'");
}
function toLongOrNull(_this__u8e3s4) {
  return toLongOrNull_0(_this__u8e3s4, 10);
}
function toIntOrNull_0(_this__u8e3s4) {
  return toIntOrNull(_this__u8e3s4, 10);
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
function contains_0(_this__u8e3s4, char, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return indexOf_1(_this__u8e3s4, char, VOID, ignoreCase) >= 0;
}
function contains_1(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (typeof other === 'string') {
    tmp = indexOf_2(_this__u8e3s4, other, VOID, ignoreCase) >= 0;
  } else {
    tmp = indexOf_3(_this__u8e3s4, other, 0, charSequenceLength(_this__u8e3s4), ignoreCase) >= 0;
  }
  return tmp;
}
function padStart(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  return toString_1(padStart_0(isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE(), length, padChar));
}
function trim(_this__u8e3s4, chars) {
  // Inline function 'kotlin.text.trim' call
  // Inline function 'kotlin.text.trim' call
  var this_0 = isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE();
  var startIndex = 0;
  var endIndex = charSequenceLength(this_0) - 1 | 0;
  var startFound = false;
  $l$loop: while (startIndex <= endIndex) {
    var index = !startFound ? startIndex : endIndex;
    var it = charSequenceGet(this_0, index);
    var match = contains(chars, it);
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
  var tmp$ret$1 = charSequenceSubSequence(this_0, startIndex, endIndex + 1 | 0);
  return toString_1(tmp$ret$1);
}
function substringBefore(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = indexOf_1(_this__u8e3s4, delimiter);
  return index === -1 ? missingDelimiterValue : substring(_this__u8e3s4, 0, index);
}
function padEnd(_this__u8e3s4, length, padChar) {
  padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
  return toString_1(padEnd_0(isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE(), length, padChar));
}
function substringAfter(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = indexOf_1(_this__u8e3s4, delimiter);
  return index === -1 ? missingDelimiterValue : substring(_this__u8e3s4, index + 1 | 0, _this__u8e3s4.length);
}
function indexOf_1(_this__u8e3s4, char, startIndex, ignoreCase) {
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
function indexOf_2(_this__u8e3s4, string, startIndex, ignoreCase) {
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
    tmp = indexOf_3(_this__u8e3s4, string, startIndex, charSequenceLength(_this__u8e3s4), ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(string, startIndex);
  }
  return tmp;
}
function indexOf_3(_this__u8e3s4, other, startIndex, endIndex, ignoreCase, last) {
  last = last === VOID ? false : last;
  var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), coerceAtMost(endIndex, charSequenceLength(_this__u8e3s4))) : downTo(coerceAtMost(startIndex, get_lastIndex_2(_this__u8e3s4)), coerceAtLeast(endIndex, 0));
  var tmp;
  if (typeof _this__u8e3s4 === 'string') {
    tmp = typeof other === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var inductionVariable = indices.rc_1;
    var last_0 = indices.sc_1;
    var step = indices.tc_1;
    if (step > 0 && inductionVariable <= last_0 || (step < 0 && last_0 <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step | 0;
        if (regionMatches(other, 0, _this__u8e3s4, index, other.length, ignoreCase))
          return index;
      }
       while (!(index === last_0));
  } else {
    var inductionVariable_0 = indices.rc_1;
    var last_1 = indices.sc_1;
    var step_0 = indices.tc_1;
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
function trim_0(_this__u8e3s4) {
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
      sb.s5(padChar);
    }
     while (!(i === last));
  sb.e(_this__u8e3s4);
  return sb;
}
function trimEnd(_this__u8e3s4) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.text.trimEnd' call
    var inductionVariable = charSequenceLength(_this__u8e3s4) - 1 | 0;
    if (0 <= inductionVariable)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        var p0 = charSequenceGet(_this__u8e3s4, index);
        if (!isWhitespace(p0)) {
          tmp$ret$0 = charSequenceSubSequence(_this__u8e3s4, 0, index + 1 | 0);
          break $l$block;
        }
      }
       while (0 <= inductionVariable);
    tmp$ret$0 = '';
  }
  return tmp$ret$0;
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
      sb.s5(padChar);
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
  var last = get_lastIndex_2(_this__u8e3s4);
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
function get_lastIndex_2(_this__u8e3s4) {
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
    tmp = _Result___get_value__impl__bjfvqg($this).yc_1;
  } else {
    tmp = null;
  }
  return tmp;
}
function Companion_11() {
}
var Companion_instance_11;
function Companion_getInstance_11() {
  return Companion_instance_11;
}
function Failure(exception) {
  this.yc_1 = exception;
}
protoOf(Failure).equals = function (other) {
  var tmp;
  if (other instanceof Failure) {
    tmp = equals(this.yc_1, other.yc_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(Failure).hashCode = function () {
  return hashCode_0(this.yc_1);
};
protoOf(Failure).toString = function () {
  return 'Failure(' + this.yc_1.toString() + ')';
};
function throwOnFailure(_this__u8e3s4) {
  var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
  if (tmp instanceof Failure)
    throw _Result___get_value__impl__bjfvqg(_this__u8e3s4).yc_1;
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
  this.ma_1 = first;
  this.na_1 = second;
}
protoOf(Pair).toString = function () {
  return '(' + toString_0(this.ma_1) + ', ' + toString_0(this.na_1) + ')';
};
protoOf(Pair).da = function () {
  return this.ma_1;
};
protoOf(Pair).ea = function () {
  return this.na_1;
};
protoOf(Pair).hashCode = function () {
  var result = this.ma_1 == null ? 0 : hashCode_0(this.ma_1);
  result = imul_0(result, 31) + (this.na_1 == null ? 0 : hashCode_0(this.na_1)) | 0;
  return result;
};
protoOf(Pair).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Pair))
    return false;
  if (!equals(this.ma_1, other.ma_1))
    return false;
  if (!equals(this.na_1, other.na_1))
    return false;
  return true;
};
function to(_this__u8e3s4, that) {
  return new Pair(_this__u8e3s4, that);
}
function Triple(first, second, third) {
  this.zc_1 = first;
  this.ad_1 = second;
  this.bd_1 = third;
}
protoOf(Triple).toString = function () {
  return '(' + toString_0(this.zc_1) + ', ' + toString_0(this.ad_1) + ', ' + toString_0(this.bd_1) + ')';
};
protoOf(Triple).da = function () {
  return this.zc_1;
};
protoOf(Triple).ea = function () {
  return this.ad_1;
};
protoOf(Triple).cd = function () {
  return this.bd_1;
};
protoOf(Triple).hashCode = function () {
  var result = this.zc_1 == null ? 0 : hashCode_0(this.zc_1);
  result = imul_0(result, 31) + (this.ad_1 == null ? 0 : hashCode_0(this.ad_1)) | 0;
  result = imul_0(result, 31) + (this.bd_1 == null ? 0 : hashCode_0(this.bd_1)) | 0;
  return result;
};
protoOf(Triple).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Triple))
    return false;
  if (!equals(this.zc_1, other.zc_1))
    return false;
  if (!equals(this.ad_1, other.ad_1))
    return false;
  if (!equals(this.bd_1, other.bd_1))
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
  this.fd_1 = title;
  this.gd_1 = badge;
  this.hd_1 = fileExtension;
  this.id_1 = mimeType;
  this.jd_1 = cartHowTo;
}
function MarketplaceQuote(marketplace, estimatedTotalUsd, lotCount, pieceCount, savingsVsPabUsd, uploadUrl) {
  this.kd_1 = marketplace;
  this.ld_1 = estimatedTotalUsd;
  this.md_1 = lotCount;
  this.nd_1 = pieceCount;
  this.od_1 = savingsVsPabUsd;
  this.pd_1 = uploadUrl;
}
protoOf(MarketplaceQuote).toString = function () {
  return 'MarketplaceQuote(marketplace=' + this.kd_1.toString() + ', estimatedTotalUsd=' + this.ld_1 + ', lotCount=' + this.md_1 + ', pieceCount=' + this.nd_1 + ', savingsVsPabUsd=' + this.od_1 + ', uploadUrl=' + this.pd_1 + ')';
};
protoOf(MarketplaceQuote).hashCode = function () {
  var result = this.kd_1.hashCode();
  result = imul_0(result, 31) + getNumberHashCode(this.ld_1) | 0;
  result = imul_0(result, 31) + this.md_1 | 0;
  result = imul_0(result, 31) + this.nd_1 | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.od_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.pd_1) | 0;
  return result;
};
protoOf(MarketplaceQuote).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MarketplaceQuote))
    return false;
  if (!this.kd_1.equals(other.kd_1))
    return false;
  if (!equals(this.ld_1, other.ld_1))
    return false;
  if (!(this.md_1 === other.md_1))
    return false;
  if (!(this.nd_1 === other.nd_1))
    return false;
  if (!equals(this.od_1, other.od_1))
    return false;
  if (!(this.pd_1 === other.pd_1))
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
  this.qd_1 = id;
  this.rd_1 = actionType;
  this.sd_1 = title;
  this.td_1 = explanation;
  this.ud_1 = estimatedSavingsUsd;
  this.vd_1 = actionLabel;
  this.wd_1 = targetWidth;
  this.xd_1 = targetHeight;
}
protoOf(CostSavingSuggestion).toString = function () {
  return 'CostSavingSuggestion(id=' + this.qd_1 + ', actionType=' + this.rd_1.toString() + ', title=' + this.sd_1 + ', explanation=' + this.td_1 + ', estimatedSavingsUsd=' + this.ud_1 + ', actionLabel=' + this.vd_1 + ', targetWidth=' + this.wd_1 + ', targetHeight=' + this.xd_1 + ')';
};
protoOf(CostSavingSuggestion).hashCode = function () {
  var result = getStringHashCode(this.qd_1);
  result = imul_0(result, 31) + this.rd_1.hashCode() | 0;
  result = imul_0(result, 31) + getStringHashCode(this.sd_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.td_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ud_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.vd_1) | 0;
  result = imul_0(result, 31) + (this.wd_1 == null ? 0 : this.wd_1) | 0;
  result = imul_0(result, 31) + (this.xd_1 == null ? 0 : this.xd_1) | 0;
  return result;
};
protoOf(CostSavingSuggestion).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof CostSavingSuggestion))
    return false;
  if (!(this.qd_1 === other.qd_1))
    return false;
  if (!this.rd_1.equals(other.rd_1))
    return false;
  if (!(this.sd_1 === other.sd_1))
    return false;
  if (!(this.td_1 === other.td_1))
    return false;
  if (!equals(this.ud_1, other.ud_1))
    return false;
  if (!(this.vd_1 === other.vd_1))
    return false;
  if (!(this.wd_1 == other.wd_1))
    return false;
  if (!(this.xd_1 == other.xd_1))
    return false;
  return true;
};
function buildBrickLinkXml($this, lines) {
  var sb = StringBuilder_init_$Create$_0();
  // Inline function 'kotlin.text.appendLine' call
  var value = '<INVENTORY>';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value).s5(_Char___init__impl__6a9atx(10));
  var _iterator__ex2g4s = lines.g();
  while (_iterator__ex2g4s.h()) {
    var line = _iterator__ex2g4s.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = '  <ITEM>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_0).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_1 = '    <ITEMTYPE>P<\/ITEMTYPE>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_1).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_2 = '    <ITEMID>' + line.le_1.ae_1 + '<\/ITEMID>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_2).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_3 = '    <COLOR>' + line.me_1.xe_1 + '<\/COLOR>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_3).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_4 = '    <MINQTY>' + line.ne_1 + '<\/MINQTY>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_4).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_5 = '    <CONDITION>N<\/CONDITION>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_5).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.text.appendLine' call
    var value_6 = '  <\/ITEM>';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_6).s5(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.text.appendLine' call
  var value_7 = '<\/INVENTORY>';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_7).s5(_Char___init__impl__6a9atx(10));
  return sb.toString();
}
function buildWebrickCsv($this, lines) {
  var sb = StringBuilder_init_$Create$_0();
  // Inline function 'kotlin.text.appendLine' call
  var value = 'Part,Color,Quantity';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value).s5(_Char___init__impl__6a9atx(10));
  var _iterator__ex2g4s = lines.g();
  while (_iterator__ex2g4s.h()) {
    var line = _iterator__ex2g4s.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = line.le_1.ae_1 + ',' + line.me_1.xe_1 + ',' + line.ne_1;
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_0).s5(_Char___init__impl__6a9atx(10));
  }
  return sb.toString();
}
function sam$kotlin_Comparator$0_1(function_0) {
  this.nf_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_1).e9 = function (a, b) {
  return this.nf_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_1).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_1).x1 = function () {
  return this.nf_1;
};
protoOf(sam$kotlin_Comparator$0_1).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function MarketplaceCartBuilder$generateCostSavingSuggestions$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.ud_1;
  var tmp$ret$2 = a.ud_1;
  return compareValues(tmp, tmp$ret$2);
}
function MarketplaceCartBuilder() {
}
protoOf(MarketplaceCartBuilder).of = function (marketplace, region) {
  var tmp;
  switch (marketplace.o1_1) {
    case 0:
      tmp = 'https://www.lego.com/' + region.rf_1 + '/pick-and-build/pick-a-brick';
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
protoOf(MarketplaceCartBuilder).tf = function (result, region, excludeOwnedKeys) {
  var lines = MosaicExporter_getInstance().vf(result, excludeOwnedKeys);
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s = lines.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp = sum;
    sum = tmp + element.ne_1 | 0;
  }
  var pieces = sum;
  var lots = lines.l();
  // Inline function 'kotlin.collections.sumOf' call
  var sum_0 = 0;
  var _iterator__ex2g4s_0 = lines.g();
  while (_iterator__ex2g4s_0.h()) {
    var element_0 = _iterator__ex2g4s_0.i();
    var tmp_0 = sum_0;
    sum_0 = tmp_0 + element_0.se_1;
  }
  var pabTotal = sum_0;
  // Inline function 'kotlin.collections.sumOf' call
  var sum_1 = 0;
  var _iterator__ex2g4s_1 = lines.g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    var tmp_1 = sum_1;
    sum_1 = tmp_1 + element_1.te_1;
  }
  var blTotal = sum_1;
  var brickOwlTotal = blTotal * 1.04;
  // Inline function 'kotlin.comparisons.minOf' call
  var rebrickableMixedBest = Math.min(pabTotal, blTotal) * 0.97;
  var webrickTotal = pabTotal * 0.48;
  return listOf_0([new MarketplaceQuote(BrickMarketplace_LEGO_PICK_A_BRICK_getInstance(), pabTotal, lots, pieces, 0.0, this.of(BrickMarketplace_LEGO_PICK_A_BRICK_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_BRICKLINK_getInstance(), blTotal, lots, pieces, coerceAtLeast_0(pabTotal - blTotal, 0.0), this.of(BrickMarketplace_BRICKLINK_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_BRICKOWL_getInstance(), brickOwlTotal, lots, pieces, coerceAtLeast_0(pabTotal - brickOwlTotal, 0.0), this.of(BrickMarketplace_BRICKOWL_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_REBRICKABLE_getInstance(), rebrickableMixedBest, lots, pieces, coerceAtLeast_0(pabTotal - rebrickableMixedBest, 0.0), this.of(BrickMarketplace_REBRICKABLE_getInstance(), region)), new MarketplaceQuote(BrickMarketplace_WEBRICK_getInstance(), webrickTotal, lots, pieces, coerceAtLeast_0(pabTotal - webrickTotal, 0.0), this.of(BrickMarketplace_WEBRICK_getInstance(), region))]);
};
protoOf(MarketplaceCartBuilder).wf = function (result, region, excludeOwnedKeys, $super) {
  excludeOwnedKeys = excludeOwnedKeys === VOID ? emptySet() : excludeOwnedKeys;
  return $super === VOID ? this.tf(result, region, excludeOwnedKeys) : $super.tf.call(this, result, region, excludeOwnedKeys);
};
protoOf(MarketplaceCartBuilder).xf = function (result, marketplace, excludeOwnedKeys) {
  var lines = MosaicExporter_getInstance().vf(result, excludeOwnedKeys);
  var tmp;
  switch (marketplace.o1_1) {
    case 1:
    case 2:
      tmp = buildBrickLinkXml(this, lines);
      break;
    case 0:
      tmp = MosaicExporter_getInstance().yf(result, MarketplaceCsvFormat_PICK_A_BRICK_getInstance(), excludeOwnedKeys);
      break;
    case 3:
      tmp = MosaicExporter_getInstance().yf(result, MarketplaceCsvFormat_REBRICKABLE_getInstance(), excludeOwnedKeys);
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
protoOf(MarketplaceCartBuilder).zf = function (result, marketplace, excludeOwnedKeys, $super) {
  excludeOwnedKeys = excludeOwnedKeys === VOID ? emptySet() : excludeOwnedKeys;
  return $super === VOID ? this.xf(result, marketplace, excludeOwnedKeys) : $super.xf.call(this, result, marketplace, excludeOwnedKeys);
};
protoOf(MarketplaceCartBuilder).ag = function (result, marketplace) {
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var slug = marketplace.n1_1.toLowerCase();
  return 'studcraft_' + result.cg_1 + 'x' + result.dg_1 + '_' + slug + '_cart.' + marketplace.hd_1;
};
protoOf(MarketplaceCartBuilder).ng = function (result) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var suggestions = ArrayList_init_$Create$();
  var cfg = result.bg_1;
  var pricing = result.lg_1;
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s = result.kg_1.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp = sum;
    sum = tmp + element.we_1;
  }
  var rareSwapSavings = sum;
  var tmp0 = result.kg_1;
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
      if (!element_0.le_1.ie_1 && (element_0.oe_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()) || !element_0.pe_1)) {
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
  if (!cfg.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance()) && cfg.sg_1.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance())) {
    // Inline function 'kotlin.math.ceil' call
    var x = result.cg_1 / 16.0;
    var tmp$ret$5 = Math.ceil(x);
    var frameCols = numberToInt(tmp$ret$5);
    // Inline function 'kotlin.math.ceil' call
    var x_0 = result.dg_1 / 16.0;
    var tmp$ret$6 = Math.ceil(x_0);
    var frameRows = numberToInt(tmp$ret$6);
    var currentFrameCost = imul_0(frameCols, frameRows) * BrickPartType_TECHNIC_FRAME_16X16_getInstance().je_1 + result.hg_1.l() * BrickPartType_TECHNIC_PIN_getInstance().je_1;
    // Inline function 'kotlin.math.ceil' call
    var x_1 = result.cg_1 / 32.0;
    var tmp$ret$7 = Math.ceil(x_1);
    var baseCols = numberToInt(tmp$ret$7);
    // Inline function 'kotlin.math.ceil' call
    var x_2 = result.dg_1 / 32.0;
    var tmp$ret$8 = Math.ceil(x_2);
    var baseRows = numberToInt(tmp$ret$8);
    var baseplateCost = imul_0(baseCols, baseRows) * BrickPartType_BASEPLATE_32X32_getInstance().je_1;
    var diff = currentFrameCost - baseplateCost;
    if (diff > 1.5) {
      suggestions.f(new CostSavingSuggestion('use_baseplates', CostSuggestionActionType_USE_BASEPLATES_getInstance(), 'Use 32\xD732 Baseplates Instead of 16\xD716 Frames', 'Uses ' + imul_0(baseCols, baseRows) + ' thin 3811 baseplate(s) instead of ' + imul_0(frameCols, frameRows) + ' Technic frames + pins \u2014 ideal if framing behind glass.', diff, 'Use Baseplates'));
    }
  }
  if (cfg.rg_1.equals(BuildStyle_ROUND_TILES_ART_getInstance()) || cfg.rg_1.equals(BuildStyle_ROUND_PLATES_STUDS_getInstance())) {
    var estSavings = pricing.fh_1 * 0.22;
    if (estSavings > 1.5) {
      suggestions.f(new CostSavingSuggestion('multi_plate', CostSuggestionActionType_SWITCH_MULTI_PLATE_getInstance(), 'Merge Studs with Smart Multi-Plate Mode', 'Combines solid color regions into 1\xD72, 2\xD72, 1\xD74, and 2\xD74 plates to cut total piece count and lower Pick a Brick & BrickLink lot costs.', estSavings, 'Use Multi-Plate'));
    }
  }
  if (!cfg.yg_1.equals(RarityPreference_COMMON_ONLY_getInstance()) && (pricing.nh_1 + pricing.oh_1 | 0) >= 12) {
    var estSavings_0 = coerceAtLeast_0(pricing.hh_1 + pricing.fh_1 * 0.08, 1.0);
    suggestions.f(new CostSavingSuggestion('common_only', CostSuggestionActionType_COMMON_RARITY_ONLY_getInstance(), 'Restrict Palette to Common Stocked Colors', 'Eliminates uncommon/rare color price multipliers and makes it easy to order every brick from 1\u20132 stores.', estSavings_0, 'Common Only'));
  }
  var tmp0_0 = result.kg_1;
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
      if (!element_1.le_1.ie_1 && element_1.ne_1 <= 8) {
        count_0 = count_0 + 1 | 0;
        checkCountOverflow(count_0);
      }
    }
    tmp$ret$9 = count_0;
  }
  var smallLots = tmp$ret$9;
  if (cfg.wg_1 < 14.0 && smallLots >= 4) {
    var estShippingSavings = coerceIn(smallLots * 0.75, 2.5, 14.0);
    suggestions.f(new CostSavingSuggestion('consolidate_lots', CostSuggestionActionType_CONSOLIDATE_LOTS_getInstance(), 'Merge ' + smallLots + ' Tiny Color Lots (Save Shipping)', 'Raises \u0394E tolerance to 14 to fold rare 1\u20138 piece accent dots into neighboring colors, reducing BrickLink store splits and Pick a Brick service fees.', estShippingSavings, 'Consolidate Lots'));
  }
  var stepDownTarget = result.cg_1 >= 80 && result.dg_1 >= 80 ? to(64, 64) : result.cg_1 >= 64 && result.dg_1 >= 64 ? to(48, 48) : result.cg_1 >= 48 && result.dg_1 >= 48 ? to(32, 32) : result.cg_1 >= 32 && result.dg_1 >= 32 ? to(24, 24) : null;
  if (!(stepDownTarget == null)) {
    var tw = stepDownTarget.da();
    var th = stepDownTarget.ea();
    var areaRatio = imul_0(tw, th) / imul_0(result.cg_1, result.dg_1);
    var estSavings_1 = pricing.dh_1 * (1.0 - areaRatio);
    if (estSavings_1 > 5.0) {
      suggestions.f(new CostSavingSuggestion('step_down', CostSuggestionActionType_STEP_DOWN_SIZE_getInstance(), 'Resize Grid from ' + result.cg_1 + '\xD7' + result.dg_1 + ' to ' + tw + '\xD7' + th, 'Cuts total stud count by ' + numberToInt((1.0 - areaRatio) * 100) + '% while keeping your artwork crisp and readable.', estSavings_1, 'Resize ' + tw + '\xD7' + th, tw, th));
    }
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp_2 = MarketplaceCartBuilder$generateCostSavingSuggestions$lambda;
  var tmp$ret$12 = new sam$kotlin_Comparator$0_1(tmp_2);
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
  var basePreset = BrickCatalog_getInstance().uh(config.tg_1);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = basePreset.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (!config.ug_1.e1(element.xe_1)) {
      destination.f(element);
    }
  }
  var filtered = destination;
  if (config.yg_1.equals(RarityPreference_COMMON_ONLY_getInstance())) {
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = filtered;
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_0 = tmp0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      if (element_0.af_1.equals(AvailabilityTier_COMMON_getInstance())) {
        destination_0.f(element_0);
      }
    }
    filtered = destination_0;
  }
  if (config.zg_1) {
    var part = config.rg_1.ai_1;
    // Inline function 'kotlin.collections.filter' call
    var tmp0_0 = filtered;
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_1 = tmp0_0.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      if (BrickCatalog_getInstance().bi(part, element_1.xe_1)) {
        destination_1.f(element_1);
      }
    }
    var legalOnly = destination_1;
    if (legalOnly.l() >= 2) {
      filtered = legalOnly;
    }
  }
  return filtered.l() >= 2 ? filtered : listOf_0([BrickCatalog_getInstance().ph_1.k(0), BrickCatalog_getInstance().ph_1.k(1)]);
}
function sampleAndPreprocess($this, bitmap, targetW, targetH, config) {
  var srcW = bitmap.ci_1;
  var srcH = bitmap.di_1;
  var tmp;
  if (config.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
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
  bitmap.fi(pixels, 0, cropW, cropX, cropY, cropW, cropH);
  var out = new Float32Array(imul_0(imul_0(targetW, targetH), 3));
  var cellW = cropW / targetW;
  var cellH = cropH / targetH;
  var brightnessOffset = config.ah_1 * 255.0;
  var contrast = config.bh_1;
  var saturation = config.ch_1;
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
              var other = Color_instance.gi(pxColor);
              rSum = add(tmp0_1, fromInt(other));
              var tmp0_2 = gSum;
              // Inline function 'kotlin.Long.plus' call
              var other_0 = Color_instance.hi(pxColor);
              gSum = add(tmp0_2, fromInt(other_0));
              var tmp0_3 = bSum;
              // Inline function 'kotlin.Long.plus' call
              var other_1 = Color_instance.ii(pxColor);
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
  var ditherStrength = config.xg_1 ? 0.58 : 0.0;
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
          var bestColor = findBestPaletteColor($this, lab[0], lab[1], lab[2], palette, config.yg_1);
          result[cellIdx] = bestColor.xe_1;
          if (ditherStrength > 0.0) {
            var errR = (r - bestColor.hf_1 | 0) * ditherStrength;
            var errG = (g - bestColor.if_1 | 0) * ditherStrength;
            var errB = (b - bestColor.jf_1 | 0) * ditherStrength;
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
    var de = BrickCatalog_getInstance().ji(labL, labA, labB, candidate);
    var tmp;
    switch (rarityPreference.o1_1) {
      case 0:
        tmp = 0.0;
        break;
      case 1:
        var tmp_0;
        switch (candidate.af_1.o1_1) {
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
        var tmp0_safe_receiver = forcedSwaps.k1(out[i]);
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
    var tmp1_elvis_lhs = counts.k1(cid);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + 1 | 0;
    counts.t2(cid, value);
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  var this_0 = counts.m1();
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp = MosaicConverterEngine$applyColorToleranceConsolidation$lambda;
  var tmp$ret$8 = new sam$kotlin_Comparator$0_3(tmp);
  // Inline function 'kotlin.collections.map' call
  var this_1 = sortedWith(this_0, tmp$ret$8);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
  var _iterator__ex2g4s = this_1.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var tmp$ret$11 = item.g1();
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
    var tmp2_elvis_lhs = BrickCatalog_getInstance().qh_1.k1(cid_0);
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
        if (BrickCatalog_getInstance().ki(brickColor, element) <= tolerance) {
          tmp$ret$14 = element;
          break $l$block;
        }
      }
      tmp$ret$14 = null;
    }
    var closeDominant = tmp$ret$14;
    if (!(closeDominant == null)) {
      // Inline function 'kotlin.collections.set' call
      var value_0 = closeDominant.xe_1;
      remap.t2(cid_0, value_0);
    } else {
      keptColors.f(brickColor);
      // Inline function 'kotlin.collections.set' call
      remap.t2(cid_0, cid_0);
    }
  }
  var inductionVariable_1 = 0;
  var last_1 = out.length - 1 | 0;
  if (inductionVariable_1 <= last_1)
    do {
      var i_0 = inductionVariable_1;
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      var tmp3_safe_receiver = remap.k1(out[i_0]);
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
  switch (backingSystem.o1_1) {
    case 0:
      // Inline function 'kotlin.math.ceil' call

      var x = width / 16.0;
      var tmp$ret$2 = Math.ceil(x);
      var cols = coerceAtLeast(numberToInt(tmp$ret$2), 1);
      // Inline function 'kotlin.math.ceil' call

      var x_0 = height / 16.0;
      var tmp$ret$3 = Math.ceil(x_0);
      var rows = coerceAtLeast(numberToInt(tmp$ret$3), 1);
      var black = BrickCatalog_getInstance().rh_1;
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
              backingPieces.f(new PlacedPiece(_unary__edvuaz, framePart, black, x_1, y, w, h, 0, mc, mr, AvailabilityTier_COMMON_getInstance(), true, framePart.je_1, framePart.ke_1));
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
      var black_0 = BrickCatalog_getInstance().rh_1;
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
              backingPieces.f(new PlacedPiece(_unary__edvuaz_0, basePart, black_0, x_4, y_0, tmp, tmp$ret$15, 0, mc_1, mr_1, AvailabilityTier_COMMON_getInstance(), true, basePart.je_1, basePart.ke_1));
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
  switch (config.rg_1.o1_1) {
    case 0:
    case 1:
      var desiredPart = config.rg_1.ai_1;
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
              var tmp1_elvis_lhs = BrickCatalog_getInstance().qh_1.k1(colorId);
              var color = tmp1_elvis_lhs == null ? BrickCatalog_getInstance().rh_1 : tmp1_elvis_lhs;
              var legal = BrickCatalog_getInstance().bi(desiredPart, color.xe_1);
              var tmp;
              if (!legal && config.zg_1 && BrickCatalog_getInstance().bi(BrickPartType_ROUND_PLATE_1X1_getInstance(), color.xe_1)) {
                tmp = BrickPartType_ROUND_PLATE_1X1_getInstance();
              } else {
                tmp = desiredPart;
              }
              var actualPart = tmp;
              var isActualLegal = BrickCatalog_getInstance().bi(actualPart, color.xe_1);
              var _unary__edvuaz = nextId;
              nextId = _unary__edvuaz + 1 | 0;
              pieces.f(new PlacedPiece(_unary__edvuaz, actualPart, color, x, y, 1, 1, 1, x / 16 | 0, y / 16 | 0, BrickCatalog_getInstance().li(actualPart, color), isActualLegal, BrickCatalog_getInstance().mi(actualPart, color), BrickCatalog_getInstance().ni(actualPart, color)));
            }
             while (inductionVariable_0 < width);
        }
         while (inductionVariable < height);
      break;
    case 2:
      var used = booleanArray(imul_0(width, height));
      var respectModuleSeams = config.zg_1 && config.sg_1.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance());
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
              var tmp2_elvis_lhs = BrickCatalog_getInstance().qh_1.k1(colorId_0);
              var color_0 = tmp2_elvis_lhs == null ? BrickCatalog_getInstance().rh_1 : tmp2_elvis_lhs;
              var placed = false;
              var _iterator__ex2g4s = candidates.g();
              $l$loop_3: while (_iterator__ex2g4s.h()) {
                var _destruct__k2r9zo = _iterator__ex2g4s.i();
                var part = _destruct__k2r9zo.da();
                var pw = _destruct__k2r9zo.ea();
                var ph = _destruct__k2r9zo.cd();
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
                if (imul_0(pw, ph) > 1 && config.zg_1 && !BrickCatalog_getInstance().bi(part, color_0.xe_1)) {
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
                  var legal_0 = BrickCatalog_getInstance().bi(part, color_0.xe_1);
                  var _unary__edvuaz_0 = nextId;
                  nextId = _unary__edvuaz_0 + 1 | 0;
                  pieces.f(new PlacedPiece(_unary__edvuaz_0, part, color_0, x_0, y_0, pw, ph, 1, x_0 / 16 | 0, y_0 / 16 | 0, BrickCatalog_getInstance().li(part, color_0), legal_0, BrickCatalog_getInstance().mi(part, color_0), BrickCatalog_getInstance().ni(part, color_0)));
                  placed = true;
                  break $l$loop_3;
                }
              }
              if (!placed) {
                used[imul_0(y_0, width) + x_0 | 0] = true;
                var part_0 = BrickPartType_PLATE_1X1_getInstance();
                var _unary__edvuaz_1 = nextId;
                nextId = _unary__edvuaz_1 + 1 | 0;
                pieces.f(new PlacedPiece(_unary__edvuaz_1, part_0, color_0, x_0, y_0, 1, 1, 1, x_0 / 16 | 0, y_0 / 16 | 0, BrickCatalog_getInstance().li(part_0, color_0), BrickCatalog_getInstance().bi(part_0, color_0.xe_1), BrickCatalog_getInstance().mi(part_0, color_0), BrickCatalog_getInstance().ni(part_0, color_0)));
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
            var tmp3_elvis_lhs = BrickCatalog_getInstance().qh_1.k1(colorId_1);
            var color_1 = tmp3_elvis_lhs == null ? BrickCatalog_getInstance().rh_1 : tmp3_elvis_lhs;
            var maxRun = 1;
            while (maxRun < 4 && (x_1 + maxRun | 0) < width && grid[(imul_0(y_1, width) + x_1 | 0) + maxRun | 0] === colorId_1) {
              maxRun = maxRun + 1 | 0;
            }
            // Inline function 'kotlin.collections.filter' call
            var tmp0 = downTo(maxRun, 1);
            // Inline function 'kotlin.collections.filterTo' call
            var destination = ArrayList_init_$Create$();
            var inductionVariable_8 = tmp0.rc_1;
            var last = tmp0.sc_1;
            var step = tmp0.tc_1;
            if (step > 0 && inductionVariable_8 <= last || (step < 0 && last <= inductionVariable_8))
              do {
                var element = inductionVariable_8;
                inductionVariable_8 = inductionVariable_8 + step | 0;
                var len = element;
                var part_1 = brickPartForLength(MosaicConverterEngine_instance, len);
                if (len === 1 || !config.zg_1 || BrickCatalog_getInstance().bi(part_1, color_1.xe_1)) {
                  destination.f(element);
                }
              }
               while (!(element === last));
            var candidateLengths = destination;
            var tmp_0;
            if (config.zg_1 && y_1 < (height - 1 | 0)) {
              var tmp$ret$5;
              $l$block: {
                // Inline function 'kotlin.collections.firstOrNull' call
                var _iterator__ex2g4s_0 = candidateLengths.g();
                while (_iterator__ex2g4s_0.h()) {
                  var element_0 = _iterator__ex2g4s_0.i();
                  var endX = x_1 + element_0 | 0;
                  if (endX === width || !prevRowSeams.e1(endX)) {
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
            pieces.f(new PlacedPiece(_unary__edvuaz_2, part_2, color_1, x_1, y_1, chosenLen, 1, 1, x_1 / 16 | 0, y_1 / 16 | 0, BrickCatalog_getInstance().li(part_2, color_1), BrickCatalog_getInstance().bi(part_2, color_1.xe_1), BrickCatalog_getInstance().mi(part_2, color_1), BrickCatalog_getInstance().ni(part_2, color_1)));
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
    var key = to(p.pi_1, p.qi_1);
    var tmp0_elvis_lhs = grouped.k1(key);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
    grouped.t2(key, value);
  }
  var _iterator__ex2g4s_0 = backingPieces.g();
  while (_iterator__ex2g4s_0.h()) {
    var b = _iterator__ex2g4s_0.i();
    var key_0 = to(b.pi_1, b.qi_1);
    var tmp1_elvis_lhs = grouped.k1(key_0);
    // Inline function 'kotlin.collections.set' call
    var value_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + 1 | 0;
    grouped.t2(key_0, value_0);
  }
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!technicPins.j()) {
    var key_1 = to(BrickPartType_TECHNIC_PIN_getInstance(), BrickCatalog_getInstance().rh_1);
    var tmp2_elvis_lhs = grouped.k1(key_1);
    // Inline function 'kotlin.collections.set' call
    var value_1 = (tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs) + technicPins.l() | 0;
    grouped.t2(key_1, value_1);
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = grouped.m1();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s_1 = this_0.g();
  while (_iterator__ex2g4s_1.h()) {
    var item = _iterator__ex2g4s_1.i();
    // Inline function 'kotlin.collections.component1' call
    var key_2 = item.g1();
    // Inline function 'kotlin.collections.component2' call
    var qty = item.h1();
    var part = key_2.da();
    var color = key_2.ea();
    var pabUnit = BrickCatalog_getInstance().mi(part, color);
    var blUnit = BrickCatalog_getInstance().ni(part, color);
    var rarity = BrickCatalog_getInstance().li(part, color);
    var legal = BrickCatalog_getInstance().bi(part, color.xe_1);
    var tmp;
    if (!part.ie_1 && (!rarity.equals(AvailabilityTier_COMMON_getInstance()) || !legal)) {
      tmp = BrickCatalog_getInstance().cj(color, part);
    } else {
      tmp = null;
    }
    var altColor = tmp;
    var tmp_0;
    if (altColor == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp_0 = BrickCatalog_getInstance().mi(part, altColor);
    }
    var tmp1_elvis_lhs_0 = tmp_0;
    var altUnit = tmp1_elvis_lhs_0 == null ? pabUnit : tmp1_elvis_lhs_0;
    // Inline function 'kotlin.math.max' call
    var b_0 = (pabUnit - altUnit) * qty;
    var savings = Math.max(0.0, b_0);
    var tmp_1 = pabUnit * qty;
    var tmp_2 = blUnit * qty;
    var tmp_3;
    if (part.ie_1) {
      tmp_3 = 0;
    } else {
      var tmp2_elvis_lhs_0 = colorNumberMap.k1(color.xe_1);
      tmp_3 = tmp2_elvis_lhs_0 == null ? 0 : tmp2_elvis_lhs_0;
    }
    var tmp$ret$7 = new PartBomLine(part, color, qty, rarity, legal, pabUnit, blUnit, tmp_1, tmp_2, tmp_3, altColor, savings);
    destination.f(tmp$ret$7);
  }
  var tmp_4 = destination;
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_5 = MosaicConverterEngine$buildBomAndPricing$lambda;
  // Inline function 'kotlin.comparisons.thenByDescending' call
  var this_1 = new sam$kotlin_Comparator$0_4(tmp_5);
  var tmp_6 = MosaicConverterEngine$buildBomAndPricing$lambda_0(this_1);
  var tmp$ret$14 = new sam$kotlin_Comparator$0_4(tmp_6);
  var bomLines = sortedWith(tmp_4, tmp$ret$14);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_2 = bomLines.g();
  while (_iterator__ex2g4s_2.h()) {
    var element = _iterator__ex2g4s_2.i();
    if (!element.le_1.ie_1) {
      destination_0.f(element);
    }
  }
  // Inline function 'kotlin.collections.sumOf' call
  var sum = 0;
  var _iterator__ex2g4s_3 = destination_0.g();
  while (_iterator__ex2g4s_3.h()) {
    var element_0 = _iterator__ex2g4s_3.i();
    var tmp_7 = sum;
    sum = tmp_7 + element_0.se_1;
  }
  var surfacePab = sum;
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_1 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_4 = bomLines.g();
  while (_iterator__ex2g4s_4.h()) {
    var element_1 = _iterator__ex2g4s_4.i();
    if (element_1.le_1.ie_1) {
      destination_1.f(element_1);
    }
  }
  // Inline function 'kotlin.collections.sumOf' call
  var sum_0 = 0;
  var _iterator__ex2g4s_5 = destination_1.g();
  while (_iterator__ex2g4s_5.h()) {
    var element_2 = _iterator__ex2g4s_5.i();
    var tmp_8 = sum_0;
    sum_0 = tmp_8 + element_2.se_1;
  }
  var structuralPab = sum_0;
  var totalPab = surfacePab + structuralPab;
  // Inline function 'kotlin.collections.sumOf' call
  var sum_1 = 0;
  var _iterator__ex2g4s_6 = bomLines.g();
  while (_iterator__ex2g4s_6.h()) {
    var element_3 = _iterator__ex2g4s_6.i();
    var tmp_9 = sum_1;
    sum_1 = tmp_9 + element_3.te_1;
  }
  var totalBl = sum_1;
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_2 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_7 = bomLines.g();
  while (_iterator__ex2g4s_7.h()) {
    var element_4 = _iterator__ex2g4s_7.i();
    if (!element_4.le_1.ie_1 && element_4.oe_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
      destination_2.f(element_4);
    }
  }
  // Inline function 'kotlin.collections.sumOf' call
  var sum_2 = 0;
  var _iterator__ex2g4s_8 = destination_2.g();
  while (_iterator__ex2g4s_8.h()) {
    var element_5 = _iterator__ex2g4s_8.i();
    var tmp_10 = sum_2;
    sum_2 = tmp_10 + element_5.we_1;
  }
  var rarePremium = sum_2;
  var tmp_11;
  if (config.rg_1.equals(BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance())) {
    // Inline function 'kotlin.collections.sumOf' call
    var sum_3 = 0;
    var _iterator__ex2g4s_9 = surfacePieces.g();
    while (_iterator__ex2g4s_9.h()) {
      var element_6 = _iterator__ex2g4s_9.i();
      var tmp_12 = sum_3;
      var studCount = imul_0(element_6.ti_1, element_6.ui_1);
      sum_3 = tmp_12 + BrickCatalog_getInstance().mi(BrickPartType_PLATE_1X1_getInstance(), element_6.qi_1) * studCount;
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
      if (element_7.yi_1.equals(AvailabilityTier_COMMON_getInstance())) {
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
      if (element_8.yi_1.equals(AvailabilityTier_UNCOMMON_getInstance())) {
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
      if (element_9.yi_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
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
    var last = p.ui_1;
    if (inductionVariable < last)
      do {
        var dy = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        var last_0 = p.ti_1;
        if (inductionVariable_0 < last_0)
          do {
            var dx = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var idx = imul_0(p.si_1 + dy | 0, width) + (p.ri_1 + dx | 0) | 0;
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
  switch (effectiveBacking.o1_1) {
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
  if (config.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
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
      var endX = p_0.ri_1 + p_0.ti_1 | 0;
      if (endX < width) {
        rowSeams[p_0.si_1].f(endX);
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
            if (rowSeams[r].e1(col)) {
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
    checks.f(new ValidationIssue('seam_stagger_check', tmp_7, tmp_8, tmp_9, tmp_10, weakSeamColumns, weakSeamColumns > 0 && !config.zg_1, 'Enforce Seam Stagger'));
  } else if (config.rg_1.equals(BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance()) && effectiveBacking.equals(BackingSystem_TECHNIC_FRAMES_16X16_getInstance())) {
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
        if (!((element_0.ri_1 / 16 | 0) === (((element_0.ri_1 + element_0.ti_1 | 0) - 1 | 0) / 16 | 0)) || !((element_0.si_1 / 16 | 0) === (((element_0.si_1 + element_0.ui_1 | 0) - 1 | 0) / 16 | 0))) {
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
    if (!element_1.zi_1) {
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
    tmp_20 = 'Some selected colors were never produced in ' + config.rg_1.ai_1.be_1 + '. Auto-fix substitutes legal production molds or colors.';
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
    if (!element_2.le_1.ie_1 && element_2.oe_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
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
    sum = tmp_23 + element_3.ne_1 | 0;
  }
  var totalRareCount = sum;
  if (rareLines.j()) {
    checks.f(new ValidationIssue('rarity_ok', ValidationSeverity_PASS_getInstance(), ValidationCategory_RARITY_COST_getInstance(), 'High Availability \xB7 No Rare/Retired Parts', '100% of elements use active Common or Uncommon official colors readily available on Pick a Brick & BrickLink.', 0));
  } else {
    var _iterator__ex2g4s_5 = take(rareLines, 3).g();
    while (_iterator__ex2g4s_5.h()) {
      var line = _iterator__ex2g4s_5.i();
      var alt = line.ve_1;
      var tmp_24 = 'rare_' + line.me_1.xe_1;
      var tmp_25 = ValidationSeverity_WARNING_getInstance();
      var tmp_26 = ValidationCategory_RARITY_COST_getInstance();
      var tmp_27 = line.me_1.ye_1 + ' (' + line.ne_1 + '\xD7 ' + line.le_1.ae_1 + ') is Rare/Retired';
      var tmp_28;
      if (!(alt == null)) {
        tmp_28 = 'Est. $' + fmt2(line.se_1) + ' (' + fmt2(line.qe_1) + '/ea). Swap to Common ' + alt.ye_1 + ' to save ~$' + fmt2(line.we_1) + '.';
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
        tmp_31 = 'Swap \u2192 ' + alt.ye_1;
      }
      var tmp_32 = tmp_31;
      checks.f(new ValidationIssue(tmp_24, tmp_25, tmp_26, tmp_27, tmp_29, line.ne_1, tmp_30, tmp_32, line.me_1.xe_1, alt == null ? null : alt.xe_1, line.we_1));
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
      if (element_4.ej_1.equals(ValidationSeverity_ERROR_getInstance())) {
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
      if (element_5.ej_1.equals(ValidationSeverity_WARNING_getInstance())) {
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
      completedIds.f(element.oi_1);
    }
  }
  if (config.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
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
        var containsArg = element_0.si_1;
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
          completedIds.f(element_1.oi_1);
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
              if (element_2.xi_1 === mr && element_2.wi_1 === mc) {
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
              var key = element_3.qi_1.xe_1;
              // Inline function 'kotlin.collections.getOrPut' call
              var value = destination_1.k1(key);
              var tmp_0;
              if (value == null) {
                var answer = ArrayList_init_$Create$();
                destination_1.t2(key, answer);
                tmp_0 = answer;
              } else {
                tmp_0 = value;
              }
              var list = tmp_0;
              list.f(element_3);
            }
            // Inline function 'kotlin.collections.sortedBy' call
            var this_0 = destination_1.m1();
            // Inline function 'kotlin.comparisons.compareBy' call
            var tmp_1 = MosaicConverterEngine$generateBuildSteps$lambda(colorNumberMap);
            var tmp$ret$26 = new sam$kotlin_Comparator$0_5(tmp_1);
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
                var list_0 = element_4.h1();
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
                var tmp0_safe_receiver = BrickCatalog_getInstance().qh_1.k1(element_5.g1());
                var tmp0_safe_receiver_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ye_1;
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
                completedIds.f(element_6.oi_1);
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
    var k = to(p.pi_1, p.qi_1);
    var tmp0_elvis_lhs = grouped.k1(k);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
    grouped.t2(k, value);
  }
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!pins.j()) {
    var k_0 = to(BrickPartType_TECHNIC_PIN_getInstance(), BrickCatalog_getInstance().rh_1);
    var tmp1_elvis_lhs = grouped.k1(k_0);
    // Inline function 'kotlin.collections.set' call
    var value_0 = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + pins.l() | 0;
    grouped.t2(k_0, value_0);
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = grouped.m1();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s_0 = this_0.g();
  while (_iterator__ex2g4s_0.h()) {
    var item = _iterator__ex2g4s_0.i();
    // Inline function 'kotlin.collections.component1' call
    var key = item.g1();
    // Inline function 'kotlin.collections.component2' call
    var qty = item.h1();
    var part = key.da();
    var color = key.ea();
    var pabUnit = BrickCatalog_getInstance().mi(part, color);
    var blUnit = BrickCatalog_getInstance().ni(part, color);
    var tmp = BrickCatalog_getInstance().li(part, color);
    var tmp_0 = BrickCatalog_getInstance().bi(part, color.xe_1);
    var tmp_1 = pabUnit * qty;
    var tmp_2 = blUnit * qty;
    var tmp_3;
    if (part.ie_1) {
      tmp_3 = 0;
    } else {
      var tmp0_elvis_lhs_0 = colorNumberMap.k1(color.xe_1);
      tmp_3 = tmp0_elvis_lhs_0 == null ? 0 : tmp0_elvis_lhs_0;
    }
    var tmp$ret$6 = new PartBomLine(part, color, qty, tmp, tmp_0, pabUnit, blUnit, tmp_1, tmp_2, tmp_3);
    destination.f(tmp$ret$6);
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp_4 = MosaicConverterEngine$summarizePiecesForStep$lambda;
  var tmp$ret$10 = new sam$kotlin_Comparator$0_6(tmp_4);
  return sortedWith(destination, tmp$ret$10);
}
function sam$kotlin_Comparator$0_2(function_0) {
  this.oj_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_2).e9 = function (a, b) {
  return this.oj_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_2).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_2).x1 = function () {
  return this.oj_1;
};
protoOf(sam$kotlin_Comparator$0_2).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function sam$kotlin_Comparator$0_3(function_0) {
  this.pj_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_3).e9 = function (a, b) {
  return this.pj_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_3).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_3).x1 = function () {
  return this.pj_1;
};
protoOf(sam$kotlin_Comparator$0_3).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function sam$kotlin_Comparator$0_4(function_0) {
  this.qj_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_4).e9 = function (a, b) {
  return this.qj_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_4).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_4).x1 = function () {
  return this.qj_1;
};
protoOf(sam$kotlin_Comparator$0_4).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function sam$kotlin_Comparator$0_5(function_0) {
  this.rj_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_5).e9 = function (a, b) {
  return this.rj_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_5).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_5).x1 = function () {
  return this.rj_1;
};
protoOf(sam$kotlin_Comparator$0_5).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function sam$kotlin_Comparator$0_6(function_0) {
  this.sj_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_6).e9 = function (a, b) {
  return this.sj_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_6).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_6).x1 = function () {
  return this.sj_1;
};
protoOf(sam$kotlin_Comparator$0_6).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function MosaicConverterEngine$rebuildFromStudGrid$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.h1();
  var tmp$ret$2 = a.h1();
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
  var tmp = b.h1();
  var tmp$ret$2 = a.h1();
  return compareValues(tmp, tmp$ret$2);
}
function MosaicConverterEngine$buildBomAndPricing$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.le_1.ie_1;
  var tmp$ret$2 = b.le_1.ie_1;
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
      var tmp_0 = b.se_1;
      var tmp$ret$2 = a.se_1;
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function MosaicConverterEngine$generateBuildSteps$lambda($colorNumberMap) {
  return function (a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    var tmp0_elvis_lhs = $colorNumberMap.k1(a.g1());
    var tmp = tmp0_elvis_lhs == null ? 99 : tmp0_elvis_lhs;
    var tmp0_elvis_lhs_0 = $colorNumberMap.k1(b.g1());
    var tmp$ret$2 = tmp0_elvis_lhs_0 == null ? 99 : tmp0_elvis_lhs_0;
    return compareValues(tmp, tmp$ret$2);
  };
}
function MosaicConverterEngine$summarizePiecesForStep$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.ne_1;
  var tmp$ret$2 = a.ne_1;
  return compareValues(tmp, tmp$ret$2);
}
function MosaicConverterEngine() {
}
protoOf(MosaicConverterEngine).tj = function (sourceBitmap, config) {
  var width = coerceIn_0(config.og_1, 16, 96);
  var height = coerceIn_0(config.pg_1, 16, 96);
  var candidatePalette = resolveCandidatePalette(this, config);
  var sampledRgb = sampleAndPreprocess(this, sourceBitmap, width, height, config);
  var rawColorGrid = matchColorsToGrid(this, sampledRgb, width, height, candidatePalette, config);
  var consolidatedGrid = applyColorToleranceConsolidation(this, rawColorGrid, width, height, config.wg_1, config.vg_1);
  return this.vj(consolidatedGrid, config.uj(width, height));
};
protoOf(MosaicConverterEngine).vj = function (studColorIds, config) {
  var width = coerceIn_0(config.og_1, 16, 96);
  var height = coerceIn_0(config.pg_1, 16, 96);
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
        tmp_3 = first(BrickCatalog_getInstance().ph_1).xe_1;
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
    var tmp0_elvis_lhs = colorFrequencies.k1(cid);
    // Inline function 'kotlin.collections.set' call
    var value = (tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) + 1 | 0;
    colorFrequencies.t2(cid, value);
  }
  // Inline function 'kotlin.collections.sortedByDescending' call
  var this_0 = colorFrequencies.m1();
  // Inline function 'kotlin.comparisons.compareByDescending' call
  var tmp_4 = MosaicConverterEngine$rebuildFromStudGrid$lambda;
  var tmp$ret$8 = new sam$kotlin_Comparator$0_2(tmp_4);
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
    var tmp$ret$11 = to(item.g1(), index_0 + 1 | 0);
    destination.f(tmp$ret$11);
  }
  var colorNumberMap = toMap(destination);
  var tmp_5;
  if (config.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance())) {
    tmp_5 = BackingSystem_SELF_SUPPORTING_WALL_getInstance();
  } else {
    tmp_5 = config.sg_1;
  }
  var effectiveBacking = tmp_5;
  var _destruct__k2r9zo = buildStructuralBacking(this, width, height, effectiveBacking);
  var backingPieces = _destruct__k2r9zo.da();
  var technicPins = _destruct__k2r9zo.ea();
  var surfacePieces = packSurfacePieces(this, safeGrid, width, height, config, backingPieces.l() + 1 | 0);
  var _destruct__k2r9zo_0 = buildBomAndPricing(this, surfacePieces, backingPieces, technicPins, width, height, colorNumberMap, config);
  var bomLines = _destruct__k2r9zo_0.da();
  var pricing = _destruct__k2r9zo_0.ea();
  var validationReport = validateMosaic(this, width, height, surfacePieces, backingPieces, technicPins, bomLines, effectiveBacking, config);
  var buildSteps = generateBuildSteps(this, width, height, surfacePieces, backingPieces, technicPins, colorNumberMap, config);
  return new MosaicResult(config.uj(width, height, VOID, VOID, effectiveBacking), width, height, safeGrid, surfacePieces, backingPieces, technicPins, validationReport, buildSteps, bomLines, pricing, colorNumberMap);
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
  this.yj_1 = title;
  this.zj_1 = subtitle;
  this.ak_1 = fileSlug;
  this.bk_1 = columnsHint;
}
function csvEscape($this, value) {
  var tmp;
  if (contains_0(value, _Char___init__impl__6a9atx(44)) || contains_0(value, _Char___init__impl__6a9atx(34)) || contains_0(value, _Char___init__impl__6a9atx(10)) || contains_0(value, _Char___init__impl__6a9atx(13))) {
    tmp = '"' + replace(value, '"', '""') + '"';
  } else {
    tmp = value;
  }
  return tmp;
}
function MosaicExporter() {
  MosaicExporter_instance = this;
  this.uf_1 = mapOf_0([to(1, 15), to(11, 0), to(86, 71), to(85, 72), to(5, 4), to(3, 14), to(7, 1), to(6, 2), to(4, 25), to(2, 19), to(88, 70), to(34, 27), to(156, 322), to(63, 272), to(59, 320), to(69, 28), to(80, 288), to(110, 191), to(150, 84), to(120, 308), to(42, 73), to(71, 26), to(104, 29), to(89, 85), to(39, 3), to(220, 1050), to(153, 321), to(105, 212), to(103, 226), to(48, 378), to(55, 379), to(155, 326), to(154, 31), to(157, 30), to(152, 323), to(28, 92), to(90, 78), to(36, 10), to(115, 297), to(95, 179), to(68, 484), to(47, 5), to(54, 373), to(72, 313), to(25, 12), to(73, 112), to(21, 334), to(99, 151)]);
}
protoOf(MosaicExporter).ck = function (brickLinkColorId) {
  var tmp0_elvis_lhs = this.uf_1.k1(brickLinkColorId);
  return tmp0_elvis_lhs == null ? brickLinkColorId : tmp0_elvis_lhs;
};
protoOf(MosaicExporter).dk = function (result, format) {
  return 'studcraft_' + result.cg_1 + 'x' + result.dg_1 + '_' + format.ak_1 + '.csv';
};
protoOf(MosaicExporter).vf = function (result, excludeOwnedKeys) {
  if (excludeOwnedKeys.j())
    return result.kg_1;
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = result.kg_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (!excludeOwnedKeys.e1(element.ek())) {
      destination.f(element);
    }
  }
  return destination;
};
protoOf(MosaicExporter).yf = function (result, format, excludeOwnedKeys) {
  var lines = this.vf(result, excludeOwnedKeys);
  var sb = StringBuilder_init_$Create$_0();
  switch (format.o1_1) {
    case 0:
      // Inline function 'kotlin.text.appendLine' call

      var value = 'Part,Color,Quantity,Is Spare';
      // Inline function 'kotlin.text.appendLine' call

      sb.r5(value).s5(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s = lines.g();
      while (_iterator__ex2g4s.h()) {
        var line = _iterator__ex2g4s.i();
        var rbColorId = this.ck(line.me_1.xe_1);
        // Inline function 'kotlin.text.appendLine' call
        var value_0 = joinToString_1(listOf_0([csvEscape(this, line.le_1.ae_1), rbColorId.toString(), line.ne_1.toString(), 'False']), ',');
        // Inline function 'kotlin.text.appendLine' call
        sb.r5(value_0).s5(_Char___init__impl__6a9atx(10));
      }

      break;
    case 1:
      // Inline function 'kotlin.text.appendLine' call

      var value_1 = 'Item Type,Part Number,Part Name,BrickLink Color ID,Color Name,Quantity,Condition,Availability,Est BL Unit USD,Est BL Total USD';
      // Inline function 'kotlin.text.appendLine' call

      sb.r5(value_1).s5(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s_0 = lines.g();
      while (_iterator__ex2g4s_0.h()) {
        var line_0 = _iterator__ex2g4s_0.i();
        // Inline function 'kotlin.text.appendLine' call
        var value_2 = joinToString_1(listOf_0(['P', csvEscape(this, line_0.le_1.ae_1), csvEscape(this, line_0.le_1.be_1), line_0.me_1.xe_1.toString(), csvEscape(this, line_0.me_1.ye_1), line_0.ne_1.toString(), 'New', csvEscape(this, line_0.oe_1.ik_1), fmt2(line_0.re_1), fmt2(line_0.te_1)]), ',');
        // Inline function 'kotlin.text.appendLine' call
        sb.r5(value_2).s5(_Char___init__impl__6a9atx(10));
      }

      break;
    case 2:
      // Inline function 'kotlin.text.appendLine' call

      var value_3 = 'Design ID,Part Name,Color ID,Color Name,Quantity,Availability,Est PAB Unit USD,Est PAB Total USD';
      // Inline function 'kotlin.text.appendLine' call

      sb.r5(value_3).s5(_Char___init__impl__6a9atx(10));
      var _iterator__ex2g4s_1 = lines.g();
      while (_iterator__ex2g4s_1.h()) {
        var line_1 = _iterator__ex2g4s_1.i();
        // Inline function 'kotlin.text.appendLine' call
        var value_4 = joinToString_1(listOf_0([csvEscape(this, line_1.le_1.ae_1), csvEscape(this, line_1.le_1.be_1), line_1.me_1.xe_1.toString(), csvEscape(this, line_1.me_1.ye_1), line_1.ne_1.toString(), csvEscape(this, line_1.oe_1.hk_1), fmt2(line_1.qe_1), fmt2(line_1.se_1)]), ',');
        // Inline function 'kotlin.text.appendLine' call
        sb.r5(value_4).s5(_Char___init__impl__6a9atx(10));
      }

      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return sb.toString();
};
protoOf(MosaicExporter).jk = function (result, format, excludeOwnedKeys, $super) {
  excludeOwnedKeys = excludeOwnedKeys === VOID ? emptySet() : excludeOwnedKeys;
  return $super === VOID ? this.yf(result, format, excludeOwnedKeys) : $super.yf.call(this, result, format, excludeOwnedKeys);
};
protoOf(MosaicExporter).kk = function (result) {
  var sb = StringBuilder_init_$Create$_0();
  // Inline function 'kotlin.text.appendLine' call
  var value = 'StudCraft Brick Mosaic Build Spec';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_0 = 'Dimensions: ' + result.cg_1 + ' x ' + result.dg_1 + ' studs';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_0).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_1 = 'Style: ' + result.bg_1.rg_1.xh_1;
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_1).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_2 = 'Backing: ' + result.bg_1.sg_1.nk_1;
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_2).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_3 = 'Engineering Legality: ' + (result.ig_1.qk_1 ? '100% LEGAL' : 'Needs Review') + ' (' + result.ig_1.rk_1 + '/100)';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_3).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_4 = 'Total Pieces: ' + result.lg_1.kh_1 + ' (' + result.lg_1.lh_1 + ' unique lots)';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_4).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_5 = 'Estimated Cost (Pick a Brick New): $' + fmt2(result.lg_1.dh_1);
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_5).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_6 = 'Estimated Cost (BrickLink Market): $' + fmt2(result.lg_1.eh_1);
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_6).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  sb.s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.text.appendLine' call
  var value_7 = 'PARTS LIST (Part # | Color | Qty | Est. PAB)';
  // Inline function 'kotlin.text.appendLine' call
  sb.r5(value_7).s5(_Char___init__impl__6a9atx(10));
  var _iterator__ex2g4s = result.kg_1.g();
  while (_iterator__ex2g4s.h()) {
    var line = _iterator__ex2g4s.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_8 = '- ' + line.le_1.ae_1 + ' (' + line.le_1.ce_1 + ') | ' + line.me_1.ye_1 + ' | x' + line.ne_1 + ' | $' + fmt2(line.se_1) + ' [' + line.oe_1.ik_1 + ']';
    // Inline function 'kotlin.text.appendLine' call
    sb.r5(value_8).s5(_Char___init__impl__6a9atx(10));
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
  var tmp0_safe_receiver = Regex_init_$Create$_0('(\\d+(?:\\.\\d+)?)').d8(id);
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.h1();
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : toDoubleOrNull(tmp1_safe_receiver);
  return tmp2_elvis_lhs == null ? 0.0 : tmp2_elvis_lhs;
}
function sam$kotlin_Comparator$0_7(function_0) {
  this.zk_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_7).e9 = function (a, b) {
  return this.zk_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_7).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_7).x1 = function () {
  return this.zk_1;
};
protoOf(sam$kotlin_Comparator$0_7).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
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
  return hashCode_0(this.x1());
};
function sam$kotlin_Comparator$0_8(function_0) {
  this.al_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_8).e9 = function (a, b) {
  return this.al_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_8).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_8).x1 = function () {
  return this.al_1;
};
protoOf(sam$kotlin_Comparator$0_8).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_8).hashCode = function () {
  return hashCode_0(this.x1());
};
function GeminiModelFailover$orderTextModels$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = contains_1(a, 'flash') && !contains_1(a, 'lite') ? 0 : contains_1(a, 'flash') ? 1 : 2;
  var tmp$ret$2 = contains_1(b, 'flash') && !contains_1(b, 'lite') ? 0 : contains_1(b, 'flash') ? 1 : 2;
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
      var tmp_0 = contains_1(a, 'preview') || contains_1(a, 'exp') ? 1 : 0;
      var tmp$ret$2 = contains_1(b, 'preview') || contains_1(b, 'exp') ? 1 : 0;
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
  var tmp = contains_1(a, 'preview') ? 1 : 0;
  var tmp$ret$2 = contains_1(b, 'preview') ? 1 : 0;
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
      var tmp_0 = contains_1(a, 'flash') ? 0 : 1;
      var tmp$ret$2 = contains_1(b, 'flash') ? 0 : 1;
      tmp = compareValues(tmp_0, tmp$ret$2);
    }
    return tmp;
  };
}
function GeminiModelFailover() {
  GeminiModelFailover_instance = this;
  this.bl_1 = listOf_0(['image', 'tts', 'live', 'audio', 'embedding', 'robotics', 'computer', 'native', 'aqa', 'veo']);
}
protoOf(GeminiModelFailover).cl = function (ids, preferred) {
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = distinct(ids);
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp;
    if (!(element === preferred) && startsWith(element, 'gemini')) {
      var tmp0_0 = GeminiModelFailover_getInstance().bl_1;
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
          if (contains_1(element, element_0)) {
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
    if (contains_1(element_1, 'flash') || contains_1(element_1, 'pro')) {
      destination_0.f(element_1);
    }
  }
  var tmp_1 = destination_0;
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_2 = GeminiModelFailover$orderTextModels$lambda;
  // Inline function 'kotlin.comparisons.thenBy' call
  var this_0 = new sam$kotlin_Comparator$0_7(tmp_2);
  var tmp_3 = GeminiModelFailover$orderTextModels$lambda_0(this_0);
  // Inline function 'kotlin.comparisons.thenByDescending' call
  var this_1 = new sam$kotlin_Comparator$0_7(tmp_3);
  var tmp_4 = GeminiModelFailover$orderTextModels$lambda_1(this_1);
  var tmp$ret$10 = new sam$kotlin_Comparator$0_7(tmp_4);
  var others = sortedWith(tmp_1, tmp$ret$10);
  return take(plus(listOf(preferred), others), 4);
};
protoOf(GeminiModelFailover).dl = function (ids) {
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = distinct(ids);
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (startsWith(element, 'gemini') && contains_1(element, 'image')) {
      destination.f(element);
    }
  }
  var tmp = destination;
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_0 = GeminiModelFailover$orderImageModels$lambda;
  // Inline function 'kotlin.comparisons.thenByDescending' call
  var this_0 = new sam$kotlin_Comparator$0_8(tmp_0);
  var tmp_1 = GeminiModelFailover$orderImageModels$lambda_0(this_0);
  // Inline function 'kotlin.comparisons.thenBy' call
  var this_1 = new sam$kotlin_Comparator$0_8(tmp_1);
  var tmp_2 = GeminiModelFailover$orderImageModels$lambda_1(this_1);
  var tmp$ret$5 = new sam$kotlin_Comparator$0_8(tmp_2);
  return take(sortedWith(tmp, tmp$ret$5), 3);
};
protoOf(GeminiModelFailover).el = function (code, body) {
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
      tmp = !contains_1(tmp$ret$0, 'api key');
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
  this.fl_1 = 'image|picture|pic|photo|mosaic|artwork|illustration|portrait|drawing|painting|logo';
  this.gl_1 = Regex_init_$Create$('^(how|what|why|which|where|when|who|is|are|do|does|did|should|can i|could i)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.hl_1 = Regex_init_$Create$('^(please\\s+)?(draw|paint|sketch|illustrate|imagine)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.il_1 = Regex_init_$Create$('\\b(create|make|generate|design|render)\\b(?:\\s+\\w+){0,2}?\\s+(?:a|an|new|some)\\s+(?:[\\w-]+\\s+){0,3}?(image|picture|pic|photo|mosaic|artwork|illustration|portrait|drawing|painting|logo)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.jl_1 = Regex_init_$Create$('^(?:please\\s+)?(?:create|make|generate|design|render)(?:\\s+(?:me|us))?\\s+(?:a|an|some)\\s+(.+)$', RegexOption_IGNORE_CASE_getInstance());
  this.kl_1 = Regex_init_$Create$('\\b(list|plan|guide|cart|csv|note|notes|summary|budget|table|backup|copy|export|report|schedule|comparison|estimate|order|wishlist)\\b', RegexOption_IGNORE_CASE_getInstance());
  this.ll_1 = Regex_init_$Create$('\\b(create|generate)\\s+(image|picture|pic|photo|mosaic|artwork|illustration|portrait|drawing|painting|logo)s?\\b', RegexOption_IGNORE_CASE_getInstance());
}
protoOf(ImageRequestParser).ml = function (text) {
  // Inline function 'kotlin.text.trim' call
  var clean = toString_1(trim_0(isCharSequence(text) ? text : THROW_CCE()));
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(clean) === 0)
    return false;
  var canYouAsk = startsWith(clean, 'can you', true) || startsWith(clean, 'could you', true);
  if (!canYouAsk && this.gl_1.b8(clean))
    return false;
  // Inline function 'kotlin.text.replace' call
  var request = Regex_init_$Create$('^(can|could) you\\s+', RegexOption_IGNORE_CASE_getInstance()).e8(clean, '');
  var tmp0_safe_receiver = this.jl_1.d8(request);
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c9();
  var directThing = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.k(1);
  return this.hl_1.b8(request) || (!(directThing == null) && !this.kl_1.b8(directThing)) || this.il_1.b8(request) || this.ll_1.b8(request);
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
function values_1() {
  static_init_4();
  return [AvailabilityTier_COMMON_getInstance(), AvailabilityTier_UNCOMMON_getInstance(), AvailabilityTier_RARE_RETIRED_getInstance()];
}
function get_entries_1() {
  static_init_4();
  if ($ENTRIES_1 == null)
    $ENTRIES_1 = enumEntries(values_1());
  return $ENTRIES_1;
}
var $ENTRIES_1;
function AvailabilityTier(name, ordinal, label, shortLabel) {
  Enum.call(this, name, ordinal);
  this.hk_1 = label;
  this.ik_1 = shortLabel;
}
function BrickColor(id, officialName, hex, tier, priceMultiplier, inArtMosaicSets, inClassic1978, inMonochrome, inEarthBotanical, inPopArt) {
  this.xe_1 = id;
  this.ye_1 = officialName;
  this.ze_1 = hex;
  this.af_1 = tier;
  this.bf_1 = priceMultiplier;
  this.cf_1 = inArtMosaicSets;
  this.df_1 = inClassic1978;
  this.ef_1 = inMonochrome;
  this.ff_1 = inEarthBotanical;
  this.gf_1 = inPopArt;
  this.hf_1 = convertToInt(bitwiseAnd(shiftRight(this.ze_1, 16), new Long(255, 0)));
  this.if_1 = convertToInt(bitwiseAnd(shiftRight(this.ze_1, 8), new Long(255, 0)));
  this.jf_1 = convertToInt(bitwiseAnd(this.ze_1, new Long(255, 0)));
  var lab = rgbToLab(this.hf_1, this.if_1, this.jf_1);
  this.kf_1 = lab[0];
  this.lf_1 = lab[1];
  this.mf_1 = lab[2];
}
protoOf(BrickColor).toString = function () {
  return 'BrickColor(id=' + this.xe_1 + ', officialName=' + this.ye_1 + ', hex=' + this.ze_1.toString() + ', tier=' + this.af_1.toString() + ', priceMultiplier=' + this.bf_1 + ', inArtMosaicSets=' + this.cf_1 + ', inClassic1978=' + this.df_1 + ', inMonochrome=' + this.ef_1 + ', inEarthBotanical=' + this.ff_1 + ', inPopArt=' + this.gf_1 + ')';
};
protoOf(BrickColor).hashCode = function () {
  var result = this.xe_1;
  result = imul_0(result, 31) + getStringHashCode(this.ye_1) | 0;
  result = imul_0(result, 31) + this.ze_1.hashCode() | 0;
  result = imul_0(result, 31) + this.af_1.hashCode() | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.bf_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.cf_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.df_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.ef_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.ff_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.gf_1) | 0;
  return result;
};
protoOf(BrickColor).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof BrickColor))
    return false;
  if (!(this.xe_1 === other.xe_1))
    return false;
  if (!(this.ye_1 === other.ye_1))
    return false;
  if (!equalsLong(this.ze_1, other.ze_1))
    return false;
  if (!this.af_1.equals(other.af_1))
    return false;
  if (!equals(this.bf_1, other.bf_1))
    return false;
  if (!(this.cf_1 === other.cf_1))
    return false;
  if (!(this.df_1 === other.df_1))
    return false;
  if (!(this.ef_1 === other.ef_1))
    return false;
  if (!(this.ff_1 === other.ff_1))
    return false;
  if (!(this.gf_1 === other.gf_1))
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
function values_2() {
  static_init_5();
  return [PalettePreset_OFFICIAL_ACTIVE_getInstance(), PalettePreset_ART_MOSAIC_DOTS_getInstance(), PalettePreset_PICK_A_BRICK_COMMON_getInstance(), PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance(), PalettePreset_CLASSIC_RETRO_getInstance(), PalettePreset_MONOCHROME_STUDIO_getInstance(), PalettePreset_EARTH_BOTANICAL_getInstance(), PalettePreset_POP_ART_VIBRANT_getInstance()];
}
function get_entries_2() {
  static_init_5();
  if ($ENTRIES_2 == null)
    $ENTRIES_2 = enumEntries(values_2());
  return $ENTRIES_2;
}
var $ENTRIES_2;
function PalettePreset(name, ordinal, title, subtitle) {
  Enum.call(this, name, ordinal);
  this.pl_1 = title;
  this.ql_1 = subtitle;
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
  this.ae_1 = partNumber;
  this.be_1 = displayName;
  this.ce_1 = shortName;
  this.de_1 = widthStuds;
  this.ee_1 = heightStuds;
  this.fe_1 = heightInPlates;
  this.ge_1 = hasStuds;
  this.he_1 = isRound;
  this.ie_1 = isStructural;
  this.je_1 = basePabUsd;
  this.ke_1 = baseBlUsd;
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
function values_3() {
  static_init_7();
  return [BuildStyle_ROUND_TILES_ART_getInstance(), BuildStyle_ROUND_PLATES_STUDS_getInstance(), BuildStyle_OPTIMIZED_MULTI_PLATE_getInstance(), BuildStyle_STACKED_BRICK_WALL_getInstance()];
}
function get_entries_3() {
  static_init_7();
  if ($ENTRIES_3 == null)
    $ENTRIES_3 = enumEntries(values_3());
  return $ENTRIES_3;
}
var $ENTRIES_3;
function BuildStyle(name, ordinal, title, shortTitle, description, primaryPart) {
  Enum.call(this, name, ordinal);
  this.xh_1 = title;
  this.yh_1 = shortTitle;
  this.zh_1 = description;
  this.ai_1 = primaryPart;
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
function values_4() {
  static_init_8();
  return [BackingSystem_TECHNIC_FRAMES_16X16_getInstance(), BackingSystem_BASEPLATES_32X32_getInstance(), BackingSystem_SELF_SUPPORTING_WALL_getInstance()];
}
function get_entries_4() {
  static_init_8();
  if ($ENTRIES_4 == null)
    $ENTRIES_4 = enumEntries(values_4());
  return $ENTRIES_4;
}
var $ENTRIES_4;
function BackingSystem(name, ordinal, title, shortTitle, description) {
  Enum.call(this, name, ordinal);
  this.nk_1 = title;
  this.ok_1 = shortTitle;
  this.pk_1 = description;
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
function values_5() {
  static_init_9();
  return [RarityPreference_COMMON_ONLY_getInstance(), RarityPreference_PREFER_COMMON_getInstance(), RarityPreference_ALLOW_RARE_getInstance()];
}
function get_entries_5() {
  static_init_9();
  if ($ENTRIES_5 == null)
    $ENTRIES_5 = enumEntries(values_5());
  return $ENTRIES_5;
}
var $ENTRIES_5;
function RarityPreference(name, ordinal, title, shortLabel, description) {
  Enum.call(this, name, ordinal);
  this.tl_1 = title;
  this.ul_1 = shortLabel;
  this.vl_1 = description;
}
function BrickCatalog() {
  BrickCatalog_instance = this;
  this.ph_1 = listOf_0([new BrickColor(1, 'White', new Long(-723724, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, true, true, true), new BrickColor(11, 'Black', new Long(-14996940, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, true, true, true), new BrickColor(86, 'Light Bluish Gray', new Long(-6249047, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, true, false, false), new BrickColor(85, 'Dark Bluish Gray', new Long(-9671064, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, true, true, false, false), new BrickColor(5, 'Bright Red', new Long(-3597815, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, false, false, true), new BrickColor(3, 'Bright Yellow', new Long(-864969, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, false, false, true), new BrickColor(7, 'Bright Blue', new Long(-16755265, 0), AvailabilityTier_COMMON_getInstance(), 1.0, true, true, false, false, true), new BrickColor(6, 'Bright Green', new Long(-14452671, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, true, false, true, false), new BrickColor(4, 'Bright Orange', new Long(-95720, 0), AvailabilityTier_COMMON_getInstance(), 1.1, true, false, false, false, true), new BrickColor(2, 'Tan', new Long(-1782370, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, false, false, true, false), new BrickColor(88, 'Reddish Brown', new Long(-10999278, 0), AvailabilityTier_COMMON_getInstance(), 1.05, true, false, false, true, false), new BrickColor(34, 'Lime', new Long(-4462325, 0), AvailabilityTier_COMMON_getInstance(), 1.1, true, false, false, true, true), new BrickColor(156, 'Medium Azure', new Long(-13193537, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, false, true), new BrickColor(63, 'Dark Blue', new Long(-16108445, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, false, true), new BrickColor(59, 'Dark Red', new Long(-9302513, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(69, 'Dark Tan', new Long(-6976909, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(80, 'Dark Green', new Long(-15186382, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(110, 'Bright Light Orange', new Long(-476355, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, true), new BrickColor(150, 'Medium Nougat', new Long(-3379158, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(120, 'Dark Brown', new Long(-13295360, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, true, false), new BrickColor(42, 'Medium Blue', new Long(-10841125, 0), AvailabilityTier_COMMON_getInstance(), 1.15, true, false, false, false, true), new BrickColor(71, 'Magenta', new Long(-7194248, 0), AvailabilityTier_COMMON_getInstance(), 1.2, true, false, false, false, true), new BrickColor(104, 'Bright Pink', new Long(-1790520, 0), AvailabilityTier_COMMON_getInstance(), 1.2, true, false, false, false, true), new BrickColor(89, 'Dark Purple', new Long(-12634479, 0), AvailabilityTier_COMMON_getInstance(), 1.2, true, false, false, false, true), new BrickColor(39, 'Dark Turquoise', new Long(-16740453, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, true, true), new BrickColor(220, 'Coral', new Long(-38513, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.8, true, false, false, true, true), new BrickColor(153, 'Dark Azure', new Long(-16282679, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.6, true, false, false, false, true), new BrickColor(105, 'Bright Light Blue', new Long(-6306839, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.65, true, false, false, false, true), new BrickColor(103, 'Bright Light Yellow', new Long(-4038, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.65, true, false, false, false, true), new BrickColor(48, 'Sand Green', new Long(-6243156, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.85, true, false, false, true, false), new BrickColor(55, 'Sand Blue', new Long(-10455903, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.85, true, false, false, true, false), new BrickColor(155, 'Olive Green', new Long(-6579622, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.8, true, false, false, true, false), new BrickColor(154, 'Lavender', new Long(-1976851, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, false, true), new BrickColor(157, 'Medium Lavender', new Long(-5474118, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, false, true), new BrickColor(152, 'Light Aqua', new Long(-5389376, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.8, true, false, false, true, false), new BrickColor(28, 'Nougat', new Long(-3108504, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.85, true, false, false, true, false), new BrickColor(90, 'Light Nougat', new Long(-600141, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.9, true, false, false, true, false), new BrickColor(36, 'Bright Yellowish Green', new Long(-11821238, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.6, true, false, false, true, false), new BrickColor(115, 'Pearl Gold', new Long(-5603538, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.95, true, false, false, true, false), new BrickColor(95, 'Flat Silver', new Long(-7764088, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.7, false, false, true, false, false), new BrickColor(68, 'Dark Orange', new Long(-5679872, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, true, false), new BrickColor(47, 'Dark Pink', new Long(-3641184, 0), AvailabilityTier_UNCOMMON_getInstance(), 1.75, true, false, false, false, true), new BrickColor(54, 'Sand Purple', new Long(-8102268, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 9.5, false, false, false, false, false), new BrickColor(72, 'Maersk Blue', new Long(-13266237, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 11.2, false, false, false, false, false), new BrickColor(25, 'Salmon', new Long(-888738, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 8.4, false, false, false, false, false), new BrickColor(73, 'Medium Violet', new Long(-7106076, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 7.8, false, false, false, false, false), new BrickColor(21, 'Chrome Gold', new Long(-4479683, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 16.5, false, false, false, false, false), new BrickColor(99, 'Very Light Bluish Gray', new Long(-1645600, 0), AvailabilityTier_RARE_RETIRED_getInstance(), 6.2, false, false, true, false, false)]);
  var tmp = this;
  // Inline function 'kotlin.collections.associateBy' call
  var this_0 = this.ph_1;
  var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
  // Inline function 'kotlin.collections.associateByTo' call
  var destination = LinkedHashMap_init_$Create$_0(capacity);
  var _iterator__ex2g4s = this_0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp$ret$2 = element.xe_1;
    destination.t2(tmp$ret$2, element);
  }
  tmp.qh_1 = destination;
  this.rh_1 = getValue(this.qh_1, 11);
  this.sh_1 = getValue(this.qh_1, 85);
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
  tmp_0.th_1 = this_1.c3();
}
protoOf(BrickCatalog).bi = function (part, colorId) {
  if (part.equals(BrickPartType_TECHNIC_FRAME_16X16_getInstance()))
    return colorId === 11;
  if (part.equals(BrickPartType_TECHNIC_PIN_getInstance()))
    return colorId === 11;
  if (part.equals(BrickPartType_BASEPLATE_32X32_getInstance()))
    return setOf_0([11, 86, 1, 6, 7, 2]).e1(colorId);
  return !this.th_1.e1(to(part, colorId));
};
protoOf(BrickCatalog).uh = function (preset) {
  var tmp;
  switch (preset.o1_1) {
    case 0:
      // Inline function 'kotlin.collections.filter' call

      var tmp0 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s = tmp0.g();
      while (_iterator__ex2g4s.h()) {
        var element = _iterator__ex2g4s.i();
        if (!element.af_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
          destination.f(element);
        }
      }

      tmp = destination;
      break;
    case 1:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_0 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_0 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_0 = tmp0_0.g();
      while (_iterator__ex2g4s_0.h()) {
        var element_0 = _iterator__ex2g4s_0.i();
        if (element_0.cf_1) {
          destination_0.f(element_0);
        }
      }

      tmp = destination_0;
      break;
    case 2:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_1 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_1 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_1 = tmp0_1.g();
      while (_iterator__ex2g4s_1.h()) {
        var element_1 = _iterator__ex2g4s_1.i();
        if (element_1.af_1.equals(AvailabilityTier_COMMON_getInstance())) {
          destination_1.f(element_1);
        }
      }

      tmp = destination_1;
      break;
    case 3:
      tmp = this.ph_1;
      break;
    case 4:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_2 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_2 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_2 = tmp0_2.g();
      while (_iterator__ex2g4s_2.h()) {
        var element_2 = _iterator__ex2g4s_2.i();
        if (element_2.df_1) {
          destination_2.f(element_2);
        }
      }

      tmp = destination_2;
      break;
    case 5:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_3 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_3 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_3 = tmp0_3.g();
      while (_iterator__ex2g4s_3.h()) {
        var element_3 = _iterator__ex2g4s_3.i();
        if (element_3.ef_1 && !element_3.af_1.equals(AvailabilityTier_RARE_RETIRED_getInstance())) {
          destination_3.f(element_3);
        }
      }

      tmp = destination_3;
      break;
    case 6:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_4 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_4 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_4 = tmp0_4.g();
      while (_iterator__ex2g4s_4.h()) {
        var element_4 = _iterator__ex2g4s_4.i();
        if (element_4.ff_1) {
          destination_4.f(element_4);
        }
      }

      tmp = destination_4;
      break;
    case 7:
      // Inline function 'kotlin.collections.filter' call

      var tmp0_5 = this.ph_1;
      // Inline function 'kotlin.collections.filterTo' call

      var destination_5 = ArrayList_init_$Create$();
      var _iterator__ex2g4s_5 = tmp0_5.g();
      while (_iterator__ex2g4s_5.h()) {
        var element_5 = _iterator__ex2g4s_5.i();
        if (element_5.gf_1) {
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
protoOf(BrickCatalog).li = function (part, color) {
  if (part.ie_1)
    return AvailabilityTier_COMMON_getInstance();
  if (!this.bi(part, color.xe_1))
    return AvailabilityTier_RARE_RETIRED_getInstance();
  if (color.af_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()))
    return AvailabilityTier_RARE_RETIRED_getInstance();
  if (color.af_1.equals(AvailabilityTier_UNCOMMON_getInstance()) && imul_0(part.de_1, part.ee_1) >= 4) {
    return AvailabilityTier_RARE_RETIRED_getInstance();
  }
  return color.af_1;
};
protoOf(BrickCatalog).mi = function (part, color) {
  if (part.ie_1)
    return part.je_1;
  var sizeFactor = color.af_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()) && imul_0(part.de_1, part.ee_1) >= 2 ? 1.35 : 1.0;
  return coerceAtLeast_0(part.je_1 * color.bf_1 * sizeFactor, 0.04);
};
protoOf(BrickCatalog).ni = function (part, color) {
  if (part.ie_1)
    return part.ke_1;
  var sizeFactor = color.af_1.equals(AvailabilityTier_RARE_RETIRED_getInstance()) && imul_0(part.de_1, part.ee_1) >= 2 ? 1.45 : 1.0;
  return coerceAtLeast_0(part.ke_1 * color.bf_1 * sizeFactor, 0.02);
};
protoOf(BrickCatalog).cj = function (targetColor, part) {
  // Inline function 'kotlin.collections.filter' call
  var tmp0 = this.ph_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    if (!(element.xe_1 === targetColor.xe_1) && element.af_1.equals(AvailabilityTier_COMMON_getInstance()) && BrickCatalog_getInstance().bi(part, element.xe_1)) {
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
    var minValue = BrickCatalog_getInstance().ki(targetColor, it);
    do {
      var e = iterator.i();
      var v = BrickCatalog_getInstance().ki(targetColor, e);
      if (compareTo(minValue, v) > 0) {
        minElem = e;
        minValue = v;
      }
    }
     while (iterator.h());
    tmp$ret$3 = minElem;
  }
  var tmp0_elvis_lhs = tmp$ret$3;
  return tmp0_elvis_lhs == null ? this.rh_1 : tmp0_elvis_lhs;
};
protoOf(BrickCatalog).ki = function (c1, c2) {
  var dl = c1.kf_1 - c2.kf_1;
  var da = c1.lf_1 - c2.lf_1;
  var db = c1.mf_1 - c2.mf_1;
  // Inline function 'kotlin.math.sqrt' call
  var x = dl * dl + da * da + db * db;
  return Math.sqrt(x);
};
protoOf(BrickCatalog).ji = function (l1, a1, b1, color) {
  var dl = l1 - color.kf_1;
  var da = a1 - color.lf_1;
  var db = b1 - color.mf_1;
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
function Companion_12() {
  Companion_instance_12 = this;
  this.wl_1 = listOf_0([new SizePreset('16\xD716', 16, 16, 'Mini'), new SizePreset('24\xD724', 24, 24, 'Compact'), new SizePreset('32\xD732', 32, 32, 'Standard'), new SizePreset('48\xD748', 48, 48, 'Art Wall'), new SizePreset('32\xD748', 32, 48, 'Portrait'), new SizePreset('48\xD732', 48, 32, 'Wide'), new SizePreset('64\xD764', 64, 64, 'Gallery')]);
}
var Companion_instance_12;
function Companion_getInstance_12() {
  if (Companion_instance_12 == null)
    new Companion_12();
  return Companion_instance_12;
}
function SizePreset(label, widthStuds, heightStuds, tag) {
  Companion_getInstance_12();
  this.xl_1 = label;
  this.yl_1 = widthStuds;
  this.zl_1 = heightStuds;
  this.am_1 = tag;
}
protoOf(SizePreset).toString = function () {
  return 'SizePreset(label=' + this.xl_1 + ', widthStuds=' + this.yl_1 + ', heightStuds=' + this.zl_1 + ', tag=' + this.am_1 + ')';
};
protoOf(SizePreset).hashCode = function () {
  var result = getStringHashCode(this.xl_1);
  result = imul_0(result, 31) + this.yl_1 | 0;
  result = imul_0(result, 31) + this.zl_1 | 0;
  result = imul_0(result, 31) + getStringHashCode(this.am_1) | 0;
  return result;
};
protoOf(SizePreset).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof SizePreset))
    return false;
  if (!(this.xl_1 === other.xl_1))
    return false;
  if (!(this.yl_1 === other.yl_1))
    return false;
  if (!(this.zl_1 === other.zl_1))
    return false;
  if (!(this.am_1 === other.am_1))
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
  this.og_1 = widthStuds;
  this.pg_1 = heightStuds;
  this.qg_1 = lockAspectRatio;
  this.rg_1 = buildStyle;
  this.sg_1 = backingSystem;
  this.tg_1 = palettePreset;
  this.ug_1 = disabledColorIds;
  this.vg_1 = forcedColorSwaps;
  this.wg_1 = colorTolerance;
  this.xg_1 = ditheringEnabled;
  this.yg_1 = rarityPreference;
  this.zg_1 = enforceLegalConnections;
  this.ah_1 = brightness;
  this.bh_1 = contrast;
  this.ch_1 = saturation;
}
protoOf(MosaicConfig).bm = function (widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation) {
  return new MosaicConfig(widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation);
};
protoOf(MosaicConfig).uj = function (widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation, $super) {
  widthStuds = widthStuds === VOID ? this.og_1 : widthStuds;
  heightStuds = heightStuds === VOID ? this.pg_1 : heightStuds;
  lockAspectRatio = lockAspectRatio === VOID ? this.qg_1 : lockAspectRatio;
  buildStyle = buildStyle === VOID ? this.rg_1 : buildStyle;
  backingSystem = backingSystem === VOID ? this.sg_1 : backingSystem;
  palettePreset = palettePreset === VOID ? this.tg_1 : palettePreset;
  disabledColorIds = disabledColorIds === VOID ? this.ug_1 : disabledColorIds;
  forcedColorSwaps = forcedColorSwaps === VOID ? this.vg_1 : forcedColorSwaps;
  colorTolerance = colorTolerance === VOID ? this.wg_1 : colorTolerance;
  ditheringEnabled = ditheringEnabled === VOID ? this.xg_1 : ditheringEnabled;
  rarityPreference = rarityPreference === VOID ? this.yg_1 : rarityPreference;
  enforceLegalConnections = enforceLegalConnections === VOID ? this.zg_1 : enforceLegalConnections;
  brightness = brightness === VOID ? this.ah_1 : brightness;
  contrast = contrast === VOID ? this.bh_1 : contrast;
  saturation = saturation === VOID ? this.ch_1 : saturation;
  return $super === VOID ? this.bm(widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation) : $super.bm.call(this, widthStuds, heightStuds, lockAspectRatio, buildStyle, backingSystem, palettePreset, disabledColorIds, forcedColorSwaps, colorTolerance, ditheringEnabled, rarityPreference, enforceLegalConnections, brightness, contrast, saturation);
};
protoOf(MosaicConfig).toString = function () {
  return 'MosaicConfig(widthStuds=' + this.og_1 + ', heightStuds=' + this.pg_1 + ', lockAspectRatio=' + this.qg_1 + ', buildStyle=' + this.rg_1.toString() + ', backingSystem=' + this.sg_1.toString() + ', palettePreset=' + this.tg_1.toString() + ', disabledColorIds=' + toString_1(this.ug_1) + ', forcedColorSwaps=' + toString_1(this.vg_1) + ', colorTolerance=' + this.wg_1 + ', ditheringEnabled=' + this.xg_1 + ', rarityPreference=' + this.yg_1.toString() + ', enforceLegalConnections=' + this.zg_1 + ', brightness=' + this.ah_1 + ', contrast=' + this.bh_1 + ', saturation=' + this.ch_1 + ')';
};
protoOf(MosaicConfig).hashCode = function () {
  var result = this.og_1;
  result = imul_0(result, 31) + this.pg_1 | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.qg_1) | 0;
  result = imul_0(result, 31) + this.rg_1.hashCode() | 0;
  result = imul_0(result, 31) + this.sg_1.hashCode() | 0;
  result = imul_0(result, 31) + this.tg_1.hashCode() | 0;
  result = imul_0(result, 31) + hashCode_0(this.ug_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.vg_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.wg_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.xg_1) | 0;
  result = imul_0(result, 31) + this.yg_1.hashCode() | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.zg_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ah_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.bh_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ch_1) | 0;
  return result;
};
protoOf(MosaicConfig).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MosaicConfig))
    return false;
  if (!(this.og_1 === other.og_1))
    return false;
  if (!(this.pg_1 === other.pg_1))
    return false;
  if (!(this.qg_1 === other.qg_1))
    return false;
  if (!this.rg_1.equals(other.rg_1))
    return false;
  if (!this.sg_1.equals(other.sg_1))
    return false;
  if (!this.tg_1.equals(other.tg_1))
    return false;
  if (!equals(this.ug_1, other.ug_1))
    return false;
  if (!equals(this.vg_1, other.vg_1))
    return false;
  if (!equals(this.wg_1, other.wg_1))
    return false;
  if (!(this.xg_1 === other.xg_1))
    return false;
  if (!this.yg_1.equals(other.yg_1))
    return false;
  if (!(this.zg_1 === other.zg_1))
    return false;
  if (!equals(this.ah_1, other.ah_1))
    return false;
  if (!equals(this.bh_1, other.bh_1))
    return false;
  if (!equals(this.ch_1, other.ch_1))
    return false;
  return true;
};
function PlacedPiece(id, part, color, x, y, width, height, layer, moduleCol, moduleRow, rarityTier, isColorLegal, pabUnitPrice, blUnitPrice) {
  this.oi_1 = id;
  this.pi_1 = part;
  this.qi_1 = color;
  this.ri_1 = x;
  this.si_1 = y;
  this.ti_1 = width;
  this.ui_1 = height;
  this.vi_1 = layer;
  this.wi_1 = moduleCol;
  this.xi_1 = moduleRow;
  this.yi_1 = rarityTier;
  this.zi_1 = isColorLegal;
  this.aj_1 = pabUnitPrice;
  this.bj_1 = blUnitPrice;
}
protoOf(PlacedPiece).toString = function () {
  return 'PlacedPiece(id=' + this.oi_1 + ', part=' + this.pi_1.toString() + ', color=' + this.qi_1.toString() + ', x=' + this.ri_1 + ', y=' + this.si_1 + ', width=' + this.ti_1 + ', height=' + this.ui_1 + ', layer=' + this.vi_1 + ', moduleCol=' + this.wi_1 + ', moduleRow=' + this.xi_1 + ', rarityTier=' + this.yi_1.toString() + ', isColorLegal=' + this.zi_1 + ', pabUnitPrice=' + this.aj_1 + ', blUnitPrice=' + this.bj_1 + ')';
};
protoOf(PlacedPiece).hashCode = function () {
  var result = this.oi_1;
  result = imul_0(result, 31) + this.pi_1.hashCode() | 0;
  result = imul_0(result, 31) + this.qi_1.hashCode() | 0;
  result = imul_0(result, 31) + this.ri_1 | 0;
  result = imul_0(result, 31) + this.si_1 | 0;
  result = imul_0(result, 31) + this.ti_1 | 0;
  result = imul_0(result, 31) + this.ui_1 | 0;
  result = imul_0(result, 31) + this.vi_1 | 0;
  result = imul_0(result, 31) + this.wi_1 | 0;
  result = imul_0(result, 31) + this.xi_1 | 0;
  result = imul_0(result, 31) + this.yi_1.hashCode() | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.zi_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.aj_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.bj_1) | 0;
  return result;
};
protoOf(PlacedPiece).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof PlacedPiece))
    return false;
  if (!(this.oi_1 === other.oi_1))
    return false;
  if (!this.pi_1.equals(other.pi_1))
    return false;
  if (!this.qi_1.equals(other.qi_1))
    return false;
  if (!(this.ri_1 === other.ri_1))
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
  if (!this.yi_1.equals(other.yi_1))
    return false;
  if (!(this.zi_1 === other.zi_1))
    return false;
  if (!equals(this.aj_1, other.aj_1))
    return false;
  if (!equals(this.bj_1, other.bj_1))
    return false;
  return true;
};
function TechnicPinConnection(xStud, yStud, isHorizontalSeam, part) {
  part = part === VOID ? BrickPartType_TECHNIC_PIN_getInstance() : part;
  this.cm_1 = xStud;
  this.dm_1 = yStud;
  this.em_1 = isHorizontalSeam;
  this.fm_1 = part;
}
protoOf(TechnicPinConnection).toString = function () {
  return 'TechnicPinConnection(xStud=' + this.cm_1 + ', yStud=' + this.dm_1 + ', isHorizontalSeam=' + this.em_1 + ', part=' + this.fm_1.toString() + ')';
};
protoOf(TechnicPinConnection).hashCode = function () {
  var result = getNumberHashCode(this.cm_1);
  result = imul_0(result, 31) + getNumberHashCode(this.dm_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.em_1) | 0;
  result = imul_0(result, 31) + this.fm_1.hashCode() | 0;
  return result;
};
protoOf(TechnicPinConnection).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof TechnicPinConnection))
    return false;
  if (!equals(this.cm_1, other.cm_1))
    return false;
  if (!equals(this.dm_1, other.dm_1))
    return false;
  if (!(this.em_1 === other.em_1))
    return false;
  if (!this.fm_1.equals(other.fm_1))
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
  this.im_1 = label;
}
function ValidationIssue(id, severity, category, title, detail, affectedCount, canAutoFix, suggestedFixLabel, sourceColorId, suggestedColorId, estimatedSavingsUsd) {
  affectedCount = affectedCount === VOID ? 0 : affectedCount;
  canAutoFix = canAutoFix === VOID ? false : canAutoFix;
  suggestedFixLabel = suggestedFixLabel === VOID ? null : suggestedFixLabel;
  sourceColorId = sourceColorId === VOID ? null : sourceColorId;
  suggestedColorId = suggestedColorId === VOID ? null : suggestedColorId;
  estimatedSavingsUsd = estimatedSavingsUsd === VOID ? 0.0 : estimatedSavingsUsd;
  this.dj_1 = id;
  this.ej_1 = severity;
  this.fj_1 = category;
  this.gj_1 = title;
  this.hj_1 = detail;
  this.ij_1 = affectedCount;
  this.jj_1 = canAutoFix;
  this.kj_1 = suggestedFixLabel;
  this.lj_1 = sourceColorId;
  this.mj_1 = suggestedColorId;
  this.nj_1 = estimatedSavingsUsd;
}
protoOf(ValidationIssue).toString = function () {
  return 'ValidationIssue(id=' + this.dj_1 + ', severity=' + this.ej_1.toString() + ', category=' + this.fj_1.toString() + ', title=' + this.gj_1 + ', detail=' + this.hj_1 + ', affectedCount=' + this.ij_1 + ', canAutoFix=' + this.jj_1 + ', suggestedFixLabel=' + this.kj_1 + ', sourceColorId=' + this.lj_1 + ', suggestedColorId=' + this.mj_1 + ', estimatedSavingsUsd=' + this.nj_1 + ')';
};
protoOf(ValidationIssue).hashCode = function () {
  var result = getStringHashCode(this.dj_1);
  result = imul_0(result, 31) + this.ej_1.hashCode() | 0;
  result = imul_0(result, 31) + this.fj_1.hashCode() | 0;
  result = imul_0(result, 31) + getStringHashCode(this.gj_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.hj_1) | 0;
  result = imul_0(result, 31) + this.ij_1 | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.jj_1) | 0;
  result = imul_0(result, 31) + (this.kj_1 == null ? 0 : getStringHashCode(this.kj_1)) | 0;
  result = imul_0(result, 31) + (this.lj_1 == null ? 0 : this.lj_1) | 0;
  result = imul_0(result, 31) + (this.mj_1 == null ? 0 : this.mj_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.nj_1) | 0;
  return result;
};
protoOf(ValidationIssue).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ValidationIssue))
    return false;
  if (!(this.dj_1 === other.dj_1))
    return false;
  if (!this.ej_1.equals(other.ej_1))
    return false;
  if (!this.fj_1.equals(other.fj_1))
    return false;
  if (!(this.gj_1 === other.gj_1))
    return false;
  if (!(this.hj_1 === other.hj_1))
    return false;
  if (!(this.ij_1 === other.ij_1))
    return false;
  if (!(this.jj_1 === other.jj_1))
    return false;
  if (!(this.kj_1 == other.kj_1))
    return false;
  if (!(this.lj_1 == other.lj_1))
    return false;
  if (!(this.mj_1 == other.mj_1))
    return false;
  if (!equals(this.nj_1, other.nj_1))
    return false;
  return true;
};
function ValidationReport(isFullyLegal, scorePercent, checks, rarePieceCount, illegalPieceCount, weakSeamCount, technicPinCount, moduleCols, moduleRows) {
  this.qk_1 = isFullyLegal;
  this.rk_1 = scorePercent;
  this.sk_1 = checks;
  this.tk_1 = rarePieceCount;
  this.uk_1 = illegalPieceCount;
  this.vk_1 = weakSeamCount;
  this.wk_1 = technicPinCount;
  this.xk_1 = moduleCols;
  this.yk_1 = moduleRows;
}
protoOf(ValidationReport).toString = function () {
  return 'ValidationReport(isFullyLegal=' + this.qk_1 + ', scorePercent=' + this.rk_1 + ', checks=' + toString_1(this.sk_1) + ', rarePieceCount=' + this.tk_1 + ', illegalPieceCount=' + this.uk_1 + ', weakSeamCount=' + this.vk_1 + ', technicPinCount=' + this.wk_1 + ', moduleCols=' + this.xk_1 + ', moduleRows=' + this.yk_1 + ')';
};
protoOf(ValidationReport).hashCode = function () {
  var result = getBooleanHashCode(this.qk_1);
  result = imul_0(result, 31) + this.rk_1 | 0;
  result = imul_0(result, 31) + hashCode_0(this.sk_1) | 0;
  result = imul_0(result, 31) + this.tk_1 | 0;
  result = imul_0(result, 31) + this.uk_1 | 0;
  result = imul_0(result, 31) + this.vk_1 | 0;
  result = imul_0(result, 31) + this.wk_1 | 0;
  result = imul_0(result, 31) + this.xk_1 | 0;
  result = imul_0(result, 31) + this.yk_1 | 0;
  return result;
};
protoOf(ValidationReport).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ValidationReport))
    return false;
  if (!(this.qk_1 === other.qk_1))
    return false;
  if (!(this.rk_1 === other.rk_1))
    return false;
  if (!equals(this.sk_1, other.sk_1))
    return false;
  if (!(this.tk_1 === other.tk_1))
    return false;
  if (!(this.uk_1 === other.uk_1))
    return false;
  if (!(this.vk_1 === other.vk_1))
    return false;
  if (!(this.wk_1 === other.wk_1))
    return false;
  if (!(this.xk_1 === other.xk_1))
    return false;
  if (!(this.yk_1 === other.yk_1))
    return false;
  return true;
};
function PartBomLine(part, color, quantity, rarityTier, isColorLegal, pabUnitPrice, blUnitPrice, pabLineTotal, blLineTotal, colorCodeNumber, alternativeColor, potentialSavingsUsd) {
  alternativeColor = alternativeColor === VOID ? null : alternativeColor;
  potentialSavingsUsd = potentialSavingsUsd === VOID ? 0.0 : potentialSavingsUsd;
  this.le_1 = part;
  this.me_1 = color;
  this.ne_1 = quantity;
  this.oe_1 = rarityTier;
  this.pe_1 = isColorLegal;
  this.qe_1 = pabUnitPrice;
  this.re_1 = blUnitPrice;
  this.se_1 = pabLineTotal;
  this.te_1 = blLineTotal;
  this.ue_1 = colorCodeNumber;
  this.ve_1 = alternativeColor;
  this.we_1 = potentialSavingsUsd;
}
protoOf(PartBomLine).ek = function () {
  return this.le_1.ae_1 + '_' + this.me_1.xe_1;
};
protoOf(PartBomLine).toString = function () {
  return 'PartBomLine(part=' + this.le_1.toString() + ', color=' + this.me_1.toString() + ', quantity=' + this.ne_1 + ', rarityTier=' + this.oe_1.toString() + ', isColorLegal=' + this.pe_1 + ', pabUnitPrice=' + this.qe_1 + ', blUnitPrice=' + this.re_1 + ', pabLineTotal=' + this.se_1 + ', blLineTotal=' + this.te_1 + ', colorCodeNumber=' + this.ue_1 + ', alternativeColor=' + toString_0(this.ve_1) + ', potentialSavingsUsd=' + this.we_1 + ')';
};
protoOf(PartBomLine).hashCode = function () {
  var result = this.le_1.hashCode();
  result = imul_0(result, 31) + this.me_1.hashCode() | 0;
  result = imul_0(result, 31) + this.ne_1 | 0;
  result = imul_0(result, 31) + this.oe_1.hashCode() | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.pe_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.qe_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.re_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.se_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.te_1) | 0;
  result = imul_0(result, 31) + this.ue_1 | 0;
  result = imul_0(result, 31) + (this.ve_1 == null ? 0 : this.ve_1.hashCode()) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.we_1) | 0;
  return result;
};
protoOf(PartBomLine).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof PartBomLine))
    return false;
  if (!this.le_1.equals(other.le_1))
    return false;
  if (!this.me_1.equals(other.me_1))
    return false;
  if (!(this.ne_1 === other.ne_1))
    return false;
  if (!this.oe_1.equals(other.oe_1))
    return false;
  if (!(this.pe_1 === other.pe_1))
    return false;
  if (!equals(this.qe_1, other.qe_1))
    return false;
  if (!equals(this.re_1, other.re_1))
    return false;
  if (!equals(this.se_1, other.se_1))
    return false;
  if (!equals(this.te_1, other.te_1))
    return false;
  if (!(this.ue_1 === other.ue_1))
    return false;
  if (!equals(this.ve_1, other.ve_1))
    return false;
  if (!equals(this.we_1, other.we_1))
    return false;
  return true;
};
function StepFocusRegion(startX, startY, width, height) {
  this.jm_1 = startX;
  this.km_1 = startY;
  this.lm_1 = width;
  this.mm_1 = height;
}
protoOf(StepFocusRegion).toString = function () {
  return 'StepFocusRegion(startX=' + this.jm_1 + ', startY=' + this.km_1 + ', width=' + this.lm_1 + ', height=' + this.mm_1 + ')';
};
protoOf(StepFocusRegion).hashCode = function () {
  var result = this.jm_1;
  result = imul_0(result, 31) + this.km_1 | 0;
  result = imul_0(result, 31) + this.lm_1 | 0;
  result = imul_0(result, 31) + this.mm_1 | 0;
  return result;
};
protoOf(StepFocusRegion).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof StepFocusRegion))
    return false;
  if (!(this.jm_1 === other.jm_1))
    return false;
  if (!(this.km_1 === other.km_1))
    return false;
  if (!(this.lm_1 === other.lm_1))
    return false;
  if (!(this.mm_1 === other.mm_1))
    return false;
  return true;
};
function BuildStep(stepNumber, title, subtitle, panelTag, isStructuralStep, newPieces, newPins, stepParts, previousPieceIds, focusRegion) {
  this.nm_1 = stepNumber;
  this.om_1 = title;
  this.pm_1 = subtitle;
  this.qm_1 = panelTag;
  this.rm_1 = isStructuralStep;
  this.sm_1 = newPieces;
  this.tm_1 = newPins;
  this.um_1 = stepParts;
  this.vm_1 = previousPieceIds;
  this.wm_1 = focusRegion;
}
protoOf(BuildStep).toString = function () {
  return 'BuildStep(stepNumber=' + this.nm_1 + ', title=' + this.om_1 + ', subtitle=' + this.pm_1 + ', panelTag=' + this.qm_1 + ', isStructuralStep=' + this.rm_1 + ', newPieces=' + toString_1(this.sm_1) + ', newPins=' + toString_1(this.tm_1) + ', stepParts=' + toString_1(this.um_1) + ', previousPieceIds=' + toString_1(this.vm_1) + ', focusRegion=' + this.wm_1.toString() + ')';
};
protoOf(BuildStep).hashCode = function () {
  var result = this.nm_1;
  result = imul_0(result, 31) + getStringHashCode(this.om_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.pm_1) | 0;
  result = imul_0(result, 31) + getStringHashCode(this.qm_1) | 0;
  result = imul_0(result, 31) + getBooleanHashCode(this.rm_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.sm_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.tm_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.um_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.vm_1) | 0;
  result = imul_0(result, 31) + this.wm_1.hashCode() | 0;
  return result;
};
protoOf(BuildStep).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof BuildStep))
    return false;
  if (!(this.nm_1 === other.nm_1))
    return false;
  if (!(this.om_1 === other.om_1))
    return false;
  if (!(this.pm_1 === other.pm_1))
    return false;
  if (!(this.qm_1 === other.qm_1))
    return false;
  if (!(this.rm_1 === other.rm_1))
    return false;
  if (!equals(this.sm_1, other.sm_1))
    return false;
  if (!equals(this.tm_1, other.tm_1))
    return false;
  if (!equals(this.um_1, other.um_1))
    return false;
  if (!equals(this.vm_1, other.vm_1))
    return false;
  if (!this.wm_1.equals(other.wm_1))
    return false;
  return true;
};
function PricingSummary(pabTotalUsd, blTotalUsd, surfaceElementsPabUsd, structuralBackingPabUsd, rarePremiumPabUsd, multiPlateSavingsUsd, costPerStudPabUsd, totalPieces, uniqueLots, commonPercent, uncommonPercent, rarePercent) {
  this.dh_1 = pabTotalUsd;
  this.eh_1 = blTotalUsd;
  this.fh_1 = surfaceElementsPabUsd;
  this.gh_1 = structuralBackingPabUsd;
  this.hh_1 = rarePremiumPabUsd;
  this.ih_1 = multiPlateSavingsUsd;
  this.jh_1 = costPerStudPabUsd;
  this.kh_1 = totalPieces;
  this.lh_1 = uniqueLots;
  this.mh_1 = commonPercent;
  this.nh_1 = uncommonPercent;
  this.oh_1 = rarePercent;
}
protoOf(PricingSummary).toString = function () {
  return 'PricingSummary(pabTotalUsd=' + this.dh_1 + ', blTotalUsd=' + this.eh_1 + ', surfaceElementsPabUsd=' + this.fh_1 + ', structuralBackingPabUsd=' + this.gh_1 + ', rarePremiumPabUsd=' + this.hh_1 + ', multiPlateSavingsUsd=' + this.ih_1 + ', costPerStudPabUsd=' + this.jh_1 + ', totalPieces=' + this.kh_1 + ', uniqueLots=' + this.lh_1 + ', commonPercent=' + this.mh_1 + ', uncommonPercent=' + this.nh_1 + ', rarePercent=' + this.oh_1 + ')';
};
protoOf(PricingSummary).hashCode = function () {
  var result = getNumberHashCode(this.dh_1);
  result = imul_0(result, 31) + getNumberHashCode(this.eh_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.fh_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.gh_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.hh_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.ih_1) | 0;
  result = imul_0(result, 31) + getNumberHashCode(this.jh_1) | 0;
  result = imul_0(result, 31) + this.kh_1 | 0;
  result = imul_0(result, 31) + this.lh_1 | 0;
  result = imul_0(result, 31) + this.mh_1 | 0;
  result = imul_0(result, 31) + this.nh_1 | 0;
  result = imul_0(result, 31) + this.oh_1 | 0;
  return result;
};
protoOf(PricingSummary).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof PricingSummary))
    return false;
  if (!equals(this.dh_1, other.dh_1))
    return false;
  if (!equals(this.eh_1, other.eh_1))
    return false;
  if (!equals(this.fh_1, other.fh_1))
    return false;
  if (!equals(this.gh_1, other.gh_1))
    return false;
  if (!equals(this.hh_1, other.hh_1))
    return false;
  if (!equals(this.ih_1, other.ih_1))
    return false;
  if (!equals(this.jh_1, other.jh_1))
    return false;
  if (!(this.kh_1 === other.kh_1))
    return false;
  if (!(this.lh_1 === other.lh_1))
    return false;
  if (!(this.mh_1 === other.mh_1))
    return false;
  if (!(this.nh_1 === other.nh_1))
    return false;
  if (!(this.oh_1 === other.oh_1))
    return false;
  return true;
};
function MosaicResult(config, widthStuds, heightStuds, studColorIds, pieces, backingPieces, technicPins, validationReport, buildSteps, bomLines, pricing, colorNumberMap) {
  this.bg_1 = config;
  this.cg_1 = widthStuds;
  this.dg_1 = heightStuds;
  this.eg_1 = studColorIds;
  this.fg_1 = pieces;
  this.gg_1 = backingPieces;
  this.hg_1 = technicPins;
  this.ig_1 = validationReport;
  this.jg_1 = buildSteps;
  this.kg_1 = bomLines;
  this.lg_1 = pricing;
  this.mg_1 = colorNumberMap;
}
protoOf(MosaicResult).toString = function () {
  return 'MosaicResult(config=' + this.bg_1.toString() + ', widthStuds=' + this.cg_1 + ', heightStuds=' + this.dg_1 + ', studColorIds=' + toString_1(this.eg_1) + ', pieces=' + toString_1(this.fg_1) + ', backingPieces=' + toString_1(this.gg_1) + ', technicPins=' + toString_1(this.hg_1) + ', validationReport=' + this.ig_1.toString() + ', buildSteps=' + toString_1(this.jg_1) + ', bomLines=' + toString_1(this.kg_1) + ', pricing=' + this.lg_1.toString() + ', colorNumberMap=' + toString_1(this.mg_1) + ')';
};
protoOf(MosaicResult).hashCode = function () {
  var result = this.bg_1.hashCode();
  result = imul_0(result, 31) + this.cg_1 | 0;
  result = imul_0(result, 31) + this.dg_1 | 0;
  result = imul_0(result, 31) + hashCode_0(this.eg_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.fg_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.gg_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.hg_1) | 0;
  result = imul_0(result, 31) + this.ig_1.hashCode() | 0;
  result = imul_0(result, 31) + hashCode_0(this.jg_1) | 0;
  result = imul_0(result, 31) + hashCode_0(this.kg_1) | 0;
  result = imul_0(result, 31) + this.lg_1.hashCode() | 0;
  result = imul_0(result, 31) + hashCode_0(this.mg_1) | 0;
  return result;
};
protoOf(MosaicResult).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MosaicResult))
    return false;
  if (!this.bg_1.equals(other.bg_1))
    return false;
  if (!(this.cg_1 === other.cg_1))
    return false;
  if (!(this.dg_1 === other.dg_1))
    return false;
  if (!equals(this.eg_1, other.eg_1))
    return false;
  if (!equals(this.fg_1, other.fg_1))
    return false;
  if (!equals(this.gg_1, other.gg_1))
    return false;
  if (!equals(this.hg_1, other.hg_1))
    return false;
  if (!this.ig_1.equals(other.ig_1))
    return false;
  if (!equals(this.jg_1, other.jg_1))
    return false;
  if (!equals(this.kg_1, other.kg_1))
    return false;
  if (!this.lg_1.equals(other.lg_1))
    return false;
  if (!equals(this.mg_1, other.mg_1))
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
function need($this, extra) {
  if (($this.ym_1 + extra | 0) <= $this.xm_1.length)
    return Unit_instance;
  var next = imul_0($this.xm_1.length, 2);
  while (next < ($this.ym_1 + extra | 0))
    next = imul_0(next, 2);
  $this.xm_1 = copyOf_1($this.xm_1, next);
}
function ByteSink(initial) {
  initial = initial === VOID ? 4096 : initial;
  this.xm_1 = new Int8Array(coerceAtLeast(initial, 16));
  this.ym_1 = 0;
}
protoOf(ByteSink).zm = function (v) {
  need(this, 1);
  var tmp = this.xm_1;
  var _unary__edvuaz = this.ym_1;
  this.ym_1 = _unary__edvuaz + 1 | 0;
  tmp[_unary__edvuaz] = toByte(v);
};
protoOf(ByteSink).an = function (v) {
  this.zm(v);
  this.zm(v >>> 8 | 0);
};
protoOf(ByteSink).bn = function (v) {
  this.an(v);
  this.an(v >>> 16 | 0);
};
protoOf(ByteSink).cn = function (v) {
  this.zm(v >>> 24 | 0);
  this.zm(v >>> 16 | 0);
  this.zm(v >>> 8 | 0);
  this.zm(v);
};
protoOf(ByteSink).dn = function (b, from, to) {
  need(this, to - from | 0);
  var tmp2 = this.xm_1;
  // Inline function 'kotlin.collections.copyInto' call
  var destinationOffset = this.ym_1;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = b;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, tmp2, destinationOffset, from, to);
  this.ym_1 = this.ym_1 + (to - from | 0) | 0;
};
protoOf(ByteSink).en = function (b, from, to, $super) {
  from = from === VOID ? 0 : from;
  to = to === VOID ? b.length : to;
  var tmp;
  if ($super === VOID) {
    this.dn(b, from, to);
    tmp = Unit_instance;
  } else {
    tmp = $super.dn.call(this, b, from, to);
  }
  return tmp;
};
protoOf(ByteSink).fn = function (s) {
  need(this, s.length);
  var inductionVariable = 0;
  var last = s.length;
  while (inductionVariable < last) {
    var c = charCodeAt(s, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var tmp = this.xm_1;
    var _unary__edvuaz = this.ym_1;
    this.ym_1 = _unary__edvuaz + 1 | 0;
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    tmp[_unary__edvuaz] = toByte(tmp$ret$0);
  }
};
protoOf(ByteSink).gn = function () {
  return copyOf_1(this.xm_1, this.ym_1);
};
function Checksums() {
  Checksums_instance = this;
  var tmp = this;
  var tmp_0 = 0;
  var tmp_1 = new Int32Array(256);
  while (tmp_0 < 256) {
    var tmp_2 = tmp_0;
    var c = tmp_2;
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < 8)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        c = !((c & 1) === 0) ? (c >>> 1 | 0) ^ -306674912 : c >>> 1 | 0;
      }
       while (inductionVariable < 8);
    tmp_1[tmp_2] = c;
    tmp_0 = tmp_0 + 1 | 0;
  }
  tmp.hn_1 = tmp_1;
}
protoOf(Checksums).in = function (data, from, to) {
  var c = -1;
  var inductionVariable = from;
  if (inductionVariable < to)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      c = this.hn_1[(c ^ data[i]) & 255] ^ (c >>> 8 | 0);
    }
     while (inductionVariable < to);
  return ~c;
};
protoOf(Checksums).jn = function (data, from, to, $super) {
  from = from === VOID ? 0 : from;
  to = to === VOID ? data.length : to;
  return $super === VOID ? this.in(data, from, to) : $super.in.call(this, data, from, to);
};
protoOf(Checksums).kn = function (data) {
  var a = 1;
  var b = 0;
  var i = 0;
  while (i < data.length) {
    var tmp0 = i + 3800 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b_0 = data.length;
    var end = Math.min(tmp0, b_0);
    while (i < end) {
      var tmp = a;
      var _unary__edvuaz = i;
      i = _unary__edvuaz + 1 | 0;
      a = tmp + (data[_unary__edvuaz] & 255) | 0;
      b = b + a | 0;
    }
    a = a % 65521 | 0;
    b = b % 65521 | 0;
  }
  return b << 16 | a;
};
var Checksums_instance;
function Checksums_getInstance() {
  if (Checksums_instance == null)
    new Checksums();
  return Checksums_instance;
}
function Bits(out) {
  this.ln_1 = out;
  this.mn_1 = 0;
  this.nn_1 = 0;
}
protoOf(Bits).on = function (value, count) {
  this.mn_1 = this.mn_1 | value << this.nn_1;
  this.nn_1 = this.nn_1 + count | 0;
  while (this.nn_1 >= 8) {
    this.ln_1.zm(this.mn_1);
    this.mn_1 = this.mn_1 >>> 8 | 0;
    this.nn_1 = this.nn_1 - 8 | 0;
  }
};
protoOf(Bits).pn = function (code, count) {
  var r = 0;
  var inductionVariable = 0;
  if (inductionVariable < count)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!((code & 1 << i) === 0))
        r = r | 1 << ((count - 1 | 0) - i | 0);
    }
     while (inductionVariable < count);
  this.on(r, count);
};
protoOf(Bits).qn = function (s) {
  var tmp;
  if (s < 144) {
    this.pn(48 + s | 0, 8);
    tmp = Unit_instance;
  } else if (s < 256) {
    this.pn((400 + s | 0) - 144 | 0, 9);
    tmp = Unit_instance;
  } else if (s < 280) {
    this.pn(s - 256 | 0, 7);
    tmp = Unit_instance;
  } else {
    this.pn((192 + s | 0) - 280 | 0, 8);
    tmp = Unit_instance;
  }
  return tmp;
};
protoOf(Bits).rn = function () {
  if (this.nn_1 > 0) {
    this.ln_1.zm(this.mn_1);
    this.mn_1 = 0;
    this.nn_1 = 0;
  }
};
function distCode($this, d) {
  var lo = 0;
  var hi = 29;
  while (lo < hi) {
    var mid = ((lo + hi | 0) + 1 | 0) >>> 1 | 0;
    if ($this.un_1[mid] <= d)
      lo = mid;
    else
      hi = mid - 1 | 0;
  }
  return lo;
}
function raw$hash($data, i) {
  return (($data[i] & 255) << 10 ^ ($data[i + 1 | 0] & 255) << 5 ^ $data[i + 2 | 0] & 255) & 32767;
}
function raw$insert($data, prev, head, i) {
  if ((i + 2 | 0) >= $data.length)
    return Unit_instance;
  var h = raw$hash($data, i);
  prev[i & 32767] = head[h];
  head[h] = i;
}
function Deflate() {
  Deflate_instance = this;
  var tmp = this;
  // Inline function 'kotlin.intArrayOf' call
  tmp.sn_1 = new Int32Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258]);
  var tmp_0 = this;
  // Inline function 'kotlin.intArrayOf' call
  tmp_0.tn_1 = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
  var tmp_1 = this;
  // Inline function 'kotlin.intArrayOf' call
  tmp_1.un_1 = new Int32Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577]);
  var tmp_2 = this;
  // Inline function 'kotlin.intArrayOf' call
  tmp_2.vn_1 = new Int32Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
  var tmp_3 = this;
  // Inline function 'kotlin.also' call
  var this_0 = new Int32Array(259);
  var inductionVariable = Deflate_getInstance().sn_1.length - 1 | 0;
  if (0 <= inductionVariable)
    do {
      var c = inductionVariable;
      inductionVariable = inductionVariable + -1 | 0;
      var tmp_4;
      if (c === 28) {
        tmp_4 = 258;
      } else {
        // Inline function 'kotlin.comparisons.minOf' call
        var b = (Deflate_getInstance().sn_1[c] + (1 << Deflate_getInstance().tn_1[c]) | 0) - 1 | 0;
        tmp_4 = Math.min(258, b);
      }
      var top = tmp_4;
      var inductionVariable_0 = Deflate_getInstance().sn_1[c];
      if (inductionVariable_0 <= top)
        do {
          var l = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_0[l] = c;
        }
         while (!(l === top));
    }
     while (0 <= inductionVariable);
  this_0[258] = 28;
  tmp_3.wn_1 = this_0;
}
protoOf(Deflate).xn = function (data) {
  var out = new ByteSink((data.length / 3 | 0) + 64 | 0);
  var bits = new Bits(out);
  bits.on(1, 1);
  bits.on(1, 2);
  var tmp = 0;
  var tmp_0 = new Int32Array(32768);
  while (tmp < 32768) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var head = tmp_0;
  var prev = new Int32Array(32768);
  var i = 0;
  while (i < data.length) {
    var bestLen = 0;
    var bestDist = 0;
    if ((i + 2 | 0) < data.length) {
      var cand = head[raw$hash(data, i)];
      var chain = 24;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = data.length - i | 0;
      var limit = Math.min(258, b);
      $l$loop_1: while (true) {
        var tmp_1;
        if (cand >= 0 && (i - cand | 0) <= 32768) {
          var _unary__edvuaz = chain;
          chain = _unary__edvuaz - 1 | 0;
          tmp_1 = _unary__edvuaz > 0;
        } else {
          tmp_1 = false;
        }
        if (!tmp_1) {
          break $l$loop_1;
        }
        if (bestLen === 0 || data[cand + bestLen | 0] === data[i + bestLen | 0]) {
          var l = 0;
          while (l < limit && data[cand + l | 0] === data[i + l | 0]) {
            l = l + 1 | 0;
          }
          if (l > bestLen) {
            bestLen = l;
            bestDist = i - cand | 0;
            if (l === limit)
              break $l$loop_1;
          }
        }
        var next = prev[cand & 32767];
        if (next >= cand)
          break $l$loop_1;
        cand = next;
      }
    }
    if (bestLen >= 3) {
      var lc = this.wn_1[bestLen];
      bits.qn(257 + lc | 0);
      if (this.tn_1[lc] > 0) {
        bits.on(bestLen - this.sn_1[lc] | 0, this.tn_1[lc]);
      }
      var dc = distCode(this, bestDist);
      bits.pn(dc, 5);
      if (this.vn_1[dc] > 0) {
        bits.on(bestDist - this.un_1[dc] | 0, this.vn_1[dc]);
      }
      var step = bestLen > 64 ? 8 : 1;
      var k = 0;
      while (k < bestLen) {
        raw$insert(data, prev, head, i + k | 0);
        k = k + step | 0;
      }
      i = i + bestLen | 0;
    } else {
      bits.qn(data[i] & 255);
      raw$insert(data, prev, head, i);
      i = i + 1 | 0;
    }
  }
  bits.qn(256);
  bits.rn();
  return out.gn();
};
protoOf(Deflate).yn = function (data) {
  var out = new ByteSink((data.length / 3 | 0) + 64 | 0);
  out.zm(120);
  out.zm(1);
  out.en(this.xn(data));
  out.cn(Checksums_getInstance().kn(data));
  return out.gn();
};
var Deflate_instance;
function Deflate_getInstance() {
  if (Deflate_instance == null)
    new Deflate();
  return Deflate_instance;
}
function ZipArchive() {
}
protoOf(ZipArchive).zn = function (name) {
  var tmp;
  var tmp_0;
  var tmp_1;
  var tmp_2;
  // Inline function 'kotlin.text.isNotEmpty' call
  if (charSequenceLength(name) > 0) {
    tmp_2 = name.length <= 64;
  } else {
    tmp_2 = false;
  }
  if (tmp_2) {
    tmp_1 = !(name === '.');
  } else {
    tmp_1 = false;
  }
  if (tmp_1) {
    tmp_0 = !(name === '..');
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.text.all' call
      var inductionVariable = 0;
      while (inductionVariable < charSequenceLength(name)) {
        var element = charSequenceGet(name, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        var tmp_3;
        var tmp_4;
        var tmp_5;
        var tmp_6;
        if (isLetterOrDigit(element)) {
          // Inline function 'kotlin.code' call
          tmp_6 = Char__toInt_impl_vasixd(element) < 128;
        } else {
          tmp_6 = false;
        }
        if (tmp_6) {
          tmp_5 = true;
        } else {
          tmp_5 = element === _Char___init__impl__6a9atx(46);
        }
        if (tmp_5) {
          tmp_4 = true;
        } else {
          tmp_4 = element === _Char___init__impl__6a9atx(95);
        }
        if (tmp_4) {
          tmp_3 = true;
        } else {
          tmp_3 = element === _Char___init__impl__6a9atx(45);
        }
        if (!tmp_3) {
          tmp$ret$1 = false;
          break $l$block;
        }
      }
      tmp$ret$1 = true;
    }
    tmp = tmp$ret$1;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(ZipArchive).ao = function (entries) {
  // Inline function 'kotlin.collections.map' call
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(entries, 10));
  var _iterator__ex2g4s = entries.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var tmp$ret$2 = item.ma_1;
    destination.f(tmp$ret$2);
  }
  // Inline function 'kotlin.require' call
  if (!(toSet_0(destination).l() === entries.l())) {
    var message = 'Duplicate ZIP entry';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var out = new ByteSink(65536);
  var central = new ByteSink(1024);
  var date = 23585;
  var _iterator__ex2g4s_0 = entries.g();
  while (_iterator__ex2g4s_0.h()) {
    var _destruct__k2r9zo = _iterator__ex2g4s_0.i();
    var name = _destruct__k2r9zo.da();
    var data = _destruct__k2r9zo.ea();
    // Inline function 'kotlin.require' call
    if (!this.zn(name)) {
      var message_0 = 'Unsafe ZIP entry name';
      throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
    }
    var packed = Deflate_getInstance().xn(data);
    var crc = Checksums_getInstance().jn(data);
    var offset = out.ym_1;
    out.bn(67324752);
    out.an(20);
    out.an(0);
    out.an(8);
    out.an(0);
    out.an(date);
    out.bn(crc);
    out.bn(packed.length);
    out.bn(data.length);
    out.an(name.length);
    out.an(0);
    out.fn(name);
    out.en(packed);
    central.bn(33639248);
    central.an(45);
    central.an(20);
    central.an(0);
    central.an(8);
    central.an(0);
    central.an(date);
    central.bn(crc);
    central.bn(packed.length);
    central.bn(data.length);
    central.an(name.length);
    central.an(0);
    central.an(0);
    central.an(0);
    central.an(0);
    central.bn(0);
    central.bn(offset);
    central.fn(name);
  }
  var start = out.ym_1;
  var dir = central.gn();
  out.en(dir);
  out.bn(101010256);
  out.an(0);
  out.an(0);
  out.an(entries.l());
  out.an(entries.l());
  out.bn(dir.length);
  out.bn(start);
  out.an(0);
  return out.gn();
};
var ZipArchive_instance;
function ZipArchive_getInstance() {
  return ZipArchive_instance;
}
function indexed$chunk(out, type, body) {
  var typed = new ByteSink(body.length + 4 | 0);
  typed.fn(type);
  typed.en(body);
  var all = typed.gn();
  out.cn(body.length);
  out.en(all);
  out.cn(Checksums_getInstance().jn(all));
}
function PngEncoder() {
}
protoOf(PngEncoder).bo = function (width, height, palette, pixels) {
  var tmp;
  if (width > 0 && height > 0 && pixels.length === imul_0(width, height)) {
    var containsArg = palette.length;
    tmp = 1 <= containsArg ? containsArg <= 256 : false;
  } else {
    tmp = false;
  }
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!tmp) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var raw = new Int8Array(imul_0(width + 1 | 0, height));
  var inductionVariable = 0;
  if (inductionVariable < height)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp4 = imul_0(y, width + 1 | 0) + 1 | 0;
      var tmp6 = imul_0(y, width);
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = imul_0(y + 1 | 0, width);
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp_0 = pixels;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp_0, raw, tmp4, tmp6, endIndex);
    }
     while (inductionVariable < height);
  var out = new ByteSink((raw.length / 8 | 0) + 1024 | 0);
  // Inline function 'kotlin.intArrayOf' call
  var indexedObject = new Int32Array([137, 80, 78, 71, 13, 10, 26, 10]);
  var inductionVariable_0 = 0;
  var last = indexedObject.length;
  while (inductionVariable_0 < last) {
    var b = indexedObject[inductionVariable_0];
    inductionVariable_0 = inductionVariable_0 + 1 | 0;
    out.zm(b);
  }
  var header = new ByteSink(13);
  header.cn(width);
  header.cn(height);
  header.zm(8);
  header.zm(3);
  header.zm(0);
  header.zm(0);
  header.zm(0);
  indexed$chunk(out, 'IHDR', header.gn());
  var plte = new ByteSink(imul_0(palette.length, 3));
  var inductionVariable_1 = 0;
  var last_0 = palette.length;
  while (inductionVariable_1 < last_0) {
    var c = palette[inductionVariable_1];
    inductionVariable_1 = inductionVariable_1 + 1 | 0;
    plte.zm(c >>> 16 | 0);
    plte.zm(c >>> 8 | 0);
    plte.zm(c);
  }
  indexed$chunk(out, 'PLTE', plte.gn());
  indexed$chunk(out, 'IDAT', Deflate_getInstance().yn(raw));
  indexed$chunk(out, 'IEND', new Int8Array(0));
  return out.gn();
};
var PngEncoder_instance;
function PngEncoder_getInstance() {
  return PngEncoder_instance;
}
function n($this, v) {
  var scaled = roundToInt(v * 100);
  var sign = scaled < 0 ? '-' : '';
  var abs = scaled < 0 ? -scaled | 0 : scaled;
  var frac = abs % 100 | 0;
  return frac === 0 ? sign + (abs / 100 | 0) : (frac % 10 | 0) === 0 ? sign + (abs / 100 | 0) + '.' + (frac / 10 | 0) : sign + (abs / 100 | 0) + '.' + padStart(frac.toString(), 2, _Char___init__impl__6a9atx(48));
}
function color($this, rgb, op) {
  $this.do_1.r5(color$ch($this, rgb, 16)).s5(_Char___init__impl__6a9atx(32)).r5(color$ch($this, rgb, 8)).s5(_Char___init__impl__6a9atx(32)).r5(color$ch($this, rgb, 0)).s5(_Char___init__impl__6a9atx(32)).r5(op).s5(_Char___init__impl__6a9atx(10));
}
function color$ch(this$0, $rgb, s) {
  return n(this$0, ($rgb >> s & 255) / 255.0);
}
function disc$c(this$0, a, b, cc, d, e, f) {
  this$0.do_1.r5(n(this$0, a)).s5(_Char___init__impl__6a9atx(32)).r5(n(this$0, b)).s5(_Char___init__impl__6a9atx(32)).r5(n(this$0, cc)).s5(_Char___init__impl__6a9atx(32)).r5(n(this$0, d)).s5(_Char___init__impl__6a9atx(32)).r5(n(this$0, e)).s5(_Char___init__impl__6a9atx(32)).r5(n(this$0, f)).r5(' c ');
}
function PdfPageWriter(pageHeight) {
  this.co_1 = pageHeight;
  this.do_1 = StringBuilder_init_$Create$(16384);
}
protoOf(PdfPageWriter).eo = function (x, y, w, h, rgb) {
  color(this, rgb, 'rg');
  this.do_1.r5(n(this, x)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, this.co_1 - y - h)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, w)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, h)).r5(' re f\n');
};
protoOf(PdfPageWriter).fo = function (x, y, w, h, rgb, width) {
  color(this, rgb, 'RG');
  this.do_1.r5(n(this, width)).r5(' w ').r5(n(this, x)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, this.co_1 - y - h)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, w)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, h)).r5(' re S\n');
};
protoOf(PdfPageWriter).go = function (x, y, w, h, rgb, width, $super) {
  width = width === VOID ? 0.5 : width;
  var tmp;
  if ($super === VOID) {
    this.fo(x, y, w, h, rgb, width);
    tmp = Unit_instance;
  } else {
    tmp = $super.fo.call(this, x, y, w, h, rgb, width);
  }
  return tmp;
};
protoOf(PdfPageWriter).ho = function (x0, y0, x1, y1, rgb, width) {
  color(this, rgb, 'RG');
  this.do_1.r5(n(this, width)).r5(' w ').r5(n(this, x0)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, this.co_1 - y0)).r5(' m ').r5(n(this, x1)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, this.co_1 - y1)).r5(' l S\n');
};
protoOf(PdfPageWriter).io = function (x0, y0, x1, y1, rgb, width, $super) {
  width = width === VOID ? 0.5 : width;
  var tmp;
  if ($super === VOID) {
    this.ho(x0, y0, x1, y1, rgb, width);
    tmp = Unit_instance;
  } else {
    tmp = $super.ho.call(this, x0, y0, x1, y1, rgb, width);
  }
  return tmp;
};
protoOf(PdfPageWriter).jo = function (cx, cy, r, rgb) {
  var k = r * 0.5523;
  var y = this.co_1 - cy;
  color(this, rgb, 'rg');
  this.do_1.r5(n(this, cx + r)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, y)).r5(' m ');
  disc$c(this, cx + r, y + k, cx + k, y + r, cx, y + r);
  disc$c(this, cx - k, y + r, cx - r, y + k, cx - r, y);
  disc$c(this, cx - r, y - k, cx - k, y - r, cx, y - r);
  disc$c(this, cx + k, y - r, cx + r, y - k, cx + r, y);
  this.do_1.r5('h f\n');
};
protoOf(PdfPageWriter).ko = function (x, y, value, size, rgb, bold, center, maxWidth) {
  var t = value;
  if (maxWidth > 0 && PdfFont_getInstance().mo(t, size, bold) > maxWidth) {
    $l$loop: while (true) {
      var tmp;
      // Inline function 'kotlin.text.isNotEmpty' call
      var this_0 = t;
      if (charSequenceLength(this_0) > 0) {
        tmp = PdfFont_getInstance().mo(t + '...', size, bold) > maxWidth;
      } else {
        tmp = false;
      }
      if (!tmp) {
        break $l$loop;
      }
      t = dropLast(t, 1);
    }
    // Inline function 'kotlin.text.trimEnd' call
    var this_1 = t;
    t = toString_1(trimEnd(isCharSequence(this_1) ? this_1 : THROW_CCE())) + '...';
  }
  var left = center ? x - PdfFont_getInstance().mo(t, size, bold) / 2 : x;
  color(this, rgb, 'rg');
  this.do_1.r5('BT /').r5(bold ? 'F2' : 'F1').s5(_Char___init__impl__6a9atx(32)).r5(n(this, size)).r5(' Tf ').r5(n(this, left)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, this.co_1 - y)).r5(' Td <').r5(PdfFont_getInstance().no(t)).r5('> Tj ET\n');
};
protoOf(PdfPageWriter).oo = function (x, y, value, size, rgb, bold, center, maxWidth, $super) {
  rgb = rgb === VOID ? 1119000 : rgb;
  bold = bold === VOID ? false : bold;
  center = center === VOID ? false : center;
  maxWidth = maxWidth === VOID ? 0.0 : maxWidth;
  var tmp;
  if ($super === VOID) {
    this.ko(x, y, value, size, rgb, bold, center, maxWidth);
    tmp = Unit_instance;
  } else {
    tmp = $super.ko.call(this, x, y, value, size, rgb, bold, center, maxWidth);
  }
  return tmp;
};
protoOf(PdfPageWriter).po = function (name, x, y, w, h) {
  this.do_1.r5('q ').r5(n(this, w)).r5(' 0 0 ').r5(n(this, h)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, x)).s5(_Char___init__impl__6a9atx(32)).r5(n(this, this.co_1 - y - h)).r5(' cm /').r5(name).r5(' Do Q\n');
};
function PdfFont() {
  PdfFont_instance = this;
  var tmp = this;
  // Inline function 'kotlin.intArrayOf' call
  tmp.lo_1 = new Int32Array([278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584]);
}
protoOf(PdfFont).mo = function (s, size, bold) {
  var units = 0;
  var inductionVariable = 0;
  var last = s.length;
  while (inductionVariable < last) {
    var c = charCodeAt(s, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var tmp = units;
    var tmp0 = this.lo_1;
    // Inline function 'kotlin.code' call
    // Inline function 'kotlin.collections.getOrElse' call
    var index = Char__toInt_impl_vasixd(c) - 32 | 0;
    var tmp_0;
    if (0 <= index ? index <= (tmp0.length - 1 | 0) : false) {
      tmp_0 = tmp0[index];
    } else {
      tmp_0 = 600;
    }
    units = tmp + tmp_0 | 0;
  }
  return units / 1000.0 * size * (bold ? 1.07 : 1.0);
};
protoOf(PdfFont).no = function (s) {
  // Inline function 'kotlin.text.buildString' call
  var capacity = imul_0(s.length, 2);
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$(capacity);
  var inductionVariable = 0;
  var last = s.length;
  while (inductionVariable < last) {
    var c = charCodeAt(s, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var tmp;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var containsArg = Char__toInt_impl_vasixd(c);
    if (32 <= containsArg ? containsArg <= 126 : false) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var containsArg_0 = Char__toInt_impl_vasixd(c);
      tmp_0 = 160 <= containsArg_0 ? containsArg_0 <= 255 : false;
    }
    if (tmp_0) {
      // Inline function 'kotlin.code' call
      tmp = Char__toInt_impl_vasixd(c);
    } else {
      if (c === _Char___init__impl__6a9atx(8211)) {
        tmp = 150;
      } else {
        if (c === _Char___init__impl__6a9atx(8212)) {
          tmp = 151;
        } else {
          if (c === _Char___init__impl__6a9atx(8226)) {
            tmp = 149;
          } else {
            tmp = 63;
          }
        }
      }
    }
    var code = tmp;
    this_0.r5(padStart(toString_3(code, 16), 2, _Char___init__impl__6a9atx(48)));
  }
  return this_0.toString();
};
var PdfFont_instance;
function PdfFont_getInstance() {
  if (PdfFont_instance == null)
    new PdfFont();
  return PdfFont_instance;
}
function hexOf($this, c) {
  return c.hf_1 << 16 | c.if_1 << 8 | c.jf_1;
}
function contrast($this, c) {
  return 0.299 * c.hf_1 + 0.587 * c.if_1 + 0.114 * c.jf_1 > 140 ? 1119000 : 16777215;
}
function money($this, v) {
  var cents = roundToInt(v * 100);
  return '$' + (cents / 100 | 0) + '.' + padStart((cents % 100 | 0).toString(), 2, _Char___init__impl__6a9atx(48));
}
function PageBuilder(footerTitle) {
  this.qo_1 = footerTitle;
  this.ro_1 = ArrayList_init_$Create$();
}
protoOf(PageBuilder).so = function () {
  // Inline function 'kotlin.also' call
  var this_0 = new PdfPageWriter(792.0);
  this.ro_1.f(this_0);
  return this_0;
};
function cover($this, p, title, r) {
  p.eo(0.0, 0.0, 612.0, 96.0, 1976635);
  p.oo(40.0, 46.0, title, 24.0, 16777215, true, VOID, 612.0 - 40.0 * 2);
  p.oo(40.0, 72.0, 'Building instructions', 12.0, 13358561);
  var aspect = coverAspect($this, r);
  var boxW = 612.0 - 40.0 * 2;
  var boxH = 470.0;
  // Inline function 'kotlin.math.min' call
  var b = boxH * aspect;
  var drawW = Math.min(boxW, b);
  var drawH = drawW / aspect;
  var x = (612.0 - drawW) / 2;
  p.po('Im1', x, 120.0, drawW, drawH);
  p.go(x, 120.0, drawW, drawH, 13751771);
  var top = 120 + drawH + 34;
  var cm = InstructionPdf$cover$lambda;
  var facts = listOf_0([to('Size', '' + r.cg_1 + ' x ' + r.dg_1 + ' studs (' + cm(r.cg_1) + ' x ' + cm(r.dg_1) + ' cm)'), to('Pieces', '' + r.lg_1.kh_1), to('Lots', '' + r.lg_1.lh_1), to('Style', r.bg_1.rg_1.xh_1), to('Backing', r.bg_1.sg_1.nk_1), to('Estimated cost', money($this, r.lg_1.dh_1) + ' Pick a Brick, ' + money($this, r.lg_1.eh_1) + ' BrickLink')]);
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = facts.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var i = checkIndexOverflow(_unary__edvuaz);
    var k = item.da();
    var v = item.ea();
    var y = top + imul_0(i, 17);
    p.oo(40.0, y, k, 10.0, 4937059);
    p.oo(40.0 + 92, y, v, 10.0, VOID, true, VOID, 612.0 - 40.0 * 2 - 92);
  }
  p.oo(40.0, 792.0 - 30, 'Made with StudCraft. LEGO is a trademark of the LEGO Group, which does not sponsor, authorize, or endorse this app.', 7.5, 4937059, VOID, VOID, 612.0 - 40.0 * 2);
}
function coverAspect($this, r) {
  var img = MosaicRasterSize_instance.to(r);
  return img.ma_1 / img.na_1;
}
function partsPages($this, book, r) {
  var tmp = InstructionPdf$partsPages$lambda;
  var tmp_0 = InstructionPdf$partsPages$lambda_0;
  var rows = sortedWith(r.kg_1, compareBy([tmp, tmp_0, InstructionPdf$partsPages$lambda_1]));
  var perPage = 36;
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = chunked(rows, perPage).g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var index_0 = checkIndexOverflow(_unary__edvuaz);
    var p = book.so();
    p.oo(40.0, 52.0, index_0 === 0 ? 'Parts list' : 'Parts list (continued)', 18.0, VOID, true);
    p.oo(40.0, 70.0, '' + r.lg_1.kh_1 + ' pieces in ' + r.lg_1.lh_1 + ' lots. BL = BrickLink color ID, LD = LDraw color code.', 9.0, 4937059);
    // Inline function 'kotlin.doubleArrayOf' call
    var cols = new Float64Array([40.0, 40.0 + 30, 40.0 + 62, 40.0 + 104, 40.0 + 262, 40.0 + 400, 40.0 + 432, 40.0 + 466]);
    var head = listOf_0(['', 'No.', 'Qty', 'Part', 'Color', 'BL', 'LD', 'Est.']);
    var y = 92.0;
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index_1 = 0;
    var _iterator__ex2g4s_0 = head.g();
    while (_iterator__ex2g4s_0.h()) {
      var item_0 = _iterator__ex2g4s_0.i();
      var _unary__edvuaz_0 = index_1;
      index_1 = _unary__edvuaz_0 + 1 | 0;
      var i = checkIndexOverflow(_unary__edvuaz_0);
      p.oo(cols[i], y, item_0, 8.5, 4937059, true);
    }
    p.io(40.0, y + 5, 612.0 - 40.0, y + 5, 13751771);
    y = y + 19;
    var _iterator__ex2g4s_1 = item.g();
    while (_iterator__ex2g4s_1.h()) {
      var l = _iterator__ex2g4s_1.i();
      p.eo(40.0, y - 10, 18.0, 13.0, hexOf(InstructionPdf_instance, l.me_1));
      p.go(40.0, y - 10, 18.0, 13.0, 13751771);
      p.oo(cols[1], y, l.le_1.ie_1 ? '-' : l.ue_1.toString(), 9.0, VOID, true);
      p.oo(cols[2], y, 'x' + l.ne_1, 9.0);
      p.oo(cols[3], y, l.le_1.ae_1 + ' ' + l.le_1.be_1, 9.0, VOID, VOID, VOID, 152.0);
      p.oo(cols[4], y, BrickColorIds_getInstance().wo(l.me_1), 9.0, VOID, VOID, VOID, 132.0);
      p.oo(cols[5], y, l.me_1.xe_1.toString(), 9.0);
      p.oo(cols[6], y, BrickColorIds_getInstance().xo(l.me_1.xe_1).toString(), 9.0);
      p.oo(cols[7], y, money(InstructionPdf_instance, l.se_1), 9.0);
      y = y + 17.5;
    }
  }
}
function StepGroup(title, subtitle, steps, x, y, w, h) {
  this.yo_1 = title;
  this.zo_1 = subtitle;
  this.ap_1 = steps;
  this.bp_1 = x;
  this.cp_1 = y;
  this.dp_1 = w;
  this.ep_1 = h;
}
function groupSteps($this, r) {
  var out = ArrayList_init_$Create$();
  var current = {_v: ArrayList_init_$Create$()};
  var _iterator__ex2g4s = r.jg_1.g();
  while (_iterator__ex2g4s.h()) {
    var s = _iterator__ex2g4s.i();
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!current._v.j()) {
      tmp = !(first(current._v).qm_1 === s.qm_1) || s.rm_1;
    } else {
      tmp = false;
    }
    if (tmp) {
      groupSteps$flush(current, out);
    }
    current._v.f(s);
    if (s.rm_1) {
      groupSteps$flush(current, out);
    }
  }
  groupSteps$flush(current, out);
  return out;
}
function sectionMap($this, p, r) {
  p.oo(40.0, 52.0, 'Section map', 18.0, VOID, true);
  p.oo(40.0, 70.0, 'Build one section at a time. Columns and rows are numbered from the top left.', 9.0, 4937059);
  var boxW = 612.0 - 40.0 * 2;
  var boxH = 792.0 - 200;
  var tmp0 = boxW / r.cg_1;
  // Inline function 'kotlin.math.min' call
  var b = boxH / r.dg_1;
  var cell = Math.min(tmp0, b);
  var x0 = (612.0 - cell * r.cg_1) / 2;
  var y0 = 92.0;
  var light = InstructionPdf$sectionMap$lambda;
  var inductionVariable = 0;
  var last = r.dg_1;
  if (inductionVariable < last)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var x = 0;
      while (x < r.cg_1) {
        var id = r.eg_1[imul_0(y, r.cg_1) + x | 0];
        var run = 1;
        while ((x + run | 0) < r.cg_1 && r.eg_1[(imul_0(y, r.cg_1) + x | 0) + run | 0] === id) {
          run = run + 1 | 0;
        }
        var tmp0_safe_receiver = BrickCatalog_getInstance().qh_1.k1(id);
        if (tmp0_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          p.eo(x0 + x * cell, y0 + y * cell, run * cell + 0.2, cell + 0.2, light(tmp0_safe_receiver));
        }
        x = x + run | 0;
      }
    }
     while (inductionVariable < last);
  var cols = (r.cg_1 + 15 | 0) / 16 | 0;
  var rows = (r.dg_1 + 15 | 0) / 16 | 0;
  var inductionVariable_0 = 0;
  if (inductionVariable_0 < rows)
    do {
      var row = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      var inductionVariable_1 = 0;
      if (inductionVariable_1 < cols)
        do {
          var col = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var sx = imul_0(col, 16);
          var sy = imul_0(row, 16);
          // Inline function 'kotlin.math.min' call
          var b_0 = r.cg_1 - sx | 0;
          var sw = Math.min(16, b_0);
          // Inline function 'kotlin.math.min' call
          var b_1 = r.dg_1 - sy | 0;
          var sh = Math.min(16, b_1);
          p.fo(x0 + sx * cell, y0 + sy * cell, sw * cell, sh * cell, 1119000, 1.2);
          // Inline function 'kotlin.math.min' call
          // Inline function 'kotlin.math.min' call
          var b_2 = Math.min(sw, sh) * cell * 0.34;
          var size = Math.min(22.0, b_2);
          var cx = x0 + (sx + sw / 2.0) * cell;
          var cy = y0 + (sy + sh / 2.0) * cell;
          p.jo(cx, cy, size * 0.9, 16777215);
          p.oo(cx, cy + size * 0.36, toString(Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(65), row)) + (col + 1 | 0), size, VOID, true, true);
        }
         while (inductionVariable_1 < cols);
    }
     while (inductionVariable_0 < rows);
}
function stepPage($this, p, r, g) {
  p.oo(40.0, 52.0, g.yo_1, 17.0, VOID, true, VOID, 612.0 - 40.0 * 2);
  p.oo(40.0, 70.0, g.zo_1, 9.5, 4937059, VOID, VOID, 612.0 - 40.0 * 2);
  var locW = 92.0;
  var tmp0 = locW / r.cg_1;
  // Inline function 'kotlin.math.min' call
  var b = 64.0 / r.dg_1;
  var locCell = Math.min(tmp0, b);
  var lx = 612.0 - 40.0 - r.cg_1 * locCell;
  p.eo(lx, 84.0, r.cg_1 * locCell, r.dg_1 * locCell, 15067115);
  p.eo(lx + g.bp_1 * locCell, 84 + g.cp_1 * locCell, g.dp_1 * locCell, g.ep_1 * locCell, 14034984);
  p.go(lx, 84.0, r.cg_1 * locCell, r.dg_1 * locCell, 4937059);
  p.oo(40.0, 96.0, 'Columns ' + (g.bp_1 + 1 | 0) + '-' + (g.bp_1 + g.dp_1 | 0) + ', rows ' + (g.cp_1 + 1 | 0) + '-' + (g.cp_1 + g.ep_1 | 0), 9.5, VOID, true);
  var top = 160.0;
  // Inline function 'kotlin.collections.flatMap' call
  var tmp0_0 = g.ap_1;
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination = ArrayList_init_$Create$();
  var _iterator__ex2g4s = tmp0_0.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var list = element.um_1;
    addAll(destination, list);
  }
  // Inline function 'kotlin.collections.groupBy' call
  // Inline function 'kotlin.collections.groupByTo' call
  var destination_0 = LinkedHashMap_init_$Create$();
  var _iterator__ex2g4s_0 = destination.g();
  while (_iterator__ex2g4s_0.h()) {
    var element_0 = _iterator__ex2g4s_0.i();
    var key = to(element_0.le_1, element_0.me_1.xe_1);
    // Inline function 'kotlin.collections.getOrPut' call
    var value = destination_0.k1(key);
    var tmp;
    if (value == null) {
      var answer = ArrayList_init_$Create$();
      destination_0.t2(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    var list_0 = tmp;
    list_0.f(element_0);
  }
  var legendRows = destination_0.l();
  // Inline function 'kotlin.math.min' call
  var b_0 = 14.0 * ((legendRows + 1 | 0) / 2 | 0) + 30;
  var legendHeight = Math.min(350.0, b_0);
  var availH = 792.0 - top - legendHeight - 62;
  var tmp0_1 = (612.0 - 40.0 * 2 - 20) / g.dp_1;
  // Inline function 'kotlin.math.min' call
  var b_1 = availH / g.ep_1;
  var cell = Math.min(tmp0_1, b_1);
  var x0 = (612.0 - cell * g.dp_1) / 2 + 8;
  var y0 = top;
  var tmp_0;
  if (first(g.ap_1).rm_1) {
    tmp_0 = emptyList();
  } else {
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0_2 = g.ap_1;
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination_1 = ArrayList_init_$Create$();
    var _iterator__ex2g4s_1 = tmp0_2.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      var list_1 = element_1.sm_1;
      addAll(destination_1, list_1);
    }
    tmp_0 = destination_1;
  }
  var pieces = tmp_0;
  if (first(g.ap_1).rm_1) {
    p.eo(x0, y0, g.dp_1 * cell, g.ep_1 * cell, 2830394);
    var _iterator__ex2g4s_2 = r.gg_1.g();
    while (_iterator__ex2g4s_2.h()) {
      var b_2 = _iterator__ex2g4s_2.i();
      p.fo(x0 + b_2.ri_1 * cell, y0 + b_2.si_1 * cell, b_2.ti_1 * cell, b_2.ui_1 * cell, 16777215, 1.2);
    }
    var _iterator__ex2g4s_3 = r.hg_1.g();
    while (_iterator__ex2g4s_3.h()) {
      var pin = _iterator__ex2g4s_3.i();
      var tmp_1 = x0 + pin.cm_1 * cell;
      var tmp_2 = y0 + pin.dm_1 * cell;
      // Inline function 'kotlin.math.max' call
      var b_3 = cell * 0.32;
      var tmp$ret$14 = Math.max(2.5, b_3);
      p.jo(tmp_1, tmp_2, tmp$ret$14, 16765952);
    }
  } else {
    p.eo(x0, y0, g.dp_1 * cell, g.ep_1 * cell, 15987958);
  }
  var font = coerceIn(cell * 0.46, 4.0, 12.0);
  var _iterator__ex2g4s_4 = pieces.g();
  $l$loop: while (_iterator__ex2g4s_4.h()) {
    var piece = _iterator__ex2g4s_4.i();
    var px = x0 + (piece.ri_1 - g.bp_1 | 0) * cell;
    var py = y0 + (piece.si_1 - g.cp_1 | 0) * cell;
    var pw = piece.ti_1 * cell;
    var ph = piece.ui_1 * cell;
    if (piece.pi_1.he_1) {
      var tmp_3 = px + pw / 2;
      var tmp_4 = py + ph / 2;
      // Inline function 'kotlin.math.min' call
      var tmp$ret$15 = Math.min(pw, ph);
      p.jo(tmp_3, tmp_4, tmp$ret$15 * 0.47, hexOf($this, piece.qi_1));
    } else {
      p.eo(px + 0.4, py + 0.4, pw - 0.8, ph - 0.8, hexOf($this, piece.qi_1));
    }
    var tmp0_elvis_lhs = r.mg_1.k1(piece.qi_1.xe_1);
    var tmp_5;
    if (tmp0_elvis_lhs == null) {
      continue $l$loop;
    } else {
      tmp_5 = tmp0_elvis_lhs;
    }
    var code = tmp_5;
    var inductionVariable = 0;
    var last = piece.ui_1;
    if (inductionVariable < last)
      do {
        var sy = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        var last_0 = piece.ti_1;
        if (inductionVariable_0 < last_0)
          do {
            var sx = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            p.oo(px + (sx + 0.5) * cell, py + (sy + 0.5) * cell + font * 0.36, code.toString(), font, contrast($this, piece.qi_1), true, true);
          }
           while (inductionVariable_0 < last_0);
      }
       while (inductionVariable < last);
  }
  var inductionVariable_1 = 0;
  var last_1 = g.dp_1;
  if (inductionVariable_1 <= last_1)
    do {
      var i = inductionVariable_1;
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      p.ho(x0 + i * cell, y0, x0 + i * cell, y0 + g.ep_1 * cell, ((g.bp_1 + i | 0) % 4 | 0) === 0 ? 4937059 : 13751771, ((g.bp_1 + i | 0) % 4 | 0) === 0 ? 0.7 : 0.25);
    }
     while (!(i === last_1));
  var inductionVariable_2 = 0;
  var last_2 = g.ep_1;
  if (inductionVariable_2 <= last_2)
    do {
      var i_0 = inductionVariable_2;
      inductionVariable_2 = inductionVariable_2 + 1 | 0;
      p.ho(x0, y0 + i_0 * cell, x0 + g.dp_1 * cell, y0 + i_0 * cell, ((g.cp_1 + i_0 | 0) % 4 | 0) === 0 ? 4937059 : 13751771, ((g.cp_1 + i_0 | 0) % 4 | 0) === 0 ? 0.7 : 0.25);
    }
     while (!(i_0 === last_2));
  // Inline function 'kotlin.math.min' call
  var b_4 = cell * 0.6;
  var label = Math.min(7.5, b_4);
  var every = cell < 11 ? 4 : 1;
  var inductionVariable_3 = 0;
  var last_3 = g.dp_1;
  if (inductionVariable_3 < last_3)
    do {
      var i_1 = inductionVariable_3;
      inductionVariable_3 = inductionVariable_3 + 1 | 0;
      if (i_1 === 0 || (((g.bp_1 + i_1 | 0) + 1 | 0) % every | 0) === 0) {
        p.oo(x0 + (i_1 + 0.5) * cell, y0 - 4, '' + ((g.bp_1 + i_1 | 0) + 1 | 0), label, 4937059, VOID, true);
      }
    }
     while (inductionVariable_3 < last_3);
  var inductionVariable_4 = 0;
  var last_4 = g.ep_1;
  if (inductionVariable_4 < last_4)
    do {
      var i_2 = inductionVariable_4;
      inductionVariable_4 = inductionVariable_4 + 1 | 0;
      if (i_2 === 0 || (((g.cp_1 + i_2 | 0) + 1 | 0) % every | 0) === 0) {
        p.oo(x0 - 4 - PdfFont_getInstance().mo('' + ((g.cp_1 + i_2 | 0) + 1 | 0), label, false), y0 + (i_2 + 0.5) * cell + label * 0.36, '' + ((g.cp_1 + i_2 | 0) + 1 | 0), label, 4937059);
      }
    }
     while (inductionVariable_4 < last_4);
  var y = y0 + g.ep_1 * cell + 24;
  p.oo(40.0, y, 'Parts for this section', 10.5, VOID, true);
  y = y + 16;
  // Inline function 'kotlin.collections.flatMap' call
  var tmp0_3 = g.ap_1;
  // Inline function 'kotlin.collections.flatMapTo' call
  var destination_2 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_5 = tmp0_3.g();
  while (_iterator__ex2g4s_5.h()) {
    var element_2 = _iterator__ex2g4s_5.i();
    var list_2 = element_2.um_1;
    addAll(destination_2, list_2);
  }
  // Inline function 'kotlin.collections.groupBy' call
  // Inline function 'kotlin.collections.groupByTo' call
  var destination_3 = LinkedHashMap_init_$Create$();
  var _iterator__ex2g4s_6 = destination_2.g();
  while (_iterator__ex2g4s_6.h()) {
    var element_3 = _iterator__ex2g4s_6.i();
    var key_0 = to(element_3.le_1, element_3.me_1.xe_1);
    // Inline function 'kotlin.collections.getOrPut' call
    var value_0 = destination_3.k1(key_0);
    var tmp_6;
    if (value_0 == null) {
      var answer_0 = ArrayList_init_$Create$();
      destination_3.t2(key_0, answer_0);
      tmp_6 = answer_0;
    } else {
      tmp_6 = value_0;
    }
    var list_3 = tmp_6;
    list_3.f(element_3);
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = destination_3.l1();
  // Inline function 'kotlin.collections.mapTo' call
  var destination_4 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s_7 = this_0.g();
  while (_iterator__ex2g4s_7.h()) {
    var item = _iterator__ex2g4s_7.i();
    var tmp_7 = first(item);
    // Inline function 'kotlin.collections.sumOf' call
    var sum = 0;
    var _iterator__ex2g4s_8 = item.g();
    while (_iterator__ex2g4s_8.h()) {
      var element_4 = _iterator__ex2g4s_8.i();
      var tmp_8 = sum;
      sum = tmp_8 + element_4.ne_1 | 0;
    }
    var tmp$ret$28 = sum;
    var tmp$ret$27 = to(tmp_7, tmp$ret$28);
    destination_4.f(tmp$ret$27);
  }
  // Inline function 'kotlin.collections.sortedBy' call
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_9 = InstructionPdf$stepPage$lambda;
  var tmp$ret$31 = new sam$kotlin_Comparator$0_9(tmp_9);
  var merged = sortedWith(destination_4, tmp$ret$31);
  var capacity = imul_0(coerceAtLeast(numberToInt((792.0 - 46 - y) / 14), 1), 2);
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s_9 = take(merged, capacity).g();
  while (_iterator__ex2g4s_9.h()) {
    var item_0 = _iterator__ex2g4s_9.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var i_3 = checkIndexOverflow(_unary__edvuaz);
    var l = item_0.da();
    var qty = item_0.ea();
    var colX = 40.0 + (i_3 % 2 | 0) * ((612.0 - 40.0 * 2) / 2);
    var rowY = y + imul_0(i_3 / 2 | 0, 14);
    p.eo(colX, rowY - 9, 15.0, 11.0, hexOf(InstructionPdf_instance, l.me_1));
    p.go(colX, rowY - 9, 15.0, 11.0, 13751771);
    var code_0 = l.le_1.ie_1 ? '' : '#' + l.ue_1 + ' ';
    p.oo(colX + 20, rowY, code_0 + ' x' + qty + '  ' + l.le_1.ce_1 + ', ' + BrickColorIds_getInstance().wo(l.me_1) + ' (BL ' + l.me_1.xe_1 + ')', 8.5, VOID, VOID, VOID, (612.0 - 40.0 * 2) / 2 - 26);
  }
  if (merged.l() > capacity) {
    p.oo(40.0, 792.0 - 42, '+' + (merged.l() - capacity | 0) + ' more lots: see the parts list.', 8.0, 4937059);
  }
}
function write($this, title, pages, image) {
  var out = new ByteSink(262144);
  var offsets = ArrayList_init_$Create$();
  out.fn('%PDF-1.4\n');
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(37);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  out.zm(tmp$ret$0);
  // Inline function 'kotlin.intArrayOf' call
  var indexedObject = new Int32Array([226, 227, 207, 211]);
  var inductionVariable = 0;
  var last = indexedObject.length;
  while (inductionVariable < last) {
    var b = indexedObject[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    out.zm(b);
  }
  // Inline function 'kotlin.code' call
  var this_1 = _Char___init__impl__6a9atx(10);
  var tmp$ret$2 = Char__toInt_impl_vasixd(this_1);
  out.zm(tmp$ret$2);
  var firstPage = 7;
  var tmp = get_indices_0(pages);
  var kids = joinToString_1(tmp, ' ', VOID, VOID, VOID, VOID, InstructionPdf$write$lambda(firstPage));
  write$obj(offsets, out, InstructionPdf$write$lambda_0(out));
  write$obj(offsets, out, InstructionPdf$write$lambda_1(out, pages, kids));
  write$obj(offsets, out, InstructionPdf$write$lambda_2(out));
  write$obj(offsets, out, InstructionPdf$write$lambda_3(out));
  write$obj(offsets, out, InstructionPdf$write$lambda_4(image, out));
  write$obj(offsets, out, InstructionPdf$write$lambda_5(out, title));
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = pages.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var i = checkIndexOverflow(_unary__edvuaz);
    var contents = (firstPage + imul_0(i, 2) | 0) + 1 | 0;
    write$obj(offsets, out, InstructionPdf$write$lambda_6(out, contents));
    write$obj(offsets, out, InstructionPdf$write$lambda_7(item, out));
  }
  var xref = out.ym_1;
  out.fn('xref\n0 ' + (offsets.l() + 1 | 0) + '\n0000000000 65535 f \n');
  var _iterator__ex2g4s_0 = offsets.g();
  while (_iterator__ex2g4s_0.h()) {
    var o = _iterator__ex2g4s_0.i();
    out.fn(padStart(o.toString(), 10, _Char___init__impl__6a9atx(48)) + ' 00000 n \n');
  }
  out.fn('trailer\n<< /Size ' + (offsets.l() + 1 | 0) + ' /Root 1 0 R /Info 6 0 R >>\nstartxref\n' + xref + '\n%%EOF\n');
  return out.gn();
}
function sam$kotlin_Comparator$0_9(function_0) {
  this.fp_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_9).e9 = function (a, b) {
  return this.fp_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_9).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_9).x1 = function () {
  return this.fp_1;
};
protoOf(sam$kotlin_Comparator$0_9).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_9).hashCode = function () {
  return hashCode_0(this.x1());
};
function InstructionPdf$cover$lambda(studs) {
  return '' + (imul_0(studs, 8) / 10 | 0) + '.' + (imul_0(studs, 8) % 10 | 0);
}
function InstructionPdf$partsPages$lambda(it) {
  return it.le_1.ie_1;
}
function InstructionPdf$partsPages$lambda_0(it) {
  return it.ue_1;
}
function InstructionPdf$partsPages$lambda_1(it) {
  return it.le_1.ae_1;
}
function groupSteps$flush(current, out) {
  if (current._v.j())
    return Unit_instance;
  var f = first(current._v).wm_1;
  var first_0 = first(current._v).nm_1;
  var last_0 = last(current._v).nm_1;
  var label = first_0 === last_0 ? 'Step ' + first_0 : 'Steps ' + first_0 + '-' + last_0;
  var tmp = label + ': ' + first(current._v).qm_1;
  // Inline function 'kotlin.takeIf' call
  var this_0 = first(current._v).pm_1;
  var tmp_0;
  if (current._v.l() === 1) {
    tmp_0 = this_0;
  } else {
    tmp_0 = null;
  }
  var tmp0_elvis_lhs = tmp_0;
  out.f(new StepGroup(tmp, tmp0_elvis_lhs == null ? 'Place one color group at a time, in the order listed.' : tmp0_elvis_lhs, current._v, f.jm_1, f.km_1, f.lm_1, f.mm_1));
  current._v = ArrayList_init_$Create$();
}
function InstructionPdf$sectionMap$lambda(c) {
  return ((c.hf_1 + 255 | 0) / 2 | 0) << 16 | ((c.if_1 + 255 | 0) / 2 | 0) << 8 | ((c.jf_1 + 255 | 0) / 2 | 0);
}
function InstructionPdf$stepPage$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.ma_1.ue_1;
  var tmp$ret$2 = b.ma_1.ue_1;
  return compareValues(tmp, tmp$ret$2);
}
function write$obj(offsets, out, body) {
  offsets.f(out.ym_1);
  out.fn('' + offsets.l() + ' 0 obj\n');
  body();
  out.fn('\nendobj\n');
}
function write$stream(out, dict, data) {
  var packed = Deflate_getInstance().yn(data);
  out.fn('<< ' + dict + ' /Filter /FlateDecode /Length ' + packed.length + ' >>\nstream\n');
  out.en(packed);
  out.fn('\nendstream');
}
function InstructionPdf$write$lambda($firstPage) {
  return function (it) {
    return '' + ($firstPage + imul_0(it, 2) | 0) + ' 0 R';
  };
}
function InstructionPdf$write$lambda_0($out) {
  return function () {
    $out.fn('<< /Type /Catalog /Pages 2 0 R >>');
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_1($out, $pages, $kids) {
  return function () {
    $out.fn('<< /Type /Pages /Count ' + $pages.l() + ' /Kids [' + $kids + '] /MediaBox [0 0 612 792] >>');
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_2($out) {
  return function () {
    $out.fn('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_3($out) {
  return function () {
    $out.fn('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_4($image, $out) {
  return function () {
    // Inline function 'kotlin.text.buildString' call
    var capacity = imul_0($image.ip_1.length, 6);
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$(capacity);
    var indexedObject = $image.ip_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var c = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      this_0.r5(padStart(toString_3(c & 16777215, 16), 6, _Char___init__impl__6a9atx(48)));
    }
    var lookup = this_0.toString();
    write$stream($out, '/Type /XObject /Subtype /Image /Width ' + $image.gp_1 + ' /Height ' + $image.hp_1 + ' /BitsPerComponent 8 /ColorSpace [/Indexed /DeviceRGB ' + ($image.ip_1.length - 1 | 0) + ' <' + lookup + '>]', $image.jp_1);
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_5($out, $title) {
  return function () {
    // Inline function 'kotlin.text.map' call
    var this_0 = $title;
    // Inline function 'kotlin.text.mapTo' call
    var destination = ArrayList_init_$Create$_0(charSequenceLength(this_0));
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(this_0)) {
      var item = charSequenceGet(this_0, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var tmp$ret$3 = Char__toInt_impl_vasixd(item);
      var tmp$ret$2 = padStart(toString_3(tmp$ret$3, 16), 4, _Char___init__impl__6a9atx(48));
      destination.f(tmp$ret$2);
    }
    $out.fn('<< /Title <FEFF' + joinToString_1(destination, '') + '> /Creator <' + PdfFont_getInstance().no('StudCraft') + '> >>');
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_6($out, $contents) {
  return function () {
    $out.fn('<< /Type /Page /Parent 2 0 R /Contents ' + $contents + ' 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Im1 5 0 R >> >> >>');
    return Unit_instance;
  };
}
function InstructionPdf$write$lambda_7($page, $out) {
  return function () {
    write$stream($out, '', encodeToByteArray($page.do_1.toString()));
    return Unit_instance;
  };
}
function InstructionPdf() {
  this.kp_1 = 612.0;
  this.lp_1 = 792.0;
  this.mp_1 = 40.0;
  this.np_1 = 4937059;
  this.op_1 = 13751771;
  this.pp_1 = 1976635;
}
protoOf(InstructionPdf).qp = function (rawTitle, r) {
  var title = ExportText_instance.rp(rawTitle);
  var book = new PageBuilder(title);
  cover(this, book.so(), title, r);
  partsPages(this, book, r);
  sectionMap(this, book.so(), r);
  var _iterator__ex2g4s = groupSteps(this, r).g();
  while (_iterator__ex2g4s.h()) {
    var group = _iterator__ex2g4s.i();
    stepPage(this, book.so(), r, group);
  }
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s_0 = book.ro_1.g();
  while (_iterator__ex2g4s_0.h()) {
    var item = _iterator__ex2g4s_0.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var i = checkIndexOverflow(_unary__edvuaz);
    if (i > 0) {
      item.io(40.0, 792.0 - 34, 612.0 - 40.0, 792.0 - 34, 13751771);
      item.oo(40.0, 792.0 - 22, title, 8.0, 4937059, VOID, VOID, 360.0);
      item.oo(612.0 - 40.0 - 60, 792.0 - 22, 'Page ' + (i + 1 | 0) + ' of ' + book.ro_1.l(), 8.0, 4937059);
    }
  }
  return write(this, title, book.ro_1, MosaicRaster_getInstance().aq(r, 1200));
};
var InstructionPdf_instance;
function InstructionPdf_getInstance() {
  return InstructionPdf_instance;
}
function MosaicRasterSize() {
}
protoOf(MosaicRasterSize).to = function (r) {
  // Inline function 'kotlin.let' call
  var it = MosaicRaster_getInstance().aq(r, 240);
  return to(it.gp_1, it.hp_1);
};
var MosaicRasterSize_instance;
function MosaicRasterSize_getInstance() {
  return MosaicRasterSize_instance;
}
function BrickColorIds() {
  BrickColorIds_instance = this;
  this.uo_1 = mapOf_0([to(5, 'Red'), to(3, 'Yellow'), to(7, 'Blue'), to(6, 'Green'), to(4, 'Orange'), to(36, 'Bright Green')]);
  this.vo_1 = mapOf_0([to(1, 15), to(11, 0), to(86, 71), to(85, 72), to(5, 4), to(3, 14), to(7, 1), to(6, 2), to(4, 25), to(2, 19), to(88, 70), to(34, 27), to(156, 322), to(63, 272), to(59, 320), to(69, 28), to(80, 288), to(110, 191), to(150, 84), to(120, 308), to(42, 73), to(71, 26), to(104, 29), to(89, 85), to(39, 3), to(220, 353), to(153, 321), to(105, 212), to(103, 226), to(48, 378), to(55, 379), to(155, 330), to(154, 31), to(157, 30), to(152, 323), to(28, 92), to(90, 78), to(36, 10), to(115, 297), to(95, 179), to(68, 484), to(47, 5), to(54, 373), to(72, 313), to(25, 12), to(73, 112), to(21, 334), to(99, 151)]);
}
protoOf(BrickColorIds).wo = function (color) {
  var tmp0_elvis_lhs = this.uo_1.k1(color.xe_1);
  return tmp0_elvis_lhs == null ? color.ye_1 : tmp0_elvis_lhs;
};
protoOf(BrickColorIds).xo = function (brickLinkId) {
  var tmp0_elvis_lhs = this.vo_1.k1(brickLinkId);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.error' call
    var message = 'No LDraw color for BrickLink ' + brickLinkId;
    throw IllegalStateException_init_$Create$_0(toString_1(message));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
};
var BrickColorIds_instance;
function BrickColorIds_getInstance() {
  if (BrickColorIds_instance == null)
    new BrickColorIds();
  return BrickColorIds_instance;
}
function BrickColorQuery() {
}
protoOf(BrickColorQuery).bq = function (query, palette, tier) {
  var tmp;
  if (palette == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    var tmp0 = BrickCatalog_getInstance().uh(palette);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = HashSet_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$3 = item.xe_1;
      destination.f(tmp$ret$3);
    }
    tmp = destination;
  }
  var allowed = tmp;
  // Inline function 'kotlin.text.trim' call
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp$ret$5 = toString_1(trim_0(isCharSequence(query) ? query : THROW_CCE())).toLowerCase();
  var q = take_0(tmp$ret$5, 40);
  // Inline function 'kotlin.collections.filter' call
  var tmp0_0 = BrickCatalog_getInstance().ph_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_0 = tmp0_0.g();
  while (_iterator__ex2g4s_0.h()) {
    var element = _iterator__ex2g4s_0.i();
    var tmp_0;
    if ((allowed == null || allowed.e1(element.xe_1)) && (tier == null || element.af_1.equals(tier))) {
      var tmp_1;
      var tmp_2;
      var tmp_3;
      var tmp_4;
      var tmp_5;
      // Inline function 'kotlin.text.isEmpty' call
      if (charSequenceLength(q) === 0) {
        tmp_5 = true;
      } else {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$11 = element.ye_1.toLowerCase();
        tmp_5 = contains_1(tmp$ret$11, q);
      }
      if (tmp_5) {
        tmp_4 = true;
      } else {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$13 = BrickColorIds_getInstance().wo(element).toLowerCase();
        tmp_4 = contains_1(tmp$ret$13, q);
      }
      if (tmp_4) {
        tmp_3 = true;
      } else {
        tmp_3 = element.xe_1.toString() === q;
      }
      if (tmp_3) {
        tmp_2 = true;
      } else {
        tmp_2 = 'bl' + q === 'bl' + element.xe_1;
      }
      if (tmp_2) {
        tmp_1 = true;
      } else {
        tmp_1 = BrickColorIds_getInstance().xo(element.xe_1).toString() === q;
      }
      tmp_0 = tmp_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      destination_0.f(element);
    }
  }
  return destination_0;
};
protoOf(BrickColorQuery).cq = function (r, g, b, palette) {
  var tmp;
  if (palette == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = BrickCatalog_getInstance().uh(palette);
  }
  // Inline function 'kotlin.collections.orEmpty' call
  var tmp0_elvis_lhs = tmp;
  // Inline function 'kotlin.collections.ifEmpty' call
  var this_0 = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  var tmp_0;
  if (this_0.j()) {
    tmp_0 = BrickCatalog_getInstance().ph_1;
  } else {
    tmp_0 = this_0;
  }
  var pool = tmp_0;
  var lab = rgbToLab(coerceIn_0(r, 0, 255), coerceIn_0(g, 0, 255), coerceIn_0(b, 0, 255));
  var tmp$ret$5;
  $l$block_0: {
    // Inline function 'kotlin.collections.minByOrNull' call
    var iterator = pool.g();
    if (!iterator.h()) {
      tmp$ret$5 = null;
      break $l$block_0;
    }
    var minElem = iterator.i();
    if (!iterator.h()) {
      tmp$ret$5 = minElem;
      break $l$block_0;
    }
    var it = minElem;
    var minValue = BrickCatalog_getInstance().ji(lab[0], lab[1], lab[2], it);
    do {
      var e = iterator.i();
      var v = BrickCatalog_getInstance().ji(lab[0], lab[1], lab[2], e);
      if (compareTo(minValue, v) > 0) {
        minElem = e;
        minValue = v;
      }
    }
     while (iterator.h());
    tmp$ret$5 = minElem;
  }
  var tmp1_elvis_lhs = tmp$ret$5;
  return tmp1_elvis_lhs == null ? BrickCatalog_getInstance().rh_1 : tmp1_elvis_lhs;
};
var BrickColorQuery_instance;
function BrickColorQuery_getInstance() {
  return BrickColorQuery_instance;
}
var static_init_called_12;
function static_init_12() {
  if (static_init_called_12)
    return Unit_instance;
  static_init_called_12 = true;
  MirrorMode_NONE_instance = new MirrorMode('NONE', 0, 'Off', false, false);
  MirrorMode_HORIZONTAL_instance = new MirrorMode('HORIZONTAL', 1, 'Left-right', true, false);
  MirrorMode_VERTICAL_instance = new MirrorMode('VERTICAL', 2, 'Top-bottom', false, true);
  MirrorMode_BOTH_instance = new MirrorMode('BOTH', 3, 'Both', true, true);
}
var MirrorMode_NONE_instance;
var MirrorMode_HORIZONTAL_instance;
var MirrorMode_VERTICAL_instance;
var MirrorMode_BOTH_instance;
function values_6() {
  static_init_12();
  return [MirrorMode_NONE_getInstance(), MirrorMode_HORIZONTAL_getInstance(), MirrorMode_VERTICAL_getInstance(), MirrorMode_BOTH_getInstance()];
}
function get_entries_6() {
  static_init_12();
  if ($ENTRIES_6 == null)
    $ENTRIES_6 = enumEntries(values_6());
  return $ENTRIES_6;
}
var $ENTRIES_6;
function MirrorMode(name, ordinal, title, x, y) {
  Enum.call(this, name, ordinal);
  this.fq_1 = title;
  this.gq_1 = x;
  this.hq_1 = y;
}
function requireColor($this, id) {
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  var this_0 = BrickCatalog_getInstance().qh_1;
  // Inline function 'kotlin.require' call
  if (!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).i1(id)) {
    var message = 'Not a catalog color';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  return Unit_instance;
}
function write_0($this, index, color, into) {
  if ($this.mq_1[index] === color)
    return Unit_instance;
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if (!(isInterface(into, KtMap) ? into : THROW_CCE()).i1(index)) {
    // Inline function 'kotlin.collections.set' call
    var value = $this.mq_1[index];
    into.t2(index, value);
  }
  $this.mq_1[index] = color;
}
function commit($this, changes) {
  var diff = ArrayList_init_$Create$_0(imul_0(changes.l(), 3));
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s = changes.m1().g();
  while (_iterator__ex2g4s.h()) {
    var _destruct__k2r9zo = _iterator__ex2g4s.i();
    // Inline function 'kotlin.collections.component1' call
    var index = _destruct__k2r9zo.g1();
    // Inline function 'kotlin.collections.component2' call
    var before = _destruct__k2r9zo.h1();
    if (!($this.mq_1[index] === before)) {
      diff.f(index);
      diff.f(before);
      diff.f($this.mq_1[index]);
    }
  }
  if (diff.j())
    return false;
  $this.nq_1.v9(toIntArray(diff));
  if ($this.nq_1.r9_1 > $this.kq_1) {
    $this.nq_1.w9();
  }
  $this.oq_1.d3();
  return true;
}
function mirrored($this, x, y, mirror) {
  // Inline function 'kotlin.collections.buildList' call
  // Inline function 'kotlin.collections.buildListInternal' call
  // Inline function 'kotlin.apply' call
  var this_0 = ArrayList_init_$Create$();
  this_0.f(to(x, y));
  if (mirror.gq_1) {
    this_0.f(to(($this.iq_1 - 1 | 0) - x | 0, y));
  }
  if (mirror.hq_1) {
    this_0.f(to(x, ($this.jq_1 - 1 | 0) - y | 0));
  }
  if (mirror.gq_1 && mirror.hq_1) {
    this_0.f(to(($this.iq_1 - 1 | 0) - x | 0, ($this.jq_1 - 1 | 0) - y | 0));
  }
  return this_0.c3();
}
function fill$visit(this$0, $colorId, target, $changes, queue, tail, n) {
  if (this$0.mq_1[n] === target) {
    write_0(this$0, n, $colorId, $changes);
    var _unary__edvuaz = tail._v;
    tail._v = _unary__edvuaz + 1 | 0;
    queue[_unary__edvuaz] = n;
  }
}
function MosaicEditSession(width, height, original, current, maxHistory) {
  current = current === VOID ? original : current;
  maxHistory = maxHistory === VOID ? 200 : maxHistory;
  this.iq_1 = width;
  this.jq_1 = height;
  this.kq_1 = maxHistory;
  var tmp = this;
  // Inline function 'kotlin.collections.copyOf' call
  // Inline function 'kotlin.js.asDynamic' call
  tmp.lq_1 = original.slice();
  var tmp_0 = this;
  // Inline function 'kotlin.collections.copyOf' call
  // Inline function 'kotlin.js.asDynamic' call
  tmp_0.mq_1 = current.slice();
  this.nq_1 = ArrayDeque_init_$Create$();
  this.oq_1 = ArrayDeque_init_$Create$();
  this.pq_1 = null;
  var tmp_1;
  var tmp_2;
  var tmp_3;
  var containsArg = this.iq_1;
  if (1 <= containsArg ? containsArg <= 256 : false) {
    var containsArg_0 = this.jq_1;
    tmp_3 = 1 <= containsArg_0 ? containsArg_0 <= 256 : false;
  } else {
    tmp_3 = false;
  }
  if (tmp_3) {
    tmp_2 = original.length === imul_0(this.iq_1, this.jq_1);
  } else {
    tmp_2 = false;
  }
  if (tmp_2) {
    tmp_1 = current.length === original.length;
  } else {
    tmp_1 = false;
  }
  // Inline function 'kotlin.require' call
  if (!tmp_1) {
    var message = 'Invalid grid';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  var tmp_4;
  var tmp$ret$6;
  $l$block: {
    // Inline function 'kotlin.collections.all' call
    var inductionVariable = 0;
    var last = original.length;
    while (inductionVariable < last) {
      var element = original[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = BrickCatalog_getInstance().qh_1;
      if (!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).i1(element)) {
        tmp$ret$6 = false;
        break $l$block;
      }
    }
    tmp$ret$6 = true;
  }
  if (tmp$ret$6) {
    var tmp$ret$10;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var inductionVariable_0 = 0;
      var last_0 = current.length;
      while (inductionVariable_0 < last_0) {
        var element_0 = current[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'kotlin.collections.contains' call
        // Inline function 'kotlin.collections.containsKey' call
        var this_1 = BrickCatalog_getInstance().qh_1;
        if (!(isInterface(this_1, KtMap) ? this_1 : THROW_CCE()).i1(element_0)) {
          tmp$ret$10 = false;
          break $l$block_0;
        }
      }
      tmp$ret$10 = true;
    }
    tmp_4 = tmp$ret$10;
  } else {
    tmp_4 = false;
  }
  // Inline function 'kotlin.require' call
  if (!tmp_4) {
    var message_0 = 'Unknown color';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
  }
}
protoOf(MosaicEditSession).qq = function () {
  // Inline function 'kotlin.collections.copyOf' call
  // Inline function 'kotlin.js.asDynamic' call
  return this.mq_1.slice();
};
protoOf(MosaicEditSession).rq = function () {
  // Inline function 'kotlin.collections.isNotEmpty' call
  return !this.nq_1.j();
};
protoOf(MosaicEditSession).sq = function () {
  // Inline function 'kotlin.collections.isNotEmpty' call
  return !this.oq_1.j();
};
protoOf(MosaicEditSession).tq = function () {
  return !contentEquals(this.mq_1, this.lq_1);
};
protoOf(MosaicEditSession).uq = function () {
  var tmp0 = get_indices(this.mq_1);
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.count' call
    var tmp;
    if (isInterface(tmp0, Collection)) {
      tmp = tmp0.j();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = 0;
      break $l$block;
    }
    var count = 0;
    var inductionVariable = tmp0.rc_1;
    var last = tmp0.sc_1;
    if (inductionVariable <= last)
      do {
        var element = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var it = element;
        if (!(this.mq_1[it] === this.lq_1[it])) {
          count = count + 1 | 0;
          checkCountOverflow(count);
        }
      }
       while (!(element === last));
    tmp$ret$0 = count;
  }
  return tmp$ret$0;
};
protoOf(MosaicEditSession).vq = function () {
  if (this.pq_1 == null)
    this.pq_1 = LinkedHashMap_init_$Create$();
};
protoOf(MosaicEditSession).wq = function () {
  var tmp0_elvis_lhs = this.pq_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var s = tmp;
  this.pq_1 = null;
  return commit(this, s);
};
protoOf(MosaicEditSession).xq = function (x, y, colorId, size, mirror) {
  if (colorId == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    requireColor(this, colorId);
  }
  var s = coerceIn_0(size, 1, 16);
  var from = (-(s - 1 | 0) | 0) / 2 | 0;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'com.drseussfreakinc.studcraft.pro.MosaicEditSession.atomic' call
    var active = this.pq_1;
    if (!(active == null)) {
      var _iterator__ex2g4s = mirrored(this, x, y, mirror).g();
      while (_iterator__ex2g4s.h()) {
        var _destruct__k2r9zo = _iterator__ex2g4s.i();
        var cx = _destruct__k2r9zo.da();
        var cy = _destruct__k2r9zo.ea();
        var inductionVariable = from;
        var last = from + s | 0;
        if (inductionVariable < last)
          do {
            var dy = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var inductionVariable_0 = from;
            var last_0 = from + s | 0;
            if (inductionVariable_0 < last_0)
              $l$loop: do {
                var dx = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var px = cx + dx | 0;
                var py = cy + dy | 0;
                if (!(0 <= px ? px < this.iq_1 : false) || !(0 <= py ? py < this.jq_1 : false))
                  continue $l$loop;
                var i = imul_0(py, this.iq_1) + px | 0;
                write_0(this, i, colorId == null ? this.lq_1[i] : colorId, active);
              }
               while (inductionVariable_0 < last_0);
          }
           while (inductionVariable < last);
      }
      tmp$ret$2 = true;
      break $l$block;
    }
    var changes = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s_0 = mirrored(this, x, y, mirror).g();
    while (_iterator__ex2g4s_0.h()) {
      var _destruct__k2r9zo_0 = _iterator__ex2g4s_0.i();
      var cx_0 = _destruct__k2r9zo_0.da();
      var cy_0 = _destruct__k2r9zo_0.ea();
      var inductionVariable_1 = from;
      var last_1 = from + s | 0;
      if (inductionVariable_1 < last_1)
        do {
          var dy_0 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var inductionVariable_2 = from;
          var last_2 = from + s | 0;
          if (inductionVariable_2 < last_2)
            $l$loop_0: do {
              var dx_0 = inductionVariable_2;
              inductionVariable_2 = inductionVariable_2 + 1 | 0;
              var px_0 = cx_0 + dx_0 | 0;
              var py_0 = cy_0 + dy_0 | 0;
              if (!(0 <= px_0 ? px_0 < this.iq_1 : false) || !(0 <= py_0 ? py_0 < this.jq_1 : false))
                continue $l$loop_0;
              var i_0 = imul_0(py_0, this.iq_1) + px_0 | 0;
              write_0(this, i_0, colorId == null ? this.lq_1[i_0] : colorId, changes);
            }
             while (inductionVariable_2 < last_2);
        }
         while (inductionVariable_1 < last_1);
    }
    tmp$ret$2 = commit(this, changes);
  }
  return tmp$ret$2;
};
protoOf(MosaicEditSession).yq = function (x0, y0, x1, y1, colorId, size, mirror) {
  var x = x0;
  var y = y0;
  var dx = abs_0(x1 - x0 | 0);
  var dy = -abs_0(y1 - y0 | 0) | 0;
  var sx = x0 < x1 ? 1 : -1;
  var sy = y0 < y1 ? 1 : -1;
  var err = dx + dy | 0;
  var changed = false;
  $l$loop: while (true) {
    changed = this.xq(x, y, colorId, size, mirror) || changed;
    if (x === x1 && y === y1)
      break $l$loop;
    var e2 = imul_0(2, err);
    if (e2 >= dy) {
      err = err + dy | 0;
      x = x + sx | 0;
    }
    if (e2 <= dx) {
      err = err + dx | 0;
      y = y + sy | 0;
    }
  }
  return changed;
};
protoOf(MosaicEditSession).zq = function (x, y, colorId, mirror) {
  requireColor(this, colorId);
  if (!(0 <= x ? x < this.iq_1 : false) || !(0 <= y ? y < this.jq_1 : false))
    return false;
  var tmp$ret$0;
  $l$block: {
    // Inline function 'com.drseussfreakinc.studcraft.pro.MosaicEditSession.atomic' call
    var active = this.pq_1;
    if (!(active == null)) {
      var _iterator__ex2g4s = mirrored(this, x, y, mirror).g();
      $l$loop: while (_iterator__ex2g4s.h()) {
        var _destruct__k2r9zo = _iterator__ex2g4s.i();
        var sx = _destruct__k2r9zo.da();
        var sy = _destruct__k2r9zo.ea();
        var start = imul_0(sy, this.iq_1) + sx | 0;
        var target = this.mq_1[start];
        if (target === colorId)
          continue $l$loop;
        var queue = new Int32Array(this.mq_1.length);
        var head = 0;
        var tail = {_v: 0};
        write_0(this, start, colorId, active);
        var _unary__edvuaz = tail._v;
        tail._v = _unary__edvuaz + 1 | 0;
        queue[_unary__edvuaz] = start;
        while (head < tail._v) {
          var _unary__edvuaz_0 = head;
          head = _unary__edvuaz_0 + 1 | 0;
          var i = queue[_unary__edvuaz_0];
          var cx = i % this.iq_1 | 0;
          if (cx > 0) {
            fill$visit(this, colorId, target, active, queue, tail, i - 1 | 0);
          }
          if ((cx + 1 | 0) < this.iq_1) {
            fill$visit(this, colorId, target, active, queue, tail, i + 1 | 0);
          }
          if (i >= this.iq_1) {
            fill$visit(this, colorId, target, active, queue, tail, i - this.iq_1 | 0);
          }
          if ((i + this.iq_1 | 0) < this.mq_1.length) {
            fill$visit(this, colorId, target, active, queue, tail, i + this.iq_1 | 0);
          }
        }
      }
      tmp$ret$0 = true;
      break $l$block;
    }
    var changes = LinkedHashMap_init_$Create$();
    var _iterator__ex2g4s_0 = mirrored(this, x, y, mirror).g();
    $l$loop_0: while (_iterator__ex2g4s_0.h()) {
      var _destruct__k2r9zo_0 = _iterator__ex2g4s_0.i();
      var sx_0 = _destruct__k2r9zo_0.da();
      var sy_0 = _destruct__k2r9zo_0.ea();
      var start_0 = imul_0(sy_0, this.iq_1) + sx_0 | 0;
      var target_0 = this.mq_1[start_0];
      if (target_0 === colorId)
        continue $l$loop_0;
      var queue_0 = new Int32Array(this.mq_1.length);
      var head_0 = 0;
      var tail_0 = {_v: 0};
      write_0(this, start_0, colorId, changes);
      var _unary__edvuaz_1 = tail_0._v;
      tail_0._v = _unary__edvuaz_1 + 1 | 0;
      queue_0[_unary__edvuaz_1] = start_0;
      while (head_0 < tail_0._v) {
        var _unary__edvuaz_2 = head_0;
        head_0 = _unary__edvuaz_2 + 1 | 0;
        var i_0 = queue_0[_unary__edvuaz_2];
        var cx_0 = i_0 % this.iq_1 | 0;
        if (cx_0 > 0) {
          fill$visit(this, colorId, target_0, changes, queue_0, tail_0, i_0 - 1 | 0);
        }
        if ((cx_0 + 1 | 0) < this.iq_1) {
          fill$visit(this, colorId, target_0, changes, queue_0, tail_0, i_0 + 1 | 0);
        }
        if (i_0 >= this.iq_1) {
          fill$visit(this, colorId, target_0, changes, queue_0, tail_0, i_0 - this.iq_1 | 0);
        }
        if ((i_0 + this.iq_1 | 0) < this.mq_1.length) {
          fill$visit(this, colorId, target_0, changes, queue_0, tail_0, i_0 + this.iq_1 | 0);
        }
      }
    }
    tmp$ret$0 = commit(this, changes);
  }
  return tmp$ret$0;
};
protoOf(MosaicEditSession).ar = function (fromColorId, toColorId) {
  requireColor(this, toColorId);
  if (fromColorId === toColorId)
    return false;
  var tmp$ret$0;
  $l$block: {
    // Inline function 'com.drseussfreakinc.studcraft.pro.MosaicEditSession.atomic' call
    var active = this.pq_1;
    if (!(active == null)) {
      var inductionVariable = 0;
      var last = this.mq_1.length - 1 | 0;
      if (inductionVariable <= last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (this.mq_1[i] === fromColorId) {
            write_0(this, i, toColorId, active);
          }
        }
         while (inductionVariable <= last);
      tmp$ret$0 = true;
      break $l$block;
    }
    var changes = LinkedHashMap_init_$Create$();
    var inductionVariable_0 = 0;
    var last_0 = this.mq_1.length - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var i_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        if (this.mq_1[i_0] === fromColorId) {
          write_0(this, i_0, toColorId, changes);
        }
      }
       while (inductionVariable_0 <= last_0);
    tmp$ret$0 = commit(this, changes);
  }
  return tmp$ret$0;
};
protoOf(MosaicEditSession).br = function (x0, y0, x1, y1, colorId, mirror) {
  if (colorId == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    requireColor(this, colorId);
  }
  // Inline function 'kotlin.comparisons.minOf' call
  var tmp$ret$2 = Math.min(x0, x1);
  var left = coerceIn_0(tmp$ret$2, 0, this.iq_1 - 1 | 0);
  // Inline function 'kotlin.comparisons.maxOf' call
  var tmp$ret$3 = Math.max(x0, x1);
  var right = coerceIn_0(tmp$ret$3, 0, this.iq_1 - 1 | 0);
  // Inline function 'kotlin.comparisons.minOf' call
  var tmp$ret$4 = Math.min(y0, y1);
  var top = coerceIn_0(tmp$ret$4, 0, this.jq_1 - 1 | 0);
  // Inline function 'kotlin.comparisons.maxOf' call
  var tmp$ret$5 = Math.max(y0, y1);
  var bottom = coerceIn_0(tmp$ret$5, 0, this.jq_1 - 1 | 0);
  var tmp$ret$6;
  $l$block: {
    // Inline function 'com.drseussfreakinc.studcraft.pro.MosaicEditSession.atomic' call
    var active = this.pq_1;
    if (!(active == null)) {
      var inductionVariable = top;
      if (inductionVariable <= bottom)
        do {
          var y = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var inductionVariable_0 = left;
          if (inductionVariable_0 <= right)
            do {
              var x = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var _iterator__ex2g4s = mirrored(this, x, y, mirror).g();
              while (_iterator__ex2g4s.h()) {
                var _destruct__k2r9zo = _iterator__ex2g4s.i();
                var px = _destruct__k2r9zo.da();
                var py = _destruct__k2r9zo.ea();
                var i = imul_0(py, this.iq_1) + px | 0;
                write_0(this, i, colorId == null ? this.lq_1[i] : colorId, active);
              }
            }
             while (!(x === right));
        }
         while (!(y === bottom));
      tmp$ret$6 = true;
      break $l$block;
    }
    var changes = LinkedHashMap_init_$Create$();
    var inductionVariable_1 = top;
    if (inductionVariable_1 <= bottom)
      do {
        var y_0 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        var inductionVariable_2 = left;
        if (inductionVariable_2 <= right)
          do {
            var x_0 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var _iterator__ex2g4s_0 = mirrored(this, x_0, y_0, mirror).g();
            while (_iterator__ex2g4s_0.h()) {
              var _destruct__k2r9zo_0 = _iterator__ex2g4s_0.i();
              var px_0 = _destruct__k2r9zo_0.da();
              var py_0 = _destruct__k2r9zo_0.ea();
              var i_0 = imul_0(py_0, this.iq_1) + px_0 | 0;
              write_0(this, i_0, colorId == null ? this.lq_1[i_0] : colorId, changes);
            }
          }
           while (!(x_0 === right));
      }
       while (!(y_0 === bottom));
    tmp$ret$6 = commit(this, changes);
  }
  return tmp$ret$6;
};
protoOf(MosaicEditSession).cr = function () {
  this.wq();
  var tmp0_elvis_lhs = this.nq_1.y9();
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var diff = tmp;
  var i = 0;
  while (i < diff.length) {
    this.mq_1[diff[i]] = diff[i + 1 | 0];
    i = i + 3 | 0;
  }
  this.oq_1.v9(diff);
  return true;
};
protoOf(MosaicEditSession).dr = function () {
  this.wq();
  var tmp0_elvis_lhs = this.oq_1.y9();
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var diff = tmp;
  var i = 0;
  while (i < diff.length) {
    this.mq_1[diff[i]] = diff[i + 2 | 0];
    i = i + 3 | 0;
  }
  this.nq_1.v9(diff);
  return true;
};
protoOf(MosaicEditSession).er = function () {
  this.wq();
  var changes = LinkedHashMap_init_$Create$();
  var inductionVariable = 0;
  var last = this.mq_1.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      write_0(this, i, this.lq_1[i], changes);
    }
     while (inductionVariable <= last);
  return commit(this, changes);
};
function PixelImage(width, height, argb) {
  this.fr_1 = width;
  this.gr_1 = height;
  this.hr_1 = argb;
  // Inline function 'kotlin.require' call
  if (!(this.fr_1 > 0 && this.gr_1 > 0 && this.hr_1.length === imul_0(this.fr_1, this.gr_1))) {
    var message = 'Invalid image';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
}
function crop$px(p, size) {
  return numberToInt(coerceIn(p, 0.0, 100.0) / 100.0 * size);
}
function ImageTweaks() {
}
protoOf(ImageTweaks).ir = function (s) {
  var out = new Int32Array(s.hr_1.length);
  var inductionVariable = 0;
  var last = s.gr_1;
  if (inductionVariable < last)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var inductionVariable_0 = 0;
      var last_0 = s.fr_1;
      if (inductionVariable_0 < last_0)
        do {
          var x = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          out[imul_0(x, s.gr_1) + ((s.gr_1 - 1 | 0) - y | 0) | 0] = s.hr_1[imul_0(y, s.fr_1) + x | 0];
        }
         while (inductionVariable_0 < last_0);
    }
     while (inductionVariable < last);
  return new PixelImage(s.gr_1, s.fr_1, out);
};
protoOf(ImageTweaks).jr = function (s) {
  var out = new Int32Array(s.hr_1.length);
  var inductionVariable = 0;
  var last = s.gr_1;
  if (inductionVariable < last)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var inductionVariable_0 = 0;
      var last_0 = s.fr_1;
      if (inductionVariable_0 < last_0)
        do {
          var x = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          out[imul_0((s.fr_1 - 1 | 0) - x | 0, s.gr_1) + y | 0] = s.hr_1[imul_0(y, s.fr_1) + x | 0];
        }
         while (inductionVariable_0 < last_0);
    }
     while (inductionVariable < last);
  return new PixelImage(s.gr_1, s.fr_1, out);
};
protoOf(ImageTweaks).kr = function (s) {
  var out = new Int32Array(s.hr_1.length);
  var inductionVariable = 0;
  var last = s.gr_1;
  if (inductionVariable < last)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var inductionVariable_0 = 0;
      var last_0 = s.fr_1;
      if (inductionVariable_0 < last_0)
        do {
          var x = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          out[imul_0(y, s.fr_1) + ((s.fr_1 - 1 | 0) - x | 0) | 0] = s.hr_1[imul_0(y, s.fr_1) + x | 0];
        }
         while (inductionVariable_0 < last_0);
    }
     while (inductionVariable < last);
  return new PixelImage(s.fr_1, s.gr_1, out);
};
protoOf(ImageTweaks).lr = function (s) {
  var out = new Int32Array(s.hr_1.length);
  var inductionVariable = 0;
  var last = s.gr_1;
  if (inductionVariable < last)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp0 = s.hr_1;
      var tmp4 = imul_0((s.gr_1 - 1 | 0) - y | 0, s.fr_1);
      var tmp6 = imul_0(y, s.fr_1);
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = imul_0(y + 1 | 0, s.fr_1);
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, out, tmp4, tmp6, endIndex);
    }
     while (inductionVariable < last);
  return new PixelImage(s.fr_1, s.gr_1, out);
};
protoOf(ImageTweaks).mr = function (s, leftPct, topPct, rightPct, bottomPct) {
  var l = coerceAtMost(crop$px(leftPct, s.fr_1), s.fr_1 - 1 | 0);
  var t = coerceAtMost(crop$px(topPct, s.gr_1), s.gr_1 - 1 | 0);
  var w = coerceAtLeast((s.fr_1 - l | 0) - crop$px(rightPct, s.fr_1) | 0, 1);
  var h = coerceAtLeast((s.gr_1 - t | 0) - crop$px(bottomPct, s.gr_1) | 0, 1);
  var out = new Int32Array(imul_0(w, h));
  var inductionVariable = 0;
  if (inductionVariable < h)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var tmp0 = s.hr_1;
      var tmp4 = imul_0(y, w);
      var tmp6 = imul_0(t + y | 0, s.fr_1) + l | 0;
      // Inline function 'kotlin.collections.copyInto' call
      var endIndex = (imul_0(t + y | 0, s.fr_1) + l | 0) + w | 0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = tmp0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, out, tmp4, tmp6, endIndex);
    }
     while (inductionVariable < h);
  return new PixelImage(w, h, out);
};
var ImageTweaks_instance;
function ImageTweaks_getInstance() {
  return ImageTweaks_instance;
}
function MirrorMode_NONE_getInstance() {
  static_init_12();
  return MirrorMode_NONE_instance;
}
function MirrorMode_HORIZONTAL_getInstance() {
  static_init_12();
  return MirrorMode_HORIZONTAL_instance;
}
function MirrorMode_VERTICAL_getInstance() {
  static_init_12();
  return MirrorMode_VERTICAL_instance;
}
function MirrorMode_BOTH_getInstance() {
  static_init_12();
  return MirrorMode_BOTH_instance;
}
function IndexedImage(width, height, palette, pixels) {
  this.gp_1 = width;
  this.hp_1 = height;
  this.ip_1 = palette;
  this.jp_1 = pixels;
}
function rgb($this, c, f) {
  return rgb$ch(f, c.hf_1) << 16 | rgb$ch(f, c.if_1) << 8 | rgb$ch(f, c.jf_1);
}
function Painter(w, h) {
  this.nr_1 = w;
  this.or_1 = h;
  this.pr_1 = new Int8Array(imul_0(this.nr_1, this.or_1));
}
protoOf(Painter).qr = function (i) {
  return fill(this.pr_1, toByte(i));
};
protoOf(Painter).rr = function (x, y, rw, rh, i) {
  // Inline function 'kotlin.math.max' call
  var l = Math.max(0, x);
  var tmp0 = this.nr_1;
  // Inline function 'kotlin.math.min' call
  var b = x + rw | 0;
  var r = Math.min(tmp0, b);
  // Inline function 'kotlin.math.max' call
  var t = Math.max(0, y);
  var tmp0_0 = this.or_1;
  // Inline function 'kotlin.math.min' call
  var b_0 = y + rh | 0;
  var b_1 = Math.min(tmp0_0, b_0);
  if (l >= r)
    return Unit_instance;
  var inductionVariable = t;
  if (inductionVariable < b_1)
    do {
      var row = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      fill(this.pr_1, toByte(i), imul_0(row, this.nr_1) + l | 0, imul_0(row, this.nr_1) + r | 0);
    }
     while (inductionVariable < b_1);
};
protoOf(Painter).jo = function (cx, cy, radius, i) {
  // Inline function 'kotlin.math.max' call
  var b = numberToInt(cy - radius);
  var t = Math.max(0, b);
  var tmp0 = this.or_1 - 1 | 0;
  // Inline function 'kotlin.math.min' call
  var b_0 = numberToInt(cy + radius) + 1 | 0;
  var b_1 = Math.min(tmp0, b_0);
  var inductionVariable = t;
  if (inductionVariable <= b_1)
    $l$loop: do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var dy = y + 0.5 - cy;
      var span = radius * radius - dy * dy;
      if (span < 0)
        continue $l$loop;
      // Inline function 'kotlin.math.sqrt' call
      var half = Math.sqrt(span);
      // Inline function 'kotlin.math.ceil' call
      var x = cx - half - 0.5;
      var tmp$ret$3 = Math.ceil(x);
      // Inline function 'kotlin.math.max' call
      var b_2 = numberToInt(tmp$ret$3);
      var l = Math.max(0, b_2);
      var tmp0_0 = this.nr_1 - 1 | 0;
      // Inline function 'kotlin.math.floor' call
      var x_0 = cx + half - 0.5;
      var tmp$ret$5 = Math.floor(x_0);
      // Inline function 'kotlin.math.min' call
      var b_3 = numberToInt(tmp$ret$5);
      var r = Math.min(tmp0_0, b_3);
      if (l <= r) {
        fill(this.pr_1, toByte(i), imul_0(y, this.nr_1) + l | 0, (imul_0(y, this.nr_1) + r | 0) + 1 | 0);
      }
    }
     while (!(y === b_1));
};
protoOf(Painter).sr = function (n, cx, cy, scale, i) {
  var text = n.toString();
  var tw = imul_0(imul_0(text.length, 4), scale) - scale | 0;
  var x = cx - (tw / 2 | 0) | 0;
  var y = cy - (imul_0(5, scale) / 2 | 0) | 0;
  var inductionVariable = 0;
  var last = text.length;
  while (inductionVariable < last) {
    var ch = charCodeAt(text, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var glyph = MosaicRaster_getInstance().zp_1[Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48))];
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < 5)
      do {
        var gy = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var inductionVariable_1 = 0;
        if (inductionVariable_1 < 3)
          do {
            var gx = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            if (charCodeAt(glyph, imul_0(gy, 3) + gx | 0) === _Char___init__impl__6a9atx(49)) {
              this.rr(x + imul_0(gx, scale) | 0, y + imul_0(gy, scale) | 0, scale, scale, i);
            }
          }
           while (inductionVariable_1 < 3);
      }
       while (inductionVariable_0 < 5);
    x = x + imul_0(4, scale) | 0;
  }
};
function contrast_0($this, c) {
  return 0.299 * c.hf_1 + 0.587 * c.if_1 + 0.114 * c.jf_1 > 140 ? 2 : 1;
}
function sam$kotlin_Comparator$0_10(function_0) {
  this.tr_1 = function_0;
}
protoOf(sam$kotlin_Comparator$0_10).e9 = function (a, b) {
  return this.tr_1(a, b);
};
protoOf(sam$kotlin_Comparator$0_10).compare = function (a, b) {
  return this.e9(a, b);
};
protoOf(sam$kotlin_Comparator$0_10).x1 = function () {
  return this.tr_1;
};
protoOf(sam$kotlin_Comparator$0_10).equals = function (other) {
  var tmp;
  if (!(other == null) ? isInterface(other, Comparator) : false) {
    var tmp_0;
    if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
      tmp_0 = equals(this.x1(), other.x1());
    } else {
      tmp_0 = false;
    }
    tmp = tmp_0;
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(sam$kotlin_Comparator$0_10).hashCode = function () {
  return hashCode_0(this.x1());
};
function rgb$ch($f, v) {
  return coerceIn_0(numberToInt(v * $f), 0, 255);
}
function MosaicRaster$studMap$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.h1();
  var tmp$ret$2 = b.h1();
  return compareValues(tmp, tmp$ret$2);
}
function MosaicRaster() {
  MosaicRaster_instance = this;
  this.sp_1 = 0;
  this.tp_1 = 1;
  this.up_1 = 2;
  this.vp_1 = 3;
  this.wp_1 = 4;
  var tmp = this;
  // Inline function 'kotlin.also' call
  var this_0 = new Int32Array(4 + imul_0(BrickCatalog_getInstance().ph_1.l(), 3) | 0);
  this_0[0] = 1316895;
  this_0[1] = 16777215;
  this_0[2] = 1119000;
  this_0[3] = 10133932;
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = BrickCatalog_getInstance().ph_1.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var i = checkIndexOverflow(_unary__edvuaz);
    this_0[4 + imul_0(i, 3) | 0] = rgb(MosaicRaster_getInstance(), item, 1.0);
    this_0[(4 + imul_0(i, 3) | 0) + 1 | 0] = rgb(MosaicRaster_getInstance(), item, 0.72);
    this_0[(4 + imul_0(i, 3) | 0) + 2 | 0] = rgb(MosaicRaster_getInstance(), item, 1.16);
  }
  tmp.xp_1 = this_0;
  var tmp_0 = this;
  // Inline function 'kotlin.collections.associate' call
  var this_1 = withIndex(BrickCatalog_getInstance().ph_1);
  var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_1, 10)), 16);
  // Inline function 'kotlin.collections.associateTo' call
  var destination = LinkedHashMap_init_$Create$_0(capacity);
  var _iterator__ex2g4s_0 = this_1.g();
  while (_iterator__ex2g4s_0.h()) {
    var element = _iterator__ex2g4s_0.i();
    var i_0 = element.da();
    var c = element.ea();
    // Inline function 'kotlin.collections.plusAssign' call
    var pair = to(c.xe_1, 4 + imul_0(i_0, 3) | 0);
    destination.t2(pair.ma_1, pair.na_1);
  }
  tmp_0.yp_1 = destination;
  var tmp_1 = this;
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  tmp_1.zp_1 = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001010010010', '111101111101111', '111101111001111'];
}
protoOf(MosaicRaster).aq = function (r, maxSide) {
  var wall = r.bg_1.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance());
  var tmp0 = maxSide / r.cg_1 | 0;
  // Inline function 'kotlin.math.min' call
  var b = (imul_0(maxSide, 5) / 6 | 0) / r.dg_1 | 0;
  // Inline function 'kotlin.let' call
  var it = Math.min(tmp0, b);
  var tmp;
  if (wall) {
    tmp = it;
  } else {
    var tmp0_0 = maxSide / r.cg_1 | 0;
    // Inline function 'kotlin.math.min' call
    var b_0 = maxSide / r.dg_1 | 0;
    tmp = Math.min(tmp0_0, b_0);
  }
  // Inline function 'kotlin.math.max' call
  var b_1 = tmp;
  var cellW = Math.max(3, b_1);
  var cellH = wall ? imul_0(cellW, 6) / 5 | 0 : cellW;
  // Inline function 'kotlin.math.max' call
  var b_2 = cellW / 2 | 0;
  var pad = Math.max(4, b_2);
  var p = new Painter(imul_0(r.cg_1, cellW) + imul_0(pad, 2) | 0, imul_0(r.dg_1, cellH) + imul_0(pad, 2) | 0);
  p.qr(0);
  // Inline function 'kotlin.math.max' call
  var b_3 = cellW / 24 | 0;
  var gap = Math.max(1, b_3);
  var _iterator__ex2g4s = r.fg_1.g();
  $l$loop: while (_iterator__ex2g4s.h()) {
    var piece = _iterator__ex2g4s.i();
    var tmp0_elvis_lhs = this.yp_1.k1(piece.qi_1.xe_1);
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      continue $l$loop;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var base = tmp_0;
    var x = pad + imul_0(piece.ri_1, cellW) | 0;
    var y = pad + imul_0(piece.si_1, cellH) | 0;
    var w = imul_0(piece.ti_1, cellW);
    var h = imul_0(piece.ui_1, cellH);
    if (piece.pi_1.he_1) {
      var cx = x + w / 2.0;
      var cy = y + h / 2.0;
      // Inline function 'kotlin.math.min' call
      var radius = Math.min(w, h) / 2.0 - gap;
      p.jo(cx, cy, radius, base + 1 | 0);
      // Inline function 'kotlin.math.max' call
      var b_4 = cellW / 14 | 0;
      var tmp$ret$8 = Math.max(1, b_4);
      p.jo(cx, cy, radius - tmp$ret$8, base);
      if (piece.pi_1.ge_1) {
        p.jo(cx, cy, radius * 0.58, base + 2 | 0);
      }
    } else {
      p.rr(x + gap | 0, y + gap | 0, w - imul_0(gap, 2) | 0, h - imul_0(gap, 2) | 0, base + 1 | 0);
      // Inline function 'kotlin.math.max' call
      var b_5 = cellW / 14 | 0;
      var rim = Math.max(1, b_5);
      p.rr((x + gap | 0) + rim | 0, (y + gap | 0) + rim | 0, w - imul_0(gap + rim | 0, 2) | 0, h - imul_0(gap + rim | 0, 2) | 0, base);
      if (piece.pi_1.ge_1 && !wall) {
        var inductionVariable = 0;
        var last = piece.ui_1;
        if (inductionVariable < last)
          do {
            var sy = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var inductionVariable_0 = 0;
            var last_0 = piece.ti_1;
            if (inductionVariable_0 < last_0)
              do {
                var sx = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                p.jo(x + (sx + 0.5) * cellW, y + (sy + 0.5) * cellH, cellW * 0.3, base + 2 | 0);
              }
               while (inductionVariable_0 < last_0);
          }
           while (inductionVariable < last);
      }
    }
  }
  return new IndexedImage(p.nr_1, p.or_1, this.xp_1, p.pr_1);
};
protoOf(MosaicRaster).ur = function (r, maxSide, $super) {
  maxSide = maxSide === VOID ? 2880 : maxSide;
  return $super === VOID ? this.aq(r, maxSide) : $super.aq.call(this, r, maxSide);
};
protoOf(MosaicRaster).vr = function (r, maxSide) {
  var tmp0 = r.cg_1;
  // Inline function 'kotlin.math.max' call
  var b = r.dg_1;
  var tmp$ret$0 = Math.max(tmp0, b);
  var cell = coerceIn_0(maxSide / (tmp$ret$0 + 3 | 0) | 0, 14, 40);
  // Inline function 'kotlin.math.max' call
  var b_0 = cell / 10 | 0;
  var scale = Math.max(1, b_0);
  var ruler = cell + (cell / 2 | 0) | 0;
  // Inline function 'kotlin.math.max' call
  var b_1 = imul_0(r.cg_1, cell) / imul_0(cell, 4) | 0;
  var keyCols = Math.max(1, b_1);
  var keyRows = ((r.mg_1.l() + keyCols | 0) - 1 | 0) / keyCols | 0;
  var keyHeight = imul_0(keyRows, cell + 6 | 0) + cell | 0;
  var p = new Painter((ruler + imul_0(r.cg_1, cell) | 0) + cell | 0, (ruler + imul_0(r.dg_1, cell) | 0) + keyHeight | 0);
  p.qr(1);
  var inductionVariable = 0;
  var last = r.dg_1;
  if (inductionVariable < last)
    do {
      var y = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var inductionVariable_0 = 0;
      var last_0 = r.cg_1;
      if (inductionVariable_0 < last_0)
        $l$loop: do {
          var x = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var id = r.eg_1[imul_0(y, r.cg_1) + x | 0];
          var tmp0_elvis_lhs = BrickCatalog_getInstance().qh_1.k1(id);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            continue $l$loop;
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var c = tmp;
          var px = ruler + imul_0(x, cell) | 0;
          var py = ruler + imul_0(y, cell) | 0;
          p.rr(px, py, cell, cell, getValue(this.yp_1, id));
          var tmp1_elvis_lhs = r.mg_1.k1(id);
          p.sr(tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs, px + (cell / 2 | 0) | 0, py + (cell / 2 | 0) | 0, scale, contrast_0(this, c));
        }
         while (inductionVariable_0 < last_0);
    }
     while (inductionVariable < last);
  var inductionVariable_1 = 0;
  var last_1 = r.cg_1;
  if (inductionVariable_1 <= last_1)
    do {
      var x_0 = inductionVariable_1;
      inductionVariable_1 = inductionVariable_1 + 1 | 0;
      p.rr((ruler + imul_0(x_0, cell) | 0) - ((x_0 % 16 | 0) === 0 ? 1 : 0) | 0, ruler, (x_0 % 16 | 0) === 0 ? 3 : 1, imul_0(r.dg_1, cell), (x_0 % 16 | 0) === 0 ? 2 : 3);
    }
     while (!(x_0 === last_1));
  var inductionVariable_2 = 0;
  var last_2 = r.dg_1;
  if (inductionVariable_2 <= last_2)
    do {
      var y_0 = inductionVariable_2;
      inductionVariable_2 = inductionVariable_2 + 1 | 0;
      p.rr(ruler, (ruler + imul_0(y_0, cell) | 0) - ((y_0 % 16 | 0) === 0 ? 1 : 0) | 0, imul_0(r.cg_1, cell), (y_0 % 16 | 0) === 0 ? 3 : 1, (y_0 % 16 | 0) === 0 ? 2 : 3);
    }
     while (!(y_0 === last_2));
  var inductionVariable_3 = 0;
  var last_3 = r.cg_1;
  if (inductionVariable_3 < last_3)
    do {
      var x_1 = inductionVariable_3;
      inductionVariable_3 = inductionVariable_3 + 1 | 0;
      if (x_1 === 0 || ((x_1 + 1 | 0) % 4 | 0) === 0) {
        p.sr(x_1 + 1 | 0, (ruler + imul_0(x_1, cell) | 0) + (cell / 2 | 0) | 0, ruler / 2 | 0, scale, 2);
      }
    }
     while (inductionVariable_3 < last_3);
  var inductionVariable_4 = 0;
  var last_4 = r.dg_1;
  if (inductionVariable_4 < last_4)
    do {
      var y_1 = inductionVariable_4;
      inductionVariable_4 = inductionVariable_4 + 1 | 0;
      if (y_1 === 0 || ((y_1 + 1 | 0) % 4 | 0) === 0) {
        p.sr(y_1 + 1 | 0, ruler / 2 | 0, (ruler + imul_0(y_1, cell) | 0) + (cell / 2 | 0) | 0, scale, 2);
      }
    }
     while (inductionVariable_4 < last_4);
  var keyTop = (ruler + imul_0(r.dg_1, cell) | 0) + (cell / 2 | 0) | 0;
  // Inline function 'kotlin.collections.sortedBy' call
  var this_0 = r.mg_1.m1();
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp_0 = MosaicRaster$studMap$lambda;
  var tmp$ret$4 = new sam$kotlin_Comparator$0_10(tmp_0);
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = sortedWith(this_0, tmp$ret$4).g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var tmp0_0 = checkIndexOverflow(_unary__edvuaz);
    $l$block: {
      // Inline function 'kotlin.collections.component1' call
      var id_0 = item.g1();
      // Inline function 'kotlin.collections.component2' call
      var code = item.h1();
      var tmp0_elvis_lhs_0 = BrickCatalog_getInstance().qh_1.k1(id_0);
      var tmp_1;
      if (tmp0_elvis_lhs_0 == null) {
        break $l$block;
      } else {
        tmp_1 = tmp0_elvis_lhs_0;
      }
      var c_0 = tmp_1;
      var x_2 = ruler + imul_0(imul_0(tmp0_0 % keyCols | 0, cell), 4) | 0;
      var y_2 = keyTop + imul_0(tmp0_0 / keyCols | 0, cell + 6 | 0) | 0;
      p.rr(x_2, y_2, imul_0(cell, 2), cell, getValue(MosaicRaster_getInstance().yp_1, id_0));
      p.sr(code, x_2 + cell | 0, y_2 + (cell / 2 | 0) | 0, scale, contrast_0(MosaicRaster_getInstance(), c_0));
    }
  }
  return new IndexedImage(p.nr_1, p.or_1, this.xp_1, p.pr_1);
};
protoOf(MosaicRaster).wr = function (r, maxSide, $super) {
  maxSide = maxSide === VOID ? 2880 : maxSide;
  return $super === VOID ? this.vr(r, maxSide) : $super.vr.call(this, r, maxSide);
};
protoOf(MosaicRaster).xr = function (image) {
  return PngEncoder_instance.bo(image.gp_1, image.hp_1, image.ip_1, image.jp_1);
};
var MosaicRaster_instance;
function MosaicRaster_getInstance() {
  if (MosaicRaster_instance == null)
    new MosaicRaster();
  return MosaicRaster_instance;
}
var static_init_called_13;
function static_init_13() {
  if (static_init_called_13)
    return Unit_instance;
  static_init_called_13 = true;
  ProExportKind_POSTER_PNG_instance = new ProExportKind('POSTER_PNG', 0, 'Poster PNG', 'poster', 'png', 'image/png');
  ProExportKind_STUD_MAP_PNG_instance = new ProExportKind('STUD_MAP_PNG', 1, 'Stud map PNG', 'stud_map', 'png', 'image/png');
  ProExportKind_INSTRUCTIONS_PDF_instance = new ProExportKind('INSTRUCTIONS_PDF', 2, 'Building instructions PDF', 'instructions', 'pdf', 'application/pdf');
  ProExportKind_STUDIO_IO_instance = new ProExportKind('STUDIO_IO', 3, 'BrickLink Studio (.io)', 'studio', 'io', 'application/octet-stream');
  ProExportKind_LDRAW_LDR_instance = new ProExportKind('LDRAW_LDR', 4, 'LDraw model (.ldr)', 'ldraw', 'ldr', 'text/plain');
  ProExportKind_LDRAW_MPD_instance = new ProExportKind('LDRAW_MPD', 5, 'LDraw multi-part (.mpd)', 'ldraw', 'mpd', 'text/plain');
}
var ProExportKind_POSTER_PNG_instance;
var ProExportKind_STUD_MAP_PNG_instance;
var ProExportKind_INSTRUCTIONS_PDF_instance;
var ProExportKind_STUDIO_IO_instance;
var ProExportKind_LDRAW_LDR_instance;
var ProExportKind_LDRAW_MPD_instance;
function values_7() {
  static_init_13();
  return [ProExportKind_POSTER_PNG_getInstance(), ProExportKind_STUD_MAP_PNG_getInstance(), ProExportKind_INSTRUCTIONS_PDF_getInstance(), ProExportKind_STUDIO_IO_getInstance(), ProExportKind_LDRAW_LDR_getInstance(), ProExportKind_LDRAW_MPD_getInstance()];
}
function get_entries_7() {
  static_init_13();
  if ($ENTRIES_7 == null)
    $ENTRIES_7 = enumEntries(values_7());
  return $ENTRIES_7;
}
var $ENTRIES_7;
function ProExportKind(name, ordinal, title, suffix, extension, mimeType) {
  Enum.call(this, name, ordinal);
  this.as_1 = title;
  this.bs_1 = suffix;
  this.cs_1 = extension;
  this.ds_1 = mimeType;
}
function ExportText() {
}
protoOf(ExportText).es = function (raw, fallback) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$_0();
  var inductionVariable = 0;
  var last = raw.length;
  while (inductionVariable < last) {
    var c = charCodeAt(raw, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    // Inline function 'kotlin.code' call
    var code = Char__toInt_impl_vasixd(c);
    var blocked = code < 32 || (127 <= code ? code <= 159 : false) || code === 8232 || code === 8233 || (8234 <= code ? code <= 8238 : false) || (8294 <= code ? code <= 8297 : false) || code === 65279 || isSurrogate(c);
    this_0.s5(blocked ? _Char___init__impl__6a9atx(32) : c);
  }
  // Inline function 'kotlin.text.trim' call
  var this_1 = this_0.toString();
  var tmp0 = toString_1(trim_0(isCharSequence(this_1) ? this_1 : THROW_CCE()));
  // Inline function 'kotlin.text.replace' call
  var tmp$ret$5 = Regex_init_$Create$_0('\\s+').e8(tmp0, ' ');
  // Inline function 'kotlin.text.trim' call
  var this_2 = take_0(tmp$ret$5, 60);
  var cleaned = toString_1(trim_0(isCharSequence(this_2) ? this_2 : THROW_CCE()));
  // Inline function 'kotlin.text.ifEmpty' call
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(cleaned) === 0) {
    tmp = fallback;
  } else {
    tmp = cleaned;
  }
  return tmp;
};
protoOf(ExportText).rp = function (raw, fallback, $super) {
  fallback = fallback === VOID ? 'StudCraft Mosaic' : fallback;
  return $super === VOID ? this.es(raw, fallback) : $super.es.call(this, raw, fallback);
};
protoOf(ExportText).fs = function (raw) {
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp0 = this.rp(raw).toLowerCase();
  // Inline function 'kotlin.text.replace' call
  var tmp$ret$2 = Regex_init_$Create$_0('[^a-z0-9]+').e8(tmp0, '_');
  // Inline function 'kotlin.text.ifEmpty' call
  var this_0 = trim(take_0(trim(tmp$ret$2, charArrayOf([_Char___init__impl__6a9atx(95)])), 32), charArrayOf([_Char___init__impl__6a9atx(95)]));
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_0) === 0) {
    tmp = 'studcraft_mosaic';
  } else {
    tmp = this_0;
  }
  return tmp;
};
protoOf(ExportText).gs = function (title, result, kind) {
  return this.fs(title) + '_' + result.cg_1 + 'x' + result.dg_1 + '_' + kind.bs_1 + '.' + kind.cs_1;
};
protoOf(ExportText).hs = function (title) {
  // Inline function 'kotlin.text.map' call
  var this_0 = this.rp(title);
  // Inline function 'kotlin.text.mapTo' call
  var destination = ArrayList_init_$Create$_0(charSequenceLength(this_0));
  var inductionVariable = 0;
  while (inductionVariable < charSequenceLength(this_0)) {
    var item = charSequenceGet(this_0, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var tmp;
    // Inline function 'kotlin.code' call
    var containsArg = Char__toInt_impl_vasixd(item);
    if (32 <= containsArg ? containsArg <= 126 : false) {
      tmp = item;
    } else {
      tmp = _Char___init__impl__6a9atx(63);
    }
    var tmp$ret$2 = new Char(tmp);
    destination.f(tmp$ret$2);
  }
  return 'StudCraft mosaic: ' + joinToString_1(destination, '');
};
var ExportText_instance;
function ExportText_getInstance() {
  return ExportText_instance;
}
function isWall($this, r) {
  return r.bg_1.rg_1.equals(BuildStyle_STACKED_BRICK_WALL_getInstance());
}
function lduX($this, r, doubledStud) {
  return imul_0(doubledStud - r.cg_1 | 0, 10);
}
function lduZ($this, r, doubledStud) {
  return imul_0(r.dg_1 - doubledStud | 0, 10);
}
function line($this, $receiver, s) {
  $receiver.r5(s).r5('\r\n');
}
function header($this, $receiver, fileName, title) {
  line($this, $receiver, '0 FILE ' + fileName);
  line($this, $receiver, '0 ' + ExportText_instance.hs(title));
  line($this, $receiver, '0 Name: ' + fileName);
  line($this, $receiver, '0 Author: StudCraft');
}
function backing($this, $receiver, r) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = r.gg_1.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    line(LDrawModel_instance, $receiver, LDrawModel_instance.ns(r, element));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = r.hg_1.g();
  while (_iterator__ex2g4s_0.h()) {
    var element_0 = _iterator__ex2g4s_0.i();
    line(LDrawModel_instance, $receiver, LDrawModel_instance.os(r, element_0));
  }
}
function pinLine$hole(v) {
  var base = imul_0(numberToInt(v) / 16 | 0, 16);
  return base + coerceIn_0(numberToInt(v - base + 0.5), 3, 13) | 0;
}
function LDrawModel() {
  this.is_1 = '1 0 0 0 1 0 0 0 1';
  this.js_1 = '0 0 1 0 1 0 -1 0 0';
  this.ks_1 = 8;
  this.ls_1 = 26;
  this.ms_1 = 24;
}
protoOf(LDrawModel).ps = function (part) {
  var tmp;
  switch (part.o1_1) {
    case 0:
      tmp = '98138.dat';
      break;
    case 1:
      tmp = '4073.dat';
      break;
    case 2:
      tmp = '3024.dat';
      break;
    case 3:
      tmp = '3070b.dat';
      break;
    case 4:
      tmp = '3023.dat';
      break;
    case 5:
      tmp = '3022.dat';
      break;
    case 6:
      tmp = '3710.dat';
      break;
    case 7:
      tmp = '3020.dat';
      break;
    case 8:
      tmp = '3005.dat';
      break;
    case 9:
      tmp = '3004.dat';
      break;
    case 10:
      tmp = '3622.dat';
      break;
    case 11:
      tmp = '3010.dat';
      break;
    case 12:
      tmp = '65803.dat';
      break;
    case 13:
      tmp = '3811.dat';
      break;
    case 14:
      tmp = '2780.dat';
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
};
protoOf(LDrawModel).qs = function (r, p) {
  var color = BrickColorIds_getInstance().xo(p.qi_1.xe_1);
  var x = lduX(this, r, imul_0(2, p.ri_1) + p.ti_1 | 0);
  if (isWall(this, r))
    return '1 ' + color + ' ' + x + ' ' + imul_0(-((r.dg_1 - 1 | 0) - p.si_1 | 0) | 0, 24) + ' 0 1 0 0 0 1 0 0 0 1 ' + this.ps(p.pi_1);
  var z = lduZ(this, r, imul_0(2, p.si_1) + p.ui_1 | 0);
  var turn = p.ui_1 > p.ti_1 ? '0 0 1 0 1 0 -1 0 0' : '1 0 0 0 1 0 0 0 1';
  return '1 ' + color + ' ' + x + ' 0 ' + z + ' ' + turn + ' ' + this.ps(p.pi_1);
};
protoOf(LDrawModel).ns = function (r, p) {
  var half = p.pi_1.equals(BrickPartType_BASEPLATE_32X32_getInstance()) ? 16 : 8;
  var x = lduX(this, r, imul_0(2, p.ri_1 + half | 0));
  var z = lduZ(this, r, imul_0(2, p.si_1 + half | 0));
  return '1 ' + BrickColorIds_getInstance().xo(p.qi_1.xe_1) + ' ' + x + ' 8 ' + z + ' 1 0 0 0 1 0 0 0 1 ' + this.ps(p.pi_1);
};
protoOf(LDrawModel).os = function (r, pin) {
  var black = BrickColorIds_getInstance().xo(11);
  var tmp;
  if (pin.em_1) {
    tmp = '1 ' + black + ' ' + lduX(this, r, imul_0(2, pinLine$hole(pin.cm_1))) + ' 26 ' + lduZ(this, r, imul_0(2, numberToInt(pin.dm_1))) + ' 0 0 1 0 1 0 -1 0 0 2780.dat';
  } else {
    tmp = '1 ' + black + ' ' + lduX(this, r, imul_0(2, numberToInt(pin.cm_1))) + ' 26 ' + lduZ(this, r, imul_0(2, pinLine$hole(pin.dm_1))) + ' 1 0 0 0 1 0 0 0 1 2780.dat';
  }
  return tmp;
};
protoOf(LDrawModel).rs = function (title, r, fileName) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$_0();
  header(LDrawModel_instance, this_0, fileName, title);
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!r.gg_1.j()) {
    backing(LDrawModel_instance, this_0, r);
    line(LDrawModel_instance, this_0, '0 STEP');
  }
  var emitted = HashSet_init_$Create$_0(r.fg_1.l());
  var _iterator__ex2g4s = r.jg_1.g();
  $l$loop_0: while (_iterator__ex2g4s.h()) {
    var step = _iterator__ex2g4s.i();
    if (step.rm_1)
      continue $l$loop_0;
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = step.sm_1;
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s_0 = tmp0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element = _iterator__ex2g4s_0.i();
      if (element.vi_1 >= 1 && emitted.f(element.oi_1)) {
        destination.f(element);
      }
    }
    var fresh = destination;
    if (fresh.j())
      continue $l$loop_0;
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_1 = fresh.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_0 = _iterator__ex2g4s_1.i();
      line(LDrawModel_instance, this_0, LDrawModel_instance.qs(r, element_0));
    }
    line(LDrawModel_instance, this_0, '0 STEP');
  }
  // Inline function 'kotlin.collections.filter' call
  var tmp0_0 = r.fg_1;
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList_init_$Create$();
  var _iterator__ex2g4s_2 = tmp0_0.g();
  while (_iterator__ex2g4s_2.h()) {
    var element_1 = _iterator__ex2g4s_2.i();
    if (emitted.f(element_1.oi_1)) {
      destination_0.f(element_1);
    }
  }
  var rest = destination_0;
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!rest.j()) {
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_3 = rest.g();
    while (_iterator__ex2g4s_3.h()) {
      var element_2 = _iterator__ex2g4s_3.i();
      line(LDrawModel_instance, this_0, LDrawModel_instance.qs(r, element_2));
    }
    line(LDrawModel_instance, this_0, '0 STEP');
  }
  line(LDrawModel_instance, this_0, '0 NOFILE');
  return this_0.toString();
};
protoOf(LDrawModel).ss = function (title, r, fileName, $super) {
  fileName = fileName === VOID ? ExportText_instance.fs(title) + '.ldr' : fileName;
  return $super === VOID ? this.rs(title, r, fileName) : $super.rs.call(this, title, r, fileName);
};
protoOf(LDrawModel).ts = function (title, r) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$_0();
  var main = ExportText_instance.fs(title) + '.mpd';
  header(LDrawModel_instance, this_0, main, title);
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!r.gg_1.j()) {
    line(LDrawModel_instance, this_0, '1 16 0 0 0 1 0 0 0 1 0 0 0 1 backing_frame.ldr');
    line(LDrawModel_instance, this_0, '0 STEP');
  }
  line(LDrawModel_instance, this_0, '1 16 0 0 0 1 0 0 0 1 0 0 0 1 mosaic_surface.ldr');
  line(LDrawModel_instance, this_0, '0 STEP');
  line(LDrawModel_instance, this_0, '0 NOFILE');
  // Inline function 'kotlin.collections.isNotEmpty' call
  if (!r.gg_1.j()) {
    header(LDrawModel_instance, this_0, 'backing_frame.ldr', title + ' backing');
    backing(LDrawModel_instance, this_0, r);
    line(LDrawModel_instance, this_0, '0 NOFILE');
  }
  header(LDrawModel_instance, this_0, 'mosaic_surface.ldr', title + ' surface');
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = r.fg_1.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    line(LDrawModel_instance, this_0, LDrawModel_instance.qs(r, element));
  }
  line(LDrawModel_instance, this_0, '0 NOFILE');
  return this_0.toString();
};
protoOf(LDrawModel).us = function (r) {
  return (r.fg_1.l() + r.gg_1.l() | 0) + r.hg_1.l() | 0;
};
var LDrawModel_instance;
function LDrawModel_getInstance() {
  return LDrawModel_instance;
}
function StudioPackage() {
}
protoOf(StudioPackage).qp = function (title, r) {
  // Inline function 'kotlin.byteArrayOf' call
  var tmp0 = new Int8Array([-17, -69, -65]);
  // Inline function 'kotlin.collections.plus' call
  var elements = encodeToByteArray(LDrawModel_instance.rs(title, r, ExportText_instance.fs(title) + '.io'));
  var model = primitiveArrayConcat([tmp0, elements]);
  var info = '{"version":"2.26.10_1","total_parts":' + LDrawModel_instance.us(r) + ',"parts_db_version":200}';
  return ZipArchive_instance.ao(listOf_0([to('model.ldr', model), to('thumbnail.png', MosaicRaster_getInstance().xr(MosaicRaster_getInstance().aq(r, 512))), to('errorPartList.err', encodeToByteArray('[]')), to('.info', encodeToByteArray(info))]));
};
var StudioPackage_instance;
function StudioPackage_getInstance() {
  return StudioPackage_instance;
}
function ProExports() {
}
protoOf(ProExports).gs = function (title, result, kind) {
  return ExportText_instance.gs(title, result, kind);
};
protoOf(ProExports).vs = function (title, result, kind) {
  var tmp;
  switch (kind.o1_1) {
    case 0:
      tmp = MosaicRaster_getInstance().xr(MosaicRaster_getInstance().ur(result));
      break;
    case 1:
      tmp = MosaicRaster_getInstance().xr(MosaicRaster_getInstance().wr(result));
      break;
    case 2:
      tmp = InstructionPdf_instance.qp(title, result);
      break;
    case 3:
      tmp = StudioPackage_instance.qp(title, result);
      break;
    case 4:
      tmp = encodeToByteArray(LDrawModel_instance.ss(title, result));
      break;
    case 5:
      tmp = encodeToByteArray(LDrawModel_instance.ts(title, result));
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
};
var ProExports_instance;
function ProExports_getInstance() {
  return ProExports_instance;
}
function ProExportKind_POSTER_PNG_getInstance() {
  static_init_13();
  return ProExportKind_POSTER_PNG_instance;
}
function ProExportKind_STUD_MAP_PNG_getInstance() {
  static_init_13();
  return ProExportKind_STUD_MAP_PNG_instance;
}
function ProExportKind_INSTRUCTIONS_PDF_getInstance() {
  static_init_13();
  return ProExportKind_INSTRUCTIONS_PDF_instance;
}
function ProExportKind_STUDIO_IO_getInstance() {
  static_init_13();
  return ProExportKind_STUDIO_IO_instance;
}
function ProExportKind_LDRAW_LDR_getInstance() {
  static_init_13();
  return ProExportKind_LDRAW_LDR_instance;
}
function ProExportKind_LDRAW_MPD_getInstance() {
  static_init_13();
  return ProExportKind_LDRAW_MPD_instance;
}
var static_init_called_14;
function static_init_14() {
  if (static_init_called_14)
    return Unit_instance;
  static_init_called_14 = true;
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
  this.rf_1 = localeCode;
  this.sf_1 = label;
}
function PickABrickRegion_US_getInstance() {
  static_init_14();
  return PickABrickRegion_US_instance;
}
function mosaicImagePrompt(request) {
  return 'Create one square image for a brick mosaic: a clear main subject, bold shapes, strong contrast, ' + ('and a simple background. Do not include any text or watermark. Request: ' + request);
}
function Bitmap(width, height, argb) {
  this.ci_1 = width;
  this.di_1 = height;
  this.ei_1 = argb;
}
protoOf(Bitmap).fi = function (pixels, offset, stride, x, y, width, height) {
  var inductionVariable = 0;
  if (inductionVariable < height)
    do {
      var row = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var from = imul_0(y + row | 0, this.ci_1) + x | 0;
      var tmp0 = this.ei_1;
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
protoOf(Color).gi = function (color) {
  return color >> 16 & 255;
};
protoOf(Color).hi = function (color) {
  return color >> 8 & 255;
};
protoOf(Color).ii = function (color) {
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
  this.ws_1 = width;
  this.xs_1 = height;
  this.ys_1 = style;
  this.zs_1 = backing;
  this.at_1 = palette;
  this.bt_1 = rarity;
  this.ct_1 = tolerance;
  this.dt_1 = dither;
  this.et_1 = legal;
  this.ft_1 = brightness;
  this.gt_1 = contrast;
  this.ht_1 = saturation;
}
protoOf(WebConfig).it = function () {
  var tmp0_widthStuds = coerceIn_0(this.ws_1, 16, 96);
  var tmp1_heightStuds = coerceIn_0(this.xs_1, 16, 96);
  var tmp0 = get_entries_3();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === this.ys_1) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp2_buildStyle = tmp$ret$0;
  var tmp0_0 = get_entries_4();
  var tmp$ret$2;
  $l$block_0: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s_0 = tmp0_0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      if (element_0.n1_1 === this.zs_1) {
        tmp$ret$2 = element_0;
        break $l$block_0;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp3_backingSystem = tmp$ret$2;
  var tmp0_1 = get_entries_2();
  var tmp$ret$4;
  $l$block_1: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s_1 = tmp0_1.g();
    while (_iterator__ex2g4s_1.h()) {
      var element_1 = _iterator__ex2g4s_1.i();
      if (element_1.n1_1 === this.at_1) {
        tmp$ret$4 = element_1;
        break $l$block_1;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp4_palettePreset = tmp$ret$4;
  var tmp0_2 = get_entries_5();
  var tmp$ret$6;
  $l$block_2: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s_2 = tmp0_2.g();
    while (_iterator__ex2g4s_2.h()) {
      var element_2 = _iterator__ex2g4s_2.i();
      if (element_2.n1_1 === this.bt_1) {
        tmp$ret$6 = element_2;
        break $l$block_2;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  var tmp5_rarityPreference = tmp$ret$6;
  var tmp6_colorTolerance = coerceIn(this.ct_1, 0.0, 32.0);
  var tmp7_ditheringEnabled = this.dt_1;
  var tmp8_enforceLegalConnections = this.et_1;
  var tmp9_brightness = coerceIn(this.ft_1, -0.35, 0.35);
  var tmp10_contrast = coerceIn(this.gt_1, 0.7, 1.5);
  var tmp11_saturation = coerceIn(this.ht_1, 0.5, 1.6);
  return new MosaicConfig(tmp0_widthStuds, tmp1_heightStuds, VOID, tmp2_buildStyle, tmp3_backingSystem, tmp4_palettePreset, VOID, VOID, tmp6_colorTolerance, tmp7_ditheringEnabled, tmp5_rarityPreference, tmp8_enforceLegalConnections, tmp9_brightness, tmp10_contrast, tmp11_saturation);
};
function current($this) {
  var tmp0 = $this.jt_1;
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
function kind($this, id) {
  var tmp0 = get_entries_7();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === id) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp$ret$0;
}
function edit($this) {
  var tmp0 = $this.kt_1;
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.checkNotNull' call
    if (tmp0 == null) {
      var message = 'No edit session';
      throw IllegalStateException_init_$Create$_0(toString_1(message));
    } else {
      tmp$ret$0 = tmp0;
      break $l$block;
    }
  }
  return tmp$ret$0;
}
function mirror($this, name) {
  var tmp0 = get_entries_6();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === name) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    tmp$ret$0 = null;
  }
  var tmp0_elvis_lhs = tmp$ret$0;
  return tmp0_elvis_lhs == null ? MirrorMode_NONE_getInstance() : tmp0_elvis_lhs;
}
function paint($this, color) {
  // Inline function 'kotlin.takeIf' call
  var tmp;
  if (color >= 0) {
    tmp = color;
  } else {
    tmp = null;
  }
  return tmp;
}
function WebBridge$catalogJson$lambda($this$obj) {
  var tmp = BrickCatalog_getInstance().ph_1;
  $this$obj.nt('colors', tmp, WebBridge$catalogJson$lambda$lambda);
  var tmp_0 = get_entries_3();
  $this$obj.nt('styles', tmp_0, WebBridge$catalogJson$lambda$lambda_0);
  var tmp_1 = get_entries_4();
  $this$obj.nt('backings', tmp_1, WebBridge$catalogJson$lambda$lambda_1);
  var tmp_2 = get_entries_2();
  $this$obj.nt('palettes', tmp_2, WebBridge$catalogJson$lambda$lambda_2);
  var tmp_3 = get_entries_5();
  $this$obj.nt('rarities', tmp_3, WebBridge$catalogJson$lambda$lambda_3);
  var tmp_4 = Companion_getInstance_12().wl_1;
  $this$obj.nt('sizes', tmp_4, WebBridge$catalogJson$lambda$lambda_4);
  var tmp_5 = get_entries_0();
  $this$obj.nt('csvFormats', tmp_5, WebBridge$catalogJson$lambda$lambda_5);
  var tmp_6 = get_entries();
  $this$obj.nt('marketplaces', tmp_6, WebBridge$catalogJson$lambda$lambda_6);
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda($this$arr, c) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda(c));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda($c) {
  return function ($this$obj) {
    $this$obj.pt('id', $c.xe_1);
    $this$obj.qt('name', $c.ye_1);
    $this$obj.qt('blName', BrickColorIds_getInstance().wo($c));
    $this$obj.pt('ldraw', BrickColorIds_getInstance().xo($c.xe_1));
    $this$obj.pt('r', $c.hf_1);
    $this$obj.pt('g', $c.if_1);
    $this$obj.pt('b', $c.jf_1);
    $this$obj.qt('tier', $c.af_1.n1_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_0($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_0(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_0($s) {
  return function ($this$obj) {
    $this$obj.qt('id', $s.n1_1);
    $this$obj.qt('title', $s.xh_1);
    $this$obj.qt('description', $s.zh_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_1($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_1(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_1($s) {
  return function ($this$obj) {
    $this$obj.qt('id', $s.n1_1);
    $this$obj.qt('title', $s.nk_1);
    $this$obj.qt('description', $s.pk_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_2($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_2(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_2($s) {
  return function ($this$obj) {
    $this$obj.qt('id', $s.n1_1);
    $this$obj.qt('title', $s.pl_1);
    $this$obj.qt('description', $s.ql_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_3($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_3(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_3($s) {
  return function ($this$obj) {
    $this$obj.qt('id', $s.n1_1);
    $this$obj.qt('title', $s.tl_1);
    $this$obj.qt('description', $s.vl_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_4($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_4(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_4($s) {
  return function ($this$obj) {
    $this$obj.qt('label', $s.xl_1);
    $this$obj.pt('w', $s.yl_1);
    $this$obj.pt('h', $s.zl_1);
    $this$obj.qt('tag', $s.am_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_5($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_5(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_5($s) {
  return function ($this$obj) {
    $this$obj.qt('id', $s.n1_1);
    $this$obj.qt('title', $s.yj_1);
    $this$obj.qt('description', $s.zj_1);
    return Unit_instance;
  };
}
function WebBridge$catalogJson$lambda$lambda_6($this$arr, s) {
  $this$arr.ot(WebBridge$catalogJson$lambda$lambda$lambda_6(s));
  return Unit_instance;
}
function WebBridge$catalogJson$lambda$lambda$lambda_6($s) {
  return function ($this$obj) {
    $this$obj.qt('id', $s.n1_1);
    $this$obj.qt('title', $s.fd_1);
    $this$obj.qt('badge', $s.gd_1);
    $this$obj.qt('howTo', $s.jd_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda($this$arr, p) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda(p));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda($p) {
  return function ($this$obj) {
    $this$obj.rt('x', $p.cm_1);
    $this$obj.rt('y', $p.dm_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_0($this$arr, l) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda_0(l));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda_0($l) {
  return function ($this$obj) {
    $this$obj.qt('part', $l.le_1.ae_1);
    $this$obj.qt('partName', $l.le_1.be_1);
    $this$obj.pt('colorId', $l.me_1.xe_1);
    $this$obj.qt('colorName', $l.me_1.ye_1);
    $this$obj.pt('qty', $l.ne_1);
    $this$obj.qt('rarity', $l.oe_1.ik_1);
    $this$obj.st('legal', $l.pe_1);
    $this$obj.st('structural', $l.le_1.ie_1);
    $this$obj.rt('pabUnit', $l.qe_1);
    $this$obj.rt('blUnit', $l.re_1);
    $this$obj.rt('pabTotal', $l.se_1);
    $this$obj.rt('blTotal', $l.te_1);
    $this$obj.pt('code', $l.ue_1);
    var tmp0_safe_receiver = $l.ve_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      $this$obj.qt('alt', tmp0_safe_receiver.ye_1);
    }
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_1($r) {
  return function ($this$obj) {
    var p = $r.lg_1;
    $this$obj.rt('pab', p.dh_1);
    $this$obj.rt('bl', p.eh_1);
    $this$obj.rt('surface', p.fh_1);
    $this$obj.rt('backing', p.gh_1);
    $this$obj.rt('rare', p.hh_1);
    $this$obj.rt('multiSave', p.ih_1);
    $this$obj.rt('perStud', p.jh_1);
    $this$obj.pt('pieces', p.kh_1);
    $this$obj.pt('lots', p.lh_1);
    $this$obj.pt('common', p.mh_1);
    $this$obj.pt('uncommon', p.nh_1);
    $this$obj.pt('rarePct', p.oh_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda$lambda_1($this$arr, c) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda$lambda(c));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda$lambda($c) {
  return function ($this$obj) {
    $this$obj.qt('severity', $c.ej_1.n1_1);
    $this$obj.qt('category', $c.fj_1.im_1);
    $this$obj.qt('title', $c.gj_1);
    $this$obj.qt('detail', $c.hj_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_2($r) {
  return function ($this$obj) {
    var v = $r.ig_1;
    $this$obj.st('legal', v.qk_1);
    $this$obj.pt('score', v.rk_1);
    $this$obj.nt('checks', v.sk_1, WebBridge$resultJson$lambda$lambda$lambda_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_3($this$arr, s) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda_2(s));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda$lambda_0($this$arr, l) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda$lambda$lambda(l));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda$lambda$lambda($l) {
  return function ($this$obj) {
    $this$obj.qt('part', $l.le_1.ce_1);
    $this$obj.pt('colorId', $l.me_1.xe_1);
    $this$obj.qt('colorName', $l.me_1.ye_1);
    $this$obj.pt('qty', $l.ne_1);
    $this$obj.pt('code', $l.ue_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda$lambda_2($s) {
  return function ($this$obj) {
    $this$obj.pt('n', $s.nm_1);
    $this$obj.qt('title', $s.om_1);
    $this$obj.qt('subtitle', $s.pm_1);
    $this$obj.qt('tag', $s.qm_1);
    $this$obj.st('structural', $s.rm_1);
    // Inline function 'kotlin.collections.map' call
    var this_0 = $s.sm_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.g();
    while (_iterator__ex2g4s.h()) {
      var item = _iterator__ex2g4s.i();
      var tmp$ret$2 = item.oi_1;
      destination.f(tmp$ret$2);
    }
    $this$obj.tt('ids', destination);
    $this$obj.pt('pinCount', $s.tm_1.l());
    $this$obj.tt('focus', listOf_0([$s.wm_1.jm_1, $s.wm_1.km_1, $s.wm_1.lm_1, $s.wm_1.mm_1]));
    $this$obj.nt('parts', $s.um_1, WebBridge$resultJson$lambda$lambda$lambda$lambda_0);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_4($this$arr, q) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda_3(q));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda_3($q) {
  return function ($this$obj) {
    $this$obj.qt('id', $q.kd_1.n1_1);
    $this$obj.qt('title', $q.kd_1.fd_1);
    $this$obj.qt('badge', $q.kd_1.gd_1);
    $this$obj.rt('total', $q.ld_1);
    $this$obj.rt('save', $q.od_1);
    $this$obj.qt('url', $q.pd_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda$lambda_5($this$arr, s) {
  $this$arr.ot(WebBridge$resultJson$lambda$lambda$lambda_4(s));
  return Unit_instance;
}
function WebBridge$resultJson$lambda$lambda$lambda_4($s) {
  return function ($this$obj) {
    $this$obj.qt('title', $s.sd_1);
    $this$obj.qt('detail', $s.td_1);
    $this$obj.rt('save', $s.ud_1);
    return Unit_instance;
  };
}
function WebBridge$resultJson$lambda($r, $quotes, $suggestions) {
  return function ($this$obj) {
    $this$obj.pt('width', $r.cg_1);
    $this$obj.pt('height', $r.dg_1);
    // Inline function 'kotlin.collections.asList' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = $r.eg_1;
    var tmp$ret$0 = asList(tmp$ret$1);
    $this$obj.tt('grid', tmp$ret$0);
    // Inline function 'kotlin.collections.flatMap' call
    var tmp0 = plus($r.gg_1, $r.fg_1);
    // Inline function 'kotlin.collections.flatMapTo' call
    var destination = ArrayList_init_$Create$();
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      var list = listOf_0([element.oi_1, element.ri_1, element.si_1, element.ti_1, element.ui_1, element.qi_1.xe_1, element.vi_1, element.pi_1.he_1 ? 1 : 0, element.pi_1.ge_1 ? 1 : 0]);
      addAll(destination, list);
    }
    $this$obj.tt('pieces', destination);
    $this$obj.nt('pins', $r.hg_1, WebBridge$resultJson$lambda$lambda);
    $this$obj.nt('bom', $r.kg_1, WebBridge$resultJson$lambda$lambda_0);
    $this$obj.ut('pricing');
    $this$obj.ot(WebBridge$resultJson$lambda$lambda_1($r));
    $this$obj.ut('validation');
    $this$obj.ot(WebBridge$resultJson$lambda$lambda_2($r));
    $this$obj.nt('steps', $r.jg_1, WebBridge$resultJson$lambda$lambda_3);
    $this$obj.nt('quotes', $quotes, WebBridge$resultJson$lambda$lambda_4);
    $this$obj.nt('suggestions', $suggestions, WebBridge$resultJson$lambda$lambda_5);
    return Unit_instance;
  };
}
function canonical$d(v) {
  return toString_2(toRawBits(v), 16);
}
function canonical$piece(p) {
  return '' + p.oi_1 + ',' + p.pi_1.n1_1 + ',' + p.qi_1.xe_1 + ',' + p.ri_1 + ',' + p.si_1 + ',' + p.ti_1 + ',' + p.ui_1 + ',' + p.vi_1 + ',' + p.wi_1 + ',' + p.xi_1 + ',' + p.yi_1.n1_1 + ',' + p.zi_1 + ',' + canonical$d(p.aj_1) + ',' + canonical$d(p.bj_1);
}
function canonical$line(l) {
  var tmp = canonical$d(l.qe_1);
  var tmp_0 = canonical$d(l.re_1);
  var tmp_1 = canonical$d(l.se_1);
  var tmp_2 = canonical$d(l.te_1);
  var tmp0_safe_receiver = l.ve_1;
  return l.le_1.n1_1 + ',' + l.me_1.xe_1 + ',' + l.ne_1 + ',' + l.oe_1.n1_1 + ',' + l.pe_1 + ',' + tmp + ',' + tmp_0 + ',' + tmp_1 + ',' + tmp_2 + ',' + l.ue_1 + ',' + (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.xe_1) + ',' + canonical$d(l.we_1);
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
  return new WebConfig(w, h, style.n1_1, backing.n1_1, palette.n1_1, rarity.n1_1, tol, dither, legal, br, con, sat);
}
function WebBridge() {
  this.jt_1 = null;
  this.kt_1 = null;
}
protoOf(WebBridge).vt = function (argb, width, height, config) {
  // Inline function 'kotlin.require' call
  if (!((1 <= width ? width <= 4096 : false) && (1 <= height ? height <= 4096 : false) && argb.length === imul_0(width, height))) {
    var message = 'Invalid image buffer';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.also' call
  var this_0 = MosaicConverterEngine_instance.tj(new Bitmap(width, height, argb), config.it());
  WebBridge_instance.jt_1 = this_0;
  return this_0;
};
protoOf(WebBridge).wt = function (grid, config) {
  var cfg = config.it();
  var tmp;
  if (grid.length === imul_0(cfg.og_1, cfg.pg_1)) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.all' call
      var inductionVariable = 0;
      var last = grid.length;
      while (inductionVariable < last) {
        var element = grid[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.contains' call
        // Inline function 'kotlin.collections.containsKey' call
        var this_0 = BrickCatalog_getInstance().qh_1;
        if (!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).i1(element)) {
          tmp$ret$0 = false;
          break $l$block;
        }
      }
      tmp$ret$0 = true;
    }
    tmp = tmp$ret$0;
  } else {
    tmp = false;
  }
  // Inline function 'kotlin.require' call
  if (!tmp) {
    var message = 'Invalid grid';
    throw IllegalArgumentException_init_$Create$_0(toString_1(message));
  }
  // Inline function 'kotlin.also' call
  var this_1 = MosaicConverterEngine_instance.vj(grid, cfg);
  WebBridge_instance.jt_1 = this_1;
  return this_1;
};
protoOf(WebBridge).xt = function (kind_0, title) {
  return ProExports_instance.vs(title, current(this), kind(this, kind_0));
};
protoOf(WebBridge).yt = function (kind_0, title) {
  return ProExports_instance.gs(title, current(this), kind(this, kind_0));
};
protoOf(WebBridge).zt = function (query, palette, tier) {
  var tmp = BrickColorQuery_instance;
  var tmp0 = get_entries_2();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === palette) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    tmp$ret$0 = null;
  }
  var tmp_0 = tmp$ret$0;
  var tmp0_0 = get_entries_1();
  var tmp$ret$2;
  $l$block_0: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s_0 = tmp0_0.g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      if (element_0.n1_1 === tier) {
        tmp$ret$2 = element_0;
        break $l$block_0;
      }
    }
    tmp$ret$2 = null;
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = tmp.bq(query, tmp_0, tmp$ret$2);
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s_1 = this_0.g();
  while (_iterator__ex2g4s_1.h()) {
    var item = _iterator__ex2g4s_1.i();
    var tmp$ret$6 = item.xe_1;
    destination.f(tmp$ret$6);
  }
  return toIntArray(destination);
};
protoOf(WebBridge).au = function (rgb, palette) {
  var tmp = BrickColorQuery_instance;
  var tmp_0 = rgb >> 16 & 255;
  var tmp_1 = rgb >> 8 & 255;
  var tmp_2 = rgb & 255;
  var tmp0 = get_entries_2();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === palette) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    tmp$ret$0 = null;
  }
  return tmp.cq(tmp_0, tmp_1, tmp_2, tmp$ret$0).xe_1;
};
protoOf(WebBridge).bu = function (width, height, original, current) {
  this.kt_1 = new MosaicEditSession(width, height, original, current);
};
protoOf(WebBridge).cu = function () {
  return edit(this).vq();
};
protoOf(WebBridge).du = function () {
  return edit(this).wq();
};
protoOf(WebBridge).eu = function (x0, y0, x1, y1, color, size, mirrorMode) {
  return edit(this).yq(x0, y0, x1, y1, paint(this, color), size, mirror(this, mirrorMode));
};
protoOf(WebBridge).fu = function (x, y, color, mirrorMode) {
  return edit(this).zq(x, y, color, mirror(this, mirrorMode));
};
protoOf(WebBridge).gu = function (from, to) {
  return edit(this).ar(from, to);
};
protoOf(WebBridge).hu = function (x0, y0, x1, y1, color, mirrorMode) {
  return edit(this).br(x0, y0, x1, y1, paint(this, color), mirror(this, mirrorMode));
};
protoOf(WebBridge).iu = function () {
  return edit(this).cr();
};
protoOf(WebBridge).ju = function () {
  return edit(this).dr();
};
protoOf(WebBridge).ku = function () {
  return edit(this).er();
};
protoOf(WebBridge).lu = function () {
  return edit(this).qq();
};
protoOf(WebBridge).mu = function () {
  // Inline function 'kotlin.let' call
  var it = edit(this);
  // Inline function 'kotlin.intArrayOf' call
  return new Int32Array([it.rq() ? 1 : 0, it.sq() ? 1 : 0, it.tq() ? 1 : 0, it.uq()]);
};
protoOf(WebBridge).nu = function (argb, width, height, op, l, t, r, b) {
  var src = new PixelImage(width, height, argb);
  var tmp;
  switch (op) {
    case 'rotateLeft':
      tmp = ImageTweaks_instance.jr(src);
      break;
    case 'rotateRight':
      tmp = ImageTweaks_instance.ir(src);
      break;
    case 'flipH':
      tmp = ImageTweaks_instance.kr(src);
      break;
    case 'flipV':
      tmp = ImageTweaks_instance.lr(src);
      break;
    case 'crop':
      tmp = ImageTweaks_instance.mr(src, l, t, r, b);
      break;
    default:
      // Inline function 'kotlin.error' call

      var message = 'Unknown tweak';
      throw IllegalStateException_init_$Create$_0(toString_1(message));
  }
  var out = tmp;
  // Inline function 'kotlin.intArrayOf' call
  var tmp0 = new Int32Array([out.fr_1, out.gr_1]);
  // Inline function 'kotlin.collections.plus' call
  var elements = out.hr_1;
  return primitiveArrayConcat([tmp0, elements]);
};
protoOf(WebBridge).ou = function (format) {
  var tmp = MosaicExporter_getInstance();
  var tmp_0 = current(this);
  var tmp0 = get_entries_0();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === format) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.jk(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).pu = function (format) {
  var tmp = MosaicExporter_getInstance();
  var tmp_0 = current(this);
  var tmp0 = get_entries_0();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === format) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.dk(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).qu = function (marketplace) {
  var tmp = MarketplaceCartBuilder_instance;
  var tmp_0 = current(this);
  var tmp0 = get_entries();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === marketplace) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.zf(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).ru = function (marketplace) {
  var tmp = MarketplaceCartBuilder_instance;
  var tmp_0 = current(this);
  var tmp0 = get_entries();
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlin.collections.first' call
    var _iterator__ex2g4s = tmp0.g();
    while (_iterator__ex2g4s.h()) {
      var element = _iterator__ex2g4s.i();
      if (element.n1_1 === marketplace) {
        tmp$ret$0 = element;
        break $l$block;
      }
    }
    throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
  }
  return tmp.ag(tmp_0, tmp$ret$0);
};
protoOf(WebBridge).su = function () {
  return MosaicExporter_getInstance().kk(current(this));
};
protoOf(WebBridge).tu = function () {
  var tmp = Companion_instance_13;
  return tmp.uu(WebBridge$catalogJson$lambda);
};
protoOf(WebBridge).vu = function (r) {
  var quotes = MarketplaceCartBuilder_instance.wf(r, PickABrickRegion_US_getInstance());
  var suggestions = MarketplaceCartBuilder_instance.ng(r);
  var tmp = Companion_instance_13;
  return tmp.uu(WebBridge$resultJson$lambda(r, quotes, suggestions));
};
protoOf(WebBridge).wu = function (r) {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$_0();
  var tmp0 = this_0.r5('grid ');
  // Inline function 'kotlin.text.appendLine' call
  var value = joinToString_0(r.eg_1, ',');
  // Inline function 'kotlin.text.appendLine' call
  tmp0.r5(value).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = r.gg_1.g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    var tmp0_0 = this_0.r5('B ');
    // Inline function 'kotlin.text.appendLine' call
    var value_0 = canonical$piece(element);
    // Inline function 'kotlin.text.appendLine' call
    tmp0_0.r5(value_0).s5(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_0 = r.fg_1.g();
  while (_iterator__ex2g4s_0.h()) {
    var element_0 = _iterator__ex2g4s_0.i();
    var tmp0_1 = this_0.r5('P ');
    // Inline function 'kotlin.text.appendLine' call
    var value_1 = canonical$piece(element_0);
    // Inline function 'kotlin.text.appendLine' call
    tmp0_1.r5(value_1).s5(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_1 = r.hg_1.g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    this_0.r5('T ' + canonical$d(element_1.cm_1) + ',' + canonical$d(element_1.dm_1) + ',' + element_1.em_1 + '\n');
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_2 = r.kg_1.g();
  while (_iterator__ex2g4s_2.h()) {
    var element_2 = _iterator__ex2g4s_2.i();
    var tmp0_2 = this_0.r5('L ');
    // Inline function 'kotlin.text.appendLine' call
    var value_2 = canonical$line(element_2);
    // Inline function 'kotlin.text.appendLine' call
    tmp0_2.r5(value_2).s5(_Char___init__impl__6a9atx(10));
  }
  var p = r.lg_1;
  // Inline function 'kotlin.text.appendLine' call
  var value_3 = 'price ' + canonical$d(p.dh_1) + ',' + canonical$d(p.eh_1) + ',' + canonical$d(p.fh_1) + ',' + canonical$d(p.gh_1) + ',' + canonical$d(p.hh_1) + ',' + canonical$d(p.ih_1) + ',' + canonical$d(p.jh_1) + ',' + p.kh_1 + ',' + p.lh_1 + ',' + p.mh_1 + ',' + p.nh_1 + ',' + p.oh_1;
  // Inline function 'kotlin.text.appendLine' call
  this_0.r5(value_3).s5(_Char___init__impl__6a9atx(10));
  var v = r.ig_1;
  // Inline function 'kotlin.text.appendLine' call
  var value_4 = 'valid ' + v.qk_1 + ',' + v.rk_1 + ',' + v.tk_1 + ',' + v.uk_1 + ',' + v.vk_1 + ',' + v.wk_1 + ',' + v.xk_1 + ',' + v.yk_1;
  // Inline function 'kotlin.text.appendLine' call
  this_0.r5(value_4).s5(_Char___init__impl__6a9atx(10));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_3 = v.sk_1.g();
  while (_iterator__ex2g4s_3.h()) {
    var element_3 = _iterator__ex2g4s_3.i();
    // Inline function 'kotlin.text.appendLine' call
    var value_5 = 'C ' + element_3.dj_1 + '|' + element_3.ej_1.toString() + '|' + element_3.gj_1 + '|' + element_3.hj_1 + '|' + element_3.ij_1 + '|' + element_3.jj_1 + '|' + element_3.kj_1 + '|' + element_3.mj_1;
    // Inline function 'kotlin.text.appendLine' call
    this_0.r5(value_5).s5(_Char___init__impl__6a9atx(10));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_4 = r.jg_1.g();
  while (_iterator__ex2g4s_4.h()) {
    var element_4 = _iterator__ex2g4s_4.i();
    // Inline function 'kotlin.collections.map' call
    var this_1 = element_4.sm_1;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_5 = this_1.g();
    while (_iterator__ex2g4s_5.h()) {
      var item = _iterator__ex2g4s_5.i();
      var tmp$ret$31 = item.oi_1;
      destination.f(tmp$ret$31);
    }
    // Inline function 'kotlin.text.appendLine' call
    var value_6 = 'S ' + element_4.nm_1 + '|' + element_4.om_1 + '|' + element_4.pm_1 + '|' + element_4.qm_1 + '|' + element_4.rm_1 + '|' + toString_1(destination) + '|' + element_4.tm_1.l() + '|' + element_4.vm_1.l() + '|' + element_4.wm_1.toString();
    // Inline function 'kotlin.text.appendLine' call
    this_0.r5(value_6).s5(_Char___init__impl__6a9atx(10));
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_6 = element_4.um_1.g();
    while (_iterator__ex2g4s_6.h()) {
      var element_5 = _iterator__ex2g4s_6.i();
      var tmp0_3 = this_0.r5('SP ');
      // Inline function 'kotlin.text.appendLine' call
      var value_7 = canonical$line(element_5);
      // Inline function 'kotlin.text.appendLine' call
      tmp0_3.r5(value_7).s5(_Char___init__impl__6a9atx(10));
    }
  }
  // Inline function 'kotlin.collections.forEach' call
  // Inline function 'kotlin.collections.iterator' call
  var _iterator__ex2g4s_7 = r.mg_1.m1().g();
  while (_iterator__ex2g4s_7.h()) {
    var element_6 = _iterator__ex2g4s_7.i();
    // Inline function 'kotlin.collections.component1' call
    var k = element_6.g1();
    // Inline function 'kotlin.collections.component2' call
    var n = element_6.h1();
    // Inline function 'kotlin.text.appendLine' call
    var value_8 = 'N ' + k + '=' + n;
    // Inline function 'kotlin.text.appendLine' call
    this_0.r5(value_8).s5(_Char___init__impl__6a9atx(10));
  }
  return this_0.toString();
};
protoOf(WebBridge).xu = function () {
  // Inline function 'kotlin.collections.buildList' call
  // Inline function 'kotlin.collections.buildListInternal' call
  // Inline function 'kotlin.apply' call
  var this_0 = ArrayList_init_$Create$();
  this_0.f(to('default', parityConfigs$c()));
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = get_entries_3().g();
  while (_iterator__ex2g4s.h()) {
    var element = _iterator__ex2g4s.i();
    // Inline function 'kotlin.collections.forEach' call
    var _iterator__ex2g4s_0 = get_entries_4().g();
    while (_iterator__ex2g4s_0.h()) {
      var element_0 = _iterator__ex2g4s_0.i();
      this_0.f(to('style-' + element.n1_1 + '-' + element_0.n1_1, parityConfigs$c(48, 32, element, element_0)));
    }
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_1 = get_entries_2().g();
  while (_iterator__ex2g4s_1.h()) {
    var element_1 = _iterator__ex2g4s_1.i();
    this_0.f(to('palette-' + element_1.n1_1, parityConfigs$c(VOID, VOID, VOID, VOID, element_1, RarityPreference_ALLOW_RARE_getInstance())));
  }
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s_2 = get_entries_5().g();
  while (_iterator__ex2g4s_2.h()) {
    var element_2 = _iterator__ex2g4s_2.i();
    this_0.f(to('rarity-' + element_2.n1_1, parityConfigs$c(VOID, VOID, VOID, VOID, PalettePreset_FULL_ARCHIVE_WITH_RARE_getInstance(), element_2)));
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
  return this_0.c3();
};
var WebBridge_instance;
function WebBridge_getInstance() {
  return WebBridge_instance;
}
function comma($this) {
  if (!$this.mt_1) {
    $this.lt_1.s5(_Char___init__impl__6a9atx(44));
  }
  $this.mt_1 = false;
}
function quote($this, s) {
  $this.lt_1.s5(_Char___init__impl__6a9atx(34));
  var inductionVariable = 0;
  var last = s.length;
  while (inductionVariable < last) {
    var ch = charCodeAt(s, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    if (ch === _Char___init__impl__6a9atx(34))
      $this.lt_1.r5('\\"');
    else {
      if (ch === _Char___init__impl__6a9atx(92))
        $this.lt_1.r5('\\\\');
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
          var tmp_1 = $this.lt_1.r5('\\u');
          // Inline function 'kotlin.code' call
          var tmp$ret$1 = Char__toInt_impl_vasixd(ch);
          tmp_1.r5(padStart(toString_3(tmp$ret$1, 16), 4, _Char___init__impl__6a9atx(48)));
        } else {
          $this.lt_1.s5(ch);
        }
      }
    }
  }
  $this.lt_1.s5(_Char___init__impl__6a9atx(34));
}
function Companion_13() {
}
protoOf(Companion_13).uu = function (block) {
  // Inline function 'kotlin.also' call
  var this_0 = StringBuilder_init_$Create$_0();
  (new Json(this_0)).ot(block);
  return this_0.toString();
};
var Companion_instance_13;
function Companion_getInstance_13() {
  return Companion_instance_13;
}
function Json(out) {
  this.lt_1 = out;
  this.mt_1 = true;
}
protoOf(Json).ut = function (name) {
  comma(this);
  quote(this, name);
  this.lt_1.s5(_Char___init__impl__6a9atx(58));
  this.mt_1 = true;
};
protoOf(Json).qt = function (k, v) {
  this.ut(k);
  quote(this, v);
  this.mt_1 = false;
};
protoOf(Json).pt = function (k, v) {
  this.ut(k);
  this.lt_1.p7(v);
  this.mt_1 = false;
};
protoOf(Json).rt = function (k, v) {
  this.ut(k);
  this.lt_1.r5(isFinite(v) ? v.toString() : '0');
  this.mt_1 = false;
};
protoOf(Json).st = function (k, v) {
  this.ut(k);
  this.lt_1.o7(v);
  this.mt_1 = false;
};
protoOf(Json).tt = function (k, v) {
  this.ut(k);
  this.lt_1.s5(_Char___init__impl__6a9atx(91));
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = v.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    if (checkIndexOverflow(_unary__edvuaz) > 0) {
      this.lt_1.s5(_Char___init__impl__6a9atx(44));
    }
    this.lt_1.p7(item);
  }
  this.lt_1.s5(_Char___init__impl__6a9atx(93));
  this.mt_1 = false;
};
protoOf(Json).ot = function (block) {
  this.lt_1.s5(_Char___init__impl__6a9atx(123));
  this.mt_1 = true;
  block(this);
  this.lt_1.s5(_Char___init__impl__6a9atx(125));
  this.mt_1 = false;
};
protoOf(Json).nt = function (k, items, item) {
  this.ut(k);
  this.lt_1.s5(_Char___init__impl__6a9atx(91));
  // Inline function 'kotlin.collections.forEachIndexed' call
  var index = 0;
  var _iterator__ex2g4s = items.g();
  while (_iterator__ex2g4s.h()) {
    var item_0 = _iterator__ex2g4s.i();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    if (checkIndexOverflow(_unary__edvuaz) > 0) {
      this.lt_1.s5(_Char___init__impl__6a9atx(44));
    }
    this.mt_1 = true;
    item(this, item_0);
  }
  this.lt_1.s5(_Char___init__impl__6a9atx(93));
  this.mt_1 = false;
};
function catalogJson() {
  return WebBridge_instance.tu();
}
function convertMosaic(argb, width, height, gridW, gridH, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation) {
  return WebBridge_instance.vu(WebBridge_instance.vt(argb, width, height, new WebConfig(gridW, gridH, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation)));
}
function rebuildMosaic(grid, gridW, gridH, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation) {
  return WebBridge_instance.vu(WebBridge_instance.wt(grid, new WebConfig(gridW, gridH, style, backing, palette, rarity, tolerance, dither, legal, brightness, contrast, saturation)));
}
function exportProBytes(kind, title) {
  return WebBridge_instance.xt(kind, title);
}
function exportProName(kind, title) {
  return WebBridge_instance.yt(kind, title);
}
function searchColors(query, palette, tier) {
  return WebBridge_instance.zt(query, palette, tier);
}
function nearestColor(rgb, palette) {
  return WebBridge_instance.au(rgb, palette);
}
function editOpen(width, height, original, current) {
  return WebBridge_instance.bu(width, height, original, current);
}
function editBegin() {
  return WebBridge_instance.cu();
}
function editEnd() {
  return WebBridge_instance.du();
}
function editLine(x0, y0, x1, y1, color, size, mirror) {
  return WebBridge_instance.eu(x0, y0, x1, y1, color, size, mirror);
}
function editFill(x, y, color, mirror) {
  return WebBridge_instance.fu(x, y, color, mirror);
}
function editReplace(from, to) {
  return WebBridge_instance.gu(from, to);
}
function editRect(x0, y0, x1, y1, color, mirror) {
  return WebBridge_instance.hu(x0, y0, x1, y1, color, mirror);
}
function editUndo() {
  return WebBridge_instance.iu();
}
function editRedo() {
  return WebBridge_instance.ju();
}
function editRevert() {
  return WebBridge_instance.ku();
}
function editGrid() {
  return WebBridge_instance.lu();
}
function editFlags() {
  return WebBridge_instance.mu();
}
function tweakImage(argb, width, height, op, l, t, r, b) {
  return WebBridge_instance.nu(argb, width, height, op, l, t, r, b);
}
function exportCsv(format) {
  return WebBridge_instance.ou(format);
}
function exportCsvName(format) {
  return WebBridge_instance.pu(format);
}
function exportCart(marketplace) {
  return WebBridge_instance.qu(marketplace);
}
function exportCartName(marketplace) {
  return WebBridge_instance.ru(marketplace);
}
function exportSummary() {
  return WebBridge_instance.su();
}
function parityRun(argb, width, height) {
  // Inline function 'kotlin.collections.map' call
  var this_0 = WebBridge_instance.xu();
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.g();
  while (_iterator__ex2g4s.h()) {
    var item = _iterator__ex2g4s.i();
    var name = item.da();
    var cfg = item.ea();
    var tmp$ret$2 = name + '\n' + WebBridge_instance.wu(WebBridge_instance.vt(argb, width, height, cfg));
    destination.f(tmp$ret$2);
  }
  // Inline function 'kotlin.collections.toTypedArray' call
  return copyToArray(destination);
}
function isImageRequest(text) {
  return ImageRequestParser_getInstance().ml(text);
}
function orderTextModels(ids, preferred) {
  // Inline function 'kotlin.collections.toTypedArray' call
  var this_0 = GeminiModelFailover_getInstance().cl(toList(ids), preferred);
  return copyToArray(this_0);
}
function orderImageModels(ids) {
  // Inline function 'kotlin.collections.toTypedArray' call
  var this_0 = GeminiModelFailover_getInstance().dl(toList(ids));
  return copyToArray(this_0);
}
function canTryNextModel(code, body) {
  return GeminiModelFailover_getInstance().el(code, body);
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
protoOf(InternalHashMap).y3 = containsAllEntries;
//endregion
//region block: init
Companion_instance_0 = new Companion_0();
Unit_instance = new Unit();
_stableSortingIsSupported = null;
Companion_instance_3 = new Companion_3();
CompletedContinuation_instance = new CompletedContinuation();
Companion_instance_5 = new Companion_5();
Companion_instance_6 = new Companion_6();
Companion_instance_7 = new Companion_7();
EmptyIterator_instance = new EmptyIterator();
Key_instance = new Key();
Companion_instance_10 = new Companion_10();
Companion_instance_11 = new Companion_11();
MarketplaceCartBuilder_instance = new MarketplaceCartBuilder();
MosaicConverterEngine_instance = new MosaicConverterEngine();
ZipArchive_instance = new ZipArchive();
PngEncoder_instance = new PngEncoder();
InstructionPdf_instance = new InstructionPdf();
MosaicRasterSize_instance = new MosaicRasterSize();
BrickColorQuery_instance = new BrickColorQuery();
ImageTweaks_instance = new ImageTweaks();
ExportText_instance = new ExportText();
LDrawModel_instance = new LDrawModel();
StudioPackage_instance = new StudioPackage();
ProExports_instance = new ProExports();
Color_instance = new Color();
WebBridge_instance = new WebBridge();
Companion_instance_13 = new Companion_13();
//endregion
//region block: exports
export {
  catalogJson as catalogJson,
  convertMosaic as convertMosaic,
  rebuildMosaic as rebuildMosaic,
  exportProBytes as exportProBytes,
  exportProName as exportProName,
  searchColors as searchColors,
  nearestColor as nearestColor,
  editOpen as editOpen,
  editBegin as editBegin,
  editEnd as editEnd,
  editLine as editLine,
  editFill as editFill,
  editReplace as editReplace,
  editRect as editRect,
  editUndo as editUndo,
  editRedo as editRedo,
  editRevert as editRevert,
  editGrid as editGrid,
  editFlags as editFlags,
  tweakImage as tweakImage,
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

