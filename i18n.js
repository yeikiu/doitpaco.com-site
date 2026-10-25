// Pinta los textos desde locales/<lang>.js. Inglés por defecto (orden de JQ, 18-oct): español solo si se pide (?lang=es) o el navegador está en español.
(function () {
  var q = new URLSearchParams(location.search).get("lang");
  var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  // Solo es o en: cualquier otro valor cae a inglés y el lang declarado coincide con lo que se pinta.
  var want = q || nav;
  var lang = want === "es" ? "es" : "en";
  var dict = (window.PACO_I18N || {})[lang] || window.PACO_I18N.en;
  document.documentElement.lang = lang;
  document.title = dict["meta.title"];
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var v = dict[el.getAttribute("data-i18n")];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
    el.setAttribute("href", dict[el.getAttribute("data-i18n-href")]);
  });
  document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
    var tpl = el.querySelector("template");
    (dict[el.getAttribute("data-i18n-list")] || []).forEach(function (t) {
      var n = tpl.content.firstElementChild.cloneNode(true);
      (n.querySelector("[data-slot]") || n).textContent = t;
      el.appendChild(n);
    });
  });
  document.dispatchEvent(new Event("paco:i18n"));
})();
