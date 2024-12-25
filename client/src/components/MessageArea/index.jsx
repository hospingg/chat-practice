import React, { useState, useContext } from 'react';
import { useField } from 'formik';
import styles from './style.module.css';
import ChatContext from '../../contexts/ChatContext';

export default function MessageArea({ onSend }) {
  // const { currentChat } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };
  return (
    <div className={styles.messageArea}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Напишіть повідомлення..."
        className={styles.input}
      />
      <button onClick={handleSend} className={styles.sendButton}>
        Відправити
      </button>
    </div>
  );
}
