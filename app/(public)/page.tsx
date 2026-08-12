'use client';

import Link from 'next/link';
import HeroBlobs from '@/app/components/HeroBlobs';
import ScrollReveal from '@/app/components/ScrollReveal';

const GALLERY_IMAGES = [
  { id: '1', caption: "City Lights", height: "h-80", src: "https://i.pinimg.com/1200x/e0/4a/08/e04a086bb6bcc1b538b64a7acde732d5.jpg" },
  { id: '2', caption: "Midnight Reflections", height: "h-96", src: "https://i.pinimg.com/736x/cf/9b/8a/cf9b8a080b02d3f90fb12f48c65e6cac.jpg" },
  { id: '3', caption: "Code & Coffee", height: "h-64", src: "https://i.pinimg.com/736x/7d/d1/66/7dd166fe4b870af0d53788c94917e206.jpg" },
  { id: '4', caption: "Quiet Hours", height: "h-80", src: "https://i.pinimg.com/originals/3b/eb/ab/3bebabd610da8b865e4af3ca067a7ac5.gif" },
  { id: '5', caption: "Neon Thoughts", height: "h-96", src: "https://i.pinimg.com/originals/00/fb/63/00fb631deaf0ccf5ed23558c9367ef5d.gif" },
  { id: '6', caption: "Dawn Approaches", height: "h-80", src: "https://i.pinimg.com/1200x/ee/fc/f7/eefcf77657341a50246c3b5089ec19e9.jpg" },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 2a. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBlobs />
        
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tight text-text-primary mb-6 animate-fade-in opacity-0">
            AfterHours
          </h1>
          <p className="font-body text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A Journal of Nights, Reflections & Late Night Thoughts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/blog"
              className="bg-accent-amber text-bg-primary px-8 py-3 rounded-full font-medium hover:bg-glow-amber transition-colors"
            >
              Explore the Archive
            </Link>
            <Link
              href="/about"
              className="border border-border px-8 py-3 rounded-full font-medium text-text-primary hover:border-border-hover hover:bg-bg-surface transition-colors"
            >
              About the Author
            </Link>
          </div>
        </div>

        {/* Bouncing Chevron */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-text-tertiary">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2b. Aesthetic Image Gallery Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {GALLERY_IMAGES.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 100} className="break-inside-avoid mb-6">
              <div className={`relative w-full rounded-2xl overflow-hidden border border-border group ${img.height}`}>
                {/* Image Placeholder */}
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-heading text-text-primary text-lg">{img.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 2c. Category Showcase Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={0}>
            <Link href="/blog?category=life" className="block relative overflow-hidden rounded-3xl border-l-4 border-l-accent-rose bg-gradient-to-br from-bg-surface to-bg-primary border-y border-r border-border p-10 h-full group hover:border-border-hover transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-rose/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <span className="text-accent-rose font-mono text-sm uppercase tracking-wider mb-4 block">01</span>
                <h3 className="font-heading text-4xl text-text-primary mb-4">Life</h3>
                <p className="text-text-secondary leading-relaxed mb-8">Reflections on existence, society, and the human condition. Personal essays and midnight thoughts.</p>
                <span className="text-text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Essays <span>→</span>
                </span>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Link href="/blog?category=coding" className="block relative overflow-hidden rounded-3xl border-l-4 border-l-accent-slate bg-gradient-to-br from-bg-surface to-bg-primary border-y border-r border-border p-10 h-full group hover:border-border-hover transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-slate/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <span className="text-accent-slate font-mono text-sm uppercase tracking-wider mb-4 block">02</span>
                <h3 className="font-heading text-4xl text-text-primary mb-4">Coding</h3>
                <p className="text-text-secondary leading-relaxed mb-8">Technical write-ups, system design thoughts, and explorations of new frameworks and tools.</p>
                <span className="text-text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Projects <span>→</span>
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 2d. About Teaser Strip */}
      <ScrollReveal delay={100}>
        <section className="py-20 px-6 bg-gradient-to-r from-bg-surface via-accent-amber/5 to-bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-5xl text-text-primary mb-6">Written by Soumyadip</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              A corner of the internet dedicated to documenting thoughts, building software, and romanticizing the quiet hours of the night.
            </p>
            <Link href="/about" className="text-accent-amber font-medium hover:text-glow-amber transition-colors">
              Read more →
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* 2e. AI Assistant Teaser */}
      <section className="py-24 px-6 max-w-2xl mx-auto">
        <ScrollReveal delay={100}>
          <div className="glass rounded-3xl p-10 text-center relative overflow-hidden border border-border">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-amber/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-bg-elevated rounded-2xl flex items-center justify-center mb-6 border border-border shadow-lg">
                <span className="text-2xl">✦</span>
              </div>
              <h2 className="font-heading text-3xl text-text-primary mb-4">Your AI Guide</h2>
              <p className="text-text-secondary mb-8">
                An interactive assistant trained on my thoughts and writings. Chat with the site, ask questions, and explore ideas together.
              </p>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent-amber animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-accent-amber animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-accent-amber animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-amber-muted text-accent-amber text-xs font-mono uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
