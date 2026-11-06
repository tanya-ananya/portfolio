import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

// Defined outside the component so the reference stays stable between renders
const DEFAULT_PALETTE = [173, 173, 173, 43, 27];

export default function ShiftBackground({
  palette = DEFAULT_PALETTE,
  saturation = 60,
  lightness = 76,
  maxAlpha = 0.55,
  backgroundColor = 'hsla(40,20%,97%,1)',
  blobCount = 9,
  speed = 1, // 0.5 = slower, 2 = faster
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const noise3D = createNoise3D();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Each blob keeps its own seed (path), color, and size for its whole life
    const blobs = Array.from({ length: blobCount }, (_, i) => ({
      seed: i * 37.7 + Math.random() * 100,
      hue: palette[i % palette.length],
      size: 0.7 + Math.random() * 0.6,
    }));

    let frameId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function render(now) {
      const w = canvas.width;
      const h = canvas.height;
      const t = now * 0.000036 * speed; // time axis for the noise

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        // Smooth noise gives curvy, never-repeating paths
        const x = w * (0.5 + 0.55 * noise3D(b.seed, 0, t));
        const y = h * (0.5 + 0.7 * noise3D(b.seed, 50, t));
        // Slow "breathing" so blobs swell and shrink as they move
        const r = ((w + h) / 2) * 0.3 * b.size * (1 + 0.15 * noise3D(b.seed, 100, t * 1.5));

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `hsla(${b.hue},${saturation}%,${lightness}%,${maxAlpha})`);
        g.addColorStop(0.55, `hsla(${b.hue},${saturation}%,${lightness}%,${maxAlpha * 0.6})`);
        g.addColorStop(1, `hsla(${b.hue},${saturation}%,${lightness}%,0)`);

        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
    }

    function loop(now) {
      render(now);
      frameId = requestAnimationFrame(loop);
    }

    resize();
    if (prefersReduced) {
      render(0); // one static frame, no animation
    } else {
      frameId = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (prefersReduced) render(0);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
    };
  }, [palette, saturation, lightness, maxAlpha, backgroundColor, blobCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}

/* import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const TAU = Math.PI * 2;
const rand = (n) => n * Math.random();
const fadeInOut = (t, m) => {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
};

// Defined outside the component so it keeps the same reference between renders
const DEFAULT_PALETTE = [173, 173, 173, 43, 27];

export default function ShiftBackground({
  palette = DEFAULT_PALETTE,
  saturation = 55,
  lightness = 78,
  maxAlpha = 0.3,
  backgroundColor = 'hsla(40,20%,97%,1)',
  circleCount = 60,
  blur = 60,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasB = canvasRef.current;
    const ctxB = canvasB.getContext('2d');
    const canvasA = document.createElement('canvas');
    const ctxA = canvasA.getContext('2d');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const circlePropCount = 8;
    const circlePropsLength = circleCount * circlePropCount;
    const baseSpeed = 0.3;
    const rangeSpeed = 0.3;
    const baseTTL = 400;
    const rangeTTL = 400;
    const baseRadius = 100;
    const rangeRadius = 200;
    const hueVariation = 12;
    const xOff = 0.0015;
    const yOff = 0.0015;

    const noise3D = createNoise3D();
    const circleProps = new Float32Array(circlePropsLength);
    let frameId;

    function resize() {
      const { innerWidth, innerHeight } = window;
      canvasA.width = canvasB.width = innerWidth;
      canvasA.height = canvasB.height = innerHeight;
    }

    function initCircle(i) {
      const x = rand(canvasA.width);
      const y = rand(canvasA.height);
      const n = noise3D(x * xOff, y * yOff, 0);
      const base = palette[Math.floor(rand(palette.length))];
      const t = rand(TAU);
      const speed = baseSpeed + rand(rangeSpeed);
      circleProps.set(
        [
          x,
          y,
          speed * Math.cos(t),
          speed * Math.sin(t),
          0, // life
          baseTTL + rand(rangeTTL),
          baseRadius + rand(rangeRadius),
          base + n * hueVariation, // hue (8th value)
        ],
        i
      );
    }

    function drawCircle(x, y, life, ttl, radius, hue) {
      ctxA.save();
      ctxA.fillStyle = `hsla(${hue},${saturation}%,${lightness}%,${fadeInOut(life, ttl) * maxAlpha})`;
      ctxA.beginPath();
      ctxA.arc(x, y, radius, 0, TAU);
      ctxA.fill();
      ctxA.closePath();
      ctxA.restore();
    }

    function updateCircle(i) {
      const [x, y, vx, vy, life, ttl, radius, hue] = circleProps.subarray(i, i + circlePropCount);

      drawCircle(x, y, life, ttl, radius, hue);

      circleProps[i] = x + vx;
      circleProps[i + 1] = y + vy;
      circleProps[i + 4] = life + 1;

      const outOfBounds =
        x < -radius ||
        x > canvasA.width + radius ||
        y < -radius ||
        y > canvasA.height + radius;

      if (outOfBounds || life + 1 > ttl) initCircle(i);
    }

    function draw() {
      ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
      ctxB.fillStyle = backgroundColor;
      ctxB.fillRect(0, 0, canvasB.width, canvasB.height);

      for (let i = 0; i < circlePropsLength; i += circlePropCount) updateCircle(i);

      ctxB.save();
      ctxB.filter = `blur(${blur}px)`;
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();

      frameId = requestAnimationFrame(draw);
    }

    resize();
    for (let i = 0; i < circlePropsLength; i += circlePropCount) initCircle(i);

    if (prefersReduced) {
      ctxB.fillStyle = backgroundColor;
      ctxB.fillRect(0, 0, canvasB.width, canvasB.height);
    } else {
      draw();
    }

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [palette, saturation, lightness, maxAlpha, backgroundColor, circleCount, blur]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
} */