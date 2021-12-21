import './App.css';
import Registration from "./components/pages/Autification/components/Registration/Registration";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Login from "./components/pages/Autification/components/Login/Login";
import Chat from "./components/pages/Chat/Chat";
import {useEffect, useState} from "react";
import {Button} from "rsuite";

function App() {
    const [userId, setUserId] = useState()

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    const changeUser = (id) => {
        setUserId(id)
    }

    const logoutUser = () => {
        setUserId('')
        localStorage.removeItem('userId')
    }

    return (
        <div className="main-wrapper">
            <BrowserRouter>
                {userId
                    ?
                    <>
                        <Button className='logout-button' onClick={logoutUser}>Log out</Button>
                        <Switch>
                            <Route path={'/chat'} component={Chat}/>
                            <Redirect to={'/chat'}/>
                        </Switch>
                    </>
                    :
                    <Switch>
                        <Route path={'/registration'}
                               render={() => (
                                   <Registration changeUser={changeUser}/>
                               )}
                        />
                        <Route path={'/login'}
                               render={() => (
                                   <Login changeUser={changeUser}/>
                               )}
                        />
                        <Redirect to={'/login'}/>
                    </Switch>
                }
            </BrowserRouter>

        </div>
    );
}

export default App;
