import ControlBar from "../components/EditMap/ControlBar";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { Box, Stack } from "@mui/material";

export default function EditMap() {
  return (
    <PrimarySearchAppBar>
      <Stack direction="row" height="100%">
        <Box width="400px" height="100%">
          <ControlBar />
        </Box>
        <Box sx={{ width: "calc(100vw - 400px)", height: "100%" }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_MAP_TOKEN
            }
    &q=Space+Needle,Seattle+WA`}
          ></iframe>
        </Box>
      </Stack>
    </PrimarySearchAppBar>
  );
}
