import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import './TrendLineGraph.scss'
import { Box, MenuItem, Select, Typography } from "@mui/material";

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Added for responsiveness
  plugins: {
    legend: {
      position: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function TrendLineGraph() {
  return (
    <div className="lineg">
  <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography variant="h6">Sales Trend Over Time</Typography>
                <Typography variant="body1">100000 L</Typography>
            </Box>
            <Box>
                <Select defaultValue="" variant="outlined" size="small" sx={{ minWidth: 10 }}>
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <MenuItem value={3}>Option 3</MenuItem>
                </Select>
                <Typography mt={1} variant="body1">Date Dropdown</Typography>
            </Box>
        </Box>
    <div className="lining_graph">
           <Line data={data} options={options} />       
    </div>
 </div>
  );
}
