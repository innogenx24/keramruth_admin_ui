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
  Switch,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddAnnouncementForm from "./AddAnnouncementForm"; // Import the form for adding announcements
import EditAnnouncementForm from "./EditAnnouncementForm"; // Import the form for editing announcements
import { useLocation, useNavigate } from "react-router-dom";
const AnnouncementTable = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: "A00001",
      heading: "Virgin Coconut Oil",
      description: "Lorem ipsum dolor sit amet...",
      applyingOn: "All Users",
      status: true,
    },
    {
      id: "A00002",
      heading: "Virgin Coconut Oil",
      description: "Lorem ipsum dolor sit amet...",
      applyingOn: "ADO",
      status: true,
    },
    {
      id: "A00003",
      heading: "Virgin Coconut Oil",
      description: "Lorem ipsum dolor sit amet...",
      applyingOn: "ADO, MD, SD & Distributor",
      status: false,
    },
    {
      id: "A00004",
      heading: "Virgin Coconut Oil",
      description: "Lorem ipsum dolor sit amet...",
      applyingOn: "Customers",
      status: true,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const navigate = useNavigate();

  // Open delete confirmation modal
  const handleDeleteOpen = (announcement) => {
    setAnnouncementToDelete(announcement);
    setDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
    setAnnouncementToDelete(null);
  };

  // Confirm deletion of the announcement
  const confirmDelete = () => {
    if (announcementToDelete) {
      setAnnouncements(
        announcements.filter(
          (announcement) => announcement.id !== announcementToDelete.id
        )
      );
      handleDeleteClose();
    }
  };
  const handleEditClick = (announcement) => {
    // Pass the selected announcement as state
    navigate("edit-announcement", { state: { announcement } });
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowEditForm(null);
    navigate("add-announcement");
  };

  return (
    <div>
      {showAddForm ? (
        <AddAnnouncementForm />
      ) : showEditForm ? (
        <EditAnnouncementForm
          announcement={showEditForm}
          onClose={() => setShowEditForm(null)}
        />
      ) : (
        <TableContainer component={Paper}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>Announcements</h2>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Create Announcement
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Announcement ID</TableCell>
                <TableCell>Announcement Heading</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Applying On</TableCell>
                <TableCell>Activate Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcements.map((announcement, index) => (
                <TableRow key={announcement.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{announcement.id}</TableCell>
                  <TableCell>{announcement.heading}</TableCell>
                  <TableCell>{announcement.description}</TableCell>
                  <TableCell>{announcement.applyingOn}</TableCell>
                  <TableCell>
                    <Switch checked={announcement.status} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(announcement)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteOpen(announcement)} // Open delete confirmation modal
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the announcement with ID "
            {announcementToDelete?.id}" and heading "
            {announcementToDelete?.heading}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AnnouncementTable;
