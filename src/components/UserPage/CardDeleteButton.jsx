import * as React from 'react';
import Button from '@mui/material/Button';
import { deleteItinerary } from '../../api/userpage';
import { useItineraries } from '../../context/UserPageContext';
import DeleteConfirmationModal from './CardDeleteConfirmModal';

export default function CardDeleteButtons({id}) {
  const {itineraries, setItineraries} = useItineraries()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div>
      <Button variant="text" onClick={handleOpen} size='medium' sx={{ height: 40, padding: 0 }}>Delete</Button>
      <DeleteConfirmationModal 
        open={open} 
        handleClose={handleClose} 
        handleConfirm={handleClick} 
      />
    </div>
  );
}