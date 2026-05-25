"use client";

import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Download, 
  FileJson, 
  FileText, 
  Filter
} from 'lucide-react';

export default function Sidebar({ filters, setFilters, stats, selectedEvent, events }: any) {
  
  const handleExportGeoJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "earthquakes_export.geojson");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <aside className="w-full h-full bg-card border-l border-border flex flex-col overflow-y-auto custom-scrollbar">
      {/* 1. High-Level Metrics */}
      <section className="p-6 border-b border-border">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-background border border-border rounded-md">
            <p className="text-[10px] text-muted uppercase mb-1">Active Events</p>
            <p className="text-2xl font-mono font-bold text-white">{stats.total_active_events || 0}</p>
          </div>
          <div className="p-3 bg-background border border-border rounded-md">
            <p className="text-[10px] text-muted uppercase mb-1">Critical Zones</p>
            <p className="text-2xl font-mono font-bold text-secondary">{stats.critical_exposure_zones || 0}</p>
          </div>
        </div>
      </section>

      {/* Active Selection Insight (Appears when map element is clicked) */}
      {selectedEvent && (
        <section className="p-6 border-b border-border bg-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Active Selection Insight</h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-white font-bold">{selectedEvent.location}</p>
            <p className="text-xs text-gray-400">Magnitude: <span className="text-white">{selectedEvent.magnitude}</span></p>
            <p className="text-xs text-primary font-mono mt-2 p-2 border border-primary/30 rounded bg-background">
              ESTIMATED EXPOSURE: {(selectedEvent.magnitude * 8.5).toFixed(1)}% ABOVE REGIONAL AVERAGE
            </p>
          </div>
        </section>
      )}

      {/* 2. Why This Matters */}
      <section className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Why This Matters</h2>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Practical emergency-intelligence PoC with strong visual clarity. Operational visibility into infrastructure exposure is critical for rapid response and resource allocation.
        </p>
      </section>

      {/* 3. Who Controls the Rail */}
      <section className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Who Controls the Rail</h2>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Emergency response infrastructure is governed by a patchwork of national geological surveys (USGS), international population data providers (WorldPop), and localized open-source mapping contributors (OpenStreetMap).
        </p>
      </section>

      {/* 4. Filters & Controls */}
      <section className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Intelligence Filters</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-muted uppercase block mb-2">Min Magnitude: {filters.minMagnitude}</label>
            <input 
              type="range" 
              min="0" max="9" step="0.1"
              value={filters.minMagnitude}
              onChange={(e) => setFilters({...filters, minMagnitude: parseFloat(e.target.value)})}
              className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-muted uppercase">Time Window:</span>
            <select 
              className="w-full bg-background border border-border rounded p-1 text-xs text-white uppercase"
              value={filters.timeWindow}
              onChange={(e) => setFilters({...filters, timeWindow: e.target.value})}
            >
              <option value="24h">Past 24 Hours</option>
              <option value="7d">Past 7 Days</option>
              <option value="30d">Past 30 Days</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-muted uppercase">Infrastructure Overlay:</span>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilters({...filters, showHospitals: !filters.showHospitals})}
                className={`px-4 py-1.5 text-[10px] uppercase font-bold border rounded transition-colors ${filters.showHospitals ? 'border-primary bg-primary/20 text-primary' : 'border-border bg-card text-muted hover:border-primary/50'}`}
              >
                Hospitals
              </button>
              <button 
                onClick={() => setFilters({...filters, showPower: !filters.showPower})}
                className={`px-4 py-1.5 text-[10px] uppercase font-bold border rounded transition-colors ${filters.showPower ? 'border-primary bg-primary/20 text-primary' : 'border-border bg-card text-muted hover:border-primary/50'}`}
              >
                Power Grid
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Rapid Export Actions */}
      <section className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Rapid Export Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 py-2 text-[10px] uppercase font-bold border border-border bg-background hover:bg-primary/5 transition-all">
            <FileText className="w-3 h-3" /> PDF Report
          </button>
          <button 
            onClick={handleExportGeoJSON}
            className="flex items-center justify-center gap-2 py-2 text-[10px] uppercase font-bold border border-border bg-background hover:bg-primary/5 transition-all active-glow"
          >
            <FileJson className="w-3 h-3" /> GeoJSON
          </button>
        </div>
      </section>

      {/* 6. Download Sample Data */}
      <section className="p-6 mt-auto">
        <button className="w-full py-3 bg-secondary/10 border border-secondary/30 text-secondary text-xs uppercase font-bold tracking-widest hover:bg-secondary/20 transition-all flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> Download Sample Dataset
        </button>
        <p className="text-[9px] text-center text-muted mt-3 font-mono">
          SYSTEM_ID: RAPID_INTEL_v1.0.4
        </p>
      </section>
    </aside>
  );
}
