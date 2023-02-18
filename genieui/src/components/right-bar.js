import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const drawerWidth = 300;

export default function ClippedDrawer() {
  const router = useRouter();
  return (
    <Box 
    sx={{ display: "flex" }}
    >
      <CssBaseline />
      <AppBar position="fixed" 
      sx={{ height: "0px", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography 
          variant="h6" 
          noWrap 
          component="div"
          >
            <Tooltip title="Back">
              <Button
                color="primary"
                size="small"
                variant="text"
                onClick={() => router.back()}
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                Back
              </Button>
            </Tooltip>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />

        <Box 
        sx={{ overflow: "auto" }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography gutterBottom 
                variant="h6"
                >
                  Sub Topics suggestions
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
