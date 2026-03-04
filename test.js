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

const shieldChecks = [
  ['SHIELD_ROWS 5', /SHIELD_ROWS\s*=\s*5/],
  ['SHIELD_COLS 8', /SHIELD_COLS\s*=\s*8/],
  ['CELL 6', /CELL\s*=\s*6/],
  ['buildShields function', /function buildShields/],
  ['hitShield function', /function hitShield/],
  ['shield positions 25/50/75', /0\.25.*0\.5.*0\.75|positions\s*=\s*\[/s],
  ['shield cells 2D array', /cells\[r\]\.push|cells\.push\(\[\]\)/],
  ['aabb function', /function aabb/],
  ['aabb overlap logic', /ax\s*<\s*bx\s*\+\s*bw/],
  ['player proj vs aliens collision', /al\.alive\s*=\s*false/],
  ['score increment', /score\s*\+=\s*ALIEN_PTS/],
  ['hiScore update', /hiScore\s*=\s*score/],
  ['hiScore localStorage save', /localStorage\.setItem.*invadrix_hi/],
  ['hiScore localStorage load', /localStorage\.getItem.*invadrix_hi/],
  ['player proj vs alien proj cancel', /p\.active\s*=\s*false.*q\.active\s*=\s*false|q\.active\s*=\s*false/s],
  ['alien proj vs player hit', /function hitPlayer/],
  ['player invulnerable check', /player\.invulnerable/],
  ['hitPlayer lives decrement', /player\.lives--/],
  ['game over on aliens reach player', /finalBounds.*player\.y|maxY.*player\.y/],
];

const hudWaveChecks = [
  ['drawHUD function', /function drawHUD/],
  ['HI-SCORE label', /HI-SCORE/],
  ['waveSplashTimer variable', /waveSplashTimer/],
  ['wave increment', /wave\+\+/],
  ['enterState WAVE_SPLASH transition', /enterState\(STATE_WAVE_SPLASH\)/],
  ['baseSpeed wave scaling pow 1.1', /Math\.pow\(1\.1,\s*wave\s*-\s*1\)/],
  ['lives trapezoid icons in HUD', /drawTrapezoid[\s\S]{0,100}player\.lives/],
  ['WAVE text in HUD', /'WAVE\s*'\s*\+\s*wave/],
  ['SCORE text in HUD', /'SCORE\s*'/],
  ['game reset score and lives on enter', /score\s*=\s*0[\s\S]{0,300}player\.lives\s*=\s*3/],
];

let failed = 0;
for (const [name, pattern] of [
  ...checks,
  ...alienChecks,
  ...shieldChecks,
  ...hudWaveChecks,
]) {
  if (!pattern.test(html)) {
    console.error(`FAIL: missing ${name}`);
    failed++;
  }
}

const total = checks.length + alienChecks.length + shieldChecks.length + hudWaveChecks.length;
if (failed === 0) {
  console.log(`All ${total} checks passed.`);
} else {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
