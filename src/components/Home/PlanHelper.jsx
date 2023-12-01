import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RoomIcon from '@mui/icons-material/Room';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import Typography from '@mui/material/Typography';

const IconText = ({ IconComponent, text }) => (
  <Stack direction="column" alignItems="center">
    <IconButton aria-label={text}>
      <IconComponent fontSize='large'/>
    </IconButton>
    <Typography variant="caption" style={{fontSize:'1.3vw', color:'gray', fontFamily:'Poppins', fontWeight:600}}>{text}</Typography>
  </Stack>
  );

  export default function PlanHelper() {
  const iconList = [
    { IconComponent: HotelIcon, text: 'Hotel' },
    { IconComponent: FlightIcon, text: 'Transportation' },
    { IconComponent: RestaurantIcon, text: 'Restaurant' },
    { IconComponent: RoomIcon, text: 'Resort' },
    { IconComponent: ThermostatIcon, text: 'Weather' }
  ]

  return (
    <Stack direction="row" spacing={4}>
      {iconList.map((icon, index) => <IconText key={index} {...icon} />)}
    </Stack>
  );
}
