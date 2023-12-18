import { useState, useEffect } from "react";
import { Box, Stack, IconButton, TextField, ToggleButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Message from "./Message";
import Dropzone from "./Dropzone";
import { socket } from "../../socket/socket";
import { sendMessage } from "../../socket/socketManager";
import { postChat, getChatroomTitle, postChatFile } from "../../api/chat";
import DisplayFile from "./DisplayFile";

export default function SocketChat({
  openChat,
  setOpenChat,
  chatroomMessage,
  setChatroomMessage,
  room,
}) {
  const [roomTitle, setRoomTitle] = useState("Default");

  useEffect(async () => {
    if (room) {
      const response = await getChatroomTitle(room);
      setRoomTitle(response);
    }
  }, [room]);
  // Messages States
  const updateMessageReceived = (data) => {
    const { userId, user, message, time, avatar, isImage } = data;
    const newObj = {
      userId: userId,
      user: user,
      message: message,
      time: time,
      avatar: avatar,
      isImage: isImage,
    };
    setChatroomMessage((previous) => [...previous, newObj]);
  };

  useEffect(() => {
    function receiveData(data) {
      updateMessageReceived(data);
    }

    socket.on("receive_message", receiveData);

    return () => {
      socket.off("receive_message", receiveData);
    };
  }, [socket]);

  //Get Chatroom while open page
  const [messageInput, setMessageInput] = useState("");
  const [file, setFile] = useState([]);

  //Drop Icon
  const [updateIcon, setUpdateIcon] = useState(false);

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
        isImage: false,
      };

      sendMessage(sendMsg);
      const response = await postChat(sendMsg);

      if (response === "success") {
        setMessageInput("");
      }
    }

    //Send File
    if (file.length !== 0) {
      const storedData = localStorage.getItem("user");
      const userInfo = JSON.parse(storedData);
      const { id, avatar, name } = userInfo;
      const response = await postChatFile({ room: room, files: file });
      if (response !== null) {
        setFile([]);
      }

      const sendMsg = {
        userId: id,
        user: name,
        message: response,
        time: new Date(),
        avatar: avatar,
        room: room,
        isImage: true,
      };

      sendMessage(sendMsg);
    }
  };

  // Chatroom css setting
  const showCard =
    openChat === true ? { visibility: "visible" } : { visibility: "hidden" };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  return (
    <Box
      boxShadow={2}
      width="300px"
      height="298px"
      style={showCard}
      sx={{
        border: "1px solid transparent",
        borderRadius: "5px",
        position: "absolute",
        zIndex: 10,
        background: "white",
        right: 20,
        bottom: 20,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 0.5,
          background: "#325269",
          border: "1px solid transparent",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <h2
          style={{
            width: "280px",
            color: "white",
            fontWeight: 300,
            fontSize: "15px",
            padding: "5px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {roomTitle}
        </h2>
        <IconButton onClick={handleCloseChat}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Stack>
      <DisplayFile file={file} setFile={setFile} />
      <Dropzone
        file={file}
        setFile={setFile}
        updateIcon={updateIcon}
        setUpdateIcon={setUpdateIcon}
      />
      <Message data={chatroomMessage} openChat={openChat} />
      <Stack direction="row">
        <input
          style={{
            width: "100%",
            height: "44px",
            padding: "10px",
            background: "white",
            color: "black",
            border: "1px solid transparent",
            outline: "none",
          }}
          value={messageInput}
          id="standard-basic"
          label=""
          onChange={handleInput}
        />
        <ToggleButton
          sx={{ border: "1px solid transparent" }}
          value="check"
          onClick={async () => {
            await handleSubmit(messageInput);
          }}
        >
          <SendIcon />
        </ToggleButton>
        <ToggleButton
          sx={{ border: "1px solid transparent" }}
          onClick={() => setUpdateIcon(true)}
        >
          <AddAPhotoIcon />
        </ToggleButton>
      </Stack>
    </Box>
  );
}
