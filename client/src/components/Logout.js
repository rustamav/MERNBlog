import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Nav.Link onClick={this.props.logout} href='#'>
        Logout
      </Nav.Link>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
