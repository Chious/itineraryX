import SocketChat from "./SocketChat";
import { useState, useEffect } from "react";
import { getChats } from "../../api/chat";
import { joinRoom } from "../../socket/socketManager";

export default function ChatroomSocket({ room, openChat, setOpenChat }) {
  // open or close chatroom
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
      <SocketChat
        openChat={openChat}
        setOpenChat={setOpenChat}
        room={room}
        chatroomMessage={chatroomMessage}
        setChatroomMessage={setChatroomMessage}
      />
    </div>
  );
}
