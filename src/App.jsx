import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Rooms from "./Pages/Rooms";
import Room from "./Pages/Room";
import CopyRight from "./componets/CopyRight";
import { Box, Container, Typography } from "@mui/material";

// const clicked = async () => {
//   const result = await window.myApp.sayHello("Hello from renderer is here");
//   console.log("renderer:" + result);
// };

const NAV_LINK_STYLE = {
  display: "inline-block",
  padding: "0 2rem",
  fontWeight: 600,
  color: "#fff",
  textDecoration: "none",
  transition: "0.3s",
};

// Routing
function App() {
  return (
    <Container>
      <nav style={{ margin: "0 auto", width: "100%", backgroundColor: "#000" }}>
        <Typography
          component="h1"
          variant="caption"
          style={{ color: "#FFF", padding: "1rem 2rem" }}
        >
          This is header
        </Typography>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            listStyle: "none",
            paddingBottom: "1rem",
          }}
        >
          <li>
            <Link to="/" style={NAV_LINK_STYLE}>
              Home
            </Link>
          </li>
          <li>
            <Link to="login" style={NAV_LINK_STYLE}>
              Login
            </Link>
          </li>
          <li>
            <Link to="signup" style={NAV_LINK_STYLE}>
              Signup
            </Link>
          </li>
          <li>
            <Link to="rooms" style={NAV_LINK_STYLE}>
              Rooms
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms" element={<Rooms />}>
          <Route path=":roomId" element={<Room />} />
        </Route>
      </Routes>
      <Box mt={5}>
        <CopyRight />
      </Box>
    </Container>
  );
}

export default App;
