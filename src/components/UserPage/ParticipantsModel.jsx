import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteParticipant, getItinerary } from '../../api/userpage';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddParticipantInput from './AddParticipantInput';
import { sendNotification } from '../../socket/socketManager';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

export default function ParticipantsModal({id, holderId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [participants, setParticipants] = React.useState({})
  const [refresh, setRefresh] = React.useState(false)
  const itineraryId = id

  const handleDelete = (payload) => {
    deleteParticipant(payload)
    .then(data => {
      const updatedParticipants = participants.filter(participant => participant.id !== payload.participantId);
      setParticipants(updatedParticipants);
      setRefresh(!refresh)
      sendNotification({ room: `userId-${payload.participantId}` })
    })
  }

  React.useEffect(()=>{
    if (open) {
      getItinerary(id)
      .then(data => {
        // console.log(data.ParticipantsUser)
        setParticipants(data.ParticipantsUser)
      }
      )
    }
  },[id, open, refresh])

  return (
    <div>
      <MoreVertIcon onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="secondary mailbox folders">
              <Typography 
                variant='h5' 
                fontFamily="Poppins" 
                fontWeight={600} 
                color="#325269"
              >
                Participants list
              </Typography>
              <List sx={{mb:'30px'}}>
                {Array.isArray(participants) && participants.map(item => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton>
                      <Typography fontFamily="Poppins" fontWeight={500} color="#647680" variant="body1">{item.name}</Typography>
                    </ListItemButton>
                    {item.id !== holderId && 
                      <IconButton 
                        aria-label="delete" 
                        onClick={() => {
                          handleDelete({itineraryId: itineraryId, participantId: item.id})
                        }}
                      >
                        <DeleteIcon color="red" sx={{color:"#647680"}} />
                      </IconButton>
                    }
                  </ListItem>
                ))}
              </List>
              <AddParticipantInput itineraryId={itineraryId} setParticipants={setParticipants} handleClose={handleClose}/>
            </nav>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}