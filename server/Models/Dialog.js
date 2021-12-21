const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DialogSchema = new mongoose.Schema({
    usersId: [{ type: Schema.Types.ObjectId, ref: 'User'} ],
    messagesId: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Dialog', DialogSchema);
