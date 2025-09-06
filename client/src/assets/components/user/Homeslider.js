import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/homeslider.css'
import Img0 from '../../assets/homeslider/img0.png';
import Img1 from '../../assets/homeslider/img1.png';
import Img2 from '../../assets/homeslider/img2.jpg';
import Img3 from '../../assets/homeslider/img3.png';
import Img4 from '../../assets/homeslider/img4.png';



export default function Homeslider() {
  var settings = {
    accessibility:true,
    dots: true,
    infinite: true,
    speed: 500,
    swipe:true,
    arrow:true,
    swipeToSlide:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    centerMode:true,
  fade:true,
  cssEase:'linear',
  centerPadding:'0px',
  };

  var imgArr = [Img0,Img1,Img2,Img3,Img4];

  return (
    <div className="slider-container">
    <Slider {...settings}>
      {
        imgArr.map((i)=>(
          <div id="each-slider">
           <img src={i} alt="" />
          </div>
        ))
      }
      
    </Slider>
    </div>
  );
}