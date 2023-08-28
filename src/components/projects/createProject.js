import React, { useEffect, useState } from 'react';
import firebase from '../../helper/firebaseConfig'
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select'
const CreateProject = () => {

  const { currentUser } = useSelector(({ state }) => ({
    currentUser: state.currentUser
  }));
  const [devList, setDevList] = useState([]);
  const [testerList, setTesterList] = useState([]);
  const [selected, setSelected] = useState([]);

  const users = firebase.firestore().collection('Users');

  const initialValues = {
    title: '',
    description: '',
    developer: '',
    tester: '',
    startedAt: '',
    expireAt: '',
    createdBy: {},
    key: ''
  }

  const handleCreate = async () => {

  }

  const fetchUsers = async () => {
    try {
      await users.get().then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          querySnapshot.docs.map((item) => {
            if (item.data().department === 'tester') {
              const add = [...testerList];
              const params = {
                value: item.id,
                label: item.data().name
              }
              add.push(params)
              setTesterList(add);
            } else if (item.data().department === 'dev') {
              const add = [...devList];
              const params = {
                value: item.id,
                label: item.data().name
              }
              add.push(params);
              setDevList(add);
            }
          });

        }
      })
    } catch (errors) {
      console.log(errors);
    }

  }

  const selectField = (FieldProps) => {

  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const project = firebase.firestore().collection('Projects');

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values)
          // await project.add({
          //   name: values.name,
          //   createdId: currentUser.id,
          //   status: 1
          // })
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
            <Form.Group className='mb-3'>
              <Form.Label>
                Dev
              </Form.Label>
              <Select
                isMulti
                classNamePrefix='select'
                name='developer'
                options={devList}
                onChange={(select) => setSelected(select)}
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
  )


}

export default CreateProject;