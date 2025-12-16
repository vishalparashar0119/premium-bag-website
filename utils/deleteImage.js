import { v2 as cloudinary } from "cloudinary";

const deleteImageById = async (id) => {
      const deletedImage = await cloudinary.uploader.destroy(id);
      return deletedImage;
}

export default deleteImageById;