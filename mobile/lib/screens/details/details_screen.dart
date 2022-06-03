import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/core/components/default_button.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';

import 'package:hk_mobile/dto/product_dto.dart';
import 'package:hk_mobile/screens/details/components/top_rounded_container.dart';
import '../../size_config.dart';
import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatelessWidget {
  static String routeName = "/details";
  final CartController cartController = Get.put(CartController());

  DetailsScreen({Key? key, required this.productDto}) : super(key: key);
  final ProductDto productDto;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6F9),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: const CustomAppBar(rating: 4.5),
      ),
      body: Body(product: productDto),
      bottomNavigationBar: TopRoundedContainer(
        color: Colors.white,
        child: Padding(
          padding: EdgeInsets.only(
            left: SizeConfig.screenWidth * 0.18,
            right: SizeConfig.screenWidth * 0.18,
            bottom: getProportionateScreenWidth(5),
            top: getProportionateScreenWidth(0),
          ),
          child: DefaultButton(
            text: "Thêm vào giỏ hàng",
            press: () {
              cartController.add(
                productDto.id,
                productDto.variants[0],
                1,
                doWhenSuccess: () {
                  GetXUtil.showSnackBarSuccess('Thêm sản phẩm vào giỏ hàng thành công !');
                },
                doWhenError: (mgs) {
                  GetXUtil.showSnackbarError(mgs);
                },
              );
            },
          ),
        ),
      ),
    );
  }
}
