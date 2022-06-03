import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/screens/check_out/components/custom_radio.dart';
import 'package:hk_mobile/size_config.dart';

class SelectPaymentListView extends StatelessWidget {
  SelectPaymentListView({Key? key}) : super(key: key);

  final OrderController orderController = Get.put(OrderController());

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        vertical: getProportionateScreenWidth(0),
        horizontal: getProportionateScreenWidth(10),
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
        boxShadow: [
          BoxShadow(
            offset: const Offset(0, -15),
            blurRadius: 20,
            color: const Color(0xFFDADADA).withOpacity(0.15),
          )
        ],
      ),
      child: SafeArea(
        child: Obx(() {
          return Column(
            children: _buildListWidget(),
          );
        }),
      ),
    );
  }

  List<Widget> _buildListWidget() {
    List<Widget> children = [
      const GFTypography(
        text: 'Phương thức nhận hàng',
        type: GFTypographyType.typo4,
      ),
      CustomRadio<bool>(
        onChanged: (value) {
          orderController.setIsReceiveAtStore(value);
        },
        value: false,
        groupValue: orderController.isReceiveAtStore.value,
        titleText: 'Giao hàng tận nơi',
        subTitleText: 'Đơn hàng sẽ được giao đến tận nhà cho bạn!',
        assetImage: 'assets/images/ic_home-delivery.png',
      ),
      CustomRadio<bool>(
        onChanged: (value) {
          orderController.setIsReceiveAtStore(value);
        },
        value: true,
        groupValue: orderController.isReceiveAtStore.value,
        titleText: 'Nhận tại cửa hàng',
        subTitleText: 'Xem, trải nghiệm và nhận tại cửa hàng!',
        assetImage: 'assets/images/ic_store.png',
      ),
      const SizedBox(height: 30),
      const GFTypography(
        text: 'Phương thức thanh toán',
        type: GFTypographyType.typo4,
      ),
    ];

    if (orderController.isReceiveAtStore.isTrue) {
      children.add(
        CustomRadio<String>(
          onChanged: (value) {
            orderController.setPaymentMethod(value);
          },
          value: kOrderPaymentMethod[1],
          groupValue: orderController.paymentMethod.value,
          titleText: 'Tiền mặt',
          subTitleText: 'Thanh toán bằng tiền mặt tại cửa hàng',
          assetImage: 'assets/images/ic_store.png',
        ),
      );
    } else {
      children.add(
        CustomRadio<String>(
          onChanged: (value) {
            orderController.setPaymentMethod(value);
          },
          value: kOrderPaymentMethod[0],
          groupValue: orderController.paymentMethod.value,
          titleText: 'Thanh toán khi nhận hàng',
          subTitleText: 'Được kiểm tra và thanh toán khi nhận hàng',
          assetImage: 'assets/images/ic_store.png',
        ),
      );
    }

    children.add(
      CustomRadio<String>(
        onChanged: (value) {
          orderController.setPaymentMethod(value);
        },
        value: kOrderPaymentMethod[2],
        groupValue: orderController.paymentMethod.value,
        titleText: 'Thanh toán qua VNPAY',
        subTitleText: 'Thanh toán qua VNPAY an toàn và nhanh chóng',
        assetImage: 'assets/images/ic_vnpay.png',
      ),
    );

    if (kDebugMode) {
      children.add(
        Text(orderController.paymentMethod.value),
      );
      children.add(
        Text(orderController.isReceiveAtStore.toString()),
      );
    }

    return children;
  }

  Widget _buildReceiveMethod() {
    return ListView.builder(
      //padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
      itemCount: 2,
      scrollDirection: Axis.vertical,
      itemBuilder: (BuildContext context, int index) {
        return SizedBox(
            height: 400,
            child: Row(
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
            ));
      },
    );
  }

  Widget _buildPaymentMethod() {
    return ListView.builder(
      padding: const EdgeInsets.only(top: 0, bottom: 0, right: 16, left: 16),
      itemCount: kOrderPaymentMethod.length,
      scrollDirection: Axis.vertical,
      itemBuilder: (BuildContext context, int index) {
        return GFRadioListTile(
          onChanged: (value) {
            orderController.setPaymentMethod(value);
          },
          value: kOrderPaymentMethod[index],
          groupValue: orderController.paymentMethod.value,
          titleText: 'Arthur Shelby',
          subTitleText: 'By order of the peaky blinders',
          avatar: const GFAvatar(
            backgroundImage: AssetImage('Assets image here'),
          ),
          size: 25,
          activeBorderColor: Colors.green,
          focusColor: Colors.green,
          type: GFRadioType.square,
          inactiveIcon: null,
        );
      },
    );
  }
}
