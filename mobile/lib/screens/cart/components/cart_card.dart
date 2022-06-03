import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/core/components/network_img.dart';
import 'package:hk_mobile/core/components/numeric_up_down.dart';
import 'package:hk_mobile/core/components/shadow_container.dart';
import 'package:hk_mobile/core/utils/format_util.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/dto/cart_dto.dart';

import '../../../size_config.dart';

class CartCard extends StatelessWidget {
  CartCard({
    Key? key,
    required this.cart,
  }) : super(key: key);

  final CartController cartController = Get.put(CartController());
  final CartDto cart;

  void _toggleSelected() {
    cartController.toggleSelected(cart.productId, cart.sku);
  }

  Widget _buildImage() {
    return GestureDetector(
      onTap: _toggleSelected,
      child: SizedBox(
        width: 88,
        child: AspectRatio(
          aspectRatio: 1,
          child: Container(
            padding: EdgeInsets.all(getProportionateScreenWidth(5)),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(15),
              border: Border.all(
                color: cart.isSelected ? AppTheme.nearlyBlue : AppTheme.grey.withOpacity(0.2),
              ),
            ),
            child: NetworkImg(
              imageUrl: cart.thumbnail,
              imageFit: BoxFit.contain,
            ),
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
          cart.name,
          style: const TextStyle(color: Colors.black, fontSize: 16),
          overflow: TextOverflow.ellipsis,
          maxLines: 2,
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text(
                  FormatUtils.currency(cart.price),
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: GFColors.DANGER,
                  ),
                ),
                Text(
                  FormatUtils.currency(cart.marketPrice),
                  style: TextStyle(
                    decoration: TextDecoration.lineThrough,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.darkText.withOpacity(0.6),
                  ),
                ),
              ],
            ),
            NumericUpDown(
              min: 1,
              max: cart.quantity - cart.sold,
              currentValue: cart.qty,
              availableTxt: 'Còn ${cart.quantity - cart.sold - cart.qty} SP',
              onDecrease: () {
                GetXUtil.showOverlay(asyncFunction: () => cartController.decreaseQtyAsync(cart.productId, cart.sku));
              },
              onIncrease: () {
                GetXUtil.showOverlay(asyncFunction: () => cartController.increaseQtyAsync(cart.productId, cart.sku));
              },
            ),
          ],
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ShadowContainer(
          border: Border.fromBorderSide(BorderSide(
            color: AppTheme.darkGrey.withOpacity(0.2),
          )),
          borderRadius: const BorderRadius.all(Radius.zero),
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
        ),
        Positioned(
          top: 10,
          left: 10,
          child: GFCheckbox(
            onChanged: (value) {
              _toggleSelected();
            },
            value: cart.isSelected,
            size: GFSize.MEDIUM * 2 / 3,
            activeBgColor: Colors.green,
            type: GFCheckboxType.circle,
            activeIcon: const Icon(
              Icons.check,
              size: 15,
              color: Colors.white,
            ),
            // inactiveIcon: inactiveIcon,
            // checkColor: checkColor,
          ),
        )
      ],
    );
  }
}
