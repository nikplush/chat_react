import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Form
} from 'rsuite'
import { Link } from 'react-router-dom'
import Card from '../../modules/Card/Card'
import CustomTextField from '../../modules/CustomTextField/CustomTextField'
import { validationModel } from '../../../utils/validators/userInputs'
import { fetchUser } from '../../../store/slaices/userInfo'

const Login = () => {
  const [formValue, setFormValue] = useState({ userName: '', password: '' })
  const dispatch = useDispatch()

  const registrationUser = async () => {
    const { userName, password } = formValue
    await dispatch(fetchUser({ userName, password }))
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
