import { createContext, useState, useEffect, useRef } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [note, setNote] = useState("");
  const [messages, setMessages] = useState([]); // Store messages and files
  const [currentFile, setCurrentFile] = useState({ fileName: "" }); // Store files before sending
  const [refreshMessages, setRefreshMessages] = useState(false);
  const [currentUID, setCurrentUID] = useState(0); //sets currently logged in user ID
  const [currentUName, setCurrentUName] = useState("");
  const [login, setLogin] = useState(true);
  const [token, setToken] = useState("");

  const api = "https://dezit-api.online/";
  // const api = "http://localhost:5000/";

  const contextValue = {
    note,
    setNote,
    token,
    setToken,
    messages,
    setMessages,
    currentFile,
    setCurrentFile,
    currentUID,
    setCurrentUID,
    currentUName,
    setCurrentUName,
    refreshMessages,
    setRefreshMessages,
    login,
    setLogin,
    api,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
