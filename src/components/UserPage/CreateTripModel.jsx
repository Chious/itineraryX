import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useContext } from 'react';
import { createItinerary } from '../../api/userpage.jsx';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { useItineraries } from '../../context/UserPageContext.jsx';
import { IconButton } from '@mui/material';
import plusImage from '../../images/material/add.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your new itinerary
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
                  <Grid item xs={12}>
                    <DatePicker
                      label="Start day"
                      value={startValue ? startValue.format('YYYY-MM-DD') : null}
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
                  </Grid>
                </Grid>
              </DemoContainer>
            </LocalizationProvider>
            <Button onClick={handleClick}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}