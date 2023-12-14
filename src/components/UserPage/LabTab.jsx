import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ItineraryCards from "./ItineraryCards";
import { useItineraries } from "../../contexts/UserPageContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#647680",
          fontFamily: "Poppins",
          fontWeight: "600",
          borderRadius: "10px",
          opacity: 0.5,
          "&.Mui-selected": {
            opacity: 1,
            color: "#325269",
            borderRadius: "10px",
          },
        },
      },
    },
  },
});

export default function LabTab() {
  // get MY ITINERARIES & JOINED ITINERARIES data
  const { itineraries, joinedItineraries } = useItineraries();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          indicatorColor="#325269"
          textcolor="#325269"
        >
          <Tab
            value={0}
            sx={{ "&:hover": { opacity: 0.8, color: "#325269" } }}
            label="My itineraries"
          />
          <Tab
            value={1}
            sx={{ "&:hover": { opacity: 0.8, color: "#325269" } }}
            label="Joined itineraries"
          />
        </Tabs>
      </ThemeProvider>

      {/* use conditional render to pass corresponded data to ItineraryCards */}
      {value === 0 ? (
        <ItineraryCards itineraries={itineraries} />
      ) : (
        <ItineraryCards itineraries={joinedItineraries} />
      )}
    </Box>
  );
}
