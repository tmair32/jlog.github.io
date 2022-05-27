import { _ as I } from "./plugin-vue_export-helper.21dcd24c.js";
import {
  d as j,
  o as y,
  c as Q,
  a as Y,
  r as qe,
  b as be,
  F as ce,
  e as He,
  f as b,
  g as F,
  t as Ve,
  h as Je,
  n as We,
  _ as ze,
  i as Xe,
  w as Ze,
  p as Ke,
  j as Ye,
} from "./app.ec4ba29e.js";
const Ge = { key: 0, class: "skeleton" },
  et = j({
    props: { loading: { type: Boolean, default: !1 } },
    setup(t) {
      return (e, r) => (t.loading ? Y("", !0) : (y(), Q("div", Ge)));
    },
  });
var tt = I(et, [["__scopeId", "data-v-5b3a41c7"]]),
  te = { exports: {} },
  Re = function (e, r) {
    return function () {
      for (var n = new Array(arguments.length), s = 0; s < n.length; s++)
        n[s] = arguments[s];
      return e.apply(r, n);
    };
  },
  rt = Re,
  re = Object.prototype.toString,
  ne = (function (t) {
    return function (e) {
      var r = re.call(e);
      return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
    };
  })(Object.create(null));
function g(t) {
  return (
    (t = t.toLowerCase()),
    function (r) {
      return ne(r) === t;
    }
  );
}
function ae(t) {
  return Array.isArray(t);
}
function k(t) {
  return typeof t == "undefined";
}
function nt(t) {
  return (
    t !== null &&
    !k(t) &&
    t.constructor !== null &&
    !k(t.constructor) &&
    typeof t.constructor.isBuffer == "function" &&
    t.constructor.isBuffer(t)
  );
}
var Oe = g("ArrayBuffer");
function at(t) {
  var e;
  return (
    typeof ArrayBuffer != "undefined" && ArrayBuffer.isView
      ? (e = ArrayBuffer.isView(t))
      : (e = t && t.buffer && Oe(t.buffer)),
    e
  );
}
function st(t) {
  return typeof t == "string";
}
function it(t) {
  return typeof t == "number";
}
function ge(t) {
  return t !== null && typeof t == "object";
}
function L(t) {
  if (ne(t) !== "object") return !1;
  var e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype;
}
var ot = g("Date"),
  ut = g("File"),
  lt = g("Blob"),
  ft = g("FileList");
