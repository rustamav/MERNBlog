import React, {useState} from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
}
    from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from './Alert';
import { setAlert } from '../actions/alert';
import { login } from '../actions/auth'; 

const Login = (props) => {

    const [formData, setFormData] = useState({
        email:'',
        password: ''
    })

    const {email, password} = formData;

    const onSubmit = e => {
        e.preventDefault();
        props.login(email, password);
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <Form onSubmit={e => onSubmit(e)}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  value={email}
                  onChange={e => onChange(e)}
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  value={password}
                  onChange={e => onChange(e)}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
            <Alert></Alert>
        </div>
    );
}
Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
};
export default connect(
    null,
    { setAlert, login }
)(Login);
