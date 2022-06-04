import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/core/utils/url_launcher_util.dart';
import 'package:hk_mobile/dto/order_dto.dart';
import 'package:hk_mobile/screens/order/components/order_item.dart';
import 'package:hk_mobile/screens/order/components/status_item.dart';
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
            if (orderController.isLoadingViewOrder.isTrue) {
              return const Padding(
                padding: EdgeInsets.only(top: 20),
                child: GFLoader(
                  type: GFLoaderType.circle,
                  size: GFSize.LARGE * 2,
                ),
              );
            }
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
            OrderStatusItem(width: MediaQuery.of(context).size.width, data: dto.status),
            PaymentMethodItem(width: MediaQuery.of(context).size.width, data: dto.paymentMethod),
            PaymentStatusItem(width: MediaQuery.of(context).size.width, data: dto.paymentStatus),
          ],
        ),
      ),
      const SizedBox(height: 10),
    ]);

    if (dto.paymentMethod == 'vnpay' && dto.paymentStatus != 'paid') {
      rs.addAll([
        const SizedBox(height: 10),
        Obx(() {
          return SizedBox(
            height: 50,
            child: CustomBtn(
              text: 'Thanh toán lại',
              btnColor: AppTheme.darkGrey.withOpacity(0.8),
              textColor: Colors.white,
              onTap: _handleRePay,
            ),
          );
        }),
        const SizedBox(height: 10),
      ]);
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

    rs.addAll([
      const SizedBox(height: 20),
      Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Tổng tiền',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.darkText,
                ),
              ),
              Text(
                FormatUtils.currency(dto.total),
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.colorError,
                ),
              ),
            ],
          )
        ],
      ),
      const SizedBox(height: 20),
    ]);
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
}
