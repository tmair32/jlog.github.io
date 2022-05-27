var mr = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: "normal",
    autoplay: !0,
    timelineOffset: 0,
  },
  Y = {
    duration: 1e3,
    delay: 0,
    endDelay: 0,
    easing: "easeOutElastic(1, .5)",
    round: 0,
  },
  Fr = [
    "translateX",
    "translateY",
    "translateZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "perspective",
    "matrix",
    "matrix3d",
  ],
  U = { CSS: {}, springs: {} };
function D(r, e, n) {
  return Math.min(Math.max(r, e), n);
}
function R(r, e) {
  return r.indexOf(e) > -1;
}
function K(r, e) {
  return r.apply(null, e);
}
var c = {
  arr: function (r) {
    return Array.isArray(r);
  },
  obj: function (r) {
    return R(Object.prototype.toString.call(r), "Object");
  },
  pth: function (r) {
    return c.obj(r) && r.hasOwnProperty("totalLength");
  },
  svg: function (r) {
    return r instanceof SVGElement;
  },
  inp: function (r) {
    return r instanceof HTMLInputElement;
  },
  dom: function (r) {
    return r.nodeType || c.svg(r);
  },
  str: function (r) {
    return typeof r == "string";
  },
  fnc: function (r) {
    return typeof r == "function";
  },
  und: function (r) {
    return typeof r == "undefined";
  },
  nil: function (r) {
    return c.und(r) || r === null;
  },
  hex: function (r) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(r);
  },
  rgb: function (r) {
    return /^rgb/.test(r);
  },
  hsl: function (r) {
    return /^hsl/.test(r);
  },
  col: function (r) {
    return c.hex(r) || c.rgb(r) || c.hsl(r);
  },
  key: function (r) {
    return (
      !mr.hasOwnProperty(r) &&
      !Y.hasOwnProperty(r) &&
      r !== "targets" &&
      r !== "keyframes"
    );
  },
};
function pr(r) {
  var e = /\(([^)]+)\)/.exec(r);
  return e
    ? e[1].split(",").map(function (n) {
        return parseFloat(n);
      })
    : [];
}
function yr(r, e) {
  var n = pr(r),
    i = D(c.und(n[0]) ? 1 : n[0], 0.1, 100),
    t = D(c.und(n[1]) ? 100 : n[1], 0.1, 100),
    u = D(c.und(n[2]) ? 10 : n[2], 0.1, 100),
    o = D(c.und(n[3]) ? 0 : n[3], 0.1, 100),
    f = Math.sqrt(t / i),
    a = u / (2 * Math.sqrt(t * i)),
    m = a < 1 ? f * Math.sqrt(1 - a * a) : 0,
    s = 1,
    l = a < 1 ? (a * f + -o) / m : -o + f;
  function h(p) {
    var v = e ? (e * p) / 1e3 : p;
    return (
      a < 1
        ? (v =
            Math.exp(-v * a * f) * (s * Math.cos(m * v) + l * Math.sin(m * v)))
        : (v = (s + l * v) * Math.exp(-v * f)),
      p === 0 || p === 1 ? p : 1 - v
    );
  }
  function w() {
    var p = U.springs[r];
    if (p) return p;
    for (var v = 1 / 6, y = 0, M = 0; ; )
      if (((y += v), h(y) === 1)) {
        if ((M++, M >= 16)) break;
      } else M = 0;
    var g = y * v * 1e3;
    return (U.springs[r] = g), g;
  }
  return e ? h : w;
}
function Vr(r) {
  return (
    r === void 0 && (r = 10),
    function (e) {
      return Math.ceil(D(e, 1e-6, 1) * r) * (1 / r);
    }
  );
}
var jr = (function () {
    var r = 11,
      e = 1 / (r - 1);
    function n(s, l) {
      return 1 - 3 * l + 3 * s;
    }
    function i(s, l) {
      return 3 * l - 6 * s;
    }
    function t(s) {
      return 3 * s;
    }
    function u(s, l, h) {
      return ((n(l, h) * s + i(l, h)) * s + t(l)) * s;
    }
    function o(s, l, h) {
      return 3 * n(l, h) * s * s + 2 * i(l, h) * s + t(l);
    }
    function f(s, l, h, w, p) {
      var v,
        y,
        M = 0;
      do (y = l + (h - l) / 2), (v = u(y, w, p) - s), v > 0 ? (h = y) : (l = y);
      while (Math.abs(v) > 1e-7 && ++M < 10);
      return y;
    }
    function a(s, l, h, w) {
      for (var p = 0; p < 4; ++p) {
        var v = o(l, h, w);
        if (v === 0) return l;
        var y = u(l, h, w) - s;
        l -= y / v;
      }
      return l;
    }
    function m(s, l, h, w) {
      if (!(0 <= s && s <= 1 && 0 <= h && h <= 1)) return;
      var p = new Float32Array(r);
      if (s !== l || h !== w) for (var v = 0; v < r; ++v) p[v] = u(v * e, s, h);
      function y(M) {
        for (var g = 0, d = 1, P = r - 1; d !== P && p[d] <= M; ++d) g += e;
        --d;
        var E = (M - p[d]) / (p[d + 1] - p[d]),
          b = g + E * e,
          S = o(b, s, h);
        return S >= 0.001 ? a(M, b, s, h) : S === 0 ? b : f(M, g, g + e, s, h);
      }
      return function (M) {
        return (s === l && h === w) || M === 0 || M === 1 ? M : u(y(M), l, w);
      };
    }
    return m;
  })(),
  br = (function () {
    var r = {
        linear: function () {
          return function (i) {
            return i;
          };
        },
      },
      e = {
        Sine: function () {
          return function (i) {
            return 1 - Math.cos((i * Math.PI) / 2);
          };
        },
        Circ: function () {
          return function (i) {
            return 1 - Math.sqrt(1 - i * i);
          };
        },
        Back: function () {
          return function (i) {
            return i * i * (3 * i - 2);
          };
        },
        Bounce: function () {
          return function (i) {
            for (var t, u = 4; i < ((t = Math.pow(2, --u)) - 1) / 11; );
            return (
              1 / Math.pow(4, 3 - u) -
              7.5625 * Math.pow((t * 3 - 2) / 22 - i, 2)
            );
          };
        },
        Elastic: function (i, t) {
          i === void 0 && (i = 1), t === void 0 && (t = 0.5);
          var u = D(i, 1, 10),
            o = D(t, 0.1, 2);
          return function (f) {
            return f === 0 || f === 1
              ? f
              : -u *
                  Math.pow(2, 10 * (f - 1)) *
                  Math.sin(
                    ((f - 1 - (o / (Math.PI * 2)) * Math.asin(1 / u)) *
                      (Math.PI * 2)) /
                      o
                  );
          };
        },
      },
      n = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
    return (
      n.forEach(function (i, t) {
        e[i] = function () {
          return function (u) {
            return Math.pow(u, t + 2);
          };
        };
      }),
      Object.keys(e).forEach(function (i) {
        var t = e[i];
        (r["easeIn" + i] = t),
          (r["easeOut" + i] = function (u, o) {
            return function (f) {
              return 1 - t(u, o)(1 - f);
            };
          }),
          (r["easeInOut" + i] = function (u, o) {
            return function (f) {
              return f < 0.5 ? t(u, o)(f * 2) / 2 : 1 - t(u, o)(f * -2 + 2) / 2;
            };
          }),
          (r["easeOutIn" + i] = function (u, o) {
            return function (f) {
              return f < 0.5
                ? (1 - t(u, o)(1 - f * 2)) / 2
                : (t(u, o)(f * 2 - 1) + 1) / 2;
            };
          });
      }),
      r
    );
  })();
