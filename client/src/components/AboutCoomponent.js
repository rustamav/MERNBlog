import React from 'react';
import {
    Button
}
    from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from './Alert';
import { setAlert } from '../actions/alertAction';

const AboutCoomponent = (props) => {

    const onClick = e => {
        props.setAlert("Testing the alert", "Warning");
    };

    return (
        <div>
            <Alert color='danger'></Alert>
            <Button onClick={onClick} color='dark' style={{ marginTop: '2rem' }} block>
                About
                </Button>
        </div>
    );
}
AboutCoomponent.propTypes = {
    setAlert: PropTypes.func.isRequired
};
export default connect(
    null,
    { setAlert }
)(AboutCoomponent);