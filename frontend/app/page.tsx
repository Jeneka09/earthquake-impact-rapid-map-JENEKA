"use client";

import React, { useState, useEffect } from 'react';
import IntelligenceMap from '@/components/map/IntelligenceMap';
import Sidebar from '@/components/sidebar/Sidebar';
import axios from 'axios';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minMagnitude: 4.0,
    timeWindow: '24h'
  });
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, statsRes] = await Promise.all([
        axios.get(`http://localhost:8000/earthquakes?minMagnitude=${filters.minMagnitude}`),
        axios.get('http://localhost:8000/analytics')
      ]);
      setEvents(eventsRes.data.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to fetch intelligence data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
    
    const updateTime = () => setTime(new Date().toLocaleTimeString() + " UTC");
    updateTime();
    
    const interval = setInterval(() => {
      fetchData();
      updateTime();
    }, 60000); 

    return () => clearInterval(interval);
  }, [filters]);

  return (
    <main className="flex h-screen w-screen bg-background overflow-hidden">
      {/* LEFT SIDE (70%) */}
      <div className="w-[70%] h-full relative border-r border-border">
        {loading && (
          <div className="absolute inset-0 z-[2000] bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">Synchronizing Neural Rail...</p>
            </div>
          </div>
        )}
        <IntelligenceMap 
          events={events} 
          selectedEvent={selectedEvent} 
          setSelectedEvent={setSelectedEvent} 
        />
        
        {/* Intelligence Overlay Header */}
        <div className="absolute top-6 right-6 z-[1000] glass px-6 py-3 rounded border border-border flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] text-muted uppercase font-mono">Operational Status</span>
            <span className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Live Feed Active
            </span>
          </div>
          <div className="w-[1px] h-8 bg-border"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted uppercase font-mono">System Time</span>
            <span className="text-xs text-white font-mono">{mounted ? time : "--:--:-- UTC"}</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (30%) */}
      <div className="w-[30%] h-full">
        <Sidebar 
          filters={filters} 
          setFilters={setFilters} 
          stats={stats} 
        />
      </div>
    </main>
  );
}
