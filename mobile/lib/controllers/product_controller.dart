import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/product_dto.dart';

class ProductController extends GetxController {
  final list = <ProductDto>[].obs;
  final isLoading = true.obs;
  final page = 1.obs;
  final remainingItems = 0.obs;
  final isLoadingMore = false.obs;
  final errorMgs = ''.obs;

  final keyword = ''.obs;
  final prevKeyword = ''.obs;
  final searchResult = <ProductDto>[].obs;
  final isSearching = true.obs;

  final catId = ''.obs;
  final listByCat = <ProductDto>[].obs;
  final isLoadingByCat = true.obs;
  final pageByCat = 1.obs;
  final remainingItemsCat = 0.obs;
  final isLoadingMoreCat = false.obs;

  @override
  void onInit() {
    fetchProducts();
    super.onInit();
  }

  void fetchProducts() {
    isLoading(true);
    DioUtil.get('products', queryParameters: {'page': page.value, 'limit': 10},
        onSuccess: (data) {
      var result = data["data"]
          .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
          .toList();

      int countAll = data['pagination']['countAll'] as int;
      remainingItems(countAll - page.value * 10);

      list.value = result.cast<ProductDto>();
      page(page.value + 1);
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }

  void fetchMoreProduct() {
    isLoadingMore(true);
    DioUtil.get('products', queryParameters: {'page': page.value, 'limit': 10},
        onSuccess: (data) {
      var result = data["data"]
          .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
          .toList();

      int countAll = data['pagination']['countAll'] as int;
      remainingItems(countAll - page.value * 10);
      for (var item in result.cast<ProductDto>()) {
        // ignore: invalid_use_of_protected_member
        list.value.add(item);
      }

      page(page.value + 1);
      errorMgs('');
      list.refresh();
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoadingMore(false);
    });
  }

  void searchProducts(String newKeyword, {page = 1, limit = 10}) {
    isSearching(true);
    prevKeyword(keyword.value);
    keyword(newKeyword);
    DioUtil.get('products', queryParameters: {
      'search': keyword.value,
      'page': page,
      'limit': limit
    }, onSuccess: (data) {
      var result = data["data"]
          .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
          .toList();
      searchResult.value = result.cast<ProductDto>();
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isSearching(false);
    });
  }

  void setCat(String categoryId) {
    catId(categoryId);
    fetchProductsByCat();
  }

  void fetchProductsByCat() {
    isLoadingByCat(true);
    DioUtil.get('products', queryParameters: {
      'c': catId.value,
      'page': pageByCat.value,
      'limit': 10
    }, onSuccess: (data) {
      var result = data["data"]
          .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
          .toList();

      int countAll = data['pagination']['countAll'] as int;
      remainingItems(countAll - pageByCat.value * 10);

      listByCat.value = result.cast<ProductDto>();
      pageByCat(page.value + 1);
      errorMgs('');
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoadingByCat(false);
    });
  }

  void fetchMoreProductByCat() {
    isLoadingMoreCat(true);
    DioUtil.get('products', queryParameters: {
      'c': catId.value,
      'page': pageByCat.value,
      'limit': 10
    }, onSuccess: (data) {
      var result = data["data"]
          .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
          .toList();

      int countAll = data['pagination']['countAll'] as int;
      remainingItemsCat(countAll - pageByCat.value * 10);
      for (var item in result.cast<ProductDto>()) {
        // ignore: invalid_use_of_protected_member
        listByCat.value.add(item);
      }

      pageByCat(page.value + 1);
      errorMgs('');
      listByCat.refresh();
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoadingMore(false);
    });
  }
}
