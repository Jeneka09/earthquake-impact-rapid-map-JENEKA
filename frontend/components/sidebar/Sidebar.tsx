"use client";

import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Download, 
  FileJson, 
  FileText, 
} from 'lucide-react';

export default function Sidebar({ stats }: any) {
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

      {/* 4. Rapid Export Actions */}
      <section className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Rapid Export Actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 py-2 text-[10px] uppercase font-bold border border-border bg-background hover:bg-primary/5 transition-all active-glow">
            <FileText className="w-3 h-3" /> PDF Report
          </button>
          <button className="flex items-center justify-center gap-2 py-2 text-[10px] uppercase font-bold border border-border bg-background hover:bg-primary/5 transition-all">
            <FileJson className="w-3 h-3" /> GeoJSON
          </button>
        </div>
      </section>

      {/* 5. Download Sample Data */}
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
