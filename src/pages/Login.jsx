import { Card, Stack } from "@mui/material";
import IntroGallery from "../components/IntroGallery";
import LoginButtonGroup from "../components/LoginButtonGroup";

export default function Login() {
  return (
    <Card sx={{ width: "100vw", height: "100vh" }}>
      <Stack direction="row">
        <LoginButtonGroup />
        <IntroGallery />
      </Stack>
    </Card>
  );
}
