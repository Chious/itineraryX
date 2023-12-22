import React from 'react';
import { Button, Modal, Box, Typography, Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

export default function DeleteConfirmationModal({ open, handleClose, handleConfirm }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography 
          id="modal-modal-title" 
          variant="h5" 
          component="h2" 
          textAlign='center'
          sx={{ height: 40, padding: 0, fontFamily: 'Poppins', fontSize: '28px', fontWeight: '600', color:'#325269' }} 
        >
          Are you sure to delete this itinerary?
        </Typography>
        <Stack display="flex" flexDirection="row" spacing={1} useFlexGap p={1.5} marginTop={8}>
          <Button 
            variant="text" 
            onClick={handleClose} 
            sx={{ height: 40, padding: "0 10px", fontFamily: 'Poppins', fontSize: '20px', fontWeight: '600', color:'#647680' }} 
          >
            Cancel
          </Button>
          <Box sx={{ flexGrow: 1 }} bgcolor='white' />
          <Button 
            variant="contained" 
            onClick={handleConfirm} 
            sx={{ 
              height: 40, 
              padding: "0 10px", 
              fontFamily: 'Poppins', 
              fontSize: '20px', 
              fontWeight: '600', 
              color:'white', 
              backgroundColor:'#FE7A00',
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
