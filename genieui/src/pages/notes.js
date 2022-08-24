import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import {
  Button,
  Container,
  Grid,
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  TextField,
  CardHeader,
  Tooltip,
  CardActions,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NextLink from "next/link";
import { DashboardNavbar } from "src/components/dashboard-navbar-logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddSection from "../components/editor";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";

export default function PermanentDrawerRight() {
  const router = useRouter();

  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  function getWindowSize() {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    } else {
      console.log("Refresh Error");
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

  // Changing the screen size
  var style =
    typeof window !== "undefined" && windowSize.innerWidth <= 728
      ? { marginRight: "10px", marginLeft: "10px", marginBottom: "30px" }
      : { marginRight: "140px", marginLeft: "140px", marginBottom: "30px" };

  if (typeof window !== "undefined") {
    localStorage.getItem("notesTitle");
  } else {
    console.log("Error in authentication");
  }

  return (
    <Box>
      <CssBaseline />
      <DashboardNavbar />
      <div style={style}>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />

          <Typography color="textPrimary" variant="h4">
            {typeof window !== "undefined"
              ? localStorage.getItem("notesTitle")
              : console.log("Authentication error")}
          </Typography>

          <br />

          <Typography color="textSecondary" gutterBottom variant="body2">
            {typeof window !== "undefined"
              ? localStorage.getItem("notesDesc")
              : console.log("Authentication error")}
          </Typography>

          <Button
            size="small"
            color="secondary"
            onClick={() => router.push("/edit-notes")}
            startIcon={<EditIcon fontSize="small" />}
            sx={{ mr: 1 }}
          >
            Edit title and description
          </Button>
        </Box>
        {/* SECTION NOTES ! IMPORTANT */}
        <AddSection />
      </div>
    </Box>
  );
}
