import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";

const usersData = [
  {
    id: 1,
    adminId: "AD5289",
    username: "Kabir",
    mobile: "+91 9856555874",
    avatar: "https://source.unsplash.com/random?sig=1",
  },
  {
    id: 2,
    adminId: "AD21123",
    username: "Imran",
    mobile: "+91 9856555885",
    avatar: "https://source.unsplash.com/random?sig=2",
  },
  {
    id: 3,
    adminId: "AD4532",
    username: "Aisha",
    mobile: "+91 9856555896",
    avatar: "https://source.unsplash.com/random?sig=3",
  },
  {
    id: 4,
    adminId: "AD8745",
    username: "Rahul",
    mobile: "+91 9856555907",
    avatar: "https://source.unsplash.com/random?sig=4",
  },
  {
    id: 5,
    adminId: "AD6754",
    username: "Sneha",
    mobile: "+91 9856555918",
    avatar: "https://source.unsplash.com/random?sig=5",
  },
];

const AdminList = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);
  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate("add-user");
  };

  const handleEditClick = (user) => {
    navigate("edit-user", { state: { user } }); // Pass the user to the EditUserForm
  };

  const handleDeleteClick = (user) => {
    setDeleteUser(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Implement the logic to delete the user
    console.log("Deleting user:", deleteUser);
    setOpenDeleteModal(false);
    setDeleteUser(null);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setDeleteUser(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Users</Typography>
        <Box>
          <IconButton aria-label="filter">
            <FilterListIcon />
          </IconButton>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleAddUserClick}
            sx={{ minWidth: "150px", borderRadius: "20px", padding: "10px" }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Admin ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Mobile No.</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.adminId}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={user.username}
                      src={user.avatar}
                      sx={{ marginRight: 2 }}
                    />
                    {user.username}
                  </Box>
                </TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDeleteClick(user)}
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
            Are you sure you want to delete the user{" "}
            <strong>{deleteUser?.username}</strong> (Admin ID:{" "}
            <strong>{deleteUser?.adminId}</strong>)?
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
    </Box>
  );
};

export default AdminList;
