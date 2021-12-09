import { redirectVnPay } from '../api';

export async function PaymentVnPay(values) {
  const info = {
    amount: 10000,
    bankCode: '',
    orderDescription: 'Thanh toan don hang thoi gian:',
    orderType: 'topup',
    language: 'vn'
  };
  const data = await redirectVnPay(info)
    .then((content) => content)
    .catch(() => {
      // log
    });
  return data.data;
}
