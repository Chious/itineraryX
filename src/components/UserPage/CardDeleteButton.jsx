import * as React from 'react';
import Button from '@mui/material/Button';
import { deleteItinerary } from '../../api/userpage';

export default function CardDeleteButtons({onClick, id, setCount, itineraries, setItineraries}) {
  const handleClick = () =>{
    // console.log(id)
    deleteItinerary(id)
    .then(data=>{
      const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id);
      setItineraries(updatedItineraries);
      setCount(updatedItineraries.length);
      // console.log(data)
    })
  }

  return (
    <Button variant="contained" onClick={handleClick}>Delete</Button>
  );
}