// src/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import styles from "../styles/Login.module.css";

function Login() {
  const {
    setToken,
    setCurrentUID,
    setCurrentUName,
    setMessages,
    login,
    setLogin,
    api,
  } = useContext(Context);

  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [err, setErr] = useState(0); // Error state for login attempts
  const [status, setStatus] = useState(""); // Status message for error or success

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!login) {
  //     setTimeout(500);
  //     navigate("/signup");
  //   }
  // }, [login, navigate]);

  const handlePageChange_signup = async () => {
    setTimeout(500);
    navigate("/signup");
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login_response = await axios.post(`${api}login`, {
        username,
        password,
      });

      setToken(login_response.data.token);
      setErr(login_response.data.error); // Set error state from server response
      setStatus(login_response.data.status); // Set status message from server response

      // setMessages(response.data.messagesData); // Set messages from server response

      if (login_response.data.token) {
        // If login is successful, save the token and user info
        // setToken(login_response.data.token);
        setCurrentUID(login_response.data.id);
        setCurrentUName(username); //Set username as global context
        localStorage.setItem("token", login_response.data.token); // Store token in localStorage
        navigate("/messages"); // Navigate to messages page
      }
    } catch (error) {
      console.log(error);
      console.log("Login failed"); // Log error if login fails
    }
  };

  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <div className={styles.loginForm}>
          <div>{err ? <p className={styles.error}>{status}</p> : null}</div>
          <form onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.loginButton} type="submit">
                Login
              </button>
              <div className={styles.loginAndSignup}>
                <button className={styles.setSignup} type="button">
                  ~
                </button>
                <button
                  className={styles.setSignup}
                  onClick={handlePageChange_signup}
                  type="button"
                >
                  Signup instead?
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
