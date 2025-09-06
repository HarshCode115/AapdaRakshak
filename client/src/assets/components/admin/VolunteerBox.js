import React from 'react'

function VolunteerBox() {
  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>Review Volunteer Application</h5>
  </div>

  <div className='main-box'>
    
    {

      <div className='box-child'>
      <div className='left-child'>
        <h3>Name</h3>
        <h3>Contact Number</h3>
        <h3>Type of Volunteering</h3>
        <h3>Location</h3>
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

export default VolunteerBox