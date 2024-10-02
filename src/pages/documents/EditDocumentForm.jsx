import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  Box,
  TextField,
  TextareaAutosize,
  Grid,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useLocation } from "react-router-dom";

const EditDocumentForm = ({ onClose }) => {
  const location = useLocation();
  const document = location.state?.document || {}; // Get document from location state or use an empty object

  const [autoUpdate, setAutoUpdate] = useState(document.autoUpdate || false);
  const [activateStatus, setActivateStatus] = useState(
    document.isActive || false
  );
  const [documentID, setDocumentID] = useState(document.docId || "");
  const [heading, setHeading] = useState(document.heading || "");
  const [description, setDescription] = useState(document.description || "");
  const [link, setLink] = useState(document.link || "");
  const [receiver, setReceiver] = useState(document.applyingOn || "");

  useEffect(() => {
    // Set initial state based on document details from location
    if (document) {
      setAutoUpdate(document.autoUpdate || false);
      setActivateStatus(document.isActive || false);
      setDocumentID(document.docId || "");
      setHeading(document.heading || "");
      setDescription(document.description || "");
      setLink(document.link || "");
      setReceiver(document.applyingOn || "");
    }
  }, [document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with updated data:", {
      documentID,
      heading,
      description,
      link,
      receiver,
      autoUpdate,
      activateStatus,
    });
    onClose(); // Close the form after submission
  };

  return (
    <Box p={3} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Document / Edit Document
      </Typography>
      <Grid container spacing={3}>
        {/* Left Side: Document Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <InputLabel>Edit Images</InputLabel>
            <IconButton color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>

            <TextField
              fullWidth
              label="Document ID*"
              value={documentID}
              readOnly
              margin="normal"
            />

            <TextField
              fullWidth
              label="Document Heading*"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter Document Heading"
              required
              margin="normal"
            />

            <TextareaAutosize
              minRows={3}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", margin: "16px 0" }}
            />

            <TextField
              fullWidth
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter Link"
              margin="normal"
            />
          </Box>
        </Grid>

        {/* Right Side: Receiver and Actions */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <InputLabel>Receiver</InputLabel>
            <FormControl fullWidth margin="normal">
              <InputLabel>Applying on</InputLabel>
              <Select
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                required
              >
                <MenuItem value="All Users">All Users</MenuItem>
                <MenuItem value="ADO">Area Development Officer (ADO)</MenuItem>
                <MenuItem value="MD">Master Distributor (MD)</MenuItem>
                <MenuItem value="SD">Super Distributor (SD)</MenuItem>
                <MenuItem value="Distributor">Distributor</MenuItem>
                <MenuItem value="Customers">Customers</MenuItem>
              </Select>
            </FormControl>

            {/* Auto Update */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <label style={{ marginRight: "8px" }}>Auto Update</label>
              <Switch
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                color="primary"
              />
            </Box>

            {/* Activate Status */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <label style={{ marginRight: "8px" }}>Activate Status</label>
              <Switch
                checked={activateStatus}
                onChange={(e) => setActivateStatus(e.target.checked)}
                color="primary"
              />
            </Box>

            {/* Save Button */}
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditDocumentForm;
