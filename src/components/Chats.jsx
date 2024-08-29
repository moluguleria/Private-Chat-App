import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState({}); // Initialize as an empty object
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      console.warn("No user is logged in or UID is missing");
      return;
    }

    const getChats = () => {
      const userChatsDocRef = doc(db, "userChats", currentUser.uid);

      const unsub = onSnapshot(userChatsDocRef, (doc) => {
        if (doc.exists()) {
          setChats(doc.data() || {}); // Ensure chats is always an object
        } else {
          console.warn("No chat data found for user:", currentUser.uid);
          setChats({}); // Fallback to an empty object
        }
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser]);

  const handleSelect = (u) => {
    if (!u || !u.uid) {
      console.warn("User information is missing or incomplete");
      return;
    }

    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats).length > 0 ? (
        Object.entries(chats)
          .sort((a, b) => (b[1].date || 0) - (a[1].date || 0))
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="User Avatar" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default Chats;
