import React from 'react'
import SalesWidget from '../../components/sales-components/sales-widget/SalesWidget'
import SalesBarGraph from '../../components/sales-components/salebar-graph/SalesBarGraph'
import SalesLineGraph from '../../components/sales-components/saleline-graph/SalesLineGraph'
import IncomeExpense from '../../components/sales-components/icom-expence/IncomeExpense'
import MemberAdoTable from '../../components/sales-components/member-ado/MemberAdoTable'
import { Grid } from '@mui/material'

const SalesPage = () => {
  return (
     <>
     <div>
   <Grid container spacing={2}>


      {/* First row */}
      <Grid item xs={12} sm={12} md={12} lg={6}>
      <SalesWidget/>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
        <SalesBarGraph/>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
         <SalesLineGraph/>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={6}>
          <IncomeExpense/>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12}>
          <MemberAdoTable/>
      </Grid>


      </Grid>

     </div>``
     </>
  )
}

export default SalesPage
