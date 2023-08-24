import { Formik } from "formik";
import React, { useState } from "react";
import { user_login } from "../../helper/api";
import { useNavigate, redirect } from "react-router-dom";
import firebase from '../../helper/firebaseConfig'
const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const users = firebase.firestore().collection('User');
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        await firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((res) => {
          if (res) {
            console.log(res.user.uid);
            users.doc(res.user.uid).get().then((querySnapshot) => {
              console.log(querySnapshot.data());
            })
            // localStorage.setItem('user', JSON.stringify(res.user.uid))
            // return navigate("/");
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
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default Login;
