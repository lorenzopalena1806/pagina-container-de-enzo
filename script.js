/* ================================================
   PEPI'S LOMOS — script.js  (v3)
   1. Scroll suave + nav activo
   2. Animaciones de entrada (Intersection Observer)
   3. Descripciones expandibles
   4. Boton volver arriba
   ================================================ */

(function () {
  'use strict';

  /* ─── 1. SCROLL SUAVE + NAV ACTIVO ─── */

  var navbar  = document.getElementById('navbar');
  var sections = document.querySelectorAll('.menu-section');
  var navLinks = document.querySelectorAll('.nav-card');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      var navH = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  
  function setActiveLink() {
    var navH = navbar ? navbar.offsetHeight : 0;
    var current = '';
    var minDistance = Infinity;
    var scrollPosition = window.scrollY + navH + 150; // Punto de lectura un poco mas abajo del navbar

    sections.forEach(function (sec) {
      var sectionTop = sec.offsetTop;
      var sectionBottom = sectionTop + sec.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        current = sec.getAttribute('id');
      }
    });

    // Si llegamos al fondo exacto, forzar el ultimo elemento (Postres)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
      current = sections[sections.length - 1].getAttribute('id');
    }

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
        // Opcional: hacer scroll horizontal del navbar si el item activo queda oculto en celulares
        link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }


  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();


  /* ─── 2. ANIMACIONES DE ENTRADA (Intersection Observer) ─── */

  var cards = document.querySelectorAll('.product-card');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach(function (card) { observer.observe(card); });
  } else {
    /* Fallback: mostrar todo si el navegador no soporta IO */
    cards.forEach(function (card) { card.classList.add('visible'); });
  }


  /* ─── 3. DESCRIPCIONES EXPANDIBLES ─── */

  /*
   * Para cada .card-desc chequeamos si el texto esta truncado.
   * Si lo esta, insertamos un boton "Ver mas" que al hacer clic
   * expande la descripcion y cambia el texto a "Ver menos".
   */
  var descs = document.querySelectorAll('.card-desc');

  descs.forEach(function (desc) {
    /* Necesitamos esperar al layout para medir el overflow */
    requestAnimationFrame(function () {
      var isClamped = desc.scrollHeight > desc.clientHeight + 2;

      if (!isClamped) return; /* Descripcion corta: no hace falta boton */

      var btn = document.createElement('button');
      btn.className = 'btn-expand';
      btn.textContent = 'Ver mas';
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function () {
        var expanded = desc.classList.toggle('expanded');
        btn.textContent = expanded ? 'Ver menos' : 'Ver mas';
        btn.setAttribute('aria-expanded', String(expanded));
      });

      /* Insertar el boton justo despues de la descripcion */
      desc.insertAdjacentElement('afterend', btn);
    });
  });


  /* ─── 4. BOTON VOLVER ARRIBA ─── */

  /* Crear el boton dinamicamente */
  var btnTop = document.createElement('button');
  btnTop.className = 'btn-top';
  btnTop.setAttribute('aria-label', 'Volver al inicio');
  btnTop.setAttribute('title', 'Volver arriba');
  btnTop.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="18 15 12 9 6 15"></polyline></svg>';

  document.body.appendChild(btnTop);

  var showThreshold = 280; /* px de scroll para mostrar el boton */

  function toggleBtnTop() {
    if (window.pageYOffset > showThreshold) {
      btnTop.classList.add('visible');
    } else {
      btnTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBtnTop, { passive: true });
  toggleBtnTop();

  btnTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();

