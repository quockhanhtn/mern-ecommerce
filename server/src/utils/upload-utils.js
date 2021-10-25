import fs from 'fs';
import multer from 'multer';
import path from 'path';
import strUtils from './str-utils.js';

const ROOT_UPLOAD_PATH = './public/uploads';
const MAX_UPLOAD_FILE_SIZE = 1024 * 1024;

if (!fs.existsSync(ROOT_UPLOAD_PATH)) { fs.mkdirSync(ROOT_UPLOAD_PATH); }

export default {
  multerUpload,
  handleFilePath,
  clearUploadFile
}


/**
 * Get Multer instance
 * 
 * @param {String}        customPath 
 * @param {allowedMimes}  allowedMimes 
 * @param {Number}        filePerReq Maximum number of parts (non-file fields + files). (Default: 1)
 * @returns Multer instance that provides several methods for generating
 * middleware that process files uploaded in `multipart/form-data` format.
 */
export function multerUpload(customPath, allowedMimes = [], filePerReq = 1) {
  const uploadPath = path.join(ROOT_UPLOAD_PATH, customPath);
  if (!fs.existsSync(uploadPath)) { fs.mkdirSync(uploadPath); }

  const storage = multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '_';
      cb(null, uniquePrefix + strUtils.removeAccents(file.originalname));
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

export function handleFilePath(field) {
  return (req, res, next) => {
    if (typeof field === 'string') {        // single file upload
      if (req?.file?.path) {
        req.body[field] = '/' + strUtils.replaceAll(req?.file?.path, '\\', '/');
      }
    } else if (Array.isArray(field)) {  // multiple files upload 
      for (let i = 0; i < field.length; i++) {
        const f = field[i];
        if (req?.files?.[f.name] && req?.files?.[f.name].length > 0) {
          req.body[f.name] = req?.files?.[f.name].map(x => '/' + strUtils.replaceAll(x.path, '\\', '/'));
        }
      }
    }
    req.body.multerUpload = field;  // use to delete file upload if error occur
    next();
  };
}

export function clearUploadFile(req) {
  const field = req?.body?.multerUpload;
  const files = [];

  if (typeof field === 'string') {        // single file upload
    if (req?.file?.path) {
      files.push(req.body[field]);
    }
  } else if (Array.isArray(field)) {  // multiple files upload 
    for (let i = 0; i < field.length; i++) {
      const f = field[i];
      if (req.body[f.name] && req.body[f.name].length > 0) {
        req.body[f.name].forEach(item => files.push(item));
      }
    }
  }

  if (files.length > 0) {
    files.forEach(element => {
      const p = path.join(process.cwd(), element);
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
      }
    });
  }
}
