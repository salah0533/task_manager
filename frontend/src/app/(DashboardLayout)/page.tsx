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
import {fetch_stats} from "@/services/dashbordService"
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [statData, setStatData] = useState([
    {key:"delete_counter", icon: <DeleteIcon />, title: "Deleted Tasks", value: 0, color: "#e57373" },
    {key:"edit_counter", icon: <EditIcon />, title: "Edited Tasks", value: 0, color: "#64b5f6" },
    {key:"added_counter", icon: <AddIcon />, title: "Added Tasks", value: 0, color: "#81c784" },
    {key:"In Progress", icon: <HourglassBottomIcon />, title: "In Progress", value: 0, color: "#ffb74d" },
    {key:"Pending", icon: <PendingIcon />, title: "Pending Tasks", value: 0, color: "#ba68c8" },
    {key:"Completed", icon: <DoneIcon />, title: "Completed Tasks", value: 0, color: "#4db6ac" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch_stats();
      const data = res.res
      setStatData(prev=> prev.map(
        (item)=>({...item,value:data[item.key] || item.value})
      ))
    };

    fetchData();
  }, []);

  return (
    <PageContainer title='Dashboard' description='this is Dashboard'>
      <Box>
          <Grid container spacing={3}>
          {
              statData.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <StatCard icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
                </Grid>
              ))
          }
          </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
