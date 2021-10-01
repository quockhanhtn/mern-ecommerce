import mongoose from 'mongoose';
import Category from '../models/category.model.js';
import strUtils from '../utils/str-utils.js';

export default {
  getAll,
  getOne,
  create,
  update,
  hidden,
  remove
};

const SELECTED_FIELDS = '_id name slug isHide parent children';

/**
 * 
 * @returns all categories
 */
async function getAll() {
  let categories = await Category.find({ parent: null })
    .select(SELECTED_FIELDS)
    .sort({ createdAt: -1 })
    .lean().exec();
  return categories;
}

/**
 * Get category
 * @param {*} identity     
 * @returns 
 */
async function getOne(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  const category = await Category.findOne(filter);
  return category;
}


async function create(data) {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    ...data
  });

  if (data.parent) {
    const parent = await getOne(data.parent);
    if (parent) {
      category.parent = parent._id;
      await Category.findByIdAndUpdate(parent._id, { $addToSet: { children: category._id } });
    } else {
      throw new Error(`Parent category '${data.parent}' not found!`);
    }
  }

  const newCategory = await category.save();
  return newCategory;
}


async function update(identity, updatedData) {
  const currentCategory = await getOne(identity);
  if (updatedData.parent && currentCategory.parent !== updatedData.parent) {
    const parentFilter = strUtils.isUUID(updatedData.parent)
      ? { _id: updatedData.parent }
      : { slug: updatedData.parent };
    const parent = await Category.findOne(parentFilter);
    if (parent) {
      updatedData.parent = parent._id;
      await Category.findByIdAndUpdate(parent._id, { $addToSet: { children: currentCategory._id } });
      await Category.findByIdAndUpdate(currentCategory.parent, { $pull: { children: currentCategory._id } });
    } else {
      throw new Error(`Parent category '${updatedData.parent}' not found!`);
    }
  }

  const updatedCategory = await Category.findByIdAndUpdate(currentCategory._id, updatedData, { new: true });
  if (updatedCategory) {
    return updatedCategory;
  } else {
    throw new Error(`Category '${identity}' not found!`);
  }
}


/**
 * Toggle category isHide
 * @param {*} identity slug or id
 * @returns category if found and toggle isHide else null
 */
async function hidden(identity) {
  const category = await getOne(identity);
  if (category) {
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      { isHide: !category.isHide },
      { new: true }
    );
    return updatedCategory;
  }
  return null;
}

/**
 * Delete category
 * @param {*} identity  category id or slug 
 * @returns true if delete successfully else false
 */
async function remove(identity) {
  let filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const deletedCategory = await Category.findOneAndDelete(filter);
  return deletedCategory ? true : false;
}
