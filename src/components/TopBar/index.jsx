import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
    const location = useLocation();
    const { userId } = useParams();
    const user = userId ? models.userModel(userId) : null;
    console.log(user);

    const getContextText = () => {
        if (location.pathname === "/users") {
            return "Users";
        }
        if (location.pathname.startsWith("/users/") && user) {
            return `${user.first_name} ${user.last_name}`;
        }
        if (location.pathname.startsWith("/photos/") && user) {
            return `Photos of ${user.first_name} ${user.last_name}`;
        }
        return "Photo Sharing App";
    };

    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
            Your Name
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="h6" color="inherit">
              {getContextText()}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
