const Dialog = require('../Models/Dialog')

const newDialog = async (req, res) => {
  const { myId, targetId } = req.body
  try {
    const dialog = await Dialog.findOneAndUpdate({
      $or: [{ usersId: [myId, targetId] }, { usersId: [targetId, myId] }]
    }, { usersId: [myId, targetId] }, { upsert: true, new: true })
    const messages = await dialog.populate('messagesId')
    res.send({ messages: messages.messagesId, dialogId: dialog._id })
  } catch (err) {
    return res.status(399).send({
      message: 'Cannot find dialog',
      error: err
    })
  }
}

module.exports = {
  newDialog
}
