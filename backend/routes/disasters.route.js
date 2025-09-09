const express = require('express');
const router = express.Router();

// Mock disaster data for India
const mockDisasters = [
  {
    id: 'disaster_001',
    type: 'flood',
    title: 'Severe Flooding in Assam',
    description: 'Heavy rainfall causing flood conditions in Yamuna river basin',
    location: {
      name: 'Assam, India',
      lat: 26.2006,
      lng: 92.9376,
      coordinates: [92.9376, 26.2006]
    },
    severity: 'HIGH',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    details: {
      magnitude: null,
      place: 'Assam river basin',
      casualties: '15 deaths, 50,000+ affected',
      impact: 'Widespread flooding affecting multiple districts',
      response: 'Emergency shelters established, rescue operations ongoing'
    }
  },
  {
    id: 'disaster_002',
    type: 'earthquake',
    title: 'Moderate Earthquake in Uttarakhand',
    description: 'Moderate earthquake hits northern India',
    location: {
      name: 'Uttarakhand, India',
      lat: 30.0668,
      lng: 79.0193,
      coordinates: [79.0193, 30.0668]
    },
    severity: 'MEDIUM',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    details: {
      magnitude: 5.8,
      place: 'Himalayan region, Uttarakhand',
      casualties: 'No casualties reported',
      impact: 'Minor structural damage in some areas',
      response: 'Assessment teams deployed'
    }
  },
  {
    id: 'disaster_003',
    type: 'cyclone',
    title: 'Cyclonic Storm Alert',
    description: 'Cyclonic circulation over Bay of Bengal, likely to intensify',
    location: {
      name: 'West Bengal, India',
      lat: 22.9868,
      lng: 87.8550,
      coordinates: [87.8550, 22.9868]
    },
    severity: 'HIGH',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    details: {
      magnitude: null,
      place: 'Bay of Bengal coast',
      casualties: 'Preventive evacuations underway',
      impact: 'Strong winds and heavy rainfall expected',
      response: 'Coastal areas on high alert, fishermen advised not to venture into sea'
    }
  },
  {
    id: 'disaster_004',
    type: 'landslide',
    title: 'Landslide in Himachal Pradesh',
    description: 'Heavy rains trigger landslides in hilly areas',
    location: {
      name: 'Himachal Pradesh, India',
      lat: 31.1048,
      lng: 77.1734,
      coordinates: [77.1734, 31.1048]
    },
    severity: 'MEDIUM',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    details: {
      magnitude: null,
      place: 'Shimla district',
      casualties: '3 missing, search operations ongoing',
      impact: 'Road connectivity disrupted',
      response: 'NDRF teams deployed for rescue operations'
    }
  },
  {
    id: 'disaster_005',
    type: 'drought',
    title: 'Drought Conditions in Maharashtra',
    description: 'Severe drought affecting agricultural areas',
    location: {
      name: 'Maharashtra, India',
      lat: 19.7515,
      lng: 75.7139,
      coordinates: [75.7139, 19.7515]
    },
    severity: 'HIGH',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    details: {
      magnitude: null,
      place: 'Marathwada region',
      casualties: 'Agricultural losses reported',
      impact: 'Crop failure, water scarcity in rural areas',
      response: 'Water tankers deployed, relief measures announced'
    }
  },
  {
    id: 'disaster_006',
    type: 'heatwave',
    title: 'Severe Heatwave in Rajasthan',
    description: 'Extreme temperatures affecting desert regions',
    location: {
      name: 'Rajasthan, India',
      lat: 27.0238,
      lng: 74.2179,
      coordinates: [74.2179, 27.0238]
    },
    severity: 'HIGH',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    details: {
      magnitude: null,
      place: 'Western Rajasthan',
      casualties: '8 heat-related deaths reported',
      impact: 'Temperatures exceeding 48°C, power outages',
      response: 'Cooling centers opened, health advisories issued'
    }
  }
];

// GET /api/disasters - Get all disasters
router.get('/disasters', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Disasters fetched successfully',
      data: mockDisasters,
      count: mockDisasters.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching disasters',
      error: error.message
    });
  }
});

// GET /api/disasters/:id - Get disaster by ID
router.get('/disasters/:id', (req, res) => {
  try {
    const disaster = mockDisasters.find(d => d.id === req.params.id);
    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: 'Disaster not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Disaster fetched successfully',
      data: disaster
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching disaster',
      error: error.message
    });
  }
});

// GET /api/disasters/type/:type - Get disasters by type
router.get('/disasters/type/:type', (req, res) => {
  try {
    const disasters = mockDisasters.filter(d => d.type === req.params.type);
    
    res.json({
      success: true,
      message: `${req.params.type} disasters fetched successfully`,
      data: disasters,
      count: disasters.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching disasters by type',
      error: error.message
    });
  }
});

module.exports = router;
