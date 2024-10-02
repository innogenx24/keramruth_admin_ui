import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Box, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "ID No.", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => (
      <Box display="flex" alignItems="center">
        <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} />
        {params.value}
      </Box>
    ),
  },
  { field: "role", headerName: "Role", width: 200 },
  { field: "club", headerName: "Club", width: 100 },
  { field: "dateOfJoining", headerName: "Date of Joining", width: 150 },
  { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
  { field: "newMobileNumber", headerName: "New Mobile No.", width: 150 },
  { field: "newEmailId", headerName: "New Email Id.", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: () => (
      <>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const rows = [
  {
    id: "S5289",
    name: "Kabir Kumar Singh",
    role: "Super Distributor (SDI)",
    club: "1000L",
    dateOfJoining: "12-08-2020",
    mobileNumber: "9123456789",
    newMobileNumber: "-",
    newEmailId: "-",
  },
  {
    id: "M5957",
    name: "Kabir Kumar Singh",
    role: "Master Distributor (MD)",
    club: "1000L",
    dateOfJoining: "12-08-2020",
    mobileNumber: "9123456789",
    newMobileNumber: "9123456789",
    newEmailId: "-",
  },
  {
    id: "S2800",
    name: "Kabir Kumar Singh",
    role: "Super Distributor (SDI)",
    club: "1000L",
    dateOfJoining: "12-08-2020",
    mobileNumber: "9123456789",
    newMobileNumber: "-",
    newEmailId: "kabirsingh@gmail.com",
  },
];

export default function EditRequestTable() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Edit Request
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}
