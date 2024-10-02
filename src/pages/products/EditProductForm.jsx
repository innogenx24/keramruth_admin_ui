import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom"; // Import useLocation to get state

const EditProductForm = ({ handleBackToProducts }) => {
  const { state } = useLocation(); // Get the product from the location state
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [stockStatus, setStockStatus] = useState(true);
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    volume: "",
    mrp: "",
    price: "",
    description: "",
  });

  // Populate form with product details if editing
  useEffect(() => {
    if (state?.product) {
      setProductDetails(state.product); // Populate product details if product is passed
      setStockStatus(state.product.stock);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
        {state?.product ? "Edit Product" : "Add Product"}
      </Typography>

      <Grid container spacing={3}>
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
              name="id"
              value={productDetails.id}
              InputProps={{ readOnly: true }} // Product ID is readonly
              sx={{ marginBottom: "16px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Product Name*"
              name="name"
              value={productDetails.name}
              onChange={handleInputChange}
              placeholder="Enter Product Name"
              sx={{ marginBottom: "16px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
              multiline
              rows={3}
              sx={{ marginBottom: "16px", borderRadius: "15px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Product Volume*"
              name="volume"
              value={productDetails.volume}
              onChange={handleInputChange}
              placeholder="Enter Product Volume (200ml, 500ml, 1L)"
              sx={{ marginBottom: "16px" }}
            />
          </Box>
        </Grid>

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
              name="mrp"
              value={productDetails.mrp}
              onChange={handleInputChange}
              placeholder="Enter MRP Price"
              sx={{ marginBottom: "16px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Distributor Price*"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              placeholder="Enter Distributor Price"
              sx={{ marginBottom: "16px" }}
            />

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
          </Box>
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

export default EditProductForm;
