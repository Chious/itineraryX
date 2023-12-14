import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { changeNotificationIsRead } from '../../api/home';
import Avatar from '@mui/material/Avatar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';

export default function NotificationButton ({sx, item, buttonClicked, setButtonClicked}) {
  return (
    <Box display='flex' flexDirection='row' alignItems='center' >
      <FiberManualRecordIcon sx={sx}/>
      <Button 
        style={{textTransform: 'none', margin:0}} 
        onClick={() => {
          changeNotificationIsRead(item.id)
          .then(() => {
            setButtonClicked(!buttonClicked)
          })
        }}
      >
        <Avatar
          alt="avatar" 
          src={item['Sender.avatar']}
          sx={{ width: 35, height: 35, marginRight: 2 }}
        />
        <Typography variant='body1' align='left' color='#325269' fontFamily='Poppins' fontWeight='600'>
          {item.message}
        </Typography>
      </Button>
    </Box>
  )
}