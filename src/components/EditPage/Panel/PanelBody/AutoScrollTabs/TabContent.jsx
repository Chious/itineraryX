import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DayItinerary from '../Itinerary/DayItinerary';

export default function TabContent({ numOfTabs, tabRefs }) {
  return (
    <Stack
      className="tab-content"
      width="100%"
      height="100%"
      padding={0}
      gap={3}
      sx={{ overflowY: 'scroll' }}
    >
      {Array(numOfTabs)
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
