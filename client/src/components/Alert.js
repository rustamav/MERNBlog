import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Alert = props => {
    const alerts = props.alerts;
    return alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id}>
            {alert.msg}
        </div>
    ));
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToPropState = (state) => ({
    alerts: state.alert
});

export default connect(mapStateToPropState)(Alert);