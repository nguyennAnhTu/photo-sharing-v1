import React, { useEffect, useState } from "react";
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
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isInSidebar = location.pathname !== "/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchModel("/api/user/list");
        console.log("start fetch data");
        console.log(res);
        setUsers(Array.isArray(res) ? res : []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!users.length) return <Typography>No users found</Typography>;

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
                secondary={
                  !isInSidebar ? `${item.occupation} - ${item.location}` : null
                }
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
