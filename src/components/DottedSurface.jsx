import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Radar Pulse Background
 * ──────────────────────
 * Glowing rings expand outward from the screen center.
 * As each ring passes through a dot, the dot flashes bright cyan then fades.
 * Multiple rings coexist, creating a continuous rolling activation effect.
 */
export default function DottedSurface({ style = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use full viewport dimensions (component is position:fixed inset:0)
    let W = window.innerWidth;
    let H = window.innerHeight;

    /* ── Orthographic camera for flat 2D world ── */
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -W / 2, W / 2, H / 2, -H / 2, -1, 1
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Dot grid ── */
    const SPACING = 52; // pixels between dots
    const COLS = Math.ceil(W / SPACING) + 1;
    const ROWS = Math.ceil(H / SPACING) + 1;
    const DOT_COUNT = COLS * ROWS;

    const positions = new Float32Array(DOT_COUNT * 3);
    const colors = new Float32Array(DOT_COUNT * 3);
    const brightness = new Float32Array(DOT_COUNT).fill(0);
    // Pre-compute each dot's distance from screen center
    const dotDist = new Float32Array(DOT_COUNT);

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * SPACING - W / 2;
        const y = r * SPACING - H / 2;
        positions[idx * 3]     = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = 0;
        dotDist[idx] = Math.sqrt(x * x + y * y);
        // Base dim color: very dark teal #0a1a22
        colors[idx * 3]     = 0.04;
        colors[idx * 3 + 1] = 0.10;
        colors[idx * 3 + 2] = 0.14;
        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geo.setAttribute('color', colorAttr);

    const dotMat = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: false,
    });
    scene.add(new THREE.Points(geo, dotMat));

    /* ── Ring factory ──
       Each ring is a unit circle (radius=1) THREE.LineLoop.
       We expand it via mesh.scale each frame.
    ── */
    const MAX_RADIUS = Math.hypot(W / 2, H / 2) + 80;
    const RING_SPEED = 160;      // px/s — feels deliberate, not rushed
    const RING_INTERVAL = 2600;  // ms between new rings
    const HIT_BAND = SPACING * 0.6; // radius window for dot activation

    // Build a unit circle geometry (reused for all rings)
    const SEGMENTS = 180;
    const circlePositions = new Float32Array((SEGMENTS + 1) * 3);
    for (let i = 0; i <= SEGMENTS; i++) {
      const a = (i / SEGMENTS) * Math.PI * 2;
      circlePositions[i * 3]     = Math.cos(a);
      circlePositions[i * 3 + 1] = Math.sin(a);
      circlePositions[i * 3 + 2] = 0;
    }
    const unitCircleGeo = new THREE.BufferGeometry();
    unitCircleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(circlePositions, 3)
    );

    const activeRings = []; // { mesh, mat, radius }

    function spawnRing() {
      const mat = new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.55,
      });
      const mesh = new THREE.LineLoop(unitCircleGeo, mat);
      mesh.scale.set(1, 1, 1);
      scene.add(mesh);
      activeRings.push({ mesh, mat, radius: 0 });
    }

    spawnRing(); // fire immediately on mount
    const ringTimer = setInterval(spawnRing, RING_INTERVAL);

    /* ── Animation loop ── */
    let lastTime = performance.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms
      lastTime = now;

      /* Update each ring */
      for (let ri = activeRings.length - 1; ri >= 0; ri--) {
        const ring = activeRings[ri];
        ring.radius += RING_SPEED * dt;

        // Scale the mesh to match radius
        ring.mesh.scale.set(ring.radius, ring.radius, 1);

        // Fade ring as it travels outward
        const progress = ring.radius / MAX_RADIUS;
        ring.mat.opacity = Math.max(0, 0.55 * (1 - progress * 1.1));

        // Activate dots that the ring is currently passing through
        for (let di = 0; di < DOT_COUNT; di++) {
          const diff = Math.abs(ring.radius - dotDist[di]);
          if (diff < HIT_BAND && brightness[di] < 0.15) {
            // Slight stagger: dots closer to the ring center hit first
            brightness[di] = 0.85 + Math.random() * 0.15; // 0.85–1.0
          }
        }

        // Kill ring when fully off screen
        if (ring.radius > MAX_RADIUS) {
          scene.remove(ring.mesh);
          ring.mat.dispose();
          activeRings.splice(ri, 1);
        }
      }

      /* Decay dot brightness and write vertex colors */
      for (let di = 0; di < DOT_COUNT; di++) {
        if (brightness[di] > 0) {
          brightness[di] = Math.max(0, brightness[di] - 0.018);
        }
        const b = brightness[di];

        // Lerp: dim teal (#0a1a24) → activated cyan (#22d3ee)
        colorAttr.setXYZ(
          di,
          0.04 + b * (0.133 - 0.04),  // r: 0.04 → 0.133
          0.10 + b * (0.827 - 0.10),  // g: 0.10 → 0.827
          0.14 + b * (0.933 - 0.14)   // b: 0.14 → 0.933
        );
      }
      colorAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    /* ── Resize ── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.left   = -W / 2;
      camera.right  =  W / 2;
      camera.top    =  H / 2;
      camera.bottom = -H / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener('resize', onResize);
      clearInterval(ringTimer);
      cancelAnimationFrame(animId);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      unitCircleGeo.dispose();
      dotMat.dispose();
      renderer.dispose();

      try { container.removeChild(renderer.domElement); } catch (_) {}
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
