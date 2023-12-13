import { createRef, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import ItineraryByDay from './ItineraryByDay';
import ListDivider from './ListCommons/ListDivider';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';

export default function Itinerary({ handleFormOpen }) {
  const targetDay = useCurrentTarget().targetDay;
  const tripInfo = useTripInfo();
  const numOfDays = tripInfo.itinerary.totalDays;
  const tabRefs = useRef(null);
  tabRefs.current = Array(numOfDays)
    .fill()
    .map(() => createRef());

  useEffect(() => {
    const target = tabRefs.current[targetDay - 1];
    if (target) {
      target.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [targetDay]);

  return (
    <Stack
      className="itinerary"
      width="100%"
      height="100%"
      padding={0}
      gap={3}
      sx={{ overflowY: 'scroll' }}
    >
      {Array(numOfDays)
        .fill()
        .map((_, index) => (
          <>
            {index > 0 && <ListDivider index={`divider-${index}`} />}

            <Stack
              key={`itinerary-container-${index}`}
              className="day-itinerary-container"
              padding={0}
              ref={tabRefs.current[index]}
            >
              <ItineraryByDay
                key={`day-${index}`}
                day={index + 1}
                handleFormOpen={handleFormOpen}
              />
            </Stack>
          </>
        ))}
    </Stack>
  );
}