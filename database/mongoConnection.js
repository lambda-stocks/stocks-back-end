import mongoose from 'mongoose';
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/stocks';

// Connect to the database
try {
  // connection url, with an object of options as a second parameter
  mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('\n\u2705 Mongo Database connection successful\n');
} catch (err) {
  // catches any databse errors encountered
  console.log(`\n\u274C There was a mongo database connection error: ${err}\n`);
}
