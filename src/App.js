import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import WebRoute from "./router/router";
import { Provider } from "react-redux";
import store from "./redux/store";
import firebase from "./helper/firebaseConfig";
import Header from "./components/header";
import { useNavigate } from "react-router-dom";
import ProjectProvider from "./components/context/ProjectProvider";
import LoginRoute from "./router/loginRoute";

function App() {
  const users = firebase.firestore().collection("Users");
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("localUser");
    const userParse = JSON.parse(localUser);
    if (localUser) {
      store.dispatch({
        type: "SET_CURRENT_USER",
        payload: userParse,
      });

      return navigate("/");
    } else {
    }
  }, []);

  return (
    <Provider store={store}>
      {/* {logged ? ( */}
        {/* <ProjectProvider> */}
          <div className="App">
            <WebRoute />
          </div>
        {/* </ProjectProvider> */}
      {/* ) : (
        <LoginRoute />
      )} */}
    </Provider>
  );
}

export default App;
