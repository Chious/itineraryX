import { Box, Stack, ToggleButton, TextField } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Message from "../components/Chatroom/Message";

export default function Chatroom() {
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
          sx={{ width: "50%", height: "50%", background: "white", p: 2 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <h1>Chatroom</h1>
          <Box boxShadow={2} width="300px" height="295px">
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ p: 1, background: "#F4F4F4" }}
            >
              <p>Chatroom title</p>
              <CloseIcon />
            </Stack>
            <Message />
            <Stack direction="row">
              <TextField
                id="standard-basic"
                label="Standard"
                variant="filled"
                fullWidth
              />
              <ToggleButton value="check">
                <SendIcon />
              </ToggleButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </PrimarySearchAppBar>
  );
}
