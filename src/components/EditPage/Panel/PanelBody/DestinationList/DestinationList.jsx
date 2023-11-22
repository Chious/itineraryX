import * as React from 'react';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Timeline from '../Timeline';
import DestinationItem from './DestinationItem';
import TransportationItem from './TransportationItem';
import AddBtn from '../AddBtn';

import { useDestinations } from '../../../temp_data/trip_reducer';
import { Typography } from '@mui/material';

export default function DestinationList({ day }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [destinations, setDestinations] = React.useState([]);
  const data = useDestinations();

  React.useEffect(() => {
    if (data && data.length > 0) {
      setDestinations(data[day - 1]);
      setIsLoading(false);
    }
  }, [data, day]);

  return isLoading ? (
    <Grid>Loading...</Grid>
  ) : (
    <>
      <Grid container className="location-list-grid" width="100%" padding={0}>
        <List
          className="location-list"
          subheader={<ListSubheader />}
          sx={{
            width: '100%',
            position: 'relative',
          }}
        >
          {/* timeline */}
          <Grid
            item
            xs={3}
            className="timeline"
            sx={{
              position: 'absolute',
              top: '0',
              left: '0',
              bottom: '0',
              right: '0',
            }}
          >
            <Timeline />
          </Grid>

          {/* display day number with list subheader */}
          <ListSubheader width="100%" sx={{ padding: '0', zIndex: '2' }}>
            <Grid item xs={3} padding="1px 10px">
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

          {/* display transportation & destination */}
          {destinations ? (
            Array(destinations.length).fill().map((_, itemId) => (
              <>
                {itemId > 0 && <TransportationItem />}
                <ListItem key={`item-${day}-${itemId}`} sx={{ padding: 0 }}>
                  <DestinationItem destination={destinations[itemId]} />
                </ListItem>
              </>
            ))
          ) : (
            <Grid container justifyContent="flex-end">
              <Grid item xs={9}>
                <Typography>請點擊按鈕添加景點</Typography>
              </Grid>
            </Grid>
          )}

          {/* display add button */}
          <Grid item xs={3}>
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
