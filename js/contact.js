/* ==========================================================
   STUDIO ESPACE — Formulaire de contact et de devis
   ----------------------------------------------------------
   Le site est statique : il n'a pas de serveur pour recevoir
   les messages. Le formulaire peut donc fonctionner de 2 façons
   (réglées dans js/config.js) :
     A) formEndpoint renseigné  -> envoi réel via un service externe gratuit
     B) whatsapp renseigné      -> ouverture de WhatsApp avec le message prérempli
   Si rien n'est configuré, le site le dit clairement et
   ne prétend JAMAIS qu'un message a été envoyé.
   ========================================================== */
(function () {
  'use strict';
  var cfg = window.STUDIO_CONFIG || {};
  var form = document.getElementById('formulaire-devis');
  if (!form) return;
  var statut = document.getElementById('statut-formulaire');

  // Présélection du service si on vient de la page Services (?service=...)
  var param = new URLSearchParams(window.location.search).get('service');
  if (param) {
    var select = form.elements['service'];
    Array.prototype.forEach.call(select.options, function (o) { if (o.value === param) select.value = param; });
  }

  function montrer(type, html) {
    statut.className = 'statut statut--' + type;
    statut.innerHTML = html;
    statut.hidden = false;
    statut.focus();
  }
  function echapper(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function valeurs() {
    var f = form.elements;
    return {
      nom: f['nom'].value.trim(), telephone: f['telephone'].value.trim(), email: f['email'].value.trim(),
      service: f['service'].value, budget: f['budget'].value, description: f['description'].value.trim()
    };
  }
  function texteMessage(v) {
    return 'Bonjour STUDIO ESPACE,\n' +
      'Nom : ' + v.nom + '\n' +
      'Téléphone : ' + (v.telephone || 'non renseigné') + '\n' +
      'E-mail : ' + (v.email || 'non renseigné') + '\n' +
      'Service souhaité : ' + v.service + '\n' +
      'Budget indicatif : ' + (v.budget || 'non précisé') + '\n' +
      'Description du projet : ' + v.description;
  }

  // Vérification des champs obligatoires, avec messages clairs
  function valider(v) {
    var ok = true;
    form.querySelectorAll('.erreur-champ').forEach(function (e) { e.remove(); });
    form.querySelectorAll('[aria-invalid]').forEach(function (e) { e.removeAttribute('aria-invalid'); });
    function erreur(nomChamp, msg) {
      var champ = form.elements[nomChamp];
      champ.setAttribute('aria-invalid', 'true');
      var p = document.createElement('p');
      p.className = 'erreur-champ'; p.textContent = msg;
      champ.parentNode.appendChild(p);
      ok = false;
    }
    if (!v.nom) erreur('nom', 'Indiquez votre nom.');
    if (!v.telephone && !v.email) erreur('telephone', 'Indiquez au moins un téléphone ou une adresse e-mail pour vous répondre.');
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) erreur('email', 'Cette adresse e-mail ne semble pas valide.');
    if (!v.service) erreur('service', 'Choisissez un type de service.');
    if (v.description.length < 15) erreur('description', 'Décrivez votre projet en quelques phrases (15 caractères minimum).');
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements['site-web'].value) return; // champ anti-spam rempli : on ignore
    var v = valeurs();
    if (!valider(v)) { montrer('erreur', 'Le formulaire contient des erreurs. Corrigez les champs signalés puis réessayez.'); return; }
    var msg = texteMessage(v);

    // A) Envoi réel via un service externe
    if (cfg.formEndpoint) {
      var bouton = form.querySelector('button[type="submit"]');
      bouton.disabled = true; bouton.textContent = 'Envoi en cours…';
      fetch(cfg.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ nom: v.nom, telephone: v.telephone, email: v.email, service: v.service, budget: v.budget, message: v.description })
      }).then(function (r) {
        if (!r.ok) throw new Error('statut ' + r.status);
        form.reset();
        montrer('ok', '<strong>Demande envoyée.</strong> Merci, le studio vous répondra dès que possible.');
      }).catch(function () {
        montrer('erreur', '<strong>L’envoi a échoué.</strong> Votre demande n’a pas été transmise. Vérifiez votre connexion, ou ' +
          (cfg.whatsapp ? 'utilisez le bouton WhatsApp.' : 'contactez le studio directement.'));
      }).finally(function () { bouton.disabled = false; bouton.textContent = 'Envoyer ma demande'; });
      return;
    }

    // B) WhatsApp prérempli (l'utilisateur doit encore appuyer sur « Envoyer » dans WhatsApp)
    if (cfg.whatsapp) {
      window.open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      montrer('info', '<strong>WhatsApp s’est ouvert avec votre message prérempli.</strong> Votre demande n’est pas encore envoyée : ' +
        'appuyez sur « Envoyer » dans WhatsApp pour la transmettre.');
      return;
    }

    // C) Rien de configuré : on le dit clairement, sans simuler d'envoi
    montrer('info', '<strong>Aucun message n’a été envoyé.</strong> Ce formulaire n’est pas encore relié à un service d’envoi. ' +
      'Les responsables du site doivent renseigner js/config.js (voir README.md). ' +
      'En attendant, vous pouvez copier votre demande :<br><button type="button" class="btn btn--contour" id="copier">Copier ma demande</button>');
    var c = document.getElementById('copier');
    c.addEventListener('click', function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(msg).then(function () { c.textContent = 'Demande copiée'; });
      } else { window.prompt('Copiez votre demande :', msg); }
    });
  });
})();
