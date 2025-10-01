import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import DataContext from "../context/DataContext";


const Header = () => {
  const {logout} = useContext(DataContext)

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          V chat
        </Typography>

        <Button sx={{ color: 'white' }}>
          <Link to="/">Home</Link>
        </Button>
        <Button onClick={logout} sx={{ color: 'white' }}>
        Logout
        </Button>


      </Toolbar>
    </AppBar>
  );
};

export default Header;
