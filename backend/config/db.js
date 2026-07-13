import mongoose from 'mongoose';
import dns from 'dns';

// Bypass local ISP SRV lookup blocks by using Google DNS
if (dns && dns.setServers) {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (err) {
    // Ignore DNS error
  }
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/project_marketplace';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Ensure MongoDB is installed and running, or provide a valid MONGO_URI in .env');
    // We don't exit process in development to allow server to run and show nice database warning UI
  }
};

export default connectDB;
