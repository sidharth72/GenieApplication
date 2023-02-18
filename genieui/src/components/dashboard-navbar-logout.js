import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, FormControl, InputLabel, Select } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import NextLink from "next/link";
import {Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
//import FaceIcon from "@mui/icons-material/Face";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axiosInstance from "src/components/axios";
import BoltIcon from '@mui/icons-material/Bolt';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LanguageMenu from "./language_bar";

const baseURL = "http://localhost:3000/"

const navbarColor = "#f7f7f7"
const iconColor = "#6B7280"

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor:navbarColor,
  border:"none",
  boxShadow: "none",
  
}));

export const DashboardNavbar = (props) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [language, setLanguage] = React.useState("");
  const open = Boolean(anchorEl);


  const languageHandleChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    axiosInstance.post("auth/logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });

    localStorage.clear();

    axiosInstance.defaults.headers["Authorization"] = null;
    router.push("/login");
  };



  const { onSidebarOpen, ...other } = props;
  return (
    <>
      <DashboardNavbarRoot sx={{height:50, left: { lg: 0 }, width: { lg: "100%" } }} 
      {...other}
      >
        <Toolbar
          disableGutters
          sx={{

            bottom:{lg:6.5},
            left: 0,
            px: 4,
          }}
        >
          {
            typeof window !== "undefined" && window.location.href !== baseURL+"create-edit-document" &&
            <Tooltip title="Menu">
            <IconButton
    
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                color:iconColor,   
            },
            }}
          >
            <MenuOutlinedIcon size="small" />

          </IconButton>

          </Tooltip>
          
          }

          {
            typeof window !== "undefined" && window.location.href !== baseURL &&

                <Box>
                <Button style={{color:iconColor}}
                size="small"
                startIcon={<ArrowBackOutlinedIcon fontSize="10px" />}
                onClick={() => router.back()} 
                sx={{ ml: 3 }}
                >
                  Back
                </Button> 
              </Box>

                  
          }
      
          <Box sx={{ flexGrow: 3 }} />

          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 3, color:iconColor}}>
              <Badge 
              badgeContent={4} 
              color="primary" 
              variant="dot"
              >
                <NotificationsOutlinedIcon sx={{fontWeight:100}} fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Username</MenuItem>
            <MenuItem onClick={handleClose}>email</MenuItem>
            <MenuItem onClick={handleClose}>pricing</MenuItem>
            <MenuItem onClick={handleClose}>Policies</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            
            <MenuItem
              onClick={() => {
                handleClose;
                Logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>

          <Tooltip title="ME">
          <IconButton 
            onClick={handleClick} 
            sx={{ ml: 2, color:iconColor}}
            >
          <Avatar
            sx={{
              height: 30,
              width: 30,
              ml: 1
            }}
            src="/static/images/avatars/avatar_4.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> 

            </IconButton>
          </Tooltip>


        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
