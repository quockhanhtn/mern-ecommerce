import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/product_controller.dart';

import 'package:hk_mobile/core/components/components.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/screens/search/search_screen.dart';
import 'package:hk_mobile/size_config.dart';
import 'package:hk_mobile/screens/cart/cart_screen.dart';

class HomeHeader extends StatelessWidget {
  HomeHeader({
    Key? key,
  }) : super(key: key);

  final ProductController productController = Get.put(ProductController());

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Obx(() {
            return SearchField(
                text: productController.keyword.value,
                hintText: AppLocalizations.of(context)!.productSearchHint,
                width: SizeConfig.screenWidth * 0.6,
                boxColor: kSecondaryColor.withOpacity(0.1),
                horizontalPadding: getProportionateScreenWidth(20),
                verticalPadding: getProportionateScreenWidth(9),
                onSubmitted: (value) {
                  productController.searchProducts(value);
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => SearchScreen(),
                    ),
                  );
                });
          }),
          IconBtnWithCounter(
            svgSrc: "assets/icons/ic_cart.svg",
            press: () => Navigator.pushNamed(context, CartScreen.routeName),
            icPadding: getProportionateScreenWidth(12),
            icHeight: getProportionateScreenWidth(46),
            icWidth: getProportionateScreenWidth(46),
            numberHeight: getProportionateScreenWidth(16),
            numberWidth: getProportionateScreenWidth(16),
            numberFontSize: getProportionateScreenWidth(10),
            boxColor: kSecondaryColor.withOpacity(0.1),
          ),
          IconBtnWithCounter(
            svgSrc: "assets/icons/ic_bell.svg",
            numOfItem: 3,
            icPadding: getProportionateScreenWidth(12),
            icHeight: getProportionateScreenWidth(46),
            icWidth: getProportionateScreenWidth(46),
            numberHeight: getProportionateScreenWidth(16),
            numberWidth: getProportionateScreenWidth(16),
            numberFontSize: getProportionateScreenWidth(10),
            boxColor: kSecondaryColor.withOpacity(0.1),
            press: () {},
          ),
        ],
      ),
    );
  }
}
