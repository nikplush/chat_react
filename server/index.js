const express = require('express')
const app = express()
const cors = require('cors')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
const Message = require('./Models/Message')
const Dialog = require('./Models/Dialog')
const authRouter = require('./Routers/auth')
const usersRouter = require('./Routers/users')
const dialoguesRouter = require('./Routers/dialogues')
const SOCKET_PATHS = require('./constans/sockets')

app.use(express.json())

app.use(cors())
const http = require('http').createServer(app)

mongoose.connect('mongodb://localhost:27017/chat', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err) => {
  if (err) return console.log(err)
})

app.use('/auth', authRouter)
app.use('/user', usersRouter)
app.use('/dialogues', dialoguesRouter)

let onlineUsers = []

const socketServer = (httpServer) => {
  const io = socketIo(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
      transports: ['polling'],
      cookie: false
    }
  })
  io.on('connect', (socket) => {
    socket.on(SOCKET_PATHS.USER_CONNECT, (id) => {
      onlineUsers.push({ socket: socket, id })
      socket.broadcast.emit(SOCKET_PATHS.PING, { userId: id })
    })

    socket.on(SOCKET_PATHS.PONG, (id) => {
      socket.broadcast.emit(SOCKET_PATHS.PONG, { userId: id })
    })

    socket.on(SOCKET_PATHS.SEND_MESSAGE, async (data) => {
      const { authorId, dialogId, text } = data
      const newMessage = await Message.create({ authorId, dialogId, text })
      const dialog = await Dialog.findByIdAndUpdate(dialogId, { $push: { messagesId: newMessage._id } })
      const otherUsers = dialog.usersId.filter(item => item !== authorId)
      otherUsers.forEach((item) => {
        const onlineUser = onlineUsers.find(user => user.id === item.toString())
        if (onlineUser) {
          onlineUser.socket.emit(SOCKET_PATHS.SEND_MESSAGE, { message: newMessage, dialogId: dialogId })
        }
      })
    })

    socket.on('disconnect', () => {
      const user = onlineUsers.find(item => item.socket.id === socket.id)
      onlineUsers = onlineUsers.filter(item => item.socket.id !== socket.id)
      const flag = onlineUsers.find(item => item.id === user?.id)
      if (!flag) {
        socket.broadcast.emit(SOCKET_PATHS.USER_DISCONNECT, { userId: user?.id })
      }
    })

    socket.on(SOCKET_PATHS.START_TYPING, (id) => {
      const onlineUser = onlineUsers.find(user => user.id === id)
      if (onlineUser) {
        onlineUser.socket.emit(SOCKET_PATHS.START_TYPING)
      }
    })

    socket.on(SOCKET_PATHS.END_TYPING, (id) => {
      const onlineUser = onlineUsers.find(user => user.id === id)
      if (onlineUser) {
        onlineUser.socket.emit(SOCKET_PATHS.END_TYPING)
      }
    })
  })
}
socketServer(http)

const port = process.env.PORT || 3001

app.use(express.json())

http.listen(port, () => {
  console.log(`App available at http://localhost:${port}`)
})
