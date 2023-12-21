import { socket } from "./socket";

export const joinRoom = ({ room }) => {
  if (room !== "") {
    socket.emit("join_room", room);
  }
};

export const sendMessage = (sendMsg) => {
  socket.emit("send_message", sendMsg);
};

export const sendDestinations = (sendDestinations) => {
  socket.emit("send_destinations", sendDestinations);
};

export const sendRoutes = (sendRoutes) => {
  socket.emit("send_routes", sendRoutes);
};

export const sendNotification = (data) => {
  socket.emit("send_notification", data);
};
