import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  Card,
  Tooltip,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte/dist/MUIRichTextEditor";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "src/components/axios";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Editor } from "@tinymce/tinymce-react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LoadingButton from "@mui/lab/LoadingButton";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import TranslateIcon from '@mui/icons-material/Translate';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { DashboardSidebar } from './dashboard-sidebar';
import Drawer from '@mui/material/Drawer';
import { jsPDF } from 'jspdf';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DialogContentText from '@mui/material/DialogContentText';
import Tesseract from 'tesseract.js';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

export const AddSection = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [saveOrGenerate, setSaveOrGenerate] = useState('');
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [imageURL, setImageURL] = useState('');
  const [text, setText] = useState('');
  const [textLoadingProgress, setTextLoadingProgress] = useState(false);
  const [clipboardStatus, setClipboardStatus] = useState('Copy to Clipboard');
  const [analyzedData, setAnalyzedData] = useState('');
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [tone, setTone] = useState('');
  const [language, setLanguage] = useState('');
  const [words, setWords] = useState('');


  const pdfRef = useRef(null);

  const openTone = Boolean(anchorEl1);

  const handleDownload = () => {
    const query = `<h2>${userData['query']}</h2>`;
    const content = userData['response_from_ai']
    const allContent = `${query}` + '<br>' + `${content}`

    const doc = new jsPDF();

    
    //doc.marginLeft('10px')

    var textFormat = doc.html(allContent, {x:10, y:5, margin:12, windowWidth:500, width:170})

    //doc.text(allContent, 190, 20, {align:'right'})
    //doc.text('Hey there fucking....', 20, 20)
    textFormat.save(`${userData.query}.pdf`)    
  }

  const handleChange = (event) => {
    setWords(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleTone = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleToneClose = () => {
    setAnchorEl1(null);
  }


  const handleClickPopupOpen = () => {
    setOpenPopup(true);
  }

  const handlePopupClose = () => {
    setOpenPopup(false);
  }

  var loadFile = function(event) {
    var image = document.getElementById('outputImage');
    image.src = URL.createObjectURL(event.target.files[0]);
    setImageURL(image.src);
  }


  const handleToneChange = (event) =>{
    setTone(event.target.value);
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  const handleWordsChange = (event) => {
    setWords(event.target.value);
  }


  var sendText = () =>{
    setAnalyzeLoading(true)
    var data = {
    "text": text+` 
    format using p tag, bold important points,`, 
    "tone": tone, 
    "language": language, 
    "words":words
  }
    axiosInstance.post('notesapi/analyzer', data).then((response) => {
      setAnalyzedData(response.data['resp']);
      document.getElementById('analyzedDataTag').innerHTML = response.data['resp']
      console.log("done")
      setAnalyzeLoading(false)
    })
  }

  const convertToText = () => {
    setTextLoadingProgress(true)
    Tesseract.recognize(

     imageURL, 'eng',

      {
        logger : m => console.log(m)
      }

      )
    .catch(err => {

      console.log(err)

    })
    .then(result => {
      let confidence = result.confidence;
      let text = result.data.text
      setText(text);
      setTextLoadingProgress(false);
    })
  }

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      query: "",
      response_from_ai: "",
    },
    validationSchema: Yup.object({
      query: Yup.string().max(255).required("Just a question"),
      response_from_ai: Yup.string().min(20).max(7200),
    }),
    onSubmit: (values) => {
      const subtopicsID = localStorage.getItem("subtopicsID");
      //values['response_from_ai'] = values['response_from_ai'].replace(/<\/?[^>]+>/gi, '')
      setLoading(true);
      if(subtopicsID !== null){

        if(saveOrGenerate === 'generate'){
          values['action'] = 'generate'
          values['tone'] = tone
          values['language'] = language
          values['words'] = words
        axiosInstance.put(`notesapi/update/${subtopicsID}/`, values).then((response) => {
          setUserData(response.data);
          if (response.data) {
            setLoading(false);
          }
        });
      }else{
        values['action'] = 'save'
        axiosInstance.put(`notesapi/update/${subtopicsID}/`, values).then((response)=>{
          if(response.data){
            setLoading(false);
          }
        })
      }
    }
      else{
        notesID = localStorage.getItem('notesID')
        axiosInstance.post(`notesapi/create/${subtopicsID}/`, values).then((response) => {
          setUserData(response.data);
          if (response.data) {
            setLoading(false);
          }
        });

        
      }

    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const subtopicsID = localStorage.getItem("subtopicsID");
      if(subtopicsID !== null){
      axiosInstance.get(`notesapi/update/${subtopicsID}/`).then((response) => {
        setUserData(response.data);
        });
      }
    } else {
      console.log("Authetication Error");
    }

  }, []);

  const Change = formik.handleChange;

  const ITEM_HEIGHT = 48;

  return (
    <form {...props}>
      <div>
        <Card 
        style={{ backgroundColor: "transparent", }} 
        variant="primary"
        >

          <Grid container 
          justifyContent="flex-end"
          >
            <Box 
            sx={{ m: 1}}
            >
            <Tooltip title="Text Tone">
                  <FormControl size="small" sx={{ m: 1, minWidth: 100}}>
                  <InputLabel id="demo-simple-select-helper-label">Tone</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    //defaultValue={"formal"}
                    onChange={handleToneChange}
                    label="Tone"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"friendly manner"}>Friendly</MenuItem>
                    <MenuItem value={"informal manner"}>Informal</MenuItem>
                    <MenuItem value={"formal manner"}>Formal</MenuItem>
                    <MenuItem value={"creative manner"}>Creative</MenuItem>
                    <MenuItem value={"7-year old explanation"}>7-year-old</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>

              <Tooltip title="Set Language">
                <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={"English"}
                    onChange={handleLanguageChange}
                    label="Language"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"English"}>English</MenuItem>
                    <MenuItem value={"Spanish"}>Spanish</MenuItem>
                    <MenuItem value={"French"}>French</MenuItem>
                    <MenuItem value={"German"}>German</MenuItem>
                    <MenuItem value={"Italian"}>Italian</MenuItem>
                    <MenuItem value={"Chinese"}>Chinese (Simplified and Traditional)</MenuItem>
                    <MenuItem value={"Japanese"}>Japanese</MenuItem>
                    <MenuItem value={"Arabic"}>Arabic</MenuItem>
                    <MenuItem value={"Russian"}>Russian</MenuItem>
                    <MenuItem value={"Dutch"}>Dutch</MenuItem>
                    <MenuItem value={"Swedish"}>Swedish</MenuItem>
                    <MenuItem value={"Danish"}>Danish</MenuItem>

                  </Select>
                </FormControl>
              </Tooltip>

              <Tooltip title="Number of words to generate">
                <FormControl size="small" sx={{ m: 1, minWidth: 100, color:"green" }}>
                  <InputLabel id="demo-simple-select-filled">Words</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    //defaultValue={""}
                    onChange={handleWordsChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"very small explanation"}>Small</MenuItem>
                    <MenuItem value={"Medium paragraph explanation"}>Medium</MenuItem>
                    <MenuItem value={"Large paragraph explanation"}>Large</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>

              <Tooltip title="Convert Image containing Text to Actual Text">
                <Button
                  color="primary"
                  startIcon={<ArticleOutlinedIcon fontSize="small" />}
                  sx={{ mr: 1 }}
                  onClick={handleClickPopupOpen}
                >Image to Text</Button>
              </Tooltip>

              <Dialog
                open={openPopup}
                onClose={handlePopupClose}
                //PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  Image to Text
                  <h6 style={{color:"red"}}>Atmost 5 lines of text image is preferable.</h6>
                </DialogTitle>
                <DialogContent>


                  <Button 
                  startIcon={<CloudUploadOutlinedIcon fontSize="small" />}
                  variant="contained" component="label">
                    Upload Image file
                    <input onChange={loadFile} hidden accept="image/*" multiple type="file" />
                  </Button><br/><br/>
                  <Divider/>

                  <img id="outputImage" width="400"></img><br/><br/>

                  <p>{text}</p><br/><br/>
                  <Divider/><br/><br/>
                  <h4>Results</h4><br/>
                  <p id="analyzedDataTag"></p>

                </DialogContent>
                <DialogActions>
                  <Button 
                  startIcon={<CloseIcon fontSize="small"/>}
                  autoFocus onClick={()=>{handlePopupClose(); setClipboardStatus('Copy to Clipboard')}}>
                    Cancel
                  </Button>
                  <Button 
                  startIcon={<CopyAllIcon fontSize="small"/>}

                   autoFocus onClick={()=>{navigator.clipboard.writeText(text + " " + analyzedData); setClipboardStatus('Copied.');}}>
                    {clipboardStatus}
                  </Button>

                  <LoadingButton loading={analyzeLoading} 
                  //loadingIndicator="processing..." 
                  startIcon={<AnalyticsOutlinedIcon fontSize="small" />}
                  loadingPosition="start"
                  autoFocus onClick={sendText}>
                    <span>Genie Analyze</span>
                  </LoadingButton>


                  <LoadingButton 
                  loading = {textLoadingProgress}
                  onClick={convertToText}>Extract Text</LoadingButton>
                </DialogActions>
              </Dialog>

              <Tooltip title="Export as PDF">
                <Button
                  color="success"
                  startIcon={<PictureAsPdfOutlinedIcon fontSize="small" />}
                  sx={{ mr: 1 }}
                  onClick={handleDownload}
                >PDF</Button>
              </Tooltip>
            </Box>
          </Grid>

          <CardContent style={{ backgroundColor: "transparent", /*border:"1px solid #ddd"*/ borderRadius:"10px" }}>
            <TextField
              key={userData.id}
              error={Boolean(formik.touched.query && formik.errors.query)}
              fullWidth
              helperText={formik.touched.query && formik.errors.query}
              label="Eg: Artificial Intelligence"
              margin="normal"
              name="query"
              //onBlur={formik.handleBlur}
              onChange={Change}
              defaultValue={userData.query} //formik.values.query}
              variant="standard"
            />
            <br />
            <br />
            <Editor
              apiKey="sb3nza10ov6zu4qlikx33uk6g6wl2i3az3ocv5c7rgxrqi8d"
              key={userData.id+1}
              initialValue={userData.response_from_ai}
              init={{
                height: 500,
                menubar: "view file insert edit format",
                inline: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "image undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  'body {font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"; font-size:16px}',
                branding: false,
              }}
              onEditorChange={(e) => {
                formik.handleChange({
                  target: { name: "response_from_ai", value: e },
                });
              }}
            />

            {/*
        
                              <TextField
                              id="outlined-multiline-static"
                              fullWidth
                              label="Your Note will be generated here"
                              margin="normal"
                              rows={10}
                              multiline
                              name="response_from_ai"
                              onChange={formik.handleChange}
                              type="text" 
                              value={formik.values.response_from_ai}//formik.values.response_from_ai} 
                            />

                            <MUIRichTextEditor 
                                label="Your Notes will be Generated here..."
                                id="outlined-multiline-static"
                                name="note"
                                type="text"
                                onSave={Change}
                  
                      /> */}

                      
          </CardContent>

          <Box
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 3,
            }}
          >
            {/*<Tooltip title="Save">
                                    <LoadingButton
                                        
                                        color="primary"
                                        variant="text"
                                        loading={false}
                                        loadingPosition='start'
                                        //endIcon={(<SaveOutlinedIcon fontSize="large" />)}
                                            //disabled={formik.isSubmitting}
                                        size="small"
                                      
                                        //onClick={}
                                          
                                      >
                                        Save
                                      </LoadingButton>
                          </Tooltip>*/}

 

            <LoadingButton
              id={'save'}
              color="primary"
              variant="outlined"
              loading={loading}
              startIcon={<SaveAltIcon fontSize="large" />}
              //disabled={formik.isSubmitting}
              size="small"
              onClick={()=>{formik.handleSubmit(); setSaveOrGenerate('save')}}
            >
              Save
            </LoadingButton>

            <LoadingButton
              id={'generate'}
              sx={{marginLeft: "5px"}}
              color="primary"
              variant="contained"
              loading={loading}
              startIcon={<SmartToyIcon fontSize="large" />}
              //disabled={formik.isSubmitting}
              size="small"
              loadingIndicator="Generating..."
              onClick={()=>{formik.handleSubmit(); setSaveOrGenerate('generate')}}
            >
              Lets Go
            </LoadingButton>
          </Box>
        </Card>
      </div>
    </form>
  );
};

export default AddSection;
