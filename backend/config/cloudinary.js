const cloudinaryModule = require ("cloudinary")
const cloudinary = cloudinaryModule.v2

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: 'dbrodzojb',
    api_key: '711888754738888',
    api_secret: 'mrUJHXublxXdJJoY5u-_BcH4DiA',
})

 module.exports = cloudinary;