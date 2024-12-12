import React from 'react'
import { useField } from 'formik'
import styles from './style.module.css'

export default function Field({ label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <div className={styles.fieldContainer}>
          <label className={styles.label}>{label}</label>
          <input {...field} {...props} className={styles.input} />
          {meta.touched && meta.error ? (
            <div className={styles.error}>{meta.error}</div>
          ) : null}
        </div>
      )
}
