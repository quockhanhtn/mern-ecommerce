import mongoose from 'mongoose';
import Cart from '../models/cart.model.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import productService from './products.service.js';

const SELECTED_FIELDS = 'name variants.name variants.sku variants.variantName variants.price variants.marketPrice variants.thumbnail variants.sold variants.quantity';

export default {
  getCartItemsFromData,
  getCartItemsByUser,
  addItem,
  updateItemQty,
  removeItem,
  cleanCart
};

const formatResult = (product, sku, qty) => {
  if (!product) return null;

  const { variants, _id: uuId, ...otherProductInfo } = product;
  const variantInfo = variants.find(v => v.sku === sku);

  if (variantInfo) {
    return {
      productId: uuId,
      sku,
      qty,
      ...otherProductInfo,
      ...variantInfo
    };
  }
  return null;
};

async function getProductInfo(productId, sku, notClean = true) {
  const product = await productService.getOneProduct(productId, false, notClean, SELECTED_FIELDS);
  if (!product) {
    throw ApiErrorUtils.simple(`Product ${productId} not found`, 404);
  }
  const variant = product?.variants.find((v) => v.sku === sku);
  if (!variant) {
    throw ApiErrorUtils.simple(`Variant sku=${sku} of product ${productId} not found`, 404);
  }
  return { product, variant };
}

async function getCartItemsFromData(items) {
  const filter = { '_id': { $in: items.map(i => i.productId) } };
  const { list: products } = await productService.getAllProducts({
    fields: SELECTED_FIELDS,
    limit: items.length,
    filter
  });

  let result = [];
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const currentProduct = products.find(p => p._id.toString() === element.productId.toString());
    result.push(formatResult(currentProduct, element.sku, element.qty));
  }

  return result.filter(i => i);
}

async function getCartItemsByUser(userId) {
  const filter = { userId };
  const populateOpts = [
    {
      path: 'items.productId',
      select: SELECTED_FIELDS,
      model: 'Product'
    }
  ];
  const cart = await Cart.findOne(filter).populate(populateOpts).lean().exec();
  return cart?.items?.map(item => formatResult(item.productId, item.sku, item.qty))
    .filter(i => i);
}

async function addItem(userId, productId, sku, qty = 1) {
  const { product, variant } = await getProductInfo(productId, sku, false);

  const userCart = await Cart.findOne({ userId });
  if (!userCart) {
    const newCart = new Cart({
      _id: new mongoose.Types.ObjectId(),
      userId,
      items: [{ productId, sku, qty }]
    });
    await newCart.save();
  } else {
    const itemInCart = userCart.items.find(i => i.productId.toString() === productId && i.sku === sku);
    if (itemInCart) {
      itemInCart.qty += qty;
      qty = itemInCart.qty;
    }
    else {
      userCart.items.push({ productId, sku, qty });
    }
    await userCart.save();
  }

  return formatResult(product, variant.sku, qty);
}

async function updateItemQty(userId, productId, sku, delta) {
  await getProductInfo(productId, sku);
  const userCart = await Cart.findOne({ userId });
  const item = userCart?.items?.find(i => i.productId.toString() === productId && i.sku === sku);
  if (!userCart || !item) {
    throw ApiErrorUtils.simple(`This item not exits in your cart`, 404);
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
    throw ApiErrorUtils.simple(`This item not exits in your cart`, 404);
  }
  return Cart.findByIdAndUpdate(userCart._id, { $pull: { items: { productId, sku } } }, { new: true });
}

async function cleanCart(userId) {
  const result = await Cart.findOneAndDelete({ userId });
  return !!result;
}