import * as React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { changeNotificationIsRead } from '../../api/home';
import Avatar from '@mui/material/Avatar';

export default function NotificationButton ({item, buttonClicked, setButtonClicked}) {
  return (
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
        sx={{ width: 30, height: 30, marginRight: 1 }}
      />
      <Typography variant='h5'>
        {item.message}
      </Typography>
    </Button>
  )
}