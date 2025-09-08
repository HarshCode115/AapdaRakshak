const axios = require('axios');

class DisasterAPIService {
    constructor() {
        // Using multiple APIs for comprehensive disaster data
        this.earthquakeAPI = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
        this.weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
        this.newsAPI = 'https://newsapi.org/v2/everything';
    }

    // Get recent earthquake data
    async getEarthquakeData() {
        try {
            const response = await axios.get(this.earthquakeAPI);
            return response.data.features.map(earthquake => ({
                id: earthquake.id,
                magnitude: earthquake.properties.mag,
                location: earthquake.properties.place,
                time: new Date(earthquake.properties.time),
                coordinates: earthquake.geometry.coordinates,
                type: 'earthquake',
                severity: this.getEarthquakeSeverity(earthquake.properties.mag)
            }));
        } catch (error) {
            console.error('Error fetching earthquake data:', error.message);
            return [];
        }
    }

    // Get weather alerts for a specific location
    async getWeatherAlerts(lat, lon, apiKey) {
        try {
            const response = await axios.get(this.weatherAPI, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: apiKey,
                    units: 'metric'
                }
            });

            const weather = response.data;
            const alerts = [];

            // Check for severe weather conditions
            if (weather.wind && weather.wind.speed > 15) {
                alerts.push({
                    type: 'high_wind',
                    severity: 'medium',
                    description: `High wind speeds: ${weather.wind.speed} m/s`,
                    location: weather.name
                });
            }

            if (weather.main && weather.main.temp > 40) {
                alerts.push({
                    type: 'extreme_heat',
                    severity: 'high',
                    description: `Extreme temperature: ${weather.main.temp}°C`,
                    location: weather.name
                });
            }

            return alerts;
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            return [];
        }
    }

    // Get disaster-related news
    async getDisasterNews(location, apiKey) {
        try {
            const query = `disaster OR earthquake OR flood OR cyclone OR wildfire ${location}`;
            const response = await axios.get(this.newsAPI, {
                params: {
                    q: query,
                    sortBy: 'publishedAt',
                    pageSize: 10,
                    apiKey: apiKey
                }
            });

            return response.data.articles.map(article => ({
                title: article.title,
                description: article.description,
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source.name
            }));
        } catch (error) {
            console.error('Error fetching disaster news:', error.message);
            return [];
        }
    }

    // Determine earthquake severity
    getEarthquakeSeverity(magnitude) {
        if (magnitude >= 7.0) return 'critical';
        if (magnitude >= 6.0) return 'high';
        if (magnitude >= 4.0) return 'medium';
        return 'low';
    }

    // Get comprehensive disaster data for a location
    async getDisasterDataForLocation(lat, lon, weatherApiKey, newsApiKey) {
        try {
            const [earthquakes, weatherAlerts, news] = await Promise.all([
                this.getEarthquakeData(),
                this.getWeatherAlerts(lat, lon, weatherApiKey),
                this.getDisasterNews(`${lat},${lon}`, newsApiKey)
            ]);

            // Filter earthquakes within 500km radius
            const nearbyEarthquakes = earthquakes.filter(eq => {
                const distance = this.calculateDistance(lat, lon, eq.coordinates[1], eq.coordinates[0]);
                return distance <= 500; // 500km radius
            });

            return {
                earthquakes: nearbyEarthquakes,
                weatherAlerts: weatherAlerts,
                news: news,
                location: { lat, lon }
            };
        } catch (error) {
            console.error('Error getting comprehensive disaster data:', error.message);
            return {
                earthquakes: [],
                weatherAlerts: [],
                news: [],
                location: { lat, lon }
            };
        }
    }

    // Calculate distance between two coordinates (Haversine formula)
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRadians(degrees) {
        return degrees * (Math.PI/180);
    }
}

module.exports = new DisasterAPIService();
