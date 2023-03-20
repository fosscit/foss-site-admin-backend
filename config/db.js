//Connection file to mongo db
import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  
  try {
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
