import React,{useState,useEffect} from 'react'
import '../../styles/homebigcard.css'
import Button from '@mui/material/Button';
import { set } from 'lodash';



function HomeBigCard({hbcdata,hbcimg,hbcrow}) {

 
  const [flexDir,setFlexDir] = useState('row');
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 821;

  useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);


  const handleResize = () => {
    if (window.innerWidth < breakpoint) {
      setFlexDir('column')
    } else {
      setFlexDir(hbcrow)
    }
  }

  useEffect(()=>{
    window.addEventListener("resize", handleResize)
    if(width<breakpoint)setFlexDir('column')
    else setFlexDir(hbcrow)
  },[])


  return (


    
    <div className='hbc-container' style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:`${flexDir}`}}>
      <div className='hbc-data'>
      <h1>{hbcdata.head}</h1>
      <p>{hbcdata.data}</p>
      {
        hbcdata.button == "none" ?" " : <Button variant="contained" >{hbcdata.button}</Button>
      }
      </div>
      <div className="vl"></div>
      <div className='hbc-img'>
        <img src={hbcimg} alt="" />
      </div>
    </div>
  )
}

export default HomeBigCard