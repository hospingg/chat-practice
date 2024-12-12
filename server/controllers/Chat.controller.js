const {User, Chat, Message} = require('../models')
 
module.exports.createChat = async (req, res, next) =>{
    try{
        const {body} = req;
        const chat = await Chat.create(body);
        res.status(201).send({data: chat})
    }
    catch(err){
        next(err)
    }
}


module.exports.addMessage = async (req, res, next) => {
    try{
        const {body, params: {chatId}} = req;
        const newMessageInstanse = await Message.create({...body, ...chatId})
         
        const chatInstanse = await Chat.findById(chatId);

        chatInstanse.messages.push(newMessageInstanse)
        await chatInstanse.save();
        res.status(201).send({data: newMessageInstanse})
    }
    catch(err){
        next(err)
    }
}

module.exports.getAllChatsByUser = async (req, res, next) => {
    try{
        const {payload: {userId}} = req
        const chats = await Chat.find({
            members: userId
        })
        // verifyToken(token)
        res.status(200).send({data:chats})
    }
    catch(err){
        next(err)
    }
}

module.exports.getChatById = async (req, res, next) => {
    try {
        const { params: { chatId } } = req;
        
        const chat = await Chat.findById(chatId)
            .populate('members', 'lastName')
            .populate({
                path: 'messages',
                populate: {
                    path: 'author',
                    select: 'lastName firstName'
                }
            });

        if (!chat) {
            return res.status(404).send({ error: 'Chat not found' });
        }

        res.status(200).send({ data: chat });
    } catch (err) {
        next(err);
    }
};



module.exports.addUserToChat = async (req, res, next) => {
    try{
        const {params: {chatId}, payload: {userId}} = req;
        const userInstanse = await User.findById(userId)
         
        const chatInstanse = await Chat.findById(chatId);

        if(!userInstanse || ! chatInstanse){
            throw new Error('user or chat is not defined')
        }
        else{
            chatInstanse.members.push(userId)
            await chatInstanse.save();
            res.status(201).send({data: chatInstanse})
        }


    }
    catch(err){
        next(err)
    }
}
