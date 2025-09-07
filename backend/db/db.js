const mongoose = require('mongoose');
require('dotenv').config()

let isConnected = false;

// MongoDB connection with fallback
const connectDB = async () => {
  try {
    // Try cloud MongoDB first
    await mongoose.connect("mongodb+srv://harshsrivastava123hs_db_user:Prankursrivastava1@aapdarakshak.hptxcb8.mongodb.net/aapdarakshak", {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.log("❌ MongoDB Atlas connection failed:", error.message);
    console.log("🔄 Trying local MongoDB...");
    
    try {
      // Fallback to local MongoDB
      await mongoose.connect("mongodb://localhost:27017/aapdarakshak", {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        bufferCommands: false,
        maxPoolSize: 10,
      });
      isConnected = true;
      console.log("✅ Connected to local MongoDB");
    } catch (localError) {
      console.log("❌ Local MongoDB connection failed:", localError.message);
      console.log("⚠️  Running without database connection");
      isConnected = false;
    }
  }
};

// Disable buffering to prevent timeout errors when not connected
mongoose.set('bufferCommands', false);

connectDB();

mongoose.connection.on('connected',()=>{
  console.log('connectes to data base')
})
mongoose.connection.on('error',(err)=>{
  console.log(err.message);
}) 
mongoose.connection.on('disconnected',()=>{
  console.log('db disconnected succesfully');
})

process.on('SIGINT',async ()=>{
  await mongoose.connection.close();
  process.exit(0);
})
// Export connection status checker and mongoose
const getConnectionStatus = () => isConnected;

module.exports = { 
  mongoose, 
  isConnected: getConnectionStatus 
};

