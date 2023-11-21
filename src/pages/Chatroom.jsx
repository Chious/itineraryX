import { Box, Stack, ToggleButton, TextField, IconButton } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Message from "../components/Chatroom/Message";

import { getChats, postChat } from "../api/chat";
import { useEffect, useState } from "react";
import BasicSpeedDial from "../components/Chatroom/BasicSpeedDail";

export default function Chatroom() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]); // Save message in the chatroom

  useEffect(async () => {
    const getChat = await getChats();

    if (getChat !== undefined) {
      setData(getChat);
    }
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (input) => {
    if (input.length !== 0) {
      const response = await postChat(input);

      if (response === "success") {
        const getChat = await getChats();
        setInput("");

        if (getChat !== undefined) {
          setData(getChat);
        }
      }
    }
  };

  // open or close chatroom

  const [openChat, setOpenChat] = useState(false);
  const showCard =
    openChat === true ? { visibility: "visible" } : { visibility: "hidden" };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  return (
    <PrimarySearchAppBar>
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
        <Stack
          sx={{ width: "50%", height: "60%", background: "white", p: 2 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <h1>Chatroom</h1>
          <Box boxShadow={2} width="300px" height="303px" style={showCard}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ p: 0.5, background: "#F4F4F4" }}
            >
              <p>Chatroom title</p>
              <IconButton onClick={handleCloseChat}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Message data={data} />
            <Stack direction="row">
              <TextField
                id="standard-basic"
                label="Standard"
                variant="filled"
                fullWidth
                onChange={handleInput}
              />
              <ToggleButton
                value="check"
                onClick={async () => {
                  await handleSubmit(input);
                }}
              >
                <SendIcon />
              </ToggleButton>
            </Stack>
          </Box>
          <BasicSpeedDial setOpenChat={setOpenChat} />
        </Stack>
      </Box>
    </PrimarySearchAppBar>
  );
}
