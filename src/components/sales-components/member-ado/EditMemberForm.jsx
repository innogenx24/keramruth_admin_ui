import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom"; // Import useLocation

const EditMemberForm = () => {
  const location = useLocation(); // Get the current location
  const member = location.state?.member; // Extract the member data from the state

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
    avatar: "",
    pincode: "",
    country: "",
    state: "",
    district: "",
    city: "",
    street: "",
    club: "",
    distributor: "",
    superDistributor: "",
    masterDistributor: "",
    ado: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        mobile: member.mobile,
        email: member.email || "",
        role: "Role1", // Default role or use member's role if available
        avatar: member.avatar || "",
        pincode: "123456", // Dummy data for address
        country: "India",
        state: "Maharashtra",
        district: "Pune",
        city: "Pune",
        street: "MG Road",
        club: "Club1", // Dummy data for club and distributors
        distributor: "Distributor Name",
        superDistributor: "Super Distributor Name",
        masterDistributor: "Master Distributor Name",
        ado: "ADO Name",
      });
    }
  }, [member]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <InputLabel>Member Details</InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel>Member Role*</InputLabel>
                <Select
                  fullWidth
                  value={formData.role}
                  name="role"
                  onChange={handleChange}
                >
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
                <TextField
                  fullWidth
                  label="Full Name*"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile No*"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email ID*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
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
                <TextField
                  fullWidth
                  label="Pincode*"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Country*"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State*"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="District*"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City*"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Street Name"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
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
                <Select
                  fullWidth
                  value={formData.club}
                  name="club"
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Club</MenuItem>
                  <MenuItem value="Club1">Club 1</MenuItem>
                  <MenuItem value="Club2">Club 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Distributor"
                  name="distributor"
                  value={formData.distributor}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Super Distributor (SDI)"
                  name="superDistributor"
                  value={formData.superDistributor}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Master Distributor (MDI)"
                  name="masterDistributor"
                  value={formData.masterDistributor}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Area Development Officer (ADOI)"
                  name="ado"
                  value={formData.ado}
                  onChange={handleChange}
                />
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
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditMemberForm;
