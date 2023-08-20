import { Formik } from "formik";
import React, { useState } from "react";
import { user_login } from "../../helper/api";

const Login = () => {
  const initialValues = { email: "", password: "" };
  return (
    <Formik 
    initialValues={initialValues} 
    onSubmit={(values, { setSubmitting }) => {
            user_login(values).then((res) => {
                if (res.length) {
                    console.log(res);
                }
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
          <button type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Login;
