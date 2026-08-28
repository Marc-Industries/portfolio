/**
 * Project pages runtime.
 * Loaded from /projects/bepi.html and /projects/albasat.html.
 *
 * Owns:
 *   - Video loader: plays hero1-clean.mp4 once on entry, then crossfades
 *     the page in. ESC or click on the skip button jumps immediately.
 *   - Tilt-card effect: cards inclinate toward the mouse pointer via 3D
 *     transforms. Persisted for touch devices as a static look.
 *   - Footer year.
 */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// =============================================================================
// LOADER
// =============================================================================
function setupLoader() {
  const loader  = $('#loader');
  const video   = $('#loader-video');
  const barFill = $('#loader-bar-fill');
  const timer   = $('#loader-time');
  const skipBtn = $('#loader-skip');

  if (!loader || !video) {
    document.body.classList.add('is-ready');
    return;
  }

  // Reduced-motion users skip straight to the page.
  if (REDUCED) {
    finishLoader();
    return;
  }

  const fmt = (sec) => {
    sec = Math.max(0, Math.floor(sec));
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const tickProgress = () => {
    if (!video.duration || !isFinite(video.duration)) return;
    const pct = (video.currentTime / video.duration) * 100;
    if (barFill) barFill.style.width = pct.toFixed(2) + '%';
    if (timer)   timer.textContent   = fmt(video.currentTime);
  };

  const finishLoader = () => {
    if (loader.classList.contains('is-gone')) return;
    loader.classList.add('is-gone');
    document.body.classList.add('is-ready');
    try { video.pause(); } catch {}
  };

  const onTimeUpdate = () => tickProgress();
  const onEnded      = () => finishLoader();

  video.addEventListener('timeupdate', onTimeUpdate);
  video.addEventListener('ended',      onEnded);

  // Autoplay the loader video. It's muted + playsinline so this works
  // in every modern browser without a user gesture.
  video.play().catch(() => { finishLoader(); });

  // Skip controls
  const skip = () => finishLoader();
  skipBtn?.addEventListener('click', skip);
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') skip();
  }, { once: true });
}

// =============================================================================
// TILT CARD — pointer-driven 3D tilt
// =============================================================================
function setupTiltCards() {
  const cards = $$('.tilt-card');
  if (!cards.length) return;

  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
  if (isTouch || REDUCED) return;

  const MAX = 8; // degrees

  cards.forEach((card) => {
    let raf = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const apply = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      card.style.transform =
        `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = 0;
      }
    };

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width  - 0.5); // -0.5 .. 0.5
      const ny = ((e.clientY - r.top)  / r.height - 0.5);
      targetY = nx * (MAX * 2);   // rotateY follows horizontal pointer
      targetX = -ny * (MAX * 2);  // rotateX follows vertical pointer (inverted)
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}

// =============================================================================
// FOOTER YEAR
// =============================================================================
function setupFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// =============================================================================
// BOOT
// =============================================================================
function boot() {
  setupLoader();
  setupTiltCards();
  setupFooterYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}