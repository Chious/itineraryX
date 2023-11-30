import { Box } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { GoogleMap } from "../components/Map/Map";
import { MapProvider } from "../contexts/MapContexts";

export default function MapPage() {
  return (
    <MapProvider>
      <PrimarySearchAppBar>
        <Box width="100%" height="100%" sx={{ background: "white" }}>
          <GoogleMap />
        </Box>
      </PrimarySearchAppBar>
    </MapProvider>
  );
}
