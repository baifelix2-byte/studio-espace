# STUDIO ESPACE — Site vitrine (projet académique)

Site statique de 6 pages (HTML5 + CSS3 + JavaScript), sans framework, sans base de données, sans serveur.
Concepteurs : **BAI FELIX** (CM-Uga-23IBAI0022) et **YOUSSOUF DAHDAI** (CM-Uga-23IBAI0028).

## Contenu du dossier

```
studio-espace/
├── index.html          Accueil
├── a-propos.html       À propos
├── services.html       Nos services
├── realisations.html   Réalisations (filtre + agrandissement)
├── inspirations.html   Inspirations et conseils (articles en fenêtre)
├── contact.html        Contact et devis
├── 404.html            Page d'erreur
├── css/style.css       Tout le design (couleurs modifiables en haut du fichier)
├── js/config.js        VOS COORDONNÉES (WhatsApp, e-mail, formulaire)
├── js/main.js          Menu mobile, galerie, articles, retour en haut
├── js/contact.js       Fonctionnement du formulaire
├── assets/images/      Les 18 images du site
├── assets/favicon.svg  Icône du site
├── README.md           Ce guide
└── SOURCES.md          Origine des images et points à vérifier
```

## Voir le site sur votre ordinateur
Double-cliquez sur `index.html` : le site s'ouvre dans le navigateur, sans installation.

## Renseigner vos coordonnées (important)
Ouvrez `js/config.js` avec le Bloc-notes ou VS Code et complétez :
- `whatsapp` : numéro au format international sans « + » (ex. : indicatif 237 suivi du numéro) ;
- `email` : votre adresse e-mail ;
- `formEndpoint` : (facultatif) l'adresse d'un service de formulaire gratuit ;
- `localisation` : déjà réglée sur « Garoua, région du Nord, Cameroun » (sans adresse précise).

Aucune coordonnée n'est inventée : tant que les champs sont vides, le site affiche « À renseigner ».

## Faire fonctionner le formulaire
Le site étant statique, il ne peut pas recevoir de messages seul. Deux solutions, au choix :

**Solution A — WhatsApp (la plus simple)** : renseignez `whatsapp`. Au clic sur « Envoyer ma demande », WhatsApp s'ouvre avec le message prérempli ; le visiteur n'a plus qu'à appuyer sur « Envoyer ».

**Solution B — Formspree (gratuit, envoi par e-mail)** :
1. Créez un compte sur formspree.io et un nouveau formulaire avec votre e-mail.
2. Copiez l'adresse du formulaire (du type `https://formspree.io/f/xxxxxxxx`).
3. Collez-la dans `formEndpoint` de `js/config.js`.
4. Envoyez un message de test depuis le site en ligne et vérifiez votre boîte e-mail (confirmation éventuelle à valider chez Formspree).

Si les deux sont renseignés, l'envoi par Formspree est utilisé. Si rien n'est renseigné, le formulaire indique clairement qu'aucun message n'a été envoyé et propose de copier la demande. Il ne simule jamais un envoi réussi.

## Mettre le site en ligne gratuitement (GitHub Pages)
1. Créez un compte sur github.com, puis un dépôt public (ex. `studio-espace`).
2. Cliquez sur « Add file » > « Upload files » et glissez **le contenu** du dossier (index.html à la racine du dépôt, avec css, js et assets), puis « Commit changes ».
3. Dans le dépôt : **Settings > Pages**. Sous « Build and deployment », choisissez « Deploy from a branch », la branche `main` et le dossier `/ (root)`, puis Save.
4. Après 1 à 2 minutes, le site est accessible à l'adresse `https://VOTRE-NOM.github.io/studio-espace/`.

Tous les chemins sont relatifs : le site fonctionne dans un sous-dossier comme celui-ci.
Remarque : sur GitHub Pages, la page `404.html` n'est affichée que si elle est à la racine du dépôt (c'est le cas).

## Modifier le site
- **Couleurs** : variables au début de `css/style.css` (`--vert`, `--sable`, `--creme`, `--encre`).
- **Textes** : ouvrez la page `.html` concernée ; chaque section est séparée et repérable.
- **Remplacer une image** : gardez le même nom de fichier dans `assets/images/`, ou changez le nom dans le HTML (et le texte alternatif `alt`).
- **Ajouter un projet** : copiez un bloc `<article class="projet ...">` dans `realisations.html` et changez la valeur `data-categorie` (residentiel, restauration ou professionnel).

## Points à vérifier avant la soutenance
- Droits d'utilisation des images (voir `SOURCES.md`).
- Coordonnées renseignées et formulaire testé en ligne.
- Chaque lien testé sur téléphone.
- Accord de l'enseignant sur le développement HTML/CSS/JS (si WordPress est exigé, adapter le projet).
