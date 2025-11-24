import bcrypt from 'bcrypt'

const comparePassword = async (plainPassword, hashedPassword) => {
      try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
      } catch (error) {
            console.log(error.message);
      }
}

export default comparePassword;