import moment from 'moment';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import DestinationCard from './DestinationCard';

export default function DestinationItem({ destination }) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const time = moment(destination.date).format('hh:mm a');

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
          label={`${time}`}
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
        <DestinationCard destination={destination} />
      </Grid>
    </Grid>
  );
}
