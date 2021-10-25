import mongoose from 'mongoose';
import Category from '../models/category.model.js';
import strUtils from '../utils/str-utils.js';
// import imagesService from './images.service.js';

export default {
  getAll,
  getOne,
  getId,
  create,
  update,
  hidden,
  remove,
};

const SELECTED_FIELDS =
  '_id slug name desc isHide image parent children createdAt updatedAt';
// const POPULATE_OPTS = [
//   {
//     path: 'image',
//     select: 'dirPath ext hasSmall hasMedium hasLarge',
//     model: 'Image'
//   }
// ];

/**
 *
 * @returns all categories
 */
async function getAll() {
  return await Category.find({ parent: null })
    .select(SELECTED_FIELDS)
    // .populate(POPULATE_OPTS)
    .sort({ createdAt: -1 })
    .lean()
    .exec();
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

  return await Category.findOne(filter).lean().exec();
}

/**
 * Get id and check exist
 * @param {*} identity 
 * @returns _id of document if found, otherwise null
 */
async function getId(identity) {
  const filter = strUtils.isUUID(identity) ? { _id: identity } : { slug: identity };
  const result = await Category.findOne(filter).select('_id').lean().exec();
  return result ? result._id : null;
}

async function create(data) {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });

  if (data.parent) {
    const parent = await getOne(data.parent);
    if (parent) {
      category.parent = parent._id;
      await Category.findByIdAndUpdate(parent._id, {
        $addToSet: { children: category._id },
      });
    } else {
      throw new Error(`Parent category '${data.parent}' not found!`);
    }
  }
  return await category.save();
}

async function update(identity, updatedData) {
  const currentCategory = await getOne(identity);

  // // delete old image
  // if (
  //   currentCategory.image &&
  //   currentCategory.image?._id !== updatedData?.image
  // ) {
  //   await imagesService.remove(currentCategory.image._id);
  // }

  // update parent category
  if (updatedData.parent && currentCategory.parent !== updatedData.parent) {
    const parentFilter = strUtils.isUUID(updatedData.parent)
      ? { _id: updatedData.parent }
      : { slug: updatedData.parent };
    const parent = await Category.findOne(parentFilter);
    if (parent) {
      updatedData.parent = parent._id;
      await Category.findByIdAndUpdate(parent._id, {
        $addToSet: { children: currentCategory._id },
      });
      await Category.findByIdAndUpdate(currentCategory.parent, {
        $pull: { children: currentCategory._id },
      });
    } else {
      throw new Error(`Parent category '${updatedData.parent}' not found!`);
    }
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    currentCategory._id,
    updatedData,
    { new: true }
  );
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
    return Category.findByIdAndUpdate(
      category._id,
      { isHide: !category.isHide },
      { new: true }
    );
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
  return await Category.findOneAndDelete(filter);
}
