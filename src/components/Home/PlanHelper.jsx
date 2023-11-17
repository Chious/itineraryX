import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomIcon from '@mui/icons-material/Room';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import Typography from '@mui/material/Typography';

export default function PlanHelper() {
  return (
    <Stack direction="row" spacing={4}>
      <Stack direction="column" alignItems="center">
        <IconButton aria-label="hotel">
          <HotelIcon fontSize='large'/>
        </IconButton>
        <Typography variant="caption" style={{fontSize:'1.3vw', fontWeight:'bold', color:'gray', fontFamily:'Poppins', fontWeight:600}}>Hotel</Typography>
      </Stack>
      <Stack direction="column" alignItems="center">
        <IconButton aria-label="flight" color="primary">
          <FlightIcon fontSize='large'/>
        </IconButton>
        <Typography variant="caption" style={{fontSize:'1.3vw', fontWeight:'bold', color:'gray', fontFamily:'Poppins', fontWeight:600}}>Transportation</Typography>
      </Stack>
      <Stack direction="column" alignItems="center">
        <IconButton color="secondary" aria-label="restaurant">
          <RestaurantIcon fontSize='large'/>
        </IconButton>
        <Typography variant="caption" style={{fontSize:'1.3vw', fontWeight:'bold', color:'gray', fontFamily:'Poppins', fontWeight:600}}>Restaurant</Typography>
      </Stack>
      <Stack direction="column" alignItems="center">
        <IconButton color="primary" aria-label="room">
          <RoomIcon fontSize='large'/>
        </IconButton>
        <Typography variant="caption" style={{fontSize:'1.3vw', fontWeight:'bold', color:'gray', fontFamily:'Poppins', fontWeight:600}}>Resort</Typography>
      </Stack>
      <Stack direction="column" alignItems="center">
        <IconButton color="primary" aria-label="thermostat">
          <ThermostatIcon fontSize='large'/>
        </IconButton>
        <Typography variant="caption" style={{fontSize:'1.3vw', fontWeight:'bold', color:'gray', fontFamily:'Poppins', fontWeight:600}}>Weather</Typography>
      </Stack>
    </Stack>
  );
}