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
  Button,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import EditDocumentForm from "./EditDocumentForm"; // Import the Edit form component
import DocumentForm from "./DocumentForm "; // Ensure this import is correct
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Make sure to import useLocation

const documentsData = [
  {
    id: 1,
    docId: "D00001",
    heading: "New T&C.pdf",
    size: "300KB",
    description: "Lorem ipsum...",
    applyingOn: "All Users",
    isActive: true,
  },
  {
    id: 2,
    docId: "D00002",
    heading: "Meeting Document",
    size: "220KB",
    description: "Lorem ipsum...",
    applyingOn: "ADO",
    isActive: true,
  },
  // Add more document data here
];

const DocumentsTable = () => {
  const [editDocument, setEditDocument] = useState(null); // State for editing document
  const [showCreateForm, setShowCreateForm] = useState(false); // State to show create form
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog
  const [documentToDelete, setDocumentToDelete] = useState(null); // State to store document details to delete
  const navigate = useNavigate();
  const handleEdit = (document) => {
    navigate("edit-document", { state: { document } }); // Pass document as state
  };

  const handleDeleteClick = (document) => {
    setDocumentToDelete(document); // Set the document to delete
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const handleDeleteConfirm = () => {
    console.log(`Document with ID ${documentToDelete.docId} deleted`);
    // Implement delete logic here
    setDeleteDialogOpen(false); // Close the dialog
    setDocumentToDelete(null); // Clear the document to delete
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false); // Close the dialog without deleting
    setDocumentToDelete(null); // Clear the document to delete
  };

  // Conditionally render the table, create form, or edit form based on state
  if (showCreateForm) {
    return <DocumentForm onClose={() => setShowCreateForm(false)} />;
  }

  if (editDocument) {
    return (
      <EditDocumentForm
        document={editDocument}
        onClose={() => setEditDocument(null)} // Reset the form on close
      />
    );
  }

  // Default view: Show documents table
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Documents</h2>
        <Button
          variant="contained"
          color="success"
          sx={{ minWidth: "186px", borderRadius: "20px", padding: "10px" }} // Set the minimum width to 186px
          onClick={() => navigate("add-documents")} // Navigate to add document page
        >
          + Create Document
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Document ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>File Size</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Applying On</TableCell>
              <TableCell>Activate Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentsData.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.docId}</TableCell>
                <TableCell>{doc.heading}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.description}</TableCell>
                <TableCell>{doc.applyingOn}</TableCell>
                <TableCell>
                  <Switch checked={doc.isActive} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(doc)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteClick(doc)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete the document:</p>
          <strong>{documentToDelete?.heading}</strong>
          <p>(ID: {documentToDelete?.docId})</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentsTable;
