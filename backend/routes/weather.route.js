const express = require('express');
const router = express.Router();

// Mock weather data for Indian cities
const mockWeatherData = {
  Delhi: {
    city: 'Delhi',
    temperature: 32,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 8,
    uvIndex: 7,
    icon: '⛅'
  },
  Mumbai: {
    city: 'Mumbai',
    temperature: 29,
    condition: 'Humid',
    humidity: 78,
    windSpeed: 15,
    pressure: 1011,
    visibility: 6,
    uvIndex: 8,
    icon: '🌫️'
  },
  Bangalore: {
    city: 'Bangalore',
    temperature: 26,
    condition: 'Pleasant',
    humidity: 60,
    windSpeed: 8,
    pressure: 1015,
    visibility: 10,
    uvIndex: 6,
    icon: '🌤️'
  },
  Chennai: {
    city: 'Chennai',
    temperature: 31,
    condition: 'Hot & Humid',
    humidity: 72,
    windSpeed: 18,
    pressure: 1009,
    visibility: 7,
    uvIndex: 9,
    icon: '☀️'
  },
  Kolkata: {
    city: 'Kolkata',
    temperature: 30,
    condition: 'Monsoon',
    humidity: 85,
    windSpeed: 10,
    pressure: 1008,
    visibility: 5,
    uvIndex: 5,
    icon: '🌧️'
  },
  Hyderabad: {
    city: 'Hyderabad',
    temperature: 28,
    condition: 'Clear',
    humidity: 55,
    windSpeed: 14,
    pressure: 1016,
    visibility: 12,
    uvIndex: 7,
    icon: '☀️'
  },
  Pune: {
    city: 'Pune',
    temperature: 27,
    condition: 'Mild',
    humidity: 58,
    windSpeed: 11,
    pressure: 1014,
    visibility: 9,
    uvIndex: 6,
    icon: '🌤️'
  },
  Ahmedabad: {
    city: 'Ahmedabad',
    temperature: 35,
    condition: 'Hot',
    humidity: 45,
    windSpeed: 16,
    pressure: 1012,
    visibility: 8,
    uvIndex: 10,
    icon: '🌡️'
  }
};

// GET /api/weather/:city - Get weather for specific city
router.get('/weather/:city', (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = mockWeatherData[city];
    
    if (!weatherData) {
      return res.status(404).json({
        success: false,
        message: 'Weather data not found for this city'
      });
    }
    
    res.json({
      success: true,
      message: 'Weather data fetched successfully',
      data: weatherData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
});

// GET /api/weather - Get weather for all cities
router.get('/weather', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Weather data fetched successfully',
      data: Object.values(mockWeatherData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
});

module.exports = router;
