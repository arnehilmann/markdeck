/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _semantic = __webpack_require__(4);

	var _semantic2 = _interopRequireDefault(_semantic);

	var _controller = __webpack_require__(5);

	var _controller2 = _interopRequireDefault(_controller);

	var _ui = __webpack_require__(8);

	var _ui2 = _interopRequireDefault(_ui);

	var _draw = __webpack_require__(10);

	var _draw2 = _interopRequireDefault(_draw);

	var _share = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* App scripts */

	/**
	 * Unique gradient generator
	 * --
	 * @author Tibor Szász
	 * All rights reserved
	 */

	/* Vendor scripts */

	window.addEventListener('DOMContentLoaded', function () {

		/**
	  * dat.GUI event listeners
	  */
		_controller2.default.events.on('change', function (params) {
			_draw2.default.render(_ui2.default.image, params);
			_ui2.default.updateGradient(_draw2.default.imageData);
		});

		_controller2.default.events.on('invertText', function (params) {
			_ui2.default.invertText(params.invertText);
		});

		/**
	  * General image onload event
	  */
		_ui2.default.events.on('load', function (image) {
			_controller2.default.image = image;
			_draw2.default.render(image, _controller2.default.params);
			_ui2.default.updateGradient(_draw2.default.imageData);
		});

		/**
	  * Wire up modules via pubsub events
	  */
		_ui2.default.events.on('sharing', function () {
			var state = _controller2.default.params;
			state.image = _ui2.default.getImageId();

			var url = (0, _share.getStateURL)(state);
			_ui2.default.events.trigger('share-url', url);
		});

		/**
	  * On first load let's see if we need to present a setting
	  */
		var shared = (0, _share.hashDetect)();

		if (shared) {
			_ui2.default.loadImageById(shared.image);
			_controller2.default.shared = shared;
		} else {
			_ui2.default.loadImageById('artificial-trees');
		}
	});

	/* That's all folks */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
	!function (a, b) {
	  "object" == ( false ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
	    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
	  } : b(a);
	}("undefined" != typeof window ? window : undefined, function (a, b) {
	  var c = [],
	      d = c.slice,
	      e = c.concat,
	      f = c.push,
	      g = c.indexOf,
	      h = {},
	      i = h.toString,
	      j = h.hasOwnProperty,
	      k = {},
	      l = a.document,
	      m = "2.1.4",
	      n = function n(a, b) {
	    return new n.fn.init(a, b);
	  },
	      o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      p = /^-ms-/,
	      q = /-([\da-z])/gi,
	      r = function r(a, b) {
	    return b.toUpperCase();
	  };n.fn = n.prototype = { jquery: m, constructor: n, selector: "", length: 0, toArray: function toArray() {
	      return d.call(this);
	    }, get: function get(a) {
	      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
	    }, pushStack: function pushStack(a) {
	      var b = n.merge(this.constructor(), a);return b.prevObject = this, b.context = this.context, b;
	    }, each: function each(a, b) {
	      return n.each(this, a, b);
	    }, map: function map(a) {
	      return this.pushStack(n.map(this, function (b, c) {
	        return a.call(b, c, b);
	      }));
	    }, slice: function slice() {
	      return this.pushStack(d.apply(this, arguments));
	    }, first: function first() {
	      return this.eq(0);
	    }, last: function last() {
	      return this.eq(-1);
	    }, eq: function eq(a) {
	      var b = this.length,
	          c = +a + (0 > a ? b : 0);return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
	    }, end: function end() {
	      return this.prevObject || this.constructor(null);
	    }, push: f, sort: c.sort, splice: c.splice }, n.extend = n.fn.extend = function () {
	    var a,
	        b,
	        c,
	        d,
	        e,
	        f,
	        g = arguments[0] || {},
	        h = 1,
	        i = arguments.length,
	        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) {
	      if (null != (a = arguments[h])) for (b in a) {
	        c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
	      }
	    }return g;
	  }, n.extend({ expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
	      throw new Error(a);
	    }, noop: function noop() {}, isFunction: function isFunction(a) {
	      return "function" === n.type(a);
	    }, isArray: Array.isArray, isWindow: function isWindow(a) {
	      return null != a && a === a.window;
	    }, isNumeric: function isNumeric(a) {
	      return !n.isArray(a) && a - parseFloat(a) + 1 >= 0;
	    }, isPlainObject: function isPlainObject(a) {
	      return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0;
	    }, isEmptyObject: function isEmptyObject(a) {
	      var b;for (b in a) {
	        return !1;
	      }return !0;
	    }, type: function type(a) {
	      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? h[i.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
	    }, globalEval: function globalEval(a) {
	      var b,
	          c = eval;a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a));
	    }, camelCase: function camelCase(a) {
	      return a.replace(p, "ms-").replace(q, r);
	    }, nodeName: function nodeName(a, b) {
	      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
	    }, each: function each(a, b, c) {
	      var d,
	          e = 0,
	          f = a.length,
	          g = s(a);if (c) {
	        if (g) {
	          for (; f > e; e++) {
	            if (d = b.apply(a[e], c), d === !1) break;
	          }
	        } else for (e in a) {
	          if (d = b.apply(a[e], c), d === !1) break;
	        }
	      } else if (g) {
	        for (; f > e; e++) {
	          if (d = b.call(a[e], e, a[e]), d === !1) break;
	        }
	      } else for (e in a) {
	        if (d = b.call(a[e], e, a[e]), d === !1) break;
	      }return a;
	    }, trim: function trim(a) {
	      return null == a ? "" : (a + "").replace(o, "");
	    }, makeArray: function makeArray(a, b) {
	      var c = b || [];return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c;
	    }, inArray: function inArray(a, b, c) {
	      return null == b ? -1 : g.call(b, a, c);
	    }, merge: function merge(a, b) {
	      for (var c = +b.length, d = 0, e = a.length; c > d; d++) {
	        a[e++] = b[d];
	      }return a.length = e, a;
	    }, grep: function grep(a, b, c) {
	      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) {
	        d = !b(a[f], f), d !== h && e.push(a[f]);
	      }return e;
	    }, map: function map(a, b, c) {
	      var d,
	          f = 0,
	          g = a.length,
	          h = s(a),
	          i = [];if (h) for (; g > f; f++) {
	        d = b(a[f], f, c), null != d && i.push(d);
	      } else for (f in a) {
	        d = b(a[f], f, c), null != d && i.push(d);
	      }return e.apply([], i);
	    }, guid: 1, proxy: function proxy(a, b) {
	      var c, e, f;return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function f() {
	        return a.apply(b || this, e.concat(d.call(arguments)));
	      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0;
	    }, now: Date.now, support: k }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
	    h["[object " + b + "]"] = b.toLowerCase();
	  });function s(a) {
	    var b = "length" in a && a.length,
	        c = n.type(a);return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
	  }var t = function (a) {
	    var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l,
	        m,
	        n,
	        o,
	        p,
	        q,
	        r,
	        s,
	        t,
	        u = "sizzle" + 1 * new Date(),
	        v = a.document,
	        w = 0,
	        x = 0,
	        y = ha(),
	        z = ha(),
	        A = ha(),
	        B = function B(a, b) {
	      return a === b && (l = !0), 0;
	    },
	        C = 1 << 31,
	        D = {}.hasOwnProperty,
	        E = [],
	        F = E.pop,
	        G = E.push,
	        H = E.push,
	        I = E.slice,
	        J = function J(a, b) {
	      for (var c = 0, d = a.length; d > c; c++) {
	        if (a[c] === b) return c;
	      }return -1;
	    },
	        K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	        L = "[\\x20\\t\\r\\n\\f]",
	        M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	        N = M.replace("w", "w#"),
	        O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
	        P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
	        Q = new RegExp(L + "+", "g"),
	        R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
	        S = new RegExp("^" + L + "*," + L + "*"),
	        T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
	        U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
	        V = new RegExp(P),
	        W = new RegExp("^" + N + "$"),
	        X = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + O), PSEUDO: new RegExp("^" + P), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"), bool: new RegExp("^(?:" + K + ")$", "i"), needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i") },
	        Y = /^(?:input|select|textarea|button)$/i,
	        Z = /^h\d$/i,
	        $ = /^[^{]+\{\s*\[native \w/,
	        _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        aa = /[+~]/,
	        ba = /'|\\/g,
	        ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
	        da = function da(a, b, c) {
	      var d = "0x" + b - 65536;return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
	    },
	        ea = function ea() {
	      m();
	    };try {
	      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
	    } catch (fa) {
	      H = { apply: E.length ? function (a, b) {
	          G.apply(a, I.call(b));
	        } : function (a, b) {
	          var c = a.length,
	              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
	        } };
	    }function ga(a, b, d, e) {
	      var f, h, j, k, l, o, r, s, w, x;if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;if (!e && p) {
	        if (11 !== k && (f = _.exec(a))) if (j = f[1]) {
	          if (9 === k) {
	            if (h = b.getElementById(j), !h || !h.parentNode) return d;if (h.id === j) return d.push(h), d;
	          } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d;
	        } else {
	          if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d;
	        }if (c.qsa && (!q || !q.test(a))) {
	          if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
	            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;while (l--) {
	              o[l] = s + ra(o[l]);
	            }w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",");
	          }if (x) try {
	            return H.apply(d, w.querySelectorAll(x)), d;
	          } catch (y) {} finally {
	            r || b.removeAttribute("id");
	          }
	        }
	      }return i(a.replace(R, "$1"), b, d, e);
	    }function ha() {
	      var a = [];function b(c, e) {
	        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
	      }return b;
	    }function ia(a) {
	      return a[u] = !0, a;
	    }function ja(a) {
	      var b = n.createElement("div");try {
	        return !!a(b);
	      } catch (c) {
	        return !1;
	      } finally {
	        b.parentNode && b.parentNode.removeChild(b), b = null;
	      }
	    }function ka(a, b) {
	      var c = a.split("|"),
	          e = a.length;while (e--) {
	        d.attrHandle[c[e]] = b;
	      }
	    }function la(a, b) {
	      var c = b && a,
	          d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);if (d) return d;if (c) while (c = c.nextSibling) {
	        if (c === b) return -1;
	      }return a ? 1 : -1;
	    }function ma(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
	      };
	    }function na(a) {
	      return function (b) {
	        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
	      };
	    }function oa(a) {
	      return ia(function (b) {
	        return b = +b, ia(function (c, d) {
	          var e,
	              f = a([], c.length, b),
	              g = f.length;while (g--) {
	            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
	          }
	        });
	      });
	    }function pa(a) {
	      return a && "undefined" != typeof a.getElementsByTagName && a;
	    }c = ga.support = {}, f = ga.isXML = function (a) {
	      var b = a && (a.ownerDocument || a).documentElement;return b ? "HTML" !== b.nodeName : !1;
	    }, m = ga.setDocument = function (a) {
	      var b,
	          e,
	          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function (a) {
	        return a.className = "i", !a.getAttribute("className");
	      }), c.getElementsByTagName = ja(function (a) {
	        return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length;
	      }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function (a) {
	        return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length;
	      }), c.getById ? (d.find.ID = function (a, b) {
	        if ("undefined" != typeof b.getElementById && p) {
	          var c = b.getElementById(a);return c && c.parentNode ? [c] : [];
	        }
	      }, d.filter.ID = function (a) {
	        var b = a.replace(ca, da);return function (a) {
	          return a.getAttribute("id") === b;
	        };
	      }) : (delete d.find.ID, d.filter.ID = function (a) {
	        var b = a.replace(ca, da);return function (a) {
	          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
	        };
	      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
	        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
	      } : function (a, b) {
	        var c,
	            d = [],
	            e = 0,
	            f = b.getElementsByTagName(a);if ("*" === a) {
	          while (c = f[e++]) {
	            1 === c.nodeType && d.push(c);
	          }return d;
	        }return f;
	      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
	        return p ? b.getElementsByClassName(a) : void 0;
	      }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function (a) {
	        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
	      }), ja(function (a) {
	        var b = g.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
	      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
	        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P);
	      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
	        var c = 9 === a.nodeType ? a.documentElement : a,
	            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
	      } : function (a, b) {
	        if (b) while (b = b.parentNode) {
	          if (b === a) return !0;
	        }return !1;
	      }, B = b ? function (a, b) {
	        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
	      } : function (a, b) {
	        if (a === b) return l = !0, 0;var c,
	            d = 0,
	            e = a.parentNode,
	            f = b.parentNode,
	            h = [a],
	            i = [b];if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
	          h.unshift(c);
	        }c = b;while (c = c.parentNode) {
	          i.unshift(c);
	        }while (h[d] === i[d]) {
	          d++;
	        }return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;
	      }, g) : n;
	    }, ga.matches = function (a, b) {
	      return ga(a, null, null, b);
	    }, ga.matchesSelector = function (a, b) {
	      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
	        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
	      } catch (e) {}return ga(b, n, null, [a]).length > 0;
	    }, ga.contains = function (a, b) {
	      return (a.ownerDocument || a) !== n && m(a), t(a, b);
	    }, ga.attr = function (a, b) {
	      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
	          f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
	    }, ga.error = function (a) {
	      throw new Error("Syntax error, unrecognized expression: " + a);
	    }, ga.uniqueSort = function (a) {
	      var b,
	          d = [],
	          e = 0,
	          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
	        while (b = a[f++]) {
	          b === a[f] && (e = d.push(f));
	        }while (e--) {
	          a.splice(d[e], 1);
	        }
	      }return k = null, a;
	    }, e = ga.getText = function (a) {
	      var b,
	          c = "",
	          d = 0,
	          f = a.nodeType;if (f) {
	        if (1 === f || 9 === f || 11 === f) {
	          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
	            c += e(a);
	          }
	        } else if (3 === f || 4 === f) return a.nodeValue;
	      } else while (b = a[d++]) {
	        c += e(b);
	      }return c;
	    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: X, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
	          return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
	        }, CHILD: function CHILD(a) {
	          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
	        }, PSEUDO: function PSEUDO(a) {
	          var b,
	              c = !a[6] && a[2];return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
	        } }, filter: { TAG: function TAG(a) {
	          var b = a.replace(ca, da).toLowerCase();return "*" === a ? function () {
	            return !0;
	          } : function (a) {
	            return a.nodeName && a.nodeName.toLowerCase() === b;
	          };
	        }, CLASS: function CLASS(a) {
	          var b = y[a + " "];return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
	            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
	          });
	        }, ATTR: function ATTR(a, b, c) {
	          return function (d) {
	            var e = ga.attr(d, a);return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
	          };
	        }, CHILD: function CHILD(a, b, c, d, e) {
	          var f = "nth" !== a.slice(0, 3),
	              g = "last" !== a.slice(-4),
	              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
	            return !!a.parentNode;
	          } : function (b, c, i) {
	            var j,
	                k,
	                l,
	                m,
	                n,
	                o,
	                p = f !== g ? "nextSibling" : "previousSibling",
	                q = b.parentNode,
	                r = h && b.nodeName.toLowerCase(),
	                s = !i && !h;if (q) {
	              if (f) {
	                while (p) {
	                  l = b;while (l = l[p]) {
	                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
	                  }o = p = "only" === a && !o && "nextSibling";
	                }return !0;
	              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
	                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) {
	                  if (1 === l.nodeType && ++m && l === b) {
	                    k[a] = [w, n, m];break;
	                  }
	                }
	              } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) {
	                if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
	              }return m -= e, m === d || m % d === 0 && m / d >= 0;
	            }
	          };
	        }, PSEUDO: function PSEUDO(a, b) {
	          var c,
	              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
	            var d,
	                f = e(a, b),
	                g = f.length;while (g--) {
	              d = J(a, f[g]), a[d] = !(c[d] = f[g]);
	            }
	          }) : function (a) {
	            return e(a, 0, c);
	          }) : e;
	        } }, pseudos: { not: ia(function (a) {
	          var b = [],
	              c = [],
	              d = h(a.replace(R, "$1"));return d[u] ? ia(function (a, b, c, e) {
	            var f,
	                g = d(a, null, e, []),
	                h = a.length;while (h--) {
	              (f = g[h]) && (a[h] = !(b[h] = f));
	            }
	          }) : function (a, e, f) {
	            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
	          };
	        }), has: ia(function (a) {
	          return function (b) {
	            return ga(a, b).length > 0;
	          };
	        }), contains: ia(function (a) {
	          return a = a.replace(ca, da), function (b) {
	            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
	          };
	        }), lang: ia(function (a) {
	          return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(), function (b) {
	            var c;do {
	              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
	            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
	          };
	        }), target: function target(b) {
	          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
	        }, root: function root(a) {
	          return a === o;
	        }, focus: function focus(a) {
	          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
	        }, enabled: function enabled(a) {
	          return a.disabled === !1;
	        }, disabled: function disabled(a) {
	          return a.disabled === !0;
	        }, checked: function checked(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
	        }, selected: function selected(a) {
	          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
	        }, empty: function empty(a) {
	          for (a = a.firstChild; a; a = a.nextSibling) {
	            if (a.nodeType < 6) return !1;
	          }return !0;
	        }, parent: function parent(a) {
	          return !d.pseudos.empty(a);
	        }, header: function header(a) {
	          return Z.test(a.nodeName);
	        }, input: function input(a) {
	          return Y.test(a.nodeName);
	        }, button: function button(a) {
	          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
	        }, text: function text(a) {
	          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
	        }, first: oa(function () {
	          return [0];
	        }), last: oa(function (a, b) {
	          return [b - 1];
	        }), eq: oa(function (a, b, c) {
	          return [0 > c ? c + b : c];
	        }), even: oa(function (a, b) {
	          for (var c = 0; b > c; c += 2) {
	            a.push(c);
	          }return a;
	        }), odd: oa(function (a, b) {
	          for (var c = 1; b > c; c += 2) {
	            a.push(c);
	          }return a;
	        }), lt: oa(function (a, b, c) {
	          for (var d = 0 > c ? c + b : c; --d >= 0;) {
	            a.push(d);
	          }return a;
	        }), gt: oa(function (a, b, c) {
	          for (var d = 0 > c ? c + b : c; ++d < b;) {
	            a.push(d);
	          }return a;
	        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
	      d.pseudos[b] = ma(b);
	    }for (b in { submit: !0, reset: !0 }) {
	      d.pseudos[b] = na(b);
	    }function qa() {}qa.prototype = d.filters = d.pseudos, d.setFilters = new qa(), g = ga.tokenize = function (a, b) {
	      var c,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
	        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, " ") }), h = h.slice(c.length));for (g in d.filter) {
	          !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
	        }if (!c) break;
	      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
	    };function ra(a) {
	      for (var b = 0, c = a.length, d = ""; c > b; b++) {
	        d += a[b].value;
	      }return d;
	    }function sa(a, b, c) {
	      var d = b.dir,
	          e = c && "parentNode" === d,
	          f = x++;return b.first ? function (b, c, f) {
	        while (b = b[d]) {
	          if (1 === b.nodeType || e) return a(b, c, f);
	        }
	      } : function (b, c, g) {
	        var h,
	            i,
	            j = [w, f];if (g) {
	          while (b = b[d]) {
	            if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
	          }
	        } else while (b = b[d]) {
	          if (1 === b.nodeType || e) {
	            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];if (i[d] = j, j[2] = a(b, c, g)) return !0;
	          }
	        }
	      };
	    }function ta(a) {
	      return a.length > 1 ? function (b, c, d) {
	        var e = a.length;while (e--) {
	          if (!a[e](b, c, d)) return !1;
	        }return !0;
	      } : a[0];
	    }function ua(a, b, c) {
	      for (var d = 0, e = b.length; e > d; d++) {
	        ga(a, b[d], c);
	      }return c;
	    }function va(a, b, c, d, e) {
	      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) {
	        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
	      }return g;
	    }function wa(a, b, c, d, e, f) {
	      return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function (f, g, h, i) {
	        var j,
	            k,
	            l,
	            m = [],
	            n = [],
	            o = g.length,
	            p = f || ua(b || "*", h.nodeType ? [h] : h, []),
	            q = !a || !f && b ? p : va(p, m, a, h, i),
	            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
	          j = va(r, n), d(j, [], h, i), k = j.length;while (k--) {
	            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
	          }
	        }if (f) {
	          if (e || a) {
	            if (e) {
	              j = [], k = r.length;while (k--) {
	                (l = r[k]) && j.push(q[k] = l);
	              }e(null, r = [], j, i);
	            }k = r.length;while (k--) {
	              (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
	            }
	          }
	        } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
	      });
	    }function xa(a) {
	      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function (a) {
	        return a === b;
	      }, h, !0), l = sa(function (a) {
	        return J(b, a) > -1;
	      }, h, !0), m = [function (a, c, d) {
	        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
	      }]; f > i; i++) {
	        if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];else {
	          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
	            for (e = ++i; f > e; e++) {
	              if (d.relative[a[e].type]) break;
	            }return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a));
	          }m.push(c);
	        }
	      }return ta(m);
	    }function ya(a, b) {
	      var c = b.length > 0,
	          e = a.length > 0,
	          f = function f(_f, g, h, i, k) {
	        var l,
	            m,
	            o,
	            p = 0,
	            q = "0",
	            r = _f && [],
	            s = [],
	            t = j,
	            u = _f || e && d.find.TAG("*", k),
	            v = w += null == t ? 1 : Math.random() || .1,
	            x = u.length;for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
	          if (e && l) {
	            m = 0;while (o = a[m++]) {
	              if (o(l, g, h)) {
	                i.push(l);break;
	              }
	            }k && (w = v);
	          }c && ((l = !o && l) && p--, _f && r.push(l));
	        }if (p += q, c && q !== p) {
	          m = 0;while (o = b[m++]) {
	            o(r, s, g, h);
	          }if (_f) {
	            if (p > 0) while (q--) {
	              r[q] || s[q] || (s[q] = F.call(i));
	            }s = va(s);
	          }H.apply(i, s), k && !_f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i);
	        }return k && (w = v, j = t), r;
	      };return c ? ia(f) : f;
	    }return h = ga.compile = function (a, b) {
	      var c,
	          d = [],
	          e = [],
	          f = A[a + " "];if (!f) {
	        b || (b = g(a)), c = b.length;while (c--) {
	          f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
	        }f = A(a, ya(e, d)), f.selector = a;
	      }return f;
	    }, i = ga.select = function (a, b, e, f) {
	      var i,
	          j,
	          k,
	          l,
	          m,
	          n = "function" == typeof a && a,
	          o = !f && g(a = n.selector || a);if (e = e || [], 1 === o.length) {
	        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
	          if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);
	        }i = X.needsContext.test(a) ? 0 : j.length;while (i--) {
	          if (k = j[i], d.relative[l = k.type]) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
	            if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;break;
	          }
	        }
	      }return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e;
	    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
	      return 1 & a.compareDocumentPosition(n.createElement("div"));
	    }), ja(function (a) {
	      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
	    }) || ka("type|href|height|width", function (a, b, c) {
	      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
	    }), c.attributes && ja(function (a) {
	      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
	    }) || ka("value", function (a, b, c) {
	      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
	    }), ja(function (a) {
	      return null == a.getAttribute("disabled");
	    }) || ka(K, function (a, b, c) {
	      var d;return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
	    }), ga;
	  }(a);n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;var u = n.expr.match.needsContext,
	      v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      w = /^.[^:#\[\.,]*$/;function x(a, b, c) {
	    if (n.isFunction(b)) return n.grep(a, function (a, d) {
	      return !!b.call(a, d, a) !== c;
	    });if (b.nodeType) return n.grep(a, function (a) {
	      return a === b !== c;
	    });if ("string" == typeof b) {
	      if (w.test(b)) return n.filter(b, a, c);b = n.filter(b, a);
	    }return n.grep(a, function (a) {
	      return g.call(b, a) >= 0 !== c;
	    });
	  }n.filter = function (a, b, c) {
	    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
	      return 1 === a.nodeType;
	    }));
	  }, n.fn.extend({ find: function find(a) {
	      var b,
	          c = this.length,
	          d = [],
	          e = this;if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
	        for (b = 0; c > b; b++) {
	          if (n.contains(e[b], this)) return !0;
	        }
	      }));for (b = 0; c > b; b++) {
	        n.find(a, e[b], d);
	      }return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d;
	    }, filter: function filter(a) {
	      return this.pushStack(x(this, a || [], !1));
	    }, not: function not(a) {
	      return this.pushStack(x(this, a || [], !0));
	    }, is: function is(a) {
	      return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length;
	    } });var y,
	      z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	      A = n.fn.init = function (a, b) {
	    var c, d;if (!a) return this;if ("string" == typeof a) {
	      if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);if (c[1]) {
	        if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b)) for (c in b) {
	          n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
	        }return this;
	      }return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this;
	    }return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
	  };A.prototype = n.fn, y = n(l);var B = /^(?:parents|prev(?:Until|All))/,
	      C = { children: !0, contents: !0, next: !0, prev: !0 };n.extend({ dir: function dir(a, b, c) {
	      var d = [],
	          e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
	        if (1 === a.nodeType) {
	          if (e && n(a).is(c)) break;d.push(a);
	        }
	      }return d;
	    }, sibling: function sibling(a, b) {
	      for (var c = []; a; a = a.nextSibling) {
	        1 === a.nodeType && a !== b && c.push(a);
	      }return c;
	    } }), n.fn.extend({ has: function has(a) {
	      var b = n(a, this),
	          c = b.length;return this.filter(function () {
	        for (var a = 0; c > a; a++) {
	          if (n.contains(this, b[a])) return !0;
	        }
	      });
	    }, closest: function closest(a, b) {
	      for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) {
	        for (c = this[d]; c && c !== b; c = c.parentNode) {
	          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
	            f.push(c);break;
	          }
	        }
	      }return this.pushStack(f.length > 1 ? n.unique(f) : f);
	    }, index: function index(a) {
	      return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	    }, add: function add(a, b) {
	      return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
	    }, addBack: function addBack(a) {
	      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
	    } });function D(a, b) {
	    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
	  }n.each({ parent: function parent(a) {
	      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
	    }, parents: function parents(a) {
	      return n.dir(a, "parentNode");
	    }, parentsUntil: function parentsUntil(a, b, c) {
	      return n.dir(a, "parentNode", c);
	    }, next: function next(a) {
	      return D(a, "nextSibling");
	    }, prev: function prev(a) {
	      return D(a, "previousSibling");
	    }, nextAll: function nextAll(a) {
	      return n.dir(a, "nextSibling");
	    }, prevAll: function prevAll(a) {
	      return n.dir(a, "previousSibling");
	    }, nextUntil: function nextUntil(a, b, c) {
	      return n.dir(a, "nextSibling", c);
	    }, prevUntil: function prevUntil(a, b, c) {
	      return n.dir(a, "previousSibling", c);
	    }, siblings: function siblings(a) {
	      return n.sibling((a.parentNode || {}).firstChild, a);
	    }, children: function children(a) {
	      return n.sibling(a.firstChild);
	    }, contents: function contents(a) {
	      return a.contentDocument || n.merge([], a.childNodes);
	    } }, function (a, b) {
	    n.fn[a] = function (c, d) {
	      var e = n.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e);
	    };
	  });var E = /\S+/g,
	      F = {};function G(a) {
	    var b = F[a] = {};return n.each(a.match(E) || [], function (a, c) {
	      b[c] = !0;
	    }), b;
	  }n.Callbacks = function (a) {
	    a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);var b,
	        c,
	        d,
	        e,
	        f,
	        g,
	        h = [],
	        i = !a.once && [],
	        j = function j(l) {
	      for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++) {
	        if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
	          b = !1;break;
	        }
	      }d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable());
	    },
	        k = { add: function add() {
	        if (h) {
	          var c = h.length;!function g(b) {
	            n.each(b, function (b, c) {
	              var d = n.type(c);"function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c);
	            });
	          }(arguments), d ? f = h.length : b && (e = c, j(b));
	        }return this;
	      }, remove: function remove() {
	        return h && n.each(arguments, function (a, b) {
	          var c;while ((c = n.inArray(b, h, c)) > -1) {
	            h.splice(c, 1), d && (f >= c && f--, g >= c && g--);
	          }
	        }), this;
	      }, has: function has(a) {
	        return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
	      }, empty: function empty() {
	        return h = [], f = 0, this;
	      }, disable: function disable() {
	        return h = i = b = void 0, this;
	      }, disabled: function disabled() {
	        return !h;
	      }, lock: function lock() {
	        return i = void 0, b || k.disable(), this;
	      }, locked: function locked() {
	        return !i;
	      }, fireWith: function fireWith(a, b) {
	        return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this;
	      }, fire: function fire() {
	        return k.fireWith(this, arguments), this;
	      }, fired: function fired() {
	        return !!c;
	      } };return k;
	  }, n.extend({ Deferred: function Deferred(a) {
	      var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
	          c = "pending",
	          d = { state: function state() {
	          return c;
	        }, always: function always() {
	          return e.done(arguments).fail(arguments), this;
	        }, then: function then() {
	          var a = arguments;return n.Deferred(function (c) {
	            n.each(b, function (b, f) {
	              var g = n.isFunction(a[b]) && a[b];e[f[1]](function () {
	                var a = g && g.apply(this, arguments);a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
	              });
	            }), a = null;
	          }).promise();
	        }, promise: function promise(a) {
	          return null != a ? n.extend(a, d) : d;
	        } },
	          e = {};return d.pipe = d.then, n.each(b, function (a, f) {
	        var g = f[2],
	            h = f[3];d[f[1]] = g.add, h && g.add(function () {
	          c = h;
	        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
	          return e[f[0] + "With"](this === e ? d : this, arguments), this;
	        }, e[f[0] + "With"] = g.fireWith;
	      }), d.promise(e), a && a.call(e, e), e;
	    }, when: function when(a) {
	      var b = 0,
	          c = d.call(arguments),
	          e = c.length,
	          f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
	          g = 1 === f ? a : n.Deferred(),
	          h = function h(a, b, c) {
	        return function (e) {
	          b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
	        };
	      },
	          i,
	          j,
	          k;if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) {
	        c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
	      }return f || g.resolveWith(k, c), g.promise();
	    } });var H;n.fn.ready = function (a) {
	    return n.ready.promise().done(a), this;
	  }, n.extend({ isReady: !1, readyWait: 1, holdReady: function holdReady(a) {
	      a ? n.readyWait++ : n.ready(!0);
	    }, ready: function ready(a) {
	      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))));
	    } });function I() {
	    l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready();
	  }n.ready.promise = function (b) {
	    return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b);
	  }, n.ready.promise();var J = n.access = function (a, b, c, d, e, f, g) {
	    var h = 0,
	        i = a.length,
	        j = null == c;if ("object" === n.type(c)) {
	      e = !0;for (h in c) {
	        n.access(a, b, h, c[h], !0, f, g);
	      }
	    } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
	      return j.call(n(a), c);
	    })), b)) for (; i > h; h++) {
	      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
	    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
	  };n.acceptData = function (a) {
	    return 1 === a.nodeType || 9 === a.nodeType || ! +a.nodeType;
	  };function K() {
	    Object.defineProperty(this.cache = {}, 0, { get: function get() {
	        return {};
	      } }), this.expando = n.expando + K.uid++;
	  }K.uid = 1, K.accepts = n.acceptData, K.prototype = { key: function key(a) {
	      if (!K.accepts(a)) return 0;var b = {},
	          c = a[this.expando];if (!c) {
	        c = K.uid++;try {
	          b[this.expando] = { value: c }, Object.defineProperties(a, b);
	        } catch (d) {
	          b[this.expando] = c, n.extend(a, b);
	        }
	      }return this.cache[c] || (this.cache[c] = {}), c;
	    }, set: function set(a, b, c) {
	      var d,
	          e = this.key(a),
	          f = this.cache[e];if ("string" == typeof b) f[b] = c;else if (n.isEmptyObject(f)) n.extend(this.cache[e], b);else for (d in b) {
	        f[d] = b[d];
	      }return f;
	    }, get: function get(a, b) {
	      var c = this.cache[this.key(a)];return void 0 === b ? c : c[b];
	    }, access: function access(a, b, c) {
	      var d;return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
	    }, remove: function remove(a, b) {
	      var c,
	          d,
	          e,
	          f = this.key(a),
	          g = this.cache[f];if (void 0 === b) this.cache[f] = {};else {
	        n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;while (c--) {
	          delete g[d[c]];
	        }
	      }
	    }, hasData: function hasData(a) {
	      return !n.isEmptyObject(this.cache[a[this.expando]] || {});
	    }, discard: function discard(a) {
	      a[this.expando] && delete this.cache[a[this.expando]];
	    } };var L = new K(),
	      M = new K(),
	      N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      O = /([A-Z])/g;function P(a, b, c) {
	    var d;if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
	      try {
	        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c;
	      } catch (e) {}M.set(a, b, c);
	    } else c = void 0;return c;
	  }n.extend({ hasData: function hasData(a) {
	      return M.hasData(a) || L.hasData(a);
	    }, data: function data(a, b, c) {
	      return M.access(a, b, c);
	    }, removeData: function removeData(a, b) {
	      M.remove(a, b);
	    }, _data: function _data(a, b, c) {
	      return L.access(a, b, c);
	    }, _removeData: function _removeData(a, b) {
	      L.remove(a, b);
	    } }), n.fn.extend({ data: function data(a, b) {
	      var c,
	          d,
	          e,
	          f = this[0],
	          g = f && f.attributes;if (void 0 === a) {
	        if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
	          c = g.length;while (c--) {
	            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
	          }L.set(f, "hasDataAttrs", !0);
	        }return e;
	      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
	        M.set(this, a);
	      }) : J(this, function (b) {
	        var c,
	            d = n.camelCase(a);if (f && void 0 === b) {
	          if (c = M.get(f, a), void 0 !== c) return c;if (c = M.get(f, d), void 0 !== c) return c;if (c = P(f, d, void 0), void 0 !== c) return c;
	        } else this.each(function () {
	          var c = M.get(this, d);M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b);
	        });
	      }, null, b, arguments.length > 1, null, !0);
	    }, removeData: function removeData(a) {
	      return this.each(function () {
	        M.remove(this, a);
	      });
	    } }), n.extend({ queue: function queue(a, b, c) {
	      var d;return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
	    }, dequeue: function dequeue(a, b) {
	      b = b || "fx";var c = n.queue(a, b),
	          d = c.length,
	          e = c.shift(),
	          f = n._queueHooks(a, b),
	          g = function g() {
	        n.dequeue(a, b);
	      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
	    }, _queueHooks: function _queueHooks(a, b) {
	      var c = b + "queueHooks";return L.get(a, c) || L.access(a, c, { empty: n.Callbacks("once memory").add(function () {
	          L.remove(a, [b + "queue", c]);
	        }) });
	    } }), n.fn.extend({ queue: function queue(a, b) {
	      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
	        var c = n.queue(this, a, b);n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
	      });
	    }, dequeue: function dequeue(a) {
	      return this.each(function () {
	        n.dequeue(this, a);
	      });
	    }, clearQueue: function clearQueue(a) {
	      return this.queue(a || "fx", []);
	    }, promise: function promise(a, b) {
	      var c,
	          d = 1,
	          e = n.Deferred(),
	          f = this,
	          g = this.length,
	          h = function h() {
	        --d || e.resolveWith(f, [f]);
	      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
	        c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
	      }return h(), e.promise(b);
	    } });var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	      R = ["Top", "Right", "Bottom", "Left"],
	      S = function S(a, b) {
	    return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a);
	  },
	      T = /^(?:checkbox|radio)$/i;!function () {
	    var a = l.createDocumentFragment(),
	        b = a.appendChild(l.createElement("div")),
	        c = l.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
	  }();var U = "undefined";k.focusinBubbles = "onfocusin" in a;var V = /^key/,
	      W = /^(?:mouse|pointer|contextmenu)|click/,
	      X = /^(?:focusinfocus|focusoutblur)$/,
	      Y = /^([^.]*)(?:\.(.+)|)$/;function Z() {
	    return !0;
	  }function $() {
	    return !1;
	  }function _() {
	    try {
	      return l.activeElement;
	    } catch (a) {}
	  }n.event = { global: {}, add: function add(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          o,
	          p,
	          q,
	          r = L.get(a);if (r) {
	        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function (b) {
	          return (typeof n === "undefined" ? "undefined" : _typeof(n)) !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0;
	        }), b = (b || "").match(E) || [""], j = b.length;while (j--) {
	          h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && n.expr.match.needsContext.test(e), namespace: p.join(".") }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0);
	        }
	      }
	    }, remove: function remove(a, b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          j,
	          k,
	          l,
	          m,
	          o,
	          p,
	          q,
	          r = L.hasData(a) && L.get(a);if (r && (i = r.events)) {
	        b = (b || "").match(E) || [""], j = b.length;while (j--) {
	          if (h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
	            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
	              k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
	            }g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o]);
	          } else for (o in i) {
	            n.event.remove(a, o + b[j], c, d, !0);
	          }
	        }n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"));
	      }
	    }, trigger: function trigger(b, c, d, e) {
	      var f,
	          g,
	          h,
	          i,
	          k,
	          m,
	          o,
	          p = [d || l],
	          q = j.call(b, "type") ? b.type : b,
	          r = j.call(b, "namespace") ? b.namespace.split(".") : [];if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
	        if (!e && !o.noBubble && !n.isWindow(d)) {
	          for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode) {
	            p.push(g), h = g;
	          }h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a);
	        }f = 0;while ((g = p[f++]) && !b.isPropagationStopped()) {
	          b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
	        }return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result;
	      }
	    }, dispatch: function dispatch(a) {
	      a = n.event.fix(a);var b,
	          c,
	          e,
	          f,
	          g,
	          h = [],
	          i = d.call(arguments),
	          j = (L.get(this, "events") || {})[a.type] || [],
	          k = n.event.special[a.type] || {};if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
	        h = n.event.handlers.call(this, a, j), b = 0;while ((f = h[b++]) && !a.isPropagationStopped()) {
	          a.currentTarget = f.elem, c = 0;while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) {
	            (!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()));
	          }
	        }return k.postDispatch && k.postDispatch.call(this, a), a.result;
	      }
	    }, handlers: function handlers(a, b) {
	      var c,
	          d,
	          e,
	          f,
	          g = [],
	          h = b.delegateCount,
	          i = a.target;if (h && i.nodeType && (!a.button || "click" !== a.type)) for (; i !== this; i = i.parentNode || this) {
	        if (i.disabled !== !0 || "click" !== a.type) {
	          for (d = [], c = 0; h > c; c++) {
	            f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
	          }d.length && g.push({ elem: i, handlers: d });
	        }
	      }return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
	    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(a, b) {
	        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
	      } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(a, b) {
	        var c,
	            d,
	            e,
	            f = b.button;return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
	      } }, fix: function fix(a) {
	      if (a[n.expando]) return a;var b,
	          c,
	          d,
	          e = a.type,
	          f = a,
	          g = this.fixHooks[e];g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;while (b--) {
	        c = d[b], a[c] = f[c];
	      }return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a;
	    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
	          return this !== _() && this.focus ? (this.focus(), !1) : void 0;
	        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
	          return this === _() && this.blur ? (this.blur(), !1) : void 0;
	        }, delegateType: "focusout" }, click: { trigger: function trigger() {
	          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0;
	        }, _default: function _default(a) {
	          return n.nodeName(a.target, "a");
	        } }, beforeunload: { postDispatch: function postDispatch(a) {
	          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
	        } } }, simulate: function simulate(a, b, c, d) {
	      var e = n.extend(new n.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
	    } }, n.removeEvent = function (a, b, c) {
	    a.removeEventListener && a.removeEventListener(b, c, !1);
	  }, n.Event = function (a, b) {
	    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
	  }, n.Event.prototype = { isDefaultPrevented: $, isPropagationStopped: $, isImmediatePropagationStopped: $, preventDefault: function preventDefault() {
	      var a = this.originalEvent;this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault();
	    }, stopPropagation: function stopPropagation() {
	      var a = this.originalEvent;this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation();
	    }, stopImmediatePropagation: function stopImmediatePropagation() {
	      var a = this.originalEvent;this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
	    } }, n.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
	    n.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
	        var c,
	            d = this,
	            e = a.relatedTarget,
	            f = a.handleObj;return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
	      } };
	  }), k.focusinBubbles || n.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
	    var c = function c(a) {
	      n.event.simulate(b, a.target, n.event.fix(a), !0);
	    };n.event.special[b] = { setup: function setup() {
	        var d = this.ownerDocument || this,
	            e = L.access(d, b);e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1);
	      }, teardown: function teardown() {
	        var d = this.ownerDocument || this,
	            e = L.access(d, b) - 1;e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b));
	      } };
	  }), n.fn.extend({ on: function on(a, b, c, d, e) {
	      var f, g;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        "string" != typeof b && (c = c || b, b = void 0);for (g in a) {
	          this.on(g, b, c, a[g], e);
	        }return this;
	      }if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = $;else if (!d) return this;return 1 === e && (f = d, d = function d(a) {
	        return n().off(a), f.apply(this, arguments);
	      }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function () {
	        n.event.add(this, a, d, c, b);
	      });
	    }, one: function one(a, b, c, d) {
	      return this.on(a, b, c, d, 1);
	    }, off: function off(a, b, c) {
	      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
	        for (e in a) {
	          this.off(e, b, a[e]);
	        }return this;
	      }return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function () {
	        n.event.remove(this, a, c, b);
	      });
	    }, trigger: function trigger(a, b) {
	      return this.each(function () {
	        n.event.trigger(a, b, this);
	      });
	    }, triggerHandler: function triggerHandler(a, b) {
	      var c = this[0];return c ? n.event.trigger(a, b, c, !0) : void 0;
	    } });var aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      ba = /<([\w:]+)/,
	      ca = /<|&#?\w+;/,
	      da = /<(?:script|style|link)/i,
	      ea = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      fa = /^$|\/(?:java|ecma)script/i,
	      ga = /^true\/(.*)/,
	      ha = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	      ia = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ia.optgroup = ia.option, ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead, ia.th = ia.td;function ja(a, b) {
	    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
	  }function ka(a) {
	    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
	  }function la(a) {
	    var b = ga.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
	  }function ma(a, b) {
	    for (var c = 0, d = a.length; d > c; c++) {
	      L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"));
	    }
	  }function na(a, b) {
	    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
	      if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
	        delete g.handle, g.events = {};for (e in j) {
	          for (c = 0, d = j[e].length; d > c; c++) {
	            n.event.add(b, e, j[e][c]);
	          }
	        }
	      }M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i));
	    }
	  }function oa(a, b) {
	    var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c;
	  }function pa(a, b) {
	    var c = b.nodeName.toLowerCase();"input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
	  }n.extend({ clone: function clone(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h = a.cloneNode(!0),
	          i = n.contains(a.ownerDocument, a);if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (g = oa(h), f = oa(a), d = 0, e = f.length; e > d; d++) {
	        pa(f[d], g[d]);
	      }if (b) if (c) for (f = f || oa(a), g = g || oa(h), d = 0, e = f.length; e > d; d++) {
	        na(f[d], g[d]);
	      } else na(a, h);return g = oa(h, "script"), g.length > 0 && ma(g, !i && oa(a, "script")), h;
	    }, buildFragment: function buildFragment(a, b, c, d) {
	      for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++) {
	        if (e = a[m], e || 0 === e) if ("object" === n.type(e)) n.merge(l, e.nodeType ? [e] : e);else if (ca.test(e)) {
	          f = f || k.appendChild(b.createElement("div")), g = (ba.exec(e) || ["", ""])[1].toLowerCase(), h = ia[g] || ia._default, f.innerHTML = h[1] + e.replace(aa, "<$1></$2>") + h[2], j = h[0];while (j--) {
	            f = f.lastChild;
	          }n.merge(l, f.childNodes), f = k.firstChild, f.textContent = "";
	        } else l.push(b.createTextNode(e));
	      }k.textContent = "", m = 0;while (e = l[m++]) {
	        if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = oa(k.appendChild(e), "script"), i && ma(f), c)) {
	          j = 0;while (e = f[j++]) {
	            fa.test(e.type || "") && c.push(e);
	          }
	        }
	      }return k;
	    }, cleanData: function cleanData(a) {
	      for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {
	        if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
	          if (b.events) for (d in b.events) {
	            f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
	          }L.cache[e] && delete L.cache[e];
	        }delete M.cache[c[M.expando]];
	      }
	    } }), n.fn.extend({ text: function text(a) {
	      return J(this, function (a) {
	        return void 0 === a ? n.text(this) : this.empty().each(function () {
	          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);
	        });
	      }, null, a, arguments.length);
	    }, append: function append() {
	      return this.domManip(arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = ja(this, a);b.appendChild(a);
	        }
	      });
	    }, prepend: function prepend() {
	      return this.domManip(arguments, function (a) {
	        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
	          var b = ja(this, a);b.insertBefore(a, b.firstChild);
	        }
	      });
	    }, before: function before() {
	      return this.domManip(arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this);
	      });
	    }, after: function after() {
	      return this.domManip(arguments, function (a) {
	        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
	      });
	    }, remove: function remove(a, b) {
	      for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) {
	        b || 1 !== c.nodeType || n.cleanData(oa(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && ma(oa(c, "script")), c.parentNode.removeChild(c));
	      }return this;
	    }, empty: function empty() {
	      for (var a, b = 0; null != (a = this[b]); b++) {
	        1 === a.nodeType && (n.cleanData(oa(a, !1)), a.textContent = "");
	      }return this;
	    }, clone: function clone(a, b) {
	      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
	        return n.clone(this, a, b);
	      });
	    }, html: function html(a) {
	      return J(this, function (a) {
	        var b = this[0] || {},
	            c = 0,
	            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !da.test(a) && !ia[(ba.exec(a) || ["", ""])[1].toLowerCase()]) {
	          a = a.replace(aa, "<$1></$2>");try {
	            for (; d > c; c++) {
	              b = this[c] || {}, 1 === b.nodeType && (n.cleanData(oa(b, !1)), b.innerHTML = a);
	            }b = 0;
	          } catch (e) {}
	        }b && this.empty().append(a);
	      }, null, a, arguments.length);
	    }, replaceWith: function replaceWith() {
	      var a = arguments[0];return this.domManip(arguments, function (b) {
	        a = this.parentNode, n.cleanData(oa(this)), a && a.replaceChild(b, this);
	      }), a && (a.length || a.nodeType) ? this : this.remove();
	    }, detach: function detach(a) {
	      return this.remove(a, !0);
	    }, domManip: function domManip(a, b) {
	      a = e.apply([], a);var c,
	          d,
	          f,
	          g,
	          h,
	          i,
	          j = 0,
	          l = this.length,
	          m = this,
	          o = l - 1,
	          p = a[0],
	          q = n.isFunction(p);if (q || l > 1 && "string" == typeof p && !k.checkClone && ea.test(p)) return this.each(function (c) {
	        var d = m.eq(c);q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
	      });if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
	        for (f = n.map(oa(c, "script"), ka), g = f.length; l > j; j++) {
	          h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, oa(h, "script"))), b.call(this[j], h, j);
	        }if (g) for (i = f[f.length - 1].ownerDocument, n.map(f, la), j = 0; g > j; j++) {
	          h = f[j], fa.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(ha, "")));
	        }
	      }return this;
	    } }), n.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
	    n.fn[a] = function (a) {
	      for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++) {
	        c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
	      }return this.pushStack(d);
	    };
	  });var qa,
	      ra = {};function sa(b, c) {
	    var d,
	        e = n(c.createElement(b)).appendTo(c.body),
	        f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");return e.detach(), f;
	  }function ta(a) {
	    var b = l,
	        c = ra[a];return c || (c = sa(a, b), "none" !== c && c || (qa = (qa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qa[0].contentDocument, b.write(), b.close(), c = sa(a, b), qa.detach()), ra[a] = c), c;
	  }var ua = /^margin/,
	      va = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
	      wa = function wa(b) {
	    return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
	  };function xa(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.style;return c = c || wa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), va.test(g) && ua.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
	  }function ya(a, b) {
	    return { get: function get() {
	        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
	      } };
	  }!function () {
	    var b,
	        c,
	        d = l.documentElement,
	        e = l.createElement("div"),
	        f = l.createElement("div");if (f.style) {
	      (function () {
	        var g = function g() {
	          f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);var g = a.getComputedStyle(f, null);b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e);
	        };

	        f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);a.getComputedStyle && n.extend(k, { pixelPosition: function pixelPosition() {
	            return g(), b;
	          }, boxSizingReliable: function boxSizingReliable() {
	            return null == c && g(), c;
	          }, reliableMarginRight: function reliableMarginRight() {
	            var b,
	                c = f.appendChild(l.createElement("div"));return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b;
	          } });
	      })();
	    }
	  }(), n.swap = function (a, b, c, d) {
	    var e,
	        f,
	        g = {};for (f in b) {
	      g[f] = a.style[f], a.style[f] = b[f];
	    }e = c.apply(a, d || []);for (f in b) {
	      a.style[f] = g[f];
	    }return e;
	  };var za = /^(none|table(?!-c[ea]).+)/,
	      Aa = new RegExp("^(" + Q + ")(.*)$", "i"),
	      Ba = new RegExp("^([+-])=(" + Q + ")", "i"),
	      Ca = { position: "absolute", visibility: "hidden", display: "block" },
	      Da = { letterSpacing: "0", fontWeight: "400" },
	      Ea = ["Webkit", "O", "Moz", "ms"];function Fa(a, b) {
	    if (b in a) return b;var c = b[0].toUpperCase() + b.slice(1),
	        d = b,
	        e = Ea.length;while (e--) {
	      if (b = Ea[e] + c, b in a) return b;
	    }return d;
	  }function Ga(a, b, c) {
	    var d = Aa.exec(b);return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
	  }function Ha(a, b, c, d, e) {
	    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) {
	      "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
	    }return g;
	  }function Ia(a, b, c) {
	    var d = !0,
	        e = "width" === b ? a.offsetWidth : a.offsetHeight,
	        f = wa(a),
	        g = "border-box" === n.css(a, "boxSizing", !1, f);if (0 >= e || null == e) {
	      if (e = xa(a, b, f), (0 > e || null == e) && (e = a.style[b]), va.test(e)) return e;d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
	    }return e + Ha(a, b, c || (g ? "border" : "content"), d, f) + "px";
	  }function Ja(a, b) {
	    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) {
	      d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", ta(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
	    }for (g = 0; h > g; g++) {
	      d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
	    }return a;
	  }n.extend({ cssHooks: { opacity: { get: function get(a, b) {
	          if (b) {
	            var c = xa(a, "opacity");return "" === c ? "1" : c;
	          }
	        } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
	      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
	        var e,
	            f,
	            g,
	            h = n.camelCase(b),
	            i = a.style;return b = n.cssProps[h] || (n.cssProps[h] = Fa(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = Ba.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0);
	      }
	    }, css: function css(a, b, c, d) {
	      var e,
	          f,
	          g,
	          h = n.camelCase(b);return b = n.cssProps[h] || (n.cssProps[h] = Fa(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xa(a, b, d)), "normal" === e && b in Da && (e = Da[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e;
	    } }), n.each(["height", "width"], function (a, b) {
	    n.cssHooks[b] = { get: function get(a, c, d) {
	        return c ? za.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Ca, function () {
	          return Ia(a, b, d);
	        }) : Ia(a, b, d) : void 0;
	      }, set: function set(a, c, d) {
	        var e = d && wa(a);return Ga(a, c, d ? Ha(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0);
	      } };
	  }), n.cssHooks.marginRight = ya(k.reliableMarginRight, function (a, b) {
	    return b ? n.swap(a, { display: "inline-block" }, xa, [a, "marginRight"]) : void 0;
	  }), n.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
	    n.cssHooks[a + b] = { expand: function expand(c) {
	        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) {
	          e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
	        }return e;
	      } }, ua.test(a) || (n.cssHooks[a + b].set = Ga);
	  }), n.fn.extend({ css: function css(a, b) {
	      return J(this, function (a, b, c) {
	        var d,
	            e,
	            f = {},
	            g = 0;if (n.isArray(b)) {
	          for (d = wa(a), e = b.length; e > g; g++) {
	            f[b[g]] = n.css(a, b[g], !1, d);
	          }return f;
	        }return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
	      }, a, b, arguments.length > 1);
	    }, show: function show() {
	      return Ja(this, !0);
	    }, hide: function hide() {
	      return Ja(this);
	    }, toggle: function toggle(a) {
	      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
	        S(this) ? n(this).show() : n(this).hide();
	      });
	    } });function Ka(a, b, c, d, e) {
	    return new Ka.prototype.init(a, b, c, d, e);
	  }n.Tween = Ka, Ka.prototype = { constructor: Ka, init: function init(a, b, c, d, e, f) {
	      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
	    }, cur: function cur() {
	      var a = Ka.propHooks[this.prop];return a && a.get ? a.get(this) : Ka.propHooks._default.get(this);
	    }, run: function run(a) {
	      var b,
	          c = Ka.propHooks[this.prop];return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ka.propHooks._default.set(this), this;
	    } }, Ka.prototype.init.prototype = Ka.prototype, Ka.propHooks = { _default: { get: function get(a) {
	        var b;return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop];
	      }, set: function set(a) {
	        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
	      } } }, Ka.propHooks.scrollTop = Ka.propHooks.scrollLeft = { set: function set(a) {
	      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
	    } }, n.easing = { linear: function linear(a) {
	      return a;
	    }, swing: function swing(a) {
	      return .5 - Math.cos(a * Math.PI) / 2;
	    } }, n.fx = Ka.prototype.init, n.fx.step = {};var La,
	      Ma,
	      Na = /^(?:toggle|show|hide)$/,
	      Oa = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
	      Pa = /queueHooks$/,
	      Qa = [Va],
	      Ra = { "*": [function (a, b) {
	      var c = this.createTween(a, b),
	          d = c.cur(),
	          e = Oa.exec(b),
	          f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
	          g = (n.cssNumber[a] || "px" !== f && +d) && Oa.exec(n.css(c.elem, a)),
	          h = 1,
	          i = 20;if (g && g[3] !== f) {
	        f = f || g[3], e = e || [], g = +d || 1;do {
	          h = h || ".5", g /= h, n.style(c.elem, a, g + f);
	        } while (h !== (h = c.cur() / d) && 1 !== h && --i);
	      }return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
	    }] };function Sa() {
	    return setTimeout(function () {
	      La = void 0;
	    }), La = n.now();
	  }function Ta(a, b) {
	    var c,
	        d = 0,
	        e = { height: a };for (b = b ? 1 : 0; 4 > d; d += 2 - b) {
	      c = R[d], e["margin" + c] = e["padding" + c] = a;
	    }return b && (e.opacity = e.width = a), e;
	  }function Ua(a, b, c) {
	    for (var d, e = (Ra[b] || []).concat(Ra["*"]), f = 0, g = e.length; g > f; f++) {
	      if (d = e[f].call(c, b, a)) return d;
	    }
	  }function Va(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h,
	        i,
	        j,
	        k,
	        l = this,
	        m = {},
	        o = a.style,
	        p = a.nodeType && S(a),
	        q = L.get(a, "fxshow");c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
	      h.unqueued || i();
	    }), h.unqueued++, l.always(function () {
	      l.always(function () {
	        h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
	      });
	    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || ta(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function () {
	      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
	    }));for (d in b) {
	      if (e = b[d], Na.exec(e)) {
	        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
	          if ("show" !== e || !q || void 0 === q[d]) continue;p = !0;
	        }m[d] = q && q[d] || n.style(a, d);
	      } else j = void 0;
	    }if (n.isEmptyObject(m)) "inline" === ("none" === j ? ta(a.nodeName) : j) && (o.display = j);else {
	      q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function () {
	        n(a).hide();
	      }), l.done(function () {
	        var b;L.remove(a, "fxshow");for (b in m) {
	          n.style(a, b, m[b]);
	        }
	      });for (d in m) {
	        g = Ua(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
	      }
	    }
	  }function Wa(a, b) {
	    var c, d, e, f, g;for (c in a) {
	      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
	        f = g.expand(f), delete a[d];for (c in f) {
	          c in a || (a[c] = f[c], b[c] = e);
	        }
	      } else b[d] = e;
	    }
	  }function Xa(a, b, c) {
	    var d,
	        e,
	        f = 0,
	        g = Qa.length,
	        h = n.Deferred().always(function () {
	      delete i.elem;
	    }),
	        i = function i() {
	      if (e) return !1;for (var b = La || Sa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) {
	        j.tweens[g].run(f);
	      }return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
	    },
	        j = h.promise({ elem: a, props: n.extend({}, b), opts: n.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: La || Sa(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
	        var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
	      }, stop: function stop(b) {
	        var c = 0,
	            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; d > c; c++) {
	          j.tweens[c].run(1);
	        }return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
	      } }),
	        k = j.props;for (Wa(k, j.opts.specialEasing); g > f; f++) {
	      if (d = Qa[f].call(j, a, k, j.opts)) return d;
	    }return n.map(k, Ua, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
	  }n.Animation = n.extend(Xa, { tweener: function tweener(a, b) {
	      n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");for (var c, d = 0, e = a.length; e > d; d++) {
	        c = a[d], Ra[c] = Ra[c] || [], Ra[c].unshift(b);
	      }
	    }, prefilter: function prefilter(a, b) {
	      b ? Qa.unshift(a) : Qa.push(a);
	    } }), n.speed = function (a, b, c) {
	    var d = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? n.extend({}, a) : { complete: c || !c && b || n.isFunction(a) && a, duration: a, easing: c && b || b && !n.isFunction(b) && b };return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
	      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
	    }, d;
	  }, n.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
	      return this.filter(S).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
	    }, animate: function animate(a, b, c, d) {
	      var e = n.isEmptyObject(a),
	          f = n.speed(b, c, d),
	          g = function g() {
	        var b = Xa(this, n.extend({}, a), f);(e || L.get(this, "finish")) && b.stop(!0);
	      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
	    }, stop: function stop(a, b, c) {
	      var d = function d(a) {
	        var b = a.stop;delete a.stop, b(c);
	      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
	        var b = !0,
	            e = null != a && a + "queueHooks",
	            f = n.timers,
	            g = L.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
	          g[e] && g[e].stop && Pa.test(e) && d(g[e]);
	        }for (e = f.length; e--;) {
	          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
	        }(b || !c) && n.dequeue(this, a);
	      });
	    }, finish: function finish(a) {
	      return a !== !1 && (a = a || "fx"), this.each(function () {
	        var b,
	            c = L.get(this),
	            d = c[a + "queue"],
	            e = c[a + "queueHooks"],
	            f = n.timers,
	            g = d ? d.length : 0;for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
	          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
	        }for (b = 0; g > b; b++) {
	          d[b] && d[b].finish && d[b].finish.call(this);
	        }delete c.finish;
	      });
	    } }), n.each(["toggle", "show", "hide"], function (a, b) {
	    var c = n.fn[b];n.fn[b] = function (a, d, e) {
	      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Ta(b, !0), a, d, e);
	    };
	  }), n.each({ slideDown: Ta("show"), slideUp: Ta("hide"), slideToggle: Ta("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
	    n.fn[a] = function (a, c, d) {
	      return this.animate(b, a, c, d);
	    };
	  }), n.timers = [], n.fx.tick = function () {
	    var a,
	        b = 0,
	        c = n.timers;for (La = n.now(); b < c.length; b++) {
	      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
	    }c.length || n.fx.stop(), La = void 0;
	  }, n.fx.timer = function (a) {
	    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
	  }, n.fx.interval = 13, n.fx.start = function () {
	    Ma || (Ma = setInterval(n.fx.tick, n.fx.interval));
	  }, n.fx.stop = function () {
	    clearInterval(Ma), Ma = null;
	  }, n.fx.speeds = { slow: 600, fast: 200, _default: 400 }, n.fn.delay = function (a, b) {
	    return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
	      var d = setTimeout(b, a);c.stop = function () {
	        clearTimeout(d);
	      };
	    });
	  }, function () {
	    var a = l.createElement("input"),
	        b = l.createElement("select"),
	        c = b.appendChild(l.createElement("option"));a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value;
	  }();var Ya,
	      Za,
	      $a = n.expr.attrHandle;n.fn.extend({ attr: function attr(a, b) {
	      return J(this, n.attr, a, b, arguments.length > 1);
	    }, removeAttr: function removeAttr(a) {
	      return this.each(function () {
	        n.removeAttr(this, a);
	      });
	    } }), n.extend({ attr: function attr(a, b, c) {
	      var d,
	          e,
	          f = a.nodeType;if (a && 3 !== f && 8 !== f && 2 !== f) return _typeof(a.getAttribute) === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Za : Ya)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b));
	    }, removeAttr: function removeAttr(a, b) {
	      var c,
	          d,
	          e = 0,
	          f = b && b.match(E);if (f && 1 === a.nodeType) while (c = f[e++]) {
	        d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c);
	      }
	    }, attrHooks: { type: { set: function set(a, b) {
	          if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
	            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
	          }
	        } } } }), Za = { set: function set(a, b, c) {
	      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c;
	    } }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
	    var c = $a[b] || n.find.attr;$a[b] = function (a, b, d) {
	      var e, f;return d || (f = $a[b], $a[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $a[b] = f), e;
	    };
	  });var _a = /^(?:input|select|textarea|button)$/i;n.fn.extend({ prop: function prop(a, b) {
	      return J(this, n.prop, a, b, arguments.length > 1);
	    }, removeProp: function removeProp(a) {
	      return this.each(function () {
	        delete this[n.propFix[a] || a];
	      });
	    } }), n.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function prop(a, b, c) {
	      var d,
	          e,
	          f,
	          g = a.nodeType;if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
	    }, propHooks: { tabIndex: { get: function get(a) {
	          return a.hasAttribute("tabindex") || _a.test(a.nodeName) || a.href ? a.tabIndex : -1;
	        } } } }), k.optSelected || (n.propHooks.selected = { get: function get(a) {
	      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
	    } }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	    n.propFix[this.toLowerCase()] = this;
	  });var ab = /[\t\r\n\f]/g;n.fn.extend({ addClass: function addClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h = "string" == typeof a && a,
	          i = 0,
	          j = this.length;if (n.isFunction(a)) return this.each(function (b) {
	        n(this).addClass(a.call(this, b, this.className));
	      });if (h) for (b = (a || "").match(E) || []; j > i; i++) {
	        if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : " ")) {
	          f = 0;while (e = b[f++]) {
	            d.indexOf(" " + e + " ") < 0 && (d += e + " ");
	          }g = n.trim(d), c.className !== g && (c.className = g);
	        }
	      }return this;
	    }, removeClass: function removeClass(a) {
	      var b,
	          c,
	          d,
	          e,
	          f,
	          g,
	          h = 0 === arguments.length || "string" == typeof a && a,
	          i = 0,
	          j = this.length;if (n.isFunction(a)) return this.each(function (b) {
	        n(this).removeClass(a.call(this, b, this.className));
	      });if (h) for (b = (a || "").match(E) || []; j > i; i++) {
	        if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : "")) {
	          f = 0;while (e = b[f++]) {
	            while (d.indexOf(" " + e + " ") >= 0) {
	              d = d.replace(" " + e + " ", " ");
	            }
	          }g = a ? n.trim(d) : "", c.className !== g && (c.className = g);
	        }
	      }return this;
	    }, toggleClass: function toggleClass(a, b) {
	      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function (c) {
	        n(this).toggleClass(a.call(this, c, this.className, b), b);
	      } : function () {
	        if ("string" === c) {
	          var b,
	              d = 0,
	              e = n(this),
	              f = a.match(E) || [];while (b = f[d++]) {
	            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
	          }
	        } else (c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "");
	      });
	    }, hasClass: function hasClass(a) {
	      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) {
	        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ab, " ").indexOf(b) >= 0) return !0;
	      }return !1;
	    } });var bb = /\r/g;n.fn.extend({ val: function val(a) {
	      var b,
	          c,
	          d,
	          e = this[0];{
	        if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
	          var e;1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
	            return null == a ? "" : a + "";
	          })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
	        });if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bb, "") : null == c ? "" : c);
	      }
	    } }), n.extend({ valHooks: { option: { get: function get(a) {
	          var b = n.find.attr(a, "value");return null != b ? b : n.trim(n.text(a));
	        } }, select: { get: function get(a) {
	          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) {
	            if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
	              if (b = n(c).val(), f) return b;g.push(b);
	            }
	          }return g;
	        }, set: function set(a, b) {
	          var c,
	              d,
	              e = a.options,
	              f = n.makeArray(b),
	              g = e.length;while (g--) {
	            d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
	          }return c || (a.selectedIndex = -1), f;
	        } } } }), n.each(["radio", "checkbox"], function () {
	    n.valHooks[this] = { set: function set(a, b) {
	        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;
	      } }, k.checkOn || (n.valHooks[this].get = function (a) {
	      return null === a.getAttribute("value") ? "on" : a.value;
	    });
	  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
	    n.fn[b] = function (a, c) {
	      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
	    };
	  }), n.fn.extend({ hover: function hover(a, b) {
	      return this.mouseenter(a).mouseleave(b || a);
	    }, bind: function bind(a, b, c) {
	      return this.on(a, null, b, c);
	    }, unbind: function unbind(a, b) {
	      return this.off(a, null, b);
	    }, delegate: function delegate(a, b, c, d) {
	      return this.on(b, a, c, d);
	    }, undelegate: function undelegate(a, b, c) {
	      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
	    } });var cb = n.now(),
	      db = /\?/;n.parseJSON = function (a) {
	    return JSON.parse(a + "");
	  }, n.parseXML = function (a) {
	    var b, c;if (!a || "string" != typeof a) return null;try {
	      c = new DOMParser(), b = c.parseFromString(a, "text/xml");
	    } catch (d) {
	      b = void 0;
	    }return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b;
	  };var eb = /#.*$/,
	      fb = /([?&])_=[^&]*/,
	      gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
	      hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      ib = /^(?:GET|HEAD)$/,
	      jb = /^\/\//,
	      kb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	      lb = {},
	      mb = {},
	      nb = "*/".concat("*"),
	      ob = a.location.href,
	      pb = kb.exec(ob.toLowerCase()) || [];function qb(a) {
	    return function (b, c) {
	      "string" != typeof b && (c = b, b = "*");var d,
	          e = 0,
	          f = b.toLowerCase().match(E) || [];if (n.isFunction(c)) while (d = f[e++]) {
	        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
	      }
	    };
	  }function rb(a, b, c, d) {
	    var e = {},
	        f = a === mb;function g(h) {
	      var i;return e[h] = !0, n.each(a[h] || [], function (a, h) {
	        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
	      }), i;
	    }return g(b.dataTypes[0]) || !e["*"] && g("*");
	  }function sb(a, b) {
	    var c,
	        d,
	        e = n.ajaxSettings.flatOptions || {};for (c in b) {
	      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
	    }return d && n.extend(!0, a, d), a;
	  }function tb(a, b, c) {
	    var d,
	        e,
	        f,
	        g,
	        h = a.contents,
	        i = a.dataTypes;while ("*" === i[0]) {
	      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
	    }if (d) for (e in h) {
	      if (h[e] && h[e].test(d)) {
	        i.unshift(e);break;
	      }
	    }if (i[0] in c) f = i[0];else {
	      for (e in c) {
	        if (!i[0] || a.converters[e + " " + i[0]]) {
	          f = e;break;
	        }g || (g = e);
	      }f = f || g;
	    }return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
	  }function ub(a, b, c, d) {
	    var e,
	        f,
	        g,
	        h,
	        i,
	        j = {},
	        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
	      j[g.toLowerCase()] = a.converters[g];
	    }f = k.shift();while (f) {
	      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
	        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
	          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
	            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
	          }
	        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
	          b = g(b);
	        } catch (l) {
	          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
	        }
	      }
	    }return { state: "success", data: b };
	  }n.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: ob, type: "GET", isLocal: hb.test(pb[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": nb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
	      return b ? sb(sb(a, n.ajaxSettings), b) : sb(n.ajaxSettings, a);
	    }, ajaxPrefilter: qb(lb), ajaxTransport: qb(mb), ajax: function ajax(a, b) {
	      "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && (b = a, a = void 0), b = b || {};var c,
	          d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = n.ajaxSetup({}, b),
	          l = k.context || k,
	          m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
	          o = n.Deferred(),
	          p = n.Callbacks("once memory"),
	          q = k.statusCode || {},
	          r = {},
	          s = {},
	          t = 0,
	          u = "canceled",
	          v = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
	          var b;if (2 === t) {
	            if (!f) {
	              f = {};while (b = gb.exec(e)) {
	                f[b[1].toLowerCase()] = b[2];
	              }
	            }b = f[a.toLowerCase()];
	          }return null == b ? null : b;
	        }, getAllResponseHeaders: function getAllResponseHeaders() {
	          return 2 === t ? e : null;
	        }, setRequestHeader: function setRequestHeader(a, b) {
	          var c = a.toLowerCase();return t || (a = s[c] = s[c] || a, r[a] = b), this;
	        }, overrideMimeType: function overrideMimeType(a) {
	          return t || (k.mimeType = a), this;
	        }, statusCode: function statusCode(a) {
	          var b;if (a) if (2 > t) for (b in a) {
	            q[b] = [q[b], a[b]];
	          } else v.always(a[v.status]);return this;
	        }, abort: function abort(a) {
	          var b = a || u;return c && c.abort(b), x(0, b), this;
	        } };if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || ob) + "").replace(eb, "").replace(jb, pb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = kb.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pb[1] && h[2] === pb[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (pb[3] || ("http:" === pb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rb(lb, k, b, v), 2 === t) return v;i = n.event && k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !ib.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (db.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = fb.test(d) ? d.replace(fb, "$1_=" + cb++) : d + (db.test(d) ? "&" : "?") + "_=" + cb++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + nb + "; q=0.01" : "") : k.accepts["*"]);for (j in k.headers) {
	        v.setRequestHeader(j, k.headers[j]);
	      }if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();u = "abort";for (j in { success: 1, error: 1, complete: 1 }) {
	        v[j](k[j]);
	      }if (c = rb(mb, k, b, v)) {
	        v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () {
	          v.abort("timeout");
	        }, k.timeout));try {
	          t = 1, c.send(r, x);
	        } catch (w) {
	          if (!(2 > t)) throw w;x(-1, w);
	        }
	      } else x(-1, "No Transport");function x(a, b, f, h) {
	        var j,
	            r,
	            s,
	            u,
	            w,
	            x = b;2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tb(k, v, f)), u = ub(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")));
	      }return v;
	    }, getJSON: function getJSON(a, b, c) {
	      return n.get(a, b, c, "json");
	    }, getScript: function getScript(a, b) {
	      return n.get(a, void 0, b, "script");
	    } }), n.each(["get", "post"], function (a, b) {
	    n[b] = function (a, c, d, e) {
	      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({ url: a, type: b, dataType: e, data: c, success: d });
	    };
	  }), n._evalUrl = function (a) {
	    return n.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 });
	  }, n.fn.extend({ wrapAll: function wrapAll(a) {
	      var b;return n.isFunction(a) ? this.each(function (b) {
	        n(this).wrapAll(a.call(this, b));
	      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
	        var a = this;while (a.firstElementChild) {
	          a = a.firstElementChild;
	        }return a;
	      }).append(this)), this);
	    }, wrapInner: function wrapInner(a) {
	      return this.each(n.isFunction(a) ? function (b) {
	        n(this).wrapInner(a.call(this, b));
	      } : function () {
	        var b = n(this),
	            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
	      });
	    }, wrap: function wrap(a) {
	      var b = n.isFunction(a);return this.each(function (c) {
	        n(this).wrapAll(b ? a.call(this, c) : a);
	      });
	    }, unwrap: function unwrap() {
	      return this.parent().each(function () {
	        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
	      }).end();
	    } }), n.expr.filters.hidden = function (a) {
	    return a.offsetWidth <= 0 && a.offsetHeight <= 0;
	  }, n.expr.filters.visible = function (a) {
	    return !n.expr.filters.hidden(a);
	  };var vb = /%20/g,
	      wb = /\[\]$/,
	      xb = /\r?\n/g,
	      yb = /^(?:submit|button|image|reset|file)$/i,
	      zb = /^(?:input|select|textarea|keygen)/i;function Ab(a, b, c, d) {
	    var e;if (n.isArray(b)) n.each(b, function (b, e) {
	      c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? b : "") + "]", e, c, d);
	    });else if (c || "object" !== n.type(b)) d(a, b);else for (e in b) {
	      Ab(a + "[" + e + "]", b[e], c, d);
	    }
	  }n.param = function (a, b) {
	    var c,
	        d = [],
	        e = function e(a, b) {
	      b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
	    };if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
	      e(this.name, this.value);
	    });else for (c in a) {
	      Ab(c, a[c], b, e);
	    }return d.join("&").replace(vb, "+");
	  }, n.fn.extend({ serialize: function serialize() {
	      return n.param(this.serializeArray());
	    }, serializeArray: function serializeArray() {
	      return this.map(function () {
	        var a = n.prop(this, "elements");return a ? n.makeArray(a) : this;
	      }).filter(function () {
	        var a = this.type;return this.name && !n(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !T.test(a));
	      }).map(function (a, b) {
	        var c = n(this).val();return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
	          return { name: b.name, value: a.replace(xb, "\r\n") };
	        }) : { name: b.name, value: c.replace(xb, "\r\n") };
	      }).get();
	    } }), n.ajaxSettings.xhr = function () {
	    try {
	      return new XMLHttpRequest();
	    } catch (a) {}
	  };var Bb = 0,
	      Cb = {},
	      Db = { 0: 200, 1223: 204 },
	      Eb = n.ajaxSettings.xhr();a.attachEvent && a.attachEvent("onunload", function () {
	    for (var a in Cb) {
	      Cb[a]();
	    }
	  }), k.cors = !!Eb && "withCredentials" in Eb, k.ajax = Eb = !!Eb, n.ajaxTransport(function (a) {
	    var _b2;return k.cors || Eb && !a.crossDomain ? { send: function send(c, d) {
	        var e,
	            f = a.xhr(),
	            g = ++Bb;if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) {
	          f[e] = a.xhrFields[e];
	        }a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");for (e in c) {
	          f.setRequestHeader(e, c[e]);
	        }_b2 = function b(a) {
	          return function () {
	            _b2 && (delete Cb[g], _b2 = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? { text: f.responseText } : void 0, f.getAllResponseHeaders()));
	          };
	        }, f.onload = _b2(), f.onerror = _b2("error"), _b2 = Cb[g] = _b2("abort");try {
	          f.send(a.hasContent && a.data || null);
	        } catch (h) {
	          if (_b2) throw h;
	        }
	      }, abort: function abort() {
	        _b2 && _b2();
	      } } : void 0;
	  }), n.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function textScript(a) {
	        return n.globalEval(a), a;
	      } } }), n.ajaxPrefilter("script", function (a) {
	    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
	  }), n.ajaxTransport("script", function (a) {
	    if (a.crossDomain) {
	      var b, _c;return { send: function send(d, e) {
	          b = n("<script>").prop({ async: !0, charset: a.scriptCharset, src: a.url }).on("load error", _c = function c(a) {
	            b.remove(), _c = null, a && e("error" === a.type ? 404 : 200, a.type);
	          }), l.head.appendChild(b[0]);
	        }, abort: function abort() {
	          _c && _c();
	        } };
	    }
	  });var Fb = [],
	      Gb = /(=)\?(?=&|$)|\?\?/;n.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
	      var a = Fb.pop() || n.expando + "_" + cb++;return this[a] = !0, a;
	    } }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
	    var e,
	        f,
	        g,
	        h = b.jsonp !== !1 && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : b.jsonp !== !1 && (b.url += (db.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
	      return g || n.error(e + " was not called"), g[0];
	    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
	      g = arguments;
	    }, d.always(function () {
	      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
	    }), "script") : void 0;
	  }), n.parseHTML = function (a, b, c) {
	    if (!a || "string" != typeof a) return null;"boolean" == typeof b && (c = b, b = !1), b = b || l;var d = v.exec(a),
	        e = !c && [];return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes));
	  };var Hb = n.fn.load;n.fn.load = function (a, b, c) {
	    if ("string" != typeof a && Hb) return Hb.apply(this, arguments);var d,
	        e,
	        f,
	        g = this,
	        h = a.indexOf(" ");return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (e = "POST"), g.length > 0 && n.ajax({ url: a, type: e, dataType: "html", data: b }).done(function (a) {
	      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
	    }).complete(c && function (a, b) {
	      g.each(c, f || [a.responseText, b, a]);
	    }), this;
	  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
	    n.fn[b] = function (a) {
	      return this.on(b, a);
	    };
	  }), n.expr.filters.animated = function (a) {
	    return n.grep(n.timers, function (b) {
	      return a === b.elem;
	    }).length;
	  };var Ib = a.document.documentElement;function Jb(a) {
	    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
	  }n.offset = { setOffset: function setOffset(a, b, c) {
	      var d,
	          e,
	          f,
	          g,
	          h,
	          i,
	          j,
	          k = n.css(a, "position"),
	          l = n(a),
	          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
	    } }, n.fn.extend({ offset: function offset(a) {
	      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
	        n.offset.setOffset(this, a, b);
	      });var b,
	          c,
	          d = this[0],
	          e = { top: 0, left: 0 },
	          f = d && d.ownerDocument;if (f) return b = f.documentElement, n.contains(b, d) ? (_typeof(d.getBoundingClientRect) !== U && (e = d.getBoundingClientRect()), c = Jb(f), { top: e.top + c.pageYOffset - b.clientTop, left: e.left + c.pageXOffset - b.clientLeft }) : e;
	    }, position: function position() {
	      if (this[0]) {
	        var a,
	            b,
	            c = this[0],
	            d = { top: 0, left: 0 };return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), { top: b.top - d.top - n.css(c, "marginTop", !0), left: b.left - d.left - n.css(c, "marginLeft", !0) };
	      }
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        var a = this.offsetParent || Ib;while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) {
	          a = a.offsetParent;
	        }return a || Ib;
	      });
	    } }), n.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (b, c) {
	    var d = "pageYOffset" === c;n.fn[b] = function (e) {
	      return J(this, function (b, e, f) {
	        var g = Jb(b);return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f);
	      }, b, e, arguments.length, null);
	    };
	  }), n.each(["top", "left"], function (a, b) {
	    n.cssHooks[b] = ya(k.pixelPosition, function (a, c) {
	      return c ? (c = xa(a, b), va.test(c) ? n(a).position()[b] + "px" : c) : void 0;
	    });
	  }), n.each({ Height: "height", Width: "width" }, function (a, b) {
	    n.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
	      n.fn[d] = function (d, e) {
	        var f = arguments.length && (c || "boolean" != typeof d),
	            g = c || (d === !0 || e === !0 ? "margin" : "border");return J(this, function (b, c, d) {
	          var e;return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
	        }, b, f ? d : void 0, f, null);
	      };
	    });
	  }), n.fn.size = function () {
	    return this.length;
	  }, n.fn.andSelf = n.fn.addBack, "function" == "function" && __webpack_require__(3) && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return n;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Kb = a.jQuery,
	      Lb = a.$;return n.noConflict = function (b) {
	    return a.$ === n && (a.$ = Lb), b && a.jQuery === n && (a.jQuery = Kb), n;
	  }, (typeof b === "undefined" ? "undefined" : _typeof(b)) === U && (a.jQuery = a.$ = n), n;
	});
	//# sourceMappingURL=jquery.min.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	* # Semantic UI - 2.1.8
	* https://github.com/Semantic-Org/Semantic-UI
	* http://www.semantic-ui.com/
	*
	* Copyright 2014 Contributors
	* Released under the MIT license
	* http://opensource.org/licenses/MIT
	*
	*/
	!function (e, n, t, i) {
	  e.site = e.fn.site = function (o) {
	    var a,
	        r,
	        s = new Date().getTime(),
	        l = [],
	        c = arguments[0],
	        u = "string" == typeof c,
	        d = [].slice.call(arguments, 1),
	        m = e.isPlainObject(o) ? e.extend(!0, {}, e.site.settings, o) : e.extend({}, e.site.settings),
	        f = m.namespace,
	        g = m.error,
	        p = "module-" + f,
	        h = e(t),
	        v = h,
	        b = this,
	        y = v.data(p);return a = { initialize: function initialize() {
	        a.instantiate();
	      }, instantiate: function instantiate() {
	        a.verbose("Storing instance of site", a), y = a, v.data(p, a);
	      }, normalize: function normalize() {
	        a.fix.console(), a.fix.requestAnimationFrame();
	      }, fix: { console: function (_console) {
	          function console() {
	            return _console.apply(this, arguments);
	          }

	          console.toString = function () {
	            return _console.toString();
	          };

	          return console;
	        }(function () {
	          a.debug("Normalizing window.console"), (console === i || console.log === i) && (a.verbose("Console not available, normalizing events"), a.disable.console()), ("undefined" == typeof console.group || "undefined" == typeof console.groupEnd || "undefined" == typeof console.groupCollapsed) && (a.verbose("Console group not available, normalizing events"), n.console.group = function () {}, n.console.groupEnd = function () {}, n.console.groupCollapsed = function () {}), "undefined" == typeof console.markTimeline && (a.verbose("Mark timeline not available, normalizing events"), n.console.markTimeline = function () {});
	        }), consoleClear: function consoleClear() {
	          a.debug("Disabling programmatic console clearing"), n.console.clear = function () {};
	        }, requestAnimationFrame: function requestAnimationFrame() {
	          a.debug("Normalizing requestAnimationFrame"), n.requestAnimationFrame === i && (a.debug("RequestAnimationFrame not available, normalizing event"), n.requestAnimationFrame = n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame || function (e) {
	            setTimeout(e, 0);
	          });
	        } }, moduleExists: function moduleExists(n) {
	        return e.fn[n] !== i && e.fn[n].settings !== i;
	      }, enabled: { modules: function modules(n) {
	          var t = [];return n = n || m.modules, e.each(n, function (e, n) {
	            a.moduleExists(n) && t.push(n);
	          }), t;
	        } }, disabled: { modules: function modules(n) {
	          var t = [];return n = n || m.modules, e.each(n, function (e, n) {
	            a.moduleExists(n) || t.push(n);
	          }), t;
	        } }, change: { setting: function setting(n, t, o, r) {
	          o = "string" == typeof o ? "all" === o ? m.modules : [o] : o || m.modules, r = r !== i ? r : !0, e.each(o, function (i, o) {
	            var s,
	                l = a.moduleExists(o) ? e.fn[o].settings.namespace || !1 : !0;a.moduleExists(o) && (a.verbose("Changing default setting", n, t, o), e.fn[o].settings[n] = t, r && l && (s = e(":data(module-" + l + ")"), s.length > 0 && (a.verbose("Modifying existing settings", s), s[o]("setting", n, t))));
	          });
	        }, settings: function settings(n, t, o) {
	          t = "string" == typeof t ? [t] : t || m.modules, o = o !== i ? o : !0, e.each(t, function (t, i) {
	            var r;a.moduleExists(i) && (a.verbose("Changing default setting", n, i), e.extend(!0, e.fn[i].settings, n), o && f && (r = e(":data(module-" + f + ")"), r.length > 0 && (a.verbose("Modifying existing settings", r), r[i]("setting", n))));
	          });
	        } }, enable: { console: function console() {
	          a.console(!0);
	        }, debug: function debug(e, n) {
	          e = e || m.modules, a.debug("Enabling debug for modules", e), a.change.setting("debug", !0, e, n);
	        }, verbose: function verbose(e, n) {
	          e = e || m.modules, a.debug("Enabling verbose debug for modules", e), a.change.setting("verbose", !0, e, n);
	        } }, disable: { console: function console() {
	          a.console(!1);
	        }, debug: function debug(e, n) {
	          e = e || m.modules, a.debug("Disabling debug for modules", e), a.change.setting("debug", !1, e, n);
	        }, verbose: function verbose(e, n) {
	          e = e || m.modules, a.debug("Disabling verbose debug for modules", e), a.change.setting("verbose", !1, e, n);
	        } }, console: function console(e) {
	        if (e) {
	          if (y.cache.console === i) return void a.error(g.console);a.debug("Restoring console function"), n.console = y.cache.console;
	        } else a.debug("Disabling console function"), y.cache.console = n.console, n.console = { clear: function clear() {}, error: function error() {}, group: function group() {}, groupCollapsed: function groupCollapsed() {}, groupEnd: function groupEnd() {}, info: function info() {}, log: function log() {}, markTimeline: function markTimeline() {}, warn: function warn() {} };
	      }, destroy: function destroy() {
	        a.verbose("Destroying previous site for", v), v.removeData(p);
	      }, cache: {}, setting: function setting(n, t) {
	        if (e.isPlainObject(n)) e.extend(!0, m, n);else {
	          if (t === i) return m[n];m[n] = t;
	        }
	      }, internal: function internal(n, t) {
	        if (e.isPlainObject(n)) e.extend(!0, a, n);else {
	          if (t === i) return a[n];a[n] = t;
	        }
	      }, debug: function debug() {
	        m.debug && (m.performance ? a.performance.log(arguments) : (a.debug = Function.prototype.bind.call(console.info, console, m.name + ":"), a.debug.apply(console, arguments)));
	      }, verbose: function verbose() {
	        m.verbose && m.debug && (m.performance ? a.performance.log(arguments) : (a.verbose = Function.prototype.bind.call(console.info, console, m.name + ":"), a.verbose.apply(console, arguments)));
	      }, error: function error() {
	        a.error = Function.prototype.bind.call(console.error, console, m.name + ":"), a.error.apply(console, arguments);
	      }, performance: { log: function log(e) {
	          var n, t, i;m.performance && (n = new Date().getTime(), i = s || n, t = n - i, s = n, l.push({ Element: b, Name: e[0], Arguments: [].slice.call(e, 1) || "", "Execution Time": t })), clearTimeout(a.performance.timer), a.performance.timer = setTimeout(a.performance.display, 500);
	        }, display: function display() {
	          var n = m.name + ":",
	              t = 0;s = !1, clearTimeout(a.performance.timer), e.each(l, function (e, n) {
	            t += n["Execution Time"];
	          }), n += " " + t + "ms", (console.group !== i || console.table !== i) && l.length > 0 && (console.groupCollapsed(n), console.table ? console.table(l) : e.each(l, function (e, n) {
	            console.log(n.Name + ": " + n["Execution Time"] + "ms");
	          }), console.groupEnd()), l = [];
	        } }, invoke: function invoke(n, t, o) {
	        var s,
	            l,
	            c,
	            u = y;return t = t || d, o = b || o, "string" == typeof n && u !== i && (n = n.split(/[\. ]/), s = n.length - 1, e.each(n, function (t, o) {
	          var r = t != s ? o + n[t + 1].charAt(0).toUpperCase() + n[t + 1].slice(1) : n;if (e.isPlainObject(u[r]) && t != s) u = u[r];else {
	            if (u[r] !== i) return l = u[r], !1;if (!e.isPlainObject(u[o]) || t == s) return u[o] !== i ? (l = u[o], !1) : (a.error(g.method, n), !1);u = u[o];
	          }
	        })), e.isFunction(l) ? c = l.apply(o, t) : l !== i && (c = l), e.isArray(r) ? r.push(c) : r !== i ? r = [r, c] : c !== i && (r = c), l;
	      } }, u ? (y === i && a.initialize(), a.invoke(c)) : (y !== i && a.destroy(), a.initialize()), r !== i ? r : this;
	  }, e.site.settings = { name: "Site", namespace: "site", error: { console: "Console cannot be restored, most likely it was overwritten outside of module", method: "The method you called is not defined." }, debug: !1, verbose: !1, performance: !0, modules: ["accordion", "api", "checkbox", "dimmer", "dropdown", "embed", "form", "modal", "nag", "popup", "rating", "shape", "sidebar", "state", "sticky", "tab", "transition", "visit", "visibility"], siteNamespace: "site", namespaceStub: { cache: {}, config: {}, sections: {}, section: {}, utilities: {} } }, e.extend(e.expr[":"], { data: e.expr.createPseudo ? e.expr.createPseudo(function (n) {
	      return function (t) {
	        return !!e.data(t, n);
	      };
	    }) : function (n, t, i) {
	      return !!e.data(n, i[3]);
	    } });
	}(_jquery2.default, window, document), function (e, n, t, i) {
	  "use strict";
	  e.fn.form = function (n) {
	    var o,
	        a = e(this),
	        r = a.selector || "",
	        s = new Date().getTime(),
	        l = [],
	        c = arguments[0],
	        u = arguments[1],
	        d = "string" == typeof c,
	        m = [].slice.call(arguments, 1);return a.each(function () {
	      var f,
	          g,
	          p,
	          h,
	          v,
	          b,
	          y,
	          w,
	          C,
	          x,
	          k,
	          S,
	          T,
	          E,
	          A,
	          F,
	          D,
	          O,
	          z = e(this),
	          R = this,
	          j = [],
	          q = !1;O = { initialize: function initialize() {
	          O.get.settings(), d ? (D === i && O.instantiate(), O.invoke(c)) : (O.verbose("Initializing form validation", z, w), O.bindEvents(), O.set.defaults(), O.instantiate());
	        }, instantiate: function instantiate() {
	          O.verbose("Storing instance of module", O), D = O, z.data(A, O);
	        }, destroy: function destroy() {
	          O.verbose("Destroying previous module", D), O.removeEvents(), z.removeData(A);
	        }, refresh: function refresh() {
	          O.verbose("Refreshing selector cache"), f = z.find(k.field), g = z.find(k.group), p = z.find(k.message), h = z.find(k.prompt), v = z.find(k.submit), b = z.find(k.clear), y = z.find(k.reset);
	        }, submit: function submit() {
	          O.verbose("Submitting form", z), z.submit();
	        }, attachEvents: function attachEvents(n, t) {
	          t = t || "submit", e(n).on("click" + F, function (e) {
	            O[t](), e.preventDefault();
	          });
	        }, bindEvents: function bindEvents() {
	          O.verbose("Attaching form events"), z.on("submit" + F, O.validate.form).on("blur" + F, k.field, O.event.field.blur).on("click" + F, k.submit, O.submit).on("click" + F, k.reset, O.reset).on("click" + F, k.clear, O.clear), w.keyboardShortcuts && z.on("keydown" + F, k.field, O.event.field.keydown), f.each(function () {
	            var n = e(this),
	                t = n.prop("type"),
	                i = O.get.changeEvent(t, n);e(this).on(i + F, O.event.field.change);
	          });
	        }, clear: function clear() {
	          f.each(function () {
	            var n = e(this),
	                t = n.parent(),
	                i = n.closest(g),
	                o = i.find(k.prompt),
	                a = n.data(x.defaultValue) || "",
	                r = t.is(k.uiCheckbox),
	                s = t.is(k.uiDropdown),
	                l = i.hasClass(S.error);l && (O.verbose("Resetting error on field", i), i.removeClass(S.error), o.remove()), s ? (O.verbose("Resetting dropdown value", t, a), t.dropdown("clear")) : r ? n.prop("checked", !1) : (O.verbose("Resetting field value", n, a), n.val(""));
	          });
	        }, reset: function reset() {
	          f.each(function () {
	            var n = e(this),
	                t = n.parent(),
	                o = n.closest(g),
	                a = o.find(k.prompt),
	                r = n.data(x.defaultValue),
	                s = t.is(k.uiCheckbox),
	                l = t.is(k.uiDropdown),
	                c = o.hasClass(S.error);r !== i && (c && (O.verbose("Resetting error on field", o), o.removeClass(S.error), a.remove()), l ? (O.verbose("Resetting dropdown value", t, r), t.dropdown("restore defaults")) : s ? (O.verbose("Resetting checkbox value", t, r), n.prop("checked", r)) : (O.verbose("Resetting field value", n, r), n.val(r)));
	          });
	        }, is: { bracketedRule: function bracketedRule(e) {
	            return e.type && e.type.match(w.regExp.bracket);
	          }, valid: function valid() {
	            var n = !0;return O.verbose("Checking if form is valid"), e.each(C, function (e, t) {
	              O.validate.field(t, e) || (n = !1);
	            }), n;
	          } }, removeEvents: function removeEvents() {
	          z.off(F), f.off(F), v.off(F), f.off(F);
	        }, event: { field: { keydown: function keydown(n) {
	              var t = e(this),
	                  i = n.which,
	                  o = { enter: 13, escape: 27 };i == o.escape && (O.verbose("Escape key pressed blurring field"), t.blur()), !n.ctrlKey && i == o.enter && t.is(k.input) && t.not(k.checkbox).length > 0 && (q || (t.one("keyup" + F, O.event.field.keyup), O.submit(), O.debug("Enter pressed on input submitting form")), q = !0);
	            }, keyup: function keyup() {
	              q = !1;
	            }, blur: function blur(n) {
	              var t = e(this),
	                  i = t.closest(g),
	                  o = O.get.validation(t);i.hasClass(S.error) ? (O.debug("Revalidating field", t, o), O.validate.form.call(O, n, !0)) : ("blur" == w.on || "change" == w.on) && o && O.validate.field(o);
	            }, change: function change(n) {
	              var t = e(this),
	                  i = t.closest(g);("change" == w.on || i.hasClass(S.error) && w.revalidate) && (clearTimeout(O.timer), O.timer = setTimeout(function () {
	                O.debug("Revalidating field", t, O.get.validation(t)), O.validate.form.call(O, n, !0);
	              }, w.delay));
	            } } }, get: { ancillaryValue: function ancillaryValue(e) {
	            return e.type && O.is.bracketedRule(e) ? e.type.match(w.regExp.bracket)[1] + "" : !1;
	          }, ruleName: function ruleName(e) {
	            return O.is.bracketedRule(e) ? e.type.replace(e.type.match(w.regExp.bracket)[0], "") : e.type;
	          }, changeEvent: function changeEvent(e, n) {
	            return "checkbox" == e || "radio" == e || "hidden" == e || n.is("select") ? "change" : O.get.inputEvent();
	          }, inputEvent: function inputEvent() {
	            return t.createElement("input").oninput !== i ? "input" : t.createElement("input").onpropertychange !== i ? "propertychange" : "keyup";
	          }, prompt: function prompt(e, n) {
	            var t,
	                i,
	                o,
	                a = O.get.ruleName(e),
	                r = O.get.ancillaryValue(e),
	                s = e.prompt || w.prompt[a] || w.text.unspecifiedRule,
	                l = -1 !== s.search("{value}"),
	                c = -1 !== s.search("{name}");return (c || l) && (i = O.get.field(n.identifier)), l && (s = s.replace("{value}", i.val())), c && (t = i.closest(k.group).find("label").eq(0), o = 1 == t.size() ? t.text() : i.prop("placeholder") || w.text.unspecifiedField, s = s.replace("{name}", o)), s = s.replace("{identifier}", n.identifier), s = s.replace("{ruleValue}", r), e.prompt || O.verbose("Using default validation prompt for type", s, a), s;
	          }, settings: function settings() {
	            if (e.isPlainObject(n)) {
	              var t,
	                  o = Object.keys(n),
	                  a = o.length > 0 ? n[o[0]].identifier !== i && n[o[0]].rules !== i : !1;a ? (w = e.extend(!0, {}, e.fn.form.settings, u), C = e.extend({}, e.fn.form.settings.defaults, n), O.error(w.error.oldSyntax, R), O.verbose("Extending settings from legacy parameters", C, w)) : (n.fields && (t = Object.keys(n.fields), ("string" == typeof n.fields[t[0]] || e.isArray(n.fields[t[0]])) && e.each(n.fields, function (t, i) {
	                "string" == typeof i && (i = [i]), n.fields[t] = { rules: [] }, e.each(i, function (e, i) {
	                  n.fields[t].rules.push({ type: i });
	                });
	              })), w = e.extend(!0, {}, e.fn.form.settings, n), C = e.extend({}, e.fn.form.settings.defaults, w.fields), O.verbose("Extending settings", C, w));
	            } else w = e.fn.form.settings, C = e.fn.form.settings.defaults, O.verbose("Using default form validation", C, w);E = w.namespace, x = w.metadata, k = w.selector, S = w.className, T = w.error, A = "module-" + E, F = "." + E, D = z.data(A), O.refresh();
	          }, field: function field(n) {
	            return O.verbose("Finding field with identifier", n), f.filter("#" + n).length > 0 ? f.filter("#" + n) : f.filter('[name="' + n + '"]').length > 0 ? f.filter('[name="' + n + '"]') : f.filter('[name="' + n + '[]"]').length > 0 ? f.filter('[name="' + n + '[]"]') : f.filter("[data-" + x.validate + '="' + n + '"]').length > 0 ? f.filter("[data-" + x.validate + '="' + n + '"]') : e("<input/>");
	          }, fields: function fields(n) {
	            var t = e();return e.each(n, function (e, n) {
	              t = t.add(O.get.field(n));
	            }), t;
	          }, validation: function validation(n) {
	            var t, i;return C ? (e.each(C, function (e, o) {
	              i = o.identifier || e, O.get.field(i)[0] == n[0] && (o.identifier = i, t = o);
	            }), t || !1) : !1;
	          }, value: function value(e) {
	            var n,
	                t = [];return t.push(e), n = O.get.values.call(R, t), n[e];
	          }, values: function values(n) {
	            var t = e.isArray(n) ? O.get.fields(n) : f,
	                i = {};return t.each(function (n, t) {
	              var o = e(t),
	                  a = (o.prop("type"), o.prop("name")),
	                  r = o.val(),
	                  s = o.is(k.checkbox),
	                  l = o.is(k.radio),
	                  c = -1 !== a.indexOf("[]"),
	                  u = s ? o.is(":checked") : !1;a && (c ? (a = a.replace("[]", ""), i[a] || (i[a] = []), s ? u ? i[a].push(r || !0) : i[a].push(!1) : i[a].push(r)) : l ? u && (i[a] = r) : s ? u ? i[a] = r || !0 : i[a] = !1 : i[a] = r);
	            }), i;
	          } }, has: { field: function field(e) {
	            return O.verbose("Checking for existence of a field with identifier", e), "string" != typeof e && O.error(T.identifier, e), f.filter("#" + e).length > 0 ? !0 : f.filter('[name="' + e + '"]').length > 0 ? !0 : f.filter("[data-" + x.validate + '="' + e + '"]').length > 0 ? !0 : !1;
	          } }, add: { prompt: function prompt(n, t) {
	            var o = O.get.field(n),
	                a = o.closest(g),
	                r = a.children(k.prompt),
	                s = 0 !== r.length;t = "string" == typeof t ? [t] : t, O.verbose("Adding field error state", n), a.addClass(S.error), w.inline && (s || (r = w.templates.prompt(t), r.appendTo(a)), r.html(t[0]), s ? O.verbose("Inline errors are disabled, no inline error added", n) : w.transition && e.fn.transition !== i && z.transition("is supported") ? (O.verbose("Displaying error with css transition", w.transition), r.transition(w.transition + " in", w.duration)) : (O.verbose("Displaying error with fallback javascript animation"), r.fadeIn(w.duration)));
	          }, errors: function errors(e) {
	            O.debug("Adding form error messages", e), O.set.error(), p.html(w.templates.error(e));
	          } }, remove: { prompt: function prompt(n) {
	            var t = O.get.field(n),
	                o = t.closest(g),
	                a = o.children(k.prompt);o.removeClass(S.error), w.inline && a.is(":visible") && (O.verbose("Removing prompt for field", n), w.transition && e.fn.transition !== i && z.transition("is supported") ? a.transition(w.transition + " out", w.duration, function () {
	              a.remove();
	            }) : a.fadeOut(w.duration, function () {
	              a.remove();
	            }));
	          } }, set: { success: function success() {
	            z.removeClass(S.error).addClass(S.success);
	          }, defaults: function defaults() {
	            f.each(function () {
	              var n = e(this),
	                  t = n.filter(k.checkbox).length > 0,
	                  i = t ? n.is(":checked") : n.val();n.data(x.defaultValue, i);
	            });
	          }, error: function error() {
	            z.removeClass(S.success).addClass(S.error);
	          }, value: function value(e, n) {
	            var t = {};return t[e] = n, O.set.values.call(R, t);
	          }, values: function values(n) {
	            e.isEmptyObject(n) || e.each(n, function (n, t) {
	              var i,
	                  o = O.get.field(n),
	                  a = o.parent(),
	                  r = e.isArray(t),
	                  s = a.is(k.uiCheckbox),
	                  l = a.is(k.uiDropdown),
	                  c = o.is(k.radio) && s,
	                  u = o.length > 0;u && (r && s ? (O.verbose("Selecting multiple", t, o), a.checkbox("uncheck"), e.each(t, function (e, n) {
	                i = o.filter('[value="' + n + '"]'), a = i.parent(), i.length > 0 && a.checkbox("check");
	              })) : c ? (O.verbose("Selecting radio value", t, o), o.filter('[value="' + t + '"]').parent(k.uiCheckbox).checkbox("check")) : s ? (O.verbose("Setting checkbox value", t, a), t === !0 ? a.checkbox("check") : a.checkbox("uncheck")) : l ? (O.verbose("Setting dropdown value", t, a), a.dropdown("set selected", t)) : (O.verbose("Setting field value", t, o), o.val(t)));
	            });
	          } }, validate: { form: function form(e, n) {
	            var t = O.get.values();if (q) return !1;if (j = [], O.is.valid()) {
	              if (O.debug("Form has no validation errors, submitting"), O.set.success(), n !== !0) return w.onSuccess.call(R, e, t);
	            } else if (O.debug("Form has errors"), O.set.error(), w.inline || O.add.errors(j), z.data("moduleApi") !== i && e.stopImmediatePropagation(), n !== !0) return w.onFailure.call(R, j, t);
	          }, field: function field(n, t) {
	            var o = n.identifier || t,
	                a = O.get.field(o),
	                r = !0,
	                s = [];return n.identifier || (O.debug("Using field name as identifier", o), n.identifier = o), a.prop("disabled") ? (O.debug("Field is disabled. Skipping", o), r = !0) : n.optional && "" === e.trim(a.val()) ? (O.debug("Field is optional and empty. Skipping", o), r = !0) : n.rules !== i && e.each(n.rules, function (e, t) {
	              O.has.field(o) && !O.validate.rule(n, t) && (O.debug("Field is invalid", o, t.type), s.push(O.get.prompt(t, n)), r = !1);
	            }), r ? (O.remove.prompt(o, s), w.onValid.call(a), !0) : (j = j.concat(s), O.add.prompt(o, s), w.onInvalid.call(a, s), !1);
	          }, rule: function rule(n, t) {
	            var o = O.get.field(n.identifier),
	                a = (t.type, o.val()),
	                r = O.get.ancillaryValue(t),
	                s = O.get.ruleName(t),
	                l = w.rules[s];return e.isFunction(l) ? (a = a === i || "" === a || null === a ? "" : e.trim(a + ""), l.call(o, a, r)) : void O.error(T.noRule, s);
	          } }, setting: function setting(n, t) {
	          if (e.isPlainObject(n)) e.extend(!0, w, n);else {
	            if (t === i) return w[n];w[n] = t;
	          }
	        }, internal: function internal(n, t) {
	          if (e.isPlainObject(n)) e.extend(!0, O, n);else {
	            if (t === i) return O[n];O[n] = t;
	          }
	        }, debug: function debug() {
	          w.debug && (w.performance ? O.performance.log(arguments) : (O.debug = Function.prototype.bind.call(console.info, console, w.name + ":"), O.debug.apply(console, arguments)));
	        }, verbose: function verbose() {
	          w.verbose && w.debug && (w.performance ? O.performance.log(arguments) : (O.verbose = Function.prototype.bind.call(console.info, console, w.name + ":"), O.verbose.apply(console, arguments)));
	        }, error: function error() {
	          O.error = Function.prototype.bind.call(console.error, console, w.name + ":"), O.error.apply(console, arguments);
	        }, performance: { log: function log(e) {
	            var n, t, i;w.performance && (n = new Date().getTime(), i = s || n, t = n - i, s = n, l.push({ Name: e[0], Arguments: [].slice.call(e, 1) || "", Element: R, "Execution Time": t })), clearTimeout(O.performance.timer), O.performance.timer = setTimeout(O.performance.display, 500);
	          }, display: function display() {
	            var n = w.name + ":",
	                t = 0;s = !1, clearTimeout(O.performance.timer), e.each(l, function (e, n) {
	              t += n["Execution Time"];
	            }), n += " " + t + "ms", r && (n += " '" + r + "'"), a.length > 1 && (n += " (" + a.length + ")"), (console.group !== i || console.table !== i) && l.length > 0 && (console.groupCollapsed(n), console.table ? console.table(l) : e.each(l, function (e, n) {
	              console.log(n.Name + ": " + n["Execution Time"] + "ms");
	            }), console.groupEnd()), l = [];
	          } }, invoke: function invoke(n, t, a) {
	          var r,
	              s,
	              l,
	              c = D;return t = t || m, a = R || a, "string" == typeof n && c !== i && (n = n.split(/[\. ]/), r = n.length - 1, e.each(n, function (t, o) {
	            var a = t != r ? o + n[t + 1].charAt(0).toUpperCase() + n[t + 1].slice(1) : n;if (e.isPlainObject(c[a]) && t != r) c = c[a];else {
	              if (c[a] !== i) return s = c[a], !1;if (!e.isPlainObject(c[o]) || t == r) return c[o] !== i ? (s = c[o], !1) : !1;c = c[o];
	            }
	          })), e.isFunction(s) ? l = s.apply(a, t) : s !== i && (l = s), e.isArray(o) ? o.push(l) : o !== i ? o = [o, l] : l !== i && (o = l), s;
	        } }, O.initialize();
	    }), o !== i ? o : this;
	  }, e.fn.form.settings = { name: "Form", namespace: "form", debug: !1, verbose: !1, performance: !0, fields: !1, keyboardShortcuts: !0, on: "submit", inline: !1, delay: 200, revalidate: !0, transition: "scale", duration: 200, onValid: function onValid() {}, onInvalid: function onInvalid() {}, onSuccess: function onSuccess() {
	      return !0;
	    }, onFailure: function onFailure() {
	      return !1;
	    }, metadata: { defaultValue: "default", validate: "validate" }, regExp: { bracket: /\[(.*)\]/i, decimal: /^\d*(\.)\d+/, email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, flags: /^\/(.*)\/(.*)?/, integer: /^\-?\d+$/, number: /^\-?\d*(\.\d+)?$/, url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i }, text: { unspecifiedRule: "Please enter a valid value", unspecifiedField: "This field" }, prompt: { empty: "{name} must have a value", checked: "{name} must be checked", email: "{name} must be a valid e-mail", url: "{name} must be a valid url", regExp: "{name} is not formatted correctly", integer: "{name} must be an integer", decimal: "{name} must be a decimal number", number: "{name} must be set to a number", is: '{name} must be "{ruleValue}"', isExactly: '{name} must be exactly "{ruleValue}"', not: '{name} cannot be set to "{ruleValue}"', notExactly: '{name} cannot be set to exactly "{ruleValue}"', contain: '{name} cannot contain "{ruleValue}"', containExactly: '{name} cannot contain exactly "{ruleValue}"', doesntContain: '{name} must contain  "{ruleValue}"', doesntContainExactly: '{name} must contain exactly "{ruleValue}"', minLength: "{name} must be at least {ruleValue} characters", length: "{name} must be at least {ruleValue} characters", exactLength: "{name} must be exactly {ruleValue} characters", maxLength: "{name} cannot be longer than {ruleValue} characters", match: "{name} must match {ruleValue} field", different: "{name} must have a different value than {ruleValue} field", creditCard: "{name} must be a valid credit card number", minCount: "{name} must have at least {ruleValue} choices", exactCount: "{name} must have exactly {ruleValue} choices", maxCount: "{name} must have {ruleValue} or less choices" }, selector: { checkbox: 'input[type="checkbox"], input[type="radio"]', clear: ".clear", field: "input, textarea, select", group: ".field", input: "input", message: ".error.message", prompt: ".prompt.label", radio: 'input[type="radio"]', reset: '.reset:not([type="reset"])', submit: '.submit:not([type="submit"])', uiCheckbox: ".ui.checkbox", uiDropdown: ".ui.dropdown" }, className: { error: "error", label: "ui prompt label", pressed: "down", success: "success" }, error: { identifier: "You must specify a string identifier for each field", method: "The method you called is not defined.", noRule: "There is no rule matching the one you specified", oldSyntax: "Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically." }, templates: { error: function error(n) {
	        var t = '<ul class="list">';return e.each(n, function (e, n) {
	          t += "<li>" + n + "</li>";
	        }), t += "</ul>", e(t);
	      }, prompt: function prompt(n) {
	        return e("<div/>").addClass("ui basic red pointing prompt label").html(n[0]);
	      } }, rules: { empty: function empty(n) {
	        return !(n === i || "" === n || e.isArray(n) && 0 === n.length);
	      }, checked: function checked() {
	        return e(this).filter(":checked").length > 0;
	      }, email: function email(n) {
	        var t = new RegExp(e.fn.form.settings.regExp.email, "i");return t.test(n);
	      }, url: function url(n) {
	        return e.fn.form.settings.regExp.url.test(n);
	      }, regExp: function regExp(n, t) {
	        var i,
	            o = t.match(e.fn.form.settings.regExp.flags);return o && (t = o.length >= 2 ? o[1] : t, i = o.length >= 3 ? o[2] : ""), n.match(new RegExp(t, i));
	      }, integer: function integer(n, t) {
	        var o,
	            a,
	            r,
	            s = e.fn.form.settings.regExp.integer;return t && -1 === ["", ".."].indexOf(t) && (-1 == t.indexOf("..") ? s.test(t) && (o = a = t - 0) : (r = t.split("..", 2), s.test(r[0]) && (o = r[0] - 0), s.test(r[1]) && (a = r[1] - 0))), s.test(n) && (o === i || n >= o) && (a === i || a >= n);
	      }, decimal: function decimal(n) {
	        return e.fn.form.settings.regExp.decimal.test(n);
	      }, number: function number(n) {
	        return e.fn.form.settings.regExp.number.test(n);
	      }, is: function is(e, n) {
	        return n = "string" == typeof n ? n.toLowerCase() : n, e = "string" == typeof e ? e.toLowerCase() : e, e == n;
	      }, isExactly: function isExactly(e, n) {
	        return e == n;
	      }, not: function not(e, n) {
	        return e = "string" == typeof e ? e.toLowerCase() : e, n = "string" == typeof n ? n.toLowerCase() : n, e != n;
	      }, notExactly: function notExactly(e, n) {
	        return e != n;
	      }, contains: function contains(n, t) {
	        return t = t.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 !== n.search(new RegExp(t, "i"));
	      }, containsExactly: function containsExactly(n, t) {
	        return t = t.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 !== n.search(new RegExp(t));
	      }, doesntContain: function doesntContain(n, t) {
	        return t = t.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 === n.search(new RegExp(t, "i"));
	      }, doesntContainExactly: function doesntContainExactly(n, t) {
	        return t = t.replace(e.fn.form.settings.regExp.escape, "\\$&"), -1 === n.search(new RegExp(t));
	      }, minLength: function minLength(e, n) {
	        return e !== i ? e.length >= n : !1;
	      }, length: function length(e, n) {
	        return e !== i ? e.length >= n : !1;
	      }, exactLength: function exactLength(e, n) {
	        return e !== i ? e.length == n : !1;
	      }, maxLength: function maxLength(e, n) {
	        return e !== i ? e.length <= n : !1;
	      }, match: function match(n, t) {
	        var o;e(this);return e('[data-validate="' + t + '"]').length > 0 ? o = e('[data-validate="' + t + '"]').val() : e("#" + t).length > 0 ? o = e("#" + t).val() : e('[name="' + t + '"]').length > 0 ? o = e('[name="' + t + '"]').val() : e('[name="' + t + '[]"]').length > 0 && (o = e('[name="' + t + '[]"]')), o !== i ? n.toString() == o.toString() : !1;
	      }, different: function different(n, t) {
	        var o;e(this);return e('[data-validate="' + t + '"]').length > 0 ? o = e('[data-validate="' + t + '"]').val() : e("#" + t).length > 0 ? o = e("#" + t).val() : e('[name="' + t + '"]').length > 0 ? o = e('[name="' + t + '"]').val() : e('[name="' + t + '[]"]').length > 0 && (o = e('[name="' + t + '[]"]')), o !== i ? n.toString() !== o.toString() : !1;
	      }, creditCard: function creditCard(n, t) {
	        var i,
	            o,
	            a = { visa: { pattern: /^4/, length: [16] }, amex: { pattern: /^3[47]/, length: [15] }, mastercard: { pattern: /^5[1-5]/, length: [16] }, discover: { pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/, length: [16] }, unionPay: { pattern: /^(62|88)/, length: [16, 17, 18, 19] }, jcb: { pattern: /^35(2[89]|[3-8][0-9])/, length: [16] }, maestro: { pattern: /^(5018|5020|5038|6304|6759|676[1-3])/, length: [12, 13, 14, 15, 16, 17, 18, 19] }, dinersClub: { pattern: /^(30[0-5]|^36)/, length: [14] }, laser: { pattern: /^(6304|670[69]|6771)/, length: [16, 17, 18, 19] }, visaElectron: { pattern: /^(4026|417500|4508|4844|491(3|7))/, length: [16] } },
	            r = {},
	            s = !1,
	            l = "string" == typeof t ? t.split(",") : !1;if ("string" == typeof n && 0 !== n.length) {
	          if (l && (e.each(l, function (t, i) {
	            o = a[i], o && (r = { length: -1 !== e.inArray(n.length, o.length), pattern: -1 !== n.search(o.pattern) }, r.length && r.pattern && (s = !0));
	          }), !s)) return !1;if (i = { number: -1 !== e.inArray(n.length, a.unionPay.length), pattern: -1 !== n.search(a.unionPay.pattern) }, i.number && i.pattern) return !0;for (var c = n.length, u = 0, d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]], m = 0; c--;) {
	            m += d[u][parseInt(n.charAt(c), 10)], u ^= 1;
	          }return m % 10 === 0 && m > 0;
	        }
	      }, minCount: function minCount(e, n) {
	        return 0 == n ? !0 : 1 == n ? "" !== e : e.split(",").length >= n;
	      }, exactCount: function exactCount(e, n) {
	        return 0 == n ? "" === e : 1 == n ? "" !== e && -1 === e.search(",") : e.split(",").length == n;
	      }, maxCount: function maxCount(e, n) {
	        return 0 == n ? !1 : 1 == n ? -1 === e.search(",") : e.split(",").length <= n;
	      } } };
	}(_jquery2.default, window, document), function (e, n, t, i) {
	  "use strict";
	  e.fn.dimmer = function (n) {
	    var o,
	        a = e(this),
	        r = new Date().getTime(),
	        s = [],
	        l = arguments[0],
	        c = "string" == typeof l,
	        u = [].slice.call(arguments, 1);return a.each(function () {
	      var d,
	          m,
	          f,
	          g = e.isPlainObject(n) ? e.extend(!0, {}, e.fn.dimmer.settings, n) : e.extend({}, e.fn.dimmer.settings),
	          p = g.selector,
	          h = g.namespace,
	          v = g.className,
	          b = g.error,
	          y = "." + h,
	          w = "module-" + h,
	          C = a.selector || "",
	          x = "ontouchstart" in t.documentElement ? "touchstart" : "click",
	          k = e(this),
	          S = this,
	          T = k.data(w);f = { preinitialize: function preinitialize() {
	          f.is.dimmer() ? (m = k.parent(), d = k) : (m = k, d = f.has.dimmer() ? g.dimmerName ? m.find(p.dimmer).filter("." + g.dimmerName) : m.find(p.dimmer) : f.create());
	        }, initialize: function initialize() {
	          f.debug("Initializing dimmer", g), f.bind.events(), f.set.dimmable(), f.instantiate();
	        }, instantiate: function instantiate() {
	          f.verbose("Storing instance of module", f), T = f, k.data(w, T);
	        }, destroy: function destroy() {
	          f.verbose("Destroying previous module", d), f.unbind.events(), f.remove.variation(), m.off(y);
	        }, bind: { events: function events() {
	            "hover" == g.on ? m.on("mouseenter" + y, f.show).on("mouseleave" + y, f.hide) : "click" == g.on && m.on(x + y, f.toggle), f.is.page() && (f.debug("Setting as a page dimmer", m), f.set.pageDimmer()), f.is.closable() && (f.verbose("Adding dimmer close event", d), m.on(x + y, p.dimmer, f.event.click));
	          } }, unbind: { events: function events() {
	            k.removeData(w);
	          } }, event: { click: function click(n) {
	            f.verbose("Determining if event occured on dimmer", n), (0 === d.find(n.target).length || e(n.target).is(p.content)) && (f.hide(), n.stopImmediatePropagation());
	          } }, addContent: function addContent(n) {
	          var t = e(n);f.debug("Add content to dimmer", t), t.parent()[0] !== d[0] && t.detach().appendTo(d);
	        }, create: function create() {
	          var n = e(g.template.dimmer());return g.variation && (f.debug("Creating dimmer with variation", g.variation), n.addClass(g.variation)), g.dimmerName && (f.debug("Creating named dimmer", g.dimmerName), n.addClass(g.dimmerName)), n.appendTo(m), n;
	        }, show: function show(n) {
	          n = e.isFunction(n) ? n : function () {}, f.debug("Showing dimmer", d, g), f.is.dimmed() && !f.is.animating() || !f.is.enabled() ? f.debug("Dimmer is already shown or disabled") : (f.animate.show(n), g.onShow.call(S), g.onChange.call(S));
	        }, hide: function hide(n) {
	          n = e.isFunction(n) ? n : function () {}, f.is.dimmed() || f.is.animating() ? (f.debug("Hiding dimmer", d), f.animate.hide(n), g.onHide.call(S), g.onChange.call(S)) : f.debug("Dimmer is not visible");
	        }, toggle: function toggle() {
	          f.verbose("Toggling dimmer visibility", d), f.is.dimmed() ? f.hide() : f.show();
	        }, animate: { show: function show(n) {
	            n = e.isFunction(n) ? n : function () {}, g.useCSS && e.fn.transition !== i && d.transition("is supported") ? ("auto" !== g.opacity && f.set.opacity(), d.transition({ animation: g.transition + " in", queue: !1, duration: f.get.duration(), useFailSafe: !0, onStart: function onStart() {
	                f.set.dimmed();
	              }, onComplete: function onComplete() {
	                f.set.active(), n();
	              } })) : (f.verbose("Showing dimmer animation with javascript"), f.set.dimmed(), "auto" == g.opacity && (g.opacity = .8), d.stop().css({ opacity: 0, width: "100%", height: "100%" }).fadeTo(f.get.duration(), g.opacity, function () {
	              d.removeAttr("style"), f.set.active(), n();
	            }));
	          }, hide: function hide(n) {
	            n = e.isFunction(n) ? n : function () {}, g.useCSS && e.fn.transition !== i && d.transition("is supported") ? (f.verbose("Hiding dimmer with css"), d.transition({ animation: g.transition + " out", queue: !1, duration: f.get.duration(), useFailSafe: !0, onStart: function onStart() {
	                f.remove.dimmed();
	              }, onComplete: function onComplete() {
	                f.remove.active(), n();
	              } })) : (f.verbose("Hiding dimmer with javascript"), f.remove.dimmed(), d.stop().fadeOut(f.get.duration(), function () {
	              f.remove.active(), d.removeAttr("style"), n();
	            }));
	          } }, get: { dimmer: function dimmer() {
	            return d;
	          }, duration: function duration() {
	            return "object" == _typeof(g.duration) ? f.is.active() ? g.duration.hide : g.duration.show : g.duration;
	          } }, has: { dimmer: function dimmer() {
	            return g.dimmerName ? k.find(p.dimmer).filter("." + g.dimmerName).length > 0 : k.find(p.dimmer).length > 0;
	          } }, is: { active: function active() {
	            return d.hasClass(v.active);
	          }, animating: function animating() {
	            return d.is(":animated") || d.hasClass(v.animating);
	          }, closable: function closable() {
	            return "auto" == g.closable ? "hover" == g.on ? !1 : !0 : g.closable;
	          }, dimmer: function dimmer() {
	            return k.hasClass(v.dimmer);
	          }, dimmable: function dimmable() {
	            return k.hasClass(v.dimmable);
	          }, dimmed: function dimmed() {
	            return m.hasClass(v.dimmed);
	          }, disabled: function disabled() {
	            return m.hasClass(v.disabled);
	          }, enabled: function enabled() {
	            return !f.is.disabled();
	          }, page: function page() {
	            return m.is("body");
	          }, pageDimmer: function pageDimmer() {
	            return d.hasClass(v.pageDimmer);
	          } }, can: { show: function show() {
	            return !d.hasClass(v.disabled);
	          } }, set: { opacity: function opacity(e) {
	            var n = d.css("background-color"),
	                t = n.split(","),
	                i = t && 4 == t.length;e = 0 === g.opacity ? 0 : g.opacity || e, i ? (t[3] = e + ")", n = t.join(",")) : n = "rgba(0, 0, 0, " + e + ")", f.debug("Setting opacity to", e), d.css("background-color", n);
	          }, active: function active() {
	            d.addClass(v.active);
	          }, dimmable: function dimmable() {
	            m.addClass(v.dimmable);
	          }, dimmed: function dimmed() {
	            m.addClass(v.dimmed);
	          }, pageDimmer: function pageDimmer() {
	            d.addClass(v.pageDimmer);
	          }, disabled: function disabled() {
	            d.addClass(v.disabled);
	          }, variation: function variation(e) {
	            e = e || g.variation, e && d.addClass(e);
	          } }, remove: { active: function active() {
	            d.removeClass(v.active);
	          }, dimmed: function dimmed() {
	            m.removeClass(v.dimmed);
	          }, disabled: function disabled() {
	            d.removeClass(v.disabled);
	          }, variation: function variation(e) {
	            e = e || g.variation, e && d.removeClass(e);
	          } }, setting: function setting(n, t) {
	          if (f.debug("Changing setting", n, t), e.isPlainObject(n)) e.extend(!0, g, n);else {
	            if (t === i) return g[n];g[n] = t;
	          }
	        }, internal: function internal(n, t) {
	          if (e.isPlainObject(n)) e.extend(!0, f, n);else {
	            if (t === i) return f[n];f[n] = t;
	          }
	        }, debug: function debug() {
	          g.debug && (g.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, g.name + ":"), f.debug.apply(console, arguments)));
	        }, verbose: function verbose() {
	          g.verbose && g.debug && (g.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, g.name + ":"), f.verbose.apply(console, arguments)));
	        }, error: function error() {
	          f.error = Function.prototype.bind.call(console.error, console, g.name + ":"), f.error.apply(console, arguments);
	        }, performance: { log: function log(e) {
	            var n, t, i;g.performance && (n = new Date().getTime(), i = r || n, t = n - i, r = n, s.push({ Name: e[0], Arguments: [].slice.call(e, 1) || "", Element: S, "Execution Time": t })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 500);
	          }, display: function display() {
	            var n = g.name + ":",
	                t = 0;r = !1, clearTimeout(f.performance.timer), e.each(s, function (e, n) {
	              t += n["Execution Time"];
	            }), n += " " + t + "ms", C && (n += " '" + C + "'"), a.length > 1 && (n += " (" + a.length + ")"), (console.group !== i || console.table !== i) && s.length > 0 && (console.groupCollapsed(n), console.table ? console.table(s) : e.each(s, function (e, n) {
	              console.log(n.Name + ": " + n["Execution Time"] + "ms");
	            }), console.groupEnd()), s = [];
	          } }, invoke: function invoke(n, t, a) {
	          var r,
	              s,
	              l,
	              c = T;return t = t || u, a = S || a, "string" == typeof n && c !== i && (n = n.split(/[\. ]/), r = n.length - 1, e.each(n, function (t, o) {
	            var a = t != r ? o + n[t + 1].charAt(0).toUpperCase() + n[t + 1].slice(1) : n;if (e.isPlainObject(c[a]) && t != r) c = c[a];else {
	              if (c[a] !== i) return s = c[a], !1;if (!e.isPlainObject(c[o]) || t == r) return c[o] !== i ? (s = c[o], !1) : (f.error(b.method, n), !1);c = c[o];
	            }
	          })), e.isFunction(s) ? l = s.apply(a, t) : s !== i && (l = s), e.isArray(o) ? o.push(l) : o !== i ? o = [o, l] : l !== i && (o = l), s;
	        } }, f.preinitialize(), c ? (T === i && f.initialize(), f.invoke(l)) : (T !== i && T.invoke("destroy"), f.initialize());
	    }), o !== i ? o : this;
	  }, e.fn.dimmer.settings = { name: "Dimmer", namespace: "dimmer", debug: !1, verbose: !1, performance: !0, dimmerName: !1, variation: !1, closable: "auto", useCSS: !0, transition: "fade", on: !1, opacity: "auto", duration: { show: 500, hide: 500 }, onChange: function onChange() {}, onShow: function onShow() {}, onHide: function onHide() {}, error: { method: "The method you called is not defined." },
	    className: { active: "active", animating: "animating", dimmable: "dimmable", dimmed: "dimmed", dimmer: "dimmer", disabled: "disabled", hide: "hide", pageDimmer: "page", show: "show" }, selector: { dimmer: "> .ui.dimmer", content: ".ui.dimmer > .content, .ui.dimmer > .content > .center" }, template: { dimmer: function dimmer() {
	        return e("<div />").attr("class", "ui dimmer");
	      } } };
	}(_jquery2.default, window, document), function (e, n, t, i) {
	  "use strict";
	  e.fn.modal = function (o) {
	    var a,
	        r = e(this),
	        s = e(n),
	        l = e(t),
	        c = e("body"),
	        u = r.selector || "",
	        d = new Date().getTime(),
	        m = [],
	        f = arguments[0],
	        g = "string" == typeof f,
	        p = [].slice.call(arguments, 1),
	        h = n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame || function (e) {
	      setTimeout(e, 0);
	    };return r.each(function () {
	      var r,
	          v,
	          b,
	          y,
	          w,
	          C,
	          x,
	          k,
	          S,
	          T = e.isPlainObject(o) ? e.extend(!0, {}, e.fn.modal.settings, o) : e.extend({}, e.fn.modal.settings),
	          E = T.selector,
	          A = T.className,
	          F = T.namespace,
	          D = T.error,
	          O = "." + F,
	          z = "module-" + F,
	          R = e(this),
	          j = e(T.context),
	          q = R.find(E.close),
	          P = this,
	          H = R.data(z);S = { initialize: function initialize() {
	          S.verbose("Initializing dimmer", j), S.create.id(), S.create.dimmer(), S.refreshModals(), S.bind.events(), T.observeChanges && S.observeChanges(), S.instantiate();
	        }, instantiate: function instantiate() {
	          S.verbose("Storing instance of modal"), H = S, R.data(z, H);
	        }, create: { dimmer: function dimmer() {
	            var n = { debug: T.debug, dimmerName: "modals", duration: { show: T.duration, hide: T.duration } },
	                t = e.extend(!0, n, T.dimmerSettings);return T.inverted && (t.variation = t.variation !== i ? t.variation + " inverted" : "inverted"), e.fn.dimmer === i ? void S.error(D.dimmer) : (S.debug("Creating dimmer with settings", t), y = j.dimmer(t), T.detachable ? (S.verbose("Modal is detachable, moving content into dimmer"), y.dimmer("add content", R)) : S.set.undetached(), T.blurring && y.addClass(A.blurring), void (w = y.dimmer("get dimmer")));
	          }, id: function id() {
	            x = (Math.random().toString(16) + "000000000").substr(2, 8), C = "." + x, S.verbose("Creating unique id for element", x);
	          } }, destroy: function destroy() {
	          S.verbose("Destroying previous modal"), R.removeData(z).off(O), s.off(C), q.off(O), j.dimmer("destroy");
	        }, observeChanges: function observeChanges() {
	          "MutationObserver" in n && (k = new MutationObserver(function (e) {
	            S.debug("DOM tree modified, refreshing"), S.refresh();
	          }), k.observe(P, { childList: !0, subtree: !0 }), S.debug("Setting up mutation observer", k));
	        }, refresh: function refresh() {
	          S.remove.scrolling(), S.cacheSizes(), S.set.screenHeight(), S.set.type(), S.set.position();
	        }, refreshModals: function refreshModals() {
	          v = R.siblings(E.modal), r = v.add(R);
	        }, attachEvents: function attachEvents(n, t) {
	          var i = e(n);t = e.isFunction(S[t]) ? S[t] : S.toggle, i.length > 0 ? (S.debug("Attaching modal events to element", n, t), i.off(O).on("click" + O, t)) : S.error(D.notFound, n);
	        }, bind: { events: function events() {
	            S.verbose("Attaching events"), R.on("click" + O, E.close, S.event.close).on("click" + O, E.approve, S.event.approve).on("click" + O, E.deny, S.event.deny), s.on("resize" + C, S.event.resize);
	          } }, get: { id: function id() {
	            return (Math.random().toString(16) + "000000000").substr(2, 8);
	          } }, event: { approve: function approve() {
	            return T.onApprove.call(P, e(this)) === !1 ? void S.verbose("Approve callback returned false cancelling hide") : void S.hide();
	          }, deny: function deny() {
	            return T.onDeny.call(P, e(this)) === !1 ? void S.verbose("Deny callback returned false cancelling hide") : void S.hide();
	          }, close: function close() {
	            S.hide();
	          }, click: function click(n) {
	            var i = e(n.target),
	                o = i.closest(E.modal).length > 0,
	                a = e.contains(t.documentElement, n.target);!o && a && (S.debug("Dimmer clicked, hiding all modals"), S.is.active() && (S.remove.clickaway(), T.allowMultiple ? S.hide() : S.hideAll()));
	          }, debounce: function debounce(e, n) {
	            clearTimeout(S.timer), S.timer = setTimeout(e, n);
	          }, keyboard: function keyboard(e) {
	            var n = e.which,
	                t = 27;n == t && (T.closable ? (S.debug("Escape key pressed hiding modal"), S.hide()) : S.debug("Escape key pressed, but closable is set to false"), e.preventDefault());
	          }, resize: function resize() {
	            y.dimmer("is active") && h(S.refresh);
	          } }, toggle: function toggle() {
	          S.is.active() || S.is.animating() ? S.hide() : S.show();
	        }, show: function show(n) {
	          n = e.isFunction(n) ? n : function () {}, S.refreshModals(), S.showModal(n);
	        }, hide: function hide(n) {
	          n = e.isFunction(n) ? n : function () {}, S.refreshModals(), S.hideModal(n);
	        }, showModal: function showModal(n) {
	          n = e.isFunction(n) ? n : function () {}, S.is.animating() || !S.is.active() ? (S.showDimmer(), S.cacheSizes(), S.set.position(), S.set.screenHeight(), S.set.type(), S.set.clickaway(), !T.allowMultiple && S.others.active() ? S.hideOthers(S.showModal) : (T.onShow.call(P), T.transition && e.fn.transition !== i && R.transition("is supported") ? (S.debug("Showing modal with css animations"), R.transition({ debug: T.debug, animation: T.transition + " in", queue: T.queue, duration: T.duration, useFailSafe: !0, onComplete: function onComplete() {
	              T.onVisible.apply(P), S.add.keyboardShortcuts(), S.save.focus(), S.set.active(), T.autofocus && S.set.autofocus(), n();
	            } })) : S.error(D.noTransition))) : S.debug("Modal is already visible");
	        }, hideModal: function hideModal(n, t) {
	          return n = e.isFunction(n) ? n : function () {}, S.debug("Hiding modal"), T.onHide.call(P, e(this)) === !1 ? void S.verbose("Hide callback returned false cancelling hide") : void ((S.is.animating() || S.is.active()) && (T.transition && e.fn.transition !== i && R.transition("is supported") ? (S.remove.active(), R.transition({ debug: T.debug, animation: T.transition + " out", queue: T.queue, duration: T.duration, useFailSafe: !0, onStart: function onStart() {
	              S.others.active() || t || S.hideDimmer(), S.remove.keyboardShortcuts();
	            }, onComplete: function onComplete() {
	              T.onHidden.call(P), S.restore.focus(), n();
	            } })) : S.error(D.noTransition)));
	        }, showDimmer: function showDimmer() {
	          y.dimmer("is animating") || !y.dimmer("is active") ? (S.debug("Showing dimmer"), y.dimmer("show")) : S.debug("Dimmer already visible");
	        }, hideDimmer: function hideDimmer() {
	          return y.dimmer("is animating") || y.dimmer("is active") ? void y.dimmer("hide", function () {
	            S.remove.clickaway(), S.remove.screenHeight();
	          }) : void S.debug("Dimmer is not visible cannot hide");
	        }, hideAll: function hideAll(n) {
	          var t = r.filter("." + A.active + ", ." + A.animating);n = e.isFunction(n) ? n : function () {}, t.length > 0 && (S.debug("Hiding all visible modals"), S.hideDimmer(), t.modal("hide modal", n));
	        }, hideOthers: function hideOthers(n) {
	          var t = v.filter("." + A.active + ", ." + A.animating);n = e.isFunction(n) ? n : function () {}, t.length > 0 && (S.debug("Hiding other modals", v), t.modal("hide modal", n, !0));
	        }, others: { active: function active() {
	            return v.filter("." + A.active).length > 0;
	          }, animating: function animating() {
	            return v.filter("." + A.animating).length > 0;
	          } }, add: { keyboardShortcuts: function keyboardShortcuts() {
	            S.verbose("Adding keyboard shortcuts"), l.on("keyup" + O, S.event.keyboard);
	          } }, save: { focus: function focus() {
	            b = e(t.activeElement).blur();
	          } }, restore: { focus: function focus() {
	            b && b.length > 0 && b.focus();
	          } }, remove: { active: function active() {
	            R.removeClass(A.active);
	          }, clickaway: function clickaway() {
	            T.closable && w.off("click" + C);
	          }, bodyStyle: function bodyStyle() {
	            "" === c.attr("style") && (S.verbose("Removing style attribute"), c.removeAttr("style"));
	          }, screenHeight: function screenHeight() {
	            S.debug("Removing page height"), c.css("height", "");
	          }, keyboardShortcuts: function keyboardShortcuts() {
	            S.verbose("Removing keyboard shortcuts"), l.off("keyup" + O);
	          }, scrolling: function scrolling() {
	            y.removeClass(A.scrolling), R.removeClass(A.scrolling);
	          } }, cacheSizes: function cacheSizes() {
	          var o = R.outerHeight();(S.cache === i || 0 !== o) && (S.cache = { pageHeight: e(t).outerHeight(), height: o + T.offset, contextHeight: "body" == T.context ? e(n).height() : y.height() }), S.debug("Caching modal and container sizes", S.cache);
	        }, can: { fit: function fit() {
	            return S.cache.height + 2 * T.padding < S.cache.contextHeight;
	          } }, is: { active: function active() {
	            return R.hasClass(A.active);
	          }, animating: function animating() {
	            return R.transition("is supported") ? R.transition("is animating") : R.is(":visible");
	          }, scrolling: function scrolling() {
	            return y.hasClass(A.scrolling);
	          }, modernBrowser: function modernBrowser() {
	            return !(n.ActiveXObject || "ActiveXObject" in n);
	          } }, set: { autofocus: function autofocus() {
	            var e = R.find(":input").filter(":visible"),
	                n = e.filter("[autofocus]"),
	                t = n.length > 0 ? n.first() : e.first();t.length > 0 && t.focus();
	          }, clickaway: function clickaway() {
	            T.closable && w.on("click" + C, S.event.click);
	          }, screenHeight: function screenHeight() {
	            S.can.fit() ? c.css("height", "") : (S.debug("Modal is taller than page content, resizing page height"), c.css("height", S.cache.height + 2 * T.padding));
	          }, active: function active() {
	            R.addClass(A.active);
	          }, scrolling: function scrolling() {
	            y.addClass(A.scrolling), R.addClass(A.scrolling);
	          }, type: function type() {
	            S.can.fit() ? (S.verbose("Modal fits on screen"), S.others.active() || S.others.animating() || S.remove.scrolling()) : (S.verbose("Modal cannot fit on screen setting to scrolling"), S.set.scrolling());
	          }, position: function position() {
	            S.verbose("Centering modal on page", S.cache), S.can.fit() ? R.css({ top: "", marginTop: -(S.cache.height / 2) }) : R.css({ marginTop: "", top: l.scrollTop() });
	          }, undetached: function undetached() {
	            y.addClass(A.undetached);
	          } }, setting: function setting(n, t) {
	          if (S.debug("Changing setting", n, t), e.isPlainObject(n)) e.extend(!0, T, n);else {
	            if (t === i) return T[n];T[n] = t;
	          }
	        }, internal: function internal(n, t) {
	          if (e.isPlainObject(n)) e.extend(!0, S, n);else {
	            if (t === i) return S[n];S[n] = t;
	          }
	        }, debug: function debug() {
	          T.debug && (T.performance ? S.performance.log(arguments) : (S.debug = Function.prototype.bind.call(console.info, console, T.name + ":"), S.debug.apply(console, arguments)));
	        }, verbose: function verbose() {
	          T.verbose && T.debug && (T.performance ? S.performance.log(arguments) : (S.verbose = Function.prototype.bind.call(console.info, console, T.name + ":"), S.verbose.apply(console, arguments)));
	        }, error: function error() {
	          S.error = Function.prototype.bind.call(console.error, console, T.name + ":"), S.error.apply(console, arguments);
	        }, performance: { log: function log(e) {
	            var n, t, i;T.performance && (n = new Date().getTime(), i = d || n, t = n - i, d = n, m.push({ Name: e[0], Arguments: [].slice.call(e, 1) || "", Element: P, "Execution Time": t })), clearTimeout(S.performance.timer), S.performance.timer = setTimeout(S.performance.display, 500);
	          }, display: function display() {
	            var n = T.name + ":",
	                t = 0;d = !1, clearTimeout(S.performance.timer), e.each(m, function (e, n) {
	              t += n["Execution Time"];
	            }), n += " " + t + "ms", u && (n += " '" + u + "'"), (console.group !== i || console.table !== i) && m.length > 0 && (console.groupCollapsed(n), console.table ? console.table(m) : e.each(m, function (e, n) {
	              console.log(n.Name + ": " + n["Execution Time"] + "ms");
	            }), console.groupEnd()), m = [];
	          } }, invoke: function invoke(n, t, o) {
	          var r,
	              s,
	              l,
	              c = H;return t = t || p, o = P || o, "string" == typeof n && c !== i && (n = n.split(/[\. ]/), r = n.length - 1, e.each(n, function (t, o) {
	            var a = t != r ? o + n[t + 1].charAt(0).toUpperCase() + n[t + 1].slice(1) : n;if (e.isPlainObject(c[a]) && t != r) c = c[a];else {
	              if (c[a] !== i) return s = c[a], !1;if (!e.isPlainObject(c[o]) || t == r) return c[o] !== i ? (s = c[o], !1) : !1;c = c[o];
	            }
	          })), e.isFunction(s) ? l = s.apply(o, t) : s !== i && (l = s), e.isArray(a) ? a.push(l) : a !== i ? a = [a, l] : l !== i && (a = l), s;
	        } }, g ? (H === i && S.initialize(), S.invoke(f)) : (H !== i && H.invoke("destroy"), S.initialize());
	    }), a !== i ? a : this;
	  }, e.fn.modal.settings = { name: "Modal", namespace: "modal", debug: !1, verbose: !1, performance: !0, observeChanges: !1, allowMultiple: !1, detachable: !0, closable: !0, autofocus: !0, inverted: !1, blurring: !1, dimmerSettings: { closable: !1, useCSS: !0 }, context: "body", queue: !1, duration: 500, offset: 0, transition: "scale", padding: 50, onShow: function onShow() {}, onVisible: function onVisible() {}, onHide: function onHide() {
	      return !0;
	    }, onHidden: function onHidden() {}, onApprove: function onApprove() {
	      return !0;
	    }, onDeny: function onDeny() {
	      return !0;
	    }, selector: { close: "> .close", approve: ".actions .positive, .actions .approve, .actions .ok", deny: ".actions .negative, .actions .deny, .actions .cancel", modal: ".ui.modal" }, error: { dimmer: "UI Dimmer, a required component is not included in this page", method: "The method you called is not defined.", notFound: "The element you specified could not be found" }, className: { active: "active", animating: "animating", blurring: "blurring", scrolling: "scrolling", undetached: "undetached" } };
	}(_jquery2.default, window, document), function (e, n, t, i) {
	  "use strict";
	  e.fn.sidebar = function (o) {
	    var a,
	        r = e(this),
	        s = e(n),
	        l = e(t),
	        c = e("html"),
	        u = e("head"),
	        d = r.selector || "",
	        m = new Date().getTime(),
	        f = [],
	        g = arguments[0],
	        p = "string" == typeof g,
	        h = [].slice.call(arguments, 1),
	        v = n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame || function (e) {
	      setTimeout(e, 0);
	    };return r.each(function () {
	      var r,
	          b,
	          y,
	          w,
	          C,
	          x,
	          k = e.isPlainObject(o) ? e.extend(!0, {}, e.fn.sidebar.settings, o) : e.extend({}, e.fn.sidebar.settings),
	          S = k.selector,
	          T = k.className,
	          E = k.namespace,
	          A = k.regExp,
	          F = k.error,
	          D = "." + E,
	          O = "module-" + E,
	          z = e(this),
	          R = e(k.context),
	          j = z.children(S.sidebar),
	          q = R.children(S.fixed),
	          P = R.children(S.pusher),
	          H = this,
	          N = z.data(O);x = { initialize: function initialize() {
	          x.debug("Initializing sidebar", o), x.create.id(), C = x.get.transitionEvent(), x.is.ios() && x.set.ios(), k.delaySetup ? v(x.setup.layout) : x.setup.layout(), v(function () {
	            x.setup.cache();
	          }), x.instantiate();
	        }, instantiate: function instantiate() {
	          x.verbose("Storing instance of module", x), N = x, z.data(O, x);
	        }, create: { id: function id() {
	            y = (Math.random().toString(16) + "000000000").substr(2, 8), b = "." + y, x.verbose("Creating unique id for element", y);
	          } }, destroy: function destroy() {
	          x.verbose("Destroying previous module for", z), z.off(D).removeData(O), x.is.ios() && x.remove.ios(), R.off(b), s.off(b), l.off(b);
	        }, event: { clickaway: function clickaway(e) {
	            var n = P.find(e.target).length > 0 || P.is(e.target),
	                t = R.is(e.target);n && (x.verbose("User clicked on dimmed page"), x.hide()), t && (x.verbose("User clicked on dimmable context (scaled out page)"), x.hide());
	          }, touch: function touch(e) {}, containScroll: function containScroll(e) {
	            H.scrollTop <= 0 && (H.scrollTop = 1), H.scrollTop + H.offsetHeight >= H.scrollHeight && (H.scrollTop = H.scrollHeight - H.offsetHeight - 1);
	          }, scroll: function scroll(n) {
	            0 === e(n.target).closest(S.sidebar).length && n.preventDefault();
	          } }, bind: { clickaway: function clickaway() {
	            x.verbose("Adding clickaway events to context", R), k.closable && R.on("click" + b, x.event.clickaway).on("touchend" + b, x.event.clickaway);
	          }, scrollLock: function scrollLock() {
	            k.scrollLock && (x.debug("Disabling page scroll"), s.on("DOMMouseScroll" + b, x.event.scroll)), x.verbose("Adding events to contain sidebar scroll"), l.on("touchmove" + b, x.event.touch), z.on("scroll" + D, x.event.containScroll);
	          } }, unbind: { clickaway: function clickaway() {
	            x.verbose("Removing clickaway events from context", R), R.off(b);
	          }, scrollLock: function scrollLock() {
	            x.verbose("Removing scroll lock from page"), l.off(b), s.off(b), z.off("scroll" + D);
	          } }, add: { inlineCSS: function inlineCSS() {
	            var n,
	                t = x.cache.width || z.outerWidth(),
	                i = x.cache.height || z.outerHeight(),
	                o = x.is.rtl(),
	                a = x.get.direction(),
	                s = { left: t, right: -t, top: i, bottom: -i };o && (x.verbose("RTL detected, flipping widths"), s.left = -t, s.right = t), n = "<style>", "left" === a || "right" === a ? (x.debug("Adding CSS rules for animation distance", t), n += " .ui.visible." + a + ".sidebar ~ .fixed, .ui.visible." + a + ".sidebar ~ .pusher {   -webkit-transform: translate3d(" + s[a] + "px, 0, 0);           transform: translate3d(" + s[a] + "px, 0, 0); }") : ("top" === a || "bottom" == a) && (n += " .ui.visible." + a + ".sidebar ~ .fixed, .ui.visible." + a + ".sidebar ~ .pusher {   -webkit-transform: translate3d(0, " + s[a] + "px, 0);           transform: translate3d(0, " + s[a] + "px, 0); }"), x.is.ie() && ("left" === a || "right" === a ? (x.debug("Adding CSS rules for animation distance", t), n += " body.pushable > .ui.visible." + a + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(" + s[a] + "px, 0, 0);           transform: translate3d(" + s[a] + "px, 0, 0); }") : ("top" === a || "bottom" == a) && (n += " body.pushable > .ui.visible." + a + ".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, " + s[a] + "px, 0);           transform: translate3d(0, " + s[a] + "px, 0); }"), n += " body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0px, 0, 0);           transform: translate3d(0px, 0, 0); }"), n += "</style>", r = e(n).appendTo(u), x.debug("Adding sizing css to head", r);
	          } }, refresh: function refresh() {
	          x.verbose("Refreshing selector cache"), R = e(k.context), j = R.children(S.sidebar), P = R.children(S.pusher), q = R.children(S.fixed), x.clear.cache();
	        }, refreshSidebars: function refreshSidebars() {
	          x.verbose("Refreshing other sidebars"), j = R.children(S.sidebar);
	        }, repaint: function repaint() {
	          x.verbose("Forcing repaint event"), H.style.display = "none";H.offsetHeight;H.scrollTop = H.scrollTop, H.style.display = "";
	        }, setup: { cache: function cache() {
	            x.cache = { width: z.outerWidth(), height: z.outerHeight(), rtl: "rtl" == z.css("direction") };
	          }, layout: function layout() {
	            0 === R.children(S.pusher).length && (x.debug("Adding wrapper element for sidebar"), x.error(F.pusher), P = e('<div class="pusher" />'), R.children().not(S.omitted).not(j).wrapAll(P), x.refresh()), (0 === z.nextAll(S.pusher).length || z.nextAll(S.pusher)[0] !== P[0]) && (x.debug("Moved sidebar to correct parent element"), x.error(F.movedSidebar, H), z.detach().prependTo(R), x.refresh()), x.clear.cache(), x.set.pushable(), x.set.direction();
	          } }, attachEvents: function attachEvents(n, t) {
	          var i = e(n);t = e.isFunction(x[t]) ? x[t] : x.toggle, i.length > 0 ? (x.debug("Attaching sidebar events to element", n, t), i.on("click" + D, t)) : x.error(F.notFound, n);
	        }, show: function show(n) {
	          if (n = e.isFunction(n) ? n : function () {}, x.is.hidden()) {
	            if (x.refreshSidebars(), k.overlay && (x.error(F.overlay), k.transition = "overlay"), x.refresh(), x.othersActive()) if (x.debug("Other sidebars currently visible"), k.exclusive) {
	              if ("overlay" != k.transition) return void x.hideOthers(x.show);x.hideOthers();
	            } else k.transition = "overlay";x.pushPage(function () {
	              n.call(H), k.onShow.call(H);
	            }), k.onChange.call(H), k.onVisible.call(H);
	          } else x.debug("Sidebar is already visible");
	        }, hide: function hide(n) {
	          n = e.isFunction(n) ? n : function () {}, (x.is.visible() || x.is.animating()) && (x.debug("Hiding sidebar", n), x.refreshSidebars(), x.pullPage(function () {
	            n.call(H), k.onHidden.call(H);
	          }), k.onChange.call(H), k.onHide.call(H));
	        }, othersAnimating: function othersAnimating() {
	          return j.not(z).filter("." + T.animating).length > 0;
	        }, othersVisible: function othersVisible() {
	          return j.not(z).filter("." + T.visible).length > 0;
	        }, othersActive: function othersActive() {
	          return x.othersVisible() || x.othersAnimating();
	        }, hideOthers: function hideOthers(e) {
	          var n = j.not(z).filter("." + T.visible),
	              t = n.length,
	              i = 0;e = e || function () {}, n.sidebar("hide", function () {
	            i++, i == t && e();
	          });
	        }, toggle: function toggle() {
	          x.verbose("Determining toggled direction"), x.is.hidden() ? x.show() : x.hide();
	        }, pushPage: function pushPage(n) {
	          var t,
	              i,
	              _o,
	              a = x.get.transition(),
	              r = "overlay" === a || x.othersActive() ? z : P;n = e.isFunction(n) ? n : function () {}, "scale down" == k.transition && x.scrollToTop(), x.set.transition(a), x.repaint(), t = function t() {
	            x.bind.clickaway(), x.add.inlineCSS(), x.set.animating(), x.set.visible();
	          }, i = function i() {
	            x.set.dimmed();
	          }, _o = function o(e) {
	            e.target == r[0] && (r.off(C + b, _o), x.remove.animating(), x.bind.scrollLock(), n.call(H));
	          }, r.off(C + b), r.on(C + b, _o), v(t), k.dimPage && !x.othersVisible() && v(i);
	        }, pullPage: function pullPage(n) {
	          var t,
	              _i,
	              o = x.get.transition(),
	              a = "overlay" == o || x.othersActive() ? z : P;n = e.isFunction(n) ? n : function () {}, x.verbose("Removing context push state", x.get.direction()), x.unbind.clickaway(), x.unbind.scrollLock(), t = function t() {
	            x.set.transition(o), x.set.animating(), x.remove.visible(), k.dimPage && !x.othersVisible() && P.removeClass(T.dimmed);
	          }, _i = function i(e) {
	            e.target == a[0] && (a.off(C + b, _i), x.remove.animating(), x.remove.transition(), x.remove.inlineCSS(), ("scale down" == o || k.returnScroll && x.is.mobile()) && x.scrollBack(), n.call(H));
	          }, a.off(C + b), a.on(C + b, _i), v(t);
	        }, scrollToTop: function scrollToTop() {
	          x.verbose("Scrolling to top of page to avoid animation issues"), w = e(n).scrollTop(), z.scrollTop(0), n.scrollTo(0, 0);
	        }, scrollBack: function scrollBack() {
	          x.verbose("Scrolling back to original page position"), n.scrollTo(0, w);
	        }, clear: { cache: function cache() {
	            x.verbose("Clearing cached dimensions"), x.cache = {};
	          } }, set: { ios: function ios() {
	            c.addClass(T.ios);
	          }, pushed: function pushed() {
	            R.addClass(T.pushed);
	          }, pushable: function pushable() {
	            R.addClass(T.pushable);
	          }, dimmed: function dimmed() {
	            P.addClass(T.dimmed);
	          }, active: function active() {
	            z.addClass(T.active);
	          }, animating: function animating() {
	            z.addClass(T.animating);
	          }, transition: function transition(e) {
	            e = e || x.get.transition(), z.addClass(e);
	          }, direction: function direction(e) {
	            e = e || x.get.direction(), z.addClass(T[e]);
	          }, visible: function visible() {
	            z.addClass(T.visible);
	          }, overlay: function overlay() {
	            z.addClass(T.overlay);
	          } }, remove: { inlineCSS: function inlineCSS() {
	            x.debug("Removing inline css styles", r), r && r.length > 0 && r.remove();
	          }, ios: function ios() {
	            c.removeClass(T.ios);
	          }, pushed: function pushed() {
	            R.removeClass(T.pushed);
	          }, pushable: function pushable() {
	            R.removeClass(T.pushable);
	          }, active: function active() {
	            z.removeClass(T.active);
	          }, animating: function animating() {
	            z.removeClass(T.animating);
	          }, transition: function transition(e) {
	            e = e || x.get.transition(), z.removeClass(e);
	          }, direction: function direction(e) {
	            e = e || x.get.direction(), z.removeClass(T[e]);
	          }, visible: function visible() {
	            z.removeClass(T.visible);
	          }, overlay: function overlay() {
	            z.removeClass(T.overlay);
	          } }, get: { direction: function direction() {
	            return z.hasClass(T.top) ? T.top : z.hasClass(T.right) ? T.right : z.hasClass(T.bottom) ? T.bottom : T.left;
	          }, transition: function transition() {
	            var e,
	                n = x.get.direction();return e = x.is.mobile() ? "auto" == k.mobileTransition ? k.defaultTransition.mobile[n] : k.mobileTransition : "auto" == k.transition ? k.defaultTransition.computer[n] : k.transition, x.verbose("Determined transition", e), e;
	          }, transitionEvent: function transitionEvent() {
	            var e,
	                n = t.createElement("element"),
	                o = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };for (e in o) {
	              if (n.style[e] !== i) return o[e];
	            }
	          } }, is: { ie: function ie() {
	            var e = !n.ActiveXObject && "ActiveXObject" in n,
	                t = "ActiveXObject" in n;return e || t;
	          }, ios: function ios() {
	            var e = navigator.userAgent,
	                n = e.match(A.ios),
	                t = e.match(A.mobileChrome);return n && !t ? (x.verbose("Browser was found to be iOS", e), !0) : !1;
	          }, mobile: function mobile() {
	            var e = navigator.userAgent,
	                n = e.match(A.mobile);return n ? (x.verbose("Browser was found to be mobile", e), !0) : (x.verbose("Browser is not mobile, using regular transition", e), !1);
	          }, hidden: function hidden() {
	            return !x.is.visible();
	          }, visible: function visible() {
	            return z.hasClass(T.visible);
	          }, open: function open() {
	            return x.is.visible();
	          }, closed: function closed() {
	            return x.is.hidden();
	          }, vertical: function vertical() {
	            return z.hasClass(T.top);
	          }, animating: function animating() {
	            return R.hasClass(T.animating);
	          }, rtl: function rtl() {
	            return x.cache.rtl === i && (x.cache.rtl = "rtl" == z.css("direction")), x.cache.rtl;
	          } }, setting: function setting(n, t) {
	          if (x.debug("Changing setting", n, t), e.isPlainObject(n)) e.extend(!0, k, n);else {
	            if (t === i) return k[n];k[n] = t;
	          }
	        }, internal: function internal(n, t) {
	          if (e.isPlainObject(n)) e.extend(!0, x, n);else {
	            if (t === i) return x[n];x[n] = t;
	          }
	        }, debug: function debug() {
	          k.debug && (k.performance ? x.performance.log(arguments) : (x.debug = Function.prototype.bind.call(console.info, console, k.name + ":"), x.debug.apply(console, arguments)));
	        }, verbose: function verbose() {
	          k.verbose && k.debug && (k.performance ? x.performance.log(arguments) : (x.verbose = Function.prototype.bind.call(console.info, console, k.name + ":"), x.verbose.apply(console, arguments)));
	        }, error: function error() {
	          x.error = Function.prototype.bind.call(console.error, console, k.name + ":"), x.error.apply(console, arguments);
	        }, performance: { log: function log(e) {
	            var n, t, i;k.performance && (n = new Date().getTime(), i = m || n, t = n - i, m = n, f.push({ Name: e[0], Arguments: [].slice.call(e, 1) || "", Element: H, "Execution Time": t })), clearTimeout(x.performance.timer), x.performance.timer = setTimeout(x.performance.display, 500);
	          }, display: function display() {
	            var n = k.name + ":",
	                t = 0;m = !1, clearTimeout(x.performance.timer), e.each(f, function (e, n) {
	              t += n["Execution Time"];
	            }), n += " " + t + "ms", d && (n += " '" + d + "'"), (console.group !== i || console.table !== i) && f.length > 0 && (console.groupCollapsed(n), console.table ? console.table(f) : e.each(f, function (e, n) {
	              console.log(n.Name + ": " + n["Execution Time"] + "ms");
	            }), console.groupEnd()), f = [];
	          } }, invoke: function invoke(n, t, o) {
	          var r,
	              s,
	              l,
	              c = N;return t = t || h, o = H || o, "string" == typeof n && c !== i && (n = n.split(/[\. ]/), r = n.length - 1, e.each(n, function (t, o) {
	            var a = t != r ? o + n[t + 1].charAt(0).toUpperCase() + n[t + 1].slice(1) : n;if (e.isPlainObject(c[a]) && t != r) c = c[a];else {
	              if (c[a] !== i) return s = c[a], !1;if (!e.isPlainObject(c[o]) || t == r) return c[o] !== i ? (s = c[o], !1) : (x.error(F.method, n), !1);c = c[o];
	            }
	          })), e.isFunction(s) ? l = s.apply(o, t) : s !== i && (l = s), e.isArray(a) ? a.push(l) : a !== i ? a = [a, l] : l !== i && (a = l), s;
	        } }, p ? (N === i && x.initialize(), x.invoke(g)) : (N !== i && x.invoke("destroy"), x.initialize());
	    }), a !== i ? a : this;
	  }, e.fn.sidebar.settings = { name: "Sidebar", namespace: "sidebar", debug: !1, verbose: !1, performance: !0, transition: "auto", mobileTransition: "auto", defaultTransition: { computer: { left: "uncover", right: "uncover", top: "overlay", bottom: "overlay" }, mobile: { left: "uncover", right: "uncover", top: "overlay", bottom: "overlay" } }, context: "body", exclusive: !1, closable: !0, dimPage: !0, scrollLock: !1, returnScroll: !1, delaySetup: !1, duration: 500, onChange: function onChange() {}, onShow: function onShow() {}, onHide: function onHide() {}, onHidden: function onHidden() {}, onVisible: function onVisible() {}, className: { active: "active", animating: "animating", dimmed: "dimmed", ios: "ios", pushable: "pushable", pushed: "pushed", right: "right", top: "top", left: "left", bottom: "bottom", visible: "visible" }, selector: { fixed: ".fixed", omitted: "script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed", pusher: ".pusher", sidebar: ".ui.sidebar" }, regExp: { ios: /(iPad|iPhone|iPod)/g, mobileChrome: /(CriOS)/g, mobile: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g }, error: { method: "The method you called is not defined.", pusher: "Had to add pusher element. For optimal performance make sure body content is inside a pusher element", movedSidebar: "Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag", overlay: "The overlay setting is no longer supported, use animation: overlay", notFound: "There were no elements that matched the specified selector" } };
	}(_jquery2.default, window, document), function (e, n, t, i) {
	  "use strict";
	  e.fn.transition = function () {
	    var o,
	        a = e(this),
	        r = a.selector || "",
	        s = new Date().getTime(),
	        l = [],
	        c = arguments,
	        u = c[0],
	        d = [].slice.call(arguments, 1),
	        m = "string" == typeof u;n.requestAnimationFrame || n.mozRequestAnimationFrame || n.webkitRequestAnimationFrame || n.msRequestAnimationFrame || function (e) {
	      setTimeout(e, 0);
	    };return a.each(function (n) {
	      var f,
	          g,
	          p,
	          h,
	          v,
	          b,
	          y,
	          w,
	          C,
	          x = e(this),
	          k = this;C = { initialize: function initialize() {
	          f = C.get.settings.apply(k, c), h = f.className, p = f.error, v = f.metadata, w = "." + f.namespace, y = "module-" + f.namespace, g = x.data(y) || C, b = C.get.animationEndEvent(), m && (m = C.invoke(u)), m === !1 && (C.verbose("Converted arguments into settings object", f), f.interval ? C.delay(f.animate) : C.animate(), C.instantiate());
	        }, instantiate: function instantiate() {
	          C.verbose("Storing instance of module", C), g = C, x.data(y, g);
	        }, destroy: function destroy() {
	          C.verbose("Destroying previous module for", k), x.removeData(y);
	        }, refresh: function refresh() {
	          C.verbose("Refreshing display type on next animation"), delete C.displayType;
	        }, forceRepaint: function forceRepaint() {
	          C.verbose("Forcing element repaint");var e = x.parent(),
	              n = x.next();0 === n.length ? x.detach().appendTo(e) : x.detach().insertBefore(n);
	        }, repaint: function repaint() {
	          C.verbose("Repainting element");k.offsetWidth;
	        }, delay: function delay(e) {
	          var t,
	              o,
	              r = C.get.animationDirection();r || (r = C.can.transition() ? C.get.direction() : "static"), e = e !== i ? e : f.interval, t = "auto" == f.reverse && r == h.outward, o = t || 1 == f.reverse ? (a.length - n) * f.interval : n * f.interval, C.debug("Delaying animation by", o), setTimeout(C.animate, o);
	        }, animate: function animate(e) {
	          if (f = e || f, !C.is.supported()) return C.error(p.support), !1;if (C.debug("Preparing animation", f.animation), C.is.animating()) {
	            if (f.queue) return !f.allowRepeats && C.has.direction() && C.is.occurring() && C.queuing !== !0 ? C.debug("Animation is currently occurring, preventing queueing same animation", f.animation) : C.queue(f.animation), !1;if (!f.allowRepeats && C.is.occurring()) return C.debug("Animation is already occurring, will not execute repeated animation", f.animation), !1;C.debug("New animation started, completing previous early", f.animation), g.complete();
	          }C.can.animate() ? C.set.animating(f.animation) : C.error(p.noAnimation, f.animation, k);
	        }, reset: function reset() {
	          C.debug("Resetting animation to beginning conditions"), C.remove.animationCallbacks(), C.restore.conditions(), C.remove.animating();
	        }, queue: function queue(e) {
	          C.debug("Queueing animation of", e), C.queuing = !0, x.one(b + ".queue" + w, function () {
	            C.queuing = !1, C.repaint(), C.animate.apply(this, f);
	          });
	        }, complete: function complete(e) {
	          C.debug("Animation complete", f.animation), C.remove.completeCallback(), C.remove.failSafe(), C.is.looping() || (C.is.outward() ? (C.verbose("Animation is outward, hiding element"), C.restore.conditions(), C.hide()) : C.is.inward() ? (C.verbose("Animation is outward, showing element"), C.restore.conditions(), C.show()) : (C.verbose("Static animation completed"), C.restore.conditions(), f.onComplete.call(k)));
	        }, force: { visible: function visible() {
	            var e = x.attr("style"),
	                n = C.get.userStyle(),
	                t = C.get.displayType(),
	                o = n + "display: " + t + " !important;",
	                a = x.css("display"),
	                r = e === i || "" === e;a !== t ? (C.verbose("Overriding default display to show element", t), x.attr("style", o)) : r && x.removeAttr("style");
	          }, hidden: function hidden() {
	            var e = x.attr("style"),
	                n = x.css("display"),
	                t = e === i || "" === e;"none" === n || C.is.hidden() ? t && x.removeAttr("style") : (C.verbose("Overriding default display to hide element"), x.css("display", "none"));
	          } }, has: { direction: function direction(n) {
	            var t = !1;return n = n || f.animation, "string" == typeof n && (n = n.split(" "), e.each(n, function (e, n) {
	              (n === h.inward || n === h.outward) && (t = !0);
	            })), t;
	          }, inlineDisplay: function inlineDisplay() {
	            var n = x.attr("style") || "";return e.isArray(n.match(/display.*?;/, ""));
	          } }, set: { animating: function animating(e) {
	            var n;C.remove.completeCallback(), e = e || f.animation, n = C.get.animationClass(e), C.save.animation(n), C.force.visible(), C.remove.hidden(), C.remove.direction(), C.start.animation(n);
	          }, duration: function duration(e, n) {
	            n = n || f.duration, n = "number" == typeof n ? n + "ms" : n, (n || 0 === n) && (C.verbose("Setting animation duration", n), x.css({ "animation-duration": n }));
	          }, direction: function direction(e) {
	            e = e || C.get.direction(), e == h.inward ? C.set.inward() : C.set.outward();
	          }, looping: function looping() {
	            C.debug("Transition set to loop"), x.addClass(h.looping);
	          }, hidden: function hidden() {
	            x.addClass(h.transition).addClass(h.hidden);
	          }, inward: function inward() {
	            C.debug("Setting direction to inward"), x.removeClass(h.outward).addClass(h.inward);
	          }, outward: function outward() {
	            C.debug("Setting direction to outward"), x.removeClass(h.inward).addClass(h.outward);
	          }, visible: function visible() {
	            x.addClass(h.transition).addClass(h.visible);
	          } }, start: { animation: function animation(e) {
	            e = e || C.get.animationClass(), C.debug("Starting tween", e), x.addClass(e).one(b + ".complete" + w, C.complete), f.useFailSafe && C.add.failSafe(), C.set.duration(f.duration), f.onStart.call(k);
	          } }, save: { animation: function animation(e) {
	            C.cache || (C.cache = {}), C.cache.animation = e;
	          }, displayType: function displayType(e) {
	            "none" !== e && x.data(v.displayType, e);
	          }, transitionExists: function transitionExists(n, t) {
	            e.fn.transition.exists[n] = t, C.verbose("Saving existence of transition", n, t);
	          } }, restore: { conditions: function conditions() {
	            var e = C.get.currentAnimation();e && (x.removeClass(e), C.verbose("Removing animation class", C.cache)), C.remove.duration();
	          } }, add: { failSafe: function failSafe() {
	            var e = C.get.duration();C.timer = setTimeout(function () {
	              x.triggerHandler(b);
	            }, e + f.failSafeDelay), C.verbose("Adding fail safe timer", C.timer);
	          } }, remove: { animating: function animating() {
	            x.removeClass(h.animating);
	          }, animationCallbacks: function animationCallbacks() {
	            C.remove.queueCallback(), C.remove.completeCallback();
	          }, queueCallback: function queueCallback() {
	            x.off(".queue" + w);
	          }, completeCallback: function completeCallback() {
	            x.off(".complete" + w);
	          }, display: function display() {
	            x.css("display", "");
	          }, direction: function direction() {
	            x.removeClass(h.inward).removeClass(h.outward);
	          }, duration: function duration() {
	            x.css("animation-duration", "");
	          }, failSafe: function failSafe() {
	            C.verbose("Removing fail safe timer", C.timer), C.timer && clearTimeout(C.timer);
	          }, hidden: function hidden() {
	            x.removeClass(h.hidden);
	          }, visible: function visible() {
	            x.removeClass(h.visible);
	          }, looping: function looping() {
	            C.debug("Transitions are no longer looping"), C.is.looping() && (C.reset(), x.removeClass(h.looping));
	          }, transition: function transition() {
	            x.removeClass(h.visible).removeClass(h.hidden);
	          } }, get: { settings: function settings(n, t, i) {
	            return "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? e.extend(!0, {}, e.fn.transition.settings, n) : "function" == typeof i ? e.extend({}, e.fn.transition.settings, { animation: n, onComplete: i, duration: t }) : "string" == typeof t || "number" == typeof t ? e.extend({}, e.fn.transition.settings, { animation: n, duration: t }) : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? e.extend({}, e.fn.transition.settings, t, { animation: n }) : "function" == typeof t ? e.extend({}, e.fn.transition.settings, { animation: n, onComplete: t }) : e.extend({}, e.fn.transition.settings, { animation: n });
	          }, animationClass: function animationClass(e) {
	            var n = e || f.animation,
	                t = C.can.transition() && !C.has.direction() ? C.get.direction() + " " : "";return h.animating + " " + h.transition + " " + t + n;
	          }, currentAnimation: function currentAnimation() {
	            return C.cache && C.cache.animation !== i ? C.cache.animation : !1;
	          }, currentDirection: function currentDirection() {
	            return C.is.inward() ? h.inward : h.outward;
	          }, direction: function direction() {
	            return C.is.hidden() || !C.is.visible() ? h.inward : h.outward;
	          }, animationDirection: function animationDirection(n) {
	            var t;return n = n || f.animation, "string" == typeof n && (n = n.split(" "), e.each(n, function (e, n) {
	              n === h.inward ? t = h.inward : n === h.outward && (t = h.outward);
	            })), t ? t : !1;
	          }, duration: function duration(e) {
	            return e = e || f.duration, e === !1 && (e = x.css("animation-duration") || 0), "string" == typeof e ? e.indexOf("ms") > -1 ? parseFloat(e) : 1e3 * parseFloat(e) : e;
	          }, displayType: function displayType() {
	            return f.displayType ? f.displayType : (x.data(v.displayType) === i && C.can.transition(!0), x.data(v.displayType));
	          }, userStyle: function userStyle(e) {
	            return e = e || x.attr("style") || "", e.replace(/display.*?;/, "");
	          }, transitionExists: function transitionExists(n) {
	            return e.fn.transition.exists[n];
	          }, animationStartEvent: function animationStartEvent() {
	            var e,
	                n = t.createElement("div"),
	                o = {
	              animation: "animationstart", OAnimation: "oAnimationStart", MozAnimation: "mozAnimationStart", WebkitAnimation: "webkitAnimationStart" };for (e in o) {
	              if (n.style[e] !== i) return o[e];
	            }return !1;
	          }, animationEndEvent: function animationEndEvent() {
	            var e,
	                n = t.createElement("div"),
	                o = { animation: "animationend", OAnimation: "oAnimationEnd", MozAnimation: "mozAnimationEnd", WebkitAnimation: "webkitAnimationEnd" };for (e in o) {
	              if (n.style[e] !== i) return o[e];
	            }return !1;
	          } }, can: { transition: function transition(n) {
	            var t,
	                o,
	                a,
	                r,
	                s,
	                l,
	                c,
	                u = f.animation,
	                d = C.get.transitionExists(u);if (d === i || n) {
	              if (C.verbose("Determining whether animation exists"), t = x.attr("class"), o = x.prop("tagName"), a = e("<" + o + " />").addClass(t).insertAfter(x), r = a.addClass(u).removeClass(h.inward).removeClass(h.outward).addClass(h.animating).addClass(h.transition).css("animationName"), s = a.addClass(h.inward).css("animationName"), c = a.attr("class", t).removeAttr("style").removeClass(h.hidden).removeClass(h.visible).show().css("display"), C.verbose("Determining final display state", c), C.save.displayType(c), a.remove(), r != s) C.debug("Direction exists for animation", u), l = !0;else {
	                if ("none" == r || !r) return void C.debug("No animation defined in css", u);C.debug("Static animation found", u, c), l = !1;
	              }C.save.transitionExists(u, l);
	            }return d !== i ? d : l;
	          }, animate: function animate() {
	            return C.can.transition() !== i;
	          } }, is: { animating: function animating() {
	            return x.hasClass(h.animating);
	          }, inward: function inward() {
	            return x.hasClass(h.inward);
	          }, outward: function outward() {
	            return x.hasClass(h.outward);
	          }, looping: function looping() {
	            return x.hasClass(h.looping);
	          }, occurring: function occurring(e) {
	            return e = e || f.animation, e = "." + e.replace(" ", "."), x.filter(e).length > 0;
	          }, visible: function visible() {
	            return x.is(":visible");
	          }, hidden: function hidden() {
	            return "hidden" === x.css("visibility");
	          }, supported: function supported() {
	            return b !== !1;
	          } }, hide: function hide() {
	          C.verbose("Hiding element"), C.is.animating() && C.reset(), k.blur(), C.remove.display(), C.remove.visible(), C.set.hidden(), C.force.hidden(), f.onHide.call(k), f.onComplete.call(k);
	        }, show: function show(e) {
	          C.verbose("Showing element", e), C.remove.hidden(), C.set.visible(), C.force.visible(), f.onShow.call(k), f.onComplete.call(k);
	        }, toggle: function toggle() {
	          C.is.visible() ? C.hide() : C.show();
	        }, stop: function stop() {
	          C.debug("Stopping current animation"), x.triggerHandler(b);
	        }, stopAll: function stopAll() {
	          C.debug("Stopping all animation"), C.remove.queueCallback(), x.triggerHandler(b);
	        }, clear: { queue: function queue() {
	            C.debug("Clearing animation queue"), C.remove.queueCallback();
	          } }, enable: function enable() {
	          C.verbose("Starting animation"), x.removeClass(h.disabled);
	        }, disable: function disable() {
	          C.debug("Stopping animation"), x.addClass(h.disabled);
	        }, setting: function setting(n, t) {
	          if (C.debug("Changing setting", n, t), e.isPlainObject(n)) e.extend(!0, f, n);else {
	            if (t === i) return f[n];f[n] = t;
	          }
	        }, internal: function internal(n, t) {
	          if (e.isPlainObject(n)) e.extend(!0, C, n);else {
	            if (t === i) return C[n];C[n] = t;
	          }
	        }, debug: function debug() {
	          f.debug && (f.performance ? C.performance.log(arguments) : (C.debug = Function.prototype.bind.call(console.info, console, f.name + ":"), C.debug.apply(console, arguments)));
	        }, verbose: function verbose() {
	          f.verbose && f.debug && (f.performance ? C.performance.log(arguments) : (C.verbose = Function.prototype.bind.call(console.info, console, f.name + ":"), C.verbose.apply(console, arguments)));
	        }, error: function error() {
	          C.error = Function.prototype.bind.call(console.error, console, f.name + ":"), C.error.apply(console, arguments);
	        }, performance: { log: function log(e) {
	            var n, t, i;f.performance && (n = new Date().getTime(), i = s || n, t = n - i, s = n, l.push({ Name: e[0], Arguments: [].slice.call(e, 1) || "", Element: k, "Execution Time": t })), clearTimeout(C.performance.timer), C.performance.timer = setTimeout(C.performance.display, 500);
	          }, display: function display() {
	            var n = f.name + ":",
	                t = 0;s = !1, clearTimeout(C.performance.timer), e.each(l, function (e, n) {
	              t += n["Execution Time"];
	            }), n += " " + t + "ms", r && (n += " '" + r + "'"), a.length > 1 && (n += " (" + a.length + ")"), (console.group !== i || console.table !== i) && l.length > 0 && (console.groupCollapsed(n), console.table ? console.table(l) : e.each(l, function (e, n) {
	              console.log(n.Name + ": " + n["Execution Time"] + "ms");
	            }), console.groupEnd()), l = [];
	          } }, invoke: function invoke(n, t, a) {
	          var r,
	              s,
	              l,
	              c = g;return t = t || d, a = k || a, "string" == typeof n && c !== i && (n = n.split(/[\. ]/), r = n.length - 1, e.each(n, function (t, o) {
	            var a = t != r ? o + n[t + 1].charAt(0).toUpperCase() + n[t + 1].slice(1) : n;if (e.isPlainObject(c[a]) && t != r) c = c[a];else {
	              if (c[a] !== i) return s = c[a], !1;if (!e.isPlainObject(c[o]) || t == r) return c[o] !== i ? (s = c[o], !1) : !1;c = c[o];
	            }
	          })), e.isFunction(s) ? l = s.apply(a, t) : s !== i && (l = s), e.isArray(o) ? o.push(l) : o !== i ? o = [o, l] : l !== i && (o = l), s !== i ? s : !1;
	        } }, C.initialize();
	    }), o !== i ? o : this;
	  }, e.fn.transition.exists = {}, e.fn.transition.settings = { name: "Transition", debug: !1, verbose: !1, performance: !0, namespace: "transition", interval: 0, reverse: "auto", onStart: function onStart() {}, onComplete: function onComplete() {}, onShow: function onShow() {}, onHide: function onHide() {}, useFailSafe: !0, failSafeDelay: 100, allowRepeats: !1, displayType: !1, animation: "fade", duration: !1, queue: !0, metadata: { displayType: "display" }, className: { animating: "animating", disabled: "disabled", hidden: "hidden", inward: "in", loading: "loading", looping: "looping", outward: "out", transition: "transition", visible: "visible" }, error: { noAnimation: "Element is no longer attached to DOM. Unable to animate.", repeated: "That animation is already occurring, cancelling repeated animation", method: "The method you called is not defined", support: "This browser does not support CSS animations" } };
	}(_jquery2.default, window, document);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	/**
	 * The DAT.GUI wrapper class
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _datGui = __webpack_require__(6);

	var _datGui2 = _interopRequireDefault(_datGui);

	var _pubsub = __webpack_require__(7);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var controller = function () {
		function controller() {
			_classCallCheck(this, controller);

			this.gui = new _datGui2.default.GUI();
			this.events = _pubsub2.default;

			this.params = {
				topX: 220,
				topY: 143,
				sampleArea: '7,3',
				invertText: false
			};

			this.imageWidth = 0;
			this.imageHeight = 0;

			this.sampleAreaOptions = {};
			this.createSampleArea();

			this.controllers = {};

			this.addKeyboardEvents();
		}

		/**
	  * expects a DOM image reference
	  */

		_createClass(controller, [{
			key: 'createSampleArea',
			value: function createSampleArea() {
				var _this = this;

				var sampleAreaArray = [[7, 3], [9, 5], [5, 5], [9, 9], [12, 9], [15, 9], [15, 15], [20, 15]];

				sampleAreaArray.forEach(function (e) {
					_this.sampleAreaOptions[e[0] + ' × ' + e[1]] = e;
				});
			}
		}, {
			key: 'addGUIParams',
			value: function addGUIParams() {
				var _this2 = this;

				/**
	    * Start X
	    */
				this.controllers.topX = this.gui.add(this.params, 'topX');
				this.controllers.topX = this.controllers.topX.min(0).max(this.imageWidth).step(1).name('X position');

				this.controllers.topX.onChange(function (val) {
					_this2.events.trigger('change', _this2.params);
				});

				/**
	    * Start Y
	    */
				this.controllers.topY = this.gui.add(this.params, 'topY');
				this.controllers.topY = this.controllers.topY.min(0).max(this.imageHeight).step(1).name('Y position');

				this.controllers.topY.onChange(function (val) {
					_this2.events.trigger('change', _this2.params);
				});

				/**
	    * Sample area
	    */
				this.controllers.list = this.gui.add(this.params, 'sampleArea', this.sampleAreaOptions);
				this.controllers.list = this.controllers.list.name('Sample area');

				this.controllers.list.onChange(function (val) {
					_this2.events.trigger('change', _this2.params);
				});

				/**
	    * Invert text
	    */
				this.controllers.invertText = this.gui.add(this.params, "invertText");
				this.controllers.invertText = this.controllers.invertText.name('Invert text color');

				this.controllers.invertText.onChange(function (val) {
					_this2.events.trigger('invertText', _this2.params);
				});

				/**
	    * Randomize Button
	    */
				this.controllers.randomizeButton = this.gui.add({
					"Randomize": function Randomize() {
						_this2.randomize();
					}
				}, "Randomize");
			}
		}, {
			key: 'clearGUIParams',
			value: function clearGUIParams() {
				this.gui.remove(this.controllers.topY);
				this.gui.remove(this.controllers.topX);
				this.gui.remove(this.controllers.list);
				this.gui.remove(this.controllers.invertText);
				this.gui.remove(this.controllers.randomizeButton);
			}
		}, {
			key: 'randomBetween',
			value: function randomBetween(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
		}, {
			key: 'randomize',
			value: function randomize() {
				this.params.topX = this.randomBetween(0, this.imageWidth);
				this.params.topY = this.randomBetween(0, this.imageHeight);
				this.gui.__controllers[0].setValue(this.params.topX);
				this.gui.__controllers[1].setValue(this.params.topY);
			}
		}, {
			key: 'addKeyboardEvents',
			value: function addKeyboardEvents() {
				var _this3 = this;

				window.addEventListener('keydown', function (e) {
					switch (e.keyCode) {
						case 37:
							e.preventDefault();
							_this3.params.topX--;
							_this3.gui.__controllers[0].setValue(_this3.params.topX);
							break;
						case 39:
							e.preventDefault();
							_this3.params.topX++;
							_this3.gui.__controllers[0].setValue(_this3.params.topX);
							break;
						case 38:
							e.preventDefault();
							_this3.params.topY--;
							_this3.gui.__controllers[1].setValue(_this3.params.topY);
							break;
						case 40:
							e.preventDefault();
							_this3.params.topY++;
							_this3.gui.__controllers[1].setValue(_this3.params.topY);
							break;
						case 82:
							e.preventDefault();
							_this3.randomize();
							break;
					}
				});
			}
		}, {
			key: 'image',
			set: function set(img) {
				this.imageWidth = img.width;
				this.imageHeight = img.height;

				if (this.controllers.list) {
					this.clearGUIParams();
					// reset positions
					this.params.topX = this.imageWidth / 2;
					this.params.topY = this.imageHeight / 2;
				}
				this.addGUIParams();
			}
		}, {
			key: 'shared',
			set: function set(share) {
				this.params.topX = share.topX;
				this.params.topY = share.topY;
				this.params.sampleArea = share.sampleArea;
				this.params.invertText = share.invertText;
				//
				this.events.trigger('invertText', this.params);
			}
		}]);

		return controller;
	}();

	exports.default = new controller();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */
	var dat = dat || {};dat.gui = dat.gui || {};dat.utils = dat.utils || {};dat.controllers = dat.controllers || {};dat.dom = dat.dom || {};dat.color = dat.color || {};dat.utils.css = function () {
	  return { load: function load(f, a) {
	      a = a || document;var d = a.createElement("link");d.type = "text/css";d.rel = "stylesheet";d.href = f;a.getElementsByTagName("head")[0].appendChild(d);
	    }, inject: function inject(f, a) {
	      a = a || document;var d = document.createElement("style");d.type = "text/css";d.innerHTML = f;a.getElementsByTagName("head")[0].appendChild(d);
	    } };
	}();
	dat.utils.common = function () {
	  var f = Array.prototype.forEach,
	      a = Array.prototype.slice;return { BREAK: {}, extend: function extend(d) {
	      this.each(a.call(arguments, 1), function (a) {
	        for (var c in a) {
	          this.isUndefined(a[c]) || (d[c] = a[c]);
	        }
	      }, this);return d;
	    }, defaults: function defaults(d) {
	      this.each(a.call(arguments, 1), function (a) {
	        for (var c in a) {
	          this.isUndefined(d[c]) && (d[c] = a[c]);
	        }
	      }, this);return d;
	    }, compose: function compose() {
	      var d = a.call(arguments);return function () {
	        for (var e = a.call(arguments), c = d.length - 1; 0 <= c; c--) {
	          e = [d[c].apply(this, e)];
	        }return e[0];
	      };
	    },
	    each: function each(a, e, c) {
	      if (a) if (f && a.forEach && a.forEach === f) a.forEach(e, c);else if (a.length === a.length + 0) for (var b = 0, p = a.length; b < p && !(b in a && e.call(c, a[b], b) === this.BREAK); b++) {} else for (b in a) {
	        if (e.call(c, a[b], b) === this.BREAK) break;
	      }
	    }, defer: function defer(a) {
	      setTimeout(a, 0);
	    }, toArray: function toArray(d) {
	      return d.toArray ? d.toArray() : a.call(d);
	    }, isUndefined: function isUndefined(a) {
	      return void 0 === a;
	    }, isNull: function isNull(a) {
	      return null === a;
	    }, isNaN: function isNaN(a) {
	      return a !== a;
	    }, isArray: Array.isArray || function (a) {
	      return a.constructor === Array;
	    },
	    isObject: function isObject(a) {
	      return a === Object(a);
	    }, isNumber: function isNumber(a) {
	      return a === a + 0;
	    }, isString: function isString(a) {
	      return a === a + "";
	    }, isBoolean: function isBoolean(a) {
	      return !1 === a || !0 === a;
	    }, isFunction: function isFunction(a) {
	      return "[object Function]" === Object.prototype.toString.call(a);
	    } };
	}();
	dat.controllers.Controller = function (f) {
	  var a = function a(_a, e) {
	    this.initialValue = _a[e];this.domElement = document.createElement("div");this.object = _a;this.property = e;this.__onFinishChange = this.__onChange = void 0;
	  };f.extend(a.prototype, { onChange: function onChange(a) {
	      this.__onChange = a;return this;
	    }, onFinishChange: function onFinishChange(a) {
	      this.__onFinishChange = a;return this;
	    }, setValue: function setValue(a) {
	      this.object[this.property] = a;this.__onChange && this.__onChange.call(this, a);this.updateDisplay();return this;
	    }, getValue: function getValue() {
	      return this.object[this.property];
	    },
	    updateDisplay: function updateDisplay() {
	      return this;
	    }, isModified: function isModified() {
	      return this.initialValue !== this.getValue();
	    } });return a;
	}(dat.utils.common);
	dat.dom.dom = function (f) {
	  function a(b) {
	    if ("0" === b || f.isUndefined(b)) return 0;b = b.match(e);return f.isNull(b) ? 0 : parseFloat(b[1]);
	  }var d = {};f.each({ HTMLEvents: ["change"], MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"], KeyboardEvents: ["keydown"] }, function (b, a) {
	    f.each(b, function (b) {
	      d[b] = a;
	    });
	  });var e = /(\d+(\.\d+)?)px/,
	      c = { makeSelectable: function makeSelectable(b, a) {
	      void 0 !== b && void 0 !== b.style && (b.onselectstart = a ? function () {
	        return !1;
	      } : function () {}, b.style.MozUserSelect = a ? "auto" : "none", b.style.KhtmlUserSelect = a ? "auto" : "none", b.unselectable = a ? "on" : "off");
	    }, makeFullscreen: function makeFullscreen(b, a, c) {
	      f.isUndefined(a) && (a = !0);f.isUndefined(c) && (c = !0);b.style.position = "absolute";a && (b.style.left = 0, b.style.right = 0);c && (b.style.top = 0, b.style.bottom = 0);
	    }, fakeEvent: function fakeEvent(b, a, c, e) {
	      c = c || {};var r = d[a];if (!r) throw Error("Event type " + a + " not supported.");var n = document.createEvent(r);switch (r) {case "MouseEvents":
	          n.initMouseEvent(a, c.bubbles || !1, c.cancelable || !0, window, c.clickCount || 1, 0, 0, c.x || c.clientX || 0, c.y || c.clientY || 0, !1, !1, !1, !1, 0, null);break;case "KeyboardEvents":
	          r = n.initKeyboardEvent || n.initKeyEvent;f.defaults(c, { cancelable: !0, ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, keyCode: void 0, charCode: void 0 });r(a, c.bubbles || !1, c.cancelable, window, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.keyCode, c.charCode);break;default:
	          n.initEvent(a, c.bubbles || !1, c.cancelable || !0);}f.defaults(n, e);b.dispatchEvent(n);
	    }, bind: function bind(a, e, d, f) {
	      a.addEventListener ? a.addEventListener(e, d, f || !1) : a.attachEvent && a.attachEvent("on" + e, d);return c;
	    },
	    unbind: function unbind(a, e, d, f) {
	      a.removeEventListener ? a.removeEventListener(e, d, f || !1) : a.detachEvent && a.detachEvent("on" + e, d);return c;
	    }, addClass: function addClass(a, e) {
	      if (void 0 === a.className) a.className = e;else if (a.className !== e) {
	        var d = a.className.split(/ +/);-1 == d.indexOf(e) && (d.push(e), a.className = d.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
	      }return c;
	    }, removeClass: function removeClass(a, e) {
	      if (e) {
	        if (void 0 !== a.className) if (a.className === e) a.removeAttribute("class");else {
	          var d = a.className.split(/ +/),
	              f = d.indexOf(e);-1 != f && (d.splice(f, 1), a.className = d.join(" "));
	        }
	      } else a.className = void 0;return c;
	    }, hasClass: function hasClass(a, c) {
	      return new RegExp("(?:^|\\s+)" + c + "(?:\\s+|$)").test(a.className) || !1;
	    }, getWidth: function getWidth(b) {
	      b = getComputedStyle(b);return a(b["border-left-width"]) + a(b["border-right-width"]) + a(b["padding-left"]) + a(b["padding-right"]) + a(b.width);
	    }, getHeight: function getHeight(b) {
	      b = getComputedStyle(b);return a(b["border-top-width"]) + a(b["border-bottom-width"]) + a(b["padding-top"]) + a(b["padding-bottom"]) + a(b.height);
	    }, getOffset: function getOffset(a) {
	      var c = { left: 0, top: 0 };if (a.offsetParent) {
	        do {
	          c.left += a.offsetLeft, c.top += a.offsetTop;
	        } while (a = a.offsetParent);
	      }return c;
	    }, isActive: function isActive(a) {
	      return a === document.activeElement && (a.type || a.href);
	    } };return c;
	}(dat.utils.common);
	dat.controllers.OptionController = function (f, a, d) {
	  var e = function e(c, b, f) {
	    e.superclass.call(this, c, b);var q = this;this.__select = document.createElement("select");if (d.isArray(f)) {
	      var l = {};d.each(f, function (a) {
	        l[a] = a;
	      });f = l;
	    }d.each(f, function (a, b) {
	      var c = document.createElement("option");c.innerHTML = b;c.setAttribute("value", a);q.__select.appendChild(c);
	    });this.updateDisplay();a.bind(this.__select, "change", function () {
	      q.setValue(this.options[this.selectedIndex].value);
	    });this.domElement.appendChild(this.__select);
	  };
	  e.superclass = f;d.extend(e.prototype, f.prototype, { setValue: function setValue(a) {
	      a = e.superclass.prototype.setValue.call(this, a);this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());return a;
	    }, updateDisplay: function updateDisplay() {
	      this.__select.value = this.getValue();return e.superclass.prototype.updateDisplay.call(this);
	    } });return e;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
	dat.controllers.NumberController = function (f, a) {
	  function d(a) {
	    a = a.toString();return -1 < a.indexOf(".") ? a.length - a.indexOf(".") - 1 : 0;
	  }var e = function e(c, b, f) {
	    e.superclass.call(this, c, b);f = f || {};this.__min = f.min;this.__max = f.max;this.__step = f.step;a.isUndefined(this.__step) ? this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(Math.abs(this.initialValue)) / Math.LN10)) / 10 : this.__impliedStep = this.__step;this.__precision = d(this.__impliedStep);
	  };e.superclass = f;a.extend(e.prototype, f.prototype, { setValue: function setValue(a) {
	      void 0 !== this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max);void 0 !== this.__step && 0 != a % this.__step && (a = Math.round(a / this.__step) * this.__step);return e.superclass.prototype.setValue.call(this, a);
	    }, min: function min(a) {
	      this.__min = a;return this;
	    }, max: function max(a) {
	      this.__max = a;return this;
	    }, step: function step(a) {
	      this.__impliedStep = this.__step = a;this.__precision = d(a);return this;
	    } });return e;
	}(dat.controllers.Controller, dat.utils.common);
	dat.controllers.NumberControllerBox = function (f, a, d) {
	  var e = function e(c, b, f) {
	    function q() {
	      var a = parseFloat(n.__input.value);d.isNaN(a) || n.setValue(a);
	    }function l(a) {
	      var b = u - a.clientY;n.setValue(n.getValue() + b * n.__impliedStep);u = a.clientY;
	    }function r() {
	      a.unbind(window, "mousemove", l);a.unbind(window, "mouseup", r);
	    }this.__truncationSuspended = !1;e.superclass.call(this, c, b, f);var n = this,
	        u;this.__input = document.createElement("input");this.__input.setAttribute("type", "text");a.bind(this.__input, "change", q);a.bind(this.__input, "blur", function () {
	      q();n.__onFinishChange && n.__onFinishChange.call(n, n.getValue());
	    });a.bind(this.__input, "mousedown", function (b) {
	      a.bind(window, "mousemove", l);a.bind(window, "mouseup", r);u = b.clientY;
	    });a.bind(this.__input, "keydown", function (a) {
	      13 === a.keyCode && (n.__truncationSuspended = !0, this.blur(), n.__truncationSuspended = !1);
	    });this.updateDisplay();this.domElement.appendChild(this.__input);
	  };e.superclass = f;d.extend(e.prototype, f.prototype, { updateDisplay: function updateDisplay() {
	      var a = this.__input,
	          b;if (this.__truncationSuspended) b = this.getValue();else {
	        b = this.getValue();var d = Math.pow(10, this.__precision);b = Math.round(b * d) / d;
	      }a.value = b;return e.superclass.prototype.updateDisplay.call(this);
	    } });return e;
	}(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
	dat.controllers.NumberControllerSlider = function (f, a, d, e, c) {
	  function b(a, b, c, e, d) {
	    return e + (a - b) / (c - b) * (d - e);
	  }var p = function p(c, e, d, f, u) {
	    function A(c) {
	      c.preventDefault();var e = a.getOffset(k.__background),
	          d = a.getWidth(k.__background);k.setValue(b(c.clientX, e.left, e.left + d, k.__min, k.__max));return !1;
	    }function g() {
	      a.unbind(window, "mousemove", A);a.unbind(window, "mouseup", g);k.__onFinishChange && k.__onFinishChange.call(k, k.getValue());
	    }p.superclass.call(this, c, e, { min: d, max: f, step: u });var k = this;this.__background = document.createElement("div");this.__foreground = document.createElement("div");a.bind(this.__background, "mousedown", function (b) {
	      a.bind(window, "mousemove", A);a.bind(window, "mouseup", g);A(b);
	    });a.addClass(this.__background, "slider");a.addClass(this.__foreground, "slider-fg");this.updateDisplay();this.__background.appendChild(this.__foreground);this.domElement.appendChild(this.__background);
	  };p.superclass = f;p.useDefaultStyles = function () {
	    d.inject(c);
	  };e.extend(p.prototype, f.prototype, { updateDisplay: function updateDisplay() {
	      var a = (this.getValue() - this.__min) / (this.__max - this.__min);this.__foreground.style.width = 100 * a + "%";return p.superclass.prototype.updateDisplay.call(this);
	    } });return p;
	}(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
	dat.controllers.FunctionController = function (f, a, d) {
	  var e = function e(c, b, d) {
	    e.superclass.call(this, c, b);var f = this;this.__button = document.createElement("div");this.__button.innerHTML = void 0 === d ? "Fire" : d;a.bind(this.__button, "click", function (a) {
	      a.preventDefault();f.fire();return !1;
	    });a.addClass(this.__button, "button");this.domElement.appendChild(this.__button);
	  };e.superclass = f;d.extend(e.prototype, f.prototype, { fire: function fire() {
	      this.__onChange && this.__onChange.call(this);this.getValue().call(this.object);
	      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
	    } });return e;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
	dat.controllers.BooleanController = function (f, a, d) {
	  var e = function e(c, b) {
	    e.superclass.call(this, c, b);var d = this;this.__prev = this.getValue();this.__checkbox = document.createElement("input");this.__checkbox.setAttribute("type", "checkbox");a.bind(this.__checkbox, "change", function () {
	      d.setValue(!d.__prev);
	    }, !1);this.domElement.appendChild(this.__checkbox);this.updateDisplay();
	  };e.superclass = f;d.extend(e.prototype, f.prototype, { setValue: function setValue(a) {
	      a = e.superclass.prototype.setValue.call(this, a);this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());this.__prev = this.getValue();return a;
	    }, updateDisplay: function updateDisplay() {
	      !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1;return e.superclass.prototype.updateDisplay.call(this);
	    } });return e;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
	dat.color.toString = function (f) {
	  return function (a) {
	    if (1 == a.a || f.isUndefined(a.a)) {
	      for (a = a.hex.toString(16); 6 > a.length;) {
	        a = "0" + a;
	      }return "#" + a;
	    }return "rgba(" + Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b) + "," + a.a + ")";
	  };
	}(dat.utils.common);
	dat.color.interpret = function (f, a) {
	  var d,
	      e,
	      c = [{ litmus: a.isString, conversions: { THREE_CHAR_HEX: { read: function read(a) {
	          a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null === a ? !1 : { space: "HEX", hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString()) };
	        }, write: f }, SIX_CHAR_HEX: { read: function read(a) {
	          a = a.match(/^#([A-F0-9]{6})$/i);return null === a ? !1 : { space: "HEX", hex: parseInt("0x" + a[1].toString()) };
	        }, write: f }, CSS_RGB: { read: function read(a) {
	          a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	          return null === a ? !1 : { space: "RGB", r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]) };
	        }, write: f }, CSS_RGBA: { read: function read(a) {
	          a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return null === a ? !1 : { space: "RGB", r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]), a: parseFloat(a[4]) };
	        }, write: f } } }, { litmus: a.isNumber, conversions: { HEX: { read: function read(a) {
	          return { space: "HEX", hex: a, conversionName: "HEX" };
	        }, write: function write(a) {
	          return a.hex;
	        } } } }, { litmus: a.isArray, conversions: { RGB_ARRAY: { read: function read(a) {
	          return 3 != a.length ? !1 : { space: "RGB", r: a[0], g: a[1], b: a[2] };
	        }, write: function write(a) {
	          return [a.r, a.g, a.b];
	        } }, RGBA_ARRAY: { read: function read(a) {
	          return 4 != a.length ? !1 : { space: "RGB", r: a[0], g: a[1], b: a[2], a: a[3] };
	        }, write: function write(a) {
	          return [a.r, a.g, a.b, a.a];
	        } } } }, { litmus: a.isObject, conversions: { RGBA_OBJ: { read: function read(b) {
	          return a.isNumber(b.r) && a.isNumber(b.g) && a.isNumber(b.b) && a.isNumber(b.a) ? { space: "RGB", r: b.r, g: b.g, b: b.b, a: b.a } : !1;
	        }, write: function write(a) {
	          return { r: a.r, g: a.g, b: a.b, a: a.a };
	        } }, RGB_OBJ: { read: function read(b) {
	          return a.isNumber(b.r) && a.isNumber(b.g) && a.isNumber(b.b) ? { space: "RGB", r: b.r, g: b.g, b: b.b } : !1;
	        }, write: function write(a) {
	          return { r: a.r, g: a.g, b: a.b };
	        } }, HSVA_OBJ: { read: function read(b) {
	          return a.isNumber(b.h) && a.isNumber(b.s) && a.isNumber(b.v) && a.isNumber(b.a) ? { space: "HSV", h: b.h, s: b.s, v: b.v, a: b.a } : !1;
	        }, write: function write(a) {
	          return { h: a.h, s: a.s, v: a.v, a: a.a };
	        } }, HSV_OBJ: { read: function read(b) {
	          return a.isNumber(b.h) && a.isNumber(b.s) && a.isNumber(b.v) ? { space: "HSV", h: b.h, s: b.s, v: b.v } : !1;
	        }, write: function write(a) {
	          return { h: a.h, s: a.s, v: a.v };
	        } } } }];return function () {
	    e = !1;
	    var b = 1 < arguments.length ? a.toArray(arguments) : arguments[0];a.each(c, function (c) {
	      if (c.litmus(b)) return a.each(c.conversions, function (c, f) {
	        d = c.read(b);if (!1 === e && !1 !== d) return e = d, d.conversionName = f, d.conversion = c, a.BREAK;
	      }), a.BREAK;
	    });return e;
	  };
	}(dat.color.toString, dat.utils.common);
	dat.GUI = dat.gui.GUI = function (f, a, d, e, c, b, p, q, l, r, n, u, A, g, k) {
	  function v(a, b, h, d) {
	    if (void 0 === b[h]) throw Error("Object " + b + ' has no property "' + h + '"');d.color ? b = new n(b, h) : (b = [b, h].concat(d.factoryArgs), b = e.apply(a, b));d.before instanceof c && (d.before = d.before.__li);y(a, b);g.addClass(b.domElement, "c");h = document.createElement("span");g.addClass(h, "property-name");h.innerHTML = b.property;var f = document.createElement("div");f.appendChild(h);f.appendChild(b.domElement);d = w(a, f, d.before);g.addClass(d, m.CLASS_CONTROLLER_ROW);
	    g.addClass(d, _typeof(b.getValue()));t(a, d, b);a.__controllers.push(b);return b;
	  }function w(a, b, h) {
	    var c = document.createElement("li");b && c.appendChild(b);h ? a.__ul.insertBefore(c, params.before) : a.__ul.appendChild(c);a.onResize();return c;
	  }function t(a, c, h) {
	    h.__li = c;h.__gui = a;k.extend(h, { options: function options(b) {
	        if (1 < arguments.length) return h.remove(), v(a, h.object, h.property, { before: h.__li.nextElementSibling, factoryArgs: [k.toArray(arguments)] });if (k.isArray(b) || k.isObject(b)) return h.remove(), v(a, h.object, h.property, { before: h.__li.nextElementSibling, factoryArgs: [b] });
	      }, name: function name(a) {
	        h.__li.firstElementChild.firstElementChild.innerHTML = a;return h;
	      }, listen: function listen() {
	        h.__gui.listen(h);return h;
	      }, remove: function remove() {
	        h.__gui.remove(h);return h;
	      } });if (h instanceof l) {
	      var d = new q(h.object, h.property, { min: h.__min, max: h.__max, step: h.__step });k.each(["updateDisplay", "onChange", "onFinishChange"], function (a) {
	        var K = h[a],
	            b = d[a];h[a] = d[a] = function () {
	          var a = Array.prototype.slice.call(arguments);K.apply(h, a);return b.apply(d, a);
	        };
	      });
	      g.addClass(c, "has-slider");h.domElement.insertBefore(d.domElement, h.domElement.firstElementChild);
	    } else if (h instanceof q) {
	      var e = function e(b) {
	        return k.isNumber(h.__min) && k.isNumber(h.__max) ? (h.remove(), v(a, h.object, h.property, { before: h.__li.nextElementSibling, factoryArgs: [h.__min, h.__max, h.__step] })) : b;
	      };h.min = k.compose(e, h.min);h.max = k.compose(e, h.max);
	    } else h instanceof b ? (g.bind(c, "click", function () {
	      g.fakeEvent(h.__checkbox, "click");
	    }), g.bind(h.__checkbox, "click", function (a) {
	      a.stopPropagation();
	    })) : h instanceof p ? (g.bind(c, "click", function () {
	      g.fakeEvent(h.__button, "click");
	    }), g.bind(c, "mouseover", function () {
	      g.addClass(h.__button, "hover");
	    }), g.bind(c, "mouseout", function () {
	      g.removeClass(h.__button, "hover");
	    })) : h instanceof n && (g.addClass(c, "color"), h.updateDisplay = k.compose(function (a) {
	      c.style.borderLeftColor = h.__color.toString();return a;
	    }, h.updateDisplay), h.updateDisplay());h.setValue = k.compose(function (b) {
	      a.getRoot().__preset_select && h.isModified() && E(a.getRoot(), !0);return b;
	    }, h.setValue);
	  }function y(a, b) {
	    var c = a.getRoot(),
	        d = c.__rememberedObjects.indexOf(b.object);if (-1 != d) {
	      var e = c.__rememberedObjectIndecesToControllers[d];void 0 === e && (e = {}, c.__rememberedObjectIndecesToControllers[d] = e);e[b.property] = b;if (c.load && c.load.remembered) {
	        c = c.load.remembered;if (c[a.preset]) c = c[a.preset];else if (c.Default) c = c.Default;else return;c[d] && void 0 !== c[d][b.property] && (d = c[d][b.property], b.initialValue = d, b.setValue(d));
	      }
	    }
	  }function L(a) {
	    var b = a.__save_row = document.createElement("li");g.addClass(a.domElement, "has-save");
	    a.__ul.insertBefore(b, a.__ul.firstChild);g.addClass(b, "save-row");var c = document.createElement("span");c.innerHTML = "&nbsp;";g.addClass(c, "button gears");var d = document.createElement("span");d.innerHTML = "Save";g.addClass(d, "button");g.addClass(d, "save");var e = document.createElement("span");e.innerHTML = "New";g.addClass(e, "button");g.addClass(e, "save-as");var f = document.createElement("span");f.innerHTML = "Revert";g.addClass(f, "button");g.addClass(f, "revert");var r = a.__preset_select = document.createElement("select");
	    a.load && a.load.remembered ? k.each(a.load.remembered, function (b, c) {
	      F(a, c, c == a.preset);
	    }) : F(a, "Default", !1);g.bind(r, "change", function () {
	      for (var b = 0; b < a.__preset_select.length; b++) {
	        a.__preset_select[b].innerHTML = a.__preset_select[b].value;
	      }a.preset = this.value;
	    });b.appendChild(r);b.appendChild(c);b.appendChild(d);b.appendChild(e);b.appendChild(f);if (x) {
	      var n = function n() {
	        u.style.display = a.useLocalStorage ? "block" : "none";
	      },
	          b = document.getElementById("dg-save-locally"),
	          u = document.getElementById("dg-local-explain");
	      b.style.display = "block";b = document.getElementById("dg-local-storage");"true" === localStorage.getItem(document.location.href + ".isLocal") && b.setAttribute("checked", "checked");n();g.bind(b, "change", function () {
	        a.useLocalStorage = !a.useLocalStorage;n();
	      });
	    }var m = document.getElementById("dg-new-constructor");g.bind(m, "keydown", function (a) {
	      !a.metaKey || 67 !== a.which && 67 != a.keyCode || B.hide();
	    });g.bind(c, "click", function () {
	      m.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);B.show();m.focus();m.select();
	    });g.bind(d, "click", function () {
	      a.save();
	    });g.bind(e, "click", function () {
	      var b = prompt("Enter a new preset name.");b && a.saveAs(b);
	    });g.bind(f, "click", function () {
	      a.revert();
	    });
	  }function M(a) {
	    function b(f) {
	      f.preventDefault();e = f.clientX;g.addClass(a.__closeButton, m.CLASS_DRAG);g.bind(window, "mousemove", c);g.bind(window, "mouseup", d);return !1;
	    }function c(b) {
	      b.preventDefault();a.width += e - b.clientX;a.onResize();e = b.clientX;return !1;
	    }function d() {
	      g.removeClass(a.__closeButton, m.CLASS_DRAG);g.unbind(window, "mousemove", c);g.unbind(window, "mouseup", d);
	    }a.__resize_handle = document.createElement("div");k.extend(a.__resize_handle.style, { width: "6px", marginLeft: "-3px", height: "200px", cursor: "ew-resize", position: "absolute" });var e;g.bind(a.__resize_handle, "mousedown", b);g.bind(a.__closeButton, "mousedown", b);a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild);
	  }function G(a, b) {
	    a.domElement.style.width = b + "px";a.__save_row && a.autoPlace && (a.__save_row.style.width = b + "px");a.__closeButton && (a.__closeButton.style.width = b + "px");
	  }
	  function C(a, b) {
	    var c = {};k.each(a.__rememberedObjects, function (d, e) {
	      var f = {};k.each(a.__rememberedObjectIndecesToControllers[e], function (a, c) {
	        f[c] = b ? a.initialValue : a.getValue();
	      });c[e] = f;
	    });return c;
	  }function F(a, b, c) {
	    var d = document.createElement("option");d.innerHTML = b;d.value = b;a.__preset_select.appendChild(d);c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1);
	  }function E(a, b) {
	    var c = a.__preset_select[a.__preset_select.selectedIndex];c.innerHTML = b ? c.value + "*" : c.value;
	  }function H(a) {
	    0 != a.length && u(function () {
	      H(a);
	    });k.each(a, function (a) {
	      a.updateDisplay();
	    });
	  }f.inject(d);var x;try {
	    x = "localStorage" in window && null !== window.localStorage;
	  } catch (N) {
	    x = !1;
	  }var B,
	      I = !0,
	      z,
	      D = !1,
	      J = [],
	      m = function m(a) {
	    function b() {
	      var a = c.getRoot();a.width += 1;k.defer(function () {
	        --a.width;
	      });
	    }var c = this;this.domElement = document.createElement("div");this.__ul = document.createElement("ul");this.domElement.appendChild(this.__ul);g.addClass(this.domElement, "dg");this.__folders = {};this.__controllers = [];this.__rememberedObjects = [];this.__rememberedObjectIndecesToControllers = [];this.__listening = [];a = a || {};a = k.defaults(a, { autoPlace: !0, width: m.DEFAULT_WIDTH });a = k.defaults(a, { resizable: a.autoPlace, hideable: a.autoPlace });k.isUndefined(a.load) ? a.load = { preset: "Default" } : a.preset && (a.load.preset = a.preset);k.isUndefined(a.parent) && a.hideable && J.push(this);a.resizable = k.isUndefined(a.parent) && a.resizable;a.autoPlace && k.isUndefined(a.scrollable) && (a.scrollable = !0);var d = x && "true" === localStorage.getItem(document.location.href + ".isLocal"),
	        e;Object.defineProperties(this, { parent: { get: function get() {
	          return a.parent;
	        } },
	      scrollable: { get: function get() {
	          return a.scrollable;
	        } }, autoPlace: { get: function get() {
	          return a.autoPlace;
	        } }, preset: { get: function get() {
	          return c.parent ? c.getRoot().preset : a.load.preset;
	        }, set: function set(b) {
	          c.parent ? c.getRoot().preset = b : a.load.preset = b;for (b = 0; b < this.__preset_select.length; b++) {
	            this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b);
	          }c.revert();
	        } }, width: { get: function get() {
	          return a.width;
	        }, set: function set(b) {
	          a.width = b;G(c, b);
	        } }, name: { get: function get() {
	          return a.name;
	        }, set: function set(b) {
	          a.name = b;r && (r.innerHTML = a.name);
	        } }, closed: { get: function get() {
	          return a.closed;
	        }, set: function set(b) {
	          a.closed = b;a.closed ? g.addClass(c.__ul, m.CLASS_CLOSED) : g.removeClass(c.__ul, m.CLASS_CLOSED);this.onResize();c.__closeButton && (c.__closeButton.innerHTML = b ? m.TEXT_OPEN : m.TEXT_CLOSED);
	        } }, load: { get: function get() {
	          return a.load;
	        } }, useLocalStorage: { get: function get() {
	          return d;
	        }, set: function set(a) {
	          x && ((d = a) ? g.bind(window, "unload", e) : g.unbind(window, "unload", e), localStorage.setItem(document.location.href + ".isLocal", a));
	        } } });if (k.isUndefined(a.parent)) {
	      a.closed = !1;g.addClass(this.domElement, m.CLASS_MAIN);g.makeSelectable(this.domElement, !1);if (x && d) {
	        c.useLocalStorage = !0;var f = localStorage.getItem(document.location.href + ".gui");f && (a.load = JSON.parse(f));
	      }this.__closeButton = document.createElement("div");this.__closeButton.innerHTML = m.TEXT_CLOSED;g.addClass(this.__closeButton, m.CLASS_CLOSE_BUTTON);this.domElement.appendChild(this.__closeButton);g.bind(this.__closeButton, "click", function () {
	        c.closed = !c.closed;
	      });
	    } else {
	      void 0 === a.closed && (a.closed = !0);var r = document.createTextNode(a.name);
	      g.addClass(r, "controller-name");f = w(c, r);g.addClass(this.__ul, m.CLASS_CLOSED);g.addClass(f, "title");g.bind(f, "click", function (a) {
	        a.preventDefault();c.closed = !c.closed;return !1;
	      });a.closed || (this.closed = !1);
	    }a.autoPlace && (k.isUndefined(a.parent) && (I && (z = document.createElement("div"), g.addClass(z, "dg"), g.addClass(z, m.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(z), I = !1), z.appendChild(this.domElement), g.addClass(this.domElement, m.CLASS_AUTO_PLACE)), this.parent || G(c, a.width));g.bind(window, "resize", function () {
	      c.onResize();
	    });g.bind(this.__ul, "webkitTransitionEnd", function () {
	      c.onResize();
	    });g.bind(this.__ul, "transitionend", function () {
	      c.onResize();
	    });g.bind(this.__ul, "oTransitionEnd", function () {
	      c.onResize();
	    });this.onResize();a.resizable && M(this);this.saveToLocalStorageIfPossible = e = function e() {
	      x && "true" === localStorage.getItem(document.location.href + ".isLocal") && localStorage.setItem(document.location.href + ".gui", JSON.stringify(c.getSaveObject()));
	    };c.getRoot();a.parent || b();
	  };m.toggleHide = function () {
	    D = !D;k.each(J, function (a) {
	      a.domElement.style.zIndex = D ? -999 : 999;a.domElement.style.opacity = D ? 0 : 1;
	    });
	  };m.CLASS_AUTO_PLACE = "a";m.CLASS_AUTO_PLACE_CONTAINER = "ac";m.CLASS_MAIN = "main";m.CLASS_CONTROLLER_ROW = "cr";m.CLASS_TOO_TALL = "taller-than-window";m.CLASS_CLOSED = "closed";m.CLASS_CLOSE_BUTTON = "close-button";m.CLASS_DRAG = "drag";m.DEFAULT_WIDTH = 245;m.TEXT_CLOSED = "Close Controls";m.TEXT_OPEN = "Open Controls";g.bind(window, "keydown", function (a) {
	    "text" === document.activeElement.type || 72 !== a.which && 72 != a.keyCode || m.toggleHide();
	  }, !1);k.extend(m.prototype, { add: function add(a, b) {
	      return v(this, a, b, { factoryArgs: Array.prototype.slice.call(arguments, 2) });
	    }, addColor: function addColor(a, b) {
	      return v(this, a, b, { color: !0 });
	    }, remove: function remove(a) {
	      this.__ul.removeChild(a.__li);this.__controllers.splice(this.__controllers.indexOf(a), 1);var b = this;k.defer(function () {
	        b.onResize();
	      });
	    }, destroy: function destroy() {
	      this.autoPlace && z.removeChild(this.domElement);
	    }, addFolder: function addFolder(a) {
	      if (void 0 !== this.__folders[a]) throw Error('You already have a folder in this GUI by the name "' + a + '"');var b = { name: a, parent: this };b.autoPlace = this.autoPlace;this.load && this.load.folders && this.load.folders[a] && (b.closed = this.load.folders[a].closed, b.load = this.load.folders[a]);b = new m(b);this.__folders[a] = b;a = w(this, b.domElement);g.addClass(a, "folder");return b;
	    }, open: function open() {
	      this.closed = !1;
	    }, close: function close() {
	      this.closed = !0;
	    }, onResize: function onResize() {
	      var a = this.getRoot();if (a.scrollable) {
	        var b = g.getOffset(a.__ul).top,
	            c = 0;k.each(a.__ul.childNodes, function (b) {
	          a.autoPlace && b === a.__save_row || (c += g.getHeight(b));
	        });
	        window.innerHeight - b - 20 < c ? (g.addClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = window.innerHeight - b - 20 + "px") : (g.removeClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = "auto");
	      }a.__resize_handle && k.defer(function () {
	        a.__resize_handle.style.height = a.__ul.offsetHeight + "px";
	      });a.__closeButton && (a.__closeButton.style.width = a.width + "px");
	    }, remember: function remember() {
	      k.isUndefined(B) && (B = new A(), B.domElement.innerHTML = a);if (this.parent) throw Error("You can only call remember on a top level GUI.");var b = this;k.each(Array.prototype.slice.call(arguments), function (a) {
	        0 == b.__rememberedObjects.length && L(b);-1 == b.__rememberedObjects.indexOf(a) && b.__rememberedObjects.push(a);
	      });this.autoPlace && G(this, this.width);
	    }, getRoot: function getRoot() {
	      for (var a = this; a.parent;) {
	        a = a.parent;
	      }return a;
	    }, getSaveObject: function getSaveObject() {
	      var a = this.load;a.closed = this.closed;0 < this.__rememberedObjects.length && (a.preset = this.preset, a.remembered || (a.remembered = {}), a.remembered[this.preset] = C(this));a.folders = {};k.each(this.__folders, function (b, c) {
	        a.folders[c] = b.getSaveObject();
	      });return a;
	    }, save: function save() {
	      this.load.remembered || (this.load.remembered = {});this.load.remembered[this.preset] = C(this);E(this, !1);this.saveToLocalStorageIfPossible();
	    }, saveAs: function saveAs(a) {
	      this.load.remembered || (this.load.remembered = {}, this.load.remembered.Default = C(this, !0));this.load.remembered[a] = C(this);this.preset = a;F(this, a, !0);this.saveToLocalStorageIfPossible();
	    }, revert: function revert(a) {
	      k.each(this.__controllers, function (b) {
	        this.getRoot().load.remembered ? y(a || this.getRoot(), b) : b.setValue(b.initialValue);
	      }, this);k.each(this.__folders, function (a) {
	        a.revert(a);
	      });a || E(this.getRoot(), !1);
	    }, listen: function listen(a) {
	      var b = 0 == this.__listening.length;this.__listening.push(a);b && H(this.__listening);
	    } });return m;
	}(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n", dat.controllers.factory = function (f, a, d, e, c, b, p) {
	  return function (q, l, r, n) {
	    var u = q[l];if (p.isArray(r) || p.isObject(r)) return new f(q, l, r);if (p.isNumber(u)) return p.isNumber(r) && p.isNumber(n) ? new d(q, l, r, n) : new a(q, l, { min: r, max: n });if (p.isString(u)) return new e(q, l);if (p.isFunction(u)) return new c(q, l, "");if (p.isBoolean(u)) return new b(q, l);
	  };
	}(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function (f, a, d) {
	  var e = function e(c, b) {
	    function d() {
	      f.setValue(f.__input.value);
	    }e.superclass.call(this, c, b);var f = this;this.__input = document.createElement("input");this.__input.setAttribute("type", "text");a.bind(this.__input, "keyup", d);a.bind(this.__input, "change", d);a.bind(this.__input, "blur", function () {
	      f.__onFinishChange && f.__onFinishChange.call(f, f.getValue());
	    });a.bind(this.__input, "keydown", function (a) {
	      13 === a.keyCode && this.blur();
	    });this.updateDisplay();this.domElement.appendChild(this.__input);
	  };e.superclass = f;d.extend(e.prototype, f.prototype, { updateDisplay: function updateDisplay() {
	      a.isActive(this.__input) || (this.__input.value = this.getValue());return e.superclass.prototype.updateDisplay.call(this);
	    } });return e;
	}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function (f, a, d, e, c) {
	  function b(a, b, d, e) {
	    a.style.background = "";c.each(l, function (c) {
	      a.style.cssText += "background: " + c + "linear-gradient(" + b + ", " + d + " 0%, " + e + " 100%); ";
	    });
	  }function p(a) {
	    a.style.background = "";a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
	    a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
	  }var q = function q(f, n) {
	    function u(b) {
	      v(b);a.bind(window, "mousemove", v);a.bind(window, "mouseup", l);
	    }function l() {
	      a.unbind(window, "mousemove", v);a.unbind(window, "mouseup", l);
	    }function g() {
	      var a = e(this.value);!1 !== a ? (t.__color.__state = a, t.setValue(t.__color.toOriginal())) : this.value = t.__color.toString();
	    }function k() {
	      a.unbind(window, "mousemove", w);a.unbind(window, "mouseup", k);
	    }function v(b) {
	      b.preventDefault();var c = a.getWidth(t.__saturation_field),
	          d = a.getOffset(t.__saturation_field),
	          e = (b.clientX - d.left + document.body.scrollLeft) / c;b = 1 - (b.clientY - d.top + document.body.scrollTop) / c;1 < b ? b = 1 : 0 > b && (b = 0);1 < e ? e = 1 : 0 > e && (e = 0);t.__color.v = b;t.__color.s = e;t.setValue(t.__color.toOriginal());return !1;
	    }function w(b) {
	      b.preventDefault();var c = a.getHeight(t.__hue_field),
	          d = a.getOffset(t.__hue_field);b = 1 - (b.clientY - d.top + document.body.scrollTop) / c;1 < b ? b = 1 : 0 > b && (b = 0);t.__color.h = 360 * b;t.setValue(t.__color.toOriginal());return !1;
	    }q.superclass.call(this, f, n);this.__color = new d(this.getValue());this.__temp = new d(0);var t = this;this.domElement = document.createElement("div");a.makeSelectable(this.domElement, !1);
	    this.__selector = document.createElement("div");this.__selector.className = "selector";this.__saturation_field = document.createElement("div");this.__saturation_field.className = "saturation-field";this.__field_knob = document.createElement("div");this.__field_knob.className = "field-knob";this.__field_knob_border = "2px solid ";this.__hue_knob = document.createElement("div");this.__hue_knob.className = "hue-knob";this.__hue_field = document.createElement("div");this.__hue_field.className = "hue-field";this.__input = document.createElement("input");
	    this.__input.type = "text";this.__input_textShadow = "0 1px 1px ";a.bind(this.__input, "keydown", function (a) {
	      13 === a.keyCode && g.call(this);
	    });a.bind(this.__input, "blur", g);a.bind(this.__selector, "mousedown", function (b) {
	      a.addClass(this, "drag").bind(window, "mouseup", function (b) {
	        a.removeClass(t.__selector, "drag");
	      });
	    });var y = document.createElement("div");c.extend(this.__selector.style, { width: "122px", height: "102px", padding: "3px", backgroundColor: "#222", boxShadow: "0px 1px 3px rgba(0,0,0,0.3)" });c.extend(this.__field_knob.style, { position: "absolute", width: "12px", height: "12px", border: this.__field_knob_border + (.5 > this.__color.v ? "#fff" : "#000"), boxShadow: "0px 1px 3px rgba(0,0,0,0.5)", borderRadius: "12px", zIndex: 1 });c.extend(this.__hue_knob.style, { position: "absolute", width: "15px", height: "2px", borderRight: "4px solid #fff", zIndex: 1 });c.extend(this.__saturation_field.style, { width: "100px", height: "100px", border: "1px solid #555", marginRight: "3px", display: "inline-block", cursor: "pointer" });c.extend(y.style, { width: "100%", height: "100%",
	      background: "none" });b(y, "top", "rgba(0,0,0,0)", "#000");c.extend(this.__hue_field.style, { width: "15px", height: "100px", display: "inline-block", border: "1px solid #555", cursor: "ns-resize" });p(this.__hue_field);c.extend(this.__input.style, { outline: "none", textAlign: "center", color: "#fff", border: 0, fontWeight: "bold", textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)" });a.bind(this.__saturation_field, "mousedown", u);a.bind(this.__field_knob, "mousedown", u);a.bind(this.__hue_field, "mousedown", function (b) {
	      w(b);a.bind(window, "mousemove", w);a.bind(window, "mouseup", k);
	    });this.__saturation_field.appendChild(y);this.__selector.appendChild(this.__field_knob);this.__selector.appendChild(this.__saturation_field);this.__selector.appendChild(this.__hue_field);this.__hue_field.appendChild(this.__hue_knob);this.domElement.appendChild(this.__input);this.domElement.appendChild(this.__selector);this.updateDisplay();
	  };q.superclass = f;c.extend(q.prototype, f.prototype, { updateDisplay: function updateDisplay() {
	      var a = e(this.getValue());if (!1 !== a) {
	        var f = !1;
	        c.each(d.COMPONENTS, function (b) {
	          if (!c.isUndefined(a[b]) && !c.isUndefined(this.__color.__state[b]) && a[b] !== this.__color.__state[b]) return f = !0, {};
	        }, this);f && c.extend(this.__color.__state, a);
	      }c.extend(this.__temp.__state, this.__color.__state);this.__temp.a = 1;var l = .5 > this.__color.v || .5 < this.__color.s ? 255 : 0,
	          p = 255 - l;c.extend(this.__field_knob.style, { marginLeft: 100 * this.__color.s - 7 + "px", marginTop: 100 * (1 - this.__color.v) - 7 + "px", backgroundColor: this.__temp.toString(), border: this.__field_knob_border + "rgb(" + l + "," + l + "," + l + ")" });this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";this.__temp.s = 1;this.__temp.v = 1;b(this.__saturation_field, "left", "#fff", this.__temp.toString());c.extend(this.__input.style, { backgroundColor: this.__input.value = this.__color.toString(), color: "rgb(" + l + "," + l + "," + l + ")", textShadow: this.__input_textShadow + "rgba(" + p + "," + p + "," + p + ",.7)" });
	    } });var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];return q;
	}(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function (f, a, d, e) {
	  function c(a, b, c) {
	    Object.defineProperty(a, b, { get: function get() {
	        if ("RGB" === this.__state.space) return this.__state[b];p(this, b, c);return this.__state[b];
	      }, set: function set(a) {
	        "RGB" !== this.__state.space && (p(this, b, c), this.__state.space = "RGB");this.__state[b] = a;
	      } });
	  }function b(a, b) {
	    Object.defineProperty(a, b, { get: function get() {
	        if ("HSV" === this.__state.space) return this.__state[b];q(this);return this.__state[b];
	      }, set: function set(a) {
	        "HSV" !== this.__state.space && (q(this), this.__state.space = "HSV");this.__state[b] = a;
	      } });
	  }function p(b, c, d) {
	    if ("HEX" === b.__state.space) b.__state[c] = a.component_from_hex(b.__state.hex, d);else if ("HSV" === b.__state.space) e.extend(b.__state, a.hsv_to_rgb(b.__state.h, b.__state.s, b.__state.v));else throw "Corrupted color state";
	  }function q(b) {
	    var c = a.rgb_to_hsv(b.r, b.g, b.b);e.extend(b.__state, { s: c.s, v: c.v });e.isNaN(c.h) ? e.isUndefined(b.__state.h) && (b.__state.h = 0) : b.__state.h = c.h;
	  }var l = function l() {
	    this.__state = f.apply(this, arguments);if (!1 === this.__state) throw "Failed to interpret color arguments";this.__state.a = this.__state.a || 1;
	  };l.COMPONENTS = "r g b h s v hex a".split(" ");e.extend(l.prototype, { toString: function toString() {
	      return d(this);
	    }, toOriginal: function toOriginal() {
	      return this.__state.conversion.write(this);
	    } });c(l.prototype, "r", 2);c(l.prototype, "g", 1);c(l.prototype, "b", 0);b(l.prototype, "h");b(l.prototype, "s");b(l.prototype, "v");Object.defineProperty(l.prototype, "a", { get: function get() {
	      return this.__state.a;
	    }, set: function set(a) {
	      this.__state.a = a;
	    } });Object.defineProperty(l.prototype, "hex", { get: function get() {
	      "HEX" !== !this.__state.space && (this.__state.hex = a.rgb_to_hex(this.r, this.g, this.b));return this.__state.hex;
	    }, set: function set(a) {
	      this.__state.space = "HEX";this.__state.hex = a;
	    } });return l;
	}(dat.color.interpret, dat.color.math = function () {
	  var f;return { hsv_to_rgb: function hsv_to_rgb(a, d, e) {
	      var c = a / 60 - Math.floor(a / 60),
	          b = e * (1 - d),
	          f = e * (1 - c * d);d = e * (1 - (1 - c) * d);a = [[e, d, b], [f, e, b], [b, e, d], [b, f, e], [d, b, e], [e, b, f]][Math.floor(a / 60) % 6];return { r: 255 * a[0], g: 255 * a[1], b: 255 * a[2] };
	    }, rgb_to_hsv: function rgb_to_hsv(a, d, e) {
	      var c = Math.min(a, d, e),
	          b = Math.max(a, d, e),
	          c = b - c;if (0 == b) return { h: NaN, s: 0, v: 0 };
	      a = (a == b ? (d - e) / c : d == b ? 2 + (e - a) / c : 4 + (a - d) / c) / 6;0 > a && (a += 1);return { h: 360 * a, s: c / b, v: b / 255 };
	    }, rgb_to_hex: function rgb_to_hex(a, d, e) {
	      a = this.hex_with_component(0, 2, a);a = this.hex_with_component(a, 1, d);return a = this.hex_with_component(a, 0, e);
	    }, component_from_hex: function component_from_hex(a, d) {
	      return a >> 8 * d & 255;
	    }, hex_with_component: function hex_with_component(a, d, e) {
	      return e << (f = 8 * d) | a & ~(255 << f);
	    } };
	}(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function () {
	  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (f, a) {
	    window.setTimeout(f, 1E3 / 60);
	  };
	}(), dat.dom.CenteredDiv = function (f, a) {
	  var d = function d() {
	    this.backgroundElement = document.createElement("div");a.extend(this.backgroundElement.style, { backgroundColor: "rgba(0,0,0,0.8)", top: 0, left: 0, display: "none", zIndex: "1000", opacity: 0, WebkitTransition: "opacity 0.2s linear", transition: "opacity 0.2s linear" });f.makeFullscreen(this.backgroundElement);this.backgroundElement.style.position = "fixed";this.domElement = document.createElement("div");a.extend(this.domElement.style, { position: "fixed", display: "none", zIndex: "1001", opacity: 0, WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear", transition: "transform 0.2s ease-out, opacity 0.2s linear" });document.body.appendChild(this.backgroundElement);document.body.appendChild(this.domElement);var d = this;f.bind(this.backgroundElement, "click", function () {
	      d.hide();
	    });
	  };d.prototype.show = function () {
	    var d = this;this.backgroundElement.style.display = "block";this.domElement.style.display = "block";this.domElement.style.opacity = 0;this.domElement.style.webkitTransform = "scale(1.1)";this.layout();a.defer(function () {
	      d.backgroundElement.style.opacity = 1;d.domElement.style.opacity = 1;d.domElement.style.webkitTransform = "scale(1)";
	    });
	  };d.prototype.hide = function () {
	    var a = this,
	        c = function c() {
	      a.domElement.style.display = "none";a.backgroundElement.style.display = "none";f.unbind(a.domElement, "webkitTransitionEnd", c);f.unbind(a.domElement, "transitionend", c);f.unbind(a.domElement, "oTransitionEnd", c);
	    };f.bind(this.domElement, "webkitTransitionEnd", c);f.bind(this.domElement, "transitionend", c);f.bind(this.domElement, "oTransitionEnd", c);this.backgroundElement.style.opacity = 0;this.domElement.style.opacity = 0;this.domElement.style.webkitTransform = "scale(1.1)";
	  };d.prototype.layout = function () {
	    this.domElement.style.left = window.innerWidth / 2 - f.getWidth(this.domElement) / 2 + "px";this.domElement.style.top = window.innerHeight / 2 - f.getHeight(this.domElement) / 2 + "px";
	  };return d;
	}(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);

	exports.default = dat;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	// http://dev.housetrip.com/2014/09/15/decoupling-javascript-apps-using-pub-sub-pattern/

	var EventBus = {
		topics: {},

		on: function on(topic, listener) {
			// create the topic if not yet created
			if (!this.topics[topic]) this.topics[topic] = [];

			// add the listener
			this.topics[topic].push(listener);
		},

		trigger: function trigger(topic, data) {
			// return if the topic doesn't exist, or there are no listeners
			if (!this.topics[topic] || this.topics[topic].length < 1) return;

			// send the event to all listeners
			this.topics[topic].forEach(function (listener) {
				listener(data || {});
			});
		}
	};

	exports.default = EventBus;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	/**
	 * Manage UI
	 * --
	 * Semantic UI modules used:
	 *  - reset
	 *  - button
	 *  - modal
	 *  - sidebar
	 *  - icons
	 *  - message
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _pubsub = __webpack_require__(7);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _share = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ui = function () {
		function ui() {
			_classCallCheck(this, ui);

			this.events = _pubsub2.default;
			this.image = null;
			this.ownImage = true;
			this.shareURL = '';

			this.$imagePickerButton = (0, _jquery2.default)('#image-selector');
			this.$imageUploadButton = (0, _jquery2.default)('#browse-image');
			this.$getURLButton = (0, _jquery2.default)('#get-url');
			this.$generateButton = (0, _jquery2.default)('#generate');
			this.$facebookShareButton = (0, _jquery2.default)('.facebook.button');
			this.$twitterShareButton = (0, _jquery2.default)('.twitter.button');

			this.$fileInput = (0, _jquery2.default)('#file');

			this.$images = (0, _jquery2.default)('.sidebar.images img');
			this.$sidebar = (0, _jquery2.default)('.ui.sidebar');

			this.$modal = (0, _jquery2.default)('#generate-css');
			this.$urlDialog = (0, _jquery2.default)('#get-url-dialog');

			this.$gradient = (0, _jquery2.default)('.pusher');
			this.$content = (0, _jquery2.default)('.page-content');

			this.addEvents();
			this.addKeyboardEvents();
		}

		_createClass(ui, [{
			key: 'addEvents',
			value: function addEvents() {
				var _this = this;

				this.$imagePickerButton.on('click', function () {
					_this.$sidebar.sidebar('setting', 'transition', 'push').sidebar('toggle');
				});

				this.$generateButton.on('click', function () {
					_this.$modal.modal('show');
					_this.$modal.find('textarea').val('.myElement { \n\t/* Generated with http://gradient.quasi.ink */\n\tbackground-size: cover;\n\tbackground-image: ' + _this.$gradient.css('backgroundImage') + ';\n}');
				});

				this.$imageUploadButton.on('click', function (e) {
					_this.$fileInput.click();
				});

				this.$images.on('click', function (e) {
					_this.loadImage(e.target.src.replace('_thumb', ''));
					_this.$sidebar.sidebar('setting', 'transition', 'push').sidebar('toggle');
				});

				this.$fileInput.on('change', this.handleFileSelect.bind(this));

				this.$getURLButton.on('click', function (e) {
					_this.events.trigger('sharing');
					_this.showSharingDialog(_this.shareURL);
				});

				this.$facebookShareButton.on('click', function (e) {
					_this.events.trigger('sharing');
					_this.$facebookShareButton.attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + _this.shareURL);
				});

				this.$twitterShareButton.on('click', function (e) {
					_this.events.trigger('sharing');
					_this.$twitterShareButton.attr('href', 'https://twitter.com/intent/tweet?text=I just create a new background gradient: ' + _this.shareURL);
				});

				this.events.on('share-url', function (url) {
					_this.shareURL = url;
				});
			}
		}, {
			key: 'addKeyboardEvents',
			value: function addKeyboardEvents() {
				window.addEventListener('keydown', function (e) {
					if (e.keyCode == 27) {
						// ESC
						(0, _jquery2.default)('.dg.ac').fadeToggle();
						(0, _jquery2.default)('.hideable').fadeToggle();
					}
				});
			}
		}, {
			key: 'handleFileSelect',
			value: function handleFileSelect(evt) {
				var _this2 = this;

				var reader = new FileReader();

				reader.onload = function (e) {
					var dynImg = (0, _jquery2.default)('<img>', {
						src: e.target.result,
						css: { 'display': 'none' }
					}).on('load', function () {
						(0, _jquery2.default)(document.body).append(dynImg);
						_this2.events.trigger('load', dynImg[0]);
						_this2.image = dynImg[0];
						_this2.ownImage = false;
					});
				};
				reader.readAsDataURL(evt.target.files[0]);
			}
		}, {
			key: 'updateGradient',
			value: function updateGradient(imageData) {
				this.$modal.find('.bytes').html(imageData.length);
				this.$gradient.css({
					"backgroundImage": 'url(' + imageData + ')'
				});
			}
		}, {
			key: 'showSharingDialog',
			value: function showSharingDialog(url) {
				this.$urlDialog.modal('show');
				this.$urlDialog.find('input').val(url);

				if (this.ownImage) {
					this.$urlDialog.find('input').show();
					this.$urlDialog.find('.sorry').hide();
				} else {
					this.$urlDialog.find('input').hide();
					this.$urlDialog.find('.sorry').show();
				}
			}
		}, {
			key: 'loadFirstImage',
			value: function loadFirstImage() {
				this.loadImage(this.$images[0].src.replace('_thumb', ''));
			}
		}, {
			key: 'loadImage',
			value: function loadImage(src) {
				var _this3 = this;

				var img = (0, _jquery2.default)('<img>', { src: src }).on('load', function () {
					_this3.events.trigger('load', img[0]);
					_this3.image = img[0];
				});
				this.ownImage = true;
			}

			/**
	   * Loads image by filename root
	   * @param  {[string]} id [the name of the file without extension, it's always .png]
	   */

		}, {
			key: 'loadImageById',
			value: function loadImageById(id) {
				var item = this.$images.filter(function (i, el) {
					var img = el.src.split('/');
					var found = false;
					if (img[img.length - 1].replace('_thumb.png', '') == id) {
						found = el;
					}
					return found;
				});
				this.loadImage(item[0].src.replace('_thumb', ''));
			}
		}, {
			key: 'getImageId',
			value: function getImageId() {
				var img = this.image.src.split('/');
				return img[img.length - 1].replace('.png', '');
			}
		}, {
			key: 'invertText',
			value: function invertText(val) {
				if (val) {
					this.$content.addClass('invert');
				} else {
					this.$content.removeClass('invert');
				}
			}
		}]);

		return ui;
	}();

	exports.default = new ui();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.hashDetect = hashDetect;
	exports.getStateURL = getStateURL;

	/**
	 * Detect if user is using a shared URL
	 * --
	 * Valid hash structure:
	 * topX|topY|sampleArea|invert|image_preset
	 * 312|123|7,7|false|lights
	 */
	function hashDetect() {

		// Test if URL is really a shared URL
		if (location.href.indexOf('?s=') == -1) {
			return;
		}

		var hash = location.search.replace(/^.*?\=/, '').split('&')[0];

		if (hash === '') {
			return false;
		}

		try {
			var decoded = atob(hash);
		} catch (e) {
			console.log('ErR0r: The shared code is not valid');
			return;
		}

		var parts = decoded.split('|');

		return {
			topX: parseInt(parts[0]),
			topY: parseInt(parts[1]),
			sampleArea: parts[2],
			invertText: JSON.parse(parts[3]),
			image: parts[4]
		};
	}

	function getStateURL(state) {
		return 'http://' + document.location.host + '?s=' + encodeState(state);
	}

	/**
	 * Create a shareable string that encodes the state of the app
	 * Input data: 
	 *  - controller.params
	 *  - selected image ID
	 * @return {string} base64 encoded string
	 */
	function encodeState(state) {
		return btoa(state.topX + '|' + state.topY + '|' + state.sampleArea + '|' + state.invertText.toString() + '|' + state.image);
	}

	/**
	 * https://github.com/h5bp/mothereffinganimatedgif/blob/master/assets/js/share.js
	 * http://i.imgur.com.rsz.io/d60kpBw.jpg?width=800
	 */

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	/**
	 * Handles drawing on canvas and image base64 encoding
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _pubsub = __webpack_require__(7);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var draw = function () {
		function draw() {
			_classCallCheck(this, draw);

			this.canvas = document.querySelector('#slicer');
			this.ctx = this.canvas.getContext('2d');
			this.imageData = null;
		}

		_createClass(draw, [{
			key: 'render',
			value: function render(imageObj, params) {
				var areaArr = params.sampleArea.split(',');
				var sourceX = params.topX;
				var sourceY = params.topY;
				var sourceWidth = parseInt(areaArr[0]);
				var sourceHeight = parseInt(areaArr[1]);
				var destWidth = sourceWidth;
				var destHeight = sourceHeight;
				var destX = 0;
				var destY = 0;

				this.canvas.width = sourceWidth;
				this.canvas.height = sourceHeight;

				this.ctx.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
				this.imageData = this.canvas.toDataURL();
			}
		}]);

		return draw;
	}();

	exports.default = new draw();

/***/ }
/******/ ]);