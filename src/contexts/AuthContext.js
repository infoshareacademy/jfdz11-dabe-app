import React, { useState, useEffect } from "react";
import { auth, storage } from "../firebase";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
  });

  function handleSignIn(event) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => alert("Successfully logged."))
      .catch(e => alert(e.message));
  }

  function handleSignUp(event) {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => alert("Successfully registered."))
      .catch(e => alert(e.message));
  }

  function addAvatar() {
    if (file && user) {
      storage
        .ref("avatars/" + user.uid)
        .put(file)
        .then(() => {
          alert("Successfully added");
          getAvatarUrl();
        });
    }
  }

  function removeAvatar() {
    storage
      .ref("avatars/" + user.uid)
      .delete()
      .then(() => {
        alert("Successfully added");
        getAvatarUrl();
      });
  }

  function getAvatarUrl() {
    if (user) {
      storage
        .ref("avatars/" + user.uid)
        .getDownloadURL()
        .then(url => setAvatarUrl(url))
        .catch(() => setAvatarUrl(null));
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        avatarUrl,
        file,
        setFile,
        handleSignIn,
        handleSignUp,
        addAvatar,
        removeAvatar
      }}
      {...props}
    />
  );
}
