import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Chip,
  IconButton
} from '@mui/material';
import {
  WbSunny,
  Cloud,
  CloudQueue,
  Grain,
  Thunderstorm,
  AcUnit,
  Visibility,
  Speed,
  Opacity,
  Refresh
} from '@mui/icons-material';
import axios from 'axios';

const popularCities = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 }
];

const WeatherSection = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 10 * 60 * 1000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      
      // Mock weather data as fallback
      const mockWeatherData = {
        Delhi: { temperature: 32, condition: 'Partly Cloudy', humidity: 65, windSpeed: 12, visibility: 8 },
        Mumbai: { temperature: 29, condition: 'Humid', humidity: 78, windSpeed: 15, visibility: 6 },
        Bangalore: { temperature: 26, condition: 'Pleasant', humidity: 60, windSpeed: 8, visibility: 10 },
        Chennai: { temperature: 31, condition: 'Hot & Humid', humidity: 72, windSpeed: 18, visibility: 7 },
        Kolkata: { temperature: 30, condition: 'Monsoon', humidity: 85, windSpeed: 10, visibility: 5 },
        Hyderabad: { temperature: 28, condition: 'Clear', humidity: 55, windSpeed: 14, visibility: 12 },
        Pune: { temperature: 27, condition: 'Mild', humidity: 58, windSpeed: 11, visibility: 9 },
        Ahmedabad: { temperature: 35, condition: 'Hot', humidity: 45, windSpeed: 16, visibility: 8 }
      };
      
      const weatherPromises = popularCities.map(async (city) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/weather/${city.name}`);
          return {
            city: city.name,
            temperature: response.data.data?.temperature || mockWeatherData[city.name]?.temperature || 25,
            condition: response.data.data?.condition || mockWeatherData[city.name]?.condition || 'Clear',
            humidity: response.data.data?.humidity || mockWeatherData[city.name]?.humidity || 60,
            windSpeed: response.data.data?.windSpeed || mockWeatherData[city.name]?.windSpeed || 10,
            visibility: response.data.data?.visibility || mockWeatherData[city.name]?.visibility || 8,
            description: response.data.data?.description || 'Weather data'
          };
        } catch (error) {
          // Use mock data when API fails
          const mockData = mockWeatherData[city.name] || { temperature: 25, condition: 'Clear', humidity: 60, windSpeed: 10, visibility: 8 };
          return {
            city: city.name,
            temperature: mockData.temperature,
            condition: mockData.condition,
            humidity: mockData.humidity,
            windSpeed: mockData.windSpeed,
            visibility: mockData.visibility,
            description: 'Mock weather data'
          };
        }
      });

      const results = await Promise.all(weatherPromises);
      setWeatherData(results);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <WbSunny sx={{ color: '#FFA726' }} />;
      case 'cloudy':
      case 'partly cloudy':
        return <CloudQueue sx={{ color: '#90A4AE' }} />;
      case 'rainy':
      case 'rain':
        return <Grain sx={{ color: '#42A5F5' }} />;
      case 'thunderstorm':
        return <Thunderstorm sx={{ color: '#5C6BC0' }} />;
      case 'snow':
        return <AcUnit sx={{ color: '#E3F2FD' }} />;
      default:
        return <Cloud sx={{ color: '#90A4AE' }} />;
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp > 35) return '#FF5722';
    if (temp > 25) return '#FF9800';
    if (temp > 15) return '#4CAF50';
    return '#2196F3';
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            🌤️ Popular Cities Weather
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Current weather conditions across major Indian cities
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          {lastUpdated && (
            <Typography variant="caption" color="text.secondary">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Typography>
          )}
          <IconButton onClick={fetchWeatherData} disabled={loading}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {weatherData.map((weather, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={3}
                sx={{
                  height: '100%',
                  background: `linear-gradient(135deg, ${getTemperatureColor(weather.temperature)}20, ${getTemperatureColor(weather.temperature)}10)`,
                  border: `1px solid ${getTemperatureColor(weather.temperature)}30`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h3" fontWeight="bold" color="text.primary">
                      {weather.city || 'Unknown City'}
                    </Typography>
                    {getWeatherIcon(weather.condition)}
                  </Box>

                  <Box display="flex" alignItems="baseline" mb={2}>
                    <Typography 
                      variant="h3" 
                      component="span" 
                      sx={{ 
                        color: getTemperatureColor(weather.temperature || 25),
                        fontWeight: 'bold'
                      }}
                    >
                      {weather.temperature || '--'}
                    </Typography>
                    <Typography variant="h5" component="span" color="text.secondary" ml={0.5}>
                      °C
                    </Typography>
                  </Box>

                  <Chip
                    label={weather.condition || 'Unknown'}
                    size="small"
                    sx={{ 
                      mb: 2,
                      backgroundColor: `${getTemperatureColor(weather.temperature || 25)}20`,
                      color: getTemperatureColor(weather.temperature || 25),
                      fontWeight: 'medium'
                    }}
                  />

                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Opacity sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.primary">
                        Humidity: {weather.humidity || '--'}%
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Speed sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.primary">
                        Wind: {weather.windSpeed || '--'} km/h
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.primary">
                        Visibility: {weather.visibility || '--'} km
                      </Typography>
                    </Box>
                  </Box>

                  {weather.description && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {weather.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WeatherSection;
