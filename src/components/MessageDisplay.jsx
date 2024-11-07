import { useContext, useRef, useEffect } from "react";
import styles from "../styles/MessageDisplay.module.css";
import { Context } from "../Context";
import axios from "axios";

function MessageDisplay() {
  const { messages, currentUser, api } = useContext(Context);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Scroll to the bottom when the component mounts or messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDownload = async (currentUserId, fileId, fileName) => {
    try {
      const response = await axios.get(`${api}load_file`, {
        params: {
          userId: currentUserId,
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
      {messages.length === 0 ? (
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
                      currentUser,
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
