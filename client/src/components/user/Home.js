import React, { useEffect, useState } from 'react'
import Homeslider from './Homeslider'
import HomeBigCard from './HomeBigCard'
import RecentDisasters from './RecentDisasters'
import ActiveAlerts from './ActiveAlerts'
import QuickActions from './QuickActions'
import '../../styles/home.css'
import '../../styles/enhanced-home.css'
import axios from 'axios'

import hbcdata from '../../assets/homebigdata/hbc.json'
import hbcimg1 from '../../assets/homebigdata/hbc1.webp'
import hbcimg2 from '../../assets/homebigdata/hbc2.jpg'
import hbcimg3 from '../../assets/homebigdata/hbc3.jpg'

function Home() {
  const [recentEarthquakes, setRecentEarthquakes] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisasterData();
  }, []);

  const fetchDisasterData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent earthquakes
      const earthquakeResponse = await axios.get('http://localhost:5000/api/earthquakes');
      if (earthquakeResponse.data.success) {
        setRecentEarthquakes(earthquakeResponse.data.data.slice(0, 5));
      }

      // Fetch active alerts
      const alertsResponse = await axios.get('http://localhost:5000/api/active-alerts');
      if (alertsResponse.data.success) {
        setActiveAlerts(alertsResponse.data.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching disaster data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home-container'>
      <Homeslider />
      
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>AapdaRakshak</h1>
          <p className='hero-subtitle'>Your Guardian Against Disasters</p>
          <p className='slogan'>A spirited effort from our side can surely reduce the ill-effects of disasters</p>
          <QuickActions />
        </div>
      </section>

      {/* Active Alerts Section */}
      <section className='alerts-section'>
        <h2 className='section-title'>🚨 Active Disaster Alerts</h2>
        <ActiveAlerts alerts={activeAlerts} loading={loading} />
      </section>

      {/* Recent Disasters Section */}
      <section className='recent-disasters-section'>
        <h2 className='section-title'>📊 Recent Global Disasters</h2>
        <RecentDisasters earthquakes={recentEarthquakes} loading={loading} />
      </section>

      {/* Information Cards */}
      <section className='info-cards-section'>
        <h2 className='section-title'>📚 Disaster Preparedness Guide</h2>
        <div className='info-cards-container'>
          <HomeBigCard hbcdata={hbcdata[0]} hbcimg={hbcimg1} hbcrow={hbcdata[0].row} />
          <HomeBigCard hbcdata={hbcdata[1]} hbcimg={hbcimg2} hbcrow={hbcdata[1].row} />
          <HomeBigCard hbcdata={hbcdata[2]} hbcimg={hbcimg3} hbcrow={hbcdata[2].row} />
        </div>
      </section>

      {/* Statistics Section */}
      <section className='stats-section'>
        <div className='stats-container'>
          <div className='stat-item'>
            <h3>24/7</h3>
            <p>Monitoring</p>
          </div>
          <div className='stat-item'>
            <h3>Real-time</h3>
            <p>Alerts</p>
          </div>
          <div className='stat-item'>
            <h3>Community</h3>
            <p>Support</p>
          </div>
          <div className='stat-item'>
            <h3>Emergency</h3>
            <p>Response</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home