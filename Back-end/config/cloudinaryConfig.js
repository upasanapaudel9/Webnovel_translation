const cloudinary = require('cloudinary').v2;

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables. Please check your .env file.");
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (process.env.NODE_ENV !== 'production') {
    console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME); // Debug check
}

module.exports = cloudinary;
