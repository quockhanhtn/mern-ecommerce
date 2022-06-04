import 'package:get/get.dart';
import 'package:hk_mobile/core/utils/dio_util.dart';
import 'package:hk_mobile/dto/cart_dto.dart';
import 'package:hk_mobile/dto/product_dto.dart';

class CartController extends GetxController {
  RxList<CartDto> list = <CartDto>[].obs;
  RxBool isLoading = false.obs;
  RxString errorMgs = ''.obs;

  RxDouble subTotal = 0.0.obs;
  RxDouble saveMoney = 0.0.obs;
  RxDouble discount = 0.0.obs;
  RxDouble shipping = 0.0.obs;
  RxDouble total = 0.0.obs;

  void authenticatedChange(bool isAuth) {
    if (isAuth) {
      fetchCartItems();
    } else {
      // clear data
      list.clear();
      list.refresh();
    }
  }

  void fetchCartItems() {
    isLoading(true);
    DioUtil.post('/cart', onSuccess: (data) {
      var result = data["data"].map((e) => CartDto(e as Map<String, dynamic>)).toList();
      list.value = result.cast<CartDto>();
      errorMgs('');
      calculateFee();
    }, onError: (e) {
      errorMgs(e.toString());
    }, onFinally: () {
      isLoading(false);
    });
  }

  void add(
    String productId,
    ProductVariantDto variant,
    int qty, {
    required Function doWhenSuccess,
    required Function(String) doWhenError,
  }) async {
    DioUtil.post(
      '/cart/add',
      data: CartDto.jsonForAdd(productId, variant.sku, qty),
      onSuccess: (data) {
        if (data["success"]) {
          doWhenSuccess();
          fetchCartItems();
        }
      },
      onError: (e) => doWhenError(e.toString()),
      onFinally: () {},
    );
  }

  Future<void> addAsync(
    String productId,
    ProductVariantDto variant,
    int qty, {
    required Function doWhenSuccess,
    required Function(String) doWhenError,
  }) async {
    try {
      var response = await DioUtil.postAsync('/cart/add', data: CartDto.jsonForAdd(productId, variant.sku, qty));
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        await fetchCartItemsAsync();
        doWhenSuccess();
      } else {
        doWhenError('Xảy ra lổi, vui lòng thử lại');
      }
    } catch (e) {
      e.toString();
    }
  }

  Future<void> increaseQtyAsync(String productId, String sku) async {
    var postData = <String, dynamic>{};
    postData['productId'] = productId;
    postData['sku'] = sku;
    postData['delta'] = 1;
    var response = await DioUtil.patchAsync('cart', data: postData);
    if (response.statusCode! >= 200 && response.statusCode! < 300) {
      _increaseQty(productId, sku);
    }
  }

  Future<void> decreaseQtyAsync(String productId, String sku) async {
    var postData = <String, dynamic>{};
    postData['productId'] = productId;
    postData['sku'] = sku;
    postData['delta'] = -1;
    var response = await DioUtil.patchAsync('cart', data: postData);
    if (response.statusCode! >= 200 && response.statusCode! < 300) {
      _decreaseQty(productId, sku);
    }
  }

  void _decreaseQty(String productId, String sku) {
    int itemIndex = list.indexWhere((item) => item.productId == productId && item.sku == sku);
    if (itemIndex < 0) {
      return;
    }

    list[itemIndex].qty -= 1;
    list.refresh();
    calculateFee();
  }

  void _increaseQty(String productId, String sku) {
    int itemIndex = list.indexWhere((item) => item.productId == productId && item.sku == sku);
    if (itemIndex < 0) {
      return;
    }

    list[itemIndex].qty += 1;
    list.refresh();
    calculateFee();
  }

  void removeItem(int index) {
    if (index >= 0) {
      list.removeAt(index);
      calculateFee();
      list.refresh();
    }
  }

  bool isSelectedAll() {
    for (CartDto element in list) {
      if (!element.isSelected) {
        return false;
      }
    }
    return true;
  }

  void toggleSelected(String productId, String sku) {
    int itemIndex = list.indexWhere((item) => item.productId == productId && item.sku == sku);
    if (itemIndex < 0) {
      return;
    }

    list[itemIndex].isSelected = !list[itemIndex].isSelected;
    list.refresh();
    calculateFee();
  }

  void toggleSelectedAll() {
    bool _isSelectedAll = isSelectedAll();
    for (var i = 0; i < list.length; i++) {
      list[i].isSelected = !_isSelectedAll;
    }
    list.refresh();
  }

  void calculateFee() {
    double price = 0;
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (item.isSelected) {
        price += item.qty * item.price;
      }
    }
    subTotal(price);
  }

  Future<void> fetchCartItemsAsync() async {
    try {
      var response = await DioUtil.postAsync('cart');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        var result = response.data["data"].map((e) => CartDto(e as Map<String, dynamic>)).toList();
        list.value = result.cast<CartDto>();
        errorMgs('');
        calculateFee();
      }
    } catch (e) {
      printError(info: e.toString());
    }
  }

  Future<void> removeItemAsync(
    String productId,
    String sku, {
    Function? doWhenSuccess,
    Function(String)? doWhenError,
  }) async {
    try {
      var response = await DioUtil.deleteAsync('/cart/$productId/$sku');
      if (response.statusCode! >= 200 && response.statusCode! < 300) {
        await fetchCartItemsAsync();
        if (doWhenSuccess != null) {
          doWhenSuccess();
        }
      } else {
        if (doWhenError != null) {
          doWhenError('Xảy ra lỗi, vui lòng thử lại');
        }
      }
    } catch (e) {
      printError(info: e.toString());
    }
  }

  Future<void> removeLstItemsAsync(List<CartDto> list) async {
    for (var item in list) {
      await DioUtil.deleteAsync('/cart/${item.productId}/${item.sku}');
    }
    await fetchCartItemsAsync();
  }
}
