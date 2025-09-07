import React, { useState, useContext } from 'react'
import {motion} from "framer-motion";
import '../../styles/userlogin.scss'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const UserLogin= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googlesignin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      swal({
        title: 'Please fill in all fields',
        icon: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      swal({
        title: 'Successfully logged in!',
        icon: 'success'
      });
      navigate('/');
    } catch (error) {
      swal({
        title: 'Login failed',
        text: error.message,
        icon: 'error'
      });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googlesignin();
      swal({
        title: 'Successfully logged in with Google!',
        icon: 'success'
      });
      navigate('/');
    } catch (error) {
      swal({
        title: 'Google sign-in failed',
        text: error.message,
        icon: 'error'
      });
    }
    setLoading(false);
  };

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
        <div className='userlogin-left'>
        <form className="userlogin" onSubmit={handleSubmit}>
        <motion.h2 {...options}>Log in to your Account </motion.h2>
        <motion.p {...options}
          transition={{
            delay:.2
          }}
        style={{fontSize:"25px"}}>Login here</motion.p>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span style={{display:"flex", justifyContent:"start",alignItems:"center"}}>
          <input type="checkbox"/>Remember me  
          <a style={{marginLeft:"60px"}} href="#">Forgot password</a>
        </span>
        <input type="submit" value={loading ? "Logging in..." : "Log In"} disabled={loading} />
        
        <button 
          type="button" 
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            marginTop: '10px',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
        
          <div className="links">
        <p>Don't have an account?</p> <a href="/usersignup">Create an account</a>
          </div>
          
          <div className="links" style={{marginTop: '10px'}}>
        <p>Are you an admin?</p> <a href="/adminlogin">Admin Login</a>
          </div>
        </form>
        </div>
        <div className='userlogin-right'>
        </div>
    </section>
    </>
  )
}

export default UserLogin

