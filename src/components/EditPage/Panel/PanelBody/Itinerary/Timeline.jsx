import Grid from '@mui/material/Grid';

export default function Timeline({ rwdColumn }) {
  return (
    <Grid
      item
      className="timeline"
      xs={rwdColumn}
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
      }}
    >
      <div
        className="timeline"
        style={{
          width: '2px',
          position: 'absolute',
          top: '0',
          bottom: '20px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          background:
            'radial-gradient(circle closest-side, #4b9ed9 98%, #0000) center / 100% 5px, linear-gradient(#4b9ed9 50%, #0000 0) center / 100% 10px',
        }}
      ></div>
    </Grid>
  );
}
