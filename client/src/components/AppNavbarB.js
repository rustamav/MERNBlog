import React, { useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
const AppNavbarB = (props) => {

    const [navBarData, setNavBarData] = useState({
        isOpen: false,
        user: ''
    });

    const toggle = () => {
        setNavBarData({ ...navBarData, isOpen: !navBarData.isOpen });
    };

    if(props.auth.isAuthenticated){
       // setNavBarData({...navBarData, user: props.auth.name})
    }

    return (
        <Navbar onToggle={toggle} expanded={navBarData.isOpen} expand="lg" variant="dark" bg="dark">
            <Navbar.Brand href="#">MERN Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link> Hello {navBarData.user}</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

AppNavbarB.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(AppNavbarB);