function G(r, e) {
  if (c.fnc(r)) return r;
  var n = r.split("(")[0],
    i = br[n],
    t = pr(r);
  switch (n) {
    case "spring":
      return yr(r, e);
    case "cubicBezier":
      return K(jr, t);
    case "steps":
      return K(Vr, t);
    default:
      return K(i, t);
  }
}
function xr(r) {
  try {
    var e = document.querySelectorAll(r);
    return e;
  } catch {
    return;
  }
}
function W(r, e) {
  for (
    var n = r.length,
      i = arguments.length >= 2 ? arguments[1] : void 0,
      t = [],
      u = 0;
    u < n;
    u++
  )
    if (u in r) {
      var o = r[u];
      e.call(i, o, u, r) && t.push(o);
    }
  return t;
}
function q(r) {
  return r.reduce(function (e, n) {
    return e.concat(c.arr(n) ? q(n) : n);
  }, []);
}
function lr(r) {
  return c.arr(r)
    ? r
    : (c.str(r) && (r = xr(r) || r),
      r instanceof NodeList || r instanceof HTMLCollection
        ? [].slice.call(r)
        : [r]);
}
function X(r, e) {
  return r.some(function (n) {
    return n === e;
  });
}
function rr(r) {
  var e = {};
  for (var n in r) e[n] = r[n];
  return e;
}
function _(r, e) {
  var n = rr(r);
  for (var i in r) n[i] = e.hasOwnProperty(i) ? e[i] : r[i];
  return n;
}
function N(r, e) {
  var n = rr(r);
  for (var i in e) n[i] = c.und(r[i]) ? e[i] : r[i];
  return n;
}
function zr(r) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(r);
  return e ? "rgba(" + e[1] + ",1)" : r;
}
function Rr(r) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    n = r.replace(e, function (f, a, m, s) {
      return a + a + m + m + s + s;
    }),
    i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n),
    t = parseInt(i[1], 16),
    u = parseInt(i[2], 16),
    o = parseInt(i[3], 16);
  return "rgba(" + t + "," + u + "," + o + ",1)";
}
function Hr(r) {
  var e =
      /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(r) ||
      /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(r),
    n = parseInt(e[1], 10) / 360,
    i = parseInt(e[2], 10) / 100,
    t = parseInt(e[3], 10) / 100,
    u = e[4] || 1;
  function o(h, w, p) {
    return (
      p < 0 && (p += 1),
      p > 1 && (p -= 1),
      p < 1 / 6
        ? h + (w - h) * 6 * p
        : p < 1 / 2
        ? w
        : p < 2 / 3
        ? h + (w - h) * (2 / 3 - p) * 6
        : h
    );
  }
  var f, a, m;
  if (i == 0) f = a = m = t;
  else {
    var s = t < 0.5 ? t * (1 + i) : t + i - t * i,
      l = 2 * t - s;
    (f = o(l, s, n + 1 / 3)), (a = o(l, s, n)), (m = o(l, s, n - 1 / 3));
  }
  return "rgba(" + f * 255 + "," + a * 255 + "," + m * 255 + "," + u + ")";
}
function Ur(r) {
  if (c.rgb(r)) return zr(r);
  if (c.hex(r)) return Rr(r);
  if (c.hsl(r)) return Hr(r);
}
function O(r) {
  var e =
    /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
      r
    );
  if (e) return e[1];
}
function Wr(r) {
  if (R(r, "translate") || r === "perspective") return "px";
  if (R(r, "rotate") || R(r, "skew")) return "deg";
}
function J(r, e) {
  return c.fnc(r) ? r(e.target, e.id, e.total) : r;
}
function k(r, e) {
  return r.getAttribute(e);
}
function er(r, e, n) {
  var i = O(e);
  if (X([n, "deg", "rad", "turn"], i)) return e;
  var t = U.CSS[e + n];
  if (!c.und(t)) return t;
  var u = 100,
    o = document.createElement(r.tagName),
    f =
      r.parentNode && r.parentNode !== document ? r.parentNode : document.body;
  f.appendChild(o), (o.style.position = "absolute"), (o.style.width = u + n);
  var a = u / o.offsetWidth;
  f.removeChild(o);
  var m = a * parseFloat(e);
  return (U.CSS[e + n] = m), m;
}
function Mr(r, e, n) {
  if (e in r.style) {
    var i = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
      t = r.style[e] || getComputedStyle(r).getPropertyValue(i) || "0";
    return n ? er(r, t, n) : t;
  }
}
function nr(r, e) {
  if (c.dom(r) && !c.inp(r) && (!c.nil(k(r, e)) || (c.svg(r) && r[e])))
    return "attribute";
  if (c.dom(r) && X(Fr, e)) return "transform";
  if (c.dom(r) && e !== "transform" && Mr(r, e)) return "css";
  if (r[e] != null) return "object";
}
function Tr(r) {
  if (!!c.dom(r)) {
    for (
      var e = r.style.transform || "",
        n = /(\w+)\(([^)]*)\)/g,
        i = new Map(),
        t;
      (t = n.exec(e));

    )
      i.set(t[1], t[2]);
    return i;
  }
}
function qr(r, e, n, i) {
  var t = R(e, "scale") ? 1 : 0 + Wr(e),
    u = Tr(r).get(e) || t;
  return (
    n && (n.transforms.list.set(e, u), (n.transforms.last = e)),
    i ? er(r, u, i) : u
  );
}
function tr(r, e, n, i) {
  switch (nr(r, e)) {
    case "transform":
      return qr(r, e, i, n);
    case "css":
      return Mr(r, e, n);
    case "attribute":
      return k(r, e);
    default:
      return r[e] || 0;
  }
}
function ar(r, e) {
  var n = /^(\*=|\+=|-=)/.exec(r);
  if (!n) return r;
  var i = O(r) || 0,
    t = parseFloat(e),
    u = parseFloat(r.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return t + u + i;
    case "-":
      return t - u + i;
    case "*":
      return t * u + i;
  }
}
function wr(r, e) {
  if (c.col(r)) return Ur(r);
  if (/\s/g.test(r)) return r;
  var n = O(r),
    i = n ? r.substr(0, r.length - n.length) : r;
  return e ? i + e : i;
}
function ir(r, e) {
  return Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2));
}
function Nr(r) {
  return Math.PI * 2 * k(r, "r");
}
function Zr(r) {
  return k(r, "width") * 2 + k(r, "height") * 2;
}
function $r(r) {
  return ir({ x: k(r, "x1"), y: k(r, "y1") }, { x: k(r, "x2"), y: k(r, "y2") });
}
function Pr(r) {
  for (var e = r.points, n = 0, i, t = 0; t < e.numberOfItems; t++) {
    var u = e.getItem(t);
    t > 0 && (n += ir(i, u)), (i = u);
  }
  return n;
}
function Qr(r) {
  var e = r.points;
  return Pr(r) + ir(e.getItem(e.numberOfItems - 1), e.getItem(0));
}
function Ir(r) {
  if (r.getTotalLength) return r.getTotalLength();
  switch (r.tagName.toLowerCase()) {
    case "circle":
      return Nr(r);
    case "rect":
      return Zr(r);
    case "line":
      return $r(r);
    case "polyline":
      return Pr(r);
    case "polygon":
      return Qr(r);
  }
}
function Kr(r) {
  var e = Ir(r);
  return r.setAttribute("stroke-dasharray", e), e;
}
function _r(r) {
  for (var e = r.parentNode; c.svg(e) && c.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function Cr(r, e) {
  var n = e || {},
    i = n.el || _r(r),
    t = i.getBoundingClientRect(),
    u = k(i, "viewBox"),
    o = t.width,
    f = t.height,
    a = n.viewBox || (u ? u.split(" ") : [0, 0, o, f]);
  return {
    el: i,
    viewBox: a,
    x: a[0] / 1,
    y: a[1] / 1,
    w: o,
    h: f,
    vW: a[2],
    vH: a[3],
  };
}
function Jr(r, e) {
  var n = c.str(r) ? xr(r)[0] : r,
    i = e || 100;
  return function (t) {
    return { property: t, el: n, svg: Cr(n), totalLength: Ir(n) * (i / 100) };
  };
}
function Yr(r, e, n) {
  function i(s) {
    s === void 0 && (s = 0);
    var l = e + s >= 1 ? e + s : 0;
    return r.el.getPointAtLength(l);
  }
  var t = Cr(r.el, r.svg),
    u = i(),
    o = i(-1),
    f = i(1),
    a = n ? 1 : t.w / t.vW,
    m = n ? 1 : t.h / t.vH;
  switch (r.property) {
    case "x":
      return (u.x - t.x) * a;
    case "y":
      return (u.y - t.y) * m;
    case "angle":
      return (Math.atan2(f.y - o.y, f.x - o.x) * 180) / Math.PI;
  }
}
function vr(r, e) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
    i = wr(c.pth(r) ? r.totalLength : r, e) + "";
  return {
    original: i,
    numbers: i.match(n) ? i.match(n).map(Number) : [0],
    strings: c.str(r) || e ? i.split(n) : [],
  };
}
function ur(r) {
  var e = r ? q(c.arr(r) ? r.map(lr) : lr(r)) : [];
  return W(e, function (n, i, t) {
    return t.indexOf(n) === i;
  });
}
function Dr(r) {
  var e = ur(r);
  return e.map(function (n, i) {
    return { target: n, id: i, total: e.length, transforms: { list: Tr(n) } };
  });
}
function Gr(r, e) {
  var n = rr(e);
  if ((/^spring/.test(n.easing) && (n.duration = yr(n.easing)), c.arr(r))) {
    var i = r.length,
      t = i === 2 && !c.obj(r[0]);
    t ? (r = { value: r }) : c.fnc(e.duration) || (n.duration = e.duration / i);
  }
  var u = c.arr(r) ? r : [r];
  return u
    .map(function (o, f) {
      var a = c.obj(o) && !c.pth(o) ? o : { value: o };
      return (
        c.und(a.delay) && (a.delay = f ? 0 : e.delay),
        c.und(a.endDelay) && (a.endDelay = f === u.length - 1 ? e.endDelay : 0),
        a
      );
    })
    .map(function (o) {
      return N(o, n);
    });
}
function Xr(r) {
  for (
    var e = W(
        q(
          r.map(function (u) {
            return Object.keys(u);
          })
        ),
        function (u) {
          return c.key(u);
        }
      ).reduce(function (u, o) {
        return u.indexOf(o) < 0 && u.push(o), u;
      }, []),
      n = {},
      i = function (u) {
        var o = e[u];
        n[o] = r.map(function (f) {
          var a = {};
          for (var m in f)
            c.key(m) ? m == o && (a.value = f[m]) : (a[m] = f[m]);
          return a;
        });
      },
      t = 0;
    t < e.length;
    t++
  )
    i(t);
  return n;
}
function re(r, e) {
  var n = [],
    i = e.keyframes;
  i && (e = N(Xr(i), e));
  for (var t in e) c.key(t) && n.push({ name: t, tweens: Gr(e[t], r) });
  return n;
}
function ee(r, e) {
  var n = {};
  for (var i in r) {
    var t = J(r[i], e);
    c.arr(t) &&
      ((t = t.map(function (u) {
        return J(u, e);
      })),
      t.length === 1 && (t = t[0])),
      (n[i] = t);
  }
  return (
    (n.duration = parseFloat(n.duration)), (n.delay = parseFloat(n.delay)), n
  );
}
function ne(r, e) {
  var n;
  return r.tweens.map(function (i) {
    var t = ee(i, e),
      u = t.value,
      o = c.arr(u) ? u[1] : u,
      f = O(o),
      a = tr(e.target, r.name, f, e),
      m = n ? n.to.original : a,
      s = c.arr(u) ? u[0] : m,
      l = O(s) || O(a),
      h = f || l;
    return (
      c.und(o) && (o = m),
      (t.from = vr(s, h)),
      (t.to = vr(ar(o, s), h)),
      (t.start = n ? n.end : 0),
      (t.end = t.start + t.delay + t.duration + t.endDelay),
      (t.easing = G(t.easing, t.duration)),
      (t.isPath = c.pth(u)),
      (t.isPathTargetInsideSVG = t.isPath && c.svg(e.target)),
      (t.isColor = c.col(t.from.original)),
      t.isColor && (t.round = 1),
      (n = t),
      t
    );
  });
}
var kr = {
  css: function (r, e, n) {
    return (r.style[e] = n);
  },
  attribute: function (r, e, n) {
    return r.setAttribute(e, n);
  },
  object: function (r, e, n) {
    return (r[e] = n);
  },
  transform: function (r, e, n, i, t) {
    if ((i.list.set(e, n), e === i.last || t)) {
      var u = "";
      i.list.forEach(function (o, f) {
        u += f + "(" + o + ") ";
      }),
        (r.style.transform = u);
    }
  },
};
function Or(r, e) {
  var n = Dr(r);
  n.forEach(function (i) {
    for (var t in e) {
      var u = J(e[t], i),
        o = i.target,
        f = O(u),
        a = tr(o, t, f, i),
        m = f || O(a),
        s = ar(wr(u, m), a),
        l = nr(o, t);
      kr[l](o, t, s, i.transforms, !0);
    }
  });
}
function te(r, e) {
  var n = nr(r.target, e.name);
  if (n) {
    var i = ne(e, r),
      t = i[i.length - 1];
    return {
      type: n,
      property: e.name,
      animatable: r,
      tweens: i,
      duration: t.end,
      delay: i[0].delay,
      endDelay: t.endDelay,
    };
  }
}
function ae(r, e) {
  return W(
    q(
      r.map(function (n) {
        return e.map(function (i) {
          return te(n, i);
        });
      })
    ),
    function (n) {
      return !c.und(n);
    }
  );
}
function Er(r, e) {
  var n = r.length,
    i = function (u) {
      return u.timelineOffset ? u.timelineOffset : 0;
    },
    t = {};
  return (
    (t.duration = n
      ? Math.max.apply(
          Math,
          r.map(function (u) {
            return i(u) + u.duration;
          })
        )
      : e.duration),
    (t.delay = n
      ? Math.min.apply(
          Math,
          r.map(function (u) {
            return i(u) + u.delay;
          })
        )
      : e.delay),
    (t.endDelay = n
      ? t.duration -
        Math.max.apply(
          Math,
          r.map(function (u) {
            return i(u) + u.duration - u.endDelay;
          })
        )
      : e.endDelay),
    t
  );
}
var dr = 0;
function ie(r) {
  var e = _(mr, r),
    n = _(Y, r),
    i = re(n, r),
    t = Dr(r.targets),
    u = ae(t, i),
    o = Er(u, n),
    f = dr;
  return (
    dr++,
    N(e, {
      id: f,
      children: [],
      animatables: t,
      animations: u,
      duration: o.duration,
      delay: o.delay,
      endDelay: o.endDelay,
    })
  );
}
var C = [],
  Sr = (function () {
    var r;
    function e() {
      !r &&
        (!gr() || !x.suspendWhenDocumentHidden) &&
        C.length > 0 &&
        (r = requestAnimationFrame(n));
    }
    function n(t) {
      for (var u = C.length, o = 0; o < u; ) {
        var f = C[o];
        f.paused ? (C.splice(o, 1), u--) : (f.tick(t), o++);
      }
      r = o > 0 ? requestAnimationFrame(n) : void 0;
    }
    function i() {
      !x.suspendWhenDocumentHidden ||
        (gr()
          ? (r = cancelAnimationFrame(r))
          : (C.forEach(function (t) {
              return t._onDocumentVisibility();
            }),
            Sr()));
    }
    return (
      typeof document != "undefined" &&
        document.addEventListener("visibilitychange", i),
      e
    );
  })();
function gr() {
  return !!document && document.hidden;
}
function x(r) {
  r === void 0 && (r = {});
  var e = 0,
    n = 0,
    i = 0,
    t,
    u = 0,
    o = null;
  function f(g) {
    var d =
      window.Promise &&
      new Promise(function (P) {
        return (o = P);
      });
    return (g.finished = d), d;
  }
  var a = ie(r);
  f(a);
  function m() {
    var g = a.direction;
    g !== "alternate" && (a.direction = g !== "normal" ? "normal" : "reverse"),
      (a.reversed = !a.reversed),
      t.forEach(function (d) {
        return (d.reversed = a.reversed);
      });
  }
  function s(g) {
    return a.reversed ? a.duration - g : g;
  }
  function l() {
    (e = 0), (n = s(a.currentTime) * (1 / x.speed));
  }
  function h(g, d) {
    d && d.seek(g - d.timelineOffset);
  }
  function w(g) {
    if (a.reversePlayback) for (var P = u; P--; ) h(g, t[P]);
    else for (var d = 0; d < u; d++) h(g, t[d]);
  }
  function p(g) {
    for (var d = 0, P = a.animations, E = P.length; d < E; ) {
      var b = P[d],
        S = b.animatable,
        F = b.tweens,
        L = F.length - 1,
        T = F[L];
      L &&
        (T =
          W(F, function (Br) {
            return g < Br.end;
          })[0] || T);
      for (
        var A = D(g - T.start - T.delay, 0, T.duration) / T.duration,
          H = isNaN(A) ? 1 : T.easing(A),
          I = T.to.strings,
          Z = T.round,
          $ = [],
          Ar = T.to.numbers.length,
          B = void 0,
          V = 0;
        V < Ar;
        V++
      ) {
        var j = void 0,
          or = T.to.numbers[V],
          fr = T.from.numbers[V] || 0;
        T.isPath
          ? (j = Yr(T.value, H * or, T.isPathTargetInsideSVG))
          : (j = fr + H * (or - fr)),
          Z && ((T.isColor && V > 2) || (j = Math.round(j * Z) / Z)),
          $.push(j);
      }
      var sr = I.length;
      if (!sr) B = $[0];
      else {
        B = I[0];
        for (var z = 0; z < sr; z++) {
          I[z];
          var cr = I[z + 1],
            Q = $[z];
          isNaN(Q) || (cr ? (B += Q + cr) : (B += Q + " "));
        }
      }
      kr[b.type](S.target, b.property, B, S.transforms),
        (b.currentValue = B),
        d++;
    }
  }
  function v(g) {
    a[g] && !a.passThrough && a[g](a);
  }
  function y() {
    a.remaining && a.remaining !== !0 && a.remaining--;
  }
  function M(g) {
    var d = a.duration,
      P = a.delay,
      E = d - a.endDelay,
      b = s(g);
    (a.progress = D((b / d) * 100, 0, 100)),
      (a.reversePlayback = b < a.currentTime),
      t && w(b),
      !a.began && a.currentTime > 0 && ((a.began = !0), v("begin")),
      !a.loopBegan && a.currentTime > 0 && ((a.loopBegan = !0), v("loopBegin")),
      b <= P && a.currentTime !== 0 && p(0),
      ((b >= E && a.currentTime !== d) || !d) && p(d),
      b > P && b < E
        ? (a.changeBegan ||
            ((a.changeBegan = !0), (a.changeCompleted = !1), v("changeBegin")),
          v("change"),
          p(b))
        : a.changeBegan &&
          ((a.changeCompleted = !0), (a.changeBegan = !1), v("changeComplete")),
      (a.currentTime = D(b, 0, d)),
      a.began && v("update"),
      g >= d &&
        ((n = 0),
        y(),
        a.remaining
          ? ((e = i),
            v("loopComplete"),
            (a.loopBegan = !1),
            a.direction === "alternate" && m())
          : ((a.paused = !0),
            a.completed ||
              ((a.completed = !0),
              v("loopComplete"),
              v("complete"),
              !a.passThrough && "Promise" in window && (o(), f(a)))));
  }
  return (
    (a.reset = function () {
      var g = a.direction;
      (a.passThrough = !1),
        (a.currentTime = 0),
        (a.progress = 0),
        (a.paused = !0),
        (a.began = !1),
        (a.loopBegan = !1),
        (a.changeBegan = !1),
        (a.completed = !1),
        (a.changeCompleted = !1),
        (a.reversePlayback = !1),
        (a.reversed = g === "reverse"),
        (a.remaining = a.loop),
        (t = a.children),
        (u = t.length);
      for (var d = u; d--; ) a.children[d].reset();
      ((a.reversed && a.loop !== !0) || (g === "alternate" && a.loop === 1)) &&
        a.remaining++,
        p(a.reversed ? a.duration : 0);
    }),
    (a._onDocumentVisibility = l),
    (a.set = function (g, d) {
      return Or(g, d), a;
    }),
    (a.tick = function (g) {
      (i = g), e || (e = i), M((i + (n - e)) * x.speed);
    }),
    (a.seek = function (g) {
      M(s(g));
    }),
    (a.pause = function () {
      (a.paused = !0), l();
    }),
    (a.play = function () {
      !a.paused ||
        (a.completed && a.reset(), (a.paused = !1), C.push(a), l(), Sr());
    }),
    (a.reverse = function () {
      m(), (a.completed = !a.reversed), l();
    }),
    (a.restart = function () {
      a.reset(), a.play();
    }),
    (a.remove = function (g) {
      var d = ur(g);
      Lr(d, a);
    }),
    a.reset(),
    a.autoplay && a.play(),
    a
  );
}
function hr(r, e) {
  for (var n = e.length; n--; ) X(r, e[n].animatable.target) && e.splice(n, 1);
}
function Lr(r, e) {
  var n = e.animations,
    i = e.children;
  hr(r, n);
  for (var t = i.length; t--; ) {
    var u = i[t],
      o = u.animations;
    hr(r, o), !o.length && !u.children.length && i.splice(t, 1);
  }
  !n.length && !i.length && e.pause();
}
function ue(r) {
  for (var e = ur(r), n = C.length; n--; ) {
    var i = C[n];
    Lr(e, i);
  }
}
function oe(r, e) {
  e === void 0 && (e = {});
  var n = e.direction || "normal",
    i = e.easing ? G(e.easing) : null,
    t = e.grid,
    u = e.axis,
    o = e.from || 0,
    f = o === "first",
    a = o === "center",
    m = o === "last",
    s = c.arr(r),
    l = parseFloat(s ? r[0] : r),
    h = s ? parseFloat(r[1]) : 0,
    w = O(s ? r[1] : r) || 0,
    p = e.start || 0 + (s ? l : 0),
    v = [],
    y = 0;
  return function (M, g, d) {
    if ((f && (o = 0), a && (o = (d - 1) / 2), m && (o = d - 1), !v.length)) {
      for (var P = 0; P < d; P++) {
        if (!t) v.push(Math.abs(o - P));
        else {
          var E = a ? (t[0] - 1) / 2 : o % t[0],
            b = a ? (t[1] - 1) / 2 : Math.floor(o / t[0]),
            S = P % t[0],
            F = Math.floor(P / t[0]),
            L = E - S,
            T = b - F,
            A = Math.sqrt(L * L + T * T);
          u === "x" && (A = -L), u === "y" && (A = -T), v.push(A);
        }
        y = Math.max.apply(Math, v);
      }
      i &&
        (v = v.map(function (I) {
          return i(I / y) * y;
        })),
        n === "reverse" &&
          (v = v.map(function (I) {
            return u ? (I < 0 ? I * -1 : -I) : Math.abs(y - I);
          }));
    }
    var H = s ? (h - l) / y : l;
    return p + H * (Math.round(v[g] * 100) / 100) + w;
  };
}
function fe(r) {
  r === void 0 && (r = {});
  var e = x(r);
  return (
    (e.duration = 0),
    (e.add = function (n, i) {
      var t = C.indexOf(e),
        u = e.children;
      t > -1 && C.splice(t, 1);
      function o(h) {
        h.passThrough = !0;
      }
      for (var f = 0; f < u.length; f++) o(u[f]);
      var a = N(n, _(Y, r));
      a.targets = a.targets || r.targets;
      var m = e.duration;
      (a.autoplay = !1),
        (a.direction = e.direction),
        (a.timelineOffset = c.und(i) ? m : ar(i, m)),
        o(e),
        e.seek(a.timelineOffset);
      var s = x(a);
      o(s), u.push(s);
      var l = Er(u, r);
      return (
        (e.delay = l.delay),
        (e.endDelay = l.endDelay),
        (e.duration = l.duration),
        e.seek(0),
        e.reset(),
        e.autoplay && e.play(),
        e
      );
    }),
    e
  );
}
x.version = "3.2.1";
x.speed = 1;
x.suspendWhenDocumentHidden = !0;
x.running = C;
x.remove = ue;
x.get = tr;
x.set = Or;
x.convertPx = er;
x.path = Jr;
x.setDashoffset = Kr;
x.stagger = oe;
x.timeline = fe;
x.easing = G;
x.penner = br;
x.random = function (r, e) {
  return Math.floor(Math.random() * (e - r + 1)) + r;
};
export { x as default };
