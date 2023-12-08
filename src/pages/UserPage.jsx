import { Box } from "@mui/material";
import LabTabs from "../components/UserPage/LabTab";
import CreateTripModal from "../components/UserPage/CreateTripModel.jsx";
import Navbar from "../components/Home/Navbar.jsx";
import { ItinerariesProvider } from "../context/UserPageContext.jsx";
import { useEffect, useState } from "react";
import { getItineraries, getJoinedItinerariesId } from "../api/userpage.jsx";
import { useItineraries } from "../context/UserPageContext.jsx";
import { getItinerary } from "../api/userpage.jsx";

export default function UserPage() {
  return (
    <ItinerariesProvider>
      <UserPageContent />
    </ItinerariesProvider>
  );
}

function UserPageContent() {
  const {itineraries, setItineraries, joinedItineraries, setJoinedItineraries} = useItineraries()
  const [id, setId] = useState([])

  // fetch total itineraries data when first render
  useEffect(()=>{
    getItineraries()
    .then(data => {
      setItineraries(data)
    })
  }, [])

  // fetch total participated itineraries id when first render
  useEffect(()=>{
    getJoinedItinerariesId()
    .then(data => {
      setId(data)
      // console.log(data)
    })
  }, [])

  // fetch all participated itineraries data
  useEffect(() => {
    const fetchItineraries = async () => {
      const itinerariesData = await Promise.all(id.map(id => getItinerary(id)));
      setJoinedItineraries(itinerariesData);
      // console.log(joinedItineraries)
    };

    fetchItineraries();
  }, [id]);

  return (
    <div>
      <Navbar/>
      <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box sx={{ flexGrow: 1 }} bgcolor='white' >
            <Box width="100%" height="100%" sx={{ background: "white", p: 2 }}>
              <h1 style={{color:'#38358C', marginTop:'0.5vw',marginBottom:'1.5vw', fontFamily:'Poppins', fontWeight:600, fontSize:40 }}>My Account</h1>
              <LabTabs image={'../../src/images/spot/California.jpeg'} />
              <CreateTripModal sx={{ position:'fixed', bottom:30, right:30 }} />
            </Box>
          </Box>
      </Box>
    </div>
  );
}
