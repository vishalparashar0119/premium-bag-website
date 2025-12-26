import mongoose from 'mongoose';


const verifyEmailSchema = mongoose.Schema({
      fullName : String,
      email : String,
      otp : String,
      password: String,
      createdAt : {
            type: Date,
            default : Date.now,
            expires : 180
      }
});

const VerifyEmailModel = mongoose.model('verifyEmail' , verifyEmailSchema);

export default VerifyEmailModel;