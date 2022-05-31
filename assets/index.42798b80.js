function no(e, t) {
  return (
    t.forEach(function (r) {
      r &&
        typeof r != "string" &&
        !Array.isArray(r) &&
        Object.keys(r).forEach(function (i) {
          if (i !== "default" && !(i in e)) {
            var n = Object.getOwnPropertyDescriptor(r, i);
            Object.defineProperty(
              e,
              i,
              n.get
                ? n
                : {
                    enumerable: !0,
                    get: function () {
                      return r[i];
                    },
                  }
            );
          }
        });
    }),
    Object.freeze(
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
    )
  );
}
var Kr =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function so(e) {
  if (e.__esModule) return e;
  var t = Object.defineProperty({}, "__esModule", { value: !0 });
  return (
    Object.keys(e).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        t,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    t
  );
}
function gt() {}
gt.prototype.addEventListener = function (e, t) {
  var r = (this.__events = this.__events || {}),
    i = (r[e] = r[e] || []);
  i.indexOf(t) < 0 && i.push(t);
};
gt.prototype.removeEventListener = function (e, t) {
  var r = (this.__events = this.__events || {}),
    i = r[e];
  if (i) {
    var n = i.indexOf(t);
    n >= 0 && i.splice(n, 1);
  }
};
gt.prototype.emit = function (e, t) {
  var r = (this.__events = this.__events || {}),
    i = r[e],
    n = Array.prototype.slice.call(arguments, 1);
  if (i)
    for (var s = 0; s < i.length; s++) {
      var a = i[s];
      a.apply(this, n);
    }
};
function ao(e) {
  for (var t in gt.prototype)
    gt.prototype.hasOwnProperty(t) && (e.prototype[t] = gt.prototype[t]);
}
var G = ao;
function oo() {
  return typeof performance != "undefined" && performance.now
    ? function () {
        return performance.now();
      }
    : function () {
        return Date.now();
      };
}
var ot = oo(),
  _n = ot;
function ho(e, t) {
  (this.fn = e), (this.cb = t), (this.cfn = null);
}
function Ne(e) {
  (this._queue = []),
    (this._delay = (e && e.delay) || 0),
    (this._paused = (e && !!e.paused) || !1),
    (this._currentTask = null),
    (this._lastFinished = null);
}
Ne.prototype.length = function () {
  return this._queue.length;
};
Ne.prototype.push = function (e, t) {
  var r = new ho(e, t),
    i = this._cancel.bind(this, r);
  return this._queue.push(r), this._next(), i;
};
Ne.prototype.pause = function () {
  this._paused || (this._paused = !0);
};
Ne.prototype.resume = function () {
  this._paused && ((this._paused = !1), this._next());
};
Ne.prototype._start = function (e) {
  if (this._currentTask)
    throw new Error("WorkQueue: called start while running task");
  this._currentTask = e;
  var t = this._finish.bind(this, e);
  if (((e.cfn = e.fn(t)), typeof e.cfn != "function"))
    throw new Error("WorkQueue: function is not cancellable");
};
Ne.prototype._finish = function (e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask !== e)
    throw new Error("WorkQueue: called finish on wrong task");
  e.cb.apply(null, t),
    (this._currentTask = null),
    (this._lastFinished = _n()),
    this._next();
};
Ne.prototype._cancel = function (e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask === e) e.cfn.apply(null, t);
  else {
    var r = this._queue.indexOf(e);
    r >= 0 && (this._queue.splice(r, 1), e.cb.apply(null, t));
  }
};
Ne.prototype._next = function () {
  if (!this._paused && !!this._queue.length && !this._currentTask) {
    if (this._lastFinished != null) {
      var e = _n() - this._lastFinished,
        t = this._delay - e;
      if (t > 0) {
        setTimeout(this._next.bind(this), t);
        return;
      }
    }
    var r = this._queue.shift();
    this._start(r);
  }
};
var mn = Ne;
function lo(e, t, r, i) {
  i = i || {};
  var n;
  r != null && r.absoluteWidth != null
    ? (n = r.absoluteWidth / e)
    : r != null && r.relativeWidth != null
    ? (n = r.relativeWidth)
    : (n = 1);
  var s;
  r && r.absoluteHeight != null
    ? (s = r.absoluteHeight / t)
    : r != null && r.relativeHeight != null
    ? (s = r.relativeHeight)
    : (s = 1);
  var a;
  r != null && r.absoluteX != null
    ? (a = r.absoluteX / e)
    : r != null && r.relativeX != null
    ? (a = r.relativeX)
    : (a = 0);
  var o;
  return (
    r != null && r.absoluteY != null
      ? (o = r.absoluteY / t)
      : r != null && r.relativeY != null
      ? (o = r.relativeY)
      : (o = 0),
    (i.x = a),
    (i.y = o),
    (i.width = n),
    (i.height = s),
    i
  );
}
var yn = lo;
function co(e) {
  return function (r) {
    var i, n;
    try {
      n = e();
    } catch (s) {
      i = s;
    } finally {
      i ? r(i) : r(null, n);
    }
  };
}
var gn = co;
function vo(e) {
  var t = !1,
    r;
  return function () {
    return t || ((t = !0), (r = e.apply(null, arguments))), r;
  };
}
var ri = vo,
  fo = ri;
function uo(e) {
  return function () {
    if (!arguments.length)
      throw new Error("cancelized: expected at least one argument");
    var r = Array.prototype.slice.call(arguments, 0),
      i = (r[r.length - 1] = fo(r[r.length - 1]));
    function n() {
      i.apply(null, arguments);
    }
    return e.apply(null, r), n;
  };
}
var wn = uo;
function po(e) {
  for (var t in e) e.hasOwnProperty(t) && (e[t] = void 0);
}
var U = po;
function ii() {
  this._renderers = {};
}
ii.prototype.set = function (e, t, r) {
  this._renderers[e] || (this._renderers[e] = {}), (this._renderers[e][t] = r);
};
ii.prototype.get = function (e, t) {
  var r = this._renderers[e] && this._renderers[e][t];
  return r || null;
};
var _o = ii,
  mo = G,
  yo = mn,
  go = yn,
  wo = gn,
  xo = wn,
  Mo = U,
  To = _o;
function Eo(e, t) {
  return e.cmp(t);
}
function bo(e, t) {
  return -e.cmp(t);
}
function Y(e) {
  (this._progressive = !!(e && e.progressive)),
    (this._layers = []),
    (this._renderers = []),
    (this._tilesToLoad = []),
    (this._tilesToRender = []),
    (this._tmpVisible = []),
    (this._tmpChildren = []),
    (this._width = 0),
    (this._height = 0),
    (this._tmpRect = {}),
    (this._tmpSize = {}),
    (this._createTextureWorkQueue = new yo()),
    (this._emitRenderInvalid = this._emitRenderInvalid.bind(this)),
    (this._rendererRegistry = new To());
}
mo(Y);
Y.prototype.destroy = function () {
  this.removeAllLayers(), Mo(this);
};
Y.prototype.registerRenderer = function (e, t, r) {
  return this._rendererRegistry.set(e, t, r);
};
Y.prototype.domElement = function () {
  throw new Error("Stage implementation must override domElement");
};
Y.prototype.width = function () {
  return this._width;
};
Y.prototype.height = function () {
  return this._height;
};
Y.prototype.size = function (e) {
  return (e = e || {}), (e.width = this._width), (e.height = this._height), e;
};
Y.prototype.setSize = function (e) {
  (this._width = e.width),
    (this._height = e.height),
    this.setSizeForType(),
    this.emit("resize"),
    this._emitRenderInvalid();
};
Y.prototype.setSizeForType = function (e) {
  throw new Error("Stage implementation must override setSizeForType");
};
Y.prototype.loadImage = function () {
  throw new Error("Stage implementation must override loadImage");
};
Y.prototype._emitRenderInvalid = function () {
  this.emit("renderInvalid");
};
Y.prototype.validateLayer = function (e) {
  throw new Error("Stage implementation must override validateLayer");
};
Y.prototype.listLayers = function () {
  return [].concat(this._layers);
};
Y.prototype.hasLayer = function (e) {
  return this._layers.indexOf(e) >= 0;
};
Y.prototype.addLayer = function (e, t) {
  if (this._layers.indexOf(e) >= 0) throw new Error("Layer already in stage");
  if (
    (t == null && (t = this._layers.length), t < 0 || t > this._layers.length)
  )
    throw new Error("Invalid layer position");
  this.validateLayer(e);
  var r = e.geometry().type,
    i = e.view().type,
    n = this._rendererRegistry.get(r, i);
  if (!n)
    throw new Error(
      "No " +
        this.type +
        " renderer avaiable for " +
        r +
        " geometry and " +
        i +
        " view"
    );
  var s = this.createRenderer(n);
  this._layers.splice(t, 0, e),
    this._renderers.splice(t, 0, s),
    e.addEventListener("viewChange", this._emitRenderInvalid),
    e.addEventListener("effectsChange", this._emitRenderInvalid),
    e.addEventListener("fixedLevelChange", this._emitRenderInvalid),
    e.addEventListener("textureStoreChange", this._emitRenderInvalid),
    this._emitRenderInvalid();
};
Y.prototype.moveLayer = function (e, t) {
  var r = this._layers.indexOf(e);
  if (r < 0) throw new Error("No such layer in stage");
  if (t < 0 || t >= this._layers.length)
    throw new Error("Invalid layer position");
  e = this._layers.splice(r, 1)[0];
  var i = this._renderers.splice(r, 1)[0];
  this._layers.splice(t, 0, e),
    this._renderers.splice(t, 0, i),
    this._emitRenderInvalid();
};
Y.prototype.removeLayer = function (e) {
  var t = this._layers.indexOf(e);
  if (t < 0) throw new Error("No such layer in stage");
  var r = this._layers.splice(t, 1)[0],
    i = this._renderers.splice(t, 1)[0];
  this.destroyRenderer(i),
    r.removeEventListener("viewChange", this._emitRenderInvalid),
    r.removeEventListener("effectsChange", this._emitRenderInvalid),
    r.removeEventListener("fixedLevelChange", this._emitRenderInvalid),
    r.removeEventListener("textureStoreChange", this._emitRenderInvalid),
    this._emitRenderInvalid();
};
Y.prototype.removeAllLayers = function () {
  for (; this._layers.length > 0; ) this.removeLayer(this._layers[0]);
};
Y.prototype.startFrame = function () {
  throw new Error("Stage implementation must override startFrame");
};
Y.prototype.endFrame = function () {
  throw new Error("Stage implementation must override endFrame");
};
Y.prototype.render = function () {
  var e,
    t,
    r = this._tilesToLoad,
    i = this._tilesToRender,
    n = !0,
    s,
    a = this._width,
    o = this._height,
    h = this._tmpRect,
    l = this._tmpSize;
  if (!(a <= 0 || o <= 0)) {
    for (this.startFrame(), e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().startFrame();
    for (e = 0; e < this._layers.length; e++) {
      var c = this._layers[e],
        f = c.effects(),
        d = c.view(),
        p = c.textureStore(),
        _ = this._renderers[e],
        w = this._layers.length - e,
        m,
        M;
      if ((go(a, o, f && f.rect, h), !(h.width <= 0 || h.height <= 0))) {
        for (
          l.width = h.width * this._width,
            l.height = h.height * this._height,
            d.setSize(l),
            _.startLayer(c, h),
            s = this._collectTiles(c, p),
            t = 0;
          t < r.length;
          t++
        )
          (m = r[t]), p.markTile(m);
        for (t = 0; t < i.length; t++)
          (m = i[t]), (M = p.texture(m)), _.renderTile(m, M, c, w);
        c.emit("renderComplete", s), s || (n = !1), _.endLayer(c, h);
      }
    }
    for (e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().endFrame();
    this.endFrame(), this.emit("renderComplete", n);
  }
};
Y.prototype._collectTiles = function (e, t) {
  var r = this._tilesToLoad,
    i = this._tilesToRender,
    n = this._tmpVisible;
  (r.length = 0), (i.length = 0), (n.length = 0), e.visibleTiles(n);
  for (var s = !0, a = 0; a < n.length; a++) {
    var o = n[a],
      h;
    this._collectTileToLoad(o),
      t.texture(o)
        ? ((h = !1), this._collectTileToRender(o))
        : ((h = this._collectChildren(o, t)), (s = !1)),
      this._collectParents(o, t, h);
  }
  return r.sort(Eo), i.sort(bo), s;
};
Y.prototype._collectChildren = function (e, t) {
  var r = this._tmpChildren,
    i = !0;
  do {
    if (((r.length = 0), !e.children(r))) break;
    i = !1;
    for (var n = 0; n < r.length; n++)
      (e = r[n]),
        t.texture(e)
          ? (this._collectTileToLoad(e), this._collectTileToRender(e))
          : (i = !0);
  } while (i && r.length === 1);
  return i;
};
Y.prototype._collectParents = function (e, t, r) {
  for (var i = this._progressive; (i || r) && (e = e.parent()) != null; ) {
    if (r) {
      if (t.texture(e)) this._collectTileToRender(e), (r = !1);
      else if (!this._progressive) continue;
    }
    this._collectTileToLoad(e) || (i = !1);
  }
  return r;
};
Y.prototype._collectTileToLoad = function (e) {
  return this._collectTileIntoList(e, this._tilesToLoad);
};
Y.prototype._collectTileToRender = function (e) {
  return this._collectTileIntoList(e, this._tilesToRender);
};
Y.prototype._collectTileIntoList = function (e, t) {
  for (var r = !1, i = 0; i < t.length; i++)
    if (e.equals(t[i])) {
      r = !0;
      break;
    }
  return r || t.push(e), !r;
};
Y.prototype.createTexture = function (e, t, r) {
  var i = this;
  function n() {
    return new i.TextureClass(i, e, t);
  }
  var s = xo(wo(n));
  return this._createTextureWorkQueue.push(s, function (a, o) {
    r(a, e, t, o);
  });
};
var So = Y,
  Co = (function () {
    return typeof window != "undefined"
      ? window
      : typeof self != "undefined"
      ? self
      : typeof Kr != "undefined"
      ? Kr
      : null;
  })(),
  xn = Co,
  qi = xn,
  $o = G,
  Lo = U,
  Dr = {
    HTMLImageElement: ["naturalWidth", "naturalHeight"],
    HTMLCanvasElement: ["width", "height"],
    ImageBitmap: ["width", "height"],
  };
function je(e) {
  var t = !1;
  for (var r in Dr)
    if (qi[r] && e instanceof qi[r]) {
      (t = !0), (this._widthProp = Dr[r][0]), (this._heightProp = Dr[r][1]);
      break;
    }
  if (!t) throw new Error("Unsupported pixel source");
  this._element = e;
}
$o(je);
je.prototype.destroy = function () {
  Lo(this);
};
je.prototype.element = function () {
  return this._element;
};
je.prototype.width = function () {
  return this._element[this._widthProp];
};
je.prototype.height = function () {
  return this._element[this._heightProp];
};
je.prototype.timestamp = function () {
  return 0;
};
je.prototype.isDynamic = function () {
  return !1;
};
var ni = je;
function Po(e, t) {
  e.super_ = t;
  var r = function () {};
  (r.prototype = t.prototype),
    (e.prototype = new r()),
    (e.prototype.constructor = e);
}
var Se = Po,
  zo = Se;
function Mn(e) {
  this.constructor.super_.apply(this, arguments), (this.message = e);
}
zo(Mn, Error);
var Tn = Mn,
  dr = { exports: {} };
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */ (function (e) {
  (function (t, r, i) {
    e.exports ? (e.exports = i()) : (t[r] = i());
  })(Kr, "bowser", function () {
    var t = !0;
    function r(l) {
      function c(xe) {
        var ve = l.match(xe);
        return (ve && ve.length > 1 && ve[1]) || "";
      }
      function f(xe) {
        var ve = l.match(xe);
        return (ve && ve.length > 1 && ve[2]) || "";
      }
      var d = c(/(ipod|iphone|ipad)/i).toLowerCase(),
        p = /like android/i.test(l),
        _ = !p && /android/i.test(l),
        w = /nexus\s*[0-6]\s*/i.test(l),
        m = !w && /nexus\s*[0-9]+/i.test(l),
        M = /CrOS/.test(l),
        b = /silk/i.test(l),
        S = /sailfish/i.test(l),
        C = /tizen/i.test(l),
        $ = /(web|hpw)(o|0)s/i.test(l),
        E = /windows phone/i.test(l);
      /SamsungBrowser/i.test(l);
      var O = !E && /windows/i.test(l),
        F = !d && !b && /macintosh/i.test(l),
        H = !_ && !S && !C && !$ && /linux/i.test(l),
        N = f(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
        R = c(/version\/(\d+(\.\d+)?)/i),
        V = /tablet/i.test(l) && !/tablet pc/i.test(l),
        B = !V && /[^-]mobi/i.test(l),
        z = /xbox/i.test(l),
        g;
      /opera/i.test(l)
        ? (g = {
            name: "Opera",
            opera: t,
            version: R || c(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i),
          })
        : /opr\/|opios/i.test(l)
        ? (g = {
            name: "Opera",
            opera: t,
            version: c(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || R,
          })
        : /SamsungBrowser/i.test(l)
        ? (g = {
            name: "Samsung Internet for Android",
            samsungBrowser: t,
            version: R || c(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i),
          })
        : /Whale/i.test(l)
        ? (g = {
            name: "NAVER Whale browser",
            whale: t,
            version: c(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /MZBrowser/i.test(l)
        ? (g = {
            name: "MZ Browser",
            mzbrowser: t,
            version: c(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /coast/i.test(l)
        ? (g = {
            name: "Opera Coast",
            coast: t,
            version: R || c(/(?:coast)[\s\/](\d+(\.\d+)?)/i),
          })
        : /focus/i.test(l)
        ? (g = {
            name: "Focus",
            focus: t,
            version: c(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /yabrowser/i.test(l)
        ? (g = {
            name: "Yandex Browser",
            yandexbrowser: t,
            version: R || c(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
          })
        : /ucbrowser/i.test(l)
        ? (g = {
            name: "UC Browser",
            ucbrowser: t,
            version: c(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /mxios/i.test(l)
        ? (g = {
            name: "Maxthon",
            maxthon: t,
            version: c(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /epiphany/i.test(l)
        ? (g = {
            name: "Epiphany",
            epiphany: t,
            version: c(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /puffin/i.test(l)
        ? (g = {
            name: "Puffin",
            puffin: t,
            version: c(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i),
          })
        : /sleipnir/i.test(l)
        ? (g = {
            name: "Sleipnir",
            sleipnir: t,
            version: c(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : /k-meleon/i.test(l)
        ? (g = {
            name: "K-Meleon",
            kMeleon: t,
            version: c(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i),
          })
        : E
        ? ((g = {
            name: "Windows Phone",
            osname: "Windows Phone",
            windowsphone: t,
          }),
          N
            ? ((g.msedge = t), (g.version = N))
            : ((g.msie = t), (g.version = c(/iemobile\/(\d+(\.\d+)?)/i))))
        : /msie|trident/i.test(l)
        ? (g = {
            name: "Internet Explorer",
            msie: t,
            version: c(/(?:msie |rv:)(\d+(\.\d+)?)/i),
          })
        : M
        ? (g = {
            name: "Chrome",
            osname: "Chrome OS",
            chromeos: t,
            chromeBook: t,
            chrome: t,
            version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
          })
        : /edg([ea]|ios)/i.test(l)
        ? (g = { name: "Microsoft Edge", msedge: t, version: N })
        : /vivaldi/i.test(l)
        ? (g = {
            name: "Vivaldi",
            vivaldi: t,
            version: c(/vivaldi\/(\d+(\.\d+)?)/i) || R,
          })
        : S
        ? (g = {
            name: "Sailfish",
            osname: "Sailfish OS",
            sailfish: t,
            version: c(/sailfish\s?browser\/(\d+(\.\d+)?)/i),
          })
        : /seamonkey\//i.test(l)
        ? (g = {
            name: "SeaMonkey",
            seamonkey: t,
            version: c(/seamonkey\/(\d+(\.\d+)?)/i),
          })
        : /firefox|iceweasel|fxios/i.test(l)
        ? ((g = {
            name: "Firefox",
            firefox: t,
            version: c(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i),
          }),
          /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(l) &&
            ((g.firefoxos = t), (g.osname = "Firefox OS")))
        : b
        ? (g = {
            name: "Amazon Silk",
            silk: t,
            version: c(/silk\/(\d+(\.\d+)?)/i),
          })
        : /phantom/i.test(l)
        ? (g = {
            name: "PhantomJS",
            phantom: t,
            version: c(/phantomjs\/(\d+(\.\d+)?)/i),
          })
        : /slimerjs/i.test(l)
        ? (g = {
            name: "SlimerJS",
            slimer: t,
            version: c(/slimerjs\/(\d+(\.\d+)?)/i),
          })
        : /blackberry|\bbb\d+/i.test(l) || /rim\stablet/i.test(l)
        ? (g = {
            name: "BlackBerry",
            osname: "BlackBerry OS",
            blackberry: t,
            version: R || c(/blackberry[\d]+\/(\d+(\.\d+)?)/i),
          })
        : $
        ? ((g = {
            name: "WebOS",
            osname: "WebOS",
            webos: t,
            version: R || c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i),
          }),
          /touchpad\//i.test(l) && (g.touchpad = t))
        : /bada/i.test(l)
        ? (g = {
            name: "Bada",
            osname: "Bada",
            bada: t,
            version: c(/dolfin\/(\d+(\.\d+)?)/i),
          })
        : C
        ? (g = {
            name: "Tizen",
            osname: "Tizen",
            tizen: t,
            version: c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || R,
          })
        : /qupzilla/i.test(l)
        ? (g = {
            name: "QupZilla",
            qupzilla: t,
            version: c(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || R,
          })
        : /chromium/i.test(l)
        ? (g = {
            name: "Chromium",
            chromium: t,
            version: c(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || R,
          })
        : /chrome|crios|crmo/i.test(l)
        ? (g = {
            name: "Chrome",
            chrome: t,
            version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
          })
        : _
        ? (g = { name: "Android", version: R })
        : /safari|applewebkit/i.test(l)
        ? ((g = { name: "Safari", safari: t }), R && (g.version = R))
        : d
        ? ((g = {
            name: d == "iphone" ? "iPhone" : d == "ipad" ? "iPad" : "iPod",
          }),
          R && (g.version = R))
        : /googlebot/i.test(l)
        ? (g = {
            name: "Googlebot",
            googlebot: t,
            version: c(/googlebot\/(\d+(\.\d+))/i) || R,
          })
        : (g = { name: c(/^(.*)\/(.*) /), version: f(/^(.*)\/(.*) /) }),
        !g.msedge && /(apple)?webkit/i.test(l)
          ? (/(apple)?webkit\/537\.36/i.test(l)
              ? ((g.name = g.name || "Blink"), (g.blink = t))
              : ((g.name = g.name || "Webkit"), (g.webkit = t)),
            !g.version && R && (g.version = R))
          : !g.opera &&
            /gecko\//i.test(l) &&
            ((g.name = g.name || "Gecko"),
            (g.gecko = t),
            (g.version = g.version || c(/gecko\/(\d+(\.\d+)?)/i))),
        !g.windowsphone && (_ || g.silk)
          ? ((g.android = t), (g.osname = "Android"))
          : !g.windowsphone && d
          ? ((g[d] = t), (g.ios = t), (g.osname = "iOS"))
          : F
          ? ((g.mac = t), (g.osname = "macOS"))
          : z
          ? ((g.xbox = t), (g.osname = "Xbox"))
          : O
          ? ((g.windows = t), (g.osname = "Windows"))
          : H && ((g.linux = t), (g.osname = "Linux"));
      function ze(xe) {
        switch (xe) {
          case "NT":
            return "NT";
          case "XP":
            return "XP";
          case "NT 5.0":
            return "2000";
          case "NT 5.1":
            return "XP";
          case "NT 5.2":
            return "2003";
          case "NT 6.0":
            return "Vista";
          case "NT 6.1":
            return "7";
          case "NT 6.2":
            return "8";
          case "NT 6.3":
            return "8.1";
          case "NT 10.0":
            return "10";
          default:
            return;
        }
      }
      var j = "";
      g.windows
        ? (j = ze(c(/Windows ((NT|XP)( \d\d?.\d)?)/i)))
        : g.windowsphone
        ? (j = c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i))
        : g.mac
        ? ((j = c(/Mac OS X (\d+([_\.\s]\d+)*)/i)),
          (j = j.replace(/[_\s]/g, ".")))
        : d
        ? ((j = c(/os (\d+([_\s]\d+)*) like mac os x/i)),
          (j = j.replace(/[_\s]/g, ".")))
        : _
        ? (j = c(/android[ \/-](\d+(\.\d+)*)/i))
        : g.webos
        ? (j = c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i))
        : g.blackberry
        ? (j = c(/rim\stablet\sos\s(\d+(\.\d+)*)/i))
        : g.bada
        ? (j = c(/bada\/(\d+(\.\d+)*)/i))
        : g.tizen && (j = c(/tizen[\/\s](\d+(\.\d+)*)/i)),
        j && (g.osversion = j);
      var Je = !g.windows && j.split(".")[0];
      return (
        V || m || d == "ipad" || (_ && (Je == 3 || (Je >= 4 && !B))) || g.silk
          ? (g.tablet = t)
          : (B ||
              d == "iphone" ||
              d == "ipod" ||
              _ ||
              w ||
              g.blackberry ||
              g.webos ||
              g.bada) &&
            (g.mobile = t),
        g.msedge ||
        (g.msie && g.version >= 10) ||
        (g.yandexbrowser && g.version >= 15) ||
        (g.vivaldi && g.version >= 1) ||
        (g.chrome && g.version >= 20) ||
        (g.samsungBrowser && g.version >= 4) ||
        (g.whale && a([g.version, "1.0"]) === 1) ||
        (g.mzbrowser && a([g.version, "6.0"]) === 1) ||
        (g.focus && a([g.version, "1.0"]) === 1) ||
        (g.firefox && g.version >= 20) ||
        (g.safari && g.version >= 6) ||
        (g.opera && g.version >= 10) ||
        (g.ios && g.osversion && g.osversion.split(".")[0] >= 6) ||
        (g.blackberry && g.version >= 10.1) ||
        (g.chromium && g.version >= 20)
          ? (g.a = t)
          : (g.msie && g.version < 10) ||
            (g.chrome && g.version < 20) ||
            (g.firefox && g.version < 20) ||
            (g.safari && g.version < 6) ||
            (g.opera && g.version < 10) ||
            (g.ios && g.osversion && g.osversion.split(".")[0] < 6) ||
            (g.chromium && g.version < 20)
          ? (g.c = t)
          : (g.x = t),
        g
      );
    }
    var i = r((typeof navigator != "undefined" && navigator.userAgent) || "");
    i.test = function (l) {
      for (var c = 0; c < l.length; ++c) {
        var f = l[c];
        if (typeof f == "string" && f in i) return !0;
      }
      return !1;
    };
    function n(l) {
      return l.split(".").length;
    }
    function s(l, c) {
      var f = [],
        d;
      if (Array.prototype.map) return Array.prototype.map.call(l, c);
      for (d = 0; d < l.length; d++) f.push(c(l[d]));
      return f;
    }
    function a(l) {
      for (
        var c = Math.max(n(l[0]), n(l[1])),
          f = s(l, function (d) {
            var p = c - n(d);
            return (
              (d = d + new Array(p + 1).join(".0")),
              s(d.split("."), function (_) {
                return new Array(20 - _.length).join("0") + _;
              }).reverse()
            );
          });
        --c >= 0;

      ) {
        if (f[0][c] > f[1][c]) return 1;
        if (f[0][c] === f[1][c]) {
          if (c === 0) return 0;
        } else return -1;
      }
    }
    function o(l, c, f) {
      var d = i;
      typeof c == "string" && ((f = c), (c = void 0)),
        c === void 0 && (c = !1),
        f && (d = r(f));
      var p = "" + d.version;
      for (var _ in l)
        if (l.hasOwnProperty(_) && d[_]) {
          if (typeof l[_] != "string")
            throw new Error(
              "Browser version in the minVersion map should be a string: " +
                _ +
                ": " +
                String(l)
            );
          return a([p, l[_]]) < 0;
        }
      return c;
    }
    function h(l, c, f) {
      return !o(l, c, f);
    }
    return (
      (i.isUnsupportedBrowser = o),
      (i.compareVersions = a),
      (i.check = h),
      (i._detect = r),
      (i.detect = r),
      i
    );
  });
})(dr);
var Hr = ni,
  Ao = Tn,
  Ro = dr.exports,
  En = xn,
  Io = ri,
  Oo = !!En.createImageBitmap && !Ro.firefox,
  Do = { imageOrientation: "flipY", premultiplyAlpha: "premultiply" };
function pr(e) {
  this._stage = e;
}
pr.prototype.loadImage = function (e, t, r) {
  var i = this,
    n = new Image();
  n.crossOrigin = "anonymous";
  var s = (t && t.x) || 0,
    a = (t && t.y) || 0,
    o = (t && t.width) || 1,
    h = (t && t.height) || 1;
  (r = Io(r)),
    (n.onload = function () {
      i._handleLoad(n, s, a, o, h, r);
    }),
    (n.onerror = function () {
      i._handleError(e, r);
    }),
    (n.src = e);
  function l() {
    (n.onload = n.onerror = null), (n.src = ""), r.apply(null, arguments);
  }
  return l;
};
pr.prototype._handleLoad = function (e, t, r, i, n, s) {
  if (t === 0 && r === 0 && i === 1 && n === 1) {
    s(null, new Hr(e));
    return;
  }
  if (
    ((t *= e.naturalWidth),
    (r *= e.naturalHeight),
    (i *= e.naturalWidth),
    (n *= e.naturalHeight),
    Oo)
  )
    En.createImageBitmap(e, t, r, i, n, Do).then(function (h) {
      s(null, new Hr(h));
    });
  else {
    var a = document.createElement("canvas");
    (a.width = i), (a.height = n);
    var o = a.getContext("2d");
    o.drawImage(e, t, r, i, n, 0, 0, i, n), s(null, new Hr(a));
  }
};
pr.prototype._handleError = function (e, t) {
  t(new Ao("Network error: " + e));
};
var Ho = pr,
  No = 1;
function Fo() {
  if (typeof window != "undefined") {
    if (window.devicePixelRatio) return window.devicePixelRatio;
    var e = window.screen;
    if (e && e.deviceXDPI && e.logicalXDPI) return e.deviceXDPI / e.logicalXDPI;
    if (e && e.systemXDPI && e.logicalXDPI) return e.systemXDPI / e.logicalXDPI;
  }
  return No;
}
var _r = Fo;
function Vo(e) {
  return (e & (e - 1)) == 0;
}
var qo = Vo;
function si(e) {
  for (
    var t = document.documentElement.style,
      r = ["Moz", "Webkit", "Khtml", "O", "ms"],
      i = 0;
    i < r.length;
    i++
  ) {
    var n = r[i],
      s = e[0].toUpperCase() + e.slice(1),
      a = n + s;
    if (a in t) return a;
  }
  return e;
}
function ko(e) {
  var t = si(e);
  return function (i) {
    return i.style[t];
  };
}
function ai(e) {
  var t = si(e);
  return function (i, n) {
    return (i.style[t] = n);
  };
}
var bn = ai("transform"),
  Sn = ai("transformOrigin");
function Wo(e) {
  bn(e, "translateZ(0)");
}
function Yo(e) {
  Sn(e, "0 0 0");
}
function Xo(e) {
  e.style.position = "absolute";
}
function Bo(e, t, r) {
  (e.style.left = t + "px"), (e.style.top = r + "px");
}
function Uo(e, t, r) {
  (e.style.width = t + "px"), (e.style.height = r + "px");
}
function jo(e) {
  e.style.width = e.style.height = 0;
}
function Go(e) {
  e.style.width = e.style.height = "100%";
}
function Zo(e) {
  e.style.overflow = "hidden";
}
function Ko(e) {
  e.style.overflow = "visible";
}
function Qo(e) {
  e.style.pointerEvents = "none";
}
var ce = {
    prefixProperty: si,
    getWithVendorPrefix: ko,
    setWithVendorPrefix: ai,
    setTransform: bn,
    setTransformOrigin: Sn,
    setNullTransform: Wo,
    setNullTransformOrigin: Yo,
    setAbsolute: Xo,
    setPixelPosition: Bo,
    setPixelSize: Uo,
    setNullSize: jo,
    setFullSize: Go,
    setOverflowHidden: Zo,
    setOverflowVisible: Ko,
    setNoPointerEvents: Qo,
  },
  Jo = So,
  eh = Ho,
  th = dr.exports,
  rh = Se,
  ih = _r,
  ki = qo,
  nh = ce.setAbsolute,
  sh = ce.setFullSize,
  ah = U,
  oh = { videoUseTexImage2D: th.chrome };
function hh(e, t) {
  var r = {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !!(t && t.antialias),
      preserveDrawingBuffer: !!(t && t.preserveDrawingBuffer),
    },
    i =
      e.getContext &&
      (e.getContext("webgl", r) || e.getContext("experimental-webgl", r));
  if (!i) throw new Error("Could not get WebGL context");
  return t.wrapContext && (i = t.wrapContext(i)), i;
}
function ee(e) {
  e = e || {};
  var t = this;
  this.constructor.super_.call(this, e),
    (this._generateMipmaps =
      e.generateMipmaps != null ? e.generateMipmaps : !1),
    (this._loader = new eh(this)),
    (this._domElement = document.createElement("canvas")),
    nh(this._domElement),
    sh(this._domElement),
    (this._gl = hh(this._domElement, e)),
    (this._handleContextLoss = function () {
      t.emit("webglcontextlost"), (t._gl = null);
    }),
    this._domElement.addEventListener(
      "webglcontextlost",
      this._handleContextLoss
    ),
    (this._rendererInstances = []);
}
rh(ee, Jo);
ee.prototype.destroy = function () {
  this._domElement.removeEventListener(
    "webglcontextlost",
    this._handleContextLoss
  ),
    this.constructor.super_.prototype.destroy.call(this);
};
ee.prototype.domElement = function () {
  return this._domElement;
};
ee.prototype.webGlContext = function () {
  return this._gl;
};
ee.prototype.setSizeForType = function () {
  var e = ih();
  (this._domElement.width = e * this._width),
    (this._domElement.height = e * this._height);
};
ee.prototype.loadImage = function (e, t, r) {
  return this._loader.loadImage(e, t, r);
};
ee.prototype.maxTextureSize = function () {
  return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
};
ee.prototype.validateLayer = function (e) {
  var t = e.geometry().maxTileSize(),
    r = this.maxTextureSize();
  if (t > r)
    throw new Error(
      "Layer has level with tile size larger than maximum texture size (" +
        t +
        " vs. " +
        r +
        ")"
    );
};
ee.prototype.createRenderer = function (e) {
  for (var t = this._rendererInstances, r = 0; r < t.length; r++)
    if (t[r] instanceof e) return t[r];
  var i = new e(this._gl);
  return t.push(i), i;
};
ee.prototype.destroyRenderer = function (e) {
  var t = this._rendererInstances;
  if (this._renderers.indexOf(e) < 0) {
    e.destroy();
    var r = t.indexOf(e);
    r >= 0 && t.splice(r, 1);
  }
};
ee.prototype.startFrame = function () {
  var e = this._gl;
  if (!e) throw new Error("Bad WebGL context - maybe context was lost?");
  e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight),
    e.clearColor(0, 0, 0, 0),
    e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
    e.enable(e.DEPTH_TEST),
    e.enable(e.BLEND),
    e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
};
ee.prototype.endFrame = function () {};
ee.prototype.takeSnapshot = function (e) {
  (typeof e != "object" || e == null) && (e = {});
  var t = e.quality;
  if (
    (typeof t == "undefined" && (t = 75),
    typeof t != "number" || t < 0 || t > 100)
  )
    throw new Error(
      "WebGLStage: Snapshot quality needs to be a number between 0 and 100"
    );
  return this.render(), this._domElement.toDataURL("image/jpeg", t / 100);
};
ee.type = ee.prototype.type = "webgl";
function oi(e, t, r) {
  (this._stage = e),
    (this._gl = e._gl),
    (this._texture = null),
    (this._timestamp = null),
    (this._width = this._height = null),
    this.refresh(t, r);
}
oi.prototype.refresh = function (e, t) {
  var r = this._gl,
    i = this._stage,
    n,
    s = t.timestamp();
  if (s !== this._timestamp) {
    var a = t.element(),
      o = t.width(),
      h = t.height();
    if (o !== this._width || h !== this._height) {
      var l = i.maxTextureSize();
      if (o > l)
        throw new Error(
          "Texture width larger than max size (" + o + " vs. " + l + ")"
        );
      if (h > l)
        throw new Error(
          "Texture height larger than max size (" + h + " vs. " + l + ")"
        );
      this._texture && r.deleteTexture(n),
        (n = this._texture = r.createTexture()),
        r.bindTexture(r.TEXTURE_2D, n),
        r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0),
        r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
        r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, a);
    } else
      (n = this._texture),
        r.bindTexture(r.TEXTURE_2D, n),
        r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0),
        r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
        a instanceof HTMLVideoElement && oh.videoUseTexImage2D
          ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, a)
          : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, a);
    i._generateMipmaps && ki(o) && ki(h)
      ? (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR),
        r.texParameteri(
          r.TEXTURE_2D,
          r.TEXTURE_MIN_FILTER,
          r.LINEAR_MIPMAP_LINEAR
        ),
        r.generateMipmap(r.TEXTURE_2D))
      : (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR),
        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR)),
      r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE),
      r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE),
      r.bindTexture(r.TEXTURE_2D, null),
      (this._timestamp = s),
      (this._width = o),
      (this._height = h);
  }
};
oi.prototype.destroy = function () {
  this._texture && this._gl.deleteTexture(this._texture), ah(this);
};
ee.TextureClass = ee.prototype.TextureClass = oi;
var Cn = ee,
  L = 1e-6,
  I = typeof Float32Array != "undefined" ? Float32Array : Array,
  ge = Math.random;
function lh(e) {
  I = e;
}
var ch = Math.PI / 180;
function vh(e) {
  return e * ch;
}
function fh(e, t) {
  return Math.abs(e - t) <= L * Math.max(1, Math.abs(e), Math.abs(t));
}
Math.hypot ||
  (Math.hypot = function () {
    for (var e = 0, t = arguments.length; t--; )
      e += arguments[t] * arguments[t];
    return Math.sqrt(e);
  });
var uh = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      EPSILON: L,
      get ARRAY_TYPE() {
        return I;
      },
      RANDOM: ge,
      setMatrixArrayType: lh,
      toRadian: vh,
      equals: fh,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function dh() {
  var e = new I(4);
  return (
    I != Float32Array && ((e[1] = 0), (e[2] = 0)), (e[0] = 1), (e[3] = 1), e
  );
}
function ph(e) {
  var t = new I(4);
  return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
}
function _h(e, t) {
  return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
}
function mh(e) {
  return (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
}
function yh(e, t, r, i) {
  var n = new I(4);
  return (n[0] = e), (n[1] = t), (n[2] = r), (n[3] = i), n;
}
function gh(e, t, r, i, n) {
  return (e[0] = t), (e[1] = r), (e[2] = i), (e[3] = n), e;
}
function wh(e, t) {
  if (e === t) {
    var r = t[1];
    (e[1] = t[2]), (e[2] = r);
  } else (e[0] = t[0]), (e[1] = t[2]), (e[2] = t[1]), (e[3] = t[3]);
  return e;
}
function xh(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = r * s - n * i;
  return a
    ? ((a = 1 / a),
      (e[0] = s * a),
      (e[1] = -i * a),
      (e[2] = -n * a),
      (e[3] = r * a),
      e)
    : null;
}
function Mh(e, t) {
  var r = t[0];
  return (e[0] = t[3]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = r), e;
}
function Th(e) {
  return e[0] * e[3] - e[2] * e[1];
}
function $n(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = r[0],
    h = r[1],
    l = r[2],
    c = r[3];
  return (
    (e[0] = i * o + s * h),
    (e[1] = n * o + a * h),
    (e[2] = i * l + s * c),
    (e[3] = n * l + a * c),
    e
  );
}
function Eh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = Math.sin(r),
    h = Math.cos(r);
  return (
    (e[0] = i * h + s * o),
    (e[1] = n * h + a * o),
    (e[2] = i * -o + s * h),
    (e[3] = n * -o + a * h),
    e
  );
}
function bh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = r[0],
    h = r[1];
  return (e[0] = i * o), (e[1] = n * o), (e[2] = s * h), (e[3] = a * h), e;
}
function Sh(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return (e[0] = i), (e[1] = r), (e[2] = -r), (e[3] = i), e;
}
function Ch(e, t) {
  return (e[0] = t[0]), (e[1] = 0), (e[2] = 0), (e[3] = t[1]), e;
}
function $h(e) {
  return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function Lh(e) {
  return Math.hypot(e[0], e[1], e[2], e[3]);
}
function Ph(e, t, r, i) {
  return (
    (e[2] = i[2] / i[0]),
    (r[0] = i[0]),
    (r[1] = i[1]),
    (r[3] = i[3] - e[2] * r[1]),
    [e, t, r]
  );
}
function zh(e, t, r) {
  return (
    (e[0] = t[0] + r[0]),
    (e[1] = t[1] + r[1]),
    (e[2] = t[2] + r[2]),
    (e[3] = t[3] + r[3]),
    e
  );
}
function Ln(e, t, r) {
  return (
    (e[0] = t[0] - r[0]),
    (e[1] = t[1] - r[1]),
    (e[2] = t[2] - r[2]),
    (e[3] = t[3] - r[3]),
    e
  );
}
function Ah(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function Rh(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    a = t[0],
    o = t[1],
    h = t[2],
    l = t[3];
  return (
    Math.abs(r - a) <= L * Math.max(1, Math.abs(r), Math.abs(a)) &&
    Math.abs(i - o) <= L * Math.max(1, Math.abs(i), Math.abs(o)) &&
    Math.abs(n - h) <= L * Math.max(1, Math.abs(n), Math.abs(h)) &&
    Math.abs(s - l) <= L * Math.max(1, Math.abs(s), Math.abs(l))
  );
}
function Ih(e, t, r) {
  return (
    (e[0] = t[0] * r),
    (e[1] = t[1] * r),
    (e[2] = t[2] * r),
    (e[3] = t[3] * r),
    e
  );
}
function Oh(e, t, r, i) {
  return (
    (e[0] = t[0] + r[0] * i),
    (e[1] = t[1] + r[1] * i),
    (e[2] = t[2] + r[2] * i),
    (e[3] = t[3] + r[3] * i),
    e
  );
}
var Dh = $n,
  Hh = Ln,
  Nh = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: dh,
        clone: ph,
        copy: _h,
        identity: mh,
        fromValues: yh,
        set: gh,
        transpose: wh,
        invert: xh,
        adjoint: Mh,
        determinant: Th,
        multiply: $n,
        rotate: Eh,
        scale: bh,
        fromRotation: Sh,
        fromScaling: Ch,
        str: $h,
        frob: Lh,
        LDU: Ph,
        add: zh,
        subtract: Ln,
        exactEquals: Ah,
        equals: Rh,
        multiplyScalar: Ih,
        multiplyScalarAndAdd: Oh,
        mul: Dh,
        sub: Hh,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function Fh() {
  var e = new I(6);
  return (
    I != Float32Array && ((e[1] = 0), (e[2] = 0), (e[4] = 0), (e[5] = 0)),
    (e[0] = 1),
    (e[3] = 1),
    e
  );
}
function Vh(e) {
  var t = new I(6);
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[3]),
    (t[4] = e[4]),
    (t[5] = e[5]),
    t
  );
}
function qh(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = t[4]),
    (e[5] = t[5]),
    e
  );
}
function kh(e) {
  return (
    (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 1), (e[4] = 0), (e[5] = 0), e
  );
}
function Wh(e, t, r, i, n, s) {
  var a = new I(6);
  return (
    (a[0] = e), (a[1] = t), (a[2] = r), (a[3] = i), (a[4] = n), (a[5] = s), a
  );
}
function Yh(e, t, r, i, n, s, a) {
  return (
    (e[0] = t), (e[1] = r), (e[2] = i), (e[3] = n), (e[4] = s), (e[5] = a), e
  );
}
function Xh(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = t[4],
    o = t[5],
    h = r * s - i * n;
  return h
    ? ((h = 1 / h),
      (e[0] = s * h),
      (e[1] = -i * h),
      (e[2] = -n * h),
      (e[3] = r * h),
      (e[4] = (n * o - s * a) * h),
      (e[5] = (i * a - r * o) * h),
      e)
    : null;
}
function Bh(e) {
  return e[0] * e[3] - e[1] * e[2];
}
function Pn(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = r[0],
    c = r[1],
    f = r[2],
    d = r[3],
    p = r[4],
    _ = r[5];
  return (
    (e[0] = i * l + s * c),
    (e[1] = n * l + a * c),
    (e[2] = i * f + s * d),
    (e[3] = n * f + a * d),
    (e[4] = i * p + s * _ + o),
    (e[5] = n * p + a * _ + h),
    e
  );
}
function Uh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = Math.sin(r),
    c = Math.cos(r);
  return (
    (e[0] = i * c + s * l),
    (e[1] = n * c + a * l),
    (e[2] = i * -l + s * c),
    (e[3] = n * -l + a * c),
    (e[4] = o),
    (e[5] = h),
    e
  );
}
function jh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = r[0],
    c = r[1];
  return (
    (e[0] = i * l),
    (e[1] = n * l),
    (e[2] = s * c),
    (e[3] = a * c),
    (e[4] = o),
    (e[5] = h),
    e
  );
}
function Gh(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = r[0],
    c = r[1];
  return (
    (e[0] = i),
    (e[1] = n),
    (e[2] = s),
    (e[3] = a),
    (e[4] = i * l + s * c + o),
    (e[5] = n * l + a * c + h),
    e
  );
}
function Zh(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return (
    (e[0] = i), (e[1] = r), (e[2] = -r), (e[3] = i), (e[4] = 0), (e[5] = 0), e
  );
}
function Kh(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = t[1]),
    (e[4] = 0),
    (e[5] = 0),
    e
  );
}
function Qh(e, t) {
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 1),
    (e[4] = t[0]),
    (e[5] = t[1]),
    e
  );
}
function Jh(e) {
  return (
    "mat2d(" +
    e[0] +
    ", " +
    e[1] +
    ", " +
    e[2] +
    ", " +
    e[3] +
    ", " +
    e[4] +
    ", " +
    e[5] +
    ")"
  );
}
function el(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1);
}
function tl(e, t, r) {
  return (
    (e[0] = t[0] + r[0]),
    (e[1] = t[1] + r[1]),
    (e[2] = t[2] + r[2]),
    (e[3] = t[3] + r[3]),
    (e[4] = t[4] + r[4]),
    (e[5] = t[5] + r[5]),
    e
  );
}
function zn(e, t, r) {
  return (
    (e[0] = t[0] - r[0]),
    (e[1] = t[1] - r[1]),
    (e[2] = t[2] - r[2]),
    (e[3] = t[3] - r[3]),
    (e[4] = t[4] - r[4]),
    (e[5] = t[5] - r[5]),
    e
  );
}
function rl(e, t, r) {
  return (
    (e[0] = t[0] * r),
    (e[1] = t[1] * r),
    (e[2] = t[2] * r),
    (e[3] = t[3] * r),
    (e[4] = t[4] * r),
    (e[5] = t[5] * r),
    e
  );
}
function il(e, t, r, i) {
  return (
    (e[0] = t[0] + r[0] * i),
    (e[1] = t[1] + r[1] * i),
    (e[2] = t[2] + r[2] * i),
    (e[3] = t[3] + r[3] * i),
    (e[4] = t[4] + r[4] * i),
    (e[5] = t[5] + r[5] * i),
    e
  );
}
function nl(e, t) {
  return (
    e[0] === t[0] &&
    e[1] === t[1] &&
    e[2] === t[2] &&
    e[3] === t[3] &&
    e[4] === t[4] &&
    e[5] === t[5]
  );
}
function sl(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    a = e[4],
    o = e[5],
    h = t[0],
    l = t[1],
    c = t[2],
    f = t[3],
    d = t[4],
    p = t[5];
  return (
    Math.abs(r - h) <= L * Math.max(1, Math.abs(r), Math.abs(h)) &&
    Math.abs(i - l) <= L * Math.max(1, Math.abs(i), Math.abs(l)) &&
    Math.abs(n - c) <= L * Math.max(1, Math.abs(n), Math.abs(c)) &&
    Math.abs(s - f) <= L * Math.max(1, Math.abs(s), Math.abs(f)) &&
    Math.abs(a - d) <= L * Math.max(1, Math.abs(a), Math.abs(d)) &&
    Math.abs(o - p) <= L * Math.max(1, Math.abs(o), Math.abs(p))
  );
}
var al = Pn,
  ol = zn,
  hl = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: Fh,
        clone: Vh,
        copy: qh,
        identity: kh,
        fromValues: Wh,
        set: Yh,
        invert: Xh,
        determinant: Bh,
        multiply: Pn,
        rotate: Uh,
        scale: jh,
        translate: Gh,
        fromRotation: Zh,
        fromScaling: Kh,
        fromTranslation: Qh,
        str: Jh,
        frob: el,
        add: tl,
        subtract: zn,
        multiplyScalar: rl,
        multiplyScalarAndAdd: il,
        exactEquals: nl,
        equals: sl,
        mul: al,
        sub: ol,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function An() {
  var e = new I(9);
  return (
    I != Float32Array &&
      ((e[1] = 0), (e[2] = 0), (e[3] = 0), (e[5] = 0), (e[6] = 0), (e[7] = 0)),
    (e[0] = 1),
    (e[4] = 1),
    (e[8] = 1),
    e
  );
}
function ll(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[4]),
    (e[4] = t[5]),
    (e[5] = t[6]),
    (e[6] = t[8]),
    (e[7] = t[9]),
    (e[8] = t[10]),
    e
  );
}
function cl(e) {
  var t = new I(9);
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[3]),
    (t[4] = e[4]),
    (t[5] = e[5]),
    (t[6] = e[6]),
    (t[7] = e[7]),
    (t[8] = e[8]),
    t
  );
}
function vl(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = t[4]),
    (e[5] = t[5]),
    (e[6] = t[6]),
    (e[7] = t[7]),
    (e[8] = t[8]),
    e
  );
}
function fl(e, t, r, i, n, s, a, o, h) {
  var l = new I(9);
  return (
    (l[0] = e),
    (l[1] = t),
    (l[2] = r),
    (l[3] = i),
    (l[4] = n),
    (l[5] = s),
    (l[6] = a),
    (l[7] = o),
    (l[8] = h),
    l
  );
}
function ul(e, t, r, i, n, s, a, o, h, l) {
  return (
    (e[0] = t),
    (e[1] = r),
    (e[2] = i),
    (e[3] = n),
    (e[4] = s),
    (e[5] = a),
    (e[6] = o),
    (e[7] = h),
    (e[8] = l),
    e
  );
}
function dl(e) {
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 1),
    (e[5] = 0),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 1),
    e
  );
}
function pl(e, t) {
  if (e === t) {
    var r = t[1],
      i = t[2],
      n = t[5];
    (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = r),
      (e[5] = t[7]),
      (e[6] = i),
      (e[7] = n);
  } else
    (e[0] = t[0]),
      (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = t[1]),
      (e[4] = t[4]),
      (e[5] = t[7]),
      (e[6] = t[2]),
      (e[7] = t[5]),
      (e[8] = t[8]);
  return e;
}
function _l(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = t[4],
    o = t[5],
    h = t[6],
    l = t[7],
    c = t[8],
    f = c * a - o * l,
    d = -c * s + o * h,
    p = l * s - a * h,
    _ = r * f + i * d + n * p;
  return _
    ? ((_ = 1 / _),
      (e[0] = f * _),
      (e[1] = (-c * i + n * l) * _),
      (e[2] = (o * i - n * a) * _),
      (e[3] = d * _),
      (e[4] = (c * r - n * h) * _),
      (e[5] = (-o * r + n * s) * _),
      (e[6] = p * _),
      (e[7] = (-l * r + i * h) * _),
      (e[8] = (a * r - i * s) * _),
      e)
    : null;
}
function ml(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = t[4],
    o = t[5],
    h = t[6],
    l = t[7],
    c = t[8];
  return (
    (e[0] = a * c - o * l),
    (e[1] = n * l - i * c),
    (e[2] = i * o - n * a),
    (e[3] = o * h - s * c),
    (e[4] = r * c - n * h),
    (e[5] = n * s - r * o),
    (e[6] = s * l - a * h),
    (e[7] = i * h - r * l),
    (e[8] = r * a - i * s),
    e
  );
}
function yl(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3],
    s = e[4],
    a = e[5],
    o = e[6],
    h = e[7],
    l = e[8];
  return t * (l * s - a * h) + r * (-l * n + a * o) + i * (h * n - s * o);
}
function Rn(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = t[8],
    d = r[0],
    p = r[1],
    _ = r[2],
    w = r[3],
    m = r[4],
    M = r[5],
    b = r[6],
    S = r[7],
    C = r[8];
  return (
    (e[0] = d * i + p * a + _ * l),
    (e[1] = d * n + p * o + _ * c),
    (e[2] = d * s + p * h + _ * f),
    (e[3] = w * i + m * a + M * l),
    (e[4] = w * n + m * o + M * c),
    (e[5] = w * s + m * h + M * f),
    (e[6] = b * i + S * a + C * l),
    (e[7] = b * n + S * o + C * c),
    (e[8] = b * s + S * h + C * f),
    e
  );
}
function gl(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = t[8],
    d = r[0],
    p = r[1];
  return (
    (e[0] = i),
    (e[1] = n),
    (e[2] = s),
    (e[3] = a),
    (e[4] = o),
    (e[5] = h),
    (e[6] = d * i + p * a + l),
    (e[7] = d * n + p * o + c),
    (e[8] = d * s + p * h + f),
    e
  );
}
function wl(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = t[8],
    d = Math.sin(r),
    p = Math.cos(r);
  return (
    (e[0] = p * i + d * a),
    (e[1] = p * n + d * o),
    (e[2] = p * s + d * h),
    (e[3] = p * a - d * i),
    (e[4] = p * o - d * n),
    (e[5] = p * h - d * s),
    (e[6] = l),
    (e[7] = c),
    (e[8] = f),
    e
  );
}
function xl(e, t, r) {
  var i = r[0],
    n = r[1];
  return (
    (e[0] = i * t[0]),
    (e[1] = i * t[1]),
    (e[2] = i * t[2]),
    (e[3] = n * t[3]),
    (e[4] = n * t[4]),
    (e[5] = n * t[5]),
    (e[6] = t[6]),
    (e[7] = t[7]),
    (e[8] = t[8]),
    e
  );
}
function Ml(e, t) {
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 1),
    (e[5] = 0),
    (e[6] = t[0]),
    (e[7] = t[1]),
    (e[8] = 1),
    e
  );
}
function Tl(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return (
    (e[0] = i),
    (e[1] = r),
    (e[2] = 0),
    (e[3] = -r),
    (e[4] = i),
    (e[5] = 0),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 1),
    e
  );
}
function El(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = t[1]),
    (e[5] = 0),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 1),
    e
  );
}
function bl(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = 0),
    (e[3] = t[2]),
    (e[4] = t[3]),
    (e[5] = 0),
    (e[6] = t[4]),
    (e[7] = t[5]),
    (e[8] = 1),
    e
  );
}
function Sl(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = r + r,
    o = i + i,
    h = n + n,
    l = r * a,
    c = i * a,
    f = i * o,
    d = n * a,
    p = n * o,
    _ = n * h,
    w = s * a,
    m = s * o,
    M = s * h;
  return (
    (e[0] = 1 - f - _),
    (e[3] = c - M),
    (e[6] = d + m),
    (e[1] = c + M),
    (e[4] = 1 - l - _),
    (e[7] = p - w),
    (e[2] = d - m),
    (e[5] = p + w),
    (e[8] = 1 - l - f),
    e
  );
}
function Cl(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = t[4],
    o = t[5],
    h = t[6],
    l = t[7],
    c = t[8],
    f = t[9],
    d = t[10],
    p = t[11],
    _ = t[12],
    w = t[13],
    m = t[14],
    M = t[15],
    b = r * o - i * a,
    S = r * h - n * a,
    C = r * l - s * a,
    $ = i * h - n * o,
    E = i * l - s * o,
    O = n * l - s * h,
    F = c * w - f * _,
    H = c * m - d * _,
    N = c * M - p * _,
    R = f * m - d * w,
    V = f * M - p * w,
    B = d * M - p * m,
    z = b * B - S * V + C * R + $ * N - E * H + O * F;
  return z
    ? ((z = 1 / z),
      (e[0] = (o * B - h * V + l * R) * z),
      (e[1] = (h * N - a * B - l * H) * z),
      (e[2] = (a * V - o * N + l * F) * z),
      (e[3] = (n * V - i * B - s * R) * z),
      (e[4] = (r * B - n * N + s * H) * z),
      (e[5] = (i * N - r * V - s * F) * z),
      (e[6] = (w * O - m * E + M * $) * z),
      (e[7] = (m * C - _ * O - M * S) * z),
      (e[8] = (_ * E - w * C + M * b) * z),
      e)
    : null;
}
function $l(e, t, r) {
  return (
    (e[0] = 2 / t),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = -2 / r),
    (e[5] = 0),
    (e[6] = -1),
    (e[7] = 1),
    (e[8] = 1),
    e
  );
}
function Ll(e) {
  return (
    "mat3(" +
    e[0] +
    ", " +
    e[1] +
    ", " +
    e[2] +
    ", " +
    e[3] +
    ", " +
    e[4] +
    ", " +
    e[5] +
    ", " +
    e[6] +
    ", " +
    e[7] +
    ", " +
    e[8] +
    ")"
  );
}
function Pl(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
}
function zl(e, t, r) {
  return (
    (e[0] = t[0] + r[0]),
    (e[1] = t[1] + r[1]),
    (e[2] = t[2] + r[2]),
    (e[3] = t[3] + r[3]),
    (e[4] = t[4] + r[4]),
    (e[5] = t[5] + r[5]),
    (e[6] = t[6] + r[6]),
    (e[7] = t[7] + r[7]),
    (e[8] = t[8] + r[8]),
    e
  );
}
function In(e, t, r) {
  return (
    (e[0] = t[0] - r[0]),
    (e[1] = t[1] - r[1]),
    (e[2] = t[2] - r[2]),
    (e[3] = t[3] - r[3]),
    (e[4] = t[4] - r[4]),
    (e[5] = t[5] - r[5]),
    (e[6] = t[6] - r[6]),
    (e[7] = t[7] - r[7]),
    (e[8] = t[8] - r[8]),
    e
  );
}
function Al(e, t, r) {
  return (
    (e[0] = t[0] * r),
    (e[1] = t[1] * r),
    (e[2] = t[2] * r),
    (e[3] = t[3] * r),
    (e[4] = t[4] * r),
    (e[5] = t[5] * r),
    (e[6] = t[6] * r),
    (e[7] = t[7] * r),
    (e[8] = t[8] * r),
    e
  );
}
function Rl(e, t, r, i) {
  return (
    (e[0] = t[0] + r[0] * i),
    (e[1] = t[1] + r[1] * i),
    (e[2] = t[2] + r[2] * i),
    (e[3] = t[3] + r[3] * i),
    (e[4] = t[4] + r[4] * i),
    (e[5] = t[5] + r[5] * i),
    (e[6] = t[6] + r[6] * i),
    (e[7] = t[7] + r[7] * i),
    (e[8] = t[8] + r[8] * i),
    e
  );
}
function Il(e, t) {
  return (
    e[0] === t[0] &&
    e[1] === t[1] &&
    e[2] === t[2] &&
    e[3] === t[3] &&
    e[4] === t[4] &&
    e[5] === t[5] &&
    e[6] === t[6] &&
    e[7] === t[7] &&
    e[8] === t[8]
  );
}
function Ol(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    a = e[4],
    o = e[5],
    h = e[6],
    l = e[7],
    c = e[8],
    f = t[0],
    d = t[1],
    p = t[2],
    _ = t[3],
    w = t[4],
    m = t[5],
    M = t[6],
    b = t[7],
    S = t[8];
  return (
    Math.abs(r - f) <= L * Math.max(1, Math.abs(r), Math.abs(f)) &&
    Math.abs(i - d) <= L * Math.max(1, Math.abs(i), Math.abs(d)) &&
    Math.abs(n - p) <= L * Math.max(1, Math.abs(n), Math.abs(p)) &&
    Math.abs(s - _) <= L * Math.max(1, Math.abs(s), Math.abs(_)) &&
    Math.abs(a - w) <= L * Math.max(1, Math.abs(a), Math.abs(w)) &&
    Math.abs(o - m) <= L * Math.max(1, Math.abs(o), Math.abs(m)) &&
    Math.abs(h - M) <= L * Math.max(1, Math.abs(h), Math.abs(M)) &&
    Math.abs(l - b) <= L * Math.max(1, Math.abs(l), Math.abs(b)) &&
    Math.abs(c - S) <= L * Math.max(1, Math.abs(c), Math.abs(S))
  );
}
var Dl = Rn,
  Hl = In,
  Nl = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: An,
        fromMat4: ll,
        clone: cl,
        copy: vl,
        fromValues: fl,
        set: ul,
        identity: dl,
        transpose: pl,
        invert: _l,
        adjoint: ml,
        determinant: yl,
        multiply: Rn,
        translate: gl,
        rotate: wl,
        scale: xl,
        fromTranslation: Ml,
        fromRotation: Tl,
        fromScaling: El,
        fromMat2d: bl,
        fromQuat: Sl,
        normalFromMat4: Cl,
        projection: $l,
        str: Ll,
        frob: Pl,
        add: zl,
        subtract: In,
        multiplyScalar: Al,
        multiplyScalarAndAdd: Rl,
        exactEquals: Il,
        equals: Ol,
        mul: Dl,
        sub: Hl,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function Fl() {
  var e = new I(16);
  return (
    I != Float32Array &&
      ((e[1] = 0),
      (e[2] = 0),
      (e[3] = 0),
      (e[4] = 0),
      (e[6] = 0),
      (e[7] = 0),
      (e[8] = 0),
      (e[9] = 0),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0)),
    (e[0] = 1),
    (e[5] = 1),
    (e[10] = 1),
    (e[15] = 1),
    e
  );
}
function Vl(e) {
  var t = new I(16);
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[3]),
    (t[4] = e[4]),
    (t[5] = e[5]),
    (t[6] = e[6]),
    (t[7] = e[7]),
    (t[8] = e[8]),
    (t[9] = e[9]),
    (t[10] = e[10]),
    (t[11] = e[11]),
    (t[12] = e[12]),
    (t[13] = e[13]),
    (t[14] = e[14]),
    (t[15] = e[15]),
    t
  );
}
function ql(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = t[4]),
    (e[5] = t[5]),
    (e[6] = t[6]),
    (e[7] = t[7]),
    (e[8] = t[8]),
    (e[9] = t[9]),
    (e[10] = t[10]),
    (e[11] = t[11]),
    (e[12] = t[12]),
    (e[13] = t[13]),
    (e[14] = t[14]),
    (e[15] = t[15]),
    e
  );
}
function kl(e, t, r, i, n, s, a, o, h, l, c, f, d, p, _, w) {
  var m = new I(16);
  return (
    (m[0] = e),
    (m[1] = t),
    (m[2] = r),
    (m[3] = i),
    (m[4] = n),
    (m[5] = s),
    (m[6] = a),
    (m[7] = o),
    (m[8] = h),
    (m[9] = l),
    (m[10] = c),
    (m[11] = f),
    (m[12] = d),
    (m[13] = p),
    (m[14] = _),
    (m[15] = w),
    m
  );
}
function Wl(e, t, r, i, n, s, a, o, h, l, c, f, d, p, _, w, m) {
  return (
    (e[0] = t),
    (e[1] = r),
    (e[2] = i),
    (e[3] = n),
    (e[4] = s),
    (e[5] = a),
    (e[6] = o),
    (e[7] = h),
    (e[8] = l),
    (e[9] = c),
    (e[10] = f),
    (e[11] = d),
    (e[12] = p),
    (e[13] = _),
    (e[14] = w),
    (e[15] = m),
    e
  );
}
function On(e) {
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = 1),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = 0),
    (e[10] = 1),
    (e[11] = 0),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = 0),
    (e[15] = 1),
    e
  );
}
function Yl(e, t) {
  if (e === t) {
    var r = t[1],
      i = t[2],
      n = t[3],
      s = t[6],
      a = t[7],
      o = t[11];
    (e[1] = t[4]),
      (e[2] = t[8]),
      (e[3] = t[12]),
      (e[4] = r),
      (e[6] = t[9]),
      (e[7] = t[13]),
      (e[8] = i),
      (e[9] = s),
      (e[11] = t[14]),
      (e[12] = n),
      (e[13] = a),
      (e[14] = o);
  } else
    (e[0] = t[0]),
      (e[1] = t[4]),
      (e[2] = t[8]),
      (e[3] = t[12]),
      (e[4] = t[1]),
      (e[5] = t[5]),
      (e[6] = t[9]),
      (e[7] = t[13]),
      (e[8] = t[2]),
      (e[9] = t[6]),
      (e[10] = t[10]),
      (e[11] = t[14]),
      (e[12] = t[3]),
      (e[13] = t[7]),
      (e[14] = t[11]),
      (e[15] = t[15]);
  return e;
}
function Xl(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = t[4],
    o = t[5],
    h = t[6],
    l = t[7],
    c = t[8],
    f = t[9],
    d = t[10],
    p = t[11],
    _ = t[12],
    w = t[13],
    m = t[14],
    M = t[15],
    b = r * o - i * a,
    S = r * h - n * a,
    C = r * l - s * a,
    $ = i * h - n * o,
    E = i * l - s * o,
    O = n * l - s * h,
    F = c * w - f * _,
    H = c * m - d * _,
    N = c * M - p * _,
    R = f * m - d * w,
    V = f * M - p * w,
    B = d * M - p * m,
    z = b * B - S * V + C * R + $ * N - E * H + O * F;
  return z
    ? ((z = 1 / z),
      (e[0] = (o * B - h * V + l * R) * z),
      (e[1] = (n * V - i * B - s * R) * z),
      (e[2] = (w * O - m * E + M * $) * z),
      (e[3] = (d * E - f * O - p * $) * z),
      (e[4] = (h * N - a * B - l * H) * z),
      (e[5] = (r * B - n * N + s * H) * z),
      (e[6] = (m * C - _ * O - M * S) * z),
      (e[7] = (c * O - d * C + p * S) * z),
      (e[8] = (a * V - o * N + l * F) * z),
      (e[9] = (i * N - r * V - s * F) * z),
      (e[10] = (_ * E - w * C + M * b) * z),
      (e[11] = (f * C - c * E - p * b) * z),
      (e[12] = (o * H - a * R - h * F) * z),
      (e[13] = (r * R - i * H + n * F) * z),
      (e[14] = (w * S - _ * $ - m * b) * z),
      (e[15] = (c * $ - f * S + d * b) * z),
      e)
    : null;
}
function Bl(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = t[4],
    o = t[5],
    h = t[6],
    l = t[7],
    c = t[8],
    f = t[9],
    d = t[10],
    p = t[11],
    _ = t[12],
    w = t[13],
    m = t[14],
    M = t[15];
  return (
    (e[0] = o * (d * M - p * m) - f * (h * M - l * m) + w * (h * p - l * d)),
    (e[1] = -(i * (d * M - p * m) - f * (n * M - s * m) + w * (n * p - s * d))),
    (e[2] = i * (h * M - l * m) - o * (n * M - s * m) + w * (n * l - s * h)),
    (e[3] = -(i * (h * p - l * d) - o * (n * p - s * d) + f * (n * l - s * h))),
    (e[4] = -(a * (d * M - p * m) - c * (h * M - l * m) + _ * (h * p - l * d))),
    (e[5] = r * (d * M - p * m) - c * (n * M - s * m) + _ * (n * p - s * d)),
    (e[6] = -(r * (h * M - l * m) - a * (n * M - s * m) + _ * (n * l - s * h))),
    (e[7] = r * (h * p - l * d) - a * (n * p - s * d) + c * (n * l - s * h)),
    (e[8] = a * (f * M - p * w) - c * (o * M - l * w) + _ * (o * p - l * f)),
    (e[9] = -(r * (f * M - p * w) - c * (i * M - s * w) + _ * (i * p - s * f))),
    (e[10] = r * (o * M - l * w) - a * (i * M - s * w) + _ * (i * l - s * o)),
    (e[11] = -(
      r * (o * p - l * f) -
      a * (i * p - s * f) +
      c * (i * l - s * o)
    )),
    (e[12] = -(
      a * (f * m - d * w) -
      c * (o * m - h * w) +
      _ * (o * d - h * f)
    )),
    (e[13] = r * (f * m - d * w) - c * (i * m - n * w) + _ * (i * d - n * f)),
    (e[14] = -(
      r * (o * m - h * w) -
      a * (i * m - n * w) +
      _ * (i * h - n * o)
    )),
    (e[15] = r * (o * d - h * f) - a * (i * d - n * f) + c * (i * h - n * o)),
    e
  );
}
function Ul(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3],
    s = e[4],
    a = e[5],
    o = e[6],
    h = e[7],
    l = e[8],
    c = e[9],
    f = e[10],
    d = e[11],
    p = e[12],
    _ = e[13],
    w = e[14],
    m = e[15],
    M = t * a - r * s,
    b = t * o - i * s,
    S = t * h - n * s,
    C = r * o - i * a,
    $ = r * h - n * a,
    E = i * h - n * o,
    O = l * _ - c * p,
    F = l * w - f * p,
    H = l * m - d * p,
    N = c * w - f * _,
    R = c * m - d * _,
    V = f * m - d * w;
  return M * V - b * R + S * N + C * H - $ * F + E * O;
}
function Dn(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = t[8],
    d = t[9],
    p = t[10],
    _ = t[11],
    w = t[12],
    m = t[13],
    M = t[14],
    b = t[15],
    S = r[0],
    C = r[1],
    $ = r[2],
    E = r[3];
  return (
    (e[0] = S * i + C * o + $ * f + E * w),
    (e[1] = S * n + C * h + $ * d + E * m),
    (e[2] = S * s + C * l + $ * p + E * M),
    (e[3] = S * a + C * c + $ * _ + E * b),
    (S = r[4]),
    (C = r[5]),
    ($ = r[6]),
    (E = r[7]),
    (e[4] = S * i + C * o + $ * f + E * w),
    (e[5] = S * n + C * h + $ * d + E * m),
    (e[6] = S * s + C * l + $ * p + E * M),
    (e[7] = S * a + C * c + $ * _ + E * b),
    (S = r[8]),
    (C = r[9]),
    ($ = r[10]),
    (E = r[11]),
    (e[8] = S * i + C * o + $ * f + E * w),
    (e[9] = S * n + C * h + $ * d + E * m),
    (e[10] = S * s + C * l + $ * p + E * M),
    (e[11] = S * a + C * c + $ * _ + E * b),
    (S = r[12]),
    (C = r[13]),
    ($ = r[14]),
    (E = r[15]),
    (e[12] = S * i + C * o + $ * f + E * w),
    (e[13] = S * n + C * h + $ * d + E * m),
    (e[14] = S * s + C * l + $ * p + E * M),
    (e[15] = S * a + C * c + $ * _ + E * b),
    e
  );
}
function jl(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    a,
    o,
    h,
    l,
    c,
    f,
    d,
    p,
    _,
    w,
    m,
    M;
  return (
    t === e
      ? ((e[12] = t[0] * i + t[4] * n + t[8] * s + t[12]),
        (e[13] = t[1] * i + t[5] * n + t[9] * s + t[13]),
        (e[14] = t[2] * i + t[6] * n + t[10] * s + t[14]),
        (e[15] = t[3] * i + t[7] * n + t[11] * s + t[15]))
      : ((a = t[0]),
        (o = t[1]),
        (h = t[2]),
        (l = t[3]),
        (c = t[4]),
        (f = t[5]),
        (d = t[6]),
        (p = t[7]),
        (_ = t[8]),
        (w = t[9]),
        (m = t[10]),
        (M = t[11]),
        (e[0] = a),
        (e[1] = o),
        (e[2] = h),
        (e[3] = l),
        (e[4] = c),
        (e[5] = f),
        (e[6] = d),
        (e[7] = p),
        (e[8] = _),
        (e[9] = w),
        (e[10] = m),
        (e[11] = M),
        (e[12] = a * i + c * n + _ * s + t[12]),
        (e[13] = o * i + f * n + w * s + t[13]),
        (e[14] = h * i + d * n + m * s + t[14]),
        (e[15] = l * i + p * n + M * s + t[15])),
    e
  );
}
function Gl(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2];
  return (
    (e[0] = t[0] * i),
    (e[1] = t[1] * i),
    (e[2] = t[2] * i),
    (e[3] = t[3] * i),
    (e[4] = t[4] * n),
    (e[5] = t[5] * n),
    (e[6] = t[6] * n),
    (e[7] = t[7] * n),
    (e[8] = t[8] * s),
    (e[9] = t[9] * s),
    (e[10] = t[10] * s),
    (e[11] = t[11] * s),
    (e[12] = t[12]),
    (e[13] = t[13]),
    (e[14] = t[14]),
    (e[15] = t[15]),
    e
  );
}
function Zl(e, t, r, i) {
  var n = i[0],
    s = i[1],
    a = i[2],
    o = Math.hypot(n, s, a),
    h,
    l,
    c,
    f,
    d,
    p,
    _,
    w,
    m,
    M,
    b,
    S,
    C,
    $,
    E,
    O,
    F,
    H,
    N,
    R,
    V,
    B,
    z,
    g;
  return o < L
    ? null
    : ((o = 1 / o),
      (n *= o),
      (s *= o),
      (a *= o),
      (h = Math.sin(r)),
      (l = Math.cos(r)),
      (c = 1 - l),
      (f = t[0]),
      (d = t[1]),
      (p = t[2]),
      (_ = t[3]),
      (w = t[4]),
      (m = t[5]),
      (M = t[6]),
      (b = t[7]),
      (S = t[8]),
      (C = t[9]),
      ($ = t[10]),
      (E = t[11]),
      (O = n * n * c + l),
      (F = s * n * c + a * h),
      (H = a * n * c - s * h),
      (N = n * s * c - a * h),
      (R = s * s * c + l),
      (V = a * s * c + n * h),
      (B = n * a * c + s * h),
      (z = s * a * c - n * h),
      (g = a * a * c + l),
      (e[0] = f * O + w * F + S * H),
      (e[1] = d * O + m * F + C * H),
      (e[2] = p * O + M * F + $ * H),
      (e[3] = _ * O + b * F + E * H),
      (e[4] = f * N + w * R + S * V),
      (e[5] = d * N + m * R + C * V),
      (e[6] = p * N + M * R + $ * V),
      (e[7] = _ * N + b * R + E * V),
      (e[8] = f * B + w * z + S * g),
      (e[9] = d * B + m * z + C * g),
      (e[10] = p * B + M * z + $ * g),
      (e[11] = _ * B + b * z + E * g),
      t !== e &&
        ((e[12] = t[12]), (e[13] = t[13]), (e[14] = t[14]), (e[15] = t[15])),
      e);
}
function Kl(e, t, r) {
  var i = Math.sin(r),
    n = Math.cos(r),
    s = t[4],
    a = t[5],
    o = t[6],
    h = t[7],
    l = t[8],
    c = t[9],
    f = t[10],
    d = t[11];
  return (
    t !== e &&
      ((e[0] = t[0]),
      (e[1] = t[1]),
      (e[2] = t[2]),
      (e[3] = t[3]),
      (e[12] = t[12]),
      (e[13] = t[13]),
      (e[14] = t[14]),
      (e[15] = t[15])),
    (e[4] = s * n + l * i),
    (e[5] = a * n + c * i),
    (e[6] = o * n + f * i),
    (e[7] = h * n + d * i),
    (e[8] = l * n - s * i),
    (e[9] = c * n - a * i),
    (e[10] = f * n - o * i),
    (e[11] = d * n - h * i),
    e
  );
}
function Ql(e, t, r) {
  var i = Math.sin(r),
    n = Math.cos(r),
    s = t[0],
    a = t[1],
    o = t[2],
    h = t[3],
    l = t[8],
    c = t[9],
    f = t[10],
    d = t[11];
  return (
    t !== e &&
      ((e[4] = t[4]),
      (e[5] = t[5]),
      (e[6] = t[6]),
      (e[7] = t[7]),
      (e[12] = t[12]),
      (e[13] = t[13]),
      (e[14] = t[14]),
      (e[15] = t[15])),
    (e[0] = s * n - l * i),
    (e[1] = a * n - c * i),
    (e[2] = o * n - f * i),
    (e[3] = h * n - d * i),
    (e[8] = s * i + l * n),
    (e[9] = a * i + c * n),
    (e[10] = o * i + f * n),
    (e[11] = h * i + d * n),
    e
  );
}
function Jl(e, t, r) {
  var i = Math.sin(r),
    n = Math.cos(r),
    s = t[0],
    a = t[1],
    o = t[2],
    h = t[3],
    l = t[4],
    c = t[5],
    f = t[6],
    d = t[7];
  return (
    t !== e &&
      ((e[8] = t[8]),
      (e[9] = t[9]),
      (e[10] = t[10]),
      (e[11] = t[11]),
      (e[12] = t[12]),
      (e[13] = t[13]),
      (e[14] = t[14]),
      (e[15] = t[15])),
    (e[0] = s * n + l * i),
    (e[1] = a * n + c * i),
    (e[2] = o * n + f * i),
    (e[3] = h * n + d * i),
    (e[4] = l * n - s * i),
    (e[5] = c * n - a * i),
    (e[6] = f * n - o * i),
    (e[7] = d * n - h * i),
    e
  );
}
function ec(e, t) {
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = 1),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = 0),
    (e[10] = 1),
    (e[11] = 0),
    (e[12] = t[0]),
    (e[13] = t[1]),
    (e[14] = t[2]),
    (e[15] = 1),
    e
  );
}
function tc(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = t[1]),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = 0),
    (e[10] = t[2]),
    (e[11] = 0),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = 0),
    (e[15] = 1),
    e
  );
}
function rc(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    a = Math.hypot(i, n, s),
    o,
    h,
    l;
  return a < L
    ? null
    : ((a = 1 / a),
      (i *= a),
      (n *= a),
      (s *= a),
      (o = Math.sin(t)),
      (h = Math.cos(t)),
      (l = 1 - h),
      (e[0] = i * i * l + h),
      (e[1] = n * i * l + s * o),
      (e[2] = s * i * l - n * o),
      (e[3] = 0),
      (e[4] = i * n * l - s * o),
      (e[5] = n * n * l + h),
      (e[6] = s * n * l + i * o),
      (e[7] = 0),
      (e[8] = i * s * l + n * o),
      (e[9] = n * s * l - i * o),
      (e[10] = s * s * l + h),
      (e[11] = 0),
      (e[12] = 0),
      (e[13] = 0),
      (e[14] = 0),
      (e[15] = 1),
      e);
}
function ic(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return (
    (e[0] = 1),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = i),
    (e[6] = r),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = -r),
    (e[10] = i),
    (e[11] = 0),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = 0),
    (e[15] = 1),
    e
  );
}
function nc(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return (
    (e[0] = i),
    (e[1] = 0),
    (e[2] = -r),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = 1),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = r),
    (e[9] = 0),
    (e[10] = i),
    (e[11] = 0),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = 0),
    (e[15] = 1),
    e
  );
}
function sc(e, t) {
  var r = Math.sin(t),
    i = Math.cos(t);
  return (
    (e[0] = i),
    (e[1] = r),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = -r),
    (e[5] = i),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = 0),
    (e[10] = 1),
    (e[11] = 0),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = 0),
    (e[15] = 1),
    e
  );
}
function Hn(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = i + i,
    h = n + n,
    l = s + s,
    c = i * o,
    f = i * h,
    d = i * l,
    p = n * h,
    _ = n * l,
    w = s * l,
    m = a * o,
    M = a * h,
    b = a * l;
  return (
    (e[0] = 1 - (p + w)),
    (e[1] = f + b),
    (e[2] = d - M),
    (e[3] = 0),
    (e[4] = f - b),
    (e[5] = 1 - (c + w)),
    (e[6] = _ + m),
    (e[7] = 0),
    (e[8] = d + M),
    (e[9] = _ - m),
    (e[10] = 1 - (c + p)),
    (e[11] = 0),
    (e[12] = r[0]),
    (e[13] = r[1]),
    (e[14] = r[2]),
    (e[15] = 1),
    e
  );
}
function ac(e, t) {
  var r = new I(3),
    i = -t[0],
    n = -t[1],
    s = -t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = i * i + n * n + s * s + a * a;
  return (
    f > 0
      ? ((r[0] = ((o * a + c * i + h * s - l * n) * 2) / f),
        (r[1] = ((h * a + c * n + l * i - o * s) * 2) / f),
        (r[2] = ((l * a + c * s + o * n - h * i) * 2) / f))
      : ((r[0] = (o * a + c * i + h * s - l * n) * 2),
        (r[1] = (h * a + c * n + l * i - o * s) * 2),
        (r[2] = (l * a + c * s + o * n - h * i) * 2)),
    Hn(e, t, r),
    e
  );
}
function Nn(e, t) {
  return (e[0] = t[12]), (e[1] = t[13]), (e[2] = t[14]), e;
}
function Fn(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[4],
    a = t[5],
    o = t[6],
    h = t[8],
    l = t[9],
    c = t[10];
  return (
    (e[0] = Math.hypot(r, i, n)),
    (e[1] = Math.hypot(s, a, o)),
    (e[2] = Math.hypot(h, l, c)),
    e
  );
}
function Vn(e, t) {
  var r = new I(3);
  Fn(r, t);
  var i = 1 / r[0],
    n = 1 / r[1],
    s = 1 / r[2],
    a = t[0] * i,
    o = t[1] * n,
    h = t[2] * s,
    l = t[4] * i,
    c = t[5] * n,
    f = t[6] * s,
    d = t[8] * i,
    p = t[9] * n,
    _ = t[10] * s,
    w = a + c + _,
    m = 0;
  return (
    w > 0
      ? ((m = Math.sqrt(w + 1) * 2),
        (e[3] = 0.25 * m),
        (e[0] = (f - p) / m),
        (e[1] = (d - h) / m),
        (e[2] = (o - l) / m))
      : a > c && a > _
      ? ((m = Math.sqrt(1 + a - c - _) * 2),
        (e[3] = (f - p) / m),
        (e[0] = 0.25 * m),
        (e[1] = (o + l) / m),
        (e[2] = (d + h) / m))
      : c > _
      ? ((m = Math.sqrt(1 + c - a - _) * 2),
        (e[3] = (d - h) / m),
        (e[0] = (o + l) / m),
        (e[1] = 0.25 * m),
        (e[2] = (f + p) / m))
      : ((m = Math.sqrt(1 + _ - a - c) * 2),
        (e[3] = (o - l) / m),
        (e[0] = (d + h) / m),
        (e[1] = (f + p) / m),
        (e[2] = 0.25 * m)),
    e
  );
}
function oc(e, t, r, i) {
  var n = t[0],
    s = t[1],
    a = t[2],
    o = t[3],
    h = n + n,
    l = s + s,
    c = a + a,
    f = n * h,
    d = n * l,
    p = n * c,
    _ = s * l,
    w = s * c,
    m = a * c,
    M = o * h,
    b = o * l,
    S = o * c,
    C = i[0],
    $ = i[1],
    E = i[2];
  return (
    (e[0] = (1 - (_ + m)) * C),
    (e[1] = (d + S) * C),
    (e[2] = (p - b) * C),
    (e[3] = 0),
    (e[4] = (d - S) * $),
    (e[5] = (1 - (f + m)) * $),
    (e[6] = (w + M) * $),
    (e[7] = 0),
    (e[8] = (p + b) * E),
    (e[9] = (w - M) * E),
    (e[10] = (1 - (f + _)) * E),
    (e[11] = 0),
    (e[12] = r[0]),
    (e[13] = r[1]),
    (e[14] = r[2]),
    (e[15] = 1),
    e
  );
}
function hc(e, t, r, i, n) {
  var s = t[0],
    a = t[1],
    o = t[2],
    h = t[3],
    l = s + s,
    c = a + a,
    f = o + o,
    d = s * l,
    p = s * c,
    _ = s * f,
    w = a * c,
    m = a * f,
    M = o * f,
    b = h * l,
    S = h * c,
    C = h * f,
    $ = i[0],
    E = i[1],
    O = i[2],
    F = n[0],
    H = n[1],
    N = n[2],
    R = (1 - (w + M)) * $,
    V = (p + C) * $,
    B = (_ - S) * $,
    z = (p - C) * E,
    g = (1 - (d + M)) * E,
    ze = (m + b) * E,
    j = (_ + S) * O,
    Je = (m - b) * O,
    xe = (1 - (d + w)) * O;
  return (
    (e[0] = R),
    (e[1] = V),
    (e[2] = B),
    (e[3] = 0),
    (e[4] = z),
    (e[5] = g),
    (e[6] = ze),
    (e[7] = 0),
    (e[8] = j),
    (e[9] = Je),
    (e[10] = xe),
    (e[11] = 0),
    (e[12] = r[0] + F - (R * F + z * H + j * N)),
    (e[13] = r[1] + H - (V * F + g * H + Je * N)),
    (e[14] = r[2] + N - (B * F + ze * H + xe * N)),
    (e[15] = 1),
    e
  );
}
function lc(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = r + r,
    o = i + i,
    h = n + n,
    l = r * a,
    c = i * a,
    f = i * o,
    d = n * a,
    p = n * o,
    _ = n * h,
    w = s * a,
    m = s * o,
    M = s * h;
  return (
    (e[0] = 1 - f - _),
    (e[1] = c + M),
    (e[2] = d - m),
    (e[3] = 0),
    (e[4] = c - M),
    (e[5] = 1 - l - _),
    (e[6] = p + w),
    (e[7] = 0),
    (e[8] = d + m),
    (e[9] = p - w),
    (e[10] = 1 - l - f),
    (e[11] = 0),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = 0),
    (e[15] = 1),
    e
  );
}
function cc(e, t, r, i, n, s, a) {
  var o = 1 / (r - t),
    h = 1 / (n - i),
    l = 1 / (s - a);
  return (
    (e[0] = s * 2 * o),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = s * 2 * h),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = (r + t) * o),
    (e[9] = (n + i) * h),
    (e[10] = (a + s) * l),
    (e[11] = -1),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = a * s * 2 * l),
    (e[15] = 0),
    e
  );
}
function vc(e, t, r, i, n) {
  var s = 1 / Math.tan(t / 2),
    a;
  return (
    (e[0] = s / r),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = s),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = 0),
    (e[11] = -1),
    (e[12] = 0),
    (e[13] = 0),
    (e[15] = 0),
    n != null && n !== 1 / 0
      ? ((a = 1 / (i - n)), (e[10] = (n + i) * a), (e[14] = 2 * n * i * a))
      : ((e[10] = -1), (e[14] = -2 * i)),
    e
  );
}
function fc(e, t, r, i) {
  var n = Math.tan((t.upDegrees * Math.PI) / 180),
    s = Math.tan((t.downDegrees * Math.PI) / 180),
    a = Math.tan((t.leftDegrees * Math.PI) / 180),
    o = Math.tan((t.rightDegrees * Math.PI) / 180),
    h = 2 / (a + o),
    l = 2 / (n + s);
  return (
    (e[0] = h),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = l),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = -((a - o) * h * 0.5)),
    (e[9] = (n - s) * l * 0.5),
    (e[10] = i / (r - i)),
    (e[11] = -1),
    (e[12] = 0),
    (e[13] = 0),
    (e[14] = (i * r) / (r - i)),
    (e[15] = 0),
    e
  );
}
function uc(e, t, r, i, n, s, a) {
  var o = 1 / (t - r),
    h = 1 / (i - n),
    l = 1 / (s - a);
  return (
    (e[0] = -2 * o),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 0),
    (e[4] = 0),
    (e[5] = -2 * h),
    (e[6] = 0),
    (e[7] = 0),
    (e[8] = 0),
    (e[9] = 0),
    (e[10] = 2 * l),
    (e[11] = 0),
    (e[12] = (t + r) * o),
    (e[13] = (n + i) * h),
    (e[14] = (a + s) * l),
    (e[15] = 1),
    e
  );
}
function dc(e, t, r, i) {
  var n,
    s,
    a,
    o,
    h,
    l,
    c,
    f,
    d,
    p,
    _ = t[0],
    w = t[1],
    m = t[2],
    M = i[0],
    b = i[1],
    S = i[2],
    C = r[0],
    $ = r[1],
    E = r[2];
  return Math.abs(_ - C) < L && Math.abs(w - $) < L && Math.abs(m - E) < L
    ? On(e)
    : ((c = _ - C),
      (f = w - $),
      (d = m - E),
      (p = 1 / Math.hypot(c, f, d)),
      (c *= p),
      (f *= p),
      (d *= p),
      (n = b * d - S * f),
      (s = S * c - M * d),
      (a = M * f - b * c),
      (p = Math.hypot(n, s, a)),
      p
        ? ((p = 1 / p), (n *= p), (s *= p), (a *= p))
        : ((n = 0), (s = 0), (a = 0)),
      (o = f * a - d * s),
      (h = d * n - c * a),
      (l = c * s - f * n),
      (p = Math.hypot(o, h, l)),
      p
        ? ((p = 1 / p), (o *= p), (h *= p), (l *= p))
        : ((o = 0), (h = 0), (l = 0)),
      (e[0] = n),
      (e[1] = o),
      (e[2] = c),
      (e[3] = 0),
      (e[4] = s),
      (e[5] = h),
      (e[6] = f),
      (e[7] = 0),
      (e[8] = a),
      (e[9] = l),
      (e[10] = d),
      (e[11] = 0),
      (e[12] = -(n * _ + s * w + a * m)),
      (e[13] = -(o * _ + h * w + l * m)),
      (e[14] = -(c * _ + f * w + d * m)),
      (e[15] = 1),
      e);
}
function pc(e, t, r, i) {
  var n = t[0],
    s = t[1],
    a = t[2],
    o = i[0],
    h = i[1],
    l = i[2],
    c = n - r[0],
    f = s - r[1],
    d = a - r[2],
    p = c * c + f * f + d * d;
  p > 0 && ((p = 1 / Math.sqrt(p)), (c *= p), (f *= p), (d *= p));
  var _ = h * d - l * f,
    w = l * c - o * d,
    m = o * f - h * c;
  return (
    (p = _ * _ + w * w + m * m),
    p > 0 && ((p = 1 / Math.sqrt(p)), (_ *= p), (w *= p), (m *= p)),
    (e[0] = _),
    (e[1] = w),
    (e[2] = m),
    (e[3] = 0),
    (e[4] = f * m - d * w),
    (e[5] = d * _ - c * m),
    (e[6] = c * w - f * _),
    (e[7] = 0),
    (e[8] = c),
    (e[9] = f),
    (e[10] = d),
    (e[11] = 0),
    (e[12] = n),
    (e[13] = s),
    (e[14] = a),
    (e[15] = 1),
    e
  );
}
function _c(e) {
  return (
    "mat4(" +
    e[0] +
    ", " +
    e[1] +
    ", " +
    e[2] +
    ", " +
    e[3] +
    ", " +
    e[4] +
    ", " +
    e[5] +
    ", " +
    e[6] +
    ", " +
    e[7] +
    ", " +
    e[8] +
    ", " +
    e[9] +
    ", " +
    e[10] +
    ", " +
    e[11] +
    ", " +
    e[12] +
    ", " +
    e[13] +
    ", " +
    e[14] +
    ", " +
    e[15] +
    ")"
  );
}
function mc(e) {
  return Math.hypot(
    e[0],
    e[1],
    e[2],
    e[3],
    e[4],
    e[5],
    e[6],
    e[7],
    e[8],
    e[9],
    e[10],
    e[11],
    e[12],
    e[13],
    e[14],
    e[15]
  );
}
function yc(e, t, r) {
  return (
    (e[0] = t[0] + r[0]),
    (e[1] = t[1] + r[1]),
    (e[2] = t[2] + r[2]),
    (e[3] = t[3] + r[3]),
    (e[4] = t[4] + r[4]),
    (e[5] = t[5] + r[5]),
    (e[6] = t[6] + r[6]),
    (e[7] = t[7] + r[7]),
    (e[8] = t[8] + r[8]),
    (e[9] = t[9] + r[9]),
    (e[10] = t[10] + r[10]),
    (e[11] = t[11] + r[11]),
    (e[12] = t[12] + r[12]),
    (e[13] = t[13] + r[13]),
    (e[14] = t[14] + r[14]),
    (e[15] = t[15] + r[15]),
    e
  );
}
function qn(e, t, r) {
  return (
    (e[0] = t[0] - r[0]),
    (e[1] = t[1] - r[1]),
    (e[2] = t[2] - r[2]),
    (e[3] = t[3] - r[3]),
    (e[4] = t[4] - r[4]),
    (e[5] = t[5] - r[5]),
    (e[6] = t[6] - r[6]),
    (e[7] = t[7] - r[7]),
    (e[8] = t[8] - r[8]),
    (e[9] = t[9] - r[9]),
    (e[10] = t[10] - r[10]),
    (e[11] = t[11] - r[11]),
    (e[12] = t[12] - r[12]),
    (e[13] = t[13] - r[13]),
    (e[14] = t[14] - r[14]),
    (e[15] = t[15] - r[15]),
    e
  );
}
function gc(e, t, r) {
  return (
    (e[0] = t[0] * r),
    (e[1] = t[1] * r),
    (e[2] = t[2] * r),
    (e[3] = t[3] * r),
    (e[4] = t[4] * r),
    (e[5] = t[5] * r),
    (e[6] = t[6] * r),
    (e[7] = t[7] * r),
    (e[8] = t[8] * r),
    (e[9] = t[9] * r),
    (e[10] = t[10] * r),
    (e[11] = t[11] * r),
    (e[12] = t[12] * r),
    (e[13] = t[13] * r),
    (e[14] = t[14] * r),
    (e[15] = t[15] * r),
    e
  );
}
function wc(e, t, r, i) {
  return (
    (e[0] = t[0] + r[0] * i),
    (e[1] = t[1] + r[1] * i),
    (e[2] = t[2] + r[2] * i),
    (e[3] = t[3] + r[3] * i),
    (e[4] = t[4] + r[4] * i),
    (e[5] = t[5] + r[5] * i),
    (e[6] = t[6] + r[6] * i),
    (e[7] = t[7] + r[7] * i),
    (e[8] = t[8] + r[8] * i),
    (e[9] = t[9] + r[9] * i),
    (e[10] = t[10] + r[10] * i),
    (e[11] = t[11] + r[11] * i),
    (e[12] = t[12] + r[12] * i),
    (e[13] = t[13] + r[13] * i),
    (e[14] = t[14] + r[14] * i),
    (e[15] = t[15] + r[15] * i),
    e
  );
}
function xc(e, t) {
  return (
    e[0] === t[0] &&
    e[1] === t[1] &&
    e[2] === t[2] &&
    e[3] === t[3] &&
    e[4] === t[4] &&
    e[5] === t[5] &&
    e[6] === t[6] &&
    e[7] === t[7] &&
    e[8] === t[8] &&
    e[9] === t[9] &&
    e[10] === t[10] &&
    e[11] === t[11] &&
    e[12] === t[12] &&
    e[13] === t[13] &&
    e[14] === t[14] &&
    e[15] === t[15]
  );
}
function Mc(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    a = e[4],
    o = e[5],
    h = e[6],
    l = e[7],
    c = e[8],
    f = e[9],
    d = e[10],
    p = e[11],
    _ = e[12],
    w = e[13],
    m = e[14],
    M = e[15],
    b = t[0],
    S = t[1],
    C = t[2],
    $ = t[3],
    E = t[4],
    O = t[5],
    F = t[6],
    H = t[7],
    N = t[8],
    R = t[9],
    V = t[10],
    B = t[11],
    z = t[12],
    g = t[13],
    ze = t[14],
    j = t[15];
  return (
    Math.abs(r - b) <= L * Math.max(1, Math.abs(r), Math.abs(b)) &&
    Math.abs(i - S) <= L * Math.max(1, Math.abs(i), Math.abs(S)) &&
    Math.abs(n - C) <= L * Math.max(1, Math.abs(n), Math.abs(C)) &&
    Math.abs(s - $) <= L * Math.max(1, Math.abs(s), Math.abs($)) &&
    Math.abs(a - E) <= L * Math.max(1, Math.abs(a), Math.abs(E)) &&
    Math.abs(o - O) <= L * Math.max(1, Math.abs(o), Math.abs(O)) &&
    Math.abs(h - F) <= L * Math.max(1, Math.abs(h), Math.abs(F)) &&
    Math.abs(l - H) <= L * Math.max(1, Math.abs(l), Math.abs(H)) &&
    Math.abs(c - N) <= L * Math.max(1, Math.abs(c), Math.abs(N)) &&
    Math.abs(f - R) <= L * Math.max(1, Math.abs(f), Math.abs(R)) &&
    Math.abs(d - V) <= L * Math.max(1, Math.abs(d), Math.abs(V)) &&
    Math.abs(p - B) <= L * Math.max(1, Math.abs(p), Math.abs(B)) &&
    Math.abs(_ - z) <= L * Math.max(1, Math.abs(_), Math.abs(z)) &&
    Math.abs(w - g) <= L * Math.max(1, Math.abs(w), Math.abs(g)) &&
    Math.abs(m - ze) <= L * Math.max(1, Math.abs(m), Math.abs(ze)) &&
    Math.abs(M - j) <= L * Math.max(1, Math.abs(M), Math.abs(j))
  );
}
var Tc = Dn,
  Ec = qn,
  bc = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: Fl,
        clone: Vl,
        copy: ql,
        fromValues: kl,
        set: Wl,
        identity: On,
        transpose: Yl,
        invert: Xl,
        adjoint: Bl,
        determinant: Ul,
        multiply: Dn,
        translate: jl,
        scale: Gl,
        rotate: Zl,
        rotateX: Kl,
        rotateY: Ql,
        rotateZ: Jl,
        fromTranslation: ec,
        fromScaling: tc,
        fromRotation: rc,
        fromXRotation: ic,
        fromYRotation: nc,
        fromZRotation: sc,
        fromRotationTranslation: Hn,
        fromQuat2: ac,
        getTranslation: Nn,
        getScaling: Fn,
        getRotation: Vn,
        fromRotationTranslationScale: oc,
        fromRotationTranslationScaleOrigin: hc,
        fromQuat: lc,
        frustum: cc,
        perspective: vc,
        perspectiveFromFieldOfView: fc,
        ortho: uc,
        lookAt: dc,
        targetTo: pc,
        str: _c,
        frob: mc,
        add: yc,
        subtract: qn,
        multiplyScalar: gc,
        multiplyScalarAndAdd: wc,
        exactEquals: xc,
        equals: Mc,
        mul: Tc,
        sub: Ec,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function hi() {
  var e = new I(3);
  return I != Float32Array && ((e[0] = 0), (e[1] = 0), (e[2] = 0)), e;
}
function Sc(e) {
  var t = new I(3);
  return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
}
function kn(e) {
  var t = e[0],
    r = e[1],
    i = e[2];
  return Math.hypot(t, r, i);
}
function Qr(e, t, r) {
  var i = new I(3);
  return (i[0] = e), (i[1] = t), (i[2] = r), i;
}
function Cc(e, t) {
  return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
}
function $c(e, t, r, i) {
  return (e[0] = t), (e[1] = r), (e[2] = i), e;
}
function Lc(e, t, r) {
  return (e[0] = t[0] + r[0]), (e[1] = t[1] + r[1]), (e[2] = t[2] + r[2]), e;
}
function Wn(e, t, r) {
  return (e[0] = t[0] - r[0]), (e[1] = t[1] - r[1]), (e[2] = t[2] - r[2]), e;
}
function Yn(e, t, r) {
  return (e[0] = t[0] * r[0]), (e[1] = t[1] * r[1]), (e[2] = t[2] * r[2]), e;
}
function Xn(e, t, r) {
  return (e[0] = t[0] / r[0]), (e[1] = t[1] / r[1]), (e[2] = t[2] / r[2]), e;
}
function Pc(e, t) {
  return (
    (e[0] = Math.ceil(t[0])),
    (e[1] = Math.ceil(t[1])),
    (e[2] = Math.ceil(t[2])),
    e
  );
}
function zc(e, t) {
  return (
    (e[0] = Math.floor(t[0])),
    (e[1] = Math.floor(t[1])),
    (e[2] = Math.floor(t[2])),
    e
  );
}
function Ac(e, t, r) {
  return (
    (e[0] = Math.min(t[0], r[0])),
    (e[1] = Math.min(t[1], r[1])),
    (e[2] = Math.min(t[2], r[2])),
    e
  );
}
function Rc(e, t, r) {
  return (
    (e[0] = Math.max(t[0], r[0])),
    (e[1] = Math.max(t[1], r[1])),
    (e[2] = Math.max(t[2], r[2])),
    e
  );
}
function Ic(e, t) {
  return (
    (e[0] = Math.round(t[0])),
    (e[1] = Math.round(t[1])),
    (e[2] = Math.round(t[2])),
    e
  );
}
function Oc(e, t, r) {
  return (e[0] = t[0] * r), (e[1] = t[1] * r), (e[2] = t[2] * r), e;
}
function Dc(e, t, r, i) {
  return (
    (e[0] = t[0] + r[0] * i),
    (e[1] = t[1] + r[1] * i),
    (e[2] = t[2] + r[2] * i),
    e
  );
}
function Bn(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2];
  return Math.hypot(r, i, n);
}
function Un(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2];
  return r * r + i * i + n * n;
}
function jn(e) {
  var t = e[0],
    r = e[1],
    i = e[2];
  return t * t + r * r + i * i;
}
function Hc(e, t) {
  return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), e;
}
function Nc(e, t) {
  return (e[0] = 1 / t[0]), (e[1] = 1 / t[1]), (e[2] = 1 / t[2]), e;
}
function Gn(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = r * r + i * i + n * n;
  return (
    s > 0 && (s = 1 / Math.sqrt(s)),
    (e[0] = t[0] * s),
    (e[1] = t[1] * s),
    (e[2] = t[2] * s),
    e
  );
}
function li(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function or(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = r[0],
    o = r[1],
    h = r[2];
  return (
    (e[0] = n * h - s * o), (e[1] = s * a - i * h), (e[2] = i * o - n * a), e
  );
}
function Fc(e, t, r, i) {
  var n = t[0],
    s = t[1],
    a = t[2];
  return (
    (e[0] = n + i * (r[0] - n)),
    (e[1] = s + i * (r[1] - s)),
    (e[2] = a + i * (r[2] - a)),
    e
  );
}
function Vc(e, t, r, i, n, s) {
  var a = s * s,
    o = a * (2 * s - 3) + 1,
    h = a * (s - 2) + s,
    l = a * (s - 1),
    c = a * (3 - 2 * s);
  return (
    (e[0] = t[0] * o + r[0] * h + i[0] * l + n[0] * c),
    (e[1] = t[1] * o + r[1] * h + i[1] * l + n[1] * c),
    (e[2] = t[2] * o + r[2] * h + i[2] * l + n[2] * c),
    e
  );
}
function qc(e, t, r, i, n, s) {
  var a = 1 - s,
    o = a * a,
    h = s * s,
    l = o * a,
    c = 3 * s * o,
    f = 3 * h * a,
    d = h * s;
  return (
    (e[0] = t[0] * l + r[0] * c + i[0] * f + n[0] * d),
    (e[1] = t[1] * l + r[1] * c + i[1] * f + n[1] * d),
    (e[2] = t[2] * l + r[2] * c + i[2] * f + n[2] * d),
    e
  );
}
function kc(e, t) {
  t = t || 1;
  var r = ge() * 2 * Math.PI,
    i = ge() * 2 - 1,
    n = Math.sqrt(1 - i * i) * t;
  return (e[0] = Math.cos(r) * n), (e[1] = Math.sin(r) * n), (e[2] = i * t), e;
}
function Wc(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = r[3] * i + r[7] * n + r[11] * s + r[15];
  return (
    (a = a || 1),
    (e[0] = (r[0] * i + r[4] * n + r[8] * s + r[12]) / a),
    (e[1] = (r[1] * i + r[5] * n + r[9] * s + r[13]) / a),
    (e[2] = (r[2] * i + r[6] * n + r[10] * s + r[14]) / a),
    e
  );
}
function Yc(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2];
  return (
    (e[0] = i * r[0] + n * r[3] + s * r[6]),
    (e[1] = i * r[1] + n * r[4] + s * r[7]),
    (e[2] = i * r[2] + n * r[5] + s * r[8]),
    e
  );
}
function Xc(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    a = r[3],
    o = t[0],
    h = t[1],
    l = t[2],
    c = n * l - s * h,
    f = s * o - i * l,
    d = i * h - n * o,
    p = n * d - s * f,
    _ = s * c - i * d,
    w = i * f - n * c,
    m = a * 2;
  return (
    (c *= m),
    (f *= m),
    (d *= m),
    (p *= 2),
    (_ *= 2),
    (w *= 2),
    (e[0] = o + c + p),
    (e[1] = h + f + _),
    (e[2] = l + d + w),
    e
  );
}
function Bc(e, t, r, i) {
  var n = [],
    s = [];
  return (
    (n[0] = t[0] - r[0]),
    (n[1] = t[1] - r[1]),
    (n[2] = t[2] - r[2]),
    (s[0] = n[0]),
    (s[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i)),
    (s[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i)),
    (e[0] = s[0] + r[0]),
    (e[1] = s[1] + r[1]),
    (e[2] = s[2] + r[2]),
    e
  );
}
function Uc(e, t, r, i) {
  var n = [],
    s = [];
  return (
    (n[0] = t[0] - r[0]),
    (n[1] = t[1] - r[1]),
    (n[2] = t[2] - r[2]),
    (s[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i)),
    (s[1] = n[1]),
    (s[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i)),
    (e[0] = s[0] + r[0]),
    (e[1] = s[1] + r[1]),
    (e[2] = s[2] + r[2]),
    e
  );
}
function jc(e, t, r, i) {
  var n = [],
    s = [];
  return (
    (n[0] = t[0] - r[0]),
    (n[1] = t[1] - r[1]),
    (n[2] = t[2] - r[2]),
    (s[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i)),
    (s[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i)),
    (s[2] = n[2]),
    (e[0] = s[0] + r[0]),
    (e[1] = s[1] + r[1]),
    (e[2] = s[2] + r[2]),
    e
  );
}
function Gc(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = t[0],
    a = t[1],
    o = t[2],
    h = Math.sqrt(r * r + i * i + n * n),
    l = Math.sqrt(s * s + a * a + o * o),
    c = h * l,
    f = c && li(e, t) / c;
  return Math.acos(Math.min(Math.max(f, -1), 1));
}
function Zc(e) {
  return (e[0] = 0), (e[1] = 0), (e[2] = 0), e;
}
function Kc(e) {
  return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
}
function Qc(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
}
function Jc(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = t[0],
    a = t[1],
    o = t[2];
  return (
    Math.abs(r - s) <= L * Math.max(1, Math.abs(r), Math.abs(s)) &&
    Math.abs(i - a) <= L * Math.max(1, Math.abs(i), Math.abs(a)) &&
    Math.abs(n - o) <= L * Math.max(1, Math.abs(n), Math.abs(o))
  );
}
var ev = Wn,
  tv = Yn,
  rv = Xn,
  iv = Bn,
  nv = Un,
  Zn = kn,
  sv = jn,
  av = (function () {
    var e = hi();
    return function (t, r, i, n, s, a) {
      var o, h;
      for (
        r || (r = 3),
          i || (i = 0),
          n ? (h = Math.min(n * r + i, t.length)) : (h = t.length),
          o = i;
        o < h;
        o += r
      )
        (e[0] = t[o]),
          (e[1] = t[o + 1]),
          (e[2] = t[o + 2]),
          s(e, e, a),
          (t[o] = e[0]),
          (t[o + 1] = e[1]),
          (t[o + 2] = e[2]);
      return t;
    };
  })(),
  ov = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: hi,
        clone: Sc,
        length: kn,
        fromValues: Qr,
        copy: Cc,
        set: $c,
        add: Lc,
        subtract: Wn,
        multiply: Yn,
        divide: Xn,
        ceil: Pc,
        floor: zc,
        min: Ac,
        max: Rc,
        round: Ic,
        scale: Oc,
        scaleAndAdd: Dc,
        distance: Bn,
        squaredDistance: Un,
        squaredLength: jn,
        negate: Hc,
        inverse: Nc,
        normalize: Gn,
        dot: li,
        cross: or,
        lerp: Fc,
        hermite: Vc,
        bezier: qc,
        random: kc,
        transformMat4: Wc,
        transformMat3: Yc,
        transformQuat: Xc,
        rotateX: Bc,
        rotateY: Uc,
        rotateZ: jc,
        angle: Gc,
        zero: Zc,
        str: Kc,
        exactEquals: Qc,
        equals: Jc,
        sub: ev,
        mul: tv,
        div: rv,
        dist: iv,
        sqrDist: nv,
        len: Zn,
        sqrLen: sv,
        forEach: av,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function Kn() {
  var e = new I(4);
  return (
    I != Float32Array && ((e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0)), e
  );
}
function Qn(e) {
  var t = new I(4);
  return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
}
function Jn(e, t, r, i) {
  var n = new I(4);
  return (n[0] = e), (n[1] = t), (n[2] = r), (n[3] = i), n;
}
function es(e, t) {
  return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
}
function ts(e, t, r, i, n) {
  return (e[0] = t), (e[1] = r), (e[2] = i), (e[3] = n), e;
}
function rs(e, t, r) {
  return (
    (e[0] = t[0] + r[0]),
    (e[1] = t[1] + r[1]),
    (e[2] = t[2] + r[2]),
    (e[3] = t[3] + r[3]),
    e
  );
}
function is(e, t, r) {
  return (
    (e[0] = t[0] - r[0]),
    (e[1] = t[1] - r[1]),
    (e[2] = t[2] - r[2]),
    (e[3] = t[3] - r[3]),
    e
  );
}
function ns(e, t, r) {
  return (
    (e[0] = t[0] * r[0]),
    (e[1] = t[1] * r[1]),
    (e[2] = t[2] * r[2]),
    (e[3] = t[3] * r[3]),
    e
  );
}
function ss(e, t, r) {
  return (
    (e[0] = t[0] / r[0]),
    (e[1] = t[1] / r[1]),
    (e[2] = t[2] / r[2]),
    (e[3] = t[3] / r[3]),
    e
  );
}
function hv(e, t) {
  return (
    (e[0] = Math.ceil(t[0])),
    (e[1] = Math.ceil(t[1])),
    (e[2] = Math.ceil(t[2])),
    (e[3] = Math.ceil(t[3])),
    e
  );
}
function lv(e, t) {
  return (
    (e[0] = Math.floor(t[0])),
    (e[1] = Math.floor(t[1])),
    (e[2] = Math.floor(t[2])),
    (e[3] = Math.floor(t[3])),
    e
  );
}
function cv(e, t, r) {
  return (
    (e[0] = Math.min(t[0], r[0])),
    (e[1] = Math.min(t[1], r[1])),
    (e[2] = Math.min(t[2], r[2])),
    (e[3] = Math.min(t[3], r[3])),
    e
  );
}
function vv(e, t, r) {
  return (
    (e[0] = Math.max(t[0], r[0])),
    (e[1] = Math.max(t[1], r[1])),
    (e[2] = Math.max(t[2], r[2])),
    (e[3] = Math.max(t[3], r[3])),
    e
  );
}
function fv(e, t) {
  return (
    (e[0] = Math.round(t[0])),
    (e[1] = Math.round(t[1])),
    (e[2] = Math.round(t[2])),
    (e[3] = Math.round(t[3])),
    e
  );
}
function as(e, t, r) {
  return (
    (e[0] = t[0] * r),
    (e[1] = t[1] * r),
    (e[2] = t[2] * r),
    (e[3] = t[3] * r),
    e
  );
}
function uv(e, t, r, i) {
  return (
    (e[0] = t[0] + r[0] * i),
    (e[1] = t[1] + r[1] * i),
    (e[2] = t[2] + r[2] * i),
    (e[3] = t[3] + r[3] * i),
    e
  );
}
function os(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2],
    s = t[3] - e[3];
  return Math.hypot(r, i, n, s);
}
function hs(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1],
    n = t[2] - e[2],
    s = t[3] - e[3];
  return r * r + i * i + n * n + s * s;
}
function ci(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3];
  return Math.hypot(t, r, i, n);
}
function vi(e) {
  var t = e[0],
    r = e[1],
    i = e[2],
    n = e[3];
  return t * t + r * r + i * i + n * n;
}
function dv(e, t) {
  return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = -t[3]), e;
}
function pv(e, t) {
  return (
    (e[0] = 1 / t[0]),
    (e[1] = 1 / t[1]),
    (e[2] = 1 / t[2]),
    (e[3] = 1 / t[3]),
    e
  );
}
function ls(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = r * r + i * i + n * n + s * s;
  return (
    a > 0 && (a = 1 / Math.sqrt(a)),
    (e[0] = r * a),
    (e[1] = i * a),
    (e[2] = n * a),
    (e[3] = s * a),
    e
  );
}
function cs(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function _v(e, t, r, i) {
  var n = r[0] * i[1] - r[1] * i[0],
    s = r[0] * i[2] - r[2] * i[0],
    a = r[0] * i[3] - r[3] * i[0],
    o = r[1] * i[2] - r[2] * i[1],
    h = r[1] * i[3] - r[3] * i[1],
    l = r[2] * i[3] - r[3] * i[2],
    c = t[0],
    f = t[1],
    d = t[2],
    p = t[3];
  return (
    (e[0] = f * l - d * h + p * o),
    (e[1] = -(c * l) + d * a - p * s),
    (e[2] = c * h - f * a + p * n),
    (e[3] = -(c * o) + f * s - d * n),
    e
  );
}
function vs(e, t, r, i) {
  var n = t[0],
    s = t[1],
    a = t[2],
    o = t[3];
  return (
    (e[0] = n + i * (r[0] - n)),
    (e[1] = s + i * (r[1] - s)),
    (e[2] = a + i * (r[2] - a)),
    (e[3] = o + i * (r[3] - o)),
    e
  );
}
function mv(e, t) {
  t = t || 1;
  var r, i, n, s, a, o;
  do (r = ge() * 2 - 1), (i = ge() * 2 - 1), (a = r * r + i * i);
  while (a >= 1);
  do (n = ge() * 2 - 1), (s = ge() * 2 - 1), (o = n * n + s * s);
  while (o >= 1);
  var h = Math.sqrt((1 - a) / o);
  return (
    (e[0] = t * r), (e[1] = t * i), (e[2] = t * n * h), (e[3] = t * s * h), e
  );
}
function yv(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3];
  return (
    (e[0] = r[0] * i + r[4] * n + r[8] * s + r[12] * a),
    (e[1] = r[1] * i + r[5] * n + r[9] * s + r[13] * a),
    (e[2] = r[2] * i + r[6] * n + r[10] * s + r[14] * a),
    (e[3] = r[3] * i + r[7] * n + r[11] * s + r[15] * a),
    e
  );
}
function gv(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = r[0],
    o = r[1],
    h = r[2],
    l = r[3],
    c = l * i + o * s - h * n,
    f = l * n + h * i - a * s,
    d = l * s + a * n - o * i,
    p = -a * i - o * n - h * s;
  return (
    (e[0] = c * l + p * -a + f * -h - d * -o),
    (e[1] = f * l + p * -o + d * -a - c * -h),
    (e[2] = d * l + p * -h + c * -o - f * -a),
    (e[3] = t[3]),
    e
  );
}
function wv(e) {
  return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 0), e;
}
function xv(e) {
  return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function fs(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function us(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    a = t[0],
    o = t[1],
    h = t[2],
    l = t[3];
  return (
    Math.abs(r - a) <= L * Math.max(1, Math.abs(r), Math.abs(a)) &&
    Math.abs(i - o) <= L * Math.max(1, Math.abs(i), Math.abs(o)) &&
    Math.abs(n - h) <= L * Math.max(1, Math.abs(n), Math.abs(h)) &&
    Math.abs(s - l) <= L * Math.max(1, Math.abs(s), Math.abs(l))
  );
}
var Mv = is,
  Tv = ns,
  Ev = ss,
  bv = os,
  Sv = hs,
  Cv = ci,
  $v = vi,
  Lv = (function () {
    var e = Kn();
    return function (t, r, i, n, s, a) {
      var o, h;
      for (
        r || (r = 4),
          i || (i = 0),
          n ? (h = Math.min(n * r + i, t.length)) : (h = t.length),
          o = i;
        o < h;
        o += r
      )
        (e[0] = t[o]),
          (e[1] = t[o + 1]),
          (e[2] = t[o + 2]),
          (e[3] = t[o + 3]),
          s(e, e, a),
          (t[o] = e[0]),
          (t[o + 1] = e[1]),
          (t[o + 2] = e[2]),
          (t[o + 3] = e[3]);
      return t;
    };
  })(),
  Pv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: Kn,
        clone: Qn,
        fromValues: Jn,
        copy: es,
        set: ts,
        add: rs,
        subtract: is,
        multiply: ns,
        divide: ss,
        ceil: hv,
        floor: lv,
        min: cv,
        max: vv,
        round: fv,
        scale: as,
        scaleAndAdd: uv,
        distance: os,
        squaredDistance: hs,
        length: ci,
        squaredLength: vi,
        negate: dv,
        inverse: pv,
        normalize: ls,
        dot: cs,
        cross: _v,
        lerp: vs,
        random: mv,
        transformMat4: yv,
        transformQuat: gv,
        zero: wv,
        str: xv,
        exactEquals: fs,
        equals: us,
        sub: Mv,
        mul: Tv,
        div: Ev,
        dist: bv,
        sqrDist: Sv,
        len: Cv,
        sqrLen: $v,
        forEach: Lv,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function lr() {
  var e = new I(4);
  return (
    I != Float32Array && ((e[0] = 0), (e[1] = 0), (e[2] = 0)), (e[3] = 1), e
  );
}
function zv(e) {
  return (e[0] = 0), (e[1] = 0), (e[2] = 0), (e[3] = 1), e;
}
function ds(e, t, r) {
  r = r * 0.5;
  var i = Math.sin(r);
  return (
    (e[0] = i * t[0]),
    (e[1] = i * t[1]),
    (e[2] = i * t[2]),
    (e[3] = Math.cos(r)),
    e
  );
}
function Av(e, t) {
  var r = Math.acos(t[3]) * 2,
    i = Math.sin(r / 2);
  return (
    i > L
      ? ((e[0] = t[0] / i), (e[1] = t[1] / i), (e[2] = t[2] / i))
      : ((e[0] = 1), (e[1] = 0), (e[2] = 0)),
    r
  );
}
function Rv(e, t) {
  var r = ui(e, t);
  return Math.acos(2 * r * r - 1);
}
function ps(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = r[0],
    h = r[1],
    l = r[2],
    c = r[3];
  return (
    (e[0] = i * c + a * o + n * l - s * h),
    (e[1] = n * c + a * h + s * o - i * l),
    (e[2] = s * c + a * l + i * h - n * o),
    (e[3] = a * c - i * o - n * h - s * l),
    e
  );
}
function _s(e, t, r) {
  r *= 0.5;
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = Math.sin(r),
    h = Math.cos(r);
  return (
    (e[0] = i * h + a * o),
    (e[1] = n * h + s * o),
    (e[2] = s * h - n * o),
    (e[3] = a * h - i * o),
    e
  );
}
function ms(e, t, r) {
  r *= 0.5;
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = Math.sin(r),
    h = Math.cos(r);
  return (
    (e[0] = i * h - s * o),
    (e[1] = n * h + a * o),
    (e[2] = s * h + i * o),
    (e[3] = a * h - n * o),
    e
  );
}
function ys(e, t, r) {
  r *= 0.5;
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = Math.sin(r),
    h = Math.cos(r);
  return (
    (e[0] = i * h + n * o),
    (e[1] = n * h - i * o),
    (e[2] = s * h + a * o),
    (e[3] = a * h - s * o),
    e
  );
}
function Iv(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2];
  return (
    (e[0] = r),
    (e[1] = i),
    (e[2] = n),
    (e[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n))),
    e
  );
}
function gs(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = Math.sqrt(r * r + i * i + n * n),
    o = Math.exp(s),
    h = a > 0 ? (o * Math.sin(a)) / a : 0;
  return (
    (e[0] = r * h), (e[1] = i * h), (e[2] = n * h), (e[3] = o * Math.cos(a)), e
  );
}
function ws(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = Math.sqrt(r * r + i * i + n * n),
    o = a > 0 ? Math.atan2(a, s) / a : 0;
  return (
    (e[0] = r * o),
    (e[1] = i * o),
    (e[2] = n * o),
    (e[3] = 0.5 * Math.log(r * r + i * i + n * n + s * s)),
    e
  );
}
function Ov(e, t, r) {
  return ws(e, t), Ms(e, e, r), gs(e, e), e;
}
function hr(e, t, r, i) {
  var n = t[0],
    s = t[1],
    a = t[2],
    o = t[3],
    h = r[0],
    l = r[1],
    c = r[2],
    f = r[3],
    d,
    p,
    _,
    w,
    m;
  return (
    (p = n * h + s * l + a * c + o * f),
    p < 0 && ((p = -p), (h = -h), (l = -l), (c = -c), (f = -f)),
    1 - p > L
      ? ((d = Math.acos(p)),
        (_ = Math.sin(d)),
        (w = Math.sin((1 - i) * d) / _),
        (m = Math.sin(i * d) / _))
      : ((w = 1 - i), (m = i)),
    (e[0] = w * n + m * h),
    (e[1] = w * s + m * l),
    (e[2] = w * a + m * c),
    (e[3] = w * o + m * f),
    e
  );
}
function Dv(e) {
  var t = ge(),
    r = ge(),
    i = ge(),
    n = Math.sqrt(1 - t),
    s = Math.sqrt(t);
  return (
    (e[0] = n * Math.sin(2 * Math.PI * r)),
    (e[1] = n * Math.cos(2 * Math.PI * r)),
    (e[2] = s * Math.sin(2 * Math.PI * i)),
    (e[3] = s * Math.cos(2 * Math.PI * i)),
    e
  );
}
function Hv(e, t) {
  var r = t[0],
    i = t[1],
    n = t[2],
    s = t[3],
    a = r * r + i * i + n * n + s * s,
    o = a ? 1 / a : 0;
  return (e[0] = -r * o), (e[1] = -i * o), (e[2] = -n * o), (e[3] = s * o), e;
}
function Nv(e, t) {
  return (e[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), (e[3] = t[3]), e;
}
function xs(e, t) {
  var r = t[0] + t[4] + t[8],
    i;
  if (r > 0)
    (i = Math.sqrt(r + 1)),
      (e[3] = 0.5 * i),
      (i = 0.5 / i),
      (e[0] = (t[5] - t[7]) * i),
      (e[1] = (t[6] - t[2]) * i),
      (e[2] = (t[1] - t[3]) * i);
  else {
    var n = 0;
    t[4] > t[0] && (n = 1), t[8] > t[n * 3 + n] && (n = 2);
    var s = (n + 1) % 3,
      a = (n + 2) % 3;
    (i = Math.sqrt(t[n * 3 + n] - t[s * 3 + s] - t[a * 3 + a] + 1)),
      (e[n] = 0.5 * i),
      (i = 0.5 / i),
      (e[3] = (t[s * 3 + a] - t[a * 3 + s]) * i),
      (e[s] = (t[s * 3 + n] + t[n * 3 + s]) * i),
      (e[a] = (t[a * 3 + n] + t[n * 3 + a]) * i);
  }
  return e;
}
function Fv(e, t, r, i) {
  var n = (0.5 * Math.PI) / 180;
  (t *= n), (r *= n), (i *= n);
  var s = Math.sin(t),
    a = Math.cos(t),
    o = Math.sin(r),
    h = Math.cos(r),
    l = Math.sin(i),
    c = Math.cos(i);
  return (
    (e[0] = s * h * c - a * o * l),
    (e[1] = a * o * c + s * h * l),
    (e[2] = a * h * l - s * o * c),
    (e[3] = a * h * c + s * o * l),
    e
  );
}
function Vv(e) {
  return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
var qv = Qn,
  kv = Jn,
  fi = es,
  Wv = ts,
  Yv = rs,
  Xv = ps,
  Ms = as,
  ui = cs,
  Bv = vs,
  di = ci,
  Uv = di,
  pi = vi,
  jv = pi,
  _i = ls,
  Gv = fs,
  Zv = us,
  Kv = (function () {
    var e = hi(),
      t = Qr(1, 0, 0),
      r = Qr(0, 1, 0);
    return function (i, n, s) {
      var a = li(n, s);
      return a < -0.999999
        ? (or(e, t, n),
          Zn(e) < 1e-6 && or(e, r, n),
          Gn(e, e),
          ds(i, e, Math.PI),
          i)
        : a > 0.999999
        ? ((i[0] = 0), (i[1] = 0), (i[2] = 0), (i[3] = 1), i)
        : (or(e, n, s),
          (i[0] = e[0]),
          (i[1] = e[1]),
          (i[2] = e[2]),
          (i[3] = 1 + a),
          _i(i, i));
    };
  })(),
  Qv = (function () {
    var e = lr(),
      t = lr();
    return function (r, i, n, s, a, o) {
      return hr(e, i, a, o), hr(t, n, s, o), hr(r, e, t, 2 * o * (1 - o)), r;
    };
  })(),
  Jv = (function () {
    var e = An();
    return function (t, r, i, n) {
      return (
        (e[0] = i[0]),
        (e[3] = i[1]),
        (e[6] = i[2]),
        (e[1] = n[0]),
        (e[4] = n[1]),
        (e[7] = n[2]),
        (e[2] = -r[0]),
        (e[5] = -r[1]),
        (e[8] = -r[2]),
        _i(t, xs(t, e))
      );
    };
  })(),
  ef = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: lr,
        identity: zv,
        setAxisAngle: ds,
        getAxisAngle: Av,
        getAngle: Rv,
        multiply: ps,
        rotateX: _s,
        rotateY: ms,
        rotateZ: ys,
        calculateW: Iv,
        exp: gs,
        ln: ws,
        pow: Ov,
        slerp: hr,
        random: Dv,
        invert: Hv,
        conjugate: Nv,
        fromMat3: xs,
        fromEuler: Fv,
        str: Vv,
        clone: qv,
        fromValues: kv,
        copy: fi,
        set: Wv,
        add: Yv,
        mul: Xv,
        scale: Ms,
        dot: ui,
        lerp: Bv,
        length: di,
        len: Uv,
        squaredLength: pi,
        sqrLen: jv,
        normalize: _i,
        exactEquals: Gv,
        equals: Zv,
        rotationTo: Kv,
        sqlerp: Qv,
        setAxes: Jv,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function tf() {
  var e = new I(8);
  return (
    I != Float32Array &&
      ((e[0] = 0),
      (e[1] = 0),
      (e[2] = 0),
      (e[4] = 0),
      (e[5] = 0),
      (e[6] = 0),
      (e[7] = 0)),
    (e[3] = 1),
    e
  );
}
function rf(e) {
  var t = new I(8);
  return (
    (t[0] = e[0]),
    (t[1] = e[1]),
    (t[2] = e[2]),
    (t[3] = e[3]),
    (t[4] = e[4]),
    (t[5] = e[5]),
    (t[6] = e[6]),
    (t[7] = e[7]),
    t
  );
}
function nf(e, t, r, i, n, s, a, o) {
  var h = new I(8);
  return (
    (h[0] = e),
    (h[1] = t),
    (h[2] = r),
    (h[3] = i),
    (h[4] = n),
    (h[5] = s),
    (h[6] = a),
    (h[7] = o),
    h
  );
}
function sf(e, t, r, i, n, s, a) {
  var o = new I(8);
  (o[0] = e), (o[1] = t), (o[2] = r), (o[3] = i);
  var h = n * 0.5,
    l = s * 0.5,
    c = a * 0.5;
  return (
    (o[4] = h * i + l * r - c * t),
    (o[5] = l * i + c * e - h * r),
    (o[6] = c * i + h * t - l * e),
    (o[7] = -h * e - l * t - c * r),
    o
  );
}
function Ts(e, t, r) {
  var i = r[0] * 0.5,
    n = r[1] * 0.5,
    s = r[2] * 0.5,
    a = t[0],
    o = t[1],
    h = t[2],
    l = t[3];
  return (
    (e[0] = a),
    (e[1] = o),
    (e[2] = h),
    (e[3] = l),
    (e[4] = i * l + n * h - s * o),
    (e[5] = n * l + s * a - i * h),
    (e[6] = s * l + i * o - n * a),
    (e[7] = -i * a - n * o - s * h),
    e
  );
}
function af(e, t) {
  return (
    (e[0] = 0),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 1),
    (e[4] = t[0] * 0.5),
    (e[5] = t[1] * 0.5),
    (e[6] = t[2] * 0.5),
    (e[7] = 0),
    e
  );
}
function of(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = 0),
    (e[5] = 0),
    (e[6] = 0),
    (e[7] = 0),
    e
  );
}
function hf(e, t) {
  var r = lr();
  Vn(r, t);
  var i = new I(3);
  return Nn(i, t), Ts(e, r, i), e;
}
function Es(e, t) {
  return (
    (e[0] = t[0]),
    (e[1] = t[1]),
    (e[2] = t[2]),
    (e[3] = t[3]),
    (e[4] = t[4]),
    (e[5] = t[5]),
    (e[6] = t[6]),
    (e[7] = t[7]),
    e
  );
}
function lf(e) {
  return (
    (e[0] = 0),
    (e[1] = 0),
    (e[2] = 0),
    (e[3] = 1),
    (e[4] = 0),
    (e[5] = 0),
    (e[6] = 0),
    (e[7] = 0),
    e
  );
}
function cf(e, t, r, i, n, s, a, o, h) {
  return (
    (e[0] = t),
    (e[1] = r),
    (e[2] = i),
    (e[3] = n),
    (e[4] = s),
    (e[5] = a),
    (e[6] = o),
    (e[7] = h),
    e
  );
}
var vf = fi;
function ff(e, t) {
  return (e[0] = t[4]), (e[1] = t[5]), (e[2] = t[6]), (e[3] = t[7]), e;
}
var uf = fi;
function df(e, t) {
  return (e[4] = t[0]), (e[5] = t[1]), (e[6] = t[2]), (e[7] = t[3]), e;
}
function pf(e, t) {
  var r = t[4],
    i = t[5],
    n = t[6],
    s = t[7],
    a = -t[0],
    o = -t[1],
    h = -t[2],
    l = t[3];
  return (
    (e[0] = (r * l + s * a + i * h - n * o) * 2),
    (e[1] = (i * l + s * o + n * a - r * h) * 2),
    (e[2] = (n * l + s * h + r * o - i * a) * 2),
    e
  );
}
function _f(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = r[0] * 0.5,
    h = r[1] * 0.5,
    l = r[2] * 0.5,
    c = t[4],
    f = t[5],
    d = t[6],
    p = t[7];
  return (
    (e[0] = i),
    (e[1] = n),
    (e[2] = s),
    (e[3] = a),
    (e[4] = a * o + n * l - s * h + c),
    (e[5] = a * h + s * o - i * l + f),
    (e[6] = a * l + i * h - n * o + d),
    (e[7] = -i * o - n * h - s * l + p),
    e
  );
}
function mf(e, t, r) {
  var i = -t[0],
    n = -t[1],
    s = -t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = o * a + c * i + h * s - l * n,
    d = h * a + c * n + l * i - o * s,
    p = l * a + c * s + o * n - h * i,
    _ = c * a - o * i - h * n - l * s;
  return (
    _s(e, t, r),
    (i = e[0]),
    (n = e[1]),
    (s = e[2]),
    (a = e[3]),
    (e[4] = f * a + _ * i + d * s - p * n),
    (e[5] = d * a + _ * n + p * i - f * s),
    (e[6] = p * a + _ * s + f * n - d * i),
    (e[7] = _ * a - f * i - d * n - p * s),
    e
  );
}
function yf(e, t, r) {
  var i = -t[0],
    n = -t[1],
    s = -t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = o * a + c * i + h * s - l * n,
    d = h * a + c * n + l * i - o * s,
    p = l * a + c * s + o * n - h * i,
    _ = c * a - o * i - h * n - l * s;
  return (
    ms(e, t, r),
    (i = e[0]),
    (n = e[1]),
    (s = e[2]),
    (a = e[3]),
    (e[4] = f * a + _ * i + d * s - p * n),
    (e[5] = d * a + _ * n + p * i - f * s),
    (e[6] = p * a + _ * s + f * n - d * i),
    (e[7] = _ * a - f * i - d * n - p * s),
    e
  );
}
function gf(e, t, r) {
  var i = -t[0],
    n = -t[1],
    s = -t[2],
    a = t[3],
    o = t[4],
    h = t[5],
    l = t[6],
    c = t[7],
    f = o * a + c * i + h * s - l * n,
    d = h * a + c * n + l * i - o * s,
    p = l * a + c * s + o * n - h * i,
    _ = c * a - o * i - h * n - l * s;
  return (
    ys(e, t, r),
    (i = e[0]),
    (n = e[1]),
    (s = e[2]),
    (a = e[3]),
    (e[4] = f * a + _ * i + d * s - p * n),
    (e[5] = d * a + _ * n + p * i - f * s),
    (e[6] = p * a + _ * s + f * n - d * i),
    (e[7] = _ * a - f * i - d * n - p * s),
    e
  );
}
function wf(e, t, r) {
  var i = r[0],
    n = r[1],
    s = r[2],
    a = r[3],
    o = t[0],
    h = t[1],
    l = t[2],
    c = t[3];
  return (
    (e[0] = o * a + c * i + h * s - l * n),
    (e[1] = h * a + c * n + l * i - o * s),
    (e[2] = l * a + c * s + o * n - h * i),
    (e[3] = c * a - o * i - h * n - l * s),
    (o = t[4]),
    (h = t[5]),
    (l = t[6]),
    (c = t[7]),
    (e[4] = o * a + c * i + h * s - l * n),
    (e[5] = h * a + c * n + l * i - o * s),
    (e[6] = l * a + c * s + o * n - h * i),
    (e[7] = c * a - o * i - h * n - l * s),
    e
  );
}
function xf(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = r[0],
    h = r[1],
    l = r[2],
    c = r[3];
  return (
    (e[0] = i * c + a * o + n * l - s * h),
    (e[1] = n * c + a * h + s * o - i * l),
    (e[2] = s * c + a * l + i * h - n * o),
    (e[3] = a * c - i * o - n * h - s * l),
    (o = r[4]),
    (h = r[5]),
    (l = r[6]),
    (c = r[7]),
    (e[4] = i * c + a * o + n * l - s * h),
    (e[5] = n * c + a * h + s * o - i * l),
    (e[6] = s * c + a * l + i * h - n * o),
    (e[7] = a * c - i * o - n * h - s * l),
    e
  );
}
function Mf(e, t, r, i) {
  if (Math.abs(i) < L) return Es(e, t);
  var n = Math.hypot(r[0], r[1], r[2]);
  i = i * 0.5;
  var s = Math.sin(i),
    a = (s * r[0]) / n,
    o = (s * r[1]) / n,
    h = (s * r[2]) / n,
    l = Math.cos(i),
    c = t[0],
    f = t[1],
    d = t[2],
    p = t[3];
  (e[0] = c * l + p * a + f * h - d * o),
    (e[1] = f * l + p * o + d * a - c * h),
    (e[2] = d * l + p * h + c * o - f * a),
    (e[3] = p * l - c * a - f * o - d * h);
  var _ = t[4],
    w = t[5],
    m = t[6],
    M = t[7];
  return (
    (e[4] = _ * l + M * a + w * h - m * o),
    (e[5] = w * l + M * o + m * a - _ * h),
    (e[6] = m * l + M * h + _ * o - w * a),
    (e[7] = M * l - _ * a - w * o - m * h),
    e
  );
}
function Tf(e, t, r) {
  return (
    (e[0] = t[0] + r[0]),
    (e[1] = t[1] + r[1]),
    (e[2] = t[2] + r[2]),
    (e[3] = t[3] + r[3]),
    (e[4] = t[4] + r[4]),
    (e[5] = t[5] + r[5]),
    (e[6] = t[6] + r[6]),
    (e[7] = t[7] + r[7]),
    e
  );
}
function bs(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3],
    o = r[4],
    h = r[5],
    l = r[6],
    c = r[7],
    f = t[4],
    d = t[5],
    p = t[6],
    _ = t[7],
    w = r[0],
    m = r[1],
    M = r[2],
    b = r[3];
  return (
    (e[0] = i * b + a * w + n * M - s * m),
    (e[1] = n * b + a * m + s * w - i * M),
    (e[2] = s * b + a * M + i * m - n * w),
    (e[3] = a * b - i * w - n * m - s * M),
    (e[4] = i * c + a * o + n * l - s * h + f * b + _ * w + d * M - p * m),
    (e[5] = n * c + a * h + s * o - i * l + d * b + _ * m + p * w - f * M),
    (e[6] = s * c + a * l + i * h - n * o + p * b + _ * M + f * m - d * w),
    (e[7] = a * c - i * o - n * h - s * l + _ * b - f * w - d * m - p * M),
    e
  );
}
var Ef = bs;
function bf(e, t, r) {
  return (
    (e[0] = t[0] * r),
    (e[1] = t[1] * r),
    (e[2] = t[2] * r),
    (e[3] = t[3] * r),
    (e[4] = t[4] * r),
    (e[5] = t[5] * r),
    (e[6] = t[6] * r),
    (e[7] = t[7] * r),
    e
  );
}
var Ss = ui;
function Sf(e, t, r, i) {
  var n = 1 - i;
  return (
    Ss(t, r) < 0 && (i = -i),
    (e[0] = t[0] * n + r[0] * i),
    (e[1] = t[1] * n + r[1] * i),
    (e[2] = t[2] * n + r[2] * i),
    (e[3] = t[3] * n + r[3] * i),
    (e[4] = t[4] * n + r[4] * i),
    (e[5] = t[5] * n + r[5] * i),
    (e[6] = t[6] * n + r[6] * i),
    (e[7] = t[7] * n + r[7] * i),
    e
  );
}
function Cf(e, t) {
  var r = mr(t);
  return (
    (e[0] = -t[0] / r),
    (e[1] = -t[1] / r),
    (e[2] = -t[2] / r),
    (e[3] = t[3] / r),
    (e[4] = -t[4] / r),
    (e[5] = -t[5] / r),
    (e[6] = -t[6] / r),
    (e[7] = t[7] / r),
    e
  );
}
function $f(e, t) {
  return (
    (e[0] = -t[0]),
    (e[1] = -t[1]),
    (e[2] = -t[2]),
    (e[3] = t[3]),
    (e[4] = -t[4]),
    (e[5] = -t[5]),
    (e[6] = -t[6]),
    (e[7] = t[7]),
    e
  );
}
var Cs = di,
  Lf = Cs,
  mr = pi,
  Pf = mr;
function zf(e, t) {
  var r = mr(t);
  if (r > 0) {
    r = Math.sqrt(r);
    var i = t[0] / r,
      n = t[1] / r,
      s = t[2] / r,
      a = t[3] / r,
      o = t[4],
      h = t[5],
      l = t[6],
      c = t[7],
      f = i * o + n * h + s * l + a * c;
    (e[0] = i),
      (e[1] = n),
      (e[2] = s),
      (e[3] = a),
      (e[4] = (o - i * f) / r),
      (e[5] = (h - n * f) / r),
      (e[6] = (l - s * f) / r),
      (e[7] = (c - a * f) / r);
  }
  return e;
}
function Af(e) {
  return (
    "quat2(" +
    e[0] +
    ", " +
    e[1] +
    ", " +
    e[2] +
    ", " +
    e[3] +
    ", " +
    e[4] +
    ", " +
    e[5] +
    ", " +
    e[6] +
    ", " +
    e[7] +
    ")"
  );
}
function Rf(e, t) {
  return (
    e[0] === t[0] &&
    e[1] === t[1] &&
    e[2] === t[2] &&
    e[3] === t[3] &&
    e[4] === t[4] &&
    e[5] === t[5] &&
    e[6] === t[6] &&
    e[7] === t[7]
  );
}
function If(e, t) {
  var r = e[0],
    i = e[1],
    n = e[2],
    s = e[3],
    a = e[4],
    o = e[5],
    h = e[6],
    l = e[7],
    c = t[0],
    f = t[1],
    d = t[2],
    p = t[3],
    _ = t[4],
    w = t[5],
    m = t[6],
    M = t[7];
  return (
    Math.abs(r - c) <= L * Math.max(1, Math.abs(r), Math.abs(c)) &&
    Math.abs(i - f) <= L * Math.max(1, Math.abs(i), Math.abs(f)) &&
    Math.abs(n - d) <= L * Math.max(1, Math.abs(n), Math.abs(d)) &&
    Math.abs(s - p) <= L * Math.max(1, Math.abs(s), Math.abs(p)) &&
    Math.abs(a - _) <= L * Math.max(1, Math.abs(a), Math.abs(_)) &&
    Math.abs(o - w) <= L * Math.max(1, Math.abs(o), Math.abs(w)) &&
    Math.abs(h - m) <= L * Math.max(1, Math.abs(h), Math.abs(m)) &&
    Math.abs(l - M) <= L * Math.max(1, Math.abs(l), Math.abs(M))
  );
}
var Of = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      create: tf,
      clone: rf,
      fromValues: nf,
      fromRotationTranslationValues: sf,
      fromRotationTranslation: Ts,
      fromTranslation: af,
      fromRotation: of,
      fromMat4: hf,
      copy: Es,
      identity: lf,
      set: cf,
      getReal: vf,
      getDual: ff,
      setReal: uf,
      setDual: df,
      getTranslation: pf,
      translate: _f,
      rotateX: mf,
      rotateY: yf,
      rotateZ: gf,
      rotateByQuatAppend: wf,
      rotateByQuatPrepend: xf,
      rotateAroundAxis: Mf,
      add: Tf,
      multiply: bs,
      mul: Ef,
      scale: bf,
      dot: Ss,
      lerp: Sf,
      invert: Cf,
      conjugate: $f,
      length: Cs,
      len: Lf,
      squaredLength: mr,
      sqrLen: Pf,
      normalize: zf,
      str: Af,
      exactEquals: Rf,
      equals: If,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function $s() {
  var e = new I(2);
  return I != Float32Array && ((e[0] = 0), (e[1] = 0)), e;
}
function Df(e) {
  var t = new I(2);
  return (t[0] = e[0]), (t[1] = e[1]), t;
}
function Hf(e, t) {
  var r = new I(2);
  return (r[0] = e), (r[1] = t), r;
}
function Nf(e, t) {
  return (e[0] = t[0]), (e[1] = t[1]), e;
}
function Ff(e, t, r) {
  return (e[0] = t), (e[1] = r), e;
}
function Vf(e, t, r) {
  return (e[0] = t[0] + r[0]), (e[1] = t[1] + r[1]), e;
}
function Ls(e, t, r) {
  return (e[0] = t[0] - r[0]), (e[1] = t[1] - r[1]), e;
}
function Ps(e, t, r) {
  return (e[0] = t[0] * r[0]), (e[1] = t[1] * r[1]), e;
}
function zs(e, t, r) {
  return (e[0] = t[0] / r[0]), (e[1] = t[1] / r[1]), e;
}
function qf(e, t) {
  return (e[0] = Math.ceil(t[0])), (e[1] = Math.ceil(t[1])), e;
}
function kf(e, t) {
  return (e[0] = Math.floor(t[0])), (e[1] = Math.floor(t[1])), e;
}
function Wf(e, t, r) {
  return (e[0] = Math.min(t[0], r[0])), (e[1] = Math.min(t[1], r[1])), e;
}
function Yf(e, t, r) {
  return (e[0] = Math.max(t[0], r[0])), (e[1] = Math.max(t[1], r[1])), e;
}
function Xf(e, t) {
  return (e[0] = Math.round(t[0])), (e[1] = Math.round(t[1])), e;
}
function Bf(e, t, r) {
  return (e[0] = t[0] * r), (e[1] = t[1] * r), e;
}
function Uf(e, t, r, i) {
  return (e[0] = t[0] + r[0] * i), (e[1] = t[1] + r[1] * i), e;
}
function As(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1];
  return Math.hypot(r, i);
}
function Rs(e, t) {
  var r = t[0] - e[0],
    i = t[1] - e[1];
  return r * r + i * i;
}
function Is(e) {
  var t = e[0],
    r = e[1];
  return Math.hypot(t, r);
}
function Os(e) {
  var t = e[0],
    r = e[1];
  return t * t + r * r;
}
function jf(e, t) {
  return (e[0] = -t[0]), (e[1] = -t[1]), e;
}
function Gf(e, t) {
  return (e[0] = 1 / t[0]), (e[1] = 1 / t[1]), e;
}
function Zf(e, t) {
  var r = t[0],
    i = t[1],
    n = r * r + i * i;
  return (
    n > 0 && (n = 1 / Math.sqrt(n)), (e[0] = t[0] * n), (e[1] = t[1] * n), e
  );
}
function Kf(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function Qf(e, t, r) {
  var i = t[0] * r[1] - t[1] * r[0];
  return (e[0] = e[1] = 0), (e[2] = i), e;
}
function Jf(e, t, r, i) {
  var n = t[0],
    s = t[1];
  return (e[0] = n + i * (r[0] - n)), (e[1] = s + i * (r[1] - s)), e;
}
function eu(e, t) {
  t = t || 1;
  var r = ge() * 2 * Math.PI;
  return (e[0] = Math.cos(r) * t), (e[1] = Math.sin(r) * t), e;
}
function tu(e, t, r) {
  var i = t[0],
    n = t[1];
  return (e[0] = r[0] * i + r[2] * n), (e[1] = r[1] * i + r[3] * n), e;
}
function ru(e, t, r) {
  var i = t[0],
    n = t[1];
  return (
    (e[0] = r[0] * i + r[2] * n + r[4]), (e[1] = r[1] * i + r[3] * n + r[5]), e
  );
}
function iu(e, t, r) {
  var i = t[0],
    n = t[1];
  return (
    (e[0] = r[0] * i + r[3] * n + r[6]), (e[1] = r[1] * i + r[4] * n + r[7]), e
  );
}
function nu(e, t, r) {
  var i = t[0],
    n = t[1];
  return (
    (e[0] = r[0] * i + r[4] * n + r[12]),
    (e[1] = r[1] * i + r[5] * n + r[13]),
    e
  );
}
function su(e, t, r, i) {
  var n = t[0] - r[0],
    s = t[1] - r[1],
    a = Math.sin(i),
    o = Math.cos(i);
  return (e[0] = n * o - s * a + r[0]), (e[1] = n * a + s * o + r[1]), e;
}
function au(e, t) {
  var r = e[0],
    i = e[1],
    n = t[0],
    s = t[1],
    a = Math.sqrt(r * r + i * i) * Math.sqrt(n * n + s * s),
    o = a && (r * n + i * s) / a;
  return Math.acos(Math.min(Math.max(o, -1), 1));
}
function ou(e) {
  return (e[0] = 0), (e[1] = 0), e;
}
function hu(e) {
  return "vec2(" + e[0] + ", " + e[1] + ")";
}
function lu(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function cu(e, t) {
  var r = e[0],
    i = e[1],
    n = t[0],
    s = t[1];
  return (
    Math.abs(r - n) <= L * Math.max(1, Math.abs(r), Math.abs(n)) &&
    Math.abs(i - s) <= L * Math.max(1, Math.abs(i), Math.abs(s))
  );
}
var vu = Is,
  fu = Ls,
  uu = Ps,
  du = zs,
  pu = As,
  _u = Rs,
  mu = Os,
  yu = (function () {
    var e = $s();
    return function (t, r, i, n, s, a) {
      var o, h;
      for (
        r || (r = 2),
          i || (i = 0),
          n ? (h = Math.min(n * r + i, t.length)) : (h = t.length),
          o = i;
        o < h;
        o += r
      )
        (e[0] = t[o]),
          (e[1] = t[o + 1]),
          s(e, e, a),
          (t[o] = e[0]),
          (t[o + 1] = e[1]);
      return t;
    };
  })(),
  gu = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        create: $s,
        clone: Df,
        fromValues: Hf,
        copy: Nf,
        set: Ff,
        add: Vf,
        subtract: Ls,
        multiply: Ps,
        divide: zs,
        ceil: qf,
        floor: kf,
        min: Wf,
        max: Yf,
        round: Xf,
        scale: Bf,
        scaleAndAdd: Uf,
        distance: As,
        squaredDistance: Rs,
        length: Is,
        squaredLength: Os,
        negate: jf,
        inverse: Gf,
        normalize: Zf,
        dot: Kf,
        cross: Qf,
        lerp: Jf,
        random: eu,
        transformMat2: tu,
        transformMat2d: ru,
        transformMat3: iu,
        transformMat4: nu,
        rotate: su,
        angle: au,
        zero: ou,
        str: hu,
        exactEquals: lu,
        equals: cu,
        len: vu,
        sub: fu,
        mul: uu,
        div: du,
        dist: pu,
        sqrDist: _u,
        sqrLen: mu,
        forEach: yu,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  wu = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        glMatrix: uh,
        mat2: Nh,
        mat2d: hl,
        mat3: Nl,
        mat4: bc,
        quat: ef,
        quat2: Of,
        vec2: gu,
        vec3: ov,
        vec4: Pv,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ne = so(wu);
function xu(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
var wt = xu,
  Mu = 256,
  Wi = 256,
  nr = wt,
  Tu = ne.vec4,
  cr = ne.vec3,
  yt = ne.mat4;
function Yi(e, t, r) {
  var i = e.createShader(t);
  if (
    (e.shaderSource(i, r),
    e.compileShader(i),
    !e.getShaderParameter(i, e.COMPILE_STATUS))
  )
    throw e.getShaderInfoLog(i);
  return i;
}
function Eu(e, t, r, i, n) {
  var s = Yi(e, e.VERTEX_SHADER, t),
    a = Yi(e, e.FRAGMENT_SHADER, r),
    o = e.createProgram();
  if (
    (e.attachShader(o, s),
    e.attachShader(o, a),
    e.linkProgram(o),
    !e.getProgramParameter(o, e.LINK_STATUS))
  )
    throw e.getProgramInfoLog(o);
  for (var h = 0; h < i.length; h++) {
    var l = i[h];
    if (((o[l] = e.getAttribLocation(o, l)), o[l] === -1))
      throw new Error("Shader program has no " + l + " attribute");
  }
  for (var c = 0; c < n.length; c++) {
    var f = n[c];
    if (((o[f] = e.getUniformLocation(o, f)), o[f] === -1))
      throw new Error("Shader program has no " + f + " uniform");
  }
  return o;
}
function bu(e, t) {
  for (var r = e.getAttachedShaders(t), i = 0; i < r.length; i++) {
    var n = r[i];
    e.detachShader(t, n), e.deleteShader(n);
  }
  e.deleteProgram(t);
}
function Nr(e, t, r, i) {
  var n = e.createBuffer();
  return e.bindBuffer(t, n), e.bufferData(t, i, r), n;
}
function Su(e, t, r, i) {
  return {
    vertexIndices: Nr(
      e,
      e.ELEMENT_ARRAY_BUFFER,
      e.STATIC_DRAW,
      new Uint16Array(t)
    ),
    vertexPositions: Nr(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(r)),
    textureCoords: Nr(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(i)),
  };
}
function Cu(e, t) {
  e.deleteBuffer(t.vertexIndices),
    e.deleteBuffer(t.vertexPositions),
    e.deleteBuffer(t.textureCoords);
}
function $u(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.enableVertexAttribArray(i);
}
function Lu(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.disableVertexAttribArray(i);
}
function Pu(e, t, r) {
  e.activeTexture(e.TEXTURE0),
    e.bindTexture(e.TEXTURE_2D, r._texture),
    e.uniform1i(t.uSampler, 0);
}
function zu(e, t, r, i) {
  var n = ((r + 1) * Wi - i) / (Wi * Mu);
  e.uniform1f(t.uDepth, n);
}
var Au = 1,
  Ru = Tu.create(),
  Ds = yt.create();
yt.identity(Ds);
function Iu(e, t, r) {
  var i = Au;
  t && t.opacity != null && (i = t.opacity), e.uniform1f(r.opacity, i);
  var n = Ru;
  t && t.colorOffset && (n = t.colorOffset), e.uniform4fv(r.colorOffset, n);
  var s = Ds;
  t && t.colorMatrix && (s = t.colorMatrix),
    e.uniformMatrix4fv(r.colorMatrix, !1, s);
}
var Xi = cr.create(),
  Bi = cr.create();
function Ou(e, t, r, i) {
  if (r.x === 0 && r.width === 1 && r.y === 0 && r.height === 1) {
    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight),
      yt.identity(i);
    return;
  }
  var n = r.x,
    s = nr(n, 0, 1),
    a = s - n,
    o = 1 - s,
    h = nr(r.width - a, 0, o),
    l = r.width - h,
    c = 1 - r.height - r.y,
    f = nr(c, 0, 1),
    d = f - c,
    p = 1 - f,
    _ = nr(r.height - d, 0, p),
    w = r.height - _;
  cr.set(Bi, r.width / h, r.height / _, 1),
    cr.set(Xi, (l - a) / h, (w - d) / _, 0),
    yt.identity(i),
    yt.translate(i, i, Xi),
    yt.scale(i, i, Bi),
    e.viewport(
      e.drawingBufferWidth * s,
      e.drawingBufferHeight * f,
      e.drawingBufferWidth * h,
      e.drawingBufferHeight * _
    );
}
var Hs = {
    createShaderProgram: Eu,
    destroyShaderProgram: bu,
    createConstantBuffers: Su,
    destroyConstantBuffers: Cu,
    enableAttributes: $u,
    disableAttributes: Lu,
    setTexture: Pu,
    setDepth: zu,
    setViewport: Ou,
    setupPixelEffectUniforms: Iu,
  },
  Du = [
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "uniform float uDepth;",
    "uniform mat4 uViewportMatrix;",
    "uniform mat4 uProjMatrix;",
    "varying vec2 vTextureCoord;",
    "void main(void) {",
    "  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);",
    "  gl_Position.z = uDepth * gl_Position.w;",
    "  vTextureCoord = aTextureCoord;",
    "}",
  ].join(`
`),
  Hu = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float;",
    "#endif",
    "uniform sampler2D uSampler;",
    "uniform float uOpacity;",
    "uniform vec4 uColorOffset;",
    "uniform mat4 uColorMatrix;",
    "varying vec2 vTextureCoord;",
    "void main(void) {",
    "  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;",
    "  gl_FragColor = vec4(color.rgba * uOpacity);",
    "}",
  ].join(`
`),
  nt = ne.mat4,
  Ui = ne.vec3,
  Nu = U,
  Ce = Hs,
  Fu = Ce.createConstantBuffers,
  Vu = Ce.destroyConstantBuffers,
  qu = Ce.createShaderProgram,
  ku = Ce.destroyShaderProgram,
  Wu = Ce.enableAttributes,
  Yu = Ce.disableAttributes,
  Xu = Ce.setViewport,
  Bu = Ce.setupPixelEffectUniforms,
  Uu = Ce.setDepth,
  ju = Ce.setTexture,
  Gu = Du,
  Zu = Hu,
  Ns = [0, 1, 2, 0, 2, 3],
  Ku = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0],
  Qu = [0, 0, 1, 0, 1, 1, 0, 1],
  Ju = ["aVertexPosition", "aTextureCoord"],
  ed = [
    "uDepth",
    "uOpacity",
    "uSampler",
    "uProjMatrix",
    "uViewportMatrix",
    "uColorOffset",
    "uColorMatrix",
  ];
function Nt(e) {
  (this.gl = e),
    (this.projMatrix = nt.create()),
    (this.viewportMatrix = nt.create()),
    (this.translateVector = Ui.create()),
    (this.scaleVector = Ui.create()),
    (this.constantBuffers = Fu(e, Ns, Ku, Qu)),
    (this.shaderProgram = qu(e, Gu, Zu, Ju, ed));
}
Nt.prototype.destroy = function () {
  Vu(this.gl, this.constantBuffers), ku(this.gl, this.shaderProgram), Nu(this);
};
Nt.prototype.startLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram,
    n = this.constantBuffers,
    s = this.viewportMatrix;
  r.useProgram(i),
    Wu(r, i),
    Xu(r, e, t, s),
    r.uniformMatrix4fv(i.uViewportMatrix, !1, s),
    r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions),
    r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0),
    r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords),
    r.vertexAttribPointer(i.aTextureCoord, 2, r.FLOAT, r.FALSE, 0, 0),
    Bu(r, e.effects(), {
      opacity: i.uOpacity,
      colorOffset: i.uColorOffset,
      colorMatrix: i.uColorMatrix,
    });
};
Nt.prototype.endLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram;
  Yu(r, i);
};
Nt.prototype.renderTile = function (e, t, r, i) {
  var n = this.gl,
    s = this.shaderProgram,
    a = this.constantBuffers,
    o = this.projMatrix,
    h = this.translateVector,
    l = this.scaleVector;
  (h[0] = e.centerX()),
    (h[1] = e.centerY()),
    (h[2] = -0.5),
    (l[0] = e.scaleX()),
    (l[1] = e.scaleY()),
    (l[2] = 1),
    nt.copy(o, r.view().projection()),
    nt.rotateX(o, o, e.rotX()),
    nt.rotateY(o, o, e.rotY()),
    nt.translate(o, o, h),
    nt.scale(o, o, l),
    n.uniformMatrix4fv(s.uProjMatrix, !1, o),
    Uu(n, s, i, e.z),
    ju(n, s, t),
    n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a.vertexIndices),
    n.drawElements(n.TRIANGLES, Ns.length, n.UNSIGNED_SHORT, 0);
};
var Fs = Nt,
  td = Fs,
  rd = Se;
function Vs() {
  this.constructor.super_.apply(this, arguments);
}
rd(Vs, td);
var qs = Vs,
  id = Fs,
  nd = Se;
function ks() {
  this.constructor.super_.apply(this, arguments);
}
nd(ks, id);
var Ws = ks,
  sd = [
    "attribute vec3 aVertexPosition;",
    "uniform float uDepth;",
    "uniform mat4 uViewportMatrix;",
    "uniform mat4 uInvProjMatrix;",
    "varying vec4 vRay;",
    "void main(void) {",
    "  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);",
    "  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);",
    "}",
  ].join(`
`),
  ad = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float",
    "#endif",
    "uniform sampler2D uSampler;",
    "uniform float uOpacity;",
    "uniform float uTextureX;",
    "uniform float uTextureY;",
    "uniform float uTextureWidth;",
    "uniform float uTextureHeight;",
    "uniform vec4 uColorOffset;",
    "uniform mat4 uColorMatrix;",
    "varying vec4 vRay;",
    "const float PI = 3.14159265358979323846264;",
    "void main(void) {",
    "  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);",
    "  float phi  = acos(vRay.y * r);",
    "  float theta = atan(vRay.x, -1.0*vRay.z);",
    "  float s = 0.5 + 0.5 * theta / PI;",
    "  float t = 1.0 - phi / PI;",
    "  s = s * uTextureWidth + uTextureX;",
    "  t = t * uTextureHeight + uTextureY;",
    "  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;",
    "  gl_FragColor = vec4(color.rgba * uOpacity);",
    "}",
  ].join(`
`),
  vr = ne.mat4,
  od = U,
  $e = Hs,
  hd = $e.createConstantBuffers,
  ld = $e.destroyConstantBuffers,
  cd = $e.createShaderProgram,
  vd = $e.destroyShaderProgram,
  fd = $e.enableAttributes,
  ud = $e.disableAttributes,
  dd = $e.setViewport,
  pd = $e.setupPixelEffectUniforms,
  _d = $e.setDepth,
  md = $e.setTexture,
  yd = sd,
  gd = ad,
  Ys = [0, 1, 2, 0, 2, 3],
  wd = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0],
  xd = [0, 0, 1, 0, 1, 1, 0, 1],
  Md = ["aVertexPosition"],
  Td = [
    "uDepth",
    "uOpacity",
    "uSampler",
    "uInvProjMatrix",
    "uViewportMatrix",
    "uColorOffset",
    "uColorMatrix",
    "uTextureX",
    "uTextureY",
    "uTextureWidth",
    "uTextureHeight",
  ];
function Ft(e) {
  (this.gl = e),
    (this.invProjMatrix = vr.create()),
    (this.viewportMatrix = vr.create()),
    (this.constantBuffers = hd(e, Ys, wd, xd)),
    (this.shaderProgram = cd(e, yd, gd, Md, Td));
}
Ft.prototype.destroy = function () {
  ld(this.gl, this.constantBuffers), vd(this.gl, this.shaderProgram), od(this);
};
Ft.prototype.startLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram,
    n = this.constantBuffers,
    s = this.invProjMatrix,
    a = this.viewportMatrix;
  r.useProgram(i),
    fd(r, i),
    dd(r, e, t, a),
    r.uniformMatrix4fv(i.uViewportMatrix, !1, a),
    r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions),
    r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0),
    r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords),
    vr.copy(s, e.view().projection()),
    vr.invert(s, s),
    r.uniformMatrix4fv(i.uInvProjMatrix, !1, s);
  var o = e.effects().textureCrop || {},
    h = o.x != null ? o.x : 0,
    l = o.y != null ? o.y : 0,
    c = o.width != null ? o.width : 1,
    f = o.height != null ? o.height : 1;
  r.uniform1f(i.uTextureX, h),
    r.uniform1f(i.uTextureY, l),
    r.uniform1f(i.uTextureWidth, c),
    r.uniform1f(i.uTextureHeight, f),
    pd(r, e.effects(), {
      opacity: i.uOpacity,
      colorOffset: i.uColorOffset,
      colorMatrix: i.uColorMatrix,
    });
};
Ft.prototype.endLayer = function (e, t) {
  var r = this.gl,
    i = this.shaderProgram;
  ud(r, i);
};
Ft.prototype.renderTile = function (e, t, r, i) {
  var n = this.gl,
    s = this.shaderProgram,
    a = this.constantBuffers;
  _d(n, s, i, e.z),
    md(n, s, t),
    n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, a.vertexIndices),
    n.drawElements(n.TRIANGLES, Ys.length, n.UNSIGNED_SHORT, 0);
};
var Xs = Ft,
  Ed = qs,
  bd = Ws,
  Sd = Xs;
function Cd(e) {
  switch (e.type) {
    case "webgl":
      e.registerRenderer("flat", "flat", bd),
        e.registerRenderer("cube", "rectilinear", Ed),
        e.registerRenderer("equirect", "rectilinear", Sd);
      break;
    default:
      throw new Error("Unknown stage type: " + e.type);
  }
}
var Bs = Cd;
function $d() {
  for (var e = 0, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    (e += r), (e += r << 10), (e ^= r >> 6);
  }
  return (e += e << 3), (e ^= e >> 11), (e += e << 15), e >= 0 ? e : -e;
}
var yr = $d;
function Ld(e, t) {
  return ((+e % (t = +t)) + t) % t;
}
var Ge = Ld,
  mi = Ge,
  Pd = 64;
function ht(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Set: invalid capacity");
  (this._capacity = this._capacity || Pd), (this._buckets = []);
  for (var t = 0; t < this._capacity; t++) this._buckets.push([]);
  this._size = 0;
}
ht.prototype.add = function (e) {
  for (
    var t = mi(e.hash(), this._capacity), r = this._buckets[t], i = 0;
    i < r.length;
    i++
  ) {
    var n = r[i];
    if (e.equals(n)) return (r[i] = e), n;
  }
  return r.push(e), this._size++, null;
};
ht.prototype.remove = function (e) {
  for (
    var t = mi(e.hash(), this._capacity), r = this._buckets[t], i = 0;
    i < r.length;
    i++
  ) {
    var n = r[i];
    if (e.equals(n)) {
      for (var s = i; s < r.length - 1; s++) r[s] = r[s + 1];
      return (r.length = r.length - 1), this._size--, n;
    }
  }
  return null;
};
ht.prototype.has = function (e) {
  for (
    var t = mi(e.hash(), this._capacity), r = this._buckets[t], i = 0;
    i < r.length;
    i++
  ) {
    var n = r[i];
    if (e.equals(n)) return !0;
  }
  return !1;
};
ht.prototype.size = function () {
  return this._size;
};
ht.prototype.clear = function () {
  for (var e = 0; e < this._capacity; e++) this._buckets[e].length = 0;
  this._size = 0;
};
ht.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._buckets[r], n = 0; n < i.length; n++) e(i[n]), (t += 1);
  return t;
};
var Us = ht,
  zd = Us;
function yi() {
  (this._stack = []), (this._visited = new zd()), (this._vertices = null);
}
yi.prototype.search = function (e, t, r) {
  var i = this._stack,
    n = this._visited,
    s = this._vertices,
    a = 0;
  for (this._clear(), i.push(t); i.length > 0; ) {
    var o = i.pop();
    if (!n.has(o) && !!e.intersects(o.vertices(s))) {
      n.add(o);
      for (var h = o.neighbors(), l = 0; l < h.length; l++) i.push(h[l]);
      r.push(o), a++;
    }
  }
  return (this._vertices = s), this._clear(), a;
};
yi.prototype._clear = function () {
  (this._stack.length = 0), this._visited.clear();
};
var js = yi,
  Ad = Ge;
function Fe(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruMap: invalid capacity");
  (this._capacity = e),
    (this._keys = new Array(this._capacity)),
    (this._values = new Array(this._capacity)),
    (this._start = 0),
    (this._size = 0);
}
Fe.prototype._index = function (e) {
  return Ad(this._start + e, this._capacity);
};
Fe.prototype.get = function (e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._keys[this._index(t)];
    if (e.equals(r)) return this._values[this._index(t)];
  }
  return null;
};
Fe.prototype.set = function (e, t) {
  if (this._capacity === 0) return e;
  this.del(e);
  var r = this._size === this._capacity ? this._keys[this._index(0)] : null;
  return (
    (this._keys[this._index(this._size)] = e),
    (this._values[this._index(this._size)] = t),
    this._size < this._capacity ? this._size++ : (this._start = this._index(1)),
    r
  );
};
Fe.prototype.del = function (e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) {
      for (var r = this._values[this._index(t)], i = t; i < this._size - 1; i++)
        (this._keys[this._index(i)] = this._keys[this._index(i + 1)]),
          (this._values[this._index(i)] = this._values[this._index(i + 1)]);
      return this._size--, r;
    }
  return null;
};
Fe.prototype.has = function (e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) return !0;
  return !1;
};
Fe.prototype.size = function () {
  return this._size;
};
Fe.prototype.clear = function () {
  (this._keys.length = 0),
    (this._values.length = 0),
    (this._start = 0),
    (this._size = 0);
};
Fe.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._keys[this._index(r)], this._values[this._index(r)]), (t += 1);
  return t;
};
var Gs = Fe;
function gr(e) {
  this._fallbackOnly = !!e.fallbackOnly;
}
gr.prototype.numHorizontalTiles = function () {
  return Math.ceil(this.width() / this.tileWidth());
};
gr.prototype.numVerticalTiles = function () {
  return Math.ceil(this.height() / this.tileHeight());
};
gr.prototype.fallbackOnly = function () {
  return this._fallbackOnly;
};
var gi = gr;
function Rd(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
var Vt = Rd,
  Id = Vt;
function Od(e, t) {
  for (var r = [], i = 0; i < e.length; i++) r.push(new t(e[i]));
  return (
    r.sort(function (n, s) {
      return Id(n.width(), s.width());
    }),
    r
  );
}
function Dd(e) {
  for (var t = [], r = 0; r < e.length; r++) e[r]._fallbackOnly || t.push(e[r]);
  if (!t.length) throw new Error("No selectable levels in list");
  return t;
}
var qt = { makeLevelList: Od, makeSelectableLevelList: Dd };
function Hd(e) {
  var t = typeof e;
  if (t === "object") {
    if (e === null) return "null";
    if (Object.prototype.toString.call(e) === "[object Array]") return "array";
    if (Object.prototype.toString.call(e) === "[object RegExp]")
      return "regexp";
  }
  return t;
}
var kt = Hd,
  Nd = Se,
  Fd = yr,
  Vd = js,
  qd = Gs,
  kd = gi,
  Wd = qt.makeLevelList,
  Yd = qt.makeSelectableLevelList,
  fr = wt,
  sr = Vt,
  Xd = kt,
  oe = ne.vec3,
  Jr = ne.vec4,
  Bd = 64,
  st = "fudlrb",
  at = {
    f: { x: 0, y: 0 },
    b: { x: 0, y: Math.PI },
    l: { x: 0, y: Math.PI / 2 },
    r: { x: 0, y: -Math.PI / 2 },
    u: { x: Math.PI / 2, y: 0 },
    d: { x: -Math.PI / 2, y: 0 },
  },
  Fr = oe.create();
function It(e, t, r, i) {
  t && oe.rotateZ(e, e, Fr, t),
    r && oe.rotateX(e, e, Fr, r),
    i && oe.rotateY(e, e, Fr, i);
}
var ei = {};
for (var Vr = 0; Vr < st.length; Vr++) {
  var ji = st[Vr],
    Gi = at[ji],
    Zi = oe.fromValues(0, 0, -1);
  It(Zi, 0, Gi.x, Gi.y), (ei[ji] = Zi);
}
var ar = {
    f: ["l", "r", "u", "d"],
    b: ["r", "l", "u", "d"],
    l: ["b", "f", "u", "d"],
    r: ["f", "b", "u", "d"],
    u: ["l", "r", "b", "f"],
    d: ["l", "r", "f", "b"],
  },
  qr = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
function Z(e, t, r, i, n) {
  (this.face = e),
    (this.x = t),
    (this.y = r),
    (this.z = i),
    (this._geometry = n),
    (this._level = n.levelList[i]);
}
Z.prototype.rotX = function () {
  return at[this.face].x;
};
Z.prototype.rotY = function () {
  return at[this.face].y;
};
Z.prototype.centerX = function () {
  return (this.x + 0.5) / this._level.numHorizontalTiles() - 0.5;
};
Z.prototype.centerY = function () {
  return 0.5 - (this.y + 0.5) / this._level.numVerticalTiles();
};
Z.prototype.scaleX = function () {
  return 1 / this._level.numHorizontalTiles();
};
Z.prototype.scaleY = function () {
  return 1 / this._level.numVerticalTiles();
};
Z.prototype.vertices = function (e) {
  e || (e = [oe.create(), oe.create(), oe.create(), oe.create()]);
  var t = at[this.face];
  function r(o, h, l) {
    oe.set(o, h, l, -0.5), It(o, 0, t.x, t.y);
  }
  var i = this.centerX() - this.scaleX() / 2,
    n = this.centerX() + this.scaleX() / 2,
    s = this.centerY() - this.scaleY() / 2,
    a = this.centerY() + this.scaleY() / 2;
  return r(e[0], i, a), r(e[1], n, a), r(e[2], n, s), r(e[3], i, s), e;
};
Z.prototype.parent = function () {
  if (this.z === 0) return null;
  var e = this.face,
    t = this.z,
    r = this.x,
    i = this.y,
    n = this._geometry,
    s = n.levelList[t],
    a = n.levelList[t - 1],
    o = Math.floor((r / s.numHorizontalTiles()) * a.numHorizontalTiles()),
    h = Math.floor((i / s.numVerticalTiles()) * a.numVerticalTiles()),
    l = t - 1;
  return new Z(e, o, h, l, n);
};
Z.prototype.children = function (e) {
  if (this.z === this._geometry.levelList.length - 1) return null;
  var t = this.face,
    r = this.z,
    i = this.x,
    n = this.y,
    s = this._geometry,
    a = s.levelList[r],
    o = s.levelList[r + 1],
    h = o.numHorizontalTiles() / a.numHorizontalTiles(),
    l = o.numVerticalTiles() / a.numVerticalTiles();
  e = e || [];
  for (var c = 0; c < h; c++)
    for (var f = 0; f < l; f++) {
      var d = h * i + c,
        p = l * n + f,
        _ = r + 1;
      e.push(new Z(t, d, p, _, s));
    }
  return e;
};
Z.prototype.neighbors = function () {
  var e = this._geometry,
    t = e._neighborsCache,
    r = t.get(this);
  if (r) return r;
  for (
    var i = e._vec,
      n = this.face,
      s = this.x,
      a = this.y,
      o = this.z,
      h = this._level,
      l = h.numHorizontalTiles(),
      c = h.numVerticalTiles(),
      f = [],
      d = 0;
    d < qr.length;
    d++
  ) {
    var p = qr[d][0],
      _ = qr[d][1],
      w = s + p,
      m = a + _,
      M = o,
      b = n;
    if (w < 0 || w >= l || m < 0 || m >= c) {
      var S = this.centerX(),
        C = this.centerY();
      w < 0
        ? (oe.set(i, -0.5, C, -0.5), (b = ar[n][0]))
        : w >= l
        ? (oe.set(i, 0.5, C, -0.5), (b = ar[n][1]))
        : m < 0
        ? (oe.set(i, S, 0.5, -0.5), (b = ar[n][2]))
        : m >= c && (oe.set(i, S, -0.5, -0.5), (b = ar[n][3]));
      var $;
      ($ = at[n]),
        It(i, 0, $.x, $.y),
        ($ = at[b]),
        It(i, 0, -$.x, -$.y),
        (w = fr(Math.floor((0.5 + i[0]) * l), 0, l - 1)),
        (m = fr(Math.floor((0.5 - i[1]) * c), 0, c - 1));
    }
    f.push(new Z(b, w, m, M, e));
  }
  return t.set(this, f), f;
};
Z.prototype.hash = function () {
  return Fd(st.indexOf(this.face), this.z, this.y, this.x);
};
Z.prototype.equals = function (e) {
  return (
    this._geometry === e._geometry &&
    this.face === e.face &&
    this.z === e.z &&
    this.y === e.y &&
    this.x === e.x
  );
};
Z.prototype.cmp = function (e) {
  return (
    sr(this.z, e.z) ||
    sr(st.indexOf(this.face), st.indexOf(e.face)) ||
    sr(this.y, e.y) ||
    sr(this.x, e.x)
  );
};
Z.prototype.str = function () {
  return (
    "CubeTile(" +
    tile.face +
    ", " +
    tile.x +
    ", " +
    tile.y +
    ", " +
    tile.z +
    ")"
  );
};
function lt(e) {
  if (
    (this.constructor.super_.call(this, e),
    (this._size = e.size),
    (this._tileSize = e.tileSize),
    this._size % this._tileSize !== 0)
  )
    throw new Error(
      "Level size is not multiple of tile size: " +
        this._size +
        " " +
        this._tileSize
    );
}
Nd(lt, kd);
lt.prototype.width = function () {
  return this._size;
};
lt.prototype.height = function () {
  return this._size;
};
lt.prototype.tileWidth = function () {
  return this._tileSize;
};
lt.prototype.tileHeight = function () {
  return this._tileSize;
};
lt.prototype._validateWithParentLevel = function (e) {
  var t = this.width(),
    r = this.height(),
    i = this.tileWidth(),
    n = this.tileHeight(),
    s = this.numHorizontalTiles(),
    a = this.numVerticalTiles(),
    o = e.width(),
    h = e.height(),
    l = e.tileWidth(),
    c = e.tileHeight(),
    f = e.numHorizontalTiles(),
    d = e.numVerticalTiles();
  if (t % o !== 0)
    throw new Error(
      "Level width must be multiple of parent level: " + t + " vs. " + o
    );
  if (r % h !== 0)
    throw new Error(
      "Level height must be multiple of parent level: " + r + " vs. " + h
    );
  if (s % f !== 0)
    throw new Error(
      "Number of horizontal tiles must be multiple of parent level: " +
        s +
        " (" +
        t +
        "/" +
        i +
        ") vs. " +
        f +
        " (" +
        o +
        "/" +
        l +
        ")"
    );
  if (a % d !== 0)
    throw new Error(
      "Number of vertical tiles must be multiple of parent level: " +
        a +
        " (" +
        r +
        "/" +
        n +
        ") vs. " +
        d +
        " (" +
        h +
        "/" +
        c +
        ")"
    );
};
function Oe(e) {
  if (Xd(e) !== "array") throw new Error("Level list must be an array");
  (this.levelList = Wd(e, lt)), (this.selectableLevelList = Yd(this.levelList));
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  (this._tileSearcher = new Vd(this)),
    (this._neighborsCache = new qd(Bd)),
    (this._vec = Jr.create()),
    (this._viewSize = {});
}
Oe.prototype.maxTileSize = function () {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
Oe.prototype.levelTiles = function (e, t) {
  var r = this.levelList.indexOf(e),
    i = e.numHorizontalTiles() - 1,
    n = e.numVerticalTiles() - 1;
  t = t || [];
  for (var s = 0; s < st.length; s++)
    for (var a = st[s], o = 0; o <= i; o++)
      for (var h = 0; h <= n; h++) t.push(new Z(a, o, h, r, this));
  return t;
};
Oe.prototype._closestTile = function (e, t) {
  var r = this._vec;
  Jr.set(r, 0, 0, 1, 1), Jr.transformMat4(r, r, e.inverseProjection());
  var i = 1 / 0,
    n = null;
  for (var s in ei) {
    var a = ei[s],
      o = 1 - oe.dot(a, r);
    o < i && ((i = o), (n = s));
  }
  for (
    var h = Math.max(Math.abs(r[0]), Math.abs(r[1]), Math.abs(r[2])) / 0.5,
      l = 0;
    l < 3;
    l++
  )
    r[l] = r[l] / h;
  var c = at[n];
  It(r, 0, -c.x, -c.y);
  var f = this.levelList.indexOf(t),
    d = t.numHorizontalTiles(),
    p = t.numVerticalTiles(),
    _ = fr(Math.floor((0.5 + r[0]) * d), 0, d - 1),
    w = fr(Math.floor((0.5 - r[1]) * p), 0, p - 1);
  return new Z(n, _, w, f, this);
};
Oe.prototype.visibleTiles = function (e, t, r) {
  var i = this._viewSize,
    n = this._tileSearcher;
  if (((r = r || []), e.size(i), i.width === 0 || i.height === 0)) return r;
  var s = this._closestTile(e, t),
    a = n.search(e, s, r);
  if (!a) throw new Error("Starting tile is not visible");
  return r;
};
Oe.Tile = Oe.prototype.Tile = Z;
Oe.type = Oe.prototype.type = "cube";
Z.type = Z.prototype.type = "cube";
var Ud = Oe,
  jd = Se,
  Gd = yr,
  Zd = js,
  Kd = Gs,
  Qd = gi,
  Jd = qt.makeLevelList,
  ep = qt.makeSelectableLevelList,
  Ki = wt,
  Zs = Ge,
  kr = Vt,
  tp = kt,
  Ye = ne.vec2,
  ti = ne.vec4,
  rp = 64,
  Wr = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
function W(e, t, r, i) {
  (this.x = e),
    (this.y = t),
    (this.z = r),
    (this._geometry = i),
    (this._level = i.levelList[r]);
}
W.prototype.rotX = function () {
  return 0;
};
W.prototype.rotY = function () {
  return 0;
};
W.prototype.centerX = function () {
  var e = this._level.width(),
    t = this._level.tileWidth();
  return (this.x * t + 0.5 * this.width()) / e - 0.5;
};
W.prototype.centerY = function () {
  var e = this._level.height(),
    t = this._level.tileHeight();
  return 0.5 - (this.y * t + 0.5 * this.height()) / e;
};
W.prototype.scaleX = function () {
  var e = this._level.width();
  return this.width() / e;
};
W.prototype.scaleY = function () {
  var e = this._level.height();
  return this.height() / e;
};
W.prototype.width = function () {
  var e = this._level.width(),
    t = this._level.tileWidth();
  if (this.x === this._level.numHorizontalTiles() - 1) {
    var r = Zs(e, t);
    return r || t;
  } else return t;
};
W.prototype.height = function () {
  var e = this._level.height(),
    t = this._level.tileHeight();
  if (this.y === this._level.numVerticalTiles() - 1) {
    var r = Zs(e, t);
    return r || t;
  } else return t;
};
W.prototype.levelWidth = function () {
  return this._level.width();
};
W.prototype.levelHeight = function () {
  return this._level.height();
};
W.prototype.vertices = function (e) {
  e || (e = [Ye.create(), Ye.create(), Ye.create(), Ye.create()]);
  var t = this.centerX() - this.scaleX() / 2,
    r = this.centerX() + this.scaleX() / 2,
    i = this.centerY() - this.scaleY() / 2,
    n = this.centerY() + this.scaleY() / 2;
  return (
    Ye.set(e[0], t, n),
    Ye.set(e[1], r, n),
    Ye.set(e[2], r, i),
    Ye.set(e[3], t, i),
    e
  );
};
W.prototype.parent = function () {
  if (this.z === 0) return null;
  var e = this._geometry,
    t = this.z - 1,
    r = Math.floor(this.x / 2),
    i = Math.floor(this.y / 2);
  return new W(r, i, t, e);
};
W.prototype.children = function (e) {
  if (this.z === this._geometry.levelList.length - 1) return null;
  var t = this._geometry,
    r = this.z + 1;
  return (
    (e = e || []),
    e.push(new W(2 * this.x, 2 * this.y, r, t)),
    e.push(new W(2 * this.x, 2 * this.y + 1, r, t)),
    e.push(new W(2 * this.x + 1, 2 * this.y, r, t)),
    e.push(new W(2 * this.x + 1, 2 * this.y + 1, r, t)),
    e
  );
};
W.prototype.neighbors = function () {
  var e = this._geometry,
    t = e._neighborsCache,
    r = t.get(this);
  if (r) return r;
  for (
    var i = this.x,
      n = this.y,
      s = this.z,
      a = this._level,
      o = a.numHorizontalTiles() - 1,
      h = a.numVerticalTiles() - 1,
      l = [],
      c = 0;
    c < Wr.length;
    c++
  ) {
    var f = Wr[c][0],
      d = Wr[c][1],
      p = i + f,
      _ = n + d,
      w = s;
    0 <= p && p <= o && 0 <= _ && _ <= h && l.push(new W(p, _, w, e));
  }
  return t.set(this, l), l;
};
W.prototype.hash = function () {
  return Gd(this.z, this.y, this.x);
};
W.prototype.equals = function (e) {
  return (
    this._geometry === e._geometry &&
    this.z === e.z &&
    this.y === e.y &&
    this.x === e.x
  );
};
W.prototype.cmp = function (e) {
  return kr(this.z, e.z) || kr(this.y, e.y) || kr(this.x, e.x);
};
W.prototype.str = function () {
  return "FlatTile(" + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function ct(e) {
  this.constructor.super_.call(this, e),
    (this._width = e.width),
    (this._height = e.height),
    (this._tileWidth = e.tileWidth),
    (this._tileHeight = e.tileHeight);
}
jd(ct, Qd);
ct.prototype.width = function () {
  return this._width;
};
ct.prototype.height = function () {
  return this._height;
};
ct.prototype.tileWidth = function () {
  return this._tileWidth;
};
ct.prototype.tileHeight = function () {
  return this._tileHeight;
};
ct.prototype._validateWithParentLevel = function (e) {
  var t = this.width(),
    r = this.height(),
    i = this.tileWidth(),
    n = this.tileHeight(),
    s = e.width(),
    a = e.height(),
    o = e.tileWidth(),
    h = e.tileHeight();
  if (t % s !== 0)
    return new Error(
      "Level width must be multiple of parent level: " + t + " vs. " + s
    );
  if (r % a !== 0)
    return new Error(
      "Level height must be multiple of parent level: " + r + " vs. " + a
    );
  if (i % o !== 0)
    return new Error(
      "Level tile width must be multiple of parent level: " + i + " vs. " + o
    );
  if (n % h !== 0)
    return new Error(
      "Level tile height must be multiple of parent level: " + n + " vs. " + h
    );
};
function De(e) {
  if (tp(e) !== "array") throw new Error("Level list must be an array");
  (this.levelList = Jd(e, ct)), (this.selectableLevelList = ep(this.levelList));
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  (this._tileSearcher = new Zd(this)),
    (this._neighborsCache = new Kd(rp)),
    (this._vec = ti.create()),
    (this._viewSize = {});
}
De.prototype.maxTileSize = function () {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
De.prototype.levelTiles = function (e, t) {
  var r = this.levelList.indexOf(e),
    i = e.numHorizontalTiles() - 1,
    n = e.numVerticalTiles() - 1;
  t || (t = []);
  for (var s = 0; s <= i; s++)
    for (var a = 0; a <= n; a++) t.push(new W(s, a, r, this));
  return t;
};
De.prototype._closestTile = function (e, t) {
  var r = this._vec;
  ti.set(r, 0, 0, 1, 1), ti.transformMat4(r, r, e.inverseProjection());
  var i = 0.5 + r[0],
    n = 0.5 - r[1],
    s = this.levelList.indexOf(t),
    a = t.width(),
    o = t.height(),
    h = t.tileWidth(),
    l = t.tileHeight(),
    c = t.numHorizontalTiles(),
    f = t.numVerticalTiles(),
    d = Ki(Math.floor((i * a) / h), 0, c - 1),
    p = Ki(Math.floor((n * o) / l), 0, f - 1);
  return new W(d, p, s, this);
};
De.prototype.visibleTiles = function (e, t, r) {
  var i = this._viewSize,
    n = this._tileSearcher;
  if (((r = r || []), e.size(i), i.width === 0 || i.height === 0)) return r;
  var s = this._closestTile(e, t),
    a = n.search(e, s, r);
  if (!a) throw new Error("Starting tile is not visible");
  return r;
};
De.Tile = De.prototype.Tile = W;
De.type = De.prototype.type = "flat";
W.type = W.prototype.type = "flat";
var ip = De,
  np = Se,
  sp = yr,
  ap = Vt,
  Qi = qt,
  op = gi,
  hp = kt;
function Q(e, t) {
  (this.z = e), (this._geometry = t), (this._level = t.levelList[e]);
}
Q.prototype.rotX = function () {
  return 0;
};
Q.prototype.rotY = function () {
  return 0;
};
Q.prototype.centerX = function () {
  return 0.5;
};
Q.prototype.centerY = function () {
  return 0.5;
};
Q.prototype.scaleX = function () {
  return 1;
};
Q.prototype.scaleY = function () {
  return 1;
};
Q.prototype.parent = function () {
  return this.z === 0 ? null : new Q(this.z - 1, this._geometry);
};
Q.prototype.children = function (e) {
  return this.z === this._geometry.levelList.length - 1
    ? null
    : ((e = e || []), e.push(new Q(this.z + 1, this._geometry)), e);
};
Q.prototype.neighbors = function () {
  return [];
};
Q.prototype.hash = function () {
  return sp(this.z);
};
Q.prototype.equals = function (e) {
  return this._geometry === e._geometry && this.z === e.z;
};
Q.prototype.cmp = function (e) {
  return ap(this.z, e.z);
};
Q.prototype.str = function () {
  return "EquirectTile(" + tile.z + ")";
};
function xt(e) {
  this.constructor.super_.call(this, e), (this._width = e.width);
}
np(xt, op);
xt.prototype.width = function () {
  return this._width;
};
xt.prototype.height = function () {
  return this._width / 2;
};
xt.prototype.tileWidth = function () {
  return this._width;
};
xt.prototype.tileHeight = function () {
  return this._width / 2;
};
function Ue(e) {
  if (hp(e) !== "array") throw new Error("Level list must be an array");
  (this.levelList = Qi.makeLevelList(e, xt)),
    (this.selectableLevelList = Qi.makeSelectableLevelList(this.levelList));
}
Ue.prototype.maxTileSize = function () {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
Ue.prototype.levelTiles = function (e, t) {
  var r = this.levelList.indexOf(e);
  return (t = t || []), t.push(new Q(r, this)), t;
};
Ue.prototype.visibleTiles = function (e, t, r) {
  var i = new Q(this.levelList.indexOf(t), this);
  (r = r || []), (r.length = 0), r.push(i);
};
Ue.Tile = Ue.prototype.Tile = Q;
Ue.type = Ue.prototype.type = "equirect";
Q.type = Q.prototype.type = "equirect";
var lp = Ue;
function vt(e, t, r) {
  return 2 * Math.atan((r * Math.tan(e / 2)) / t);
}
function cp(e, t, r) {
  return vt(e, t, r);
}
function vp(e, t, r) {
  return vt(e, t, Math.sqrt(t * t + r * r));
}
function fp(e, t, r) {
  return vt(e, r, t);
}
function up(e, t, r) {
  return vt(e, r, Math.sqrt(t * t + r * r));
}
function dp(e, t, r) {
  return vt(e, Math.sqrt(t * t + r * r), t);
}
function pp(e, t, r) {
  return vt(e, Math.sqrt(t * t + r * r), r);
}
var Ks = {
  convert: vt,
  htov: cp,
  htod: vp,
  vtoh: fp,
  vtod: up,
  dtoh: dp,
  dtov: pp,
};
function _p(e) {
  return typeof e == "number" && isFinite(e);
}
var wi = _p;
function mp(e) {
  return e.toPrecision(15);
}
var xi = mp;
function yp() {
  var e = arguments;
  return function (r) {
    for (var i = r, n = 0; n < e.length; n++) {
      var s = e[n];
      i = s.call(null, i);
    }
    return i;
  };
}
var Qs = yp,
  gp = G,
  Be = ne.mat4,
  ie = ne.vec4,
  Js = _r,
  Ot = Ks,
  Yr = Ge,
  Xe = wi,
  it = wt,
  be = xi,
  wp = Qs,
  xp = U,
  Mp = 0,
  Tp = 0,
  Ep = 0,
  bp = 0,
  Sp = 0,
  Cp = Math.PI / 4,
  $p = 0,
  Lp = 0,
  Ji = 1e-6;
function P(e, t) {
  (this._yaw = e && e.yaw != null ? e.yaw : Ep),
    (this._pitch = e && e.pitch != null ? e.pitch : bp),
    (this._roll = e && e.roll != null ? e.roll : Sp),
    (this._fov = e && e.fov != null ? e.fov : Cp),
    (this._width = e && e.width != null ? e.width : Mp),
    (this._height = e && e.height != null ? e.height : Tp),
    (this._projectionCenterX =
      e && e.projectionCenterX != null ? e.projectionCenterX : $p),
    (this._projectionCenterY =
      e && e.projectionCenterY != null ? e.projectionCenterY : Lp),
    (this._limiter = t || null),
    (this._projMatrix = Be.create()),
    (this._invProjMatrix = Be.create()),
    (this._frustum = [
      ie.create(),
      ie.create(),
      ie.create(),
      ie.create(),
      ie.create(),
    ]),
    (this._projectionChanged = !0),
    (this._params = {}),
    (this._fovs = {}),
    (this._tmpVec = ie.create()),
    this._update();
}
gp(P);
P.prototype.destroy = function () {
  xp(this);
};
P.prototype.yaw = function () {
  return this._yaw;
};
P.prototype.pitch = function () {
  return this._pitch;
};
P.prototype.roll = function () {
  return this._roll;
};
P.prototype.projectionCenterX = function () {
  return this._projectionCenterX;
};
P.prototype.projectionCenterY = function () {
  return this._projectionCenterY;
};
P.prototype.fov = function () {
  return this._fov;
};
P.prototype.width = function () {
  return this._width;
};
P.prototype.height = function () {
  return this._height;
};
P.prototype.size = function (e) {
  return (e = e || {}), (e.width = this._width), (e.height = this._height), e;
};
P.prototype.parameters = function (e) {
  return (
    (e = e || {}),
    (e.yaw = this._yaw),
    (e.pitch = this._pitch),
    (e.roll = this._roll),
    (e.fov = this._fov),
    e
  );
};
P.prototype.limiter = function () {
  return this._limiter;
};
P.prototype.setYaw = function (e) {
  this._resetParams(), (this._params.yaw = e), this._update(this._params);
};
P.prototype.setPitch = function (e) {
  this._resetParams(), (this._params.pitch = e), this._update(this._params);
};
P.prototype.setRoll = function (e) {
  this._resetParams(), (this._params.roll = e), this._update(this._params);
};
P.prototype.setFov = function (e) {
  this._resetParams(), (this._params.fov = e), this._update(this._params);
};
P.prototype.setProjectionCenterX = function (e) {
  this._resetParams(),
    (this._params.projectionCenterX = e),
    this._update(this._params);
};
P.prototype.setProjectionCenterY = function (e) {
  this._resetParams(),
    (this._params.projectionCenterY = e),
    this._update(this._params);
};
P.prototype.offsetYaw = function (e) {
  this.setYaw(this._yaw + e);
};
P.prototype.offsetPitch = function (e) {
  this.setPitch(this._pitch + e);
};
P.prototype.offsetRoll = function (e) {
  this.setRoll(this._roll + e);
};
P.prototype.offsetFov = function (e) {
  this.setFov(this._fov + e);
};
P.prototype.setSize = function (e) {
  this._resetParams(),
    (this._params.width = e.width),
    (this._params.height = e.height),
    this._update(this._params);
};
P.prototype.setParameters = function (e) {
  this._resetParams(),
    (this._params.yaw = e.yaw),
    (this._params.pitch = e.pitch),
    (this._params.roll = e.roll),
    (this._params.fov = e.fov),
    (this._params.projectionCenterX = e.projectionCenterX),
    (this._params.projectionCenterY = e.projectionCenterY),
    this._update(this._params);
};
P.prototype.setLimiter = function (e) {
  (this._limiter = e || null), this._update();
};
P.prototype._resetParams = function () {
  var e = this._params;
  (e.yaw = null),
    (e.pitch = null),
    (e.roll = null),
    (e.fov = null),
    (e.width = null),
    (e.height = null);
};
P.prototype._update = function (e) {
  e == null && (this._resetParams(), (e = this._params));
  var t = this._yaw,
    r = this._pitch,
    i = this._roll,
    n = this._fov,
    s = this._projectionCenterX,
    a = this._projectionCenterY,
    o = this._width,
    h = this._height;
  if (
    ((e.yaw = e.yaw != null ? e.yaw : t),
    (e.pitch = e.pitch != null ? e.pitch : r),
    (e.roll = e.roll != null ? e.roll : i),
    (e.fov = e.fov != null ? e.fov : n),
    (e.width = e.width != null ? e.width : o),
    (e.height = e.height != null ? e.height : h),
    (e.projectionCenterX =
      e.projectionCenterX != null ? e.projectionCenterX : s),
    (e.projectionCenterY =
      e.projectionCenterY != null ? e.projectionCenterY : a),
    this._limiter && ((e = this._limiter(e)), !e))
  )
    throw new Error("Bad view limiter");
  e = this._normalize(e);
  var l = e.yaw,
    c = e.pitch,
    f = e.roll,
    d = e.fov,
    p = e.width,
    _ = e.height,
    w = e.projectionCenterX,
    m = e.projectionCenterY;
  if (
    !Xe(l) ||
    !Xe(c) ||
    !Xe(f) ||
    !Xe(d) ||
    !Xe(p) ||
    !Xe(_) ||
    !Xe(w) ||
    !Xe(m)
  )
    throw new Error("Bad view - suspect a broken limiter");
  (this._yaw = l),
    (this._pitch = c),
    (this._roll = f),
    (this._fov = d),
    (this._width = p),
    (this._height = _),
    (this._projectionCenterX = w),
    (this._projectionCenterY = m),
    (l !== t ||
      c !== r ||
      f !== i ||
      d !== n ||
      p !== o ||
      _ !== h ||
      w !== s ||
      m !== a) &&
      ((this._projectionChanged = !0), this.emit("change")),
    (p !== o || _ !== h) && this.emit("resize");
};
P.prototype._normalize = function (e) {
  this._normalizeCoordinates(e);
  var t = Ot.htov(Math.PI, e.width, e.height),
    r = isNaN(t) ? Math.PI : Math.min(Math.PI, t);
  return (e.fov = it(e.fov, Ji, r - Ji)), e;
};
P.prototype._normalizeCoordinates = function (e) {
  return (
    "yaw" in e && (e.yaw = Yr(e.yaw - Math.PI, -2 * Math.PI) + Math.PI),
    "pitch" in e && (e.pitch = Yr(e.pitch - Math.PI, -2 * Math.PI) + Math.PI),
    "roll" in e && (e.roll = Yr(e.roll - Math.PI, -2 * Math.PI) + Math.PI),
    e
  );
};
P.prototype.normalizeToClosest = function (e, t) {
  var r = this._yaw,
    i = this._pitch,
    n = e.yaw,
    s = e.pitch,
    a = n - 2 * Math.PI,
    o = n + 2 * Math.PI;
  Math.abs(a - r) < Math.abs(n - r)
    ? (n = a)
    : Math.abs(o - r) < Math.abs(n - r) && (n = o);
  var h = s - 2 * Math.PI,
    l = s + 2 * Math.PI;
  return (
    Math.abs(h - i) < Math.abs(s - i)
      ? (s = h)
      : Math.abs(h - i) < Math.abs(s - i) && (s = l),
    (t = t || {}),
    (t.yaw = n),
    (t.pitch = s),
    t
  );
};
P.prototype.updateWithControlParameters = function (e) {
  var t = this._fov,
    r = Ot.vtoh(t, this._width, this._height);
  isNaN(r) && (r = t),
    this.offsetYaw(e.axisScaledX * r + e.x * 2 * r + e.yaw),
    this.offsetPitch(e.axisScaledY * t + e.y * 2 * r + e.pitch),
    this.offsetRoll(-e.roll),
    this.offsetFov(e.zoom * t);
};
P.prototype._updateProjection = function () {
  var e = this._projMatrix,
    t = this._invProjMatrix,
    r = this._frustum;
  if (this._projectionChanged) {
    var i = this._width,
      n = this._height,
      s = this._fov,
      a = Ot.vtoh(s, i, n),
      o = i / n,
      h = this._projectionCenterX,
      l = this._projectionCenterY;
    if (h !== 0 || l !== 0) {
      var c = Math.atan(h * 2 * Math.tan(a / 2)),
        f = Math.atan(l * 2 * Math.tan(s / 2)),
        d = this._fovs;
      (d.leftDegrees = ((a / 2 + c) * 180) / Math.PI),
        (d.rightDegrees = ((a / 2 - c) * 180) / Math.PI),
        (d.upDegrees = ((s / 2 + f) * 180) / Math.PI),
        (d.downDegrees = ((s / 2 - f) * 180) / Math.PI),
        Be.perspectiveFromFieldOfView(e, d, -1, 1);
    } else Be.perspective(e, s, o, -1, 1);
    Be.rotateZ(e, e, this._roll),
      Be.rotateX(e, e, this._pitch),
      Be.rotateY(e, e, this._yaw),
      Be.invert(t, e),
      this._matrixToFrustum(e, r),
      (this._projectionChanged = !1);
  }
};
P.prototype._matrixToFrustum = function (e, t) {
  ie.set(t[0], e[3] + e[0], e[7] + e[4], e[11] + e[8], 0),
    ie.set(t[1], e[3] - e[0], e[7] - e[4], e[11] - e[8], 0),
    ie.set(t[2], e[3] + e[1], e[7] + e[5], e[11] + e[9], 0),
    ie.set(t[3], e[3] - e[1], e[7] - e[5], e[11] - e[9], 0),
    ie.set(t[4], e[3] + e[2], e[7] + e[6], e[11] + e[10], 0);
};
P.prototype.projection = function () {
  return this._updateProjection(), this._projMatrix;
};
P.prototype.inverseProjection = function () {
  return this._updateProjection(), this._invProjMatrix;
};
P.prototype.intersects = function (e) {
  this._updateProjection();
  for (var t = this._frustum, r = this._tmpVec, i = 0; i < t.length; i++) {
    for (var n = t[i], s = !1, a = 0; a < e.length; a++) {
      var o = e[a];
      ie.set(r, o[0], o[1], o[2], 0), ie.dot(n, r) >= 0 && (s = !0);
    }
    if (!s) return !1;
  }
  return !0;
};
P.prototype.selectLevel = function (e) {
  for (
    var t = Js() * this._height, r = Math.tan(0.5 * this._fov), i = 0;
    i < e.length;
    i++
  ) {
    var n = e[i];
    if (r * n.height() >= t) return n;
  }
  return e[e.length - 1];
};
P.prototype.coordinatesToScreen = function (e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width,
    n = this._height;
  if (i <= 0 || n <= 0) return (t.x = null), (t.y = null), null;
  var s = e.yaw,
    a = e.pitch,
    o = Math.sin(s) * Math.cos(a),
    h = -Math.sin(a),
    l = -Math.cos(s) * Math.cos(a);
  if (
    (ie.set(r, o, h, l, 1),
    ie.transformMat4(r, r, this.projection()),
    r[3] >= 0)
  )
    (t.x = (i * (r[0] / r[3] + 1)) / 2), (t.y = (n * (1 - r[1] / r[3])) / 2);
  else return (t.x = null), (t.y = null), null;
  return t;
};
P.prototype.screenToCoordinates = function (e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width,
    n = this._height,
    s = (2 * e.x) / i - 1,
    a = 1 - (2 * e.y) / n;
  ie.set(r, s, a, 1, 1), ie.transformMat4(r, r, this.inverseProjection());
  var o = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
  return (
    (t.yaw = Math.atan2(r[0], -r[2])),
    (t.pitch = Math.acos(r[1] / o) - Math.PI / 2),
    this._normalizeCoordinates(t),
    t
  );
};
P.prototype.coordinatesToPerspectiveTransform = function (e, t, r) {
  r = r || "";
  var i = this._height,
    n = this._width,
    s = this._fov,
    a = (0.5 * i) / Math.tan(s / 2),
    o = "";
  return (
    (o += "translateX(" + be(n / 2) + "px) "),
    (o += "translateY(" + be(i / 2) + "px) "),
    (o += "translateX(-50%) translateY(-50%) "),
    (o += "perspective(" + be(a) + "px) "),
    (o += "translateZ(" + be(a) + "px) "),
    (o += "rotateZ(" + be(-this._roll) + "rad) "),
    (o += "rotateX(" + be(-this._pitch) + "rad) "),
    (o += "rotateY(" + be(this._yaw) + "rad) "),
    (o += "rotateY(" + be(-e.yaw) + "rad) "),
    (o += "rotateX(" + be(e.pitch) + "rad) "),
    (o += "translateZ(" + be(-t) + "px) "),
    (o += r + " "),
    o
  );
};
P.limit = {
  yaw: function (e, t) {
    return function (i) {
      return (i.yaw = it(i.yaw, e, t)), i;
    };
  },
  pitch: function (e, t) {
    return function (i) {
      return (i.pitch = it(i.pitch, e, t)), i;
    };
  },
  roll: function (e, t) {
    return function (i) {
      return (i.roll = it(i.roll, e, t)), i;
    };
  },
  hfov: function (e, t) {
    return function (i) {
      var n = i.width,
        s = i.height;
      if (n > 0 && s > 0) {
        var a = Ot.htov(e, n, s),
          o = Ot.htov(t, n, s);
        i.fov = it(i.fov, a, o);
      }
      return i;
    };
  },
  vfov: function (e, t) {
    return function (i) {
      return (i.fov = it(i.fov, e, t)), i;
    };
  },
  resolution: function (e) {
    return function (r) {
      var i = r.height;
      if (i) {
        var n = Js() * i,
          s = 2 * Math.atan(n / e);
        r.fov = it(r.fov, s, 1 / 0);
      }
      return r;
    };
  },
  traditional: function (e, t, r) {
    return (
      (r = r != null ? r : t),
      wp(
        P.limit.resolution(e),
        P.limit.vfov(0, t),
        P.limit.hfov(0, r),
        P.limit.pitch(-Math.PI / 2, Math.PI / 2)
      )
    );
  },
};
P.type = P.prototype.type = "rectilinear";
var Pp = P,
  zp = G,
  ur = ne.mat4,
  Dt = ne.vec4,
  ea = _r,
  _t = wi,
  Ie = wt,
  Ap = U,
  Rp = 0,
  Ip = 0,
  ta = 0.5,
  ra = 0.5,
  Op = 1,
  Dp = [1, 0, 1, 0],
  Hp = [-1, -1, 1, 1],
  Np = 1e-6;
function D(e, t) {
  if (!(e && e.mediaAspectRatio != null))
    throw new Error("mediaAspectRatio must be defined");
  (this._x = e && e.x != null ? e.x : ta),
    (this._y = e && e.y != null ? e.y : ra),
    (this._zoom = e && e.zoom != null ? e.zoom : Op),
    (this._mediaAspectRatio = e.mediaAspectRatio),
    (this._width = e && e.width != null ? e.width : Rp),
    (this._height = e && e.height != null ? e.height : Ip),
    (this._limiter = t || null),
    (this._projMatrix = ur.create()),
    (this._invProjMatrix = ur.create()),
    (this._frustum = [0, 0, 0, 0]),
    (this._projectionChanged = !0),
    (this._params = {}),
    (this._vec = Dt.create()),
    this._update();
}
zp(D);
D.prototype.destroy = function () {
  Ap(this);
};
D.prototype.x = function () {
  return this._x;
};
D.prototype.y = function () {
  return this._y;
};
D.prototype.zoom = function () {
  return this._zoom;
};
D.prototype.mediaAspectRatio = function () {
  return this._mediaAspectRatio;
};
D.prototype.width = function () {
  return this._width;
};
D.prototype.height = function () {
  return this._height;
};
D.prototype.size = function (e) {
  return (e = e || {}), (e.width = this._width), (e.height = this._height), e;
};
D.prototype.parameters = function (e) {
  return (
    (e = e || {}),
    (e.x = this._x),
    (e.y = this._y),
    (e.zoom = this._zoom),
    (e.mediaAspectRatio = this._mediaAspectRatio),
    e
  );
};
D.prototype.limiter = function () {
  return this._limiter;
};
D.prototype.setX = function (e) {
  this._resetParams(), (this._params.x = e), this._update(this._params);
};
D.prototype.setY = function (e) {
  this._resetParams(), (this._params.y = e), this._update(this._params);
};
D.prototype.setZoom = function (e) {
  this._resetParams(), (this._params.zoom = e), this._update(this._params);
};
D.prototype.offsetX = function (e) {
  this.setX(this._x + e);
};
D.prototype.offsetY = function (e) {
  this.setY(this._y + e);
};
D.prototype.offsetZoom = function (e) {
  this.setZoom(this._zoom + e);
};
D.prototype.setMediaAspectRatio = function (e) {
  this._resetParams(),
    (this._params.mediaAspectRatio = e),
    this._update(this._params);
};
D.prototype.setSize = function (e) {
  this._resetParams(),
    (this._params.width = e.width),
    (this._params.height = e.height),
    this._update(this._params);
};
D.prototype.setParameters = function (e) {
  this._resetParams(),
    (this._params.x = e.x),
    (this._params.y = e.y),
    (this._params.zoom = e.zoom),
    (this._params.mediaAspectRatio = e.mediaAspectRatio),
    this._update(this._params);
};
D.prototype.setLimiter = function (e) {
  (this._limiter = e || null), this._update();
};
D.prototype._resetParams = function () {
  var e = this._params;
  (e.x = null),
    (e.y = null),
    (e.zoom = null),
    (e.mediaAspectRatio = null),
    (e.width = null),
    (e.height = null);
};
D.prototype._update = function (e) {
  e == null && (this._resetParams(), (e = this._params));
  var t = this._x,
    r = this._y,
    i = this._zoom,
    n = this._mediaAspectRatio,
    s = this._width,
    a = this._height;
  if (
    ((e.x = e.x != null ? e.x : t),
    (e.y = e.y != null ? e.y : r),
    (e.zoom = e.zoom != null ? e.zoom : i),
    (e.mediaAspectRatio = e.mediaAspectRatio != null ? e.mediaAspectRatio : n),
    (e.width = e.width != null ? e.width : s),
    (e.height = e.height != null ? e.height : a),
    this._limiter && ((e = this._limiter(e)), !e))
  )
    throw new Error("Bad view limiter");
  var o = e.x,
    h = e.y,
    l = e.zoom,
    c = e.mediaAspectRatio,
    f = e.width,
    d = e.height;
  if (!_t(o) || !_t(h) || !_t(l) || !_t(c) || !_t(f) || !_t(d))
    throw new Error("Bad view - suspect a broken limiter");
  (l = Ie(l, Np, 1 / 0)),
    (this._x = o),
    (this._y = h),
    (this._zoom = l),
    (this._mediaAspectRatio = c),
    (this._width = f),
    (this._height = d),
    (o !== t || h !== r || l !== i || c !== n || f !== s || d !== a) &&
      ((this._projectionChanged = !0), this.emit("change")),
    (f !== s || d !== a) && this.emit("resize");
};
D.prototype._zoomX = function () {
  return this._zoom;
};
D.prototype._zoomY = function () {
  var e = this._mediaAspectRatio,
    t = this._width / this._height,
    r = this._zoom,
    i = (r * e) / t;
  return isNaN(i) && (i = r), i;
};
D.prototype.updateWithControlParameters = function (e) {
  var t = this.zoom(),
    r = this._zoomX(),
    i = this._zoomY();
  this.offsetX(e.axisScaledX * r + e.x * t),
    this.offsetY(e.axisScaledY * i + e.y * t),
    this.offsetZoom(e.zoom * t);
};
D.prototype._updateProjection = function () {
  var e = this._projMatrix,
    t = this._invProjMatrix,
    r = this._frustum;
  if (this._projectionChanged) {
    var i = this._x,
      n = this._y,
      s = this._zoomX(),
      a = this._zoomY(),
      o = (r[0] = 0.5 - n + 0.5 * a),
      h = (r[1] = i - 0.5 + 0.5 * s),
      l = (r[2] = 0.5 - n - 0.5 * a),
      c = (r[3] = i - 0.5 - 0.5 * s);
    ur.ortho(e, c, h, l, o, -1, 1),
      ur.invert(t, e),
      (this._projectionChanged = !1);
  }
};
D.prototype.projection = function () {
  return this._updateProjection(), this._projMatrix;
};
D.prototype.inverseProjection = function () {
  return this._updateProjection(), this._invProjMatrix;
};
D.prototype.intersects = function (e) {
  this._updateProjection();
  for (var t = this._frustum, r = 0; r < t.length; r++) {
    for (var i = t[r], n = Dp[r], s = Hp[r], a = !1, o = 0; o < e.length; o++) {
      var h = e[o];
      if ((s < 0 && h[n] < i) || (s > 0 && h[n] > i)) {
        a = !0;
        break;
      }
    }
    if (!a) return !1;
  }
  return !0;
};
D.prototype.selectLevel = function (e) {
  for (var t = ea() * this.width(), r = this._zoom, i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.width() >= t) return n;
  }
  return e[e.length - 1];
};
D.prototype.coordinatesToScreen = function (e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width,
    n = this._height;
  if (i <= 0 || n <= 0) return (t.x = null), (t.y = null), null;
  var s = e && e.x != null ? e.x : ta,
    a = e && e.y != null ? e.y : ra;
  Dt.set(r, s - 0.5, 0.5 - a, -1, 1), Dt.transformMat4(r, r, this.projection());
  for (var o = 0; o < 3; o++) r[o] /= r[3];
  return (t.x = (i * (r[0] + 1)) / 2), (t.y = (n * (1 - r[1])) / 2), t;
};
D.prototype.screenToCoordinates = function (e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width,
    n = this._height,
    s = (2 * e.x) / i - 1,
    a = 1 - (2 * e.y) / n;
  return (
    Dt.set(r, s, a, 1, 1),
    Dt.transformMat4(r, r, this.inverseProjection()),
    (t.x = 0.5 + r[0]),
    (t.y = 0.5 - r[1]),
    t
  );
};
D.limit = {
  x: function (e, t) {
    return function (i) {
      return (i.x = Ie(i.x, e, t)), i;
    };
  },
  y: function (e, t) {
    return function (i) {
      return (i.y = Ie(i.y, e, t)), i;
    };
  },
  zoom: function (e, t) {
    return function (i) {
      return (i.zoom = Ie(i.zoom, e, t)), i;
    };
  },
  resolution: function (e) {
    return function (r) {
      if (r.width <= 0 || r.height <= 0) return r;
      var i = r.width,
        n = (ea() * i) / e;
      return (r.zoom = Ie(r.zoom, n, 1 / 0)), r;
    };
  },
  visibleX: function (e, t) {
    return function (i) {
      var n = t - e;
      i.zoom > n && (i.zoom = n);
      var s = e + 0.5 * i.zoom,
        a = t - 0.5 * i.zoom;
      return (i.x = Ie(i.x, s, a)), i;
    };
  },
  visibleY: function (e, t) {
    return function (i) {
      if (i.width <= 0 || i.height <= 0) return i;
      var n = i.width / i.height,
        s = n / i.mediaAspectRatio,
        a = (t - e) * s;
      i.zoom > a && (i.zoom = a);
      var o = e + (0.5 * i.zoom) / s,
        h = t - (0.5 * i.zoom) / s;
      return (i.y = Ie(i.y, o, h)), i;
    };
  },
  letterbox: function () {
    return function (t) {
      if (t.width <= 0 || t.height <= 0) return t;
      var r = t.width / t.height,
        i = 1,
        n = r / t.mediaAspectRatio;
      t.mediaAspectRatio >= r && (t.zoom = Math.min(t.zoom, i)),
        t.mediaAspectRatio <= r && (t.zoom = Math.min(t.zoom, n));
      var s, a;
      t.zoom > i
        ? (s = a = 0.5)
        : ((s = 0 + (0.5 * t.zoom) / i), (a = 1 - (0.5 * t.zoom) / i));
      var o, h;
      return (
        t.zoom > n
          ? (o = h = 0.5)
          : ((o = 0 + (0.5 * t.zoom) / n), (h = 1 - (0.5 * t.zoom) / n)),
        (t.x = Ie(t.x, s, a)),
        (t.y = Ie(t.y, o, h)),
        t
      );
    };
  },
};
D.type = D.prototype.type = "flat";
var Fp = D,
  Vp = mn,
  qp = Ge;
function Wt(e) {
  (this._concurrency = (e && e.concurrency) || 1),
    (this._paused = (e && !!e.paused) || !1),
    (this._pool = []);
  for (var t = 0; t < this._concurrency; t++) this._pool.push(new Vp(e));
  this._next = 0;
}
Wt.prototype.length = function () {
  for (var e = 0, t = 0; t < this._pool.length; t++)
    e += this._pool[t].length();
  return e;
};
Wt.prototype.push = function (e, t) {
  var r = this._next,
    i = this._pool[r].push(e, t);
  return (this._next = qp(this._next + 1, this._concurrency)), i;
};
Wt.prototype.pause = function () {
  if (!this._paused) {
    this._paused = !0;
    for (var e = 0; e < this._concurrency; e++) this._pool[e].pause();
  }
};
Wt.prototype.resume = function () {
  if (this._paused) {
    this._paused = !1;
    for (var e = 0; e < this._concurrency; e++) this._pool[e].resume();
  }
};
var kp = Wt;
function Wp() {}
var Yt = Wp,
  Yp = Yt;
function Xp() {
  var e = Array.prototype.slice.call(arguments, 0);
  return function () {
    var r = e.slice(0),
      i = null,
      n = null,
      s = arguments.length
        ? Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        : [],
      a = arguments.length ? arguments[arguments.length - 1] : Yp;
    function o() {
      var l = arguments[0];
      if (l) {
        (i = n = null), a.apply(null, arguments);
        return;
      }
      if (!r.length) {
        (i = n = null), a.apply(null, arguments);
        return;
      }
      i = r.shift();
      var c = i,
        f = Array.prototype.slice.call(arguments, 1);
      f.push(o);
      var d = i.apply(null, f);
      if (c === i) {
        if (typeof d != "function")
          throw new Error("chain: chaining on non-cancellable function");
        n = d;
      }
    }
    function h() {
      n && n.apply(null, arguments);
    }
    return s.unshift(null), o.apply(null, s), h;
  };
}
var Mi = Xp;
function Bp(e, t) {
  var r = null;
  function i() {
    r != null && ((r = null), t(null));
  }
  function n() {
    r != null && (clearTimeout(r), (r = null), t.apply(null, arguments));
  }
  return (r = setTimeout(i, e)), n;
}
var ia = Bp,
  Up = G,
  jp = Tn,
  Gp = kp,
  Zp = Mi,
  Kp = ia,
  en = ot,
  tn = { x: "x", y: "y", z: "z", f: "face" },
  Qp = "bdflru",
  Jp = 4,
  e1 = 1e4;
function Ht(e, t) {
  (t = t || {}),
    (this._loadPool = new Gp({ concurrency: t.concurrency || Jp })),
    (this._retryDelay = t.retryDelay || e1),
    (this._retryMap = {}),
    (this._sourceFromTile = e);
}
Up(Ht);
Ht.prototype.loadAsset = function (e, t, r) {
  var i = this,
    n = this._retryDelay,
    s = this._retryMap,
    a = this._sourceFromTile(t),
    o = a.url,
    h = a.rect,
    l = e.loadImage.bind(e, o, h),
    c = function (m) {
      return i._loadPool.push(l, function (M, b) {
        M
          ? (M instanceof jp && ((s[o] = en()), i.emit("networkError", M, t)),
            m(M, t))
          : (delete s[o], m(null, t, b));
      });
    },
    f,
    d = s[o];
  if (d != null) {
    var p = en(),
      _ = p - d;
    _ < n ? (f = n - _) : ((f = 0), delete s[o]);
  }
  var w = Kp.bind(null, f);
  return Zp(w, c)(r);
};
Ht.fromString = function (e, t) {
  t = t || {};
  var r = (t && t.cubeMapPreviewFaceOrder) || Qp,
    i = t.cubeMapPreviewUrl ? s : n;
  return new Ht(i, t);
  function n(o) {
    var h = e;
    for (var l in tn) {
      var c = tn[l],
        f = t1(l),
        d = o.hasOwnProperty(c) ? o[c] : "";
      h = h.replace(f, d);
    }
    return { url: h };
  }
  function s(o) {
    return o.z === 0 ? a(o) : n(o);
  }
  function a(o) {
    var h = r.indexOf(o.face) / 6;
    return {
      url: t.cubeMapPreviewUrl,
      rect: { x: 0, y: h, width: 1, height: 1 / 6 },
    };
  }
};
function t1(e) {
  var t = "\\{(" + e + ")\\}";
  return new RegExp(t, "g");
}
var r1 = Ht;
function Ti(e) {
  this._asset = e;
}
Ti.prototype.asset = function () {
  return this._asset;
};
Ti.prototype.loadAsset = function (e, t, r) {
  var i = this,
    n = setTimeout(function () {
      r(null, t, i._asset);
    }, 0);
  function s() {
    clearTimeout(n), r.apply(null, arguments);
  }
  return s;
};
var i1 = Ti,
  n1 = ni,
  s1 = Se,
  a1 = G,
  o1 = U;
function ft(e) {
  this.constructor.super_.call(this, e), (this._timestamp = 0);
}
s1(ft, n1);
a1(ft);
ft.prototype.destroy = function () {
  o1(this);
};
ft.prototype.timestamp = function () {
  return this._timestamp;
};
ft.prototype.isDynamic = function () {
  return !0;
};
ft.prototype.markDirty = function () {
  this._timestamp++, this.emit("change");
};
var h1 = ft,
  wr = Ge,
  l1 = 64;
function Ze(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Map: invalid capacity");
  (this._capacity = e || l1), (this._keyBuckets = []), (this._valBuckets = []);
  for (var t = 0; t < this._capacity; t++)
    this._keyBuckets.push([]), this._valBuckets.push([]);
  this._size = 0;
}
Ze.prototype.get = function (e) {
  for (
    var t = wr(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0;
    i < r.length;
    i++
  ) {
    var n = r[i];
    if (e.equals(n)) {
      var s = this._valBuckets[t],
        a = s[i];
      return a;
    }
  }
  return null;
};
Ze.prototype.set = function (e, t) {
  for (
    var r = wr(e.hash(), this._capacity),
      i = this._keyBuckets[r],
      n = this._valBuckets[r],
      s = 0;
    s < i.length;
    s++
  ) {
    var a = i[s];
    if (e.equals(a)) {
      var o = n[s];
      return (i[s] = e), (n[s] = t), o;
    }
  }
  return i.push(e), n.push(t), this._size++, null;
};
Ze.prototype.del = function (e) {
  for (
    var t = wr(e.hash(), this._capacity),
      r = this._keyBuckets[t],
      i = this._valBuckets[t],
      n = 0;
    n < r.length;
    n++
  ) {
    var s = r[n];
    if (e.equals(s)) {
      for (var a = i[n], o = n; o < r.length - 1; o++)
        (r[o] = r[o + 1]), (i[o] = i[o + 1]);
      return (
        (r.length = r.length - 1), (i.length = i.length - 1), this._size--, a
      );
    }
  }
  return null;
};
Ze.prototype.has = function (e) {
  for (
    var t = wr(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0;
    i < r.length;
    i++
  ) {
    var n = r[i];
    if (e.equals(n)) return !0;
  }
  return !1;
};
Ze.prototype.size = function () {
  return this._size;
};
Ze.prototype.clear = function () {
  for (var e = 0; e < this._capacity; e++)
    (this._keyBuckets[e].length = 0), (this._valBuckets[e].length = 0);
  this._size = 0;
};
Ze.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (
      var i = this._keyBuckets[r], n = this._valBuckets[r], s = 0;
      s < i.length;
      s++
    )
      e(i[s], n[s]), (t += 1);
  return t;
};
var c1 = Ze,
  v1 = Ge;
function Ke(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruSet: invalid capacity");
  (this._capacity = e),
    (this._elements = new Array(this._capacity)),
    (this._start = 0),
    (this._size = 0);
}
Ke.prototype._index = function (e) {
  return v1(this._start + e, this._capacity);
};
Ke.prototype.add = function (e) {
  if (this._capacity === 0) return e;
  this.remove(e);
  var t = this._size === this._capacity ? this._elements[this._index(0)] : null;
  return (
    (this._elements[this._index(this._size)] = e),
    this._size < this._capacity ? this._size++ : (this._start = this._index(1)),
    t
  );
};
Ke.prototype.remove = function (e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._elements[this._index(t)];
    if (e.equals(r)) {
      for (var i = t; i < this._size - 1; i++)
        this._elements[this._index(i)] = this._elements[this._index(i + 1)];
      return this._size--, r;
    }
  }
  return null;
};
Ke.prototype.has = function (e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._elements[this._index(t)])) return !0;
  return !1;
};
Ke.prototype.size = function () {
  return this._size;
};
Ke.prototype.clear = function () {
  (this._elements.length = 0), (this._start = 0), (this._size = 0);
};
Ke.prototype.forEach = function (e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._elements[this._index(r)]), (t += 1);
  return t;
};
var f1 = Ke;
function u1(e, t) {
  for (var r in t) r in e || (e[r] = t[r]);
  return e;
}
var Le = u1,
  d1 = Yt;
function p1(e) {
  return function () {
    var r = arguments.length
        ? Array.prototype.slice.call(arguments, 0, arguments.length - 1)
        : [],
      i = arguments.length ? arguments[arguments.length - 1] : d1,
      n = null,
      s = !1;
    function a() {
      var o = arguments[0];
      !o || s ? i.apply(null, arguments) : (n = e.apply(null, r));
    }
    return (
      r.push(a),
      a(!0),
      function () {
        (s = !0), n.apply(null, arguments);
      }
    );
  };
}
var na = p1,
  rn = c1,
  nn = Us,
  _1 = f1,
  sa = G,
  m1 = Le,
  y1 = na,
  g1 = Mi,
  w1 = Se,
  aa = U,
  Rt = typeof MARZIPANODEBUG != "undefined" && MARZIPANODEBUG.textureStore,
  me = { IDLE: 0, START: 1, MARK: 2, END: 3 },
  x1 = { previouslyVisibleCacheSize: 512 },
  M1 = 0;
function Ei() {}
w1(Ei, Error);
function Xt(e, t) {
  var r = this,
    i = M1++;
  (r._id = i),
    (r._store = e),
    (r._tile = t),
    (r._asset = null),
    (r._texture = null),
    (r._changeHandler = function () {
      e.emit("textureInvalid", t);
    });
  var n = e.source(),
    s = e.stage(),
    a = n.loadAsset.bind(n),
    o = s.createTexture.bind(s),
    h = g1(y1(a), o);
  e.emit("textureStartLoad", t),
    Rt && console.log("loading", i, t),
    (r._cancel = h(s, t, function (l, c, f, d) {
      if (((r._cancel = null), l)) {
        f && f.destroy(),
          d && d.destroy(),
          l instanceof Ei
            ? (e.emit("textureCancel", t), Rt && console.log("cancel", i, t))
            : (e.emit("textureError", t, l), Rt && console.log("error", i, t));
        return;
      }
      (r._texture = d),
        f.isDynamic()
          ? ((r._asset = f), f.addEventListener("change", r._changeHandler))
          : f.destroy(),
        e.emit("textureLoad", t),
        Rt && console.log("load", i, t);
    }));
}
Xt.prototype.asset = function () {
  return this._asset;
};
Xt.prototype.texture = function () {
  return this._texture;
};
Xt.prototype.destroy = function () {
  var e = this._id,
    t = this._store,
    r = this._tile,
    i = this._asset,
    n = this._texture,
    s = this._cancel;
  if (s) {
    s(new Ei("Texture load cancelled"));
    return;
  }
  i && (i.removeEventListener("change", this._changeHandler), i.destroy()),
    n && n.destroy(),
    t.emit("textureUnload", r),
    Rt && console.log("unload", e, r),
    aa(this);
};
sa(Xt);
function te(e, t, r) {
  (r = m1(r || {}, x1)),
    (this._source = e),
    (this._stage = t),
    (this._state = me.IDLE),
    (this._delimCount = 0),
    (this._itemMap = new rn()),
    (this._visible = new nn()),
    (this._previouslyVisible = new _1(r.previouslyVisibleCacheSize)),
    (this._pinMap = new rn()),
    (this._newVisible = new nn()),
    (this._noLongerVisible = []),
    (this._visibleAgain = []),
    (this._evicted = []);
}
sa(te);
te.prototype.destroy = function () {
  this.clear(), aa(this);
};
te.prototype.stage = function () {
  return this._stage;
};
te.prototype.source = function () {
  return this._source;
};
te.prototype.clear = function () {
  var e = this;
  (e._evicted.length = 0),
    e._itemMap.forEach(function (t) {
      e._evicted.push(t);
    }),
    e._evicted.forEach(function (t) {
      e._unloadTile(t);
    }),
    e._itemMap.clear(),
    e._visible.clear(),
    e._previouslyVisible.clear(),
    e._pinMap.clear(),
    e._newVisible.clear(),
    (e._noLongerVisible.length = 0),
    (e._visibleAgain.length = 0),
    (e._evicted.length = 0);
};
te.prototype.clearNotPinned = function () {
  var e = this;
  (e._evicted.length = 0),
    e._itemMap.forEach(function (t) {
      e._pinMap.has(t) || e._evicted.push(t);
    }),
    e._evicted.forEach(function (t) {
      e._unloadTile(t);
    }),
    e._visible.clear(),
    e._previouslyVisible.clear(),
    (e._evicted.length = 0);
};
te.prototype.startFrame = function () {
  if (this._state !== me.IDLE && this._state !== me.START)
    throw new Error("TextureStore: startFrame called out of sequence");
  (this._state = me.START), this._delimCount++;
};
te.prototype.markTile = function (e) {
  if (this._state !== me.START && this._state !== me.MARK)
    throw new Error("TextureStore: markTile called out of sequence");
  this._state = me.MARK;
  var t = this._itemMap.get(e),
    r = t && t.texture(),
    i = t && t.asset();
  r && i && r.refresh(e, i), this._newVisible.add(e);
};
te.prototype.endFrame = function () {
  if (
    this._state !== me.START &&
    this._state !== me.MARK &&
    this._state !== me.END
  )
    throw new Error("TextureStore: endFrame called out of sequence");
  (this._state = me.END),
    this._delimCount--,
    this._delimCount || (this._update(), (this._state = me.IDLE));
};
te.prototype._update = function () {
  var e = this;
  (e._noLongerVisible.length = 0),
    e._visible.forEach(function (r) {
      e._newVisible.has(r) || e._noLongerVisible.push(r);
    }),
    (e._visibleAgain.length = 0),
    e._newVisible.forEach(function (r) {
      e._previouslyVisible.has(r) && e._visibleAgain.push(r);
    }),
    e._visibleAgain.forEach(function (r) {
      e._previouslyVisible.remove(r);
    }),
    (e._evicted.length = 0),
    e._noLongerVisible.forEach(function (r) {
      var i = e._itemMap.get(r),
        n = i && i.texture();
      if (n) {
        var s = e._previouslyVisible.add(r);
        s != null && e._evicted.push(s);
      } else i && e._unloadTile(r);
    }),
    e._evicted.forEach(function (r) {
      e._pinMap.has(r) || e._unloadTile(r);
    }),
    e._newVisible.forEach(function (r) {
      var i = e._itemMap.get(r);
      i || e._loadTile(r);
    });
  var t = e._visible;
  (e._visible = e._newVisible),
    (e._newVisible = t),
    e._newVisible.clear(),
    (e._noLongerVisible.length = 0),
    (e._visibleAgain.length = 0),
    (e._evicted.length = 0);
};
te.prototype._loadTile = function (e) {
  if (this._itemMap.has(e))
    throw new Error("TextureStore: loading texture already in cache");
  var t = new Xt(this, e);
  this._itemMap.set(e, t);
};
te.prototype._unloadTile = function (e) {
  var t = this._itemMap.del(e);
  if (!t) throw new Error("TextureStore: unloading texture not in cache");
  t.destroy();
};
te.prototype.asset = function (e) {
  var t = this._itemMap.get(e);
  return t ? t.asset() : null;
};
te.prototype.texture = function (e) {
  var t = this._itemMap.get(e);
  return t ? t.texture() : null;
};
te.prototype.pin = function (e) {
  var t = (this._pinMap.get(e) || 0) + 1;
  return this._pinMap.set(e, t), this._itemMap.has(e) || this._loadTile(e), t;
};
te.prototype.unpin = function (e) {
  var t = this._pinMap.get(e);
  if (t)
    t--,
      t > 0
        ? this._pinMap.set(e, t)
        : (this._pinMap.del(e),
          !this._visible.has(e) &&
            !this._previouslyVisible.has(e) &&
            this._unloadTile(e));
  else throw new Error("TextureStore: unpin when not pinned");
  return t;
};
te.prototype.query = function (e) {
  var t = this._itemMap.get(e),
    r = this._pinMap.get(e) || 0;
  return {
    visible: this._visible.has(e),
    previouslyVisible: this._previouslyVisible.has(e),
    hasAsset: t != null && t.asset() != null,
    hasTexture: t != null && t.texture() != null,
    pinned: r !== 0,
    pinCount: r,
  };
};
var oa = te;
function T1(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
var ha = T1,
  E1 = G,
  b1 = ha,
  S1 = U;
function re(e, t, r, i, n) {
  n = n || {};
  var s = this;
  (this._source = e),
    (this._geometry = t),
    (this._view = r),
    (this._textureStore = i),
    (this._effects = n.effects || {}),
    (this._fixedLevelIndex = null),
    (this._viewChangeHandler = function () {
      s.emit("viewChange", s.view());
    }),
    this._view.addEventListener("change", this._viewChangeHandler),
    (this._textureStoreChangeHandler = function () {
      s.emit("textureStoreChange", s.textureStore());
    }),
    this._textureStore.addEventListener(
      "textureLoad",
      this._textureStoreChangeHandler
    ),
    this._textureStore.addEventListener(
      "textureError",
      this._textureStoreChangeHandler
    ),
    this._textureStore.addEventListener(
      "textureInvalid",
      this._textureStoreChangeHandler
    );
}
E1(re);
re.prototype.destroy = function () {
  this._view.removeEventListener("change", this._viewChangeHandler),
    this._textureStore.removeEventListener(
      "textureLoad",
      this._textureStoreChangeHandler
    ),
    this._textureStore.removeEventListener(
      "textureError",
      this._textureStoreChangeHandler
    ),
    this._textureStore.removeEventListener(
      "textureInvalid",
      this._textureStoreChangeHandler
    ),
    S1(this);
};
re.prototype.source = function () {
  return this._source;
};
re.prototype.geometry = function () {
  return this._geometry;
};
re.prototype.view = function () {
  return this._view;
};
re.prototype.textureStore = function () {
  return this._textureStore;
};
re.prototype.effects = function () {
  return this._effects;
};
re.prototype.setEffects = function (e) {
  (this._effects = e), this.emit("effectsChange", this._effects);
};
re.prototype.mergeEffects = function (e) {
  b1(this._effects, e), this.emit("effectsChange", this._effects);
};
re.prototype.fixedLevel = function () {
  return this._fixedLevelIndex;
};
re.prototype.setFixedLevel = function (e) {
  if (e !== this._fixedLevelIndex) {
    if (e != null && (e >= this._geometry.levelList.length || e < 0))
      throw new Error("Level index out of range: " + e);
    (this._fixedLevelIndex = e),
      this.emit("fixedLevelChange", this._fixedLevelIndex);
  }
};
re.prototype._selectLevel = function () {
  var e;
  return (
    this._fixedLevelIndex != null
      ? (e = this._geometry.levelList[this._fixedLevelIndex])
      : (e = this._view.selectLevel(this._geometry.selectableLevelList)),
    e
  );
};
re.prototype.visibleTiles = function (e) {
  var t = this._selectLevel();
  return this._geometry.visibleTiles(this._view, t, e);
};
re.prototype.pinLevel = function (e) {
  for (
    var t = this._geometry.levelList[e],
      r = this._geometry.levelTiles(t),
      i = 0;
    i < r.length;
    i++
  )
    this._textureStore.pin(r[i]);
};
re.prototype.unpinLevel = function (e) {
  for (
    var t = this._geometry.levelList[e],
      r = this._geometry.levelTiles(t),
      i = 0;
    i < r.length;
    i++
  )
    this._textureStore.unpin(r[i]);
};
re.prototype.pinFirstLevel = function () {
  return this.pinLevel(0);
};
re.prototype.unpinFirstLevel = function () {
  return this.unpinLevel(0);
};
var la = re,
  C1 = G,
  $1 = U;
function Qe(e) {
  var t = this;
  (this._stage = e),
    (this._running = !1),
    (this._rendering = !1),
    (this._requestHandle = null),
    (this._boundLoop = this._loop.bind(this)),
    (this._renderInvalidHandler = function () {
      t._rendering || t.renderOnNextFrame();
    }),
    this._stage.addEventListener("renderInvalid", this._renderInvalidHandler);
}
C1(Qe);
Qe.prototype.destroy = function () {
  this.stop(),
    this._stage.removeEventListener(
      "renderInvalid",
      this._renderInvalidHandler
    ),
    $1(this);
};
Qe.prototype.stage = function () {
  return this._stage;
};
Qe.prototype.start = function () {
  (this._running = !0), this.renderOnNextFrame();
};
Qe.prototype.stop = function () {
  this._requestHandle &&
    (window.cancelAnimationFrame(this._requestHandle),
    (this._requestHandle = null)),
    (this._running = !1);
};
Qe.prototype.renderOnNextFrame = function () {
  this._running &&
    !this._requestHandle &&
    (this._requestHandle = window.requestAnimationFrame(this._boundLoop));
};
Qe.prototype._loop = function () {
  if (!this._running)
    throw new Error("Render loop running while in stopped state");
  (this._requestHandle = null),
    (this._rendering = !0),
    this.emit("beforeRender"),
    (this._rendering = !1),
    this._stage.render(),
    this.emit("afterRender");
};
var ca = Qe;
function He() {
  (this.velocity = null), (this.friction = null), (this.offset = null);
}
He.equals = function (e, t) {
  return (
    e.velocity === t.velocity &&
    e.friction === t.friction &&
    e.offset === t.offset
  );
};
He.prototype.equals = function (e) {
  return He.equals(this, e);
};
He.prototype.update = function (e, t) {
  e.offset && ((this.offset = this.offset || 0), (this.offset += e.offset));
  var r = this.offsetFromVelocity(t);
  r && ((this.offset = this.offset || 0), (this.offset += r)),
    (this.velocity = e.velocity),
    (this.friction = e.friction);
};
He.prototype.reset = function () {
  (this.velocity = null), (this.friction = null), (this.offset = null);
};
He.prototype.velocityAfter = function (e) {
  return this.velocity
    ? this.friction
      ? L1(this.velocity, this.friction * e)
      : this.velocity
    : null;
};
He.prototype.offsetFromVelocity = function (e) {
  e = Math.min(e, this.nullVelocityTime());
  var t = this.velocityAfter(e),
    r = (this.velocity + t) / 2;
  return r * e;
};
He.prototype.nullVelocityTime = function () {
  return this.velocity == null
    ? 0
    : this.velocity && !this.friction
    ? 1 / 0
    : Math.abs(this.velocity / this.friction);
};
function L1(e, t) {
  return e < 0 ? Math.min(0, e + t) : e > 0 ? Math.max(0, e - t) : 0;
}
var Ve = He,
  P1 = G,
  z1 = Ve,
  A1 = U;
function Mt(e, t, r, i, n) {
  if (!e) throw new Error("KeyControlMethod: keyCode must be defined");
  if (!t) throw new Error("KeyControlMethod: parameter must be defined");
  if (!r) throw new Error("KeyControlMethod: velocity must be defined");
  if (!i) throw new Error("KeyControlMethod: friction must be defined");
  (n = n || document),
    (this._keyCode = e),
    (this._parameter = t),
    (this._velocity = r),
    (this._friction = i),
    (this._element = n),
    (this._keydownHandler = this._handlePress.bind(this)),
    (this._keyupHandler = this._handleRelease.bind(this)),
    (this._blurHandler = this._handleBlur.bind(this)),
    this._element.addEventListener("keydown", this._keydownHandler),
    this._element.addEventListener("keyup", this._keyupHandler),
    window.addEventListener("blur", this._blurHandler),
    (this._dynamics = new z1()),
    (this._pressing = !1);
}
P1(Mt);
Mt.prototype.destroy = function () {
  this._element.removeEventListener("keydown", this._keydownHandler),
    this._element.removeEventListener("keyup", this._keyupHandler),
    window.removeEventListener("blur", this._blurHandler),
    A1(this);
};
Mt.prototype._handlePress = function (e) {
  e.keyCode === this._keyCode &&
    ((this._pressing = !0),
    (this._dynamics.velocity = this._velocity),
    (this._dynamics.friction = 0),
    this.emit("parameterDynamics", this._parameter, this._dynamics),
    this.emit("active"));
};
Mt.prototype._handleRelease = function (e) {
  e.keyCode === this._keyCode &&
    (this._pressing &&
      ((this._dynamics.friction = this._friction),
      this.emit("parameterDynamics", this._parameter, this._dynamics),
      this.emit("inactive")),
    (this._pressing = !1));
};
Mt.prototype._handleBlur = function () {
  (this._dynamics.velocity = 0),
    this.emit("parameterDynamics", this._parameter, this._dynamics),
    this.emit("inactive"),
    (this._pressing = !1);
};
var va = Mt,
  bi = { exports: {} };
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */ (function (e) {
  (function (t, r, i, n) {
    var s = ["", "webkit", "moz", "MS", "ms", "o"],
      a = r.createElement("div"),
      o = "function",
      h = Math.round,
      l = Math.abs,
      c = Date.now;
    function f(v, u, y) {
      return setTimeout(M(v, y), u);
    }
    function d(v, u, y) {
      return Array.isArray(v) ? (p(v, y[u], y), !0) : !1;
    }
    function p(v, u, y) {
      var x;
      if (!!v)
        if (v.forEach) v.forEach(u, y);
        else if (v.length !== n)
          for (x = 0; x < v.length; ) u.call(y, v[x], x, v), x++;
        else for (x in v) v.hasOwnProperty(x) && u.call(y, v[x], x, v);
    }
    function _(v, u, y) {
      for (var x = Object.keys(u), T = 0; T < x.length; )
        (!y || (y && v[x[T]] === n)) && (v[x[T]] = u[x[T]]), T++;
      return v;
    }
    function w(v, u) {
      return _(v, u, !0);
    }
    function m(v, u, y) {
      var x = u.prototype,
        T;
      (T = v.prototype = Object.create(x)),
        (T.constructor = v),
        (T._super = x),
        y && _(T, y);
    }
    function M(v, u) {
      return function () {
        return v.apply(u, arguments);
      };
    }
    function b(v, u) {
      return typeof v == o ? v.apply((u && u[0]) || n, u) : v;
    }
    function S(v, u) {
      return v === n ? u : v;
    }
    function C(v, u, y) {
      p(F(u), function (x) {
        v.addEventListener(x, y, !1);
      });
    }
    function $(v, u, y) {
      p(F(u), function (x) {
        v.removeEventListener(x, y, !1);
      });
    }
    function E(v, u) {
      for (; v; ) {
        if (v == u) return !0;
        v = v.parentNode;
      }
      return !1;
    }
    function O(v, u) {
      return v.indexOf(u) > -1;
    }
    function F(v) {
      return v.trim().split(/\s+/g);
    }
    function H(v, u, y) {
      if (v.indexOf && !y) return v.indexOf(u);
      for (var x = 0; x < v.length; ) {
        if ((y && v[x][y] == u) || (!y && v[x] === u)) return x;
        x++;
      }
      return -1;
    }
    function N(v) {
      return Array.prototype.slice.call(v, 0);
    }
    function R(v, u, y) {
      for (var x = [], T = [], A = 0; A < v.length; ) {
        var q = u ? v[A][u] : v[A];
        H(T, q) < 0 && x.push(v[A]), (T[A] = q), A++;
      }
      return (
        y &&
          (u
            ? (x = x.sort(function (ae, Ee) {
                return ae[u] > Ee[u];
              }))
            : (x = x.sort())),
        x
      );
    }
    function V(v, u) {
      for (
        var y, x, T = u[0].toUpperCase() + u.slice(1), A = 0;
        A < s.length;

      ) {
        if (((y = s[A]), (x = y ? y + T : u), x in v)) return x;
        A++;
      }
      return n;
    }
    var B = 1;
    function z() {
      return B++;
    }
    function g(v) {
      var u = v.ownerDocument;
      return u.defaultView || u.parentWindow;
    }
    var ze = /mobile|tablet|ip(ad|hone|od)|android/i,
      j = "ontouchstart" in t,
      Je = V(t, "PointerEvent") !== n,
      xe = j && ze.test(navigator.userAgent),
      ve = "touch",
      za = "pen",
      br = "mouse",
      Aa = "kinect",
      Ra = 25,
      he = 1,
      et = 2,
      K = 4,
      le = 8,
      Gt = 1,
      bt = 2,
      St = 4,
      Ct = 8,
      $t = 16,
      Me = bt | St,
      tt = Ct | $t,
      Si = Me | tt,
      Ci = ["x", "y"],
      Zt = ["clientX", "clientY"];
    function de(v, u) {
      var y = this;
      (this.manager = v),
        (this.callback = u),
        (this.element = v.element),
        (this.target = v.options.inputTarget),
        (this.domHandler = function (x) {
          b(v.options.enable, [v]) && y.handler(x);
        }),
        this.init();
    }
    de.prototype = {
      handler: function () {},
      init: function () {
        this.evEl && C(this.element, this.evEl, this.domHandler),
          this.evTarget && C(this.target, this.evTarget, this.domHandler),
          this.evWin && C(g(this.element), this.evWin, this.domHandler);
      },
      destroy: function () {
        this.evEl && $(this.element, this.evEl, this.domHandler),
          this.evTarget && $(this.target, this.evTarget, this.domHandler),
          this.evWin && $(g(this.element), this.evWin, this.domHandler);
      },
    };
    function Ia(v) {
      var u,
        y = v.options.inputClass;
      return (
        y ? (u = y) : Je ? (u = Cr) : xe ? (u = Jt) : j ? (u = $r) : (u = Qt),
        new u(v, Oa)
      );
    }
    function Oa(v, u, y) {
      var x = y.pointers.length,
        T = y.changedPointers.length,
        A = u & he && x - T === 0,
        q = u & (K | le) && x - T === 0;
      (y.isFirst = !!A),
        (y.isFinal = !!q),
        A && (v.session = {}),
        (y.eventType = u),
        Da(v, y),
        v.emit("hammer.input", y),
        v.recognize(y),
        (v.session.prevInput = y);
    }
    function Da(v, u) {
      var y = v.session,
        x = u.pointers,
        T = x.length;
      y.firstInput || (y.firstInput = $i(u)),
        T > 1 && !y.firstMultiple
          ? (y.firstMultiple = $i(u))
          : T === 1 && (y.firstMultiple = !1);
      var A = y.firstInput,
        q = y.firstMultiple,
        se = q ? q.center : A.center,
        ae = (u.center = Li(x));
      (u.timeStamp = c()),
        (u.deltaTime = u.timeStamp - A.timeStamp),
        (u.angle = Sr(se, ae)),
        (u.distance = Kt(se, ae)),
        Ha(y, u),
        (u.offsetDirection = Pi(u.deltaX, u.deltaY)),
        (u.scale = q ? qa(q.pointers, x) : 1),
        (u.rotation = q ? Va(q.pointers, x) : 0),
        Na(y, u);
      var Ee = v.element;
      E(u.srcEvent.target, Ee) && (Ee = u.srcEvent.target), (u.target = Ee);
    }
    function Ha(v, u) {
      var y = u.center,
        x = v.offsetDelta || {},
        T = v.prevDelta || {},
        A = v.prevInput || {};
      (u.eventType === he || A.eventType === K) &&
        ((T = v.prevDelta = { x: A.deltaX || 0, y: A.deltaY || 0 }),
        (x = v.offsetDelta = { x: y.x, y: y.y })),
        (u.deltaX = T.x + (y.x - x.x)),
        (u.deltaY = T.y + (y.y - x.y));
    }
    function Na(v, u) {
      var y = v.lastInterval || u,
        x = u.timeStamp - y.timeStamp,
        T,
        A,
        q,
        se;
      if (u.eventType != le && (x > Ra || y.velocity === n)) {
        var ae = y.deltaX - u.deltaX,
          Ee = y.deltaY - u.deltaY,
          pt = Fa(x, ae, Ee);
        (A = pt.x),
          (q = pt.y),
          (T = l(pt.x) > l(pt.y) ? pt.x : pt.y),
          (se = Pi(ae, Ee)),
          (v.lastInterval = u);
      } else
        (T = y.velocity),
          (A = y.velocityX),
          (q = y.velocityY),
          (se = y.direction);
      (u.velocity = T),
        (u.velocityX = A),
        (u.velocityY = q),
        (u.direction = se);
    }
    function $i(v) {
      for (var u = [], y = 0; y < v.pointers.length; )
        (u[y] = {
          clientX: h(v.pointers[y].clientX),
          clientY: h(v.pointers[y].clientY),
        }),
          y++;
      return {
        timeStamp: c(),
        pointers: u,
        center: Li(u),
        deltaX: v.deltaX,
        deltaY: v.deltaY,
      };
    }
    function Li(v) {
      var u = v.length;
      if (u === 1) return { x: h(v[0].clientX), y: h(v[0].clientY) };
      for (var y = 0, x = 0, T = 0; T < u; )
        (y += v[T].clientX), (x += v[T].clientY), T++;
      return { x: h(y / u), y: h(x / u) };
    }
    function Fa(v, u, y) {
      return { x: u / v || 0, y: y / v || 0 };
    }
    function Pi(v, u) {
      return v === u ? Gt : l(v) >= l(u) ? (v > 0 ? bt : St) : u > 0 ? Ct : $t;
    }
    function Kt(v, u, y) {
      y || (y = Ci);
      var x = u[y[0]] - v[y[0]],
        T = u[y[1]] - v[y[1]];
      return Math.sqrt(x * x + T * T);
    }
    function Sr(v, u, y) {
      y || (y = Ci);
      var x = u[y[0]] - v[y[0]],
        T = u[y[1]] - v[y[1]];
      return (Math.atan2(T, x) * 180) / Math.PI;
    }
    function Va(v, u) {
      return Sr(u[1], u[0], Zt) - Sr(v[1], v[0], Zt);
    }
    function qa(v, u) {
      return Kt(u[0], u[1], Zt) / Kt(v[0], v[1], Zt);
    }
    var ka = { mousedown: he, mousemove: et, mouseup: K },
      Wa = "mousedown",
      Ya = "mousemove mouseup";
    function Qt() {
      (this.evEl = Wa),
        (this.evWin = Ya),
        (this.allow = !0),
        (this.pressed = !1),
        de.apply(this, arguments);
    }
    m(Qt, de, {
      handler: function (u) {
        var y = ka[u.type];
        y & he && u.button === 0 && (this.pressed = !0),
          y & et && u.which !== 1 && (y = K),
          !(!this.pressed || !this.allow) &&
            (y & K && (this.pressed = !1),
            this.callback(this.manager, y, {
              pointers: [u],
              changedPointers: [u],
              pointerType: br,
              srcEvent: u,
            }));
      },
    });
    var Xa = {
        pointerdown: he,
        pointermove: et,
        pointerup: K,
        pointercancel: le,
        pointerout: le,
      },
      Ba = { 2: ve, 3: za, 4: br, 5: Aa },
      zi = "pointerdown",
      Ai = "pointermove pointerup pointercancel";
    t.MSPointerEvent &&
      ((zi = "MSPointerDown"),
      (Ai = "MSPointerMove MSPointerUp MSPointerCancel"));
    function Cr() {
      (this.evEl = zi),
        (this.evWin = Ai),
        de.apply(this, arguments),
        (this.store = this.manager.session.pointerEvents = []);
    }
    m(Cr, de, {
      handler: function (u) {
        var y = this.store,
          x = !1,
          T = u.type.toLowerCase().replace("ms", ""),
          A = Xa[T],
          q = Ba[u.pointerType] || u.pointerType,
          se = q == ve,
          ae = H(y, u.pointerId, "pointerId");
        A & he && (u.button === 0 || se)
          ? ae < 0 && (y.push(u), (ae = y.length - 1))
          : A & (K | le) && (x = !0),
          !(ae < 0) &&
            ((y[ae] = u),
            this.callback(this.manager, A, {
              pointers: y,
              changedPointers: [u],
              pointerType: q,
              srcEvent: u,
            }),
            x && y.splice(ae, 1));
      },
    });
    var Ua = { touchstart: he, touchmove: et, touchend: K, touchcancel: le },
      ja = "touchstart",
      Ga = "touchstart touchmove touchend touchcancel";
    function Ri() {
      (this.evTarget = ja),
        (this.evWin = Ga),
        (this.started = !1),
        de.apply(this, arguments);
    }
    m(Ri, de, {
      handler: function (u) {
        var y = Ua[u.type];
        if ((y === he && (this.started = !0), !!this.started)) {
          var x = Za.call(this, u, y);
          y & (K | le) &&
            x[0].length - x[1].length === 0 &&
            (this.started = !1),
            this.callback(this.manager, y, {
              pointers: x[0],
              changedPointers: x[1],
              pointerType: ve,
              srcEvent: u,
            });
        }
      },
    });
    function Za(v, u) {
      var y = N(v.touches),
        x = N(v.changedTouches);
      return u & (K | le) && (y = R(y.concat(x), "identifier", !0)), [y, x];
    }
    var Ka = { touchstart: he, touchmove: et, touchend: K, touchcancel: le },
      Qa = "touchstart touchmove touchend touchcancel";
    function Jt() {
      (this.evTarget = Qa), (this.targetIds = {}), de.apply(this, arguments);
    }
    m(Jt, de, {
      handler: function (u) {
        var y = Ka[u.type],
          x = Ja.call(this, u, y);
        !x ||
          this.callback(this.manager, y, {
            pointers: x[0],
            changedPointers: x[1],
            pointerType: ve,
            srcEvent: u,
          });
      },
    });
    function Ja(v, u) {
      var y = N(v.touches),
        x = this.targetIds;
      if (u & (he | et) && y.length === 1)
        return (x[y[0].identifier] = !0), [y, y];
      var T,
        A,
        q = N(v.changedTouches),
        se = [],
        ae = this.target;
      if (
        ((A = y.filter(function (Ee) {
          return E(Ee.target, ae);
        })),
        u === he)
      )
        for (T = 0; T < A.length; ) (x[A[T].identifier] = !0), T++;
      for (T = 0; T < q.length; )
        x[q[T].identifier] && se.push(q[T]),
          u & (K | le) && delete x[q[T].identifier],
          T++;
      if (!!se.length) return [R(A.concat(se), "identifier", !0), se];
    }
    function $r() {
      de.apply(this, arguments);
      var v = M(this.handler, this);
      (this.touch = new Jt(this.manager, v)),
        (this.mouse = new Qt(this.manager, v));
    }
    m($r, de, {
      handler: function (u, y, x) {
        var T = x.pointerType == ve,
          A = x.pointerType == br;
        if (T) this.mouse.allow = !1;
        else if (A && !this.mouse.allow) return;
        y & (K | le) && (this.mouse.allow = !0), this.callback(u, y, x);
      },
      destroy: function () {
        this.touch.destroy(), this.mouse.destroy();
      },
    });
    var Ii = V(a.style, "touchAction"),
      Oi = Ii !== n,
      Di = "compute",
      Hi = "auto",
      Lr = "manipulation",
      Lt = "none",
      Pt = "pan-x",
      zt = "pan-y";
    function Pr(v, u) {
      (this.manager = v), this.set(u);
    }
    Pr.prototype = {
      set: function (v) {
        v == Di && (v = this.compute()),
          Oi && (this.manager.element.style[Ii] = v),
          (this.actions = v.toLowerCase().trim());
      },
      update: function () {
        this.set(this.manager.options.touchAction);
      },
      compute: function () {
        var v = [];
        return (
          p(this.manager.recognizers, function (u) {
            b(u.options.enable, [u]) && (v = v.concat(u.getTouchAction()));
          }),
          eo(v.join(" "))
        );
      },
      preventDefaults: function (v) {
        if (!Oi) {
          var u = v.srcEvent,
            y = v.offsetDirection;
          if (this.manager.session.prevented) {
            u.preventDefault();
            return;
          }
          var x = this.actions,
            T = O(x, Lt),
            A = O(x, zt),
            q = O(x, Pt);
          if (T || (A && y & Me) || (q && y & tt)) return this.preventSrc(u);
        }
      },
      preventSrc: function (v) {
        (this.manager.session.prevented = !0), v.preventDefault();
      },
    };
    function eo(v) {
      if (O(v, Lt)) return Lt;
      var u = O(v, Pt),
        y = O(v, zt);
      return u && y
        ? Pt + " " + zt
        : u || y
        ? u
          ? Pt
          : zt
        : O(v, Lr)
        ? Lr
        : Hi;
    }
    var er = 1,
      pe = 2,
      dt = 4,
      ke = 8,
      Ae = ke,
      At = 16,
      Te = 32;
    function Re(v) {
      (this.id = z()),
        (this.manager = null),
        (this.options = w(v || {}, this.defaults)),
        (this.options.enable = S(this.options.enable, !0)),
        (this.state = er),
        (this.simultaneous = {}),
        (this.requireFail = []);
    }
    Re.prototype = {
      defaults: {},
      set: function (v) {
        return (
          _(this.options, v),
          this.manager && this.manager.touchAction.update(),
          this
        );
      },
      recognizeWith: function (v) {
        if (d(v, "recognizeWith", this)) return this;
        var u = this.simultaneous;
        return (
          (v = tr(v, this)),
          u[v.id] || ((u[v.id] = v), v.recognizeWith(this)),
          this
        );
      },
      dropRecognizeWith: function (v) {
        return d(v, "dropRecognizeWith", this)
          ? this
          : ((v = tr(v, this)), delete this.simultaneous[v.id], this);
      },
      requireFailure: function (v) {
        if (d(v, "requireFailure", this)) return this;
        var u = this.requireFail;
        return (
          (v = tr(v, this)),
          H(u, v) === -1 && (u.push(v), v.requireFailure(this)),
          this
        );
      },
      dropRequireFailure: function (v) {
        if (d(v, "dropRequireFailure", this)) return this;
        v = tr(v, this);
        var u = H(this.requireFail, v);
        return u > -1 && this.requireFail.splice(u, 1), this;
      },
      hasRequireFailures: function () {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function (v) {
        return !!this.simultaneous[v.id];
      },
      emit: function (v) {
        var u = this,
          y = this.state;
        function x(T) {
          u.manager.emit(u.options.event + (T ? to(y) : ""), v);
        }
        y < ke && x(!0), x(), y >= ke && x(!0);
      },
      tryEmit: function (v) {
        if (this.canEmit()) return this.emit(v);
        this.state = Te;
      },
      canEmit: function () {
        for (var v = 0; v < this.requireFail.length; ) {
          if (!(this.requireFail[v].state & (Te | er))) return !1;
          v++;
        }
        return !0;
      },
      recognize: function (v) {
        var u = _({}, v);
        if (!b(this.options.enable, [this, u])) {
          this.reset(), (this.state = Te);
          return;
        }
        this.state & (Ae | At | Te) && (this.state = er),
          (this.state = this.process(u)),
          this.state & (pe | dt | ke | At) && this.tryEmit(u);
      },
      process: function (v) {},
      getTouchAction: function () {},
      reset: function () {},
    };
    function to(v) {
      return v & At
        ? "cancel"
        : v & ke
        ? "end"
        : v & dt
        ? "move"
        : v & pe
        ? "start"
        : "";
    }
    function Ni(v) {
      return v == $t
        ? "down"
        : v == Ct
        ? "up"
        : v == bt
        ? "left"
        : v == St
        ? "right"
        : "";
    }
    function tr(v, u) {
      var y = u.manager;
      return y ? y.get(v) : v;
    }
    function ye() {
      Re.apply(this, arguments);
    }
    m(ye, Re, {
      defaults: { pointers: 1 },
      attrTest: function (v) {
        var u = this.options.pointers;
        return u === 0 || v.pointers.length === u;
      },
      process: function (v) {
        var u = this.state,
          y = v.eventType,
          x = u & (pe | dt),
          T = this.attrTest(v);
        return x && (y & le || !T)
          ? u | At
          : x || T
          ? y & K
            ? u | ke
            : u & pe
            ? u | dt
            : pe
          : Te;
      },
    });
    function rr() {
      ye.apply(this, arguments), (this.pX = null), (this.pY = null);
    }
    m(rr, ye, {
      defaults: { event: "pan", threshold: 10, pointers: 1, direction: Si },
      getTouchAction: function () {
        var v = this.options.direction,
          u = [];
        return v & Me && u.push(zt), v & tt && u.push(Pt), u;
      },
      directionTest: function (v) {
        var u = this.options,
          y = !0,
          x = v.distance,
          T = v.direction,
          A = v.deltaX,
          q = v.deltaY;
        return (
          T & u.direction ||
            (u.direction & Me
              ? ((T = A === 0 ? Gt : A < 0 ? bt : St),
                (y = A != this.pX),
                (x = Math.abs(v.deltaX)))
              : ((T = q === 0 ? Gt : q < 0 ? Ct : $t),
                (y = q != this.pY),
                (x = Math.abs(v.deltaY)))),
          (v.direction = T),
          y && x > u.threshold && T & u.direction
        );
      },
      attrTest: function (v) {
        return (
          ye.prototype.attrTest.call(this, v) &&
          (this.state & pe || (!(this.state & pe) && this.directionTest(v)))
        );
      },
      emit: function (v) {
        (this.pX = v.deltaX), (this.pY = v.deltaY);
        var u = Ni(v.direction);
        u && this.manager.emit(this.options.event + u, v),
          this._super.emit.call(this, v);
      },
    });
    function zr() {
      ye.apply(this, arguments);
    }
    m(zr, ye, {
      defaults: { event: "pinch", threshold: 0, pointers: 2 },
      getTouchAction: function () {
        return [Lt];
      },
      attrTest: function (v) {
        return (
          this._super.attrTest.call(this, v) &&
          (Math.abs(v.scale - 1) > this.options.threshold || this.state & pe)
        );
      },
      emit: function (v) {
        if ((this._super.emit.call(this, v), v.scale !== 1)) {
          var u = v.scale < 1 ? "in" : "out";
          this.manager.emit(this.options.event + u, v);
        }
      },
    });
    function Ar() {
      Re.apply(this, arguments), (this._timer = null), (this._input = null);
    }
    m(Ar, Re, {
      defaults: { event: "press", pointers: 1, time: 500, threshold: 5 },
      getTouchAction: function () {
        return [Hi];
      },
      process: function (v) {
        var u = this.options,
          y = v.pointers.length === u.pointers,
          x = v.distance < u.threshold,
          T = v.deltaTime > u.time;
        if (((this._input = v), !x || !y || (v.eventType & (K | le) && !T)))
          this.reset();
        else if (v.eventType & he)
          this.reset(),
            (this._timer = f(
              function () {
                (this.state = Ae), this.tryEmit();
              },
              u.time,
              this
            ));
        else if (v.eventType & K) return Ae;
        return Te;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function (v) {
        this.state === Ae &&
          (v && v.eventType & K
            ? this.manager.emit(this.options.event + "up", v)
            : ((this._input.timeStamp = c()),
              this.manager.emit(this.options.event, this._input)));
      },
    });
    function Rr() {
      ye.apply(this, arguments);
    }
    m(Rr, ye, {
      defaults: { event: "rotate", threshold: 0, pointers: 2 },
      getTouchAction: function () {
        return [Lt];
      },
      attrTest: function (v) {
        return (
          this._super.attrTest.call(this, v) &&
          (Math.abs(v.rotation) > this.options.threshold || this.state & pe)
        );
      },
    });
    function Ir() {
      ye.apply(this, arguments);
    }
    m(Ir, ye, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.65,
        direction: Me | tt,
        pointers: 1,
      },
      getTouchAction: function () {
        return rr.prototype.getTouchAction.call(this);
      },
      attrTest: function (v) {
        var u = this.options.direction,
          y;
        return (
          u & (Me | tt)
            ? (y = v.velocity)
            : u & Me
            ? (y = v.velocityX)
            : u & tt && (y = v.velocityY),
          this._super.attrTest.call(this, v) &&
            u & v.direction &&
            v.distance > this.options.threshold &&
            l(y) > this.options.velocity &&
            v.eventType & K
        );
      },
      emit: function (v) {
        var u = Ni(v.direction);
        u && this.manager.emit(this.options.event + u, v),
          this.manager.emit(this.options.event, v);
      },
    });
    function ir() {
      Re.apply(this, arguments),
        (this.pTime = !1),
        (this.pCenter = !1),
        (this._timer = null),
        (this._input = null),
        (this.count = 0);
    }
    m(ir, Re, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 2,
        posThreshold: 10,
      },
      getTouchAction: function () {
        return [Lr];
      },
      process: function (v) {
        var u = this.options,
          y = v.pointers.length === u.pointers,
          x = v.distance < u.threshold,
          T = v.deltaTime < u.time;
        if ((this.reset(), v.eventType & he && this.count === 0))
          return this.failTimeout();
        if (x && T && y) {
          if (v.eventType != K) return this.failTimeout();
          var A = this.pTime ? v.timeStamp - this.pTime < u.interval : !0,
            q = !this.pCenter || Kt(this.pCenter, v.center) < u.posThreshold;
          (this.pTime = v.timeStamp),
            (this.pCenter = v.center),
            !q || !A ? (this.count = 1) : (this.count += 1),
            (this._input = v);
          var se = this.count % u.taps;
          if (se === 0)
            return this.hasRequireFailures()
              ? ((this._timer = f(
                  function () {
                    (this.state = Ae), this.tryEmit();
                  },
                  u.interval,
                  this
                )),
                pe)
              : Ae;
        }
        return Te;
      },
      failTimeout: function () {
        return (
          (this._timer = f(
            function () {
              this.state = Te;
            },
            this.options.interval,
            this
          )),
          Te
        );
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function () {
        this.state == Ae &&
          ((this._input.tapCount = this.count),
          this.manager.emit(this.options.event, this._input));
      },
    });
    function We(v, u) {
      return (
        (u = u || {}),
        (u.recognizers = S(u.recognizers, We.defaults.preset)),
        new Or(v, u)
      );
    }
    (We.VERSION = "2.0.4"),
      (We.defaults = {
        domEvents: !1,
        touchAction: Di,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
          [Rr, { enable: !1 }],
          [zr, { enable: !1 }, ["rotate"]],
          [Ir, { direction: Me }],
          [rr, { direction: Me }, ["swipe"]],
          [ir],
          [ir, { event: "doubletap", taps: 2 }, ["tap"]],
          [Ar],
        ],
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          contentZooming: "none",
          userDrag: "none",
          tapHighlightColor: "rgba(0,0,0,0)",
        },
      });
    var ro = 1,
      Fi = 2;
    function Or(v, u) {
      (u = u || {}),
        (this.options = w(u, We.defaults)),
        (this.options.inputTarget = this.options.inputTarget || v),
        (this.handlers = {}),
        (this.session = {}),
        (this.recognizers = []),
        (this.element = v),
        (this.input = Ia(this)),
        (this.touchAction = new Pr(this, this.options.touchAction)),
        Vi(this, !0),
        p(
          u.recognizers,
          function (y) {
            var x = this.add(new y[0](y[1]));
            y[2] && x.recognizeWith(y[2]), y[3] && x.requireFailure(y[3]);
          },
          this
        );
    }
    Or.prototype = {
      set: function (v) {
        return (
          _(this.options, v),
          v.touchAction && this.touchAction.update(),
          v.inputTarget &&
            (this.input.destroy(),
            (this.input.target = v.inputTarget),
            this.input.init()),
          this
        );
      },
      stop: function (v) {
        this.session.stopped = v ? Fi : ro;
      },
      recognize: function (v) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(v);
          var y,
            x = this.recognizers,
            T = u.curRecognizer;
          (!T || (T && T.state & Ae)) && (T = u.curRecognizer = null);
          for (var A = 0; A < x.length; )
            (y = x[A]),
              u.stopped !== Fi && (!T || y == T || y.canRecognizeWith(T))
                ? y.recognize(v)
                : y.reset(),
              !T && y.state & (pe | dt | ke) && (T = u.curRecognizer = y),
              A++;
        }
      },
      get: function (v) {
        if (v instanceof Re) return v;
        for (var u = this.recognizers, y = 0; y < u.length; y++)
          if (u[y].options.event == v) return u[y];
        return null;
      },
      add: function (v) {
        if (d(v, "add", this)) return this;
        var u = this.get(v.options.event);
        return (
          u && this.remove(u),
          this.recognizers.push(v),
          (v.manager = this),
          this.touchAction.update(),
          v
        );
      },
      remove: function (v) {
        if (d(v, "remove", this)) return this;
        var u = this.recognizers;
        return (
          (v = this.get(v)),
          u.splice(H(u, v), 1),
          this.touchAction.update(),
          this
        );
      },
      on: function (v, u) {
        var y = this.handlers;
        return (
          p(F(v), function (x) {
            (y[x] = y[x] || []), y[x].push(u);
          }),
          this
        );
      },
      off: function (v, u) {
        var y = this.handlers;
        return (
          p(F(v), function (x) {
            u ? y[x].splice(H(y[x], u), 1) : delete y[x];
          }),
          this
        );
      },
      emit: function (v, u) {
        this.options.domEvents && io(v, u);
        var y = this.handlers[v] && this.handlers[v].slice();
        if (!(!y || !y.length)) {
          (u.type = v),
            (u.preventDefault = function () {
              u.srcEvent.preventDefault();
            });
          for (var x = 0; x < y.length; ) y[x](u), x++;
        }
      },
      destroy: function () {
        this.element && Vi(this, !1),
          (this.handlers = {}),
          (this.session = {}),
          this.input.destroy(),
          (this.element = null);
      },
    };
    function Vi(v, u) {
      var y = v.element;
      p(v.options.cssProps, function (x, T) {
        y.style[V(y.style, T)] = u ? x : "";
      });
    }
    function io(v, u) {
      var y = r.createEvent("Event");
      y.initEvent(v, !0, !0), (y.gesture = u), u.target.dispatchEvent(y);
    }
    _(We, {
      INPUT_START: he,
      INPUT_MOVE: et,
      INPUT_END: K,
      INPUT_CANCEL: le,
      STATE_POSSIBLE: er,
      STATE_BEGAN: pe,
      STATE_CHANGED: dt,
      STATE_ENDED: ke,
      STATE_RECOGNIZED: Ae,
      STATE_CANCELLED: At,
      STATE_FAILED: Te,
      DIRECTION_NONE: Gt,
      DIRECTION_LEFT: bt,
      DIRECTION_RIGHT: St,
      DIRECTION_UP: Ct,
      DIRECTION_DOWN: $t,
      DIRECTION_HORIZONTAL: Me,
      DIRECTION_VERTICAL: tt,
      DIRECTION_ALL: Si,
      Manager: Or,
      Input: de,
      TouchAction: Pr,
      TouchInput: Jt,
      MouseInput: Qt,
      PointerEventInput: Cr,
      TouchMouseInput: $r,
      SingleTouchInput: Ri,
      Recognizer: Re,
      AttrRecognizer: ye,
      Tap: ir,
      Pan: rr,
      Swipe: Ir,
      Pinch: zr,
      Rotate: Rr,
      Press: Ar,
      on: C,
      off: $,
      each: p,
      merge: w,
      extend: _,
      inherit: m,
      bindFn: M,
      prefixed: V,
    }),
      typeof n == o && n.amd
        ? n(function () {
            return We;
          })
        : e.exports
        ? (e.exports = We)
        : (t[i] = We);
  })(window, document, "Hammer");
})(bi);
var mt = bi.exports,
  R1 = 1,
  Xr = "MarzipanoHammerElementId";
function fa(e, t) {
  return e[Xr] || (e[Xr] = R1++), t + e[Xr];
}
function xr() {
  (this._managers = {}), (this._refCount = {});
}
xr.prototype.get = function (e, t) {
  var r = fa(e, t);
  return (
    this._managers[r] ||
      ((this._managers[r] = this._createManager(e, t)),
      (this._refCount[r] = 0)),
    this._refCount[r]++,
    new Mr(this, this._managers[r], e, t)
  );
};
xr.prototype._createManager = function (e, t) {
  var r = new mt.Manager(e);
  return (
    t === "mouse"
      ? r.add(new mt.Pan({ direction: mt.DIRECTION_ALL, threshold: 0 }))
      : (t === "touch" || t === "pen" || t === "kinect") &&
        (r.add(
          new mt.Pan({
            direction: mt.DIRECTION_ALL,
            threshold: 20,
            pointers: 1,
          })
        ),
        r.add(new mt.Pinch())),
    r
  );
};
xr.prototype._releaseHandle = function (e, t) {
  var r = fa(e, t);
  this._refCount[r] &&
    (this._refCount[r]--,
    this._refCount[r] ||
      (this._managers[r].destroy(),
      delete this._managers[r],
      delete this._refCount[r]));
};
function Mr(e, t, r, i) {
  (this._manager = t),
    (this._element = r),
    (this._type = i),
    (this._hammerGestures = e),
    (this._eventHandlers = []);
}
Mr.prototype.on = function (e, t) {
  var r = this._type,
    i = function (n) {
      r === n.pointerType && t(n);
    };
  this._eventHandlers.push({ events: e, handler: i }), this._manager.on(e, i);
};
Mr.prototype.release = function () {
  for (var e = 0; e < this._eventHandlers.length; e++) {
    var t = this._eventHandlers[e];
    this._manager.off(t.events, t.handler);
  }
  this._hammerGestures._releaseHandle(this._element, this._type),
    (this._manager = null),
    (this._element = null),
    (this._type = null),
    (this._hammerGestures = null);
};
Mr.prototype.manager = function () {
  return this._manager;
};
var Tr = new xr();
function I1(e, t, r, i, n) {
  var s = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2));
  (e = Math.max(e, s / i)),
    ua(t, r, e, n),
    (n[0] = Math.abs(n[0])),
    (n[1] = Math.abs(n[1]));
}
function ua(e, t, r, i) {
  var n = Math.atan(t / e);
  (i[0] = r * Math.cos(n)), (i[1] = r * Math.sin(n));
}
var da = { maxFriction: I1, changeVectorNorm: ua },
  O1 = G,
  sn = Ve,
  D1 = Tr,
  H1 = Le,
  N1 = da.maxFriction,
  F1 = U,
  V1 = { friction: 6, maxFrictionTime: 0.3, hammerEvent: "pan" },
  an = typeof MARZIPANODEBUG != "undefined" && MARZIPANODEBUG.controls;
function qe(e, t, r) {
  if (
    ((this._element = e),
    (this._opts = H1(r || {}, V1)),
    (this._startEvent = null),
    (this._lastEvent = null),
    (this._active = !1),
    (this._dynamics = { x: new sn(), y: new sn() }),
    (this._hammer = D1.get(e, t)),
    this._hammer.on("hammer.input", this._handleHammerEvent.bind(this)),
    this._opts.hammerEvent != "pan" && this._opts.hammerEvent != "pinch")
  )
    throw new Error(
      this._opts.hammerEvent +
        " is not a hammerEvent managed in DragControlMethod"
    );
  this._hammer.on(
    this._opts.hammerEvent + "start",
    this._handleStart.bind(this)
  ),
    this._hammer.on(
      this._opts.hammerEvent + "move",
      this._handleMove.bind(this)
    ),
    this._hammer.on(this._opts.hammerEvent + "end", this._handleEnd.bind(this)),
    this._hammer.on(
      this._opts.hammerEvent + "cancel",
      this._handleEnd.bind(this)
    );
}
O1(qe);
qe.prototype.destroy = function () {
  this._hammer.release(), F1(this);
};
qe.prototype._handleHammerEvent = function (e) {
  if (e.isFirst) {
    if (an && this._active)
      throw new Error("DragControlMethod active detected when already active");
    (this._active = !0), this.emit("active");
  }
  if (e.isFinal) {
    if (an && !this._active)
      throw new Error(
        "DragControlMethod inactive detected when already inactive"
      );
    (this._active = !1), this.emit("inactive");
  }
};
qe.prototype._handleStart = function (e) {
  e.preventDefault(), (this._startEvent = e);
};
qe.prototype._handleMove = function (e) {
  e.preventDefault(),
    this._startEvent &&
      (this._updateDynamicsMove(e),
      this.emit("parameterDynamics", "axisScaledX", this._dynamics.x),
      this.emit("parameterDynamics", "axisScaledY", this._dynamics.y));
};
qe.prototype._handleEnd = function (e) {
  e.preventDefault(),
    this._startEvent &&
      (this._updateDynamicsRelease(e),
      this.emit("parameterDynamics", "axisScaledX", this._dynamics.x),
      this.emit("parameterDynamics", "axisScaledY", this._dynamics.y)),
    (this._startEvent = !1),
    (this._lastEvent = !1);
};
qe.prototype._updateDynamicsMove = function (e) {
  var t = e.deltaX,
    r = e.deltaY,
    i = this._lastEvent || this._startEvent;
  i && ((t -= i.deltaX), (r -= i.deltaY));
  var n = this._element.getBoundingClientRect(),
    s = n.right - n.left,
    a = n.bottom - n.top;
  (t /= s),
    (r /= a),
    this._dynamics.x.reset(),
    this._dynamics.y.reset(),
    (this._dynamics.x.offset = -t),
    (this._dynamics.y.offset = -r),
    (this._lastEvent = e);
};
var Br = [null, null];
qe.prototype._updateDynamicsRelease = function (e) {
  var t = this._element.getBoundingClientRect(),
    r = t.right - t.left,
    i = t.bottom - t.top,
    n = (1e3 * e.velocityX) / r,
    s = (1e3 * e.velocityY) / i;
  this._dynamics.x.reset(),
    this._dynamics.y.reset(),
    (this._dynamics.x.velocity = n),
    (this._dynamics.y.velocity = s),
    N1(
      this._opts.friction,
      this._dynamics.x.velocity,
      this._dynamics.y.velocity,
      this._opts.maxFrictionTime,
      Br
    ),
    (this._dynamics.x.friction = Br[0]),
    (this._dynamics.y.friction = Br[1]);
};
var pa = qe,
  q1 = G,
  on = Ve,
  k1 = Tr,
  W1 = Le,
  Y1 = da.maxFriction,
  X1 = U,
  B1 = { speed: 8, friction: 6, maxFrictionTime: 0.3 };
function ut(e, t, r) {
  (this._element = e),
    (this._opts = W1(r || {}, B1)),
    (this._active = !1),
    (this._hammer = k1.get(e, t)),
    (this._dynamics = { x: new on(), y: new on() }),
    this._hammer.on("panstart", this._handleStart.bind(this)),
    this._hammer.on("panmove", this._handleMove.bind(this)),
    this._hammer.on("panend", this._handleRelease.bind(this)),
    this._hammer.on("pancancel", this._handleRelease.bind(this));
}
q1(ut);
ut.prototype.destroy = function () {
  this._hammer.release(), X1(this);
};
ut.prototype._handleStart = function (e) {
  e.preventDefault(),
    this._active || ((this._active = !0), this.emit("active"));
};
ut.prototype._handleMove = function (e) {
  e.preventDefault(), this._updateDynamics(e, !1);
};
ut.prototype._handleRelease = function (e) {
  e.preventDefault(),
    this._updateDynamics(e, !0),
    this._active && ((this._active = !1), this.emit("inactive"));
};
var Ur = [null, null];
ut.prototype._updateDynamics = function (e, t) {
  var r = this._element.getBoundingClientRect(),
    i = r.right - r.left,
    n = r.bottom - r.top,
    s = Math.max(i, n),
    a = (e.deltaX / s) * this._opts.speed,
    o = (e.deltaY / s) * this._opts.speed;
  this._dynamics.x.reset(),
    this._dynamics.y.reset(),
    (this._dynamics.x.velocity = a),
    (this._dynamics.y.velocity = o),
    t &&
      (Y1(
        this._opts.friction,
        this._dynamics.x.velocity,
        this._dynamics.y.velocity,
        this._opts.maxFrictionTime,
        Ur
      ),
      (this._dynamics.x.friction = Ur[0]),
      (this._dynamics.y.friction = Ur[1])),
    this.emit("parameterDynamics", "x", this._dynamics.x),
    this.emit("parameterDynamics", "y", this._dynamics.y);
};
var _a = ut,
  U1 = G,
  j1 = Ve,
  G1 = Le,
  Z1 = U,
  K1 = { frictionTime: 0.2, zoomDelta: 0.001 };
function Bt(e, t) {
  (this._element = e),
    (this._opts = G1(t || {}, K1)),
    (this._dynamics = new j1()),
    (this._eventList = []);
  var r = this._opts.frictionTime ? this.withSmoothing : this.withoutSmoothing;
  (this._wheelListener = r.bind(this)),
    e.addEventListener("wheel", this._wheelListener);
}
U1(Bt);
Bt.prototype.destroy = function () {
  this._element.removeEventListener("wheel", this._wheelListener), Z1(this);
};
Bt.prototype.withoutSmoothing = function (e) {
  (this._dynamics.offset = ma(e) * this._opts.zoomDelta),
    this.emit("parameterDynamics", "zoom", this._dynamics),
    e.preventDefault(),
    this.emit("active"),
    this.emit("inactive");
};
Bt.prototype.withSmoothing = function (e) {
  var t = e.timeStamp;
  for (
    this._eventList.push(e);
    this._eventList[0].timeStamp < t - this._opts.frictionTime * 1e3;

  )
    this._eventList.shift(0);
  for (var r = 0, i = 0; i < this._eventList.length; i++) {
    var n = ma(this._eventList[i]) * this._opts.zoomDelta;
    r += n / this._opts.frictionTime;
  }
  (this._dynamics.velocity = r),
    (this._dynamics.friction = Math.abs(r) / this._opts.frictionTime),
    this.emit("parameterDynamics", "zoom", this._dynamics),
    e.preventDefault(),
    this.emit("active"),
    this.emit("inactive");
};
function ma(e) {
  var t = e.deltaMode == 1 ? 20 : 1;
  return e.deltaY * t;
}
var ya = Bt,
  Q1 = G,
  J1 = Ve,
  e0 = Tr,
  t0 = U;
function Tt(e, t, r) {
  (this._hammer = e0.get(e, t)),
    (this._lastEvent = null),
    (this._active = !1),
    (this._dynamics = new J1()),
    this._hammer.on("pinchstart", this._handleStart.bind(this)),
    this._hammer.on("pinch", this._handleEvent.bind(this)),
    this._hammer.on("pinchend", this._handleEnd.bind(this)),
    this._hammer.on("pinchcancel", this._handleEnd.bind(this));
}
Q1(Tt);
Tt.prototype.destroy = function () {
  this._hammer.release(), t0(this);
};
Tt.prototype._handleStart = function () {
  this._active || ((this._active = !0), this.emit("active"));
};
Tt.prototype._handleEnd = function () {
  (this._lastEvent = null),
    this._active && ((this._active = !1), this.emit("inactive"));
};
Tt.prototype._handleEvent = function (e) {
  var t = e.scale;
  this._lastEvent && (t /= this._lastEvent.scale),
    (this._dynamics.offset = (t - 1) * -1),
    this.emit("parameterDynamics", "zoom", this._dynamics),
    (this._lastEvent = e);
};
var ga = Tt,
  r0 = G,
  i0 = Ve,
  n0 = U;
function Ut(e) {
  if (!e) throw new Error("VelocityControlMethod: parameter must be defined");
  (this._parameter = e), (this._dynamics = new i0());
}
r0(Ut);
Ut.prototype.destroy = function () {
  n0(this);
};
Ut.prototype.setVelocity = function (e) {
  (this._dynamics.velocity = e),
    this.emit("parameterDynamics", this._parameter, this._dynamics);
};
Ut.prototype.setFriction = function (e) {
  (this._dynamics.friction = e),
    this.emit("parameterDynamics", this._parameter, this._dynamics);
};
var s0 = Ut,
  a0 = G,
  o0 = Ve,
  h0 = U;
function jt(e, t, r, i) {
  if (!e) throw new Error("ElementPressControlMethod: element must be defined");
  if (!t)
    throw new Error("ElementPressControlMethod: parameter must be defined");
  if (!r)
    throw new Error("ElementPressControlMethod: velocity must be defined");
  if (!i)
    throw new Error("ElementPressControlMethod: friction must be defined");
  (this._element = e),
    (this._pressHandler = this._handlePress.bind(this)),
    (this._releaseHandler = this._handleRelease.bind(this)),
    e.addEventListener("mousedown", this._pressHandler),
    e.addEventListener("mouseup", this._releaseHandler),
    e.addEventListener("mouseleave", this._releaseHandler),
    e.addEventListener("touchstart", this._pressHandler),
    e.addEventListener("touchmove", this._releaseHandler),
    e.addEventListener("touchend", this._releaseHandler),
    (this._parameter = t),
    (this._velocity = r),
    (this._friction = i),
    (this._dynamics = new o0()),
    (this._pressing = !1);
}
a0(jt);
jt.prototype.destroy = function () {
  this._element.removeEventListener("mousedown", this._pressHandler),
    this._element.removeEventListener("mouseup", this._releaseHandler),
    this._element.removeEventListener("mouseleave", this._releaseHandler),
    this._element.removeEventListener("touchstart", this._pressHandler),
    this._element.removeEventListener("touchmove", this._releaseHandler),
    this._element.removeEventListener("touchend", this._releaseHandler),
    h0(this);
};
jt.prototype._handlePress = function () {
  (this._pressing = !0),
    (this._dynamics.velocity = this._velocity),
    (this._dynamics.friction = 0),
    this.emit("parameterDynamics", this._parameter, this._dynamics),
    this.emit("active");
};
jt.prototype._handleRelease = function () {
  this._pressing &&
    ((this._dynamics.friction = this._friction),
    this.emit("parameterDynamics", this._parameter, this._dynamics),
    this.emit("inactive")),
    (this._pressing = !1);
};
var l0 = jt,
  c0 = G,
  v0 = Ve,
  f0 = ot,
  u0 = U;
function we(e) {
  (e = e || {}),
    (this._methods = []),
    (this._parameters = [
      "x",
      "y",
      "axisScaledX",
      "axisScaledY",
      "zoom",
      "yaw",
      "pitch",
      "roll",
    ]),
    (this._now = e.nowForTesting || f0),
    (this._composedOffsets = {}),
    (this._composeReturn = { offsets: this._composedOffsets, changing: null });
}
c0(we);
we.prototype.add = function (e) {
  if (!this.has(e)) {
    var t = {};
    this._parameters.forEach(function (n) {
      t[n] = { dynamics: new v0(), time: null };
    });
    var r = this._updateDynamics.bind(this, t),
      i = { instance: e, dynamics: t, parameterDynamicsHandler: r };
    e.addEventListener("parameterDynamics", r), this._methods.push(i);
  }
};
we.prototype.remove = function (e) {
  var t = this._indexOfInstance(e);
  if (t >= 0) {
    var r = this._methods.splice(t, 1)[0];
    r.instance.removeEventListener(
      "parameterDynamics",
      r.parameterDynamicsHandler
    );
  }
};
we.prototype.has = function (e) {
  return this._indexOfInstance(e) >= 0;
};
we.prototype._indexOfInstance = function (e) {
  for (var t = 0; t < this._methods.length; t++)
    if (this._methods[t].instance === e) return t;
  return -1;
};
we.prototype.list = function () {
  for (var e = [], t = 0; t < this._methods.length; t++)
    e.push(this._methods[t].instance);
  return e;
};
we.prototype._updateDynamics = function (e, t, r) {
  var i = e[t];
  if (!i) throw new Error("Unknown control parameter " + t);
  var n = this._now();
  i.dynamics.update(r, (n - i.time) / 1e3), (i.time = n), this.emit("change");
};
we.prototype._resetComposedOffsets = function () {
  for (var e = 0; e < this._parameters.length; e++)
    this._composedOffsets[this._parameters[e]] = 0;
};
we.prototype.offsets = function () {
  var e,
    t = !1,
    r = this._now();
  this._resetComposedOffsets();
  for (var i = 0; i < this._methods.length; i++)
    for (
      var n = this._methods[i].dynamics, s = 0;
      s < this._parameters.length;
      s++
    ) {
      e = this._parameters[s];
      var a = n[e],
        o = a.dynamics;
      o.offset != null &&
        ((this._composedOffsets[e] += o.offset), (o.offset = null));
      var h = (r - a.time) / 1e3,
        l = o.offsetFromVelocity(h);
      l && (this._composedOffsets[e] += l);
      var c = o.velocityAfter(h);
      (o.velocity = c), c && (t = !0), (a.time = r);
    }
  return (this._composeReturn.changing = t), this._composeReturn;
};
we.prototype.destroy = function () {
  for (var e = this.list(), t = 0; t < e.length; t++) this.remove(e[t]);
  u0(this);
};
var d0 = we,
  p0 = G,
  _0 = d0,
  m0 = U,
  wa = typeof MARZIPANODEBUG != "undefined" && MARZIPANODEBUG.controls;
function X(e) {
  (e = e || {}),
    (this._methods = {}),
    (this._methodGroups = {}),
    (this._composer = new _0()),
    (this._enabled = e && e.enabled ? !!e.enabled : !0),
    (this._activeCount = 0),
    (this.updatedViews_ = []),
    (this._attachedRenderLoop = null);
}
p0(X);
X.prototype.destroy = function () {
  this.detach(), this._composer.destroy(), m0(this);
};
X.prototype.methods = function () {
  var e = {};
  for (var t in this._methods) e[t] = this._methods[t];
  return e;
};
X.prototype.method = function (e) {
  return this._methods[e];
};
X.prototype.registerMethod = function (e, t, r) {
  if (this._methods[e])
    throw new Error("Control method already registered with id " + e);
  (this._methods[e] = {
    instance: t,
    enabled: !1,
    active: !1,
    activeHandler: this._handleActive.bind(this, e),
    inactiveHandler: this._handleInactive.bind(this, e),
  }),
    r && this.enableMethod(e, t);
};
X.prototype.unregisterMethod = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("No control method registered with id " + e);
  t.enabled && this.disableMethod(e), delete this._methods[e];
};
X.prototype.enableMethod = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("No control method registered with id " + e);
  t.enabled ||
    ((t.enabled = !0),
    t.active && this._incrementActiveCount(),
    this._listen(e),
    this._updateComposer(),
    this.emit("methodEnabled", e));
};
X.prototype.disableMethod = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("No control method registered with id " + e);
  !t.enabled ||
    ((t.enabled = !1),
    t.active && this._decrementActiveCount(),
    this._unlisten(e),
    this._updateComposer(),
    this.emit("methodDisabled", e));
};
X.prototype.addMethodGroup = function (e, t) {
  this._methodGroups[e] = t;
};
X.prototype.removeMethodGroup = function (e) {
  delete this._methodGroups[e];
};
X.prototype.methodGroups = function () {
  var e = {};
  for (var t in this._methodGroups) e[t] = this._methodGroups[t];
  return e;
};
X.prototype.enableMethodGroup = function (e) {
  var t = this;
  t._methodGroups[e].forEach(function (r) {
    t.enableMethod(r);
  });
};
X.prototype.disableMethodGroup = function (e) {
  var t = this;
  t._methodGroups[e].forEach(function (r) {
    t.disableMethod(r);
  });
};
X.prototype.enabled = function () {
  return this._enabled;
};
X.prototype.enable = function () {
  this._enabled ||
    ((this._enabled = !0),
    this._activeCount > 0 && this.emit("active"),
    this.emit("enabled"),
    this._updateComposer());
};
X.prototype.disable = function () {
  !this._enabled ||
    ((this._enabled = !1),
    this._activeCount > 0 && this.emit("inactive"),
    this.emit("disabled"),
    this._updateComposer());
};
X.prototype.attach = function (e) {
  this._attachedRenderLoop && this.detach(),
    (this._attachedRenderLoop = e),
    (this._beforeRenderHandler = this._updateViewsWithControls.bind(this)),
    (this._changeHandler = e.renderOnNextFrame.bind(e)),
    this._attachedRenderLoop.addEventListener(
      "beforeRender",
      this._beforeRenderHandler
    ),
    this._composer.addEventListener("change", this._changeHandler);
};
X.prototype.detach = function () {
  !this._attachedRenderLoop ||
    (this._attachedRenderLoop.removeEventListener(
      "beforeRender",
      this._beforeRenderHandler
    ),
    this._composer.removeEventListener("change", this._changeHandler),
    (this._beforeRenderHandler = null),
    (this._changeHandler = null),
    (this._attachedRenderLoop = null));
};
X.prototype.attached = function () {
  return this._attachedRenderLoop != null;
};
X.prototype._listen = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  t.instance.addEventListener("active", t.activeHandler),
    t.instance.addEventListener("inactive", t.inactiveHandler);
};
X.prototype._unlisten = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  t.instance.removeEventListener("active", t.activeHandler),
    t.instance.removeEventListener("inactive", t.inactiveHandler);
};
X.prototype._handleActive = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active || ((t.active = !0), this._incrementActiveCount());
};
X.prototype._handleInactive = function (e) {
  var t = this._methods[e];
  if (!t) throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active && ((t.active = !1), this._decrementActiveCount());
};
X.prototype._incrementActiveCount = function () {
  this._activeCount++,
    wa && this._checkActiveCount(),
    this._enabled && this._activeCount === 1 && this.emit("active");
};
X.prototype._decrementActiveCount = function () {
  this._activeCount--,
    wa && this._checkActiveCount(),
    this._enabled && this._activeCount === 0 && this.emit("inactive");
};
X.prototype._checkActiveCount = function () {
  var e = 0;
  for (var t in this._methods) {
    var r = this._methods[t];
    r.enabled && r.active && e++;
  }
  if (e != this._activeCount) throw new Error("Bad control state");
};
X.prototype._updateComposer = function () {
  var e = this._composer;
  for (var t in this._methods) {
    var r = this._methods[t],
      i = this._enabled && r.enabled;
    i && !e.has(r.instance) && e.add(r.instance),
      !i && e.has(r.instance) && e.remove(r.instance);
  }
};
X.prototype._updateViewsWithControls = function () {
  var e = this._composer.offsets();
  e.changing && this._attachedRenderLoop.renderOnNextFrame(),
    (this.updatedViews_.length = 0);
  for (
    var t = this._attachedRenderLoop.stage().listLayers(), r = 0;
    r < t.length;
    r++
  ) {
    var i = t[r].view();
    this.updatedViews_.indexOf(i) < 0 &&
      (t[r].view().updateWithControlParameters(e.offsets),
      this.updatedViews_.push(i));
  }
};
var xa = X,
  y0 = ce.setTransform,
  hn = xi;
function g0(e, t, r, i) {
  i = i || "";
  var n =
    "translateX(" +
    hn(t) +
    "px) translateY(" +
    hn(r) +
    "px) translateZ(0) " +
    i;
  y0(e, n);
}
var Ma = g0,
  w0 = G,
  x0 = Ma,
  M0 = ce.setTransform,
  T0 = U;
function fe(e, t, r, i, n) {
  (n = n || {}),
    (n.perspective = n.perspective || {}),
    (n.perspective.extraTransforms =
      n.perspective.extraTransforms != null
        ? n.perspective.extraTransforms
        : ""),
    (this._domElement = e),
    (this._parentDomElement = t),
    (this._view = r),
    (this._coords = {}),
    (this._perspective = {}),
    this.setPosition(i),
    this._parentDomElement.appendChild(this._domElement),
    this.setPerspective(n.perspective),
    (this._visible = !0),
    (this._position = { x: 0, y: 0 });
}
w0(fe);
fe.prototype.destroy = function () {
  this._parentDomElement.removeChild(this._domElement), T0(this);
};
fe.prototype.domElement = function () {
  return this._domElement;
};
fe.prototype.position = function () {
  return this._coords;
};
fe.prototype.setPosition = function (e) {
  for (var t in e) this._coords[t] = e[t];
  this._update();
};
fe.prototype.perspective = function () {
  return this._perspective;
};
fe.prototype.setPerspective = function (e) {
  for (var t in e) this._perspective[t] = e[t];
  this._update();
};
fe.prototype.show = function () {
  this._visible || ((this._visible = !0), this._update());
};
fe.prototype.hide = function () {
  this._visible && ((this._visible = !1), this._update());
};
fe.prototype._update = function () {
  var e = this._domElement,
    t = this._coords,
    r = this._position,
    i,
    n,
    s = !1;
  if (this._visible) {
    var a = this._view;
    this._perspective.radius
      ? ((s = !0), this._setEmbeddedPosition(a, t))
      : (a.coordinatesToScreen(t, r),
        (i = r.x),
        (n = r.y),
        i != null && n != null && ((s = !0), this._setPosition(i, n)));
  }
  s
    ? ((e.style.display = "block"), (e.style.position = "absolute"))
    : ((e.style.display = "none"), (e.style.position = ""));
};
fe.prototype._setEmbeddedPosition = function (e, t) {
  var r = e.coordinatesToPerspectiveTransform(
    t,
    this._perspective.radius,
    this._perspective.extraTransforms
  );
  M0(this._domElement, r);
};
fe.prototype._setPosition = function (e, t) {
  x0(this._domElement, e, t, this._perspective.extraTransforms);
};
var Ta = fe,
  E0 = G,
  b0 = Ta,
  S0 = yn,
  ln = Ma,
  cn = ce.setAbsolute,
  C0 = ce.setOverflowHidden,
  $0 = ce.setOverflowVisible,
  L0 = ce.setNullSize,
  P0 = ce.setPixelSize,
  vn = ce.setWithVendorPrefix("pointer-events"),
  z0 = U;
function ue(e, t, r, i, n) {
  (n = n || {}),
    (this._parentDomElement = e),
    (this._stage = t),
    (this._view = r),
    (this._renderLoop = i),
    (this._hotspots = []),
    (this._visible = !0),
    (this._rect = n.rect),
    (this._visibilityOrRectChanged = !0),
    (this._stageWidth = null),
    (this._stageHeight = null),
    (this._tmpRect = {}),
    (this._hotspotContainerWrapper = document.createElement("div")),
    cn(this._hotspotContainerWrapper),
    vn(this._hotspotContainerWrapper, "none"),
    this._parentDomElement.appendChild(this._hotspotContainerWrapper),
    (this._hotspotContainer = document.createElement("div")),
    cn(this._hotspotContainer),
    vn(this._hotspotContainer, "all"),
    this._hotspotContainerWrapper.appendChild(this._hotspotContainer),
    (this._updateHandler = this._update.bind(this)),
    this._renderLoop.addEventListener("afterRender", this._updateHandler);
}
E0(ue);
ue.prototype.destroy = function () {
  for (; this._hotspots.length; ) this.destroyHotspot(this._hotspots[0]);
  this._parentDomElement.removeChild(this._hotspotContainerWrapper),
    this._renderLoop.removeEventListener("afterRender", this._updateHandler),
    z0(this);
};
ue.prototype.domElement = function () {
  return this._hotspotContainer;
};
ue.prototype.setRect = function (e) {
  (this._rect = e), (this._visibilityOrRectChanged = !0);
};
ue.prototype.rect = function () {
  return this._rect;
};
ue.prototype.createHotspot = function (e, t, r) {
  t = t || {};
  var i = new b0(e, this._hotspotContainer, this._view, t, r);
  return this._hotspots.push(i), i._update(), this.emit("hotspotsChange"), i;
};
ue.prototype.hasHotspot = function (e) {
  return this._hotspots.indexOf(e) >= 0;
};
ue.prototype.listHotspots = function () {
  return [].concat(this._hotspots);
};
ue.prototype.destroyHotspot = function (e) {
  var t = this._hotspots.indexOf(e);
  if (t < 0) throw new Error("No such hotspot");
  this._hotspots.splice(t, 1), e.destroy(), this.emit("hotspotsChange");
};
ue.prototype.hide = function () {
  this._visible &&
    ((this._visible = !1),
    (this._visibilityOrRectChanged = !0),
    this._update());
};
ue.prototype.show = function () {
  this._visible ||
    ((this._visible = !0),
    (this._visibilityOrRectChanged = !0),
    this._update());
};
ue.prototype._update = function () {
  var e = this._hotspotContainerWrapper,
    t = this._stage.width(),
    r = this._stage.height(),
    i = this._tmpRect;
  if (
    this._visibilityOrRectChanged ||
    (this._rect && (t !== this._stageWidth || r !== this._stageHeight))
  ) {
    var n = this._visible;
    (e.style.display = n ? "block" : "none"),
      n &&
        (this._rect
          ? (S0(t, r, this._rect, i),
            ln(e, t * i.x, r * i.y),
            P0(e, t * i.width, r * i.height),
            C0(e))
          : (ln(e, 0, 0), L0(e), $0(e))),
      (this._stageWidth = t),
      (this._stageHeight = r),
      (this._visibilityOrRectChanged = !1);
  }
  for (var s = 0; s < this._hotspots.length; s++) this._hotspots[s]._update();
};
var Ea = ue,
  A0 = la,
  R0 = oa,
  I0 = Ea,
  O0 = G,
  ba = ot,
  D0 = Yt,
  H0 = kt,
  fn = Le,
  N0 = U;
function J(e, t) {
  (this._viewer = e),
    (this._view = t),
    (this._layers = []),
    (this._hotspotContainer = new I0(
      e._controlContainer,
      e.stage(),
      this._view,
      e.renderLoop()
    )),
    (this._movement = null),
    (this._movementStartTime = null),
    (this._movementStep = null),
    (this._movementParams = null),
    (this._movementCallback = null),
    (this._updateMovementHandler = this._updateMovement.bind(this)),
    (this._updateHotspotContainerHandler =
      this._updateHotspotContainer.bind(this)),
    this._viewer.addEventListener(
      "sceneChange",
      this._updateHotspotContainerHandler
    ),
    (this._viewChangeHandler = this.emit.bind(this, "viewChange")),
    this._view.addEventListener("change", this._viewChangeHandler),
    this._updateHotspotContainer();
}
O0(J);
J.prototype.destroy = function () {
  this._view.removeEventListener("change", this._viewChangeHandler),
    this._viewer.removeEventListener(
      "sceneChange",
      this._updateHotspotContainerHandler
    ),
    this._movement && this.stopMovement(),
    this._hotspotContainer.destroy(),
    this.destroyAllLayers(),
    N0(this);
};
J.prototype.hotspotContainer = function () {
  return this._hotspotContainer;
};
J.prototype.layer = function () {
  return this._layers[0];
};
J.prototype.listLayers = function () {
  return [].concat(this._layers);
};
J.prototype.view = function () {
  return this._view;
};
J.prototype.viewer = function () {
  return this._viewer;
};
J.prototype.visible = function () {
  return this._viewer.scene() === this;
};
J.prototype.createLayer = function (e) {
  e = e || {};
  var t = e.textureStoreOpts || {},
    r = e.layerOpts || {},
    i = e.source,
    n = e.geometry,
    s = this._view,
    a = this._viewer.stage(),
    o = new R0(i, a, t),
    h = new A0(i, n, s, o, r);
  return (
    this._layers.push(h),
    e.pinFirstLevel && h.pinFirstLevel(),
    this.emit("layerChange"),
    h
  );
};
J.prototype.destroyLayer = function (e) {
  var t = this._layers.indexOf(e);
  if (t < 0) throw new Error("No such layer in scene");
  this._layers.splice(t, 1),
    this.emit("layerChange"),
    e.textureStore().destroy(),
    e.destroy();
};
J.prototype.destroyAllLayers = function () {
  for (; this._layers.length > 0; ) this.destroyLayer(this._layers[0]);
};
J.prototype.switchTo = function (e, t) {
  return this._viewer.switchScene(this, e, t);
};
J.prototype.lookTo = function (e, t, r) {
  var i = this;
  if (((t = t || {}), (r = r || D0), H0(e) !== "object"))
    throw new Error("Target view parameters must be an object");
  var n = function (_) {
      return (_ *= 2) < 1 ? 0.5 * _ * _ : -0.5 * (--_ * (_ - 2) - 1);
    },
    s = t.ease != null ? t.ease : n,
    a = t.controlsInterrupt != null ? t.controlsInterrupt : !1,
    o = t.transitionDuration != null ? t.transitionDuration : 1e3,
    h = t.shortest != null ? t.shortest : !0,
    l = this._view,
    c = l.parameters(),
    f = {};
  fn(f, e), fn(f, c), h && l.normalizeToClosest && l.normalizeToClosest(f, f);
  var d = function () {
      var _ = !1;
      return function (w, m) {
        if (m >= o && _) return null;
        var M = Math.min(m / o, 1);
        for (var b in w) {
          var S = c[b],
            C = f[b];
          w[b] = S + s(M) * (C - S);
        }
        return (_ = m >= o), w;
      };
    },
    p = this._viewer.controls().enabled();
  a || this._viewer.controls().disable(),
    this.startMovement(d, function () {
      p && i._viewer.controls().enable(), r();
    });
};
J.prototype.startMovement = function (e, t) {
  var r = this._viewer.renderLoop();
  this._movement && this.stopMovement();
  var i = e();
  if (typeof i != "function") throw new Error("Bad movement");
  (this._movement = e),
    (this._movementStep = i),
    (this._movementStartTime = ba()),
    (this._movementParams = {}),
    (this._movementCallback = t),
    r.addEventListener("beforeRender", this._updateMovementHandler),
    r.renderOnNextFrame();
};
J.prototype.stopMovement = function () {
  var e = this._movementCallback,
    t = this._viewer.renderLoop();
  !this._movement ||
    ((this._movement = null),
    (this._movementStep = null),
    (this._movementStartTime = null),
    (this._movementParams = null),
    (this._movementCallback = null),
    t.removeEventListener("beforeRender", this._updateMovementHandler),
    e && e());
};
J.prototype.movement = function () {
  return this._movement;
};
J.prototype._updateMovement = function () {
  if (!this._movement) throw new Error("Should not call update");
  var e = this._viewer.renderLoop(),
    t = this._view,
    r = ba() - this._movementStartTime,
    i = this._movementStep,
    n = this._movementParams;
  (n = t.parameters(n)),
    (n = i(n, r)),
    n == null
      ? this.stopMovement()
      : (t.setParameters(n), e.renderOnNextFrame());
};
J.prototype._updateHotspotContainer = function () {
  this.visible()
    ? this._hotspotContainer.show()
    : this._hotspotContainer.hide();
};
var Sa = J,
  F0 = G,
  V0 = Le,
  Ca = ot,
  q0 = { duration: 1 / 0 };
function Pe(e) {
  (e = V0(e || {}, q0)),
    (this._duration = e.duration),
    (this._startTime = null),
    (this._handle = null),
    (this._check = this._check.bind(this));
}
F0(Pe);
Pe.prototype.start = function () {
  (this._startTime = Ca()),
    this._handle == null &&
      this._duration < 1 / 0 &&
      this._setup(this._duration);
};
Pe.prototype.started = function () {
  return this._startTime != null;
};
Pe.prototype.stop = function () {
  (this._startTime = null),
    this._handle != null && (clearTimeout(this._handle), (this._handle = null));
};
Pe.prototype._setup = function (e) {
  this._handle = setTimeout(this._check, e);
};
Pe.prototype._teardown = function () {
  clearTimeout(this._handle), (this._handle = null);
};
Pe.prototype._check = function () {
  var e = Ca(),
    t = e - this._startTime,
    r = this._duration - t;
  this._teardown(),
    r <= 0
      ? (this.emit("timeout"), (this._startTime = null))
      : r < 1 / 0 && this._setup(r);
};
Pe.prototype.duration = function () {
  return this._duration;
};
Pe.prototype.setDuration = function (e) {
  (this._duration = e), this._startTime != null && this._check();
};
var k0 = Pe,
  W0 = Le,
  Y0 = U,
  X0 = { active: "move", inactive: "default", disabled: "default" };
function Et(e, t, r, i) {
  (i = W0(i || {}, X0)),
    (this._element = r),
    (this._controls = e),
    (this._id = t),
    (this._attached = !1),
    (this._setActiveCursor = this._setCursor.bind(this, i.active)),
    (this._setInactiveCursor = this._setCursor.bind(this, i.inactive)),
    (this._setDisabledCursor = this._setCursor.bind(this, i.disabled)),
    (this._setOriginalCursor = this._setCursor.bind(
      this,
      this._element.style.cursor
    )),
    (this._updateAttachmentHandler = this._updateAttachment.bind(this)),
    e.addEventListener("methodEnabled", this._updateAttachmentHandler),
    e.addEventListener("methodDisabled", this._updateAttachmentHandler),
    e.addEventListener("enabled", this._updateAttachmentHandler),
    e.addEventListener("disabled", this._updateAttachmentHandler),
    this._updateAttachment();
}
Et.prototype.destroy = function () {
  this._detachFromControlMethod(this._controls.method(this._id)),
    this._setOriginalCursor(),
    this._controls.removeEventListener(
      "methodEnabled",
      this._updateAttachmentHandler
    ),
    this._controls.removeEventListener(
      "methodDisabled",
      this._updateAttachmentHandler
    ),
    this._controls.removeEventListener(
      "enabled",
      this._updateAttachmentHandler
    ),
    this._controls.removeEventListener(
      "disabled",
      this._updateAttachmentHandler
    ),
    Y0(this);
};
Et.prototype._updateAttachment = function () {
  var e = this._controls,
    t = this._id;
  e.enabled() && e.method(t).enabled
    ? this._attachToControlMethod(e.method(t))
    : this._detachFromControlMethod(e.method(t));
};
Et.prototype._attachToControlMethod = function (e) {
  this._attached ||
    (e.instance.addEventListener("active", this._setActiveCursor),
    e.instance.addEventListener("inactive", this._setInactiveCursor),
    e.active ? this._setActiveCursor() : this._setInactiveCursor(),
    (this._attached = !0));
};
Et.prototype._detachFromControlMethod = function (e) {
  this._attached &&
    (e.instance.removeEventListener("active", this._setActiveCursor),
    e.instance.removeEventListener("inactive", this._setInactiveCursor),
    this._setDisabledCursor(),
    (this._attached = !1));
};
Et.prototype._setCursor = function (e) {
  this._element.style.cursor = e;
};
var B0 = Et,
  U0 = Le,
  jr = pa,
  j0 = _a,
  G0 = ya,
  Z0 = ga,
  _e = va,
  K0 = { mouseViewMode: "drag", dragMode: "pan" };
function Q0(e, t, r) {
  r = U0(r || {}, K0);
  var i = {
      mouseViewDrag: new jr(t, "mouse"),
      mouseViewQtvr: new j0(t, "mouse"),
      leftArrowKey: new _e(37, "x", -0.7, 3),
      rightArrowKey: new _e(39, "x", 0.7, 3),
      upArrowKey: new _e(38, "y", -0.7, 3),
      downArrowKey: new _e(40, "y", 0.7, 3),
      plusKey: new _e(107, "zoom", -0.7, 3),
      minusKey: new _e(109, "zoom", 0.7, 3),
      wKey: new _e(87, "y", -0.7, 3),
      aKey: new _e(65, "x", -0.7, 3),
      sKey: new _e(83, "y", 0.7, 3),
      dKey: new _e(68, "x", 0.7, 3),
      qKey: new _e(81, "roll", 0.7, 3),
      eKey: new _e(69, "roll", -0.7, 3),
    },
    n = ["scrollZoom", "touchView", "pinch"];
  r.scrollZoom !== !1 && (i.scrollZoom = new G0(t));
  var s = {
    arrowKeys: ["leftArrowKey", "rightArrowKey", "upArrowKey", "downArrowKey"],
    plusMinusKeys: ["plusKey", "minusKey"],
    wasdKeys: ["wKey", "aKey", "sKey", "dKey"],
    qeKeys: ["qKey", "eKey"],
  };
  switch (r.dragMode) {
    case "pinch":
      i.pinch = new jr(t, "touch", { hammerEvent: "pinch" });
      break;
    case "pan":
      (i.touchView = new jr(t, "touch")), (i.pinch = new Z0(t, "touch"));
      break;
    default:
      throw new Error("Unknown drag mode: " + r.dragMode);
  }
  switch (r.mouseViewMode) {
    case "drag":
      n.push("mouseViewDrag");
      break;
    case "qtvr":
      n.push("mouseViewQtvr");
      break;
    default:
      throw new Error("Unknown mouse view mode: " + r.mouseViewMode);
  }
  for (var a in i) {
    var o = i[a];
    e.registerMethod(a, o), n.indexOf(a) >= 0 && e.enableMethod(a);
  }
  for (var h in s) {
    var l = s[h];
    e.addMethodGroup(h, l);
  }
  return i;
}
var $a = Q0,
  un = ot;
function J0(e, t, r) {
  var i = !1,
    n = un();
  function s() {
    if (!i) {
      var a = (un() - n) / e;
      a < 1 ? (t(a), requestAnimationFrame(s)) : (t(1), r());
    }
  }
  return (
    t(0),
    requestAnimationFrame(s),
    function () {
      (i = !0), r.apply(null, arguments);
    }
  );
}
var La = J0,
  e_ = G,
  t_ = ca,
  r_ = xa,
  i_ = Sa,
  n_ = k0,
  s_ = Cn,
  a_ = B0,
  dn = Tr,
  o_ = $a,
  h_ = Bs,
  l_ = ce.setOverflowHidden,
  c_ = ce.setAbsolute,
  v_ = ce.setFullSize,
  f_ = La,
  u_ = Yt,
  d_ = U;
function k(e, t) {
  (t = t || {}),
    (this._domElement = e),
    l_(e),
    (this._stage = new s_(t.stage)),
    h_(this._stage),
    this._domElement.appendChild(this._stage.domElement()),
    (this._controlContainer = document.createElement("div")),
    c_(this._controlContainer),
    v_(this._controlContainer),
    e.appendChild(this._controlContainer),
    (this._size = {}),
    this.updateSize(),
    (this._updateSizeListener = this.updateSize.bind(this)),
    window.addEventListener("resize", this._updateSizeListener),
    (this._renderLoop = new t_(this._stage)),
    (this._controls = new r_()),
    (this._controlMethods = o_(
      this._controls,
      this._controlContainer,
      t.controls
    )),
    this._controls.attach(this._renderLoop),
    (this._hammerManagerTouch = dn.get(this._controlContainer, "touch")),
    (this._hammerManagerMouse = dn.get(this._controlContainer, "mouse")),
    (this._dragCursor = new a_(
      this._controls,
      "mouseViewDrag",
      e,
      (t.cursors && t.cursors.drag) || {}
    )),
    this._renderLoop.start(),
    (this._scenes = []),
    (this._currentScene = null),
    (this._replacedScene = null),
    (this._cancelCurrentTween = null),
    (this._layerChangeHandler = this._updateSceneLayers.bind(this)),
    (this._viewChangeHandler = this.emit.bind(this, "viewChange")),
    (this._idleTimer = new n_()),
    this._idleTimer.start(),
    (this._resetIdleTimerHandler = this._resetIdleTimer.bind(this)),
    this.addEventListener("viewChange", this._resetIdleTimerHandler),
    (this._triggerIdleTimerHandler = this._triggerIdleTimer.bind(this)),
    this._idleTimer.addEventListener("timeout", this._triggerIdleTimerHandler),
    (this._stopMovementHandler = this.stopMovement.bind(this)),
    this._controls.addEventListener("active", this._stopMovementHandler),
    this.addEventListener("sceneChange", this._stopMovementHandler),
    (this._idleMovement = null);
}
e_(k);
k.prototype.destroy = function () {
  window.removeEventListener("resize", this._updateSizeListener),
    this._currentScene && this._removeSceneEventListeners(this._currentScene),
    this._replacedScene && this._removeSceneEventListeners(this._replacedScene),
    this._dragCursor.destroy();
  for (var e in this._controlMethods) this._controlMethods[e].destroy();
  for (; this._scenes.length; ) this.destroyScene(this._scenes[0]);
  this._domElement.removeChild(this._stage.domElement()),
    this._stage.destroy(),
    this._renderLoop.destroy(),
    this._controls.destroy(),
    (this._controls = null),
    this._cancelCurrentTween && this._cancelCurrentTween(),
    d_(this);
};
k.prototype.updateSize = function () {
  var e = this._size;
  (e.width = this._domElement.clientWidth),
    (e.height = this._domElement.clientHeight),
    this._stage.setSize(e);
};
k.prototype.stage = function () {
  return this._stage;
};
k.prototype.renderLoop = function () {
  return this._renderLoop;
};
k.prototype.controls = function () {
  return this._controls;
};
k.prototype.domElement = function () {
  return this._domElement;
};
k.prototype.createScene = function (e) {
  e = e || {};
  var t = this.createEmptyScene({ view: e.view });
  return (
    t.createLayer({
      source: e.source,
      geometry: e.geometry,
      pinFirstLevel: e.pinFirstLevel,
      textureStoreOpts: e.textureStoreOpts,
      layerOpts: e.layerOpts,
    }),
    t
  );
};
k.prototype.createEmptyScene = function (e) {
  e = e || {};
  var t = new i_(this, e.view);
  return this._scenes.push(t), t;
};
k.prototype._updateSceneLayers = function () {
  var e,
    t,
    r = this._stage,
    i = this._currentScene,
    n = this._replacedScene,
    s = r.listLayers(),
    a = [];
  if (
    (n && (a = a.concat(n.listLayers())),
    i && (a = a.concat(i.listLayers())),
    Math.abs(s.length - a.length) !== 1)
  )
    throw new Error("Stage and scene out of sync");
  if (a.length < s.length) {
    for (e = 0; e < s.length; e++)
      if (((t = s[e]), a.indexOf(t) < 0)) {
        this._removeLayerFromStage(t);
        break;
      }
  }
  if (a.length > s.length)
    for (e = 0; e < a.length; e++)
      (t = a[e]), s.indexOf(t) < 0 && this._addLayerToStage(t, e);
};
k.prototype._addLayerToStage = function (e, t) {
  e.pinFirstLevel(), this._stage.addLayer(e, t);
};
k.prototype._removeLayerFromStage = function (e) {
  this._stage.removeLayer(e),
    e.unpinFirstLevel(),
    e.textureStore().clearNotPinned();
};
k.prototype._addSceneEventListeners = function (e) {
  e.addEventListener("layerChange", this._layerChangeHandler),
    e.addEventListener("viewChange", this._viewChangeHandler);
};
k.prototype._removeSceneEventListeners = function (e) {
  e.removeEventListener("layerChange", this._layerChangeHandler),
    e.removeEventListener("viewChange", this._viewChangeHandler);
};
k.prototype.destroyScene = function (e) {
  var t = this._scenes.indexOf(e);
  if (t < 0) throw new Error("No such scene in viewer");
  var r, i;
  if (this._currentScene === e) {
    for (
      this._removeSceneEventListeners(e), i = e.listLayers(), r = 0;
      r < i.length;
      r++
    )
      this._removeLayerFromStage(i[r]);
    this._cancelCurrentTween &&
      (this._cancelCurrentTween(), (this._cancelCurrentTween = null)),
      (this._currentScene = null),
      this.emit("sceneChange");
  }
  if (this._replacedScene === e) {
    for (
      this._removeSceneEventListeners(e), i = e.listLayers(), r = 0;
      r < i.length;
      r++
    )
      this._removeLayerFromStage(i[r]);
    this._replacedScene = null;
  }
  this._scenes.splice(t, 1), e.destroy();
};
k.prototype.destroyAllScenes = function () {
  for (; this._scenes.length > 0; ) this.destroyScene(this._scenes[0]);
};
k.prototype.hasScene = function (e) {
  return this._scenes.indexOf(e) >= 0;
};
k.prototype.listScenes = function () {
  return [].concat(this._scenes);
};
k.prototype.scene = function () {
  return this._currentScene;
};
k.prototype.view = function () {
  var e = this._currentScene;
  return e ? e.view() : null;
};
k.prototype.lookTo = function (e, t, r) {
  var i = this._currentScene;
  i && i.lookTo(e, t, r);
};
k.prototype.startMovement = function (e, t) {
  var r = this._currentScene;
  !r || r.startMovement(e, t);
};
k.prototype.stopMovement = function () {
  var e = this._currentScene;
  !e || e.stopMovement();
};
k.prototype.movement = function () {
  var e = this._currentScene;
  if (!!e) return e.movement();
};
k.prototype.setIdleMovement = function (e, t) {
  this._idleTimer.setDuration(e), (this._idleMovement = t);
};
k.prototype.breakIdleMovement = function () {
  this.stopMovement(), this._resetIdleTimer();
};
k.prototype._resetIdleTimer = function () {
  this._idleTimer.start();
};
k.prototype._triggerIdleTimer = function () {
  var e = this._idleMovement;
  !e || this.startMovement(e);
};
var p_ = 1e3;
function __(e, t, r) {
  var i = t.listLayers();
  i.forEach(function (n) {
    n.mergeEffects({ opacity: e });
  }),
    (t._hotspotContainer.domElement().style.opacity = e);
}
k.prototype.switchScene = function (e, t, r) {
  var i = this;
  (t = t || {}), (r = r || u_);
  var n = this._stage,
    s = this._currentScene;
  if (s === e) {
    r();
    return;
  }
  if (this._scenes.indexOf(e) < 0) throw new Error("No such scene in viewer");
  this._cancelCurrentTween &&
    (this._cancelCurrentTween(), (this._cancelCurrentTween = null));
  var a = s ? s.listLayers() : [],
    o = e.listLayers(),
    h = n.listLayers();
  if (s && (h.length !== a.length || (h.length > 1 && h[0] != a[0])))
    throw new Error("Stage not in sync with viewer");
  for (
    var l = t.transitionDuration != null ? t.transitionDuration : p_,
      c = t.transitionUpdate != null ? t.transitionUpdate : __,
      f = 0;
    f < o.length;
    f++
  )
    this._addLayerToStage(o[f]);
  function d(_) {
    c(_, e, s);
  }
  function p() {
    if (i._replacedScene) {
      i._removeSceneEventListeners(i._replacedScene),
        (a = i._replacedScene.listLayers());
      for (var _ = 0; _ < a.length; _++) i._removeLayerFromStage(a[_]);
      i._replacedScene = null;
    }
    (i._cancelCurrentTween = null), r();
  }
  (this._cancelCurrentTween = f_(l, d, p)),
    (this._currentScene = e),
    (this._replacedScene = s),
    this.emit("sceneChange"),
    this.emit("viewChange"),
    this._addSceneEventListeners(e);
};
var m_ = k,
  Er = ne.vec4,
  y_ = ne.mat4;
function g_(e) {
  var t = e || {};
  return (
    (t.colorOffset = t.colorOffset || Er.create()),
    (t.colorMatrix = t.colorMatrix || y_.create()),
    t
  );
}
function Pa(e, t, r) {
  w_(r, e, t.colorMatrix), Er.add(r, r, t.colorOffset);
}
function w_(e, t, r) {
  var i = t[0],
    n = t[1],
    s = t[2],
    a = t[3];
  return (
    (e[0] = r[0] * i + r[1] * n + r[2] * s + r[3] * a),
    (e[1] = r[4] * i + r[5] * n + r[6] * s + r[7] * a),
    (e[2] = r[8] * i + r[9] * n + r[10] * s + r[11] * a),
    (e[3] = r[12] * i + r[13] * n + r[14] * s + r[15] * a),
    e
  );
}
var rt = Er.create();
function x_(e, t) {
  for (var r = e.width, i = e.height, n = e.data, s = 0; s < r * i; s++)
    Er.set(
      rt,
      n[s * 4 + 0] / 255,
      n[s * 4 + 1] / 255,
      n[s * 4 + 2] / 255,
      n[s * 4 + 3] / 255
    ),
      Pa(rt, t, rt),
      (n[s * 4 + 0] = rt[0] * 255),
      (n[s * 4 + 1] = rt[1] * 255),
      (n[s * 4 + 2] = rt[2] * 255),
      (n[s * 4 + 3] = rt[3] * 255);
}
var M_ = { identity: g_, applyToPixel: Pa, applyToImageData: x_ },
  T_ = Le,
  Gr = 0.1,
  Zr = 0.01,
  E_ = {
    yawSpeed: Gr,
    pitchSpeed: Gr,
    fovSpeed: Gr,
    yawAccel: Zr,
    pitchAccel: Zr,
    fovAccel: Zr,
    targetPitch: 0,
    targetFov: null,
  };
function b_(e) {
  e = T_(e || {}, E_);
  var t = e.yawSpeed,
    r = e.pitchSpeed,
    i = e.fovSpeed,
    n = e.yawAccel,
    s = e.pitchAccel,
    a = e.fovAccel,
    o = e.targetPitch,
    h = e.targetFov;
  return function () {
    var c = 0,
      f = 0,
      d = 0,
      p = 0,
      _ = 0,
      w = 0,
      m = 0,
      M,
      b,
      S,
      C;
    return function (E, O) {
      if (
        ((M = (O - c) / 1e3),
        (_ = Math.min(f + M * n, t)),
        (b = _ * M),
        (E.yaw = E.yaw + b),
        o != null && E.pitch !== o)
      ) {
        var F = (0.5 * d * d) / s;
        Math.abs(o - E.pitch) > F
          ? (w = Math.min(d + M * s, r))
          : (w = Math.max(d - M * s, 0)),
          (S = w * M),
          o < E.pitch && (E.pitch = Math.max(o, E.pitch - S)),
          o > E.pitch && (E.pitch = Math.min(o, E.pitch + S));
      }
      if (h != null && E.fov !== o) {
        var H = (0.5 * p * p) / a;
        Math.abs(h - E.fov) > H
          ? (m = Math.min(p + M * a, i))
          : (m = Math.max(p - M * a, 0)),
          (C = m * M),
          h < E.fov && (E.fov = Math.max(h, E.fov - C)),
          h > E.fov && (E.fov = Math.min(h, E.fov + C));
      }
      return (c = O), (f = _), (d = w), (p = m), E;
    };
  };
}
var S_ = b_;
function C_(e, t) {
  function r() {
    t && t.length > 0 ? e.apply(null, t) : e();
  }
  setTimeout(r, 0);
}
var $_ = C_;
function L_(e) {
  return (e * Math.PI) / 180;
}
var P_ = L_;
function z_(e) {
  return (e * 180) / Math.PI;
}
var A_ = z_,
  pn = {
    WebGlStage: Cn,
    WebGlCubeRenderer: qs,
    WebGlFlatRenderer: Ws,
    WebGlEquirectRenderer: Xs,
    registerDefaultRenderers: Bs,
    CubeGeometry: Ud,
    FlatGeometry: ip,
    EquirectGeometry: lp,
    RectilinearView: Pp,
    FlatView: Fp,
    ImageUrlSource: r1,
    SingleAssetSource: i1,
    StaticAsset: ni,
    DynamicAsset: h1,
    TextureStore: oa,
    Layer: la,
    RenderLoop: ca,
    KeyControlMethod: va,
    DragControlMethod: pa,
    QtvrControlMethod: _a,
    ScrollZoomControlMethod: ya,
    PinchZoomControlMethod: ga,
    VelocityControlMethod: s0,
    ElementPressControlMethod: l0,
    Controls: xa,
    Dynamics: Ve,
    Viewer: m_,
    Scene: Sa,
    Hotspot: Ta,
    HotspotContainer: Ea,
    colorEffects: M_,
    registerDefaultControls: $a,
    autorotate: S_,
    util: {
      async: gn,
      cancelize: wn,
      chain: Mi,
      clamp: wt,
      clearOwnProperties: U,
      cmp: Vt,
      compose: Qs,
      convertFov: Ks,
      decimal: xi,
      defaults: Le,
      defer: $_,
      degToRad: P_,
      delay: ia,
      dom: ce,
      extend: ha,
      hash: yr,
      inherits: Se,
      mod: Ge,
      noop: Yt,
      now: ot,
      once: ri,
      pixelRatio: _r,
      radToDeg: A_,
      real: wi,
      retry: na,
      tween: La,
      type: kt,
    },
    dependencies: {
      bowser: dr.exports,
      glMatrix: ne,
      eventEmitter: G,
      hammerjs: bi.exports,
    },
  },
  R_ = no({ __proto__: null, default: pn }, [pn]);
export { R_ as i };
