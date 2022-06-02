import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/order_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/dto/order_dto.dart';
import 'package:hk_mobile/screens/order/components/order_items_list_view.dart';
import 'package:hk_mobile/size_config.dart';

class ViewOrderScreen extends StatelessWidget {
  ViewOrderScreen({Key? key}) : super(key: key);

  final OrderController orderController = Get.put(OrderController());

  void _handleReBuy() {}

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
    );
  }

  Widget _buildBody(BuildContext context) {
    return Obx(() {
      if (orderController.isLoadingViewOrder.isTrue) {
        return _buildLoading(context);
      }

      return _buildOrderDetail(orderController.viewOrder.first);
    });
  }

  Widget _buildLoading(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 54,
            height: 46,
            color: Colors.white,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  width: double.infinity,
                  height: 8,
                  color: Colors.white,
                ),
                const SizedBox(height: 6),
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  height: 8,
                  color: Colors.white,
                ),
                const SizedBox(height: 6),
                Container(
                  width: MediaQuery.of(context).size.width * 0.25,
                  height: 8,
                  color: Colors.white,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildOrderDetail(OrderDto dto) {
    return Column(
      children: [
        ShadowContainer(child: Text('dd')),
        GFAccordion(
          title: 'Chi tiết sản phẩm',
          contentChild: OrderItemsListView(dto.items),
          collapsedIcon: const Icon(Icons.arrow_drop_up),
          expandedIcon: const Icon(Icons.arrow_drop_down),
          showAccordion: true,
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
                        text: FormatUtils.currency(5000),
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
}
