const CART_LOCAL_STORAGE_KEY = 'cartLocalStorage';
const ORDER_LOCAL_STORAGE_KEY = 'orderLocalStorage';

export function addProductToCart(productObject) {
  const cartLocalStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const product = cartJson?.find(
    ({ _id, skuVariant }) => _id === productObject._id && skuVariant === productObject.skuVariant
  );
  if (product && product.skuVariant === productObject.skuVariant) {
    product.quantity += productObject.quantity;
  } else {
    cartJson.push(productObject);
  }
  const cart = JSON.stringify(cartJson);
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, cart);
  return cartJson;
}

export function getCart() {
  const cartLocalStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  const cartJson = JSON.parse(cartLocalStorage) || [];
  return cartJson;
}

export function removeProductInCart(_idProduct, skuVariantProduct) {
  const cartLocalStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const indexProduct = cartJson?.findIndex(
    ({ _id, skuVariant }) => _id === _idProduct && skuVariant === skuVariantProduct
  );
  cartJson.splice(indexProduct, 1);
  const cart = JSON.stringify(cartJson);
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, cart);
  return cartJson;
}

export function increaseProductInCart(_idProduct, skuVariantProduct) {
  const cartLocalStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const product = cartJson?.find(({ _id, skuVariant }) => _id === _idProduct && skuVariant === skuVariantProduct);
  if (product && product.skuVariant === skuVariantProduct) {
    product.quantity += 1;
  }
  const cart = JSON.stringify(cartJson);
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, cart);
  return cartJson;
}

export function decreaseProductInCart(_idProduct, skuVariantProduct) {
  const cartLocalStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const product = cartJson?.find(({ _id, skuVariant }) => _id === _idProduct && skuVariant === skuVariantProduct);
  if (product && product.skuVariant === skuVariantProduct) {
    product.quantity -= 1;
  }
  const cart = JSON.stringify(cartJson);
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, cart);
  return cartJson;
}

export function getSubTotal(cart) {
  let subTotal = 0;
  if (cart?.length > 0) {
    cart.forEach((item) => {
      subTotal += item.quantity * item.price;
    });
  }
  return subTotal;
}

export function nextStepOrder(step) {
  let activeStep = step;
  if (step < 3) {
    activeStep += 1;
  }
  localStorage.setItem('activeStep', activeStep);
  return activeStep;
}

export function backStepOrder(step) {
  let activeStep = step;
  if (step > 0) {
    activeStep -= 1;
  }
  localStorage.setItem('activeStep', activeStep);
  return activeStep;
}

export function getStepOrder() {
  const activeStep = localStorage.getItem('activeStep');
  // Current I not handler it and remove 0
  return 0;
}

export function saveBillingInfo(info) {
  const infoJson = JSON.stringify(info);
  localStorage.setItem(ORDER_LOCAL_STORAGE_KEY, infoJson);
}

export function getOrderInfo() {
  const info = localStorage.getItem(ORDER_LOCAL_STORAGE_KEY);
  const infoObject = JSON.parse(info) || {};
  return infoObject;
}

export function clearAfterOrder() {
  localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
  localStorage.removeItem(ORDER_LOCAL_STORAGE_KEY);
}
