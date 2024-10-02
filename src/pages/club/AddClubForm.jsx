import React, { useState } from "react";
import { Button, Typography, Box, TextField, Grid } from "@mui/material";

const AddClubForm = () => {
  const [clubName, setClubName] = useState("");
  const [litreQuantity, setLitreQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Club Name:", clubName);
    console.log("Litre Quantity:", litreQuantity);
  };

  return (
    <Box p={3} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Masters / Club / Add Club
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <h2>Club Details:</h2>

          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <TextField
              fullWidth
              label="Club Name*"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              margin="normal"
              placeholder="Enter Club Name"
              required
            />

            <TextField
              fullWidth
              label="Litre Quantity"
              value={litreQuantity}
              onChange={(e) => setLitreQuantity(e.target.value)}
              placeholder="Enter Litre Quantity"
              required
              margin="normal"
            />

            {/* Save Button */}
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }} // Set the button width to 100%
              >
                SAVE
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddClubForm;
