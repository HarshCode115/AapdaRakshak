import React,{useState} from 'react'
import {motion} from "framer-motion"
import swal from 'sweetalert'
import useRazorpay from "react-razorpay";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

const DonationCard = ({extraData,itemNum,imagesrc,price,title,handler,delay=0}) => {
  const [open, setOpen] = useState(false);
  const [value,setvalue]=useState(0)
  const Razorpay = useRazorpay();
  const handlesubmit=async ()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const handleorder=async ()=>{
    try {
      let amount=document.getElementById('name').value;
      if(amount==0){
      return swal({
        title:'Please enter a valid amount',
        icon:'info'
      })
      }
      const res=await axios.post('http://localhost:5000/user/createorder',{
        useramount:amount,
        id:extraData._id
      })
      console.log(res.data);
      if(res.data.flag){
        const options = {
          key: "rzp_test_qFggyDGcfAObXr", 
          amount: amount, 
          currency: "INR",
          name: "AapdaRakshak",
          description: "Transaction for Donation",
          image: "https://img.freepik.com/free-vector/people-carrying-donation-charity-related-icons_53876-43091.jpg?w=900&t=st=1679788896~exp=1679789496~hmac=85a4ba65830910062e1a73884cea151b15b4b7eed47fc650ba244db736b8169d",
          order_id: res.data.id,
          prefill: {
            name: "User",
            email: "user@example.com",
            contact: "9999999999",
            method: "card" | "netbanking" | "wallet" | "emi" | "upi"
          },
          callback_url:'http://localhost:5000/us/verifypayment',
          header:{
            amount:50
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#065ad8",
          }
        };
      
        const rzp1 = new Razorpay(options);
      
        rzp1.on("payment.failed", function (response) {
          return swal({
            title:'Payment failed',
            icon:'error'
          })
        });
      
        rzp1.open();
      };
    } catch (error) {
      return swal({
        title:error.response.data.message,
        icon:'error'
      })
    }
  }
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