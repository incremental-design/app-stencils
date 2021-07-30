(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["component-base"] = factory(require("vue"));
	else
		root["component-base"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "129f":
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2b19":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var is = __webpack_require__("129f");

// `Object.is` method
// https://tc39.es/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__("7b0b");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "60e9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_BaseComponent_vue_vue_type_style_index_0_id_145b1fec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9bce");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_BaseComponent_vue_vue_type_style_index_0_id_145b1fec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_BaseComponent_vue_vue_type_style_index_0_id_145b1fec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9bce":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/BaseComponent.vue?vue&type=template&id=145b1fec&scoped=true


var _withId = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withScopeId"])("data-v-145b1fec");

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toHandlers"])(_ctx.EventHandlers), [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "default", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.DataAndComputed.pointer), 1)];
  }, {}, true)], 16);
});
// CONCATENATED MODULE: ./src/BaseComponent.vue?vue&type=template&id=145b1fec&scoped=true

// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/Utils/Listener.ts

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.is.js
var es_object_is = __webpack_require__("2b19");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/Utils/PointerCoordinates.ts


function getPointerCoordinates(event, previous) {
  var getTarget = function getTarget() {
    if (event.target instanceof HTMLElement) {
      var ET = event.target;
      return {
        width: ET.offsetWidth,
        height: ET.offsetHeight,
        getBoundingClientRect: function getBoundingClientRect() {
          return ET.getBoundingClientRect();
        }
      };
    } else {
      return {
        width: false,
        height: false
      };
    }
  };

  var Target = getTarget();

  var previousHasSameTarget = function previousHasSameTarget() {
    return event.target instanceof EventTarget && previous && previous.event.target instanceof EventTarget ? Object.is(event.target, previous.event.target) : false;
  };

  var MillisecondsElapsedSincePrevious = previous && previousHasSameTarget() ? event.timeStamp - previous.event.timeStamp : false;
  var getCoordinates = {
    mouse: function mouse(e) {
      // first, we get the required properties of the PointerCoordinates type
      var Coordinates = {
        event: e,
        relative: {
          x: e.offsetX,
          y: e.offsetY
        },
        numberOfTouchPoints: 0
      }; // then, we get all of the optional properties

      if (MillisecondsElapsedSincePrevious) {
        Coordinates.viewport = {
          dx: e.movementX / MillisecondsElapsedSincePrevious * 1000,
          dy: e.movementY / MillisecondsElapsedSincePrevious * 1000
        };
      }

      if (Target.width) {
        Coordinates.relative.xPercent = Coordinates.relative.x / Target.width;

        if (Coordinates.viewport && typeof Coordinates.viewport.dx === 'number') {
          Coordinates.relative.dxPercent = Coordinates.viewport.dx / Target.width;
        }
      }

      if (Target.height) {
        Coordinates.relative.yPercent = Coordinates.relative.y / Target.height;

        if (Coordinates.viewport && typeof Coordinates.viewport.dy === 'number') {
          Coordinates.relative.dyPercent = Coordinates.viewport.dy / Target.height;
        }
      }

      return Coordinates;
    },
    touch: function touch(e) {
      var P = previous || false;
      var PreviousTouchEvent = P && P.event instanceof TouchEvent ? P.event : false;

      if (e.targetTouches.length > 0) {
        // we can short-circuit all of the following calculations if there are no touch points, because we can simply re-use `P`, the previous touch coordinates, if they are available.
        var getTouchPoints = function getTouchPoints() {
          var TouchPoints = {};

          var supportsTouchIdentifier = function supportsTouchIdentifier() {
            // unfortunately not all browsers support Touch.identifier (see: https://developer.mozilla.org/en-US/docs/Web/API/Touch/identifier), so we need to do a litmus test before we run the for loop.
            var FirstTouch = e.targetTouches.item(0);
            return typeof (FirstTouch === null || FirstTouch === void 0 ? void 0 : FirstTouch.identifier) === 'number' ? true : false;
          };

          var DoesSupportTouchIdentifier = supportsTouchIdentifier();

          var getAllPreviousTouches = function getAllPreviousTouches() {
            if (PreviousTouchEvent && DoesSupportTouchIdentifier) {
              var _PreviousTouches = {};

              for (var Index = 0; Index < PreviousTouchEvent.targetTouches.length; Index++) {
                var PreviousTouch = PreviousTouchEvent.targetTouches.item(Index);

                if (PreviousTouch) {
                  _PreviousTouches[PreviousTouch.identifier] = {
                    viewportX: PreviousTouch.clientX,
                    viewportY: PreviousTouch.clientY
                  };
                }
              }

              return _PreviousTouches;
            } else {
              return false;
            }
          };

          var PreviousTouches = getAllPreviousTouches();

          for (var Index = 0; Index < e.targetTouches.length; Index++) {
            var Touch = e.targetTouches.item(Index);

            if (Touch) {
              TouchPoints[Touch.identifier] = {
                current: {
                  viewportX: Touch.clientX,
                  viewportY: Touch.clientY
                }
              };

              if (PreviousTouches && PreviousTouches[Touch.identifier]) {
                TouchPoints[Touch.identifier].previous = PreviousTouches[Touch.identifier];
              }
            }
          }

          return TouchPoints;
        };

        var TouchPoints = getTouchPoints();

        var calculateTouchCenterpoint = function calculateTouchCenterpoint() {
          var BoundingRect = Target.getBoundingClientRect ? Target.getBoundingClientRect() : false;

          var calculateTargetScaleAndTranslate = function calculateTargetScaleAndTranslate() {
            if (Target.width !== false && Target.height !== false && BoundingRect) {
              var left = BoundingRect.left,
                  top = BoundingRect.top,
                  width = BoundingRect.width,
                  height = BoundingRect.height;
              Target.viewportTranslateX = left;
              Target.viewportTranslateY = top;
              Target.scaleX = Target.width === 0 ? 0 : width / Target.width;
              Target.scaleY = Target.height === 0 ? 0 : height / Target.height;
            }
          };

          calculateTargetScaleAndTranslate();
          var TouchPointIDs = Object.keys(TouchPoints);

          var calculateRelativeXY = function calculateRelativeXY(C) {
            if (typeof Target.scaleX === 'number' && typeof Target.scaleY === 'number' && typeof Target.viewportTranslateX === 'number' && typeof Target.viewportTranslateY === 'number') {
              C.relative = {
                x: (C.viewport.x - Target.viewportTranslateX) * Target.scaleX,
                y: (C.viewport.y - Target.viewportTranslateY) * Target.scaleY
              };
            }
          };

          switch (TouchPointIDs.length) {
            case 1:
              var getCenterpointOfOne = function getCenterpointOfOne() {
                var C = {
                  viewport: {
                    x: TouchPoints[TouchPointIDs[0]].current.viewportX,
                    y: TouchPoints[TouchPointIDs[0]].current.viewportY
                  }
                };
                calculateRelativeXY(C);
                return C;
              };

              return getCenterpointOfOne();

            case 2:
            case 3:
              // I know that this is hacky ... right now I'm ignoring the 3rd touch point entirely ... but it'll take me another day to write the code to handle this, and I don't have that time rn.
              var getCenterpointOfTwo = function getCenterpointOfTwo() {
                var Adjacent = TouchPoints[TouchPointIDs[1]].current.viewportX - TouchPoints[TouchPointIDs[0]].current.viewportX;
                var Opposite = TouchPoints[TouchPointIDs[1]].current.viewportY - TouchPoints[TouchPointIDs[0]].current.viewportY;

                var getPreviousOppositeAdjacent = function getPreviousOppositeAdjacent() {
                  function isTouchPointCoords(previous) {
                    if (previous) {
                      return previous.viewportX !== undefined && previous.viewportY !== undefined;
                    } else {
                      return false;
                    }
                  }

                  var P1 = TouchPoints[TouchPointIDs[1]].previous;
                  var P0 = TouchPoints[TouchPointIDs[0]].previous;

                  if (isTouchPointCoords(P1) && isTouchPointCoords(P0)) {
                    return {
                      PreviousAdjacent: P1.viewportX - P0.viewportX,
                      PreviousOpposite: P1.viewportY - P0.viewportY
                    };
                  } else {
                    return false;
                  }
                };

                var PreviousAdjacentOpposite = getPreviousOppositeAdjacent();
                var C = {
                  viewport: {
                    x: (TouchPoints[TouchPointIDs[0]].current.viewportX + TouchPoints[TouchPointIDs[1]].current.viewportX) / 2,
                    y: (TouchPoints[TouchPointIDs[0]].current.viewportY + TouchPoints[TouchPointIDs[1]].current.viewportY) / 2,
                    radius: Math.pow(Math.pow(Adjacent, 2) + Math.pow(Opposite, 2), 0.5) / 2
                  }
                };

                var calculateRotation = function calculateRotation() {
                  if (PreviousAdjacentOpposite) {
                    var PreviousAdjacent = PreviousAdjacentOpposite.PreviousAdjacent,
                        PreviousOpposite = PreviousAdjacentOpposite.PreviousOpposite;

                    var getSlopeInDegrees = function getSlopeInDegrees(Adjacent, Opposite) {
                      if (Adjacent === 0) {
                        // then slope is either 90 degrees or 270 degrees
                        if (Opposite === 0) {
                          // then there is no slope. Assume zero degrees.
                          return 0;
                        } else if (Opposite < 0) {
                          return 270;
                        } else {
                          return 90;
                        }
                      } else {
                        var Atan = Math.atan(Opposite / Adjacent);

                        if (Adjacent < 0) {
                          // then slope is between 90 and 270 degrees
                          if (Atan === 0) {
                            return 180;
                          } else {
                            // then slope is between 90 and 270 degrees
                            return 180 + 180 / Math.PI * Atan;
                          }
                        } else {
                          // then slope is between 0 and 90 degrees or 270 and 360 degrees
                          if (Atan === 0) {
                            return 0;
                          } else if (Atan > 0) {
                            // then slope is between 0 and 90 degrees
                            return 180 / Math.PI * Atan; // return 45; // correct
                          } else {
                            return 360 + 180 / Math.PI * Atan;
                          }
                        }
                      }
                    };

                    var Slope = getSlopeInDegrees(Adjacent, Opposite);
                    var PreviousSlope = getSlopeInDegrees(PreviousAdjacent, PreviousOpposite);
                    C.viewport.rotation = Slope - PreviousSlope;
                  }
                };

                calculateRotation();
                calculateRelativeXY(C);
                return C;
              };

              return getCenterpointOfTwo();
            // case 3:
            // do something else
            // const getCenterpointOfThree = (): Centerpoint => {};
            // return getCenterpointOfThree();

            default:
              throw new Error("I haven't implemented the smallest-enclosing-circle algorithm yet. Once I do, I will be able to calculate the centerpoint of a TouchEvent with ".concat(Object.keys(TouchPoints).length, " touch points."));
          }
        };

        var _calculateTouchCenter = calculateTouchCenterpoint(),
            viewport = _calculateTouchCenter.viewport,
            relative = _calculateTouchCenter.relative; // Finally, we populate and return the coordinates object


        var Coordinates = {
          event: e,
          relative: relative ? {
            x: relative.x,
            y: relative.y
          } : {
            x: viewport.x,
            y: viewport.y
          },
          numberOfTouchPoints: e.targetTouches.length
        };
        var Viewport = {
          x: viewport.x,
          y: viewport.y
        };

        if (typeof Target.width === 'number' && typeof Target.height === 'number' && relative) {
          Coordinates.relative.xPercent = relative.x / Target.width;
          Coordinates.relative.yPercent = relative.y / Target.height;

          if (previous && previous.viewport && MillisecondsElapsedSincePrevious) {
            if (previous.viewport.x) {
              var MovementX = viewport.x - previous.viewport.x;
              Viewport.dx = MovementX / MillisecondsElapsedSincePrevious * 1000;
              Coordinates.relative.dxPercent = Viewport.dx / Target.width;
            }

            if (previous.viewport.y) {
              var MovementY = viewport.y - previous.viewport.y;
              Viewport.dy = MovementY / MillisecondsElapsedSincePrevious * 1000;
              Coordinates.relative.dyPercent = Viewport.dy / Target.height;
            }
          }
        }

        if (viewport.radius) {
          Viewport.radius = viewport.radius;

          if (previous && previous.viewport && previous.viewport.radius) {
            Viewport.dRadius = viewport.radius - previous.viewport.radius;
          }
        }

        if (viewport.rotation && MillisecondsElapsedSincePrevious) {
          Viewport.dRotation = viewport.rotation / MillisecondsElapsedSincePrevious * 1000;
        }

        Coordinates.viewport = Viewport;
        return Coordinates;
      } else {
        if (P) {
          var _Coordinates = {
            event: e,
            relative: {
              x: P.relative.x,
              y: P.relative.y,
              dxPercent: 0,
              dyPercent: 0
            },
            viewport: {
              dx: 0,
              dy: 0
            },
            numberOfTouchPoints: 0
          };

          if (typeof P.relative.xPercent === 'number') {
            _Coordinates.relative.xPercent = P.relative.xPercent;
          }

          if (typeof P.relative.yPercent === 'number') {
            _Coordinates.relative.yPercent = P.relative.yPercent;
          }

          if (P.viewport && _Coordinates.viewport) {
            if (typeof P.viewport.x === 'number') {
              _Coordinates.viewport.x = P.viewport.x;
            }

            if (typeof P.viewport.y === 'number') {
              _Coordinates.viewport.y = P.viewport.y;
            }
          }

          if (P.viewport && typeof P.viewport.radius === 'number' && _Coordinates.viewport) {
            _Coordinates.viewport.radius = P.viewport.radius;
          }

          return _Coordinates;
        } else {
          throw new Error('a touchend or touchcancel event always follows a touchstart or touchmove event. Please supply the PointerCoordinates for the touchstart or touchmove event to the touchend and touchcancel event listener');
        }
      }
    }
  };

  if (event instanceof MouseEvent) {
    return getCoordinates.mouse(event);
  } else if (event instanceof TouchEvent) {
    return getCoordinates.touch(event);
  } else {
    throw new Error("".concat(event, " is not a MouseEvent or TouchEvent"));
  }
}
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/Utils/StopAndPrevent.ts
var stopAndPrevent = function stopAndPrevent(e) {
  var stopPropogation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var preventDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (stopPropogation) {
    e.stopPropagation();
  }

  if (preventDefault) {
    e.preventDefault();
  }
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/Utils/index.ts



// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/CompositionListeners.ts
 // !CompositionstartListener

/**
 * CompositionstartListener
 */

var CompositionListeners_CompositionstartListener = function CompositionstartListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !CompositionupdateListener

/**
 * CompositionupdateListener
 */

var CompositionListeners_CompositionupdateListener = function CompositionupdateListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !CompositionendListener

/**
 * CompositionendListener
 */

var CompositionListeners_CompositionendListener = function CompositionendListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/FocusListeners.ts
 // !FocusListener

/**
 * FocusListener
 */

var FocusListeners_FocusListener = function FocusListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !SelectListener

/**
 * SelectListener
 */

var FocusListeners_SelectListener = function SelectListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !FocusinListener

/**
 * FocusinListener
 */

var FocusListeners_FocusinListener = function FocusinListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !FocusoutListener

/**
 * FocusoutListener
 */

var FocusListeners_FocusoutListener = function FocusoutListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !BlurListener

/**
 * BlurListener
 */

var FocusListeners_blurListener = function blurListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/KeyboardListeners.ts
 // !KeydownListener

/**
 * KeydownListener
 */

var KeyboardListeners_KeydownListener = function KeydownListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !KeyupListener

/**
 * KeyupListener
 */

var KeyboardListeners_KeyupListener = function KeyupListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/MouseListeners.ts
 // !AuxclickListener

/**
 * AuxclickListener
 */

var MouseListeners_AuxclickListener = function AuxclickListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !DblclickListener

/**
 * DblclickListener
 */

var MouseListeners_DblclickListener = function DblclickListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !ClickListener

/**
 * ClickListener
 */

var MouseListeners_ClickListener = function ClickListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MousedownListener

/**
 * MousedownListener
 */

var MouseListeners_MousedownListener = function MousedownListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MouseenterListener

/**
 * MouseenterListener
 */

var MouseListeners_MouseenterListener = function MouseenterListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MouseleaveListener

/**
 * MouseleaveListener
 */

var MouseListeners_MouseleaveListener = function MouseleaveListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MousemoveListener

/**
 * MousemoveListener
 */

var MouseListeners_MousemoveListener = function MousemoveListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MouseoutListener

/**
 * MouseoutListener
 */

var MouseListeners_MouseoutListener = function MouseoutListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MouseoverListener

/**
 * MouseoverListener
 */

var MouseListeners_MouseoverListener = function MouseoverListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !MouseupListener

/**
 * MouseupListener
 */

var MouseListeners_MouseupListener = function MouseupListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !WebkitmouseforcedownListener

/**
 * WebkitmouseforcedownListener
 */

var MouseListeners_WebkitmouseforcedownListener = function WebkitmouseforcedownListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !ContextmenuListener

/**
 * ContextmenuListener
 */

var MouseListeners_ContextmenuListener = function ContextmenuListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !WheelListener

/**
 * WheelListener
 */

var MouseListeners_WheelListener = function WheelListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/PasteboardListeners.ts
 // !CutListener

/**
 * CutListener
 */

var PasteboardListeners_CutListener = function CutListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !CopyListener

/**
 * CopyListener
 */

var PasteboardListeners_CopyListener = function CopyListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !PasteListener

/**
 * PasteListener
 */

var PasteboardListeners_PasteListener = function PasteListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/ScrollListeners.ts
 // !ScrollListener

/**
 * ScrollListener
 */

var ScrollListeners_ScrollListener = function ScrollListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !OverflowListener

/**
 * OverflowListener
 */

var ScrollListeners_OverflowListener = function OverflowListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/TouchListeners.ts
 // !TouchstartListener

/**
 * TouchstartListener
 */

var TouchListeners_TouchstartListener = function TouchstartListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !TouchmoveListener

/**
 * TouchmoveListener
 */

var TouchListeners_TouchmoveListener = function TouchmoveListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !TouchendListener

/**
 * TouchendListener
 */

var TouchListeners_TouchendListener = function TouchendListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
}; // !TouchcancelListener

