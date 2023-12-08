import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyItineraries from "./MyItineraries";
import JoinedItinerariesCard from "./JoinedItineraries";

export default function LabTabs({image}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My itineraries" value="1" style={{color:'#38358C', fontFamily:'Poppins', fontWeight:600, opacity:0.7 }} />
            <Tab label="Joined itineraries" value="2" style={{color:'#38358C', fontFamily:'Poppins', fontWeight:600, opacity:0.7 }}/>
          </TabList>
        </Box>
        <TabPanel value="1">
          <MyItineraries image={image}/>
        </TabPanel>
        <TabPanel value="2">
          <JoinedItinerariesCard image={image}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
