import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Grid item xs={2} sx={{ borderRight: "1px solid #ccc", padding: 2 }}>
      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/Signin">
            <ListItemText primary="Sign In" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/Home">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/file-viewer">
            <ListItemText primary="Conversation" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="#">
            <ListItemText primary="My Conversations" />
          </ListItemButton>
        </ListItem>
      </List>
    </Grid>
  );
};

export default Navbar;
