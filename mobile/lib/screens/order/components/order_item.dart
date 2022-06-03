import 'package:flutter/material.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/core/components/network_img.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/dto/cart_dto.dart';

import '../../../size_config.dart';

class OrderItem extends StatelessWidget {
  const OrderItem({
    Key? key,
    required this.item,
  }) : super(key: key);

  final CartDto item;

  Widget _buildImage() {
    return SizedBox(
      width: 88,
      child: AspectRatio(
        aspectRatio: 1,
        child: Container(
          padding: EdgeInsets.all(getProportionateScreenWidth(5)),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15),
            border: Border.all(
              color: item.isSelected ? AppTheme.nearlyBlue : AppTheme.grey.withOpacity(0.2),
            ),
          ),
          child: NetworkImg(
            imageUrl: item.thumbnail,
            imageFit: BoxFit.contain,
          ),
        ),
      ),
    );
  }

  Widget _buildItem(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          item.name,
          style: const TextStyle(color: Colors.black, fontSize: 16),
          overflow: TextOverflow.ellipsis,
          maxLines: 2,
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text(
                  FormatUtils.currency(item.price),
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: kTextColor,
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  'x' + item.quantity.toString(),
                  textAlign: TextAlign.left,
                  style: const TextStyle(
                    color: kTextColor,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
            Text(
              FormatUtils.currency(item.price * item.quantity),
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: AppTheme.nearlyBlue,
              ),
            ),
          ],
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return ShadowContainer(
      child: Row(
        children: [
          _buildImage(),
          const SizedBox(width: 20),
          Expanded(
            flex: 1,
            child: _buildItem(context),
          )
        ],
      ),
      padding: const EdgeInsets.all(10),
    );
  }
}
