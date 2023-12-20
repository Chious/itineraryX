import * as React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import EditUserAccount from '../UserPage/EditUserAccount';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Types = ({content, sx}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography gutterBottom marginBottom={0} sx={sx} fontFamily="Poppins">
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

  useEffect(()=>{
    setUserInfo(data)
    setUserName(data.name)
    setUserAvatar(data.avatar)
  }, [localStorage.getItem('user')])
  
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <ImageAvatars avatar={userInfo.avatar} />
        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
          <Types content={userName} sx={{fontSize:"40px", fontWeight:700, color:"#325269"}}/>
          <Types content={userInfo.email} sx={{fontSize:"15px", fontWeight:500, color:"#647680"}}/>
        </Stack>        
      </Stack>
      <Stack direction='row' spacing={2} marginTop={4}>
        <EditUserAccount userName={userName} userAvatar={userAvatar} setUserName={setUserName} setUserAvatar={setUserAvatar}/>
      </Stack>
    </div>
  );
}
