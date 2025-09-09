import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  IconButton,
  Collapse,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  Warning,
  LocationOn,
  Schedule,
  ExpandMore,
  ExpandLess,
  Info,
  Emergency
} from '@mui/icons-material';
import axios from 'axios';

const DisasterCatalogue = ({ onDisasterSelect, selectedDisaster, selectedType = 'all', onDisastersUpdate }) => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetchDisasters();
    const interval = setInterval(fetchDisasters, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [selectedType]);

  const fetchDisasters = async () => {
    try {
      setLoading(true);
      const url = selectedType === 'all' 
        ? 'http://localhost:5000/api/disasters' 
        : `http://localhost:5000/api/disasters?type=${selectedType}`;
      
      const response = await axios.get(url);
      const disastersData = response.data.data || [];
      const typesData = response.data.filters?.availableTypes || [];
      
      setDisasters(disastersData);
      
      // Notify parent component about disasters update
      if (onDisastersUpdate) {
        onDisastersUpdate(disastersData, typesData);
      }
    } catch (error) {
      console.error('Error fetching disasters:', error);
      // Fallback mock data
      const mockData = [
        {
          id: 'mock_1',
          type: 'flood',
          title: 'Flood Alert - Assam',
          description: 'Heavy rainfall causing floods in multiple districts',
          location: { lat: 26.2006, lng: 92.9376 },
          severity: 'HIGH',
          timestamp: new Date().toISOString(),
        }
      ];
      setDisasters(mockData);
      
      if (onDisastersUpdate) {
        onDisastersUpdate(mockData, ['all', 'flood']);
      }
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

  const handleToggleExpand = (disasterId) => {
    setExpandedItems(prev => ({
      ...prev,
      [disasterId]: !prev[disasterId]
    }));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card sx={{ height: '70vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Emergency color="error" />
          <Typography variant="h6">
            Active Disasters
          </Typography>
          <Chip 
            label={disasters.length} 
            size="small" 
            color="error" 
            variant="outlined"
          />
        </Box>
        
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        
        <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
          Click on any disaster to view on map
        </Alert>
      </CardContent>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 2 }}>
        {disasters.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Info color="disabled" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body2" color="textSecondary">
              No active disasters in India region
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {disasters.map((disaster, index) => (
              <React.Fragment key={disaster.id}>
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    p: 0,
                    mb: 1,
                    border: selectedDisaster?.id === disaster.id ? 2 : 1,
                    borderColor: selectedDisaster?.id === disaster.id ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                  onClick={() => onDisasterSelect(disaster)}
                >
                  <Box sx={{ p: 2, width: '100%' }}>
                    <Box display="flex" alignItems="flex-start" gap={1}>
                      <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                        {getDisasterIcon(disaster.type)}
                      </Typography>
                      <Box flex={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                            {disaster.title}
                          </Typography>
                          <Chip
                            label={disaster.severity}
                            size="small"
                            color={getSeverityColor(disaster.severity)}
                            sx={{ minWidth: 50, height: 20, fontSize: '0.7rem' }}
                          />
                        </Box>
                        
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '0.8rem' }}>
                          {disaster.description}
                        </Typography>
                        
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <LocationOn sx={{ fontSize: 14 }} color="action" />
                            <Typography variant="caption" color="textSecondary">
                              {disaster.location.lat.toFixed(2)}, {disaster.location.lng.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Schedule sx={{ fontSize: 14 }} color="action" />
                            <Typography variant="caption" color="textSecondary">
                              {formatTimeAgo(disaster.timestamp)}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Chip
                            label={disaster.type}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleExpand(disaster.id);
                            }}
                          >
                            {expandedItems[disaster.id] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Collapse in={expandedItems[disaster.id]}>
                      <Box mt={2} pt={2} borderTop={1} borderColor="divider">
                        {disaster.details && (
                          <Box>
                            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                              Additional Details:
                            </Typography>
                            {disaster.details.magnitude && (
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                Magnitude: {disaster.details.magnitude}
                              </Typography>
                            )}
                            {disaster.details.depth && (
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                Depth: {disaster.details.depth} km
                              </Typography>
                            )}
                            {disaster.details.place && (
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                Location: {disaster.details.place}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Collapse>
                  </Box>
                </ListItem>
                {index < disasters.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Card>
  );
};

export default DisasterCatalogue;
