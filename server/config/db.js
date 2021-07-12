const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB is connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
