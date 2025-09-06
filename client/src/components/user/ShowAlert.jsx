import React from 'react'
import '../../styles/showalert.scss'

import hbcdata from '../../assets/homebigdata/hbc.json'
import ShowAlertCart from './ShowAlertCart'
import hbcimg1 from '../../assets/typhoon.jpg'

const ShowAlert = () => {
  return (
    <div className='showalert'>
        <div className='.showalert1'>
        <ShowAlertCart hbcdata={hbcdata[0]} hbcimg={hbcimg1} hbcrow={hbcdata[0].row}></ShowAlertCart>
        </div>
        </div>
  ) 
}

export default ShowAlert