const express = require('express');
const disasterAPI = require('../services/disasterAPI');
const { adminalertmodel } = require('../models/adminalert.model');

const disasterroute = express.Router();

// Get disaster data for a specific location
disasterroute.get('/disaster-data/:lat/:lon', async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const weatherApiKey = process.env.WEATHER_API_KEY || 'demo_key';
        const newsApiKey = process.env.NEWS_API_KEY || 'demo_key';

        const disasterData = await disasterAPI.getDisasterDataForLocation(
            parseFloat(lat), 
            parseFloat(lon), 
            weatherApiKey, 
            newsApiKey
        );

        res.json({
            success: true,
            data: disasterData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get recent earthquakes globally
disasterroute.get('/earthquakes', async (req, res) => {
    try {
        const earthquakes = await disasterAPI.getEarthquakeData();
        res.json({
            success: true,
            data: earthquakes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get active alerts for map display
disasterroute.get('/active-alerts', async (req, res) => {
    try {
        const activeAlerts = await adminalertmodel.find({ 
            status: 'approved',
            $or: [
                { expiresby: -1 }, // Never expires
                { 
                    $expr: {
                        $gt: [
                            { $add: ['$createdby', '$expiresby'] },
                            { $divide: [Date.now(), 60000] }
                        ]
                    }
                }
            ]
        });

        res.json({
            success: true,
            data: activeAlerts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = { disasterroute };
