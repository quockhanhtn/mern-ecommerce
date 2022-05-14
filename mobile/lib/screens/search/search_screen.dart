import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/constants.dart';
import 'package:hk_mobile/controllers/product_controller.dart';
import 'package:hk_mobile/screens/search/components/search_bar.dart';
import 'package:hk_mobile/size_config.dart';

import 'components/body.dart';

class CustomAppBar2 extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());

  CustomAppBar2({Key? key}) : super(key: key);

  // AppBar().preferredSize.height provide us the height that apply on our app bar
  Size get preferredSize => Size.fromHeight(AppBar().preferredSize.height);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
        child: Row(
          children: [
            SizedBox(
              height: getProportionateScreenWidth(40),
              width: getProportionateScreenWidth(40),
              child: TextButton(
                style: TextButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(60),
                  ),
                  primary: kPrimaryColor,
                  backgroundColor: Colors.white,
                  padding: EdgeInsets.zero,
                ),
                onPressed: () => Navigator.pop(context),
                child: SvgPicture.asset(
                  "assets/icons/ic_back.svg",
                  height: 15,
                ),
              ),
            ),
            Obx(() {
              return SearchBar(
                text: productController.keyword.value,
                hintText: AppLocalizations.of(context)!.productSearchHint,
                width: SizeConfig.screenWidth - getProportionateScreenWidth(100),
                boxColor: kSecondaryColor.withOpacity(0.1),
                horizontalPadding: getProportionateScreenWidth(20),
                verticalPadding: getProportionateScreenWidth(9),
                onSubmitted: (value) {
                  productController.searchProducts(value);
                },
                onChanged: (value) {
                  productController.searchProducts(value);
                },
              );
            })
          ],
        ),
      ),
    );
  }
}

class SearchScreen extends StatelessWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
        // appBar: AppBar(
        //   title: const Text("Tìm kiếm sản phẩm"),
        // ),
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(AppBar().preferredSize.height + getProportionateScreenHeight(20)),
          child: Column(children: [
            SizedBox(height: getProportionateScreenHeight(20)),
            CustomAppBar2(),
          ]),
        ),
        body: Body());
  }
}
