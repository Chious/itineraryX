import { Stack } from "@mui/material";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";

export default function Message({ data }) {
  const chats = data.map((chat, index) => {
    const { userId, user, message, time, avatar } = chat;
    const userID = localStorage.getItem("userID");

    const date = new Date(time);

    const formattedDate = date.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });

    if (userId === Number(userID)) {
      return <ChatRight message={message} time={formattedDate} key={index} />;
    } else {
      return (
        <ChatLeft
          user={user}
          message={message}
          time={formattedDate}
          avatar={avatar}
          key={index}
        />
      );
    }
  });

  return (
    <Stack height="200px" sx={{ overflow: "scroll" }}>
      {chats}
    </Stack>
  );
}
