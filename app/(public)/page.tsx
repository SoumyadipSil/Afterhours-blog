'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroBlobs from '@/app/components/HeroBlobs';
import ScrollReveal from '@/app/components/ScrollReveal';
import MusicPlayer from '@/app/components/MusicPlayer';
import { ArrowRight, Music, BookOpen, Coffee } from 'lucide-react';

const GALLERY_IMAGES = [
  { id: '1', caption: "City Lights", height: "h-80", src: "https://i.pinimg.com/1200x/e0/4a/08/e04a086bb6bcc1b538b64a7acde732d5.jpg" },
  { id: '2', caption: "Midnight Reflections", height: "h-96", src: "https://i.pinimg.com/736x/cf/9b/8a/cf9b8a080b02d3f90fb12f48c65e6cac.jpg" },
  { id: '3', caption: "Code & Coffee", height: "h-64", src: "https://i.pinimg.com/736x/7d/d1/66/7dd166fe4b870af0d53788c94917e206.jpg" },
  { id: '4', caption: "Quiet Hours", height: "h-80", src: "https://i.pinimg.com/originals/3b/eb/ab/3bebabd610da8b865e4af3ca067a7ac5.gif" },
  { id: '5', caption: "Neon Thoughts", height: "h-96", src: "https://i.pinimg.com/originals/00/fb/63/00fb631deaf0ccf5ed23558c9367ef5d.gif" },
  { id: '6', caption: "Dawn Approaches", height: "h-80", src: "https://i.pinimg.com/1200x/ee/fc/f7/eefcf77657341a50246c3b5089ec19e9.jpg" },
];

