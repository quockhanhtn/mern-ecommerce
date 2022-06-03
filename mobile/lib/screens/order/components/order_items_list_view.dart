import 'package:flutter/material.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/screens/order/components/order_item.dart';

class OrderItemsListView extends StatelessWidget {
  OrderItemsListView(this.items, {Key? key}) : super(key: key);

  List<CartDto> items;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 0),
      child: ListView.builder(
        itemCount: items.length,
        itemBuilder: _buildItem,
      ),
    );
  }

  Widget _buildItem(BuildContext context, int index) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 0),
      child: OrderItem(item: items[index]),
    );
  }
}
