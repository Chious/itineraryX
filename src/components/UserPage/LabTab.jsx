import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ItineraryCards from './ItineraryCards';
import { useItineraries } from '../../contexts/UserPageContext';

export default function LabTab() {
  // get MY ITINERARIES & JOINED ITINERARIES data
  const { itineraries, joinedItineraries } = useItineraries()
  const [ value, setValue ] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value={0} label="My itineraries" />
        <Tab value={1} label="Joined itineraries" />
      </Tabs>

      {/* use conditional render to pass corresponded data to ItineraryCards */}
      {value === 0 ? 
        <ItineraryCards 
          itineraries={itineraries} 
        /> : 
        <ItineraryCards 
          itineraries={joinedItineraries} 
        />
      }
    </Box>
  );
}