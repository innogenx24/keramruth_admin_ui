import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import  './IncomeExpense.scss'


const data = [
  {
    title: 'Income',
    timeFrame: 'Today',
    currentAmount: '₹500.200',
    changePercentage: '-2.5%',
    previousAmount: '₹25658.00'
  },
  {
    title: 'Income',
    timeFrame: 'Today',
    currentAmount: '₹500.200',
    changePercentage: '-2.5%',
    previousAmount: '₹25658.00'
  },
  // Add another object for the second card with different values if needed
];

const IncomeExpense = () => {
  return (
<div className='saleincome-page-container'>
      {data.map((item) => (
       
          <Card style={{ background: 'linear-gradient(45deg, #FFC0CB 30%, #FF69B4 90%)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="h5">
                {item.currentAmount}
                <span style={{ color: '#ff1744', marginLeft: '10px' }}>
                  {item.changePercentage}
                </span>
              </Typography>
              <Typography color="textSecondary">
                Last week income
              </Typography>
              <Typography variant="body2">
                {item.previousAmount}
              </Typography>
            </CardContent>
          </Card>
    
      ))}
</div>
  );
};


export default IncomeExpense
