const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./mealpass");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toString() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: "mealpass",
  limits: { fieldSize: 10 * 1024 * 1024 },
});

module.exports = upload;
