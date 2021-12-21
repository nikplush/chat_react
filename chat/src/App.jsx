import './App.css'
import { BrowserRouter } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function App () {
  const [userId, setUserId] = useState()
  console.log('LOOG', userId)
  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  }, [])

  return (
        <div className="main-wrapper">
            <BrowserRouter>
                {/* {userId */}
                {/*  ? <> */}
                {/*        <Button className='logout-button'>Log out</Button> */}
                {/*        <Switch> */}
                {/*            <Route path={'/chat'} component={Chat}/> */}
                {/*            <Redirect to={'/chat'}/> */}
                {/*        </Switch> */}
                {/*    </> */}
                {/*  : <Switch> */}
                {/*        <Route path={'/registration'} */}
                {/*               render={() => ( */}
                {/*                   <Registration/> */}
                {/*               )} */}
                {/*        /> */}
                {/*        <Route path={'/login'} */}
                {/*               render={() => ( */}
                {/*                   <Login/> */}
                {/*               )} */}
                {/*        /> */}
                {/*        <Redirect to={'/login'}/> */}
                {/*    </Switch> */}
                {/* } */}
            </BrowserRouter>

        </div>
  )
}

export default App
