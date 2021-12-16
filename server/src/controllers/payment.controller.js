
import mongoose from 'mongoose';
import vnpayService from '../services/vnpay.service.js';
import Order from '../models/order.model.js';
import Payment from '../models/payment.model.js';
import constants from '../constants.js';


export const getVnpayResult = async (req, res, next) => {
  try {
    const result = await vnpayService.checkPaymentStatus(req.query);
    let message = '';

    if (result.isSuccess) {
      const paidDate = new Date(
        Number.parseInt(result.data.payDate.substring(0, 4)),
        Number.parseInt(result.data.payDate.substring(4, 6)),
        Number.parseInt(result.data.payDate.substring(6, 8)),
        Number.parseInt(result.data.payDate.substring(8, 10)),
        Number.parseInt(result.data.payDate.substring(10, 12)),
        Number.parseInt(result.data.payDate.substring(12, 14))
      );

      const order = await Order.findById(result.data.orderId);
      if (order.total === result.data.amount / 100) {
        // order.status = constants.ORDER.PAYMENT_STATUS.PAID;
        order.paymentStatus = constants.ORDER.PAYMENT_STATUS.PAID;
        await Order.updateOne({ _id: order._id }, order);
      }

      const payment = new Payment({
        _id: new mongoose.Types.ObjectId(),
        order: result.data.orderId,
        amount: result.data.amount,
        paidDate,
        desc: `
          Mã giao dịch VNPAY: ${result.data.transactionNo}
          Số tiền: ${result.data.amount}
          Mã Ngân hàng thanh toán: ${result.data.bankCode}
          Mã giao dịch tại Ngân hàng: ${result.data.bankTranNo}
          Loại tài khoản/thẻ khách hàng sử dụng: ${result.data.cardType}
        `
      });

      await payment.save();
      message = 'Thanh toán thành công';
    } else {
      message = 'Thanh toán thất bại';
    }

    // close window
    res.send(`
      <script>
        alert('${message}');
        window.open('${result.data.clientUrl}/order/${result.data.orderId}', '_self', '')
      </script>
    `);
  } catch (err) { next(err); }
};
