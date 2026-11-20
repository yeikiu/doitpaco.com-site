/* Google Analytics 4 behind a consent banner (Consent Mode v2: everything denied by default).
   gtag.js is only fetched after the visitor clicks Accept; the choice is remembered in localStorage.
   Any element with data-cookie-settings reopens the banner. Loaded with `defer` from every page. */
(function () {
  var GA_ID = 'G-6846K9K9JR', KEY = 'paco-consent', loaded = false, choice = null, d = document;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });

  var q = new URLSearchParams(location.search).get('lang');
  var es = q === 'es' || (!q && (navigator.language || '').slice(0, 2).toLowerCase() === 'es');
  var T = es
    ? { t: '¿Cookies? Solo una clase.', p: 'Queremos usar Google Analytics para contar visitas. Sin anuncios, nada más. Tú decides.', no: 'Rechazar', ok: 'Aceptar', more: 'Privacidad', href: 'privacy.html?lang=es' }
    : { t: 'Cookies? Just one kind.', p: "We'd like to use Google Analytics to count visits. No ads, nothing else. Your call.", no: 'Decline', ok: 'Accept', more: 'Privacy', href: 'privacy.html' };

  function analytics() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    if (loaded) return;
    loaded = true;
    var s = d.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; d.head.appendChild(s);
    gtag('js', new Date()); gtag('config', GA_ID);
  }

  var box;
  function build() {
    var st = d.createElement('style');
    st.textContent =
      '.pk-ck{position:fixed;z-index:9999;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));width:min(380px,calc(100vw - 32px));padding:18px 18px 16px;border-radius:18px;background:rgba(21,18,46,.96);color:#f6f3ff;font:15px/1.45 system-ui,"Segoe UI",sans-serif;box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),0 20px 60px rgba(0,0,0,.6)}' +
      '.pk-ck[hidden]{display:none}.pk-ck b{display:flex;align-items:center;gap:9px;font-size:17px}' +
      '.pk-ck b:before{content:"";width:9px;height:9px;border-radius:50%;background:#ff7a59}' +
      '.pk-ck p{margin:7px 0 0;color:#b7b2d9}.pk-ck p a{color:#f6f3ff}' +
      '.pk-ck div{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}' +
      '.pk-ck button{min-height:42px;border-radius:999px;font:600 15px system-ui,"Segoe UI",sans-serif;cursor:pointer;border:1px solid rgba(255,255,255,.25);background:transparent;color:#f6f3ff}' +
      '.pk-ck button[data-ck=granted]{background:#ff7a59;border-color:#ff7a59;color:#1a0f0a}' +
      '.pk-ck button:focus-visible{outline:3px solid #ff7a59;outline-offset:2px}';
    d.head.appendChild(st);
    box = d.createElement('div');
    box.className = 'pk-ck'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Cookie consent'); box.hidden = true;
    box.innerHTML = '<b></b><p></p><div><button type="button" data-ck="denied"></button><button type="button" data-ck="granted"></button></div>';
    box.querySelector('b').textContent = T.t;
    var p = box.querySelector('p'); p.textContent = T.p + ' ';
    var a = d.createElement('a'); a.href = T.href; a.textContent = T.more; p.appendChild(a);
    box.querySelector('[data-ck=denied]').textContent = T.no;
    box.querySelector('[data-ck=granted]').textContent = T.ok;
    box.addEventListener('click', function (e) { var v = e.target.getAttribute && e.target.getAttribute('data-ck'); if (v) set(v); });
    d.body.appendChild(box);
    d.addEventListener('click', function (e) {
      var o = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (o) { e.preventDefault(); box.hidden = false; box.querySelector('[data-ck=granted]').focus(); }
    });
  }
  function set(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    box.hidden = true;
    if (v === 'granted') analytics(); else gtag('consent', 'update', { analytics_storage: 'denied' });
  }

  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === 'granted') analytics();
  function start() { build(); if (choice !== 'granted' && choice !== 'denied') box.hidden = false; }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
})();
