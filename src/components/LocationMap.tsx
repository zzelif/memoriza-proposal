"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom gold marker
const goldIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path fill="#D4AF37" stroke="#000" stroke-width="1" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 1.891.417 3.687 1.158 5.324L12.5 41l11.342-23.176C24.583 16.187 25 14.391 25 12.5 25 5.596 19.404 0 12.5 0zm0 17.5c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

interface LocationMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
  selectedLocation: { lat: number; lon: number } | null;
  isLoading: boolean;
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const LocationMap = ({ onLocationSelect, selectedLocation, isLoading }: LocationMapProps) => {
  const [mounted, setMounted] = useState(false);

  // Default to Philippines (Manila)
  const defaultCenter: [number, number] = [14.5995, 120.9842];
  const defaultZoom = 11;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">Loading map...</div>
      </div>
    );
  }

  const center: [number, number] = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lon]
    : defaultCenter;

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={defaultZoom}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={onLocationSelect} />
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lon]} icon={goldIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-medium">Selected Location</p>
                <p className="text-xs text-gray-600 mt-1">
                  {selectedLocation.lat.toFixed(6)}, {selectedLocation.lon.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-lg">
          <div className="bg-gray-900 px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-white text-sm">Getting address...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
