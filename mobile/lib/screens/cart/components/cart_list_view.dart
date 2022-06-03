import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:get/get.dart';
import 'package:getwidget/colors/gf_color.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';

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
              onPressed: (BuildContext? ctx) {},
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
}
