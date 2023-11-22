import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';

import {
  useItinerary,
} from '../../temp_data/trip_reducer';

export default function PanelControl() {
  const theme = useTheme();
  const lightPrimaryColor = theme.palette.primary.light;

  const itinerary = useItinerary();

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
        zIndex: 3,
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
