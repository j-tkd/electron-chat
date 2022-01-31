import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Rooms from "./Pages/Rooms";
import Room from "./Pages/Room";
import CopyRight from "./componets/CopyRight";
import { Box, Container } from "@mui/material";
import { getAuth } from "firebase/auth";

// const clicked = async () => {
//   const result = await window.myApp.sayHello("Hello from renderer is here");
//   console.log("renderer:" + result);
// };

// Routing
function App() {
  const navigate = useNavigate();
  const { currentUser } = getAuth();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, []);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms" element={<Rooms />}>
          <Route path=":roomId" element={<Room />} />
        </Route>
      </Routes>
      <Box
        mt={5}
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "1rem",
        }}
      >
        <CopyRight />
      </Box>
    </Container>
  );
}

export default App;
