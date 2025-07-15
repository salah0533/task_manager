'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
// components
import UpcomingSchedules from '@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules'
import TopPayingClients from '@/app/(DashboardLayout)/components/dashboard/TopPayingClients'

const Dashboard = () => {
  return (
    <PageContainer title='Dashboard' description='this is Dashboard'>
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}>
            <UpcomingSchedules />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}>
            <TopPayingClients />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
