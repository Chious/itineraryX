import ListSubheader from '@mui/material/ListSubheader';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

export default function ListSubhead({ rwdColumn, day }) {
  return (
    <ListSubheader width="100%" sx={{ padding: '0', zIndex: '2' }}>
      <Grid item xs={rwdColumn} padding="1px 10px">
        <Chip
          label={`Day ${day}`}
          color="primary"
          sx={{
            width: '100%',
            '& .MuiChip-label': {
              color: 'white',
              fontWeight: 'bold',
            },
          }}
        />
      </Grid>
    </ListSubheader>
  );
}
