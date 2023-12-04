import * as React from 'react';
import Button from '@mui/material/Button';
import { deleteItinerary } from '../../api/userpage';
import { useItineraries } from '../../context/UserPageContext';

export default function CardDeleteButtons({id}) {
  const {itineraries, setItineraries} = useItineraries()
  const handleClick = () =>{
    // console.log(id)
    deleteItinerary(id)
    .then(data=>{
      const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id);
      setItineraries(updatedItineraries);
      // console.log(data)
    })
  }

  return (
    <Button variant="contained" onClick={handleClick}>Delete</Button>
  );
}