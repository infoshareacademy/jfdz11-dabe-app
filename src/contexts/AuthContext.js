import React, { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase";
import firebase from "firebase";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [completed, setCompleted] = useState(0);
  let isInvalid = password1 !== password2 || password1 === "";

  useEffect(() => {
    let listener = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  function handleSignIn(event) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Successfully logged.");
      })
      .catch(e => alert(e.message));
  }

  function handleSignInByGoogle(event) {
    const provider = new firebase.auth.GoogleAuthProvider();
    event.preventDefault();
    auth.signInWithRedirect(provider);
  }

  function fetchDataFromGoogleUser() {
    auth
      .getRedirectResult()
      .then(result => {
        if (result.user) {
          userRef(result.user.uid).set({
            login: result.user.displayName,
            email: result.user.email,
            date: new Date().toISOString()
          });
          alert("Successfully logged.");
        }
      })
      .catch(e => alert(e.message));
  }

  function handleSignUp(event) {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        userRef(authUser.user.uid).set({
          login,
          email,
          date: new Date().toISOString()
        });
        authUser.user.updateProfile({
          displayName: login
        });
      })
      .then(() => alert("Successfully registered."))
      .catch(e => alert(e.message));
  }

  function userRef(uid) {
    return db.ref(`users/${uid}`);
  }

  function passwordUpdate() {
    auth.currentUser.updatePassword(password1);
  }

  function resetPasswordViaEmail() {
    auth
      .sendPasswordResetEmail(email)
      .then(() => alert("Email sent."))
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
        login,
        setLogin,
        password,
        setPassword,
        avatarUrl,
        file,
        setFile,
        handleSignIn,
        handleSignUp,
        getAvatarUrl,
        addAvatar,
        removeAvatar,
        completed,
        handleSignInByGoogle,
        passwordUpdate,
        setPassword1,
        setPassword2,
        isInvalid,
        fetchDataFromGoogleUser,
        resetPasswordViaEmail
      }}
      {...props}
    />
  );
}
