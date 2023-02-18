import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"/uploads/images");
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuidv4() + "." + ext);
  },
});

let fileUpload = multer({ storage });

export default fileUpload;
