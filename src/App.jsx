import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

//Styles
import styles from "./styles/App.module.css";

//Components
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MessageDisplay from "./components/MessageDisplay";
import ProtectedRoute from "./components/ProtectedRoute";

//Global context
import { Context } from "./Context";

function App() {
  const { setToken } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token when navigating to login page
    if (location.pathname === "/login") {
      setToken(null);
    }
  }, [location]);

  useEffect(() => {
    // Check localStorage for a token and set it if available
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Redirect to login if no token found
      navigate("/login");
    }
  }, [setToken, navigate]);

  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/messages"
          element={
            // ProtectedRoute ensures only authorized users can access messages
            <ProtectedRoute>
              <>
                <Navbar />
                <MessageDisplay />
                <TextInput />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
