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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
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
import NotesIcon from '@mui/icons-material/Notes';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { jsPDF } from 'jspdf';
import {useRef} from 'react'
import LoadingButton from "@mui/lab/LoadingButton";


const Titles = (props) => {

  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const [reloading, setReloading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const [inputText, setInputText] = useState("");
  const [selectedTopicID, setSelectedTopicID] = useState();
  const [subtopicBoxToggle, setSubtopicBoxToggle] = useState(false);
  const [subtopicInput, setSubtopicInput] = useState('');
  const [allTopics, setAllTopics] = useState([]);
  const [checkedContent, setCheckedContent] = useState([])
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const pdfRef = useRef(null);




  /*function getDataUri(url)
    {
      return new Promise(resolve => {
    var image = new Image();
    //image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight; 

        //next three lines for white background in case png has a transparent background
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';  /// set white fill style
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.getContext('2d').drawImage(this, 0, 0);

        resolve(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;

    if(image.complete || image.complete === undefined){
      image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      image.src = src;
    }
  })
}*/


  const handleBulkExport = () => {
    const contentArray = checkedContent;

    const contentString = contentArray.join(" ");

    const doc = new jsPDF();


    //const imgRegex = /<img.*?src="(.*?)"/g;

    //var img = getDataUri("https://developer.android.com/static/guide/topics/providers/images/content-provider-tech-stack.png")

    //console.log(img)

    var textFormat = doc.html(contentString, {x:10, y:5, margin:[12, 20, 12, 20], windowWidth:500, width:170})
    //doc.text(allContent, 190, 20, {align:'right'})
    //doc.text('Hey there fucking....', 20, 20)
    textFormat.save(`${contentString.slice(0, 15)}.pdf`)   
  }

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showBox, setShowbox] = useState(false);

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

  const handleSubtopicBoxCancel = () => {
    setSubtopicBoxToggle(false)
    setSelectedTopicID(null)
  }

  const handleTopicInputChange = (event) => {
    setSubtopicInput(event.target.value)
  }

  const handleCheckedContent = (event) => {
    const data = event.target.name

    if(event.target.checked){
      setCheckedContent([...checkedContent, data]);
    }else{
      setCheckedContent(checkedContent.filter((c)=>c !== data))
    }
  }

  const getData = () => {
    axiosInstance.get("notesapi/create/").then((response)=>{
      setUserData(response.data);
      if(response.data){
        setReloading(false)
      }
    })
  }


  const sendSubtopic = () => {
    
    allTopics.push({"query":subtopicInput, "response_from_ai":""})

    axiosInstance.put(`notesapi/create/${selectedTopicID}/`,

      //Array thing
      {'data':allTopics}

      ).then((response) => {

        if(response){
          setSubtopicBoxToggle(false);
          setReloading(true)
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
        variant="h4"
        sx={{fontWeight:"700"}}
      >
        Your Wishes
      </Typography>
      <Box sx={{ m: 1 }}>
        <LoadingButton
          loading={loading}
          startIcon={(<DownloadIcon fontSize="small" />)}
          onClick={handleBulkExport}
          sx={{ mr: 1 }}
        >
          Bulk Export
        </LoadingButton>
        <Button
          onClick={()=>router.push('/create-notes')}
         startIcon={(<AddIcon fontSize="small" />)}
          color="primary"
          variant="contained"
        >
          Make
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
    sx={{padding:"0px",marginTop:"30px", width: '100%', maxWidth: "100%" }}>
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
                    <div style={{padding:"10px", textAlign:"justify", borderRadius:"5px"}}>
                      <Typography
                          sx={{ m: 1 }}
                          variant="h6"
                          color="textPrimary" 
                          //sx={{fontFamily:"poppins",fontWeight:"light"}}
                        >
                        {value['title']}
                        </Typography>

                        {/*<Typography
                          sx={{color:"#65748B", fontSize:"14px", padding:"10px", textAlign:"center"}}
                          variant="p"
                        >
                          {value['desc']} 
                        </Typography>*/}
                        </div>
                        {value['data'].map((subtopics, i)=>{
                          
                      return (<ListItem key={i}  >                        
                          <Button onClick={()=>{

                            localStorage.setItem("subtopicsID", subtopics['id']);
                            localStorage.setItem('notesTitle', value['title']);
                            localStorage.setItem('notesDesc', value['desc']);
                            localStorage.setItem('notesID', value['id']);
                            router.push('/notes')}} 
                            key={value['id']}
                            variant="text" 
                            style={{color:"#121828"}} 
                            size="medium"
                            startIcon={(<NotesIcon color="primary" 
                            size="large" />)}
                          >

                            {subtopics['query']}

                          </Button>

                            <Tooltip style={{marginLeft:"auto"}}  
                            
                            title={`Delete ${subtopics['query']}`}
                            
                            >
                            <IconButton onClick={()=>{setSelectedID(subtopics.id);setSelectedTitle(subtopics['query']);setShowModal(true); }} 
                            spacing={200} 
                            aria-label="delete"
                            >

                              <DeleteOutlineIcon 
                              size="small" 
                              style={{color:"#6B7280"}}
                              />
                            </IconButton>
                            </Tooltip>
                            <FormControlLabel 
                            control={
                              <Checkbox 
                              checked={checkedContent.includes(subtopics['query'] + " <br><br>" + subtopics['response_from_ai'])} 
                              name={subtopics['query'] + " <br><br>" + subtopics['response_from_ai']} />} 
                              label="" 
                              onChange={handleCheckedContent}
                              />
                              
                          {/*<Link
                          disabled
                            onClick={(e) => {
                            e.preventDefault();
                            }}
                          sx={{fontFamily:'Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji',fontSize:"1rem",color:"#28354D", fontWeight:600}} underline="none">
                            What is machine learning?
                          </Link>8*/}

                      </ListItem>)

                      })}
                        <div style={{padding:"10px"}}>

                        <Button 
                        variant="text"
                        color="success"
                        startIcon={(<AddIcon fontSize="small" />)}
                        onClick={()=>{

                          setSubtopicBoxToggle(true)
                          setSelectedTopicID(value['id'])
                          setAllTopics(value['data'])

                        }}
                        >
                        Add
                        
                        </Button>


                        </div>
                      <Divider>**</Divider>
                    </List>
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
                        handleCancel();
                        }
                        }>
                    Cancel
                  </Button>
                  <Button 
                  onClick={()=>{axiosInstance.delete(`notesapi/update/${selectedID}/`); setReloading(true); handleClose()}}>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>

        <Dialog open={subtopicBoxToggle} onClose={handleClose}>
        <DialogTitle>Create Subtopic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new Subtopic on {"here"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your subtopic here"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTopicInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubtopicBoxCancel}>Cancel</Button>
         <Button onClick={sendSubtopic}>Create</Button>
        </DialogActions>
      </Dialog>

      </nav><br/><br/><br/>

      <h6>By PyCodeMates Team</h6>
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
