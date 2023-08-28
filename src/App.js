import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import WebRoute from './router/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from './helper/firebaseConfig'

function App() {

  const user = firebase.firestore().collection('Users');

  useEffect(() => {

      const localUser =  localStorage.getItem('localUser');

      if (localUser) {
        store.dispatch({type: 'SET_CURRENT_USER',payload: JSON.parse(localUser)});
      } else {
        
      }

  },[])

  return (
    <Provider store={store}>
    <div className="App">
        <WebRoute />
    </div>
    </Provider>
  );
}

export default App;
