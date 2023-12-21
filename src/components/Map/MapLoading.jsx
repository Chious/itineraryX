import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import googleMapMarker from '@/assets/google-map-marker.png';

export default function MapLoading() {
  return (
    <>
      <Grid item width="100px" height="125px">
        <img
          src={googleMapMarker}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </Grid>
      <Grid item>
        <Typography color="primary" fontSize="1.5rem">
          Map is loading...
        </Typography>
      </Grid>
      <Grid item width="250px" height="10px">
        <LinearProgress />
      </Grid>
    </>
  );
}
