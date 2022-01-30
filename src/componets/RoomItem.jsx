import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import React from "react";
import { useNavigate } from "react-router-dom";

export const RoomItem = ({ room }) => {
  const navigate = useNavigate();

  const toRoom = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <ListItem button key={room.id} onClick={() => toRoom(room.id)}>
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
      <ListItemText primary={room.desc} />
    </ListItem>
  );
};

export default RoomItem;
