import axios from "axios";

export default async function ItineraryLogin() {
  const url = import.meta.env.VITE_BASE_URL + "/users/signup";
  const bodyParam = {
    email: "user01@example.com",
    password: "12345678",
  };
  axios
    .post(url, bodyParam)
    .then((data) => {
      const token = data.data.token;
      localStorage.setItem("token", token);
    })
    .catch((err) => console.log(err));
}
