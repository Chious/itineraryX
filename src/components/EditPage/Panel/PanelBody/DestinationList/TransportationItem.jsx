import { Grid, Stack, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function TransportationItem() {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={9}>
        <Stack direction="row" spacing={1} padding={1.5}>
          <DirectionsCarIcon color="black" />
          <Typography>約 10 分</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
