import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, CircularProgress, Button, Collapse, Divider } from '@mui/material';
import { 
  LocationOn, 
  Schedule, 
  Warning, 
  Info,
  ExpandMore,
  ExpandLess,
  Share
} from '@mui/icons-material';

const ActiveAlerts = ({ alerts, loading }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const toggleExpand = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };
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
          All clear! No alerts in your area at the moment.
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
        <Card key={alert._id || index} className="alert-card urgent" elevation={4} sx={{ mb: 2 }}>
          <CardContent sx={{ pb: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Typography variant="h6" component="h3" gutterBottom color="error">
                <Warning style={{ marginRight: 8, verticalAlign: 'middle' }} />
                {alert.type?.toUpperCase() || 'ALERT'}
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
                {typeof alert.location === 'object' 
                  ? `${alert.location.lat?.toFixed(2)}, ${alert.location.lng?.toFixed(2)}` 
                  : alert.location || 'Location not specified'}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Schedule style={{ marginRight: 8, fontSize: 18 }} />
              <Typography variant="body2" color="textSecondary">
                {formatTime(alert.timestamp || alert.createdAt || new Date())}
              </Typography>
            </Box>

            {alert.details && (
              <>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button 
                    variant="text" 
                    size="small"
                    onClick={() => toggleExpand(alert._id || index)}
                    endIcon={expandedAlert === (alert._id || index) ? <ExpandLess /> : <ExpandMore />}
                    sx={{ textTransform: 'none' }}
                  >
                    {expandedAlert === (alert._id || index) ? 'Hide Details' : 'View Details'}
                  </Button>
                  
                  {navigator.share && (
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Share fontSize="small" />}
                      onClick={async () => {
                        try {
                          await navigator.share({
                            title: `${alert.type?.toUpperCase() || 'ALERT'}`,
                            text: `${alert.description || ''}\n\nLocation: ${alert.location ? (typeof alert.location === 'object' ? 
                              `${alert.location.lat?.toFixed(2)}, ${alert.location.lng?.toFixed(2)}` : 
                              alert.location) : 'Location not specified'}`,
                            url: window.location.href
                          });
                        } catch (error) {
                          console.log('Error sharing:', error);
                        }
                      }}
                      sx={{ textTransform: 'none' }}
                    >
                      Share
                    </Button>
                  )}
                </Box>
                
                <Collapse in={expandedAlert === (alert._id || index)}>
                  <Divider sx={{ my: 1.5 }} />
                  <Box mt={1.5}>
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                      {typeof alert.details === 'string' ? alert.details : 'Additional details not available'}
                    </Typography>
                  </Box>
                </Collapse>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActiveAlerts;
