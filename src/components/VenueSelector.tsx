"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, Search, Map as MapIcon, X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import map to avoid SSR issues
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-900 rounded-lg flex items-center justify-center">
      <Loader2 className="animate-spin text-gold-500" size={32} />
    </div>
  ),
});

interface VenueSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

const VenueSelector = ({
  value,
  onChange,
  placeholder = "Search for venue or location",
  className = "",
  required = false,
}: VenueSelectorProps) => {
  const [mode, setMode] = useState<"search" | "map">("search");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number } | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Fetch suggestions from API route
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);

      if (response.ok) {
        const data: NominatimResult[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 500);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: NominatimResult) => {
    onChange(suggestion.display_name);
    setSelectedCoords({ lat: parseFloat(suggestion.lat), lon: parseFloat(suggestion.lon) });
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Handle map click
  const handleMapClick = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      // Reverse geocode to get address from coordinates
      const response = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lon }),
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.display_name);
        setSelectedCoords({ lat, lon });
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode("search")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all ${
            mode === "search"
              ? "bg-gold-500 text-black font-medium"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          <Search size={18} />
          <span>Search Address</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all ${
            mode === "map"
              ? "bg-gold-500 text-black font-medium"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          <MapIcon size={18} />
          <span>Pick on Map</span>
        </button>
      </div>

      {/* Search Mode */}
      {mode === "search" && (
        <>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              name="venue"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => value.length >= 3 && setShowSuggestions(true)}
              required={required}
              className={`w-full pl-12 pr-12 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all ${className}`}
              placeholder={placeholder}
              autoComplete="off"
            />
            {isLoading && (
              <Loader2
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 animate-spin"
                size={20}
              />
            )}
            {value && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setSelectedCoords(null);
                  setSuggestions([]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.place_id}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors flex items-start gap-3 border-b border-gray-800 last:border-b-0 ${
                    index === selectedIndex ? "bg-gray-800" : ""
                  }`}
                >
                  <MapPin className="flex-shrink-0 text-gold-500 mt-1" size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {suggestion.display_name}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{suggestion.type}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <Search size={12} />
            Type at least 3 characters to search locations
          </p>
        </>
      )}

      {/* Map Mode */}
      {mode === "map" && (
        <>
          <div className="rounded-lg overflow-hidden border border-gray-700">
            <LocationMap
              onLocationSelect={handleMapClick}
              selectedLocation={selectedCoords}
              isLoading={isLoading}
            />
          </div>
          <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <MapIcon size={12} />
            Click anywhere on the map to select a location
          </p>
        </>
      )}

      {/* Selected Location Display */}
      {value && (
        <div className="mt-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="text-gold-500 flex-shrink-0 mt-0.5" size={16} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1">Selected Location:</p>
              <p className="text-sm text-white break-words">{value}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueSelector;
