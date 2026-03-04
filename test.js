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

let failed = 0;
for (const [name, pattern] of checks) {
  if (!pattern.test(html)) {
    console.error(`FAIL: missing ${name}`);
    failed++;
  }
}

if (failed === 0) {
  console.log(`All ${checks.length} checks passed.`);
} else {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
