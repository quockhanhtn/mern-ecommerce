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

  @override
  void onInit() {
    super.onInit();
  }

  void add(
    String productId,
    ProductVariantDto variant,
    int qty,
    Function onSuccess,
  ) async {
    // var findIndex = list.indexWhere((cart) => cart.product.id == dto.id);
    // if (findIndex < 0) {
    //   list.add(CartDto(product: dto, numOfItem: 1));
    // } else {
    //   list[findIndex].numOfItem++;
    // }

    var response = await DioUtil.postAsync('/cart/add', data: CartDto.jsonForAdd(productId, variant.sku, qty));

    calculate();
    list.refresh();
  }

  void removeItem(int index) {
    if (index >= 0) {
      list.removeAt(index);
      calculate();
      list.refresh();
    }
  }

  void calculate() {
    // double price = 0;
    // for (var i = 0; i < list.length; i++) {
    //   var item = list[i];
    //   price += item.numOfItem * item.product.variants[0].price;
    // }
    // subTotal(price);
  }
}
