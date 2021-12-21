import { Form } from 'rsuite'
import React from 'react'
import PropTypes from 'prop-types'

const CustomTextField = ({ name, label, accepter, type, ...rest }) => (
    <Form.Group controlId={name}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control type={type} name={name} accepter={accepter} {...rest} />
    </Form.Group>
)

CustomTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  accepter: PropTypes.string,
  type: PropTypes.string,
  rest: PropTypes.object
}

export default CustomTextField
