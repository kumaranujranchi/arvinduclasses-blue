"use client";

import { useState, useEffect } from 'react';

export default function AdminClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <span>Loading...</span>;

  return (
    <div className="flex items-center gap-3">
      <span>{time.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      <span className="opacity-30">|</span>
      <span className="font-black text-slate-600">{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
  );
}
