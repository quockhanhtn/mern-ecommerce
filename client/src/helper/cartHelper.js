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
