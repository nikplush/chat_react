const Dialog = require('../Models/Dialog')
const Message = require('../Models/Message')
const User = require('../Models/User')

const newDialog = async (req, res) => {
    const {myId, targetId} = req.body
    try{
        const dialog = await Dialog.findOneAndUpdate({
            $or: [{'usersId': [myId, targetId]},{'usersId': [targetId, myId]}]
        }, {usersId: [myId, targetId ]},{upsert: true, new: true})
        res.send(dialog)
    }catch (e){
        res.send(e)
    }
}

const getMessage = async (req, res) => {
    const {dialogId} = req.query
    const dialog = await Dialog.findById(dialogId)
    const messages = await dialog.populate('messagesId')
    const users = await dialog.populate('usersId')
    res.send({messages: messages.messagesId, users:users.usersId })
}

module.exports = {
    newDialog,
    getMessage
}
