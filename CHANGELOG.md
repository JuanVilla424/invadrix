## [0.1.1] - 2026-03-04

### Features

- **core**: add responsive mobile layout with hidpi and github pages deployment (`minor candidate`)
- **core**: trigger github pages deployment on dev branch push (`patch candidate`)
- **core**: add responsive scaling, mobile touch controls, and github pages deployment
- **core**: add touch controls with swipe-to-start and tap-to-fire for mobile
- **core**: responsive canvas scaling via css transform with 10px padding
- **core**: add wave splash scale-in animation with difficulty hint text
- **core**: add polished title screen with colored letters, alien demos, blink prompt, and score table
- **core**: add player death break-apart animation and red screen flash on hit
- **core**: add alien death explosion pool with 8-particle burst animation
- **core**: add 2-frame alien animation toggling every 500ms with distinct a/b shape variants
- **core**: apply pico-8 palette colors to aliens, player, shields, and projectiles
- **core**: add scrolling starfield background with 50 pre-allocated star dots
- **core**: implement complete space invaders game engine with all gameplay systems
- **core**: fix player entity properties - y=560, h=24, rename dead/deathPause/visible/lives
- **core**: implement complete space invaders game engine with iife wrapper
- **core**: implement complete space invaders game engine in index.html
- **core**: project scaffold with base index.html

### Bug Fixes

- **core**: sanitize localStorage hi-score against NaN on non-numeric values (`patch candidate`)

### Documentation

- **core**: update changelog

### Tests

- **core**: add 5 targeted hidpi and resize checks to reach 143 (`patch candidate`)
- **core**: add 27 visual polish checks for animations, colors, starfield, and title screen
- **core**: add hud, wave system, and high score verification checks
- **core**: add shield, collision, and scoring verification checks
- **core**: add alien grid and projectile verification checks

### Chores

- **core**: sync pyproject.toml version with bumpversion cfg (`patch candidate`)

### Other Changes

- Initial commit
