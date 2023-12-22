/*

  map可調參數：

  const mapOptions = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullScreenControl: false,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ visibility: 'on', color: '#242f3e' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };
  
*/

import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import MapLoading from './MapLoading';
import TargetDaySelector from './MapControl/TargetDaySelector';
import ResetCenterBtn from './MapControl/ResetCenterBtn';
import MapDirections from './MapDirections';
import MapMarkers from './MapMarkers';
import TargetPlaceMarker from './TargetPlaceMarker';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
import { useRoutesInfo } from '@/contexts/RoutesInfoContext';
import { useTripInfo } from '@/contexts/TripInfoContext';
import './map.css';

////////// Map設定 //////////

const mapCenter = { lat: 23.553118, lng: 121.0211024 }; // 台灣

const mapOptions = {
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullScreenControl: false,
};

////////// Map元件 //////////

export default function Map({ isLoaded }) {
  const [displayLoading, setDisplayLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(mapCenter);
  const [zoom, setZoom] = useState(7);
  const routes = useRoutesInfo().routes;
  const places = useTripInfo().destinations;
  const targetPlace = useCurrentTarget().targetPlace;
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  // 若資料尚未載入完畢將顯示Loading畫面
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoaded) {
        setDisplayLoading(false);
        clearTimeout(timer);
      }
    }, 2500);
  }, [isLoaded]);

  if (displayLoading) {
    return (
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        gap={2}
      >
        <MapLoading />
      </Grid>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={(map) => setMap(map)}
      onBoundsChanged={() => {
        if (map) {
          const currentZoom = map.getZoom();
          if (currentZoom < 14) setZoom(currentZoom);
          else setZoom(14);
        }
      }}
    >
      <Stack
        className="map-control"
        direction="row"
        spacing={2}
        sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
      >
        <TargetDaySelector />
        <ResetCenterBtn map={map} center={center} />
      </Stack>

      {map && routes?.length > 0 && (
        <MapDirections routes={routes} map={map} setCenter={setCenter} />
      )}

      {map && places?.length > 0 && <MapMarkers places={places} />}

      {map && targetPlace?.placeLatLng && (
        <TargetPlaceMarker
          place={targetPlace}
          label={'+'}
          color={primaryColor}
          map={map}
        />
      )}
    </GoogleMap>
  );
}
