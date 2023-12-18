import { Stack } from "@mui/material";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import { useEffect, useRef } from "react";

export default function Message({ data, openChat }) {
  const chats = data.map((chat, index) => {
    const { userId, user, message, time, avatar, isImage } = chat;
    const storedData = localStorage.getItem("user");
    const userInfo = JSON.parse(storedData);
    const userID = userInfo.id;

    const date = new Date(time);

    const formattedDate = date.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });

    if (userId === Number(userID)) {
      return (
        <ChatRight
          message={message}
          time={formattedDate}
          key={index}
          isImage={isImage}
        />
      );
    } else {
      return (
        <ChatLeft
          user={user}
          message={message}
          time={formattedDate}
          avatar={avatar}
          key={index}
          isImage={isImage}
        />
      );
    }
  });

  //scroll view to bottom of chatroom, after setup
  const ref = useRef();

  useEffect(() => {
    if (openChat === true) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [openChat]);

  return (
    <Stack
      ref={ref}
      height="200px"
      sx={{ overflow: "scroll", position: "relative", zIndex: 1 }}
    >
      {chats}
    </Stack>
  );
}
