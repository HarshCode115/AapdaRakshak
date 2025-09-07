import React, { useEffect, useState } from 'react'
import PopupNew from './PopupNew';
function AlertReviewBox({ isUserView = false }) {

  const [show,setShow] = useState(true);
  const [data,setData] = useState([
    {
      type:'flood',
      location:'jnu',
      validfor:'4',
      description:'hello'
    },
    {
      type:'rain',
      location:'delhi',
      validfor:'10',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, numquam! Quis voluptates id maxime ipsam blanditiis iure alias autem non dignissimos architecto impedit possimus itaque quod facilis eveniet, at officia totam maiores assumenda rem aliquid porro saepe? Quam magnam dicta quaerat, aut possimus a eaque iure fuga beatae quas? Rerum perferendis doloremque vel! Aut cumque ipsum consequatur doloremque, dolore iste id cupiditate porro debitis, tempore ab illo, dolor fugiat tenetur a temporibus. Natus cupiditate consectetur rem culpa. Nihil at, ullam officiis, reprehenderit hic, sapiente earum molestias itaque rerum dolore eius corporis impedit vero numquam. Nisi repellendus voluptate provident necessitatibus tempora?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae praesentium enim dignissimos tenetur amet iusto nobis quis quasi, debitis voluptates mollitia fugit a!'
    }
  ])
  const [att,setAtt] = useState([
    
      'Type',
      'Location',
      'Valid for(in hours, else fill NA)',
      'description',
    
  ])

  const handlePopup=()=>{
      setShow(true);
      console.log('making true');
  }

  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>
      {isUserView ? 'View Alert Requests' : 'Review Alert Requests'}
    </h5>
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

export default AlertReviewBox