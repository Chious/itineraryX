import SocketChat from "./SocketChat";
import { useState, useEffect } from "react";
import { getChats } from "../../api/chat";
import { joinRoom } from "../../socket/socketManager";

export default function ChatroomSocket({
  room,
  openChat,
  setOpenChat,
  isValid,
}) {
  // open or close chatroom
  const [chatroomMessage, setChatroomMessage] = useState([]);

  useEffect(async () => {
    if (room !== "" && isValid) {
      const response = await getChats(room);
      setChatroomMessage(response);
      joinRoom({ room });
    }
  }, [room, isValid]);

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
