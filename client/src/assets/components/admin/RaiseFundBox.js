import React from 'react'

function RaiseFundBox() {
  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>Review Raising Funds requests</h5>
  </div>

  <div className='main-box'>
    
    {

      <div className='box-child'>
      <div className='left-child'>
        <h3>Name of Victim/Organization</h3>
        <h3>Amount Required</h3>
      </div>
      <div className='right-child'>
        <h3>username</h3>
        <h3>Email@gmail.com</h3>
        <h3>phonenumber</h3>

      </div>
    </div>
    }
    
    
    

  </div>
  </div>
  )
}

export default RaiseFundBox