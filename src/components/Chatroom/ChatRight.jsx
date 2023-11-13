import { Box, Stack } from "@mui/material";

export default function ChatRight({ message, time }) {
  return (
    <Stack sx={{ p: 1 }} spacing={1} alignItems="flex-end">
      <Box sx={{ background: "#F7E896", p: 1, width: "70%" }}>{message}</Box>
      <p style={{ width: "100px" }}>{time}</p>
    </Stack>
  );
}
