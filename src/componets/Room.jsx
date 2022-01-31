import { getAuth } from "@firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "@firebase/firestore";
import { Button, List, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
import { db } from "../firebase";
import Message from "./Message";

export const Room = ({ targetRoomId }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (roomId) => {
    const currentRoomRef = collection(db, "chatrooms", roomId, "messages");
    const querySnapshot = await getDocs(currentRoomRef);

    if (querySnapshot.docs.length > 0) {
      setMessages(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            text: doc.data().text,
            createdAt: doc.data().createdAt,
            displayName: doc.data().writtenBy.displayName,
            uid: doc.data().writtenBy.uid,
          };
        })
      );
    }
  };

  useEffect(() => {
    fetchMessages(targetRoomId);
  }, [targetRoomId]);

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const postNewMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.length) return;

    const { currentUser } = getAuth();
    const { displayName, uid, photoURL } = currentUser;

    const currentRoomRef = collection(
      db,
      "chatrooms",
      targetRoomId,
      "messages"
    );

    const messagesRef = await addDoc(currentRoomRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      writtenBy: {
        uid,
        displayName,
        photoURL,
      },
    });
    console.log(messagesRef);
    fetchMessages(targetRoomId);
    setNewMessage("");
  };

  return (
    <>
      {messages.length === 0 && (
        <Typography component="h1" sx={{ p: 4 }}>
          Let's post first message!!
        </Typography>
      )}
      <List sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
        {messages.length !== 0 && (
          <Message messages={messages} key={messages.id} />
        )}
      </List>

      <form
        onSubmit={postNewMessage}
        style={{
          display: "flex",
          backgroundColor: "#FFF",
          marginTop: "1rem",
        }}
      >
        <TextField
          name="newMessage"
          id="newMessage"
          label="New Message"
          variant="outlined"
          autoFocus
          style={{ margin: "1rem 0px 1rem 1rem", width: "90%" }}
          onChange={handleNewMessage}
          value={newMessage}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ margin: "1rem" }}
        >
          POST
        </Button>
      </form>
    </>
  );
};

export default Room;
