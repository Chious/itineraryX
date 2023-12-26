import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  boxShadow: 24,
  p: 4,
  borderRadius:'10px',
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
};

// use isNameRepeat state variable as reference whether modal should open or not
export default function NameRepeatAlertModal({isNameRepeat, setIsNameRepeat}) {
  const handleClose = () => {
    setIsNameRepeat(false)
  }

  return (
    <Modal
      open={isNameRepeat}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography 
          variant="h5" 
          component="h2" 
          align="center"
          marginBottom={3}
          sx={{ padding: 0, fontFamily: 'Poppins', fontSize: '28px', fontWeight: '600', color:'#325269' }}
        >
          This user name is already in use by existing user
        </Typography>
        <Button 
          onClick={handleClose}
          variant="contained" 
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
          OK
        </Button>
      </Box>
    </Modal>
  );
}
