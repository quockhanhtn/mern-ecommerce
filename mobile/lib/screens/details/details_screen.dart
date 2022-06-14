import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:getwidget/getwidget.dart';
import 'package:hk_mobile/controllers/authentication_controller.dart';
import 'package:hk_mobile/controllers/cart_controller.dart';
import 'package:hk_mobile/controllers/product_controller.dart';
import 'package:hk_mobile/core/components/default_button.dart';
import 'package:hk_mobile/core/utils/get_x_util.dart';
import 'package:hk_mobile/screens/details/components/top_rounded_container.dart';
import 'package:hk_mobile/screens/sign_in/sign_in_screen.dart';

import '../../size_config.dart';
import 'components/body.dart';
import 'components/custom_app_bar.dart';

class DetailsScreen extends StatelessWidget {
  static String routeName = "/details";
  final AuthenticationController authController = Get.put(AuthenticationController());
  final CartController cartController = Get.put(CartController());
  final ProductController productController = Get.put(ProductController());

  DetailsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F6F9),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(AppBar().preferredSize.height),
        child: const CustomAppBar(rating: 4.5),
      ),
      body: Obx(() {
        if (productController.isLoadingView.isTrue) {
          return const Padding(
            padding: EdgeInsets.only(top: 20),
            child: GFLoader(
              type: GFLoaderType.ios,
              size: GFSize.LARGE * 2,
            ),
          );
        }

        return Body(product: productController.view.first);
      }),
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
              if (authController.isAuthenticated.isFalse) {
                GetXUtil.showSnackbarError('Vui lòng đăng nhập', title: 'Yêu cầu đăng nhập');
                Get.to(const SignInScreen());
                return;
              }
              GetXUtil.showOverlay(
                asyncFunction: () => cartController.addAsync(
                  productController.view.first.id,
                  productController.view.first.variants[0],
                  1,
                  doWhenSuccess: () {
                    GetXUtil.showSnackBarSuccess('Thêm sản phẩm vào giỏ hàng thành công !');
                  },
                  doWhenError: (mgs) {
                    GetXUtil.showSnackbarError(mgs);
                  },
                ),
              );
              // cartController.add(
              //   productDto.id,
              //   productDto.variants[0],
              //   1,
              //   doWhenSuccess: () {
              //     GetXUtil.showSnackBarSuccess('Thêm sản phẩm vào giỏ hàng thành công !');
              //   },
              //   doWhenError: (mgs) {
              //     GetXUtil.showSnackbarError(mgs);
              //   },
              // );
            },
          ),
        ),
      ),
    );
  }
}
