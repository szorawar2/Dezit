import { createContext, useState, useEffect, useRef } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [note, setNote] = useState("");
  const [messages, setMessages] = useState([]); // Store messages and files
  const [currentFile, setCurrentFile] = useState({ fileName: "" }); // Store files before sending
  const [currentUser, setCurrentUser] = useState(0); //sets currently logged in user
  const [login, setLogin] = useState(true);
  const [token, setToken] = useState("");

  //const api = "https://dezit-api.online/";
  const api = "http://localhost:5000/";

  const contextValue = {
    note,
    setNote,
    token,
    setToken,
    messages,
    setMessages,
    currentFile,
    setCurrentFile,
    currentUser,
    setCurrentUser,
    login,
    setLogin,
    api,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
