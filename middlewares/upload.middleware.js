const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:"dnfeo5ce9",
    api_key:"262367665752528",
    api_secret:"xpnLEFUJHLJjRdDemkn9LG2ViXs"
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    folder:'app',
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
})

const upload = multer({ storage: storage });
module.exports = upload;