import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  LocationOn,
  Schedule,
  Warning,
  Info,
  People,
  Home,
  LocalHospital,
  Phone,
  Emergency,
  Visibility
} from '@mui/icons-material';
import axios from 'axios';

const DisasterDetails = ({ disaster, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(null);

  useEffect(() => {
    if (disaster && open) {
      fetchAdditionalInfo();
    }
  }, [disaster, open]);

  const fetchAdditionalInfo = async () => {
    try {
      setLoading(true);
      // Fetch additional disaster information
      const response = await axios.get(`http://localhost:5000/api/disasters/${disaster.id}/details`);
      setAdditionalInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching additional info:', error);
      // Mock additional data for demonstration
      setAdditionalInfo({
        affectedPopulation: 45000,
        evacuated: 12000,
        reliefCamps: 25,
        emergencyContacts: [
          { name: 'NDRF Control Room', number: '011-26701728' },
          { name: 'State Emergency', number: '1070' },
          { name: 'Police', number: '100' }
        ],
        resources: {
          medicalTeams: 8,
          rescueTeams: 15,
          shelters: 32
        },
        updates: [
          {
            time: '2 hours ago',
            message: 'Rescue operations ongoing in affected areas'
          },
          {
            time: '4 hours ago',
            message: 'Emergency shelters set up for evacuees'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'default';
    }
  };

  const getDisasterIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'EARTHQUAKE': return '🌋';
      case 'FLOOD': return '🌊';
      case 'CYCLONE': return '🌀';
      case 'FIRE': return '🔥';
      default: return '⚠️';
    }
  };

  if (!disaster) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '70vh' }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" component="span">
            {getDisasterIcon(disaster.type)} {disaster.title}
          </Typography>
          <Chip
            label={disaster.severity}
            color={getSeverityColor(disaster.severity)}
            size="small"
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Basic Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={`${disaster.location?.lat?.toFixed(4)}, ${disaster.location?.lng?.toFixed(4)}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Schedule /></ListItemIcon>
                    <ListItemText
                      primary="Time"
                      secondary={new Date(disaster.timestamp).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Warning /></ListItemIcon>
                    <ListItemText
                      primary="Type"
                      secondary={disaster.type}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Impact Statistics */}
          {additionalInfo && (
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <People sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Impact Statistics
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><People /></ListItemIcon>
                      <ListItemText
                        primary="Affected Population"
                        secondary={additionalInfo.affectedPopulation?.toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Home /></ListItemIcon>
                      <ListItemText
                        primary="People Evacuated"
                        secondary={additionalInfo.evacuated?.toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><LocalHospital /></ListItemIcon>
                      <ListItemText
                        primary="Relief Camps"
                        secondary={additionalInfo.reliefCamps}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Description */}
          <Grid item xs={12}>
            <Alert severity={getSeverityColor(disaster.severity)} sx={{ mb: 2 }}>
              <Typography variant="body1">
                {disaster.description}
              </Typography>
            </Alert>
          </Grid>

          {/* Emergency Contacts */}
          {additionalInfo?.emergencyContacts && (
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Phone sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Emergency Contacts
                  </Typography>
                  <List dense>
                    {additionalInfo.emergencyContacts.map((contact, index) => (
                      <ListItem key={index}>
                        <ListItemIcon><Emergency /></ListItemIcon>
                        <ListItemText
                          primary={contact.name}
                          secondary={contact.number}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Resources Deployed */}
          {additionalInfo?.resources && (
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LocalHospital sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Resources Deployed
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><LocalHospital /></ListItemIcon>
                      <ListItemText
                        primary="Medical Teams"
                        secondary={additionalInfo.resources.medicalTeams}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><People /></ListItemIcon>
                      <ListItemText
                        primary="Rescue Teams"
                        secondary={additionalInfo.resources.rescueTeams}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Home /></ListItemIcon>
                      <ListItemText
                        primary="Emergency Shelters"
                        secondary={additionalInfo.resources.shelters}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Recent Updates */}
          {additionalInfo?.updates && (
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Visibility sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Recent Updates
                  </Typography>
                  {additionalInfo.updates.map((update, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        {update.time}
                      </Typography>
                      <Typography variant="body1">
                        {update.message}
                      </Typography>
                      {index < additionalInfo.updates.length - 1 && <Divider sx={{ mt: 1 }} />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => window.open('/alertsform', '_blank')}
        >
          Report Related Issue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisasterDetails;
