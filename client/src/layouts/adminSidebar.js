import * as React from "react";
import {useState} from "react"
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import UsersIcon from "@material-ui/icons/People";
import VendorsIcon from "@material-ui/icons/Store";
import ServicesIcon from "@material-ui/icons/Build";
import logoimg from "../public/images/parlourlogo.jpg";
import UsersTable from "../Components/AdminComponents/UsersTable"
import VendorsTable from "../Components/AdminComponents/VendorsTable";
const drawerWidth = 240;

function AdminSidebar() {

const[selectedItem, setSelectedItem] = useState("Dashboard");

const handleItemClick = (text) =>{
  setSelectedItem(text);
}

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#312E2E",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logoimg}
              alt="logo"
              style={{ width: 90, height: 80, marginRight: 5 }}
            />
            <Typography variant="h5" noWrap component="div">
              Radiance
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", marginTop: "15px" }}>
          <List>
            {[
              { text: "Dashboard", icon: <DashboardIcon /> },
              { text: "Users", icon: <UsersIcon /> },
              { text: "Vendors", icon: <VendorsIcon /> },
              { text: "Services", icon: <ServicesIcon /> },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "#312E2E",
                      transition: "background-color 0.3s ease",
                    },
                  }} 
                  selected = {selectedItem === item.text}
                  onClick = {() => handleItemClick(item.text)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "10px" }}>
        <Toolbar />
        {selectedItem === "Dashboard" ? (   <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </Typography>): selectedItem === "Users" ? (<UsersTable/>):selectedItem === "Vendors" ? (<VendorsTable/>):selectedItem === "Services" ? (   <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </Typography>): null}
      
      </Box>
    </Box>
  );
}

export default AdminSidebar;