/**
 * TouchcancelListener
 */

var TouchListeners_TouchcancelListener = function TouchcancelListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
  return getPointerCoordinates(e, p);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/WindowListeners.ts
 // !ErrorListener

/**
 * ErrorListener
 */

var WindowListeners_ErrorListener = function ErrorListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !FullscreenchangeListener

/**
 * FullscreenchangeListener
 */

var WindowListeners_FullscreenchangeListener = function FullscreenchangeListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
}; // !FullscreenerrorListener

/**
 * FullscreenerrorListener
 */

var WindowListeners_FullscreenerrorListener = function FullscreenerrorListener(e, stopPropogation, preventDefault, p) {
  stopAndPrevent(e, stopPropogation, preventDefault);
};
// CONCATENATED MODULE: ./src/use/Seamlss/DOMEventListeners/index.ts







 // todo: recategorize according to https://developer.mozilla.org/en-US/docs/Web/Events ?
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/BaseComponent.vue?vue&type=script&lang=ts
/**
 * Base Component
 *
 * - native event handlers -> seamlss state changes + seamlss event emitters
 * - touch, tap and focus friendly
 * - animations for seamlss state changes
 * - optional 'spatial awareness' (ie the component can figure out where it is on screen, where it is relative to its containing dom node, where it is relative to its siblings)
 * - a11y and i18n friendly
 * - by default, no text should be selectable (because you can't select the text on a button) (user-select === none)
 */


