import 'dart:collection';

import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/product/product_dto.dart';

class ProductController extends GetxController {
  final list = <ProductDto>[].obs;
  final isLoading = true.obs;
  final errorMgs = ''.obs;

  @override
  void onInit() {
    fetchProducts();
    super.onInit();
  }

  void fetchProducts() {
    isLoading(true);
    DioUtil.get('products', onSuccess: (data) {
      var result = data["data"]
          .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
          .toList();
      list.value = result.cast<ProductDto>();
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }
}
