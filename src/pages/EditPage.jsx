import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Home/Navbar.jsx";
import { getChatId } from "../api/chat.jsx";
import ChatroomSocket from "../components/Chatroom/ChatroomMain.jsx";
import Panel from "../components/Panel/Panel";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../components/Map/Map";
import { useTripInfo } from "../contexts/TripInfoContext.jsx";
import {
  useFetchDataAndCheckAuth,
  useEditPageSocket,
} from "./EditPage.hook.jsx";

const libraries = ["places"];

export default function EditPage() {
  const navigate = useNavigate();
  const { itineraryId } = useParams();
  const [isValid, setIsValid] = useState(false); // check if user own the route
  const [openChat, setOpenChat] = useState(false); // open the Chatroom
  const handleOpenChat = () => setOpenChat(true);
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
      <Navbar />

      <ChatroomSocket
        openChat={openChat}
        setOpenChat={setOpenChat}
        room={itineraryId}
        isValid={isValid}
      />

      <Grid
        container
        className="content"
        direction="row"
        flexWrap="nowrap"
        sx={{ height: 'calc(100vh - 64px)' }}
      >
        {/* Panel component */}
        <Grid item md={4} minWidth="480px" height="100%">
          <Panel handleOpenChat={handleOpenChat} />
        </Grid>

        {/* Map component */}
        <Grid
          item
          md={8}
          flex={`1 1 ${'calc(100vw - 480px)'}`}
          sx={{ width: '100%', height: '100%' }}
        >
          <Map isLoaded={isLoaded} />
        </Grid>
      </Grid>
    </Box>
  );
}
