import React, { useEffect } from 'react';
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
      <h1>Ruta Purchases</h1>

      {
        purchases.map(purchased => (
          <div key={purchased.id}>

            {(purchased.createdAt).replace('T', '  ').slice(0, 20)}
            <ul>
              {(purchased.cart.products).map(product => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <li >{product?.title} ${product?.price} </li>
                </Link>

              ))}
            </ul>

          </div>
        ))
      }

    </div>
  );
};

export default Purchases;