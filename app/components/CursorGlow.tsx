'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[480px] h-[480px] rounded-full pointer-events-none z-[1] transition-opacity duration-400"
      style={{
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.032) 0%, rgba(59, 130, 246, 0.015) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        willChange: 'left, top',
      }}
    />
  );
}
