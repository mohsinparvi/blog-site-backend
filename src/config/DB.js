import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("MongoDB connection FAILED: " + error);

    process.exit(1);
  }
};

export default connectDB;
