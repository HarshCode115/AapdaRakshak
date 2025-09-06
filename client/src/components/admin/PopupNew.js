import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Textarea from '@mui/joy/Textarea';

import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Data } from '@react-google-maps/api';
import axios from 'axios'
import { Cookies } from 'react-cookie';
const url="http://localhost:5000/admin"

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


export default function Popup({heading,data,att}) {
  const [open, setOpen] = useState(false);
  const cookie=new Cookies()
  let dataArr = Object.values(data);
  const [isnew,setIsnew] = useState(0);
  const[attribute,setAttribute]= useState(att);
  const[arr,setArr] = useState(dataArr);

  useEffect(()=>{
    
    setArr(dataArr);
  
   
  },[data])

  const changeArr = (e,index) => {
    let s = e.target.value;
    let newArr = [...arr];
    newArr[index] = s;
    setArr(newArr);
  };


  const handleClickOpen = () => {
    arr[0].length ? setIsnew(0) : setIsnew(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReject = ()  =>{
    setOpen(false);
  }

  const handleAccept = ()  =>{
    setOpen(false);
  }
  const handleCreate = async ()  =>{
console.log("handl change ")
    try {
      let token=cookie.get('token')
      console.log(token);
      console.log(arr)
      // const result =await axios.post(`${url}/createadminalert`,{

      // })
    } catch (error) {
      console.log(error.message);
    }

    setOpen(false);
  }


  const handleSubmit=()=>{

  }

  const handleChange=()=>{

  }


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <button  style={{width:"70vw",border:"none",background:"none" ,textAlign:'left'}} variant="outlined" onClick={handleClickOpen}>
      {
      arr[0].length ?
      <>
      <div className='left-child' >
      {
        arr.map((item,index) => (
        index<3?<>
         <h3> {item}</h3> 
        </>:''
        
      ))
      }
   
      </div>
      </>:
      <>
        <h2>Click here to Create a new Alert</h2>
      </>
      
      }
      </button>
      <Dialog  open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
fullWidth={true}
maxWidth='md'>

      <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Card >
      <Typography style={{margin:'10px 20px',texAlign:'center'}} variant="h5" component="div">
          {heading}
        </Typography>
      <CardContent>
    
    {
     
      arr.map((item,index) => (
        <div style={{display:'flex',alignItems:'center',gap:'10px',margin:'10px'}}> <Typography style={{flex:1}}> {att[index]} </Typography> <TextField style={{flex:5}} value={arr[index]} onChange={(e)=>changeArr(e,index)} id="outlined-basic" label="" variant="outlined" /></div>
      ))
      
    }
          
      
      
      </CardContent>

      
      
    </Card>
          </DialogContentText>
        </DialogContent>

        <DialogActions>

        {
          isnew==0?
          <>
          <Button color='error' onClick={handleReject} variant="contained">Reject</Button>
          <Button color='success' onClick={handleAccept} variant="contained">Accept</Button>
          </>:
          <>
          <Button color='error' onClick={handleReject} variant="contained">Cancel</Button>
          <Button color='success' onClick={handleCreate} variant="contained">Create</Button>
          </>
        }

          
          {/* <Button color='success' onClick={handleAccept} variant="contained">Accept</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
