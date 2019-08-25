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
  const [appUsersList, setAppUsersList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [budgetsSharedForMe, setBudgetsSharedForMe] = useState([]);
  let isInvalid = password1 !== password2 || password1 === "";

  useEffect(() => {
    let listener = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    db.ref(`users`).on("value", snapshot => {
      if (snapshot.val()) {
        const appUsersList = snapshot.val();
        const parseAppUsersList = Object.keys(appUsersList).map(userID => ({
          ...appUsersList[userID],
          id: userID
        }));
        const parseUsersList = Object.keys(appUsersList).map(userID => ({
          email: appUsersList[userID].email,
          id: userID
        }));

        setAppUsersList(parseAppUsersList);
        setUsersList(parseUsersList);
      } else {
        setAppUsersList([]);
        setUsersList([]);
      }
    });
    db.ref(`budgetsSharedForMe`).on("value", snapshot => {
      if (snapshot.val()) {
        const rawDataFromFirebase = snapshot.val();
        const budgetsSharedForMe = Object.values(rawDataFromFirebase);
        const parseBudgetsSharedForMe = budgetsSharedForMe
          .map(obj =>
            Object.keys(obj).map(key => ({
              ...obj[key],
              key
            }))
          )
          .flat();

        setBudgetsSharedForMe(parseBudgetsSharedForMe);
      } else {
        setBudgetsSharedForMe([]);
      }
    });

    return () => {
      listener();
      db.ref(`users`).off();
      db.ref(`budgetsSharedForMe`).off();
    };
  }, []);

  function handleSignIn(event) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        alert("Successfully logged.");
        getAvatarUrl(result.user.uid);
      })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch(e => alert(e.message));
  }

  function handleSignInByGoogle(event) {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(result => {
        if (result.additionalUserInfo.isNewUser) {
          db.ref(`users/${result.user.uid}`).set({
            login: result.user.displayName,
            email: result.user.email,
            date: new Date().toLocaleDateString(),
            week: getWeekNumber(new Date())
          });
          alert("Successfully registered.");
        } else {
          getAvatarUrl(result.user.uid);
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
        db.ref(`users/${authUser.user.uid}`).set({
          login,
          email,
          date: new Date().toLocaleDateString(),
          week: getWeekNumber(new Date())
        });
        authUser.user.updateProfile({
          displayName: login
        });
      })
      .then(() => alert("Successfully registered."))
      .then(() => {
        setEmail("");
        setPassword("");
        setLogin("");
        setAvatarUrl("");
      })
      .catch(e => alert(e.message));
  }

  function passwordUpdate() {
    auth.currentUser
      .updatePassword(password1)
      .catch(e => console.log(e.message));
  }

  function resetPasswordViaEmail() {
    auth.sendPasswordResetEmail(email).catch(e => alert(e.message));
  }

  function addAvatar() {
    if (file) {
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
            getAvatarUrl(user.uid);
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
        setAvatarUrl("");
      });
  }

  function getAvatarUrl(uid) {
    storage
      .ref("avatars/" + uid)
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
            console.log(`Unknown error occurred, inspect the server response`);
            break;
          default:
            console.log(`Unknown error occurred, inspect the server response`);
        }
      });
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
        setAvatarUrl,
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
        resetPasswordViaEmail,
        appUsersList,
        setAppUsersList,
        usersList,
        budgetsSharedForMe
      }}
      {...props}
    />
  );
}

function getWeekNumber(date) {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}
