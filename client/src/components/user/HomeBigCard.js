import React,{useState,useEffect} from 'react'
import '../../styles/homebigcard.css'
import Button from '@mui/material/Button';
import { set } from 'lodash';
import { useNavigate } from 'react-router-dom';



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


  const navigate = useNavigate();

  const handleButtonClick = () => {
    const buttonText = hbcdata.button?.toLowerCase();
    
    const routeMap = {
      'donate now': '/donation',
      'volunteer now': '/volunteerform',
      'learn more': '/maps',
      'view map': '/disaster-map'
    };

    const route = routeMap[buttonText] || '/';
    navigate(route);
  };

  return (


    
    <div className='hbc-container' style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:`${flexDir}`}}>
      <div className='hbc-data'>
      <h1>{hbcdata.head}</h1>
      <p>{hbcdata.data}</p>
      {
        hbcdata.button === "none" ? null : (
          <Button 
            variant="contained" 
            onClick={handleButtonClick}
            sx={{
              mt: 2,
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            {hbcdata.button}
          </Button>
        )
      }
      </div>
      <div className="vl"></div>
      <div className='hbc-img'>
        <img src={hbcimg} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  )
}

export default HomeBigCard