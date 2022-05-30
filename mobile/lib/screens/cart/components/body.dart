import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:get/get.dart';
import 'package:getwidget/colors/gf_color.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';

import '../../../size_config.dart';
import 'cart_card.dart';

class Body extends StatelessWidget {
  Body({Key? key}) : super(key: key);

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
          itemBuilder: (context, index) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 0),
            child: _buildItem(index),
            //child: CartCard(cart: cartController.list[index]),
            // Dismissible(
            //   key: Key(index.toString()),
            //   direction: DismissDirection.endToStart,
            //   onDismissed: (direction) {
            //     cartController.removeItem(index);
            //   },
            //   background: Container(
            //     padding: const EdgeInsets.symmetric(horizontal: 20),
            //     decoration: BoxDecoration(
            //       color: const Color(0xFFFFE6E6),
            //       borderRadius: BorderRadius.circular(15),
            //     ),
            //     child: Row(
            //       children: [
            //         const Spacer(),
            //         SvgPicture.asset("assets/icons/ic_trash.svg"),
            //       ],
            //     ),
            //   ),
            //   child: CartCard(cart: cartController.list[index]),
            // ),
          ),
        ),
      );
    });
  }

  Widget _buildItem(int index) {
    return Slidable(
      // The end action pane is the one at the right or the bottom side.
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

      // The child of the Slidable is what the user sees when the
      // component is not dragged.
      child: CartCard(cart: cartController.list[index]),
    );
  }
}
