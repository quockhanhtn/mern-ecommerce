import crypto from 'crypto';
import queryString from 'query-string';
import dateFormat from 'dateformat';

const tmnCode = process.env.VNPAY_TMN_CODE;
const secretKey = process.env.VNPAY_SECRET;
let vnpUrl = process.env.VNPAY_URL;
const orderType = '110000'; // https://sandbox.vnpayment.vn/apis/docs/loai-hang-hoa/

export default {
  createPaymentUrl,
  checkPaymentStatus,
};

async function createPaymentUrl(ipAddress, apiUrl, orderId, orderPayAmount, language = 'vn') {
  const returnUrl = `${apiUrl}/payment/vnpay/callback`;

  const date = new Date();
  const createDate = dateFormat(date, 'yyyymmddHHmmss');
  const txnRef = dateFormat(date, 'HHmmss');

  let vnp_Params = {}
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Amount'] = orderPayAmount * 100;
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_Locale'] = language;
  vnp_Params['vnp_IpAddr'] = ipAddress;
  vnp_Params['vnp_OrderInfo'] = orderId;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_TxnRef'] = txnRef;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_OrderType'] = orderType;

  vnp_Params = sortObject(vnp_Params);

  const signData = queryString.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;

  const paymentUrl = vnpUrl + '?' + queryString.stringify(vnp_Params);
  return paymentUrl;
}

async function checkPaymentStatus(req, res) {
  let vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const signData = queryString.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  // if (secureHash === signed) {
  //   const urlSuccess = `${baseURLUI}/cart/payment`;
  //   res.redirect(`${urlSuccess}/${vnp_Params['vnp_TxnRef']}?code=${vnp_Params['vnp_ResponseCode']}`);
  // } else {
  //   const urlError = `${baseURLUI}/404`;
  //   res.redirect(urlError);
  // }
}

function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}