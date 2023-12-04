import { Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';

import { useTripInfo } from '../../temp_data/trip_reducer';

export default function PanelControl() {
  const itinerary = useTripInfo().itinerary;

  return (
    <Stack
      className="panel-control"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        px: 2,
        py: 1,
        height: '40px',
        background: 'white',
        boxShadow: 1,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <Stack className="trip-title" direction="row" gap="1rem">
        <ArrowBackIcon sx={{ color: 'black' }} />
        <Typography sx={{ fontWeight: 'bold' }}>{itinerary.title}</Typography>
      </Stack>
      <Stack className="icon-container" direction="row">
        <PeopleIcon sx={{ color: 'black' }} />
      </Stack>
    </Stack>
  );
}
