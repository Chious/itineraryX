import { Box,Stack } from "@mui/material";
import LabTab from "../components/UserPage/LabTab";
import CreateTripModal from "../components/UserPage/CreateTripModel.jsx";
import Navbar from "../components/Home/Navbar.jsx";
import { ItinerariesProvider, useItineraries } from "../contexts/UserPageContext.jsx";
import { useEffect, useState } from "react";
import { getItineraries, getJoinedItinerariesId, getItinerary } from "../api/userpage.jsx";
import { useNavigate } from "react-router-dom";
import { socket } from '../socket/socket';

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

  // if socket receive notification, change needRerender state to trigger rerender
  const [needRerender, setNeedRerender] = useState(false)
  const navigate = useNavigate()

  // fetch total itineraries data when first render
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      getItineraries()
      .then(data => {
        setItineraries(data)
        socket.on('receive_notification', () => {
          setNeedRerender(!needRerender)
        })
        return () => {
          socket.off('receive_notification', () => {
            setNeedRerender(!needRerender)
          })
        }
      })
    } else {
      navigate('/home1')
    }
  }, [needRerender])

  // fetch total participated itineraries id when first render
  // use itineraries as dependency in order to rerender page whenever add or delete itinerary
  useEffect(()=>{
    getJoinedItinerariesId()
    .then(data => {
      setId(data)
      // console.log(data)
    })
  }, [itineraries])

  // fetch all participated itineraries data
  // use id as dependency in order to rerender page whenever new participated id generated
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
      <Stack height="auto" direction="column" width="100vw">
        <Navbar/>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box sx={{ flexGrow: 1 }} bgcolor='white' >
            <Box width="100%" height="100%" sx={{ background: "white", p: 2 }}>
              <h1 style={{color:'#325269', marginTop:'0.5vw',marginBottom:'1.5vw', fontFamily:'Poppins', fontWeight:600, fontSize:40 }}>My Account</h1>
              <LabTab />
              <CreateTripModal sx={{ position:'fixed', bottom:30, right:30 }} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
