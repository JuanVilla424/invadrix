# 🏗️ Architecture — invadrix

## 📖 Overview

Invadrix is a classic Space Invaders clone implemented as a **single HTML5 file** (`index.html`) with zero runtime dependencies. All game logic, rendering, and state management live inside one `<script>` tag wrapped in an IIFE. The game targets 60 fps via `requestAnimationFrame` and uses the Canvas 2D API exclusively for rendering.

## 🛠️ Tech Stack

| Layer           | Technology                   |
| --------------- | ---------------------------- |
| Rendering       | HTML5 Canvas 2D API          |
| Language        | Vanilla JavaScript (ES2020+) |
| Deployment      | GitHub Pages (static)        |
| Dev Server      | `npx serve .` (optional)     |
| CI/CD           | GitHub Actions               |
| Pre-commit      | pre-commit framework         |
| Version Control | Git + GitHub                 |

## 📁 Project Structure

```
invadrix/
├── index.html              # Entire game — HTML + CSS + JS in one file
├── test.js                 # Regex-based structural checks (143 checks)
├── package.json            # Dev scripts only (no runtime deps)
├── .nojekyll               # Prevents Jekyll processing on GitHub Pages
├── .github/workflows/      # CI/CD pipelines
│   └── deploy.yml          # GitHub Pages deployment workflow
├── .pre-commit-config.yaml # Pre-commit hooks
├── .bumpversion.cfg        # Version bump config
├── scripts/                # Git submodule — shared CI/CD scripts
├── ARCHITECT.md
├── CONTEXT.md
├── CLAUDE.md
└── README.md
```

## 🎮 Rendering Pipeline

```
requestAnimationFrame callback
  └─ calcDeltaTime()          ← capped at 0.1s
  └─ update(dt)               ← game logic, physics, collision
  └─ render()
       ├─ ctx.clearRect()     ← clear canvas (800×600)
       ├─ drawShields()       ← 5×8 grid of 6px cells per shield (3 shields)
       ├─ drawAliens()        ← triangle/diamond/square per row type
       ├─ drawPlayer()        ← trapezoid shape at y=560
       ├─ drawProjectiles()   ← thin rects (player) / zigzag (alien)
       └─ drawHUD()           ← score, hi-score, wave, lives
```

All coordinates pass through `~~` (bitwise floor) before drawing to maintain integer pixel positions for crisp sub-pixel-free rendering.

## ⏱️ Game Loop

```js
function loop(ts) {
  var dt = (ts - lastTimestamp) / 1000; // seconds
  if (dt > 0.1) dt = 0.1; // cap to prevent spiral of death
  lastTimestamp = ts;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
```

Delta-time (`dt`) ensures movement is frame-rate independent. Edge-triggered inputs (`enterPressed`, `spacePressed`) are latched and cleared each frame to prevent key repeat artifacts.

## 🔃 Object Pooling

Projectiles are pre-allocated at startup. `new` is never called during gameplay:

```js
// Player: 5 slots; Alien: 10 slots
for (var i = 0; i < 5; i++) playerProj.push({ active: false, x: 0, y: 0 });
for (var j = 0; j < 10; j++) alienProj.push({ active: false, x: 0, y: 0 });
```

## 🧩 Entity Types

| Entity            | Shape       | Color     | Description                      |
| ----------------- | ----------- | --------- | -------------------------------- |
| Player            | Trapezoid   | `#00ff44` | Player-controlled ship at y=560  |
| Alien row 0       | Triangle    | `#ff4444` | Top row, 30 pts each             |
| Alien rows 1–2    | Diamond     | `#ff8844` | Middle rows, 20 pts each         |
| Alien rows 3–4    | Square      | `#ffff44` | Bottom rows, 10 pts each         |
| Player projectile | Thin rect   | `#ffffff` | 2×5 px, moves up at 500 px/s     |
| Alien projectile  | Zigzag line | `#ffff00` | Drawn as connected line segments |
| Shield cell       | Square      | `#00ff44` | 6×6 px cells, destroyed on hit   |

## 🗺️ Game States

