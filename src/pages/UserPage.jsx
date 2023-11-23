import { Box } from "@mui/material";
import Navbar from "../components/Home/Navbar";
import LabTabs from "../components/UserPage/LabTab";
import { useEffect, useState } from "react";
import { getItineraries } from "../api/userpage.jsx";
import CreateTripModal from "../components/UserPage/CreateTripModel.jsx";
import { ItinerariesContext } from "../context/UserPageContext.jsx";

export default function UserPage() {
  const [itineraries, setItineraries] = useState([])
  const [count, setCount] = useState(0)

  useEffect(()=>{
    getItineraries().then(data=>{
      setItineraries(data)
      setCount(itineraries.length)
      // console.log(itineraries)
    })
  }, [count])

  return (
    <>
      <ItinerariesContext.Provider value={{itineraries, setItineraries, setCount}}>
        <Navbar/>
        <Box width="100%" height="100%" sx={{ background: "white", p: 2 }}>
          <h1 style={{color:'#38358C', fontWeight:'bold', marginTop:'0.5vw',marginBottom:'1.5vw', fontFamily:'Poppins', fontWeight:600, fontSize:40 }}>My itineraries</h1>
          <LabTabs image={'../../src/images/spot/California.jpeg'} />
        </Box>
        <CreateTripModal sx={{color:'#38358C', fontFamily:'Poppins', fontWeight:500, position:'fixed', bottom:30, right:30, fontSize:25}} text={'+'} />
      </ItinerariesContext.Provider>
    </>
  );
}
