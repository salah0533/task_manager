'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
// components
import UpcomingSchedules from '@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules'
import TopPayingClients from '@/app/(DashboardLayout)/components/dashboard/TopPayingClients'
import StatCard from '@/app/(DashboardLayout)/components/shared/statCard'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PendingIcon from '@mui/icons-material/Schedule';
import DoneIcon from '@mui/icons-material/CheckCircle';

const Dashboard = () => {
  return (
    <PageContainer title='Dashboard' description='this is Dashboard'>
      <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }} >
              <StatCard icon={<DeleteIcon />} title="Deleted Tasks" value={12} color="#e57373" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<EditIcon />} title="Edited Tasks" value={8} color="#64b5f6" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<AddIcon />} title="Added Tasks" value={15} color="#81c784" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<HourglassBottomIcon />} title="In Progress" value={5} color="#ffb74d" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<PendingIcon />} title="Pending Tasks" value={3} color="#ba68c8" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard icon={<DoneIcon />} title="Completed Tasks" value={20} color="#4db6ac" />
            </Grid>
          </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
