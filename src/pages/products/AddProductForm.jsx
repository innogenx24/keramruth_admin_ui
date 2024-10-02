import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Switch,
  IconButton,
  InputLabel,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const AddProductForm = () => {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [stockStatus, setStockStatus] = useState(true);

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Product / Add Product
      </Typography>

      <Grid container spacing={3}>
        {/* Product Details Section (Left Side) */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Products Details
            </Typography>

            <Grid container alignItems="center" sx={{ marginBottom: "16px" }}>
              <Grid item xs={12}>
                <InputLabel>Add Images</InputLabel>
                <IconButton color="primary">
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              variant="outlined"
              label="Product ID*"
              value=""
              InputProps={{ readOnly: true }}
              sx={{ marginBottom: "16px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Product Name*"
              placeholder="Enter Product Name"
              sx={{ marginBottom: "16px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              placeholder="Enter Description"
              multiline
              rows={3}
              sx={{ marginBottom: "16px", borderRadius: "15px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Product Volume*"
              placeholder="Enter Product Volume (200ml, 500ml, 1L)"
              sx={{ marginBottom: "16px" }}
            />
          </Box>
        </Grid>

        {/* Price Details Section (Right Side) */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Price Details
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="MRP Price (Customer)*"
              placeholder="Enter MRP Price"
              sx={{ marginBottom: "16px" }}
            />
            <Typography variant="subtitle1" gutterBottom>
              For Distributors Price:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Area Development Officer (ADO) Price*"
              placeholder="Enter ADO Price"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Master Distributor (MD) Price*"
              placeholder="Enter MD Price"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Super Distributor (SD) Price*"
              placeholder="Enter SD Price"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Distributor Price*"
              placeholder="Enter Distributor Price"
              sx={{ marginBottom: "16px" }}
            />

            {/* Switches: Auto Update and Stock Status, each under the other */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography sx={{ marginRight: "8px" }}>Auto Update</Typography>
              <Switch
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                color="primary"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography sx={{ marginRight: "8px" }}>Stock Status</Typography>
              <Switch
                checked={stockStatus}
                onChange={(e) => setStockStatus(e.target.checked)}
                color="primary"
              />
            </Box>

            {/* Save Button Positioned Below Price Details */}
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProductForm;
