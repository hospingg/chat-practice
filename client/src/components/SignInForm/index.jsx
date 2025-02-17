import React, {useEffect, useState} from 'react'
import {Form, useFormik, Formik} from 'formik'
import Field from '../Field'
import styles from './styles.module.css';
import {signIn} from '../../api/index'

export default function SignInForm(props) 
{
  const [userData, setUserData] = useState(null)
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit = {(values) => {
        setUserData(values)
        const res = signIn(values)
        return res
        .then(res =>{
          console.log(res)
          if(res.status === 200){
            props.callBack(res)
          }
          else{
            console.log('Wrong username or password')
          }
          // console.log(res)
        })
      }}
    >
      {({ handleReset }) => (
        <Form>
          <Field name="email" type="email" label="Email" />
          <Field name="password" type="password" label="Password" />
          <button type="submit" className={styles.button}>Submit</button>
          <button type="reset" onClick={handleReset} className={styles.button}>Reset</button>
        </Form>
      )}
    </Formik>
  );
}
