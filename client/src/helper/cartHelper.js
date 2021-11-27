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

export function getFullProductByCart() {
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