export default function HomePage() {
  const [expandedShelf, setExpandedShelf] = useState<string | null>(null);

  const toggleShelf = (id: string) => {
    setExpandedShelf(expandedShelf === id ? null : id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="w-full relative z-10">
      {/* Dynamic Aurora & Starfield Background */}
      <HeroBlobs />

      {/* 1. Hero Section */}
      <section className="min-h-[100vh] -mt-20 flex flex-col justify-between items-center pt-32 pb-12 px-6 relative">
        <div className="w-full h-4" />

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center z-10">
          {/* Refined Music Widget */}
          <MusicPlayer />

          {/* Main Title Header */}
          <div className="space-y-3 pt-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans drop-shadow-sm animate-fade-in opacity-0">
              AfterHours
            </h1>
            <p className="font-mono text-xs sm:text-sm text-zinc-500 tracking-wider animate-fade-in opacity-0" style={{ animationDelay: '0.15s' }}>
              written by <span className="text-zinc-300 font-medium hover:text-white transition-colors cursor-default">Soumyadip</span>
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed text-balance mt-4 animate-slide-up opacity-0" style={{ animationDelay: '0.25s' }}>
            A journal of nights, reflections &amp; late-night thoughts.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 animate-slide-up opacity-0" style={{ animationDelay: '0.35s' }}>
            <Link
              href="/blog"
              className="btn-shimmer px-6 py-3 rounded-full text-xs font-medium text-white bg-zinc-800/90 hover:bg-zinc-700/80 border border-zinc-700/80 transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-0.5 hover:shadow-violet-500/20 active:scale-95 flex items-center gap-2 group"
            >
              <span>Explore the Archive</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </Link>
            <Link
              href="/about"
              className="btn-shimmer px-6 py-3 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 bg-zinc-900/50 hover:bg-zinc-800/60 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              About the Author
            </Link>
          </div>
        </div>

        {/* Downward Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors pt-8">
          <a
            aria-label="Scroll down to content"
            href="#shelf"
            className="animate-float p-3 hover:bg-zinc-900/50 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 group"
          >
            <svg className="w-5 h-5 stroke-current transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </section>

      {/* 2. The 3 AM Shelf Section */}
      <section id="shelf" className="max-w-4xl mx-auto px-6 py-16 border-t border-zinc-900/80">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Atmosphere</span>
              <h2 className="text-xl font-bold text-zinc-200 font-heading">The 3 AM Shelf</h2>
            </div>
            <span className="text-xs font-mono text-zinc-600">Click card for notes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Midnight Audio */}
            <div
              onClick={() => toggleShelf('track')}
              onMouseMove={handleMouseMove}
              className={`shelf-card spotlight-card p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/70 hover:bg-zinc-900/50 cursor-pointer group select-none ${
                expandedShelf === 'track' ? 'is-expanded' : ''
              }`}
            >
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                  <Music className="w-3 h-3 text-zinc-400 group-hover:text-violet-400 group-hover:scale-110 transition-all duration-300" />
                  Current Track
                </span>
                <span className="text-[10px] text-zinc-600 group-hover:text-violet-400 transition-colors font-mono">✦</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                Kavinsky — Nightcall
              </div>
              <p className="text-xs text-zinc-500 mt-1 font-mono">Slowed + Reverb Cut</p>
              <div className="shelf-quote pt-2 border-t border-zinc-800/50 text-[11px] font-mono text-zinc-400 leading-relaxed italic">
                &quot;I&apos;m giving you a night call to tell you how I feel...&quot; Perfect for empty arterial highways.
              </div>
            </div>

            {/* Card 2: Late Night Reading */}
            <div
              onClick={() => toggleShelf('book')}
              onMouseMove={handleMouseMove}
              className={`shelf-card spotlight-card p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/70 hover:bg-zinc-900/50 cursor-pointer group select-none ${
                expandedShelf === 'book' ? 'is-expanded' : ''
              }`}
            >
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                  <BookOpen className="w-3 h-3 text-zinc-400 group-hover:text-violet-400 group-hover:scale-110 transition-all duration-300" />
                  Nightstand Reading
                </span>
                <span className="text-[10px] text-zinc-600 group-hover:text-violet-400 transition-colors font-mono">✦</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                Kafka on the Shore
              </div>
              <p className="text-xs text-zinc-500 mt-1 font-mono">Haruki Murakami</p>
              <div className="shelf-quote pt-2 border-t border-zinc-800/50 text-[11px] font-mono text-zinc-400 leading-relaxed italic">
                &quot;Memories warm you up from the inside. But they also tear you apart.&quot;
              </div>
            </div>

            {/* Card 3: Late Night Companion */}
            <div
              onClick={() => toggleShelf('tea')}
              onMouseMove={handleMouseMove}
              className={`shelf-card spotlight-card p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/70 hover:bg-zinc-900/50 cursor-pointer group select-none ${
                expandedShelf === 'tea' ? 'is-expanded' : ''
              }`}
            >
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                  <Coffee className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />
                  Midnight Brew
                </span>
                <span className="text-[10px] text-zinc-600 group-hover:text-amber-400 transition-colors font-mono">✦</span>
              </div>
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                Chamomile &amp; Wild Honey
              </div>
              <p className="text-xs text-zinc-500 mt-1 font-mono">Steeped 7 minutes hot</p>
              <div className="shelf-quote pt-2 border-t border-zinc-800/50 text-[11px] font-mono text-zinc-400 leading-relaxed italic">
                Calms the midnight nervous system. Golden notes of apple blossoms and amber nectar.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Aesthetic Image Gallery Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-900/80">
        <ScrollReveal>
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Visual Journal</span>
            <h2 className="text-2xl font-bold text-zinc-200 font-heading">Atmospheric Frames</h2>
          </div>
        </ScrollReveal>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {GALLERY_IMAGES.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 80} className="break-inside-avoid mb-6">
              <div className={`relative w-full rounded-2xl overflow-hidden border border-zinc-800/80 group ${img.height} shadow-xl`}>
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-mono text-zinc-300">{img.caption}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. Category Showcase Section (Matches Notion Database Headers: Life & Coding) */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-zinc-900/80">
        <ScrollReveal>
          <div className="mb-8">
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Sections</span>
            <h2 className="text-2xl font-bold text-zinc-200 font-heading">Notion Dispatches</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={0}>
            <Link
              href="/blog?category=life"
              onMouseMove={handleMouseMove}
              className="spotlight-card block relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/20 p-8 sm:p-10 h-full group hover:border-zinc-700/80 transition-all shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-125" />
              <div className="relative z-10">
                <span className="text-violet-400 font-mono text-xs uppercase tracking-wider mb-4 block">01 · Personal Essays</span>
                <h3 className="font-heading text-3xl sm:text-4xl text-white mb-3">Life</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Reflections on existence, society, and the human condition. Solitary essays and thoughts that only surface at 3 AM.
                </p>
                <span className="text-zinc-200 text-xs font-mono font-medium flex items-center gap-2 group-hover:text-violet-300 group-hover:gap-3 transition-all">
                  Read Essays <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <Link
              href="/blog?category=coding"
              onMouseMove={handleMouseMove}
              className="spotlight-card block relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/20 p-8 sm:p-10 h-full group hover:border-zinc-700/80 transition-all shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-125" />
              <div className="relative z-10">
                <span className="text-indigo-400 font-mono text-xs uppercase tracking-wider mb-4 block">02 · Engineering</span>
                <h3 className="font-heading text-3xl sm:text-4xl text-white mb-3">Coding</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Technical write-ups, architecture notes, and late-night experiments with autonomous agents, LLMs, and modern frameworks.
                </p>
                <span className="text-zinc-200 text-xs font-mono font-medium flex items-center gap-2 group-hover:text-indigo-300 group-hover:gap-3 transition-all">
                  View Projects <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. About Teaser Strip */}
      <ScrollReveal delay={100}>
        <section className="relative py-20 px-6 border-t border-zinc-900/80 overflow-hidden">
          <img
            src="https://i.pinimg.com/originals/ca/26/2e/ca262e0354eea311c41134c3e4bc3bc2.gif"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-transparent to-[#08080a]" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">The Author</span>
            <h2 className="font-heading text-3xl md:text-5xl text-white mb-4">Written by Soumyadip</h2>
            <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              A corner of the internet dedicated to documenting thoughts, building software, and romanticizing the quiet hours of the night.
            </p>
            <Link
              href="/about"
              className="btn-shimmer inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-all py-2.5 px-6 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/60 shadow-lg active:scale-95"
            >
              <span>Read the full story</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
