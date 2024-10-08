import { useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import UserAccount from "../components/Home/UserAccount";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Account () {
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!localStorage.getItem('token')){
  //     navigate('/home')
  //   }
  // }, [])

  return (
    <div>
      <Navbar/>
      <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box sx={{ flexGrow: 1 }} bgcolor='white' >
            <Box 
              width="100%" 
              height="100%"  
              sx={{ 
                background: "white", 
                p: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <UserAccount/>
            </Box>
          </Box>
      </Box>
    </div>
    
  )
}