import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const users = models.userListModel();
    const location = useLocation();
    const isInSidebar = location.pathname !== "/users";

    return (
      <div>
        {!isInSidebar && (
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        )}
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem component={Link} to={`/users/${item._id}`}>
                <ListItemText 
                  primary={`${item.first_name} ${item.last_name}`}
                  secondary={!isInSidebar ? `${item.occupation} - ${item.location}` : null}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;
