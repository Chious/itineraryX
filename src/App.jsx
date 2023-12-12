import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import MUIthemeProvider from "./styles/themeProvider";
import EditPage from "./pages/EditPage";
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Home1 from "./pages/Home1";
import ChatroomSocket from "./pages/ChatroomSocket";
import MapPage from "./pages/MapPage";
import Account from "./pages/Account";
import ReviseAccount from "./pages/ReviseAccount";

function App() {
  return (
    <>
      <div className="app">
        <MUIthemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="home1" element={<Home1 />} />
              <Route path="pending" element={<Pending />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="edit/:itineraryId" element={<EditPage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="chat2" element={<ChatroomSocket />} />
              <Route path="map2" element={<MapPage />} />
              <Route path="account" element={<Account />} />
              <Route path="reset-password/" element={<ReviseAccount />} />
              <Route path="*" element={<Home1 />} />
            </Routes>
          </BrowserRouter>
        </MUIthemeProvider>
      </div>
    </>
  );
}

export default App;
