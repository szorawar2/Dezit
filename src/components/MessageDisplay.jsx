import { useContext, useRef, useEffect, useState } from "react";
import styles from "../styles/MessageDisplay.module.css";
import { Context } from "../Context";
import axios from "axios";

function MessageDisplay() {
  const { messages, setMessages, currentUID, currentUName, api, token } =
    useContext(Context);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(0); // Error state for login attempts
  const [status, setStatus] = useState(""); // Status message for error or success

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Scroll to the bottom when the component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Everytime a message updates

  useEffect(() => {
    fetchMessages();
  }, []); // Runs only once when the page loads

  const fetchMessages = async (e) => {
    //e.preventDefault();
    setLoading(true);

    try {
      const fetch_response = await axios.post(`${api}load_chats`, {
        username: currentUName,
        token: token,
      });

      setErr(fetch_response.data.error);
      setStatus(fetch_response.data.status);
      setMessages(fetch_response.data.messagesData);
    } catch (error) {
      setErr(2);
      setStatus("Server Error");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  const handleDownload = async (currentUserId, fileId, fileName) => {
    try {
      const response = await axios.get(`${api}load_file`, {
        params: {
          userName: currentUName,
          fileId: fileId,
        },
        responseType: "blob", // Ensures binary data is handled correctly
      });

      const fileURL = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(fileURL); // Clean up the object URL
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className={styles.messageDisplayContainer}>
      {loading ? ( // Show a loading indicator while fetching messages
        <p className={styles.noMessages}>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className={styles.noMessages}>No messages yet.</p>
      ) : (
        <div className={styles.messageMap}>
          {messages.map((messageObj, index) => (
            <div key={index} className={styles.message}>
              {messageObj.text && <p>{messageObj.text}</p>}
              {messageObj.fileItem.fileName && (
                <label
                  className={styles.downloadLabel}
                  onClick={() =>
                    handleDownload(
                      currentUID,
                      messageObj.fileItem.fileId,
                      messageObj.fileItem.fileName
                    )
                  }
                >
                  {messageObj.fileItem.fileName}
                </label>
              )}
              <div ref={messagesEndRef} />
            </div>
          ))}
          <div className={styles.blank}>
            <p style={{ color: "var(--col3)" }}>lol</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageDisplay;
