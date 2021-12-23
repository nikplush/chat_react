import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import PublicRoute from './routes/PublicRoute/PublicRoute'
import { fetchUserById } from './store/slaices/userInfo'
import './App.css'

function App () {
  const myId = localStorage.getItem('userId')
  const [userId, setUserId] = useState(myId)
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.userInfo.userInfo)

  useEffect(() => {
    if (myId) {
      dispatch(fetchUserById(userId))
    }
  }, [])

  useEffect(() => {
    if (userInfo._id) {
      setUserId(userInfo._id)
    }
  }, [userInfo])

  return (
        <div className="main-wrapper">
            <BrowserRouter>
                  <>
                    {userId
                      ? <PrivateRoute/>
                      : <PublicRoute/>
                    }
                  </>
            </BrowserRouter>
        </div>
  )
}

export default App
