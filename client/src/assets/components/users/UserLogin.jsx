import React, { useState } from 'react'
import {motion} from "framer-motion";
import '../../styles/userlogin.scss'
import axios from "axios"
import swal from 'sweetalert'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
var URL='http://localhost:5000/user/login'
const UserLogin= () => {
  const navigate = useNavigate();
  const [email, setLoginEmail] = useState("");
  const [password, setLoginPassword] = useState("");
  const [cookies, setCookie] = useCookies([]);
  const inputEventPassword=(event)=>{
    setLoginPassword(event.target.value);  
  };
  const inputEventEmail=(event)=>{
    setLoginEmail(event.target.value);   
  };
  
  const loginSubmit=async(e)=>{
    e.preventDefault();
    const config ={headers:{"Content-Type":"application/json"}};
    try {
        const {data}=await axios.post(
            URL,
            {email,password},
            config
        )
        setCookie('userid',data.token,{path:'/',maxAge:10000000})
        navigate('/')
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
    <>  
    <section className='userlogin-container'>
        <form className="userlogin" >
        <motion.h2 {...options}>Log in to your Account </motion.h2>
        <motion.p {...options}
          transition={{
            delay:.2
          }}
        style={{fontSize:"25px"}}>Login here</motion.p>
        <input 
          type="text" 
          placeholder="Email"
          required
          value={email}
          onChange={inputEventEmail}
           />
        <input 
          type="password" 
          placeholder="Password"
          required
          value={password}
          onChange={inputEventPassword}
           />
        <span style={{display:"flex", justifyContent:"start",alignItems:"center"}}>  <a style={{marginLeft:"60px"}} href="#">Forgot password</a></span>
         <button onClick={loginSubmit}>Submit</button>
          <div class="links">
        <p>Don't have an account?</p> <a href="/signup">Create an account</a>
          </div>
        </form>
    </section>
    </>
  )
}

export default UserLogin









