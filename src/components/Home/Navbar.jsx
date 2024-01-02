import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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
import NavbarButtons from './NavbarButtons';

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

  // state and function for notification icon
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileNotificationAnchorEl, setMobileNotificationAnchorEl] = React.useState(null);

  const isNotificationOpen = Boolean(anchorEl2);

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

  return (
    <Stack width='100vw' height={{ xs: '48px', md: '64px' }}  flexGrow={1} boxSizing='border-box' justifyContent="center">
      <AppBar position="static" sx={{backgroundColor:'#325269'}} elevation={0} >
        <Toolbar boxSizing='border-box' style={{minHeight:'36px'}} >
          <CardMedia
            component="img"
            src={logo}
            title="background"
            elevation={0}
            onClick={() => navigate('/home1')}
            sx={{
              objectFit: 'cover',
              filter: 'invert(1)',
              WebkitFilter: 'invert(1)',
              cursor: 'pointer',
              '&:hover': {
                cursor: 'pointer',
              },
              width: { xs: '80px', md: '150px' },
              height: { xs: '20px', md: '30px' },
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={3} height={{ xs: '48px', md: '64px' }} alignItems='center'>
            {/* use isTokenExist to determine whether button need to be rendered */}
            {isTokenExist && 
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <NavbarButtons notificationId={notificationId} handleNotificationOpen={handleNotificationOpen} isTokenExist={isTokenExist} unReadNotification={unReadNotification} menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen}/>
              </Box>
              <NavbarMobileMoreModal sx={{ display: { xs: 'flex', md: 'none' } }} notificationId={notificationId} handleNotificationOpen={handleNotificationOpen} isTokenExist={isTokenExist} unReadNotification={unReadNotification} menuId={menuId} handleProfileMenuOpen={handleProfileMenuOpen} handleLogOut={handleLogOut}/>
            </>
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
                  backgroundColor:'#FE7A00',
                  color: 'white',
                  fontSize: {xs:'12px', md:'16px'}
                }}
              >
                Login
              </Button>
            }
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotification}
    </Stack>
  );
}
