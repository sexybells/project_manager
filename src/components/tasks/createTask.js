import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../helper/firebaseConfig'
import { Formik } from 'formik';
import { Form, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select'
import { ProjectContext } from '../context/context';
import { useParams } from 'react-router-dom';
const CreateTask = () => {
  const {id} = useParams();
  const { currentUser, projectList } = useSelector(({ state }) => ({
    currentUser: state.currentUser,
    projectList: state.projectList,
  }));


  const users = firebase.firestore().collection('Users');
  const project = firebase.firestore().collection('Projects');
  const taskFirebase = firebase.firestore().collection('Tasks');
  const [selectedDev, setSelectedDev] = useState([]);
  const [selectedTest, setSelectedTest] = useState([]);
  const [currentProject, setCurrentProject] = useState([]);
  const [devList, setDevList] = useState([]);
  const [testList, setTestList] = useState([]);
  const initialValues = {
    name: '',
    description: '',
  };

  const handleCreate = async () => {

  }

  useEffect(() => {
    const proj = projectList.filter((v) => v.id !== id);
    setCurrentProject(proj[0]);
    setDevList(proj[0].dev);
    setTestList(proj[0].test);

  }, [id])


  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await taskFirebase.add({
              name: values.name,
              createdId: currentUser.id,
              status: 1,
              dev: selectedDev,
              test: selectedTest,
              projectId: id,
              description: values.description
            }).then((res) => {
              console.log('save',res);
            }).catch((errors) => console.log(errors))
          } catch (e) {
            console.log(e);
          }

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
                Tiêu đề
              </Form.Label>
              <Form.Control
                type='text'
                name='name'
                onChange={handleChange}
                placeholder='Task title'
                value={values.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-center">
                Mô tả
              </Form.Label>
              <Form.Control
                type='text'
                name='description'
                onChange={handleChange}
                placeholder='Description'
                value={values.description}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Người phụ trách
              </Form.Label>
              <Select
                classNamePrefix='select'
                name='developer'
                placeholder='Select Dev'
                options={devList}
                onChange={(select) => setSelectedDev(select)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Người test
              </Form.Label>
              <Select
                classNamePrefix='select'
                name='tester'
                placeholder='Select Tester'
                options={testList}
                onChange={(select) => setSelectedTest(select)}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
               Xác nhận
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )


}

export default CreateTask;
