import WriteOrder from "../models/write-order.model.js";
import strUtils from "../utils/str-utils.js";
import mongoose from "mongoose";

export  default {
  addProduct
};

/**
 * Get user in list
 * @param {*} identity
 * @returns
 */
async function getOne(identity, needLean = true) {
  const filter = { userId: identity };
  
  if (needLean) {
    return WriteOrder.findOne(filter).lean().exec();
  } else {
    return WriteOrder.findOne(filter).exec();
  }
}

/**
 * Add product
 * @param {*} data
 * @returns
 */

async function addProduct(userId, product) {
  // Not check exits product
  const currentField = await getOne(userId);
  if (currentField) { // Exits Field
    // Current list products
    const listProductsCurrent = currentField.listProducts;
    
    // Current product
    const productCurrent = listProductsCurrent?.find(
      ({ _id, skuVariant }) => _id === product._id && skuVariant === product.skuVariant
    );
    
    // Check
    if (productCurrent && productCurrent.skuVariant === productCurrent.skuVariant) {
      productCurrent.quantity = Number(productCurrent.quantity) + Number(product.quantity);
    } else {
      listProductsCurrent.push(product);
    }
    const updatedField = await WriteOrder.findByIdAndUpdate(currentField._id, currentField, { new: false });
    return updatedField;
  } else { // Add normal
    const field = new WriteOrder({
      _id: new mongoose.Types.ObjectId(),
      userId,
      listProducts: product
    })
    
    return  field.save();
  }
}