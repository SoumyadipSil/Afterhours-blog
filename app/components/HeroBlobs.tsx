'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  pulse: number;
  maxAlpha: number;
  colorOffset: string;
}

export default function HeroBlobs() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars: Star[] = [];
    let animationFrameId: number;
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = [];
      const count = Math.min(Math.floor((width * height) / 20000), 75);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.4,
          speedY: -(Math.random() * 0.2 + 0.08),
          speedX: (Math.random() - 0.5) * 0.12,
          alpha: Math.random() * 0.5 + 0.15,
          pulse: Math.random() * 0.015 + 0.005,
          maxAlpha: Math.random() * 0.65 + 0.25,
          colorOffset: Math.random() > 0.4 ? 'rgba(230, 235, 255,' : 'rgba(192, 132, 252,',
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    resize();

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      for (const s of stars) {
        s.y += s.speedY;
        s.x += s.speedX;
        s.alpha += s.pulse;
        if (s.alpha >= s.maxAlpha || s.alpha <= 0.08) {
          s.pulse = -s.pulse;
        }

        // Subtle reaction to mouse proximity
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          s.x += (dx / dist) * force * 0.5;
          s.y += (dy / dist) * force * 0.5;
        }

        // Screen wrap
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.fillStyle = `${s.colorOffset} ${Math.max(0, s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="aurora-bg">
      <div className="nebula-glow-1" />
      <div className="nebula-glow-2" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}
