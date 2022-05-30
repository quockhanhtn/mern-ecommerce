import 'package:flutter/material.dart';
import 'package:hk_mobile/core/components/network_img.dart';
import 'package:hk_mobile/core/components/numeric_up_down.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/core/utils/format_util.dart';

import '../../../constants.dart';
import '../../../size_config.dart';

class CartCard extends StatelessWidget {
  const CartCard({
    Key? key,
    required this.cart,
  }) : super(key: key);

  final CartDto cart;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 88,
          child: AspectRatio(
            aspectRatio: 0.88,
            child: Container(
              padding: EdgeInsets.all(getProportionateScreenWidth(5)),
              decoration: BoxDecoration(
                color: const Color(0xFFF5F6F9),
                borderRadius: BorderRadius.circular(15),
              ),
              child: NetworkImg(
                imageUrl: cart.thumbnail,
                imageFit: BoxFit.cover,
              ),
            ),
          ),
        ),
        const SizedBox(width: 20),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              cart.name,
              style: const TextStyle(color: Colors.black, fontSize: 16),
              maxLines: 2,
            ),
            const SizedBox(height: 10),
            Text.rich(
              TextSpan(
                text: FormatUtils.currency(cart.price),
                style: const TextStyle(fontWeight: FontWeight.w600, color: kPrimaryColor),
                children: [
                  TextSpan(text: " x ${cart.qty}", style: Theme.of(context).textTheme.bodyText1),
                ],
              ),
            ),
            NumericUpDown(
              currentValue: cart.qty,
              onDecrease: () {
                cart.qty = cart.qty--;
              },
              onIncrease: () {
                cart.qty = cart.qty++;
              },
            )
          ],
        )
      ],
    );
  }
}
