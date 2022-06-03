import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/core/utils/url_launcher_util.dart';
import 'package:hk_mobile/dto/order_dto.dart';
import 'package:hk_mobile/screens/order/components/order_item.dart';
import 'package:hk_mobile/size_config.dart';

class ViewOrderScreen extends StatelessWidget {
  ViewOrderScreen({Key? key}) : super(key: key);

  final OrderController orderController = Get.put(OrderController());

  void _handleReBuy() {}
  void _handleRePay() {
    GetXUtil.showOverlay(
      asyncFunction: () => orderController.repayAsync((String paymentUrl) {
        if (paymentUrl.isNotEmpty) {
          UrlLauncherUtil.openUrl(paymentUrl);
        }
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(context),
      bottomNavigationBar: _buildBottom(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [
          Text(
            "Chi tiết đơn hàng",
            style: TextStyle(color: Colors.black),
          )
        ],
      ),
      actions: [
        IconButton(
          onPressed: orderController.reloadOrder,
          icon: const Icon(Icons.refresh),
        ),
      ],
    );
  }

  Widget _buildBody(BuildContext context) {
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
      child: SingleChildScrollView(
        child: SafeArea(
          child: Obx(() {
            return Column(
              children: _buildListWidget(context),
            );
          }),
        ),
      ),
    );
  }

  List<Widget> _buildListWidget(BuildContext context) {
    OrderDto dto = orderController.viewOrder.first;
    List<Widget> rs = [];

    rs.addAll([
      GFTypography(
        text: 'Đơn hàng #${dto.numericId}',
        type: GFTypographyType.typo1,
        textColor: AppTheme.nearlyBlue,
        showDivider: false,
      ),
      const SizedBox(height: 20),
    ]);

    if (dto.isReceiveAtStore) {
      rs.add(
        ShadowContainer(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              const GFTypography(
                text: 'Nhận tại cửa hàng',
                type: GFTypographyType.typo4,
              ),
              const SizedBox(height: 10),
              _buildTextPair(MediaQuery.of(context).size.width, dto.getCustomerName),
              _buildTextPair(MediaQuery.of(context).size.width, dto.getCustomerPhone),
            ],
          ),
        ),
      );
    } else {
      rs.add(
        ShadowContainer(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              const GFTypography(
                text: 'Địa chỉ nhận hàng',
                type: GFTypographyType.typo4,
              ),
              const SizedBox(height: 10),
              _buildTextPair(MediaQuery.of(context).size.width, dto.getCustomerName),
              _buildTextPair(MediaQuery.of(context).size.width, dto.getCustomerPhone),
              _buildTextPair(MediaQuery.of(context).size.width, dto.address!.getDetailAddress()),
            ],
          ),
        ),
      );
    }

    rs.addAll([
      const SizedBox(height: 10),
      ShadowContainer(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            const GFTypography(
              text: 'Tình trạng đơn hàng',
              type: GFTypographyType.typo4,
            ),
            const SizedBox(height: 10),
            _buildOrderStatus(MediaQuery.of(context).size.width, dto.status),
            _buildPaymentMethod(MediaQuery.of(context).size.width, dto.paymentMethod),
            _buildPaymentStatus(MediaQuery.of(context).size.width, dto.paymentStatus),
          ],
        ),
      ),
      const SizedBox(height: 10),
    ]);

    if (dto.paymentMethod == 'vnpay' && dto.paymentStatus != 'paid') {
      rs.add(
        SizedBox(
          height: 50,
          child: CustomBtn(
            text: 'Thanh toán lại',
            btnColor: AppTheme.darkGrey.withOpacity(0.8),
            textColor: Colors.white,
            onTap: _handleRePay,
          ),
        ),
      );
    }

    rs.addAll([
      const SizedBox(height: 10),
      const GFTypography(
        text: 'Chi tiết sản phẩm',
        type: GFTypographyType.typo4,
      ),
      const SizedBox(height: 10),
    ]);

    for (var i = 0; i < dto.items.length; i++) {
      rs.add(OrderItem(item: dto.items[i]));
    }
    return rs;
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
            // Expanded(
            //   flex: 3,
            //   child: Obx(() {
            //     return Text.rich(
            //       TextSpan(
            //         text: "Tổng cộng:\n",
            //         children: [
            //           TextSpan(
            //             text: FormatUtils.currency(5000),
            //             style: const TextStyle(
            //               fontSize: 18,
            //               color: AppTheme.colorError,
            //               fontWeight: FontWeight.bold,
            //             ),
            //           ),
            //         ],
            //       ),
            //       textAlign: TextAlign.right,
            //     );
            //   }),
            // ),
            CustomBtn(
              btnMargin: const EdgeInsets.only(left: 10),
              expandedFlex: 2,
              text: 'Mua lại',
              btnColor: AppTheme.nearlyBlue,
              textColor: AppTheme.nearlyWhite,
              btnPadding: const EdgeInsets.all(0),
              onTap: _handleReBuy,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextPair(double width, String text) {
    return Container(
      margin: const EdgeInsets.only(top: 2.5, bottom: 2.5),
      child: SizedBox(
        width: width,
        child: Text(
          text,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
        ),
      ),
    );
  }

  Widget _buildOrderStatus(double width, String status) {
    Widget item = Text(status);

    int index = kOrderStatus.indexOf(status);
    if (index < 0) {
      item = Text(status);
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

    return _buildStatusItem(width, 'Trạng thái đơn hàng', item);
  }

  Widget _buildPaymentMethod(double width, String status) {
    Widget item = Text(status);
    int index = kOrderPaymentMethod.indexOf(status);
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
    return _buildStatusItem(width, 'Phương thức thanh toán', item);
  }

  Widget _buildPaymentStatus(double width, String status) {
    Widget item = Text(status);

    int index = kOrderPaymentStatus.indexOf(status);
    if (index < 0) {
      item = Text(status);
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
    return _buildStatusItem(width, 'Trạng thái thanh toán', item);
  }

  Widget _buildStatusItem(double width, String title, Widget item) {
    return Container(
      margin: const EdgeInsets.only(top: 2.5, bottom: 2.5),
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
