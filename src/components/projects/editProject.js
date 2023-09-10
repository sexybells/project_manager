import React, { useEffect, useState } from "react";
import Select from "react-select";
import firebase from "../../helper/firebaseConfig";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
const EditProject = (props) => {
  const { currentUser, devList, testerList, projectList } = useSelector(
    ({ state }) => ({
      currentUser: state.currentUser,
      devList: state.devList,
      testerList: state.testerList,
      projectList: state.projectList,
    })
  );
  const { isModal, currentProject, closeEditModal } = props;
  const users = firebase.firestore().collection("Users");
  const project = firebase.firestore().collection("Projects");
  const [selectedDev, setSelectedDev] = useState(() => currentProject.dev);
  const [selectedTest, setSelectedTest] = useState(() => currentProject.test);
  const initialValues = {
    title: "",
    description: "",
    developer: "",
    tester: "",
    startedAt: "",
    createdBy: {},
    key: "",
  };
  const handleCreate = async () => {};
  return (
    <>
      <Modal isOpen={isModal}
      onRequestClose={closeEditModal}
      >
        <Formik
          initialValues={{
            name: currentProject.name,
            dev: "",
            tester: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await project
              .doc(currentProject.id)
              .update({
                name: values.name,
                dev: selectedDev,
                test: selectedTest,
              })
              .then((res) => closeEditModal());
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
                <Form.Label className="text-center">Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Project Name"
                  value={values.name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dev</Form.Label>
                <Select
                  isMulti
                  classNamePrefix="select"
                  name="developer"
                  placeholder="Select Dev"
                  defaultValue={currentProject.dev}
                  options={devList}
                  onChange={(select) => setSelectedDev(select)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Test</Form.Label>
                <Select
                  isMulti
                  classNamePrefix="select"
                  name="tester"
                  placeholder="Select Tester"
                  options={testerList}
                  defaultValue={currentProject.test}
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
      </Modal>
    </>
  );
};

export default EditProject;
