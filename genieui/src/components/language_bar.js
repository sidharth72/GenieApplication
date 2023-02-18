import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select, Typography } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';


export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputLanguage, setInputLanguage] = React.useState("");
  const [outputLanguage, setOutputLanguage] = React.useState("");
  const open = Boolean(anchorEl);

  
  const inputLanguageHandleChange = (event) => {
    setInputLanguage(event.target.value);
    localStorage.setItem('input_language', event.target.value)
  };

  const outputLanguageHandleChange = (event) => {
    setOutputLanguage(event.target.value);
    localStorage.setItem('output_language', event.target.value)
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        color="primary"
        endIcon={<TranslateIcon size="small"/>}
      >
        Language
      </Button>
      <Menu
      sx={{padding:"20px", width:"500px"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{width:"350px"}}>
        <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="body2"
                    sx={{ marginLeft: "5px", lineHeight: 2 }}
                  >
                    Select your language: 
                  </Typography> 

        <FormControl >
            <Select
            sx={{bgcolor:"#fff", width:"150px", marginLeft:"20px"}}
            defaultValue={"English"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputLanguage ? inputLanguage : "English"}
    
            size="small"
            onChange={inputLanguageHandleChange}
            >
            {/* Langauges */}
            <MenuItem value={"Arabic"}>Arabic</MenuItem>
            <MenuItem value={"Chinese"}>Chinese</MenuItem>
            <MenuItem value={"English"}>English</MenuItem>
            <MenuItem value={"French"}>French</MenuItem>
            <MenuItem value={"German"}>German</MenuItem>
            <MenuItem value={"Italian"}>Italian</MenuItem>
            <MenuItem value={"Japanese"}>Japanese</MenuItem>
            <MenuItem value={"Kannada"}>Kannada</MenuItem>
            <MenuItem value={"Khmer"}>Khmer</MenuItem>
            <MenuItem value={"Korean"}>Korean</MenuItem>
            <MenuItem value={"Lao"}>Lao</MenuItem>
            <MenuItem value={"Maithili"}>Maithili</MenuItem>
            <MenuItem value={"Malayalam"}>Malayalam</MenuItem>
            <MenuItem value={"Marathi"}>Marathi</MenuItem>
            <MenuItem value={"Nepali"}>Nepali</MenuItem>
            <MenuItem value={"Oriya"}>Oriya</MenuItem>
            <MenuItem value={"Panjabi"}>Panjabi</MenuItem>
            <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
            <MenuItem value={"Punjabi"}>Punjabi</MenuItem>
            <MenuItem value={"Rohingya"}>Rohingya</MenuItem>
            <MenuItem value={"Russian"}>Russian</MenuItem>
            <MenuItem value={"Sindhi"}>Sindhi</MenuItem>
            <MenuItem value={"Sinhala"}>Sinhala</MenuItem>
            <MenuItem value={"Spanish"}>Spanish</MenuItem>
            <MenuItem value={"Sylheti"}>Sylheti</MenuItem>
            <MenuItem value={"Tamil"}>Tamil</MenuItem>
            <MenuItem value={"Telugu"}>Telugu</MenuItem>
            <MenuItem value={"Thai"}>Thai</MenuItem>
            <MenuItem value={"Urdu"}>Urdu</MenuItem>
            <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
            </Select>
            </FormControl>
        </MenuItem>

        <MenuItem sx={{width:"350px"}}>
        <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="body2"
                    sx={{ marginLeft: "5px", lineHeight: 2 }}
                  >
                    Select genie language : 
                  </Typography> 

        <FormControl >
            
            <Select
            sx={{bgcolor:"#fff", width:"150px", marginLeft:"10px"}}
            defaultValue={"English"}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={outputLanguage ? outputLanguage : "English"}
            
            size="small"
            onChange={outputLanguageHandleChange}
            >
            {/* Langauges */}
            <MenuItem value={"Arabic"}>Arabic</MenuItem>
            <MenuItem value={"Assamese"}>Assamese</MenuItem>
            <MenuItem value={"Bengali"}>Bengali</MenuItem>
            <MenuItem value={"Burmese"}>Burmese</MenuItem>
            <MenuItem value={"Chinese"}>Chinese</MenuItem>
            <MenuItem value={"English"}>English</MenuItem>
            <MenuItem value={"French"}>French</MenuItem>
            <MenuItem value={"German"}>German</MenuItem>
            <MenuItem value={"Gujarati"}>Gujarati</MenuItem>
            <MenuItem value={"hindi"}>Hindi</MenuItem>
            <MenuItem value={"Italian"}>Italian</MenuItem>
            <MenuItem value={"Japanese"}>Japanese</MenuItem>
            <MenuItem value={"Kannada"}>Kannada</MenuItem>
            <MenuItem value={"Khmer"}>Khmer</MenuItem>
            <MenuItem value={"Korean"}>Korean</MenuItem>
            <MenuItem value={"Lao"}>Lao</MenuItem>
            <MenuItem value={"Maithili"}>Maithili</MenuItem>
            <MenuItem value={"Malayalam"}>Malayalam</MenuItem>
            <MenuItem value={"Marathi"}>Marathi</MenuItem>
            <MenuItem value={"Nepali"}>Nepali</MenuItem>
            <MenuItem value={"Oriya"}>Oriya</MenuItem>
            <MenuItem value={"Panjabi"}>Panjabi</MenuItem>
            <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
            <MenuItem value={"Punjabi"}>Punjabi</MenuItem>
            <MenuItem value={"Rohingya"}>Rohingya</MenuItem>
            <MenuItem value={"Russian"}>Russian</MenuItem>
            <MenuItem value={"Sindhi"}>Sindhi</MenuItem>
            <MenuItem value={"Sinhala"}>Sinhala</MenuItem>
            <MenuItem value={"Spanish"}>Spanish</MenuItem>
            <MenuItem value={"Sylheti"}>Sylheti</MenuItem>
            <MenuItem value={"Tamil"}>Tamil</MenuItem>
            <MenuItem value={"Telugu"}>Telugu</MenuItem>
            <MenuItem value={"Thai"}>Thai</MenuItem>
            <MenuItem value={"Urdu"}>Urdu</MenuItem>
            <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
            </Select>
            </FormControl>
        </MenuItem>

      </Menu>
    </div>
  );
}


