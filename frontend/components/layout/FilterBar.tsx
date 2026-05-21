"use client";

import React from 'react';
import { Filter } from 'lucide-react';

export default function FilterBar({ filters, setFilters }: any) {
  return (
    <div className="w-full bg-background border-b border-border px-6 py-3 shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Intelligence Filters</h2>
        </div>
        
        <div className="w-[1px] h-6 bg-border"></div>
        
        <div className="flex items-center gap-4 min-w-[300px]">
          <label className="text-[10px] text-muted uppercase shrink-0">Min Magnitude: {filters.minMagnitude}</label>
          <input 
            type="range" 
            min="0" max="9" step="0.1"
            value={filters.minMagnitude}
            onChange={(e) => setFilters({...filters, minMagnitude: parseFloat(e.target.value)})}
            className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[10px] text-muted uppercase">Infrastructure Overlay:</span>
        <div className="flex gap-2">
          {['Hospitals', 'Power', 'Airports'].map(type => (
            <button 
              key={type}
              className="px-4 py-1.5 text-[10px] uppercase font-bold border border-border rounded hover:border-primary/50 transition-colors bg-card hover:bg-primary/5 active-glow"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
