import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/dist/uploads/images");
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuidv4() + '.' + ext);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
let fileUpload = multer({ storage, fileFilter });
export default fileUpload;
//# sourceMappingURL=file-upload.js.map