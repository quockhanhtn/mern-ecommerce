import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/core/components/default_button.dart';
import 'package:hk_mobile/core/components/product_card.dart';
import 'package:hk_mobile/screens/details/components/top_rounded_container.dart';

import '../../../controllers/product_controller.dart';
import '../../../size_config.dart';
import 'section_title.dart';

class PopularProducts extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());

  PopularProducts({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(
              title: "Sản phẩm mới nhất", viewMoreText: "", press: () {}),
        ),
        SizedBox(height: getProportionateScreenWidth(20)),
        Obx(() {
          if (productController.isLoading.isTrue) {
            return const CircularProgressIndicator();
          }
          return SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Wrap(
              children: [
                ...List.generate(
                  productController.list.length,
                  (index) {
                    return ProductCard(product: productController.list[index]);
                  },
                ),
              ],
            ),
          );
        }),
        Obx(() {
          if (productController.isLoading.isTrue ||
              productController.remainingItems <= 0) {
            return const SizedBox.shrink();
          }
          if (productController.isLoadingMore.isTrue) {
            return const CircularProgressIndicator();
          }
          return TopRoundedContainer(
            color: Colors.white,
            child: Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: getProportionateScreenWidth(30),
                  vertical: getProportionateScreenWidth(5)),
              child: DefaultButton2(
                textChild: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                    style: TextStyle(
                        fontSize: getProportionateScreenWidth(16),
                        color: Colors.white),
                    children: <TextSpan>[
                      const TextSpan(text: 'Xem thêm\n'),
                      TextSpan(
                          text:
                              '(${productController.remainingItems.value} sản phẩm)',
                          style: TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: getProportionateScreenWidth(10))),
                    ],
                  ),
                ),
                press: () {
                  productController.fetchMoreProduct();
                },
              ),
            ),
          );
        }),
      ],
    );
  }
}
