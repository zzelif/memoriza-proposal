"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface OpenStreetMapAutocompleteProps {
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

const OpenStreetMapAutocomplete = ({
  value,
  onChange,
  placeholder = "Search for venue or location",
  className = "",
  required = false,
}: OpenStreetMapAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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

  // Fetch suggestions from our API route (fixes CORS issues on mobile)
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // Use our server-side API route instead of direct Nominatim call
      // This fixes CORS issues on mobile/tablet browsers
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(query)}`
      );

      if (response.ok) {
        const data: NominatimResult[] = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } else {
        console.error("Failed to fetch suggestions");
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 500); // Wait 500ms after user stops typing
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: NominatimResult) => {
    onChange(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
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
      <div className="relative">
        <MapPin
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
        />
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
              <MapPin
                className="flex-shrink-0 text-gold-500 mt-1"
                size={16}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {suggestion.display_name}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {suggestion.type}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-1 text-xs text-gray-400 flex items-center gap-1">
        <MapPin size={12} />
        Type at least 3 characters to search locations (Powered by OpenStreetMap)
      </p>
    </div>
  );
};

export default OpenStreetMapAutocomplete;
