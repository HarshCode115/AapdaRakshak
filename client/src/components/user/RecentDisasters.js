import React from 'react';
import { Card, CardContent, Typography, Box, Chip, CircularProgress } from '@mui/material';
import { 
  LocationOn, 
  Schedule, 
  Warning 
} from '@mui/icons-material';

const RecentDisasters = ({ earthquakes, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!earthquakes || earthquakes.length === 0) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="body1" color="textSecondary">
          No recent earthquake data available
        </Typography>
      </Box>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="recent-disasters-container">
      {earthquakes.map((earthquake, index) => (
        <Card key={earthquake.id || index} className="disaster-card" elevation={3}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Typography variant="h6" component="h3" gutterBottom>
                <Warning style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Magnitude {earthquake.magnitude} Earthquake
              </Typography>
              <Chip 
                label={earthquake.severity.toUpperCase()} 
                color={getSeverityColor(earthquake.severity)}
                size="small"
              />
            </Box>
            
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn style={{ marginRight: 8, fontSize: 18 }} />
              <Typography variant="body2" color="textSecondary">
                {earthquake.location}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <Schedule style={{ marginRight: 8, fontSize: 18 }} />
              <Typography variant="body2" color="textSecondary">
                {formatTime(earthquake.time)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentDisasters;
