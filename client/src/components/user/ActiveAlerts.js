import React from 'react';
import { Card, CardContent, Typography, Box, Chip, CircularProgress, Button } from '@mui/material';
import { 
  LocationOn, 
  Schedule, 
  Warning, 
  Info 
} from '@mui/icons-material';

const ActiveAlerts = ({ alerts, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!alerts || alerts.length === 0) {
    return (
      <Box textAlign="center" p={3} className="no-alerts">
        <Info style={{ fontSize: 48, color: '#4caf50', marginBottom: 16 }} />
        <Typography variant="h6" color="primary">
          No Active Alerts
        </Typography>
        <Typography variant="body2" color="textSecondary">
          All clear! No disaster alerts in your area at the moment.
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
    <div className="active-alerts-container">
      {alerts.map((alert, index) => (
        <Card key={alert._id || index} className="alert-card urgent" elevation={4}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Typography variant="h6" component="h3" gutterBottom color="error">
                <Warning style={{ marginRight: 8, verticalAlign: 'middle' }} />
                {alert.type.toUpperCase()} ALERT
              </Typography>
              <Chip 
                label={alert.severity?.toUpperCase() || 'HIGH'} 
                color={getSeverityColor(alert.severity || 'high')}
                size="small"
              />
            </Box>
            
            <Typography variant="body1" paragraph>
              {alert.description}
            </Typography>
            
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn style={{ marginRight: 8, fontSize: 18 }} />
              <Typography variant="body2" color="textSecondary">
                {alert.location}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Schedule style={{ marginRight: 8, fontSize: 18 }} />
              <Typography variant="body2" color="textSecondary">
                {formatTime(alert.createdAt)}
              </Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Button variant="contained" color="primary" size="small">
                View Details
              </Button>
              <Button variant="outlined" color="secondary" size="small">
                Share Alert
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActiveAlerts;
