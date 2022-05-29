import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/dto/cart_dto.dart';

import '../../../size_config.dart';
import 'cart_card.dart';

class Body extends StatelessWidget {
  final CartController cartController = Get.put(CartController());
  Body({Key? key}) : super(key: key);

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
        padding: EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
        child: ListView.builder(
          itemCount: cartController.list.length,
          itemBuilder: (context, index) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Dismissible(
              key: Key(index.toString()),
              direction: DismissDirection.endToStart,
              onDismissed: (direction) {
                cartController.removeItem(index);
              },
              background: Container(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFE6E6),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Row(
                  children: [
                    const Spacer(),
                    SvgPicture.asset("assets/icons/ic_trash.svg"),
                  ],
                ),
              ),
              child: CartCard(cart: cartController.list[index]),
            ),
          ),
        ),
      );
    });
  }
}
