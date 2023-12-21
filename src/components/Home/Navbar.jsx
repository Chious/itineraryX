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
import { Link, useNavigate } from 'react-router-dom';
import { getNotification } from '../../api/home';
import NotificationButton from './NotificationButton';
import logo from '../../images/material/ItineraryX Logo.png'
import NavbarMobileMoreModal from './NavbarMobileMoreModal';
import { joinRoom } from '../../socket/socketManager';
import { socket } from '../../socket/socket';

export default function Navbar() {
  // state to store notification fetch data
  const [notification, setNotification] = React.useState([])

  // state as dependency to trigger rerender after notification clicked
  const [buttonClicked, setButtonClicked] = React.useState(false);

  // state to store unread notification
  const [unReadNotification, setUnReadNotification] = React.useState([])

  // use token inside local storage to decide whether login or not
  const [isTokenExist, setIsTokenExist] = React.useState(
    localStorage.getItem('token') || false
  );

  // state for if socket receive notification and need rerender or not
  const [needRerender, setNeedRerender] = React.useState(false)

  const navigate = useNavigate()

  // fetch notification data, rerender when socket receive notification
  React.useEffect(() => {
    // page validation & fetch notification data
    if (isTokenExist) {
      const fetchNotification = async () => {
        getNotification()
        .then(data => {
          setNotification(data)
        })
      };

      fetchNotification();
      return
    }

    setNotification([])
  }, [buttonClicked, needRerender]);

  // join individual notification room based on userId
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const userId = JSON.parse(localStorage.getItem('user')).id

      // socket detect whether receive new notification
      joinRoom({ room: `userId-${userId}` })
      socket.on('receive_notification', () => {
        setNeedRerender(!needRerender)
      })
      return () => {
        socket.off('receive_notification', () => { console.log('123') })
      }
    }
  }, [socket, needRerender])

  // filter out unread notification
  React.useEffect(() => {
    if (isTokenExist) {
      const unreadNum = [...notification].filter(item => item.isRead === 0) 
      setUnReadNotification(unreadNum)
      return
    }
    setUnReadNotification([])
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

  // log out event handle function
  const handleLogOut = () => {
    localStorage.clear()
    setIsTokenExist(false)
    setAnchorEl(false)
    setNotification([])
    navigate('/home1')
  }

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
        <MenuItem onClick={handleMenuClose} sx={{color:'#325269', fontFamily:'Poppins', fontWeight:'600'}}>Profile</MenuItem>
      </Link>
        <MenuItem onClick={handleLogOut} sx={{color:'#325269', fontFamily:'Poppins', fontWeight:'600'}}>Log out</MenuItem>
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
      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Button component={Link} to="/user" sx={{height: '50px', fontFamily: 'Poppins', fontWeight: '700'}}>
          Start!
        </Button>
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
      </Box>
    </Menu>
    // <NavbarMobileMoreModal notification={notification} unReadNotification={unReadNotification}/>
  );

  return (
    <Stack width='100vw' height='64px' flexGrow={1} boxSizing='border-box'>
      <AppBar position="static" sx={{backgroundColor:'#325269'}} elevation={0}>
        <Toolbar>
          <CardMedia
            style={{width:'150px', height:'30px', objectFit:'cover', filter: 'invert(1)', WebkitFilter: 'invert(1)'}}
            component="img"
            src={logo}
            title="background"
            elevation={0}
            onClick={() => navigate('/home1')}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                cursor: 'pointer',
              }
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={3}>
            {/* use isTokenExist to determine whether button need to be rendered */}
            {isTokenExist && 
              <div>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Button component={Link} to="/user" sx={{color:'white', fontFamily:'Poppins', fontWeight:700}}>Start!</Button>
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
                          color:'white'
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
                      },
                    }}
                    disabled={!isTokenExist}
                  >
                    <AccountCircle 
                      sx={{
                        color:'white'
                      }}
                    />
                  </IconButton>
                </Box>
              </div>
            }
            {!isTokenExist && 
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                size='medium' 
                sx={{ 
                  fontFamily:'Poppins', 
                  fontWeight:600, 
                  fontSize: '16px',
                  backgroundColor:'#FE7A00',
                  color: 'white',
                }}
              >
                Login
              </Button>
            }
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
    </Stack>
  );
}
