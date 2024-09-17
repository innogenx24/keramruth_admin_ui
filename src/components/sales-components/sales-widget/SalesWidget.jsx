import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './SalesWidget.scss'

const metricsData = [
  { title: 'Total Sales', value: '47,801', change: '+32.01%' },
  { title: 'New Customers', value: '1,234', change: '-10.5%' },
  { title: 'Total Revenue', value: '$150,000', change: '+15.2%' },
  { title: 'Profit Margin', value: '25%', change: '-5.0%' },
];

const SalesWidget= () => {
  return (
    <div className='widget-cart-container'>
      {metricsData.map((metric, index) => (
          <Card >
            <CardContent>
              <Typography variant="h6">{metric.title}</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body1">{metric.value}</Typography>
              <Typography
                variant="body2"
                color={metric.change.includes('+') ? 'green' : 'red'}
              >
                {metric.change}
              </Typography>
            </CardContent>
          </Card>
      ))}
    </div>
  );
};

export default SalesWidget
