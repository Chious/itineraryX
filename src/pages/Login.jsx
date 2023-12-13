import { Box, Stack, TextField, Button } from "@mui/material";
import Image from "mui-image";
import logo from "../assets/itineraryX_logo.png";
import { useState } from "react";
import { ItineraryLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/Login/LoginModal";
import Navbar from "../components/Home/Navbar";

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
  const [message, setMessage] = useState({ status: "", text: "Default" });

  const handleLogin = async () => {
    const { account, password } = form;
    let timeout;

    const result = await ItineraryLogin({ account, password });
    if (result !== undefined) {
      setOpen(true);
      if (result === true) {
        setMessage({ status: true, text: "Success!" });
      } else {
        setMessage({ status: false, text: "Failed!" });
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

  // Forget password

  const handleForget = () => {
    navigate("/reset-password/?reset=true");
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
        bgcolor="white"
      >
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
            <h2 style={{ fontWeight: "500" }}>Login</h2>
            <Image src={logo} width="50%" fit="contain" />
            <TextField
              id="filled-basic"
              label="Account"
              variant="filled"
              placeholder="123@example.com"
              type="email"
              sx={{ width: "350px" }}
              onChange={(e) => handleAccount(e)}
            />
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              type="password"
              sx={{ width: "350px" }}
              onChange={(e) => handlePassword(e)}
            />
            <Stack direction="column" spacing={2}>
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={handleRegister}>Register</Button>
              <LoginModal open={open} setOpen={setOpen} message={message} />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
