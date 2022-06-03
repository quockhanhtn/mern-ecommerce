import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/screens/check_out/check_out_payment_screen.dart';
import 'package:hk_mobile/screens/check_out/components/select_address_list_view.dart';
import 'package:hk_mobile/size_config.dart';

class CheckOutAddressScreen extends StatelessWidget {
  CheckOutAddressScreen({Key? key}) : super(key: key);

  final CartController cartController = Get.put(CartController());
  final OrderController orderController = Get.put(OrderController());

  void _handleGoPay() {
    if (orderController.selectedAddressId.isEmpty) {
      GetXUtil.showSnackbarError('Bạn chưa chọn địa chỉ để nhận hàng', title: 'Thiếu địa chỉ');
    } else {
      Get.to(() => CheckOutPaymentScreen());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
      bottomNavigationBar: _buildBottom(),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [
          Text(
            "Chọn địa chỉ nhận hàng",
            style: TextStyle(color: Colors.black),
          )
        ],
      ),
    );
  }

  Widget _buildBody() {
    return Stack(
      children: <Widget>[
        SelectAddressListView(),
      ],
    );
  }

  Widget _buildBottom() {
    return Container(
      padding: EdgeInsets.symmetric(
        vertical: getProportionateScreenWidth(15),
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
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 3,
              child: Obx(() {
                return Text.rich(
                  TextSpan(
                    text: "Tổng cộng:\n",
                    children: [
                      TextSpan(
                        text: FormatUtils.currency(cartController.subTotal.value),
                        style: const TextStyle(
                          fontSize: 18,
                          color: AppTheme.colorError,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  textAlign: TextAlign.right,
                );
              }),
            ),
            CustomBtn(
              btnMargin: const EdgeInsets.only(left: 10),
              expandedFlex: 2,
              text: 'Tiếp tục',
              btnColor: AppTheme.nearlyBlue,
              textColor: AppTheme.nearlyWhite,
              btnPadding: const EdgeInsets.all(0),
              onTap: _handleGoPay,
            ),
          ],
        ),
      ),
    );
  }
}
