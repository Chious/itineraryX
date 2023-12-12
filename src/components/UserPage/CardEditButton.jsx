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
import { useItineraries } from '../../context/UserPageContext.jsx';

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

export default function EditTripModal({ id }) {
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
      <Button onClick={handleOpen} variant='text' size='medium' sx={{ height: 40, padding: 0 }} >Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your itinerary
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                      label="Trip title"
                      placeholder="Trip title"
                      onChange={handleChange}
                      value={title}
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
            <Button onClick={handleClick}  >Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}