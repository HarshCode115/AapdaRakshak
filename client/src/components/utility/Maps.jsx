import React, { Component, useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import Page1 from "../../assets/img1.jpg";
import { GoogleMap, LoadScript,Circle, Marker } from '@react-google-maps/api';
// import "./mapindex.js"
import "../../styles/maps.scss";
import axios from 'axios';
 const Maps = () => {
  let navigate=useNavigate();
  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  let link=`http://localhost:5000/user/showevent`
  
  const [data, setData] = useState('');

  // useEffect(()=>{

  //   fetch(link,{
  //     headers:{
  //       "Authorization":"Bearer"+localStorage.getItem("jwt")
  //     }
  //   }).then(res=>res.json())
  //   .then(result=>{
  //     if(!(result.success)){
        
  //       navigate("/signin");
  //     }
  //     setData(result.data)
  //     console.log(data)

      
  //   })
  // },[])
  


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