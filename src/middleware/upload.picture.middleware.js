import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1000000, //10MB
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" || ext !== ".jpg" || ext !== ".svg" || ext !== ".jpeg")
      return cb(new ApiError(400, "Only Images are allowed"));
    cb(null, true);
  },
});

export { uploadPicture };
