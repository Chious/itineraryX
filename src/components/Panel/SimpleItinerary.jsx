import { Fragment } from 'react';
import moment from 'moment';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
import { useTripInfo } from '@/contexts/TripInfoContext';

const height = '80%';
const marginLeft = 2;
const borderRadius = '0.8rem';

const dayNumberStyle = {
  padding: '1rem',
  height: height,
  borderRadius: borderRadius,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 0.3,
};

const cardStyle = {
  p: 2,
  width: 'fit-content',
  minWidth: 'fit-content',
  height: height,
  marginLeft: marginLeft,
  borderRadius: borderRadius,
  backgroundColor: 'white',
  boxShadow: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const orderStyle = {
  width: '20px',
  height: '20px',
  borderRadius: '100%',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function SimpleItinerary({ displayLoading }) {
  const targetDay = useCurrentTarget().targetDay;
  const tripInfo = useTripInfo();
  const startDate = moment(tripInfo.itinerary.startTime);
  const destinations = tripInfo.destinations;
  const destinationsToRender =
    targetDay === 0 ? destinations : [destinations[targetDay - 1]];

  if (displayLoading) {
    return <Skeleton width="100%" height="100%" />;
  }

  return destinationsToRender.map((_, day) => (
    <Stack
      key={`simple-itinerary-${day}`}
      direction="row"
      alignItems="center"
      minWidth="max-content"
      marginLeft={day > 0 ? marginLeft : 0}
    >
      {/* day number */}
      <div
        style={{
          ...dayNumberStyle,
          backgroundColor: `hsl(${
            ((day * 50) % 360) + ((day * 60) / 360) * 25
          }deg, 90%, 50%)`,
        }}
      >
        <Typography color="white">
          Day {targetDay > 0 ? targetDay + day : targetDay + day + 1}
        </Typography>
        <Typography color="white" fontFamily="Roboto" fontSize="0.8rem">
          {startDate
            .clone()
            .add(targetDay > 0 ? targetDay - 1 : targetDay + day, 'days')
            .format('MM/DD')}
        </Typography>
      </div>

      {/* destinations */}
      {destinationsToRender[day].map((_, order) => (
        <Fragment key={`simple-itinerary-${day}-${order}`}>
          <Stack direction="row" spacing={1} sx={cardStyle}>
            {/* destination order */}
            <Box
              className="order"
              sx={{
                ...orderStyle,
                backgroundColor: `hsl(${
                  ((day * 50) % 360) + ((day * 60) / 360) * 25
                }deg, 90%, 50%)`,
              }}
            >
              {order + 1}
            </Box>

            {/* destination name */}
            <Box className="place-name">
              {destinationsToRender[day][order].placeName}
            </Box>
          </Stack>
        </Fragment>
      ))}
    </Stack>
  ));
}
