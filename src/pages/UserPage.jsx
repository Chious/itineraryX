import { Box } from "@mui/material";
import Navbar from "../components/Home/Navbar";
import LabTabs from "../components/UserPage/LabTab";
import { useEffect, useState } from "react";
import { getItineraries } from "../api/userpage.jsx";
import {Button} from "@mui/material";
import CreateTripModal from "../components/Home/CreateTripModel.jsx";

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
      <Navbar itineraries={itineraries} setItineraries={setItineraries} setCount={setCount}/>
      <Box width="100%" height="100%" sx={{ background: "white", p: 2 }}>
        <h1>行程</h1>
        <LabTabs image={'../../src/images/spot/California.jpeg'} itineraries={itineraries} setItineraries={setItineraries} setCount={setCount}/>
      </Box>
      {/* <Button sx={{position:'fixed', bottom:30, right:30, fontSize:25}} variant="contained">+</Button> */}
      <CreateTripModal sx={{color:'#38358C', fontFamily:'Poppins', fontWeight:500, position:'fixed', bottom:30, right:30, fontSize:25}} text={'+'} itineraries={itineraries} setItineraries={setItineraries} setCount={setCount}/>
    </>
  );
}
