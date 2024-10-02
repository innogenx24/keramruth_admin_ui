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
  Avatar,
  Typography,
  CircularProgress,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddClubForm from "./AddClubForm"; // Import your AddClubForm component
import EditClubForm from "./EditClubForm"; // Import your EditClubForm component
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Make sure to import useLocation
const ClubTable = () => {
  const [showTable, setShowTable] = useState(true); // State to toggle table and form visibility
  const [selectedClub, setSelectedClub] = useState(null); // State to hold selected club for editing
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State to control delete modal
  const navigate = useNavigate();

  // Sample Data
  const rows = [
    {
      id: "C001",
      name: "Book Club",
      avatar: "https://via.placeholder.com/50",
      litre_quantity: "500L",
      status: 70,
    },
    {
      id: "C002",
      name: "Cooking Club",
      avatar: "https://via.placeholder.com/50",
      litre_quantity: "1000L",
      status: 85,
    },
    {
      id: "C003",
      name: "Gardening Club",
      avatar: "https://via.placeholder.com/50",
      litre_quantity: "250L",
      status: 60,
    },
    {
      id: "C004",
      name: "Photography Club",
      avatar: "https://via.placeholder.com/50",
      litre_quantity: "750L",
      status: 90,
    },
    {
      id: "C005",
      name: "Travel Club",
      avatar: "https://via.placeholder.com/50",
      litre_quantity: "300L",
      status: 50,
    },
  ];

  // Function to handle the click of "Add Club" button
  const handleAddClubClick = () => {
    navigate("add-club");
  };

  // Function to handle editing a club
  const handleEditClick = (club) => {
    navigate("edit-club", { state: { club } });
  };

  // Function to handle deleting a club
  const handleDeleteClick = (club) => {
    setSelectedClub(club); // Set the selected club for deletion
    setOpenDeleteModal(true); // Open the delete confirmation modal
  };

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    // Add your deletion logic here
    console.log("Deleted Club:", selectedClub);
    setOpenDeleteModal(false); // Close the modal after deletion
    setSelectedClub(null); // Reset selected club
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setOpenDeleteModal(false); // Close the modal
    setSelectedClub(null); // Reset selected club
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Masters / Club
      </Typography>

      {showTable ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddClubClick}
            >
              + Add Club
            </Button>
          </Box>
          <h2>Club</h2>
          <TableContainer component={Paper}>
            <Table aria-label="Club Table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Club Name</TableCell>
                  <TableCell>Litre Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar alt={row.name} src={row.avatar} />
                        <Typography sx={{ marginLeft: "10px" }}>
                          {row.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.litre_quantity}</Typography>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ marginRight: "10px" }}>
                          {row.status}%
                        </Typography>
                        <CircularProgress
                          variant="determinate"
                          value={row.status}
                          size={30}
                          thickness={5}
                          sx={{ marginLeft: "10px" }}
                        />
                      </div>
                    </TableCell>
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
        </>
      ) : selectedClub ? (
        <EditClubForm club={selectedClub} onCancel={() => setShowTable(true)} />
      ) : (
        <AddClubForm onCancel={() => setShowTable(true)} />
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the club "{selectedClub?.name}"?
          </Typography>
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
    </Box>
  );
};

export default ClubTable;
