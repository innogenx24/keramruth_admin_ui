import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const MinimumStockTable = () => {
  const [showTable, setShowTable] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);
  const navigate = useNavigate();

  // Sample Data
  const rows = [
    {
      id: "01",
      name: "Area Development officer (ADO)",
      vargin_coconut_oil: "2500L",
      vargin_coconut_hair_oil: "-",
      duration: "-",
    },
    {
      id: "02",
      name: "Master Distributor (MD)",
      vargin_coconut_oil: "2500L",
      vargin_coconut_hair_oil: "-",
      duration: "-",
    },
    {
      id: "03",
      name: "Super Distributor (SD)",
      vargin_coconut_oil: "2500L",
      vargin_coconut_hair_oil: "-",
      duration: "-",
    },
    {
      id: "04",
      name: "Distributor",
      vargin_coconut_oil: "2500L",
      vargin_coconut_hair_oil: "-",
      duration: "-",
    },
  ];

  // Handle Add Minimum Stock button click
  const handleAddMinimumStockClick = () => {
    navigate("add-minimum-stock");
  };

  const handleEditClick = (row) => {
    navigate("edit-minimum-stock", { state: { row } });
  };

  // Handle delete button click
  const handleDeleteClick = (row) => {
    setStockToDelete(row);
    setOpenDeleteDialog(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    console.log("Deleting stock:", stockToDelete);
    setOpenDeleteDialog(false);
    setStockToDelete(null);
  };

  // Close dialog
  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
    setStockToDelete(null);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Masters / Minimum Stock
      </Typography>

      {showTable ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMinimumStockClick}
            >
              + Add Minimum Stock
            </Button>
          </Box>
          <h2>Stock</h2>
          <TableContainer component={Paper}>
            <Table aria-label="Minimum Stock Table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Virgin Coconut Oil</TableCell>
                  <TableCell>Virgin Coconut Hair Oil</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ color: "#00c1bf" }}>{row.name}</TableCell>
                    <TableCell>{row.vargin_coconut_oil}</TableCell>
                    <TableCell>{row.vargin_coconut_hair_oil}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Confirmation Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleDialogClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the following stock?
              </DialogContentText>
              <Typography>
                Role: {stockToDelete?.name} <br />
                Virgin Coconut Oil: {stockToDelete?.vargin_coconut_oil} <br />
                Virgin Coconut Hair Oil:{" "}
                {stockToDelete?.vargin_coconut_hair_oil} <br />
                Duration: {stockToDelete?.duration} <br />
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <EditMinimumStockForm
          stock={selectedStock}
          onCancel={handleCancelClick}
        />
      )}
    </Box>
  );
};

export default MinimumStockTable;
