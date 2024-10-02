import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UserProfile() {
  const navigate = useNavigate(); // Initialize navigate

  const handleEditProfile = () => {
    navigate("/dashboard/edit-profile"); // Redirect to EditUserProfile
  };

  const handleLogout = () => {
    navigate("/signin"); // Redirect to SignIn
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {/* Profile Information */}
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center">
              <Avatar
                alt="Ajay Kumar"
                src="path_to_avatar_image.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <Typography align="center" variant="h6">
              Ajay Kumar
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              color="textSecondary"
            >
              AD1426
            </Typography>
            <Typography align="center" variant="subtitle2">
              Admin
            </Typography>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                41, Bannerghatta Rd, Bhavani Nagar, S.G. Palya,
                <br /> Bengaluru, Karnataka 560029
              </Typography>
              <Typography variant="body2" align="center">
                +91 9850855555
              </Typography>
              <Typography variant="body2" align="center">
                ajaykumar@gmail.com
              </Typography>
              <Typography variant="body2" align="center">
                Password12
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleEditProfile}
                sx={{ minWidth: "100px%" }}
              >
                Edit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Access Permissions */}
      <Grid item xs={12} sm={4}>
        <Paper elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Access:
            </Typography>
            <Grid container spacing={1}>
              {[
                "Add & Edit Users",
                "Add & Edit Products",
                "Add & Edit Announcement",
                "Add & Edit Sales Target",
                "Add & Edit Minimum Stock",
                "Add & Edit Roles",
                "Add & Edit Club",
              ].map((access, index) => (
                <Grid item xs={6} key={index}>
                  <FormControlLabel
                    control={<Checkbox checked />}
                    label={access}
                  />
                </Grid>
              ))}
              {[
                "Delete Users",
                "Delete Products",
                "Delete Announcement",
                "Delete Sales Target",
                "Delete Minimum Stock",
                "Delete Roles",
                "Delete Club",
              ].map((access, index) => (
                <Grid item xs={6} key={index}>
                  <FormControlLabel
                    control={<Checkbox checked />}
                    label={access}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Paper>
      </Grid>

      {/* ID Card */}
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar
                alt="Ajay Kumar"
                src="path_to_avatar_image.jpg"
                sx={{ width: 80, height: 80 }}
              />
            </Box>
            <Typography align="center" variant="h6">
              Ajay Kumar
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              color="textSecondary"
            >
              AD1426
            </Typography>
            <Typography align="center" variant="subtitle2">
              Admin
            </Typography>
            <Typography align="center" variant="body2">
              Mobile: +91 9850855555
            </Typography>
            <Typography align="center" variant="body2">
              ajaykumar@gmail.com
            </Typography>
            <Typography align="center" variant="body2">
              41, Bannerghatta Rd, Bhavani Nagar, S.G. Palya,
              <br /> Bengaluru, Karnataka 560029
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
