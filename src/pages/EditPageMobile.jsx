import { useState } from 'react';
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

export default function EditPageMobile({
  marginIndex,
  handleMarginIndexChange,
  isLoaded,
}) {
  const [touchStartY, setTouchStartY] = useState(0);
  const handleTouchStart = (e) => setTouchStartY(e.changedTouches[0].screenY);
  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].screenY;
    if (touchEndY > touchStartY && marginIndex > 0)
      handleMarginIndexChange(marginIndex - 1);
    if (touchEndY < touchStartY && marginIndex < 2)
      handleMarginIndexChange(marginIndex + 1);
  };

  return (
    <>
      <Stack
        container
        position="relative"
        sx={{ height: 'calc(100vh - 48px)' }}
      >
        {/* map */}
        <Map isLoaded={isLoaded} />

        {/* panel */}
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
            transition: 'all 0.2s ease',
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            width="100%"
            padding={1.5}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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
