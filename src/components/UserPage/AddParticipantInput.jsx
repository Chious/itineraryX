import { Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import { addParticipant, getItinerary } from '../../api/userpage';

export default function AddParticipantInput({itineraryId, setParticipants}) {
  const [email, setEmail] = useState('')
  const handleAdd = () => {
    const payload = {
      itineraryId: itineraryId, 
      email: email
    }
    addParticipant(payload)
    .then(data => {
      getItinerary(itineraryId)
      .then(data => {
        setParticipants(data.ParticipantsUser)
      })
    })
  }

  return (
    <div>
      <Stack direction='row' spacing={2}>
        <TextField 
          required
          defaultValue='@example.com'
          onChange={(e)=>setEmail(e.target.value)}
          id="outlined-required"
          label="Add account"
        />
        <Button onClick={handleAdd}>Add</Button>
      </Stack>
    </div>
  )
}