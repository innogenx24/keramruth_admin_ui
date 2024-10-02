import React from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./addmember.css";

const AddMemberForm = () => {
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Left Side: Member Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <InputLabel>Member Details</InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Member Role*</InputLabel>
                <Select fullWidth defaultValue="">
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Role1">Role 1</MenuItem>
                  <MenuItem value="Role2">Role 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Add Images</InputLabel>
                <IconButton color="primary">
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name*" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Mobile No*" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email ID*" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password*" type="password" />
              </Grid>
            </Grid>
          </Box>

          {/* Address Section */}
          <Box
            mt={3}
            sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}
          >
            <InputLabel>Address</InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Pincode*" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Country*" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="State*" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="District*" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="City*" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Street Name" />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right Side: Club & Superior Distributors */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <InputLabel>Club & Superior Distributors</InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Club*</InputLabel>
                <Select fullWidth defaultValue="">
                  <MenuItem value="">Select Club</MenuItem>
                  <MenuItem value="Club1">Club 1</MenuItem>
                  <MenuItem value="Club2">Club 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Distributor" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Super Distributor (SDI)" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Master Distributor (MDI)" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Area Development Officer (ADOI)" />
              </Grid>
            </Grid>
          </Box>

          {/* Save Button */}
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddMemberForm;
