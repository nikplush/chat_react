import Users from './components/Users/Users'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { socket } from '../../../utils/sockets'
import { Message, toaster } from 'rsuite'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom'
import Dialog from '../Dialog'

const Chat = () => {
  const { path } = useRouteMatch()
  const [users, setUsers] = useState([])
  const [flag, setFlag] = useState(false)
  const myId = localStorage.getItem('userId')

  const getUsers = async () => {
    const allUsers = (await axios.get('http://localhost:3001/user/all')).data
    const transformUsers = allUsers.map((item) => ({ ...item, online: item._id === myId }))
    setUsers(transformUsers)
    setFlag(true)
  }

  const changeUserStatus = (data, isOnline, senNot = true) => {
    const a = users.findIndex(item => item._id === data.userId)
    if (a > -1) {
      const updatedUsers = [...users]
      updatedUsers[a].online = isOnline
      if (senNot) {
        toaster.push(
                    <Message type='success'>
                        {updatedUsers[a].userName} {isOnline ? 'connect' : 'disconnect'}
                    </Message>, { placement: 'bottomEnd' })
      }
      setUsers(updatedUsers)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (flag) {
      socket.emit('users', myId)
      socket.on('ping', data => {
        changeUserStatus(data, true)
        socket.emit('pong', myId)
      })
      socket.on('pong', (data) => {
        changeUserStatus(data, true, false)
      })
      socket.on('disconnectUser', data => {
        changeUserStatus(data, false)
      })
      setFlag(false)
    }
  }, [flag])

  return (
        <Switch>
            <Route path={`${path}/users`} render={() => <Users socket={socket} users={users}/>}/>
            <Route path={`${path}/dialogues`} component={Dialog}/>
            <Redirect push to={`${path}/users`}/>
        </Switch>
  )
}

export default Chat
