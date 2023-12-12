import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import TimelineConnector from './ListCommons/TimelineConnector';
import ListSubhead from './ListSubhead';
import ListItems from './ListItems';
import AddBtn from './ListCommons/AddBtn';
import { useAuth } from '@/contexts/AuthContext';

export default function ItineraryByDay({ day, handleFormOpen }) {
  const canEdit = useAuth().canEdit;
  const rwdColumns = [3, 9]; // grid system by MUI

  return (
    <>
      <Grid container className="daily-itinerary-grid" width="100%" padding={0}>
        <List
          className="daily-itinerary"
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
              <ListItem
                sx={{
                  paddingTop: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AddBtn onClick={() => handleFormOpen(day)} />
              </ListItem>
            </Grid>
          )}
        </List>
      </Grid>
    </>
  );
}
