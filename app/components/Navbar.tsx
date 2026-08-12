'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-semibold text-text-primary">
          AfterHours
        </Link>
        <nav className="flex gap-6">
          <Link href="/blog" className="text-text-secondary hover:text-accent-amber transition-colors relative group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-amber transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-accent-amber transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-amber transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
