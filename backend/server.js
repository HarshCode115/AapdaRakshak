require('dotenv').config()
const express=require('express');
const cookieParser=require("cookie-parser");
const cors=require('cors')

const { createadmin } = require('./admin/routes/createadmin.route');
const { loginroute } = require('./admin/routes/login.route');
const user  = require('./user/routes/user.js');
const errorMiddleware=require("./user/middleware/error.js");
const {mains}=require('./admin/routes/main')
const { mongoose, isConnected } = require('./db/db');
const { payoutroute } = require('./admin/routes/payout.route');
const { googleuserroute } = require('./user/routes/googleuser.route');
const { checkuserroute } = require('./user/routes/checkuser.route');
const { adminalertroute } = require('./admin/routes/adminalert.route');
const { fundroute } = require('./admin/routes/fund.route');
const { donateroute } = require('./user/routes/donate.route');
const { volunteerroute } = require('./user/routes/volunteer.route');
const { alertRouter } = require('./user/routes/alert.route');
const { getalertroute } = require('./admin/routes/getalerts.route');
const { getvolunteerroute } = require('./admin/routes/getvolunter.route');
const { getfundroute } = require('./admin/routes/getfund.route');
const { maproute } = require('./user/routes/map.route');
const { createorderroute } = require('./user/routes/createorder.route');
const { verifypaymentroute } = require('./user/routes/verifypayment.route');
const disastersRoute = require('./routes/disasters.route');
const weatherRoute = require('./routes/weather.route');
const newsRoute = require('./routes/news.route');
const app=express();
const bodyparser=require('body-parser')
// Configure CORS with specific options
const corsOptions = {
    origin: function (origin, callback) {
        // Allow all origins for development
        // In production, replace '*' with your frontend URL
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'token'],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(bodyparser())
app.use(bodyparser.json())
app.use(express.json());
app.use(cookieParser());
app.use('/admin',loginroute)
app.use('/admin',createadmin)
app.use('/admin',payoutroute)
app.use('/user',user)
app.use('/user',googleuserroute)
app.use('/user',checkuserroute)
app.use('/admin',adminalertroute)
app.use('/admin',getalertroute)
app.use('/user',fundroute)
app.use('/user', volunteerroute);
app.use('/user', donateroute);
app.use('/user', maproute);
app.use('/user', alertRouter);
app.use('/admin',getvolunteerroute)
app.use('/admin',getfundroute)
app.use('/user',createorderroute)
app.use('/us',verifypaymentroute)
app.use('/api', disastersRoute)
app.use('/api', weatherRoute)
app.use('/api', newsRoute)

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: isConnected() ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Simple test endpoint for frontend
app.get('/user/getdonate', (req, res) => {
    if (!isConnected()) {
        return res.json({ 
            message: 'Database not connected, returning mock data',
            data: []
        });
    }
    // If database is connected, handle normally
    res.json({ message: 'Database connected', data: [] });
});

app.use(errorMiddleware);

let PORT=process.env.PORT||5000
app.listen(PORT,(e)=>{
    console.log('App listening at '+PORT)
})     