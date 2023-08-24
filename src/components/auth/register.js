import React from "react";
import { Formik } from "formik";
import firebase from "../../helper/firebaseConfig";
import { redirect } from "react-router-dom";

const Register = () => {
  const initialValues = { email: "", password: "" };
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((res) => {
              if (res.user.uid) {
                firestore.collection("User").doc(res.user.uid).set({
                  name: "Duong",
                  role: "tester",
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
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                onChange={handleChange}
                value={values.email}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                class="form-control"
                onChange={handleChange}
                value={values.password}
                id="exampleInputPassword1"
              />
              <div id="emailHelp" class="form-text">
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
