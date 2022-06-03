import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/screens/check_out/check_out_address_screen.dart';
import 'package:hk_mobile/size_config.dart';

import 'components/cart_list_view.dart';

class CartScreen extends StatelessWidget {
  CartScreen({Key? key}) : super(key: key);

  static String routeName = "/cart";
  final CartController cartController = Get.put(CartController());
  final OrderController orderController = Get.put(OrderController());

  void _handleBuyNow() {
    if (cartController.list.isEmpty) {
      GetXUtil.showSnackbarError('Bạn vẫn chưa chọn sản phẩm nào để mua', title: 'Giỏ hàng trống');
      return;
    }

    orderController.updateSelectedItem();
    if (orderController.items.isEmpty) {
      GetXUtil.showSnackbarError('Bạn vẫn chưa chọn sản phẩm nào để mua', title: 'Chưa chọn sản phẩm');
    } else {
      Get.to(() => CheckOutAddressScreen());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: CartListView(),
      bottomNavigationBar: _buildBottom(),
    );
  }

  AppBar _buildAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Obx(() {
            return Text(
              "Giỏ hàng (${cartController.list.length})",
              style: const TextStyle(color: Colors.black),
            );
          }),
        ],
      ),
      actions: [
        IconButton(
          onPressed: () {
            GetXUtil.showOverlay<void>(asyncFunction: () => cartController.fetchCartItemsAsync());
          },
          icon: const Icon(Icons.refresh),
        ),
      ],
    );
  }

  Widget _buildBottom() {
    return Container(
      padding: EdgeInsets.symmetric(
        vertical: getProportionateScreenWidth(15),
        horizontal: getProportionateScreenWidth(10),
      ),
      // height: 174,
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
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  height: getProportionateScreenWidth(40),
                  width: getProportionateScreenWidth(40),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF5F6F9),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: SvgPicture.asset("assets/icons/receipt.svg"),
                ),
                const Spacer(),
                const Text("Mã giảm giá"),
                const SizedBox(width: 10),
                const Icon(
                  Icons.arrow_forward_ios,
                  size: 12,
                  color: kTextColor,
                )
              ],
            ),
            SizedBox(height: getProportionateScreenHeight(10)),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Obx(() {
                  return Row(
                    children: [
                      GFCheckbox(
                        activeBgColor: GFColors.SUCCESS,
                        size: GFSize.SMALL,
                        type: GFCheckboxType.circle,
                        onChanged: (value) {
                          cartController.toggleSelectedAll();
                        },
                        value: cartController.isSelectedAll(),
                        inactiveIcon: null,
                      ),
                      const SizedBox(width: 10),
                      GestureDetector(
                        onTap: cartController.toggleSelectedAll,
                        child: const Text('Chọn\ntất cả'),
                      ),
                    ],
                  );
                }),
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
                  text: 'Mua ngay',
                  btnColor: AppTheme.nearlyBlue,
                  textColor: AppTheme.nearlyWhite,
                  btnPadding: const EdgeInsets.all(0),
                  onTap: _handleBuyNow,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
