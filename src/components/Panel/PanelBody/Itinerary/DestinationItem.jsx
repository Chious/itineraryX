import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DestinationCard from './DestinationCard';

export default function DestinationItem({ day, destination }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const datetime = new Date(destination.date);
  const hour_24hr = datetime.getUTCHours();
  const hour_12hr = `${hour_24hr === 12 ? 12 : hour_24hr % 12}`;
  const min = `${datetime.getUTCMinutes()}`;
  const time = `${hour_12hr.padStart(2, 0)}:${min.padStart(2, 0)}`;
  const am_pm = `${hour_24hr / 12 < 1 ? 'am' : 'pm'}`;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* display the time */}
      <Grid
        item
        xs={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          backgroundColor: 'white',
        }}
      >
        <Typography color={primaryColor}>{time}</Typography>
        <Typography color={primaryColor}>{am_pm}</Typography>
      </Grid>

      {/* display the destination */}
      <Grid item xs={9}>
        <DestinationCard day={day} destination={destination} />
      </Grid>
    </Grid>
  );
}
