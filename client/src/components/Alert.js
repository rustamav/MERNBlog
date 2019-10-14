import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

const AlertComponent = props => {
    const alerts = props.alerts;
    return alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <Alert key={alert.id} variant="danger">
            {alert.msg}s
        </Alert>
    ));
}

AlertComponent.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToPropState = (state) => ({
    alerts: state.alert
});

export default connect(mapStateToPropState)(AlertComponent);