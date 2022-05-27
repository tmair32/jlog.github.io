import {
  d as C,
  r as n,
  b as G,
  _ as M,
  o as N,
  c as O,
  f as i,
  k as a,
} from "./app.ec4ba29e.js";
import { _ as A } from "./plugin-vue_export-helper.21dcd24c.js";
const Z = { class: "main" },
  K = { class: "info" },
  Y = a("Fov: "),
  j = a("Face tiles: "),
  q = a("Face size: "),
  J = a("Total tiles: "),
  Q = a("Total Size: "),
  U = C({
    setup(W) {
      const f = n(),
        _ = n(),
        v = n(),
        u = n(),
        p = n(),
        m = n(),
        P = { controls: { mouseViewMode: "drag" } };
      return (
        G(async () => {
          if (typeof window == "undefined") return;
          const o = await M(
              () =>
                import("./index.42798b80.js").then(function (e) {
                  return e.i;
                }),
              []
            ),
            g = (await M(() => import("./SolidColorSource.51b58952.js"), []))
              .default,
            y = new o.Viewer(f.value, P),
            V = new g(o, 512, 512),
            h = [];
          for (let e = 0; e < 32; e++)
            h.push({ tileSize: 512, size: 512 * Math.pow(2, e) });
          const w = new o.CubeGeometry(h),
            F = n({ yaw: 0, pitch: 0, fov: (52 * Math.PI) / 180 }),
            k = o.RectilinearView.limit.resolution(2048),
            L = o.RectilinearView.limit.yaw(-Math.PI / 2, Math.PI / 2),
            z = o.RectilinearView.limit.pitch(0, 0),
            E = o.RectilinearView.limit.vfov(0, (75 * Math.PI) / 180),
            I = o.util.compose(k, L, z, E),
            l = new o.RectilinearView(F, I);
          y.createScene({
            source: V,
            geometry: w,
            view: l,
            pinFirstLevel: !0,
          }).switchTo();
          const T = (e) => {
              const s = ["Mega", "Giga", "Tera", "Peta", "Exa", "Zetta"];
              let t = 0;
              for (; t < s.length; ) {
                const r = Math.pow(1e3, t);
                if (e < r) break;
                t++;
              }
              return (e / Math.pow(1e3, t)).toFixed(2) + " " + s[t];
            },
            x = (e) => {
              const s = ["", "K", "M", "G", "T", "P", "E", "Z"];
              if (e < 999999) return e;
              let t = 0;
              for (; t < s.length; ) {
                const r = Math.pow(1e3, t);
                if (e < r) break;
                t++;
              }
              return (t -= 1), (e / Math.pow(1e3, t)).toFixed(2) + s[t];
            };
          l.addEventListener("change", () => {
            const e = l.selectLevel(w.levelList),
              s = e.numHorizontalTiles() * e.numVerticalTiles(),
              t = s * 6,
              c = (e.width() / 1e3) * (e.height() / 1e3),
              d = c * 6,
              H = ((l.fov() * 180) / Math.PI).toFixed(10) + "\xB0",
              b = x(s),
              S = x(t),
              B = T(c) + "pixel",
              D = T(d) + "pixel";
            (v.value.innerHTML = b),
              (p.value.innerHTML = S),
              (_.value.innerHTML = B),
              (u.value.innerHTML = D),
              (m.value.innerHTML = H);
          });
        }),
        (o, R) => (
          N(),
          O("div", Z, [
            i(
              "div",
              { ref_key: "panoRef", ref: f, class: "marzipano" },
              null,
              512
            ),
            i("div", K, [
              i("div", null, [
                Y,
                i("span", { ref_key: "fovRef", ref: m }, null, 512),
              ]),
              i("div", null, [
                j,
                i("span", { ref_key: "faceTilesRef", ref: v }, null, 512),
              ]),
              i("div", null, [
                q,
                i("span", { ref_key: "facePixelsRef", ref: _ }, null, 512),
              ]),
              i("div", null, [
                J,
                i("span", { ref_key: "totalTilesRef", ref: p }, null, 512),
              ]),
              i("div", null, [
                Q,
                i("span", { ref_key: "totalPixelsRef", ref: u }, null, 512),
              ]),
            ]),
          ])
        )
      );
    },
  });
var te = A(U, [["__scopeId", "data-v-e137cb0c"]]);
export { te as default };
