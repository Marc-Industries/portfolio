/**
 * Three.js persistent scene.
 * Loaded as ES module from /index.html.
 *
 * What it draws:
 *   - StarsBackdrop: 2800-point starfield, cool whites + occasional red dwarf.
 *   - Earth: procedural dark marble, crimson emissive, wireframe lat/long, 3 atmosphere shells.
 *   - WireframeSatellite: orbiting CubeSat-style structure, slow orbit, self-rotation.
 *   - HologramRings: 3 concentric torus rings at different axes and speeds.
 *   - OrbitTrails: 4 thin tori with oct/box/tetra satellite markers.
 *   - DataRibbon: 400-particle diagonal stream, sine-modulated flow.
 *   - ParticleField: 280 telemetry points, crimson/ember/amber mix.
 *
 * Behavior:
 *   - Canvas is dim while the user is on the hero, brightens after they scroll past.
 *   - Reduced-motion users see a static starfield.
 *   - On resize, the camera + renderer adapt.
 */

import * as THREE from 'three';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LOW_END = navigator.hardwareConcurrency <= 4;

// -------- Renderer / scene / camera --------
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: !LOW_END,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, LOW_END ? 1.25 : 1.75));
renderer.setClearColor(0x050000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 200);
camera.position.set(0, 0, 9);

// -------- Lights --------
scene.add(new THREE.AmbientLight(0x5A1A1A, 0.4));
const dirA = new THREE.DirectionalLight(0xFF5C3A, 0.85);
dirA.position.set(6, 4, 5);
scene.add(dirA);
const dirB = new THREE.DirectionalLight(0xD43F3F, 0.4);
dirB.position.set(-5, -2, -3);
scene.add(dirB);
const ptLight = new THREE.PointLight(0x8B0F0F, 0.6, 20);
ptLight.position.set(0, -8, 3);
scene.add(ptLight);

// =============================================================================
// STARS
// =============================================================================
function buildStars() {
  const N = LOW_END ? 1200 : 2800;
  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 30 + Math.random() * 80;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const warm = Math.random() < 0.08;
    if (warm) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.45; colors[i * 3 + 2] = 0.30;
    } else {
      const c = 0.7 + Math.random() * 0.3;
      colors[i * 3] = c; colors[i * 3 + 1] = c; colors[i * 3 + 2] = c + 0.04;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.08, vertexColors: true, transparent: true,
    opacity: 0.85, sizeAttenuation: true, depthWrite: false,
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  if (!REDUCED) {
    const tick = (_, dt) => { pts.rotation.y += dt * 0.005; };
    animators.push(tick);
  }
  return pts;
}

// =============================================================================
// EARTH (procedural — no external textures)
// =============================================================================
function buildEarth() {
  const group = new THREE.Group();
  group.position.set(0, 0, 6);

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0E0202, emissive: 0x5A1A1A, emissiveIntensity: 0.65,
      roughness: 0.85, metalness: 0.25, flatShading: false,
    })
  );
  group.add(body);

  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(1.605, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0xD43F3F, wireframe: true, transparent: true, opacity: 0.32 })
  );
  group.add(wire);

  // Atmosphere shells
  const shells = [
    { r: 1.75, color: 0xFF5C3A, opacity: 0.10 },
    { r: 1.88, color: 0xD43F3F, opacity: 0.06 },
    { r: 2.05, color: 0x8B0F0F, opacity: 0.04 },
  ];
  for (const s of shells) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(s.r, 48, 48),
      new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: s.opacity, side: THREE.BackSide })
    );
    group.add(m);
  }

  scene.add(group);
  if (!REDUCED) {
    const tick = (_, dt) => {
      group.rotation.y += dt * 0.04;
    };
    animators.push(tick);
  }
  return group;
}

