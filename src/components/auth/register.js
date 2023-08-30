import React from "react";
import { Formik } from "formik";
import firebase from "../../helper/firebaseConfig";
import { redirect } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Register = () => {
  const initialValues = { email: "", password: "", department: '', name: '' };
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Create Account</h2>
                  <div className="mb-3">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        await auth
                          .createUserWithEmailAndPassword(values.email, values.password)
                          .then((res) => {
                            if (res.user.uid) {
                              firestore.collection("Users").doc(res.user.uid).set({
                                name: values.name,
                                department: values.department,
                                email: values.email,
                              });
                            }
                          });
                      }}
                    >
                      {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        touched,
                        isSubmitting,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="text-center">
                              Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Name"
                              onChange={handleChange}
                              value={values.name}
                              name="name"
                            />
                          </Form.Group>

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
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Department</Form.Label>
                            <Form.Select onChange={handleChange} name="department" aria-label="Default select example">
                              <option selected disabled>Open this select menu</option>
                              <option value="tester">Tester</option>
                              <option value="dev">Dev</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
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

export default Register;
