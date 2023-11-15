import { Stack } from "@mui/material";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import data from "../../data/chat.json";

export default function Message() {
  const chats = data.map((chat) => {
    const { user, message, time, avator } = chat;

    if (user === "me") {
      return <ChatRight message={message} time={time} />;
    } else {
      return (
        <ChatLeft user={user} message={message} time={time} avator={avator} />
      );
    }
  });

  return (
    <Stack height="200px" sx={{ overflow: "scroll" }}>
      {chats}
    </Stack>
  );
}
