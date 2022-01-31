import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";

export const Message = ({ messages }) => {
  const toDatetime = (sec) => {
    const date = new Date(sec * 1000);
    const formatted = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formatted;
  };

  return (
    <>
      {messages.map((msg) => (
        <>
          <ListItem key={msg.id}>
            <ListItemAvatar>
              <Avatar alt="Jane Doe" src={msg.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6" component="span">
                    {msg.displayName}
                  </Typography>
                  <span style={{ marginLeft: 20, fontSize: "0.8rem" }}>
                    {toDatetime(msg.createdAt.seconds)}
                  </span>
                </>
              }
              secondary={msg.text}
            ></ListItemText>
          </ListItem>
          <Divider />
        </>
      ))}
    </>
  );
};

export default Message;
