import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/order_controller.dart';

class SelectPaymentListView extends StatelessWidget {
  SelectPaymentListView({Key? key}) : super(key: key);

  final OrderController orderController = Get.put(OrderController());

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildReceiveMethod(),
        _buildPaymentMethod(),
      ],
    );
  }

  Widget _buildReceiveMethod() {
    return ListView.builder(
      padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
      itemCount: 2,
      scrollDirection: Axis.vertical,
      itemBuilder: (BuildContext context, int index) {
        return Stack(
          alignment: Alignment.center,
          children: [
            Row(
              children: [
                GFRadio<bool>(
                  onChanged: (value) {
                    orderController.setIsReceiveAtStore(value);
                  },
                  value: index == 0 ? false : true,
                  size: GFSize.MEDIUM * 2 / 3,
                  radioColor: AppTheme.nearlyBlue,
                  activeBgColor: AppTheme.nearlyBlue.withOpacity(0.2),
                  activeBorderColor: AppTheme.nearlyBlue,
                  type: GFRadioType.basic,
                  groupValue: orderController.isReceiveAtStore.value,
                ),
                Text(index == 0 ? 'Giao nhận tơi' : 'Nhận tại cửa hàng'),
              ],
            )
          ],
        );
      },
    );
  }

  Widget _buildPaymentMethod() {
    return ListView.builder(
      padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
      itemCount: kOrderPaymentMethod.length,
      scrollDirection: Axis.vertical,
      itemBuilder: (BuildContext context, int index) {
        return Stack(
          alignment: Alignment.center,
          children: [
            Row(
              children: [
                GFRadio<String>(
                  onChanged: (value) {
                    orderController.setPaymentMethod(value);
                  },
                  value: kOrderPaymentMethod[index],
                  size: GFSize.MEDIUM * 2 / 3,
                  radioColor: AppTheme.nearlyBlue,
                  activeBgColor: AppTheme.nearlyBlue.withOpacity(0.2),
                  activeBorderColor: AppTheme.nearlyBlue,
                  type: GFRadioType.basic,
                  groupValue: orderController.paymentMethod.value,
                ),
                Text(kOrderPaymentMethod[index]),
              ],
            )
          ],
        );
      },
    );
  }
}
