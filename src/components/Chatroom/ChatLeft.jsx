import { Box, Stack, Avatar } from "@mui/material";
import Image from "mui-image";

export default function ChatLeft({ user, message, time, avatar, isImage }) {
  const firstName = user[0];
  const avatarIcon =
    avatar === null ? (
      <Avatar>{firstName}</Avatar>
    ) : (
      <Image
        src={avatar}
        duration={0}
        width="40px"
        height="40px"
        fit="cover"
        style={{ border: "1px solid none", borderRadius: "20px" }}
      />
    );

  const imgSrc = message instanceof File ? message.preview : message;
  const renderMessage = isImage ? (
    <Image src={imgSrc} duration={0} />
  ) : (
    <p>{message}</p>
  );

  return (
    <Stack sx={{ p: 1 }} spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {avatarIcon}
        <p>{user}</p>
      </Stack>

      <Box sx={{ background: "#A8DCFD", p: 1, width: "70%" }}>
        {renderMessage}
      </Box>
      <p>{time}</p>
    </Stack>
  );
}
