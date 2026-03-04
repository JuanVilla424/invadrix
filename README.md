# 🕹️ Invadrix

[![Version](https://img.shields.io/github/v/tag/JuanVilla424/invadrix?label=Version&color=blue)](VERSIONING.md)
[![Build](https://img.shields.io/github/actions/workflow/status/JuanVilla424/invadrix/ci.yml?branch=dev&label=Build)](https://github.com/JuanVilla424/invadrix/actions)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)]()
[![License](https://img.shields.io/badge/License-GPLv3-purple.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen.svg)]()

A classic Space Invaders clone built entirely in a single `index.html` file with zero runtime dependencies. All rendering is done using the HTML5 Canvas 2D API with geometric shapes — no sprites, no images, just pure code.

## 📚 Table of Contents

- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [📦 Installation](#-installation)
  - [🌐 Running the Game](#-running-the-game)
- [📋 Scripts](#-scripts)
- [🏗️ Architecture](#-architecture)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)
- [📄 License](#-license)

## ✨ Features

- **🗂️ Single-file** — entire game lives in one `index.html`, no build step required
- **🚫 Zero dependencies** — no npm packages, CDN scripts, or external resources at runtime
- **🔷 Geometric shapes** — all game objects rendered as triangles, diamonds, squares, and trapezoids
- **⚡ 60 fps** — smooth gameplay via `requestAnimationFrame` with delta-time movement
- **🎯 Object pooling** — projectiles pre-allocated for GC-free gameplay
- **🌐 GitHub Pages ready** — deploy by pushing to `main`, no build pipeline needed
- **📱 Mobile viewport** — responsive canvas with `image-rendering: pixelated` for crisp retro look

## 🚀 Getting Started

### 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 20+ _(optional, only needed to run `npx serve`)_
- [pre-commit](https://pre-commit.com/) _(for contributors)_

### 📦 Installation

```bash
git clone https://github.com/JuanVilla424/invadrix.git
cd invadrix
```

### 🌐 Running the Game

**Option A — Open directly in browser:**

```bash
open index.html
```

**Option B — Local dev server:**

```bash
npm start
# Opens at http://localhost:3000
```

**Option C — Any static server:**

```bash
npx serve .
```

## 📋 Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Serve the game locally via npx serve  |
| `npm run build` | Validate HTML structure (no-op build) |
| `npm run test`  | Run game logic tests                  |

## 🏗️ Architecture

See [ARCHITECT.md](ARCHITECT.md) for the full architecture overview, rendering pipeline, game loop design, and entity model.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on code style, branch strategy, and the pull request process.

## 📬 Contact

For questions, open an issue on [GitHub Issues](https://github.com/JuanVilla424/invadrix/issues).

## 📄 License

2026 — This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). You are free to use, modify, and distribute this software under the terms of the GPL-3.0 license. See the [LICENSE](LICENSE) file for full details.
