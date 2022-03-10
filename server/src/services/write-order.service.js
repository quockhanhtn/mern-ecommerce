import WriteOrder from "../models/write-order.model.js";
import strUtils from "../utils/str-utils.js";
import mongoose from "mongoose";
import productService from "./products.service.js";

export  default {
  addProduct,
  getOne,
  deleteProduct,
  increaseProduct,
  decreaseProduct
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
  const productInDB = await productService.getOneProduct(product._id, true);
  const productInsert = productInDB?.variants.find((variant) => variant.sku === product.skuVariant);
  
  if (productInDB && productInsert) {
    if (currentField) { // Exits Field
      // Current list products
      const listProductsCurrent = currentField.listProducts;
    
      // Current product
      const productCurrent = listProductsCurrent?.find(
        ({ _id, skuVariant }) => _id === product._id && skuVariant === product.skuVariant
      );
    
      // Check
      if (productCurrent) {
        productCurrent.quantity = Number(productCurrent.quantity) + Number(product.quantity);
        productCurrent.name = productInDB.name;
        productCurrent.variantName = productInsert.variantName;
        productCurrent.price = productInsert.price;
        productCurrent.quantityAvailable = productInsert.quantity;
        productCurrent.thumbnail = productInsert.thumbnail;
      } else {
        const productAdd = {
          _id: product._id,
          name: productInDB.name,
          variantName: productInsert.variantName,
          skuVariant: productInsert.sku,
          quantity: product.quantity,
          price: productInsert.price,
          quantityAvailable: productInsert.quantity,
          thumbnail: productInsert.thumbnail
        }
        listProductsCurrent.push(productAdd);
      }
      const updatedField = await WriteOrder.findByIdAndUpdate(currentField._id, currentField, { new: false });
      return updatedField;
    } else { // Add normal
      const productAdd = {
        _id: product._id,
        name: productInDB.name,
        variantName: productInsert.variantName,
        skuVariant: productInsert.sku,
        quantity: product.quantity,
        price: productInsert.price,
        quantityAvailable: productInsert.quantity,
        thumbnail: productInsert.thumbnail
      }
      const field = new WriteOrder({
        _id: new mongoose.Types.ObjectId(),
        userId,
        listProducts: productAdd
      })
      return  field.save();
    }
  } else {
    throw new Error(`Product '${product.name}' not found!`);
  }
}

/**
 * Delete product
 * @param {*} data
 * @returns
 */

async function deleteProduct(userId, productInfo) {
  // Not check exits product
  const currentField = await getOne(userId);
  const productInDB = await productService.getOneProduct(productInfo.productId, true);
  const productDelete = productInDB?.variants.find((variant) => variant.sku === productInfo.skuVariant);
  if (productInDB && productDelete) {
    if (currentField) { // Exits Field
      // Current list products
      const listProductsCurrent = currentField.listProducts;
      
      // Current product
      const indexProduct = listProductsCurrent?.findIndex(
        ({ _id, skuVariant }) => _id === productInfo.productId && skuVariant === productInfo.skuVariant
      );
  
      listProductsCurrent.splice(indexProduct, 1);
      const updatedField = await WriteOrder.findByIdAndUpdate(currentField._id, currentField, { new: false });
      return updatedField;
    } else { // Add normal
      throw new Error(`Product not found!!!`);
    }
  } else {
    throw new Error(`Product not found!`);
  }
}

/**
 * Increase product
 * @param {*} data
 * @returns
 */

async function increaseProduct(userId, productInfo) {
  // Not check exits product
  const currentField = await getOne(userId);
  const productInDB = await productService.getOneProduct(productInfo.productId, true);
  const productInsert = productInDB?.variants.find((variant) => variant.sku === productInfo.skuVariant);
  
  if (productInDB && productInsert) {
    if (currentField) { // Exits Field
      // Current list products
      const listProductsCurrent = currentField.listProducts;
      
      // Current product
      const productCurrent = listProductsCurrent?.find(
        ({ _id, skuVariant }) => _id === productInfo.productId && skuVariant === productInfo.skuVariant
      );
      
      // Check
      if (productCurrent && productCurrent.quantity < productInsert.quantity) {
        productCurrent.quantity = Number(productCurrent.quantity) + 1;
      }
      const updatedField = await WriteOrder.findByIdAndUpdate(currentField._id, currentField, { new: true });
      return updatedField;
    } else {
      throw new Error(`Product  not found!`);
    }
  } else {
    throw new Error(`Product  not found!`);
  }
}

/**
 * Decrease product
 * @param {*} data
 * @returns
 */

async function decreaseProduct(userId, productInfo) {
  // Not check exits product
  const currentField = await getOne(userId);
  const productInDB = await productService.getOneProduct(productInfo.productId, true);
  const productInsert = productInDB?.variants.find((variant) => variant.sku === productInfo.skuVariant);
  
  if (productInDB && productInsert) {
    if (currentField) { // Exits Field
      // Current list products
      const listProductsCurrent = currentField.listProducts;
      
      // Current product
      const productCurrent = listProductsCurrent?.find(
        ({ _id, skuVariant }) => _id === productInfo.productId && skuVariant === productInfo.skuVariant
      );
      
      // Check
      if (productCurrent && productCurrent.quantity > 1) {
        productCurrent.quantity = Number(productCurrent.quantity) - 1;
      }
      const updatedField = await WriteOrder.findByIdAndUpdate(currentField._id, currentField, { new: true });
      return updatedField;
    } else {
      throw new Error(`Product  not found!`);
    }
  } else {
    throw new Error(`Product  not found!`);
  }
}