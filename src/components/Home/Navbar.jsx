import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getNotification } from '../../api/home';
import NotificationButton from './NotificationButton';

export default function Navbar() {
  // state to store notification fetch data
  const [notification, setNotification] = React.useState([])

  // state as dependency to trigger rerender after notification clicked
  const [buttonClicked, setButtonClicked] = React.useState(false);

  // state to store unread notification
  const [unReadNotification, setUnReadNotification] = React.useState([])

  // fetch notification data
  React.useEffect(() => {
    const fetchNotification = async () => {
      getNotification()
      .then(data => {
        setNotification(data)
        // console.log(data)
      })
    };

    fetchNotification();
  }, [buttonClicked]);

  // filter out unread notification
  React.useEffect(() => {
    const unreadNum = [...notification].filter(item => item.isRead === 0) 
    setUnReadNotification(unreadNum)
    // console.log(unreadNum)
  }, [notification])

  // state and function for profile icon
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // state and function for notification icon
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileNotificationAnchorEl, setMobileNotificationAnchorEl] = React.useState(null);

  const isNotificationOpen = Boolean(anchorEl2);
  const isMobileNotificationOpen = Boolean(mobileNotificationAnchorEl);

  const handleNotificationOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMobileNotificationClose = () => {
    setMobileNotificationAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setAnchorEl2(null);
    handleMobileNotificationClose();
  };

  // modal pop up after click profile icon
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 80, left: window.innerWidth}}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/account'>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
    </Menu>
  );

  // modal pop up after click notification icon
  const notificationId = 'primary-notification-menu';
  const renderNotification = (
    <Menu
      anchorEl={anchorEl2}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 80, left: window.innerWidth}}
      id={notificationId}
      keepMounted
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      <Stack spacing={1} direction='column' p={2} >
        {/* render notification */}
        {notification.map((item) => (
          <Stack key={item.id} spacing={1} direction='row' justifyContent='flex-start'>
            {item.isRead === 0 ? (
              <Link to={item.redirectUrl}>
                <NotificationButton sx={{color: 'red', opacity:'0.6'}} item={item} buttonClicked={buttonClicked} setButtonClicked={setButtonClicked}/>
              </Link>
            ) : (
              <NotificationButton sx={{opacity:'0'}} item={item} buttonClicked={buttonClicked} setButtonClicked={setButtonClicked}/>
            )}
          </Stack>
        ))}
      </Stack>
    </Menu>
  );

  // modal after click more icon under mobile mode
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 70,
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 0,
        horizontal: 0,
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotificationOpen}>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={unReadNotification.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Stack width='100vw' height='auto' direction='column'>
      <Box>
        <AppBar position="static" sx={{backgroundColor:'#B4C4D9'}} elevation={0}>
          <Toolbar>
            <Link to="/home1">
              <CardMedia
                style={{width:'10vw', height:'1.2vw', objectFit:'cover'}}
                image="/src/images/material/ItineraryX Logo.png"
                title="background"
                elevation={0}
              />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={3}>
              <Button component={Link} to="/user" sx={{color:'#38358C', fontFamily:'Poppins', fontWeight:500}}>Start!</Button>
              <Button component={Link} to="/login" variant="contained" size='large' sx={{backgroundColor:'#38358C', fontFamily:'Poppins', fontWeight:500}}>Login</Button>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="show new notifications"
                  aria-controls={notificationId}
                  aria-haspopup="true"
                  onClick={handleNotificationOpen}
                  color="inherit"
                >
                  <Badge badgeContent={unReadNotification.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderNotification}
      </Box>
    </Stack>
  );
}
