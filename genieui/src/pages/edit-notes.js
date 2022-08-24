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



const editNotes = () => {

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
      const contentID = (typeof window !== "undefined") ? localStorage.getItem('contentID'): console.log("Authentication error")
      axiosInstance.put(`notesapi/create/${contentID}/`, values
      ).then((response)=>{
        setLoading(true)
        localStorage.setItem('notesTitle', response.data.title)
        localStorage.setItem('notesDesc', response.data.desc)
        if(response){
          setLoading(false)
          router.back()
        }

      }).catch((errors)=>{
        console.log(errors)
        if(errors.response.status===500){
          console.log("Error")
        }
      })
    }
  });

  // Checking whether title or description is null and if 
  // it is null setting it to the previous value
  if(
    
    formik.values.title === "" 
    || formik.values.desc === ""
    
    ){
    formik.values.title =  (typeof window !== "undefined") ? localStorage.getItem('notesTitle'): console.log("Authentication error")
    formik.values.desc =  (typeof window !== "undefined") ? localStorage.getItem('notesDesc'): console.log("Authentication error")
  }

  return (
    <>
      <Head>
        <title>Edit notes | Genie</title>
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
                Edit Title and Description
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Edit title and description for your project
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
                key={1}
              error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              helperText={formik.touched.title && formik.errors.title}
              label="Eg: About Big Bang"
              margin="normal"
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              defaultValue={(typeof window !== "undefined") ? localStorage.getItem('notesTitle') : console.log("Authentication error")}
              variant="outlined"
            />
            <TextField
            key={2}
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
              defaultValue={(typeof window !== "undefined") ? localStorage.getItem('notesDesc'): console.log("Authentication error")}
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
                        //endIcon={(<ArrowRightIcon fontSize="large" />)}
                            //disabled={formik.isSubmitting}
                        size="medium"
                       
                        onClick={formik.handleSubmit}     
                      >
                        Generate
                      </LoadingButton>


                                  
                      <LoadingButton
                        color="secondary"
                        variant="contained"
                        loading={loading}
                        loadingPosition='end'
                        //endIcon={(<ArrowRightIcon fontSize="large" />)}
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

export default editNotes;
