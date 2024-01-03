const multer = require("multer");

// storage- location and file name
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(1, file);
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(2, file);
    //img123       image-datetime-img123
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

// file filter - jpg jpeg png
const fileFilter = (req, file, callback) => {
  console.log(3, file);
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// multer middleware
const upload = multer({ storage, fileFilter });
module.exports = upload;
