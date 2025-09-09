import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  CircularProgress, 
  Collapse, 
  IconButton,
  Divider
} from '@mui/material';
import { 
  LocationOn, 
  Schedule, 
  Warning,
  ExpandMore,
  ExpandLess,
  Info,
  Public,
  Terrain,
  AccessTime
} from '@mui/icons-material';

// Past significant disasters data
const PAST_DISASTERS = [
  {
    id: 'bhopal_gas_1984',
    type: 'industrial',
    title: 'Bhopal Gas Tragedy',
    description: 'Methyl isocyanate gas leak from Union Carbide plant',
    location: 'Bhopal, Madhya Pradesh',
    date: '1984-12-03',
    casualties: '15,000+ deaths',
    impact: 'Worst industrial disaster in history',
    details: 'A gas leak on the night of 2-3 December 1984 at the Union Carbide India Limited pesticide plant in Bhopal exposed thousands of people to toxic methyl isocyanate gas and other chemicals.'
  },
  {
    id: 'gujarat_quake_2001',
    type: 'earthquake',
    title: 'Gujarat Earthquake',
    description: '7.7 magnitude earthquake',
    location: 'Bhuj, Gujarat',
    date: '2001-01-26',
    magnitude: '7.7',
    casualties: '20,000+ deaths',
    impact: 'Massive destruction in Kutch region',
    details: 'The 2001 Gujarat earthquake occurred on 26 January, India\'s 52nd Republic Day. The earthquake reached 7.7 on the moment magnitude scale and had a maximum felt intensity of X (Extreme) on the Mercalli intensity scale.'
  },
  {
    id: 'tsunami_2004',
    type: 'tsunami',
    title: 'Indian Ocean Tsunami',
    description: '9.1 magnitude undersea earthquake',
    location: 'Indian Ocean',
    date: '2004-12-26',
    casualties: '10,000+ deaths in India',
    impact: 'Coastal devastation in Tamil Nadu, AP, and Andaman & Nicobar',
    details: 'The 2004 Indian Ocean earthquake and tsunami occurred at 07:58:53 local time on 26 December, with an epicentre off the west coast of northern Sumatra, Indonesia. It was one of the deadliest natural disasters in recorded history.'
  },
  {
    id: 'uttarakhand_floods_2013',
    type: 'flood',
    title: 'Uttarakhand Floods',
    description: 'Flash floods and landslides',
    location: 'Uttarakhand',
    date: '2013-06-16',
    casualties: '5,000+ deaths',
    impact: 'Massive destruction of property and infrastructure',
    details: 'The 2013 North India floods occurred in June 2013, with the state of Uttarakhand and its surrounding areas experiencing heavy rainfall that triggered devastating floods and landslides.'
  },
  {
    id: 'kerala_floods_2018',
    type: 'flood',
    title: 'Kerala Floods',
    description: 'Heavy monsoon rainfall',
    location: 'Kerala',
    date: '2018-08-08',
    casualties: '483 deaths',
    impact: 'Worst flood in Kerala in nearly a century',
    details: 'The 2018 Kerala floods were one of the major natural disasters to hit the state of Kerala in India. All 14 districts of the state were placed on high alert.'
  },
  {
    id: 'cyclone_fani_2019',
    type: 'cyclone',
    title: 'Cyclone Fani',
    description: 'Extremely severe cyclonic storm',
    location: 'Odisha, West Bengal, Andhra Pradesh',
    date: '2019-05-03',
    casualties: '89 deaths',
    impact: 'Massive evacuation of 1.2 million people',
    details: 'Cyclone Fani was the strongest tropical cyclone to strike the Indian state of Odisha since the 1999 Odisha cyclone. The second named storm and the first severe cyclonic storm of the 2019 North Indian Ocean cyclone season.'
  }
];

