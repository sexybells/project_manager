import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import firebase from "../helper/firebaseConfig";
import { useSelector } from "react-redux";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectProvider from "./context/ProjectProvider";
const Home = () => {
  const [user, setUser] = useState(null);
    const initialValues = {name: ''}
    const {currentUser} = useSelector(({state}) => ({
      currentUser: state.currentUser,
  }));
  useEffect(() => {

  });
  return (
    <ProjectProvider>
      <Container>
        <Link to={'/register'} className="btn btn-primary">Create user</Link>
        <Link to={'/create-project'} className="btn btn-primary">Them du an</Link>
      </Container>
    </ProjectProvider>
  );
};

export default Home;
