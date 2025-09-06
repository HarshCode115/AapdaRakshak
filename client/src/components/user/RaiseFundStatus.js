import React, { useEffect, useState } from 'react'

function RaiseFundStatus() {

  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>Raise Fund Status</h5>
  </div>

  <div className='main-box'>
    
    {

      <div className='box-child'>
      <div className='left-child'>
        <h3>Status</h3>
        
      </div>
      <div className='right-child'>
        <h3>Victim</h3>
        <h3>Amount</h3>
        <h3>Account Number</h3>
      
      </div>
    </div>
    }
    

  </div>
  </div>
  )
}

export default RaiseFundStatus