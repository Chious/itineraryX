import { Box, Stack, Button } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import Image from "mui-image";
import logo from "../assets/itineraryX_logo.png";
import { useEffect, useRef, useState } from "react";
import {
  checkTokenValid,
  getForgetToken,
  patchResetAccount,
} from "../api/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginModal from "../components/Login/LoginModal";
import Navbar from "../components/Home/Navbar";

export default function ReviseAccount() {
  const [searchParams] = useSearchParams();
  const reset = useRef(searchParams.get("reset"));
  const token = useRef(searchParams.get("token"));

  const isReset =
    reset.current === "true" || token.current === null ? (
      <ReviseForm />
    ) : (
      <ConfirmForm />
    );

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
          {isReset}
        </Box>
      </Box>
    </div>
  );
}

const ReviseForm = () => {
  //Control Modal
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "", text: "Default" });

  //onhold input
  const [account, setAccount] = useState("");

  const handleAccount = (e) => {
    setAccount(e.target.value);
  };

  const handleBack = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (account !== "") {
      const response = await getForgetToken({ email: account });
      var timeout;

      if (response) {
        if (response !== undefined) {
          setOpen(true);
          if (response === "success") {
            setMessage({ status: true, text: "Sent reset email!" });
          } else {
            setMessage({ status: false, text: "Can't find user" });
          }
        }

        //Stop for a second to show result;
        timeout = setTimeout(() => {
          setOpen(false);
          if (response === "success") {
            navigate("/login");
          }
          clearTimeout(timeout);
        }, 1000);
      }
    }
  };

  return (
    <Stack
      sx={{ width: "400px", height: "400px", background: "white", p: 2 }}
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <h5>Forget Password</h5>
      <Image src={logo} width="50%" height="20%" fit="contain" />
      <Stack direction="column" spacing={1}>
        <label for="account">Account</label>
        <input
          name="account"
          placeholder="123@example.com"
          type="email"
          style={{
            width: "350px",
            height: "50px",
            padding: "5px",
            color: "black",
            background: "white",
          }}
          onChange={(e) => handleAccount(e)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            background: "white",
            color: "#325269",
            border: "2px solid #325269",
            "&:hover": { color: "#325269" },
          }}
          onClick={handleBack}
        >
          Return
        </Button>
        <Button
          sx={{
            background: "#325269",
            color: "white",
            border: "2px solid transparent",
            "&:hover": { color: "#325269", border: "2px solid #325269" },
          }}
          onClick={async () => {
            handleSubmit();
          }}
        >
          Confirm
        </Button>
      </Stack>
      <LoginModal open={open} setOpen={setOpen} message={message} />
    </Stack>
  );
};

const ConfirmForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    passwordCheck: "",
  });

  const [searchParams] = useSearchParams();
  const token = useRef(searchParams.get("token"));

  //Check if token is valid, if not redirect to home
  useEffect(async () => {
    if (token) {
      const response = await checkTokenValid({ token: token.current });

      if (response !== "success") {
        navigate("/home1");
      } else if (token === null) {
        navigate("/home1");
      }
    }
  }, []);

  // handle event in the form
  const handlePassword = (e) => {
    setForm({ ...form, password: e.target.value });
  };
  const handlePasswordCheck = (e) => {
    setForm({ ...form, passwordCheck: e.target.value });
  };

  // Confirm
  //// Control Modal
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "", text: "Default" });

  const handleConfirm = async () => {
    let timeout;
    const { password, passwordCheck } = form;
    const tokenCurrent = token.current;

    const checkFormValid =
      password !== "" && passwordCheck !== "" && password === passwordCheck
        ? true
        : false;

    if (checkFormValid) {
      const result = await patchResetAccount({
        password,
        passwordCheck,
        token: tokenCurrent,
      });
      if (result !== undefined) {
        setOpen(true);
        if (result === "success") {
          setMessage({ status: true, text: "Success" });
        } else {
          setMessage({ status: false, text: "Failed" });
        }

        //Stop for a second to show result;
        timeout = setTimeout(() => {
          setOpen(false);
          if (result) {
            navigate("/login");
          }
          clearTimeout(timeout);
        }, 1000);
      }
    } else {
      setOpen(true);
      setMessage({ status: false, text: "Invalid Value!" });
      //Stop for a second to show result;
      timeout = setTimeout(() => {
        setOpen(false);
        clearTimeout(timeout);
      }, 1000);
    }
  };

  return (
    <Stack
      sx={{ width: "400px", height: "400px", background: "white", p: 2 }}
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <h5>Reset Password</h5>
      <Image src={logo} width="20%" fit="contain" />
      <Stack direction="column" spacing={1}>
      <label for="password">New Password</label>
      <input
        value={form.password}
        name="password"
        type="password"
        style={{
            width: "350px",
            height: "50px",
            padding: "5px",
            color: "black",
            background: "white",
          }}
        onChange={(e) => handlePassword(e)}
      />
      <label for="double-check">Double Check Password</label>
      <input
        value={form.passwordCheck}
        name="double-check"
        type="password"
        style={{
            width: "350px",
            height: "50px",
            padding: "5px",
            color: "black",
            background: "white",
          }}
        onChange={(e) => handlePasswordCheck(e)}
      />
      </Stack>
      <Button
         sx={{
            background: "#325269",
            color: "white",
            border: "2px solid transparent",
            "&:hover": { color: "#325269", border: "2px solid #325269" },
          }}
          onClick={handleConfirm}>Confirm</Button>
      <LoginModal open={open} setOpen={setOpen} message={message} />
    </Stack>
  );
};
