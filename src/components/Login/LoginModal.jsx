import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, setOpen, message }) {
  const handleClose = () => setOpen(false);

  const { status, text } = message;
  const statusIcon =
    status === true ? (
      <CheckCircleIcon
        sx={{ height: "50px", width: "50px", color: "#32CD32" }}
      />
    ) : (
      <ErrorIcon sx={{ height: "50px", width: "50px", color: "#BB2124" }} />
    );

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style} alignItems="center" justifyContent="center">
          {statusIcon}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
        </Stack>
      </Modal>
    </div>
  );
}