// =============================================================================
// WIREFRAME SATELLITE
// =============================================================================
function buildSatellite() {
  const group = new THREE.Group();
  // bus
  const bus = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.9, 0.9),
    new THREE.MeshBasicMaterial({ color: 0xD43F3F, wireframe: true, transparent: true, opacity: 0.95 })
  );
  group.add(bus);
  const busGhost = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.92, 0.92),
    new THREE.MeshBasicMaterial({ color: 0xFF5C3A, wireframe: true, transparent: true, opacity: 0.4 })
  );
  group.add(busGhost);

  // solar panels
  for (const side of [-1, 1]) {
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.7, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xD43F3F, wireframe: true, transparent: true, opacity: 0.7 })
    );
    panel.position.set(side * 1.05, 0, 0);
    group.add(panel);
    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(1.15, 0.65, 4, 3),
      new THREE.MeshBasicMaterial({ color: 0xFF5C3A, wireframe: true, transparent: true, opacity: 0.5 })
    );
    grid.position.set(side * 1.05, 0, 0.03);
    group.add(grid);
  }

  // antenna
  const ant = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6),
    new THREE.MeshBasicMaterial({ color: 0xF2D9D9 })
  );
  ant.position.set(0, 0.6, 0);
  group.add(ant);
  const antTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 6, 6),
    new THREE.MeshBasicMaterial({ color: 0xD43F3F })
  );
  antTip.position.set(0, 0.95, 0);
  group.add(antTip);

  // vertex points
  const verts = [
    [-0.45, -0.45, -0.45], [0.45, -0.45, -0.45],
    [-0.45,  0.45, -0.45], [0.45,  0.45, -0.45],
    [-0.45, -0.45,  0.45], [0.45, -0.45,  0.45],
    [-0.45,  0.45,  0.45], [0.45,  0.45,  0.45],
  ];
  for (const v of verts) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xFF8A5C })
    );
    p.position.set(v[0], v[1], v[2]);
    group.add(p);
  }

  scene.add(group);
  if (!REDUCED) {
    const tick = (state) => {
      const t = state.clock.elapsedTime;
      group.position.x = Math.sin(t * 0.18) * 4.5;
      group.position.y = Math.cos(t * 0.12) * 1.8;
      group.position.z = Math.sin(t * 0.06) * 0.6 + 0.5;
      group.rotation.x = t * 0.15;
      group.rotation.y = t * 0.22;
      group.rotation.z = t * 0.08;
    };
    animators.push(tick);
  }
  return group;
}

// =============================================================================
// HOLOGRAM RINGS
// =============================================================================
function buildRings() {
  const rings = [];
  const configs = [
    { r: 5.2, t: 0.012, color: 0xD43F3F, opacity: 0.55, axis: 'all',   speed: 0.10 },
    { r: 6.0, t: 0.010, color: 0x8B0F0F, opacity: 0.40, axis: 'flip',  speed: 0.08 },
    { r: 7.0, t: 0.008, color: 0xFF8A5C, opacity: 0.20, axis: 'z',     speed: 0.12 },
  ];
  for (const c of configs) {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(c.r, c.t, 8, 96),
      new THREE.MeshBasicMaterial({ color: c.color, transparent: true, opacity: c.opacity })
    );
    g.add(ring);
    if (c.r === 5.2) {
      const inner = new THREE.Mesh(
        new THREE.TorusGeometry(c.r + 0.2, 0.006, 8, 96),
        new THREE.MeshBasicMaterial({ color: 0xFF5C3A, transparent: true, opacity: 0.3 })
      );
      inner.rotation.x = Math.PI / 2;
      g.add(inner);
    }
    if (c.axis === 'flip') g.rotation.x = Math.PI / 3;
    if (c.axis === 'z')    g.rotation.z = Math.PI / 4;
    scene.add(g);
    rings.push({ group: g, speed: c.speed, axis: c.axis });
  }
  if (!REDUCED) {
    const tick = (state) => {
      const t = state.clock.elapsedTime;
      rings.forEach((r, i) => {
        const s = r.speed * (i % 2 === 0 ? 1 : -1);
        if (r.axis === 'z') {
          r.group.rotation.y -= s * 0.6;
          r.group.rotation.z -= s * 0.4;
        } else if (r.axis === 'flip') {
          r.group.rotation.x -= s * 0.8;
          r.group.rotation.z += s * 0.5;
        } else {
          r.group.rotation.x = t * 0.10;
          r.group.rotation.y = t * 0.06;
        }
      });
    };
    animators.push(tick);
  }
}

// =============================================================================
// ORBIT TRAILS
// =============================================================================
function buildOrbits() {
  const orbits = [
    { radius: 2.3, tilt:  0.0, speed: 0.45, color: 0xD43F3F, offset: 0.0, marker: 'oct'   },
    { radius: 2.8, tilt:  0.4, speed: 0.32, color: 0xFF5C3A, offset: 1.0, marker: 'box'   },
    { radius: 3.4, tilt: -0.3, speed: 0.24, color: 0xF2B441, offset: 2.0, marker: 'tetra' },
    { radius: 4.1, tilt:  0.15, speed: 0.18, color: 0xFF8A5C, offset: 3.0, marker: 'oct'   },
  ];
  const group = new THREE.Group();
  group.position.set(0, 0, 6);
  scene.add(group);

  for (const o of orbits) {
    const og = new THREE.Group();
    og.rotation.x = o.tilt;
    const trail = new THREE.Mesh(
      new THREE.TorusGeometry(o.radius, 0.005, 8, 256),
      new THREE.MeshBasicMaterial({ color: o.color, transparent: true, opacity: 0.22 })
    );
    trail.rotation.x = Math.PI / 2;
    og.add(trail);

    const sat = new THREE.Mesh(
      o.marker === 'oct'   ? new THREE.OctahedronGeometry(0.045, 0)
    : o.marker === 'box'   ? new THREE.BoxGeometry(0.07, 0.07, 0.07)
                          : new THREE.TetrahedronGeometry(0.07, 0),
      new THREE.MeshBasicMaterial({ color: o.color })
    );
    og.add(sat);
    group.add(og);

    if (!REDUCED) {
      const a0 = { t: Math.random() * 10 + o.offset };
      animators.push((_, dt) => {
        a0.t += dt * o.speed;
        const a = a0.t;
        sat.position.set(
          Math.cos(a) * o.radius,
          Math.sin(o.tilt) * Math.sin(a) * o.radius,
          Math.sin(a) * o.radius,
        );
      });
    }
  }
}

