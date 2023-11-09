import axios from "axios";

export const ItineraryLogin = async ({ account, password }) => {
  const url = import.meta.env.VITE_BASE_URL + "/users/login";
  const bodyParam = {
    email: account,
    password: password,
  };
  const result = await axios
    .post(url, bodyParam)
    .then((res) => {
      const token = res.data.data.token;
      localStorage.setItem("token", token);
      return true;
    })
    .catch((err) => {
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
  const url = import.meta.env.VITE_BASE_URL + "/users/signup";
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
      localStorage.setItem("token", token);
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
