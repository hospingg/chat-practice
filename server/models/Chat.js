const {model, Schema} = require('mongoose');

const chatSchema = new Schema({
    chatName: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    imagePath: String, 
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]

})

const Chat = model('Chat', chatSchema)

module.exports = Chat;