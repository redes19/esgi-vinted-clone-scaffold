# Vinted Clone

Clone simplifié de Vinted — projet final du module React.js.

## Prérequis

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/)

## Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd vinted-clone

# Copier et personnaliser le fichier d'environnement
cp .env.example .env
# Éditer .env et remplacer "Mon Nom" par votre nom

# Installer les dépendances (front + serveur)
pnpm install
```

## Lancement

Deux terminaux sont nécessaires :

```bash
# Terminal 1 — Frontend (http://localhost:5173)
pnpm dev

# Terminal 2 — API (http://localhost:3000)
pnpm api
```

## Scripts disponibles

| Commande      | Description                    |
| ------------- | ------------------------------ |
| `pnpm dev`    | Lance le serveur de dev Vite   |
| `pnpm api`    | Lance le serveur API Express   |
| `pnpm build`  | Build de production            |
| `pnpm lint`   | Lint avec oxlint               |
| `pnpm format` | Formate le code avec Prettier  |

## Structure du projet

```
src/
├── components/          # Vos composants React
├── pages/               # Vos pages
├── hooks/
│   └── useCurrentUserId.ts
├── lib/
│   └── userId.ts
├── services/
│   └── api.ts           # Service fetch pré-configuré
├── types/
│   └── article.ts       # Types et constantes
├── App.tsx
├── main.tsx
└── index.css
server/                  # API Express — NE PAS MODIFIER
```

## Notes importantes

- Le dossier `server/` ne doit **pas** être modifié
- Le service `api.ts` gère automatiquement l'identification utilisateur
- Les données sont stockées en mémoire — elles sont réinitialisées à chaque redémarrage du serveur
- Consultez `CONSIGNES.md` pour les instructions détaillées du projet
