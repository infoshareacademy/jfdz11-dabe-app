import React from "react";
import Button from "@material-ui/core/Button";
import { auth } from "../../firebase";

export default function SignOut(props) {
  function signOutOnClick() {
    auth.signOut();
  }

  return (
    <Button variant="contained" color="secondary" onClick={signOutOnClick}>
      Sign out
    </Button>
  );
}
