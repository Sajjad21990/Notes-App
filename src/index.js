import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import history from "./history/history";
import { Router } from "react-router-dom";
import "antd/dist/antd.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const firebase = require("firebase");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCO8TlleyoAlXdEAF8DAQ4FwBixlX5o9KU",
  authDomain: "notes-262e9.firebaseapp.com",
  databaseURL: "https://notes-262e9.firebaseio.com",
  projectId: "notes-262e9",
  storageBucket: "notes-262e9.appspot.com",
  messagingSenderId: "208392444879",
  appId: "1:208392444879:web:2451666aa4f19e092d10ba",
  measurementId: "G-YME3WHTREC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
