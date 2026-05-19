"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';


// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

export default function IntelligenceMap({ events, selectedEvent, setSelectedEvent }: any) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return <div className="w-full h-full bg-background animate-pulse flex items-center justify-center">
    <p className="text-primary font-mono text-sm tracking-widest">INITIALIZING GEOSPATIAL ENGINE...</p>
  </div>;

  const pulseIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="pulsing-marker"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={[20, 0]} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {events.map((event: any) => (
          <React.Fragment key={event.id}>
            <Marker 
              position={event.coordinates} 
              icon={pulseIcon}
              eventHandlers={{
                click: () => setSelectedEvent(event)
              }}
            >
              <Popup className="intelligence-popup">
                <div className="p-2 font-mono">
                  <h3 className="text-primary font-bold border-b border-border pb-1 mb-2 uppercase text-xs">{event.location}</h3>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <span className="text-muted">MAGNITUDE</span>
                    <span className="text-white font-bold">{event.magnitude}</span>
                    <span className="text-muted">DEPTH</span>
                    <span className="text-white font-bold">{event.depth} km</span>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Impact Radius using Turf.js logic (simplified as Circle for rendering) */}
            <Circle 
              center={event.coordinates}
              radius={event.impact_radius * 1000} // convert km to meters
              pathOptions={{ 
                color: '#38BDF8', 
                fillColor: '#38BDF8', 
                fillOpacity: 0.1,
                weight: 1,
                dashArray: '5, 5'
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Overlay controls */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
        <div className="glass px-4 py-2 rounded border border-border">
          <p className="text-[10px] text-primary font-mono font-bold tracking-widest uppercase">Layer: Infrastructure Exposure</p>
        </div>
      </div>
    </div>
  );
}
