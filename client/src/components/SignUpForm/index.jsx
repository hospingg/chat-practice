import React, {useState} from 'react'
import {Form, useFormik, Formik} from 'formik'
import styles from './styles.module.css';
import Field from '../Field'
import {format} from 'date-fns'
import { signUp } from '../../api';
export default function SignUpForm(props) {
  const [userData, setUserData] = useState(null)

  // const sendData = (data) => {
  //   callBack(data)
  // }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        imagePath: '',
        birthday: format(new Date(), 'yyyy-MM-dd'),
      }}
      onSubmit = {(values) => {
        setUserData(values)
        signUp(values)
          .then(res =>{
          // console.log(res)
          props.callBack(res)
        })
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Field name="firstName" type="text" label="FirstName" />
          <Field name="lastName" type="text" label="LastName" />
          <Field name="email" type="email" label="Email" />
          <Field name="password" type="password" label="Password" />
          <Field name="birthday" type="date" label="Birthday" />
          <Field name="imagePath" type="file" label="Profile Image" />
          <button type="submit" className={styles.button}>Submit</button>
          <button type="reset" onClick={handleReset} className={styles.button}>Reset</button>
          {/* <button onClick={sendData} className={styles.button}>Check parent</button> */}
        </Form>
      )}
    </Formik>
  );
}
