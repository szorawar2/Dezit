// src/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import styles from "../styles/Login.module.css";

function Signup() {
  const { setToken, setCurrentUID, setCurrentUName, login, setLogin, api } =
    useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(0);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      setTimeout(500);
      navigate("/login");
    }
  }, [login, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}signup`, {
        username,
        password,
      });
      setErr(response.data.error);
      setStatus(response.data.message);
      if (response.data.token) {
        setToken(response.data.token);
        setCurrentUID(response.data.id);
        setCurrentUName(username); //Set username as global context
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/messages");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginContainer}>
        <h1>Signup</h1>
        <div className={styles.loginForm}>
          <div className={styles.error}>{err ? <p>{status}</p> : <></>}</div>
          <form onSubmit={handleSignup}>
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
              <button type="submit">Signup</button>
              {/* <button
                className={styles.setSignup}
                onMouseUp={() => {
                  setLogin(true);
                  //setTimeout(() => navigate("/login"), 10);
                }}
                type="button"
              >
                Login instead?
              </button> */}
              <div className={styles.loginAndSignup}>
                <button
                  className={styles.setSignup}
                  onMouseUp={() => {
                    setLogin(true); // Set login state to false to navigate to signup
                    //setTimeout(() => navigate("/signup"), 10);
                  }}
                  type="button"
                >
                  Login instead?
                </button>
                <button className={styles.setSignup} type="button">
                  ~
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
