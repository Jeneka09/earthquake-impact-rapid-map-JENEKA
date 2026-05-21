"use client";

import React, { useState, useEffect } from 'react';
import IntelligenceMap from '@/components/map/IntelligenceMap';
import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/layout/Header';
import FilterBar from '@/components/layout/FilterBar';
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
    fetchData();
    
    const interval = setInterval(() => {
      fetchData();
    }, 60000); 

    return () => clearInterval(interval);
  }, [filters]);

  return (
    <main className="flex flex-col h-screen w-screen bg-background overflow-hidden">
      {/* GLOBAL HEADER */}
      <Header />

      {/* HORIZONTAL FILTER BAR */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* MAIN CONTENT SPLIT */}
      <div className="flex flex-1 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 z-[2000] bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase">Synchronizing Neural Rail...</p>
            </div>
          </div>
        )}

        {/* LEFT SIDE MAP (70%) */}
        <div className="w-[70%] h-full relative border-r border-border">
          <IntelligenceMap 
            events={events} 
            selectedEvent={selectedEvent} 
            setSelectedEvent={setSelectedEvent} 
          />
        </div>

        {/* RIGHT SIDEBAR (30%) */}
        <div className="w-[30%] h-full">
          <Sidebar stats={stats} />
        </div>
      </div>
    </main>
  );
}
