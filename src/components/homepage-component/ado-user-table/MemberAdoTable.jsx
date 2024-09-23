import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: 'id', headerName: 'No.', width: 80, flex: 0.1 },
  { field: 'idUser', headerName: 'ID User', width: 120, flex: 0.2 },
  {
    field: 'username',
    headerName: 'Username',
    width: 200,
    flex: 0.3,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={params.value} src={params.row.avatarUrl} />
        {params.value}
      </div>
    ),
  },
  {
    field: 'status',
    headerName: 'Status/Month',
    width: 150,
    flex: 0.3,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {params.value}%
        <CircularProgress variant="determinate" value={params.value} style={{ marginLeft: 8 }} />
      </div>
    ),
  },
  { field: 'mobileNo', headerName: 'Mobile No', width: 180, flex: 0.2 },
  {
    field: 'actions',
    headerName: 'Action',
    width: 150,
    flex: 0.2,
    renderCell: () => (
      <div style={{ display: 'flex', gap: 8 }}>
        <EditIcon style={{ color: 'blue' }} />
        <DeleteIcon style={{ color: 'red' }} />
        <DeleteIcon style={{ color: 'yellow' }} />
        {/* Other action icons */}
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    idUser: 'A123',
    username: 'john_doe',
    status: 85,
    mobileNo: '+1 123-456-7890',
    avatarUrl: 'https://example.com/john_avatar.jpg', // Replace with actual avatar URL
  },
  {
    id: 2,
    idUser: 'B456',
    username: 'jane_smith',
    status: 55,
    mobileNo: '+1 987-654-3210',
    avatarUrl: 'https://example.com/jane_avatar.jpg', // Replace with actual avatar URL
  },
  // Add more rows as needed
];

const MemberAdoTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default MemberAdoTable;
