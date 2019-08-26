import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { auth } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignOut(props) {
  const authContext = useContext(AuthContext);
  function signOutOnClick() {
    auth.signOut().then(() => {
      authContext.setEmail("");
      authContext.setPassword("");
      authContext.setLogin("");
      authContext.setAvatarUrl("");
    });
  }

  return (
    <Button variant="contained" color="secondary" onClick={signOutOnClick}>
      Sign out
    </Button>
  );
}