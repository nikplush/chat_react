const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    text: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'User'},
    dialogId: { type: Schema.Types.ObjectId, ref: 'Dialog'},
    createdAt: Date
});

module.exports = mongoose.model('Message', MessageSchema);
