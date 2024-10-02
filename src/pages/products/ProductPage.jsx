import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Switch,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import EditProductForm from "./EditProductForm";
import "./product.css";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // State for the product being edited
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for the delete modal
  const [productToDelete, setProductToDelete] = useState(null); // State for the product to be deleted
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    setEditProduct(null); // Reset editProduct when adding a new product
    setShowAddProduct(true);
    navigate("add-product");
  };

  const handleEditProductClick = (product) => {
    setEditProduct(product);
    navigate("edit-product", { state: { product } });
  };

  const handleBackToProducts = () => {
    setShowAddProduct(false);
  };

  const handleDeleteProductClick = (product) => {
    setProductToDelete(product); // Set the product to delete
    setOpenDeleteModal(true); // Open the delete confirmation modal
  };

  const handleConfirmDelete = () => {
    // Logic to delete the product from the products array (you may need to implement state management)
    console.log("Deleted product:", productToDelete);
    setOpenDeleteModal(false); // Close the delete modal
    setProductToDelete(null); // Reset product to delete
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false); // Close the delete modal
    setProductToDelete(null); // Reset product to delete
  };

  const products = [
    {
      id: "P00001",
      name: "Virgin Coconut Oil",
      volume: "200 ml",
      mrp: "₹189/-",
      price: "₹-",
      stock: true,
    },
    {
      id: "P00002",
      name: "Virgin Coconut Oil",
      volume: "500 ml",
      mrp: "₹395/-",
      price: "₹-",
      stock: true,
    },
    {
      id: "P00003",
      name: "Virgin Coconut Hair Oil",
      volume: "100 ml",
      mrp: "₹305/-",
      price: "₹-",
      stock: true,
    },
    {
      id: "P00004",
      name: "Virgin Coconut Oil",
      volume: "500 ml",
      mrp: "₹395/-",
      price: "₹-",
      stock: true,
    },
    // Add other products here
  ];

  if (showAddProduct) {
    return (
      <EditProductForm
        handleBackToProducts={handleBackToProducts}
        editProduct={editProduct} // Pass the product to be edited
      />
    );
  }

  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Products
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProductClick}
          startIcon={<Add />}
        >
          Add Product
        </Button>
      </div>
      <h2>All Products</h2>
      <TableContainer component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Volume</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Distributor's Price</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.volume}</TableCell>
                <TableCell>{product.mrp}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Switch checked={product.stock} />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProductClick(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteProductClick(product)} // Pass the product to delete
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the product with ID "
            <strong>{productToDelete?.id}</strong>" and name "
            <strong>{productToDelete?.name}</strong>"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductPage;
