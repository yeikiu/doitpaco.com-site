/* doitpaco.com v2 · revelado al hacer scroll (Fable)
   Solo añade la clase .rv a lo que está bajo el pliegue y la cambia por .in al entrar en pantalla.
   Si el visitante pide menos movimiento o el navegador no tiene IntersectionObserver, no toca nada. */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  var SEL = '#video .film, #best .brow, #features .tile, #built .wrap > *, #beta .wrap > *, #consulting .tile, .final h2, .final .cta';
  var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
  if (!els.length) return;

  els.forEach(function(el){
    var i = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = (Math.min(i, 6) * 90) + 'ms';
    el.classList.add('rv');
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function(el){ io.observe(el); });
})();
