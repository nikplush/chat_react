import {useState} from "react";
import { useNavigate as useHistory } from "react-router-dom";
import '../LoginPage/LoginPage.css'
import axios from "axios";


const RegistrationPage = ({setUserId}) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const click = async () => {
        try{
            const userId = (await axios.post('http://localhost:3001/auth/registration', {userName, password})).data._id
            setUserId(userId)
            history('users')
           }catch{
               alert('ahtung')
           }
        

    }

    return (
        <div className='wrapper login-page-wrapper'>
            <h1>Registration</h1>
            <label>Username</label>
            <input onChange={(e)=>setUserName(e.target.value)} type='text' placeholder={'Enter username'}/>
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder={'Enter password'}/>
            <button onClick={click}>Log in</button>
        </div>
    )
}

export default RegistrationPage
