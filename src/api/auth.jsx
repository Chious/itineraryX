import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

export const ItineraryLogin = async ({ account, password }) => {
  const url = base_url + "/users/login";
  const bodyParam = {
    email: account,
    password: password,
  };
  const result = await axios
    .post(url, bodyParam)
    .then((res) => {
      const token = res.data.data.token;
      const user = res.data.data.user;
      const { id, name, avatar } = user;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: id, name: name, avatar: avatar })
      );

      return true;
    })
    .catch((err) => {
      console.log(err);
      if (err.request.status === 500) {
        console.log("Error account or password");
        return false;
      } else {
        console.log("unknown error");
        return false;
      }
    });

  return result;
};

export const ItineraryRegister = async ({
  name,
  account,
  password,
  passwordCheck,
}) => {
  const url = base_url + "/users/signup";
  const bodyParam = {
    name: name,
    email: account,
    password: password,
    passwordCheck: passwordCheck,
  };
  const result = await axios
    .post(url, bodyParam)
    .then((res) => {
      const token = res.data.data.token;
      const user = res.data.data.user;
      const { id, name, avatar } = user;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: id, name: name, avatar: avatar })
      );
      return true;
    })
    .catch((err) => {
      if (err.request.status === 500) {
        //console.log("Error account or password");
        if (err.request.message === "Error: Email already exist") {
          return "email";
        } else {
          return "user";
        }
      } else {
        //console.log("unknown error");
        return false;
      }
    });

  return result;
};

export const getUser = async () => {
  const url = base_url + "/users/";
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  axios
    .get(token, config)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getForgetToken = async ({ email }) => {
  const url = base_url + "/users/forgetPassword";
  const bodyParams = { email: email };

  const response = axios
    .post(url, bodyParams)
    .then((data) => {
      console.log(data.data.data.link);
      return "success";
    })
    .catch((err) => {
      return "failed";
    });

  return response;
};

export const patchResetAccount = async ({ token, password, passwordCheck }) => {
  const url = base_url + "/users/forgetPassword";
  const bodyParams = {
    token: token,
    password: password,
    passwordCheck: passwordCheck,
  };

  const response = axios
    .patch(url, bodyParams)
    .then((data) => {
      return "success";
    })
    .catch((err) => {
      return "failed";
    });

  return response;
};
