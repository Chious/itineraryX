import { Box } from "@mui/material";
import { GoogleMap } from "../components/Map/Map";
import { MapProvider } from "../contexts/MapContexts";
import Navbar from "../components/Home/Navbar";

export default function MapPage() {
  return (
    <MapProvider>
      <Navbar/>
      <Box width="100%" height="100%" sx={{ background: "white" }}>
        <GoogleMap />
      </Box>
    </MapProvider>
  );
}
