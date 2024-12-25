import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './style.module.css';
import ChatContext from '../../contexts/ChatContext';
import { getChatsMessages } from '../../api';
import MessageItem from './MessageItem';
import { connect } from 'react-redux';
 
function Chat(props) {
  // const { currentChat, messages: contextMessages, setMessages } = useContext(ChatContext);

  // const scrollRef = useRef(null);
  // useEffect(()=>{
  //   scrollRef.current.scrollIntoView()
  // })



  // useEffect(() => {
  //   if (currentChat) {
  //     getChatsMessages(currentChat._id)
  //       .then((res) => {
  //         const receivedMessages = res.data.data.messages;
  //         setMessages(receivedMessages.length ? receivedMessages : []);
  //       })
  //       .catch((err) => console.error("Error fetching messages:", err));
  //   }
  // }, [currentChat, setMessages]);



  return (
    <div className={styles.chat}>
      {props.chatData && <h3>{props.chatData.chatName}</h3>}
      <div className={styles.messages}>
        {props.chatData.messages && props.chatData.messages.length ? (
          props.chatData.messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
    // <div>
    //   {props.chatData.messages?.map(message => <MessageItem key = {message._id} message={message} ></MessageItem>)}
    //   <div>ref={scrollRef}</div>
    // </div>
  );
}


const mapStateToProps = ({chatData}) => ({chatData})


export default connect(mapStateToProps)(Chat);