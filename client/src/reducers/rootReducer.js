/* eslint-disable default-case */
import ACTION_TYPES from '../actions/actionTypes'
import {produce} from 'immer'
import {getChatsList} from '../api/index'

const initialStates = {
    userData: null,
    chatData: [],
    error: null,
    chatList: [],
};

function reducer(state = initialStates, action) {
    // console.log(action)
    switch (action.type) {
        case ACTION_TYPES.GET_USER: {
            return {
                ...state,
                userData: action.payload,
            };
        }
        case ACTION_TYPES.GET_CHAT: {
            return {
                ...state,
                chatData: action.payload,
            };
        }
        case ACTION_TYPES.GET_USER_ERROR: {
            return {
                ...state,
                error: action.error,
            };
        }
        case ACTION_TYPES.ADD_NEW_MESSAGE: {
            const nextState = produce(state, (draft) =>{
                draft.chatData.messages.push(action.payload)
            }) 
            return nextState
        }
        case ACTION_TYPES.GET_USER_CHATS: {
            return{
                ...state,
                chatList: action.payload,
            }
        }
        default:
            return state;
    }
}
console.dir(reducer)

export default reducer;
