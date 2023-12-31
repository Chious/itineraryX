import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import TimelineConnector from './ListCommons/TimelineConnector';
import ListSubhead from './ListSubhead';
import ListItems from './ListItems';
import AddBtn from './ListCommons/AddBtn';
import { useAuth } from '@/contexts/AuthContext';

export default function ItineraryByDay({ day, handleFormOpen }) {
  const canEdit = useAuth().canEdit;
  const rwdColumns = [4, 8]; // grid system by MUI

  return (
    <Grid container width="100%" marginBottom={5} padding={0}>
      <List
        className="itinerary-by-day-list"
        subheader={<ListSubheader />}
        sx={{
          width: '100%',
          position: 'relative',
        }}
      >
        {/* the timeline positioned on the left side of DayItinerary */}
        <TimelineConnector rwdColumn={rwdColumns[0]} />

        {/* display day number with list subheader component */}
        <ListSubhead rwdColumn={rwdColumns[0]} day={day} />

        {/* display transportation & destination */}
        <ListItems rwdColumns={rwdColumns} day={day} />

        {/* display add button */}
        {canEdit && (
          <Grid item xs={rwdColumns[0]}>
            <Grid container justifyContent="center" alignItems="center">
              <Box
                sx={{
                  width: '45px',
                  height: '45px',
                }}
              >
                <AddBtn onClick={() => handleFormOpen(day)} />
              </Box>
            </Grid>
          </Grid>
        )}
      </List>
    </Grid>
  );
}
