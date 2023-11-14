import axios from "axios";

const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getChats = async () => {
  const url = baseUrl + "/chats/1";

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

export const postChat = async ({ input }) => {
  const url = baseUrl + "/chats/";
  const userId = localStorage.getItem("userID");

  const bodyParams = {
    itineraryId: 1,
    userId: Number(userId),
    message: input,
    isImage: false,
  };

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios
    .post(url, config, bodyParams)
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
