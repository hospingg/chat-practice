import React from 'react';
import styles from './style.module.css'
export default function Header({ formView, changeView }) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Welcome to the Authentication Page</h1>
      <button onClick={changeView} style={styles.button}>
        {formView ? 'Switch to Sign Up' : 'Switch to Sign In'}
      </button>
    </header>
  );
};
