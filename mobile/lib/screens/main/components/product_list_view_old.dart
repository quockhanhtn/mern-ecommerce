import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/controllers/product_controller.dart';
import 'package:hk_mobile/core/components/product_card.dart';

class ProductsListViewOld extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());

  ProductsListViewOld({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(
          height: 20,
        ),
        Obx(() {
          if (productController.isLoading.isTrue) {
            return const SizedBox(
              child: CircularProgressIndicator(),
              height: 100.0,
              width: 100.0,
            );
          }
          return SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Wrap(
              children: [
                ...List.generate(
                  productController.list.length,
                  (index) {
                    return ProductCard(
                      product: productController.list[index],
                      width: 160,
                    );
                  },
                ),
              ],
            ),
          );
        }),
        // Obx(() {
        //   if (productController.isLoading.isTrue || productController.remainingItems <= 0) {
        //     return const SizedBox.shrink();
        //   }
        //   if (productController.isLoadingMore.isTrue) {
        //     return const CircularProgressIndicator();
        //   }
        //   return TopRoundedContainer(
        //     color: Colors.white,
        //     child: Padding(
        //       padding: EdgeInsets.symmetric(
        //         horizontal: getProportionateScreenWidth(30),
        //         vertical: getProportionateScreenWidth(5),
        //       ),
        //       child: DefaultButton2(
        //         textChild: RichText(
        //           textAlign: TextAlign.center,
        //           text: TextSpan(
        //             style: TextStyle(fontSize: getProportionateScreenWidth(16), color: Colors.white),
        //             children: <TextSpan>[
        //               const TextSpan(text: 'Xem thêm\n'),
        //               TextSpan(
        //                   text: '(${productController.remainingItems.value} sản phẩm)',
        //                   style: TextStyle(fontWeight: FontWeight.w500, fontSize: getProportionateScreenWidth(10))),
        //             ],
        //           ),
        //         ),
        //         press: () {
        //           productController.fetchMoreProduct();
        //         },
        //       ),
        //     ),
        //   );
        //   return CustomBtn(
        //     text: 'Xem thêm (${productController.remainingItems.value} sản phẩm)',
        //     btnColor: AppTheme.nearlyBlue,
        //     textColor: AppTheme.nearlyWhite,
        //     btnPadding: const EdgeInsets.only(left: 24, right: 24, bottom: 30),
        //     onTap: () {
        //       productController.fetchMoreProduct();
        //     },
        //   );
        //   // return TopRoundedContainer(
        //   //   color: Colors.white,
        //   //   child: Padding(
        //   //     padding: EdgeInsets.symmetric(
        //   //         horizontal: getProportionateScreenWidth(30), vertical: getProportionateScreenWidth(5)),
        //   //     child: DefaultButton2(
        //   //       textChild: RichText(
        //   //         textAlign: TextAlign.center,
        //   //         text: TextSpan(
        //   //           style: TextStyle(fontSize: getProportionateScreenWidth(16), color: Colors.white),
        //   //           children: <TextSpan>[
        //   //             const TextSpan(text: 'Xem thêm\n'),
        //   //             TextSpan(
        //   //                 text: '(${productController.remainingItems.value} sản phẩm)',
        //   //                 style: TextStyle(fontWeight: FontWeight.w500, fontSize: getProportionateScreenWidth(10))),
        //   //           ],
        //   //         ),
        //   //       ),
        //   //       press: () {
        //   //         productController.fetchMoreProduct();
        //   //       },
        //   //     ),
        //   //   ),
        //   // );
        // }),
      ],
    );
  }
}
