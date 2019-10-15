import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from './Alert';
import { setAlert } from '../actions/alert';
import { login } from '../actions/auth';

const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onSubmit = e => {
    e.preventDefault();
    console.log('Submitting the form. ');
    props.login(email, password);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            className='mb-3'
            value={email}
            onChange={e => onChange(e)}
          />

          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='mb-3'
            value={password}
            onChange={e => onChange(e)}
          />
          <Button
            type='submit'
            color='dark'
            style={{ marginTop: '2rem' }}
            block
          >
            Login
          </Button>
        </FormGroup>
      </Form>
      <Alert></Alert>
    </div>
  );
};
Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