```
STATE_TITLE (0)        → ENTER key → STATE_PLAYING (1)
STATE_PLAYING (1)      → all aliens dead → STATE_WAVE_SPLASH (2)
STATE_PLAYING (1)      → lives=0 or aliens reach player → STATE_GAME_OVER (3)
STATE_WAVE_SPLASH (2)  → 2s timer → STATE_PLAYING (1) [wave++]
STATE_GAME_OVER (3)    → ENTER key → STATE_PLAYING (1) [reset]
```

## 🛡️ Shield System

Three shields at x=W×{0.25, 0.5, 0.75}, y=H-150. Each shield is a 5-row×8-col grid of 6px boolean cells. Destroyed cell-by-cell on AABB collision with any projectile.

## 👾 Alien Grid

- 5 rows × 11 columns = 55 aliens per wave
- Row type mapping: `[0, 1, 1, 2, 2]`
- Base speed: `30 × 1.1^(wave-1)` px/s, scaling up as aliens die
- Direction reverses at left/right margins; entire grid descends 20px on each edge bounce
- Fire rate: random alien (from bottom of each column) fires every ~1s, max 3 active alien projectiles

## 📱 Responsive Scaling

The game canvas is logically fixed at 800×600 px. Visual scaling is handled entirely via CSS `transform: scale()` — the canvas resolution never changes, preserving HiDPI clarity and avoiding canvas context resets.

```js
function resizeCanvas() {
  var scaleX = (window.innerWidth - 20) / 800;
  var scaleY = (window.innerHeight - 20) / 600;
  var scale = Math.min(scaleX, scaleY);
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = (window.innerWidth - 800 * scale) / 2 + "px";
  canvas.style.top = (window.innerHeight - 600 * scale) / 2 + "px";
}
window.addEventListener("resize", resizeCanvas);
```

Canvas CSS dimensions are set to `800 / dpr` × `600 / dpr` to display at the correct physical size while the backing buffer is `800 * dpr` × `600 * dpr` for crisp HiDPI rendering.

## 🕹️ Touch Controls

An `#touch-controls` overlay div is injected below the canvas and shown only on touch-capable devices (`'ontouchstart' in window`). Three buttons — ◀ FIRE ▶ — are positioned fixed at the bottom of the viewport.

```
[ ◀ ]  [ FIRE ]  [ ▶ ]
```

Touch handlers set the same boolean flags used by keyboard handlers (`keys.ArrowLeft`, `spacePressed`, `keys.ArrowRight`), ensuring zero duplication in game logic. Multi-touch is supported via touch identifier tracking so move and fire can occur simultaneously.

Title screen supports swipe-to-start; `touchstart` on any touch device sets `enterPressed`.

## 🚀 GitHub Pages Deployment

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main, dev]

jobs:
  deploy:
    uses: actions/deploy-pages@v4
    # uploads repo root — no build step required
```

The workflow runs on push to `main`, uploads the entire repo root as a Pages artifact (the single `index.html` is the only file needed), and deploys via `actions/deploy-pages`. `.nojekyll` at repo root prevents GitHub's Jekyll processor from transforming the file.

## ⚙️ Design Decisions

| Decision            | Choice                    | Rationale                                             |
| ------------------- | ------------------------- | ----------------------------------------------------- |
| Single file         | `index.html`              | No build step; works on GitHub Pages with zero config |
| Zero dependencies   | Vanilla JS                | Ships instantly, no supply chain risk, no bundler     |
| Canvas 2D           | `getContext('2d')`        | Universal browser support, sufficient for 2D game     |
| Geometric shapes    | Polygons only             | Retro aesthetic, no asset pipeline required           |
| Object pooling      | Pre-allocated array       | Avoids GC pauses during gameplay                      |
| Integer coordinates | `~~` bitwise floor        | Prevents sub-pixel blurring on canvas                 |
| Delta-time          | `dt = ms / 1000`          | Frame-rate independent movement at any refresh rate   |
| Fixed canvas size   | 800×600 px                | Consistent layout; CSS scales via `transform: scale`  |
| DPR scaling         | `ctx.scale(dpr, dpr)`     | Sharp rendering on HiDPI/retina displays              |
| Responsive scaling  | CSS `transform: scale()`  | Scales visually without resetting canvas context      |
| Touch controls      | Overlay div + touch flags | Reuses keyboard flag booleans; no game logic changes  |
