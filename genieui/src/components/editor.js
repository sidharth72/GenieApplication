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
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "src/pages/axios";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TranslateIcon from "@mui/icons-material/Translate";
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

export const AddSection = (props) => {
  const [open, setOpen] = useState(false);
  const [words, setWords] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

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
      console.log(values);
      //values['response_from_ai'] = values['response_from_ai'].replace(/<\/?[^>]+>/gi, '')
      const notesID = localStorage.getItem("notesID");
      setLoading(true);
      axiosInstance.put(`notesapi/update/${notesID}/`, values).then((response) => {
        setUserData(response.data);
        if (response.data) {
          setLoading(false);
        }
      });
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const notesID = localStorage.getItem("notesID");
      axiosInstance.get(`notesapi/update/${notesID}/`).then((response) => {
        setUserData(response.data);
      });
    } else {
      console.log("Authetication Error");
    }
  }, []);

  const Change = formik.handleChange;

  return (
    <form {...props}>
      <div>
        <Card style={{ backgroundColor: "transparent" }} variant="primary">
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <InputLabel htmlFor="demo-dialog-native">Words</InputLabel>
                  <Select
                    native
                    value={words}
                    onChange={handleChange}
                    input={<OutlinedInput label="Words" id="demo-dialog-native" />}
                  >
                    <option aria-label="None" value="" />
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={300}>300</option>
                    <option value={500}>500</option>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
          </Dialog>

          <Grid container justifyContent="flex-end">
            <Box sx={{ m: 1 }}>
              <Tooltip title="translate to other languages">
                <Button
                  color="primary"
                  startIcon={<TranslateIcon fontSize="medium" />}
                  sx={{ mr: 1 }}
                ></Button>
              </Tooltip>
              <Tooltip title="Number of words to generate">
                <Button
                  color="primary"
                  startIcon={<PinOutlinedIcon fontSize="medium" />}
                  sx={{ mr: 1 }}
                  onClick={handleClickOpen}
                ></Button>
              </Tooltip>

              <Tooltip title="Export as PDF">
                <Button
                  color="secondary"
                  startIcon={<PictureAsPdfOutlinedIcon fontSize="small" />}
                  sx={{ mr: 1 }}
                ></Button>
              </Tooltip>

              <Tooltip title="Export as HTML">
                <Button
                  color="secondary"
                  startIcon={<CodeIcon fontSize="small" />}
                  sx={{ mr: 1 }}
                ></Button>
              </Tooltip>

              <Tooltip title="Export as raw text">
                <Button
                  color="secondary"
                  variant="text"
                  startIcon={<FormatColorTextIcon fontSize="small" />}
                ></Button>
              </Tooltip>
              <Tooltip title="Export as handwritten data(JPG)">
                <Button
                  color="secondary"
                  variant="text"
                  startIcon={<CreateOutlinedIcon fontSize="small" />}
                ></Button>
              </Tooltip>
            </Box>
          </Grid>

          <CardContent>
            <TextField
              key={userData.id}
              error={Boolean(formik.touched.query && formik.errors.query)}
              fullWidth
              helperText={formik.touched.query && formik.errors.query}
              label="Eg: Write about Big Bang"
              margin="normal"
              name="query"
              //onBlur={formik.handleBlur}
              onChange={Change}
              defaultValue={userData.query} //formik.values.query}
              variant="outlined"
            />
            <br />
            <br />
            <Editor
              apiKey="sb3nza10ov6zu4qlikx33uk6g6wl2i3az3ocv5c7rgxrqi8d"
              key={2}
              initialValue={userData.response_from_ai}
              init={{
                height: 600,
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
                  'body { background:"#fff"; font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"; font-size:16px }',
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
              color="primary"
              variant="contained"
              loading={loading}
              startIcon={<SmartToyIcon fontSize="large" />}
              //disabled={formik.isSubmitting}
              size="small"
              onClick={formik.handleSubmit}
            >
              Generate
            </LoadingButton>
          </Box>
        </Card>
      </div>
    </form>
  );
};

export default AddSection;
