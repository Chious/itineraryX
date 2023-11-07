import { Box } from "@mui/material";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import LabTabs from "../components/UserPage/LabTab";

export default function UserPage() {
  return (
    <PrimarySearchAppBar>
      <Box width="100%" height="100%" sx={{ background: "white", p: 2 }}>
        <h1>行程</h1>
        <LabTabs />
      </Box>
    </PrimarySearchAppBar>
  );
}
