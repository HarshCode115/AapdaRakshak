import React,{useState} from 'react'
import {motion} from "framer-motion";
import '../../styles/login.scss'
import axios from 'axios';
import swal from 'sweetalert'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Login= () => {
  const [cookies, setCookie] = useCookies([]);
  const [email,setEmail]=useState('')
  const [password,SetPassword]=useState('')
  const navigate=useNavigate();
  const handlesubmit=async (e)=>{
    e.preventDefault()
    try {
      const result=await axios.post('http://localhost:5000/admin/login',{
        email,password
      })
      if(result.data.flag===true){
        setCookie('token',result.data.token,{path:'/',maxAge:10000000})
        swal({
          title:'Successfully logged in',
          icon:'success'
        })
        return navigate('/')
      }
    } catch (error) {
      swal({
        title:error.response.data.message,
        icon:'error'
      })
    }
  }
  const options ={
    initial:{
      x:"-100%",
      opacity:0,
    },
    whileInView:{
      x:0,
      opacity:1,
    }}
  return (
     
    <div className='login-container'>
    <div className='login-left'>
        <form className="login">
        <motion.h2 {...options}>Welcome Admin</motion.h2>
        <motion.p {...options}
          transition={{
            delay:.2
          }}
        style={{fontSize:"25px"}}>Login here</motion.p>
        <input type="text" placeholder="Email"  required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" required onChange={(e)=>SetPassword(e.target.value)}/>
        <button onClick={handlesubmit}>Submit</button>
        </form>
      </div>
      <div className="login-right">
      </div>  
    </div>
  
  )
}

export default Login
