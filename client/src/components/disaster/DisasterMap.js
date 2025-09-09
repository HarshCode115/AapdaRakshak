import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { Card, CardContent, Typography, Box, CircularProgress, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { Warning, LocalHospital, Emergency, NaturePeople, Info } from '@mui/icons-material';
import axios from 'axios';
import DisasterDetails from './DisasterDetails';

const containerStyle = {
  width: '100%',
  height: '70vh',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const center = {
  lat: 20.5937,  // Center of India
  lng: 78.9629
};

// India bounds for restricting map view
const indiaBounds = {
  north: 37.6,
  south: 6.4,
  west: 68.1,
  east: 97.4,
};

const disasterTypes = {
  earthquake: { color: '#f44336', icon: '🌋' },
  flood: { color: '#2196f3', icon: '🌊' },
  cyclone: { color: '#9c27b0', icon: '🌀' },
  fire: { color: '#ff9800', icon: '🔥' },
  landslide: { color: '#8bc34a', icon: '⛰️' },
  drought: { color: '#795548', icon: '🏜️' },
  heatwave: { color: '#ff5722', icon: '🌡️' },
  other: { color: '#9e9e9e', icon: '⚠️' }
};

const DisasterMap = ({ selectedDisaster, selectedType = 'all' }) => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [filter, setFilter] = useState(['earthquake', 'flood', 'cyclone', 'fire', 'landslide', 'drought', 'heatwave', 'other']);
  const [map, setMap] = useState(null);
  const [selectedDisasterForDetails, setSelectedDisasterForDetails] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchDisasters = async () => {
    try {
      setLoading(true);
      const url = selectedType === 'all' 
        ? 'http://localhost:5000/api/disasters' 
        : `http://localhost:5000/api/disasters?type=${selectedType}`;
      
      const response = await axios.get(url);
      setDisasters(response.data.data || []);
    } catch (error) {
      console.error('Error fetching disasters:', error);
      // Fallback to empty array if API fails
      setDisasters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisasters();
    const interval = setInterval(fetchDisasters, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [selectedType]);

  const handleFilterChange = (event, newFilters) => {
    setFilter(newFilters);
  };

  const filteredDisasters = disasters.filter(disaster => 
    filter.includes(disaster.type)
  );

  const handleViewDetails = (disaster) => {
    setSelectedDisasterForDetails(disaster);
    setDetailsOpen(true);
    setSelectedInfo(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress />
      </Box>
    );
  }

  // Check if Google Maps API key is available
  const hasGoogleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!hasGoogleMapsKey) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Google Maps API Key Required
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please add your Google Maps API key to the .env file:
        </Typography>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Get your API key from{' '}
          <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
            Google Cloud Console
          </a>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box mb={2}>
        <ToggleButtonGroup
          value={filter}
          onChange={handleFilterChange}
          aria-label="disaster filter"
          sx={{ mb: 2 }}
        >
          {Object.entries(disasterTypes).map(([type, { icon }]) => (
            <ToggleButton key={type} value={type} aria-label={type.toLowerCase()}>
              {icon} {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      
      <LoadScript 
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onError={() => console.error('Google Maps failed to load')}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={map => setMap(map)}
          options={{
            restriction: {
              latLngBounds: indiaBounds,
              strictBounds: false,
            },
            minZoom: 4,
            maxZoom: 15,
          }}
        >
          {filteredDisasters.map(disaster => {
            const position = { 
              lat: disaster.location?.lat || disaster.location?.latitude || 20.5937, 
              lng: disaster.location?.lng || disaster.location?.longitude || 78.9629 
            };
            const radius = disaster.radius || (disaster.severity === 'HIGH' ? 50000 : disaster.severity === 'MEDIUM' ? 30000 : 20000);
            
            return (
              <React.Fragment key={disaster.id}>
                <Marker
                  position={position}
                  icon={{
                    path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
                    fillColor: disasterTypes[disaster.type]?.color || '#9e9e9e',
                    fillOpacity: 0.8,
                    strokeWeight: 2,
                    strokeColor: '#ffffff',
                    scale: disaster.severity === 'HIGH' ? 12 : disaster.severity === 'MEDIUM' ? 10 : 8,
                  }}
                  onClick={() => setSelectedInfo(disaster)}
                />
                <Circle
                  center={position}
                  radius={radius}
                  options={{
                    fillColor: disasterTypes[disaster.type]?.color || '#9e9e9e',
                    fillOpacity: 0.15,
                    strokeColor: disasterTypes[disaster.type]?.color || '#9e9e9e',
                    strokeOpacity: 0.6,
                    strokeWeight: 2,
                  }}
                />
              </React.Fragment>
            );
          })}

          {selectedInfo && (
            <InfoWindow
              position={{ 
                lat: selectedInfo.location?.lat || selectedInfo.location?.latitude || 20.5937, 
                lng: selectedInfo.location?.lng || selectedInfo.location?.longitude || 78.9629 
              }}
              onCloseClick={() => setSelectedInfo(null)}
            >
              <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {selectedInfo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInfo.description}
                  </Typography>
                  <Box mt={1}>
                    <Typography variant="caption" display="block">
                      Type: {selectedInfo.type}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Severity: {selectedInfo.severity}
                    </Typography>
                    <Typography variant="caption" display="block">
                      {new Date(selectedInfo.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Info />}
                      onClick={() => handleViewDetails(selectedInfo)}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <DisasterDetails
        disaster={selectedDisasterForDetails}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </Box>
  );
};

export default DisasterMap;
