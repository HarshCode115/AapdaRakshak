const { adminalertmodel } = require('../../models/adminalert.model');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Function to get coordinates from location name
async function getCoordinates(location) {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'
            }
        });

        if (response.data.status === 'OK' && response.data.results[0]) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        }
        return { latitude: 0, longitude: 0 }; // Default coordinates if geocoding fails
    } catch (error) {
        console.error('Geocoding error:', error);
        return { latitude: 0, longitude: 0 }; // Default coordinates on error
    }
}

async function createuseralert(req, res) {
    try {
        const { type, location, description, expiresby = 'NA' } = req.body;
        const { userid } = req.body; // Added by the validation middleware

        if (!type || !location || !description) {
            return res.status(400).json({
                message: "Type, location, and description are required fields",
                flag: false
            });
        }

        // Get coordinates from location
        const { latitude, longitude } = await getCoordinates(location);

        // Create a new alert with status 'pending' for user-submitted alerts
        const newAlert = await adminalertmodel.create({
            type,
            location,
            description,
            expiresby: expiresby === 'NA' ? -1 : expiresby * 60,
            status: 'pending', // Mark as pending for admin review
            createdByUser: true,
            userId: userid, // Store the user's ID for reference
            latitude,
            longitude
        });

        return res.status(201).json({
            message: 'Alert submitted for admin review',
            alert: newAlert,
            flag: true
        });

    } catch (error) {
        console.error('Error creating user alert:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
            flag: false
        });
    }
}

module.exports = { createuseralert };
