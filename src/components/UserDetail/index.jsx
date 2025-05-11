import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] =useState();

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetchModel("/api/user/" + userId);
          setUser(res);
        } catch(e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, [userId])

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error}</Typography>;
    if (!user) {
      return <Typography variant="body1">User not found</Typography>;
    }

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Occupation:</strong> {user.occupation}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {user.location}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {user.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={Link}
              to={`/photos/${userId}`}
              variant="contained"
              color="primary"
            >
              View Photos
            </Button>
          </Grid>
        </Grid>
      </div>
    );
}

export default UserDetail;
