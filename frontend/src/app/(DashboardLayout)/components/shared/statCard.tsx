// components/StatCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color = '#1976d2' }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: 24,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            <Typography variant="h6">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
