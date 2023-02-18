import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Toolbar,
  List,
  ListItem, 

  AppBar,
} from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import { DashboardNavbar } from "src/components/dashboard-navbar-logout";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "src/components/axios";
import { Editor } from "@tinymce/tinymce-react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import dynamic from "next/dynamic";
import WYSIWYGEditor from "src/components/editor";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import MUIRichTextEditor from "mui-rte";
//const Editor = dynamic(() => import('src/components/ckeditor_config'), { ssr: false })
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme



export default function PermanentDrawerRight({ fn }) {
  const router = useRouter();

  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState({});
  const [content, setContent] = useState("");
  const [enabled, setEnabled] = useState("");
  const [tone, setTone] = useState("");
  const [word, setWord] = useState("");
  const [btnName, setBtnName] = useState("Generate");
  const [selectedText, setSelectedText] = useState("");

  // UseState for selection text
  const [anchorEl, setAnchorEl] = useState(null);


  // Qull editor config
  const { quill, quillRef} = useQuill();

  
  const languageHandleChange = (event) => {
    setLanguage(event.target.value);
  };

  const wordHandleChange = (event) => {
    setWord(event.target.value);
  };

  const toneHandleChange = (event) => {
    setTone(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };


  // Handle Selection of text
  const handleMouseUp = (event) =>{
    if(typeof window !== undefined && window.getSelection().toString() !== ""){
      setSelectedText(window.getSelection().toString());
      setBtnName("Continue...")
    }else{
      setBtnName("Generate")
    }
  
  }

  const handlePopUpClose = () => {
    setAnchorEl(null);
  };

  const open_popup = Boolean(anchorEl);
  const id = open_popup ? 'simple-popover' : undefined;

  useEffect(() => {

    if (typeof window !== undefined) {
        const documentID = localStorage.getItem("document_id");
        axiosInstance.get(`document/${documentID}/`).then((response) => {
          setDocument(response.data);
          formik.values.doc_title = response.data['doc_title']
          formik.values.description = response.data['description']
        });

  } else {
    null;
  }
}, []);

  const formik = useFormik({
    initialValues: {
      doc_title: "",
      description:"",
      inLanguage: "",
      outLanguage:"",
      tone: "",
      word: "",
    },
    validationSchema: Yup.object({
      doc_title: Yup.string().max(500).required("Title required"),
      description: Yup.string().max(1000).required("Description required"),
    }),
    onSubmit: (values) => {

      console.log("Submitting...")
      
      values['inLanguage'] = localStorage.getItem('input_language');
      values['outLanguage'] = localStorage.getItem('output_language');
      values["tone"] = tone;
      values["word"] = word;

      if(enabled === "doc_title" || enabled === "description"){
        delete values['content']
      }
      else if(enabled==="content"){
        delete values['doc_title']
        delete values['description']

        if(
            typeof window!==undefined 
          && 
            window.getSelection().toString() !== "" 
          
            
        
        ){
          values['content'] = window.getSelection().toString()
        }else{
          values['content'] = content
        }
      }
      //console.log(values);
      //values['response_from_ai'] = values['response_from_ai'].replace(/<\/?[^>]+>/gi, '')
      const documentID = localStorage.getItem("document_id");
      setLoading(true);
      axiosInstance.put(`document/${documentID}/`, values).then((response) => {
        setDocument(response.data);
        if (response.data) {
          setLoading(false);
          setEnabled("content");
        }
      
      });
    }
    })   

  const Change = formik.handleChange;

  function getWindowSize() {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    } else {
      null
    }
  }

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  var quill_content = document['content']
  
  useEffect(()=>{
    if(quill){
      console.log("Quill loaded")
      quill.clipboard.dangerouslyPasteHTML(`${quill_content}`)
      quill.on('text-change', (delta, oldDelta, source) => {
        //console.log('Text change!');
        //console.log(quill.getText()); // Get text only
        //console.log(quill.getContents()); // Get delta contents
        setContent(quill.root.innerHTML);
        //setDocument(document=>({...document, quill_content:quill.root.innerHTML})) // Get innerHTML using quill
        //console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        
      });
    }
  },[quill_content])
  // Changing the screen size


  var style =
    typeof window !== "undefined" && windowSize.innerWidth <= 728
      ? { marginRight: "10px", marginLeft: "10px" }
      : { marginRight: "5px", marginLeft: "0px" };

  return (

    <Box sx={{ display: 'flex'  }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <DashboardNavbar/>
      </AppBar>

     
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
        
            boxSizing: 'border-box',
            border:"none",
            width:"400px",
            backgroundColor:"background.default",
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
            <ListItem disablePadding>
          <Box
            sx={{      
              //boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              padding: "15px",
              borderRadius: "10px",
              //backgroundColor:"#F9FAFC"
            }}
          >
            {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography> */}
            <Box component="form" noValidate sx={{marginTop:"-10px"}}>
              
              <Grid container spacing={2}>

                <Grid item xs={12}>

                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                    sx={{ marginLeft: "5px", lineHeight: 2 }}
                  >
                    Title
                  </Typography>

                  <TextField
                  sx={{bgcolor:"#fff"}}
                    key={document.id}
                    error={Boolean(formik.touched.doc_title && formik.errors.doc_title)}
                    fullWidth
                    helperText={formik.touched.doc_title && formik.errors.doc_title}
                    label="Eg: Nikola Tesla"
                    margin="normal"
                    name="doc_title"
                    size="small"
                    placeholder="Title of the topic"
                    //onBlur={formik.handleBlur}
                    onFocus={()=>{setEnabled('doc_title')}}
                    onChange={Change}
                    defaultValue={document['doc_title']}
                    variant="outlined"
                  />
                </Grid>

                
                <Grid item xs={12}>

                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="p"
                    sx={{ marginLeft: "5px", lineHeight: 2, fontWeight:"bolder" }}
                  >
                    Short SEO Description (Optional)
                  </Typography>

                  <TextField
                  sx={{bgcolor:"#fff"}}
                    key={document.id + 1}
                    error={Boolean(formik.touched.query && formik.errors.query)}
                    fullWidth
                    multiline
                    placeholder="A Short description about the topic"
                    helperText={formik.touched.query && formik.errors.query}
                    margin="normal"
                    name="description"
                    size="large"
                    rows={4}
                    onFocus={()=>{setEnabled("description")}}
                    //onBlur={formik.handleBlur}
                    onChange={Change}
                    defaultValue ={document['description']}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>

                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="p"
                    sx={{ marginLeft: "5px", lineHeight: 2, fontWeight:"bolder" }}
                  >
                    URL(eg: what-is-machine-learning)
                  </Typography>

                  <TextField
                  sx={{bgcolor:"#fff"}}
                    key={document.id}
                    error={Boolean(formik.touched.doc_title && formik.errors.doc_title)}
                    fullWidth
                    helperText={formik.touched.doc_title && formik.errors.doc_title}
                    label="Eg: Nikola Tesla"
                    margin="normal"
                    name="doc_title"
                    size="small"
                    placeholder="Title of the topic"
                    //onBlur={formik.handleBlur}
                    onFocus={()=>{setEnabled('doc_title')}}
                    onChange={Change}
                    defaultValue={document['doc_title']}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LoadingButton
                    sx={{ mt: 0, mb: 2, backgroundColor:"#204ecf" }}
                    
                    fullWidth
                    variant="contained"
                    loading={loading}
                    //startIcon={<SmartToyIcon fontSize="large" />}
                    //disabled={formik.isSubmitting}
                    //size="small"
                    onClick={formik.handleSubmit}
                  >
                    Submit for Review
                  </LoadingButton>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LoadingButton
                    sx={{ mt: 0, mb: 0, backgroundColor:"#204ecf" }}
                    fullWidth
                    variant="contained"
                    loading={loading}
                    startIcon={<SaveAltIcon fontSize="large" />}
                    //disabled={formik.isSubmitting}
                    //size="small"
                    onClick={formik.handleSubmit}
                  >
                    Save
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Box>

            </ListItem>
        </List>
      </Drawer>

      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#fff', p: 1, marginLeft:"400px", marginTop:"50px", borderRadius:"20px"}}
      >
                <form>

                    <div style={{height: 'calc(100vh - 130px)'}}>
                        <div 
                        onMouseUp={handleMouseUp} 
                        style={{
                          fontSize:"18px",
                          padding:"20px",
                          spacing:10,
                          backgroundColor:"#fff",
                          border:"none",
                          borderRadius:"20px"
                        }} 
                        ref={quillRef} 
                        />

                    </div> 
                  {/*<WYSIWYGEditor style={{minHeight:"100vh"}}
                  onChange={Change}
             
                  />

                {/*<Editor value="" onChange={(v)=> console.log(v)} />*/}

                   {/*<Editor
                      apiKey="sb3nza10ov6zu4qlikx33uk6g6wl2i3az3ocv5c7rgxrqi8d"
                      key={document.id + 1}
                      initialValue={document.response_from_ai}
                    
                      init={{
                        themes:"inlite",
                        selector:"textarea",
                        placeholder: "Just begin with some words...",
                        height: `100vh`,
                        menubar:false,
                     //"view file insert edit format",
                        inline: false,
                        content_style: `body {box-shadow:none;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"; font-size:18px, line-height:4; margin:2rem;} 
                  h1{margin:16px;} 
                  h2{margin:16px;} 
                  h3{margin:16px;} 
                  h4{margin:16px;} 
                  h5{margin:16px;} 
                  h6{margin:16px;} 
                  p{ margin:16px;line-height:2;spacing:1;}
                  ul {margin:30px;line-height:2, spacing:1} 
                  
                  `,
                      }}
                      onEditorChange={(e) => {
                        formik.handleChange({
                          target: { name: "response_from_ai", value: e },
                        });
                      }}
                    /> */}

            </form>

      </Box>
    </Box>
  );
}
