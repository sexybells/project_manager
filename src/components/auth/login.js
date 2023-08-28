import { Formik } from "formik";
import React, { useState } from "react";
import { user_login } from "../../helper/api";
import { useNavigate, redirect } from "react-router-dom";
import firebase from '../../helper/firebaseConfig'
import { useDispatch } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = firebase.firestore().collection('Users');
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Login</h2>
                  <div className="mb-3">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={async (values, { setSubmitting }) => {
                        await firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((res) => {
                          if (res) {
                            users.doc(res.user.uid).get().then((querySnapshot) => {
                              if (querySnapshot.exists) {
                                localStorage.setItem('localUser', JSON.stringify(querySnapshot.data()))
                                dispatch({type: 'SET_CURRENT_USER',payload:  querySnapshot.data()})
                                return navigate('/')
                              }
                            })
                          }
                        });

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
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email address
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              onChange={handleChange}
                              value={values.email}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            placeholder="Password" />
                          </Form.Group>
                          <div className="d-grid">
                            <Button variant="primary" type="submit">
                              Create Account
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        <a href="{''}" className="text-primary fw-bold">
                          Home
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
