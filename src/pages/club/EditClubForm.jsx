import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const EditClubForm = ({ onCancel }) => {
  const location = useLocation();
  const { club } = location.state || {}; // Destructure club data from state
  const [clubName, setClubName] = useState(club?.name || "");
  const [litreQuantity, setLitreQuantity] = useState(
    club?.litre_quantity || ""
  );
  const [status, setStatus] = useState(club?.status || "");

  // Function to handle form submission (update logic)
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add update logic here
    console.log("Updated Club Data:", { clubName, litreQuantity, status });
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 500 }}>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Edit Club
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Club Name"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Litre Quantity"
          value={litreQuantity}
          onChange={(e) => setLitreQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "100%" }} // Set button width to 100%
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditClubForm;
