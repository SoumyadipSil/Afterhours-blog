'use client';

export default function GrainOverlay() {
  return (
   <div className="fixed inset-0 z-50 pointer-events-none opacity-5 overflow-hidden">
  <svg
    className="absolute inset-0 w-full h-full"
  >
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.9"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
</div>
  );
}
