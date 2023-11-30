import { Grid, Stack, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

const icons = {
  driving: <DirectionsCarIcon color="black" />,
  walking: <DirectionsWalkIcon color="black" />,
  bicycling: <PedalBikeIcon color="black" />,
};

export default function TransportationItem({ rwdColumn, route }) {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={rwdColumn}>
        <Stack direction="row" spacing={1}>
          {icons[route.transportationMode]}
          <Typography>about {route.durationText}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
