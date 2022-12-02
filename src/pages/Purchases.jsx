import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {


  const dispatch = useDispatch();

  const purchases = useSelector(state => state.purchases)


  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])



  return (
    <div>
      <section>
        <ul className='path-home-detail'>
          <li><Link to='/'> Home </Link> </li>
          <li>Purchases</li>
        </ul>
      </section>


      <h1>My Purchases</h1>

      {
        purchases.map(purchased => (

          <Card key={purchased.id}>
            <Card.Header>{(purchased.createdAt).replace('T', '  ').slice(0, 20)}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <ul>
                  {(purchased.cart.products).map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                      <li >{product?.title} ${product?.price} </li>
                    </Link>
                  ))}
                </ul>
              </blockquote>
            </Card.Body>
          </Card>


        ))
      }

    </div>
  );
};

export default Purchases;