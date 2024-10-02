import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Icon for dropdown

const roles = [
  "All",
  "Area Development Officer (ADO)",
  "Master Distributors (MD)",
  "Super Distributors",
  "Distributors",
  "Customers",
];
const clubs = ["1000L", "2000L", "3000L"];
const areas = ["Bannerghatta", "Koramangala", "Indiranagar"];

const initialRows = Array.from({ length: 10 }).map((_, index) => ({
  id: `AD528${index + 1}`,
  name: "Kabir",
  role: "Area Development Officer (ADO)",
  club: "1000L",
  area: "Bannerghatta",
  target: "2500/5000",
  stock: "2500/5000",
}));

export default function ReportTable() {
  const [rows, setRows] = useState(initialRows);
  const [roleFilter, setRoleFilter] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle date picker visibility

  const handleFilterChange = () => {
    console.log(
      "Filter applied with:",
      roleFilter,
      clubFilter,
      areaFilter,
      dateRange
    );
  };

  return (
    <Box p={3}>
      <Box display="flex" gap="20px" mb={3}>
        {/* Role Filter */}
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          displayEmpty
          sx={{ borderColor: "white" }} // Set border color to white
        >
          <MenuItem value="">Role</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>

        {/* Club Filter */}
        <Select
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
          displayEmpty
          sx={{ borderColor: "white" }} // Set border color to white
        >
          <MenuItem value="">Club</MenuItem>
          {clubs.map((club) => (
            <MenuItem key={club} value={club}>
              {club}
            </MenuItem>
          ))}
        </Select>

        {/* Area Filter */}
        <Select
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
          displayEmpty
          sx={{ borderColor: "white" }} // Set border color to white
        >
          <MenuItem value="">Area</MenuItem>
          {areas.map((area) => (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>

        {/* Sort by Date with Expand Arrow */}
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <span>Sort by Date</span>
            <IconButton size="small">
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Show Date Range Picker based on arrow click */}
      {showDatePicker && (
        <Box mb={3} display="flex" justifyContent="flex-start">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              startText="From"
              endText="To"
              value={dateRange}
              onChange={(newValue) => {
                setDateRange(newValue);
                handleFilterChange(); // Apply filter when date range changes
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} label="From" />
                  <Box sx={{ mx: 2 }}>to</Box>
                  <TextField {...endProps} label="To" />
                </>
              )}
            />
          </LocalizationProvider>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Club</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.club}</TableCell>
                <TableCell>{row.area}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
