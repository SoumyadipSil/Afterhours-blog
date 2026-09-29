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

      <div className="relative group max-w-xl w-full mx-auto mb-10 select-none animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <div className={`absolute -inset-2 rounded-3xl blur-xl transition-all duration-700 pointer-events-none ${isPlaying ? 'bg-violet-500/20 opacity-100' : 'bg-white/5 opacity-20 group-hover:opacity-40'}`} />

        <div className="glass-pill relative overflow-hidden rounded-2xl p-3.5 sm:p-4 shadow-2xl transition-all duration-300 hover:border-white/15">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.035] via-transparent to-black/25 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 sm:gap-5">
            <div
              onClick={togglePlay}
              className="turntable-deck relative w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0 flex items-center justify-center cursor-pointer"
              title="Click platter to toggle play/pause"
            >
              <div className="absolute inset-0 rounded-full turntable-platter border border-white/10 flex items-center justify-center">
                <div className="absolute inset-1 rounded-full border border-dashed border-white/10 opacity-40" />
              </div>
              <div className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full vinyl-grooves flex items-center justify-center border border-[#292934] shadow-[0_8px_25px_rgba(0,0,0,0.95)] ${isPlaying ? 'vinyl-spin' : ''}`}>
                <div className="absolute inset-0 rounded-full vinyl-sheen pointer-events-none" />
                <div className="absolute inset-1 rounded-full border border-white/[0.07] pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-white/[0.04] pointer-events-none" />
                <div className="absolute w-16 h-16 rounded-full border border-black/80 bg-black/40 pointer-events-none" />
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full vinyl-label border border-violet-300/30 flex flex-col items-center justify-center text-center shadow-inner p-1">
                  <span className="text-[8px] font-semibold tracking-tight text-white leading-tight">AfterHours</span>
                  <span className="text-[6px] text-violet-100/80 tracking-wider uppercase">33⅓ RPM</span>
                  <span className="text-[6px] text-white/60 tracking-widest uppercase">Stereo</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-500 shadow-inner mt-0.5 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  </div>
                </div>
              </div>

              <div className="absolute top-2 right-2 w-28 h-40 pointer-events-none">
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border border-zinc-600/80 shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center z-30">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-500/50 flex items-center justify-center shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-violet-300/70" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-3.5 bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-sm border border-zinc-700" />
                </div>
                <div className="absolute top-14 right-2 w-3 h-4 bg-zinc-800 rounded-t border border-zinc-700 z-10 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1 bg-zinc-950 rounded-sm" />
                </div>
                <div className={`absolute top-2 right-2 tonearm-assembly z-20 origin-[16px_16px] ${isPlaying ? 'tonearm-playing' : 'tonearm-rest'}`}>
                  <div className="absolute -top-3 left-[13px] w-2 h-4 bg-gradient-to-b from-zinc-500 to-zinc-800 rounded-sm border border-zinc-600 shadow-md" />
                  <div className="relative w-1.5 h-24 bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-400 rounded-full shadow-[2px_4px_8px_rgba(0,0,0,0.7)] ml-[15px] mt-[12px]">
                    <div className="absolute inset-y-0 left-0 w-[0.5px] bg-white opacity-90" />
                  </div>
                  <div className="relative -mt-1 ml-[9px] w-4 h-6 bg-gradient-to-b from-zinc-900 to-black rounded border border-violet-300/40 shadow-md flex flex-col items-center justify-between py-0.5">
                    <div className="w-2.5 h-[2px] bg-violet-300 rounded-full" />
                    <div className="absolute -left-1.5 top-1 w-1.5 h-3 rounded-l-full border-t border-l border-zinc-500" />
                    <div className="w-1 h-1.5 bg-gradient-to-b from-zinc-400 to-white rounded-full shadow-[0_0_4px_rgba(221,183,255,0.9)]" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1 left-1 flex items-center gap-1.5 bg-[#0e0e10]/80 px-2 py-0.5 rounded-full border border-white/5">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isPlaying ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-600'}`} />
                <span className="text-[8px] text-zinc-500 uppercase tracking-wider">33 RPM</span>
              </div>
            </div>

            <div className="w-full min-w-0 flex-1 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.07]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPlaying ? 'bg-violet-300 shadow-[0_0_8px_rgba(221,183,255,0.8)]' : 'bg-zinc-600'}`} />
                  <span className="text-[9px] text-zinc-500 tracking-wider uppercase truncate">
                    {isPlaying ? 'Cue engaged · 33⅓ RPM playing' : 'Turntable standby · needle rested'}
                  </span>
                </div>
                <div className={`flex items-end gap-[3px] h-5 ml-2 flex-shrink-0 ${isPlaying ? 'eq-playing' : 'eq-paused'}`} title={isPlaying ? 'Playing' : 'Paused'}>
                  {bars.slice(0, 5).map((height, index) => (
                    <span key={index} className={`w-[3px] rounded-full ${index % 2 ? 'bg-violet-400' : 'bg-sky-300'}`} style={{ height: `${isPlaying ? Math.max(4, height) : 4}px` }} />
                  ))}
                </div>
              </div>

              <div className="py-3">
                <div className="flex items-baseline gap-2 min-w-0">
                  <h4 className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-tight truncate">{TRACKS[currentTrack].title}</h4>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500">
                  <span>{TRACKS[currentTrack].artist}</span>
                  <span className="text-zinc-700">•</span>
                  <span className="truncate">Master stereo cut · vinyl press</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-1.5 rounded-full bg-[#2a2a2c] overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r from-violet-300 to-sky-300 transition-all duration-300 ${isPlaying ? 'w-2/5' : 'w-1/3'}`} />
                </div>
                <div className="flex items-center justify-between text-[9px] text-zinc-600 font-mono">
                  <span>01:14</span>
                  <span className="text-violet-300/60">Late night lo-fi session</span>
                  <span>03:48</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 mt-1">
                <button onClick={prevTrack} aria-label="Previous Track" className="w-8 h-8 rounded-full bg-[#13131a] hover:bg-[#2a2a2c] text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-all active:scale-95" title="Previous Track">
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>
                <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} className="w-10 h-10 rounded-full bg-zinc-100 text-black flex items-center justify-center shadow-[0_0_20px_rgba(221,183,255,0.35)] hover:scale-105 active:scale-95 transition-all" title={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button onClick={nextTrack} aria-label="Next Track" className="w-8 h-8 rounded-full bg-[#13131a] hover:bg-[#2a2a2c] text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-all active:scale-95" title="Next Track">
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>
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
