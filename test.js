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
  ['zigzag strokeStyle yellow', /'#FFEC27'/],
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

const explosionChecks = [
  ['var explosions array', /var explosions\s*=\s*\[\]/],
  ['explosion pool 10 objects', /explosions\.push\(\{.*active:\s*false/s],
  ['explosion particles 8 directions', /dirs\s*=\s*\[/],
  ['spawnExplosion function', /function spawnExplosion/],
  ['updateExplosions function', /function updateExplosions/],
  ['drawExplosions function', /function drawExplosions/],
  ['spawnExplosion called on alien kill', /spawnExplosion\s*\(/],
  ['explosion timer 0.3', /timer\s*=\s*0\.3/],
  ['explosion particle 4x4 fillRect', /fillRect.*-\s*2.*-\s*2.*4.*4/],
];

const engineChecks = [
  ['requestAnimationFrame loop', /requestAnimationFrame\s*\(/],
  ['deltaTime calculation', /dt\s*=\s*\(ts\s*-\s*lastTimestamp\)\s*\/\s*1000/],
  ['deltaTime cap 0.1', /dt\s*>\s*0\.1/],
  ['STATE_TITLE constant', /STATE_TITLE\s*=\s*0/],
  ['STATE_PLAYING constant', /STATE_PLAYING\s*=\s*1/],
  ['STATE_WAVE_SPLASH constant', /STATE_WAVE_SPLASH\s*=\s*2/],
  ['STATE_GAME_OVER constant', /STATE_GAME_OVER\s*=\s*3/],
  ['keydown event listener', /addEventListener\s*\(\s*'keydown'/],
  ['keyup event listener', /addEventListener\s*\(\s*'keyup'/],
  ['fillRect canvas call', /ctx\.fillRect\s*\(/],
  ['beginPath canvas call', /ctx\.beginPath\s*\(\s*\)/],
  ['localStorage load hiScore', /localStorage\.getItem\s*\(\s*'invadrix_hi'\s*\)/],
  ['localStorage save hiScore', /localStorage\.setItem\s*\(\s*'invadrix_hi'/],
  ['player invulnerable flag', /player\.invulnerable\s*=/],
  ['playerProj pool array', /var playerProj\s*=\s*\[\]/],
  ['alienProj pool array', /var alienProj\s*=\s*\[\]/],
  ['object pool active flag init', /active:\s*false/],
  ['object pool activate on fire', /\.active\s*=\s*true/],
  ['object pool deactivate offscreen', /\.active\s*=\s*false/],
  ['aabb collision check', /function aabb/],
  ['shield cells grid 2D', /SHIELD_ROWS\s*=\s*5/],
  ['player proj upward speed 500', /500\s*\*\s*dt/],
  ['player speed 300', /speed:\s*300|300\s*\*\s*dt|player\.speed\s*\*\s*dt/],
  ['devicePixelRatio scaling', /devicePixelRatio/],
  ['canvas clearRect each frame', /ctx\.clearRect\s*\(/],
];

let failed = 0;
for (const [name, pattern] of [
  ...checks,
  ...alienChecks,
  ...shieldChecks,
  ...hudWaveChecks,
  ...explosionChecks,
  ...engineChecks,
]) {
  if (!pattern.test(html)) {
    console.error(`FAIL: missing ${name}`);
    failed++;
  }
}

const total =
  checks.length +
  alienChecks.length +
  shieldChecks.length +
  hudWaveChecks.length +
  explosionChecks.length +
  engineChecks.length;
if (failed === 0) {
  console.log(`All ${total} checks passed.`);
} else {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
