import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
  const data = {
    labels: [
      'Virgin Coconut Oil (500 ml)',
      'Virgin Coconut Oil (1 Litre)',
      'Virgin Coconut Oil (5 Litres)',
      'Virgin Coconut Hair Oil (100 ml)',
    ],
    datasets: [{
      data: [45, 30, 11, 6],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
      ],
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const dataset = tooltipItem.dataset.data;
            const total = dataset.reduce((acc, val) => acc + val, 0);
            const percentage = ((dataset[tooltipItem.dataIndex] / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Most Selling Product</h2>
      {/* <Doughnut data={data} options={options} /> */}
    </div>
  );
};


export default DonutChart