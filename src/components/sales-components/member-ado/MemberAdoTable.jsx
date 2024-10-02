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
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddMemberForm from "./AddMemberForm"; // Import AddMemberForm component
import EditMemberForm from "./EditMemberForm"; // Import EditMemberForm component
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MemberAdoTable = () => {
  const [showTable, setShowTable] = useState(true); // State to toggle table visibility
  const [editMember, setEditMember] = useState(null); // State to store the selected member for editing
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State to manage delete modal visibility
  const [memberToDelete, setMemberToDelete] = useState(null); // State to store the member to be deleted
  const navigate = useNavigate();

  // Sample Data
  const rows = [
    {
      id: "A01426",
      name: "Ethan",
      status: 87,
      target: "5000 Litres",
      mobile: "+91 9858565889",
      avatar: "path-to-avatar",
    },
    {
      id: "A321123",
      name: "Imran",
      status: 88,
      target: "5000 Litres",
      mobile: "+91 9858565887",
      avatar: "path-to-avatar",
    },
    // Add more rows as needed
  ];

  // Function to handle the click of "Add Member" button
  const handleAddMemberClick = () => {
    setEditMember(null); // Clear any selected member for editing
    setShowTable(false); // Hide the table and show the Add Member form
    navigate("add-members");
  };

  // Function to handle the click of "Edit" button
  const handleEditMemberClick = (member) => {
    setEditMember(member); // Set the selected member for editing
    setShowTable(false); // Hide the table and show the Edit Member form
    navigate("edit-members", { state: { member } }); // Pass member data in state
  };
  // Function to open delete confirmation modal
  const handleDeleteOpen = (member) => {
    setMemberToDelete(member); // Set the member to be deleted
    setDeleteModalOpen(true); // Open the delete modal
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    // Here, you would handle the actual deletion logic (e.g., updating state)
    setDeleteModalOpen(false);
    console.log(`Deleted member: ${memberToDelete.name}`);
    // Optionally, you can remove the member from the state or database.
  };

  return (
    <Box sx={{ width: "100%" }}>
      {showTable ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMemberClick}
            >
              + Add Member
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="Member ADO Table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Id User</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Status/Month</TableCell>
                  <TableCell>Mobile No.</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar alt={row.name} src={row.avatar} />
                        <Typography style={{ marginLeft: "10px" }}>
                          {row.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography style={{ marginRight: "10px" }}>
                          {row.status}%
                        </Typography>
                        <CircularProgress
                          variant="determinate"
                          value={row.status}
                          size={30}
                          thickness={5}
                          style={{ marginLeft: "10px" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditMemberClick(row)} // Pass the member data
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteOpen(row)} // Open delete confirmation modal
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Delete Confirmation Modal */}
          <Dialog
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the member "
                {memberToDelete?.name}" with ID "{memberToDelete?.id}"?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteModalOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : editMember ? (
        <EditMemberForm member={editMember} /> // Pass selected member to the EditMemberForm
      ) : (
        <AddMemberForm /> // Show AddMemberForm if no member is being edited
      )}
    </Box>
  );
};

export default MemberAdoTable;
