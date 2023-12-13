import Navbar from "../components/Home/Navbar";
import UserAccount from "../components/Home/UserAccount";
import { Box } from "@mui/material";

export default function Account () {
  return (
    <div>
      <Navbar/>
      <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box sx={{ flexGrow: 1 }} bgcolor='white' >
            <Box width="100%" height="100%" sx={{ background: "white", p: 5 }}>
              <UserAccount/>
            </Box>
          </Box>
      </Box>
    </div>
    
  )
}