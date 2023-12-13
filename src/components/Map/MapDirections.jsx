import { useEffect, useRef, useState } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';

// 計算路線
async function calculateDirections(directionsService, route) {
  if (route?.originLatLng && route?.destinationLatLng) {
    const direction = await directionsService.route({
      origin: route.originLatLng,
      destination: route.destinationLatLng,
      travelMode: route.transportationMode.toUpperCase(),
    });
    return direction;
  } else {
    return null;
  }
}

export default function MapDirections({ routes, map, setCenter }) {
  const [directions, setDirections] = useState([]);
  const targetDay = useCurrentTarget().targetDay;
  const directionsService = new window.google.maps.DirectionsService();
  const latLngBoundsRef = useRef(new window.google.maps.LatLngBounds());

  useEffect(() => {
    // 設置中心點與縮放級距 → ！附註：須改在繪製路線之後才去fitBounds
    const fitBounds = () => {
      const routesToRender = targetDay === 0 ? routes : [routes[targetDay - 1]];

      routesToRender.forEach((routesByDay) => {
        routesByDay.forEach((route) => {
          // const oLatLngObj = new window.google.maps.LatLng(
          //   route.originLatLng.lat,
          //   route.originLatLng.lng
          // );
          // const dLatLngObj = new window.google.maps.LatLng(
          //   route.destinationLatLng.lat,
          //   route.destinationLatLng.lng
          // );
          if (route?.originLatLng && route?.destinationLatLng) {
            latLngBoundsRef.current.extend(route.originLatLng);
            latLngBoundsRef.current.extend(route.destinationLatLng);
          }
        });
      });
      const center = latLngBoundsRef.current.getCenter();
      map.fitBounds(latLngBoundsRef.current);
      map.setCenter(center);
      setCenter(center);
    };

    fitBounds();
  }, [directions]);

  useEffect(() => {
    // 產生路線物件陣列（呼叫calculateDirections）
    const genDirections = async () => {
      const routesToRender = targetDay === 0 ? routes : [routes[targetDay - 1]];

      if (routesToRender.length > 0) {
        const directionsData = [];
        for (let day = 0; day < routesToRender.length; day++) {
          directionsData.push([]);
          for (let order = 0; order < routesToRender[day].length; order++) {
            const route = routesToRender[day][order];
            const direction = await calculateDirections(
              directionsService,
              route
            );
            directionsData[day].push(direction);
          }
        }
        setDirections(directionsData);
      }
    };

    genDirections();
  }, [routes, targetDay]);

  return directions.map((directionsByDay, day) =>
    directionsByDay.map(
      (direction, order) =>
        direction && (
          <DirectionsRenderer
            key={`dir-${day}-${order}`}
            directions={direction}
            options={{
              polylineOptions: {
                strokeColor: `hsl(${(day * 30) % 360}deg, 90%, 50%)`,
                strokeOpacity: 0.7,
                strokeWeight: 8,
              },
              suppressMarkers: true, // remove markers
              suppressBicyclingLayer: true, // remove bike lanes
            }}
          />
        )
    )
  );
}
