import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import ChatContext from '../../contexts/ChatContext';
import { getChatsMessages } from '../../api';
import MessageItem from './MessageItem';

export default function Chat() {
  const { currentChat } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentChat) {
      getChatsMessages(currentChat._id)
        .then((res) => {
          const receivedMessages = res.data.data.messages;
          setMessages(receivedMessages.length ? receivedMessages : []);
        })
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [currentChat, messages]);

  return (
    <div className={styles.chat}>
      {currentChat && <h3>{currentChat.chatName}</h3>}
      <div className={styles.messages}>
        {messages.length ? (
          messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );

}
