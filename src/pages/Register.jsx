import { Box, Stack, TextField, Button } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Image from "mui-image";
import logo from "../assets/itineraryX_logo.png";
import { useState } from "react";
import ItineraryLogin from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ account: null, password: "" });
  const [doublecheck, setDoublecheck] = useState(null);

  const handleAccount = (e) => {
    setForm({ ...form, account: e.target.value });
  };

  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };

  const handleDoublecheck = (e) => {
    setDoublecheck(e.target.value);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/login");
  };

  const checkValid = () => {
    const { account, password } = form;

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const isValidAccount = regex.test(account);

    const isValidPassword =
      password.length !== 0 && password === doublecheck ? true : false;

    if (isValidPassword && isValidAccount) {
      return console.log("success!");
    } else if (!isValidPassword) {
      console.log("Password is invalid!");
    } else if (!isValidAccount) {
      console.log("Account is invalid!");
    }
  };

  return (
    <PrimarySearchAppBar>
      <Box
        sx={{
          background: "#F4F4F4",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{ width: "50%", height: "60%", background: "white", p: 2 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <h1>註冊</h1>
          <Image src={logo} width="50%" fit="contain" />
          <TextField
            id="filled-basic"
            label="帳號"
            variant="filled"
            placeholder="123@example.com"
            type="email"
            sx={{ width: "350px" }}
            onChange={(e) => handleAccount(e)}
          />
          <TextField
            id="filled-basic"
            label="密碼"
            variant="filled"
            type="password"
            sx={{ width: "350px" }}
            onChange={(e) => handlePassword(e)}
          />
          <TextField
            id="filled-basic"
            label="再次確認密碼"
            variant="filled"
            type="password"
            sx={{ width: "350px" }}
            onChange={(e) => handleDoublecheck(e)}
          />
          <Stack direction="column" spacing={2}>
            <Button onClick={checkValid}>確認</Button>
            <Button onClick={handleBack}>返回</Button>
          </Stack>
        </Stack>
      </Box>
    </PrimarySearchAppBar>
  );
}
