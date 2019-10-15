import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertComponent from './Alert';
import { setAlert } from '../actions/alert';

const AboutComponent = props => {
  const onClick = e => {
    props.setAlert('Testing the alert', 'Warning');
  };

  return (
    <div>
      <AlertComponent color='danger'></AlertComponent>
      <Button
        onClick={onClick}
        variant='dark'
        style={{ marginTop: '2rem' }}
        block
      >
        About
      </Button>
    </div>
  );
};
AboutComponent.propTypes = {
  setAlert: PropTypes.func.isRequired
};
export default connect(
  null,
  { setAlert }
)(AboutComponent);
