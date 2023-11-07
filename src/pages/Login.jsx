import { Box, Stack, TextField, Button } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Image from "mui-image";
import logo from "../assets/itineraryX_logo.png";
import { useState } from "react";
import ItineraryLogin from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ account: null, password: null });

  const handleAccount = (e) => {
    setForm({ ...form, account: e.target.value });
  };

  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };

  const navigate = useNavigate();
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
          sx={{ width: "50%", height: "50%", background: "white", p: 2 }}
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
            <Button
              onClick={async () => {
                await ItineraryLogin();
              }}
            >
              登入
            </Button>
            <Button onClick={handleRegister}>註冊</Button>
          </Stack>
        </Stack>
      </Box>
    </PrimarySearchAppBar>
  );
}
