'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const TRACKS = [
  { id: 1, title: 'Addiction (Slowed + Reverb)', artist: 'Night Vibes', src: '/addiction.mp3' },
  { id: 2, title: 'Is There Someone Else?', artist: 'The Weeknd', src: '/is-there-someone-else.mp3' },
  { id: 3, title: 'Lovesong', artist: 'Adele', src: '/lovesong.mp3' }
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [toastText, setToastText] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrubberRef = useRef<HTMLDivElement | null>(null);

  const [bars, setBars] = useState<number[]>([6, 11, 14, 8, 12]);

  // Equalizer animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setBars([
          Math.random() * 8 + 4,
          Math.random() * 10 + 5,
          Math.random() * 12 + 6,
          Math.random() * 8 + 4,
          Math.random() * 10 + 6,
        ]);
      }, 150);
    } else {
      setBars([4, 4, 4, 4, 4]);
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
    }, 2400);
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || !audioRef.current || !duration) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

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

      <div className="relative group max-w-md w-full sm:w-auto mx-auto mb-10 select-none animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        {/* Glow ambient background */}
        <div className={`absolute -inset-1 rounded-3xl blur-md transition-all duration-1000 ${isPlaying ? 'bg-violet-500/20 opacity-100' : 'bg-white/5 opacity-40 group-hover:opacity-100'}`} />

        <div className="glass-pill rounded-3xl p-3 pr-5 flex flex-col gap-2 relative glow-hover transition-all duration-300">
          <div className="flex items-center gap-3.5">
            {/* Vinyl Disc Art */}
            <div
              onClick={togglePlay}
              className="relative w-11 h-11 rounded-full vinyl-grooves flex items-center justify-center border border-zinc-700 shadow-inner flex-shrink-0 cursor-pointer group-hover:border-zinc-500 transition-colors"
              title="Click to toggle play/pause"
            >
              <div className={`w-full h-full rounded-full flex items-center justify-center relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3.5s' }}>
                {/* Center Label Hole & Ambient Glow */}
                <div className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center pointer-events-none">
                  <div className={`w-1.5 h-1.5 rounded-full bg-violet-400 transition-all duration-500 ${isPlaying ? 'shadow-[0_0_8px_rgba(167,139,250,0.9)] scale-110' : 'opacity-60'}`} />
                </div>
              </div>
            </div>

            {/* Song Meta & Equalizer */}
            <div className="text-left flex flex-col justify-center pr-2 flex-grow min-w-[170px]">
              <span className="text-xs font-semibold text-zinc-200 tracking-tight flex items-center gap-1.5 truncate">
                <span className="group-hover:text-white transition-colors truncate">
                  {TRACKS[currentTrack].title}
                </span>
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-zinc-500 font-mono transition-colors">
                  {TRACKS[currentTrack].artist}
                </span>
                {/* Equalizer bars */}
                <div className="flex items-end gap-[3px] h-3 ml-1">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className={`eq-bar w-[2px] rounded-full transition-all duration-150 ${
                        i % 2 === 0 ? 'bg-violet-400' : 'bg-zinc-300'
                      } ${isPlaying ? 'opacity-100' : 'opacity-30'}`}
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

          {/* Interactive Progress Scrubber with Time Counter */}
          <div className="pt-1 px-1 flex items-center gap-2.5 text-[10px] font-mono text-zinc-500">
            <span className="w-7 text-right">{formatTime(currentTime)}</span>
            <div
              ref={scrubberRef}
              onClick={handleScrubberClick}
              className="scrubber-track flex-1"
              title="Seek"
            >
              <div
                className="scrubber-progress"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="scrubber-thumb" />
              </div>
            </div>
            <span className="w-7 text-left">{formatTime(duration)}</span>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={TRACKS[currentTrack].src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={nextTrack}
          preload="metadata"
        />
      </div>
    </>
  );
}
