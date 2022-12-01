import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload
    }

  }
})

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const addToCardThunk = (addedProduct) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post('https://e-commerce-api.academlo.tech/api/v1/cart', addedProduct, getConfig())
    .then(() => dispatch(getCartThunk()))
    .catch((error) => console.log(error.response?.data))
    .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
    .then(() => dispatch(setCart([])))
    .catch((error) => console.log(error.response?.data))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
