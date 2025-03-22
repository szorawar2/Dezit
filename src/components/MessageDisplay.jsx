import { useContext, useRef, useEffect, useState } from "react";
import axios from "axios";

import styles from "../styles/MessageDisplay.module.css";

import { Context } from "../Context";

import DropDown from "./DropDown";

function MessageDisplay() {
  const {
    messages,
    setMessages,
    currentUID,
    currentUName,
    api,
    token,
    refreshMessages,
  } = useContext(Context);

  const [loading, setLoading] = useState(true);

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
  }, [refreshMessages]);

  const fetchMessages = async (e) => {
    setLoading(true);

    try {
      const fetch_response = await axios.post(`${api}load_chats`, {
        username: currentUName,
        token: token,
      });

      setMessages(fetch_response.data.messagesData);
    } catch (error) {
      console.error(fetch_response.status);
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

              <div className={styles.options}>
                {/* Message index is the id in Database */}
                <DropDown index={messageObj.id} />

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
              </div>

              <div ref={messagesEndRef} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageDisplay;
