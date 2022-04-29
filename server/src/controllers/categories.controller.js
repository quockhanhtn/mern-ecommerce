import categoryService from '../services/categories.service.js';
// import imagesService from '../services/images.service.js';
import ResponseUtils from '../utils/ResponseUtils.js';
import FormatUtils from '../utils/FormatUtils.js';

const formatCategory = (category, req) => {
  // if (category.image && category.image.startsWith('/')) {
  //   // console.log(`${req.protocol}://${req.get('host')}`);
  //   // category.image = imagesService.formatPath(category.image, `${req.protocol}://${req.get('host')}`);
  //   category.image = `${req.protocol}://${req.get('host')}` + category.image;
  // }
  category = FormatUtils.imageUrl(category, 'image', req);
  category = FormatUtils.imageUrl(category, 'coverImage', req);

  if (category.children && category.children.length > 0) {
    category.children = category.children.map((child) =>
      formatCategory(child, req)
    );
  }

  return category;
};


export const getCategories = async (req, res, next) => {
  try {
    const { fields } = req.query;
    let categories = await categoryService.getAll(fields);
    categories = categories.map((category) => formatCategory(category, req));

    if (categories && categories.length > 0) {
      ResponseUtils.status200(res, 'Gets all categories successfully', categories);
    } else {
      ResponseUtils.status200(res, 'No categories found', []);
    }
  } catch (err) { next(err); }
};


export const getCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const category = await categoryService.getOne(identity);
    if (category) {
      ResponseUtils.status200(
        res,
        `Get category '${category.name}' successfully!`,
        formatCategory(category, req)
      );
    } else {
      ResponseUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
};


export const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryService.create(
      req.body,
      req.user._id
    );
    ResponseUtils.status201(
      res,
      `Create NEW category '${newCategory.name}' successfully!`,
      formatCategory(newCategory, req)
    );
  } catch (err) { next(err); }
};


export const updateCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updatedCategory = await categoryService.update(
      identity,
      req.body,
      req.user._id
    );
    if (updatedCategory) {
      ResponseUtils.status200(
        res,
        `Update category '${updatedCategory.name}' successfully!`,
        formatCategory(updatedCategory, req)
      );
    } else {
      ResponseUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
};


export const hiddenCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await categoryService.hidden(identity);

    if (result) {
      ResponseUtils.status200(
        res,
        `${result.isHide ? 'Show' : 'Hide'} category '${result.name
        }' successfully!`,
        formatCategory(result, req)
      );
    } else {
      ResponseUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
};


export const deleteCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let result = await categoryService.remove(identity);

    if (result) {
      ResponseUtils.status200(res, `Deleted category '${identity}' successfully!`);
    } else {
      ResponseUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
};
