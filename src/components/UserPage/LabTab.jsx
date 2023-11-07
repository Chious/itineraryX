import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RecipeReviewCard from "./RecipeReviewCard";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="我的行程" value="1" />
            <Tab label="待定" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RecipeReviewCard />
        </TabPanel>
        <TabPanel value="2">待定</TabPanel>
      </TabContext>
    </Box>
  );
}
