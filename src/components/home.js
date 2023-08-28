import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import firebase from "../helper/firebaseConfig";
import { useSelector } from "react-redux";
import { Form, Container } from "react-bootstrap";
const Home = () => {
  const [user, setUser] = useState(null);
    const initialValues = {name: ''}
    const {currentUser} = useSelector(({state}) => ({
      currentUser: state.currentUser,
  }));
  useEffect(() => {
    console.log(currentUser);
  });
  return (
    <Container>
      <p>Thêm dự án</p>
      <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
            await firebase.firestore().collection('Project').add({
                name: values.name,
                userId: user.uid,
                status: 1
            })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-center">
                  Project Name
              </Form.Label>
              <Form.Control 
                type='text'
                name='name'
                onChange={handleChange}
                value={values.name}
              />
            </Form.Group>
        </Form>
      )}
    </Formik>
    </Container>
  );
};

export default Home;
