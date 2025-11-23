import mongoose from "mongoose";

const mongoUri = process.env.MONGODBURL || 'mongodb://localhost:27017/a-primium-bag-website';

const connectDb = async () => {
      try {
            await mongoose.connect(mongoUri, {
                  serverSelectionTimeoutMS: 5000
            })
            console.log('DataBase Connected Successfully');
      } catch (error) {
            console.log('Error ::', error)
      }
}

export default connectDb;