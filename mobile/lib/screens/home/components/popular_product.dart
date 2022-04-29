import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/core/components/product_card.dart';
import 'package:hk_mobile/dto/Product.dart';

import '../../../controllers/product_controller.dart';
import '../../../size_config.dart';
import 'section_title.dart';

class PopularProducts extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: SectionTitle(title: "Sản phẩm mới nhất", press: () {}),
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
                SizedBox(width: getProportionateScreenWidth(20)),
              ],
            ),
          );
        })
      ],
    );
  }
}
