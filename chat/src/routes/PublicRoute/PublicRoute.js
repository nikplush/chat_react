import React from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Login from '../../components/pages/Login/Login'
import Registration from '../../components/pages/Registration/Registration'

const PublicRoute = () => {
  return (
        <Switch>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/registration' component={Registration}/>
                <Redirect push to={'/login'}/>
            </Switch>
        </Switch>
  )
}

export default PublicRoute
