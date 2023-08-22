import React from "react";
import { Formik } from "formik";
import firebase from "../../helper/firebaseConfig";
import { redirect } from 'react-router-dom';

const Register = () => {
  const initialValues = { email: "", password: "" };
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        await auth
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((res) => {
            if (res.user.uid) {
              firestore.collection('User').doc(res.user.uid).set({
                name: 'Duong'
              })
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
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default Register;
