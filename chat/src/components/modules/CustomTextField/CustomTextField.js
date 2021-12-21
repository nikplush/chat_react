import {Form} from "rsuite";
import React from "react";

const CustomTextField = ({ name, label, accepter, type, ...rest }) => (
    <Form.Group controlId={name}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control type={type} name={name} accepter={accepter} {...rest} />
    </Form.Group>
);

export default CustomTextField
