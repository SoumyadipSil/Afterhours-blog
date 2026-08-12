'use client';
import { useEffect, useRef } from 'react';

export default function TownSquare() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists to avoid duplicates during React StrictMode or navigation
    if (document.getElementById('townsquare-script')) return;

    const script = document.createElement('script');
    script.id = 'townsquare-script';
    script.type = 'module';
    script.innerHTML = `
      import { mountTownSquare } from "https://townsquare.cauenapier.com/townsquare.mjs";
      mountTownSquare(document.getElementById("townsquare-root"), {
        serverOrigin: "https://townsquare.cauenapier.com",
        siteKey: "site_NJnN5RDBGmnkYso3",
        theme: "host"
      });
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full">
      <link rel="preconnect" href="https://townsquare.cauenapier.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://townsquare.cauenapier.com/widget.css" />
      <link rel="stylesheet" href="https://townsquare.cauenapier.com/api/sites/site_NJnN5RDBGmnkYso3/style.css" />
      
      {/* The container for the widget */}
      <div 
        id="townsquare-root" 
        ref={containerRef} 
        className="min-h-[600px] w-full rounded-3xl border border-border bg-bg-surface overflow-hidden shadow-2xl relative"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Simple loading state while script fetches */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-6 h-6 border-2 border-accent-amber border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
