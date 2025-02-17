import axios from 'axios'
import history from '../history'

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
}) 
httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    // console.log(token)
    if(token){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}, (err) => {Promise.reject(err)})


httpClient.interceptors.response.use((response) => {
    // console.log(response)
    if(response.data.tokens){
        const {data:{tokens: {accessToken, refreshToken}}} = response
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('accessToken', accessToken)
    }
    return response; 

}, (err) => {
    // console.log(err)
    if(err.response.status === 401){
        logOut()
        history.replace('/')
    }
    else if( err.response.status === 403 && localStorage.getItem('refreshToken')){
        // console.log(err)    
        // debugger
        refreshToken()
        .then(() =>{
            return httpClient(err.config);
        })
    //     // console.log(err.response)
    } 
    else if( err.response.status === 403){
        history.replace('/')
    }
    else{
        console.log(err)
        return err.config;
    }

})

export const signIn = async (data) => await httpClient.post('/users/sign-in', data)
export const signUp = async (data) => await httpClient.post('/users/sign-up', data)
export const selectChat = async (chatId) => await httpClient.post(`/chats/${chatId}`)

export const getUser = async () => await httpClient.get('/users/')

export const addMessage = async ({ chatId, body, author }) => {
    // console.log({body})
    // const accessToken = localStorage.getItem('accessToken');
    // const headers = {
    //     Authorization: `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json',
    // };
    
    return await httpClient.post(`/chats/${chatId}`, { body, author });
}

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    localStorage.clear();
    if(refreshToken || refreshToken !== 'undefined'){
        const res =  await httpClient.post('/users/refresh-session', {refreshToken})
        console.log(res)
        return res  
    }
    
}

export const getChatsList = async () => {
    // const accessToken = localStorage.getItem('accessToken')
    return await httpClient.get('/chats')  
}


export const getChatsMessages = async (chatId) => {
    // const accessToken = localStorage.getItem('accessToken')
    return await httpClient.get(`/chats/${chatId}`)  
}

export const logOut = async () => {
    localStorage.clear();
}


export const getChats = async () => await httpClient.get('/chats')