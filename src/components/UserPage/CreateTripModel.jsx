import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { createItinerary } from '../../api/userpage.jsx';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { useItineraries } from '../../contexts/UserPageContext.jsx';
import { IconButton } from '@mui/material';
import plusImage from '../../images/material/add.png'

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

export default function CreateTripModal({sx}) {
  const [title, setTitle] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startValue, setStartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);
  const {itineraries, setItineraries} = useItineraries()

  const handleChange = (e) => setTitle(e.target.value)

  // create itinerary API, and reset title, startDay, endDay after click confirm
  const handleClick = () => {
    const tripData = {
      title:title,
      startTime: startValue.toISOString(),
      endTime: endValue.toISOString()
    }
    createItinerary(tripData)
    .then(data=>{
      setItineraries([...itineraries, data]);
      handleClose()
      setStartValue(null)
      setEndValue(null)
      setTitle('')
    })
  }

  const today = dayjs();

  return (
    <div>
      <IconButton onClick={handleOpen} sx={sx} size='small' bgcolor='blue'>
        <img src={plusImage} alt="Create Trip" width={50} height={50}/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" fontFamily="Poppins" fontWeight={600} color="#325269">
            Your new itinerary
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: "10px 0", width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="outlined-required"
                      label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Trip title</Typography>}
                      placeholder="Trip title"
                      onChange={handleChange}
                      value={title}
                      InputLabelProps={{ required: false }}
                      inputProps={{ style: { fontFamily: 'Poppins', fontWeight:500, color:"#647680", fontSize:"20px" } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Start day</Typography>}
                      value={startValue}
                      defaultValue={today}
                      onChange={(newValue) => setStartValue(newValue)}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">End day</Typography>}
                      value={endValue}
                      defaultValue={today}
                      onChange={(newValue) => setEndValue(newValue)}
                      disablePast
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </DemoContainer>
            </LocalizationProvider>
            <Box display="flex" marginTop={2}>
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
                onClick={handleClick} 
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
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
