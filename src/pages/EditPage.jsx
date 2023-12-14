import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Panel from "../components/Panel/Panel";
import {
  useFetchDataAndCheckAuth,
  useEditPageSocket,
} from './EditPage.hook.jsx';
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../components/Map/Map";
import ChatroomSocket from "../components/Chatroom/ChatroomMain.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChatId } from "../api/chat.jsx";
import Navbar from "../components/Home/Navbar.jsx";

const libraries = ["places"];

export default function EditPage() {
  const navigate = useNavigate();
  useFetchDataAndCheckAuth();
  useEditPageSocket();

  // 載入 Google Map API 的 script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_TOKEN,
    id: "google-map-script",
    version: "weekly",
    libraries: libraries,
  });

  //Open the Chatroom
  const { itineraryId } = useParams();
  const [openChat, setOpenChat] = useState(false);
  const handleOpenChat = () => {
    setOpenChat(true);
  };

  useEffect(async () => {
    const ids = await getChatId();
    const isValidId = ids.includes(Number(itineraryId));
    if (isValidId === false) {
      navigate("/home1");
    }
  }, []);

  return (
    <Box
      className="container"
      sx={{ height: '100vh', overflow: 'hidden', backgroundColor: 'white' }}
    >
      <Navbar />
      <ChatroomSocket
        openChat={openChat}
        setOpenChat={setOpenChat}
        room={itineraryId}
      />
      <Stack className="content" direction="row" height="100%">
        {/* Panel component */}
        <Box className="edit-panel" width="400px" height="100%">
          <Panel handleOpenChat={handleOpenChat} />
        </Box>

        {/* Map component */}
        <Box
          className="edit-map"
          sx={{ width: "calc(100vw - 400px)", height: "100%" }}
        >
          <Map isLoaded={isLoaded} />
        </Box>
      </Stack>
    </Box>
  );
}
