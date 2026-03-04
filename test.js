import { readFileSync } from 'fs';

const html = readFileSync('./index.html', 'utf8');
const checks = [
  ['DOCTYPE', /<!doctype html>/i],
  ['lang=en', /html\s+lang="en"/i],
  ['charset UTF-8', /charset="UTF-8"/i],
  ['viewport meta', /name="viewport"/i],
  ['title', /Invadrix.*Space Invaders/i],
  ['background #000', /background:\s*#000/i],
  ['overflow hidden', /overflow:\s*hidden/i],
  ['display flex', /display:\s*flex/i],
  ['justify-content center', /justify-content:\s*center/i],
  ['align-items center', /align-items:\s*center/i],
  ['height 100vh', /height:\s*100vh/i],
  ['image-rendering pixelated', /image-rendering:\s*pixelated/i],
  ['canvas#game', /<canvas\s+id="game">/i],
  ['script tag', /<script>/i],
];

const alienChecks = [
  ['ALIEN_COLS 11', /ALIEN_COLS\s*=\s*11/],
  ['ALIEN_ROWS 5', /ALIEN_ROWS\s*=\s*5/],
  ['ALIEN_GAP 8', /ALIEN_GAP\s*=\s*8/],
  ['ALIEN_PTS 30/20/10', /ALIEN_PTS\s*=\s*\[30,\s*20,\s*10\]/],
  ['gridDir variable', /gridDir\s*=/],
  ['gridBaseSpeed', /gridBaseSpeed\s*=/],
  ['alienFireTimer', /alienFireTimer/],
  ['spawnAlienGrid function', /function spawnAlienGrid/],
  ['tryAlienFire function', /function tryAlienFire/],
  ['drawZigzag function', /function drawZigzag/],
  ['drawTriangle function', /function drawTriangle/],
  ['drawDiamond function', /function drawDiamond/],
  ['speed scaling formula', /total\s*-\s*aliveCount/],
  ['grid edge MARGIN check', /MARGIN/],
  ['gridDir reverse', /gridDir\s*\*=\s*-1/],
  ['alien shift down 20px', /\.y\s*\+=\s*20/],
  ['alien fire max 3', /activeCount\s*>=\s*3/],
  ['zigzag strokeStyle yellow', /'#ffff00'/],
  ['zigzag lineWidth 2', /lineWidth\s*=\s*2/],
  ['alien proj speed 200', /200\s*\*\s*dt/],
  ['getAliveCount function', /function getAliveCount/],
  ['getGridBounds function', /function getGridBounds/],
];

let failed = 0;
for (const [name, pattern] of [...checks, ...alienChecks]) {
  if (!pattern.test(html)) {
    console.error(`FAIL: missing ${name}`);
    failed++;
  }
}

if (failed === 0) {
  console.log(`All ${checks.length + alienChecks.length} checks passed.`);
} else {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
