import cloudinary from "./cloudinary";

const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  const base63Image = Buffer.from(file.buffer).toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base63Image}`;

  const timestamp = Math.round(new Date().getTime() / 1000);
  const uploadResponse = await cloudinary.uploader.upload(dataUri, {
    timestamp,
    folder: "restaurants", 
  });

  return uploadResponse.secure_url;
};
export default uploadImageOnCloudinary