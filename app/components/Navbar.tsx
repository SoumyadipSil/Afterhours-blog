'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

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
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-auto">
      <nav
        className={`flex items-center gap-6 px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'glass shadow-lg shadow-black/10'
            : 'glass'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="font-heading text-lg font-semibold text-text-primary whitespace-nowrap">
          AfterHours
        </Link>

        {/* Divider */}
        <span className="w-px h-4 bg-border" />

        {/* Nav Links */}
        <Link href="/blog" className="text-sm text-text-secondary hover:text-accent-amber transition-colors">
          Blog
        </Link>
        <Link href="/about" className="text-sm text-text-secondary hover:text-accent-amber transition-colors">
          About
        </Link>

        {/* Divider */}
        <span className="w-px h-4 bg-border" />

        {/* Theme Toggle */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
