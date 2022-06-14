import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:get/get.dart';
import 'package:getwidget/colors/gf_color.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/core/utils/alert_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';

import 'cart_card.dart';

class CartListView extends StatelessWidget {
  CartListView({Key? key}) : super(key: key);

  final CartController cartController = Get.put(CartController());

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (cartController.list.isEmpty) {
        return const Center(
          child: Text(
            "Giỏ hàng trống",
            style: TextStyle(fontSize: 20),
          ),
        );
      }

      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 0),
        child: ListView.builder(
          itemCount: cartController.list.length,
          itemBuilder: _buildItem,
        ),
      );
    });
  }

  Widget _buildItem(BuildContext context, int index) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 0),
      child: Slidable(
        endActionPane: ActionPane(
          motion: const ScrollMotion(),
          children: [
            SlidableAction(
              onPressed: (BuildContext? ctx) {},
              backgroundColor: GFColors.SUCCESS,
              foregroundColor: Colors.white,
              icon: Icons.search,
            ),
            SlidableAction(
              onPressed: (BuildContext? ctx) {
                _handleOnDelete(
                  context,
                  cartController.list[index].productId,
                  cartController.list[index].sku,
                  cartController.list[index].name,
                );
              },
              backgroundColor: GFColors.DANGER,
              foregroundColor: Colors.white,
              icon: Icons.delete,
            ),
          ],
        ),
        child: CartCard(cart: cartController.list[index]),
      ),
    );
  }

  void _handleOnDelete(BuildContext context, String productId, String sku, String name) {
    AlertUtil.showYesNo(
      context,
      content: Column(
        children: [
          const GFTypography(
            text: 'Xác nhận xóa',
          ),
          const SizedBox(height: 10),
          Text.rich(
            TextSpan(
              style: const TextStyle(color: Colors.black, fontSize: 14),
              children: [
                const TextSpan(text: "Bạn có muốn sản phẩm\n"),
                TextSpan(
                  text: name,
                  style: const TextStyle(
                    fontSize: (16),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            textAlign: TextAlign.left,
          )
        ],
      ),
      onYes: () {
        GetXUtil.showOverlay(
          asyncFunction: () => cartController.removeItemAsync(
            productId,
            sku,
            doWhenSuccess: () {
              GetXUtil.showSnackBarSuccess('Xóa địa chỉ thành công !');
            },
            doWhenError: (error) {
              GetXUtil.showSnackbarError(error);
            },
          ),
        );
      },
      onNo: () {},
    );
  }
}
