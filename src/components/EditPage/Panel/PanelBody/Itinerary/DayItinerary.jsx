import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';

import Timeline from './Timeline';
import DayNumber from './DayNumber';
import DayItineraryContent from './DayItineraryContent';
import AddBtn from '../AddBtn';

import {
  useIsLoading,
  useDestinations,
  useDestinationsDispatch,
} from '../../../temp_data/trip_reducer';

export default function DayItinerary({ day }) {
  const isLoading = useIsLoading();
  const destinations = useDestinations();
  const rwdColumns = [3, 9]; // grid system by MUI

  if (isLoading) {
    // 優化：skeleton loading / skeleton preview
    return <Grid>Loading...</Grid>;
  }

  return (
    <>
      <Grid container className="day-itinerary-grid" width="100%" padding={0}>
        <List
          className="day-itinerary"
          subheader={<ListSubheader />}
          sx={{
            width: '100%',
            position: 'relative',
          }}
        >
          {/* timeline */}
          <Timeline rwdColumn={rwdColumns[0]} />

          {/* display day number with list subheader */}
          <DayNumber rwdColumn={rwdColumns[0]} day={day} />

          {/* display transportation & destination */}
          <DayItineraryContent
            rwdColumns={rwdColumns}
            destinationsByDay={destinations[day - 1]}
            day={day}
          />

          {/* display add button */}
          <Grid item xs={rwdColumns[0]}>
            <ListItem
              sx={{
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AddBtn />
            </ListItem>
          </Grid>
        </List>
      </Grid>
    </>
  );
}
