import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk } from '../store/slices/cart.slice';
import getConfig from '../utils/getConfig';

const Cart = ({ show, handleClose }) => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCartThunk())

  }, []);

  const cart = useSelector(state => state.cart);

  const products = useSelector(state => state.products);

  const checkoutCart = () => {
    dispatch(checkoutCartThunk())
  };

  const deleteProduct = (id) => {
    axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
      .then(() => dispatch(getCartThunk()))
  }


  //CALCULA EL TOTAL DE LA COMPRA

  const allPricesCart = cart.map(product => Number(product.price))

  const totalPurchase = allPricesCart.reduce((a, b) => a + b, 0);



  return (
    <Offcanvas show={show} onHide={handleClose}  >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.map(product => (
          <Card style={{ width: '18rem', height: '300px', margin: '10px' }} key={product.id}>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Img src={(products.find(p => p.id === product.id))?.productImgs[0]} className='img-card-product' style={{ height: '25%', aspectRatio: "2/2" }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
                <Card.Text>
                  $ {product.price}
                </Card.Text>
                <Card.Text>
                  X {product.productsInCart?.quantity}
                </Card.Text>
              </div>
              <Button variant='dark' onClick={() => deleteProduct(product.id)} className='align-self-center'>
                <span className="material-symbols-outlined" >
                  delete
                </span>
              </Button>
            </Card.Body>
          </Card>
        ))

        }

        <p style={{ fontSize: "25px", fontWeight: '500' }}>Total: $ {totalPurchase.toFixed(2)}</p>

      </Offcanvas.Body>
      <Button onClick={checkoutCart}
      >Checkout
        <span class="material-symbols-outlined">
          shopping_cart_checkout
        </span></Button>
    </Offcanvas>
  );
};

export default Cart;