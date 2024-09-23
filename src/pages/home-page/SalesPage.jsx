import React from 'react';
import { Grid, Container } from '@mui/material';
import SalesCard from '../../components/homepage-component/total-sale-widget/SalesCard';
import { StockSaleBarGraph } from '../../components/homepage-component/stockSale-graph/StockSaleBarGraph';
import DonutChart from '../../components/homepage-component/selling-products-chart/DonutChart';


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
    <Container sx={{ marginTop: '16px' }}>
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
                  icon={data.icon}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side: Stock Sale Graph */}
        <Grid item xs={12} md={6} sx={{Height:'120px'}}>
          <StockSaleBarGraph />
        </Grid>
      </Grid>

   <Grid>
      <DonutChart/>
    </Grid>  

    </Container>
  );
};

export default SalesPage;
