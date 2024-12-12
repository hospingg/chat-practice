import React, { useState, useEffect, useContext } from 'react';
import styles from './style.module.css';
import ChatsList from '../../components/ChatsList';
import Chat from '../../components/Chat';
import MessageArea from '../../components/MessageArea';
import ChatContext from '../../contexts/ChatContext';
import { selectChat, addMessage } from '../../api/index';
import UserContext from '../../contexts/UserContext';

export default function Messager() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const userData = useContext(UserContext);

  const sendMessage = (text) => {
    const apiObj = {
      chatId: currentChat._id,
      body: text,
      author: userData._id,
    };

    addMessage(apiObj)
      .then((response) => {
        console.log('Message sent successfully:', response.data);
        const newMessage = {
          body: text,
          author: userData._id,
          _id: response.data.data._id
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  useEffect(() => {
    if (!selectedChatId) return;

    selectChat(selectedChatId)
      .then((res) => {
        console.log('Selected chat:', res.data.data);
        setCurrentChat(res.data.data);
        setMessages(res.data.data.messages);
      })
      .catch((error) => {
        console.error('Error fetching chat:', error);
      });
  }, [selectedChatId]);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat, setSelectedChatId, messages, setMessages }}>
      <div className={styles.chatApp}>
        <ChatsList />
        {Object.keys(currentChat).length > 0 ? (
          <div className={styles.chatContainer}>
            <Chat />
            <MessageArea onSend={sendMessage} />
          </div>
        ) : null}
      </div>
    </ChatContext.Provider>
  );
}
