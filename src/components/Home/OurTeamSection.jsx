import california from "../../images/spot/California-1.jpeg"
import { Box } from "@mui/material"
import DeveloperCard from "./DeveloperCard";

export default function OurTeamSection () {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${california})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.2, // Adjust this value to change the opacity
        },
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <DeveloperCard />
    </Box>
  );
}
