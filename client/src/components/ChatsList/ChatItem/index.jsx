import React, { useContext } from 'react';
import styles from '../style.module.css';
import ChatContext from '../../../contexts/ChatContext';
import cx from 'classnames';

const ChatItem = ({ chat }) => {
    const { currentChat, setCurrentChat } = useContext(ChatContext);
    
    const lastMessageTime = chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1].timestamp 
        : "Немає повідомлень";

    const isCurrent = currentChat._id === chat._id;

    const cn = cx({ [styles['current-chat']]: isCurrent });

    const selectChat = () => {
        setCurrentChat(chat);
    };

    return (
      <div className={`${styles.chatItem} ${cn}`} onClick={selectChat}>
        <div className={styles.chatHeader}>
          <h4 className={styles.chatName}>{chat.chatName}</h4>
          <span className={styles.lastMessageTime}>{lastMessageTime}</span>
        </div>
        <div className={styles.members}>
         
        </div>
      </div>
    );
};

export default ChatItem;
