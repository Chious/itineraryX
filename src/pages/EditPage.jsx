import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ForumIcon from '@mui/icons-material/Forum';
import Navbar from '../components/Home/Navbar.jsx';
import ChatroomSocket from '../components/Chatroom/ChatroomMain.jsx';
import EditPageDesktop from './EditPageDesktop.jsx';
import EditPageMobile from './EditPageMobile.jsx';
import { getChatId } from '../api/chat.jsx';
import { useTripInfo } from '../contexts/TripInfoContext.jsx';
import {
  useFetchDataAndCheckAuth,
  useEditPageSocket,
} from './EditPage.hook.jsx';

const libraries = ['places'];

export default function EditPage() {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const { itineraryId } = useParams();

  const [isValid, setIsValid] = useState(false); // check if user own the route
  const [openChat, setOpenChat] = useState(false); // open the Chatroom
  const handleOpenChat = () => setOpenChat(true);

  const [marginIndex, setMarginIndex] = useState(0); // margin top of mobile panel
  const handleMarginIndexChange = (newIndex) => setMarginIndex(newIndex);
  const tripInfoFetchFailed = useTripInfo().isFailed;
  useFetchDataAndCheckAuth();

  useEffect(() => {
    if (tripInfoFetchFailed) {
      alert(`This itinerary doesn't exist; redirecting to the home page.`);
      navigate('/home');
    }
  }, [tripInfoFetchFailed]);

  // websocket
  useEditPageSocket();

  // Load the Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_TOKEN,
    id: 'google-map-script',
    version: 'weekly',
    libraries: libraries,
  });

  // render chatroom or not
  useEffect(async () => {
    const ids = await getChatId();
    const isValidId = ids.includes(parseInt(itineraryId));
    setIsValid(isValidId);
  }, []);

  return (
    <Box
      className="container"
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'white',
      }}
    >
      {/* navbar */}
      <Box width="100%" height={{ xs: '48px', md: '64px' }} position="relative">
        <Navbar>
          <IconButton onClick={() => handleMarginIndexChange(2)}>
            <FormatListBulletedIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton onClick={() => handleMarginIndexChange(0)}>
            <LocationOnIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton onClick={handleOpenChat}>
            <ForumIcon sx={{ color: 'white' }} />
          </IconButton>
        </Navbar>
      </Box>

      {/* chatroom */}
      <ChatroomSocket
        openChat={openChat}
        setOpenChat={setOpenChat}
        room={itineraryId}
        isValid={isValid}
      />

      {/* edit page content */}
      {isDesktop ? (
        <EditPageDesktop handleOpenChat={handleOpenChat} isLoaded={isLoaded} />
      ) : (
        <EditPageMobile
          marginIndex={marginIndex}
          handleMarginIndexChange={handleMarginIndexChange}
          isLoaded={isLoaded}
        />
      )}
    </Box>
  );
}
