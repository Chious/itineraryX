import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useContext } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { editItinerary, editUserAccount } from '../../api/userpage.jsx';
import { ItinerariesContext } from '../../context/UserPageContext.jsx';
import { UploadFileTwoTone } from '@mui/icons-material';
import UploadInput from './UploadInput.jsx';

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 5,
  p: 4,
  marginTop: 5
};

export default function EditUserAccount({userName, userAvatar, setUserName, setUserAvatar}) {
  const [tempName, setTempName] = useState('')
  const [tempAvatar, setTempAvatar] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNameChange = (e) => setTempName(e.target.value)
  const handleAvatarChange = (e) => setTempAvatar(e.target.value)

  const handleClick = () => {

    const userData = {
      name: tempName,
      avatar: tempAvatar
    }

    editUserAccount(userData)
    .then(data =>{
      // console.log(data)
      setUserName(data.name)
      setUserAvatar(data.avatar)
      const userInfo = localStorage.getItem('user')
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify({...JSON.parse(userInfo), name: data.name}))
    }
    )
  }

  useEffect(() => {
    setTempName(userName)
    setTempAvatar(userAvatar)
  }, [userName, userAvatar]);

  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Your user name"
                  placeholder="Your user name"
                  onChange={handleNameChange}
                  value={tempName}
                  defaultValue={tempName}
                />
              </Grid>
              <Grid item xs={12}>
                <UploadInput tempAvatar={tempAvatar} setTempAvatar={setTempAvatar} tempName={tempName}/>
              </Grid>
            </Grid>
            <Button onClick={handleClick}  >Save change</Button>
          </Box>
        </Typography>
      </Box>
    </div>
  );
}