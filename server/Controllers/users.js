const User = require('../Models/User')

const getUsers = async (req, res) => {
    User.find({}, (err, users) => {
        res.status(200).json(users)
    })
}

const getUser = async (req, res) => {
    const {userId} = req.query
    const user = User.findById(userId)
    res.send(user)
}

module.exports = {
    getUsers,
    getUser
}
