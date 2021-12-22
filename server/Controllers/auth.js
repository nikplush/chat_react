const User = require('../Models/User')

const registrationUser = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await User.findOne({ userName }).exec()
    if (user) return res.status(400).send('Username already taken')
    const newUser = await User.create({ userName, password })
    return res.send(newUser).status(200)
  } catch (err) {
    return res.status(399).send({
      message: 'Cannot create user',
      error: err
    })
  }
}

const loginUser = async (req, res) => {
  const { userName, password } = req.body
  const user = await User.findOne({ userName }).lean()
  if (user && user.password === password) {
    delete user.password
    res.status(200).send(user)
  } else {
    res.status(403).send('Invalid username or password')
  }
}

module.exports = {
  registrationUser,
  loginUser
}
