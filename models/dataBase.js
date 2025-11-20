import mongoose from "mongoose";

export  default connectDB =  async ()=>{
      try {
            await mongoose.connect(process.env.MONGODBURL , {
                  serverSelectionTimeoutMS : 5000
            }) 
            console.log('DataBase Connected Successfully');
      }catch(error){
            console.log('Error :: ', error)
      }
}