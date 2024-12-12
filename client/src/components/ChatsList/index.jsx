import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import ChatItem from './ChatItem';
import { getChatsList } from '../../api';

export default function ChatsList() {
  const [chats, setChats] = useState()

  useEffect(() => {
    getChatsList()
      .then(res => {
        console.log(res.data.data);
        setChats(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
      });
  }, []);
  return (
    <div className={styles.chatsList}>
      <h3>Список чатів</h3>

      <div>

        {chats ? chats.map((chat) => (
          <div key={chat._id} >
            <ChatItem chat={chat} />
          </div> 
        )): null}
      </div>
    </div>
  );
}
