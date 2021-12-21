const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    password: String,
    dialogsId: [{ type: Schema.Types.ObjectId, ref: 'Dialog'}],
    lastDialogId: { type: Schema.Types.ObjectId, ref: 'Dialog'}
});

module.exports = mongoose.model('User', UserSchema);
