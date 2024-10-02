import React from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";

const salesRoles = [
  "Area Development Officer (ADO)",
  "Master Distributor (MD)",
  "Super Distributor (SD)",
  "Distributor",
];

export default function AddMinimumStockForm() {
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ border: 0 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Minimum Stock for Virgin Coconut Oil:
              </Typography>
              {salesRoles.map((role, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Grid item xs={6}>
                    <Typography>{role}</Typography> {/* Display role name */}
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Enter Target" fullWidth />
                  </Grid>
                  <Grid item xs={3}>
                    <Select fullWidth defaultValue="">
                      <MenuItem value="">Duration</MenuItem>
                      <MenuItem value="1 month">1 month</MenuItem>
                      <MenuItem value="3 months">3 months</MenuItem>
                      <MenuItem value="6 months">6 months</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ mt: 4, border: 0 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Minimum Stock for Virgin Coconut Hair Oil:
              </Typography>
              {salesRoles.map((role, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Grid item xs={6}>
                    <Typography>{role}</Typography> {/* Display role name */}
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Enter Target" fullWidth />
                  </Grid>
                  <Grid item xs={3}>
                    <Select fullWidth defaultValue="">
                      <MenuItem value="">Duration</MenuItem>
                      <MenuItem value="1 month">1 month</MenuItem>
                      <MenuItem value="3 months">3 months</MenuItem>
                      <MenuItem value="6 months">6 months</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right side: Auto Update and Save button */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Auto Update"
              labelPlacement="start"
              sx={{ mb: 4 }}
            />
            <Button variant="contained" color="success" size="large">
              SAVE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
