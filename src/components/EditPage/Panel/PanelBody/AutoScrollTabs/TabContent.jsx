import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DayItinerary from '../Itinerary/DayItinerary';
import { useTripInfo } from '../../../temp_data/trip_reducer';

export default function TabContent({ tabRefs }) {
  const tripInfo = useTripInfo();
  const numOfDays = tripInfo.itinerary.days;

  return (
    <Stack
      className="tab-content"
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
            {index > 0 && (
              <Divider
                key={`divider-${index}`}
                sx={{ borderStyle: 'dashed', borderWidth: '1px' }}
              />
            )}

            <Stack
              key={`day-itinerary-${index}`}
              className="day-itinerary-container"
              padding={0}
              ref={tabRefs.current[index]}
            >
              <DayItinerary day={index + 1} />
            </Stack>
          </>
        ))}
    </Stack>
  );
}