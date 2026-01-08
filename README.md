# 🎬 Cinemood

Cinemood est une application web qui propose des recommandations de films personnalisées en fonction de ton **humeur** et de quelques préférences simples (genre, année, etc.).
Tu réponds à un court questionnaire, l’interface te suggère une sélection de films et tu peux consulter les fiches détaillées.

---

## ✨ Fonctionnalités

- Sélection de l’humeur via une interface intuitive (curseur / boutons).
- Questionnaire rapide pour affiner les recommandations (genres, durée, année de sortie, etc.).
- Liste de recommandations dynamiques avec affiches, titres, notes et résumé.
- Fiches film détaillées (casting, synopsis, informations clés).
- Interface responsive pensée mobile-first.
- Gestion des états et types avec React + TypeScript pour un code robuste.

---

## 🧱 Stack technique

- **Frontend** : React + TypeScript + Vite.
- **Styling** : CSS.
- **Qualité de code** : Biome (lint + format), Husky (pre-commit hooks).
- **API films** : TMDB.
- **Déploiement** : Vercel.

---

## 🚀 Prise en main

### 1. Prérequis

- Node.js (version recommandée : 18+).
- npm installé globalement.

### 2. Installation

```bash
git clone https://github.com/earzalien/cinemood.git
cd cinemood
npm install
```

### 3. Configuration de l’environnement

Créer un fichier `.env` à la racine du projet en s’inspirant de `.env.sample` :

```bash
cp .env.sample .env
```

Puis renseigner les variables nécessaires, par exemple :

```env
VITE_TMDB_API_KEY=ta_clef_api
VITE_API_URL=https://api.themoviedb.org/3
```

### 4. Lancement du projet

```bash
# Mode développement
npm run dev

# Vérification qualité (lint + format)
npm run check

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```


---

## 👨‍💻 Auteurs

Projet réalisé par **Kévin, Solo, Jeremy et Clarissa** dans le cadre de la formation Développeur Web & Mobile à la Wild Code School.

- LinkedIn : https://www.linkedin.com/in/kevin-ressegaire/
- Portfolio : https://portfolio-ressegaire-kevin.vercel.app
