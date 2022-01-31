import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  getDocs,
  collection,
  query,
  // orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import RoomItem from "../componets/RoomItem";
import { useNavigate } from "react-router";
import Room from "../componets/Room";
import Signout from "../componets/Signout";

const drawerWidth = 280;
const chatroomsRef = collection(db, "chatrooms");

export const Rooms = () => {
  const navigate = useNavigate();
  const [targetRoomId, setTargetRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  const handleNewRoom = (e) => {
    setNewRoom(e.target.value);
  };

  const fetchRooms = async () => {
    // firebase v8
    // db.collection("chatrooms")
    //   .orderBy("description")
    //   .limit(20)
    //   .onSnapshot((snapshot) => {
    //     setRooms(
    //       snapshot.docs.map((doc) => {
    //         return {
    //           id: doc.id,
    //           desc: doc.data().description,
    //         };
    //       })
    //     );
    //   });
    const q = query(chatroomsRef, limit(20));
    const querySnapshot = await getDocs(q);
    setRooms(
      querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          desc: doc.data().description,
        };
      })
    );
  };

  const sendNewRoom = async (e) => {
    e.preventDefault();

    if (!newRoom.length) return;

    // firebase v8
    // db.collection("chatrooms").add({
    //   description: newRoom,
    // });
    const { currentUser } = getAuth();
    console.log(currentUser);

    const newRoomRef = await addDoc(collection(db, "chatrooms"), {
      description: newRoom,
      uid: currentUser.uid,
      createdAt: serverTimestamp(),
    });
    console.log(newRoomRef);

    fetchRooms();
    console.log(`NEW ID: ${newRoomRef.id}`);
    setTargetRoomId(newRoomRef.id);
    navigate(`/rooms/${newRoomRef.id}`);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "#EEE",
            color: "#333",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {targetRoomId === ""
                ? "Join a chat room from the sidebar or create your chat room."
                : rooms.find((r) => r.id === targetRoomId).desc}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#333",
              color: "#ddd",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
            <Signout />
          </Toolbar>
          <Divider />
          <List>
            {rooms.map((room, index) => (
              <RoomItem
                room={room}
                setTargetRoomId={setTargetRoomId}
                key={index}
              />
            ))}
          </List>
          <form
            style={{
              display: "flex",
              position: "absolute",
              bottom: "0",
              marginBottom: 20,
            }}
            onSubmit={sendNewRoom}
          >
            <TextField
              name="newRoom"
              id="newRoom"
              label="New Room"
              variant="outlined"
              autoFocus
              sx={{
                margin: "1rem 0rem 1rem 1rem",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
              onChange={handleNewRoom}
              value={newRoom}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ margin: "1rem" }}
            >
              <AddIcon sx={{ width: 20 }} />
            </Button>
          </form>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "0",
            width: "100%",
            backgroundColor: "#FFF",
          }}
        >
          <Toolbar />
          <Room targetRoomId={targetRoomId} />
        </Box>
      </Box>
    </div>
  );
};

export default Rooms;
