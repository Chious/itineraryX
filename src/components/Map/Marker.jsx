import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import { PlaceInfo } from './PlaceInfo';

export default function Marker({ activeId, setActiveId, place, label, color, day }) {
  // map marker icon
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <!-- solid circle -->
      <circle cx="25" cy="25" r="12" fill="${color}" />
      <!-- solid isosceles triangle -->
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
      onClick={() => setActiveId?.(place.placeId)}
    >
      {activeId === place.placeId && place.placeLatLng && (
        <InfoWindowF
          position={place.placeLatLng}
          onCloseClick={() => setActiveId?.(null)}
        >
          <PlaceInfo place={place} day={day} />
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
