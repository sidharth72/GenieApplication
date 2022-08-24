import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, IconButton, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { TitleListToolbar } from '../components/product/title-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { NavItem } from 'src/components/nav-item';
import axiosInstance from './axios';
import { useRouter } from 'next/router'
import AddSection from 'src/components/editor';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const Titles = () => {

  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const [reloading, setReloading] = useState(false)
  const [showModal, setShowModal] = useState();
  const [selectedID, setSelectedID] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setShowModal(false)
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedID(null);
    setSelectedTitle(null);
  }


  const getData = () => {
    axiosInstance.get("notesapi/create/").then((response)=>{
      setUserData(response.data);
      setReloading(false)
    })
  }

  useEffect(()=>{
    getData();
  }, [reloading])

    return(
      <>

      <Head>
      <title>
        Topics
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <TitleListToolbar />

  <Box 
    sx={{padding:"0px",marginTop:"30px", width: '100%', maxWidth: "100%", bgcolor: 'transparent' }}>
      <nav aria-label="">
        {
          userData.reverse().map((value, index)=>{

            return(
                <div key={index}>
                    <List>
                      <ListItem >
                        
                          <Button onClick={()=>{
                            localStorage.setItem("notesID", value['data'].id);
                            localStorage.setItem('notesTitle', value['title']);
                            localStorage.setItem('notesDesc', value['desc']);
                            localStorage.setItem('contentID', value['id']);
                            router.push('/notes')}} variant="text" style={{color:"#121212"}} size="large"
                          startIcon={(<AssignmentOutlinedIcon color="primary" size="large" />)}
                          >

                            {value['title']}
                          </Button>


                            <Tooltip style={{marginLeft:"auto"}}  title={`Delete ${value['title']}`}>
                            <IconButton onClick={()=>{setSelectedID(value['data'].id);setSelectedTitle(value['title']);setShowModal(true); }} spacing={200} aria-label="delete">
                              <DeleteOutlineIcon size="small" style={{color:"#6B7280"}}/>
                            </IconButton>
                            </Tooltip>
                        
                          {/*<Link
                          disabled
                            onClick={(e) => {
                            e.preventDefault();
                            }}
                          sx={{fontFamily:'Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji',fontSize:"1rem",color:"#28354D", fontWeight:600}} underline="none">
                            What is machine learning?
                          </Link>8*/}

                      </ListItem>
                    </List>

                    <Divider/>
                </div>

                )
              })

           
            }
                  
              <Dialog
                fullScreen={fullScreen}
                open={showModal}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {`Delete ${selectedTitle}`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure want to delete the topic "{selectedTitle}" ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={()=>{handleCancel(); setReloading(true)}}>
                    Cancel
                  </Button>
                  <Button onClick={()=>{axiosInstance.delete(`notesapi/update/${selectedID}/`); setReloading(true); handleClose()}} autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
      </nav>
    </Box>



      </Container>
    </Box>
  <div/>

      </>


    )
  
};



Titles.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Titles;
