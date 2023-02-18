import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, IconButton, Pagination } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axiosInstance from 'src/components/axios';
import { useRouter } from 'next/router'
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
import NotesIcon from '@mui/icons-material/Notes';




const Project = (props) => {

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

      return el.doc_title.toLowerCase().includes(inputText);
    
    }

  })

  const handleCancel = () => {
    setShowModal(false);
    setSelectedID(null);
    setSelectedTitle(null);
  }

  const projectID =  (typeof window !== "undefined") ? localStorage.getItem('project_id') : null;

  const getData = () => {
    axiosInstance.get(`project/${projectID}/`).then((response)=>{

      setUserData(response.data.document);
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
        Documents
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1, backgroundColor:"#F9FAFC"  }}
        >
          Import
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1, backgroundColor:"#F9FAFC" }}
        >
          Export
        </Button>
        <Button
          onClick={()=>router.push('/create-notes')}
         startIcon={(<AddIcon fontSize="small" />)}
          color="primary"
          variant="contained"
        >
          New Document
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent sx={{backgroundColor:"background.default"}}>
          <Box sx={{backgroundColor:"#fff", maxWidth: 500 }}>
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
                        
                          <Button sx={{textAlign:"left"}} onClick={()=>{
                            router.push('/create-edit-document');
                            localStorage.setItem('document_id',value['id'])
                        
                        }} 
                            variant="text" 
                            style={{color:"#121212"}} 
                            size="large"
                            startIcon={(<NotesIcon color="primary"
                            size="large" />)}
                          >

                            {value['doc_title']}
                          </Button>
  

                            <Tooltip style={{marginLeft:"auto"}}  
                            
                            title={`Delete ${value['doc_title']}`}
                            
                            >
                            <IconButton onClick={()=>{setSelectedID(value['id']);setSelectedTitle(value['doc_title']);setShowModal(true); }} 
                            spacing={200} 
                            aria-label="delete"
                            >
                              <DeleteOutlineIcon 
                              size="small" 
                              style={{color:"primary"}}
                              />
                            </IconButton>
                            </Tooltip>

                            <Divider/>
                        
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
                    {/*<Divider/>*/}
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
                  <Button onClick={()=>{axiosInstance.delete(`document/${selectedID}/`); setReloading(true); handleClose()}}>
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

Project.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Project;
