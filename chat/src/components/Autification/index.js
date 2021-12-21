import {useState} from "react";
import LoginPage from "./LoginPage/LoginPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";


const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    const openLogin = () => {
        setIsLogin(true)
    }

    const openRegistration = () => {
        setIsLogin(false)
    }

    const setUserIdInLochalStor = (userId) => {
        localStorage.setItem('userId', userId)
    }

    return (
        <div className='wrapper'>
            <div style={{display: 'flex'}}>
                <button onClick={openLogin}>Login</button>
                <button onClick={openRegistration}>Registration</button>
            </div>
            <div>
                {isLogin
                    ? <LoginPage setUserId={setUserIdInLochalStor} />
                    : <RegistrationPage setUserId={setUserIdInLochalStor} />
                }
            </div>
        </div>
    )
}

export default Auth
