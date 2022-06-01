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

  void decreaseQty(String productId, String sku) {
    int itemIndex = list.indexWhere((item) => item.productId == productId && item.sku == sku);
    if (itemIndex < 0) {
      return;
    }

    list[itemIndex].qty -= 1;
    list.refresh();
    calculateFee();
  }

  void increaseQty(String productId, String sku) {
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
}
