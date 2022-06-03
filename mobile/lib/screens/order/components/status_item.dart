import 'package:flutter/material.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/constants.dart';

class OrderStatusItem extends StatelessWidget {
  const OrderStatusItem({
    Key? key,
    required this.width,
    required this.data,
  }) : super(key: key);

  final double width;
  final String data;

  @override
  Widget build(BuildContext context) {
    Widget item = Text(data);

    int index = kOrderStatus.indexOf(data);
    if (index < 0) {
      item = Text(data);
    } else {
      List<Color> colors = [GFColors.WARNING, GFColors.INFO, GFColors.INFO, GFColors.SUCCESS, GFColors.DANGER];

      item = Container(
        margin: const EdgeInsets.all(2),
        padding: const EdgeInsets.all(3),
        decoration: BoxDecoration(
          border: Border.all(color: colors[index]),
          borderRadius: const BorderRadius.all(Radius.circular(10)),
        ),
        child: Text(kOrderStatusName[index]),
      );
    }

    return StatusItem(width: width, title: 'Trạng thái đơn hàng', item: item);
  }
}

class PaymentMethodItem extends StatelessWidget {
  const PaymentMethodItem({
    Key? key,
    required this.width,
    required this.data,
  }) : super(key: key);

  final double width;
  final String data;

  @override
  Widget build(BuildContext context) {
    Widget item = Text(data);
    int index = kOrderPaymentMethod.indexOf(data);
    if (index >= 0) {
      item = Container(
        margin: const EdgeInsets.all(2),
        padding: const EdgeInsets.all(3),
        decoration: BoxDecoration(
          border: Border.all(color: GFColors.SUCCESS),
          borderRadius: const BorderRadius.all(Radius.circular(10)),
        ),
        child: Text(kOrderPaymentMethodName[index]),
      );
    }
    return StatusItem(width: width, title: 'Phương thức thanh toán', item: item);
  }
}

class PaymentStatusItem extends StatelessWidget {
  const PaymentStatusItem({
    Key? key,
    required this.width,
    required this.data,
  }) : super(key: key);

  final double width;
  final String data;

  @override
  Widget build(BuildContext context) {
    Widget item = Text(data);

    int index = kOrderPaymentStatus.indexOf(data);
    if (index < 0) {
      item = Text(data);
    } else {
      List<Color> colors = [GFColors.WARNING, GFColors.SUCCESS, GFColors.DANGER];

      item = Container(
        margin: const EdgeInsets.all(2),
        padding: const EdgeInsets.all(3),
        decoration: BoxDecoration(
          border: Border.all(color: colors[index]),
          borderRadius: const BorderRadius.all(Radius.circular(10)),
        ),
        child: Text(kOrderPaymentStatusName[index]),
      );
    }
    return StatusItem(width: width, title: 'Trạng thái thanh toán', item: item);
  }
}

class StatusItem extends StatelessWidget {
  const StatusItem({
    Key? key,
    required this.width,
    required this.title,
    this.margin = const EdgeInsets.only(top: 2.5, bottom: 2.5),
    this.item = const SizedBox(),
  }) : super(key: key);

  final EdgeInsets margin;
  final double width;
  final String title;
  final Widget item;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      child: SizedBox(
        width: width,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
            ),
            item,
          ],
        ),
      ),
    );
  }
}
