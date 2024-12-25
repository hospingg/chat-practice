import React, { useContext } from 'react';
import styles from '../style.module.css';
import ChatContext from '../../../contexts/ChatContext';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getChatsMessages } from '../../../api';

const ChatItem = (props) => {
    // const { currentChat, setCurrentChat } = useContext(ChatContext);
    
    const lastMessageTime = props.chat.messages.length > 0 
        ? props.chat.messages[props.chat.messages.length - 1].timestamp 
        : "Немає повідомлень";

    const isCurrent = props.chatData._id === props.chat._id;

    const cn = cx({ [styles['current-chat']]: isCurrent });

    const selectChat = () => {
        // setCurrentChat(props.chat);
        getChatsMessages(props.chat._id)
        .then((res)=>{
        const action = {
          type: 'GET_CHAT',
          payload: res.data.data
        }
        props.dispatch(action)
        })
        
    };

    return (
      <div className={`${styles.chatItem} ${cn}`} onClick={selectChat}>
        <div className={styles.chatHeader}>
          <h4 className={styles.chatName}>{props.chat.chatName}</h4>
          <span className={styles.lastMessageTime}>{lastMessageTime}</span>
        </div>
        <div className={styles.members}>
         
        </div>
      </div>
    );
};

const mapStateToProps = ({chatList, chatData}) => ({chatList, chatData})

export default connect(mapStateToProps)(ChatItem);