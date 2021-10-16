import imagesService from "../services/images.service.js";

export const singleImageHandler = (field, dir) => async (req, _, next) => {
  let imageId;
  if (req?.file?.path) {
    imageId = await imagesService.create(req.file.path, dir, false);
  } else if (req.body[field + 'Base64']) {
    imageId = await imagesService.create(req.body[field + 'Base64'], dir);
  }
  req.body[field] = imageId;
  next();
};

export const imageHandler = () => (req, res, next) => {
  next();
}
