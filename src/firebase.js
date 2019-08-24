import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAfr6iz7N2Xwybu_RvLqz26_-gxj4hC2ko",
  authDomain: "financial-planner-dabe.firebaseapp.com",
  databaseURL: "https://financial-planner-dabe.firebaseio.com",
  projectId: "financial-planner-dabe",
  storageBucket: "financial-planner-dabe.appspot.com",
  messagingSenderId: "668637447926",
  appId: "1:668637447926:web:017bcd1ebb5b7fad"
};

firebase.initializeApp(firebaseConfig);

const { database } = firebase;
export const db = database();
export const auth = firebase.auth();
export const storage = firebase.storage();
