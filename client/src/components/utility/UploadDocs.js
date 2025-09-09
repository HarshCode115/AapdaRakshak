import React from 'react';
import axios from 'axios';
import { Button, IconButton, Typography, Paper } from '@mui/material';
import { PictureAsPdf, Image, Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

function UploadDocs({ setImage, image }) {
    const presetKey = "wgc4hc4f";
    const cloudName = "dmvoptyem";
    
    const handleChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Validate file type (5MB max size)
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(file.type)) {
            toast.error('Only PDF, JPG, and PNG files are allowed');
            return;
        }
        
        if (file.size > maxSize) {
            toast.error('File size should be less than 5MB');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', presetKey);
        
        // Use raw_upload for PDFs to prevent automatic conversion
        const uploadUrl = file.type === 'application/pdf' 
            ? `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
            : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        
        try {
            const res = await axios.post(uploadUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            setImage(prev => [...prev, {
                name: res.data.original_filename || file.name,
                url: res.data.secure_url,
                type: file.type
            }]);
            
            toast.success('File uploaded successfully');
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('Failed to upload file. Please try again.');
        }
    };
    
    const removeFile = (index) => {
        const newFiles = [...image];
        newFiles.splice(index, 1);
        setImage(newFiles);
    };
    
    const getFileIcon = (fileType) => {
        if (fileType === 'application/pdf') return <PictureAsPdf color="error" style={{ marginRight: 8 }} />;
        return <Image color="primary" style={{ marginRight: 8 }} />;
    };

    return (
        <div style={{ padding: '16px 0' }}>
            <input 
                type="file" 
                id="file-upload"
                accept=".pdf,image/jpeg,image/png" 
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <label htmlFor="file-upload">
                <Button 
                    variant="contained" 
                    component="span"
                    color="primary"
                    style={{ marginBottom: '8px' }}
                >
                    Choose File (PDF, JPG, PNG)
                </Button>
            </label>
            <Typography variant="caption" display="block" color="textSecondary" style={{ marginBottom: '8px' }}>
                Max file size: 5MB
            </Typography>
            
            <div style={{ marginTop: '16px' }}>
                {image && image.map((file, index) => (
                    <Paper 
                        key={index}
                        elevation={1}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 12px',
                            marginBottom: '8px',
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        {getFileIcon(file.type)}
                        <Typography 
                            variant="body2" 
                            style={{ 
                                flex: 1, 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {file.name}
                        </Typography>
                        <IconButton 
                            size="small"
                            onClick={() => removeFile(index)}
                            style={{ padding: '4px' }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    </Paper>
                ))}
            </div>
        </div>
    );
}

export default UploadDocs;