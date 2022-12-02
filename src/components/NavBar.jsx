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
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" bg="primary" expand="lg" >
        <Container>
          <Navbar.Brand as={Link} to="/" className="item-navbar" style={{boxShadow: "none"}}>
            <span className="material-symbols-outlined">
              home
            </span>

            E-Commerce

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login" className="item-navbar" >
                <span className="material-symbols-outlined">
                  person
                </span>
                <li> Login </li>
              </Nav.Link>

              <Nav.Link as={Link} to="/purchases" className="item-navbar">
                <span className="material-symbols-outlined">
                  shopping_bag
                </span>
                <li> Purchases </li>
              </Nav.Link>

              <Nav.Link onClick={handleShow} className="item-navbar">

                <span className="material-symbols-outlined" >
                  shopping_cart
                </span>
                <li> Cart </li>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Cart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;