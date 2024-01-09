import { useTheme } from '@emotion/react';
import ListSubheader from '@mui/material/ListSubheader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const dayNumberStyle = {
  width: '80%',
  minWidth: '85px',
  padding: 6,
  borderRadius: '1.1rem',
  color: 'white',
  fontWeight: '700',
};

export default function ListSubhead({ rwdColumn, day }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;

  return (
    <ListSubheader
      width="100%"
      sx={{
        margin: 0,
        padding: 0,
        backgroundColor: 'white',
        position: { xs: 'relative', md: 'sticky' },
        transform: 'translate(0,-5px)', // solve the gap problem of 'position: sticky'
      }}
    >
      <Grid item xs={rwdColumn} sx={{ padding: '0.8rem 1.3rem' }}>
        <Grid container justifyContent="center" alignItems="center">
          <div
            className="day-number-container"
            style={{
              ...dayNumberStyle,
              backgroundColor: primaryColor,
              boxShadow: `1.5px 1.5px 3px ${primaryLightColor}`,
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <Typography
                className="day-number"
                variant="subtitle2"
                color="white"
                letterSpacing={1}
              >
                Day {day}
              </Typography>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </ListSubheader>
  );
}
