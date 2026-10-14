/* ==========================================================
   STUDIO ESPACE — Scripts communs à toutes les pages
   Contenu : 1) menu mobile  2) apparition au défilement
   3) coordonnées depuis config.js  4) filtre de la galerie
   5) agrandissement des images  6) lecture des articles
   7) bouton « retour en haut »
   ========================================================== */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var cfg = window.STUDIO_CONFIG || {};

  /* ---- 1) Menu mobile (bouton hamburger) ---- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('menu-principal');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('est-ouvert');
      burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('est-ouvert')) {
        nav.classList.remove('est-ouvert');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* ---- 2) Apparition légère au défilement ---- */
  var elements = document.querySelectorAll('.apparait');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('est-visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    elements.forEach(function (el) { obs.observe(el); });
  } else {
    elements.forEach(function (el) { el.classList.add('est-visible'); });
  }

  /* ---- 3) Coordonnées lues dans config.js ---- */
  function lienWhatsApp(texte) {
    return 'https://wa.me/' + cfg.whatsapp + (texte ? '?text=' + encodeURIComponent(texte) : '');
  }
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var cle = el.getAttribute('data-config');
    var valeur = cfg[cle];
    if (valeur) {
      el.textContent = (cle === 'whatsapp') ? '+' + valeur : valeur;
      el.classList.remove('a-completer');
      if (el.tagName === 'A') {
        el.href = (cle === 'email') ? 'mailto:' + valeur : lienWhatsApp('Bonjour STUDIO ESPACE, je souhaite avoir des informations.');
      }
    }
  });
  // Éléments affichés seulement si la coordonnée est renseignée
  document.querySelectorAll('[data-si-config]').forEach(function (el) {
    var cle = el.getAttribute('data-si-config');
    if (cfg[cle]) {
      el.hidden = false;
      if (cle === 'whatsapp') el.href = lienWhatsApp('Bonjour STUDIO ESPACE, je souhaite avoir des informations.');
      if (cle === 'email') el.href = 'mailto:' + cfg.email;
    }
  });

  /* ---- 4) Filtre de la galerie par catégorie ---- */
  var boutonsFiltre = document.querySelectorAll('.filtre');
  var projets = document.querySelectorAll('.projet');
  boutonsFiltre.forEach(function (b) {
    b.addEventListener('click', function () {
      var cat = b.getAttribute('data-filtre');
      boutonsFiltre.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      projets.forEach(function (p) {
        p.hidden = !(cat === 'tous' || p.getAttribute('data-categorie') === cat);
      });
    });
  });

  /* ---- 5) Agrandissement des images au clic ---- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbTitre = lb.querySelector('[data-lb-titre]');
    var lbDesc = lb.querySelector('[data-lb-desc]');
    var courant = -1;
    var liste = function () {
      return Array.prototype.filter.call(document.querySelectorAll('.projet__zoom'), function (b) { return !b.closest('.projet').hidden; });
    };
    var afficher = function (i) {
      var l = liste(); if (!l.length) return;
      courant = (i + l.length) % l.length;
      var b = l[courant];
      lbImg.src = b.getAttribute('data-src');
      lbImg.alt = b.getAttribute('data-alt');
      lbTitre.textContent = b.getAttribute('data-titre');
      lbDesc.textContent = b.getAttribute('data-desc');
    };
    document.querySelectorAll('.projet__zoom').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = liste(); afficher(l.indexOf(b)); lb.showModal();
      });
    });
    lb.querySelector('.lightbox__btn--prec').addEventListener('click', function () { afficher(courant - 1); });
    lb.querySelector('.lightbox__btn--suiv').addEventListener('click', function () { afficher(courant + 1); });
    lb.querySelector('.fermer').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); }); // clic sur le fond
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') afficher(courant - 1);
      if (e.key === 'ArrowRight') afficher(courant + 1);
    });
  }

  /* ---- 6) Lecture d'un article complet dans une fenêtre ---- */
  var fenetre = document.getElementById('fenetre-article');
  if (fenetre) {
    var contenu = fenetre.querySelector('[data-article-contenu]');
    document.querySelectorAll('[data-article]').forEach(function (b) {
      b.addEventListener('click', function () {
        var modele = document.getElementById(b.getAttribute('data-article'));
        if (!modele) return;
        contenu.innerHTML = '';
        contenu.appendChild(modele.content.cloneNode(true));
        fenetre.showModal();
        fenetre.scrollTop = 0;
      });
    });
    fenetre.querySelector('.fermer').addEventListener('click', function () { fenetre.close(); });
    fenetre.addEventListener('click', function (e) { if (e.target === fenetre) fenetre.close(); });
  }

  /* ---- 7) Bouton « retour en haut » ---- */
  var haut = document.querySelector('.haut');
  if (haut) {
    window.addEventListener('scroll', function () {
      haut.classList.toggle('est-visible', window.scrollY > 500);
    }, { passive: true });
    haut.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // Année automatique dans le pied de page
  document.querySelectorAll('[data-annee]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
