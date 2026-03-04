# 🏗️ Architecture — invadrix

## 📖 Overview

Invadrix is a classic Space Invaders clone implemented as a **single HTML5 file** (`index.html`) with zero runtime dependencies. All game logic, rendering, and state management live inside one `<script>` tag. The game targets 60 fps via `requestAnimationFrame` and uses the Canvas 2D API exclusively for rendering.

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
├── package.json            # Dev scripts only (no runtime deps)
├── .github/workflows/      # CI/CD pipelines
├── .pre-commit-config.yaml # Pre-commit hooks
├── .bumpversion.cfg        # Version bump config
├── ARCHITECT.md
├── CONTEXT.md
├── CLAUDE.md
└── README.md
```

## 🎮 Rendering Pipeline

```
requestAnimationFrame callback
  └─ calcDeltaTime()
  └─ update(dt)           ← game logic, physics, collision
  └─ render()
       ├─ ctx.clearRect() ← clear canvas
       ├─ drawBackground()
       ├─ drawAliens()    ← trapezoids / diamonds
       ├─ drawPlayer()    ← triangle
       ├─ drawProjectiles() ← thin rectangles (pooled)
       ├─ drawShields()   ← square clusters
       └─ drawHUD()       ← score, lives, level
```

All coordinates pass through `Math.round()` before drawing to maintain integer pixel positions for crisp sub-pixel-free rendering.

## ⏱️ Game Loop

```js
let lastTime = 0;

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000; // seconds
  lastTime = timestamp;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
```

Delta-time (`dt`) ensures movement is frame-rate independent — objects move at consistent world-space speeds regardless of hardware performance.

## 🔃 Object Pooling

Projectiles are pre-allocated at startup. During gameplay, `new` is never called for projectiles:

```js
const POOL_SIZE = 64;
const pool = Array.from({ length: POOL_SIZE }, () => ({
  active: false,
  x: 0,
  y: 0,
  vy: 0,
}));

function fireProjectile(x, y, vy) {
  const p = pool.find((p) => !p.active);
  if (!p) return;
  p.active = true;
  p.x = x;
  p.y = y;
  p.vy = vy;
}
```

## 🧩 Entity Types

| Entity     | Shape         | Color         | Description                         |
| ---------- | ------------- | ------------- | ----------------------------------- |
| Player     | Triangle      | `#0f0`        | Player-controlled ship at bottom    |
| Alien A    | Diamond       | `#f0f`        | Top-row aliens, highest points      |
| Alien B    | Trapezoid     | `#0ff`        | Mid-row aliens, medium points       |
| Alien C    | Square        | `#ff0`        | Bottom-row aliens, lowest points    |
| Projectile | Thin rect     | `#fff`/`#f00` | Pooled bullets (player + alien)     |
| Shield     | Square chunks | `#0a0`        | Destructible bunker segments        |
| Particle   | Tiny rect     | Various       | Explosion debris (pooled)           |
| UFO        | Hexagon       | `#f00`        | Bonus target crossing top of screen |

## ⚙️ Design Decisions

| Decision            | Choice                | Rationale                                             |
| ------------------- | --------------------- | ----------------------------------------------------- |
| Single file         | `index.html`          | No build step; works on GitHub Pages with zero config |
| Zero dependencies   | Vanilla JS            | Ships instantly, no supply chain risk, no bundler     |
| Canvas 2D           | `getContext('2d')`    | Universal browser support, sufficient for 2D game     |
| Geometric shapes    | Polygons only         | Retro aesthetic, no asset pipeline required           |
| Object pooling      | Pre-allocated array   | Avoids GC pauses during gameplay                      |
| Integer coordinates | `Math.round()` / `~~` | Prevents sub-pixel blurring on canvas                 |
| Delta-time          | `dt = ms / 1000`      | Frame-rate independent movement at any refresh rate   |
| Fixed canvas size   | 480×640 px            | Consistent layout; CSS scales via `image-rendering`   |
