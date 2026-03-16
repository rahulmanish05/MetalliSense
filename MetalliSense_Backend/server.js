const dns = require('dns');

dns.setServers(['8.8.8.8','1.1.1.1']); // Google + Cloudflare DNS

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥');
  console.log('Error name:', err.name);
  console.log('Error message:', err.message);
  console.log('Stack trace:');
  console.log(err.stack);

  console.log('💥 Critical error - shutting down server...');
  process.exit(1);
});

const envPath = fs.existsSync('./.env') ? './.env' : './config.env';
dotenv.config({ path: envPath });
const app = require('./app');
const opcuaService = require('./services/opcuaService');
const { initializeFirebase } = require('./config/firebase');

// Initialize Firebase Admin
try {
  initializeFirebase();
} catch (error) {
  console.error('Failed to initialize Firebase:', error.message);
  console.log('⚠️  Server will continue without Firebase authentication');
}

if (!process.env.DATABASE) {
  throw new Error(
    `DATABASE is not defined in ${envPath}. Add DATABASE to your environment file.`,
  );
}

const DB = process.env.DATABASE.includes('Akilesh%40123')
  ? process.env.DATABASE.replace('Akilesh%40123', process.env.DATABASE_PASSWORD || '')
  : process.env.DATABASE;

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
  console.log(`App running on port ${port}...`);

  // Initialize OPC UA Server only (Client connection controlled by frontend)
  console.log('Initializing OPC UA Server...');
  const opcInitialized = await opcuaService.initializeServerOnly();
  if (opcInitialized) {
    console.log('✅ OPC UA Server ready (Client connection pending)');
  } else {
    console.log('❌ OPC UA Server failed to initialize');
  }
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    // Shutdown OPC UA Service
    opcuaService.shutdown().then(() => {
      process.exit(1);
    });
  });
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    opcuaService.shutdown().then(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  });
});
// Trigger restart
