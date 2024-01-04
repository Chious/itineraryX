import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Pending from './pages/Pending';
import Login from './pages/Login';
import MUIthemeProvider from './styles/themeProvider';
import EditPage from './pages/EditPage';
import UserPage from './pages/UserPage';
import Register from './pages/Register';
import Home from './pages/Home';
import ReviseAccount from './pages/ReviseAccount';
import Account from "./pages/Account";
import { EditPageProvider } from './contexts/EditPageContext';

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
              <Route
                path="itinerary/:itineraryId"
                element={
                  <EditPageProvider>
                    <EditPage />
                  </EditPageProvider>
                }
              />
              <Route path="user" element={<UserPage />} />
              <Route path="account" element={<Account />} />
              <Route path="reset-password/" element={<ReviseAccount />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </MUIthemeProvider>
      </div>
    </>
  );
}

export default App;
