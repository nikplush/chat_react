const User = require('../Models/User')

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    res.status(200).json(users)
  })
}

const getUser = async (req, res) => {
  try {
    const userId = req.headers.userid
    const user = await User.findById(userId)
    res.send(user)
  } catch (e) {

  }
}

module.exports = {
  getUsers,
  getUser
}
