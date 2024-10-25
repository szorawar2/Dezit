// src/Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import styles from "../styles/Login.module.css";

function Login() {
  const { setToken, setCurrentUser, setMessages, setLogin, api } =
    useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(0);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}login`, {
        username,
        password,
      });
      //
      setMessages(response.data.messagesData);
      setErr(response.data.error);
      setStatus(response.data.status);

      if (response.data.token) {
        setToken(response.data.token);
        setCurrentUser(response.data.id);
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/messages");
      }
      //
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className={styles.loginScreen}>
      {/* <p style={{ color: "black" }}>test</p> */}
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <div className={styles.loginForm}>
          <div>{err ? <p className={styles.error}>{status}</p> : <></>}</div>
          <form onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.loginButton} type="submit">
                Login
              </button>
              <button
                className={styles.setSignup}
                onClick={() => {
                  setLogin(false);
                  navigate("/signup");
                }}
                type="button"
              >
                {" "}
                Signup instead?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
