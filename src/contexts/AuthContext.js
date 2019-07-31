import React, { useState, useEffect } from "react";
import { auth, storage } from "../firebase";
import firebase from "firebase";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
    getAvatarUrl();
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
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setCompleted(progress);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {
            switch (error.code) {
              case "storage/unauthorized":
                break;
              case "storage/canceled":
                break;
              case "storage/unknown":
                break;
            }
          },
          function() {
            alert("Successfully added");
            setCompleted(0);
            getAvatarUrl();
          }
        );
    }
  }

  function removeAvatar() {
    storage
      .ref("avatars/" + user.uid)
      .delete()
      .then(() => {
        alert("Successfully removed");
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
        removeAvatar,
        completed
      }}
      {...props}
    />
  );
}
