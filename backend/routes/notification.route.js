const express = require('express');
const { notificationModel } = require('../models/notification.model');
const { adminalertmodel } = require('../models/adminalert.model');

const notificationroute = express.Router();

// Get notifications for a user
notificationroute.get('/notifications/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 20, unreadOnly = false } = req.query;

        const query = { userId };
        if (unreadOnly === 'true') {
            query.isRead = false;
        }

        const notifications = await notificationModel
            .find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('alertId');

        const totalCount = await notificationModel.countDocuments(query);
        const unreadCount = await notificationModel.countDocuments({ userId, isRead: false });

        res.json({
            success: true,
            data: {
                notifications,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    unreadCount
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Mark notification as read
notificationroute.patch('/notifications/:notificationId/read', async (req, res) => {
    try {
        const { notificationId } = req.params;
        
        await notificationModel.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Notification marked as read'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Mark all notifications as read for a user
notificationroute.patch('/notifications/:userId/read-all', async (req, res) => {
    try {
        const { userId } = req.params;
        
        await notificationModel.updateMany(
            { userId, isRead: false },
            { isRead: true }
        );

        res.json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Create notification (internal use)
async function createNotification(userId, title, message, type = 'general', priority = 'medium', alertId = null) {
    try {
        const notification = new notificationModel({
            userId,
            title,
            message,
            type,
            priority,
            alertId
        });

        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
}

// Broadcast notification to all users
async function broadcastNotification(title, message, type = 'alert', priority = 'high', alertId = null) {
    try {
        // Get all registered users (you might need to adjust this based on your user model)
        const { emailmodel } = require('../models/email.model');
        const users = await emailmodel.find();

        const notifications = users.map(user => ({
            userId: user.email, // Using email as userId for now
            title,
            message,
            type,
            priority,
            alertId
        }));

        await notificationModel.insertMany(notifications);
        return notifications.length;
    } catch (error) {
        console.error('Error broadcasting notification:', error);
        return 0;
    }
}

module.exports = { 
    notificationroute, 
    createNotification, 
    broadcastNotification 
};
