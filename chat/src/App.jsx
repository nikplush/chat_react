import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import PublicRoute from './routes/PublicRoute/PublicRoute'

function App () {
  const [userId, setUserId] = useState()
  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])

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
