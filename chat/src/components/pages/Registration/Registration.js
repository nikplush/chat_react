import React, { useState } from 'react'
import {
  Form,
  Button
} from 'rsuite'
import { Link } from 'react-router-dom'
import CustomTextField from '../../modules/CustomTextField/CustomTextField'
import { validationModel } from '../../../utils/validators/userInputs'
import { registrationUser } from '../../../store/slaices/userInfo'
import Card from '../../modules/Card/Card'
import { useDispatch } from 'react-redux'

const Registration = () => {
  const [formValue, setFormValue] = useState({ userName: '', password: '' })
  const dispatch = useDispatch()

  const registrUser = async () => {
    const { userName, password } = formValue
    await dispatch(registrationUser({ userName, password }))
  }

  return (
        <div>
            <Card title={'Registration'}>
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
                            onClick={registrUser}>
                            Submit
                        </Button>
                        <Link to={'/login'}>Log in as an existing user</Link>
                    </div>
                </Form>
            </Card>
        </div>

  )
}
export default Registration
