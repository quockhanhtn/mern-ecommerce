import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import 'package:hk_mobile/components/components.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/size_config.dart';
import 'package:hk_mobile/screens/cart/cart_screen.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:
          EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SearchField(
            hintText: AppLocalizations.of(context)!.productSearchHint,
            width: SizeConfig.screenWidth * 0.6,
            boxColor: kSecondaryColor.withOpacity(0.1),
            horizontalPadding: getProportionateScreenWidth(20),
            verticalPadding: getProportionateScreenWidth(9)
          ),
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
