import * as React from 'react';
import Button from '@mui/material/Button';
import { deleteItinerary } from '../../api/userpage';
import { useContext } from 'react';
import { ItinerariesContext } from '../../context/UserPageContext';

export default function CardDeleteButtons({id}) {
  const {itineraries, setItineraries, setCount} = useContext(ItinerariesContext)
  const handleClick = () =>{
    // console.log(id)
    deleteItinerary(id)
    .then(data=>{
      const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id);
      setItineraries(updatedItineraries);
      setCount(itineraries.length - 1);
      // console.log(data)
    })
  }

  return (
    <Button variant="contained" onClick={handleClick}>Delete</Button>
  );
}