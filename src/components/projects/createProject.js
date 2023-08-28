import React from 'react';
import firebase from '../../helper/firebaseConfig'
import { Formik } from 'formik';
const CreateProject = () => {

    const initialState = {
        title: '',
        description: '',
        developer: '',
        tester: '',
        startedAt: '',
        expireAt: '',
        createdBy: {}
    }

    const handleCreate = async () => {
        
    }

    const project = firebase.firestore().collection('Projects')

    return (
        <>
        <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
            await project.add({
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
        </>
    )


}

export default CreateProject;