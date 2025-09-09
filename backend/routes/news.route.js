const express = require('express');
const router = express.Router();

// Mock news data for disaster-related notifications
const mockNewsData = [
  {
    id: 'news_001',
    title: 'Flood Alert: Heavy Rainfall Expected in North India',
    description: 'Meteorological department issues flood warning for northern states as monsoon intensifies',
    category: 'weather',
    priority: 'high',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    source: 'IMD',
    location: 'North India',
    type: 'alert'
  },
  {
    id: 'news_002',
    title: 'Earthquake Preparedness Drive in Himalayan Region',
    description: 'NDMA conducts earthquake preparedness workshops in seismically active zones',
    category: 'safety',
    priority: 'medium',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    source: 'NDMA',
    location: 'Himalayan Region',
    type: 'information'
  },
  {
    id: 'news_003',
    title: 'Cyclone Tracking: Bay of Bengal Disturbance',
    description: 'Low pressure area over Bay of Bengal being monitored for potential cyclone formation',
    category: 'weather',
    priority: 'medium',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    source: 'IMD',
    location: 'Bay of Bengal',
    type: 'alert'
  },
  {
    id: 'news_004',
    title: 'Heat Wave Warning for Western States',
    description: 'Temperatures expected to soar above 45°C in Rajasthan and Gujarat',
    category: 'weather',
    priority: 'high',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    source: 'IMD',
    location: 'Western India',
    type: 'alert'
  },
  {
    id: 'news_005',
    title: 'Disaster Management Training Completed',
    description: '500+ volunteers trained in disaster response across 10 districts',
    category: 'training',
    priority: 'low',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    source: 'NDRF',
    location: 'Multiple States',
    type: 'information'
  }
];

// GET /api/news - Get all news/notifications
router.get('/news', (req, res) => {
  try {
    const { category, priority, limit } = req.query;
    let filteredNews = [...mockNewsData];
    
    // Filter by category if provided
    if (category) {
      filteredNews = filteredNews.filter(news => news.category === category);
    }
    
    // Filter by priority if provided
    if (priority) {
      filteredNews = filteredNews.filter(news => news.priority === priority);
    }
    
    // Limit results if provided
    if (limit) {
      filteredNews = filteredNews.slice(0, parseInt(limit));
    }
    
    // Sort by timestamp (newest first)
    filteredNews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({
      success: true,
      message: 'News fetched successfully',
      data: filteredNews,
      count: filteredNews.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news',
      error: error.message
    });
  }
});

// GET /api/news/:id - Get specific news item
router.get('/news/:id', (req, res) => {
  try {
    const newsItem = mockNewsData.find(news => news.id === req.params.id);
    
    if (!newsItem) {
      return res.status(404).json({
        success: false,
        message: 'News item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'News item fetched successfully',
      data: newsItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news item',
      error: error.message
    });
  }
});

// GET /api/news/alerts/active - Get active alerts only
router.get('/news/alerts/active', (req, res) => {
  try {
    const activeAlerts = mockNewsData.filter(news => 
      news.type === 'alert' && news.priority === 'high'
    );
    
    res.json({
      success: true,
      message: 'Active alerts fetched successfully',
      data: activeAlerts,
      count: activeAlerts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching active alerts',
      error: error.message
    });
  }
});

module.exports = router;
