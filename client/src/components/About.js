import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertComponent from './Alert';
import { setAlert } from '../actions/alert';

const AboutComponent = props => {
  const onClick = e => {
    props.setAlert('Testing the alert', 'warning');
  };

  return (
    <div>
      <AlertComponent></AlertComponent>
      <Button
        onClick={onClick}
        variant='dark'
        style={{ marginTop: '2rem' }}
        block
      >
        Test Alert
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
