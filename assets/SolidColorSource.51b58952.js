function c(e, t, n) {
  (this._marzipano = e), (this._width = t), (this._height = n);
}
c.prototype._tileText = function (e) {
  var t = [];
  return (
    e.face && t.push("face:" + e.face),
    t.push("x:" + e.x),
    t.push("y:" + e.y),
    t.push("zoom:" + e.z),
    t.join(" ")
  );
};
c.prototype._tileColor = function (e) {
  switch (e.face) {
    case "u":
      return "#999";
    case "b":
      return "#aaa";
    case "d":
      return "#bbb";
    case "f":
      return "#ccc";
    case "r":
      return "#ddd";
    case "l":
      return "#eee";
    default:
      return "#ddd";
  }
};
c.prototype.loadAsset = function (e, t, n) {
  var l = this._marzipano,
    a = this._width,
    i = this._height,
    u = this._tileText(t),
    h = this._tileColor(t),
    o = document.createElement("canvas");
  (o.width = a), (o.height = i);
  var r = o.getContext("2d");
  (r.fillStyle = h),
    r.fillRect(0, 0, a, i),
    (r.lineWidth = 10),
    (r.strokeStyle = "#000"),
    r.strokeRect(0, 0, a, i),
    (r.fillStyle = "#000"),
    (r.font = a / 20 + "px Arial"),
    (r.textAlign = "center"),
    r.fillText(u, a / 2, i / 2);
  var f = setTimeout(function () {
    var s = new l.StaticAsset(o);
    n(null, t, s);
  }, 0);
  return function () {
    clearTimeout(f), n.apply(null, arguments);
  };
};
export { c as default };