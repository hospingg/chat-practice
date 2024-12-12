const userRouter = require('express').Router();
const UserController = require('../controllers/User.controller');
const { hashPass } = require('../middlewares/hashPass');
const {checkToken} = require('../middlewares/checkToken')

// userRouter.post('/');
// userRouter.get('/');
// userRouter.get('/userId');
userRouter.post('/sign-up', hashPass, UserController.signUp)
userRouter.post('/sign-in', UserController.signIn)
userRouter.post('/refresh-session', UserController.refreshSession)
userRouter.get('/', checkToken, UserController.getUser)

// userRouter.get('/chats/userId', userController.getAllChatsByUser)

module.exports = userRouter; 