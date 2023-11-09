import { Box, Stack, TextField, Button } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Image from "mui-image";
import logo from "../assets/itineraryX_logo.png";
import { useState } from "react";
import { ItineraryLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/Login/LoginModal";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ account: null, password: null });

  // handle event in the form
  const handleAccount = (e) => {
    setForm({ ...form, account: e.target.value });
  };
  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };

  // Login
  //// Control Modal
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "", text: "預設" });

  const handleLogin = async () => {
    const { account, password } = form;
    let timeout;

    const result = await ItineraryLogin({ account, password });
    if (result !== undefined) {
      setOpen(true);
      if (result === true) {
        setMessage({ status: true, text: "登入成功！" });
      } else {
        setMessage({ status: false, text: "登入失敗！" });
      }
    }

    //Stop for a second to show result;
    timeout = setTimeout(() => {
      setOpen(false);
      if (result) {
        navigate("/user");
      }
      clearTimeout(timeout);
    }, 1000);
  };

  // Navigate to register page
  const handleRegister = () => {
    navigate("/register");
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
          sx={{ width: "400px", height: "400px", background: "white", p: 2 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <h1>登入</h1>
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
          <Stack direction="column" spacing={2}>
            <Button onClick={handleLogin}>登入</Button>
            <Button onClick={handleRegister}>註冊</Button>
            <LoginModal open={open} setOpen={setOpen} message={message} />
          </Stack>
        </Stack>
      </Box>
    </PrimarySearchAppBar>
  );
}
