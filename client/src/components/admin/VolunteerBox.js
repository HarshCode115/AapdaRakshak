import React,{useState} from 'react'
import Popup from './PopupNew';
function VolunteerBox({ isUserView = false }) {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [data,setData] = useState([
    {
      id: 'vol_001',
      name:'Kuldeep Singh',
      type:'Food Distribution',
      location:'Delhi',
      contact:9876543210,
      address:'Connaught Place, New Delhi',
      description:'I want to help distribute food to disaster victims. I have experience working with NGOs and can coordinate with local teams.',
      status: 'pending',
      img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXA14c0roOUnYcw-bcaFiof0Lezw6fzi-_w&usqp=CAU','https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/12/23/8adf4e08-0649-11e9-b0d2-cf4a0f50367e_image_hires_232313.JPG?itok=dGr0h6ww&v=1545578598','https://images.unsplash.com/photo-1522770179533-24471fcdba45']
    },
    {
      id: 'vol_002',
      name:'Rahul Sharma',
      type:'Medical Assistance',
      location:'Mumbai',
      contact:9123456789,
      address:'Bandra West, Mumbai',
      description:'I am a qualified nurse and want to provide medical assistance during disasters. I have first aid certification.',
      status: 'pending',
      img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXA14c0roOUnYcw-bcaFiof0Lezw6fzi-_w&usqp=CAU','https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/12/23/8adf4e08-0649-11e9-b0d2-cf4a0f50367e_image_hires_232313.JPG?itok=dGr0h6ww&v=1545578598','https://images.unsplash.com/photo-1522770179533-24471fcdba45']
    },
    {
      id: 'vol_003',
      name:'Priya Patel',
      type:'Rescue Operations',
      location:'Ahmedabad',
      contact:9988776655,
      address:'Satellite, Ahmedabad',
      description:'I have swimming and rescue training. I want to help in flood rescue operations.',
      status: 'approved',
      img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXA14c0roOUnYcw-bcaFiof0Lezw6fzi-_w&usqp=CAU']
    }
  ])

  const [att,setAtt] = useState([ 
      'Name',
      'Type',
      'Location of volunteering',
      'Contact Number',
      'Address',
      'description',
      'Supporting Documents' 
  ])





  const handleVolunteerClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
  }

  const handleAccept = (volunteerId) => {
    setData(prev => prev.map(vol => 
      vol.id === volunteerId ? { ...vol, status: 'approved' } : vol
    ));
    setSelectedVolunteer(null);
  }

  const handleReject = (volunteerId) => {
    setData(prev => prev.map(vol => 
      vol.id === volunteerId ? { ...vol, status: 'rejected' } : vol
    ));
    setSelectedVolunteer(null);
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#ff9800';
    }
  }

  return (
    <div className='admin-box'>
      <div className='top-bar'>
        <h5 style={{fontSize:'1.2rem',padding:'0.6rem 0 0 1rem',fontWeight:'400'}}>
          {isUserView ? 'View Volunteer Applications' : 'Review Volunteer Applications'}
        </h5>
      </div>

      <div className='main-box' style={{padding: '20px'}}>
        {data.map((volunteer) => (
          <div 
            key={volunteer.id}
            onClick={() => handleVolunteerClick(volunteer)} 
            className='box-child'
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              margin: '10px 0',
              cursor: 'pointer',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h4 style={{margin: '0 0 5px 0', color: '#333'}}>{volunteer.name}</h4>
                <p style={{margin: '0 0 5px 0', color: '#666'}}>{volunteer.type}</p>
                <p style={{margin: '0', color: '#888', fontSize: '14px'}}>{volunteer.location}</p>
              </div>
              <div style={{
                padding: '4px 12px',
                borderRadius: '20px',
                backgroundColor: getStatusColor(volunteer.status),
                color: 'white',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                {volunteer.status}
              </div>
            </div>
          </div>
        ))}
        
        {selectedVolunteer && (
          <Popup 
            heading={'Volunteer Application'} 
            data={selectedVolunteer} 
            att={att}
            isUserView={isUserView}
            onAccept={() => handleAccept(selectedVolunteer.id)}
            onReject={() => handleReject(selectedVolunteer.id)}
            onClose={() => setSelectedVolunteer(null)}
          />
        )}
      </div>
    </div>
  )
}

export default VolunteerBox