import React,{useEffect,useState} from "react";
import DonationCard from "./DonationCard";
import burger1 from "../../assets/burger1.jpg";
import burger2 from "../../assets/img1.jpg";
import burger3 from "../../assets/maps.jpg";
import Fab from '@mui/material/Fab';
import '../../styles/donation.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'
const Donation = () => {
  const addToCartHandler = (itemNum) => {};
  const [data,setData]=useState([]);
  const [supporting,setsupporting]=useState()
  const [des,setdes]=useState()
  const [vicname,setvicname]=useState()
  const [id,setid]=useState()
  const navigate = useNavigate();
  const handledata=(value)=>{
    setData(value)
  }
  useEffect(() => {
   const callfirst=async ()=>{
    try {
      var result= await axios.get('http://localhost:5000/user/getdonate')
      setData([...result.data.data])
      result=result.data.data;
      let len=result.length
      var arr=[]
      var arr2=[]
      var arr3=[]
      var arr4=[]
      for(let i=0;i<len;i++){
        arr.push(result[i].supportingdocs)
        arr2.push(result[i].desc)
        arr3.push(result[i].vicName)
        arr4.push(result[i]._id)

      }
      console.log(arr);
      setdes(arr2)
      setid(arr4)
      setvicname(arr3)
      setsupporting(arr)
      return result
    } catch (error) {
      console.log(error);
      return swal({
        title:'Something went wrong',
        icon:'error'
      })
    }
   }
   callfirst()
  
  },[])

 
  const handleRaise=()=>{
    navigate("/raisefund");
  }
  return (
    <section id="menu">
      <h1>DONATE</h1>
      <div className="raise"><Fab onClick={handleRaise} style={{padding:"0px 50px", backgroundColor:"rgb(232, 43, 43)"}} variant="extended">
        
        Raise Fund
       </Fab></div>
      {/* <div>
        {
          supporting.map((e)=>{
            <DonationCard
          itemNum={id[0]}
          imagesrc={e[0].Url}
          price={200}
          title={des[0]}
          handler={addToCartHandler}
          delay={0.1}
        />
          })
        }
        
      
      </div> */}
    </section> 
  );
};

export default Donation;