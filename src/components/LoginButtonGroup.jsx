import { Stack } from "@mui/material";
import logo from "../assets/logo.svg";
import Image from "mui-image";

export default function LoginButtonGroup() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ width: "50vw", height: "100vh" }}
      spacing={2}
    >
      <Image src={logo} height="10%" width="30%" fit="contain" />
      <h1>Connecting Stories That Matter</h1>
      <button>使用SPOTIFT帳號登入</button>
      <h2>沒有帳號嗎？註冊帳號</h2>
    </Stack>
  );
}
