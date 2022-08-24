import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import axiosInstance from './axios';
import { useState } from 'react';
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LoadingButton from '@mui/lab/LoadingButton';



const createNotes = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
        title: '',
        desc:''
      
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(255)
        .required(
     'Title is required!'),
   
    }),
    validationSchema: Yup.object({
        desc: Yup
          .string()
          .max(10000)
     
      }),
    onSubmit: values => {
      values['data'] = {
        "query":"",
        "response_from_ai":""
      };
      axiosInstance.post("notesapi/create/", values
      ).then((response)=>{
        setLoading(true)
        if(response){
          localStorage.setItem('contentID', response.data.id)
          setLoading(false)
          router.push('/titles')
        }

      }).catch((errors)=>{
        if(errors.response.status===500){
          

        }
      })
    }
  });

  return (
    <>
      <Head>
        <title>Create notes | Genie</title>
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
                Title and Description
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Create a title and description for your project
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >

            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
            </Box>
            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              helperText={formik.touched.title && formik.errors.title}
              label="Eg: About Big Bang"
              margin="normal"
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
            id="outlined-multiline-static"
              multiline
              error={Boolean(formik.touched.desc && formik.errors.desc)}
              fullWidth
              helperText={formik.touched.desc && formik.errors.desc}
              label="Descrition or Introduction"
              margin="normal"
              name="desc"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              rows={8}
              value={formik.values.desc}
              variant="outlined"
            />

                    <Box spacing={10}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                      }}
                    >
            
                      <LoadingButton
                        color="primary"
                        variant="text"
                        loading={false}
                        loadingPosition='end'
                        endIcon={(<ArrowRightIcon fontSize="large" />)}
                            //disabled={formik.isSubmitting}
                        size="medium"
                       
                        onClick={formik.handleSubmit}     
                      >
                        Generate
                      </LoadingButton>


                                  
                      <LoadingButton
                        color="primary"
                        variant="contained"
                        loading={loading}
                        loadingPosition='end'
                        endIcon={(<ArrowRightIcon fontSize="large" />)}
                            //disabled={formik.isSubmitting}
                        size="medium"
                       
                        onClick={formik.handleSubmit}     
                      >
                        Next
                      </LoadingButton>
            
                    </Box>


            <ToastContainer/>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default createNotes;
