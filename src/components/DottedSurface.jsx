import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cursor Magnetic Force Field Background (Concept 2 - Refined)
 * ──────────────────────────────────────────────────────────
 * A calm, premium dot grid that gently repels from the user's cursor.
 * Uses spring physics for a buttery smooth, liquid-like snap back.
 * Completely non-distracting: dim colors, slow idle wave, smooth interactions.
 */
export default function DottedSurface({ style = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    /* ── Scene & Orthographic Camera ── */
    const scene = new THREE.Scene();
    
    // Orthographic camera makes mapping mouse pixels to 3D world pixels 1:1
    const camera = new THREE.OrthographicCamera(-W/2, W/2, H/2, -H/2, -1000, 1000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0); // Transparent to show site background
    container.appendChild(renderer.domElement);

    /* ── Dot Grid Setup ── */
    const SPACING = 45; // Pixels between dots
    const COLS = Math.ceil(W / SPACING) + 4; // Add padding to edges
    const ROWS = Math.ceil(H / SPACING) + 4;
    const DOT_COUNT = COLS * ROWS;

    const positions = new Float32Array(DOT_COUNT * 3);
    const colors = new Float32Array(DOT_COUNT * 3);
    
    // Physics State Arrays
    const basePositions = new Float32Array(DOT_COUNT * 2); // original X, Y
    const velocities = new Float32Array(DOT_COUNT * 2);    // current VX, VY
    // We add a subtle individual phase offset so the idle wave looks organic
    const phases = new Float32Array(DOT_COUNT);

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Center the grid
        const x = (c - COLS / 2) * SPACING;
        const y = (r - ROWS / 2) * SPACING;
        
        positions[idx * 3]     = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = 0;

        basePositions[idx * 2]     = x;
        basePositions[idx * 2 + 1] = y;
        
        velocities[idx * 2]     = 0;
        velocities[idx * 2 + 1] = 0;
        
        // Random phase for the idle Z-wave
        phases[idx] = Math.random() * Math.PI * 2;

        // Idle Color: Very dim indigo/teal (#111827 / #1f2937ish)
        // We will make them slightly brighter when pushed by the cursor
        colors[idx * 3]     = 0.07; // R
        colors[idx * 3 + 1] = 0.12; // G
        colors[idx * 3 + 2] = 0.18; // B

        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader for perfectly round dots with soft edges
    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 4.5; // Constant size in orthographic
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, ll);
          gl_FragColor = vec4(vColor, alpha * 0.6); // 0.6 opacity to remain subtle
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointsMesh = new THREE.Points(geo, mat);
    scene.add(pointsMesh);

    /* ── Mouse Tracking ── */
    const mouse = { x: -9999, y: -9999 };
    // Track if mouse is currently over the window
    let isMousePresent = false;

    const onMouseMove = (e) => {
      isMousePresent = true;
      // Map screen pixels to Orthographic world coordinates
      mouse.x = e.clientX - W / 2;
      mouse.y = -(e.clientY - H / 2);
    };
    
    const onMouseLeave = () => {
      isMousePresent = false;
      // Move mouse far away so physics naturally settle
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);

    /* ── Physics Constants ── */
    const SPRING_K = 0.04;      // How strongly dots want to return home
    const DAMPING = 0.82;       // Lower = more slippery/bouncy. 0.82 is premium liquid feel.
    const REPULSE_RADIUS = 220; // How far the cursor pushes dots
    const REPULSE_STRENGTH = 0.6; // How hard the cursor pushes

    /* ── Animation Loop ── */
    let animId;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.015; // Speed of the idle wave

      const posArr = geo.attributes.position.array;
      const colArr = geo.attributes.color.array;

      for (let i = 0; i < DOT_COUNT; i++) {
        const p3 = i * 3;
        const p2 = i * 2;

        const bx = basePositions[p2];
        const by = basePositions[p2 + 1];
        
        let cx = posArr[p3];
        let cy = posArr[p3 + 1];
        let vx = velocities[p2];
        let vy = velocities[p2 + 1];

        // 1. Spring force to pull back to base position
        let fx = (bx - cx) * SPRING_K;
        let fy = (by - cy) * SPRING_K;

        // 2. Repulsion force from mouse
        if (isMousePresent) {
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = REPULSE_RADIUS * REPULSE_RADIUS;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            // Stronger push when closer to cursor
            const force = (REPULSE_RADIUS - dist) * REPULSE_STRENGTH;
            // Prevent division by zero
            if (dist > 0.1) {
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          }
        }

        // Apply forces to velocity, then damping
        vx = (vx + fx) * DAMPING;
        vy = (vy + fy) * DAMPING;

        // Update current position
        cx += vx;
        cy += vy;

        velocities[p2]     = vx;
        velocities[p2 + 1] = vy;

        posArr[p3]     = cx;
        posArr[p3 + 1] = cy;
        
        // 3. Idle Z-Wave (Subtle breathing effect)
        // We use the base positions so the wave structure stays intact even when dots are pushed
        posArr[p3 + 2] = Math.sin(bx * 0.01 + time) * 15 + Math.sin(by * 0.015 + time * 1.2) * 15;

        // 4. Dynamic Color (Glow when displaced)
        // Measure how far the dot is from its home
        const dispX = cx - bx;
        const dispY = cy - by;
        const displacement = Math.sqrt(dispX * dispX + dispY * dispY);
        
        // Max glow at 50px displacement
        const intensity = Math.min(1.0, displacement / 50.0);
        
        // Base color: Dim Indigo (0.07, 0.12, 0.18)
        // Glow color: Bright Cyan (0.00, 0.85, 1.00)
        colArr[p3]     = 0.07 - intensity * 0.07; 
        colArr[p3 + 1] = 0.12 + intensity * 0.73;
        colArr[p3 + 2] = 0.18 + intensity * 0.82;
      }

      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    /* ── Resize Handler ── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      
      camera.left = -W/2;
      camera.right = W/2;
      camera.top = H/2;
      camera.bottom = -H/2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
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
        pointerEvents: 'none', // Crucial: lets mouse events pass through to buttons/links!
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
