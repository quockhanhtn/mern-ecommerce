import categoryService from '../services/categories.service.js';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';


const getCategoryFromRequest = (req) => {
  let category = {};
  if (req?.file?.path) {
    category.image = '/' + strUtils.replaceAll(req.file.path, '\\', '/');
  }
  return { ...req.body, ...category };
};


const formatCategory = (category, req) => {
  if (category.image && category.image.startsWith('/')) {
    category.image = req.headers.origin + category.image;
  }

  if (category.children && category.children.length > 0) {
    category.children = category.children.map(child => formatCategory(child, req));
  }

  return category;
}


export const getCategories = async (req, res, next) => {
  try {
    console.log(req.headers.origin);
    let categories = await categoryService.getAll();
    categories = categories.map(category => formatCategory(category, req));

    if (categories && categories.length > 0) {
      resUtils.status200(res, 'Gets all categories successfully', categories);
    } else {
      resUtils.status404(res, 'No categories found');
    }
  } catch (err) { next(err); }
}


export const getCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const category = await categoryService.getOne(identity);
    if (category) {
      resUtils.status200(res, `Get category '${category.name}' successfully!`, formatCategory(category, req));
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const createCategory = async (req, res, next) => {
  try {
    const createData = getCategoryFromRequest(req);
    const newCategory = await categoryService.create(createData);
    resUtils.status201(
      res,
      `Create NEW category '${newCategory.name}' successfully!`,
      formatCategory(newCategory, req)
    );
  } catch (err) { next(err); }
}


export const updateCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let updated = getCategoryFromRequest(req);

    const updatedCategory = await categoryService.update(identity, updated);
    if (updatedCategory) {
      resUtils.status200(
        res,
        `Update category '${updatedCategory.name}' successfully!`,
        formatCategory(updatedCategory, req)
      );
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const hiddenCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await categoryService.hidden(identity);

    if (result) {
      resUtils.status200(
        res,
        `${result.isHide ? 'Show' : 'Hide'} category '${result.name}' successfully!`,
        formatCategory(result, req)
      );
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const deleteCategory = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let result = await categoryService.remove(identity);

    if (result) {
      resUtils.status200(res, `Deleted category '${identity}' successfully!`);
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}