function se(t) {
  return re.call(t) === "[object Function]";
}
function ct(t) {
  return ge(t) && se(t.pipe);
}
function dt(t) {
  var e = "[object FormData]";
  return (
    t &&
    ((typeof FormData == "function" && t instanceof FormData) ||
      re.call(t) === e ||
      (se(t.toString) && t.toString() === e))
  );
}
var ht = g("URLSearchParams");
function pt(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function At() {
  return typeof navigator != "undefined" &&
    (navigator.product === "ReactNative" ||
      navigator.product === "NativeScript" ||
      navigator.product === "NS")
    ? !1
    : typeof window != "undefined" && typeof document != "undefined";
}
function ie(t, e) {
  if (!(t === null || typeof t == "undefined"))
    if ((typeof t != "object" && (t = [t]), ae(t)))
      for (var r = 0, a = t.length; r < a; r++) e.call(null, t[r], r, t);
    else
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && e.call(null, t[n], n, t);
}
function G() {
  var t = {};
  function e(n, s) {
    L(t[s]) && L(n)
      ? (t[s] = G(t[s], n))
      : L(n)
      ? (t[s] = G({}, n))
      : ae(n)
      ? (t[s] = n.slice())
      : (t[s] = n);
  }
  for (var r = 0, a = arguments.length; r < a; r++) ie(arguments[r], e);
  return t;
}
function vt(t, e, r) {
  return (
    ie(e, function (n, s) {
      r && typeof n == "function" ? (t[s] = rt(n, r)) : (t[s] = n);
    }),
    t
  );
}
function mt(t) {
  return t.charCodeAt(0) === 65279 && (t = t.slice(1)), t;
}
function _t(t, e, r, a) {
  (t.prototype = Object.create(e.prototype, a)),
    (t.prototype.constructor = t),
    r && Object.assign(t.prototype, r);
}
function Et(t, e, r) {
  var a,
    n,
    s,
    i = {};
  e = e || {};
  do {
    for (a = Object.getOwnPropertyNames(t), n = a.length; n-- > 0; )
      (s = a[n]), i[s] || ((e[s] = t[s]), (i[s] = !0));
    t = Object.getPrototypeOf(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}
function yt(t, e, r) {
  (t = String(t)),
    (r === void 0 || r > t.length) && (r = t.length),
    (r -= e.length);
  var a = t.indexOf(e, r);
  return a !== -1 && a === r;
}
function wt(t) {
  if (!t) return null;
  var e = t.length;
  if (k(e)) return null;
  for (var r = new Array(e); e-- > 0; ) r[e] = t[e];
  return r;
}
var Qt = (function (t) {
    return function (e) {
      return t && e instanceof t;
    };
  })(typeof Uint8Array != "undefined" && Object.getPrototypeOf(Uint8Array)),
  h = {
    isArray: ae,
    isArrayBuffer: Oe,
    isBuffer: nt,
    isFormData: dt,
    isArrayBufferView: at,
    isString: st,
    isNumber: it,
    isObject: ge,
    isPlainObject: L,
    isUndefined: k,
    isDate: ot,
    isFile: ut,
    isBlob: lt,
    isFunction: se,
    isStream: ct,
    isURLSearchParams: ht,
    isStandardBrowserEnv: At,
    forEach: ie,
    merge: G,
    extend: vt,
    trim: pt,
    stripBOM: mt,
    inherits: _t,
    toFlatObject: Et,
    kindOf: ne,
    kindOfTest: g,
    endsWith: yt,
    toArray: wt,
    isTypedArray: Qt,
    isFileList: ft,
  },
  x = h;
function de(t) {
  return encodeURIComponent(t)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
var Se = function (e, r, a) {
    if (!r) return e;
    var n;
    if (a) n = a(r);
    else if (x.isURLSearchParams(r)) n = r.toString();
    else {
      var s = [];
      x.forEach(r, function (l, c) {
        l === null ||
          typeof l == "undefined" ||
          (x.isArray(l) ? (c = c + "[]") : (l = [l]),
          x.forEach(l, function (f) {
            x.isDate(f)
              ? (f = f.toISOString())
              : x.isObject(f) && (f = JSON.stringify(f)),
              s.push(de(c) + "=" + de(f));
          }));
      }),
        (n = s.join("&"));
    }
    if (n) {
      var i = e.indexOf("#");
      i !== -1 && (e = e.slice(0, i)),
        (e += (e.indexOf("?") === -1 ? "?" : "&") + n);
    }
    return e;
  },
  bt = h;
function M() {
  this.handlers = [];
}
M.prototype.use = function (e, r, a) {
  return (
    this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: a ? a.synchronous : !1,
      runWhen: a ? a.runWhen : null,
    }),
    this.handlers.length - 1
  );
};
M.prototype.eject = function (e) {
  this.handlers[e] && (this.handlers[e] = null);
};
M.prototype.forEach = function (e) {
  bt.forEach(this.handlers, function (a) {
    a !== null && e(a);
  });
};
var Rt = M,
  Ot = h,
  gt = function (e, r) {
    Ot.forEach(e, function (n, s) {
      s !== r &&
        s.toUpperCase() === r.toUpperCase() &&
        ((e[r] = n), delete e[s]);
    });
  },
  xe = h;
function N(t, e, r, a, n) {
  Error.call(this),
    (this.message = t),
    (this.name = "AxiosError"),
    e && (this.code = e),
    r && (this.config = r),
    a && (this.request = a),
    n && (this.response = n);
}
xe.inherits(N, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
var Ce = N.prototype,
  Ne = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
].forEach(function (t) {
  Ne[t] = { value: t };
});
Object.defineProperties(N, Ne);
Object.defineProperty(Ce, "isAxiosError", { value: !0 });
N.from = function (t, e, r, a, n, s) {
  var i = Object.create(Ce);
  return (
    xe.toFlatObject(t, i, function (l) {
      return l !== Error.prototype;
    }),
    N.call(i, t.message, e, r, a, n),
    (i.name = t.name),
    s && Object.assign(i, s),
    i
  );
};
var P = N,
  $e = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  E = h;
function St(t, e) {
  e = e || new FormData();
  var r = [];
  function a(s) {
    return s === null
      ? ""
      : E.isDate(s)
      ? s.toISOString()
      : E.isArrayBuffer(s) || E.isTypedArray(s)
      ? typeof Blob == "function"
        ? new Blob([s])
        : Buffer.from(s)
      : s;
  }
  function n(s, i) {
    if (E.isPlainObject(s) || E.isArray(s)) {
      if (r.indexOf(s) !== -1)
        throw Error("Circular reference detected in " + i);
      r.push(s),
        E.forEach(s, function (l, c) {
          if (!E.isUndefined(l)) {
            var o = i ? i + "." + c : c,
              f;
            if (l && !i && typeof l == "object") {
              if (E.endsWith(c, "{}")) l = JSON.stringify(l);
              else if (E.endsWith(c, "[]") && (f = E.toArray(l))) {
                f.forEach(function (v) {
                  !E.isUndefined(v) && e.append(o, a(v));
                });
                return;
              }
            }
            n(l, o);
          }
        }),
        r.pop();
    } else e.append(i, a(s));
  }
  return n(t), e;
}
var Te = St,
  z = P,
  xt = function (e, r, a) {
    var n = a.config.validateStatus;
    !a.status || !n || n(a.status)
      ? e(a)
      : r(
          new z(
            "Request failed with status code " + a.status,
            [z.ERR_BAD_REQUEST, z.ERR_BAD_RESPONSE][
              Math.floor(a.status / 100) - 4
            ],
            a.config,
            a.request,
            a
          )
        );
  },
  D = h,
  Ct = D.isStandardBrowserEnv()
    ? (function () {
        return {
          write: function (r, a, n, s, i, u) {
            var l = [];
            l.push(r + "=" + encodeURIComponent(a)),
              D.isNumber(n) && l.push("expires=" + new Date(n).toGMTString()),
              D.isString(s) && l.push("path=" + s),
              D.isString(i) && l.push("domain=" + i),
              u === !0 && l.push("secure"),
              (document.cookie = l.join("; "));
          },
          read: function (r) {
            var a = document.cookie.match(
              new RegExp("(^|;\\s*)(" + r + ")=([^;]*)")
            );
            return a ? decodeURIComponent(a[3]) : null;
          },
          remove: function (r) {
            this.write(r, "", Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })(),
  Nt = function (e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  },
  $t = function (e, r) {
    return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e;
  },
  Tt = Nt,
  Pt = $t,
  Pe = function (e, r) {
    return e && !Tt(r) ? Pt(e, r) : r;
  },
  X = h,
  Bt = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ],
  Dt = function (e) {
    var r = {},
      a,
      n,
      s;
    return (
      e &&
        X.forEach(
          e.split(`
`),
          function (u) {
            if (
              ((s = u.indexOf(":")),
              (a = X.trim(u.substr(0, s)).toLowerCase()),
              (n = X.trim(u.substr(s + 1))),
              a)
            ) {
              if (r[a] && Bt.indexOf(a) >= 0) return;
              a === "set-cookie"
                ? (r[a] = (r[a] ? r[a] : []).concat([n]))
                : (r[a] = r[a] ? r[a] + ", " + n : n);
            }
          }
        ),
      r
    );
  },
  he = h,
  Lt = he.isStandardBrowserEnv()
    ? (function () {
        var e = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement("a"),
          a;
        function n(s) {
          var i = s;
          return (
            e && (r.setAttribute("href", i), (i = r.href)),
            r.setAttribute("href", i),
            {
              href: r.href,
              protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
              host: r.host,
              search: r.search ? r.search.replace(/^\?/, "") : "",
              hash: r.hash ? r.hash.replace(/^#/, "") : "",
              hostname: r.hostname,
              port: r.port,
              pathname:
                r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname,
            }
          );
        }
        return (
          (a = n(window.location.href)),
          function (i) {
            var u = he.isString(i) ? n(i) : i;
            return u.protocol === a.protocol && u.host === a.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })(),
  ee = P,
  Ut = h;
function Be(t) {
  ee.call(this, t == null ? "canceled" : t, ee.ERR_CANCELED),
    (this.name = "CanceledError");
}
Ut.inherits(Be, ee, { __CANCEL__: !0 });
var q = Be,
  Ft = function (e) {
    var r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (r && r[1]) || "";
  },
  B = h,
  kt = xt,
  It = Ct,
  jt = Se,
  Mt = Pe,
  qt = Dt,
  Ht = Lt,
  Vt = $e,
  w = P,
  Jt = q,
  Wt = Ft,
  pe = function (e) {
    return new Promise(function (a, n) {
      var s = e.data,
        i = e.headers,
        u = e.responseType,
        l;
      function c() {
        e.cancelToken && e.cancelToken.unsubscribe(l),
          e.signal && e.signal.removeEventListener("abort", l);
      }
      B.isFormData(s) && B.isStandardBrowserEnv() && delete i["Content-Type"];
      var o = new XMLHttpRequest();
      if (e.auth) {
        var f = e.auth.username || "",
          v = e.auth.password
            ? unescape(encodeURIComponent(e.auth.password))
            : "";
        i.Authorization = "Basic " + btoa(f + ":" + v);
      }
      var p = Mt(e.baseURL, e.url);
      o.open(e.method.toUpperCase(), jt(p, e.params, e.paramsSerializer), !0),
        (o.timeout = e.timeout);
      function le() {
        if (!!o) {
          var _ =
              "getAllResponseHeaders" in o
                ? qt(o.getAllResponseHeaders())
                : null,
            S =
              !u || u === "text" || u === "json" ? o.responseText : o.response,
            O = {
              data: S,
              status: o.status,
              statusText: o.statusText,
              headers: _,
              config: e,
              request: o,
            };
          kt(
            function (W) {
              a(W), c();
            },
            function (W) {
              n(W), c();
            },
            O
          ),
            (o = null);
        }
      }
      if (
        ("onloadend" in o
          ? (o.onloadend = le)
          : (o.onreadystatechange = function () {
              !o ||
                o.readyState !== 4 ||
                (o.status === 0 &&
                  !(o.responseURL && o.responseURL.indexOf("file:") === 0)) ||
                setTimeout(le);
            }),
        (o.onabort = function () {
          !o || (n(new w("Request aborted", w.ECONNABORTED, e, o)), (o = null));
        }),
        (o.onerror = function () {
          n(new w("Network Error", w.ERR_NETWORK, e, o, o)), (o = null);
        }),
        (o.ontimeout = function () {
          var S = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded",
            O = e.transitional || Vt;
          e.timeoutErrorMessage && (S = e.timeoutErrorMessage),
            n(
              new w(
                S,
                O.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
                e,
                o
              )
            ),
            (o = null);
        }),
        B.isStandardBrowserEnv())
      ) {
        var fe =
          (e.withCredentials || Ht(p)) && e.xsrfCookieName
            ? It.read(e.xsrfCookieName)
            : void 0;
        fe && (i[e.xsrfHeaderName] = fe);
      }
      "setRequestHeader" in o &&
        B.forEach(i, function (S, O) {
          typeof s == "undefined" && O.toLowerCase() === "content-type"
            ? delete i[O]
            : o.setRequestHeader(O, S);
        }),
        B.isUndefined(e.withCredentials) ||
          (o.withCredentials = !!e.withCredentials),
        u && u !== "json" && (o.responseType = e.responseType),
        typeof e.onDownloadProgress == "function" &&
          o.addEventListener("progress", e.onDownloadProgress),
        typeof e.onUploadProgress == "function" &&
          o.upload &&
          o.upload.addEventListener("progress", e.onUploadProgress),
        (e.cancelToken || e.signal) &&
          ((l = function (_) {
            !o ||
              (n(!_ || (_ && _.type) ? new Jt() : _), o.abort(), (o = null));
          }),
          e.cancelToken && e.cancelToken.subscribe(l),
          e.signal &&
            (e.signal.aborted ? l() : e.signal.addEventListener("abort", l))),
        s || (s = null);
      var J = Wt(p);
      if (J && ["http", "https", "file"].indexOf(J) === -1) {
        n(new w("Unsupported protocol " + J + ":", w.ERR_BAD_REQUEST, e));
        return;
      }
      o.send(s);
    });
  },
  zt = null,
  d = h,
  Ae = gt,
  ve = P,
  Xt = $e,
  Zt = Te,
  Kt = { "Content-Type": "application/x-www-form-urlencoded" };
function me(t, e) {
  !d.isUndefined(t) &&
    d.isUndefined(t["Content-Type"]) &&
    (t["Content-Type"] = e);
}
function Yt() {
  var t;
  return (
    (typeof XMLHttpRequest != "undefined" ||
      (typeof process != "undefined" &&
        Object.prototype.toString.call(process) === "[object process]")) &&
      (t = pe),
    t
  );
}
function Gt(t, e, r) {
  if (d.isString(t))
    try {
      return (e || JSON.parse)(t), d.trim(t);
    } catch (a) {
      if (a.name !== "SyntaxError") throw a;
    }
  return (r || JSON.stringify)(t);
}
var H = {
  transitional: Xt,
  adapter: Yt(),
  transformRequest: [
    function (e, r) {
      if (
        (Ae(r, "Accept"),
        Ae(r, "Content-Type"),
        d.isFormData(e) ||
          d.isArrayBuffer(e) ||
          d.isBuffer(e) ||
          d.isStream(e) ||
          d.isFile(e) ||
          d.isBlob(e))
      )
        return e;
      if (d.isArrayBufferView(e)) return e.buffer;
      if (d.isURLSearchParams(e))
        return (
          me(r, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()
        );
      var a = d.isObject(e),
        n = r && r["Content-Type"],
        s;
      if ((s = d.isFileList(e)) || (a && n === "multipart/form-data")) {
        var i = this.env && this.env.FormData;
        return Zt(s ? { "files[]": e } : e, i && new i());
      } else if (a || n === "application/json")
        return me(r, "application/json"), Gt(e);
      return e;
    },
  ],
  transformResponse: [
    function (e) {
      var r = this.transitional || H.transitional,
        a = r && r.silentJSONParsing,
        n = r && r.forcedJSONParsing,
        s = !a && this.responseType === "json";
      if (s || (n && d.isString(e) && e.length))
        try {
          return JSON.parse(e);
        } catch (i) {
          if (s)
            throw i.name === "SyntaxError"
              ? ve.from(i, ve.ERR_BAD_RESPONSE, this, null, this.response)
              : i;
        }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: zt },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
d.forEach(["delete", "get", "head"], function (e) {
  H.headers[e] = {};
});
d.forEach(["post", "put", "patch"], function (e) {
  H.headers[e] = d.merge(Kt);
});
var oe = H,
  er = h,
  tr = oe,
  rr = function (e, r, a) {
    var n = this || tr;
    return (
      er.forEach(a, function (i) {
        e = i.call(n, e, r);
      }),
      e
    );
  },
  De = function (e) {
    return !!(e && e.__CANCEL__);
  },
  _e = h,
  Z = rr,
  nr = De,
  ar = oe,
  sr = q;
function K(t) {
  if (
    (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
  )
    throw new sr();
}
var ir = function (e) {
    K(e),
      (e.headers = e.headers || {}),
      (e.data = Z.call(e, e.data, e.headers, e.transformRequest)),
      (e.headers = _e.merge(
        e.headers.common || {},
        e.headers[e.method] || {},
        e.headers
      )),
      _e.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function (n) {
          delete e.headers[n];
        }
      );
    var r = e.adapter || ar.adapter;
    return r(e).then(
      function (n) {
        return (
          K(e), (n.data = Z.call(e, n.data, n.headers, e.transformResponse)), n
        );
      },
      function (n) {
        return (
          nr(n) ||
            (K(e),
            n &&
              n.response &&
              (n.response.data = Z.call(
                e,
                n.response.data,
                n.response.headers,
                e.transformResponse
              ))),
          Promise.reject(n)
        );
      }
    );
  },
  m = h,
  Le = function (e, r) {
    r = r || {};
    var a = {};
    function n(o, f) {
      return m.isPlainObject(o) && m.isPlainObject(f)
        ? m.merge(o, f)
        : m.isPlainObject(f)
        ? m.merge({}, f)
        : m.isArray(f)
        ? f.slice()
        : f;
    }
    function s(o) {
      if (m.isUndefined(r[o])) {
        if (!m.isUndefined(e[o])) return n(void 0, e[o]);
      } else return n(e[o], r[o]);
    }
    function i(o) {
      if (!m.isUndefined(r[o])) return n(void 0, r[o]);
    }
    function u(o) {
      if (m.isUndefined(r[o])) {
        if (!m.isUndefined(e[o])) return n(void 0, e[o]);
      } else return n(void 0, r[o]);
    }
    function l(o) {
      if (o in r) return n(e[o], r[o]);
      if (o in e) return n(void 0, e[o]);
    }
    var c = {
      url: i,
      method: i,
      data: i,
      baseURL: u,
      transformRequest: u,
      transformResponse: u,
      paramsSerializer: u,
      timeout: u,
      timeoutMessage: u,
      withCredentials: u,
      adapter: u,
      responseType: u,
      xsrfCookieName: u,
      xsrfHeaderName: u,
      onUploadProgress: u,
      onDownloadProgress: u,
      decompress: u,
      maxContentLength: u,
      maxBodyLength: u,
      beforeRedirect: u,
      transport: u,
      httpAgent: u,
      httpsAgent: u,
      cancelToken: u,
      socketPath: u,
      responseEncoding: u,
      validateStatus: l,
    };
    return (
      m.forEach(Object.keys(e).concat(Object.keys(r)), function (f) {
        var v = c[f] || s,
          p = v(f);
        (m.isUndefined(p) && v !== l) || (a[f] = p);
      }),
      a
    );
  },
  Ue = { version: "0.27.2" },
  or = Ue.version,
  R = P,
  ue = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  function (t, e) {
    ue[t] = function (a) {
      return typeof a === t || "a" + (e < 1 ? "n " : " ") + t;
    };
  }
);
var Ee = {};
ue.transitional = function (e, r, a) {
  function n(s, i) {
    return (
      "[Axios v" +
      or +
      "] Transitional option '" +
      s +
      "'" +
      i +
      (a ? ". " + a : "")
    );
  }
  return function (s, i, u) {
    if (e === !1)
      throw new R(
        n(i, " has been removed" + (r ? " in " + r : "")),
        R.ERR_DEPRECATED
      );
    return (
      r &&
        !Ee[i] &&
        ((Ee[i] = !0),
        console.warn(
          n(
            i,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future"
          )
        )),
      e ? e(s, i, u) : !0
    );
  };
};
function ur(t, e, r) {
  if (typeof t != "object")
    throw new R("options must be an object", R.ERR_BAD_OPTION_VALUE);
  for (var a = Object.keys(t), n = a.length; n-- > 0; ) {
    var s = a[n],
      i = e[s];
    if (i) {
      var u = t[s],
        l = u === void 0 || i(u, s, t);
      if (l !== !0)
        throw new R("option " + s + " must be " + l, R.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new R("Unknown option " + s, R.ERR_BAD_OPTION);
  }
}
var lr = { assertOptions: ur, validators: ue },
  Fe = h,
  fr = Se,
  ye = Rt,
  we = ir,
  V = Le,
  cr = Pe,
  ke = lr,
  C = ke.validators;
function $(t) {
  (this.defaults = t),
    (this.interceptors = { request: new ye(), response: new ye() });
}
$.prototype.request = function (e, r) {
  typeof e == "string" ? ((r = r || {}), (r.url = e)) : (r = e || {}),
    (r = V(this.defaults, r)),
    r.method
      ? (r.method = r.method.toLowerCase())
      : this.defaults.method
      ? (r.method = this.defaults.method.toLowerCase())
      : (r.method = "get");
  var a = r.transitional;
  a !== void 0 &&
    ke.assertOptions(
      a,
      {
        silentJSONParsing: C.transitional(C.boolean),
        forcedJSONParsing: C.transitional(C.boolean),
        clarifyTimeoutError: C.transitional(C.boolean),
      },
      !1
    );
  var n = [],
    s = !0;
  this.interceptors.request.forEach(function (p) {
    (typeof p.runWhen == "function" && p.runWhen(r) === !1) ||
      ((s = s && p.synchronous), n.unshift(p.fulfilled, p.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function (p) {
    i.push(p.fulfilled, p.rejected);
  });
  var u;
  if (!s) {
    var l = [we, void 0];
    for (
      Array.prototype.unshift.apply(l, n),
        l = l.concat(i),
        u = Promise.resolve(r);
      l.length;

    )
      u = u.then(l.shift(), l.shift());
    return u;
  }
  for (var c = r; n.length; ) {
    var o = n.shift(),
      f = n.shift();
    try {
      c = o(c);
    } catch (v) {
      f(v);
      break;
    }
  }
  try {
    u = we(c);
  } catch (v) {
    return Promise.reject(v);
  }
  for (; i.length; ) u = u.then(i.shift(), i.shift());
  return u;
};
$.prototype.getUri = function (e) {
  e = V(this.defaults, e);
  var r = cr(e.baseURL, e.url);
  return fr(r, e.params, e.paramsSerializer);
};
Fe.forEach(["delete", "get", "head", "options"], function (e) {
  $.prototype[e] = function (r, a) {
    return this.request(
      V(a || {}, { method: e, url: r, data: (a || {}).data })
    );
  };
});
Fe.forEach(["post", "put", "patch"], function (e) {
  function r(a) {
    return function (s, i, u) {
      return this.request(
        V(u || {}, {
          method: e,
          headers: a ? { "Content-Type": "multipart/form-data" } : {},
          url: s,
          data: i,
        })
      );
    };
  }
  ($.prototype[e] = r()), ($.prototype[e + "Form"] = r(!0));
});
var dr = $,
  hr = q;
function T(t) {
  if (typeof t != "function")
    throw new TypeError("executor must be a function.");
  var e;
  this.promise = new Promise(function (n) {
    e = n;
  });
  var r = this;
  this.promise.then(function (a) {
    if (!!r._listeners) {
      var n,
        s = r._listeners.length;
      for (n = 0; n < s; n++) r._listeners[n](a);
      r._listeners = null;
    }
  }),
    (this.promise.then = function (a) {
      var n,
        s = new Promise(function (i) {
          r.subscribe(i), (n = i);
        }).then(a);
      return (
        (s.cancel = function () {
          r.unsubscribe(n);
        }),
        s
      );
    }),
    t(function (n) {
      r.reason || ((r.reason = new hr(n)), e(r.reason));
    });
}
T.prototype.throwIfRequested = function () {
  if (this.reason) throw this.reason;
};
T.prototype.subscribe = function (e) {
  if (this.reason) {
    e(this.reason);
    return;
  }
  this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
};
T.prototype.unsubscribe = function (e) {
  if (!!this._listeners) {
    var r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
};
T.source = function () {
  var e,
    r = new T(function (n) {
      e = n;
    });
  return { token: r, cancel: e };
};
var pr = T,
  Ar = function (e) {
    return function (a) {
      return e.apply(null, a);
    };
  },
  vr = h,
  mr = function (e) {
    return vr.isObject(e) && e.isAxiosError === !0;
  },
  Qe = h,
  _r = Re,
  U = dr,
  Er = Le,
  yr = oe;
function Ie(t) {
  var e = new U(t),
    r = _r(U.prototype.request, e);
  return (
    Qe.extend(r, U.prototype, e),
    Qe.extend(r, e),
    (r.create = function (n) {
      return Ie(Er(t, n));
    }),
    r
  );
}
var A = Ie(yr);
A.Axios = U;
A.CanceledError = q;
A.CancelToken = pr;
A.isCancel = De;
A.VERSION = Ue.version;
A.toFormData = Te;
A.AxiosError = P;
A.Cancel = A.CanceledError;
A.all = function (e) {
  return Promise.all(e);
};
A.spread = Ar;
A.isAxiosError = mr;
te.exports = A;
te.exports.default = A;
var wr = te.exports;
const Qr = { class: "section" },
  br = { class: "section__button" },
  Rr = ["src"],
  Or = { key: 0 },
  gr = j({
    setup(t) {
      const e = qe([]);
      for (let r = 0; r < 6; r++) e.value.push({ url: "", loading: !1 });
      return (
        be(async () => {
          var r;
          for (let a = 0; a < 6; a++)
            try {
              const n = await wr.get(
                  "https://api.thecatapi.com/v1/images/search"
                ),
                s = (r = n == null ? void 0 : n.data[0]) != null ? r : void 0;
              s && ((e.value[a].url = s.url), (e.value[a].loading = !0));
            } catch (n) {
              console.error(n);
            }
        }),
        (r, a) => {
          const n = tt;
          return (
            y(),
            Q("div", Qr, [
              (y(),
              Q(
                ce,
                null,
                He(6, (s, i) => {
                  var u, l, c;
                  return (
                    y(),
                    Q(
                      ce,
                      { key: `catBox-${i}` },
                      [
                        b("div", br, [
                          F(
                            n,
                            {
                              loading:
                                (u = e.value[i]) == null ? void 0 : u.loading,
                            },
                            null,
                            8,
                            ["loading"]
                          ),
                          (l = e.value[i]) != null && l.loading
                            ? (y(),
                              Q(
                                "img",
                                {
                                  key: 0,
                                  src:
                                    (c = e.value[i]) == null ? void 0 : c.url,
                                },
                                null,
                                8,
                                Rr
                              ))
                            : Y("", !0),
                        ]),
                        i === 0 ? (y(), Q("hr", Or)) : Y("", !0),
                      ],
                      64
                    )
                  );
                }),
                64
              )),
            ])
          );
        }
      );
    },
  });
var Sr = I(gr, [["__scopeId", "data-v-606218ad"]]);
const xr = ["viewBox", "aria-labelledby", "fill", "stroke", "width", "height"],
  Cr = ["id"],
  Nr = j({
    props: {
      viewBox: { type: String, default: "0 0 20 20" },
      svgName: { type: String, default: null },
      svgClass: { type: String, default: "" },
      fill: { type: String, default: "none" },
      stroke: { type: String, default: "currentColor" },
      width: { type: [String, Number], default: 0 },
      height: { type: [String, Number], default: 0 },
    },
    setup(t) {
      return (e, r) => (
        y(),
        Q(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            class: We(t.svgClass),
            viewBox: t.viewBox,
            "aria-labelledby": t.svgName,
            fill: t.fill,
            stroke: t.stroke,
            width: t.width,
            height: t.height,
          },
          [
            b("title", { id: t.svgName }, Ve(t.svgName), 9, Cr),
            Je(e.$slots, "svgContent"),
          ],
          10,
          xr
        )
      );
    },
  }),
  $r = b(
    "path",
    {
      d: "M 26.02 17.04 L 26.04 17.04 A 1.095 1.095 0 0 1 25.678 17.317 A 1.486 1.486 0 0 1 25.43 17.41 A 2.973 2.973 0 0 1 24.763 17.516 A 3.412 3.412 0 0 1 24.6 17.52 Q 24.34 17.52 24.09 17.48 Q 23.84 17.44 23.6 17.38 A 1.216 1.216 0 0 1 23.307 17.256 A 0.901 0.901 0 0 1 22.99 16.94 A 1.363 1.363 0 0 1 22.833 16.558 A 1.201 1.201 0 0 1 22.8 16.28 A 0.897 0.897 0 0 1 22.815 16.112 Q 22.833 16.017 22.874 15.942 A 0.453 0.453 0 0 1 22.94 15.85 A 0.471 0.471 0 0 1 23.1 15.736 A 0.454 0.454 0 0 1 23.28 15.7 A 0.627 0.627 0 0 1 23.343 15.703 A 0.491 0.491 0 0 1 23.39 15.71 A 0.786 0.786 0 0 1 23.443 15.723 A 1.083 1.083 0 0 1 23.499 15.74 A 0.318 0.318 0 0 1 23.578 15.79 Q 23.69 15.885 23.83 16.12 Q 24.008 16.42 24.194 16.526 A 0.517 0.517 0 0 0 24.22 16.54 A 0.327 0.327 0 0 0 24.266 16.551 Q 24.29 16.556 24.319 16.558 A 0.817 0.817 0 0 0 24.38 16.56 A 0.941 0.941 0 0 0 24.665 16.512 Q 24.789 16.473 24.922 16.401 A 2.329 2.329 0 0 0 25.15 16.26 A 5.165 5.165 0 0 0 25.421 16.059 Q 25.656 15.871 25.8 15.7 A 10.134 10.134 0 0 0 26.539 14.755 A 7.452 7.452 0 0 0 27.12 13.76 A 13.832 13.832 0 0 0 27.621 12.584 A 11.473 11.473 0 0 0 27.85 11.9 Q 28.12 11 28.38 10.22 A 5.948 5.948 0 0 1 27.52 10.873 A 5.499 5.499 0 0 1 27.46 10.91 Q 26.98 11.2 26.31 11.38 A 7.679 7.679 0 0 1 25.801 11.497 Q 25.269 11.601 24.56 11.68 A 2.057 2.057 0 0 1 24.409 11.696 A 1.606 1.606 0 0 1 24.3 11.7 L 24.06 11.7 A 3.957 3.957 0 0 1 23.349 11.64 Q 22.937 11.564 22.602 11.396 A 2.36 2.36 0 0 1 22.48 11.33 A 2.714 2.714 0 0 1 21.883 10.87 A 2.301 2.301 0 0 1 21.52 10.38 Q 21.2 9.8 21.2 9.14 A 2.846 2.846 0 0 1 21.796 7.398 A 3.542 3.542 0 0 1 21.84 7.34 A 7.977 7.977 0 0 1 22.211 6.907 Q 22.408 6.691 22.641 6.463 A 13.977 13.977 0 0 1 22.8 6.31 A 7.913 7.913 0 0 1 23.643 5.618 A 9.602 9.602 0 0 1 24.15 5.28 A 7.248 7.248 0 0 1 25.406 4.661 A 8.418 8.418 0 0 1 25.87 4.5 A 5.797 5.797 0 0 1 27.353 4.243 Q 27.507 4.235 27.663 4.235 A 7.065 7.065 0 0 1 27.92 4.24 A 2.615 2.615 0 0 1 28.203 4.254 Q 28.489 4.286 28.663 4.386 A 0.633 0.633 0 0 1 28.73 4.43 A 0.95 0.95 0 0 1 28.922 4.622 A 0.777 0.777 0 0 1 29.05 4.89 Q 29.12 5.16 29.12 5.44 A 0.613 0.613 0 0 1 29.104 5.55 Q 29.056 5.737 28.885 5.74 A 0.317 0.317 0 0 1 28.88 5.74 A 0.591 0.591 0 0 1 28.747 5.724 Q 28.619 5.694 28.462 5.612 A 1.987 1.987 0 0 1 28.44 5.6 Q 28.18 5.46 27.86 5.34 A 5.566 5.566 0 0 0 27.477 5.327 A 4.947 4.947 0 0 0 25.67 5.66 A 7.632 7.632 0 0 0 24.394 6.292 A 6.593 6.593 0 0 0 23.85 6.67 A 8.116 8.116 0 0 0 23.266 7.164 Q 22.989 7.423 22.777 7.679 A 4.31 4.31 0 0 0 22.62 7.88 A 1.801 1.801 0 0 0 22.261 8.931 A 2.231 2.231 0 0 0 22.26 9 A 1.868 1.868 0 0 0 22.465 9.845 A 2.217 2.217 0 0 0 22.51 9.93 A 1.704 1.704 0 0 0 23.037 10.504 A 2.197 2.197 0 0 0 23.28 10.65 A 1.896 1.896 0 0 0 23.806 10.827 Q 24.136 10.889 24.536 10.863 A 3.898 3.898 0 0 0 24.58 10.86 A 6.916 6.916 0 0 0 25.307 10.763 Q 25.807 10.667 26.2 10.5 A 4.763 4.763 0 0 0 27.032 10.049 A 4.172 4.172 0 0 0 27.36 9.8 Q 27.86 9.38 28.28 8.88 A 20.18 20.18 0 0 1 29.12 7.943 A 22.071 22.071 0 0 1 29.18 7.88 Q 29.3 7.76 29.48 7.76 A 0.399 0.399 0 0 1 29.695 7.824 A 0.569 0.569 0 0 1 29.78 7.89 A 0.422 0.422 0 0 1 29.902 8.102 Q 29.92 8.174 29.92 8.26 L 29.92 8.39 A 0.282 0.282 0 0 1 29.909 8.465 Q 29.899 8.501 29.88 8.54 Q 29.773 8.923 29.607 9.511 A 1186.242 1186.242 0 0 1 29.5 9.89 Q 29.26 10.74 28.95 11.73 Q 28.64 12.72 28.24 13.64 Q 27.82 14.58 27.23 15.48 Q 26.64 16.38 26.02 17.04 Z M 15.78 11.48 Q 15.66 11.48 15.54 11.47 Q 15.42 11.46 15.3 11.44 A 2.158 2.158 0 0 1 15.287 11.438 Q 14.857 11.383 14.529 11.164 A 1.771 1.771 0 0 1 14.03 10.65 Q 13.58 9.96 13.58 9.1 Q 13.58 8.54 13.8 7.92 A 3.449 3.449 0 0 1 14.477 6.819 A 3.961 3.961 0 0 1 14.54 6.75 Q 15.04 6.22 15.7 5.9 Q 16.36 5.58 17.04 5.58 A 2.573 2.573 0 0 1 17.508 5.621 A 2.261 2.261 0 0 1 17.68 5.66 A 0.705 0.705 0 0 1 17.809 5.705 Q 18 5.794 18 5.98 Q 18 6.113 17.882 6.24 A 0.75 0.75 0 0 1 17.83 6.29 A 0.426 0.426 0 0 1 17.571 6.396 Q 17.483 6.402 17.38 6.38 A 0.473 0.473 0 0 0 17.33 6.371 Q 17.252 6.36 17.12 6.36 A 1.941 1.941 0 0 0 16.489 6.469 A 2.537 2.537 0 0 0 16.14 6.62 Q 15.64 6.88 15.24 7.31 A 2.724 2.724 0 0 0 14.749 8.037 A 2.542 2.542 0 0 0 14.66 8.26 A 2.426 2.426 0 0 0 14.521 8.985 A 2.287 2.287 0 0 0 14.52 9.06 A 2.213 2.213 0 0 0 14.579 9.581 A 1.695 1.695 0 0 0 14.81 10.12 A 1.365 1.365 0 0 0 14.978 10.33 Q 15.086 10.44 15.205 10.497 A 0.626 0.626 0 0 0 15.48 10.56 A 1.041 1.041 0 0 0 15.601 10.577 A 0.864 0.864 0 0 0 15.67 10.58 L 15.84 10.58 A 3.177 3.177 0 0 0 17.378 10.178 A 3.827 3.827 0 0 0 17.53 10.09 A 5.614 5.614 0 0 0 18.127 9.677 Q 18.519 9.364 18.78 9.02 A 3.413 3.413 0 0 0 18.924 8.777 Q 18.988 8.657 19.032 8.547 A 1.596 1.596 0 0 0 19.08 8.41 A 2.574 2.574 0 0 0 19.122 8.25 Q 19.141 8.167 19.151 8.094 A 1.044 1.044 0 0 0 19.16 7.96 Q 19.16 7.56 18.92 7.42 Q 18.68 7.28 18.48 7.3 A 15.452 15.452 0 0 0 17.898 7.384 A 14.222 14.222 0 0 0 17.86 7.39 A 2.541 2.541 0 0 0 17.613 7.443 Q 17.482 7.479 17.371 7.526 A 1.52 1.52 0 0 0 17.34 7.54 A 1.361 1.361 0 0 1 17.284 7.558 Q 17.228 7.574 17.189 7.578 A 0.247 0.247 0 0 1 17.16 7.58 Q 16.96 7.58 16.83 7.42 A 0.619 0.619 0 0 1 16.741 7.276 A 0.489 0.489 0 0 1 16.7 7.08 A 0.517 0.517 0 0 1 16.726 6.911 Q 16.788 6.731 17 6.66 A 4.068 4.068 0 0 1 17.264 6.576 Q 17.401 6.538 17.555 6.503 A 7.131 7.131 0 0 1 17.66 6.48 Q 18.04 6.4 18.44 6.36 Q 18.52 6.34 18.58 6.34 L 18.72 6.34 A 1.94 1.94 0 0 1 19.177 6.391 A 1.3 1.3 0 0 1 19.84 6.77 Q 20.24 7.2 20.24 7.82 A 1.857 1.857 0 0 1 20.19 8.238 Q 20.148 8.42 20.07 8.614 A 3.103 3.103 0 0 1 20.06 8.64 Q 19.88 9.08 19.48 9.48 Q 19.12 9.94 18.56 10.4 A 5.433 5.433 0 0 1 17.344 11.151 A 6.024 6.024 0 0 1 17.3 11.17 Q 16.6 11.48 15.78 11.48 Z M 1.555 14.531 A 2.478 2.478 0 0 0 1.92 14.56 A 1.452 1.452 0 0 0 2.471 14.454 A 1.675 1.675 0 0 0 2.94 14.16 A 9.29 9.29 0 0 0 3.329 13.803 A 10.18 10.18 0 0 0 4.81 11.97 Q 5.62 10.7 6.21 9.29 Q 6.8 7.88 7.23 6.55 Q 7.472 5.802 7.666 5.146 A 40.304 40.304 0 0 0 7.94 4.18 A 50.25 50.25 0 0 1 8.066 3.721 Q 8.198 3.248 8.304 2.913 A 11.199 11.199 0 0 1 8.4 2.62 A 0.635 0.635 0 0 0 8.42 2.548 Q 8.472 2.295 8.27 2.12 A 0.948 0.948 0 0 0 8.142 2.026 A 0.685 0.685 0 0 0 7.78 1.92 A 0.633 0.633 0 0 0 7.659 1.931 Q 7.515 1.959 7.429 2.059 A 0.47 0.47 0 0 0 7.34 2.22 A 1.051 1.051 0 0 1 7.264 2.405 A 1.315 1.315 0 0 1 7.13 2.61 A 1.241 1.241 0 0 0 7.02 2.776 A 1.473 1.473 0 0 0 6.9 3.06 Q 6.82 3.36 6.71 3.9 Q 6.6 4.44 6.48 5 A 31.037 31.037 0 0 1 6.407 5.333 Q 6.371 5.49 6.338 5.63 A 14.903 14.903 0 0 1 6.26 5.94 Q 6.148 6.403 5.992 6.963 A 51.813 51.813 0 0 1 5.79 7.67 A 18.267 18.267 0 0 1 5.636 8.168 A 20.804 20.804 0 0 1 5.07 9.7 Q 4.64 10.74 4.05 11.69 A 7.665 7.665 0 0 1 3.812 12.05 A 6.572 6.572 0 0 1 2.68 13.3 A 8.796 8.796 0 0 1 2.58 13.39 Q 2.498 13.462 2.425 13.523 A 4.471 4.471 0 0 1 2.29 13.63 Q 2.12 13.76 1.9 13.76 A 0.545 0.545 0 0 1 1.838 13.756 Q 1.788 13.751 1.732 13.736 A 1.144 1.144 0 0 1 1.62 13.7 A 0.695 0.695 0 0 1 1.506 13.64 Q 1.329 13.526 1.07 13.26 A 2.356 2.356 0 0 1 0.826 12.964 A 2.732 2.732 0 0 1 0.52 12.38 A 0.932 0.932 0 0 0 0.515 12.364 Q 0.436 12.123 0.284 12.12 A 0.196 0.196 0 0 0 0.28 12.12 Q 0.201 12.12 0.129 12.237 A 0.75 0.75 0 0 0 0.09 12.31 A 0.615 0.615 0 0 0 0.088 12.314 Q 0.028 12.444 0.009 12.642 A 2.078 2.078 0 0 0 0 12.84 A 0.589 0.589 0 0 0 0.007 12.929 Q 0.033 13.098 0.15 13.37 Q 0.3 13.72 0.54 14.03 Q 0.78 14.34 1.06 14.42 A 4.445 4.445 0 0 0 1.189 14.456 Q 1.381 14.505 1.555 14.531 Z M 10.154 12.347 A 0.877 0.877 0 0 0 10.54 12.44 A 1.147 1.147 0 0 0 10.568 12.44 Q 10.766 12.435 10.86 12.36 A 0.737 0.737 0 0 0 10.939 12.297 Q 11.058 12.186 11.06 12.064 A 0.254 0.254 0 0 0 11.06 12.06 A 0.397 0.397 0 0 0 11.057 12.009 Q 11.047 11.932 11.007 11.855 A 0.685 0.685 0 0 0 10.93 11.74 L 10.67 11.42 A 0.818 0.818 0 0 1 10.617 11.348 Q 10.584 11.296 10.565 11.246 A 0.353 0.353 0 0 1 10.54 11.12 Q 10.568 10.759 10.697 10.223 A 13.1 13.1 0 0 1 10.83 9.72 A 21.066 21.066 0 0 1 10.903 9.468 Q 11.136 8.685 11.48 7.74 A 47.736 47.736 0 0 1 11.581 7.464 A 52.453 52.453 0 0 1 12.36 5.49 Q 12.84 4.34 13.32 3.3 A 4.489 4.489 0 0 1 13.493 2.972 A 3.588 3.588 0 0 1 13.82 2.5 A 7.213 7.213 0 0 0 14.034 2.227 A 5.721 5.721 0 0 0 14.3 1.84 A 1.703 1.703 0 0 0 14.347 1.749 Q 14.385 1.67 14.421 1.576 A 3.597 3.597 0 0 0 14.49 1.38 A 5.176 5.176 0 0 0 14.537 1.224 A 4.417 4.417 0 0 0 14.63 0.84 A 7.591 7.591 0 0 0 14.647 0.751 Q 14.68 0.565 14.68 0.5 Q 14.68 0.414 14.662 0.342 A 0.422 0.422 0 0 0 14.54 0.13 A 0.586 0.586 0 0 0 14.53 0.121 A 0.454 0.454 0 0 0 14.22 0 A 0.513 0.513 0 0 0 13.845 0.152 A 0.752 0.752 0 0 0 13.72 0.32 A 17.826 17.826 0 0 0 13.66 0.438 Q 13.398 0.952 13.04 1.73 Q 12.64 2.6 12.2 3.67 Q 11.76 4.74 11.33 5.87 A 91.257 91.257 0 0 0 11.119 6.431 A 81.723 81.723 0 0 0 10.53 8.06 A 35.846 35.846 0 0 0 10.507 8.127 Q 10.333 8.629 10.19 9.088 A 22.228 22.228 0 0 0 9.93 9.99 A 20.322 20.322 0 0 0 9.887 10.155 Q 9.694 10.91 9.64 11.38 Q 9.622 11.638 9.677 11.83 A 0.699 0.699 0 0 0 9.91 12.19 Q 10.031 12.288 10.154 12.347 Z M 4.48 2.36 L 4.48 2.4 A 0.149 0.149 0 0 1 4.451 2.411 Q 4.415 2.42 4.36 2.42 Q 4.151 2.42 4.124 2.178 A 0.7 0.7 0 0 1 4.12 2.1 Q 4.12 1.96 4.18 1.83 A 0.446 0.446 0 0 1 4.323 1.657 A 0.574 0.574 0 0 1 4.38 1.62 L 4.61 1.48 Q 4.84 1.34 5.17 1.16 Q 5.5 0.98 5.78 0.86 Q 5.94 0.78 6.47 0.65 Q 7 0.52 7.65 0.38 Q 8.3 0.24 8.87 0.15 Q 9.435 0.061 9.676 0.06 A 1.308 1.308 0 0 1 9.68 0.06 A 2.554 2.554 0 0 1 9.966 0.086 Q 10.261 0.131 10.44 0.247 A 0.731 0.731 0 0 1 10.46 0.26 A 2.117 2.117 0 0 0 11.015 0.532 A 2.372 2.372 0 0 0 11.04 0.54 A 0.216 0.216 0 0 1 11.167 0.691 Q 11.178 0.733 11.18 0.784 A 0.548 0.548 0 0 1 11.18 0.8 A 0.56 0.56 0 0 1 11.135 1.015 Q 11.104 1.09 11.051 1.167 A 1.082 1.082 0 0 1 11.02 1.21 Q 10.86 1.42 10.66 1.36 Q 10.26 1.2 9.84 1.13 A 5.573 5.573 0 0 0 9.464 1.08 Q 9.286 1.063 9.126 1.06 A 3.38 3.38 0 0 0 9.08 1.06 Q 8.932 1.06 8.56 1.112 A 14.845 14.845 0 0 0 8.5 1.12 Q 8.08 1.18 7.59 1.28 Q 7.1 1.38 6.68 1.48 A 13.837 13.837 0 0 0 6.489 1.527 Q 6.221 1.595 6.1 1.64 Q 5.76 1.78 5.33 1.96 Q 4.9 2.14 4.48 2.36 Z",
      "vector-effect": "non-scaling-stroke",
    },
    null,
    -1
  ),
  Tr = j({
    setup(t) {
      return (
        be(async () => {
          if (typeof window == "undefined") return;
          const r = (await ze(() => import("./anime.es.5068d64c.js"), []))
            .default;
          r({
            targets: ".navTitle path",
            strokeDashoffset: [r.setDashoffset, 0],
            easing: "easeInOutSine",
            duration: 1500,
            delay: (a, n) => n * 1e3,
            direction: "alternate",
            loop: !0,
          });
        }),
        (e, r) => {
          const a = Nr;
          return (
            y(),
            Xe(
              a,
              {
                class: "navTitle",
                "svg-name": "NavTitle",
                "svg-class": "w-full h-8 cursor-pointer stroke-2",
                stroke: "#fff",
                width: 30,
                height: 18,
              },
              { svgContent: Ze(() => [$r]), _: 1 }
            )
          );
        }
      );
    },
  });
const Pr = {},
  Br = { class: "nav" },
  Dr = { class: "nav__title" };
function Lr(t, e) {
  const r = Tr;
  return y(), Q("nav", Br, [b("div", Dr, [F(r)])]);
}
var Ur = I(Pr, [
  ["render", Lr],
  ["__scopeId", "data-v-674103f8"],
]);
const Fr = {},
  je = (t) => (Ke("data-v-7a68463f"), (t = t()), Ye(), t),
  kr = { class: "w-full h-full" },
  Ir = { class: "body" },
  jr = je(() =>
    b(
      "div",
      { class: "content" },
      [b("div", { class: "menu" }), b("div", { class: "post" })],
      -1
    )
  ),
  Mr = je(() => b("div", { class: "chat" }, null, -1));
function qr(t, e) {
  const r = Ur,
    a = Sr;
  return y(), Q("div", kr, [F(r), b("div", Ir, [F(a), jr, Mr])]);
}
var Jr = I(Fr, [
  ["render", qr],
  ["__scopeId", "data-v-7a68463f"],
]);
export { Jr as default };
