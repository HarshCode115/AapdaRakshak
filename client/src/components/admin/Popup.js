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

  let dataArr = Object.values(data);

  const[attribute,setAttribute]= useState(att);
  const[arr,setArr] = useState(dataArr);

console.log(data);
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
      <div className='left-child' >
      {
        arr.map((item,index) => (
        index<3?<>
         <h3> {item}</h3> 
        </>:''
        
      ))
      }
   
      </div>
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
     
      arr.slice(0,arr.length-1).map((item,index) => (
        <div style={{display:'flex',alignItems:'center',gap:'10px',margin:'10px'}}> <Typography style={{flex:1}}> {att[index]} </Typography> <TextField style={{flex:5}} value={arr[index]} onChange={(e)=>changeArr(e.target.value)} id="outlined-basic" label="" variant="outlined" /></div>
        
      ))
      
    }
        
     
      
      <div style={{display:'flex',alignItems:'center',gap:'10px',margin:'10px'}}> <Typography style={{flex:1}}> Supporting Documents </Typography> 
      <ImageList sx={{ width: 500, height: 450 }} cols={1} >
      {
        arr[arr.length-1].map((item) => (
        <ImageListItem key={item}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))
        
      }
    </ImageList>
</div>
      
      
      
      </CardContent>

      
      
    </Card>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color='error' onClick={handleReject} variant="contained">Reject</Button>
          <Button color='success' onClick={handleAccept} variant="contained">Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
