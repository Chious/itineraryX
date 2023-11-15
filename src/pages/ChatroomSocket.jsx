import { Box } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import SocketChat from "../socket/chat";

export default function ChatroomSocket() {
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
        <SocketChat />
      </Box>
    </PrimarySearchAppBar>
  );
}
