import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import DestinationCard from './DestinationCard';

export default function DestinationItem({ number }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      {/* display the time */}
      <Grid
        item
        xs={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Chip
          label={`${'08:00'}`}
          sx={{
            backgroundColor: 'white',
            zIndex: '1',
            '& .MuiChip-label': {
              // 自定義label文字的樣式
              color: primaryColor,
              fontSize: '1rem',
              fontWeight: 'bold',
            },
          }}
        />
      </Grid>

      {/* display the destination */}
      <Grid item xs={9}>
        <DestinationCard />
      </Grid>
    </Grid>
  );
}
