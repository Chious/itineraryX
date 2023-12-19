import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getChats = async (chatroomID) => {
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/chats/${chatroomID}`;

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
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/chats/`;

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

export const postChatFile = async ({ room, files }) => {
  const token = localStorage.getItem("token");
  if (!files?.length) {
    return "Length of file is 0";
  } else if (files?.length) {
    const formData = new FormData();

    const url = `${baseUrl}/chats/`;

    //Get Required Params
    const storedData = localStorage.getItem("user");
    const userInfo = JSON.parse(storedData);
    const userId = userInfo.id;

    formData.append("itineraryId", room);
    formData.append("userId", Number(userId));
    formData.append("isImage", true);
    files.forEach((file) => {
      formData.append("message", file);
    });

    const config = {
      method: "post",
      url: url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config)
      .then((data) => {
        return data.data.data.message;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return response;
  }
};

export const getChatId = async () => {
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/users/itineraryId`;

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios
    .get(url, config)
    .then((data) => {
      return data.data.data.itineraryId;
    })
    .catch((err) => {
      return [];
    });

  if (response !== undefined) {
    return response;
  }
};

export const getChatroomTitle = async (itineraryId) => {
  const token = localStorage.getItem("token");
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
