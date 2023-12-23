import moment from 'moment';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DestinationCard from './DestinationCard';

function calcStayingTime(destination, nextDestination, route) {
  if (!route || !Object.keys(route).length > 0)
    return { stayingTime: null, formattedStayingTime: null };

  const stayingTime =
    moment(nextDestination.date).unix() -
    moment(destination.date).unix() -
    route.durationValue;

  const duration = moment.duration(stayingTime, 'seconds');
  const hour = duration.hours();
  const min = duration.minutes();

  const formattedStayingTime = `${hour} ${
    hour > 1 || hour < -1 ? 'hours' : ' hour'
  } ${min} ${min > 1 || min < -1 ? 'mins' : ' min'}`;

  return { stayingTime, formattedStayingTime };
}

export default function DestinationItem({
  order,
  day,
  destination,
  nextDestination,
  route,
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

  const { stayingTime, formattedStayingTime } = calcStayingTime(
    destination,
    nextDestination,
    route
  );

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
        <DestinationCard
          day={day}
          destination={destination}
          stayingTime={stayingTime}
          formattedStayingTime={formattedStayingTime}
        />
      </Grid>
    </Grid>
  );
}
