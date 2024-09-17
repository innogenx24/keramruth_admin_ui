import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../../redux/slices/product-slice/ProductGetSlice';
import { deleteProductRequest } from '../../redux/slices/product-slice/ProductDeleteSlice';
import LazyLoader from '../../common/LazyLoader';
import CustomizedSnackbars from '../../common/CustomizedSnackbars';

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openValue, setOpenValue] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  //
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  

  const { products, loading: productsLoading, error: productsError } = useSelector(state => state.products);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector(state => state.productDelete);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      setSnackbarMessage('Product deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      dispatch(fetchProductsRequest());
    }
    if (deleteError) {
      setSnackbarMessage('Error deleting product.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      dispatch(fetchProductsRequest());
    }
  }, [deleteSuccess, deleteError]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpen = useCallback((product) => {
    setSelectedProduct(product);
    setOpenValue(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenValue(false);
    setSelectedProduct(null);
  }, []);

  const handleAddProducts = useCallback(() => {
    navigate('/dashboard/add-products');
  }, [navigate]);

  const handleDelete = useCallback((productId) => {
    dispatch(deleteProductRequest(productId));
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const rows = useMemo(() => 
    products.map((product, index) => ({
      id: product.id,
      productImage: product.image,
      sno: index + 1,
      name: product.name,
      productVolume: product.productVolume,
      mrpPriceCustomer: product.mrpPriceCustomer,
      mdPrice: product.mdPrice,
      distributorPrice: product.distributorPrice,
      sdPrice: product.sdPrice,
      activateStatus: product.activateStatus ? 'Active' : 'Inactive',
    }))
  , [products]);

  const columns = useMemo(() => [
    { field: 'sno', headerName: 'S.No', width: 120, flex: 0.2 },
    { 
      field: 'id', 
      headerName: 'Product ID', 
      width: 120, 
      flex: 0.2,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: 1, width: 50, height: 50 }}>
            <img
              src={params.row.productImage}
              alt="Product"
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </Box>
          <span>{params.row.id}</span>
        </Box>
      ),
    },
    { field: 'name', headerName: 'Product Name', width: 200, flex: 0.3 },
    { field: 'productVolume', headerName: 'Product Volume', width: 150, flex: 0.3 },
    { field: 'mrpPriceCustomer', headerName: 'MRP', width: 180, flex: 0.2 },
    { 
      field: 'distributorPrice', 
      headerName: 'Distributor Price', 
      width: 180, 
      flex: 0.2,
      renderCell: (params) => (
        <Box
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'green',
            cursor: 'pointer'
          }}
          onClick={() => handleOpen(params.row)}
        >
          View
        </Box>
      ),
    },
    { field: 'activateStatus', headerName: 'Activate Status', width: 180, flex: 0.2 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      flex: 0.2,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <EditIcon
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate(`/dashboard/edit-product/${params.row.id}`)}
          />
          <DeleteIcon
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => handleDelete(params.row.id)}
          />
        </Box>
      ),
    },
  ], [handleOpen, handleDelete, navigate]);

  if (productsLoading || deleteLoading) return <div><LazyLoader/></div>;
  if (productsError) return <div>Error fetching products: {productsError}</div>;
  if (deleteError) return <div>Error deleting product: {deleteError}</div>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          sx={{
            background: 'linear-gradient(90deg, #01C572 100%, #187E53 100%)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(90deg, #187E53 100%, #01C572 100%)',
            },
          }}
          onClick={handleAddProducts}
        >
          + Add Products
        </Button>
      </Grid>

      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Grid>

      <Modal
        open={openValue}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedProduct && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Price Details for Product ID: {selectedProduct.id}
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Price Type</strong></TableCell>
                      <TableCell><strong>Amount</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>MRP Price</TableCell>
                      <TableCell>{selectedProduct.mrpPriceCustomer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MD Price</TableCell>
                      <TableCell>{selectedProduct.mdPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Distributor Price</TableCell>
                      <TableCell>{selectedProduct.distributorPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SD Price</TableCell>
                      <TableCell>{selectedProduct.sdPrice}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Modal>
      <CustomizedSnackbars
      open={snackbarOpen}
      message={snackbarMessage}
      severity={snackbarSeverity}
      onClose={handleSnackbarClose}
    />

    </Grid>
  );
};

export default ProductPage;
////