import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCartThunk())

  }, []);

  const cart = useSelector(state => state.cart);

  const checkoutCart = () => {
    dispatch(checkoutCartThunk())
  }


  return (
      <Offcanvas show={show} onHide={handleClose}  >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map(product => (
            <ul key={product.id}>
              <li> {product.title} - ${product.price}</li>
            </ul>
          ))

          }

          <Button onClick={checkoutCart}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
  );
};

export default Cart;