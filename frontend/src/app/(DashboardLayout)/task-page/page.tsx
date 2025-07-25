'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import TasksPage from './taskpage'
import withAuth from '@/utils/withAuth';

const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is a task page">
      <TasksPage/>
    </PageContainer>
  );
};

export default withAuth(SamplePage);

