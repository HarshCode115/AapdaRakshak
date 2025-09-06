import React, { useEffect } from 'react'
import Homeslider from './Homeslider'
import HomeBigCard from './HomeBigCard'
import '../../styles/home.css'

import hbcdata from '../../assets/homebigdata/hbc.json'
import hbcimg1 from '../../assets/homebigdata/hbc1.webp'
import hbcimg2 from '../../assets/homebigdata/hbc2.jpg'
import hbcimg3 from '../../assets/homebigdata/hbc3.jpg'

function Home() {

  

  return (
    <div className='home-container'>
    
        <Homeslider></Homeslider>
        <h1 className='slogan'>A spirited effort from our side can surely reduce the ill-effects of the Disaster</h1>
        <HomeBigCard hbcdata={hbcdata[0]} hbcimg={hbcimg1} hbcrow={hbcdata[0].row}></HomeBigCard>
        <HomeBigCard hbcdata={hbcdata[1]} hbcimg={hbcimg2} hbcrow={hbcdata[1].row}></HomeBigCard>
        <HomeBigCard hbcdata={hbcdata[2]} hbcimg={hbcimg3} hbcrow={hbcdata[2].row}></HomeBigCard>
        
    </div>
  )
}

export default Home