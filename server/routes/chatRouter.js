const chatRouter = require('express').Router();
const ChatController = require('../controllers/Chat.controller')
const {checkToken} = require('../middlewares/checkToken')
chatRouter.use(checkToken);
// chatRouter.get('/');
// chatRouter.get('/chatId');
chatRouter.get('/', ChatController.getAllChatsByUser)
chatRouter.get('/:chatId', ChatController.getChatById)
chatRouter.post('/', ChatController.createChat)
chatRouter.put('/:chatId/', ChatController.addUserToChat)
chatRouter.post('/:chatId/', ChatController.addMessage)

module.exports = chatRouter;