'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = String(hours % 12 || 12).padStart(2, '0');
      setTime(`LOCAL: ${formattedHours}:${minutes}:${seconds} ${ampm}`);
      setYear(String(now.getFullYear()));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-600 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-semibold">AfterHours</span>
          <span>—</span>
          <span>Written in silence.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="tracking-wider">{time}</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
