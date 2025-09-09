import React, { useEffect, useState } from 'react'
import Homeslider from './Homeslider'
import HomeBigCard from './HomeBigCard'
import RecentDisasters from './RecentDisasters'
import ActiveAlerts from './ActiveAlerts'
import QuickActions from './QuickActions'
import WeatherSection from '../weather/WeatherSection'
import '../../styles/home.css'
import '../../styles/enhanced-home.css'
import '../../styles/improved-home.css'
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
      
      // Fetch all disasters data
      const disasterResponse = await axios.get('http://localhost:5000/api/disasters');
      if (disasterResponse.data.success) {
        const disasters = disasterResponse.data.data || [];
        
        // Process earthquake data for recent earthquakes section
        const earthquakes = disasters
          .filter(disaster => disaster.type === 'earthquake')
          .map(eq => ({
            id: eq.id,
            magnitude: eq.details?.magnitude?.toFixed(1) || 'N/A',
            location: eq.details?.place || 'Location not specified',
            time: eq.timestamp,
            severity: (eq.severity || 'medium').toLowerCase(),
            details: eq.details
          }));
        
        // Process all alerts (including non-earthquake events)
        const alerts = disasters.map(alert => ({
          id: alert.id,
          type: alert.type,
          title: alert.title,
          description: alert.description,
          location: alert.location,
          severity: alert.severity,
          timestamp: alert.timestamp || new Date().toISOString(),
          details: alert.details || {}
        }));
        
        // Remove duplicates based on ID and filter for active alerts
        const uniqueAlerts = Array.from(
          new Map(
            alerts
              .filter(alert => alert.severity === 'HIGH' || alert.severity === 'MEDIUM')
              .map(alert => [alert.id, alert])
          ).values()
        );
        
        setRecentEarthquakes(earthquakes);
        setActiveAlerts(uniqueAlerts);
      }
    } catch (error) {
      console.error('Error fetching disaster data:', error);
      // Set empty arrays in case of error to clear any previous data
      setRecentEarthquakes([]);
      setActiveAlerts([]);
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
        <h2 className='section-title'>🚨 Active Alerts</h2>
        <ActiveAlerts alerts={activeAlerts} loading={loading} />
      </section>

      {/* Weather Section */}
      <section className='weather-section'>
        <WeatherSection />
      </section>

      {/* Recent Disasters Section */}
      <section className='recent-disasters-section'>
        <h2 className='section-title'>📊 Recent India Disasters</h2>
        <RecentDisasters earthquakes={recentEarthquakes} loading={loading} />
      </section>

      {/* Information Cards */}
      <section className='info-cards-section'>
        <h2 className='section-title'>Together for Relief</h2>
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