import * as React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import EditUserAccount from './EditUserAccount';

// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        alt="Remy Sharp" 
        src={avatar}
        sx={{ width: 80, height: 80 }}
      />
      <Types/>
    </Stack>
  );
}


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function DirectionStack() {
  const [userInfo, setUserInfo] =useState({})
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('user'))
    setUserInfo(data)
    setUserName(data.name)
    setUserAvatar(data.avatar)
  }, [])
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <ImageAvatars avatar={userInfo.avatar} />
        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
          <Types content={userName} sx={{fontSize:'30px'}}/>
          <Types content={userInfo.email} />
        </Stack>        
      </Stack>
      <Stack direction='row' spacing={2}>
        <EditUserAccount userName={userName} userAvatar={userAvatar} setUserName={setUserName} setUserAvatar={setUserAvatar}/>
      </Stack>
    </div>
  );
}
