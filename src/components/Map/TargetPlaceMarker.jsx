import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { PlaceInfo } from './PlaceInfo';

export default function PlaceMarker({ place, label, color, map }) {
  const [openInfoWindow, setOpenInfoWindow] = useState(true);

  useEffect(() => {
    setOpenInfoWindow(true);
    map.panTo(place.placeLatLng);
    map.setZoom(14);
  }, [place]);

  // map marker icon
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <!-- 實心圓 -->
      <circle cx="25" cy="25" r="12" fill="${color}" />
      <!-- 實心等腰三角形 -->
      <polygon points="13,25 25,50 37,25" fill="${color}" />
    </svg>
  `;

  return (
    <MarkerF
      position={place.placeLatLng}
      label={{ text: `${label}`, color: 'white' }}
      icon={{
        url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
        scaledSize: new window.google.maps.Size(50, 50),
      }}
      onClick={() => setOpenInfoWindow(!openInfoWindow)}
    >
      {openInfoWindow && (
        <InfoWindowF
          position={place.placeLatLng}
          onCloseClick={() => setOpenInfoWindow(false)}
        >
          <PlaceInfo place={place} />
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
