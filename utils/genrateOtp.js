import crypto from 'crypto'

const otp = ()=>{
      const otp = crypto.randomInt(100000 , 1000000).toString();
      return otp;
}

export default otp;