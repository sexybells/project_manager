import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import firebase from "../helper/firebaseConfig";
import { useSelector } from "react-redux";
const Home = () => {
  const [user, setUser] = useState(null);
    const initialValues = {name: ''}
    const {tempUser} = useSelector(state => state.tempUser);
    console.log('tempUser', tempUser);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  });
  return (
    <div>
      <p>Thêm dự án</p>
      <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
            await firebase.firestore().collection('Project').add({
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
    </div>
  );
};

export default Home;
