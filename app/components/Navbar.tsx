'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('03:00:00 AM');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = String(hours % 12 || 12).padStart(2, '0');
      setTime(`${formattedHours}:${minutes}:${seconds} ${ampm}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`glass-pill rounded-full px-5 py-2.5 flex items-center gap-6 text-xs tracking-wider transition-all duration-300 ${
          scrolled
            ? 'shadow-2xl shadow-black/70 hover:border-zinc-700/80'
            : 'hover:border-zinc-700/80'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="font-heading font-bold text-white tracking-tight text-sm flex items-center gap-2 hover:text-zinc-200 transition-colors group">
          <span className="group-hover:tracking-normal transition-all duration-300">AfterHours</span>
        </Link>

        {/* Divider */}
        <div className="w-[1px] h-3.5 bg-zinc-800" />

        {/* Navigation Links */}
        <div className="flex items-center gap-5 font-medium text-zinc-400">
          <Link
            href="/blog"
            className="hover:text-zinc-100 transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="hover:text-zinc-100 transition-colors relative py-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
        </div>

        {/* Time Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 text-[10px] font-mono text-zinc-500 border-l border-zinc-800/80">
          <span className="tracking-widest">{time}</span>
        </div>
      </nav>
    </header>
  );
}
