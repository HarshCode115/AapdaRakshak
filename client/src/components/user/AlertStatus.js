import React, { useEffect, useState } from 'react'

function AlertStatus() {



  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>Alert Status</h5>
  </div>

  <div className='main-box'>
    
    {

      <div className='box-child'>
      <div className='left-child'>
        <h3>Status</h3>
        
      </div>
      <div className='right-child'>
        <h3>Title</h3>
        <h3>Type</h3>
        <h3>Location</h3>
      
      </div>
    </div>
    }
    

  </div>
  </div>
  )
}

export default AlertStatus