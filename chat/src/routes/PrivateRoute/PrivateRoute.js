import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Users from '../../components/pages/Chat/components/Users/Users'
// import Dialog from '../../components/pages/Dialog'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserStatus, fetchUsers } from '../../store/slaices/users'
import { socket } from '../../utils/sockets'
import { EVENTS } from '../../constans/sockets'

const PrivateRoute = () => {
  const myId = useSelector(state => state.userInfo.userInfo._id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    socket.emit(EVENTS.USER_CONNECT, myId)
    socket.on(EVENTS.PING, data => {
      dispatch(changeUserStatus({ id: data.userId, isOnline: true }))
      socket.emit(EVENTS.PONG, myId)
    })
    socket.on(EVENTS.PONG, (data) => {
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
                {/* <Route path={'/dialogues'} component={Dialog}/> */}
                <Redirect push to={'/users'}/>
            </Switch>
        </Switch>
  )
}

export default PrivateRoute
