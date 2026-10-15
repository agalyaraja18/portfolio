/* Agalya R portfolio. Vanilla JS, no dependencies.
   Pure helpers live at the top and are exported for node:test. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     Pure helpers
     ------------------------------------------------------------------------ */
  var FACES = 8;
  var DRUM_RADIUS = 2;      // projects drum radius, in card widths
  var DRUM_GAP = 0.22;      // gap between cards, in card widths
  var DRUM_STEP = 0.6;      // scroll distance per card, in stage heights

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }

  function easeInOutCubic(t) {
    t = clamp(t, 0, 1);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Vertical motion blur: 0 at both ends, `max` at mid-roll.
  function blurAmount(p, max) {
    if (p <= 0 || p >= 1) return 0;
    return max * Math.sin(Math.PI * p);
  }

  // Darkening for a face turned `angle` radians away from the viewer.
  function faceShade(angle, max) {
    if (max === undefined) max = 0.65;
    return max * (1 - Math.max(0, Math.cos(angle)));
  }

  // Cylinder radius so one face is exactly `height` tall.
  function introRadius(height, faces) {
    return height / (2 * Math.tan(Math.PI / (faces || FACES)));
  }

  // Face height for a cylinder of `radius` with `faces` sides (inverse of introRadius).
  function faceHeight(radius, faces) {
    return 2 * radius * Math.tan(Math.PI / (faces || FACES));
  }

  // Pinned scroll distance (px past the pin point) -> card position 0 … count-1.
  function drumAngle(scrolled, stageH, count, step) {
    if (count < 2 || stageH <= 0) return 0;
    return clamp(scrolled / (stageH * (step || DRUM_STEP)), 0, count - 1);
  }

  // Place a card at offset `o` (cards from front) on a drum of cards `cardW` wide.
  function drumPlace(o, cardW) {
    var radius = DRUM_RADIUS * cardW;
    var s = o * (1 + DRUM_GAP) / DRUM_RADIUS;
    var abs = Math.abs(s);
    var opacity = abs <= 1.45 ? 1 : abs >= 1.75 ? 0 : 1 - (abs - 1.45) / 0.3;
    return {
      s: s,
      x: radius * Math.sin(s),
      z: radius * Math.cos(s) - radius,
      shade: 0.85 * (1 - Math.max(0, Math.cos(s))),
      opacity: opacity
    };
  }

  var helpers = {
    clamp: clamp,
    easeInOutCubic: easeInOutCubic,
    blurAmount: blurAmount,
    faceShade: faceShade,
    introRadius: introRadius,
    faceHeight: faceHeight,
    drumAngle: drumAngle,
    drumPlace: drumPlace
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = helpers;
  }
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  /* ------------------------------------------------------------------------
     Browser setup
     ------------------------------------------------------------------------ */
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js-intro');

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var canAnimate = typeof Element.prototype.animate === 'function';
  var ROLL_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

  function reducedMotion() { return reduceMQ.matches || !canAnimate; }
  function navHeight() {
    var nav = document.querySelector('.nav');
    return nav ? nav.offsetHeight : 0;
  }
  // Coalesce a callback to at most one call per animation frame.
  function rafThrottle(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; fn(); });
    };
  }

  /* ------------------------------------------------------------------------
     Nav: hamburger below 768px
     ------------------------------------------------------------------------ */
  var navToggle = document.querySelector('.nav__toggle');
  var navMenu = document.getElementById('nav-menu');

  function setMenu(open, returnFocus) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navMenu.classList.toggle('is-open', open);
    if (!open && returnFocus) navToggle.focus();
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true', false);
    });
    navMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);
    });
  }

  /* ------------------------------------------------------------------------
     Effect 1: drum intro
     ------------------------------------------------------------------------ */
  var intro = {
    isPlaying: false,
    overlay: null, skipBtn: null, drum: null, blurWrap: null, blurNode: null,
    faces: [], shadow: null, anim: null, radius: 0, persp: 0, vh: 0,
    duration: 0, safety: 0, raf: 0, onResize: null
  };
  var BLUR_MAX = 14;
  var FACE_RAD = 2 * Math.PI / FACES;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = html;
    return n;
  }

  function buildFaces(drum) {
    var name = (document.getElementById('hero-title') || {}).textContent || '';
    var year = String(new Date().getFullYear());
    var variants = [
      ['', '<p class="intro__label">Developer Portfolio</p><p class="intro__name"></p>'],
      ['intro__face--outline', '<span></span>'],
      ['intro__face--grid', ''],
      ['intro__face--blobs', ''],
      ['intro__face--conic', ''],
      ['intro__face--index', '<span>06</span>'],
      ['intro__face--year', '<span></span>'],
      ['intro__face--window', '']
    ];
    var faces = variants.map(function (v) {
      var f = el('div', 'intro__face ' + v[0], v[1]);
      drum.appendChild(f);
      return f;
    });
    faces[0].querySelector('.intro__name').textContent = name;
    faces[1].querySelector('span').textContent = name;
    faces[6].querySelector('span').textContent = year;
    return faces;
  }

  // Size the cylinder from the live viewport height so face 0 fills it exactly.
  function layoutIntro() {
    if (!intro.overlay) return;
    intro.vh = intro.overlay.clientHeight || window.innerHeight;
    intro.radius = introRadius(intro.vh, FACES);
    intro.persp = intro.radius * 2.5;
    intro.overlay.style.setProperty('--intro-persp', intro.persp.toFixed(1) + 'px');
    intro.faces.forEach(function (f, i) {
      f.style.transform = 'rotateX(' + (i * 45) + 'deg) translateZ(' + intro.radius.toFixed(2) + 'px)';
    });
    var keyframes = drumKeyframes();
    if (intro.anim && intro.anim.effect && intro.anim.effect.setKeyframes) {
      intro.anim.effect.setKeyframes(keyframes);
    }
    return keyframes;
  }

  function drumKeyframes() {
    var z = 'translateZ(' + (-intro.radius).toFixed(2) + 'px) ';
    return [{ transform: z + 'rotateX(0deg)' }, { transform: z + 'rotateX(-315deg)' }];
  }

  // Projected screen y of the edge shared by faces 6 and 7 (the hero "window").
  function trailingEdgeY(rollRad) {
    var psi = 7 * FACE_RAD - rollRad - FACE_RAD / 2;
    var re = intro.radius / Math.cos(FACE_RAD / 2);
    var y = -re * Math.sin(psi);
    var z = re * Math.cos(psi) - intro.radius;
    return { y: intro.vh / 2 + y * intro.persp / (intro.persp - z), front: Math.cos(psi) > 0 };
  }

  function introFrame() {
    if (!intro.isPlaying || !intro.anim) return;
    var timing = intro.anim.effect.getComputedTiming();
    var p = timing.progress == null ? 1 : timing.progress;
    var roll = p * 7 * FACE_RAD;

    // Per-face lighting
    for (var i = 0; i < intro.faces.length; i++) {
      intro.faces[i].style.setProperty('--shade', faceShade(i * FACE_RAD - roll).toFixed(3));
    }

    // Vertical-only motion blur, peaking mid-roll
    var b = blurAmount(p, BLUR_MAX);
    if (b > 0.05) {
      intro.blurNode.setAttribute('stdDeviation', '0 ' + b.toFixed(2));
      intro.blurWrap.style.filter = 'url(#intro-blur)';
    } else {
      intro.blurWrap.style.filter = 'none';
    }

    // Shadow cast on the hero just above the trailing edge
    var edge = trailingEdgeY(roll);
    var fade = clamp((1 - p) / 0.15, 0, 1);
    var visible = edge.front && edge.y > 0 && edge.y <= intro.vh + 1;
    var h = intro.shadow.offsetHeight;
    intro.shadow.style.transform = 'translateY(' + (edge.y - h).toFixed(1) + 'px)';
    intro.shadow.style.opacity = visible ? (0.9 * fade).toFixed(3) : '0';

    if (p >= 0.7) root.classList.add('hero-in');
    intro.raf = requestAnimationFrame(introFrame);
  }

  function skipIntro() {
    if (!intro.isPlaying) return;
    var a = intro.anim;
    if (!a) { finishIntro(); return; }
    var remaining = Math.max(0, intro.duration - (a.currentTime || 0));
    // Finish within ~250ms of wall time; never slow down on a repeat press.
    var rate = Math.max(a.playbackRate, remaining / 250, 1);
    if (a.updatePlaybackRate) a.updatePlaybackRate(rate); else a.playbackRate = rate;
  }

  function finishIntro() {
    if (!intro.isPlaying) return;
    intro.isPlaying = false;
    clearTimeout(window.__introFallback); // head-script fallback no longer needed
    cancelAnimationFrame(intro.raf);
    clearTimeout(intro.safety);
    try { if (intro.anim) intro.anim.cancel(); } catch (e) { /* ignore */ }
    intro.anim = null;
    if (intro.onResize) window.removeEventListener('resize', intro.onResize);
    if (intro.overlay) intro.overlay.remove();
    if (intro.skipBtn) intro.skipBtn.remove();
    intro.overlay = intro.skipBtn = intro.drum = null;
    intro.faces = [];

    root.classList.add('hero-in');
    root.classList.remove('is-intro');
    // Drop will-change once the stagger has played out.
    setTimeout(function () {
      document.querySelectorAll('[data-stagger]').forEach(function (n) { n.style.willChange = 'auto'; });
    }, 1400);

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    var body = document.body;
    body.setAttribute('tabindex', '-1');
    body.focus({ preventScroll: true });
    body.addEventListener('blur', function onBlur() {
      body.removeAttribute('tabindex');
      body.removeEventListener('blur', onBlur);
    });
  }

  function playIntro() {
    if (intro.isPlaying) return;
    intro.isPlaying = true;
    root.classList.add('is-intro');
    root.classList.remove('hero-in');
    document.querySelectorAll('[data-stagger]').forEach(function (n) { n.style.willChange = ''; });
    void root.offsetWidth; // restart the stagger transitions

    try {
      var overlay = el('div', 'intro');
      overlay.setAttribute('aria-hidden', 'true');
      intro.overlay = overlay;

      if (reducedMotion()) {
        // Cross-fade only: no cylinder, no skip button.
        overlay.classList.add('intro--fade');
        overlay.appendChild(el('div', 'intro__face', '<p class="intro__label">Developer Portfolio</p>'));
        document.body.appendChild(overlay);
        intro.duration = 300;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            overlay.classList.add('is-out');
            root.classList.add('hero-in');
          });
        });
        intro.safety = setTimeout(finishIntro, 300);
        return;
      }

      overlay.innerHTML =
        '<svg class="intro__svg" aria-hidden="true" focusable="false"><filter id="intro-blur" x="0" y="-20%" width="100%" height="140%">' +
        '<feGaussianBlur stdDeviation="0 0"/></filter></svg>';
      intro.blurNode = overlay.querySelector('feGaussianBlur');
      intro.blurWrap = el('div', 'intro__scene-wrap');
      intro.blurWrap.style.cssText = 'position:absolute;inset:0;will-change:filter';
      var scene = el('div', 'intro__scene');
      intro.drum = el('div', 'intro__drum');
      intro.faces = buildFaces(intro.drum);
      scene.appendChild(intro.drum);
      intro.blurWrap.appendChild(scene);
      overlay.appendChild(intro.blurWrap);
      intro.shadow = el('div', 'intro__shadow');
      overlay.appendChild(intro.shadow);
      document.body.appendChild(overlay);

      intro.skipBtn = el('button', 'intro-skip');
      intro.skipBtn.type = 'button';
      intro.skipBtn.textContent = 'Skip intro';
      intro.skipBtn.addEventListener('click', skipIntro);
      document.body.appendChild(intro.skipBtn);

      var keyframes = layoutIntro();
      intro.duration = window.innerWidth < 1024 ? 2200 : 2600;
      intro.anim = intro.drum.animate(keyframes, { duration: intro.duration, easing: ROLL_EASE, fill: 'forwards' });
      intro.anim.onfinish = finishIntro;
      intro.onResize = rafThrottle(layoutIntro);
      window.addEventListener('resize', intro.onResize);
      intro.safety = setTimeout(finishIntro, intro.duration + 1500);
      intro.raf = requestAnimationFrame(introFrame);
    } catch (err) {
      finishIntro();
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (intro.isPlaying) { skipIntro(); return; }
    if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });

  var replayBtn = document.querySelector('[data-replay]');
  if (replayBtn) replayBtn.addEventListener('click', playIntro);

  /* ------------------------------------------------------------------------
     Effect 2: projects horizontal drum
     ------------------------------------------------------------------------ */
  var section = document.getElementById('projects');
  var track = section && section.querySelector('.projects__track');
  var stage = section && section.querySelector('.projects__stage');
  var viewport = section && section.querySelector('.projects__viewport');
  var list = section && section.querySelector('.projects__list');
  var heading = section && section.querySelector('.projects__title');
  var cards = list ? Array.prototype.slice.call(list.querySelectorAll('.project')) : [];

  var drum = {
    active: false, pos: 0, target: 0, cardW: 0, stageH: 0, front: -1,
    raf: 0, last: 0, snapTimer: 0, snapping: false, snapTo: 0, revealed: false,
    rollIn: null
  };
  var STIFFNESS = 6;

  function trackTop() {
    return track.getBoundingClientRect().top + window.scrollY;
  }
  // Scroll position at which the sticky stage (top = nav height) starts pinning.
  function pinStart() { return trackTop() - navHeight(); }
  function scrollForIndex(i) { return pinStart() + i * drum.stageH * DRUM_STEP; }

  function layoutDrum() {
    if (!drum.active) return;
    var nav = navHeight();
    drum.stageH = window.innerHeight - nav;
    var vw = window.innerWidth;
    var w = vw < 768 ? Math.min(vw * 0.72, 19 * 16) : vw < 1024 ? Math.min(vw * 0.4, 20 * 16) : Math.min(vw * 0.26, 21 * 16);
    var avail = viewport.clientHeight || drum.stageH * 0.75;
    w = Math.min(w, (avail * 0.92) / 1.42);
    drum.cardW = Math.max(180, w);
    section.style.setProperty('--card-w', drum.cardW.toFixed(1) + 'px');
    viewport.style.setProperty('--persp', (drum.cardW * DRUM_RADIUS * 3).toFixed(0) + 'px');
    track.style.height = (drum.stageH + (cards.length - 1) * drum.stageH * DRUM_STEP) + 'px';
    readTarget();
    renderDrum(drum.pos);
  }

  function readTarget() {
    drum.target = drumAngle(window.scrollY - pinStart(), drum.stageH, cards.length, DRUM_STEP);
  }

  function renderDrum(pos) {
    var front = Math.round(pos);
    for (var i = 0; i < cards.length; i++) {
      var p = drumPlace(i - pos, drum.cardW);
      var c = cards[i];
      c.style.transform = 'translate3d(' + p.x.toFixed(2) + 'px,0,' + p.z.toFixed(2) + 'px) rotateY(' + p.s.toFixed(4) + 'rad)';
      c.style.opacity = p.opacity.toFixed(3);
      // Opacity only (not visibility) so far cards' links stay keyboard-reachable.
      c.style.pointerEvents = p.opacity > 0 ? '' : 'none';
      c.style.setProperty('--shade', p.shade.toFixed(3));
      c.style.zIndex = String(100 - Math.round(Math.abs(i - pos) * 10));
    }
    if (front !== drum.front) {
      drum.front = front;
      cards.forEach(function (c, i) {
        var isFront = i === front;
        c.classList.toggle('is-front', isFront);
        c.setAttribute('aria-current', isFront ? 'true' : 'false');
      });
    }
  }

  function drumTick(now) {
    var dt = Math.min(0.064, (now - drum.last) / 1000 || 0.016);
    drum.last = now;
    drum.pos += (drum.target - drum.pos) * (1 - Math.exp(-STIFFNESS * dt));
    if (Math.abs(drum.target - drum.pos) < 0.0005) drum.pos = drum.target;
    renderDrum(drum.pos);
    if (drum.pos !== drum.target) {
      drum.raf = requestAnimationFrame(drumTick);
    } else {
      drum.raf = 0; // settled: sleep until the next scroll
    }
  }

  function wakeDrum() {
    if (drum.raf || drum.rollIn || !drum.active) return;
    drum.last = performance.now();
    drum.raf = requestAnimationFrame(drumTick);
  }

  function isPinned() {
    var start = pinStart();
    var end = start + (cards.length - 1) * drum.stageH * DRUM_STEP;
    var y = window.scrollY;
    return y >= start - 1 && y <= end + 1;
  }

  function scheduleSnap() {
    clearTimeout(drum.snapTimer);
    drum.snapTimer = setTimeout(function () {
      if (!drum.active || !isPinned()) return;
      var exact = drumAngle(window.scrollY - pinStart(), drum.stageH, cards.length, DRUM_STEP);
      var nearest = Math.round(exact);
      if (Math.abs(exact - nearest) < 0.01) return;
      goToCard(nearest);
    }, 140);
  }

  function goToCard(i) {
    drum.snapping = true;
    drum.snapTo = Math.round(scrollForIndex(i));
    window.scrollTo({ top: drum.snapTo, behavior: 'smooth' });
    // Fallback in case scrollend isn't supported.
    clearTimeout(drum.snapEnd);
    drum.snapEnd = setTimeout(endSnap, 900);
  }

  function endSnap() {
    if (!drum.snapping) return;
    drum.snapping = false;
    clearTimeout(drum.snapEnd);
    scheduleSnap(); // re-check in case the user scrolled during the snap
  }

  var onDrumScroll = rafThrottle(function () {
    if (!drum.active) return;
    readTarget();
    wakeDrum();
    if (drum.snapping) {
      if (Math.abs(window.scrollY - drum.snapTo) < 2) endSnap();
      return; // ignore scroll events caused by the snap itself
    }
    scheduleSnap();
  });

  function onCardClick(e) {
    var card = e.target.closest('.project');
    if (!card || card.classList.contains('is-front')) return;
    e.preventDefault();
    goToCard(cards.indexOf(card));
  }

  function onCardFocus(e) {
    var card = e.target.closest('.project');
    if (!card || card.classList.contains('is-front')) return;
    var i = cards.indexOf(card);
    // Jump straight there so the focused link is front and clickable.
    window.scrollTo({ top: Math.round(scrollForIndex(i)), behavior: 'instant' });
    readTarget();
    drum.pos = drum.target;
    renderDrum(drum.pos);
  }

  function revealDrum() {
    if (drum.revealed) return;
    drum.revealed = true;
    section.classList.add('is-revealed');
    var opts = { duration: 1100, easing: ROLL_EASE, fill: 'both' };
    var tilt = heading.animate([
      { transform: 'perspective(800px) rotateX(-80deg)', opacity: 0, filter: 'brightness(.35)' },
      { transform: 'perspective(800px) rotateX(0deg)', opacity: 1, filter: 'brightness(1)' }
    ], opts);
    // Roll the drum in from the side by animating the rendered position.
    var startOffset = -1.6;
    var t0 = performance.now();
    cancelAnimationFrame(drum.raf);
    drum.raf = 0;
    function roll(now) {
      var k = easeInOutCubic(clamp((now - t0) / 1100, 0, 1));
      readTarget();
      drum.pos = drum.target + startOffset * (1 - k);
      renderDrum(drum.pos);
      if (k < 1) drum.rollIn = requestAnimationFrame(roll);
      else { drum.rollIn = null; wakeDrum(); }
    }
    drum.rollIn = requestAnimationFrame(roll);
    tilt.onfinish = function () { tilt.cancel(); };
  }

  function enableDrum() {
    if (drum.active || !section || cards.length < 2) return;
    drum.active = true;
    section.classList.add('is-drum');
    cards.forEach(function (c) { c.style.willChange = 'transform, opacity'; });
    layoutDrum();
    drum.pos = drum.target;
    renderDrum(drum.pos);
    window.addEventListener('scroll', onDrumScroll, { passive: true });
    if ('onscrollend' in window) window.addEventListener('scrollend', endSnap);
    list.addEventListener('click', onCardClick);
    list.addEventListener('focusin', onCardFocus);

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) {
          io.disconnect();
          revealDrum();
        }
      }, { threshold: 0.25 });
      io.observe(stage);
    } else {
      revealDrum();
    }
  }

  function disableDrum() {
    if (!drum.active) return;
    drum.active = false;
    cancelAnimationFrame(drum.raf);
    if (drum.rollIn) cancelAnimationFrame(drum.rollIn);
    drum.raf = 0;
    clearTimeout(drum.snapTimer);
    window.removeEventListener('scroll', onDrumScroll);
    window.removeEventListener('scrollend', endSnap);
    list.removeEventListener('click', onCardClick);
    list.removeEventListener('focusin', onCardFocus);
    section.classList.remove('is-drum', 'is-revealed');
    track.style.height = '';
    cards.forEach(function (c) {
      ['transform', 'opacity', 'pointer-events', 'z-index', 'will-change', '--shade'].forEach(function (p) { c.style.removeProperty(p); });
      c.classList.remove('is-front');
      c.removeAttribute('aria-current');
    });
    drum.front = -1;
    drum.revealed = false;
  }

  function syncDrum() {
    if (reducedMotion()) disableDrum(); else enableDrum();
  }

  window.addEventListener('resize', rafThrottle(layoutDrum));
  if (reduceMQ.addEventListener) reduceMQ.addEventListener('change', syncDrum);

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  syncDrum();
  playIntro();
})();
