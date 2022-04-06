import mongoose from 'mongoose';
import Cart from '../models/cart.model.js';
import ApiError from '../utils/APIError.js';
import StringUtils from '../utils/StringUtils.js';
import productService from './products.service.js';

export default {
  getCartItemsByUser,
  addItem,
  updateItemQty,
  removeItem,
  cleanCart
};

async function getProductInfo(productId, sku) {
  const product = await productService.getOneProduct(productId, false, true);
  if (!product) {
    throw ApiError.simple(`Product ${productId} not found`, 404);
  }
  const variant = product?.variants.find((v) => v.sku === sku);
  if (!variant) {
    throw ApiError.simple(`Variant sku=${sku} of product ${productId} not found`, 404);
  }
  return { product, variant };
}

async function getCartItemsByUser(userId) {
  const filter = { userId };
  const populateOpts = [
    {
      path: 'items.productId',
      select: 'name variants.name variants.sku variants.variantName variants.price variants.marketPrice variants.thumbnail variants.sold variants.quantity',
      model: 'Product'
    }
  ];
  const cart = await Cart.findOne(filter).populate(populateOpts).lean().exec();
  return cart?.items?.map(item => ({
    product: {
      ...item.productId,
      variants: item.productId.variants.filter(v => v.sku === item.sku)
    },
    sku: item.sku,
    qty: item.qty
  }));
}

async function addItem(userId, productId, sku, qty = 1) {
  const { product, variant } = await getProductInfo(productId, sku);

  const userCart = await Cart.findOne({ userId });
  if (!userCart) {
    const newCart = new Cart({
      _id: new mongoose.Types.ObjectId(),
      userId,
      items: [{ productId, sku, qty }]
    });
    await newCart.save();
    return true;
  } else {
    const itemInCart = userCart.items.find(i => i.productId.toString() === productId && i.sku === sku);
    if (itemInCart) {
      itemInCart.qty += qty;
    }
    else {
      userCart.items.push({ productId, sku, qty });
    }
    await userCart.save();
    return true;
  }
}

async function updateItemQty(userId, productId, sku, delta) {
  await getProductInfo(productId, sku);
  const userCart = await Cart.findOne({ userId });
  const item = userCart?.items?.find(i => i.productId.toString() === productId && i.sku === sku);
  if (!userCart || !item) {
    throw ApiError.simple(`This item not exits in your cart`, 404);
  }
  item.qty += delta;
  if (item.qty <= 0) {
    return Cart.findByIdAndUpdate(userCart._id, { $pull: { items: { productId, sku } } });
  } else {
    return userCart.save();
  }
}

/**
 * Delete product
 * @param {*} data
 * @returns
 */
async function removeItem(userId, productId, sku) {
  await getProductInfo(productId, sku);
  const userCart = await Cart.findOne({ userId });
  const item = userCart?.items?.find(i => i.productId.toString() === productId && i.sku === sku);
  if (!userCart || !item) {
    throw ApiError.simple(`This item not exits in your cart`, 404);
  }
  return Cart.findByIdAndUpdate(userCart._id, { $pull: { items: { productId, sku } } });
}

async function cleanCart(userId) {
  const result = await Cart.findOneAndDelete({ userId });
  return !!result;
}