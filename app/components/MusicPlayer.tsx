'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const TRACKS = [
  { id: 1, title: 'Addiction (Slowed + Reverb)', artist: 'Night Vibes', src: '/addiction.mp3' },
  { id: 2, title: 'Is There Someone Else?', artist: 'The Weeknd', src: '/is-there-someone-else.mp3' },
  { id: 3, title: 'Lovesong', artist: 'Adele', src: '/lovesong.mp3' }
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 14 bars for a much wider, more expressive audio visualizer animation
  const [bars, setBars] = useState<number[]>(Array(14).fill(3));

  // Equalizer animation with wide wave-like heights
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setBars([
          Math.random() * 8 + 3,
          Math.random() * 11 + 4,
          Math.random() * 14 + 5,
          Math.random() * 10 + 4,
          Math.random() * 13 + 5,
          Math.random() * 15 + 6,
          Math.random() * 11 + 4,
          Math.random() * 14 + 5,
          Math.random() * 16 + 6,
          Math.random() * 12 + 5,
          Math.random() * 14 + 4,
          Math.random() * 10 + 4,
          Math.random() * 12 + 4,
          Math.random() * 7 + 3,
        ]);
      }, 120);
    } else {
      setBars(Array(14).fill(3));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle Play/Pause
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

  // Toast on track change
  const showToast = (text: string) => {
    setToastText(text);
    setTimeout(() => {
      setToastText(null);
    }, 2200);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrack((prev) => {
      const nextIndex = (prev + 1) % TRACKS.length;
      showToast(`Now playing: ${TRACKS[nextIndex].title}`);
      return nextIndex;
    });
    if (!isPlaying) setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => {
      const prevIndex = (prev - 1 + TRACKS.length) % TRACKS.length;
      showToast(`Now playing: ${TRACKS[prevIndex].title}`);
      return prevIndex;
    });
    if (!isPlaying) setIsPlaying(true);
  };

  return (
    <>
      {/* Track Switch Toast Indicator */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
          toastText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="glass-pill px-4 py-1.5 rounded-full text-[11px] font-mono text-zinc-200 shadow-xl border border-violet-500/30 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
          <span>{toastText}</span>
        </div>
      </div>

      <div className="relative group max-w-lg w-full sm:w-auto mx-auto mb-10 select-none animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        {/* Wide atmospheric glow when music plays */}
        <div className={`absolute -inset-2 rounded-full blur-xl transition-all duration-700 pointer-events-none ${isPlaying ? 'bg-violet-500/25 opacity-100 scale-x-105' : 'bg-white/5 opacity-20 group-hover:opacity-40'}`} />

        {/* Slim single-row capsule */}
        <div className="glass-pill rounded-full py-2 px-3 pr-4 flex items-center gap-3.5 relative glow-hover transition-all duration-300 shadow-2xl">
          {/* Vinyl Disc */}
          <div
            onClick={togglePlay}
            className="relative w-10 h-10 rounded-full vinyl-grooves flex items-center justify-center border border-zinc-700 shadow-inner flex-shrink-0 cursor-pointer group-hover:border-zinc-500 transition-colors"
            title="Click to toggle play/pause"
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3.5s' }}>
              {/* Center Label Hole & Ambient Glow */}
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center pointer-events-none">
                <div className={`w-1.5 h-1.5 rounded-full bg-violet-400 transition-all duration-500 ${isPlaying ? 'shadow-[0_0_8px_rgba(167,139,250,0.95)] scale-110' : 'opacity-60'}`} />
              </div>
            </div>
          </div>

          {/* Song Meta & Wide Equalizer Waveform */}
          <div className="text-left flex flex-col justify-center pr-2 flex-grow min-w-[170px] sm:min-w-[210px]">
            <span className="text-xs font-semibold text-zinc-200 tracking-tight flex items-center gap-1.5 truncate">
              <span className="group-hover:text-white transition-colors truncate">
                {TRACKS[currentTrack].title}
              </span>
            </span>
            <div className="flex items-center gap-2.5 mt-0.5">
              <span className="text-[10px] text-zinc-500 font-mono transition-colors shrink-0">
                {TRACKS[currentTrack].artist}
              </span>

              {/* Wide Multi-Bar Equalizer Waveform Animation */}
              <div className="flex items-end gap-[2px] h-3.5 pl-1" title={isPlaying ? 'Playing' : 'Paused'}>
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`eq-bar w-[2px] rounded-full transition-all duration-100 ${
                      i % 3 === 0
                        ? 'bg-violet-400'
                        : i % 3 === 1
                        ? 'bg-violet-300'
                        : 'bg-zinc-400'
                    } ${isPlaying ? 'opacity-100' : 'opacity-25'}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mini Audio Controls */}
          <div className="flex items-center gap-1 pl-2 border-l border-zinc-800/80 shrink-0">
            <button
              onClick={prevTrack}
              aria-label="Previous Track"
              className="text-zinc-500 hover:text-zinc-200 transition-all p-1.5 rounded-full hover:bg-zinc-800/70 active:scale-90"
              title="Previous Track"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 hover:bg-zinc-100 transition-all active:scale-95 shadow-md shadow-white/10"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              aria-label="Next Track"
              className="text-zinc-500 hover:text-zinc-200 transition-all p-1.5 rounded-full hover:bg-zinc-800/70 active:scale-90"
              title="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
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
    </>
  );
}
