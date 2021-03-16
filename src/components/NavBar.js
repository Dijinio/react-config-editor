import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography component={Link} to="/" variant="h4" className="nav-logo">
          Config List
        </Typography>
        <Typography
          component={Link}
          to="/newConfig"
          variant="h6"
          className="nav-link"
        >
          Create new config
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
