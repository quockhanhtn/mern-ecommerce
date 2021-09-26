import mongoose from 'mongoose';
import Category from '../models/category.model.js';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';


const getFindOneFilter = (identity) => {
  const filter = {};

  if (strUtils.isUUID(identity)) {
    filter._id = identity;
  } else {
    filter.slug = identity;
  }

  return filter;
};


const getCategoryFromRequest = (req) => {
  let category = {};

  if (req.body.name) { category.name = req.body.name; }
  if (req.body.desc) { category.desc = req.body.desc; }

  if (req?.file?.path) {
    category.image = '/' + strUtils.replaceAll(req.file.path, '\\', '/');
  }
  return category;
};


const formatCategory = (category, req) => {
  if (category.image && category.image.startsWith('/')) {
    category.image = `${req.protocol}://${req.get('host')}${category.image}`;
  }
  return category;
}


export const getCategories = async (req, res) => {
  try {
    let categories = await Category.find({ parent: null }).sort({ createdAt: -1 }).lean().exec();
    if (categories && categories.length > 0) {
      resUtils.status200(res, null, categories.map(category => formatCategory(category, req)));
    } else {
      resUtils.status404(res, 'No categories found');
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const getCategory = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const category = await Category.findOne(filter);
    if (category) {
      resUtils.status200(res, `Get category '${category.name}' successfully!`, formatCategory(category, req));
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const createCategory = async (req, res) => {
  try {
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      ...getCategoryFromRequest(req)
    });

    if (req.body.parent) {
      const parent = await Category.findOne(getFindOneFilter(req.body.parent));
      if (parent) {
        category.parent = parent._id;
        await Category.findByIdAndUpdate(parent._id, { $addToSet: { children: category._id } });
      }
      else { resUtils.status400(res, `Parent category '${req.body.parent}' not found!`); }
    }

    const newCategory = await category.save();
    resUtils.status201(
      res,
      `Create NEW category '${newCategory.name}' successfully!`,
      formatCategory(newCategory, req)
    );
  } catch (err) { resUtils.status500(res, err); }
}


export const updateCategory = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    let updated = getCategoryFromRequest(req);

    const currentCategory = await Category.findOne(filter);
    if (req.body.parent && currentCategory.parent !== req.body.parent) {
      const parent = await Category.findOne(getFindOneFilter(req.body.parent));
      if (parent) {
        updated.parent = parent._id;
        await Category.findByIdAndUpdate(parent._id, { $addToSet: { children: currentCategory._id } });
        await Category.findByIdAndUpdate(currentCategory.parent, { $pull: { children: currentCategory._id } });
      }
      else { resUtils.status400(res, `Parent category '${req.body.parent}' not found!`); }
    }

    const updatedCategory = await Category.findOneAndUpdate(filter, updated, { new: true });
    if (updatedCategory) {
      resUtils.status200(
        res,
        `Update category '${updatedCategory.name}' successfully!`,
        formatCategory(updatedCategory, req)
      );
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const hiddenCategory = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const category = await Category.findOne(filter);
    const updatedCategory = !category ? null
      : await Category.findOneAndUpdate(filter, { isHide: !category.isHide }, { new: true });

    if (updatedCategory) {
      resUtils.status200(
        res,
        `${category.isHide ? 'Show' : 'Hide'} category '${updatedCategory.name}' successfully!`,
        formatCategory(updatedCategory, req)
      );
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}


export const deleteCategory = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const deletedCategory = await Category.findOneAndDelete(filter);
    if (deletedCategory) {
      resUtils.status200(res, `Deleted category '${deletedCategory.name}' successfully!`, deletedCategory);
    } else {
      resUtils.status404(res, `Category '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}