import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Map from '../components/Map/Map';
import Panel from '../components/Panel/Panel';

const marginTop = ['85%', '50%', '0.1%'];

function Puller() {
  return (
    <div
      style={{
        width: '80px',
        height: '6px',
        borderRadius: '10px',
        backgroundColor: 'gray',
      }}
    ></div>
  );
}

export default function EditPageMobile({ marginIndex, isLoaded }) {
  return (
    <>
      <Stack
        container
        // direction="column"
        position="relative"
        sx={{ height: 'calc(100vh - 48px)' }}
      >
        <Map isLoaded={isLoaded} />

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            top: marginTop[marginIndex],
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            boxShadow: 10,
            overflow: 'hidden',
          }}
        >
          <Grid item padding={1.5}>
            <Puller />
          </Grid>
          <Grid item width="100%" height="95%">
            <Panel />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
