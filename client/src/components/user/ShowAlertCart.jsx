
import React, { useState } from 'react';
// import './style.scss';
import '../../styles/showalertcart.scss';
import Fire from "../../assets/fire.webp";
import Flood from "../../assets/flood2.jpg";

const ShowAlertCart = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
      className="hover-component"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}>
      <div className="initial-content">
        <h2>ABOUT WildFire</h2>
        <p>Fires are a natural part of many ecosystems, but when they become uncontrolled, they can have devastating consequencesFires are a natural part of many ecosystems, but when they become uncontrolled, they can have devastating consequencesFires are a natural part of many ecosystems, but when they become uncontrolled</p>
      </div>
      {isHovered && (
        <div className="hovered-content">
          <h2>WildFire</h2>
          <p>If we look at the disasters that have taken place earlier, we can easily say that nature is not merely responsible for them to happen. They happen due to other reasons too. This is why we have classified them in different categories. First comes the natural disasters which are caused by natural processes. They are the most dangerous disaster to happen which causes loss of life and damage to the earth. Some of the deadliest natural disasters are earthquakes, floods, volcanic eruptions, hurricanes, and more.
               Furthermore, we have man-made disasters. They are the results of technological hazards or man’s carelessness. Some of the man-made disasters include fires, nuclear explosions or radiations, oil spills, transport accidents, terrorist attacks and more. Nature has little or no role to play in these types of disasters.</p>
          <img src={Fire}  style={{height:"200px" , marginRight:"10px"}} alt="" />
          <img src={Flood} style={{height:"200px" , marginRight:"10px"}} alt="" />
        </div>
      )}
    </div>
        
    </div>
  );
};

export default ShowAlertCart;

