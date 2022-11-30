import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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


  return (
    <div>
      <section>
        <h5>Ruta Product Detail</h5>
      </section>



      <section>

        <Row >
          <Col lg={6} className='col-md-offset-5'>
      
            <img src={productSelected?.productImgs[0]} alt='phone' className='img-fluid' style={{width: '500px'}} />
          </Col>
          <Col lg={6}>
            <h2>{productSelected?.title}</h2>
            <p>{productSelected?.description}</p>
            <p>Price <br />
              <b> ${productSelected.price} </b> </p>
            <Button>Add to Card</Button>
          </Col>
        </Row>
      </section>
      <Row>
        <section>
          <h1>Discover similar products</h1>
          {relatedProducts.map(product =>
          (<ul key={product.id}>
            <Link to={`/product/${product.id}`}> <li>{product.title}</li> </Link>
          </ul>)
          )}
        </section>
      </Row>

    </div>
  );
};

export default ProductDetail;