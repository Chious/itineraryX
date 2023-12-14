import { Box } from "@mui/material";
import SocketChat from "../components/Chatroom/SocketChat";
import BasicSpeedDial from "../components/Chatroom/BasicSpeedDail";
import { useState, useEffect } from "react";
import { getChats } from "../api/chat";
import { joinRoom } from "../socket/socketManager";
import Navbar from "../components/Home/Navbar";

export default function ChatroomSocket() {
  // open or close chatroom
  const [openChat, setOpenChat] = useState(false);
  const [room, setRoom] = useState("");
  const [chatroomMessage, setChatroomMessage] = useState([]);

  useEffect(async () => {
    if (room !== "") {
      const response = await getChats(room);
      setChatroomMessage(response);
      console.log("chatroom message: ", response);
      joinRoom({ room });
    }
  }, [room]);

  return (
    <div>
      <Navbar/>
      <Box
        sx={{
          background: "#F4F4F4",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SocketChat
          openChat={openChat}
          setOpenChat={setOpenChat}
          room={room}
          chatroomMessage={chatroomMessage}
          setChatroomMessage={setChatroomMessage}
        />
        <BasicSpeedDial setOpenChat={setOpenChat} setRoom={setRoom} />
      </Box>
    </div>
  );
}
