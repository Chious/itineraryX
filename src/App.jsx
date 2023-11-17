import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pending from "./pages/Pending";
import Login from "./pages/Login";
import MUIthemeProvider from "./styles/themeProvider";
import EditPage from './pages/EditPage';
import UserPage from "./pages/UserPage";
import Register from "./pages/Register";
import Chatroom from "./pages/Chatroom";

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
              <Route path="map" element={<EditPage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="chat" element={<Chatroom />} />
            </Routes>
          </BrowserRouter>
        </MUIthemeProvider>
      </div>
    </>
  );
}

export default App;
