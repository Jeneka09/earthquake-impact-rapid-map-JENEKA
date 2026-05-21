"use client";

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => setTime(new Date().toLocaleTimeString() + " UTC");
    updateTime();
    
    const interval = setInterval(() => {
      updateTime();
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-card border-b border-border flex items-center justify-between px-6 py-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">Earthquake Impact</h1>
          <p className="text-[10px] text-primary font-mono tracking-widest uppercase">Rapid Intelligence Map</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col text-right">
          <span className="text-[9px] text-muted uppercase font-mono">Operational Status</span>
          <span className="text-xs text-primary font-bold uppercase tracking-wider flex items-center justify-end gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Live Feed Active
          </span>
        </div>
        <div className="w-[1px] h-8 bg-border"></div>
        <div className="flex flex-col text-right">
          <span className="text-[9px] text-muted uppercase font-mono">System Time</span>
          <span className="text-xs text-white font-mono w-[85px]">{mounted ? time : "--:--:-- UTC"}</span>
        </div>
      </div>
    </header>
  );
}
