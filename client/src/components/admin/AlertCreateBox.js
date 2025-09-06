import React, { useEffect, useState } from 'react'
import PopupNew from './PopupNew';
function AlertCreateBox() {

  const [show,setShow] = useState(true);
  const [data,setData] = useState([
    {
      type:'',
      location:'',
      validfor:'',
      description:''
    }
  ])
  const [att,setAtt] = useState([
    
    'Type',
    'Location',
    'Valid for(in hours,no else fill NA)',
    'description',
  
  ])

  const handlePopup=()=>{
      setShow(true);
      console.log('making true');
  }

  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}> Create New Alert</h5>
  </div>

  <div className='main-box'>
  {
data.map((obj)=>(
  <div onClick={handlePopup} className='box-child'>
   {show && <PopupNew heading={'Alert !'} data={obj}  att={att}/>}
     
    </div>
))

      
    }

  </div></div>
  )
}

export default AlertCreateBox