import React, {useState} from "react";
import axios from "axios";
import {Button, Form, Message, toaster} from "rsuite";
import {Card} from "../../../../modules/Card/Card";
import {validationModel} from "../../../../../utils/validators/userInputs";
import CustomTextField from "../../../../modules/CustomTextField/CustomTextField";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

const Login = ({changeUser}) => {
    const history = useHistory()
    const [formValue, setFormValue] = useState({userName: '', password: ''})


    const registrationUser = async () => {
        const {userName, password} = formValue
        try {
            const user = await axios.post('http://localhost:3001/auth/login', {userName, password})
            localStorage.setItem('userId', user.data._id)
            history.push('chat')
            changeUser(user.data._id)
        } catch (e) {
            toaster.push(<Message type={'error'}>{e.message}</Message>, 'topCenter')
        }
    }

    return (
        <div>
            <Card title={'Login'}>
                <Form
                    model={validationModel}
                    onChange={setFormValue}
                    formValue={formValue}
                >
                    <CustomTextField name="userName" label="Username"/>
                    <CustomTextField name="password" label="Password" type='password'/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button
                            appearance="primary"
                            type="submit"
                            onClick={registrationUser}>
                            Submit
                        </Button>
                        <Link to={'/registration'}>Create user</Link>
                    </div>
                </Form>
            </Card>
        </div>

    )
}
export default Login