const RecentDisasters = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        setLoading(true);
        
        // Define mock data as fallback
        const mockData = [
          {
            id: 'mock1',
            type: 'flood',
            title: 'Assam Floods 2023',
            description: 'Severe flooding in Assam affecting multiple districts',
            location: { name: 'Assam, India', lat: 26.2006, lng: 92.9376 },
            date: '2023-07-15',
            time: '2023-07-15T00:00:00Z',
            severity: 'high',
            details: 'Heavy monsoon rains caused the Brahmaputra river to overflow, affecting over 2 million people across 27 districts. More than 100,000 people were displaced and took shelter in relief camps.',
            source: 'NDMA India',
            impact: 'Widespread damage to infrastructure and agriculture',
            casualties: '42 deaths, 2M+ affected',
            isRecent: true
          },
          {
            id: 'mock2',
            type: 'earthquake',
            title: 'Himalayan Earthquake',
            description: 'Moderate earthquake hits northern India',
            location: { name: 'Uttarakhand, India', lat: 30.0668, lng: 79.0193 },
            date: '2023-06-20',
            time: '2023-06-20T08:45:00Z',
            severity: 'medium',
            details: 'A 5.8 magnitude earthquake struck the Himalayan region, with its epicenter in Uttarakhand. Several buildings developed cracks, but no major casualties were reported.',
            source: 'IMD',
            impact: 'Minor structural damage in some areas',
            casualties: 'No casualties reported',
            isRecent: true
          },
          {
            id: 'mock3',
            type: 'cyclone',
            title: 'Cyclone Biparjoy',
            description: 'Severe cyclonic storm hits western coast',
            location: { name: 'Gujarat, India', lat: 22.2587, lng: 71.1924 },
            date: '2023-06-05',
            time: '2023-06-05T12:00:00Z',
            severity: 'high',
            details: 'Cyclone Biparjoy made landfall near Jakhau port in Gujarat with wind speeds of up to 140 km/h. Over 100,000 people were evacuated to safety.',
            source: 'IMD',
            impact: 'Heavy rainfall, strong winds, and storm surge',
            casualties: '8 deaths, 100K+ evacuated',
            isRecent: true
          }
        ];

        // Use mock data directly for now due to API issues
        setDisasters(mockData);
      } catch (err) {
        console.error('Error fetching disaster data:', err);
        setError('Failed to load disaster data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDisasters();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const allDisasters = [...disasters];

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if ((!allDisasters || allDisasters.length === 0) && !loading) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="body1" color="textSecondary">
          No disaster data available. Please check your connection and try again.
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

  const renderDisasterIcon = (type) => {
    switch (type) {
      case 'earthquake': return <Terrain style={{ marginRight: 8, color: '#f44336' }} />;
      case 'flood': return <span style={{ marginRight: 8 }}>🌊</span>;
      case 'wildfire': return <span style={{ marginRight: 8 }}>🔥</span>;
      case 'storm': return <span style={{ marginRight: 8 }}>⚡</span>;
      case 'cyclone': return <span style={{ marginRight: 8 }}>🌀</span>;
      case 'tsunami': return <span style={{ marginRight: 8 }}>🌊</span>;
      case 'volcano': return <span style={{ marginRight: 8 }}>🌋</span>;
      case 'drought': return <span style={{ marginRight: 8 }}>🏜️</span>;
      case 'landslide': return <span style={{ marginRight: 8 }}>⛰️</span>;
      default: return <Warning style={{ marginRight: 8, color: '#ff9800' }} />;
    }
  };

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Box mb={3} textAlign="center">
        <Typography variant="h6" color="textSecondary" paragraph>
          Recent Disaster Alerts
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }
      }}>
        {allDisasters.map((disaster, index) => {
          const isExpanded = expandedId === disaster.id;
          const isEarthquake = disaster.type === 'earthquake';
          const severityColor = getSeverityColor(disaster.severity);
          
          return (
            <Card 
              key={disaster.id || index} 
              elevation={isExpanded ? 6 : 2}
              sx={{
                mb: 0,
                borderLeft: `4px solid ${
                  severityColor === 'error' ? '#f44336' : 
                  severityColor === 'warning' ? '#ff9800' : '#2196f3'
                }`,
                transition: 'all 0.3s ease-in-out',
                transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                '&:hover': {
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardContent sx={{ flexGrow: 1, pb: '16px !important' }}>
                <Box 
                  onClick={() => handleExpandClick(disaster.id)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover h6': {
                      color: 'primary.main'
                    }
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{
                        transition: 'color 0.2s ease-in-out',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {renderDisasterIcon(disaster.type)}
                      {isEarthquake && disaster.magnitude !== 'N/A' 
                        ? `M${disaster.magnitude} Earthquake` 
                        : disaster.title || disaster.location}
                      {disaster.isPast && (
                        <Chip 
                          label="Past Event" 
                          size="small" 
                          sx={{ 
                            ml: 1,
                            backgroundColor: 'grey.100',
                            color: 'grey.700'
                          }}
                        />
                      )}
                    </Typography>
                    
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandClick(disaster.id);
                      }}
                      aria-expanded={isExpanded}
                      aria-label="show more"
                      sx={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOn sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {disaster.location?.name || 'Location not specified'}
                      {disaster.location?.lat && disaster.location?.lng && (
                        <Typography variant="caption" color="text.secondary" component="span" sx={{ ml: 1 }}>
                          ({disaster.location.lat.toFixed(2)}, {disaster.location.lng.toFixed(2)})
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Box display="flex" alignItems="center">
                      <Schedule sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(disaster.date || disaster.time)}
                      </Typography>
                    </Box>
                    <Chip 
                      label={disaster.severity?.toUpperCase() || 'MEDIUM'} 
                      color={severityColor}
                      size="small"
                      sx={{ height: 20, fontSize: '0.65rem' }}
                    />
                  </Box>
                  
                  {disaster.casualties && (
                    <Typography variant="caption" color="error.main" display="block" mt={1}>
                      ⚠️ {disaster.casualties}
                    </Typography>
                  )}
                </Box>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      <Info color="primary" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {disaster.impact || 'Event Details'}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {disaster.details || 'No additional details available.'}
                    </Typography>
                    {disaster.casualties && (
                      <Typography variant="body2" color="error.main" paragraph>
                        ⚠️ {disaster.casualties}
                      </Typography>
                    )}
                    <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                      Source: {disaster.source || 'Official reports'}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default RecentDisasters;
