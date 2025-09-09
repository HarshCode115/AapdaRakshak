import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, Typography, Button, Box, Chip, CircularProgress } from '@mui/material'
import { 
  CheckCircle, 
  Cancel, 
  Visibility, 
  LocationOn, 
  Schedule, 
  Warning 
} from '@mui/icons-material'
import { toast } from 'react-toastify'

function AlertReviewBox({ isUserView = false }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:5000/admin/getalerts', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.flag) {
        setAlerts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast.error('Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const handleAlertAction = async (alertId, action) => {
    try {
      setProcessing(prev => ({ ...prev, [alertId]: true }));
      const token = localStorage.getItem('adminToken');
      
      const response = await axios.post('http://localhost:5000/admin/approvealert', {
        id: alertId,
        response: action
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.flag) {
        toast.success(response.data.message);
        fetchAlerts(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error processing alert:', error);
      toast.error('Failed to process alert');
    } finally {
      setProcessing(prev => ({ ...prev, [alertId]: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 60000).toLocaleString();
  };

  if (loading) {
    return (
      <div className='admin-box'>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div className='admin-box'>
      <div className='top-bar'>
        <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>
          {isUserView ? 'View Alert Requests' : 'Review Alert Requests'}
        </h5>
      </div>

      <div className='main-box' style={{maxHeight: '600px', overflowY: 'auto', padding: '20px'}}>
        {alerts.length === 0 ? (
          <Box textAlign="center" p={4}>
            <Typography variant="h6" color="textSecondary">
              No alerts to review
            </Typography>
          </Box>
        ) : (
          alerts.map((alert) => (
            <Card key={alert._id} style={{marginBottom: '20px'}} elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h3">
                    <Warning style={{ marginRight: 8, verticalAlign: 'middle' }} />
                    {alert.type.toUpperCase()} Alert
                  </Typography>
                  <Chip 
                    label={alert.status.toUpperCase()} 
                    color={getStatusColor(alert.status)}
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
                    Created: {formatDate(alert.createdby)}
                  </Typography>
                </Box>

                {alert.expiresby !== -1 && (
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    Expires: {formatDate(alert.createdby + alert.expiresby)}
                  </Typography>
                )}

                {!isUserView && alert.status === 'pending' && (
                  <Box display="flex" gap={2} mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => handleAlertAction(alert._id, 'success')}
                      disabled={processing[alert._id]}
                      size="small"
                    >
                      Approve & Send Alerts
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Cancel />}
                      onClick={() => handleAlertAction(alert._id, 'rejected')}
                      disabled={processing[alert._id]}
                      size="small"
                    >
                      Reject
                    </Button>
                  </Box>
                )}

                {isUserView && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default AlertReviewBox