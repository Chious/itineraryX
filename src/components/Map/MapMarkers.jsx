import { useState } from 'react';
import Marker from './Marker';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';

export default function MapMarkers({ places }) {
  const [activeId, setActiveId] = useState(null);
  const targetDay = useCurrentTarget().targetDay;
  const placesToRender = targetDay === 0 ? places : [places[targetDay - 1]];

  return placesToRender.map((placesByDay, day) =>
    placesByDay.map((place, order) => {
      const color = `hsl(${
        ((day * 50) % 360) + ((day * 60) / 360) * 25
      }deg, 90%, 50%)`;

      return (
        <Marker
          key={`marker-${day}-${order}`}
          activeId={activeId}
          setActiveId={setActiveId}
          place={place}
          label={order + 1}
          color={color}
          day={day}
        />
      );
    })
  );
}
