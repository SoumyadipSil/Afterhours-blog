'use client';

export default function HeroBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full animate-float opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full animate-float opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-rose) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute -bottom-[10%] left-[30%] w-[45vw] h-[45vw] rounded-full animate-float opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, var(--accent-amber-muted) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          animationDelay: '4s',
        }}
      />
    </div>
  );
}
