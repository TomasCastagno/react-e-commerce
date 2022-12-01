import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';



const Login = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());

  }, []);

  const { register, handleSubmit} = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post('https://e-commerce-api.academlo.tech/api/v1/users/login', data)
      .then(res => {
        navigate("/")
        localStorage.setItem("token", res.data.data.token)
      })
      .catch(error => {
        if(error.response?.status === 404) {
          alert("credenciales incorrectas")
        } else {
          console.log(error.response?.data)
        }
      })
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")}/> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;