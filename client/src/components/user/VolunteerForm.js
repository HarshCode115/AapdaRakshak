import React,{useState}from 'react'
import '../../styles/volunteerform.css'
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import Img from '../../assets/sideimages/volunteerform.jpg'
import Button from '@mui/material/Button';
import UploadDocs from '../utility/UploadDocs';
import swal from 'sweetalert'
import {  Cookies } from 'react-cookie'
import axios from 'axios'
var URL='http://localhost:5000/user/volunteer'
function VolunteerForm() {
    const cookie=new Cookies();
    const [image,setImage] = useState([]);
    const [name,setName] = useState('');
    const [number,setNumber] = useState('');
    const [type,setType] = useState('');
    const [location,setLocation] = useState('');
    const [desc,setDesc] = useState('');

    const handleClick = async (e)=>{
        e.preventDefault();
        try {
            let token=cookie.get('userid')
            if(image.length!==0&&name&&number&&type&&location&&desc){
                await axios.post(URL,{
                    image,name,number,type,location,desc,token
                })
                return swal({
                    title:'Volunteer under review by admin',
                    icon:'Success'
                })
            }
            else{
                return swal({
                    title:'All fields are required',
                    icon:'error'
                })
            }
        } catch (error) {
            return swal({
                title:error.response.data.message,
                icon:'error'
            })
        }
    }

    return (
        
        <div className='volun-container'>
            <div className='volun-left'>
            <div className='formbox'>
                <h2>Please Fill Vounteer Form</h2>
                <div>
                    <h5>Name</h5>
                    <TextField size='small' id="outlined-basic" value={name} onChange={(e)=>setName(e.target.value)} label="" variant="outlined" />
                </div>
                
                <div>
                    <h5>Contact Number</h5>
                    <input type="number" value={number} onChange={(e)=>setNumber(e.target.value)} className='inputbox' />
                </div>
                <div>
                    <h5>Types of Volunteering</h5>
                    <TextField size='small' id="outlined-basic" value={type} onChange={(e)=>setType(e.target.value)} label="" variant="outlined" required />
                </div>
                <div>
                    <h5>Location (Area) for Volunteering</h5>
                    <TextField size='small' id="outlined-basic" value={location} onChange={(e)=>setLocation(e.target.value)} label="" variant="outlined" required />
                </div>
                <div>
                    <h5>Describe why you want to be a volunteer and what will you do as a volunteer</h5>
                    <Textarea 
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                    sx={{ width: 348 }}
                    id='outlined-basic'
                        placeholder=""
                        minRows={2}
                        maxRows={5}
                    />
                </div>
                <div>
                    <h5>Add Supporting Documents</h5>
                    <TextField size='small' id="outlined-basic" label="" variant="outlined" />
                    <UploadDocs setImage={setImage} image={image}></UploadDocs>
                </div>
                <div>
                <h5></h5>
                <Button onClick={handleClick} variant="contained" sx={{width:348,backgroundColor:'var(--col1)'}}>Submit</Button>
                </div>
                </div>
            </div>
            <div className='volun-right'>
                <img src={Img} alt="" />
            </div>
        </div>
    )
}

export default VolunteerForm