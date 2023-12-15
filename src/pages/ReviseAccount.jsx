import { Box, Stack, TextField, Button } from "@mui/material";
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
      <TextField
        id="filled-basic"
        label="Account"
        variant="filled"
        placeholder="123@example.com"
        type="email"
        sx={{ width: "350px" }}
        onChange={(e) => handleAccount(e)}
      />
      <Stack direction="row" spacing={2}>
        <Button onClick={handleBack}>Return</Button>
        <Button
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
      <TextField
        value={form.password}
        id="filled-basic"
        label="password"
        variant="filled"
        type="password"
        sx={{ width: "350px" }}
        onChange={(e) => handlePassword(e)}
      />
      <TextField
        value={form.passwordCheck}
        id="filled-basic"
        label="double-check"
        variant="filled"
        type="password"
        sx={{ width: "350px" }}
        onChange={(e) => handlePasswordCheck(e)}
      />
      <Button onClick={handleConfirm}>Confirm</Button>
      <LoginModal open={open} setOpen={setOpen} message={message} />
    </Stack>
  );
};
