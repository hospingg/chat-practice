import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';
import ChatItem from './ChatItem';
import { getChatsList } from '../../api';
import { connect } from 'react-redux';

function ChatsList(props) {
  // const [chats, setChats] = useState()

  useEffect(() => {
    getChatsList()
      .then(({data: {data}}) => {
        const action = {
          type: 'GET_USER_CHATS',
          payload: data
        }
        props.dispatch(action)
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
      });
  }, []);
  return (
    <div className={styles.chatList}>
      <h3>Список чатів</h3>
      <div>

        {props.chatList ? props.chatList.map((chat) => (
          <div key={chat._id} >
            <ChatItem chat={chat} />
          </div> 
        )): null}
      </div>
    </div>
  );
}

const mapStateToProps = ({chatList}) => ({chatList})
 
export default connect(mapStateToProps)(ChatsList)