// =============================================================================
// DATA RIBBON
// =============================================================================
function buildRibbon() {
  const N = LOW_END ? 200 : 400;
  const positions = new Float32Array(N * 3);
  const baseY = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / N;
    positions[i * 3]     = (t - 0.5) * 18;
    positions[i * 3 + 1] = Math.sin(t * Math.PI) * 1.5 - 4;
    positions[i * 3 + 2] = Math.cos(t * Math.PI) * 0.5;
    baseY[i] = positions[i * 3 + 1];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xFF5C3A, size: 0.045, sizeAttenuation: true,
    transparent: true, opacity: 0.85, depthWrite: false,
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  if (!REDUCED) {
    animators.push((state) => {
      const t = state.clock.elapsedTime;
      const arr = geo.attributes.position.array;
      for (let i = 0; i < baseY.length; i++) {
        arr[i * 3]     = ((i / baseY.length) - 0.5) * 18 + Math.sin(t * 0.4 + i * 0.05) * 0.4;
        arr[i * 3 + 1] = baseY[i] + Math.cos(t * 0.3 + i * 0.03) * 0.3;
      }
      geo.attributes.position.needsUpdate = true;
    });
  }
}

// =============================================================================
// PARTICLE FIELD (telemetry dust)
// =============================================================================
function buildParticles() {
  const N = LOW_END ? 140 : 280;
  const positions = new Float32Array(N * 3);
  const colors = new Float32Array(N * 3);
  const speeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const r = 6 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    speeds[i] = 0.02 + Math.random() * 0.06;
    const r0 = Math.random();
    if (r0 < 0.70)      { colors[i*3]=0.83; colors[i*3+1]=0.25; colors[i*3+2]=0.25; }
    else if (r0 < 0.95) { colors[i*3]=1.00; colors[i*3+1]=0.54; colors[i*3+2]=0.36; }
    else                { colors[i*3]=0.95; colors[i*3+1]=0.71; colors[i*3+2]=0.26; }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.035, vertexColors: true, transparent: true, opacity: 0.75,
    sizeAttenuation: true, depthWrite: false,
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  if (!REDUCED) {
    animators.push((_, dt) => {
      const arr = geo.attributes.position.array;
      for (let i = 0; i < speeds.length; i++) {
        arr[i*3+1] -= speeds[i] * dt;
        if (arr[i*3+1] < -10) arr[i*3+1] = 10;
      }
      geo.attributes.position.needsUpdate = true;
    });
  }
}

// =============================================================================
// BUILD + ANIMATION LOOP
// =============================================================================
const animators = [];
if (!REDUCED) {
  buildStars();
  buildEarth();
  buildSatellite();
  buildRings();
  buildOrbits();
  buildRibbon();
  buildParticles();
} else {
  // Reduced motion: only the static starfield, dimmer.
  buildStars();
  const stars = scene.children.find(o => o.isPoints);
  if (stars && stars.material) stars.material.opacity = 0.4;
}

const clock = new THREE.Clock();

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

function tick() {
  if (!REDUCED) {
    const t = clock.getDelta();
    const state = { clock: { elapsedTime: clock.elapsedTime } };
    for (const a of animators) a(state, t);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// =============================================================================
// CANVAS DIMMING — dim during hero, brighten after scroll past
// =============================================================================
let dimmed = true;
const updateCanvasDim = () => {
  const scrollY = window.scrollY;
  const shouldDim = scrollY < window.innerHeight * 0.6;
  if (shouldDim !== dimmed) {
    dimmed = shouldDim;
    canvas.classList.toggle('dim', dimmed);
  }
};
addEventListener('scroll', updateCanvasDim, { passive: true });
updateCanvasDim();

// Expose for app.js if it ever needs to coordinate
window.__threeScene = { scene, camera, renderer };
