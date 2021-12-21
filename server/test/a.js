const CART_LOCAL_STORAGE_KEY = 'cartLocalStorage';
const ORDER_LOCAL_STORAGE_KEY = 'orderLocalStorage';

export function addProductToCart(productObject) {
  const cartLocalStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
  const cartJson = JSON.parse(cartLocalStorage) || [];
  const product = cartJson?.find(({ _id, skuVariant }) =>
    _id === productObject._id
    && skuVariant === productObject.skuVariant
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

async function remove(imageId) {
  const image = await Image.findById(imageId);                                        // (1)
  if (image) {                                                                        // (2)
    const absImageDir = path.join(UPLOAD_DIR, image._id.toString());                  // (3)
    const absImageOriginal = path.join(process.cwd(), image.original.toString());     // (4)

    if (fs.existsSync(absImageDir)) {                                                 // (5)
      fs.rmdirSync(absImageDir, { recursive: true });                                 // (6)
    }
    if (fs.existsSync(absImageOriginal)) {                                            // (7)            
      fs.unlinkSync(absImageOriginal);                                                // (8)
    }
    await Image.deleteOne({ _id: imageId });                                          // (9)
    return true;                                                                      // (10) 
  }
  return false;                                                                       // (11)
}

async function checkPaymentStatus(vnpayResponse) {
  let vnp_Params = vnpayResponse;                                             // (1)
  const secureHash = vnp_Params['vnp_SecureHash'];                            // (2)
  delete vnp_Params['vnp_SecureHash'];                                        // (3)
  delete vnp_Params['vnp_SecureHashType'];                                    // (4)

  vnp_Params = sortObject(vnp_Params);                                        // (5)

  const signData = queryString.stringify(vnp_Params, { encode: false });      // (6)
  const hmac = crypto.createHmac('sha512', secretKey);                        // (7)
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');    // (8)

  if (secureHash === signed) {                                                // (9)
    const amount = vnp_Params['vnp_Amount'];                                  // (10)
    const txnRef = vnp_Params['vnp_TxnRef'];                                  // (11)
    const { orderId, clientUrl } = JSON.parse(
      Object.keys(queryString.parse(vnp_Params['vnp_OrderInfo']))[0]
    );                                                                        // (12)
    const payDate = vnp_Params['vnp_PayDate']; // yyyyMMddHHmmss              // (13)
    const bankCode = vnp_Params['vnp_BankCode'];                              // (14)
    const bankTranNo = vnp_Params['vnp_BankTranNo'];                          // (15)
    const cartType = vnp_Params['vnp_CardType'];                              // (16)
    const transactionNo = vnp_Params['vnp_TransactionNo'];                    // (17)

    let isSuccess = false, message = 'Payment failed';                        // (18)
    if (vnp_Params['vnp_TransactionStatus'] === '00') {                       // (19)
      isSuccess = true;                                                       // (20)
      message = 'Payment success';                                            // (21)
    }

    return {
      isSuccess,
      data: {
        amount, txnRef, orderId, clientUrl,
        payDate, bankCode, bankTranNo,
        cartType, transactionNo
      },
      message
    }                                                                         // (22)
  } else {
    return {
      isSuccess: false,
      message: 'Invalid secure hash',
    }                                                                         // (23)
  }
}

async function changePassword(userId, oldPassword, newPassword) {
  const user = await userService.getOneById(userId, '_id password emptyPassword');  // (1)
  if (!user) {                                                                      // (2)
    throw ApiError.simple2(responseDef.AUTH.USER_NOT_FOUND);                        // (3)
  }

  const updateData = {};                                                            // (4)
  if (user.emptyPassword) {                                                         // (5)
    updateData.emptyPassword = false;                                               // (6)
  } else {
    const isMatch = comparePassword(oldPassword, user.password);                    // (7)
    if (!isMatch) {                                                                 // (8)
      throw ApiError.simple2(responseDef.AUTH.INVALID_PASSWORD);                    // (9)
    }
  }

  if (oldPassword === newPassword) {                                                // (10)
    throw ApiError.simple2(responseDef.AUTH.PASSWORD_NOT_CHANGED);                  // (11)
  }

  if (newPassword === '' || newPassword === null) {                                 // (12)
    throw ApiError.simple2(responseDef.AUTH.PASSWORD_EMPTY);                        // (13)
  }

  if (newPassword.length < 6) {                                                     // (14)
    throw ApiError.simple2(responseDef.AUTH.PASSWORD_TOO_SHORT);                    // (15)
  }
  if (newPassword.length > 32) {                                                    // (16)
    throw ApiError.simple2(responseDef.AUTH.PASSWORD_TOO_LONG);                     // (17)
  }

  updateData.password = hashPassword(newPassword);                                  // (18)
  const result = await userService.updateById(user._id, updateData);                // (19)
  return result;                                                                    // (20)
}