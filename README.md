# GTA Heists — WebUI Mini-Game

A browser-based heist simulator. Choose heists, complete setup tasks, assign roles, execute the final mission, and earn payouts.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Zustand** — state management
- **Tailwind CSS** — styling
- **Vitest** — testing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests (watch) |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Coverage report |
| `npm run lint` | ESLint |

## Project Structure

```
src/
├── components/
│   ├── ui/           # Card, Button, Panel
│   └── screens/      # HomeScreen, HeistSelectionScreen, etc.
├── game/
│   ├── data/         # Heist definitions
│   ├── engine/       # Success calculation, payout logic
│   └── types/        # TypeScript interfaces
├── store/            # Zustand game store
├── test/             # Vitest setup
├── App.tsx
├── main.tsx
└── index.css
```

## Deploy (GitHub Pages)

1. Push the repo to GitHub.
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` or `master` — the workflow builds and deploys automatically.

Site URL: `https://<username>.github.io/<repo-name>/`

## Game Flow

1. **Home** → Start Heist
2. **Select Heist** → Choose from unlocked heists
3. **Setup Phase** → Complete setup tasks (timing, decision, hack, resource)
4. **Role Assignment** → Assign crew
5. **Final Heist** → Execute (phased: Entry → Vault → Escape)
6. **Result** → Success/fail + payout breakdown
7. **Continue** → Return home, money + XP applied
