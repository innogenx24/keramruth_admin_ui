'use client';
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import './StockSaleBarGraph.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function StockSaleBarGraph() {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Bottom 80%",
        data: [70000, 40000, 65000, 55000, 88000, 52000],
        backgroundColor: [
          "#FFC600", // 1st bar
          "rgba(1, 197, 114, 1)", // 2nd bar - solid color for linear gradient
          "#FF3535", // 3rd bar
          "rgba(1, 197, 114, 1)", // 4th bar - solid color for linear gradient
          "#FFC600", // 5th bar
          "#FFC600", // 6th bar
        ],
        stack: 'combined',
        barThickness: 25,
      },
      {
        label: "Top 20%",
        data: [10000, 30000, 20000, 15000, 25000, 18000],
        backgroundColor: [
          "#FFEAA3", // 1st bar (even lighter yellow)
          "rgba(144, 238, 144, 1)", // 2nd bar (light green)
          "#FF7F7F", // 3rd bar (light red)
          "rgba(144, 238, 144, 1)", // 4th bar (light green)
          "#FFEAA3", // 5th bar (even lighter yellow)
          "#FFEAA3", // 6th bar (even lighter yellow)
        ],
        stack: 'combined',
        barThickness: 25,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (data) {
            return "₺" + new Intl.NumberFormat("tr-TR").format(data.raw);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Liters',
        },
        min: 0,
        max: 100000,
        ticks: {
          callback: function(value) {
            if (value === 0) return "0 L";
            if (value === 25000) return "10k L";
            if (value === 50000) return "50k L";
            if (value === 75000) return "80k L";
            if (value === 100000) return "1L";
            return null;
          },
          stepSize: 25000,
          count: 4,
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Months',
        },
        stacked: true,
        categoryPercentage: 0.5,
        barPercentage: 1.0,
      },
    },
  };

  return <Bar className="bar_chart_container" data={chartData} options={options} />;
}
