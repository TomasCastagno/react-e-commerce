import React from 'react';

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" >
      <Container> 
        <Navbar.Brand as={Link} to="/">E-COMMERCE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login" >Log In</Nav.Link>
            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
            <Nav.Link>Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;