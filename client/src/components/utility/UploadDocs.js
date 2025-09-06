import { head } from 'lodash';
import React, { useState } from 'react'
import axios from 'axios';
import env from 'react-dotenv'
function UploadDocs({setImage,image}) {
    console.log(env.presetKey);
    const presetKey = "wgc4hc4f";
    const cloudName = "dmvoptyem";
    // const [image,setImage] = useState([]);
   
    const handleChange=(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        const formData =  new FormData();

        formData.append('file',file);
        formData.append('upload_preset',presetKey);
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,formData)
        .then(res => {
            var arr = [...image];
            arr.push({name:res.data.original_filename,Url:res.data.secure_url})
            setImage(arr);
            console.log(res.data)
        })
        .catch(err => console.log(err));

        console.log(image);

    }

    
  return (
    <div style={{padding:'20px'}} className='ud-container'>
        <input type="file" accept="image/png, image/jpeg" name='image'  onChange={handleChange}/>
        
        <br />
        {
            
            image!=null?image.map((obj)=>(
                <div>{obj.name}</div>
            )):<></>
        }
    </div>
  )
}

export default UploadDocs