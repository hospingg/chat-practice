// import { createAction } from "@reduxjs/toolkit";
import ACTION_TYPES from "./actionTypes";
// import constants from "../constants";

export const addNewMessage = (payload) => ({
        type: ACTION_TYPES.ADD_NEW_MESSAGE,
        payload,
})

export const getUserChats = () => ({
        type: ACTION_TYPES.GET_USER_CHATS,
})