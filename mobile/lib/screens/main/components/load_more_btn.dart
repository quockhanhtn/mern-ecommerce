import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hk_mobile/app_theme.dart';
import 'package:hk_mobile/controllers/product_controller.dart';
import 'package:hk_mobile/core/components/custom_btn.dart';

class LoadMoreBtn extends StatelessWidget {
  final ProductController productController = Get.put(ProductController());

  LoadMoreBtn({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Obx(() {
        if (productController.isLoading.isTrue || productController.remainingItems <= 0) {
          return const SizedBox.shrink();
        }
        if (productController.isLoadingMore.isTrue) {
          return const Center(
            child: SizedBox(
              width: 40,
              height: 40,
              child: CircularProgressIndicator(),
            ),
          );
        }
        return CustomBtn(
          text: 'Xem thêm',
          subText: '(${productController.remainingItems.value} sản phẩm)',
          btnColor: AppTheme.nearlyBlue,
          textColor: AppTheme.nearlyWhite,
          btnPadding: const EdgeInsets.only(left: 24, right: 24, bottom: 30),
          onTap: () {
            productController.fetchMoreProduct();
          },
        );
      }),
    );
  }
}
