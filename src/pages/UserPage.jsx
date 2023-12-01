import { Box } from "@mui/material";
import LabTabs from "../components/UserPage/LabTab";
import CreateTripModal from "../components/UserPage/CreateTripModel.jsx";
import Navbar from "../components/Home/Navbar.jsx";

export default function UserPage() {
  // const [itineraries, setItineraries] = useState([])

  // useEffect(()=>{
  //   getItineraries().then(data=>{
  //     setItineraries(data)
  //     // console.log(itineraries)
  //   })
  // }, [itineraries])

  return (
    <div>
      <Navbar/>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        {/* <ItinerariesContext.Provider value={{itineraries, setItineraries}}> */}
          <Box sx={{ flexGrow: 1 }} bgcolor='white' >
            <Box width="100%" height="100%" sx={{ background: "white", p: 2 }}>
              <h1 style={{color:'#38358C', marginTop:'0.5vw',marginBottom:'1.5vw', fontFamily:'Poppins', fontWeight:600, fontSize:40 }}>My Account</h1>
              <LabTabs image={'../../src/images/spot/California.jpeg'} />
              <CreateTripModal sx={{ position:'fixed', bottom:30, right:30 }} />
            </Box>
          </Box>
        {/* </ItinerariesContext.Provider> */}
      </Box>
    </div>
  );
}
