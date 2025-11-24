import bcrypt from 'bcrypt';


const genrateHash = async (password) => {
      try {
            const salt = await bcrypt.genSalt(11);
            const hash = await bcrypt.hash(password, salt);
            return hash;
      } catch (error) {
            throw error;
      }

}

export default genrateHash;