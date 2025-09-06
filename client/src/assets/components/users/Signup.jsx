import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import '../../styles/signup.scss'
import { AuthContext } from '../../context/AuthContext';
import { Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import googleIcon from '../../assets/icons/google.svg'
import Bg from '../../assets/login_pic.webp'
import axios from 'axios'
import Button from '@mui/material/Button';
// import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert'
import { useAlert } from 'react-alert'
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
var URL='http://localhost:5000/user/googleuser'
var URL1='http://localhost:5000/user/checkuser'
var URL2='http://localhost:5000/user/register'
// function Includes(){
  // }
  // Includes()
  const Signup = () => {
    // var alert=useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setmobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password2, setconfirmPassword] = useState('');
  const navigate = useNavigate();
  const { signup, googlesignin } = useContext(AuthContext);
  const [Otp,setotp]=useState('')
  const [cookies, setCookie] = useCookies(['userid']);

  const [open, setOpen] = useState(false);
  const handleGoogle = async (e) => {
    e.preventDefault();
    
    try {
      let userObj = await googlesignin();
      let uid = userObj.user.uid;
      if(userObj.user.uid){
        const result=await axios.post(URL,{
          email:userObj.user.email,
          name:userObj.user.displayName
        })
        if(result.data.flag){
          setCookie('userid',result.data.token,{path:'/',maxAge:10000000})
          return navigate("/");

        }
      }
      else{
        swal({
          title:'Network Error',
          icon:'error'
        })
      }

    } catch (err) {
      console.log(err);
      swal({
        title:err.message,
        icon:'error'
      })
      setError(err.message);

      setTimeout(() => {
        setLoading(false);
        setError('')
      }, 3000)
      return;
    }
  }
  const handleotpsubmit=async (e,otp_value)=>{
    let otp=document.getElementById('name').value;
    console.log(otp,Otp)
    try {
      e.preventDefault();
    if(otp!=Otp){
      return swal({
        title:'Otp is incorrect',
        icon:'error'
      })
    }
    else{
      const result=await axios.post(URL2,{
          name,email,mobile,password
      })
      if(result.data.flag){
         swal({
          title:result.data.message ,
          text:'Now you can login',
          icon:'success'
        })
        return navigate('/userlogin')
      }
    }
    } catch (error) {
      swal({
        title:error.response.data.message,
        icon:'error'
      })
    }
    
  }
 
  const handlesubmit=async (e)=>{
    try {
      e.preventDefault()
      if(!email||!name||!password||!password2||!mobile) return swal({title:'All fields are required',icon:'info'})
      if(password!==password2){
       return swal({
        title:'Password is not matching',
        icon:'info'
       })
      }
      const result=await axios.post(URL1,{
        email,name,password,mobile
      })
      if(result.data.flag){
        setotp(result.data.otp_value)
        return setOpen(true)
      }
      return swal({
        title:'some thing went wrong',
        error:'error'
      })
    } catch (error) {
      console.log(error);
      swal({
        title:error.response.data.message,
        icon:'error'
      })
    }
   
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView:{
      x:0,
      opacity:1,
    }}
  return (
    <> 
    <section className='signup-container'>
    <div className='signup-left'>
        <form className="signup">
        <motion.h2 {...options}>Sign Up</motion.h2>
        <motion.p {...options}
          transition={{
            delay:.2
          }}
        style={{fontSize:"20px"}}>Select Method to login :</motion.p>
        <IconButton id="googlebtn" onClick={handleGoogle} aria-label="delete" size="small" fullWidth={true}>
              <img id="googleIcon" src={googleIcon} alt="" /> Sign up with google
            </IconButton>
            <hr />
        <input type="text" placeholder='name' value={name} required onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password"  value={password2} required onChange={(e)=>setconfirmPassword(e.target.value)}/>
        <input type="number" placeholder="mobile"  value={mobile} required onChange={(e)=>setmobile(e.target.value)}/>
         <button onClick={handlesubmit} id='submitbtn'>Submit</button>
          <div class="links">
        <p>Already have an account?</p> <a href="/userlogin ">Log in</a>
          </div>
        </form>
      </div>
      <div className="signup-right">
      <img src={Bg} alt="" />
      </div>  
    </section>
    <Dialog open={open} >
        <DialogTitle>OTP</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please enter the otp sent at your email
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Enter OTP"
            type="NUMBER"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleotpsubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Signup