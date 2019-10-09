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
import { setAlert } from '../actions/alertAction';
import { register } from '../actions/authAction'; 

const AboutCoomponent = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: ''
    })

    const {name, email, password} = formData;

    const onClick = e => {
        props.setAlert("Testing the alert", "Warning");
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log("Submit");
        props.register({name, email, password});
    }

    const onChange = e => {
        console.log("On change");
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <Form onSubmit={e => onSubmit(e)}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  value={name}
                  onChange={e => onChange(e)}
                />

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
                  Register
                </Button>
              </FormGroup>
            </Form>
            <Alert color='danger'></Alert>
            <Button onClick={onClick} color='dark' style={{ marginTop: '2rem' }} block>
                About
            </Button>
        </div>
    );
}
AboutCoomponent.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};
export default connect(
    null,
    { setAlert, register }
)(AboutCoomponent);
