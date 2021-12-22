const userNameCheck = (req, res, next) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    return res.status(403).send('Invalid inputs')
  }
  return next()
}

module.exports = {
  userNameCheck
}
