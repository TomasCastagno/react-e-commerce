import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCardThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {


  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, []);

  const products = useSelector(state => state.products);

  const productSelected = products.find(product => product.id === Number(id));

  const relatedProducts = products.filter(product => (
    (product?.category.id === productSelected?.category.id)
    &&
    (productSelected.id !== product.id)));

  const [quantity, setQuantity] = useState(1);

  const cart = useSelector(state => state.cart);

  const addToCart = () => {
    const addedProduct = {
      id,
      quantity
    };

    if (cart.find(product => product.id === productSelected.id)) {
      alert("You already added this product to the cart")
    } else {
      dispatch(addToCardThunk(addedProduct))
    }


  }



  return (
    <div>
      <section>
        <ul className='path-home-detail'>
          <li><Link to='/'>  Home </Link> </li>
          <li>{productSelected?.title} </li>
        </ul>
      </section>



      <section>

        <Row >
          <Col lg={6} className='col-md-offset-5'>
            <Carousel fade variant="dark">
              <Carousel.Item>
                <img
                  className="carousel-detail"
                  src={productSelected?.productImgs[0]}
                  alt="First slide"
                />

              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel-detail"
                  src={productSelected?.productImgs[1]}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel-detail"
                  src={productSelected?.productImgs[2]}
                  alt="Third slide"
                />

              </Carousel.Item>
            </Carousel>


          </Col>
          <Col lg={6}>
            <h2>{productSelected?.title}</h2>
            <p>{productSelected?.description}</p>
            <p>Price <br />
              <b> ${productSelected?.price} </b> </p>

            <div className='quantity_addtocart'>
              <InputGroup style={{ width: '100px', margin: '10px' }}>
                <Button variant="primary"
                  onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}> - </Button>
                <Form.Control
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}

                />
                <Button variant="primary"
                  onClick={() => setQuantity(quantity + 1)}> + </Button>
              </InputGroup>


              <Button onClick={addToCart}>Add to Cart
              <span class="material-symbols-outlined" style={{margin: "auto 20px"}}>
                add_shopping_cart
              </span></Button>

            </div>
          </Col>
        </Row>
      </section>
      <Row>


        <h2 style={{ margin: "50px auto" }}>Discover similar products</h2>


        <Row xs={1} md={2} lg={3} className="g-2">
          {relatedProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none' }} >
              <Col>
                <Card style={{ height: '350px', width: '300px' }}>
                  <Carousel variant="dark">
                    <Carousel.Item>
                      <Card.Img variant="top" src={product.productImgs?.[0]} className='img-card-product' style={{ height: '50%', aspectRatio: "3/2" }} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Card.Img variant="top" src={product.productImgs?.[1]} className='img-card-product' style={{ height: '50%', aspectRatio: "3/2" }} />
                    </Carousel.Item>
                  </Carousel>
                  <Card.Body >
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      Price $ {product.price}
                    </Card.Text>

                  </Card.Body>
                </Card>
              </Col>
            </Link>
          ))}
        </Row>

      </Row>

    </div>
  );
};

export default ProductDetail;