export function addProductToCartByLocalStorage(productObject) {
  const cartLocalStorage = localStorage.getItem('cartLocalStorage');
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
  localStorage.setItem('cartLocalStorage', cart);
  return cartJson;
}

export function getCart() {
  const cartLocalStorage = localStorage.getItem('cartLocalStorage');
  const cartJson = JSON.parse(cartLocalStorage) || [];
  return cartJson;
}

export function removeProductInCartByLocalStorage(_idProduct, skuVariantProduct) {
  const cartLocalStorage = localStorage.getItem('cartLocalStorage');
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const indexProduct = cartJson?.findIndex(
    ({ _id, skuVariant }) => _id === _idProduct && skuVariant === skuVariantProduct
  );
  cartJson.splice(indexProduct, 1);
  const cart = JSON.stringify(cartJson);
  localStorage.setItem('cartLocalStorage', cart);
  return cartJson;
}

export function increaseProductInCartLocalStorage(_idProduct, skuVariantProduct) {
  const cartLocalStorage = localStorage.getItem('cartLocalStorage');
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const product = cartJson?.find(({ _id, skuVariant }) => _id === _idProduct && skuVariant === skuVariantProduct);
  if (product && product.skuVariant === skuVariantProduct) {
    product.quantity += 1;
  }
  const cart = JSON.stringify(cartJson);
  localStorage.setItem('cartLocalStorage', cart);
  return cartJson;
}

export function decreaseProductInCartLocalStorage(_idProduct, skuVariantProduct) {
  const cartLocalStorage = localStorage.getItem('cartLocalStorage');
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const product = cartJson?.find(({ _id, skuVariant }) => _id === _idProduct && skuVariant === skuVariantProduct);
  if (product && product.skuVariant === skuVariantProduct) {
    product.quantity -= 1;
  }
  const cart = JSON.stringify(cartJson);
  localStorage.setItem('cartLocalStorage', cart);
  return cartJson;
}

export function getSubTotal(cart) {
  let subTotal = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      subTotal += item.quantity * item.price;
    });
  }
  return subTotal;
}

export function nextStepPayment(step) {
  let activeStep = step;
  if (step < 3) {
    activeStep += 1;
  }
  localStorage.setItem('activeStep', activeStep);
  return activeStep;
}

export function backStepPayment(step) {
  let activeStep = step;
  if (step > 0) {
    activeStep -= 1;
  }
  localStorage.setItem('activeStep', activeStep);
  return activeStep;
}

export function getStepPayment() {
  const activeStep = localStorage.getItem('activeStep');
  // Current I not handler it and remove 0
  return 0;
}

export function saveBillingInfo(info) {
  const infoJson = JSON.stringify(info);
  localStorage.setItem('billingInfo', infoJson);
}

export function getBillingInfo() {
  const info = localStorage.getItem('billingInfo');
  const infoObject = JSON.parse(info) || {};
  return infoObject;
}

export function completeOrder() {
  localStorage.removeItem('cartLocalStorage');
}
