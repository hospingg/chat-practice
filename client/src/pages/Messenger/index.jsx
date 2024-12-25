import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import styles from './style.module.css';
import ChatsList from '../../components/ChatsList';
import Chat from '../../components/Chat';
import MessageArea from '../../components/MessageArea';
import ChatContext from '../../contexts/ChatContext';
import { selectChat, addMessage } from '../../api/index';
import UserContext from '../../contexts/UserContext';
import ACTION_TYPES from '../../actions/actionTypes'
import { addNewMessage } from '../../actions/actionCreators';

function Messager(props) {

  const sendMessage = (text) => {
    console.log(props.userData)
    const apiObj = {
      chatId: props.chatData._id,
      body: text, 
      author: props.userData._id,
    };
    addMessage(apiObj).then((res)=>{
      if(res){
        props.addMessage(res.data)
      }
    })
    // props.dispatch(addNewMessage(apiObj))

    // addMessage(apiObj)
    //   .then((response) => {
    //     console.log('Message sent successfully:', response);
    //     // const newMessage = {
    //     //   body: text,
    //     //   author: userData._id,
    //     //   _id: response.data.data._id
    //     // };
    //     setMessages((prevMessages) => [...prevMessages, response.data]);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending message:', error);
    //   });
  };

  // useEffect(() => {
  //   if (!selectedChatId) return;

  //   selectChat(selectedChatId)
  //     .then((res) => {
  //       // console.log('Selected chat:', res.data.data);
  //       setCurrentChat(res.data.data);
  //       setMessages(res.data.data.messages);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching chat:', error);
  //     });
  // }, [selectedChatId]);
  return (
      <div className={styles.chatApp}>
        <ChatsList />
        {props.chatData !== null? (
          <div className={styles.chatContainer}>
            <Chat />
          <MessageArea onSend={sendMessage} />
          </div>
          // <p>{props.chatData.members}</p>
        ) : null}
      </div>
  );
}
const mapStateToProps = ({userData, chatData}) =>  ({userData, chatData})
// const mapDispatchToProps = () => {
//   return{
//     addMessage: (data) => dispatch(addNewMessage(data))
//   }
// }

const mapDispatchToProps = {
  addMessage: addNewMessage
}



export default connect(mapStateToProps, mapDispatchToProps)(Messager)