import React, { useEffect, useState, useContext } from 'react'
import '../../styles/admin.css'
import Avatar from '@mui/material/Avatar';
import dp from '../../assets/img1.jpg'
import AlertReviewBox from '../admin/AlertReviewBox';
import AlertCreateBox from '../admin/AlertCreateBox';
import RaiseFundBox from '../admin/RaiseFundBox'
import VolunteerBox from '../admin/VolunteerBox'
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const [current, setCurrent] = useState('alertCreate');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    handleBack();
  }, [current])

  const handleCurrent = (val) => {
    document.getElementById(current).style.background = '#ffffff';
    setCurrent(val);
  }

  const handleBack = () => {
    document.getElementById(current).style.background = '#e0e0e0';
  }

  return (
    <div className='admin-container'>
      <div className='admin-left'>
        <li id='alertCreate' onClick={(e) => handleCurrent('alertCreate')}>Create New Alert</li>
        <li id='alertReview' onClick={(e) => handleCurrent('alertReview')}>View Alerts</li>
        <li id='raise' onClick={(e) => handleCurrent('raise')}>View Raising Funds</li>
        <li id='volunteer' onClick={(e) => handleCurrent('volunteer')}>View Volunteer Applications</li>
      </div>
      <div className='admin-right'>
        <div className='admin-top'>
          <Avatar
            alt="avatar"
            src={dp}
            sx={{ width: 150, height: 150, boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
          />
          <h2>{user?.displayName || user?.email || 'User'}</h2>
        </div>
        {(() => {
          switch (current) {
            case 'alertCreate':
              return <AlertCreateBox />
            case 'alertReview':
              return <AlertReviewBox isUserView={true} />
            case 'raise':
              return <RaiseFundBox isUserView={true} />
            case 'volunteer':
              return <VolunteerBox isUserView={true} />
            default:
              return <AlertCreateBox />
          }
        })()}
      </div>
    </div>
  )
}

export default UserProfile