import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

  const [inputSearch, setInputSearch] = useState("");


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
              <Link to={`/product/${product.id}`} key={product.id} style={{textDecoration: 'none'}} >
                <Col>
                  <Card >
                    <Card.Img variant="top" src={product.productImgs?.[0]} style={{ height: '300px', objectFit: 'contain' }} />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        Price
                      </Card.Text>

                      <Row>
                        <Card.Text>
                          $ {product.price}
                        </Card.Text>

                        <Card.Link>
                          Cart
                        </Card.Link>
                      </Row>

                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            ))}
          </Row>
        </Col>
      </Row>





    </div >
  );
};

export default ProductsList;