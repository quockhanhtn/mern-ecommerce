import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import sharp from 'sharp';
import Image from '../models/image.model.js';
import StringUtils from '../utils/StringUtils.js';


export default {
  create,
  remove,
  formatPath
};


const IMAGE_SIZES = {
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 }
}

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) { fs.mkdirSync(UPLOAD_DIR); }

/**
 * Init file paths
 * @returns file paths in format {original, small, medium, large}
 */
function initFilePaths(saveDir, imageId, fExt) {
  const dirPath = path.join('/uploads', saveDir, imageId);
  const absDirPath = path.join(UPLOAD_DIR, saveDir, imageId);
  if (!fs.existsSync(absDirPath)) { fs.mkdirSync(absDirPath); }

  return {
    dirPath: StringUtils.replaceAll(dirPath, '\\', '/'),
    original: {
      absFilePath: path.join(absDirPath, 'original.' + fExt),
      filePath: StringUtils.replaceAll(path.join(dirPath, 'original.' + fExt), '\\', '/')
    },
    small: {
      absFilePath: path.join(absDirPath, 'small.' + fExt),
      filePath: StringUtils.replaceAll(path.join(dirPath, 'small.' + fExt), '\\', '/')
    },
    medium: {
      absFilePath: path.join(absDirPath, 'medium.' + fExt),
      filePath: StringUtils.replaceAll(path.join(dirPath, 'medium.' + fExt), '\\', '/')
    },
    large: {
      absFilePath: path.join(absDirPath, 'large.' + fExt),
      filePath: StringUtils.replaceAll(path.join(dirPath, 'large.' + fExt), '\\', '/')
    }
  };
}

/**
 *
 * @param {*}      sharpInput -  sharp input, read more at https://sharp.pixelplumbing.com/api-constructor
 * @param saveDir
 * @param imageId
 * @param isExistOriginal
 * @returns
 */
async function resizeWithSharp(sharpInput, saveDir, imageId, isExistOriginal) {
  let imageSharp = sharp(sharpInput);
  const imageInfo = await imageSharp.metadata();

  const resizeOptions = {
    kernel: sharp.kernel.nearest,
    fit: 'contain',
    position: 'center',
    background: { r: 255, g: 255, b: 255, alpha: 1 }                // white background
  };

  let fileExt = imageInfo.format;
  if (imageInfo.format === 'png') {
    imageSharp = imageSharp.png();
    resizeOptions.background = { r: 0, g: 0, b: 0, alpha: 0 };      // transparent background
  } else if (imageInfo.format !== 'svg') {
    imageSharp = imageSharp.webp({ quality: 90, lossless: true });
    fileExt = 'webp';
  }

  const filePaths = initFilePaths(saveDir, imageId, fileExt);

  // if file type is svg, we don't need to resize
  if (fileExt === 'svg' && isExistOriginal) {
    return {
      original: StringUtils.replaceAll(sharpInput, '\\', '/'),
      dirPath: filePaths.dirPath,
      ext: 'svg'
    };
  } else if (fileExt === 'svg') {
    await fs.promises.writeFile(filePaths.original.absFilePath, sharpInput);
    return {
      original: filePaths.original.filePath,
      dirPath: filePaths.dirPath,
      ext: 'svg'
    };
  }

  if (imageInfo.width >= IMAGE_SIZES.large.width || imageInfo.height >= IMAGE_SIZES.large.height) {
    // Save large image
    await imageSharp.resize(IMAGE_SIZES.large.width, IMAGE_SIZES.large.height, resizeOptions)
      .toFile(filePaths.large.absFilePath);
  } else { delete filePaths.large; }

  if (imageInfo.width >= IMAGE_SIZES.medium.width || imageInfo.height >= IMAGE_SIZES.medium.height) {
    // Save medium image
    await imageSharp.resize(IMAGE_SIZES.medium.width, IMAGE_SIZES.medium.height, resizeOptions)
      .toFile(filePaths.medium.absFilePath);
  } else { delete filePaths.medium; }

  if (imageInfo.width >= IMAGE_SIZES.small.width || imageInfo.height >= IMAGE_SIZES.small.height) {
    // Save small image
    await imageSharp.resize(IMAGE_SIZES.small.width, IMAGE_SIZES.small.height, resizeOptions)
      .toFile(filePaths.small.absFilePath);
  } else { delete filePaths.small; }

  if (isExistOriginal) {
    filePaths.original.filePath = '/' + StringUtils.replaceAll(sharpInput, '\\', '/');
    // move image to new location
    // const newPath = filePaths.original.absFilePath.replace(/\.[^/.]+$/, "") + path.extname(sharpInput);
    // fs.renameSync(
    //   path.join(process.cwd(), sharpInput),
    //   newPath
    // );
  } else {
    // Save original image if it's not exists
    await imageSharp.toFile(filePaths.original.absFilePath);
  }

  return {
    dirPath: filePaths.dirPath,
    ext: fileExt,
    original: filePaths.original.filePath,
    hasSmall: !!filePaths.small,
    hasMedium: !!filePaths.medium,
    hasLarge: !!filePaths.large
  };
}

