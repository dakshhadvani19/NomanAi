import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Galaxy Vortex Background (Concept 3)
 * ──────────────────────────────────────
 * Thousands of dots orbit an off-center gravitational core.
 * Inner dots move fast and glow cyan; outer dots move slow and dim to indigo.
 * Occasional "shooting stars" streak across the sky.
 */
export default function DottedSurface({ style = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050712, 0.0006);

    const camera = new THREE.PerspectiveCamera(60, W / H, 1, 4000);
    // Look down from above, but we will tilt the vortex itself
    camera.position.set(0, 0, 800);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Galaxy Vortex Particles ── */
    const DOT_COUNT = 3000;
    const positions = new Float32Array(DOT_COUNT * 3);
    const colors = new Float32Array(DOT_COUNT * 3);
    const sizes = new Float32Array(DOT_COUNT);

    // Per-particle orbital state
    const angles = new Float32Array(DOT_COUNT);
    const radii = new Float32Array(DOT_COUNT);
    const speeds = new Float32Array(DOT_COUNT);

    // The gravitational core (slightly off-center to the right & top)
    const CORE_X = W * 0.15; 
    const CORE_Y = H * 0.1;

    const MAX_RADIUS = Math.max(W, H) * 1.2;

    for (let i = 0; i < DOT_COUNT; i++) {
      // Distribution: heavy concentration near the center using x^3
      const r = Math.pow(Math.random(), 3) * MAX_RADIUS + 30;
      const theta = Math.random() * Math.PI * 2;

      radii[i] = r;
      angles[i] = theta;

      // Orbital speed: Kepler-inspired (slower as r increases)
      // Base speed + slight random variation so dots in same orbit drift apart
      speeds[i] = (Math.random() * 0.4 + 0.8) * (200 / Math.pow(r, 1.15));

      // Color mapping: Inner = Cyan (#00BCD4), Outer = Dim Indigo (#4F46E5)
      // Normalize radius for color mixing
      const t = Math.min(1, r / (MAX_RADIUS * 0.5));
      
      // Cyan RGB: 0.0, 0.74, 0.83
      // Indigo RGB: 0.31, 0.27, 0.90
      // Dim Indigo RGB: 0.15, 0.12, 0.45
      
      const rCol = 0.00 + t * 0.15;
      const gCol = 0.74 - t * 0.62;
      const bCol = 0.83 - t * 0.38;

      colors[i * 3]     = rCol;
      colors[i * 3 + 1] = gCol;
      colors[i * 3 + 2] = bCol;

      // Size mapping: Inner = larger, Outer = tiny
      sizes[i] = Math.max(1.0, 4.0 - t * 3.0);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader for circular, soft-edged dots
    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (1200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // Circular particle mask
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          
          // Soft glowing edge
          float alpha = smoothstep(0.5, 0.1, ll);
          gl_FragColor = vec4(vColor, alpha * 0.85); // 0.85 global opacity
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending, // Makes overlapping dots glow brighter
    });

    const vortex = new THREE.Points(geo, mat);
    
    // Tilt the vortex back slightly for a 3D perspective
    vortex.rotation.x = -0.25;
    vortex.rotation.y = 0.15;
    scene.add(vortex);

    /* ── Shooting Stars ── */
    const STAR_COUNT = 4; // A cluster of 4 dots forming a streak
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    for(let i = 0; i < STAR_COUNT * 3; i += 3) {
       starCol[i] = 0.5; starCol[i+1] = 1.0; starCol[i+2] = 1.0; // bright cyan-white
    }
    
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    
    const starMat = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    let starActive = false;
    let starProgress = 0;
    let starStartX = 0, starStartY = 0;
    let starEndX = 0, starEndY = 0;
    let starTimer;
    
    function triggerShootingStar() {
      starActive = true;
      starProgress = 0;
      starMat.opacity = 0.9;
      
      // Randomize trajectory
      const angle = Math.random() * Math.PI * 2;
      const distance = W + 400;
      
      starStartX = Math.cos(angle) * distance;
      starStartY = Math.sin(angle) * distance;
      starEndX = -Math.cos(angle) * distance;
      starEndY = -Math.sin(angle) * distance;
      
      // Schedule next star
      starTimer = setTimeout(triggerShootingStar, 3000 + Math.random() * 8000);
    }
    starTimer = setTimeout(triggerShootingStar, 2000);

    /* ── Animation Loop ── */
    let lastTime = performance.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // 1. Update Vortex Particles
      const posArr = geo.attributes.position.array;
      for (let i = 0; i < DOT_COUNT; i++) {
        angles[i] += speeds[i] * dt;
        
        // Add a slow, undulating Z-wave so the galaxy isn't perfectly flat
        const zWave = Math.sin(radii[i] * 0.015 - now * 0.001) * 35;

        posArr[i * 3]     = CORE_X + radii[i] * Math.cos(angles[i]);
        posArr[i * 3 + 1] = CORE_Y + radii[i] * Math.sin(angles[i]);
        posArr[i * 3 + 2] = zWave;
      }
      geo.attributes.position.needsUpdate = true;

      // Slowly rotate the entire galaxy
      vortex.rotation.z -= 0.02 * dt;

      // 2. Update Shooting Star
      if (starActive) {
        starProgress += dt * 0.7; // star speed
        if (starProgress >= 1) {
          starActive = false;
          starMat.opacity = 0;
        } else {
          const sPos = starGeo.attributes.position.array;
          const currentX = starStartX + (starEndX - starStartX) * starProgress;
          const currentY = starStartY + (starEndY - starStartY) * starProgress;
          
          // Spread the cluster out along the trajectory to form a streak
          const dx = (starEndX - starStartX) * 0.01;
          const dy = (starEndY - starStartY) * 0.01;
          
          for(let i = 0; i < STAR_COUNT; i++) {
             sPos[i * 3]     = currentX - (dx * i * 1.5);
             sPos[i * 3 + 1] = currentY - (dy * i * 1.5);
             sPos[i * 3 + 2] = 200; // float above the galaxy
          }
          starGeo.attributes.position.needsUpdate = true;
          
          // Fade out near the end of the trajectory
          if (starProgress > 0.8) {
             starMat.opacity = 0.9 * (1 - (starProgress - 0.8) * 5);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    /* ── Resize Handler ── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(starTimer);
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
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
