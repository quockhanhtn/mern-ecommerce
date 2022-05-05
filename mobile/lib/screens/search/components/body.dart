import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/product_controller.dart';

import '../../../size_config.dart';
import 'popular_product.dart';

class Body extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());
  Body({Key? key, required this.keyword}) : super(key: key);

  final String keyword;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: SingleChildScrollView(
      child: Column(children: [
        SizedBox(height: getProportionateScreenWidth(10)),
        PopularProducts(),
        SizedBox(height: getProportionateScreenWidth(30)),
      ]),
    ));
  }
}
