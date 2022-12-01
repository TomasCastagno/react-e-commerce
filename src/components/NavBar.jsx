import React, { useState } from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



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
              <Nav.Link onClick={handleShow}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Cart show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;