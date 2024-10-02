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
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import EditSalesTargetForm from "./EditSalesTargetForm";

const initialSalesData = [
  {
    id: 1,
    role: "Area Development Officer (ADO)",
    virginCoconutOil: "5000 Liters",
    virginCoconutHairOil: "-",
    duration: "1 month",
  },
  {
    id: 2,
    role: "Master Distributor (MD)",
    virginCoconutOil: "500 Liters",
    virginCoconutHairOil: "-",
    duration: "1 month",
  },
  {
    id: 3,
    role: "Super Distributor (SD)",
    virginCoconutOil: "200 Liters",
    virginCoconutHairOil: "-",
    duration: "1 month",
  },
  {
    id: 4,
    role: "Distributor",
    virginCoconutOil: "50 Liters",
    virginCoconutHairOil: "-",
    duration: "1 month",
  },
];

export default function SalesTargetTable() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [salesData, setSalesData] = useState(initialSalesData);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("add-sales-target");
  };

  const handleEditClick = (row) => {
    navigate("edit-sales-target", { state: { row } }); // Pass selected row data
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedSalesData = salesData.filter((item) => item.id !== deleteId);
    setSalesData(updatedSalesData);
    setOpenDeleteModal(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteId(null);
  };

  const itemToDelete = salesData.find((item) => item.id === deleteId);

  return (
    <div style={{ padding: "20px" }}>
      <div className="header">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#989FA9", marginBottom: "20px" }}
        >
          Document / Add Document
        </Typography>
      </div>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ minWidth: "200px", borderRadius: "20px", padding: "10px" }}
        >
          Add Sales Target
        </Button>
      </Box>
      <h2 style={{ color: "#646464" }}>Target</h2>

      <TableContainer component={Paper}>
        <Table>
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
            {salesData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.virginCoconutOil}</TableCell>
                <TableCell>{row.virginCoconutHairOil}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {itemToDelete && (
              <>
                Are you sure you want to delete the sales target for{" "}
                <strong>{itemToDelete.role}</strong>?
                <br />
                <strong>Details:</strong>
                <ul>
                  <li>Virgin Coconut Oil: {itemToDelete.virginCoconutOil}</li>
                  <li>
                    Virgin Coconut Hair Oil: {itemToDelete.virginCoconutHairOil}
                  </li>
                  <li>Duration: {itemToDelete.duration}</li>
                </ul>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
