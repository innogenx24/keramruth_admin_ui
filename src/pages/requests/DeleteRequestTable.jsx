import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, Avatar } from "@mui/material";

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
  { field: "md", headerName: "MD", width: 100 },
  { field: "sd", headerName: "SD", width: 100 },
  { field: "distributor", headerName: "Distributor", width: 120 },
  { field: "customers", headerName: "Customers", width: 120 },
  { field: "dateOfJoining", headerName: "Date of Joining", width: 150 },
  { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
];

const rows = [
  {
    id: "01",
    name: "Kabir Kumar Singh",
    role: "Super Distributor (SDI)",
    club: "1000L",
    md: "80",
    sd: "125",
    distributor: "150",
    customers: "350",
    dateOfJoining: "12-08-2020",
    mobileNumber: "9123456789",
  },
  {
    id: "02",
    name: "Kabir Kumar Singh",
    role: "Master Distributor (MD)",
    club: "1000L",
    md: "110",
    sd: "102",
    distributor: "130",
    customers: "300",
    dateOfJoining: "12-08-2020",
    mobileNumber: "9123456789",
  },
  {
    id: "03",
    name: "Kabir Kumar Singh",
    role: "Super Distributor (SDI)",
    club: "1000L",
    md: "100",
    sd: "120",
    distributor: "90",
    customers: "200",
    dateOfJoining: "12-08-2020",
    mobileNumber: "9123456789",
  },
];

export default function DeleteRequestTable() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Delete Request
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
