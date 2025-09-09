import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import DisasterMap from '../components/disaster/DisasterMap';
import DisasterCatalogue from '../components/disaster/DisasterCatalogue';
import DisasterFilter from '../components/disaster/DisasterFilter';

const DisasterMapPage = () => {
  const [selectedDisaster, setSelectedDisaster] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState('all');
  const [disasters, setDisasters] = React.useState([]);
  const [availableTypes, setAvailableTypes] = React.useState([]);
  const [disasterCounts, setDisasterCounts] = React.useState({});

  const handleDisasterSelect = (disaster) => {
    setSelectedDisaster(disaster);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedDisaster(null); // Clear selection when filter changes
  };

  const handleDisastersUpdate = (disastersData, typesData) => {
    setDisasters(disastersData);
    setAvailableTypes(typesData);
    
    // Calculate disaster counts by type
    const counts = {};
    disastersData.forEach(disaster => {
      counts[disaster.type] = (counts[disaster.type] || 0) + 1;
    });
    setDisasterCounts(counts);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 2, mb: 0, borderRadius: 0 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          🗺️ Disaster Tracking Map - India
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Real-time disaster monitoring and alerts across Indian states
        </Typography>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Disaster Catalogue Sidebar */}
        <Box sx={{ width: 450, borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
          <Box sx={{ p: 2 }}>
            <DisasterFilter
              availableTypes={availableTypes}
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
              disasterCounts={disasterCounts}
            />
          </Box>
          <DisasterCatalogue 
            onDisasterSelect={handleDisasterSelect}
            selectedDisaster={selectedDisaster}
            selectedType={selectedType}
            onDisastersUpdate={handleDisastersUpdate}
          />
        </Box>

        {/* Map Container */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <DisasterMap 
            selectedDisaster={selectedDisaster} 
            selectedType={selectedType}
          />
          
          {/* Map Legend */}
          <Paper 
            elevation={3} 
            sx={{ 
              position: 'absolute', 
              bottom: 20, 
              left: 20, 
              p: 2, 
              minWidth: 200,
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Legend
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5722' }} />
                <Typography variant="caption">High Severity</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800' }} />
                <Typography variant="caption">Medium Severity</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4caf50' }} />
                <Typography variant="caption">Low Severity</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DisasterMapPage;
