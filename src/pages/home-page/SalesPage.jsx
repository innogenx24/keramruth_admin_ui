import React from 'react';
import { Grid, Container } from '@mui/material';
import SalesCard from '../../components/homepage-component/total-sale-widget/SalesCard';
import { StockSaleBarGraph } from '../../components/homepage-component/stockSale-graph/StockSaleBarGraph';
import DonutChart from '../../components/homepage-component/selling-products-chart/DonutChart';
import TrentLineGraph from '../../components/homepage-component/sale-trent-linechart/TrentLineGraph';
import './SalesPage.scss'

const cardData = [
  {
    title: 'Total Sales (ADO) (154)',
    sales: 550000,
    target: 770000,
    growth: 32,
  },
  {
    title: 'Total Sales (MD) (200)',
    sales: 650000,
    target: 900000,
    growth: 45,
  },
  {
    title: 'Total Sales (ADO) (154)',
    sales: 150000,
    target: 770000,
    growth: 42,
  },
  {
    title: 'Total Sales (ADO) (154)',
    sales: 250000,
    target: 440000,
    growth: 32,
  },
];

const SalesPage = () => {
  return (
    <div>
      <Grid container spacing={3}>
        {/* Left Side: Sales Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {cardData.map((data, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <SalesCard
                  title={data.title}
                  sales={data.sales}
                  target={data.target}
                  growth={data.growth}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side: Stock Sale Graph */}
        <Grid item xs={12} md={6}>
          <StockSaleBarGraph />
        </Grid>
      </Grid>

      {/* Second Row: Charts */}
      <Grid className='charts-twos' container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={3}>
          <DonutChart />
        </Grid>  
        <Grid item xs={12} md={9}>
          <TrentLineGraph />
        </Grid>
      </Grid>
    </div>
  );
};

export default SalesPage;
