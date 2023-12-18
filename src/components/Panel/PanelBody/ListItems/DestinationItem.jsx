import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DestinationCard from './DestinationCard';

export default function DestinationItem({
  order,
  day,
  destination,
  rwdColumns,
}) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;

  const datetime = new Date(destination.date);
  const hour_24hr = datetime.getUTCHours();
  const hour_12hr = `${hour_24hr === 12 ? 12 : hour_24hr % 12}`;
  const min = `${datetime.getUTCMinutes()}`;
  const time = `${hour_12hr.padStart(2, 0)}:${min.padStart(2, 0)}`;
  const am_pm = `${hour_24hr / 12 < 1 ? 'am' : 'pm'}`;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* display the time & order */}
      <Grid
        item
        className="time-and-order-container"
        xs={rwdColumns[0] - 1}
        sx={{
          p: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          className="order-container"
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{
            position: 'relative',
            width: '35px',
            height: '35px',
            borderRadius: '100%',
            boxShadow: `1px 1px 3px ${primaryLightColor}`,
            backgroundColor: primaryColor,
          }}
        >
          <Box className="time" sx={{ position: 'absolute', right: '125%' }}>
            <Typography
              color="primary.main"
              fontFamily="Roboto"
              fontSize="0.95rem"
              fontWeight="500"
              textAlign="end"
              letterSpacing={0.8}
            >
              {time}
              <br />
              {am_pm}
            </Typography>
          </Box>

          <Typography className="order" color="white" fontSize="0.9rem">
            {order + 1}
          </Typography>
        </Grid>
      </Grid>

      {/* display the destination */}
      <Grid item xs={rwdColumns[1]}>
        <DestinationCard day={day} destination={destination} />
      </Grid>
    </Grid>
  );
}
