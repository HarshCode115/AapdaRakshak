import React from 'react'
import Page1 from "../../assets/burger1.jpg";
import '../../styles/maps.scss'

const Maps = () => {
  


  return (
    <div className='maps' >
      <div className='first-div'>
      <h1>Disasters  Lists</h1>
      <ul className='list'>
        <li style={{color:'brown'}}>Earthquake</li>
        <li style={{color:'purple'}}>Tsunami</li>
        <li style={{color:'blue'}}>Floor</li>
        <li style={{color:'red'}}>Fire</li>
        <li style={{color:'green'}}>drought</li>
        <li style={{color:'chocolate'}}>landslide</li>
        <li style={{color:'coral'}}>typhoon</li>
        <li style={{color:'darkgoldenrod'}}>tornado</li>
      </ul>  
    </div>
    <div className='second-div'> 
    <img src={Page1} alt="Logo" />
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3dJ2rmgWK24iGmIDsNJBf9I9x2_m_-X8&callback=initMap&v=weekly"
      defer
    ></script>
    </div>
    </div>
  )
} 

export default Maps