'use client';

export default function HeroBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-screen animate-float opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '0s'
        }}
      />
      <div 
        className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full mix-blend-screen animate-float opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--accent-rose) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute -bottom-[10%] left-[30%] w-[50vw] h-[50vw] rounded-full mix-blend-screen animate-float opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--accent-amber-muted) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animationDelay: '4s'
        }}
      />
    </div>
  );
}
