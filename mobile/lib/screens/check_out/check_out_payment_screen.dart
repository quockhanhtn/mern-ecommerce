import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/core/utils/url_launcher_util.dart';
import 'package:hk_mobile/screens/check_out/components/select_payment_list_view.dart';
import 'package:hk_mobile/screens/order/view_order_screen.dart';
import 'package:hk_mobile/size_config.dart';

class CheckOutPaymentScreen extends StatelessWidget {
  CheckOutPaymentScreen({Key? key}) : super(key: key);

  final CartController cartController = Get.put(CartController());
  final OrderController orderController = Get.put(OrderController());

  void _handlePayNow() {
    if (orderController.paymentMethod.isEmpty) {
      GetXUtil.showSnackbarError('Bạn chưa chọn phương thức thanh toán', title: 'Phương thức thanh toán');
      return;
    }

    GetXUtil.showOverlay<void>(
      asyncFunction: () => orderController.createAsync((paymentUrl) {
        if (paymentUrl.isNotEmpty) {
          UrlLauncherUtil.openUrl(paymentUrl);
        }
        GetXUtil.showSnackBarSuccess("Đặt hàng thành công !");
        Get.to(() => ViewOrderScreen());
      }),
    );

    // orderController.createOrder((String paymentUrl) {
    //   if (paymentUrl.isNotEmpty) {
    //     UrlLauncherUtil.openUrl(paymentUrl);
    //   }
    //   GetSnackbarUtil.showSuccess("Đặt hàng thành công !");
    //   Get.to(() => ViewOrderScreen());
    // });

    //UrlLauncherUtil.openUrl('https://mern-ecommerce-b848d.web.app/');
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
            "Thanh toán",
            style: TextStyle(color: Colors.black),
          )
        ],
      ),
    );
  }

  Widget _buildBody() {
    return SafeArea(
      child: SingleChildScrollView(
        child: SelectPaymentListView(),
      ),
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
              text: 'Đặt hàng',
              btnColor: AppTheme.nearlyBlue,
              textColor: AppTheme.nearlyWhite,
              btnPadding: const EdgeInsets.all(0),
              onTap: _handlePayNow,
            ),
          ],
        ),
      ),
    );
  }
}
