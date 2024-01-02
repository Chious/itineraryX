import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import NavbarButtons from './NavbarButtons';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function NavbarMobileMoreModal({notificationId, handleNotificationOpen, isTokenExist, unReadNotification, menuId, handleProfileMenuOpen, handleLogOut}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '150px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NavbarButtons 
        notificationId={notificationId} 
        handleNotificationOpen={handleNotificationOpen} 
        isTokenExist={isTokenExist} 
        unReadNotification={unReadNotification} 
        menuId={menuId} 
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleLogOut={handleLogOut}
      />
    </Box>
  );

  return (
    <div style={{margin:0}}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor} >
          <IconButton onClick={toggleDrawer(anchor, true)} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MoreVertIcon style={{ color: 'white' }} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              sx: { width: '150px',  } // Set the width here
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
