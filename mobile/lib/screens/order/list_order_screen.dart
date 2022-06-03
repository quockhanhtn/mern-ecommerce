import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/dto/order_dto.dart';
import 'package:hk_mobile/screens/order/components/status_item.dart';
import 'package:hk_mobile/screens/order/view_order_screen.dart';
import 'package:hk_mobile/size_config.dart';

class ListOrderScreen extends StatelessWidget {
  ListOrderScreen({Key? key}) : super(key: key);

  final OrderController orderController = Get.put(OrderController());

  @override
  Widget build(BuildContext context) {
    GetXUtil.showOverlay<void>(asyncFunction: () => orderController.fetchListAsync());
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(context),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: const [
          Text(
            "Đơn hàng",
            style: TextStyle(color: Colors.black),
          )
        ],
      ),
      actions: [
        IconButton(
          onPressed: () {
            GetXUtil.showOverlay<void>(asyncFunction: () => orderController.fetchListAsync());
          },
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
    List<Widget> rs = [];
    double screenWidth = MediaQuery.of(context).size.width;
    for (OrderDto dto in orderController.list.value) {
      rs.add(
        ShadowContainer(
          onTap: () {
            orderController.setViewOrderId(dto.id);
            Get.to(() => ViewOrderScreen());
          },
          margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              GFTypography(
                text: 'Đơn hàng #${dto.numericId}',
                type: GFTypographyType.typo5,
              ),
              const SizedBox(height: 10),
              OrderStatusItem(width: screenWidth, data: dto.status),
              PaymentMethodItem(width: screenWidth, data: dto.paymentMethod),
              PaymentStatusItem(width: screenWidth, data: dto.paymentStatus),
              StatusItem(
                margin: const EdgeInsets.only(top: 5, bottom: 5),
                width: screenWidth,
                title: 'Tổng tiền',
                item: Text(
                  FormatUtils.currency(dto.total),
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    color: AppTheme.nearlyBlue,
                  ),
                ),
              ),
              StatusItem(
                margin: const EdgeInsets.only(top: 5, bottom: 5),
                width: screenWidth,
                title: 'Đặt mua lúc',
                item: Text(
                  FormatUtils.formatDateTime(dto.createdAt),
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    color: AppTheme.darkText,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }
    return rs;
  }
}
