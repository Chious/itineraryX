import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { IconButton, Button } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationButton from './NotificationButton';

export default function NavbarMobileMoreModal({notification, unReadNotification, buttonClicked, setButtonClicked}) {
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
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Stack>
          <Button component={Link} to="/home1" sx={{height: '50px', fontFamily: 'Poppins', fontWeight: '700'}}>
            Start!
          </Button>
        </Stack>
        <Stack>
          <Button>
            <Badge badgeContent='2' color="error">
              <NotificationsIcon/>
            </Badge>
          </Button>
        </Stack>
          {notification.map((item) => (
            <Stack key={item.id} spacing={1} direction='row' justifyContent='flex-start' width={300}>
              {item.isRead === 0 ? (
                <Link to={item.redirectUrl}>
                  <NotificationButton sx={{color: 'red', opacity:'0.7'}} item={item} buttonClicked={buttonClicked} setButtonClicked={setButtonClicked}/>
                </Link>
              ) : (
                <NotificationButton sx={{opacity:'0'}} item={item} buttonClicked={buttonClicked} setButtonClicked={setButtonClicked}/>
              )}
            </Stack>
          ))}
        <Stack>
          <Button>
            <AccountCircle/>
          </Button>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      {[ 'right' ].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MoreIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
