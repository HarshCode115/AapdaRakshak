import React from 'react'
import {motion} from "framer-motion"

const DonationCard = ({itemNum,imagesrc,price,title,handler,delay=0}) => {
  return (
    <motion.div
    className="menuCard"
    initial={{
      x:"-100%",
      opacity:0,
    }}
    whileInView={{
      x:0,
      opacity:1,
    }}
    transition={{
      delay,
    }}
    >
        <div>Item {itemNum}</div>
        <main>
            <img src={imagesrc} alt={itemNum}></img>
            <p>{title}</p>
            <button style={{width:"22vh"}}>Donate Now</button>
        </main>
    </motion.div>
  )
}

export default DonationCard