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
  const provider = new firebase.auth.GoogleAuthProvider();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      getAvatarUrl();
    });
  });

  function handleSignIn(event) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => alert("Successfully logged."))
      .catch(e => alert(e.message));
  }

  function handleSignInByGoogle(event) {
    event.preventDefault();
    auth.signInWithRedirect(provider);
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
              default:
                console.log("Upload..");
            }
          },
          function(error) {
            switch (error.code) {
              case "storage/unauthorized":
                console.log(
                  `User doesn't have permission to access the object`
                );
                break;
              case "storage/canceled":
                console.log(`User canceled the upload`);
                break;
              case "storage/unknown":
                console.log(
                  `Unknown error occurred, inspect the server response`
                );
                break;
              default:
                console.log(
                  `Unknown error occurred, inspect the server response`
                );
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
        .catch(error => {
          setAvatarUrl(null);
          switch (error.code) {
            case "storage/object-not-found":
              console.log(`File doesn't exist`);
              break;
            case "storage/unauthorized":
              console.log(`User doesn't have permission to access the object`);
              break;
            case "storage/canceled":
              console.log(`User canceled the upload`);
              break;
            case "storage/unknown":
              console.log(
                `Unknown error occurred, inspect the server response`
              );
              break;
            default:
              console.log(
                `Unknown error occurred, inspect the server response`
              );
          }
        });
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
        completed,
        handleSignInByGoogle
      }}
      {...props}
    />
  );
}
