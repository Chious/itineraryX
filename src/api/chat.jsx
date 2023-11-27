import axios from "axios";

const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getChats = async (chatroomID) => {
  const url = baseUrl + `/chats/${chatroomID}`;

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios
    .get(url, config)
    .then((data) => {
      const result = data.data.data;
      return result;
    })
    .catch((err) => {
      return err;
    });

  if (response !== undefined) {
    return response;
  }
};

export const postChat = async (data) => {
  const url = baseUrl + "/chats/";

  //Get Required Params
  const storedData = localStorage.getItem("user");
  const userInfo = JSON.parse(storedData);
  const userId = userInfo.id;

  const { room, message } = data;

  const bodyParams = {
    itineraryId: room,
    userId: Number(userId),
    message: message,
    isImage: false,
  };

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios
    .post(url, bodyParams, config)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  if (response !== undefined) {
    return response.data.status;
  }
};

export const getChatId = async () => {
  const url = `${baseUrl}/users/itineraryId`;

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios
    .get(url, config)
    .then((data) => {
      return data.data.data.itineraryId;
    })
    .catch((err) => {
      return err;
    });

  if (response !== undefined) {
    return response;
  }
};

export const getChatroomTitle = async (itineraryId) => {
  console.log("getting");
  const url = `${baseUrl}/itineraries/${itineraryId}`;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios
    .get(url, config)
    .then((data) => {
      return data.data.data.title;
    })
    .catch((err) => console.log(err));

  return response;
};
