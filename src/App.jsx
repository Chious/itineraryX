import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import MUIthemeProvider from "./styles/themeProvider";
import EditMap from "./pages/EditMap";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Chatroom from "./pages/Chatroom";
import ChatroomSocket from "./pages/ChatroomSocket";
import MapPage from "./pages/MapPage";
import ReviseAccount from "./pages/ReviseAccount";

function App() {
  return (
    <>
      <div className="app">
        <MUIthemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="pending" element={<Pending />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="map" element={<EditMap />} />
              <Route path="user" element={<UserPage />} />
              <Route path="chat" element={<Chatroom />} />
              <Route path="chat2" element={<ChatroomSocket />} />
              <Route path="map2" element={<MapPage />} />
              <Route path="reset-password/" element={<ReviseAccount />} />
            </Routes>
          </BrowserRouter>
        </MUIthemeProvider>
      </div>
    </>
  );
}

export default App;
