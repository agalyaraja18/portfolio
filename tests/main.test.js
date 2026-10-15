'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  clamp, easeInOutCubic, blurAmount, faceShade, introRadius, faceHeight, drumAngle, drumPlace
} = require('../js/main.js');

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≉ ${b}`);

test('clamp keeps values in range', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
});

test('easeInOutCubic endpoints and midpoint', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(1), 1);
  near(easeInOutCubic(0.5), 0.5);
  assert.ok(easeInOutCubic(0.25) < 0.25);
  assert.ok(easeInOutCubic(0.75) > 0.75);
});

test('blurAmount is 0 at the ends and max at mid', () => {
  assert.equal(blurAmount(0, 14), 0);
  assert.equal(blurAmount(1, 14), 0);
  near(blurAmount(0.5, 14), 14);
  assert.ok(blurAmount(0.25, 14) > 0 && blurAmount(0.25, 14) < 14);
});

test('faceShade is 0 facing and max edge-on', () => {
  near(faceShade(0), 0);
  near(faceShade(Math.PI / 2), 0.65);
  near(faceShade(Math.PI), 0.65);
  near(faceShade(Math.PI / 2, 0.85), 0.85);
  assert.ok(faceShade(Math.PI / 4) > 0 && faceShade(Math.PI / 4) < 0.65);
});

test('faceHeight closes the cylinder', () => {
  for (const vh of [568, 800, 1080]) {
    const r = introRadius(vh, 8);
    near(r, vh / (2 * Math.tan(Math.PI / 8)));
    near(faceHeight(r, 8), vh, 1e-6);
    // 8 faces of that height span a full octagon perimeter: 8 · 2r·tan(π/8)
    near(8 * faceHeight(r, 8), 16 * r * Math.tan(Math.PI / 8), 1e-6);
  }
});

test('drumAngle maps the pinned scroll to card positions and clamps', () => {
  const stageH = 800, count = 4, step = 0.6;
  assert.equal(drumAngle(0, stageH, count, step), 0);
  near(drumAngle(stageH * step, stageH, count, step), 1);
  near(drumAngle(stageH * step * 2.5, stageH, count, step), 2.5);
  assert.equal(drumAngle(-500, stageH, count, step), 0);
  assert.equal(drumAngle(1e6, stageH, count, step), count - 1);
  assert.equal(drumAngle(100, stageH, 1, step), 0);
});

test('drumPlace puts the front card flat', () => {
  const p = drumPlace(0, 300);
  near(p.s, 0); near(p.x, 0); near(p.z, 0); near(p.shade, 0);
  assert.equal(p.opacity, 1);
});

test('drumPlace places neighbours symmetrically', () => {
  const l = drumPlace(-1, 300), r = drumPlace(1, 300);
  near(l.x, -r.x); near(l.z, r.z); near(l.s, -r.s); near(l.shade, r.shade);
  assert.ok(r.x > 0 && r.z < 0);
  assert.equal(r.opacity, 1);
});

test('drumPlace fades far cards to 0', () => {
  // s = o · 1.22 / 2, so o = 3 gives s = 1.83 rad (beyond 1.75)
  assert.equal(drumPlace(3, 300).opacity, 0);
  assert.equal(drumPlace(-3, 300).opacity, 0);
  // Between 1.45 and 1.75 rad it is partially faded
  const mid = drumPlace(1.6 * 2 / 1.22, 300).opacity;
  near(mid, 0.5, 1e-9);
});
