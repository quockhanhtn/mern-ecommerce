import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';

import 'components/body.dart';
import 'components/check_out_card.dart';

class CartScreen extends StatelessWidget {
  static String routeName = "/cart";
  final CartController cartController = Get.put(CartController());

  CartScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(context),
      body: Body(),
      bottomNavigationBar: CheckoutCard(),
    );
  }

  AppBar buildAppBar(BuildContext context) {
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
    );
  }
}
