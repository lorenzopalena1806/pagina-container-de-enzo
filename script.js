// ================================================
// PEPI'S LOMOS — script.js
// Navbar: resaltar seccion activa al hacer scroll
// ================================================

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.menu-section');
  const navLinks = document.querySelectorAll('.category-nav a');

  // --- Smooth scroll offset (altura de la navbar sticky) ---
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // --- Resaltar enlace activo segun scroll ---
  function setActiveLink() {
    const navHeight = navbar ? navbar.offsetHeight : 0;
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navHeight - 20;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
})();
