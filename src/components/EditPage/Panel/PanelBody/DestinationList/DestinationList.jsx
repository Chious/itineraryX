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

export default function DestinationList({ index }) {
  return (
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
                label={`Day ${index + 1}`}
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
          {Array.from({ length: 5 }).map((_, itemID) => (
            <>
              {itemID > 0 && <TransportationItem />}
              <ListItem
                key={`item-${index + 1}-${itemID + 1}`}
                sx={{ padding: 0 }}
              >
                <DestinationItem number={itemID + 1} />
              </ListItem>
            </>
          ))}

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
