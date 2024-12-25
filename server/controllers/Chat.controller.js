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
    try {
        const { body, params: { chatId }, payload: { userId } } = req;

        const newMessageInstance = await Message.create({
            ...body,
            chatId: chatId,
            author: userId,
        });

        const chatInstance = await Chat.findById(chatId);
        if (!chatInstance) {
            return res.status(404).send({ error: 'Chat not found' });
        }
        chatInstance.messages.push(newMessageInstance._id);
        await chatInstance.save();

        const populatedMessage = await newMessageInstance.populate({
            path: 'author',
            select: 'lastName firstName',
        });

        res.status(201).send( populatedMessage );
    } catch (err) {
        next(err);
    }
};


module.exports.getAllChatsByUser = async (req, res, next) => {
    try{
        const {payload: {userId}} = req
        // console.log(req.payload)
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
        console.log(chatId, req.payload)

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
