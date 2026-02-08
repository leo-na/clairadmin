# ClairAdmin — Fullstack Admin Dashboard (React + Node.js)

ClairAdmin est un **dashboard d’administration moderne fullstack**, conçu comme un projet structuré, scalable et proche des standards professionnels utilisés en entreprise.

Le projet est volontairement séparé en **frontend React** et **backend Node.js**, avec une authentification sécurisée par JWT et une architecture prête pour évoluer vers une application métier complète.

---

##  Objectifs du projet

- Mettre en place une **architecture front / back propre**
- Implémenter une **authentification réelle** (JWT)
- Créer une **base solide** pour un back-office administratif
- Respecter des **bonnes pratiques professionnelles** (structure, typage, sécurité)
- Servir de **projet portfolio** démontrant des compétences fullstack

---

##  Structure du projet
------------------------------------


---

##  Frontend — clairadmin-front

### Stack technique
- **React 18**
- **TypeScript**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **class-variance-authority**
- **tailwind-merge**
- **JWT (via API backend)**

### Fonctionnalités
- Page de connexion sécurisée
- Gestion de l’état utilisateur (auth store)
- Routes protégées
- Design system réutilisable (Button, Input, Card…)
- Redirection automatique après login
- Architecture scalable (services, hooks, stores)

---

##  Backend — clairadmin-back

### Stack technique
- **Node.js**
- **Express**
- **TypeScript**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **Zod (validation)**
- **dotenv**
- **CORS**

### Fonctionnalités
- API REST sécurisée
- Inscription utilisateur (`/auth/register`)
- Connexion utilisateur (`/auth/login`)
- Hashage des mots de passe
- Génération et validation de JWT
- Middleware d’authentification
- Architecture modulaire (routes, controllers, services)

---

##  Communication Front ↔ Back

- Le frontend communique avec l’API via `fetch`
- Le backend retourne un **token JWT**
- Le token est stocké côté client
- Les routes protégées utilisent ce token pour l’accès sécurisé

---

##  Lancer le projet en local

### Backend
```bash


