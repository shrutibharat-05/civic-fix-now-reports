
import React, { useEffect, useRef } from 'react';

interface MapPreviewProps {
  latitude: number;
  longitude: number;
  onLocationChange?: (lat: number, lng: number) => void;
  interactive?: boolean;
}

const MapPreview: React.FC<MapPreviewProps> = ({ 
  latitude, 
  longitude, 
  onLocationChange,
  interactive = false
}) => {
  // In a real app, we would integrate with a map API like Mapbox or Google Maps
  // For this demo, we'll show a placeholder with coordinates
  
  const handleMapClick = () => {
    if (interactive && onLocationChange) {
      // In a real app, this would extract coordinates from the map click
      // For demo purposes, we'll just slightly change the coordinates
      const newLat = latitude + (Math.random() * 0.01 - 0.005);
      const newLng = longitude + (Math.random() * 0.01 - 0.005);
      onLocationChange(newLat, newLng);
    }
  };
  
  return (
    <div 
      className={`
        bg-gray-100 border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center
        ${interactive ? 'cursor-pointer' : ''}
      `}
      onClick={handleMapClick}
      style={{ height: '200px' }}
    >
      <div className="text-civic-primary mb-2">
        <MapPinIcon />
      </div>
      <div className="text-sm text-gray-600 font-medium">
        Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </div>
      {interactive && (
        <div className="text-xs text-gray-500 mt-2">
          {onLocationChange ? "Click on the map to select a different location" : ""}
        </div>
      )}
    </div>
  );
};

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default MapPreview;
