import React, { useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  Notifications,
  NotificationsActive,
  Warning,
  Info,
  CheckCircle,
  Error,
  MarkEmailRead
} from '@mui/icons-material';
import axios from 'axios';

const NotificationCenter = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      // Set up polling for new notifications
      const interval = setInterval(fetchNotifications, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Fetch disaster news and alerts
      const [newsResponse, alertsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/news').catch(() => ({ data: { data: [] } })),
        axios.get('http://localhost:5000/api/disasters').catch(() => ({ data: { data: [] } }))
      ]);
      
      const disasterNews = newsResponse.data.data || [];
      const activeDisasters = alertsResponse.data.data || [];
      
      // Convert to notification format
      const newsNotifications = disasterNews.map(news => ({
        _id: news.id,
        title: news.title,
        message: news.description,
        type: 'news',
        priority: news.severity?.toLowerCase() || 'medium',
        isRead: false,
        createdAt: news.timestamp || new Date().toISOString(),
        category: news.category,
        url: news.url
      }));
      
      const disasterNotifications = activeDisasters.map(disaster => ({
        _id: disaster.id,
        title: disaster.title,
        message: disaster.description,
        type: 'alert',
        priority: disaster.severity?.toLowerCase() || 'high',
        isRead: false,
        createdAt: disaster.timestamp,
        location: disaster.location
      }));
      
      // Combine and sort by timestamp
      const allNotifications = [...newsNotifications, ...disasterNotifications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
      
      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter(n => !n.isRead).length);
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback mock notifications
      setNotifications([
        {
          _id: 'mock_1',
          title: 'Flood Alert - Assam',
          message: 'Heavy rainfall causing floods in multiple districts',
          type: 'alert',
          priority: 'high',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      ]);
      setUnreadCount(1);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${notificationId}/read`);
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${userId}/read-all`);
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type, priority) => {
    const iconProps = { fontSize: 'small' };
    
    switch (type) {
      case 'alert':
        return priority === 'critical' ? 
          <Error {...iconProps} color="error" /> : 
          <Warning {...iconProps} color="warning" />;
      case 'donation':
        return <CheckCircle {...iconProps} color="success" />;
      default:
        return <Info {...iconProps} color="info" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ ml: 1 }}
      >
        <Badge badgeContent={unreadCount} color="error">
          {unreadCount > 0 ? <NotificationsActive /> : <Notifications />}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            overflow: 'hidden'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Notifications</Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                onClick={markAllAsRead}
                startIcon={<MarkEmailRead />}
              >
                Mark all read
              </Button>
            )}
          </Box>
        </Box>

        <Divider />

        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                No notifications yet
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification._id}
                  sx={{
                    backgroundColor: notification.isRead ? 'transparent' : 'action.hover',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.selected'
                    }
                  }}
                  onClick={() => !notification.isRead && markAsRead(notification._id)}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type, notification.priority)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: notification.isRead ? 'normal' : 'bold',
                            flex: 1,
                            mr: 1
                          }}
                        >
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.priority}
                          size="small"
                          color={getPriorityColor(notification.priority)}
                          sx={{ minWidth: 60 }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 0.5
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatTime(notification.createdAt)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {notifications.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Button size="small" onClick={handleClose}>
                View All Notifications
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};

export default NotificationCenter;
