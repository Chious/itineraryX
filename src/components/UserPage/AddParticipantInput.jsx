import { Button, TextField, Stack, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { addParticipant, getItinerary } from '../../api/userpage';
import { sendNotification } from '../../socket/socketManager';

export default function AddParticipantInput({itineraryId, setParticipants, handleClose}) {
  const [email, setEmail] = useState('')
  const [notificationId, setNotificationId] = useState(null)
  const handleAdd = () => {
    const payload = {
      itineraryId: itineraryId, 
      email: email
    }
    addParticipant(payload)
    .then(data => {
      setNotificationId(data.data.participantId)
      getItinerary(itineraryId)
      .then(data => {
        setParticipants(data.ParticipantsUser)
        sendNotification(notificationId)
      })
    })
  }

  return (
    <div>
      <Stack direction='column' spacing={2}>
        <TextField 
          required
          defaultValue='@example.com'
          onChange={(e)=>setEmail(e.target.value)}
          id="outlined-required"
          label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">New participant email</Typography>}
          inputProps={{ style: { fontFamily: 'Poppins', fontWeight:500, color:"#647680", fontSize:"15px" } }}
          fullWidth
        />
        <Box display="flex">
          <Button 
            variant="text" 
            onClick={handleClose}
            sx={{ height: 40, padding: "0 10px", fontFamily: 'Poppins', fontSize: '20px', fontWeight: '600', color:'#647680' }} 
          >
            Cancel
          </Button>
          <Box sx={{ flexGrow: 1 }}/>
          <Button 
            variant="contained" 
            onClick={handleAdd} 
            sx={{ 
              height: 40, 
              padding: "0 15px", 
              fontFamily: 'Poppins', 
              fontSize: '20px', 
              fontWeight: '600', 
              color:'white', 
              backgroundColor:'#FE7A00',
            }}
          >
            Add
          </Button>
        </Box>
      </Stack>
    </div>
  )
}