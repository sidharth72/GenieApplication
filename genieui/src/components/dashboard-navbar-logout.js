import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import NextLink from "next/link";
import Button from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import FaceIcon from "@mui/icons-material/Face";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axiosInstance from "src/pages/axios";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
      <DashboardNavbarRoot sx={{ height: 0, left: { lg: 1 }, width: { lg: "100%" } }} {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 10,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Back">
            <IconButton onClick={() => router.back()} sx={{ ml: 3 }}>
              <ArrowBackIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 3 }} />

          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 3 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="ME">
            <IconButton onClick={handleClick} sx={{ ml: 2 }}>
              <FaceIcon fontSize="medium" />
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
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

          {/*<Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
