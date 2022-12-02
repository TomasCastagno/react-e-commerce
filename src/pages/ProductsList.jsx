import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCardThunk } from '../store/slices/cart.slice';
import { filterProductsThunk, filterTitleThunk, getProductsThunk } from '../store/slices/products.slice';

const ProductsList = () => {

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);


  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories))
  }, []);

  const products = useSelector(state => state.products);

  const cart = useSelector(state => state.cart);

  const [inputSearch, setInputSearch] = useState("");


  //agregar productos al carrito


  const quantity = 1;



  const addToCart = (id) => {
    const addedProduct = {
      id,
      quantity
    };

    if (cart.find(product => product.id === id)) {
      alert("You already added this product to the cart")
    } else {
      dispatch(addToCardThunk(addedProduct))
    }

  }



  return (
    <div>

      <Row>
        <Col lg={3}>
          <h5>Categories</h5>
          <ListGroup>
            {
              categories.map(category => (
                <ListGroup.Item
                  id='button-category'
                  key={category.id}
                  onClick={() => dispatch(filterProductsThunk(category.id))}>
                  {category.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>

        </Col>
        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="search product"
              aria-label="search product"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2"
              onClick={() => dispatch(filterTitleThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>


          <h1>List Products</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (

              <Col key={product.id}>

                <Card style={{ height: '22rem' }}>

                  <Link to={`/product/${product.id}`}>
                    <Carousel variant="dark">
                      <Carousel.Item>
                        <Card.Img variant="top" src={product.productImgs?.[0]} className='img-card-product' />
                      </Carousel.Item>
                      <Carousel.Item>
                        <Card.Img variant="top" src={product.productImgs?.[1]} className='img-card-product' />
                      </Carousel.Item>
                    </Carousel>
                  </Link>

                  <Card.Body >
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }} >
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                        Price <b> $ {product.price} </b>
                      </Card.Text>

                    </Link>
                    <Button onClick={() => addToCart(product.id)} style={{ position: 'absolute', bottom: '10px', right: '20px' }}>
                      <span className="material-symbols-outlined" style={{ margin: "auto" }}>
                        add_shopping_cart
                      </span></Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row >


    </div >
  );
};

export default ProductsList;