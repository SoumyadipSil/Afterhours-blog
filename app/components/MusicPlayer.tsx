'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';

const TRACKS = [
  { id: 1, title: 'Addiction (Slowed)', artist: 'Night Vibes', src: '/addiction.mp3' },
  { id: 2, title: 'Is There Someone Else?', artist: 'The Weeknd', src: '/is-there-someone-else.mp3' },
  { id: 3, title: 'Lovesong', artist: 'Adele', src: '/lovesong.mp3' }
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [bars, setBars] = useState<number[]>(Array(12).fill(4));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setBars(Array(12).fill(0).map(() => Math.random() * 12 + 4));
      }, 150);
    } else {
      setBars(Array(12).fill(4));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log('Autoplay blocked by browser', e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    if (!isPlaying) setIsPlaying(true);
  };
  
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    if (!isPlaying) setIsPlaying(true);
  };

  return (
    <div className="relative group max-w-[320px] mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
      <div className={`absolute -inset-1 rounded-3xl blur-md transition-all duration-1000 ${isPlaying ? 'bg-accent-amber/20 opacity-100' : 'bg-border/10 opacity-50 group-hover:opacity-100'}`}></div>
      
      <div className="relative flex items-center gap-4 bg-bg-surface/60 backdrop-blur-xl border border-border p-3 pr-4 rounded-3xl glow-card hover:border-border-hover transition-colors">
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-white/10 transition-transform hover:scale-105"
        >
          {/* Vinyl Record */}
          <div className={`w-full h-full bg-[#111] rounded-full flex items-center justify-center relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
            {/* Grooves */}
            <div className="absolute inset-1 rounded-full border border-white/10"></div>
            <div className="absolute inset-2.5 rounded-full border border-white/10"></div>
            
            {/* Reflection / shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full"></div>
            
            {/* Center Label */}
            <div className="relative w-4 h-4 bg-accent-amber rounded-full flex items-center justify-center">
              {/* Spindle hole */}
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-end mb-0.5">
            <div className="truncate">
              <p className="text-sm font-semibold text-text-primary truncate transition-colors">
                {TRACKS[currentTrack].title}
              </p>
              <p className="text-xs text-text-tertiary truncate">
                {TRACKS[currentTrack].artist}
              </p>
            </div>
            
            <div className="flex items-end gap-[2px] h-4 shrink-0 mb-1 ml-2">
              {bars.map((h, i) => (
                <div 
                  key={i} 
                  className={`w-[3px] rounded-t-sm transition-all duration-150 ${isPlaying ? 'bg-accent-amber' : 'bg-border'}`}
                  style={{ height: `${h}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-1">
          <button onClick={prevTrack} className="p-1.5 text-text-tertiary hover:text-text-primary transition-colors">
            <SkipBack className="w-4 h-4 fill-current" />
          </button>
          
          <button 
            onClick={togglePlay} 
            className="w-9 h-9 flex items-center justify-center bg-text-primary text-bg-primary rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button onClick={nextTrack} className="p-1.5 text-text-tertiary hover:text-text-primary transition-colors">
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
      
      <audio 
        ref={audioRef} 
        src={TRACKS[currentTrack].src} 
        onEnded={nextTrack}
        preload="metadata"
      />
    </div>
  );
}
