const {model, Schema} = require('mongoose');

const messageSchema = new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    body: {
        type: String,
        required: true
    },
    chat:{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    status: Boolean,
    // date: Date,
    // imagePath: String 

})

const Message = model('Message', messageSchema)

module.exports = Message;