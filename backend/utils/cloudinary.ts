import {v2 as cloudinary} from 'cloudinary'

import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    api_key:process.env.COUDINARY_API_KEY,
    api_secret:process.env.COUDINARY_API_SECRET,
    cloud_name:process.env.COUDINARY_CLOUD_NAME
})

export default cloudinary;