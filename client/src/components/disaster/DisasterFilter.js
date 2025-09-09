import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography
} from '@mui/material';
import {
  Public as EarthquakeIcon,
  Water as FloodIcon,
  Cyclone as CycloneIcon,
  Thunderstorm as ThunderstormIcon,
  Cloud as RainIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const DisasterFilter = ({ 
  availableTypes = [], 
  selectedType = 'all', 
  onTypeChange,
  disasterCounts = {}
}) => {
  const getDisasterIcon = (type) => {
    const iconProps = { fontSize: 'small', sx: { mr: 1 } };
    
    switch (type) {
      case 'earthquake':
        return <EarthquakeIcon {...iconProps} />;
      case 'flood':
        return <FloodIcon {...iconProps} />;
      case 'cyclone':
        return <CycloneIcon {...iconProps} />;
      case 'thunderstorm':
        return <ThunderstormIcon {...iconProps} />;
      case 'rain':
        return <RainIcon {...iconProps} />;
      default:
        return <FilterIcon {...iconProps} />;
    }
  };

  const getDisasterColor = (type) => {
    switch (type) {
      case 'earthquake':
        return '#ff5722';
      case 'flood':
        return '#2196f3';
      case 'cyclone':
        return '#9c27b0';
      case 'thunderstorm':
        return '#ff9800';
      case 'rain':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const formatTypeName = (type) => {
    if (type === 'all') return 'All Disasters';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <FilterIcon sx={{ mr: 1 }} />
        Filter by Disaster Type
      </Typography>
      
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Disaster Type</InputLabel>
        <Select
          value={selectedType}
          label="Disaster Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="all">
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Box display="flex" alignItems="center">
                <FilterIcon sx={{ mr: 1, fontSize: 'small' }} />
                All Disasters
              </Box>
              <Chip 
                label={Object.values(disasterCounts).reduce((a, b) => a + b, 0)} 
                size="small" 
                color="primary"
              />
            </Box>
          </MenuItem>
          {availableTypes.filter(type => type !== 'all').map((type) => (
            <MenuItem key={type} value={type}>
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Box display="flex" alignItems="center">
                  {getDisasterIcon(type)}
                  {formatTypeName(type)}
                </Box>
                <Chip 
                  label={disasterCounts[type] || 0} 
                  size="small" 
                  sx={{ 
                    backgroundColor: `${getDisasterColor(type)}20`,
                    color: getDisasterColor(type)
                  }}
                />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Quick filter chips */}
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip
          label="All"
          onClick={() => onTypeChange('all')}
          variant={selectedType === 'all' ? 'filled' : 'outlined'}
          color={selectedType === 'all' ? 'primary' : 'default'}
          size="small"
          icon={<FilterIcon />}
        />
        {availableTypes.filter(type => type !== 'all').map((type) => (
          <Chip
            key={type}
            label={`${formatTypeName(type)} (${disasterCounts[type] || 0})`}
            onClick={() => onTypeChange(type)}
            variant={selectedType === type ? 'filled' : 'outlined'}
            size="small"
            icon={getDisasterIcon(type)}
            sx={{
              backgroundColor: selectedType === type ? getDisasterColor(type) : 'transparent',
              color: selectedType === type ? 'white' : getDisasterColor(type),
              borderColor: getDisasterColor(type),
              '&:hover': {
                backgroundColor: `${getDisasterColor(type)}20`
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DisasterFilter;
