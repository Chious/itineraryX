import { Box, Stack } from "@mui/material";
import Image from "mui-image";

export default function ChatRight({ message, time, isImage }) {
  const imgSrc = message;
  const renderMessage = isImage ? (
    <Image src={imgSrc} duration={0} />
  ) : (
    <p>{message}</p>
  );

  return (
    <Stack sx={{ p: 1 }} spacing={1} alignItems="flex-end">
      <Box sx={{ background: "#F7E896", p: 1, width: "70%" }}>
        {renderMessage}
      </Box>
      <p style={{ width: "100px", textAlign: "end" }}>{time}</p>
    </Stack>
  );
}
