import * as React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import EditUserAccount from './EditUserAccount';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Types = ({content, sx}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="body1" gutterBottom marginBottom={0} sx={sx}>
        {content}
      </Typography>
    </Box>
  );
}

const ImageAvatars = ({avatar}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar 
        alt="avatar" 
        src={avatar}
        sx={{ width: 100, height: 100 }}
      />
      <Types/>
    </Stack>
  );
}

export default function UserAccount() {
  const [userInfo, setUserInfo] =useState({})
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const data = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      setUserInfo(data)
      setUserName(data.name)
      setUserAvatar(data.avatar)
    } else {
      navigate('/home1')
    }
  }, [localStorage.getItem('token')])

  
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <ImageAvatars avatar={userInfo.avatar} />
        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
          <Types content={userName} sx={{fontSize:'30px'}}/>
          <Types content={userInfo.email} />
        </Stack>        
      </Stack>
      <Stack direction='row' spacing={2} marginTop={4}>
        <EditUserAccount userName={userName} userAvatar={userAvatar} setUserName={setUserName} setUserAvatar={setUserAvatar}/>
      </Stack>
    </div>
  );
}
