# -Dashboard - Klaire Test technique


Mini-application Full Stack permettant de suivre l'état des actes notariés.

## Stack Technique
- **Backend** : NestJS, TypeORM, SQLite.
- **Frontend** : React (Vite), TypeScript, CSS brut.
- **Tooling** : Concurrently (pour le lancement simultané).

## Installation et Lancement

À la racine du projet (`Dashboard_notaire`) :

1. **Installer toutes les dépendances** :
   ```bash
   npm run install-all
   ```

### 1. Backend (NestJS)
```bash
cd server
npm install
npm run start:dev

Le serveur tourne sur http://localhost:3000. La base de données SQLite db.sqlite est créée automatiquement au premier lancement. 
```

### 2. Frontend (React)
```bash
cd client
npm install
npm run dev

L'interface est accessible sur http://localhost:5173.
```

### 3. Fonctionnalités implémentées

- Gestion des documents : Création via formulaire et liste dynamique.

- Cycle de vie : Transition des statuts (PENDING -> PROCESSED -> ARCHIVED) via des requêtes PATCH.

- Statistiques (Challenge) : Calcul de la somme totale de pageCount par statut.

    - Note : Le calcul est effectué directement en base de données via le QueryBuilder de TypeORM pour garantir des performances optimales.

- Interface unifiée : Design épuré avec badges de statut et formulaire harmonisé.


### 4. Structure de la base de données (Document)

**Champ**	**Type**	**Description**

id	        Integer	    Clé primaire auto-incrémentée
fileName	String	    Nom du fichier
status	    Enum	    PENDING, PROCESSED, ARCHIVED
pageCount	Number	    Nombre de pages (entier positif)
metadata	JSON	    Informations extraites (ex: source)
createdAt	Date	    Horodatage automatique



### 5. Choix techniques

VerbatimModuleSyntax : Utilisation stricte des imports de types pour une meilleure optimisation au build.

Validation : Mise en place d'une validation simple côté client (min page count) et typage TypeScript rigoureux sur l'ensemble de la chaîne de données.