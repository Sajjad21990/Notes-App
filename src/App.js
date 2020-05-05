import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import "react-quill/dist/quill.snow.css";
import Main from "./main/main";
import SignupComponent from "./signup/signup";
import LoginComponent from "./login/login";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginComponent />
      </Route>
      <Route path="/signup">
        <SignupComponent />
      </Route>
      <Route path="/notes">
        <Main />
      </Route>
    </Switch>
  );
}

export default App;
