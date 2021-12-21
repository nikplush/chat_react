import React, { useState } from 'react'
import axios from 'axios'
import {
  Form,
  Button,
  toaster,
  Message
} from 'rsuite'
import CustomTextField from '../../modules/CustomTextField/CustomTextField'
import { validationModel } from '../../../utils/validators/userInputs'
import { Card } from '../../modules/Card/Card'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import PropTypes from 'prop-types'

const Registration = ({ changeUser }) => {
  const history = useHistory()
  const formRef = React.useRef()
  const [formError, setFormError] = useState({})
  const [formValue, setFormValue] = useState({ userName: '', password: '' })

  const registrationUser = async () => {
    formRef.current.check()
    if (!Object.keys(formError).length) {
      const { userName, password } = formValue
      try {
        const user = await axios.post('http://localhost:3001/auth/registration', { userName, password })
        localStorage.setItem('userId', user.data._id)
        history.push('chat')
        changeUser(user.data._id)
      } catch (e) {
        toaster.push(<Message type={'error'}>{e.response.data}</Message>, 'topCenter')
      }
    }
  }

  return (
        <div>
            <Card title={'Registration'}>
                <Form
                    model={validationModel}
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
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
                            {/* <Loader backdrop content="loading..." vertical /> */}
                        <Link to={'/login'}>Log in as an existing user</Link>
                    </div>
                </Form>
            </Card>
        </div>

  )
}
export default Registration

Registration.propTypes = {
  changeUser: PropTypes.func.isRequired
}
