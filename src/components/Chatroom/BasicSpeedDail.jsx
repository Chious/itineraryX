import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ChatIcon from "@mui/icons-material/Chat";
import { getChatId } from "../../api/chat";

export default function BasicSpeedDial({ setOpenChat, setRoom }) {
  const handleOpenChat = (key) => {
    setOpenChat(true);
    setRoom(key);
  };

  const [chatList, setChatList] = useState([1]);

  useEffect(async () => {
    const response = await getChatId();
    setChatList(response);
  }, []);

  const actions = chatList.map((chatId) => {
    return {
      icon: <ChatIcon onClick={() => handleOpenChat(chatId)} />,
      name: chatId,
    };
  });

  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "absolute",
        right: "50px",
        bottom: "50px",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
