import { useEffect, useRef, useState } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';

export default function MapDirections({ routes, map, setCenter }) {
  const [directions, setDirections] = useState([]);
  const targetDay = useCurrentTarget().targetDay;
  const directionsService = new window.google.maps.DirectionsService();
  const latLngBoundsRef = useRef(new window.google.maps.LatLngBounds());

  // 計算路線
  async function calculateDirections(route) {
    if (route?.originLatLng && route?.destinationLatLng) {
      const direction = await directionsService.route({
        origin: route.originLatLng,
        destination: route.destinationLatLng,
        travelMode: route.transportationMode.toUpperCase(),
      });

      latLngBoundsRef.current.extend(route.originLatLng);
      latLngBoundsRef.current.extend(route.destinationLatLng);

      const center = latLngBoundsRef.current.getCenter();
      setTimeout(() => map.fitBounds(latLngBoundsRef.current), 30);
      map.setCenter(center);
      setCenter(center);

      return direction;
    } else {
      return null;
    }
  }

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
            const direction = await calculateDirections(route);
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
                strokeColor: `hsl(${(day * 50) % 360 + (day * 60) / 360 * 25}deg, 90%, 50%)`,
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
