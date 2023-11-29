import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import MUIthemeProvider from "./styles/themeProvider";
import EditPage from './pages/EditPage';
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Home1 from "./pages/Home1";
import Chatroom from "./pages/Chatroom";
import ChatroomSocket from "./pages/ChatroomSocket";
import Itinerary from "./pages/Itinerary";
import Navbar from "./components/Home/Navbar";

function App() {
  return (
    <>
      <div className="app">
        <MUIthemeProvider>
          <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="home1" element={<Home1 />} />
              <Route path="pending" element={<Pending />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="map" element={<EditPage />} />
              <Route path="user" element={<UserPage />} >
                {/* <Route index element={<Itinerary/>}/>
                <Route path="itinerary" element={<Itinerary/>}/> */}
                {/* <Route path="*" element={<UserPage/>}/> */}
              </Route>
              <Route path="user/itinerary" element={<Itinerary/>} />
              <Route path="itinerary" element={<Itinerary />} />
              <Route path="chat" element={<Chatroom />} />
              <Route path="chat2" element={<ChatroomSocket />} />
            </Routes>
          </BrowserRouter>
        </MUIthemeProvider>
      </div>
    </>
  );
}

export default App;
