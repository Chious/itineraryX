import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ForumIcon from '@mui/icons-material/Forum';

import { useAuth, useTripInfo } from '../../temp_data/trip_reducer';

export default function PanelControl() {
  const canEdit = useAuth().canEdit;
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
        <ArrowBackIcon sx={{ color: 'black', cursor: 'pointer' }} />
        <Typography sx={{ fontWeight: 'bold' }}>{itinerary.title}</Typography>
      </Stack>
      <Stack className="icon-container" direction="row">
        {canEdit && <ForumIcon sx={{ color: 'black', cursor: 'pointer' }} />}
      </Stack>
    </Stack>
  );
}
