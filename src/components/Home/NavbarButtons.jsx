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
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Button 
          component={Link} 
          to="/user" 
          sx={{
            color: { xs: '#325269', md: 'white' }, 
            fontFamily: 'Poppins', 
            fontWeight: 700,
          }}
        >
          Start!
        </Button>
        <IconButton
          size="large"
          edge="end"
          aria-label="show new notifications"
          aria-controls={notificationId}
          aria-haspopup="true"
          onClick={handleNotificationOpen}
          sx={{
            margin:'0',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
          disabled={!isTokenExist}
        >
          <Badge badgeContent={unReadNotification.length} color="error">
            <NotificationsIcon 
              sx={{
                color: { xs: '#325269', md: 'white' }
              }}
            />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          sx={{
            margin:'0',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%'
            },
            display: { md: 'block', xs: 'none' }
          }}
          disabled={!isTokenExist}
        >
          <AccountCircle 
            sx={{
              color: { xs: '#325269', md: 'white' }
            }}
          />
        </IconButton>
          <Button 
            component={Link} 
            to="/account" 
            sx={{
              color: { xs: '#325269', md: 'white' }, 
              fontFamily: 'Poppins', 
              fontWeight: 700,
              textAlign:'center',
              display: { md: 'none', xs: 'block' }
            }}
          >
            Profile
          </Button>
        <Button 
          sx={{
            color: { xs: '#325269', md: 'white' }, 
            fontFamily: 'Poppins', 
            fontWeight: 700,
            display: { md: 'none', xs: 'block' }
          }}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </Stack>
    </div>
  )
}