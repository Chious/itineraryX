import { Stack } from "@mui/material";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";

export default function Message({ data }) {
  const chats = data.map((chat, index) => {
    const { id, user, message, time, avator } = chat;
    const userId = localStorage.getItem("userID");

    const date = new Date(time);

    const formattedDate = date.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });

    if (id === userId) {
      return <ChatRight message={message} time={formattedDate} key={index} />;
    } else {
      return (
        <ChatLeft
          user={user}
          message={message}
          time={formattedDate}
          avator={avator}
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
