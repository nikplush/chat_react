import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import PublicRoute from './routes/PublicRoute/PublicRoute'
import { useSelector } from 'react-redux'
import './App.css'

function App () {
  const [userId, setUserId] = useState()
  const userInfo = useSelector(state => state.userInfo.userInfo)

  useEffect(() => {
    setUserId(userInfo._id)
  }, [userInfo])

  return (
        <div className="main-wrapper">
            <BrowserRouter>
                {userId
                  ? <PrivateRoute/>
                  : <PublicRoute/>
                }
            </BrowserRouter>

        </div>
  )
}

export default App
