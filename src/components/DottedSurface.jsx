import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * DottedSurface — animated Three.js sine-wave particle grid.
 * Always dark-theme (cyan/indigo tinted dots to match the Noman ai palette).
 * Positioned absolutely behind all content via pointer-events:none.
 */
export default function DottedSurface({ style = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const SEPARATION = 150;
    const AMOUNTX = 38;
    const AMOUNTY = 55;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    // Transparent — our dark page background shows through
    scene.fog = new THREE.Fog(0x050712, 3000, 9000);

    const camera = new THREE.PerspectiveCamera(
      58,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      1,
      10000
    );
    camera.position.set(0, 380, 1280);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.setClearColor(0x000000, 0); // fully transparent clear
    containerRef.current.appendChild(renderer.domElement);

    /* ── Geometry ── */
    const positions = [];
    // Two-tone color palette matching var(--accent-primary) cyan + indigo
    // We'll use vertex colors and alternate between a dim cyan and dim indigo
    const colors = [];

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        positions.push(x, 0, z);

        // Gradient: cyan (0,188,212) near top-left → indigo (99,102,241) near bottom-right
        const t = (ix / AMOUNTX + iy / AMOUNTY) / 2;
        // r: lerp 0 → 0.39,  g: lerp 0.73 → 0.40,  b: lerp 0.83 → 0.95
        const r = 0 + t * 0.39;
        const g = 0.73 - t * 0.33;
        const b = 0.83 + t * 0.12;
        colors.push(r, g, b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 7,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ── Animation ── */
    let count = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Y = sine wave combo for ripple feel
          posArr[i * 3 + 1] =
            Math.sin((ix + count) * 0.28) * 55 +
            Math.sin((iy + count) * 0.48) * 45;
          i++;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.075; // slightly slower = more premium/chill feel
    };

    /* ── Resize ── */
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    animate();

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();

      if (containerRef.current && renderer.domElement) {
        try { containerRef.current.removeChild(renderer.domElement); } catch (_) {}
      }
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
