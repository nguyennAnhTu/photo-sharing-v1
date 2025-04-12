import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const { userId } = useParams();
    const photos = models.photoOfUserModel(userId);
    const user = models.userModel(userId);

    if (!user) {
      return <Typography variant="body1">User not found</Typography>;
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Photos of {user.first_name} {user.last_name}
        </Typography>
        <Grid container spacing={3}>
          {photos.map((photo) => (
            <Grid item xs={12} key={photo._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={`/images/${photo.file_name}`}
                  alt={`Photo by ${user.first_name}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Taken on: {formatDate(photo.date_time)}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  {photo.comments && photo.comments.length > 0 ? (
                    photo.comments.map((comment) => (
                      <Paper key={comment._id} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(comment.date_time)}
                        </Typography>
                        <Typography variant="body1" component="div">
                          <Link to={`/users/${comment.user._id}`}>
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>
                          : {comment.comment}
                        </Typography>
                      </Paper>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No comments yet
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
}

export default UserPhotos;
