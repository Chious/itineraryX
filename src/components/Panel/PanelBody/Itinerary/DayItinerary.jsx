import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Timeline from './Timeline';
import DayNumber from './DayNumber';
import DayItineraryContent from './DayItineraryContent';
import AddBtn from '../AddBtn';
import { useAuth } from '@/contexts/AuthContext';

export default function DayItinerary({ day }) {
  const canEdit = useAuth().canEdit;
  const rwdColumns = [3, 9]; // grid system by MUI

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
          {/* the timeline positioned on the left side of DayItinerary */}
          <Timeline rwdColumn={rwdColumns[0]} />

          {/* display day number with list subheader component */}
          <DayNumber rwdColumn={rwdColumns[0]} day={day} />

          {/* display transportation & destination */}
          <DayItineraryContent rwdColumns={rwdColumns} day={day} />

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
                <AddBtn />
              </ListItem>
            </Grid>
          )}
        </List>
      </Grid>
    </>
  );
}
