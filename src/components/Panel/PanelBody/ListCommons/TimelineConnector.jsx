import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';

export default function TimelineConnector({ rwdColumn }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

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
          width: '3.5px',
          position: 'absolute',
          top: '0',
          bottom: '20px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          background: `radial-gradient(circle closest-side, ${primaryColor} 70%, #0000) center / 100% 10px`,  // dotted line
        }}
      ></div>
    </Grid>
  );
}

/*

[ dashed line ]

background:
    `repeating-linear-gradient(to bottom, rgba(0,0,0,0.5) 0,
    rgba(0,0,0,0.5) 4px, rgba(255,255,255,0) 4px,
    rgba(255,255,255,0) 14px)`,

[ rounded dashed line ]

background:
    'radial-gradient(circle closest-side, #325269 98%, #0000) center / 100% 11px, linear-gradient(#325269 50%, #0000 0) center / 100% 22px',

[ dotted line ]

1.

background:
    `radial-gradient(circle closest-side, ${primaryColor} 100%, #0000) center / 100% 9px`,

2.

backgroundImage:
    `radial-gradient(grey 15%, transparent 16%), radial-gradient(grey 15%, transparent 16%)`,
backgroundSize: '1rem 1rem',
backgroundPosition: 'center, center',

*/
