import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import DestinationItem from './DestinationItem';
import TransportationItem from './TransportationItem';

export default function DayItineraryContent({
  rwdColumns,
  destinationsByDay,
  day,
}) {
  if (!destinationsByDay) {
    return (
      <Grid key={`empty-${day}`} container justifyContent="flex-end">
        <Grid item xs={rwdColumns[1]}>
          <Typography>請點擊按鈕添加景點</Typography>
        </Grid>
      </Grid>
    );
  }

  return destinationsByDay.map((_, order) => (
    <>
      {order > 0 && (
        <ListItem key={`transport-${day}-${order}`} sx={{ padding: '1rem' }}>
          <TransportationItem rwdColumn={rwdColumns[1]} />
        </ListItem>
      )}
      <ListItem key={`destination-${day}-${order}`} sx={{ padding: 0 }}>
        <DestinationItem destination={destinationsByDay[order]} />
      </ListItem>
    </>
  ));
}
