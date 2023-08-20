import React from 'react';
import { Formik } from 'formik';

const Register = () => {

    const initialValues = {email: '', password}

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values)
            }}
        >
            {({values, errors, handleChange, handleSubmit, touched, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <input 
                        type='email'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input 
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default Register