import React, { useContext, useEffect, useState } from "react";
import firebase from "../../helper/firebaseConfig";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import { ProjectContext } from "../context/context";

const CreateProject = () => {

  const { currentUser, devList, testerList } = useSelector(({ state }) => ({
    currentUser: state.currentUser,
    devList: state.devList,
    testerList: state.testerList,
  }));

  const users = firebase.firestore().collection("Users");
  const project = firebase.firestore().collection("Projects");
  const [selectedDev, setSelectedDev] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const initialValues = {
    title: "",
    description: "",
    developer: "",
    tester: "",
    startedAt: "",
    createdBy: {},
    key: "",
  };

  const handleCreate = async () => {

  };


  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          await project.add({
            name: values.name,
            createdId: currentUser.id,
            status: 1,
            dev: selectedDev,
            test: selectedTest,
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
            /* and other goodies */
          }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-center">
                Project Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Project Name"
                value={values.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-center">
                Key
              </Form.Label>
              <Form.Control
                type="text"
                name="key"
                onChange={handleChange}
                placeholder="Key"
                value={values.key}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Dev
              </Form.Label>
              <Select
                isMulti
                classNamePrefix="select"
                name="developer"
                placeholder="Select Dev"
                options={devList}
                onChange={(select) => setSelectedDev(select)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Test
              </Form.Label>
              <Select
                isMulti
                classNamePrefix="select"
                name="tester"
                placeholder="Select Tester"
                options={testerList}
                onChange={(select) => setSelectedTest(select)}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );


};

export default CreateProject;
