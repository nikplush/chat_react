import { Redirect, Route, Switch } from 'react-router-dom'
import Users from '../../components/pages/Chat/components/Users/Users'
import Dialog from '../../components/pages/Dialog'
import React from 'react'

const PrivateRoute = () => {
  // const myId = localStorage.getItem('myId')

  return (
        <Switch>
            <Switch>
                <Route path={'/users'} render={<Users/>}/>
                <Route path={'/dialogues'} component={Dialog}/>
                <Redirect push to={'/users'}/>
            </Switch>
        </Switch>
  )
}

export default PrivateRoute
