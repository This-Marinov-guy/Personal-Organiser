import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const s3Config = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  Bucket: process.env.BUCKET,
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.BUCKET,
  contentType: function (req, file, cb) {
    cb(null, "image/jpeg");
  },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, uuid() + ".jpeg");
  },
});

const fileUpload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

export default fileUpload;
