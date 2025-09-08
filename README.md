
# 🚨 AapdaRakshak - Disaster Management Platform

AapdaRakshak is a comprehensive disaster management web platform designed to support government organizations and citizens during natural or man-made disasters.

## 🌟 Key Features

### 🛡️ Risk Mitigation & Preparedness
- **Real-time Disaster Alerts**: Integration with global earthquake APIs and weather services
- **Admin Alert System**: Government officials can create, approve, and broadcast verified alerts
- **SMS & Email Notifications**: Automatic notifications to users within disaster radius
- **In-app Notification Center**: Real-time push notifications for critical updates

### 🤝 Community Involvement
- **Donation Platform**: Secure Razorpay payment integration for disaster relief funds
- **Volunteer Registration**: Community members can register to help during emergencies
- **Fund Raising**: Create and manage fundraising campaigns for disaster victims

### 🔎 Post-Disaster Support
- **Interactive Maps**: View active alerts and disaster zones on Google Maps
- **Document Upload**: Cloudinary integration for sharing important documents
- **User Profiles**: Track donations, volunteer activities, and alert history

### 🏛️ Government-Focused
- **Admin Dashboard**: Comprehensive admin interface for alert management
- **Alert Approval Workflow**: Review, approve, or reject community-reported alerts
- **Analytics & Reporting**: Track alert effectiveness and community response

## 🚀 Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure access
- **Razorpay API** for payment processing
- **Fast2SMS API** for SMS notifications
- **Nodemailer** for email services
- **External APIs**: USGS Earthquake API, OpenWeather API, News API

### Frontend
- **React.js** with Material-UI components
- **React Router** for navigation
- **Axios** for API calls
- **Firebase** for user authentication
- **Google Maps API** for location services
- **Cloudinary** for file uploads

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AapdaRakshak
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URL=mongodb://localhost:27017/aptagaurd
jwt_key_admin=your_admin_jwt_secret
jwt_key_user=your_user_jwt_secret
mailpass=your_gmail_app_password
key_id=your_razorpay_key_id
key_secret=your_razorpay_key_secret
fastkey=your_fast2sms_api_key
WEATHER_API_KEY=your_openweather_api_key
NEWS_API_KEY=your_news_api_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Update `client/public/env.js`:
```javascript
window.env = {
  REACT_APP_RAZORPAY_KEY_ID: "your_razorpay_key_id",
  REACT_APP_API_BASE_URL: "http://localhost:5000",
  // Add other configuration as needed
};
```

### 4. Start the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# or
npx nodemon
```

**Frontend (Terminal 2):**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 API Configuration

### Required API Keys

1. **Razorpay**: Sign up at https://razorpay.com/
2. **Fast2SMS**: Get API key from https://www.fast2sms.com/
3. **OpenWeather**: Register at https://openweathermap.org/api
4. **News API**: Get key from https://newsapi.org/
5. **Firebase**: Set up project at https://console.firebase.google.com/
6. **Cloudinary**: Register at https://cloudinary.com/

## 📱 User Interfaces

### For Citizens
- **Home Dashboard**: View active alerts and recent disasters
- **Alert Reporting**: Report new disasters or emergencies
- **Donation Portal**: Contribute to relief funds with secure payments
- **Volunteer Registration**: Sign up to help during disasters
- **Profile Management**: Track activities and notifications

### For Administrators
- **Alert Management**: Create, review, approve/reject alerts
- **Fund Monitoring**: Track donations and fund distribution
- **Volunteer Coordination**: Manage volunteer applications
- **Analytics Dashboard**: View system statistics and reports

## 🔐 Security Features

- JWT-based authentication for both users and admins
- Payment signature verification for Razorpay transactions
- Input validation and sanitization
- CORS protection
- Environment variable protection for sensitive data

## 🌍 Disaster Monitoring Integration

- **Real-time Earthquake Data**: USGS Earthquake API integration
- **Weather Alerts**: OpenWeather API for severe weather conditions
- **News Integration**: Latest disaster-related news from News API
- **Geographic Targeting**: Location-based alert distribution

## 📊 Key Functionalities Implemented

✅ **Alert System**: Complete workflow from creation to approval and broadcasting  
✅ **Payment Integration**: Secure Razorpay payment gateway with verification  
✅ **SMS Notifications**: Automatic SMS alerts to users in affected areas  
✅ **Email Notifications**: Email alerts with detailed disaster information  
✅ **Real-time Data**: Integration with multiple disaster monitoring APIs  
✅ **Admin Dashboard**: Comprehensive admin interface for system management  
✅ **User Authentication**: Secure login system for both users and admins  
✅ **Responsive Design**: Mobile-friendly interface with Material-UI  
✅ **Notification Center**: In-app notification system with real-time updates  

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use local MongoDB
2. Configure environment variables on your hosting platform
3. Deploy to platforms like Heroku, AWS, or DigitalOcean

### Frontend Deployment
1. Build the React application: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Update API base URLs in environment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

For technical support or questions, please contact the development team or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**AapdaRakshak** - *Your Guardian Against Disasters* 🛡️
