import React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { 
  Warning, 
  VolunteerActivism as Volunteer, 
  AttachMoney, 
  Map, 
  Phone 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Warning />,
      label: 'Report Alert',
      color: 'error',
      path: '/alertsform'
    },
    {
      icon: <Volunteer />,
      label: 'Volunteer',
      color: 'primary',
      path: '/volunteerform'
    },
    {
      icon: <AttachMoney />,
      label: 'Donate',
      color: 'success',
      path: '/donation'
    },
    {
      icon: <Map />,
      label: 'View Map',
      color: 'info',
      path: '/maps'
    },
    {
      icon: <Phone />,
      label: 'Emergency: 112',
      color: 'error',
      action: () => window.open('tel:112')
    }
  ];

  const handleAction = (action) => {
    if (action.action) {
      action.action();
    } else if (action.path) {
      navigate(action.path);
    }
  };

  return (
    <Box className="quick-actions" mt={3}>
      <Grid container spacing={2} justifyContent="center">
        {actions.map((action, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              color={action.color}
              startIcon={action.icon}
              onClick={() => handleAction(action)}
              size="large"
              className="action-button"
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActions;
