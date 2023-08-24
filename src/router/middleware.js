import React, {useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import firebase from '../helper/firebaseConfig'

const Middleware = ({ children }) => {
  const navigate = useNavigate();
  const user = firebase.auth().currentUser;
  useEffect(() => {
    if (!user) {
     return navigate('/login');
    }
  }, [user, navigate]);

  return <>{children}</>;

};

export default Middleware;