/**
 * Get image info by id
 * @param {*} imageId - image id
 * @returns image info
 */
async function get(imageId) {
  const image = await Image.findById(imageId);
  return !!image ? formatPath(image, null) : null;
}

/**
 * Create new image
 * @param {*} data - image data, it can be filePath or base64 string
 * @param {*} saveDir - directory to save file
 * @param {*} isBase64 - is data base64 string, default true
 * @returns imageId
 */
async function create(data, saveDir, isBase64 = true) {

  // handle input is array
  if (data instanceof Array && data.length > 0) {
    let listImages = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const image = await create(element, saveDir, isBase64);
      listImages.push(image);
    }
    return listImages;
  }

  let inputData = null;
  if (isBase64) {
    const [_, mimeType, base64Encoded] = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!mimeType || !base64Encoded) { throw new Error('Invalid input string'); }
    inputData = Buffer.from(base64Encoded, 'base64');
  } else {
    inputData = data;
  }

  const imageId = new mongoose.Types.ObjectId();
  const paths = await resizeWithSharp(inputData, saveDir, imageId.toString(), !isBase64);

  const image = new Image({ ...paths, _id: imageId });
  await image.save();
  return imageId;
}

/**
 * Delete image
 * @param {*} imageId - image id
 * @returns true if success else false
 */
async function remove(imageId) {
  const image = await Image.findById(imageId);
  if (image) {
    const absImageDir = path.join(UPLOAD_DIR, image._id.toString());
    const absImageOriginal = path.join(process.cwd(), image.original.toString());

    console.log(absImageDir);
    if (fs.existsSync(absImageDir)) {
      fs.rmdirSync(absImageDir, { recursive: true });
    }
    if (fs.existsSync(absImageOriginal)) {
      fs.unlinkSync(absImageOriginal);
    }
    await Image.deleteOne({ _id: imageId });
    return true;
  }
  return false;
}

/**
 * Format image path
 * @param {*} imageObj      - image model instance
 * @param {*} headerOrigin  - header origin
 * @returns image model with new path
 */
function formatPath(imageObj, headerOrigin) {
  console.log(headerOrigin);
  const format = {
    original: headerOrigin + imageObj.original
  };
  if (imageObj.hasSmall) {
    format.small = `${headerOrigin}${imageObj.dirPath}/small.${imageObj.ext}`;
  }
  if (imageObj.hasMedium) {
    format.medium = `${headerOrigin}${imageObj.dirPath}/medium.${imageObj.ext}`;
  }
  if (imageObj.hasLarge) {
    format.large = `${headerOrigin}${imageObj.dirPath}/large.${imageObj.ext}`;
  }
  return format;
}
