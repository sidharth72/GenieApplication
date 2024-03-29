import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import axiosInstance from 'src/components/axios';
import LoadingButton from '@mui/lab/LoadingButton';


const Register = () => {

  var [usernameError, setUserNameError] = useState([''])
  var [emailError, setEmailError] = useState([''])

  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup
        .string()
        .max(255)
        .required("Firstname is required"),
      last_name: Yup
        .string()
        .max(255)
        .required("Lastname is required"),
      username: Yup
        .string()
        .max(255)
        .required(
          'Username is required'),
        email: Yup
        .string()
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .min(8, "The password is too short")
        .max(255)
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .required(
          'Password is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: values => {
      console.log(values)
      setLoading(true)
      axiosInstance.post(
        'auth/register', values
      ).then((response)=>{
        if(response.statusText=="Created"){
          setLoading(false);
          router.push('/login')
        }
      }).catch((errors)=>{
        
      if(errors.response.data.username){
        setUserNameError("Username not available")
        setEmailError("");
        setLoading(false);

      }else if(errors.response.data.email){
        setEmailError("Email not available")
        setUserNameError("");
        setLoading(false);
      }

      })


    }

  });



  return (
    <>
      <Head>
        <title>
          Register | Genie
        </title>
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
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '260px' },
                  }}
                  noValidate
                  autoComplete="off"
                >
               <TextField
                    error={Boolean(formik.touched.first_name && formik.errors.first_name)}
                    fullWidth
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    label="First Name"
                    margin="normal"
                    name="first_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.first_name}
                    variant="outlined"
            />
             <TextField
                    error={Boolean(formik.touched.last_name && formik.errors.last_name)}
                    fullWidth
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    label="Last Name"
                    margin="normal"
                    name="last_name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.last_name}
                    variant="outlined"
            />

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
              value={formik.values.username}
              variant="outlined"
            
            />

            <div style={{color:"#D14343",fontSize:"12px", marginLeft:"20px"}} 
            className='input-feedback'
            >
              {usernameError}</div>
            {/*<TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
      /> */}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
      />
       <div style={{color:"#D14343",fontSize:"12px", marginLeft:"20px"}} 
        className='input-feedback'
       >
        {emailError}
        </div>
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              {/*<Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />*/}
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <LoadingButton
                color="primary"
                //disabled={formik.isSubmitting}
                loading={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </LoadingButton>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
