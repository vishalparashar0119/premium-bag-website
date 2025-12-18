import { v2 as cloudinary } from 'cloudinary';

const copyImageToOrders = async (imageUrl) => {
  try {
    console.log('copy image function run');

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'orders',
      width: 300,
      height: 300,
      crop: 'fill',
      quality: 'auto:low',
      fetch_format: 'auto'
    });

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary copy error:', error);
  }
};

export default copyImageToOrders;
