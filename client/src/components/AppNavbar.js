import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logout from './Logout';
const AppNavbar = props => {
  const [navBarData, setNavBarData] = useState({
    isOpen: false
  });

  const toggle = () => {
    setNavBarData({ ...navBarData, isOpen: !navBarData.isOpen });
  };

  const { isAuthenticated, user } = props.auth;

  const authLinks = (
    <Fragment>
      <Nav.Item>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
      </Nav.Item>
      <Nav.Item>
        <Logout />
      </Nav.Item>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav.Item>
        <Nav.Link href='/login'>Login</Nav.Link>
      </Nav.Item>
    </Fragment>
  );
  return (
    <Navbar
      onToggle={toggle}
      expanded={navBarData.isOpen}
      expand='lg'
      variant='dark'
      bg='dark'
    >
      <Navbar.Brand href='#'>MERN Blog</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
