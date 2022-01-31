import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import { useNavigate } from "react-router-dom";

export const RoomItem = ({ room, setTargetRoomId }) => {
  const navigate = useNavigate();

  const toRoom = (id) => {
    setTargetRoomId(id);
    navigate(`/rooms/${id}`);
  };

  return (
    <>
      <ListItem button key={room.id} onClick={() => toRoom(room.id)}>
        <ListItemIcon>
          <RoomIcon style={{ color: "#ddd" }} />
        </ListItemIcon>
        <ListItemText primary={room.desc} />
      </ListItem>
    </>
  );
};

export default RoomItem;
