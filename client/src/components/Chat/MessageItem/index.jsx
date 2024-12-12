import React from 'react';
import styles from '../style.module.css';

export default function MessageItem({ message }) {
  return (
    <div className={styles.message}>
      <strong>
        {`${message.author?.firstName ? message.author.firstName + ' ' : ''}${message.author.lastName}`}
        :
      </strong>{' '}
      {message.body}
    </div>
  );
}
