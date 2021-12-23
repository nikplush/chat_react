import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Users from '../../components/pages/Users/Users'
import Dialog from '../../components/pages/Dialog/Dialog'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeUserStatus, fetchUsers } from '../../store/slaices/users'
import { socket } from '../../utils/sockets'
import { EVENTS } from '../../constants/sockets'

const PrivateRoute = () => {
  const myId = localStorage.getItem('userId')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    socket.emit(EVENTS.USER_CONNECT, myId)

    socket.on(EVENTS.ALERT_OTHER_USERS, data => {
      dispatch(changeUserStatus({ id: data.userId, isOnline: true }))
      socket.emit(EVENTS.USERS_ALERT_ME, myId)
    })

    socket.on(EVENTS.USERS_ALERT_ME, (data) => {
      dispatch(changeUserStatus({ id: data.userId, isOnline: true }))
    })

    socket.on(EVENTS.USER_DISCONNECT, data => {
      dispatch(changeUserStatus({ id: data.userId, isOnline: false }))
    })
  }, [])

  return (
        <Switch>
            <Switch>
                <Route path={'/users'} component={Users}/>
                <Route path={'/dialog'} component={Dialog}/>
                <Redirect push to={'/users'}/>
            </Switch>
        </Switch>
  )
}

export default PrivateRoute
