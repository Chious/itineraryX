import { Box, Stack, TextField, Button } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Image from "mui-image";
import logo from "../assets/itineraryX_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/Login/LoginModal";
import { ItineraryRegister } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", account: null, password: "" });
  const [passwordCheck, setPasswordCheck] = useState(null);

  const handleName = (e) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleAccount = (e) => {
    setForm({ ...form, account: e.target.value });
  };

  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };

  const handlepasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleBack = () => {
    navigate("/login");
  };

  const checkValid = () => {
    const { name, account, password } = form;

    const isValidName = name.length !== 0 ? true : false;

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const isValidAccount = regex.test(account);

    const isValidPassword =
      password.length !== 0 && password === passwordCheck ? true : false;

    if (isValidPassword && isValidAccount && isValidName) {
      return true;
    } else if (!isValidPassword) {
      console.log("Password is invalid!");
      return false;
    } else if (!isValidAccount) {
      console.log("Account is invalid!");
      return false;
    } else if (!isValidName) {
      console.log("Name is not valud");
      return false;
    }
  };

  //Show modal after submit
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "", text: "預設" });

  const handleSubmit = async () => {
    const valid = checkValid();
    let timeout;

    // 1. If input is valid
    if (valid === true) {
      const { name, account, password } = form;
      //Send request to register account
      const result = await ItineraryRegister({
        name,
        account,
        password,
        passwordCheck,
      });

      // if respone done
      if (result !== undefined) {
        setOpen(true);
        if (result === true) {
          setMessage({ status: true, text: "註冊成功！" });
        } else if (result === "email") {
          setMessage({ status: false, text: "這個帳號已被註冊過了！" });
        } else if (result === "user") {
          setMessage({ status: false, text: "這個名稱已經被註冊過了！" });
        }
      }
      //Stop for a second to show result;
      timeout = setTimeout(() => {
        setOpen(false);
        if (result === true) {
          navigate("/user");
        }
        clearTimeout(timeout);
      }, 1000);
    }

    // 2. If input is invalid
    else if (valid === false) {
      //Open Modal Show Result

      setMessage({ status: false, text: "註冊失敗！" });
      setOpen(true);

      timeout = setTimeout(() => {
        setOpen(false);
        clearTimeout(timeout);
      }, 1000);
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
          sx={{ width: "400px", height: "450px", background: "white", p: 2 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <h1>註冊</h1>
          <Image src={logo} width="50%" fit="contain" />
          <TextField
            id="filled-basic"
            label="使用者名稱"
            variant="filled"
            placeholder="user123"
            type="text"
            sx={{ width: "350px" }}
            onChange={(e) => handleName(e)}
          />
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
            onChange={(e) => handlepasswordCheck(e)}
          />
          <LoginModal open={open} setOpen={setOpen} message={message} />
          <Stack direction="column" spacing={2}>
            <Button onClick={handleSubmit}>確認</Button>
            <Button onClick={handleBack}>返回</Button>
          </Stack>
        </Stack>
      </Box>
    </PrimarySearchAppBar>
  );
}
