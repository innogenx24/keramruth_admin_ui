import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './DonutChart.scss';

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const chartRef = useRef(null);

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
    maintainAspectRatio: false,
    cutout: '70%', // Adjust this value to change the thickness of the doughnut
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset.data;
            const total = dataset.reduce((acc, val) => acc + val, 0);
            const percentage = ((dataset[tooltipItem.dataIndex] / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize(); // Trigger chart resize
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='dchart-container'>
      <h2>Most Selling Product</h2>

      <div className='doughnu_chart'>
        <Doughnut ref={chartRef} data={data} options={options} />
        <div className='chart-content'>
          Customers <br/>
          <span>This Month</span>
        </div> {/* Overlay for content */}
      </div>
    </div>
  );
};

export default DonutChart;
