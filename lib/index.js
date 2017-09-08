(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vue-property-decorator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(18)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MenuitemActivateEvent = (function () {
    function MenuitemActivateEvent(menuitem) {
        this.menuitem = menuitem;
    }
    MenuitemActivateEvent.type = 'menuitemactivate';
    return MenuitemActivateEvent;
}());
exports.MenuitemActivateEvent = MenuitemActivateEvent;
var MenuCloseEvent = (function () {
    function MenuCloseEvent(fromChild) {
        if (fromChild === void 0) { fromChild = false; }
        this.fromChild = fromChild;
    }
    MenuCloseEvent.type = 'menuclose';
    return MenuCloseEvent;
}());
exports.MenuCloseEvent = MenuCloseEvent;
var MenubaritemActivateEvent = (function () {
    function MenubaritemActivateEvent(menubaritem) {
        this.menubaritem = menubaritem;
    }
    MenubaritemActivateEvent.type = 'menubaritemactivate';
    return MenubaritemActivateEvent;
}());
exports.MenubaritemActivateEvent = MenubaritemActivateEvent;
var MenubarDactivateEvent = (function () {
    function MenubarDactivateEvent() {
    }
    MenubarDactivateEvent.type = 'menubardeactivate';
    return MenubarDactivateEvent;
}());
exports.MenubarDactivateEvent = MenubarDactivateEvent;
function once(target, type, handler) {
    var h = function (e) {
        handler(e);
        off();
    };
    var off = function () { target.removeEventListener(type, h); };
    target.addEventListener(type, h);
    return off;
}
exports.once = once;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_890e0a10_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(29);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_890e0a10_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/menu/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-890e0a10", Component.options)
  } else {
    hotAPI.reload("data-v-890e0a10", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(2);
var event_1 = __webpack_require__(5);
exports.PADDING = 4;
var MenuType = (function (_super) {
    tslib_1.__extends(MenuType, _super);
    function MenuType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOpen = false;
        _this.fade = 'none';
        _this.submenuPosition = 'right';
        return _this;
    }
    MenuType.prototype.open = function (x, y, position) {
        if (position === void 0) { position = 'right'; }
        this.setPosition(x, y, position);
        this.isOpen = true;
    };
    MenuType.prototype.close = function (fade, parent) {
        if (parent === void 0) { parent = false; }
        if (this.isOpen) {
            this.fade = fade ? 'fade' : 'none';
            this.isOpen = false;
            fade || (this.menuElement().style.display = 'none'); // vue synchronizes dom to vdom at several millisecond intervals
            this.$emit(event_1.MenuCloseEvent.type, new event_1.MenuCloseEvent(parent));
        }
        if (parent && this.parentMenuitem) {
            this.parentMenuitem.parentMenu.close(fade, true);
        }
    };
    MenuType.prototype.setPosition = function (x, y, position) {
        var _this = this;
        show([this.menuElement(), this.wrapperElement()], function (_a) {
            var menu = _a[0], wrapper = _a[1];
            var rect = menu.getBoundingClientRect();
            menu.style.maxHeight = window.innerHeight - 2 * exports.PADDING + "px";
            wrapper.style.left = (position == 'right' ? x : x - rect.width + 1) + "px";
            wrapper.style.top = y + "px";
            rect = menu.getBoundingClientRect();
            if (rect.bottom > window.innerHeight) {
                wrapper.style.top = window.innerHeight - rect.height + "px";
            }
            _this.submenuPosition = position;
            if (rect.right > window.innerWidth) {
                _this.submenuPosition = 'left';
                wrapper.style.left = x - rect.width - (_this.parentMenuitem ? _this.parentMenuitem.$el.clientWidth : 0) + "px";
            }
            if (rect.left < 0) {
                _this.submenuPosition = 'right';
                wrapper.style.left = x + (_this.parentMenuitem ? _this.parentMenuitem.$el.clientWidth : 0) + "px";
            }
        });
    };
    MenuType.prototype.menuElement = function () {
        return this.$refs.menu;
    };
    MenuType.prototype.wrapperElement = function () {
        return this.$refs.wrapper;
    };
    Object.defineProperty(MenuType.prototype, "style", {
        get: function () {
            return tslib_1.__assign({}, this.menuStyle.menu, { padding: exports.PADDING + "px 0" });
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        vue_property_decorator_1.Prop()
    ], MenuType.prototype, "parentMenuitem", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], MenuType.prototype, "menuStyle", void 0);
    MenuType = tslib_1.__decorate([
        vue_property_decorator_1.Component({
            provide: function () { return { parentMenu: this }; }
        })
    ], MenuType);
    return MenuType;
}(vue_property_decorator_1.Vue));
exports.MenuType = MenuType;
function show(targets, cb) {
    var originalStyle = targets.map(function (target) {
        var _a = target.style, display = _a.display, visibility = _a.visibility;
        target.style.display = 'block';
        target.style.visibility = 'visible';
        return { display: display, visibility: visibility };
    });
    cb(targets);
    targets.forEach(function (target, i) {
        var _a = originalStyle[i], display = _a.display, visibility = _a.visibility;
        target.style.display = display;
        target.style.visibility = visibility;
    });
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(2);
var event_1 = __webpack_require__(5);
var MenubarType = (function (_super) {
    tslib_1.__extends(MenubarType, _super);
    function MenubarType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.active = false;
        return _this;
    }
    MenubarType.prototype.deactivate = function () {
        this.active = false;
        this.$emit(event_1.MenubarDactivateEvent.type, new event_1.MenubarDactivateEvent());
        this.clearCancellers();
    };
    MenubarType.prototype.mousedown = function (mousedown) {
        var _this = this;
        if (this.active)
            return this.deactivate();
        this.active = true;
        this.clearCancellers();
        this.cancelMouseup = event_1.once(document, 'mouseup', function (mouseup) {
            if (mouseup.timeStamp - mousedown.timeStamp >= 500)
                _this.deactivate();
            else
                _this.cancelMousedown = event_1.once(document, 'mousedown', function () { return _this.deactivate(); });
        });
    };
    MenubarType.prototype.clearCancellers = function () {
        this.cancelMouseup && this.cancelMouseup();
        this.cancelMousedown && this.cancelMousedown();
    };
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], MenubarType.prototype, "menuStyle", void 0);
    MenubarType = tslib_1.__decorate([
        vue_property_decorator_1.Component({
            provide: function () {
                return { menubar: this };
            }
        })
    ], MenubarType);
    return MenubarType;
}(vue_property_decorator_1.Vue));
exports.MenubarType = MenubarType;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sync_1 = __webpack_require__(30);
exports.sync = new sync_1.Sync();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(2);
var script_1 = __webpack_require__(7);
var index_vue_1 = __webpack_require__(6);
var event_1 = __webpack_require__(5);
var global_1 = __webpack_require__(9);
var keybinder_1 = __webpack_require__(39);
var keybind = __webpack_require__(11);
var MenuitemType = (function (_super) {
    tslib_1.__extends(MenuitemType, _super);
    function MenuitemType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hover = false;
        return _this;
    }
    Object.defineProperty(MenuitemType.prototype, "keybindHTML", {
        get: function () {
            return this.keybind && keybind.html(this.keybind);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuitemType.prototype, "style", {
        get: function () {
            var _a = this.menuStyle, active = _a.active, disabled = _a.disabled;
            return tslib_1.__assign({}, (this.active ? active : {}), (this.disabled ? disabled : {}));
        },
        enumerable: true,
        configurable: true
    });
    MenuitemType.prototype.mounted = function () {
        var _this = this;
        this.parentMenu.$on(event_1.MenuitemActivateEvent.type, function (e) {
            e.menuitem != _this && _this.deactivate();
        });
        this.parentMenu.$on(event_1.MenuCloseEvent.type, function (e) {
            _this.hover = false;
            var childMenu = _this.childMenu();
            childMenu && childMenu.close(true);
        });
    };
    Object.defineProperty(MenuitemType.prototype, "active", {
        get: function () {
            var childMenu = this.childMenu();
            return this.hover || childMenu && childMenu.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    MenuitemType.prototype.activate = function () {
        this.parentMenu.$emit(event_1.MenuitemActivateEvent.type, new event_1.MenuitemActivateEvent(this));
        var childMenu = this.childMenu();
        if (childMenu) {
            var rect = this.$el.getBoundingClientRect();
            var submenuPosition = this.parentMenu.submenuPosition;
            childMenu.open(rect[submenuPosition], rect.top - script_1.PADDING, submenuPosition);
        }
    };
    MenuitemType.prototype.deactivate = function () {
        var childMenu = this.childMenu();
        childMenu && childMenu.close(false);
    };
    MenuitemType.prototype.fire = function () {
        var _this = this;
        global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.flash()];
                    case 1:
                        _a.sent();
                        this.$emit('click');
                        this.parentMenu.close(true, true);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    MenuitemType.prototype.childMenu = function () {
        var childMenu = this.$refs.childMenu;
        return childMenu ? childMenu : undefined;
    };
    MenuitemType.prototype.flash = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var d, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        d = 50;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 3)) return [3 /*break*/, 5];
                        this.hover = false;
                        return [4 /*yield*/, sleep(d)];
                    case 2:
                        _a.sent();
                        this.hover = true;
                        return [4 /*yield*/, sleep(d)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        ++i;
                        return [3 /*break*/, 1];
                    case 5:
                        this.hover = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuitemType.prototype.mouseenter = function (e) {
        var _this = this;
        this.disabled || global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.parentMenu.isOpen) {
                    this.hover = true;
                    this.activate();
                }
                return [2 /*return*/];
            });
        }); });
    };
    MenuitemType.prototype.mouseleave = function (e) {
        var _this = this;
        global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.parentMenu.isOpen && (this.hover = false);
                return [2 /*return*/];
            });
        }); });
    };
    MenuitemType.prototype.mouseup = function () {
        var _this = this;
        this.$slots.body || this.hover && global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.parentMenu.isOpen && (this.$slots.default || this.fire());
                return [2 /*return*/];
            });
        }); });
    };
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], MenuitemType.prototype, "parentMenu", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], MenuitemType.prototype, "menuStyle", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: String, required: true })
    ], MenuitemType.prototype, "label", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false })
    ], MenuitemType.prototype, "checked", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false })
    ], MenuitemType.prototype, "disabled", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: String })
    ], MenuitemType.prototype, "keybind", void 0);
    MenuitemType = tslib_1.__decorate([
        vue_property_decorator_1.Component({
            components: { XMenu: index_vue_1.default, XKeybinder: keybinder_1.Keybinder }
        })
    ], MenuitemType);
    return MenuitemType;
}(vue_property_decorator_1.Vue));
exports.MenuitemType = MenuitemType;
function sleep(duration) {
    return new Promise(function (resolve) { return setTimeout(resolve, duration); });
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@hscmap/keybind");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
module.exports = __webpack_require__(14);


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("es6-promise/auto");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_vue_1 = __webpack_require__(15);
exports.Menubar = index_vue_1.default;
var index_vue_2 = __webpack_require__(21);
exports.Menubaritem = index_vue_2.default;
var contextmenu_vue_1 = __webpack_require__(32);
exports.Contextmenu = contextmenu_vue_1.default;
var index_vue_3 = __webpack_require__(6);
exports.Menu = index_vue_3.default;
var index_vue_4 = __webpack_require__(35);
exports.Menuitem = index_vue_4.default;
var separator_vue_1 = __webpack_require__(41);
exports.Separator = separator_vue_1.default;
var script_1 = __webpack_require__(8);
exports.MenubarType = script_1.MenubarType;
var script_2 = __webpack_require__(7);
exports.MenuType = script_2.MenuType;
var script_3 = __webpack_require__(10);
exports.MenuitemType = script_3.MenuitemType;
var style_1 = __webpack_require__(46);
exports.StyleFactory = style_1.StyleFactory;
exports.StyleWhite = style_1.StyleWhite;
exports.StyleBlack = style_1.StyleBlack;
function install(vue, options) {
    if (options === void 0) { options = { prefix: 'hsc-' }; }
    var prefix = options.prefix;
    vue.component(prefix + "menubar", index_vue_1.default);
    vue.component(prefix + "menubaritem", index_vue_2.default);
    vue.component(prefix + "contextmenu", contextmenu_vue_1.default);
    vue.component(prefix + "menuitem", index_vue_4.default);
    vue.component(prefix + "menu-separator", separator_vue_1.default);
    vue.component(prefix + "menu-style-black", style_1.StyleBlack);
    vue.component(prefix + "menu-style-white", style_1.StyleWhite);
}
exports.install = install;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8f1fab1e_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(20);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(16)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8f1fab1e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8f1fab1e_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/menubar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8f1fab1e", Component.options)
  } else {
    hotAPI.reload("data-v-8f1fab1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("9b7b200e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8f1fab1e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8f1fab1e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.menubar[data-v-8f1fab1e] {\n  display: inline-block;\n  font-family: sans-serif;\n  padding: 0 0.5em;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: default;\n}\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = __webpack_require__(8);
exports.default = script_1.MenubarType;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menubar",
    style: (_vm.menuStyle.menubar),
    on: {
      "mousedown": function($event) {
        $event.preventDefault();
        _vm.mousedown($event)
      }
    }
  }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8f1fab1e", esExports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b0c0e278_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(31);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b0c0e278"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b0c0e278_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/menubaritem/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b0c0e278", Component.options)
  } else {
    hotAPI.reload("data-v-b0c0e278", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4330c288", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b0c0e278\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b0c0e278\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.menubaritem[data-v-b0c0e278] {\n  display: inline-block;\n  padding: 6pt 0.5em 4pt 0.5em;\n}\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = __webpack_require__(25);
exports.default = script_1.MenubaritemType;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(2);
var index_vue_1 = __webpack_require__(6);
var global_1 = __webpack_require__(9);
var event_1 = __webpack_require__(5);
var MenubaritemType = (function (_super) {
    tslib_1.__extends(MenubaritemType, _super);
    function MenubaritemType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hover = false;
        _this.isOpen = false;
        return _this;
    }
    MenubaritemType.prototype.mounted = function () {
        var _this = this;
        this.menu().$on(event_1.MenuCloseEvent.type, function (e) {
            _this.isOpen = false;
            e.fromChild && _this.menubar.deactivate();
        });
        this.menubar.$on(event_1.MenubaritemActivateEvent.type, function (e) {
            _this != e.menubaritem && _this.menu().close(false);
        });
        this.menubar.$on(event_1.MenubarDactivateEvent.type, function (e) {
            _this.menu().close(true);
        });
    };
    Object.defineProperty(MenubaritemType.prototype, "style", {
        get: function () {
            return this.active ? this.menuStyle.active : {};
        },
        enumerable: true,
        configurable: true
    });
    MenubaritemType.prototype.menu = function () {
        return this.$refs.menu;
    };
    MenubaritemType.prototype.activate = function () {
        var rect = this.$el.getBoundingClientRect();
        this.menu().open(rect.left, rect.bottom);
        this.menubar.$emit(event_1.MenubaritemActivateEvent.type, new event_1.MenubaritemActivateEvent(this));
        this.isOpen = true;
    };
    MenubaritemType.prototype.mousedown = function () {
        var _this = this;
        global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.activate();
                return [2 /*return*/];
            });
        }); });
    };
    MenubaritemType.prototype.mouseenter = function () {
        var _this = this;
        global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.hover = true;
                this.menubar.active && this.activate();
                return [2 /*return*/];
            });
        }); });
    };
    MenubaritemType.prototype.mouseleave = function () {
        var _this = this;
        global_1.sync.lock(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.hover = false;
                return [2 /*return*/];
            });
        }); });
    };
    Object.defineProperty(MenubaritemType.prototype, "active", {
        get: function () {
            return this.hover || this.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: String, required: true })
    ], MenubaritemType.prototype, "label", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], MenubaritemType.prototype, "menubar", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], MenubaritemType.prototype, "menuStyle", void 0);
    MenubaritemType = tslib_1.__decorate([
        vue_property_decorator_1.Component({
            components: { XMenu: index_vue_1.default }
        })
    ], MenubaritemType);
    return MenubaritemType;
}(vue_property_decorator_1.Vue));
exports.MenubaritemType = MenubaritemType;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2ffd4878", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-890e0a10\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-890e0a10\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.menu {\n  display: inline-block;\n  font-family: sans-serif;\n  border-radius: 4pt;\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  overflow: auto;\n}\n.fixed {\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n.fade-leave-active {\n  transition: opacity .2s ease;\n}\n.fade-leave-to {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = __webpack_require__(7);
exports.default = script_1.MenuType;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fixed"
  }, [_c('div', {
    ref: "wrapper",
    staticStyle: {
      "position": "absolute"
    }
  }, [_c('transition', {
    attrs: {
      "name": _vm.fade
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOpen),
      expression: "isOpen"
    }],
    ref: "menu",
    staticClass: "menu",
    style: (_vm.style),
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
      },
      "mouseup": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._t("default")], 2)])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-890e0a10", esExports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Sync = (function () {
    function Sync() {
        this.q = [];
        this.open = true;
    }
    Sync.prototype.lock = function (cb) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.q.push(cb);
                        return [4 /*yield*/, this.challenge()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sync.prototype.challenge = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cb;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.open) return [3 /*break*/, 4];
                        this.open = false;
                        _a.label = 1;
                    case 1:
                        if (!(this.q.length > 0)) return [3 /*break*/, 3];
                        cb = this.q.shift();
                        return [4 /*yield*/, cb()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.open = true;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Sync;
}());
exports.Sync = Sync;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menubaritem",
    style: (_vm.style),
    on: {
      "mousedown": _vm.mousedown,
      "mouseenter": _vm.mouseenter,
      "mouseleave": _vm.mouseleave
    }
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n    "), _c('x-menu', {
    ref: "menu"
  }, [_vm._t("default")], 2)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b0c0e278", esExports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_contextmenu_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_contextmenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_contextmenu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_705754b0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_contextmenu_vue__ = __webpack_require__(34);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_contextmenu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_705754b0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_contextmenu_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/contextmenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] contextmenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-705754b0", Component.options)
  } else {
    hotAPI.reload("data-v-705754b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(2);
var index_vue_1 = __webpack_require__(6);
var event_1 = __webpack_require__(5);
var ContextmenuType = (function (_super) {
    tslib_1.__extends(ContextmenuType, _super);
    function ContextmenuType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextmenuType.prototype.menu = function () {
        return this.$refs.menu;
    };
    ContextmenuType.prototype.contextmenu = function (mousedown) {
        var _this = this;
        mousedown.preventDefault();
        this.clearCancellers();
        if (this.menu().isOpen) {
            return this.close();
        }
        this.cancelMouseup = event_1.once(document, 'mouseup', function (mouseup) {
            if (mouseup.timeStamp - mousedown.timeStamp >= 500)
                _this.close();
            else {
                _this.cancelMousedown = event_1.once(document, 'mousedown', function (e) {
                    if (!isContextmenu(e))
                        _this.close();
                });
            }
        });
        this.menu().open(mousedown.clientX, mousedown.clientY);
    };
    ContextmenuType.prototype.close = function () {
        this.clearCancellers();
        this.menu().close(true);
    };
    ContextmenuType.prototype.clearCancellers = function () {
        this.cancelMouseup && this.cancelMouseup();
        this.cancelMousedown && this.cancelMousedown();
    };
    ContextmenuType = tslib_1.__decorate([
        vue_property_decorator_1.Component({
            components: { XMenu: index_vue_1.default }
        })
    ], ContextmenuType);
    return ContextmenuType;
}(vue_property_decorator_1.Vue));
exports.default = ContextmenuType;
function isContextmenu(e) {
    return e.button == 2 || e.ctrlKey;
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "display": "inline-block"
    },
    on: {
      "contextmenu": _vm.contextmenu
    }
  }, [_vm._t("default"), _vm._v(" "), _c('x-menu', {
    ref: "menu"
  }, [_vm._t("contextmenu")], 2)], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-705754b0", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_612ec3cb_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(40);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-612ec3cb"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_612ec3cb_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/menuitem/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-612ec3cb", Component.options)
  } else {
    hotAPI.reload("data-v-612ec3cb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("cee05f58", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-612ec3cb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-612ec3cb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.menuitem[data-v-612ec3cb] {\n  padding: 2px 8pt 2px 4pt;\n  white-space: nowrap;\n}\n.right[data-v-612ec3cb] {\n  float: right;\n}\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = __webpack_require__(10);
exports.default = script_1.MenuitemType;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(2);
var keybind = __webpack_require__(11);
var Keybinder = (function (_super) {
    tslib_1.__extends(Keybinder, _super);
    function Keybinder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Keybinder.prototype.created = function () {
        var _this = this;
        this.off = keybind.on(this.source, function (e) {
            _this.enabled && _this.$emit('keybindmatch');
        });
    };
    Keybinder.prototype.updated = function () {
        console.warn('Changing keybind dynamically is not supported.');
    };
    Keybinder.prototype.beforeDestroy = function () {
        this.off();
    };
    Keybinder.prototype.render = function (h) { };
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ required: true, type: String })
    ], Keybinder.prototype, "source", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: true })
    ], Keybinder.prototype, "enabled", void 0);
    Keybinder = tslib_1.__decorate([
        vue_property_decorator_1.Component
    ], Keybinder);
    return Keybinder;
}(vue_property_decorator_1.Vue));
exports.Keybinder = Keybinder;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.keybind) ? _c('x-keybinder', {
    attrs: {
      "source": _vm.keybind,
      "enabled": !_vm.disabled
    },
    on: {
      "keybindmatch": function($event) {
        _vm.$emit('click')
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "menuitem",
    style: (_vm.style),
    on: {
      "mouseenter": function($event) {
        $event.stopPropagation();
        _vm.mouseenter($event)
      },
      "mouseleave": _vm.mouseleave,
      "mouseup": _vm.mouseup,
      "mousedown": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
  }, [_c('div', {
    staticClass: "right"
  }, [_c('span', {
    style: ({
      visibility: _vm.$slots.default ? 'visible' : 'hidden'
    })
  }, [_vm._v("▸")]), _vm._v(" "), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.keybindHTML)
    }
  })]), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "inline-block",
      "padding": "0 0.3em"
    },
    style: ({
      visibility: _vm.checked ? 'visible' : 'hidden'
    })
  }, [_vm._v("✓")]), _vm._v(" "), (_vm.$slots.body) ? _c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_vm._t("body")], 2) : _c('div', {
    staticStyle: {
      "display": "inline-block"
    }
  }, [_vm._v("\n            " + _vm._s(_vm.label) + "\n        ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "inline-block",
      "visibility": "hidden",
      "margin": "0 0.5em"
    }
  }, [_c('span', [_vm._v("▸")]), _vm._v(" "), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.keybindHTML)
    }
  })]), _vm._v(" "), (_vm.$slots.default) ? _c('div', [_c('x-menu', {
    ref: "childMenu",
    attrs: {
      "parentMenuitem": this
    }
  }, [_vm._t("default")], 2)], 1) : _vm._e()])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-612ec3cb", esExports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_separator_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_separator_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_separator_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6fc391ff_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_separator_vue__ = __webpack_require__(45);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6fc391ff"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_separator_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6fc391ff_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_separator_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/separator.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] separator.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6fc391ff", Component.options)
  } else {
    hotAPI.reload("data-v-6fc391ff", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("36d80412", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6fc391ff\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./separator.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6fc391ff\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./separator.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "\n.separator[data-v-6fc391ff] {\n  height: 1pt;\n  margin: 4pt 0;\n}\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    inject: ['menuStyle']
};


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "separator",
    style: (_vm.menuStyle.separator)
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6fc391ff", esExports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function StyleFactory(menuStyle) {
    return {
        provide: function () {
            return { menuStyle: menuStyle };
        },
        render: function (h) {
            return h('div', this.$slots.default);
        }
    };
}
exports.StyleFactory = StyleFactory;
exports.StyleBlack = StyleFactory((function () {
    var base = {
        backgroundColor: 'rgba(31, 31, 31, 0.9)',
        color: 'white',
        boxShadow: '0 0 4pt rgba(255, 255, 255, 0.25)',
    };
    return {
        menu: base,
        menubar: base,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)' },
        disabled: { opacity: '0.5' },
    };
})());
exports.StyleWhite = StyleFactory((function () {
    var base = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        boxShadow: '0 2pt 6pt rgba(0, 0, 0, 0.5)',
    };
    return {
        menu: base,
        menubar: base,
        separator: { backgroundColor: 'rgba(127, 127, 127, 0.5)' },
        active: { backgroundColor: 'rgba(127, 127, 127, 0.75)', color: '#fff' },
        disabled: { opacity: '0.5' },
    };
})());


/***/ })
/******/ ])));