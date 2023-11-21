import { socket } from "./socket";

export const joinRoom = ({ room }) => {
  if (room !== "") {
    socket.emit("join_room", room);
  }
};

export const sendMessage = (sendMsg) => {
  socket.emit("send_message", sendMsg);
};
