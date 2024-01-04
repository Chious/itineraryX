import * as React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import EditUserAccount from '../UserPage/EditUserAccount';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getUserInfo } from '../../api/userpage';

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
        sx={{ width: {xs:65, md:90}, height: {xs:65, md:90} }}
      />
      <Types/>
    </Stack>
  );
}

export default function UserAccount() {
  const data = JSON.parse(localStorage.getItem('user'))
  const [userInfo, setUserInfo] =useState(data)
  const [userName, setUserName] = useState(data.name)
  const [userAvatar, setUserAvatar] = useState(data.avatar)

  // fetch up-to-date user info and render page & update user info data inside local storage
  useEffect(()=>{
    getUserInfo(data.id)
    .then(newData => {
      const {name, avatar} = newData.user
      setUserName(name)
      setUserAvatar(avatar)
      // update user info inside local storage
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify({...data, name: name, avatar: avatar}));
      const newUserInfo = localStorage.getItem('user');
      setUserInfo(JSON.parse(newUserInfo))
    })
  }, [localStorage.getItem('user')])
  
  return (
    <Stack width={{xs:'90%', md:'60%'}}>
      <Stack direction="row" spacing={{xs:0, md:2}} justifyContent='start'>
        <ImageAvatars avatar={userInfo.avatar} />
        <Stack direction='column' spacing={{xs:0, md:2}} alignItems='center' justifyContent='center'>
          <Types content={userName} sx={{fontSize:{xs:'20px', md:'30px'}}}/>
          <Types content={userInfo.email} sx={{fontSize:{xs:'10px', md:'20px'}}}/>
        </Stack>        
      </Stack>
      <Stack direction='row' spacing={2} marginTop={{xs:0, md:1}} justifyContent='center'>
        <EditUserAccount userName={userName} userAvatar={userAvatar} setUserName={setUserName} setUserAvatar={setUserAvatar}/>
      </Stack>
    </Stack>
  );
}
