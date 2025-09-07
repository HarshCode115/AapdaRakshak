import React,{useState} from 'react'
import Popup from './PopupNew';
function RaiseFundBox({ isUserView = false }) {

  const [show,setShow] = useState(true);
  const [data,setData] = useState([
    {
      name:'Kuldeep',
      contact:1242354,
      address:'allhabad',
      accountNum:778847,
      accountHolder:'kullu',
      amount:1000,
      description:'paise chahiye',
      img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXA14c0roOUnYcw-bcaFiof0Lezw6fzi-_w&usqp=CAU','https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/12/23/8adf4e08-0649-11e9-b0d2-cf4a0f50367e_image_hires_232313.JPG?itok=dGr0h6ww&v=1545578598','https://images.unsplash.com/photo-1522770179533-24471fcdba45']
    },
    {
      name:'Rahul',
      contact:9098354,
      address:'kolkara',
      accountNum:44779047,
      accountHolder:'raj',
      amount:23000,
      description:'paise dedo',
      img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXA14c0roOUnYcw-bcaFiof0Lezw6fzi-_w&usqp=CAU','https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/12/23/8adf4e08-0649-11e9-b0d2-cf4a0f50367e_image_hires_232313.JPG?itok=dGr0h6ww&v=1545578598','https://images.unsplash.com/photo-1522770179533-24471fcdba45']
    }
  ])

  const [att,setAtt] = useState([
    
    'Name of Victim',
    'Contact Number',
    'Address',
      'Account Number',
      'Account Holder Name',
      'Amount (in Rs)',
      'Description',
      'Supported Documents'
    
  ])




  const handlePopup=()=>{
      setShow(true);
      console.log('making true');
  }

  return (
    <div className='admin-box'>
    <div className='top-bar'>
    <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>
      {isUserView ? 'View Raising Funds Requests' : 'Review Raising Funds requests'}
    </h5>
  </div>

  <div className='main-box'>
    
  {
data.map((obj)=>(
  <div onClick={handlePopup} className='box-child'>
  {show && <Popup heading={'Raise Fund Application'} data={obj} att={att}/>}
     
    </div>
))

      
    }   

  </div>
  </div>
  )
}

export default RaiseFundBox