import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import styles from "../styles/DropDown.module.css";
import { Context } from "../Context";

const DropDown = ({ index }) => {
  const { currentUName, api, refreshMessages, setRefreshMessages } =
    useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteOption, setDeleteOption] = useState(false);

  const dropDownId = `dropDown-${index}`;

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`#${dropDownId}`)) {
        setIsOpen(false);
        setDeleteOption(false);
      }
    };

    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const deleteMessage = async () => {
    try {
      const delete_response = await axios.delete(`${api}delete_message`, {
        data: {
          username: currentUName,
          id: index,
        },
      });

      if (delete_response.error) {
        console.error("Error:", delete_response.status);
      } else {
        setRefreshMessages(!refreshMessages); // Trigger fetchMessages after deletion
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div id={dropDownId} className={styles.dropDown}>
      <button className={styles.classButton} onClick={toggleMenu}>
        <img src="/assets/dotmenu.svg" alt="menu" />
      </button>

      <div
        className={`${styles.dropDownMenu} ${isOpen ? styles.menuOpen : ""}`}
      >
        <ul
          style={{
            display: `${!deleteOption ? "block" : "none"}`,
          }}
        >
          <li>
            <button
              className={styles.liButton}
              onClick={() => {
                setDeleteOption(true);
              }}
            >
              Delete
            </button>
          </li>
        </ul>

        {deleteOption && (
          <div className={styles.deleteContainer}>
            <p className={styles.deleteText}>Confirm Delete?</p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  setDeleteOption(false);
                }}
              >
                Cancel
              </button>
              <button className={styles.deleteButton} onClick={deleteMessage}>
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
