import fs from 'fs';
import path from 'path';
import multer from 'multer';
import strUtils from './str-utils.js';

const ROOT_UPLOAD_PATH = './public/uploads';
const MAX_UPLOAD_FILE_SIZE = 1024 * 1024;

if (!fs.existsSync(ROOT_UPLOAD_PATH)) { fs.mkdirSync(ROOT_UPLOAD_PATH); }


/**
 * Get Multer instance
 * 
 * @param {String}        customPath 
 * @param {allowedMimes}  allowedMimes 
 * @param {Number}        filePerReq Maximum number of parts (non-file fields + files). (Default: 1)
 * @returns Multer instance that provides several methods for generating
 * middleware that process files uploaded in `multipart/form-data` format.
 */
function multerUpload(customPath, allowedMimes = [], filePerReq = 1) {
  const uploadPath = path.join(ROOT_UPLOAD_PATH, customPath);
  if (!fs.existsSync(uploadPath)) { fs.mkdirSync(uploadPath); }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + strUtils.removeAccents(file.originalname));
    }
  });

  const uploadOptions = {
    storage: storage,
    limits: { files: filePerReq, fileSize: MAX_UPLOAD_FILE_SIZE }
  }

  if (allowedMimes && allowedMimes.length > 0) {
    uploadOptions.fileFilter = (req, file, cb) => {
      if (allowedMimes.includes(file.mimetype)) {
        // allow supported image files
        cb(null, true);
      } else {
        // throw error for invalid files
        cb(new Error('Invalid file type'));
      }
    };
  }

  return multer(uploadOptions);
}


export default multerUpload;