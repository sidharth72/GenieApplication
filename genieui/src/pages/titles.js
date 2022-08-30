import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, IconButton, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';

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
import axiosInstance from 'src/components/axios';
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
import CircularProgress from '@mui/material/CircularProgress';
import {
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';




const Titles = (props) => {

  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const [reloading, setReloading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [selectedTitle, setSelectedTitle] = useState();

  const [inputText, setInputText] = useState("");
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setShowModal(false)
  };

  const inputHandler = (e) => {
    var lowercase = e.target.value.toLowerCase();
    setInputText(lowercase);
  }

  // Filter data for search
  const filteredData = userData.filter((el)=>{
    if(inputText == ""){
      return el;
    }
    else{
      return el.title.toLowerCase().includes(inputText);
    }
  })

  const handleCancel = () => {
    setShowModal(false);
    setSelectedID(null);
    setSelectedTitle(null);
  }


  const getData = () => {
    axiosInstance.get("notesapi/create/").then((response)=>{
      setUserData(response.data);
      if(response.data){
        setReloading(false)
      }
    })
  }

  // Search title from list of title


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
      
      <Box>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Topics
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
        <Button
          onClick={()=>router.push('/create-notes')}
         startIcon={(<AddIcon fontSize="small" />)}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent sx={{backgroundColor:"#F9FAFC"}}>
          <Box sx={{backgroundColor:"#F9FAFC", maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Topics"
              variant="outlined"
              onChange={inputHandler}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>

  <Box 
    sx={{padding:"0px",marginTop:"30px", width: '100%', maxWidth: "100%", bgcolor: 'transparent' }}>
      <nav aria-label="">
        {reloading && 

        <Box
        style={{ minHeight: '50vh' }}
        sx={{ display: 'flex', justifyContent:"center", alignItems:"center", direction:"column", marginRight:"0"}}>
        <CircularProgress 
        color="primary"/>
        </Box>
        
        }
        {!reloading &&
          filteredData.reverse().map((value, index)=>{

            return(
                <div key={index}>
                    <List>
                      <ListItem >
                        
                          <Button onClick={()=>{
                            localStorage.setItem("notesID", value['data'].id);
                            localStorage.setItem('notesTitle', value['title']);
                            localStorage.setItem('notesDesc', value['desc']);
                            localStorage.setItem('contentID', value['id']);
                            router.push('/notes')}} 
                            variant="text" 
                            style={{color:"#121212"}} 
                            size="large"
                            startIcon={(<AssignmentOutlinedIcon color="primary" 
                            size="large" />)}
                          >

                            {value['title']}
                          </Button>


                            <Tooltip style={{marginLeft:"auto"}}  
                            
                            title={`Delete ${value['title']}`}
                            
                            >
                            <IconButton onClick={()=>{setSelectedID(value['data'].id);setSelectedTitle(value['title']);setShowModal(true); }} 
                            spacing={200} 
                            aria-label="delete"
                            >
                              <DeleteOutlineIcon 
                              size="small" 
                              style={{color:"#6B7280"}}
                              />
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
                open={(showModal!=="undefined") ? showModal : null}
                message={"Props not found lol"}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {`Delete ${selectedTitle}`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure want to delete the topic {'"'+selectedTitle+'"'} ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button 
                      onClick={()=>{
                        handleCancel(); setReloading(true)
                        }
                        }>
                    Cancel
                  </Button>
                  <Button onClick={()=>{axiosInstance.delete(`notesapi/update/${selectedID}/`); setReloading(true); handleClose()}}>
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
