import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import axiosInstance from 'axios'
import { useState } from 'react';
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const notify = () => {
    
    toast.error("Invalid Credentials !", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      hideProgressBar: true,
      
    });

  }

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required(
          'Username is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: values => {
      axiosInstance.post('http://localhost:8000/auth/login/', values
      
      ).then((response)=>{
        if(response.data){
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh)
          axiosInstance.defaults.headers['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
          router.push('/')
          
        }
      }).catch((errors)=>{
        if(errors.response.status===401){
          notify();

        }
      })
    }
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with username
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                //disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                //onClick={notify}
                
              >
                Sign In Now
              </Button>
            </Box>
            <ToastContainer/>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
