import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Map from '../components/Map/Map';
import Panel from '../components/Panel/Panel';

const marginTop = ['85%', '50%', '0.2%'];

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
      <Box width="100%" height="calc(100vh - 48px)" position="relative">
        {/* map */}
        <Box height="86%">
          <Map width="100%" isLoaded={isLoaded} />
        </Box>

        {/* panel */}
        <Box
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
            transition: 'top 0.2s ease',
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="30px"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Puller />
          </Grid>

          <Box width="100%" height="calc(100% - 30px)">
            <Panel handleMarginIndexChange={handleMarginIndexChange} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
