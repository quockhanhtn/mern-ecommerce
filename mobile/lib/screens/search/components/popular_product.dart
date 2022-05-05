import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/core/components/product_card.dart';

import '../../../controllers/product_controller.dart';
import '../../../size_config.dart';

class PopularProducts extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());

  PopularProducts({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
            padding: EdgeInsets.symmetric(
                horizontal: getProportionateScreenWidth(20)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Obx(() {
                  if (productController.keyword.isEmpty) {
                    return Text('Sản phẩm mới nhất',
                        style: TextStyle(
                          fontSize: getProportionateScreenWidth(14),
                          color: Colors.black,
                        ));
                  }
                  return RichText(
                    text: TextSpan(
                      style: TextStyle(
                        fontSize: getProportionateScreenWidth(14),
                        color: Colors.black,
                      ),
                      children: <TextSpan>[
                        const TextSpan(text: 'Kết quả tìm kiếm cho '),
                        TextSpan(
                            text: productController.keyword.value,
                            style:
                                const TextStyle(fontWeight: FontWeight.bold)),
                      ],
                    ),
                  );
                })
              ],
            )),
        SizedBox(height: getProportionateScreenWidth(20)),
        Obx(() {
          if (productController.isSearching.isTrue) {
            return const CircularProgressIndicator();
          }
          if (productController.searchResult.isEmpty) {
            return const Text("Không tìm thấy sản phẩm");
          }
          return SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Wrap(
              children: [
                ...List.generate(
                  productController.searchResult.length,
                  (index) {
                    return ProductCard(
                        product: productController.searchResult[index]);
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
