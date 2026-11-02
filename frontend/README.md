# Notosan — Frontend

Parallax landing page (React + Vite) with three illustrated scenes: **Visite**, **Tranquility** and **Biodiversity**.

```bash
npm install
npm run dev     # http://localhost:5173
```

## How the 3D effect works

Each scene (`src/scenes/*`) is a stack of `<Layer>`s, each one an SVG drawn in the same 1600×900 space.
`src/hooks/useParallax.js` moves every layer on each frame:

- `speed` — scroll parallax. Positive = far away (lags behind), negative = close (rushes past).
- `depth` — mouse parallax. 0 = still, 1 = follows the pointer the most.

Ambient loops (waterfalls, birds, grass, scarf, light rays, fireflies…) are CSS animations in `src/index.css`.
Reusable art pieces live in `src/components/art/`.

`src/api/axios.js` is the (currently unused) client for the FastAPI backend at `VITE_API_URL`.
