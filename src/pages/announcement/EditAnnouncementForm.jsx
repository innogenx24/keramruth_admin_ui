import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
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

const EditAnnouncementForm = ({ onClose }) => {
  const location = useLocation(); // Use useLocation to get the passed state
  const announcement = location.state?.announcement; // Get the announcement from the state
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [activateStatus, setActivateStatus] = useState(true);
  const [documentID, setDocumentID] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [receiver, setReceiver] = useState("");

  // Initialize the form with the selected announcement data
  useEffect(() => {
    if (announcement) {
      setDocumentID(announcement.id);
      setHeading(announcement.heading);
      setDescription(announcement.description);
      setReceiver(announcement.applyingOn);
      setActivateStatus(announcement.status);
    }
  }, [announcement]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form updated with data:", {
      documentID,
      heading,
      description,
      link,
      receiver,
      autoUpdate,
      activateStatus,
    });
    onClose(); // Call onClose to close the form
  };

  return (
    <Box p={3} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ marginBottom: "20px", color: "#989FA9" }}>
        Edit Announcement
      </Typography>
      <Grid container spacing={3}>
        {/* Left Side: Announcement Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <InputLabel>Add Images</InputLabel>
            <IconButton color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>

            <TextField
              fullWidth
              label="Announcement ID*"
              value={documentID}
              readOnly
              margin="normal"
            />

            <TextField
              fullWidth
              label="Announcement Heading*"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
              margin="normal"
            />

            <TextareaAutosize
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", margin: "16px 0" }}
            />

            <TextField
              fullWidth
              label="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
              </Select>
            </FormControl>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Typography>Auto-Update Status</Typography>
              <Switch
                checked={autoUpdate}
                onChange={() => setAutoUpdate(!autoUpdate)}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Typography>Activate Announcement</Typography>
              <Switch
                checked={activateStatus}
                onChange={() => setActivateStatus(!activateStatus)}
              />
            </Box>

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

export default EditAnnouncementForm;
