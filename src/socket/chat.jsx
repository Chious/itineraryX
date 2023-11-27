import { useState, useEffect } from "react";
import { Box, Stack, IconButton, TextField, ToggleButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Message from "../components/Chatroom/Message";
import { socket } from "./socket";
import { sendMessage } from "./socketManager";
import { postChat, getChatroomTitle } from "../api/chat";

export default function SocketChat({
  openChat,
  setOpenChat,
  chatroomMessage,
  setChatroomMessage,
  room,
}) {
  const [roomTitle, setRoomTitle] = useState("Default");

  useEffect(async () => {
    const response = await getChatroomTitle(room);
    setRoomTitle(response);
  }, []);

  // Messages States
  const updateMessageReceived = (data) => {
    const { userId, user, message, time, avatar } = data;
    const newObj = {
      userId: userId,
      user: user,
      message: message,
      time: time,
      avatar: avatar,
    };

    const updateArray = chatroomMessage;
    updateArray.push(newObj);

    setChatroomMessage(updateArray);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      updateMessageReceived(data);
    });
  }, [socket]);

  //Get Chatroom while open page
  const [messageInput, setMessageInput] = useState("");

  /*
    const getChat = await getChats();
    getChatId();

    if (getChat !== undefined) {
      setData("getChat:", getChat);
    }*/

  const handleInput = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSubmit = async (messageInput) => {
    if (messageInput.length !== 0) {
      const storedData = localStorage.getItem("user");
      const userInfo = JSON.parse(storedData);
      const { id, avatar, name } = userInfo;

      const sendMsg = {
        userId: id,
        user: name,
        message: messageInput,
        time: new Date(),
        avatar: avatar,
        room: room,
      };

      sendMessage(sendMsg);
      const response = await postChat(sendMsg);

      if (response === "success") {
        setMessageInput("");
      }
    }
  };

  // Chatroom css setting
  const showCard =
    openChat === true ? { visibility: "visible" } : { visibility: "hidden" };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  return (
    <Box boxShadow={2} width="300px" height="303px" style={showCard}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 0.5, background: "#F4F4F4" }}
      >
        <p>{roomTitle}</p>
        <IconButton onClick={handleCloseChat}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Message data={chatroomMessage} />
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
            await handleSubmit(messageInput);
          }}
        >
          <SendIcon />
        </ToggleButton>
      </Stack>
    </Box>
  );
}