/* harmony default export */ var BaseComponentvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  components: {// see: https://v3.vuejs.org/api/options-assets.html#components
    // List of components that have been imported into this file
  },
  props: {// see: https://v3.vuejs.org/api/options-data.html#props
    // prop
  },
  emits: {// see: https://v3.vuejs.org/api/options-data.html#emits
    // emit
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        emit = _ref.emit;
    // !Subroutines
    // Use any valid typescript to process the arguments of the setup function.
    // !Data and Computed Properties
    // Populate the DataAndComputed object by calling the subroutines defined above.
    var DataAndComputed = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
      // computedPropertyName:// computed()
      pointer: {
        isDown: false,
        downSince: false,
        coordinates: false
      }
    }); // !Methods
    // !Event Handlers

    var EventHandlers = {
      mousedown: function mousedown(e) {
        DataAndComputed.pointer.coordinates = MouseListeners_MousedownListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince = e.timeStamp;
      },
      mouseenter: function mouseenter(e) {
        DataAndComputed.pointer.coordinates = MouseListeners_MouseenterListener(e, true, true, DataAndComputed.pointer.coordinates);
      },
      mouseleave: function mouseleave(e) {
        DataAndComputed.pointer.coordinates = MouseListeners_MouseleaveListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },
      mousemove: function mousemove(e) {
        DataAndComputed.pointer.coordinates = MouseListeners_MousemoveListener(e, true, true, DataAndComputed.pointer.coordinates);
      },
      mouseup: function mouseup(e) {
        DataAndComputed.pointer.coordinates = MouseListeners_MouseupListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },
      // webkitmouseforcedown: (e) => {
      //   DataAndComputed.previousEvent = e;
      // },
      touchstart: function touchstart(e) {
        DataAndComputed.pointer.coordinates = TouchListeners_TouchstartListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince = e.timeStamp;
      },
      touchmove: function touchmove(e) {
        DataAndComputed.pointer.coordinates = TouchListeners_TouchmoveListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince = e.timeStamp;
      },
      touchend: function touchend(e) {
        DataAndComputed.pointer.coordinates = TouchListeners_TouchendListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },
      touchcancel: function touchcancel(e) {
        DataAndComputed.pointer.coordinates = TouchListeners_TouchcancelListener(e, true, true, DataAndComputed.pointer.coordinates);
        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      }
    }; // !Watchers
    // See: https://www.vuemastery.com/courses/vue-3-essentials/watch
    // watch()
    // !Lifecycle Hooks

    return {
      DataAndComputed: DataAndComputed,
      EventHandlers: EventHandlers
    };
  }
}));
// CONCATENATED MODULE: ./src/BaseComponent.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./src/BaseComponent.vue?vue&type=style&index=0&id=145b1fec&scoped=true&lang=css
var BaseComponentvue_type_style_index_0_id_145b1fec_scoped_true_lang_css = __webpack_require__("60e9");

// CONCATENATED MODULE: ./src/BaseComponent.vue





BaseComponentvue_type_script_lang_ts.render = render
BaseComponentvue_type_script_lang_ts.__scopeId = "data-v-145b1fec"

/* harmony default export */ var BaseComponent = (BaseComponentvue_type_script_lang_ts);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (BaseComponent);



/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=component-base.umd.js.map