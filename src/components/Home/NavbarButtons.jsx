import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavbarButtons ({
  notificationId, 
  handleNotificationOpen, 
  isTokenExist, 
  unReadNotification, 
  menuId, 
  handleProfileMenuOpen,
  handleLogOut
}) 
{

  return (
    <div>
      <Stack direction={{ xs: 'column', md: 'row' }} height={48} paddingTop={0}>
        <IconButton
          sx={{
            margin:'0',
            borderRadius: '10px 10px 10px 10px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <Button 
            component={Link} 
            to="/user" 
            sx={{
              width:'100%',
              color: { xs: '#325269', md: 'white' }, 
              fontFamily: 'Poppins', 
              fontWeight: 700,
              fontSize:{md:'18px'},
              margin:{
                xs:'0px', md:'8px'
              },
              '&:hover': {
                color: {xs:'#325269', md:'white'}
              }
            }}
          >
            Start plan!
          </Button>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="show new notifications"
          aria-controls={notificationId}
          aria-haspopup="true"
          onClick={handleNotificationOpen}
          sx={{
            margin:'0',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
          disabled={!isTokenExist}
        >
          <Badge badgeContent={unReadNotification.length} color="error" >
            <NotificationsIcon 
              sx={{
                color: { xs: '#325269', md: 'white' },
                display: { xs: 'none', md: 'inline-block' }
              }}
            />
            <Button
              sx={{
                color: { xs: '#325269', md: 'white' }, 
                fontFamily: 'Poppins', 
                fontWeight: 700,
                textAlign:'center',
                width:'100%',
                display: { xs: 'block', md: 'none' },
                margin:{
                  xs:'0px', md:'8px'
                },
              }}
            >
              Notification
            </Button>
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="show new notifications"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          sx={{
            margin:'0',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
          disabled={!isTokenExist}
        >
          <AccountCircle 
            sx={{
              color: { xs: '#325269', md: 'white' },
              display: { md: 'block', xs: 'none' },
            }}
          />
          <Button
            component={Link} 
            to="/account" 
            sx={{
              color: { xs: '#325269', md: 'white' }, 
              fontFamily: 'Poppins', 
              fontWeight: 700,
              textAlign:'center',
              display: { xs: 'block', md: 'none' },
              width:'100%',
              '&:hover': {
                color: '#325269',
              }
            }}
          >
            Profile
          </Button>
        </IconButton>
        <Button 
          sx={{
            color: { xs: '#325269', md: 'white' }, 
            fontFamily: 'Poppins', 
            fontWeight: 700,
            display: { md: 'none', xs: 'block' },
            margin:{
              xs:'12px', md:'8px'
            },
          }}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </Stack>
    </div>
  )
}