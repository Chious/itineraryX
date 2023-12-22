import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { editItinerary } from '../../api/userpage.jsx';
import { useItineraries } from '../../contexts/UserPageContext.jsx';

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

export default function CardEditButton({ id }) {
  const [title, setTitle] = useState('')
  const [open, setOpen] = React.useState(false);
  const {itineraries, setItineraries} = useItineraries()
  const handleOpen = () => {
    const itinerary = itineraries.find(itinerary => itinerary.id === id);
      if (itinerary) {
        setTitle(itinerary.title);
        setStartValue(dayjs(itinerary.startTime))
        setEndValue(dayjs(itinerary.endTime))
      }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const [startValue, setStartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);

  const handleChange = (e) => setTitle(e.target.value)

  // handle edit itinerary api
  const handleClick = () => {
    const tripData = {
      itineraryId: id,
      title:title,
      image:'/src/images/spot/California.jpeg',
      startTime: startValue.toISOString(),
      endTime: endValue.toISOString()
    }
    editItinerary(tripData)
    .then(data=>{
      // console.log(data)
      const newItineraries =
        itineraries.map(trip=>{
          if (trip.id === id) {
            return data
          } else {
            return trip
          }
        })
      setItineraries(
        newItineraries
      );
      handleClose()
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }

  useEffect(() => {
    setItineraries(itineraries)
  }, [itineraries]);

  // const today = dayjs();

  return (
    <div>
      <Button 
        onClick={handleOpen} 
        variant='text' 
        size='medium' 
        sx={{ height: 40, padding: 0, fontFamily: 'Poppins', fontSize: '16px', fontWeight: '600', color:'#325269' }} 
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" fontFamily="Poppins" fontWeight={600} color="#325269">
            Edit your itinerary
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: "10px 0", width: '100%' },
            }}
            noValidate
            autoComplete="off"
            marginTop={3}
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
                      sx={{margin:0, padding:0}}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <DatePicker
                      label="Start day"
                      value={startValue}
                      defaultValue={today}
                      onChange={(newValue) => setStartValue(newValue)}
                      disablePast
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="End day"
                      value={endValue}
                      defaultValue={today}
                      onChange={(newValue) => setEndValue(newValue)}
                      disablePast
                    />
                  </Grid> */}
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