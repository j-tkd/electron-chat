import { ExitToApp } from "@mui/icons-material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Signout = () => {
  const navigate = useNavigate();
  const execSignOut = async () => {
    console.log("Signing out");
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
      alert("サインアウトしました。");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={() => execSignOut()}>
        <ExitToApp />
      </div>
    </>
  );
};

export default Signout;
